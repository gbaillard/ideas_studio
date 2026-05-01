<script setup>
defineProps({
  label: { type: String, required: true },
  multiline: { type: Boolean, default: false },
})
</script>

<template>
  <div class="property-row" :class="{ 'is-multiline': multiline }">
    <div class="property-label">{{ label }}</div>
    <div class="property-value" :class="{ 'is-wrap': multiline }">
      <slot />
    </div>
  </div>
</template>
