# Brief DEV — ILU-129 : Refonte design IDEAS_STUDIO (cible Linear)

**De** : A - Jony Ive (Design Director)
**À** : DEV - Ideas.Studio
**Source** : ILU-129 + maquettes v2 validées Guillaume (O, 2026-04-17)
**Statut** : handoff prêt — implémenter dans `app/src/`

---

## Sources de vérité (dans cet ordre)

1. **`design/tokens.md` v0.2** — tokens canoniques. **Source de vérité des valeurs** (couleurs hex, sizes, radius, font stack, spacing). Ne pas extraire les valeurs depuis le HTML Stitch — l'importer depuis ce fichier comme `:root { --bg-app: #08090A; ... }`.
2. **`design/stitch/ILU-129-refonte-linear-v2/`** — référence visuelle (layout, composition). Screenshots = source de vérité du **rendu attendu**. HTML Stitch = source d'**inspiration structurelle uniquement** (peut contenir du code à jeter, pas à copier-coller).
3. **`design/stitch/ILU-129-refonte-linear-v2/design_review_ILU-129_v2.md`** — checklist des 6 règles Linear + finitions.

---

## Scope

Refondre entièrement les 2 vues existantes :
- `app/src/views/Dashboard.vue`
- `app/src/views/IdeaDetail.vue`
- `app/src/App.vue` (chrome global : header, sidebar, layout app-shell)
- `app/src/style.css` (tokens globaux)

**Out of scope** (ne pas toucher) :
- `app/src/api.js`, `app/src/stores/`, `app/src/data/ideas.json` — logique métier intacte
- Backend SQLite, endpoints API
- Command palette ⌘K fonctionnelle (v1.1, juste le bouton chrome en v1)
- Raccourcis clavier J/K navigation rows (v1.1)

---

## Tokens CSS à injecter dans `style.css` (extrait minimal)

```css
:root {
  /* Background */
  --bg-app: #08090A;
  --bg-elevated: #0F1011;
  --bg-hover: #16181C;
  --bg-active: #1C1E23;

  /* Borders */
  --border-subtle: rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.10);

  /* Text */
  --text-primary: #F7F8F8;
  --text-secondary: #B4BCD0;
  --text-muted: #6E7177;
  --text-faint: #4C4F55;

  /* Accent Linear indigo */
  --accent: #5E6AD2;
  --accent-hover: #6872D9;
  --accent-muted: rgba(94,106,210,0.12);

  /* Status */
  --status-nouveau: #8B8D97;
  --status-en-etude: #5E6AD2;
  --status-en-attente: #F2994A;
  --status-acceptee: #26B57F;
  --status-rejetee: #EB5757;
  --status-publiee: #26B57F;
  --status-abandonnee: #EB5757;

  /* Category dots (7) */
  --cat-print-on-demand: #F4A261;
  --cat-youtube: #EB5757;
  --cat-micro-saas: #5E6AD2;
  --cat-kdp: #26B57F;
  --cat-services: #9B51E0;
  --cat-apps: #2F80ED;
  --cat-games: #F2C94C;

  /* Metrics */
  --sidebar-width: 240px;
  --detail-sidebar-width: 280px;
  --detail-main-max-width: 720px;
  --row-height: 36px;
  --status-icon-size: 14px;
  --category-dot-size: 8px;
  --radius: 8px;
  --radius-sm: 4px;

  /* Typography */
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
  --label-uppercase: 11px;
  --body: 13px;
  --h1: 20px;
  --h2: 15px;
}
```

(Valeurs complètes dans `design/tokens.md` §1-6. Copier intégralement, pas cet extrait.)

---

## Dépendances à ajouter

```bash
pnpm add lucide-vue-next
```

Font Inter via Google Fonts dans `index.html` ou self-hosted (au choix DEV, pas critique).

