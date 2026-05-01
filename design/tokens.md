# IDEAS_STUDIO — Design Tokens (Linear-inspired)

> Source d'inspiration : [linear.app](https://linear.app). Dérivés pour un **catalogue d'idées business** desktop-first. Ces tokens deviennent canoniques (cf `DESIGN_TOOL_REVIEW.md §6`) après validation.

## 1. Color mode

**Dark mode principal**, light mode non prioritaire en phase 1. Fond très sombre, contraste maîtrisé (pas de pur noir, pas de pur blanc).

## 2. Palette

### Backgrounds (du plus bas au plus haut)
| Token | Value | Usage |
|---|---|---|
| `--bg-app` | `#08090A` | Canvas global (body) |
| `--bg-surface` | `#0F1011` | Sidebar, header |
| `--bg-elevated` | `#17181C` | Cards, modals, popovers |
| `--bg-hover` | `rgba(255,255,255,0.04)` | Row/button hover |
| `--bg-active` | `rgba(255,255,255,0.06)` | Row active, selected |

### Borders
| Token | Value | Usage |
|---|---|---|
| `--border-subtle` | `rgba(255,255,255,0.06)` | Dividers, table rows |
| `--border-default` | `rgba(255,255,255,0.10)` | Cards, inputs |
| `--border-focus` | `#5E6AD2` | Focus rings |

### Text
| Token | Value | Usage |
|---|---|---|
| `--text-primary` | `#E6E8EB` | Titres, body primaire |
| `--text-secondary` | `#8B8F98` | Meta, labels, descriptions |
| `--text-muted` | `#6C707D` | Hints, placeholders |
| `--text-disabled` | `#3A3E48` | Disabled |

### Accent (Linear-esque indigo)
| Token | Value | Usage |
|---|---|---|
| `--accent` | `#5E6AD2` | Primary action, focus, link |
| `--accent-hover` | `#6E7ADD` | Hover primary button |
| `--accent-subtle` | `rgba(94,106,210,0.12)` | Backgrounds d'état selected |

### Status (états business)
| Token | Value | Usage |
|---|---|---|
| `--status-success` | `#4CB782` | Acceptee, Publiee |
| `--status-warning` | `#F2994A` | En attente |
| `--status-danger` | `#EB5757` | Rejetee, Abandonnee |
| `--status-info` | `#5E6AD2` | En etude |
| `--status-neutral` | `#8B8F98` | Nouveau |

### Category accents (pour badges discrets, NON pour fonds pleins)
| Catégorie | Color |
|---|---|
| `print-on-demand` | `#4CB782` |
| `youtube` | `#EB5757` |
| `micro-saas` | `#5E6AD2` |
| `kdp` | `#F2994A` |
| `services` | `#3B82F6` |
| `apps` | `#A855F7` |
| `games` | `#EC4899` |

Usage : badge = background `color @ 12%` + foreground `color @ 100%`. Jamais de fond plein saturé.

## 3. Typographie

**Font family** : `'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`.
Fallback chargé via `fontsource` ou Google Fonts (validation Guillaume avant ajout de dep).

**Features** : `font-feature-settings: 'cv11', 'ss01', 'ss03'` (optionnel).

### Échelle
| Token | Size | Line-height | Weight | Letter-spacing |
|---|---|---|---|---|
| `--text-h1` | `20px` | `28px` | `600` | `-0.01em` |
| `--text-h2` | `16px` | `24px` | `600` | `-0.005em` |
| `--text-h3` | `13px` | `18px` | `600` | `0` |
| `--text-body` | `13px` | `20px` | `400` | `0` |
| `--text-meta` | `12px` | `16px` | `400` | `0` |
| `--text-label` | `11px` | `14px` | `500` | `0.01em` uppercase |
| `--text-code` | `12px` | `18px` | `400` mono | `0` |

**Monospace** : `'JetBrains Mono', 'SF Mono', Menlo, monospace` pour IDs techniques uniquement.

## 4. Spacing

Base **4px**. Échelle : `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64`.
Tokens : `--space-1` à `--space-16`.

### Densité
- **Table row height** : `36px` (dense, Linear-like)
- **Sidebar item height** : `28px`
- **Button height** : `28px` (sm), `32px` (md), `36px` (lg)
- **Input height** : `32px`
- **Header height** : `48px`
- **Sidebar width** : `240px` (collapsible à `56px`)

## 5. Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, pills, small chips |
| `--radius-md` | `6px` | Buttons, inputs |
| `--radius-lg` | `8px` | Cards, modals |
| `--radius-xl` | `12px` | Large containers |

Pas de `border-radius: 9999px` sauf avatars ronds.

