import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, readFileSync } from 'fs'
import db from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '10mb' }))

// Load ideas.json (source of truth for titles/categories) — used by agent-feed.
// Reads from dist/ in prod (bundled by Vite into /assets) or src/data in dev.
function loadIdeasIndex() {
  const candidates = [
    join(__dirname, '..', 'src', 'data', 'ideas.json'),
    join(__dirname, '..', 'dist', 'ideas.json'),
  ]
  for (const p of candidates) {
    if (existsSync(p)) {
      try {
        const arr = JSON.parse(readFileSync(p, 'utf8'))
        const map = {}
        for (const idea of arr) map[idea.id] = { id: idea.id, title: idea.name, category: idea.category }
        return map
      } catch (e) {
        console.warn('Failed to parse ideas.json at', p, e.message)
      }
    }
  }
  return {}
}
const IDEAS_INDEX = loadIdeasIndex()

// --- API Routes ---

// GET all statuses (for Dashboard)
app.get('/api/statuses', (req, res) => {
  const rows = db.prepare('SELECT idea_id, status FROM idea_statuses').all()
  const map = {}
  for (const r of rows) map[r.idea_id] = r.status
  res.json(map)
})

// GET status for one idea
app.get('/api/ideas/:id/status', (req, res) => {
  const row = db.prepare('SELECT status FROM idea_statuses WHERE idea_id = ?').get(req.params.id)
  res.json({ status: row?.status || null })
})

// PUT status for one idea
app.put('/api/ideas/:id/status', (req, res) => {
  const { status } = req.body
  if (!status) return res.status(400).json({ error: 'status required' })
  db.prepare(`
    INSERT INTO idea_statuses (idea_id, status, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(idea_id) DO UPDATE SET status = excluded.status, updated_at = excluded.updated_at
  `).run(req.params.id, status, new Date().toISOString())
  res.json({ ok: true })
})

// GET comments for one idea
app.get('/api/ideas/:id/comments', (req, res) => {
  const rows = db.prepare('SELECT id, text, author, date FROM idea_comments WHERE idea_id = ? ORDER BY id ASC').all(req.params.id)
  res.json(rows)
})

