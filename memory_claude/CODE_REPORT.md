# IDEAS_STUDIO — Code Report

> Dernière mise à jour : 2026-04-17
> Sessions antérieures au 2026-04-12 : voir `CODE_REPORT_ARCHIVE.md`
> Règle : si ce fichier dépasse 200 lignes, archiver les sessions les plus anciennes.

---

## Session 2026-04-17 (ILU-128) — Commit + push état projet

**Objectif** : Mettre à jour memory_claude, committer et pousser tout le travail en attente sur `main`.

**Ce qui a été fait :**
- `.gitignore` : ajout `app/data/` (SQLite runtime, déjà bind-mounté vers `/Volumes/T500/PROJECT/VOLUME/ideas-studio`)
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

**Objectif** : Données Docker dans `/Volumes/T500/PROJECT/VOLUME/ideas-studio/`

**Ce qui a été fait :**
- Création répertoire, copie données, rebuild avec bind mount
- Commande : `-v /Volumes/T500/PROJECT/VOLUME/ideas-studio:/app/data`
- ONBOARDING.md mis à jour

**Décisions :**
86. ✅ Bind mount `/Volumes/T500/PROJECT/VOLUME/ideas-studio/` — données visibles/backupables sur T500

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
- **Backend** : REST API /api/*, SQLite `/Volumes/T500/PROJECT/VOLUME/ideas-studio/`
- **Dernière décision** : #107

## TODO
- Guillaume doit choisir les projets à lancer en priorité
- TOP 3 analysé : Learn-to-Draw KDP (9/10), Dot-to-Dot KDP (7.5/10), Clipart POD Etsy (6/10)
