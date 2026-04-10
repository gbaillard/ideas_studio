# IDEAS_STUDIO — Onboarding

## Projet
Catalogue et gestionnaire d'idées de projets lucratifs IA pour solopreneur. Contient des fiches d'idées, des tutoriels YouTube extraits via yt-brain, et une app web Vue.js pour tout gérer.

## Structure
```
IDEAS_STUDIO/
├── memory_claude/           ← ONBOARDING, CODE_REPORT, RULES
├── app/                     ← App web Vue 3 + Vite (dashboard idées)
│   ├── Dockerfile           ← Build nginx, deploiement port 40300
│   └── src/data/ideas.json  ← Données structurées des idées + études de faisabilité
├── fiches_idees/            ← 6 fiches par catégorie (markdown)
├── tutoriels/               ← 72 fiches tutoriels YouTube (markdown)
├── recherches/              ← 25 rapports de recherche approfondis (séries 07-10)
├── INDEX.md                 ← Vue d'ensemble + TOP 10 + classements
└── README.md                ← Description du projet
```

## Catégories d'idées (7)
1. **Jeux Enfants PERIPLO** (37 idées)
2. **Micro-SaaS & Outils IA** (33 idées)
3. **Services Freelance & Automatisation** (32 idées)
4. **Print-on-Demand & Produits Digitaux** (29 idées)
5. **Livres KDP & Contenu Éducatif** (16 idées)
6. **YouTube Faceless & Contenu Vidéo IA** (15 idées)
7. **Apps Mobiles** (1 idée)

**Total : 164 idées dans l'app JSON (119 acceptées, 45 rejetées) + 72 tutoriels YouTube + 25 rapports de recherche**

## Workflow de statuts (nouveau)
- **Nouveau** → **Acceptée/Rejetée** (après étude de faisabilité) → **En cours** → **Publiée**
- Autres : **En attente**, **Abandonnée**
- Chaque idée a un champ `feasibility` avec verdict, résumé, critères détaillés, date

## Chaînes YouTube fouillées
Wholesale Ted (8 vidéos), Jordan Welch (1.4M vues), Sean Dollwet ($2.2M), Alek, Kimberly Mitchell, Jensen Tung, Tim Koa, Bailey Vann, Starter Story, Moe Income, JeffSetLife, et d'autres.

## Pépites identifiées
- Livres personnalisés enfants $8M (aligné avec PERIPLO)
- Templates Notion $500K avec 1 seul produit
- AI Wrapper SaaS $700K/mois
- Word Search KDP $11K/mois (saisonnier Q4)
- App Rooted $1M+ (4M téléchargements, fondatrice solo sans background tech)

## App web
- Stack : Vue 3 + Vite + Vue Router
- Ports : 8090 (dev) / 40300 (Docker prod)
- Fonctionnalités :
  - Dashboard avec pills catégorie colorées + compteurs dynamiques
  - Filtres par catégorie/difficulté/type revenu/statut/recherche
  - Page détail avec barres de progression, section étude de faisabilité, navigation prev/next
  - Commentaires localStorage avec avatar + delete + Ctrl+Enter
  - Workflow statuts (Nouveau/Acceptée/Rejetée/En cours/En attente/Abandonnée/Publiée)
  - Barre de couleur par catégorie sur chaque carte
- Lancer dev : `cd app && npm run dev -- --port 8090`
- Docker : `docker run -d --name ideas-studio --restart unless-stopped -p 40300:80 ideas-studio`
- Rebuild : `cd app && docker build -t ideas-studio . && docker rm -f ideas-studio && docker run -d --name ideas-studio --restart unless-stopped -p 40300:80 ideas-studio`

## Outil yt-brain
L'outil `PROJECT/TOOLS/SCRIPTS/yt-brain/yt-brain` est utilisé pour extraire les transcripts YouTube. Cookies Chrome intégrés pour contourner le blocage anti-bot.

## Règles
- Voir RULES.md pour les conventions
- Chaque tutoriel doit avoir : source YouTube, process étape par étape, outils, chiffres, tips
- Toujours valider les données avant de créer du contenu (pas de devinettes)
