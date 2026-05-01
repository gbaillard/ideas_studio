<script setup>
import { onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ideas from './data/ideas.json'
import { api } from './api.js'
import { filters } from './stores/filters.js'

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
  <div class="app-shell">
    <Sidebar :category-filter="filters.category" @update:category-filter="filters.category = $event" />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
