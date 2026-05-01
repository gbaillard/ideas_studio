export const CATEGORY_LABELS = {
  'print-on-demand': 'Print on Demand',
  'youtube': 'YouTube / Video',
  'micro-saas': 'Micro-SaaS',
  'kdp': 'Livres KDP',
  'services': 'Services / Freelance',
  'apps': 'Apps Mobiles',
  'games': 'Jeux Enfants PERIPLO',
}

export const STATUS_LABELS = {
  'nouveau':    'Nouveau',
  'en-etude':   'En étude',
  'en-attente': 'En attente',
  'acceptee':   'Acceptée',
  'publiee':    'Publiée',
  'rejetee':    'Rejetée',
  'abandonnee': 'Abandonnée',
}

export const STATUS_KEYS = Object.keys(STATUS_LABELS)

export function resolveStatus(idea, statusMap) {
  const saved = statusMap?.[idea.id]
  if (saved) return saved === 'en-cours' ? 'en-etude' : saved
  if (idea?.feasibility?.verdict === 'acceptee') return 'acceptee'
  if (idea?.feasibility?.verdict === 'rejetee') return 'rejetee'
  return 'nouveau'
}

export function formatMoney(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.0', '') + 'K'
  return String(n)
}
