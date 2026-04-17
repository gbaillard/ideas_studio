<script setup>
import { computed, onMounted } from 'vue'
import ideas from './data/ideas.json'
import { api } from './api.js'

const totalIdeas = computed(() => ideas.length)
const totalTutorials = computed(() => ideas.filter(i => i.tutorial).length)
const totalCategories = computed(() => new Set(ideas.map(i => i.category)).size)

// One-time migration from localStorage to SQLite backend
onMounted(async () => {
  if (localStorage.getItem('ideas-studio-migrated')) return

  const toMigrate = []
  for (const idea of ideas) {
    const entry = { ideaId: idea.id }
    let hasData = false

    const status = localStorage.getItem(`idea-${idea.id}-status`)
    if (status) { entry.status = status === 'en-cours' ? 'en-etude' : status; hasData = true }

    const comments = localStorage.getItem(`idea-${idea.id}-comments`)
    if (comments) { try { entry.comments = JSON.parse(comments); hasData = true } catch {} }

    const brief = localStorage.getItem(`idea-${idea.id}-brief`)
    if (brief) { try { entry.briefNotes = JSON.parse(brief); hasData = true } catch {} }

    const feasibility = localStorage.getItem(`idea-${idea.id}-feasibility`)
    if (feasibility) { try { entry.feasibility = JSON.parse(feasibility); hasData = true } catch {} }

    if (hasData) toMigrate.push(entry)
  }

  if (toMigrate.length === 0) {
    localStorage.setItem('ideas-studio-migrated', 'true')
    return
  }

  try {
    await api.migrate(toMigrate)
    // Clean up localStorage after successful migration
    for (const idea of ideas) {
      localStorage.removeItem(`idea-${idea.id}-status`)
      localStorage.removeItem(`idea-${idea.id}-comments`)
      localStorage.removeItem(`idea-${idea.id}-brief`)
      localStorage.removeItem(`idea-${idea.id}-feasibility`)
    }
    localStorage.setItem('ideas-studio-migrated', 'true')
    console.log(`Migration OK: ${toMigrate.length} idees migrées vers SQLite`)
  } catch (err) {
    console.warn('Migration localStorage → SQLite echouee, sera retentee:', err.message)
  }
})
</script>

<template>
  <div class="header">
    <router-link to="/" style="text-decoration:none">
      <h1>IDEAS STUDIO</h1>
    </router-link>
    <div class="stats">
      <span>{{ totalIdeas }} idees</span>
      <span>{{ totalTutorials }} tutoriels</span>
      <span>{{ totalCategories }} categories</span>
    </div>
  </div>
  <router-view />
</template>