**Whitelist Lucide icons à utiliser** (tokens.md §9) — importer UNIQUEMENT ces icônes :
- `Circle` (status Nouveau)
- `CircleDashed` (status En étude)
- `CheckCircle2` (status Acceptée + Publiée)
- `XCircle` (status Rejetée)
- `Send` (status Publiée alt, si besoin distinction)
- `Pause` (status En attente)
- `Ban` (status Abandonnée)
- `Search`, `SlidersHorizontal` (chrome)
- `ChevronLeft`, `ChevronRight` (Prev/Next detail)
- `Star` (❌ **interdit** — pas de rating étoiles)

---

## Composants à créer

```
app/src/components/
├── AppShell.vue        # layout 2-col : sidebar left 240px + main grow
├── Sidebar.vue         # nav compact Linear : wordmark, workspace sections, catégories dots, avatar bas
├── TopBar.vue          # breadcrumb + actions header (Search ⌘K, + New, Filter)
├── StatusGlyph.vue     # <span class="status-glyph status-<key>"> avec <Circle/CircleDashed/...> 14px
├── CategoryDot.vue     # dot 8px round-full couleur via --cat-{key}
├── IdeaRow.vue         # row dashboard fluide : [dot cat][glyph status][titre][meta right]
├── PropertyRow.vue     # row rail detail : label 11px uppercase muted + value right
└── ProcessStep.vue     # badge 01-06 indigo + titre + description (section process detail)
```

---

## Dashboard.vue — rewrite spec

### Chrome global (via AppShell + TopBar)
- Header : breadcrumb `Ideas Studio / All` (text-muted avec `/`) + actions droite : `[Search ⌘K]` compact, `[+ New]` compact primary, `[Filter]` avec icône `SlidersHorizontal`.
- **Supprimer** : H1 "Dashboard", input search long, 5 selects filtres inline, pills catégories horizontales top.

### Contexte liste (au-dessus des rows)
- Une seule ligne subtile : `{{ filteredIdeas.length }} IDEAS · SORT BY {{ sortLabel }}` en `text-muted 11px uppercase`.
- **Pas de header row** `STATUT | NOM | CATÉGORIE | ...`.

### Row composition (fluid flex, height 36px)
```
[CategoryDot 8px] [StatusGlyph 14px] [Titre idée flex:1 text-primary 13px] 
  [Revenu $X/mo text-secondary 12px]
  [Invest €X text-secondary 12px]
  [Délai X days text-secondary 12px]
  [Type Passif/Actif text-secondary 12px]
  [Rating numérique 4.8 text-secondary 12px]
```
- Séparateurs verticaux subtils `1px solid var(--border-subtle)` entre groupes de meta à droite (optionnel, tolérance).
- Hover : `bg-hover`.
- Click → router.push `/idea/${id}`.

### Filter popover (bouton `Filter`)
- Popover flottant ouvert par click, contenant les 4 filtres actuels : difficulté, passif/actif, statut, sort.
- **Plus de selects inline** dans la page.
- Catégorie reste filtrée via sidebar (click sur catégorie = `categoryFilter = key`).

### Interdits (récap règle)
- ❌ Étoiles rating (`Star` icon, entities `&#9733;`)
- ❌ Pills catégorie rectangulaires avec background
- ❌ Pills status avec background
- ❌ Header `<thead>` UPPERCASE
- ❌ Table `<table>` CSS-classique → utiliser `<div>` flex rows

---

## IdeaDetail.vue — rewrite spec

