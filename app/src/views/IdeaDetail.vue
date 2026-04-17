<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import ideas from '../data/ideas.json'
import { api } from '../api.js'

marked.setOptions({ breaks: true, gfm: true })

const props = defineProps({ id: Number })
const router = useRouter()

const idea = computed(() => ideas.find(i => i.id === props.id))
const newComment = ref('')
const comments = ref([])
const status = ref('nouveau')
const feasibility = ref(null)
const briefNotes = ref([])
const newBriefNote = ref('')
const loading = ref(true)
const showBrief = true

const statusConfig = {
  'nouveau':    { label: 'Nouveau',    color: '#8b8d97', icon: '&#9679;' },
  'acceptee':   { label: 'Acceptee',   color: '#22c55e', icon: '&#10003;' },
  'rejetee':    { label: 'Rejetee',    color: '#ef4444', icon: '&#10007;' },
  'en-etude':   { label: 'En Etude de projet', color: '#6366f1', icon: '&#128269;' },
  'en-attente': { label: 'En attente', color: '#f59e0b', icon: '&#9208;' },
  'abandonnee': { label: 'Abandonnee', color: '#ef4444', icon: '&#9632;' },
  'publiee':    { label: 'Publiee',    color: '#22c55e', icon: '&#9733;' },
}

const currentStatus = computed(() => statusConfig[status.value] || statusConfig['nouveau'])

const categoryLabels = {
  'print-on-demand': 'Print on Demand',
  'youtube': 'YouTube / Video',
  'micro-saas': 'Micro-SaaS',
  'kdp': 'Livres KDP',
  'services': 'Services / Freelance',
  'apps': 'Apps Mobiles',
  'games': 'Jeux Enfants PERIPLO'
}

const categoryColors = {
  'print-on-demand': '#22c55e',
  'youtube': '#ef4444',
  'micro-saas': '#6366f1',
  'kdp': '#f59e0b',
  'services': '#3b82f6',
  'apps': '#a855f7',
  'games': '#ec4899'
}

const currentIndex = computed(() => ideas.findIndex(i => i.id === props.id))
const prevIdea = computed(() => currentIndex.value > 0 ? ideas[currentIndex.value - 1] : null)
const nextIdea = computed(() => currentIndex.value < ideas.length - 1 ? ideas[currentIndex.value + 1] : null)

const revenuePercent = computed(() => {
  if (!idea.value) return 0
  const max = Math.min(idea.value.revenueMax, 20000)
  return Math.round((max / 20000) * 100)
})

const difficultyPercent = computed(() => {
  if (!idea.value) return 0
  return (idea.value.difficulty / 5) * 100
})

async function loadData() {
  loading.value = true
  try {
    const [commentsData, statusData, feasibilityData, briefData] = await Promise.all([
      api.getComments(props.id),
      api.getStatus(props.id),
      api.getFeasibility(props.id),
      api.getBrief(props.id),
    ])
    comments.value = commentsData
    if (statusData.status) {
      status.value = statusData.status
    } else {
      status.value = idea.value?.feasibility?.verdict === 'acceptee' ? 'acceptee'
        : idea.value?.feasibility?.verdict === 'rejetee' ? 'rejetee' : 'nouveau'
    }
    feasibility.value = feasibilityData || idea.value?.feasibility || null
    briefNotes.value = briefData
  } catch {
    // Fallback to ideas.json data if API fails
    status.value = idea.value?.feasibility?.verdict === 'acceptee' ? 'acceptee'
      : idea.value?.feasibility?.verdict === 'rejetee' ? 'rejetee' : 'nouveau'
    feasibility.value = idea.value?.feasibility || null
  }
  loading.value = false
}

onMounted(loadData)

// Reload data when navigating between ideas
watch(() => props.id, loadData)

async function addComment() {
  if (!newComment.value.trim()) return
  const date = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().slice(0, 5)
  const result = await api.addComment(props.id, newComment.value.trim(), date)
  comments.value.push(result)
  newComment.value = ''
}

async function updateStatus(e) {
  status.value = e.target.value
  await api.setStatus(props.id, status.value)
}

function formatMoney(n) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n + ''
}

