<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { CheckCircle2, XCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ideas from '../data/ideas.json'
import { api } from '../api.js'
import { filters } from '../stores/filters.js'
import { CATEGORY_LABELS, STATUS_KEYS, STATUS_LABELS, resolveStatus, formatMoney } from '../constants.js'
import TopBar from '../components/TopBar.vue'
import StatusGlyph from '../components/StatusGlyph.vue'
import CategoryDot from '../components/CategoryDot.vue'
import PropertyRow from '../components/PropertyRow.vue'

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

const filteredIdeas = computed(() => {
  let result = [...ideas]
  if (filters.category) result = result.filter(i => i.category === filters.category)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q)
    )
  }
  return result
})

const currentIndex = computed(() => filteredIdeas.value.findIndex(i => i.id === props.id))
const prevIdea = computed(() => currentIndex.value > 0 ? filteredIdeas.value[currentIndex.value - 1] : null)
const nextIdea = computed(() => {
  const idx = currentIndex.value
  return idx >= 0 && idx < filteredIdeas.value.length - 1 ? filteredIdeas.value[idx + 1] : null
})

const crumbs = computed(() => {
  if (!idea.value) return ['Ideas Studio']
  return [
    'Ideas Studio',
    CATEGORY_LABELS[idea.value.category] || idea.value.category,
    idea.value.name,
  ]
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
    status.value = statusData.status || resolveStatus(idea.value, {})
    feasibility.value = feasibilityData || idea.value?.feasibility || null
    briefNotes.value = briefData
  } catch {
    status.value = resolveStatus(idea.value, {})
    feasibility.value = idea.value?.feasibility || null
  }
  loading.value = false
}

onMounted(loadData)
watch(() => props.id, loadData)

async function updateStatus(e) {
  status.value = e.target.value
  await api.setStatus(props.id, status.value)
}

async function addComment() {
  if (!newComment.value.trim()) return
  const date = new Date().toISOString()
  const result = await api.addComment(props.id, newComment.value.trim(), 'user', date)
  comments.value.push(result)
  newComment.value = ''
}

async function deleteComment(index) {
  const comment = comments.value[index]
  await api.deleteComment(props.id, comment.id)
  comments.value.splice(index, 1)
}