### Layout 2 colonnes
```
┌─────────────────────────────────────────┬─────────────────────┐
│ MAIN COLUMN (max-width 720px)           │ PROPERTIES RAIL     │
│                                         │ (width 280px)       │
│ [Breadcrumb]                            │                     │
│ [H1 Titre idée]                         │ PROPERTIES          │
│ [Description]                           │ Status   [glyph X]  │
│                                         │ Catégorie [dot X]   │
│ § Étude de faisabilité                  │ Revenu   $X/mo      │
│   [CheckCircle2 inline] Acceptée        │ Invest   €X         │
│   • Marché : saturé [text-green Oui]    │ Délai    X days     │
│   • Tech stack : maîtrisé               │ Type     Passif     │
│   • Différenciation                     │ Difficulté [3/5 bar]│
│   • Budget                              │ Rating   4.6        │
│                                         │ Tags     [dots]     │
│ § Process par étape                     │ Tutoriel YouTube →  │
│   [01 badge indigo] Titre               │ Créée le 2026-04-10 │
│     description                         │                     │
│   [02] ...                              │ [Prev] [Next]       │
│                                         │                     │
│ § Brief de projet                       │                     │
│   [textarea ou markdown rendered]       │                     │
│                                         │                     │
│ § Commentaires                          │                     │
│   [Avatar G] Guillaume · date           │                     │
│   body markdown                         │                     │
└─────────────────────────────────────────┴─────────────────────┘
```

### Spécificités

