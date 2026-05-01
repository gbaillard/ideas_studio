<script setup>
import { ref, computed, onMounted } from 'vue'
import ideas from '../data/ideas.json'
import { api } from '../api.js'
import { filters, resetFilters, hasActiveFilters } from '../stores/filters.js'
import { CATEGORY_LABELS, STATUS_KEYS, STATUS_LABELS, resolveStatus } from '../constants.js'
import TopBar from '../components/TopBar.vue'
import IdeaRow from '../components/IdeaRow.vue'

const statusMap = ref({})

onMounted(async () => {
  try {
    statusMap.value = await api.getAllStatuses()
  } catch {
    // API unavailable — fallback to ideas.json feasibility
  }
})

function getIdeaStatus(id) {
  const idea = ideas.find(i => i.id === id)
  return resolveStatus(idea, statusMap.value)
}

const filteredIdeas = computed(() => {
  let result = [...ideas]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q) ||
      i.tags?.some(t => t.toLowerCase().includes(q))
    )
  }
  if (filters.category) result = result.filter(i => i.category === filters.category)
  if (filters.difficulty) result = result.filter(i => i.difficulty <= Number(filters.difficulty))
  if (filters.passive === 'passive') result = result.filter(i => i.passive)
  else if (filters.passive === 'active') result = result.filter(i => !i.passive)
  if (filters.status) result = result.filter(i => getIdeaStatus(i.id) === filters.status)
  if (filters.ratingMin) result = result.filter(i => (i.rating ?? 0) >= Number(filters.ratingMin))

  if (filters.sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
  else if (filters.sortBy === 'revenue') result.sort((a, b) => b.revenueMax - a.revenueMax)
  else if (filters.sortBy === 'difficulty') result.sort((a, b) => a.difficulty - b.difficulty)
  else if (filters.sortBy === 'invest') result.sort((a, b) => a.investMin - b.investMin)

  return result
})

const crumbs = computed(() => {
  const base = ['Ideas Studio']
  if (filters.category) base.push(CATEGORY_LABELS[filters.category] || filters.category)
  else base.push('Toutes')
  return base
})
</script>

<template>
  <TopBar :crumbs="crumbs" />

  <div class="filter-bar">
    <div class="filter-bar-group">
      <label class="filter-inline">
        <span class="filter-inline-label">Statut</span>
        <select v-model="filters.status" class="filter-select">
          <option value="">Tous</option>
          <option v-for="k in STATUS_KEYS" :key="k" :value="k">{{ STATUS_LABELS[k] }}</option>
        </select>
      </label>
      <label class="filter-inline">
        <span class="filter-inline-label">Difficulté</span>
        <select v-model="filters.difficulty" class="filter-select">
          <option value="">Toute</option>
          <option value="1">≤ 1/5 (facile)</option>
          <option value="2">≤ 2/5</option>
          <option value="3">≤ 3/5</option>
          <option value="4">≤ 4/5</option>
        </select>
      </label>
      <label class="filter-inline">
        <span class="filter-inline-label">Type</span>
        <select v-model="filters.passive" class="filter-select">
          <option value="">Passif + Actif</option>
          <option value="passive">Passif</option>
          <option value="active">Actif</option>
        </select>
      </label>
      <label class="filter-inline">
        <span class="filter-inline-label">Note min.</span>
        <select v-model="filters.ratingMin" class="filter-select">
          <option value="">Toute</option>
          <option value="3">≥ 3.0</option>
          <option value="4">≥ 4.0</option>
          <option value="4.5">≥ 4.5</option>
          <option value="5">= 5.0</option>
        </select>
      </label>
      <label class="filter-inline">
        <span class="filter-inline-label">Tri</span>
        <select v-model="filters.sortBy" class="filter-select">
          <option value="rating">Note</option>
          <option value="revenue">Revenu max</option>
          <option value="difficulty">Difficulté</option>
          <option value="invest">Investissement</option>
        </select>
      </label>
    </div>
    <button
      v-if="hasActiveFilters()"
      type="button"
      class="filter-clear-inline"
      @click="resetFilters()"
    >
      Réinitialiser
    </button>
  </div>

  <div class="list-toolbar">
    <span class="list-toolbar-label">{{ filteredIdeas.length }} idées</span>
  </div>

  <div class="list-header">
    <span class="lh-status">Statut</span>
    <span class="lh-cat" aria-hidden="true"></span>
    <span class="lh-title">Nom</span>
    <span class="lh-meta">
      <span class="m-revenue">Revenu</span>
      <span class="m-invest">Invest.</span>
      <span class="m-time">Délai</span>
      <span class="m-type">Type</span>
      <span class="m-difficulty">Difficulté</span>
      <span class="m-rating">Note</span>
    </span>
  </div>

  <div class="list-scroll">
    <IdeaRow
      v-for="idea in filteredIdeas"
      :key="idea.id"
      :idea="idea"
      :status="getIdeaStatus(idea.id)"
    />
    <div v-if="filteredIdeas.length === 0" class="list-empty">
      Aucune idée ne correspond aux filtres.
    </div>
  </div>
</template>
