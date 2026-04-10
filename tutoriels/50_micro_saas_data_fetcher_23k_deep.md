# Micro-SaaS sur plateforme : $23K/mois solo (Data Fetcher, deep dive)

## Source YouTube
- **Titre :** How I Built It: $23K/month micro-saas
- **URL :** https://www.youtube.com/watch?v=NvtsM8Nk72c
- **Chaîne :** Starter Story | **Vues :** 269 399
- **Date :** 13 aout 2025
- **Fondateur :** Andy Cloak, solo founder, Londres

## Concept
Extension Airtable qui connecte n'importe quelle plateforme via API pour importer des donnees automatiquement. Cible : marketeurs (Facebook Ads, Google Analytics) et operations. Modele "build on top of a growing platform".

## Parcours du fondateur
1. Etudes en ingenierie (pas aime)
2. Self-taught coder, freelance React a Londres
3. Premiere app : annuaire d'influenceurs TikTok (scraping) → quelques milliers de $/mois → vendu
4. Avec le capital : essai de newsletter IPOs → besoin de tirer des donnees financieres dans Airtable → naissance de Data Fetcher

## Process etape par etape — Framework 6 etapes pour trouver des idees de plateforme

### Etape 1 — Trouver une plateforme en croissance
- Utiliser **Exploding Topics** pour reperer les plateformes montantes
- Chercher des plateformes avec marketplace recente ou SDK d'extension

### Etape 2 — Trouver un pain point sur cette plateforme
- Fouiller les **forums officiels**, **Reddit**, **Twitter/X**
- Chercher les problemes recurrents des utilisateurs

### Etape 3 — Emprunter un pattern prouve d'une plateforme etablie
- Trouver un add-on equivalent sur une plateforme plus mature
- Cas Data Fetcher : "API Connector" existait pour Google Sheets (100K+ users) → replique pour Airtable
- Copier l'UX et adapter au contexte natif

### Etape 4 — Verifier l'integration technique
- API publique disponible ?
- Marketplace / SDK d'extension ?
- Qualite de la documentation ?

### Etape 5 — Calcul rapide (napkin maths)
- Nombre d'utilisateurs de la plateforme
- Frequence du probleme
- Pricing sur la plateforme etablie → benchmark de prix

### Etape 6 — La plateforme va-t-elle vous ecraser ?
- Consulter roadmap, forums de support
- Evaluer la probabilite d'une feature native
- Chercher le "sweet spot" entre 2 features existantes (pour Data Fetcher : entre scripting et no-code imports)

## Plateformes recommandees (2025-2026)
- **Notion** — API relativement nouvelle, encore beaucoup d'opportunites (automation, reporting, import/export)
- **Figma** — Opportunites d'export vers Webflow, Framer, etc.
- **A EVITER :** ChatGPT / Claude → trop de competition, "everyone and their dog is building for it"
- Mieux vaut UTILISER l'IA pour supercharger son outil que de DEPENDRE de l'IA

## Strategie de croissance (0 → $23K MRR)
1. **Premiers clients en quelques jours** grace au marketplace Airtable (distribution gratuite, leads qualifies, confiance)
2. Identifier les **use cases recurrents** et APIs populaires
3. **Content marketing** cible : blog posts + videos YouTube sur chaque integration populaire → 1K MRR en quelques mois → 3K apres 1 an
4. Construire des **integrations no-code** pour les moins techniques → 10K MRR apres 1 an
5. Rinse & repeat (ecouter → construire → en parler) → 20K apres 3 ans

## Stack technique
- **Frontend extension :** TypeScript, React, Airtable Extension SDK
- **Backend :** TypeScript, PostgreSQL, GraphQL, Node.js
- **Site marketing :** Next.js, Tailwind, shadcn/ui
- **Hosting :** Heroku ($2 500/mois)
- **Support :** Help Scout
- **Email :** Fastmail (perso), Mailer Lite (newsletter)
- **Analytics :** Plausible, ChartMogul
- **Gestion produit :** Airtable (roadmap, content pipeline)

## Chiffres cles
- **MRR :** $23 000
- **Clients payants :** 600
- **Marge :** 85%
- **Couts mensuels :** ~$3 650 (hosting $2 500 + outils SaaS $1 000 + coworking $150)
- **Timeline :** 1K (quelques mois) → 3K (1 an) → 10K (2 ans) → 23K (5 ans)

## Tips cles
- **"Focus over shiny objects"** — a perdu 6 mois a lancer des side projects par ennui
- **Utilise Claude comme business coach** — quand il se disperse, il demande a Claude de le remettre en focus (et ca marche)
- **User testing = revelation** — en 1 apres-midi de tests utilisateurs, a decouvert tous les problemes UX → revenus augmentes "almost overnight"
- **Le sweet spot indie** — assez gros pour changer ta vie, trop petit pour attirer les VC qui leveraient $100M
- **Platform risk est reel** mais gerable si tu es dans le bon "sweet spot" fonctionnel
