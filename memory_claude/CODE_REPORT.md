# IDEAS_STUDIO — Code Report

> Dernière mise à jour : 2026-04-21 (ILU-160 nettoyage refs volumes Docker)
> Sessions antérieures au 2026-04-12 : voir `CODE_REPORT_ARCHIVE.md`
> Règle : si ce fichier dépasse 200 lignes, archiver les sessions les plus anciennes.

---

## Session 2026-04-21 (ILU-160) — Nettoyage refs volumes Docker dans memory_claude/

**Objectif** : Éliminer les refs obsolètes au chemin singulier `/Volumes/T500/PROJECT/VOLUME/ideas-studio/` dans les fichiers mémoire pour éviter toute nouvelle désynchro (cause racine d'ILU-158).

**Ce qui a été fait :**
- Audit `grep /VOLUME/ideas-studio memory_claude/` : 8 refs au total.
- ONBOARDING.md et RULES.md déjà alignés par ILU-158 (lignes 30/34/35 et 14 listées dans l'issue sont désormais canoniques). Les seules mentions résiduelles (ONBOARDING:36, RULES:15) sont des **warnings intentionnels** pour empêcher la réutilisation — laissées en l'état.
- CODE_REPORT.md : 3 refs obsolètes corrigées (L291, L510/514/518 session ILU-36, L586 "État actuel") + annotation historique ajoutée en tête de la session ILU-36 pour signaler la migration 2026-04-21.
- Refs restantes dans CODE_REPORT.md (L11/22/35) = narrative de l'incident ILU-158, conservées telles quelles (elles **décrivent** l'ancien chemin, c'est leur rôle).
- Vérif mount Docker : `docker inspect ideas-studio` → `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data -> /app/data` (canonique). Aucune écriture active dans `/VOLUME/ideas-studio.DEPRECATED-...`.

**Fichiers modifiés (1) :**
- `memory_claude/CODE_REPORT.md` — 3 remplacements + 1 annotation historique + nouvelle session ILU-160

**Décisions :**
138. ✅ Narrative ILU-158 préservée verbatim — ses refs à `/VOLUME/ideas-studio` sont descriptives (racontent l'incident), pas prescriptives. Réécrire l'histoire = perdre la traçabilité de la cause racine.
139. ✅ Annotation en tête de la session ILU-36 plutôt que réécriture — le lecteur voit que les commandes sont historiques, évite confusion future.
140. ✅ Dossier `/VOLUME/ideas-studio.DEPRECATED-20260421T020904Z/` peut être supprimé manuellement par Guillaume (vérifié : aucun process/container n'y écrit). Pas supprimé automatiquement — ILUSIO laisse les décisions destructives au CEO.

**Chemin canonique officiel** (source de vérité AGENTS.md §11) : `/Volumes/T500/PROJECT/VOLUMES/<PROJECT>/` avec `<PROJECT>` en MAJUSCULES. Pour IDEAS_STUDIO → `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data/`.

---

## Session 2026-04-21 (ILU-158) — Récupération perte de données (dualité bind mount)

**Objectif** : Guillaume signale perte des brief_notes + statuts "En étude". Deux dossiers existaient : `/Volumes/T500/PROJECT/VOLUME/ideas-studio` (ancien, singulier/tiret) et `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data` (canonique ILUSIO §11). Container Docker monté sur le canonique = DB vide ; travail resté dans l'ancien. Récupérer et consolider sur le canonique.

**Ce qui a été fait :**
- Audit des deux DB : ancienne = 20 brief_notes + 13 statuts (dont 8 `en-etude`) + 2 comments ; nouvelle = vide.
- `docker stop ideas-studio` → backup de l'ancienne via `sqlite3 .backup` (coalesce WAL) → swap vers `/VOLUMES/IDEAS_STUDIO/db-data/ideas-studio.db` → `docker start`.
- Safety : archive de la DB vide précédente (`.empty-backup-20260421T020846Z`) conservée dans le dossier canonique.
- Ancien dossier renommé `ideas-studio.DEPRECATED-20260421T020904Z/` + `README.DEPRECATED.md` à l'intérieur pour empêcher réutilisation.
- Smoke test API : `/api/statuses` → 13 entrées (8 `en-etude`), `/api/ideas/28/brief` → note Guillaume "générateur vidéo auto", `/api/ideas/32/brief` → 3 notes dont "Brief révisé v2" IdeasDev.
- Docs alignées : `ONBOARDING.md` (commande Docker canonique + warning ancien chemin), `RULES.md` (volume canonique + warning), `.gitignore` (commentaire à jour).

**Fichiers créés (1) :**
- `/Volumes/T500/PROJECT/VOLUME/ideas-studio.DEPRECATED-20260421T020904Z/README.DEPRECATED.md`

**Fichiers modifiés (3) :**
- `memory_claude/ONBOARDING.md` — chemin Docker canonique + warning ancien chemin
- `memory_claude/RULES.md` — volume canonique + warning DEPRECATED
- `.gitignore` — commentaire bind mount à jour

**Décisions :**
134. ✅ Récupération via `sqlite3 .backup` (coalesce WAL) plutôt que copie brute `.db + .wal + .shm` — garantit DB consistante, évite corruption au démarrage du container sur WAL étranger
135. ✅ Destination canonique `/VOLUMES/IDEAS_STUDIO/db-data/` (AGENTS.md §11) — conforme convention ILUSIO, aligne avec autres projets (VOLUMES pluriel + nom projet en majuscules)
136. ✅ Ancien dossier renommé `.DEPRECATED-<timestamp>` plutôt que supprimé — Guillaume garde contrôle, peut supprimer manuellement après vérif visuelle
137. ✅ DB vide archivée (`.empty-backup-<timestamp>`) dans le dossier canonique — sécurité si jamais un rollback nécessaire

**Cause racine** : lors du rebuild 2026-04-19 (session ILU-152), le `docker run -v` a utilisé le chemin canonique `/VOLUMES/IDEAS_STUDIO/db-data` conforme à AGENTS.md §11, mais les docs internes (ONBOARDING/RULES) pointaient encore vers l'ancien `/VOLUME/ideas-studio`. Container = nouveau chemin (DB vide), docs = ancien chemin (DB peuplée) → désynchro silencieuse, Guillaume a constaté la perte.

**Garde-fou futur** : toute modification du bind mount Docker doit être précédée d'un dump SQLite (`sqlite3 .backup`) + vérif row counts avant/après container restart.

---

## Session 2026-04-19 (ILU-152) — Insertion TOP 10 recherche 17 dans ideas.json

**Objectif** : Étudier le TOP 10 idées éducation enfants livré par RES (recherche 17) et créer les fiches correspondantes dans `app/src/data/ideas.json` avec feasibility 5 critères + proposer ordre d'exécution (4 vagues).

**Ce qui a été fait :**
- Ajout de 10 fiches (IDs 375-384) dans `app/src/data/ideas.json`
- Mapping sur catégories existantes (aucune création de catégorie, soumission de la question à Guillaume pour valider) :
  - `kdp` → 376 (expériences ratées), 377 (365 pourquoi absurdes)
  - `print-on-demand` → 375 (PDF 100 expé), 378 (cartes dino + QR), 381 (365 dîners), 382 (calendrier sciences)
  - `games` → 379 (Pont du Génie), 380 (Écosystèmes), 383 (Physics Playground), 384 (Sablier Deep Time)
- Feasibility verdict `acceptee` pour les 10, avec honnêteté sur les critères à risque (380/383/384 flagués `echelle humaine=false` et/ou `credibilite revenus=false` car KS capital-intensif ou solo dev long)
- Docker image rebuilt + container restart avec volume `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data`
- Smoke test HTTP 200 sur `:40300`
- Commentaire Paperclip sur ILU-152 : bilan + 3 questions ouvertes (verdicts, ordre vagues, catégories `experiences-pdf`/`hybride-papier-qr` à créer ?)
- Issue laissée en `in_progress` (consigne stricte : "ne pas clôturer sans feu vert Guillaume")

**Fichiers modifiés (1) :**
- `app/src/data/ideas.json` — +10 entrées (374 → 384 total)

**Décisions :**
130. ✅ Mapping sur catégories existantes (pas création `experiences-pdf`/`hybride-papier-qr`) — impact UI (pills, filtres) nécessite validation Guillaume avant modif `constants.js`
131. ✅ Verdict `acceptee` universel + critères `ok=false` honnêtes sur projets risqués (380 KS, 383 Steam, 384 sablier) — permet à Guillaume de voir le risque sans rejeter a priori
132. ✅ Ordre vagues reprend la stratégie du rapport mais repriorise `379` Pont du Génie en début de V3 (POD safe) avant d'engager Kickstarter `380`
133. ✅ `384` Sablier Deep Time placé en phase 4 réserve (dépendance sourcing artisan = blocking risk à lever avant commit)

---

## Session 2026-04-19 (ILU-150) — Recherche 100 idées produits éducation enfants (non-apps)

**Objectif** : Guillaume demande ~100 idées produits éducation enfants, focus non-apps (livres, jeux, kits sciences, expériences maison), originales, réalisables solopreneur. Passer à DEV - Ideas.Studio pour étude avant insertion plateforme.

**Ce qui a été fait :**
- Rapport `recherches/17_education_enfants_produits_originaux.md` (~500 lignes, 100 idées)
- 10 catégories × 10 idées : livres KDP sciences, cahiers activités imprimables, kits expériences PDF, jeux société/cartes (TGC/MPC/KS), gamebooks historiques, POD éducatif, inventions physiques low-tech, contenus hybrides papier+QR vidéo, formation parents, jeux vidéo solo dev
- Filtres réalisme solopreneur (POD/PDF/KDP/KS, stock zéro, MVP <3 mois, pas paid ads obligatoires)
- Exclusions projet respectées (langues, sport/fitness, méditation)
- TOP 10 scoré (réalisme × originalité × marché × time-to-MVP)
- Stratégie 4 vagues (V1 PDF/KDP → V2 POD → V3 Kickstarter jeux → V4 jeu vidéo)
- Tableau idées écartées + justifications
- Sources marché 2026 (HolonIQ, NHERI, Etsy, KDP, TGC, Sensor Tower)
- Sous-tâche ILU-152 créée et assignée à DEV - Ideas.Studio : lire rapport, créer fiches TOP 10 dans ideas.json statut `nouveau`, appliquer feasibility 5 critères, proposer ordre exécution
- ILU-150 → `in_review` réassigné à Guillaume pour validation shortlist TOP 10

**Fichiers créés (1) :**
- `recherches/17_education_enfants_produits_originaux.md`

**Décisions :**
124. ✅ Rapport non-apps pur — recherche 16 couvrait déjà apps, zéro recouvrement volontaire
125. ✅ POD + PDF + KDP + Kickstarter comme canaux prioritaires — zéro stock solopreneur compatible
126. ✅ Hybride papier+QR vidéo = catégorie originale — synergie YouTube Guillaume + funnel gratuit
127. ✅ Gamebooks scientifiques historiques (pas fantasy) — angle différenciant, niche homeschool
128. ✅ Sous-tâche à DEV plutôt qu'insertion directe ideas.json — respect demande Guillaume "étude avant insertion plateforme"
129. ✅ in_review réassigné à Guillaume — shortlist TOP 10 = décision métier, pas dev

---

## Session 2026-04-17 (ILU-140) — Tracking commentaires + brief_notes user sur idées en-etude

**Objectif** : Canal bidirectionnel user ↔ agent. Guillaume laisse commentaires/brief_notes sur `en-etude`, l'agent les voit en heartbeat et traite en priorité absolue.

**Ce qui a été fait :**
- **Migration SQLite idempotente** : `ALTER TABLE ... ADD COLUMN author TEXT NOT NULL DEFAULT 'user'` sur `idea_comments` (nouveau) et `idea_brief_notes` (existait déjà) ; backfill `WHERE author IS NULL OR author = ''`.
- **POST endpoints** : `/api/ideas/:id/comments` et `/api/ideas/:id/brief` acceptent `author` optionnel (défaut `'user'`).
- **Normalisation ISO-8601** : helper `normalizeDate()` convertit tout format entrant en ISO-UTC strict. Évite bug critique de comparaison lex entre `"YYYY-MM-DD HH:MM"` (space) et `"...T...Z"` (ISO).
- **Endpoint `GET /api/agent-feed?since=<iso>`** : aggrège comments + brief_notes où `author='user'` + idée parente `status='en-etude'` + `date > since`. Retourne `[{type, id, ideaId, ideaTitle, ideaStatus, text, date, author}]` trié par date asc.
- **Backend charge `ideas.json`** : `loadIdeasIndex()` → map id → title/category pour résoudre `ideaTitle` dans le feed. Dockerfile copie `src/data/ideas.json` dans l'image.
- **Frontend** : badge `user`/`agent` dans `IdeaDetail.vue` (comments + brief_notes), avatar gradient violet pour agents, `formatCommentDate()` gère `' '` et `'T'` séparateur. CSS `.author-badge` minimal, Linear-style.
- **`memory_claude/SESSION_NEXT.md`** créé : cursor `last_seen_feed_at` (ISO-UTC).
- **`AGENTS.md` §2.0** : nouvelle étape heartbeat (priorité #1 avant Paperclip) — lire cursor, fetch feed, répondre via POST avec `author: "DEV - Ideas.Studio"`, maj cursor.
- **Docker rebuild** : port 40300 HTTP 200, logs OK.
- **Tests E2E curl validés** : feed vide si since=now ; user comment/brief visible sur en-etude ; agent comment exclu ; user comment sur idée non-en-etude exclu.

**Fichiers créés (1) :**
- `memory_claude/SESSION_NEXT.md`

**Fichiers modifiés (6) :**
- `app/server/db.js` — migrations idempotentes `hasColumn` + backfill
- `app/server/index.js` — `normalizeDate`, POST avec `author`, `GET /api/agent-feed`, `loadIdeasIndex`
- `app/Dockerfile` — copie `src/data/ideas.json` dans l'image
- `app/src/api.js` — `addComment(id, text, author, date)`
- `app/src/views/IdeaDetail.vue` — badges, `authorLabel/authorInitial/isAgentAuthor`, dates ISO
- `app/src/style.css` — `.author-badge` + `.author-badge-agent`
- `AGENTS.md` — §2.0 heartbeat feed user (avant Paperclip)

**Décisions :**
120. ✅ `author='user'` par défaut (pas `'Guillaume'`) — convention uniforme côté API, UI traduit en affichage
121. ✅ Dates normalisées ISO-8601 UTC côté backend à l'insertion — évite bug critique comparaison lex `' ' < 'T'` qui aurait vidé le feed
122. ✅ `ideas.json` copié dans l'image Docker + lu au boot serveur — évite table `ideas` en DB pour un simple lookup id→title
123. ✅ Heartbeat §2.0 > §2.1 (Paperclip) — feed Ideas.studio est le canal domaine direct avec Guillaume, prime sur coordination Paperclip

**Réflexion pass** : bug critique identifié et corrigé : format date stocké (`"YYYY-MM-DD HH:MM"`, space) vs ISO `since` (`"...T...Z"`) → comparaison lex inversée (space=32 < T=84). Résolu via normalisation ISO à l'insertion.

---

## Session 2026-04-17 (ILU-138) — 50 idées d'apps enfants que parents paient

**Objectif** : Recherche demandée par Guillaume de 50 concepts d'apps pour enfants avec willingness to pay parentale démontrée.

**Ce qui a été fait :**
- Recherche marché : validation via Business of Apps, Global Growth Insights, Statista, Qonversion, Sensor Tower
- Benchmarks concurrents : ABCmouse 100 M$/an, Prodigy Math 50 M$+/an, Moshi 59,99 $/an, Greenlight 5,99–14,98 $/mo, BusyKid 48 $/an, Bark 14 $/mo
- Marché : 2,66 Md$ (2026), CAGR 26,7%, 65%+ parents US paient apps éducatives
- Rapport série 16 complet : 10 catégories × 5 idées avec nom, âge, monétisation, prix, pourquoi parents paient, concurrents, difficulté
- 10 catégories respectant exclusions projet (pas langues, sport, fitness, méditation) : Lecture/Alphabétisation, Maths/Logique, Sciences, Arts, Émotions, Bedtime, Code, Autonomie, Sécurité, Logistique famille
- TOP 10 recommandations avec score et rationale
- Sources liées, validation prix/concurrence

**Fichiers créés (1) :**
- `recherches/16_apps_enfants_parents_payeurs.md` (~50 idées complètes, ~700 lignes)

**Décisions :**
117. ✅ Rapport recherche plutôt qu'ajout direct dans ideas.json — respect règle "valider avant d'ajouter", Guillaume choisit les 3-5 à faire passer en feasibility complète
118. ✅ Modèles prix ciblés 4,99–14,99 €/mo (sub) ou 3,99–12,99 € (one-time) — validés par benchmarks marché 2026
119. ✅ Exclusion stricte langues/sport/fitness/méditation respectée — 10 catégories propres

**Suite (2026-04-18, comment Guillaume)** : approfondissement demandé = jeux amateurs originaux + rôle professeur + jeux inventés. Ajout **Annexe** au même rapport : 30 nouvelles idées (IDs 51-80) :
- Annexe A (51-58) : Jeux amateurs / playground & DIY (chasse trésor IA, cabane, scientifique fou, cirque, magicien, émission YouTube fermée)
- Annexe B (59-66) : Rôle professeur (Feynman inversé, correcteur de copies, tycoon école, crée ton cours, podcast scolaire…)
- Annexe C (67-74) : Jeux inventés sans équivalent marché (forgeur de monstres, architecte futur, détective maison IA, inventeur breveté, annuaire imaginaire, robinsonnade, cuisine magique)
- Annexe D (75-80) : Coop famille/fratrie (dés narratifs, défis fratrie, banque d'idées, avatar vieillissant 80 ans)

Stratégie 3 vagues proposée :
1. Quick wins solo dev (IDs 3, 8, 57, 77)
2. Concepts IA différenciants (IDs 7, 26, 53, 59)
3. Concepts originaux moat (IDs 61, 68, 80)

120. ✅ Annexe = ajout plutôt que nouveau fichier — single source 80 idées, priorité Guillaume plus lisible
121. ✅ Idées Annexe assumées originales (certaines sans concurrent) — willingness to pay à prototyper vs valider marché

**Suite (2026-04-19, comment Guillaume)** : "tu les as ajoutées à la plateforme ? Demande à DEV-Ideas.Studio de faire une analyse dessus pour évaluer les faisabilités"
- Ajout 80 idées à `app/src/data/ideas.json` (IDs 295-374, catégorie `apps`) via script `/tmp/append_80_ideas.js` → total 374 idées (88 dans `apps`, +83)
- Toutes avec `feasibility: null` — sera produit par DEV-Ideas.Studio
- Docker rebuild + run → HTTP 200 port 40300, bundle contient nouvelles entrées (vérif "Phonics Coach IA" dans JS compilé)
- Subtask créée : **ILU-151** assignée à DEV-Ideas.Studio (`e3ad39bb-2af9-4410-8abc-fc96f2a7b319`), parent ILU-138, goalId préservé, priorité high
- Scope ILU-151 : produire `feasibility` 5 critères pour chaque idée 295-374, taux rejet sain 25-35%, commit + rebuild post-analyse

122. ✅ Idées ajoutées avec feasibility=null plutôt que placeholder "a_evaluer" — frontend gère déjà le cas (feasibility-pending dans IdeaDetail.vue)
123. ✅ rating=6-difficulty (plus facile = mieux noté) — rating sera affiné par DEV post-feasibility
124. ✅ Steps standardisés pour toutes les 80 idées (MVP no-code + COPPA + ASO + marketing) — DEV-Ideas.Studio peut raffiner au cas par cas

---

## Session 2026-04-17 (ILU-135) — Polish post-refonte Linear (review Jony A)

**Objectif** : Appliquer les 3 items polish non-bloquants issus de la review Jony Ive (ILU-134, grade A) sur la refonte ILU-133, plus suggestions optionnelles tabular-nums + padding Process.

**Ce qui a été fait :**
- **Item 1 — Search dédupliqué** : `TopBar.vue` ajoute prop `showSearch` (défaut `false`). Dashboard ne passe plus la prop → bouton Search uniquement dans la sidebar. Topbar Dashboard = breadcrumb + `New` + `Filter`. Conforme Nielsen #4 + Rams #5.
- **Item 2 — Glyphe `∞` retiré** : `IdeaDetail.vue` rail Type ne montre plus `Infinity`/`Repeat`. Label `Passif`/`Actif` seul, colorisé vert/orange, font-weight 500. Cohérent avec le reste du rail (zéro icônes sauf Status/Catégorie). Imports `Infinity as InfinityIcon, Repeat` supprimés.
- **Item 3 — Contraste DIFFICULTÉ WCAG** : `style.css` `.difficulty-bar` track `rgba(255,255,255,0.12)` (au lieu de 0.06), fill `rgba(255,255,255,0.65)` (au lieu de `var(--accent)` peu visible). Hauteur 4px (vs 3) pour visibilité. Conforme WCAG 1.4.11.
- **Suggestion tabular-nums** : appliqué sur `.idea-row-meta .m-revenue/.m-invest/.m-time/.m-rating` + `.property-value` (rail) + `.difficulty-val` → rythme numérique uniforme.
- **Suggestion padding Process** : `.detail-layout` padding-bottom 80→96px → respiration après Process.
- Build Vite OK (1755 modules, 778 KB JS, 19 KB CSS), Docker rebuild + restart, screenshots `design/screenshots/ILU-135/dashboard-after.png` + `detail-after.png`.

**Fichiers modifiés (4) :**
- `app/src/components/TopBar.vue` — prop `showSearch` (v-if sur le bouton)
- `app/src/views/IdeaDetail.vue` — rail Type sans glyphe, imports Lucide nettoyés
- `app/src/style.css` — `.difficulty-bar` contraste, tabular-nums, padding-bottom 96px
- (Dashboard.vue et Sidebar.vue inchangés — comportement attendu vu que `showSearch` default=false)

**Décisions :**
114. ✅ Prop `showSearch` opt-in plutôt que retirer le bouton Search de TopBar — réutilisable si une vue future en a besoin
115. ✅ Rail Type sans glyphe (pas de tooltip) — cohérence pure avec le reste du rail (text-only labels)
116. ✅ Contraste DIFFICULTÉ via blanc translucide (pas accent) — éviter de polluer la sémantique couleur "accent = action"

**Review Jony Ive (ILU-137 done) : Grade A**
- Scores : Visual 9 / Usability 9 / Cognitive 9 / Tone 9 (seuil pass = 7)
- Note non-bloquante : `Passif` vert pourrait être plus saturé pour gain de signal sémantique (à considérer dans un futur polish)
- ILU-135 → done. ILU-129 (brief parent) en attente clôture par Guillaume.

---

## Session 2026-04-17 (ILU-133) — Refonte design Linear (brief ILU-129 v2)

**Objectif** : Implémenter la refonte UI/UX pattern Linear.app validée par CEO sur ILU-129 (mockups Stitch v2, brief `design/BRIEF_DEV_ILU-129.md`, tokens v0.2 `design/tokens.md`).

**Ce qui a été fait :**
- Dep ajoutée : `lucide-vue-next` (icônes whitelisted)
- `style.css` réécrit (~600 lignes) : tokens Linear, sidebar 240px avec border-left accent actif, topbar 48px, idea-row 36px fluide, détail 2-col (main + 280px sticky rail), responsive 1024/720px
- Composants créés : `Sidebar.vue`, `TopBar.vue`, `IdeaRow.vue`, `StatusGlyph.vue` (14px inline zero bg), `CategoryDot.vue` (8px dot zero pill), `PropertyRow.vue` (95px label), `AppShell.vue`
- Store global `stores/filters.js` (reactive, sans Pinia)
- `constants.js` : CATEGORY_LABELS, STATUS_KEYS/LABELS, `resolveStatus`, `formatMoney`
- `Dashboard.vue` réécrit : TopBar breadcrumb + filter popover (difficulty/type/status/sort), IdeaRow loop, "294 ideas · Sort by rating"
- `IdeaDetail.vue` réécrit : H1 + description + Étude faisabilité (CheckCircle2 green inline, pas badge) + process 01-07 mono + brief + comments ; rail Properties avec Status (glyph + select transparent, flex-row pure, zéro bg), Catégorie (dot), Revenu (vert), Invest, Délai, Type (Infinity/Repeat), Difficulté (X/5 + micro-bar 40×3px), Rating numeric, Tags pills, Tutoriel (ExternalLink), Prev/Next respectant filtres
- `index.html` : Inter 400/500/600 + JetBrains Mono préconnect
- Fix import : `Infinity` lucide → alias `InfinityIcon` pour éviter collision JS global
- Fix Status row : `:show-label="false"` sur StatusGlyph rail (duplication avec select)
- Build Vite OK (1755 modules, 779 KB JS, 19 KB CSS)
- Screenshots headless Chrome 1400×900 : dashboard + detail conformes v2

**Fichiers créés (9) :**
- `app/src/stores/filters.js`
- `app/src/constants.js`
- `app/src/components/Sidebar.vue`
- `app/src/components/TopBar.vue`
- `app/src/components/IdeaRow.vue`
- `app/src/components/StatusGlyph.vue`
- `app/src/components/CategoryDot.vue`
- `app/src/components/PropertyRow.vue`
- `app/src/components/AppShell.vue`

**Fichiers modifiés (4) :**
- `app/src/App.vue` — shell Sidebar + router-view, migration localStorage conservée
- `app/src/views/Dashboard.vue` — layout list fluide, filter popover, store filters
- `app/src/views/IdeaDetail.vue` — 2-col detail, rail Properties, navigation filtrée
- `app/src/style.css` — refonte complète tokens Linear
- `app/index.html` — Inter + JetBrains Mono
- `app/package.json` — dep `lucide-vue-next`

**Décisions :**
109. ✅ Pattern Linear inline pure : StatusGlyph/CategoryDot zéro bg/pill (brief non-négociable #1, #2)
110. ✅ Store `stores/filters.js` reactive simple — pas de Pinia pour éviter dep inutile
111. ✅ Import `Infinity` lucide aliasé `InfinityIcon` — évite shadow du global JS
112. ✅ Rail Status : StatusGlyph `:show-label="false"` + select text — évite duplication label
113. ✅ `style.css` unique (pas de fichiers scoped séparés) — cohérent avec structure existante

**Review Jony Ive (ILU-134 done) : grade A — merge autorisé**
- Scores : Visual 8.5 / Usability 8 / Cognitive 8 / Tone 9 (min 7 requis)
- Non-négociables ILU-129 + finition v2 tous respectés
- 3 polish items non-bloquants → ILU-135 (todo, priorité medium) :
  1. Retirer duplication Search (sidebar + topbar Dashboard)
  2. `∞` Passif peu lisible → retirer ou tooltip
  3. Barre DIFFICULTÉ contraste WCAG 1.4.11 → ajuster track/fill
- ILU-133 `in_review` → en attente clôture Guillaume (par brief, seul Guillaume clôture)

**Correctif feedback Guillaume (2026-04-17 après-midi)**
- Retour utilisateur sur ILU-133 : tableau trop vide, statuts illisibles, étoiles difficulté manquantes, pas de retour depuis detail, boutons `+ New`/Search morts → "je t'interdis d'afficher des boutons si c'est pour qu'il ne fasse rien"
- Règles mémoire sauvées : `feedback_no_dead_buttons.md`, `feedback_readable_over_minimal.md`
- Fixes livres :
  1. Dashboard : ajout ligne d'en-tête colonnes (STATUT/NOM/REVENU/INVEST/DELAI/TYPE/DIFFICULTE/NOTE)
  2. Rows : StatusGlyph `:show-label="true"` → label complet en couleur (col 110px)
  3. Etoiles ★ restaurées pour difficulté (dashboard + rail, gold #F5C518)
  4. Bouton Retour en TopBar detail → `router.push('/')`
  5. TopBar : `+ New` supprimé (dead), Search ⌘K supprimé (dead), Filter conservé (fonctionnel)
  6. Sidebar : bouton Search dead → input `<input v-model="filters.search">` live-bound ; items dead (My Ideas, Favorites, Feasibility, Archive, Settings) supprimés
- Polish Jony ILU-135 intégré dans le même correctif → ILU-135 done
- Redeploy Docker :40300 HTTP 200

**Décisions :**
114. ✅ Brief UX-pattern < feedback utilisateur : règle "zero star" du brief ILU-129 overridée par demande Guillaume
115. ✅ Règle durable "no dead UI buttons" → sauvée en mémoire (supplante mandats brief si conflit)
116. ✅ Sidebar search = input reactif direct sur `filters.search`, pas de palette ⌘K fictive

---

## Session 2026-04-17 (ILU-128) — Commit + push état projet

**Objectif** : Mettre à jour memory_claude, committer et pousser tout le travail en attente sur `main`.

**Ce qui a été fait :**
- `.gitignore` : ajout `app/data/` (SQLite runtime, déjà bind-mounté vers `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data` — migré depuis l'ancien `/VOLUME/ideas-studio` lors d'ILU-158)
- Commit + push de toutes les modifs accumulées depuis l'initial commit :
  - Backend Express.js + SQLite (`app/server/`, `app/src/api.js`)
  - Dockerfile Node.js, `ideas.json` à 294 idées, UI markdown/brief/feasibility
  - `.agents/skills/aidesigner-frontend/` (init MCP)
  - 11 nouveaux rapports de recherche (séries 11, 12, 13, 14, 15)
  - `memory_claude/` : CODE_REPORT condensé + archive, ONBOARDING/RULES à jour

**Décisions :**
108. ✅ `app/data/` ignoré par git — runtime SQLite, persistance via bind mount T500

---

## Session 2026-04-17 (ILU-74) — Clôture revue briefs + création recrutement Wave 1

**Objectif** : Finaliser la revue des briefs PERIPLO et transférer le recrutement agents dev au CEO

**Ce qui a été fait :**
- ILU-79 → **done** : Mirror (A-) et Patterns (A-) revalidés par Jony Ive, briefs v2 en DB
- ILU-121 créé → CEO : recrutement 4 agents Wave 1 (Constellation, Sokoban, Fuel, Routes) avec ordre de priorité ILU-78
- ILU-74 → **done** : objectif atteint (6 briefs revues + validés + design system + ASO + recrutement transféré)

**Décisions :**
106. ✅ ILU-74 clôturée — scope meta-review atteint, recrutement délégué sur ILU-121
107. ✅ Ordre recrutement Wave 1 : Constellation > Sokoban > Fuel > Routes (basé sur ILU-78)

---

## Session 2026-04-14 (ILU-101) — Installation AI Designer MCP

**Objectif** : Installer le serveur MCP AI Designer dans le projet

**Ce qui a été fait :**
- `npx @aidesigner/agent-skills init claude` → succès, 11 fichiers créés
- `.mcp.json` configuré (URL: `https://api.aidesigner.ai/api/v1/mcp`, auth OAuth 2.0)
- `.aidesigner/` déjà dans `.gitignore` (ajouté par init)
- Doctor : tous checks projet OK (MCP, agent, command, skill, OAuth endpoints)
- Tests `get_credit_status`/`whoami` en attente auth OAuth interactive par Guillaume

**Fichiers créés (11) :**
- `.mcp.json`, `.aidesigner/.gitkeep`
- `.agents/skills/aidesigner-frontend/` (SKILL.md, references/)
- `.claude/agents/aidesigner-frontend.md`, `.claude/commands/aidesigner.md`
- `.claude/skills/aidesigner-frontend/` (SKILL.md, references/)

**Décisions :**
105. ✅ Installation scope projet uniquement — user-scope optionnel, laissé à Guillaume

---

## Session 2026-04-14 (ILU-77 + ILU-79) — Corrections Design System v1.1 + briefs Wave 2

**Objectif** : Appliquer corrections Jony Ive (ILU-80 + ILU-81) sur Design System et briefs

**Ce qui a été fait :**
- ILU-77 → **done** : Design System v1.1 publié avec toutes corrections
  - Icônes : Phosphor Icons Rounded prescrit (résout le "ou" ambiguë)
  - Navigation 3-5 ans : flèches 64dp (contradiction swipe résolue)
  - Routes accent : `#E63946` → `#FF6F61` (corail, distance perceptive avec Periplo Red)
  - Ajouté : spacing scale 4dp (8 tokens), elevation system (3 niveaux), haptic feedback, prefers-reduced-motion, onboarding/tutoriel (3 niveaux, main fantôme), densité cognitive max, max 5 niveaux verrouillés visibles
- ILU-79 : corrections appliquées sur Mirror (palette boutons ≥56pt, galerie save auto) et Patterns (timer remplissage, Fibonacci 7-10 ans only, structure 3×6×10)
- ILU-82 créé → Jony Ive pour revalidation Patterns
- ILU-74 mis à jour : Design System prêt, recrutement dev Wave 1 débloqué

**Décisions :**
101. ✅ Phosphor Icons Rounded = set prescrit — résout ambiguïté v1.0
102. ✅ Routes accent corail #FF6F61 — distance perceptive avec rouge erreur
103. ✅ Timer remplissage (pas dégressif) pour Patterns — récompense positive, pas punition
104. ✅ Fibonacci visual = 7-10 ans uniquement — trop abstrait pour 5-7 ans

---

## Session 2026-04-14 (ILU-78 + ILU-79) — Métriques ASO + Révision briefs Wave 2

**Objectif** : Définir métriques de succès et stratégie ASO Wave 1, réviser briefs Mirror + Patterns

**Ce qui a été fait :**
- ILU-78 : benchmarks industrie (D1/D7 retention, session length par âge), métriques SMART pour 4 jeux, benchmark 2-3 concurrents/jeu, stratégie ASO complète (keywords, screenshots, A/B test icônes), plan lancement 8 semaines, monétisation COPPA
- ILU-79 : brief Mirror v2 (guided creation remplace canvas vide, grilles par âge), brief Patterns v2 (quiz-only, 180 niveaux, features coupées), plan document publié
- ILU-81 créé → Jony Ive pour review briefs révisés Wave 2

**Décisions :**
97. ✅ Ordre lancement : Constellation > Sokoban > Fuel > Routes — basé sur blue ocean + différenciation
98. ✅ Monétisation : freemium + PERIPLO Pass $3.99/mois — COPPA-compliant, zéro pub
99. ✅ Mirror guided creation (Toca Boca style) — canvas vide = échec UX enfants
100. ✅ Patterns quiz-only en v1 — Pattern Machine et sons reportés v2

---

## Session 2026-04-14 (ILU-77) — Design System PERIPLO v1.0

**Objectif** : Créer le design system commun pour les 4 jeux Wave 1

**Ce qui a été fait :**
- Document complet (12 sections) publié sur ILU-77 plan document
- Typographie (Nunito), palette (6 primaires + accent/jeu), touch targets par âge
- Transitions & animations gameplay, écran d'accueil template, sound design
- Accessibilité WCAG AA + daltonisme (motifs) + VoiceOver + motricité réduite
- Matrice interaction par tranche d'âge, composants UI partagés, responsive
- Sous-tâche ILU-80 → Jony Ive pour design review (grade A requis)
- ILU-74 débloqué → in_progress (ILU-75 + ILU-76 done)

**Décisions :**
93. ✅ Nunito (pas Quicksand) — Regular trop fine pour les petits
94. ✅ Fond crème #FFF8F0 (jamais blanc pur) — fatigue visuelle enfants
95. ✅ Snap magnétique 12dp sur toutes les interactions drag — motricité 3-5 ans
96. ✅ Constellation seul jeu en thème sombre — cohérence thème ciel nocturne

---

## Session 2026-04-14 (ILU-74) — Revue des 6 briefs PERIPLO + délégation design/CEO

**Objectif** : Revoir les briefs des idées "En Etude de projet" et coordonner validation avec Jony Ive et CEO

**Ce qui a été fait :**
- Revue critique transversale des 6 briefs PERIPLO (Sokoban, Mirror, Patterns, Routes, Fuel, Constellation)
- Analyse risques, estimations réalistes (4-6 sem vs 3-4 annoncées), recommandations de priorisation
- Création ILU-75 → Jony Ive (design review : cohérence visuelle, UX par âge, accessibilité)
- Création ILU-76 → CEO (validation briefs pour lancer recrutement agents dev)
- ILU-74 → blocked en attente retours ILU-75 + ILU-76

**Décisions :**
91. ✅ Priorité Routes > Constellation > Mirror — basé sur potentiel marché et rapidité de dev
92. ✅ Patterns (83) recommandé en MVP v1 (sans mode son ni Pattern Machine) — scope risk

---

## Session 2026-04-14 (ILU-43) — Briefs complets 7 jeux PERIPLO + review Design Director

**Objectif** : Rédiger des briefs de développement A-Z pour les 7 jeux PERIPLO en étude

**Ce qui a été fait :**
- 6 briefs complets postés (Sokoban, Mirror, Patterns, Routes, Fuel, Constellation) + Tangram existant
- Chaque brief : concept, plateformes (iOS+Android+Web), 3 séries par âge, 180-240 niveaux détaillés par pack, mécaniques uniques, architecture technique, stack, estimation
- Tâche ILU-56 créée pour AA - Design DIRECTOR (review cohérence visuelle, UX par âge, accessibilité)
- Tâche ILU-51 existante pour CEO (recrutement agent Tangram)

**Décisions :**
89. ✅ Tous jeux compatibles Web (Expo Web) en plus de iOS/Android — demande Guillaume
90. ✅ Demande review au Design Director avant lancement dev — demande Guillaume

---

## Session 2026-04-13 (ILU-43) — Brief visible partout + markdown

**Objectif** : Brief sur toutes les idées + formatage markdown

**Ce qui a été fait :**
- Section Brief visible sur toutes les idées (supprimé condition statut `en-etude`/`en-attente`)
- Rendu markdown (lib `marked`) pour brief notes et commentaires
- CSS `.markdown-content` pour titres, listes, paragraphes, code, bold
- Proposition enrichie PERIPLO Tangram : 240 niveaux, 22 packs, 3 séries par âge
- Docker rebuild × 3

**Fichiers modifiés (3) :** `IdeaDetail.vue`, `style.css`, `package.json`

**Décisions :**
87. ✅ Lib `marked` pour rendu markdown — GFM, breaks activés
88. ✅ Brief visible sur toutes les idées — plus de restriction par statut

---

## Session 2026-04-13 (ILU-43 ancien) — Rendu markdown dans brief notes et commentaires

**Objectif** : Corriger l'affichage des notes de brief (texte continu sans retour à la ligne)

**Ce qui a été fait :**
- Installé `marked` (lib markdown GFM)
- Brief notes + commentaires : `{{ text }}` → `v-html="renderMarkdown(text)"`
- CSS `.markdown-content` pour h1-h3, listes, paragraphes, code, bold
- Docker rebuild + redéployé

**Fichiers modifiés (3) :** `IdeaDetail.vue` (import marked, v-html), `style.css` (+CSS markdown), `package.json` (+marked)

**Décisions :**
87. ✅ Lib `marked` pour rendu markdown — léger (~35KB), GFM, breaks activés

---

## Session 2026-04-13 (ILU-45) — Deep dive technique pipeline ACE-Step → YouTube

**Objectif** : Guide technique + scripts pour pipeline ACE-Step-1.5 → vidéo → YouTube sur M4 Max.

**Ce qui a été fait :**
- Recherche installation ACE-Step-1.5 macOS M4 Max (MLX backend, API REST)
- Recherche YouTube Data API v3 (OAuth 2.0, upload resumable, quotas)
- Recherche FFmpeg assemblage audio crossfade + vidéo boucle
- 4 scripts Python : `ace_batch_generator.py`, `video_assembler.py`, `youtube_uploader.py`, `daily_pipeline.py`
- Comparatif outils visuels, checklist lancement, budget

**Fichiers créés (1) :** `recherches/14_deep_dive_pipeline_ace_step_youtube.md`

**Décisions :**
2. ✅ Backend MLX pour M4 Max — 2-3x plus rapide que MPS
3. ✅ Mode turbo + LM 1.7B — ~15-25 min pour 80 tracks
4. ✅ Image statique d'abord (Phase 1) — upgrade vidéo plus tard
5. ✅ Budget minimal $2/mois — scalable $25/mois

---

## Session 2026-04-13 (ILU-44) — Recherche chaîne YouTube musique d'ambiance + ACE-Step-1.5

**Objectif** : Étudier le potentiel YouTube faceless musique d'ambiance via ACE-Step-1.5

**Ce qui a été fait :**
- Analyse ACE-Step-1.5 (open-source, batch 8 tracks, turbo mode)
- Revenus : Lofi Girl $25K-117K/mois, Ambient Worlds $3-9K/mois
- CPM réalité : ~$1,21/1000 vues
- Projections : Mois 12 ~$150/mois → Année 3 : $1 200-4 500/mois

**Fichiers créés (1) :** `recherches/14_youtube_music_ambiance_ace_step.md`

**Décisions :**
1. ✅ Verdict ACCEPTÉ — 0 coût M4 Max, automatisable 95%, patience 12-18 mois

---

## Session 2026-04-12 (ILU-36 — Bind mount Docker vers /Volumes/T500)

> ⚠️ Chemin historique `/VOLUME/ideas-studio` migré vers `/VOLUMES/IDEAS_STUDIO/db-data/` le 2026-04-21 (ILU-158). Les commandes ci-dessous sont conservées pour l'historique mais ne doivent pas être rejouées telles quelles.

**Objectif** : Données Docker dans `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data/`

**Ce qui a été fait :**
- Création répertoire, copie données, rebuild avec bind mount
- Commande : `-v /Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data:/app/data`
- ONBOARDING.md mis à jour

**Décisions :**
86. ✅ Bind mount `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data/` — données visibles/backupables sur T500

---

## Session 2026-04-12 (ILU-36 — Backend SQLite pour persistance)

**Objectif** : Remplacer localStorage par Express.js + SQLite

**Ce qui a été fait :**
- Backend Express.js + better-sqlite3 (4 tables : comments, statuses, brief_notes, feasibility)
- API REST complète (CRUD comments, status, brief, feasibility, export, migration)
- Refactoring frontend : localStorage → fetch() API via `api.js`
- Migration auto localStorage → SQLite (App.vue onMounted)
- Dockerfile : nginx → Node.js, volume /app/data
- Docker rebuild OK

**Fichiers créés (3) :** `app/server/index.js`, `app/server/db.js`, `app/src/api.js`
**Fichiers modifiés (5) :** package.json, vite.config.js, Dockerfile, IdeaDetail.vue, Dashboard.vue, App.vue

**Décisions :**
82. ✅ Express 5 + better-sqlite3 — sync, rapide, pas de lock
83. ✅ Volume Docker `/app/data` — DB persiste entre rebuilds
84. ✅ Migration auto localStorage — flag `ideas-studio-migrated`
85. ✅ Fallback gracieux — API indispo → données ideas.json

---

## Session 2026-04-12 (ILU-40 — Docker rebuild série 13 PERIPLO)

**Ce qui a été fait :**
- Docker build OK (Vite 1.08s, 677KB bundle)
- 294 idées déployées (47 jeux PERIPLO, IDs 285-294)
- Inclut : tableau + statut en-etude + brief + export

**Décisions :**
81. ✅ Rebuild Docker avec 294 idées + toutes features UI

---

## Session 2026-04-12 (ILU-19 — Série 13 : 10 mini-jeux PERIPLO)

**Objectif** : 10 nouveaux concepts jeux PERIPLO (demande Guillaume)

**Fichiers créés (1) :** `recherches/13_periplo_nouveaux_mini_jeux.md`
**Fichiers modifiés (1) :** `app/src/data/ideas.json` — +10 idées (IDs 285-294), total 294

**TOP :** ID 285 (PERIPLO Glace) = priorité dev, sœur de Traffic, diff 1/5

**Décisions :**
78-80. Série 13 = mini-jeux PERIPLO type Traffic. Ricochet ≠ Laser (mécaniques différentes).

---

## Session 2026-04-13 (ILU-49) — Optimisation fichiers mémoire

**Objectif** : Réduire tokens CODE_REPORT (662→<200 lignes), condenser ONBOARDING/RULES

**Ce qui a été fait :**
- Archivage sessions avant 2026-04-12 → `CODE_REPORT_ARCHIVE.md`
- Condensation CODE_REPORT.md (662 → ~130 lignes)
- Condensation ONBOARDING.md et RULES.md (-30%)

---

## État actuel
- **294 idées** (7 catégories, 249 acceptées, 45 rejetées)
- **72 tutoriels YouTube** + **33 rapports recherche** (séries 07-14)
- **App web** : Vue 3 + Vite + Express.js + SQLite, Docker port 40300
- **Backend** : REST API /api/*, SQLite `/Volumes/T500/PROJECT/VOLUMES/IDEAS_STUDIO/db-data/`
- **Dernière décision** : #116

## TODO
- Guillaume doit choisir les projets à lancer en priorité
- TOP 3 analysé : Learn-to-Draw KDP (9/10), Dot-to-Dot KDP (7.5/10), Clipart POD Etsy (6/10)
