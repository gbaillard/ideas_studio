# Design Review — ILU-129

**Ticket** : ILU-129 — Refonte design IDEAS_STUDIO inspirée de Linear
**Outil** : Stitch MCP
**Projet Stitch** : `projects/17029594748295728185`
**Design system** : `assets/11846693718476222534` (Ideas Studio — Linear Dark)
**Artefacts** :
- `design/tokens.md` (tokens canoniques)
- `design/stitch/ILU-129-refonte-linear/maquette-dashboard.html`
- `design/stitch/ILU-129-refonte-linear/screenshot-dashboard.png`
- `design/stitch/ILU-129-refonte-linear/maquette-detail.html`
- `design/stitch/ILU-129-refonte-linear/screenshot-detail.png`

---

## Contexte produit

IDEAS_STUDIO = catalogue pro de 294 idées business pour **Guillaume solopreneur**. Target : outil de productivité à la Linear, dense, keyboard-first, professionnel. Les **red flags "HTML/web-style" de DESIGN_TOOL_REVIEW.md ne s'appliquent pas ici** (cadrage kids/game) — au contraire, le look B2B-SaaS sobre est la **cible** explicite du brief Guillaume.

---

## Scores (AUDIT_FRAMEWORK, 1-5 par axe)

### Maquette 1 — Dashboard

- **Visual Consistency : 4/5** — Respect presque total de la palette tokens (bg app, bg surface, accent indigo, borders subtils, typo Inter). Légères dérives : les pills de filtre (Print on Demand, YouTube, etc.) sont tous colorés et forment une ligne horizontale redondante avec la sidebar qui liste déjà les mêmes catégories avec des dots.
- **Usability : 5/5** — Sidebar 240px, nav compacte, search avec raccourci `/`, bouton `Cmd+K`, bouton primary `+ New idea`, colonnes sticky header avec labels 11px uppercase, lignes 36px denses. Très proche de la UX Linear.
- **Cognitive Load : 4/5** — Densité maîtrisée pour 294 lignes. La duplication pills catégorie vs sidebar crée un micro-doublon de contrôle. Le label "294 ideas" est bon anchor. Une colonne supplémentaire (CATEGORY en plus de la sidebar filtrée) est redondante si on filtre via sidebar — à arbitrer.
- **Tone & Suitability : 5/5** — Exactement le ton Linear attendu : sobre, pro, dense, zéro fluff, zéro emoji, focus data. Le look "cockpit solopreneur" est atteint.

### Maquette 2 — IdeaDetail

- **Visual Consistency : 3/5** — Stitch a **créé un second design system ad-hoc** ("Ideas Studio Linear", asset `4fb1ebc23a324340bd09c41de2d5aadb`) avec des tokens qui divergent du DS canonique : surface `#121315` au lieu de `#08090A`, `ROUND_FOUR` au lieu de `ROUND_EIGHT`, palette Indigo Material générée automatiquement. Visuellement proche mais pas aligné au pixel près. **À corriger en impl : DEV utilise `design/tokens.md`, pas le DS Stitch de la maquette 2.**
- **Usability : 5/5** — Sections bien hiérarchisées (Faisabilité → Pourquoi → Process → Outils → Plateformes → Tags → Brief → Commentaires → Prev/Next), breadcrumb clair, status pill + actions contextuelles en header, textareas propres, boutons cohérents.
- **Cognitive Load : 4/5** — Page longue mais chaque section = card plate cohérente, spacing 24px entre cards respire bien. Section "Pourquoi cette idée" avec 3 colonnes et progress bars est scannable. Le seul point : les 2 sections "Brief" et "Commentaires" quasi identiques en structure pourraient être visuellement différenciées (icône + couleur accent différente) pour éviter la confusion.
- **Tone & Suitability : 5/5** — Même ton pro-tool. Avatars simples (lettre G), markdown rendering, code fence dans un commentaire — parfait pour l'usage réel.

---

## ✅ Ce qui fonctionne