function youtubeId(url) {
  const m = url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

async function deleteComment(index) {
  const comment = comments.value[index]
  await api.deleteComment(props.id, comment.id)
  comments.value.splice(index, 1)
}

async function addBriefNote() {
  if (!newBriefNote.value.trim()) return
  const date = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().slice(0, 5)
  const result = await api.addBriefNote(props.id, newBriefNote.value.trim(), 'Guillaume', date)
  briefNotes.value.push(result)
  newBriefNote.value = ''
}

async function deleteBriefNote(index) {
  const note = briefNotes.value[index]
  await api.deleteBriefNote(props.id, note.id)
  briefNotes.value.splice(index, 1)
}

function renderMarkdown(text) {
  if (!text) return ''
  return marked.parse(text)
}

async function exportIdeaData() {
  const data = await api.exportIdea(props.id)
  data.ideaName = idea.value?.name
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `idea-${props.id}-${idea.value?.name?.replace(/[^a-zA-Z0-9]/g, '_')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function formatCommentDate(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split(' ')
  const dateParts = parts[0].split('-')
  const months = ['jan', 'fev', 'mar', 'avr', 'mai', 'jun', 'jul', 'aou', 'sep', 'oct', 'nov', 'dec']
  return `${dateParts[2]} ${months[parseInt(dateParts[1]) - 1]} ${dateParts[0]}${parts[1] ? ' a ' + parts[1] : ''}`
}

function goToIdea(id) {
  router.push(`/idea/${id}`).then(() => {
    window.scrollTo(0, 0)
  })
}
</script>

<template>
  <div class="detail-page" v-if="idea">
    <router-link to="/" class="back-link">&#8592; Retour aux idees</router-link>

    <div class="detail-header" :style="{ borderTop: `3px solid ${categoryColors[idea.category] || '#6366f1'}` }">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <h1>{{ idea.name }}</h1>
        <select class="status-select" :value="status" @change="updateStatus"
          :style="{ borderColor: currentStatus.color, color: currentStatus.color }">
          <option v-for="(cfg, key) in statusConfig" :key="key" :value="key">{{ cfg.label }}</option>
        </select>
      </div>
      <p style="color: var(--text-muted); font-size: 15px;">{{ idea.description }}</p>
      <div class="meta-row">
        <span class="badge category" :style="{ background: categoryColors[idea.category] + '22', color: categoryColors[idea.category] }">{{ categoryLabels[idea.category] || idea.category }}</span>
        <span class="badge revenue">${{ formatMoney(idea.revenueMin) }}-{{ formatMoney(idea.revenueMax) }}/mois</span>
        <span class="badge invest">Investissement : {{ idea.investMin }}-{{ idea.investMax }}EUR/mois</span>
        <span class="badge time">Premiers revenus : {{ idea.timeToRevenue }}</span>
        <span v-if="idea.passive" class="badge passive">Revenu passif</span>
        <span v-else class="badge" style="background:rgba(239,68,68,0.15);color:var(--red);">Revenu actif</span>
      </div>
      <div class="rating" style="margin-top:12px;">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= idea.rating }" style="font-size:20px;">&#9733;</span>
        <span style="margin-left:8px; color:var(--text-muted); font-size:14px;">Difficulte {{ idea.difficulty }}/5</span>
      </div>
    </div>

    <!-- Etude de faisabilite -->
    <div class="section feasibility-section" :class="feasibility?.verdict">
      <h2>
        <span v-if="!feasibility">&#128269; Etude de faisabilite</span>
        <span v-else-if="feasibility.verdict === 'acceptee'">&#9989; Etude de faisabilite — Acceptee</span>
        <span v-else-if="feasibility.verdict === 'rejetee'">&#10060; Etude de faisabilite — Rejetee</span>
        <span v-else>&#128269; Etude de faisabilite</span>
      </h2>
      <div v-if="!feasibility" class="feasibility-pending">
        <p>Aucune etude de faisabilite n'a encore ete realisee pour cette idee.</p>
        <p style="color: var(--text-muted); font-size: 13px;">Les agents Claude analyseront la credibilite, la faisabilite technique et le realisme des revenus annonces.</p>
      </div>
      <div v-else class="feasibility-content">
        <div class="feasibility-verdict" :class="feasibility.verdict">
          <span class="verdict-icon" v-if="feasibility.verdict === 'acceptee'">&#9989;</span>
          <span class="verdict-icon" v-else>&#10060;</span>
          <div>
            <div class="verdict-label">Verdict</div>
            <div class="verdict-text">{{ feasibility.summary }}</div>
          </div>
        </div>
        <div class="feasibility-details" v-if="feasibility.details">
          <div class="feasibility-detail" v-for="(detail, i) in feasibility.details" :key="i">
            <div class="detail-criterion">{{ detail.criterion }}</div>
            <div class="detail-assessment" :class="detail.ok ? 'pass' : 'fail'">
              <span>{{ detail.ok ? '&#10003;' : '&#10007;' }}</span> {{ detail.text }}
            </div>
          </div>
        </div>
        <div v-if="feasibility.date" style="margin-top: 12px; font-size: 12px; color: var(--text-muted);">
          Etude realisee le {{ feasibility.date }}
        </div>
      </div>
    </div>

    <!-- Pourquoi cette idee -->
    <div class="section why-section">
      <h2>&#128200; Pourquoi cette idee</h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-label">Revenu potentiel</div>
          <div class="why-value">${{ formatMoney(idea.revenueMin) }} - ${{ formatMoney(idea.revenueMax) }}/mois</div>
          <div class="progress-bar">
            <div class="progress-fill revenue-fill" :style="{ width: revenuePercent + '%' }"></div>
          </div>
          <div class="progress-scale"><span>0</span><span>5K</span><span>10K</span><span>15K</span><span>20K</span></div>
        </div>
        <div class="why-item">
          <div class="why-label">Difficulte</div>
          <div class="why-value">{{ idea.difficulty }} / 5</div>
          <div class="progress-bar">
            <div class="progress-fill difficulty-fill" :style="{ width: difficultyPercent + '%' }"></div>
          </div>
          <div class="progress-scale"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
        </div>
        <div class="why-item passive-indicator">
          <div class="passive-icon-wrap" :class="idea.passive ? 'is-passive' : 'is-active'">
            <span v-if="idea.passive" class="passive-icon">&#9854;</span>
            <span v-else class="passive-icon">&#9881;</span>
          </div>
          <div>
            <div class="why-label">Type de revenu</div>
            <div class="why-value" :style="{ color: idea.passive ? 'var(--green)' : 'var(--orange)' }">
              {{ idea.passive ? 'Revenu passif' : 'Revenu actif' }}
            </div>
            <div class="passive-desc">{{ idea.passive ? 'Genere des revenus meme quand tu ne travailles pas' : 'Necessite un effort continu pour generer des revenus' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Process -->
    <div class="section">
      <h2>&#9881; Process etape par etape</h2>
      <ol class="steps-list">
        <li v-for="(step, i) in idea.steps" :key="i">{{ step }}</li>
      </ol>
    </div>

    <!-- Outils -->
    <div class="section">
      <h2>&#128295; Outils necessaires</h2>
      <div class="tools-grid">
        <div v-for="tool in idea.tools" :key="tool" class="tool-item">{{ tool }}</div>
      </div>
    </div>

    <!-- Plateformes -->
    <div class="section">
      <h2>&#127758; Plateformes de vente</h2>
      <div class="tools-grid">
        <div v-for="p in idea.platforms" :key="p" class="tool-item">{{ p }}</div>
      </div>
    </div>

    <!-- YouTube Tutorial -->
    <div class="section" v-if="idea.tutorial">
      <h2>&#127909; Tutoriel YouTube source</h2>
      <a :href="idea.tutorial.url" target="_blank" class="youtube-link">
        <span class="yt-icon">&#9654;</span>
        <div class="yt-info">
          <div class="yt-title">{{ idea.tutorial.title }}</div>
          <div class="yt-meta">{{ idea.tutorial.channel }} &middot; {{ idea.tutorial.views?.toLocaleString() }} vues</div>
        </div>
      </a>
      <div v-if="youtubeId(idea.tutorial.url)" style="margin-top:14px;">
        <iframe
          :src="`https://www.youtube.com/embed/${youtubeId(idea.tutorial.url)}`"
          width="100%"
          height="400"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="border-radius: 10px;"
        ></iframe>
      </div>
    </div>

    <!-- Tags -->
    <div class="section">
      <h2>&#127991; Tags</h2>
      <div class="tags">
        <span v-for="tag in idea.tags" :key="tag" class="tag" style="font-size:13px;padding:4px 10px;">#{{ tag }}</span>
      </div>
    </div>

    <!-- Brief de projet -->
    <div class="section brief-section" v-if="showBrief">
      <h2>&#128203; Brief de projet</h2>
      <p class="brief-description">
        Zone d'echange pour preparer le lancement du projet. Les notes accumulees ici serviront de prompt pour demarrer le developpement.
      </p>
      <div v-if="briefNotes.length === 0" class="comments-empty">
        <span class="comments-empty-icon">&#128221;</span>
        <span>Aucune note. Commence a decrire ta vision du projet, les contraintes, le public cible...</span>
      </div>
      <div v-for="(note, i) in briefNotes" :key="note.id || i" class="comment brief-note">
        <div class="comment-header">
          <div class="comment-avatar" :class="note.author === 'Guillaume' ? '' : 'avatar-agent'">{{ note.author === 'Guillaume' ? 'G' : 'A' }}</div>
          <div class="comment-meta">
            <span class="comment-author">{{ note.author }}</span>
            <span class="comment-date">{{ formatCommentDate(note.date) }}</span>
          </div>
          <button class="comment-delete" @click="deleteBriefNote(i)" title="Supprimer">&#10005;</button>
        </div>
        <div class="comment-text markdown-content" v-html="renderMarkdown(note.text)"></div>
      </div>
      <div class="comment-form">
        <textarea v-model="newBriefNote" placeholder="Decris ta vision, tes contraintes, le public cible, le business model..." @keydown.ctrl.enter="addBriefNote"></textarea>
        <button class="btn comment-btn" @click="addBriefNote">
          &#10148; Ajouter une note
        </button>
      </div>
    </div>

    <!-- Commentaires -->
    <div class="section comments-section">
      <h2>&#128172; Commentaires</h2>
      <div v-if="comments.length === 0" class="comments-empty">
        <span class="comments-empty-icon">&#128221;</span>
        <span>Aucun commentaire. Ajoute tes notes ici pour que je les retrouve.</span>
      </div>
      <div v-for="(c, i) in comments" :key="c.id || i" class="comment">
        <div class="comment-header">
          <div class="comment-avatar">G</div>
          <div class="comment-meta">
            <span class="comment-author">Guillaume</span>
            <span class="comment-date">{{ formatCommentDate(c.date) }}</span>
          </div>
          <button class="comment-delete" @click="deleteComment(i)" title="Supprimer">&#10005;</button>
        </div>
        <div class="comment-text markdown-content" v-html="renderMarkdown(c.text)"></div>
      </div>
      <div class="comment-form">
        <textarea v-model="newComment" placeholder="Ecris un commentaire / une note..." @keydown.ctrl.enter="addComment"></textarea>
        <button class="btn comment-btn" @click="addComment">
          &#10148; Ajouter
        </button>
      </div>
      <button class="btn export-btn" @click="exportIdeaData" title="Exporter toutes les donnees de cette idee (commentaires, brief, statut)">
        &#128190; Exporter les donnees
      </button>
    </div>

    <!-- Navigation entre idees -->
    <div class="idea-nav">
      <button v-if="prevIdea" class="idea-nav-btn" @click="goToIdea(prevIdea.id)">
        <span class="nav-arrow">&#8592;</span>
        <span class="nav-info">
          <span class="nav-label">Idee precedente</span>
          <span class="nav-name">{{ prevIdea.name }}</span>
        </span>
      </button>
      <div v-else></div>
      <button v-if="nextIdea" class="idea-nav-btn next" @click="goToIdea(nextIdea.id)">
        <span class="nav-info" style="text-align:right;">
          <span class="nav-label">Idee suivante</span>
          <span class="nav-name">{{ nextIdea.name }}</span>
        </span>
        <span class="nav-arrow">&#8594;</span>
      </button>
      <div v-else></div>
    </div>
  </div>
</template>