async function addBriefNote() {
  if (!newBriefNote.value.trim()) return
  const date = new Date().toISOString()
  const result = await api.addBriefNote(props.id, newBriefNote.value.trim(), 'user', date)
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

function youtubeId(url) {
  const m = url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
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
  return dateStr.split(/[ T]/)[0]
}

function authorLabel(author) {
  if (!author || author === 'user') return 'Guillaume'
  return author
}

function authorInitial(author) {
  const label = authorLabel(author)
  return label.charAt(0).toUpperCase()
}

function isAgentAuthor(author) {
  return !!author && author !== 'user'
}

function goToIdea(id) {
  router.push(`/idea/${id}`).then(() => window.scrollTo(0, 0))
}

function goBack() { router.push('/') }
</script>

<template>
  <TopBar :crumbs="crumbs" show-back @back="goBack" />

  <div class="detail-scroll" v-if="idea">
    <div class="detail-layout">
      <div class="detail-main">
        <section>
          <h1 class="detail-h1">{{ idea.name }}</h1>
          <p class="detail-description">{{ idea.description }}</p>
        </section>

        <hr class="detail-section-divider" />

        <section class="detail-section">
          <div class="feasibility-header">
            <h2 class="detail-section-title">Étude de faisabilité</h2>
            <span
              v-if="feasibility?.verdict === 'acceptee'"
              class="feasibility-verdict acceptee"
            >
              <CheckCircle2 :size="16" :stroke-width="1.75" />
              Acceptée
            </span>
            <span
              v-else-if="feasibility?.verdict === 'rejetee'"
              class="feasibility-verdict rejetee"
            >
              <XCircle :size="16" :stroke-width="1.75" />
              Rejetée
            </span>
          </div>
          <div v-if="!feasibility" class="feasibility-pending">
            Aucune étude de faisabilité réalisée pour cette idée.
          </div>
          <template v-else>
            <p class="feasibility-summary">{{ feasibility.summary }}</p>
            <div v-if="feasibility.details?.length" class="feasibility-grid">
              <div
                v-for="(d, i) in feasibility.details"
                :key="i"
                class="feasibility-criterion"
                :class="d.ok ? 'pass' : 'fail'"
              >
                <span class="feasibility-criterion-icon">
                  <CheckCircle2 v-if="d.ok" :size="14" :stroke-width="1.75" />
                  <XCircle v-else :size="14" :stroke-width="1.75" />
                </span>
                <span>
                  <span class="feasibility-criterion-label">{{ d.criterion }} : </span>
                  <span class="feasibility-criterion-value">{{ d.text }}</span>
                </span>
              </div>
            </div>
            <div v-if="feasibility.date" class="feasibility-date">
              Étude réalisée le {{ feasibility.date }}
            </div>
          </template>
        </section>

        <hr class="detail-section-divider" />

        <section class="detail-section" v-if="idea.steps?.length">
          <h2 class="detail-section-title">Process étape par étape</h2>
          <div class="process-list">
            <div v-for="(step, i) in idea.steps" :key="i" class="process-step">
              <div class="process-step-num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="process-step-body">
                <span class="process-step-title">{{ step }}</span>
              </div>
            </div>
          </div>
        </section>

        <hr v-if="idea.tutorial" class="detail-section-divider" />

        <section class="detail-section" v-if="idea.tutorial">
          <h2 class="detail-section-title">Tutoriel YouTube source</h2>
          <a :href="idea.tutorial.url" target="_blank" rel="noopener" class="rail-link">
            <ExternalLink :size="14" :stroke-width="1.75" />
            {{ idea.tutorial.title }}
          </a>
          <div class="youtube-embed" v-if="youtubeId(idea.tutorial.url)">
            <iframe
              :src="`https://www.youtube.com/embed/${youtubeId(idea.tutorial.url)}`"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </section>

        <hr class="detail-section-divider" />

        <section class="detail-section">
          <h2 class="detail-section-title">Brief de projet</h2>
          <div v-if="briefNotes.length === 0" class="empty-note">
            Aucune note. Décris ta vision, tes contraintes, le public cible, le business model.
          </div>
          <div v-else class="brief-list">
            <div v-for="(note, i) in briefNotes" :key="note.id || i" class="brief-note">
              <div class="avatar" :class="{ 'avatar-agent': isAgentAuthor(note.author) }">
                {{ authorInitial(note.author) }}
              </div>
              <div class="brief-note-body">
                <div class="brief-note-head">
                  <span class="brief-note-author">{{ authorLabel(note.author) }}</span>
                  <span class="author-badge" :class="{ 'author-badge-agent': isAgentAuthor(note.author) }">
                    {{ isAgentAuthor(note.author) ? 'agent' : 'user' }}
                  </span>
                  <span class="brief-note-date">{{ formatCommentDate(note.date) }}</span>
                  <button class="brief-note-delete" @click="deleteBriefNote(i)" title="Supprimer">×</button>
                </div>
                <div class="brief-note-text markdown-content" v-html="renderMarkdown(note.text)"></div>
              </div>
            </div>
          </div>
          <div class="brief-form">
            <textarea
              v-model="newBriefNote"
              placeholder="Ajouter une note au brief…"
              @keydown.ctrl.enter="addBriefNote"
            ></textarea>
            <div class="form-actions">
              <button class="btn btn-primary" @click="addBriefNote">Ajouter une note</button>
            </div>
          </div>
        </section>

        <hr class="detail-section-divider" />

        <section class="detail-section">
          <h2 class="detail-section-title">Commentaires</h2>
          <div v-if="comments.length === 0" class="empty-note">
            Aucun commentaire. Ajoute tes notes pour les retrouver plus tard.
          </div>
          <div v-else class="brief-list">
            <div v-for="(c, i) in comments" :key="c.id || i" class="comment-item">
              <div class="avatar" :class="{ 'avatar-agent': isAgentAuthor(c.author) }">
                {{ authorInitial(c.author) }}
              </div>
              <div class="comment-body">
                <div class="comment-head">
                  <span class="comment-author">{{ authorLabel(c.author) }}</span>
                  <span class="author-badge" :class="{ 'author-badge-agent': isAgentAuthor(c.author) }">
                    {{ isAgentAuthor(c.author) ? 'agent' : 'user' }}
                  </span>
                  <span class="comment-date">{{ formatCommentDate(c.date) }}</span>
                  <button class="comment-delete" @click="deleteComment(i)" title="Supprimer">×</button>
                </div>
                <div class="comment-text markdown-content" v-html="renderMarkdown(c.text)"></div>
              </div>
            </div>
          </div>
          <div class="comment-form">
            <textarea
              v-model="newComment"
              placeholder="Écris un commentaire…"
              @keydown.ctrl.enter="addComment"
            ></textarea>
            <div class="form-actions">
              <button class="btn btn-primary" @click="addComment">Ajouter</button>
            </div>
          </div>
          <button class="export-link" @click="exportIdeaData" title="Exporter toutes les données">
            Exporter les données
          </button>
        </section>
      </div>

      <aside class="detail-rail">
        <div>
          <div class="rail-section-title">Properties</div>
          <PropertyRow label="Status">
            <StatusGlyph :status="status" :show-label="false" />
            <select class="rail-status-select" :value="status" @change="updateStatus">
              <option v-for="k in STATUS_KEYS" :key="k" :value="k">{{ STATUS_LABELS[k] }}</option>
            </select>
          </PropertyRow>
          <PropertyRow label="Catégorie">
            <CategoryDot :category="idea.category" />
          </PropertyRow>
          <PropertyRow label="Revenu">
            <span style="color: var(--status-acceptee); font-weight: 500;">
              ${{ formatMoney(idea.revenueMin) }}-{{ formatMoney(idea.revenueMax) }}/mo
            </span>
          </PropertyRow>
          <PropertyRow label="Invest">
            {{ idea.investMin }}-{{ idea.investMax }}€/mo
          </PropertyRow>
          <PropertyRow label="Délai">{{ idea.timeToRevenue }}</PropertyRow>
          <PropertyRow label="Type">
            <span :style="{ color: idea.passive ? 'var(--status-acceptee)' : 'var(--status-en-attente)', fontWeight: 500 }">
              {{ idea.passive ? 'Passif' : 'Actif' }}
            </span>
          </PropertyRow>
          <PropertyRow label="Difficulté">
            <span class="rail-stars" :aria-label="`Difficulté ${idea.difficulty}/5`">
              <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ 'is-filled': n <= idea.difficulty }"
              >★</span>
            </span>
            <span style="color: var(--text-muted); font-size: 11px;">{{ idea.difficulty }}/5</span>
          </PropertyRow>
          <PropertyRow label="Note">
            <span style="font-weight: 500;">{{ idea.rating?.toFixed ? idea.rating.toFixed(1) : idea.rating }}</span>
          </PropertyRow>
          <PropertyRow v-if="idea.tags?.length" label="Tags" multiline>
            <span v-for="t in idea.tags" :key="t" class="tag-pill">#{{ t }}</span>
          </PropertyRow>
          <PropertyRow v-if="idea.tutorial" label="Tutoriel">
            <a :href="idea.tutorial.url" target="_blank" rel="noopener" class="rail-link">
              YouTube
              <ExternalLink :size="12" :stroke-width="1.75" />
            </a>
          </PropertyRow>
          <PropertyRow v-if="feasibility?.date" label="Créée le">
            <span style="color: var(--text-secondary);">{{ feasibility.date }}</span>
          </PropertyRow>
        </div>

        <div class="rail-nav-row">
          <button class="rail-nav-btn" :disabled="!prevIdea" @click="prevIdea && goToIdea(prevIdea.id)">
            <ChevronLeft :size="14" :stroke-width="1.75" />
            Prev
          </button>
          <button class="rail-nav-btn" :disabled="!nextIdea" @click="nextIdea && goToIdea(nextIdea.id)">
            Next
            <ChevronRight :size="14" :stroke-width="1.75" />
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>