## 6. Shadows & elevation

Minimal. Linear évite les gros drop-shadows.

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Button hover |
| `--shadow-md` | `0 4px 8px rgba(0,0,0,0.4)` | Popovers, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modals, command palette |

## 7. Motion

| Token | Value | Usage |
|---|---|---|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default |
| `--dur-fast` | `80ms` | Hover, focus |
| `--dur-base` | `120ms` | Transitions UI |
| `--dur-slow` | `200ms` | Modals, page transitions |

Règle : aucune animation > 300ms. Pas de bounce, pas d'élastique.

## 8. Composants clés (guidelines)

### Sidebar (gauche, 240px)
- Fond `--bg-surface`
- Logo compact en haut (`20px h1`)
- Items : icon 14px + label 13px, hauteur 28px, padding horizontal 8px, radius 6px
- État hover : `--bg-hover`
- État actif : `--bg-active` + indicateur gauche 2px accent
- Sections : `label uppercase 11px #6C707D`

### Header (top, 48px)
- Fond `--bg-surface`, border-bottom `--border-subtle`
- Breadcrumb ou titre de page à gauche, actions à droite
- Search inline (ghost input, trigger Cmd+K)

### Table (dashboard 294 idées)
- Row height **36px**, border-bottom `--border-subtle`
- Header sticky, uppercase label 11px `--text-muted`
- Hover row : `--bg-hover` + cursor pointer
- Pas d'alternance zebra (Linear ne le fait pas)
- Colonnes denses, padding horizontal 12px

### Badges
- Radius 4px, padding `2px 6px`, font 11px/500
- Background `color @ 12%`, text `color @ 100%`
- Pas de border, pas de shadow

### Buttons
- **Primary** : background `--accent`, text `#FFF`, height 28px, radius 6px, padding 0 12px
- **Secondary (ghost)** : background transparent, border `--border-default`, text `--text-primary`, hover `--bg-hover`
- **Icon** : 28x28px, hover `--bg-hover`

### Inputs
- Height 32px, padding 0 10px, radius 6px
- Background `--bg-elevated`, border `--border-default`
- Focus : border `--accent`, ring `0 0 0 3px rgba(94,106,210,0.24)`
- Placeholder `--text-muted`

### Command palette (Cmd+K) — recommandé
- Modal centré, max-width 560px
- Background `--bg-elevated` + blur overlay
- Liste résultats dense (row 32px), item actif `--bg-active`
- À proposer comme enhancement post-v1 si budget

## 9. Iconographie

- **Lucide** recommandé (zero-dep bundle sélectif via `@iconify/vue` ou copy SVG inline).
- Taille standard 14px (inline), 16px (buttons), 20px (larger actions).
- Stroke width 1.75px, `currentColor`.
- **Interdit** : Material Symbols, Font Awesome, emojis décoratifs (remplacer tous les `&#X;` actuels par Lucide).

## 10. Focus & accessibilité

- Focus visible **obligatoire** : `outline: 2px solid var(--accent); outline-offset: 2px`
- Contraste WCAG AA min : `--text-secondary` sur `--bg-app` = 7.1:1 (OK)
- Keyboard nav complète (sidebar, filtres, table rows, command palette)
- Skip link en haut de page

## 11. Principes à respecter

1. **Dense, pas cluttered** — 294 idées sur une table scrollable > grille cards.
2. **Keyboard-first** — Cmd+K, flèches pour naviguer la table, `/` pour focus search.
3. **Pas de fluff** — zero gradient, zero glassmorphism, zero emoji décoratif.
4. **Cohérence** — 1 seul accent color, 5 status colors, 7 category colors. Pas d'improvisation ad-hoc.
5. **Typographie = hiérarchie** — pas de bold gratuit, pas de 10 tailles différentes.

---

_Version 0.1 — à valider avec Guillaume avant implémentation DEV. Tokens canoniques une fois validés._

---

## v0.2 — Corrections Linear-authentic (post-review Guillaume, 2026-04-17)

### Status : glyphes inline, pas de pills

Dans Linear, le statut est une **icône 14px + label coloré**, jamais un rectangle avec fond. Sur IDEAS_STUDIO :

| Statut | Lucide icon | Couleur | Notes |
|---|---|---|---|
| `nouveau` | `Circle` (stroke seul) | `--text-secondary` `#8B8F98` | cercle vide |
| `en-etude` | `CircleDashed` | `--status-info` `#5E6AD2` | cercle pointillé |
| `en-attente` | `Pause` (dans cercle) ou `Clock` | `--status-warning` `#F2994A` | — |
| `acceptee` | `CheckCircle2` | `--status-success` `#4CB782` | rempli |
| `publiee` | `Send` | `--status-success` `#4CB782` | — |
| `rejetee` | `XCircle` | `--status-danger` `#EB5757` | rempli |
| `abandonnee` | `Ban` | `--text-muted` `#6C707D` | — |

