<script setup>
import Sidebar from './Sidebar.vue'

defineProps({
  categoryFilter: { type: String, default: '' },
})

const emit = defineEmits(['update:categoryFilter', 'open-search'])
</script>

<template>
  <div class="app-shell">
    <Sidebar
      :category-filter="categoryFilter"
      @update:category-filter="emit('update:categoryFilter', $event)"
      @open-search="emit('open-search')"
    />
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>
