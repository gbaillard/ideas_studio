<script setup>
import { ref, computed } from 'vue'
import ideas from '../data/ideas.json'

const search = ref('')
const categoryFilter = ref('')
const difficultyFilter = ref('')
const sortBy = ref('rating')
const passiveFilter = ref('')
const statusFilter = ref('')

const statusConfig = {
  'nouveau':    { label: 'Nouveau',    color: '#8b8d97' },
  'acceptee':   { label: 'Acceptee',   color: '#22c55e' },
  'rejetee':    { label: 'Rejetee',    color: '#ef4444' },
  'en-cours':   { label: 'En cours',   color: '#6366f1' },
  'en-attente': { label: 'En attente', color: '#f59e0b' },
  'abandonnee': { label: 'Abandonnee', color: '#ef4444' },
  'publiee':    { label: 'Publiee',    color: '#22c55e' },
}

function getIdeaStatus(id) {
  const saved = localStorage.getItem(`idea-${id}-status`)
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

  <div class="ideas-grid">
    <router-link
      v-for="idea in filteredIdeas"
      :key="idea.id"
      :to="`/idea/${idea.id}`"
      class="idea-card"
      :class="'idea-card--' + idea.category"
    >
      <div class="card-header">
        <h3>{{ idea.name }}</h3>
        <span class="status-dot" :style="{ background: statusConfig[getIdeaStatus(idea.id)]?.color }"
          :title="statusConfig[getIdeaStatus(idea.id)]?.label"></span>
      </div>

      <p class="description">{{ idea.description }}</p>

      <div class="meta">
        <span class="badge category">{{ categoryLabels[idea.category] || idea.category }}</span>
        <span class="badge revenue">${{ formatMoney(idea.revenueMin) }}-{{ formatMoney(idea.revenueMax) }}/mois</span>
        <span class="badge invest">{{ idea.investMin }}-{{ idea.investMax }}EUR</span>
        <span class="badge time">{{ idea.timeToRevenue }}</span>
        <span v-if="idea.passive" class="badge passive">Passif</span>
      </div>

      <div class="rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= idea.rating }">&#9733;</span>
      </div>

      <div class="tags">
        <span v-for="tag in idea.tags.slice(0, 5)" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </router-link>
  </div>
</template>