```css
--status-icon-size: 14px;
--status-icon-stroke: 1.75;
/* color: héritée du status */
```

**Règle stricte** : pas de `background-color` sur les badges status. Juste `icon + label`. Le label adopte la même couleur que l'icône (optionnellement légèrement atténué si trop saturé).

### Category : dot 8px inline, pas de pill rectangulaire

```css
--category-dot-size: 8px;
--category-dot-gap: 8px; /* margin-right entre dot et label */
```

Pattern inline : `● Print on Demand` où le dot prend la couleur de catégorie (`--cat-print-on-demand: #4CB782`, etc.), label en `--text-primary`.

**Règle stricte** : supprimer les badges rectangulaires `background: color @ 12%` pour les catégories. Uniquement dot + label.

### Rating : pas d'étoiles

Les étoiles `★` sont un pattern e-commerce, non utilisé par Linear. Remplacer par :

**Option A (privilégiée)** : note numérique discrète `4.8` en `--text-secondary` 12px, alignée à droite.

**Option B** : micro bar `40px × 3px`, fill `--accent`, track `--border-default`. Radius 2px. À privilégier si on veut conserver une affordance visuelle comparative.

### IdeaDetail : layout 2-colonnes (main + right properties)

```css
--detail-sidebar-width: 280px; /* right panel properties */
--detail-main-max-width: 720px; /* corps principal */
--detail-column-gap: 32px;
```

**Structure** :
- **Main column** (flex-grow, max 720px) : H1 + description + Faisabilité (étude) + Process + Brief + Commentaires. C'est le contenu narratif/éditable.
- **Right sidebar** (280px sticky top 48px) : bloc "Properties" avec rows `label gray uppercase 11px` + `value 13px avec icône/dot`. Champs : Status, Category, Priority (si un jour), Revenue, Invest, Delai, Type (Passif/Actif), Difficulty, Tags, Feasibility verdict, Tutorial (lien YouTube si dispo). Exactement comme le panel Properties de Linear.
- Les "Outils nécessaires" + "Plateformes de vente" + "Pourquoi cette idée" **ne sont plus des cards empilées** — soit intégrés dans la right sidebar comme chips compacts, soit inline dans le main (section Process).

### Table/list dashboard : layout fluide, pas de column headers

**Structure d'une row** (hauteur 36px) :
```
[status-icon 14px] [titre idée grow] [category-dot + label] [meta right-aligned muted 12px: revenue · invest · delai · type · rating]
```

**Pas de** `<thead>` avec labels uppercase. **Pas de** borders verticaux entre colonnes. Séparateur horizontal subtil `--border-subtle` uniquement.

Les metadata de droite s'alignent visuellement grâce à des largeurs fixes (revenue 80px, invest 60px, delai 60px, type 50px, rating 40px) mais sans header visible.

### Header dashboard allégé

- **Supprimer H1 "Dashboard"** — le breadcrumb + la sidebar active suffisent.
- **Breadcrumb** : `Ideas Studio / All` (ou le nom de la catégorie active). Pas de `> All ideas`.
- **Search visible → bouton icône** `⌘K Search` (kbd hint), trigger de command palette.
- **"+ New idea" → "+ New"** ou icône-only `+` avec tooltip.

### Filtres : popover unique, pas 3 dropdowns inline

Remplacer les 3+ `<select>` inline par un seul bouton `Filter` (icône `SlidersHorizontal`) qui ouvre un popover avec :
- Difficulté (slider ou radio)
- Type (Passif / Actif / Tous)
- Statut (multi-select)
- Sort by

Pattern Linear "View Options" popover.

### Pills catégories top : suppression totale

Le filtre catégorie passe **exclusivement** par la sidebar gauche. Pas de ligne horizontale de pills sous le header.

### Lucide icons à importer explicitement

Liste blanche pour le bundle :
`Circle`, `CircleDashed`, `CheckCircle2`, `XCircle`, `Send`, `Pause`, `Ban`, `Search`, `Plus`, `SlidersHorizontal`, `Settings`, `ChevronRight`, `ChevronLeft`, `Download`, `FileText`, `MessageSquare`, `ExternalLink`, `Hash`, `Command`.

Importer via `lucide-vue-next` (zero-dep lourde : la lib est tree-shakable). À valider comme seule nouvelle dep front.

---

_Version 0.2 — intègre les 6 écarts identifiés par Guillaume. Source de vérité pour DEV._

