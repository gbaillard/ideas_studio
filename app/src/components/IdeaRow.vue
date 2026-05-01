<script setup>
import StatusGlyph from './StatusGlyph.vue'
import { formatMoney } from '../constants.js'

defineProps({
  idea: { type: Object, required: true },
  status: { type: String, required: true },
})
</script>

<template>
  <div class="idea-row" @click="$router.push(`/idea/${idea.id}`)">
    <span class="idea-row-status">
      <StatusGlyph :status="status" :show-label="true" />
    </span>
    <span class="idea-row-cat">
      <span class="category-dot-mark" :class="`cat-${idea.category}`"></span>
    </span>
    <span class="idea-row-title">{{ idea.name }}</span>
    <span class="idea-row-meta">
      <span class="m-revenue">${{ formatMoney(idea.revenueMin) }}-{{ formatMoney(idea.revenueMax) }}/mo</span>
      <span class="m-invest">€{{ idea.investMin }}-{{ idea.investMax }}</span>
      <span class="m-time">{{ idea.timeToRevenue }}</span>
      <span class="m-type">{{ idea.passive ? 'Passif' : 'Actif' }}</span>
      <span class="m-difficulty" :aria-label="`Difficulté ${idea.difficulty}/5`">
        <span
          v-for="n in 5"
          :key="n"
          class="star"
          :class="{ 'is-filled': n <= idea.difficulty }"
        >★</span>
      </span>
      <span class="m-rating">{{ idea.rating?.toFixed ? idea.rating.toFixed(1) : idea.rating }}</span>
    </span>
  </div>
</template>
