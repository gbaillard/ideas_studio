<script setup>
import { ref, computed, onMounted } from 'vue'
import ideas from '../data/ideas.json'
import { api } from '../api.js'

const search = ref('')
const categoryFilter = ref('')
const difficultyFilter = ref('')
const sortBy = ref('rating')
const passiveFilter = ref('')
const statusFilter = ref('')
const statusMap = ref({})

const statusConfig = {
  'nouveau':    { label: 'Nouveau',    color: '#8b8d97' },
  'acceptee':   { label: 'Acceptee',   color: '#22c55e' },
  'rejetee':    { label: 'Rejetee',    color: '#ef4444' },
  'en-etude':   { label: 'En Etude de projet', color: '#6366f1' },
  'en-attente': { label: 'En attente', color: '#f59e0b' },
  'abandonnee': { label: 'Abandonnee', color: '#ef4444' },
  'publiee':    { label: 'Publiee',    color: '#22c55e' },
}

onMounted(async () => {
  try {
    statusMap.value = await api.getAllStatuses()
  } catch {
    // API not available — statuses will fallback to ideas.json
  }
})

function getIdeaStatus(id) {
  const saved = statusMap.value[id]
  if (saved) return saved
  const idea = ideas.find(i => i.id === id)
  if (idea?.feasibility?.verdict === 'acceptee') return 'acceptee'
  if (idea?.feasibility?.verdict === 'rejetee') return 'rejetee'
  return 'nouveau'
}

const categories = [...new Set(ideas.map(i => i.category))]
const categoryLabels = {
  'print-on-demand': 'Print on Demand',
  'youtube': 'YouTube / Video',
  'micro-saas': 'Micro-SaaS',
  'kdp': 'Livres KDP',
  'services': 'Services / Freelance',
  'apps': 'Apps Mobiles',
  'games': 'Jeux Enfants PERIPLO'
}

const categoryCounts = computed(() => {
  const counts = {}
  ideas.forEach(i => {
    counts[i.category] = (counts[i.category] || 0) + 1
  })
  return counts
})

const filteredIdeas = computed(() => {
  let result = [...ideas]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.tags.some(t => t.includes(q))
    )
  }

  if (categoryFilter.value) {
    result = result.filter(i => i.category === categoryFilter.value)
  }

  if (difficultyFilter.value) {
    result = result.filter(i => i.difficulty <= Number(difficultyFilter.value))
  }

  if (passiveFilter.value === 'passive') {
    result = result.filter(i => i.passive)
  } else if (passiveFilter.value === 'active') {
    result = result.filter(i => !i.passive)
  }

  if (statusFilter.value) {
    result = result.filter(i => getIdeaStatus(i.id) === statusFilter.value)
  }

  if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'revenue') {
    result.sort((a, b) => b.revenueMax - a.revenueMax)
  } else if (sortBy.value === 'difficulty') {
    result.sort((a, b) => a.difficulty - b.difficulty)
  } else if (sortBy.value === 'invest') {
    result.sort((a, b) => a.investMin - b.investMin)
  }

  return result
})

function formatMoney(n) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n + ''
}
</script>

<template>
  <div class="dashboard-view">
  <div class="category-pills">
    <button
      class="cat-pill"
      :class="{ active: categoryFilter === '' }"
      @click="categoryFilter = ''"
    >
      Toutes <span class="pill-count">{{ ideas.length }}</span>
    </button>
    <button
      v-for="c in categories"
      :key="c"
      class="cat-pill"
      :class="['cat-pill--' + c, { active: categoryFilter === c }]"
      @click="categoryFilter = c"
    >
      {{ categoryLabels[c] || c }} <span class="pill-count">{{ categoryCounts[c] || 0 }}</span>
    </button>
  </div>

  <div class="filters">
    <input v-model="search" placeholder="Rechercher une idee..." />
    <select v-model="categoryFilter">
      <option value="">Toutes categories</option>
      <option v-for="c in categories" :key="c" :value="c">{{ categoryLabels[c] || c }}</option>
    </select>
    <select v-model="difficultyFilter">
      <option value="">Toute difficulte</option>
      <option value="1">Facile (1/5)</option>
      <option value="2">Facile-Moyen (1-2/5)</option>
      <option value="3">Jusqu'a moyen (1-3/5)</option>
    </select>
    <select v-model="passiveFilter">
      <option value="">Passif + Actif</option>
      <option value="passive">Passif uniquement</option>
      <option value="active">Actif uniquement</option>
    </select>
    <select v-model="statusFilter">
      <option value="">Tous statuts</option>
      <option v-for="(cfg, key) in statusConfig" :key="key" :value="key">{{ cfg.label }}</option>
    </select>
    <select v-model="sortBy">
      <option value="rating">Trier par note</option>
      <option value="revenue">Trier par revenu max</option>
      <option value="difficulty">Trier par facilite</option>
      <option value="invest">Trier par investissement</option>
    </select>
  </div>

  <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">
    {{ filteredIdeas.length }} idee{{ filteredIdeas.length > 1 ? 's' : '' }} trouvee{{ filteredIdeas.length > 1 ? 's' : '' }}
  </p>

  <div class="table-container">
    <table class="ideas-table">
      <thead>
        <tr>
          <th class="th-status">Statut</th>
          <th class="th-name">Nom</th>
          <th class="th-category">Categorie</th>
          <th class="th-revenue">Revenu/mois</th>
          <th class="th-invest">Invest.</th>
          <th class="th-difficulty">Diff.</th>
          <th class="th-time">Delai</th>
          <th class="th-type">Type</th>
          <th class="th-rating">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="idea in filteredIdeas"
          :key="idea.id"
          class="idea-row"
          :class="'idea-row--' + idea.category"
          @click="$router.push(`/idea/${idea.id}`)"
        >
          <td class="td-status">
            <span class="status-badge" :class="'status-badge--' + getIdeaStatus(idea.id)">
              {{ statusConfig[getIdeaStatus(idea.id)]?.label }}
            </span>
          </td>
          <td class="td-name">{{ idea.name }}</td>
          <td class="td-category">
            <span class="badge category" :class="'badge--' + idea.category">{{ categoryLabels[idea.category] || idea.category }}</span>
          </td>
          <td class="td-revenue">
            <span class="badge revenue">${{ formatMoney(idea.revenueMin) }}-{{ formatMoney(idea.revenueMax) }}</span>
          </td>
          <td class="td-invest">{{ idea.investMin }}-{{ idea.investMax }}€</td>
          <td class="td-difficulty">
            <span v-for="n in 5" :key="n" class="diff-dot" :class="{ active: n <= idea.difficulty }"></span>
          </td>
          <td class="td-time">{{ idea.timeToRevenue }}</td>
          <td class="td-type">
            <span v-if="idea.passive" class="badge passive">Passif</span>
            <span v-else class="badge active-type">Actif</span>
          </td>
          <td class="td-rating">
            <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= idea.rating }">&#9733;</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