- **Sidebar** : structure Linear-parfaite — wordmark compact, sections uppercase 11px, nav items 28px, counters alignés à droite, avatar + gear en bas.
- **Palette** : dark mode cohérent, accent indigo #5E6AD2 utilisé avec parcimonie (primary button, row active, focus), status colors lisibles sur fond sombre.
- **Typographie** : Inter tight letter-spacing, hiérarchie par weight + size, labels uppercase 11px — respecte `tokens.md §3`.
- **Table dashboard** : row height 36px, no zebra, header sticky uppercase muted, badges status/category @12% bg + 100% fg — conforme §2 et §8 tokens.
- **Detail page cards** : pattern `bg-elevated + border-subtle + radius 8px + padding 16px` répété 9 fois → cohérence forte. Progress bars 3px, scale numérique discrète.
- **Prev/Next navigation** : pattern Linear issue nav reproduit fidèlement.
- **Status badges** : 6 états visibles (Acceptée, En étude, Nouveau, En attente, Rejetée, Publiée) avec bonnes couleurs et lisibilité.

## ⚠️ À améliorer (non-bloquant pour handoff DEV)

- **WHAT** : Maquette 2 utilise un DS Stitch auto-généré distinct du DS canonique.
  **WHY** : risque de dérive tokens (surface #121315 vs #08090A, radius 4 vs 8) si DEV implémente en copiant la maquette plutôt qu'en appliquant `tokens.md`.
  **HOW** : dans le handoff DEV, stipuler explicitement "la source de vérité = `design/tokens.md`, pas les couleurs trouvées dans `maquette-detail.html`". DEV doit importer les tokens comme custom properties CSS et ne pas extraire de la maquette.

- **WHAT** : Dashboard — redondance pills catégorie (top) + sidebar catégories (gauche).
  **WHY** : deux contrôles de filtre pour la même action → bruit visuel + ambiguïté (lequel est la source de vérité du filtre actif ?).
  **HOW** : garder **uniquement la sidebar** comme sélecteur de catégorie. Remplacer les pills horizontaux par un simple bouton "All ideas" (actif par défaut) + éventuellement un clear-filter pill si filtre actif. Ou supprimer la ligne de pills.

- **WHAT** : Dashboard — colonne CATEGORY dans la table reste utile même avec sidebar filtrée (vue "Toutes").
  **WHY** : OK quand filtre = Toutes, mais redondant quand filtre = une catégorie.
  **HOW** : règle conditionnelle DEV : masquer colonne CATEGORY si `categoryFilter !== ''`.

- **WHAT** : IdeaDetail — sections "Brief" et "Commentaires" trop similaires visuellement.
  **WHY** : l'utilisateur peut confondre les deux zones (usage différent : Brief = prompt de dev, Commentaires = notes libres).
  **HOW** : ajouter un indicateur visuel distinct : icône en header de section (`FileText` pour Brief, `MessageSquare` pour Commentaires) + le Brief peut avoir un léger `border-left: 2px solid var(--accent)` pour le marquer comme "canal de dev".

## 🚫 À corriger (bloquant)

Aucun. Les deux maquettes sont **acceptables** pour handoff DEV moyennant les "⚠️ À améliorer" ci-dessus formalisés dans le brief DEV.

## 💡 Suggestions (post-v1, non prioritaires)

- Command palette Cmd+K fonctionnelle (mentionnée dans tokens.md §8) — à scoper comme enhancement v1.1 si budget.
- Raccourci `J` / `K` pour naviguer rows (habit Linear) — trivial à coder avec keydown listener.
- Hover row preview : afficher un popover discret avec revenue/invest/rating au survol 400ms d'une row → opt-in v1.1.
- Sparkline revenue par idée dans la table (tiny inline chart 40x12px) si data dispo → v1.1.

---

## Red flags check (DESIGN_TOOL_REVIEW §3)

- HTML/web-style → **NON applicable** (cible B2B-SaaS assumée par brief Guillaume).
- Material Symbols / Font Awesome → absent, Lucide-style visible.
- Gradient/glassmorphism → absent dans les maquettes.
- Typography système/web → Inter explicite.
- Emojis décoration → absent dans UI chrome.

Zéro red flag.

---

## Handoff Monet

Aucun asset illustré nécessaire pour cette refonte (tout est type/couleur/layout). **Pas de délégation Monet.**

---

## Verdict

**ACCEPTABLE** — les deux maquettes passent le gate qualité. Implémentable tel quel par DEV - Ideas.Studio en respectant les 4 points "⚠️ À améliorer" ci-dessus formalisés dans le brief DEV.

Attendre **O/N explicite de Guillaume** avant de rédiger le brief DEV (cf brief ticket §étape 3).

---

_Review produite par A - Jony Ive, 2026-04-17, avant validation Guillaume._