- **Breadcrumb** : `Ideas Studio / {{ catégorie }} / {{ titre idée }}` en text-muted avec `/`.
- **H1** : 20px bold (`tokens.md §3`), pas de hero/banner.
- **§ Étude de faisabilité inline** (PAS de card) : `CheckCircle2 16px green` + `Acceptée` en `color: var(--status-acceptee)`, suivi d'une grille 2 colonnes × 2 rangées `•` + label + valeur. Zéro pill, zéro fond.
- **§ Process par étape** : 6 items max, badge `01`-`06` en `bg-accent-muted + color-accent + radius-sm + 24px square`, titre gras + description.
- **§ Brief** : label "Brief de projet" + textarea ou rendered markdown, bordure subtle + radius + padding 16px. Un seul bloc.
- **§ Commentaires** : même pattern que Brief, avatar lettre (première lettre du nom user) 24px circle + nom + timestamp + body markdown.
- **Rail Properties (droite, 280px)** :
  - Header `PROPERTIES` 11px uppercase muted.
  - Chaque property = flex row avec `label 11px uppercase muted` gauche + `value 13px` droite.
  - `Status` : `StatusGlyph + "{{ label }}"` color-coded **sans fond ni border-radius** (flex-row pur — c'est la finition explicite de la review v2 §⚠️#1).
  - `Catégorie` : `CategoryDot + "{{ label }}"`.
  - `Difficulté` : `"{{ difficulty }}/5"` + micro-bar 40×3px (`bg-bg-elevated` + fill `bg-accent` à X/5).
  - `Rating` : valeur numérique seule (ex `4.6`), **pas d'étoiles**.
  - `Tags` : liste de dots 8px couleur catégorie + label en pills subtils `bg-elevated + border-subtle + radius-sm + padding 2px 6px + font 11px`.
  - `Tutoriel` : si `idea.tutorial` existe, afficher `YouTube →` link en accent.
  - `Créée le` : date ISO → format `YYYY-MM-DD`.
  - En bas du rail : boutons `Prev idea` / `Next idea` avec `ChevronLeft` / `ChevronRight`, navigue dans `filteredIdeas`.

### Responsive
- Viewport ≥ 1280px : layout 2-col comme décrit.
- Viewport < 1024px : rail Properties bascule en **collapse** au-dessus du main content (pas de scroll side-by-side sur mobile).

### Interdits (récap)
- ❌ 9 cards empilées `bg-elevated + border-subtle` répétées.
- ❌ Étoiles rating.
- ❌ Badges/pills status avec background.
- ❌ Section "Étude de faisabilité" dans une card séparée avec pill rectangulaire.

---

## App.vue / Sidebar — spec

### Sidebar 240px (fixed left)
```
┌─────────────────────────┐
│ [Ideas Studio] wordmark │  14px bold + version/role 11px muted
│ Professional Catalog    │
├─────────────────────────┤
│ [🔍 Search ⌘K]          │  bouton compact
│                         │
│ WORKSPACE (11px upper)  │
│ › Inbox         294     │  clickable, counts right
│ › My Ideas      N       │
│ › Favorites     N       │
│                         │
│ CATEGORIES              │
│ ● Print on Demand  42   │  dot 8px + label + count right
│ ● YouTube / Video  38   │
│ ● Micro-SaaS       56   │
│ ● Livres KDP       31   │
│ ● Services         28   │
│ ● Apps Mobiles     24   │
│ ● Jeux Enfants PERIPLO 8│
│                         │
│ SYSTEM                  │
│ › Feasibility           │
│ › Archive               │
│ › Settings              │
├─────────────────────────┤
│ [G] Guillaume           │  avatar letter + name, bottom
└─────────────────────────┘
```

- Items nav : height 28px, padding 6px 12px, radius 4px, hover `bg-hover`, active `bg-active + border-left 2px accent`.
- Counts à droite en `text-muted 11px`.
- Category click = `categoryFilter = key` (persisté via router query ou store).

---

## Migration routing & state

- Router actuel (`/` → Dashboard, `/idea/:id` → IdeaDetail) inchangé.
- `categoryFilter` / `search` / `sortBy` peuvent être remontés dans un store Pinia ou query params (au choix DEV).
- Navigation Prev/Next detail : calculer `prevId` / `nextId` depuis la liste filtrée (respect du filtre courant).

---

## Tests manuels attendus (avant PR)

1. Dashboard avec 294 rows scroll smooth, hover visible, click row ouvre detail.
2. Sidebar categories : click filtre la liste, compte à droite cohérent.
3. Search ⌘K bouton visible (non-fonctionnel accepté v1, juste chrome).
4. Filter popover ouvre/ferme, change filters, reflète dans la liste.
5. IdeaDetail ouvert sur 3 idées au hasard :
   - rail Properties droite affiche les 11 rows,
   - Status + Catégorie rendus avec glyph/dot + label (pas de pill),
   - Difficulté affiche `X/5` + micro-bar,
   - Rating affiche nombre sans étoile,
   - Prev/Next navigue dans la liste filtrée.
6. Responsive : <1024px le rail Properties collapse.
7. Zéro étoile `★` dans tout le DOM rendu (grep dans HTML généré).
8. Zéro pill rectangulaire pour status ni catégorie (inspection visuelle + CSS).

---

## Finition spécifique de la review v2 (à ne pas oublier)

**#1 Rail Properties — ligne STATUS** : rendu `flex-row` simple (`StatusGlyph` + `span color: var(--status-X)`). **Aucun** `background`, `border`, `border-radius` ou `padding` sur la ligne elle-même. C'est la dérive pointée en review v2 §⚠️, à fixer proprement.

**#2 Section "Étude de faisabilité"** : remplacer le badge vert "Acceptée" à côté du titre par `CheckCircle2 16px green + "Acceptée" en text-green` inline, sans fond.

---

## Non-goals

- ❌ Command palette ⌘K fonctionnelle (v1.1)
- ❌ Raccourcis J/K navigation rows (v1.1)
- ❌ Hover row preview popover (v1.1)
- ❌ Sparkline revenu (v1.1)
- ❌ Refonte API / SQLite / migrations
- ❌ Tests unitaires obligatoires (nice-to-have seulement)

---

## Définition terminé

- 2 vues (Dashboard + IdeaDetail) rendues conformes aux screenshots v2.
- 8 tests manuels ci-dessus passent.
- Zéro étoile, zéro pill status, zéro pill catégorie, zéro header row, zéro H1 "Dashboard".
- PR ouverte avec screenshots before/after.
- Paperclip subtask status → `in_review` (handoff review design).
- **A - Jony Ive** valide visuellement avant merge.
- **Seul Guillaume** ferme la subtask et le parent ILU-129 (cf `NO_SHORTCUT_GUILLAUME.md`).

---

_Brief produit par A - Jony Ive, 2026-04-17, après O Guillaume sur maquettes v2._
