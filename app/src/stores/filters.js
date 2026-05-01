import { reactive } from 'vue'

export const filters = reactive({
  search: '',
  category: '',
  difficulty: '',
  passive: '',
  status: '',
  ratingMin: '',
  sortBy: 'rating',
})

export function resetFilters() {
  filters.search = ''
  filters.category = ''
  filters.difficulty = ''
  filters.passive = ''
  filters.status = ''
  filters.ratingMin = ''
  filters.sortBy = 'rating'
}

export function hasActiveFilters() {
  return !!(filters.search || filters.category || filters.difficulty || filters.passive || filters.status || filters.ratingMin)
}
