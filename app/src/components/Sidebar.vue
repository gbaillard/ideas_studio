<script setup>
import { computed } from 'vue'
import { Search } from 'lucide-vue-next'
import ideas from '../data/ideas.json'
import { CATEGORY_LABELS } from '../constants.js'
import { filters } from '../stores/filters.js'

defineProps({
  categoryFilter: { type: String, default: '' },
})

const emit = defineEmits(['update:categoryFilter'])

const totalIdeas = computed(() => ideas.length)

const categoryCounts = computed(() => {
  const counts = {}
  for (const i of ideas) counts[i.category] = (counts[i.category] || 0) + 1
  return counts
})

const categories = Object.keys(CATEGORY_LABELS).filter(k => categoryCounts.value[k])

function selectCategory(key) {
  emit('update:categoryFilter', key)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">IS</div>
      <div class="sidebar-brand">
        <span class="sidebar-brand-name">Ideas Studio</span>
        <span class="sidebar-brand-sub">Catalogue d'idées</span>
      </div>
    </div>

    <div class="sidebar-search-field">
      <Search :size="14" :stroke-width="1.75" class="sidebar-search-icon" />
      <input
        v-model="filters.search"
        type="text"
        placeholder="Rechercher…"
        class="sidebar-search-input"
      />
    </div>

    <div class="sidebar-scroll">
      <div class="sidebar-section">
        <div class="sidebar-section-label">Workspace</div>
        <div
          class="sidebar-item"
          :class="{ 'is-active': categoryFilter === '' }"
          @click="selectCategory('')"
        >
          <span class="sidebar-item-label">Toutes les idées</span>
          <span class="sidebar-item-count">{{ totalIdeas }}</span>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-label">Catégories</div>
        <div
          v-for="c in categories"
          :key="c"
          class="sidebar-item"
          :class="{ 'is-active': categoryFilter === c }"
          @click="selectCategory(c)"
        >
          <span class="sidebar-item-icon">
            <span class="category-dot-mark" :class="`cat-${c}`"></span>
          </span>
          <span class="sidebar-item-label">{{ CATEGORY_LABELS[c] || c }}</span>
          <span class="sidebar-item-count">{{ categoryCounts[c] }}</span>
        </div>
      </div>
    </div>

    <div class="sidebar-footer">
      <div class="sidebar-avatar">G</div>
      <div class="sidebar-user-name">Guillaume</div>
    </div>
  </aside>
</template>
