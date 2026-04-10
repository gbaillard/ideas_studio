<script setup>
import { computed } from 'vue'
import ideas from './data/ideas.json'

const totalIdeas = computed(() => ideas.length)
const totalTutorials = computed(() => ideas.filter(i => i.tutorial).length)
const totalCategories = computed(() => new Set(ideas.map(i => i.category)).size)
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
