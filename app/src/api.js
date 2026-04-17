const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export const api = {
  // Statuses
  getAllStatuses: () => request('/statuses'),
  getStatus: (id) => request(`/ideas/${id}/status`),
  setStatus: (id, status) => request(`/ideas/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Comments
  getComments: (id) => request(`/ideas/${id}/comments`),
  addComment: (id, text, date) => request(`/ideas/${id}/comments`, { method: 'POST', body: JSON.stringify({ text, date }) }),
  deleteComment: (id, commentId) => request(`/ideas/${id}/comments/${commentId}`, { method: 'DELETE' }),

  // Brief notes
  getBrief: (id) => request(`/ideas/${id}/brief`),
  addBriefNote: (id, text, author, date) => request(`/ideas/${id}/brief`, { method: 'POST', body: JSON.stringify({ text, author, date }) }),
  deleteBriefNote: (id, noteId) => request(`/ideas/${id}/brief/${noteId}`, { method: 'DELETE' }),

  // Feasibility
  getFeasibility: (id) => request(`/ideas/${id}/feasibility`),
  setFeasibility: (id, data) => request(`/ideas/${id}/feasibility`, { method: 'PUT', body: JSON.stringify(data) }),

  // Export
  exportIdea: (id) => request(`/ideas/${id}/export`),

  // Migration
  migrate: (ideas) => request('/migrate', { method: 'POST', body: JSON.stringify({ ideas }) }),
}