// Normalize any caller-provided date (ISO, "YYYY-MM-DD HH:MM", etc.) to ISO-8601 UTC.
// Ensures string-based filtering in /api/agent-feed is lex-correct (T > space).
function normalizeDate(d) {
  if (!d) return new Date().toISOString()
  const parsed = new Date(typeof d === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(d) ? d.replace(' ', 'T') + ':00Z' : d)
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

// POST a comment
app.post('/api/ideas/:id/comments', (req, res) => {
  const { text, author, date } = req.body
  if (!text) return res.status(400).json({ error: 'text required' })
  const a = author || 'user'
  const d = normalizeDate(date)
  const result = db.prepare('INSERT INTO idea_comments (idea_id, text, author, date) VALUES (?, ?, ?, ?)').run(req.params.id, text, a, d)
  res.json({ id: result.lastInsertRowid, text, author: a, date: d })
})

// DELETE a comment
app.delete('/api/ideas/:id/comments/:commentId', (req, res) => {
  db.prepare('DELETE FROM idea_comments WHERE id = ? AND idea_id = ?').run(req.params.commentId, req.params.id)
  res.json({ ok: true })
})

// GET brief notes for one idea
app.get('/api/ideas/:id/brief', (req, res) => {
  const rows = db.prepare('SELECT id, text, author, date FROM idea_brief_notes WHERE idea_id = ? ORDER BY id ASC').all(req.params.id)
  res.json(rows)
})

// POST a brief note
app.post('/api/ideas/:id/brief', (req, res) => {
  const { text, author, date } = req.body
  if (!text) return res.status(400).json({ error: 'text required' })
  const a = author || 'user'
  const d = normalizeDate(date)
  const result = db.prepare('INSERT INTO idea_brief_notes (idea_id, text, author, date) VALUES (?, ?, ?, ?)').run(req.params.id, text, a, d)
  res.json({ id: result.lastInsertRowid, text, author: a, date: d })
})

// DELETE a brief note
app.delete('/api/ideas/:id/brief/:noteId', (req, res) => {
  db.prepare('DELETE FROM idea_brief_notes WHERE id = ? AND idea_id = ?').run(req.params.noteId, req.params.id)
  res.json({ ok: true })
})

// GET feasibility for one idea
app.get('/api/ideas/:id/feasibility', (req, res) => {
  const row = db.prepare('SELECT verdict, summary, details, date FROM idea_feasibility WHERE idea_id = ?').get(req.params.id)
  if (!row) return res.json(null)
  res.json({ ...row, details: row.details ? JSON.parse(row.details) : null })
})

// PUT feasibility for one idea
app.put('/api/ideas/:id/feasibility', (req, res) => {
  const { verdict, summary, details, date } = req.body
  db.prepare(`
    INSERT INTO idea_feasibility (idea_id, verdict, summary, details, date) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(idea_id) DO UPDATE SET verdict = excluded.verdict, summary = excluded.summary, details = excluded.details, date = excluded.date
  `).run(req.params.id, verdict, summary, details ? JSON.stringify(details) : null, date)
  res.json({ ok: true })
})

// GET export data for one idea
app.get('/api/ideas/:id/export', (req, res) => {
  const id = req.params.id
  const status = db.prepare('SELECT status FROM idea_statuses WHERE idea_id = ?').get(id)
  const comments = db.prepare('SELECT id, text, author, date FROM idea_comments WHERE idea_id = ? ORDER BY id ASC').all(id)
  const briefNotes = db.prepare('SELECT id, text, author, date FROM idea_brief_notes WHERE idea_id = ? ORDER BY id ASC').all(id)
  const feasibility = db.prepare('SELECT verdict, summary, details, date FROM idea_feasibility WHERE idea_id = ?').get(id)
  res.json({
    ideaId: Number(id),
    status: status?.status || null,
    comments,
    briefNotes,
    feasibility: feasibility ? { ...feasibility, details: feasibility.details ? JSON.parse(feasibility.details) : null } : null,
    exportDate: new Date().toISOString(),
  })
})

// POST migrate from localStorage (bulk import)
app.post('/api/migrate', (req, res) => {
  const { ideas } = req.body
  if (!Array.isArray(ideas)) return res.status(400).json({ error: 'ideas array required' })

  const insertStatus = db.prepare(`
    INSERT INTO idea_statuses (idea_id, status, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(idea_id) DO UPDATE SET status = excluded.status, updated_at = excluded.updated_at
  `)
  const insertComment = db.prepare('INSERT INTO idea_comments (idea_id, text, author, date) VALUES (?, ?, ?, ?)')
  const insertBrief = db.prepare('INSERT INTO idea_brief_notes (idea_id, text, author, date) VALUES (?, ?, ?, ?)')
  const insertFeasibility = db.prepare(`
    INSERT INTO idea_feasibility (idea_id, verdict, summary, details, date) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(idea_id) DO UPDATE SET verdict = excluded.verdict, summary = excluded.summary, details = excluded.details, date = excluded.date
  `)

  const migrate = db.transaction((ideas) => {
    let count = 0
    for (const idea of ideas) {
      const id = idea.ideaId
      if (idea.status) {
        insertStatus.run(id, idea.status, new Date().toISOString())
        count++
      }
      if (Array.isArray(idea.comments)) {
        for (const c of idea.comments) {
          insertComment.run(id, c.text, c.author || 'user', c.date)
          count++
        }
      }
      if (Array.isArray(idea.briefNotes)) {
        for (const n of idea.briefNotes) {
          insertBrief.run(id, n.text, n.author || 'user', n.date)
          count++
        }
      }
      if (idea.feasibility) {
        const f = idea.feasibility
        insertFeasibility.run(id, f.verdict, f.summary, f.details ? JSON.stringify(f.details) : null, f.date)
        count++
      }
    }
    return count
  })

  try {
    const count = migrate(ideas)
    res.json({ ok: true, migratedRecords: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET aggregated feed of user-authored activity on ideas in 'en-etude'.
// Used by the Dev agent at heartbeat time to detect new user input.
app.get('/api/agent-feed', (req, res) => {
  const since = req.query.since || '1970-01-01T00:00:00Z'
  const enEtudeIdeaIds = db.prepare(`SELECT idea_id FROM idea_statuses WHERE status = 'en-etude'`).all().map(r => r.idea_id)
  if (enEtudeIdeaIds.length === 0) return res.json([])

  const placeholders = enEtudeIdeaIds.map(() => '?').join(',')
  const comments = db.prepare(
    `SELECT id, idea_id, text, author, date FROM idea_comments
     WHERE author = 'user' AND date > ? AND idea_id IN (${placeholders})`
  ).all(since, ...enEtudeIdeaIds)
  const briefs = db.prepare(
    `SELECT id, idea_id, text, author, date FROM idea_brief_notes
     WHERE author = 'user' AND date > ? AND idea_id IN (${placeholders})`
  ).all(since, ...enEtudeIdeaIds)

  const feed = [
    ...comments.map(c => ({
      type: 'comment',
      id: c.id,
      ideaId: c.idea_id,
      ideaTitle: IDEAS_INDEX[c.idea_id]?.title || null,
      ideaStatus: 'en-etude',
      text: c.text,
      date: c.date,
      author: c.author,
    })),
    ...briefs.map(b => ({
      type: 'brief_note',
      id: b.id,
      ideaId: b.idea_id,
      ideaTitle: IDEAS_INDEX[b.idea_id]?.title || null,
      ideaStatus: 'en-etude',
      text: b.text,
      date: b.date,
      author: b.author,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date))

  res.json(feed)
})

// --- Static file serving (production) ---
const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  // SPA fallback — serve index.html for all non-API routes
  app.get('/{*path}', (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' })
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`IDEAS_STUDIO backend running on port ${PORT}`)
})
