import Database from 'better-sqlite3'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Store DB in a data/ directory (mounted as volume in Docker)
const dataDir = process.env.DATA_DIR || join(__dirname, '..', 'data')
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

const dbPath = join(dataDir, 'ideas-studio.db')
const db = new Database(dbPath)

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS idea_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idea_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS idea_statuses (
    idea_id INTEGER PRIMARY KEY,
    status TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS idea_brief_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idea_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS idea_feasibility (
    idea_id INTEGER PRIMARY KEY,
    verdict TEXT,
    summary TEXT,
    details TEXT,
    date TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_comments_idea ON idea_comments(idea_id);
  CREATE INDEX IF NOT EXISTS idx_brief_idea ON idea_brief_notes(idea_id);
`)

// --- Idempotent migrations ---
function hasColumn(table, column) {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all()
  return rows.some(r => r.name === column)
}

if (!hasColumn('idea_comments', 'author')) {
  db.exec(`ALTER TABLE idea_comments ADD COLUMN author TEXT NOT NULL DEFAULT 'user'`)
}

if (!hasColumn('idea_brief_notes', 'author')) {
  db.exec(`ALTER TABLE idea_brief_notes ADD COLUMN author TEXT NOT NULL DEFAULT 'user'`)
}

// Backfill: existing NULL/empty authors → 'user' on both tables
db.prepare(`UPDATE idea_comments SET author = 'user' WHERE author IS NULL OR author = ''`).run()
db.prepare(`UPDATE idea_brief_notes SET author = 'user' WHERE author IS NULL OR author = ''`).run()

export default db
