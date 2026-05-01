<script setup>
import { SlidersHorizontal, ChevronLeft } from 'lucide-vue-next'

defineProps({
  crumbs: { type: Array, default: () => [] },
  showFilter: { type: Boolean, default: false },
  showBack: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle-filter', 'back'])
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <button
        v-if="showBack"
        type="button"
        class="btn btn-ghost topbar-back"
        @click="emit('back')"
      >
        <ChevronLeft :size="14" :stroke-width="1.75" />
        Retour
      </button>
      <div class="breadcrumb">
        <template v-for="(c, i) in crumbs" :key="i">
          <span class="breadcrumb-item" :class="{ 'is-current': i === crumbs.length - 1 }">{{ c }}</span>
          <span v-if="i < crumbs.length - 1" class="breadcrumb-sep">/</span>
        </template>
      </div>
    </div>
    <div class="topbar-actions">
      <button v-if="showFilter" type="button" class="btn btn-ghost" @click="emit('toggle-filter')">
        <SlidersHorizontal :size="14" :stroke-width="1.75" />
        Filtrer
      </button>
      <slot name="actions" />
    </div>
  </header>
</template>
