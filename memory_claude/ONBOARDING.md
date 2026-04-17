# IDEAS_STUDIO — Onboarding

## Projet
Catalogue et gestionnaire d'idées business IA pour solopreneur. App web Vue.js + backend SQLite.

## Structure
```
IDEAS_STUDIO/
├── memory_claude/           ← ONBOARDING, CODE_REPORT, RULES, CODE_REPORT_ARCHIVE
├── app/                     ← App web Vue 3 + Vite + Express.js backend
│   ├── Dockerfile           ← Node.js (backend + static), port 40300
│   ├── server/              ← Express.js + better-sqlite3 (db.js, index.js)
│   └── src/data/ideas.json  ← Source de vérité des idées
├── fiches_idees/            ← Fiches par catégorie (markdown)
├── tutoriels/               ← 72 fiches tutoriels YouTube
├── recherches/              ← 33 rapports de recherche (séries 07-14)
└── INDEX.md                 ← Vue d'ensemble + TOP 10
```

## Catégories (7) — 294 idées total (249 acceptées, 45 rejetées)
1. Jeux Enfants PERIPLO (47) | 2. Micro-SaaS & Outils IA (50) | 3. Services Freelance (38)
4. Print-on-Demand (36) | 5. Livres KDP (20) | 6. YouTube Faceless (19) | 7. Apps Mobiles (5)

Série 12 : idées 100% agent-opérées (IDs 265-284).

## App web
- **Stack** : Vue 3 + Vite (frontend) + Express.js + better-sqlite3 (backend)
- **Ports** : 8090 (Vite dev) + 3000 (backend dev) / 40300 (Docker prod)
- **API** : REST /api/* (comments, status, brief, feasibility, export, migration)
- **DB** : SQLite dans `/app/data/ideas-studio.db` (bind mount → `/Volumes/T500/PROJECT/VOLUME/ideas-studio/`)
- **Features** : Dashboard tableau, filtres catégorie/difficulté/statut/recherche, page détail avec feasibility, commentaires SQLite, brief de projet, export JSON, navigation prev/next
- **Statuts** : Nouveau/Acceptée/Rejetée/En Etude de projet/En attente/Abandonnée/Publiée
- **Dev** : `cd app && npm run dev:server & npm run dev -- --port 8090`
- **Docker** : `docker run -d --name ideas-studio --restart unless-stopped -p 40300:80 -v /Volumes/T500/PROJECT/VOLUME/ideas-studio:/app/data ideas-studio`
- **Rebuild** : `cd app && docker build -t ideas-studio . && docker rm -f ideas-studio && docker run -d --name ideas-studio --restart unless-stopped -p 40300:80 -v /Volumes/T500/PROJECT/VOLUME/ideas-studio:/app/data ideas-studio`
