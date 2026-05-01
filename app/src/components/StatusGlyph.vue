<script setup>
import { computed } from 'vue'
import { Circle, CircleDashed, CheckCircle2, XCircle, Send, Pause, Ban } from 'lucide-vue-next'
import { STATUS_LABELS } from '../constants.js'

const props = defineProps({
  status: { type: String, required: true },
  size: { type: Number, default: 14 },
  showLabel: { type: Boolean, default: true },
})

const iconMap = {
  'nouveau':    Circle,
  'en-etude':   CircleDashed,
  'en-attente': Pause,
  'acceptee':   CheckCircle2,
  'publiee':    Send,
  'rejetee':    XCircle,
  'abandonnee': Ban,
}

const icon = computed(() => iconMap[props.status] || Circle)
const label = computed(() => STATUS_LABELS[props.status] || props.status)
</script>

<template>
  <span class="status-glyph" :class="`status-${status}`">
    <component :is="icon" class="status-icon" :size="size" :stroke-width="1.75" />
    <span v-if="showLabel" class="status-glyph-label">{{ label }}</span>
  </span>
</template>
