<script setup>
import { computed } from 'vue'
import { CATEGORY_LABELS } from '../constants.js'

const props = defineProps({
  category: { type: String, required: true },
  showLabel: { type: Boolean, default: true },
})

const label = computed(() => CATEGORY_LABELS[props.category] || props.category)
</script>

<template>
  <span class="category-dot">
    <span class="category-dot-mark" :class="`cat-${category}`"></span>
    <span v-if="showLabel">{{ label }}</span>
  </span>
</template>
