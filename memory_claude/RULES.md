# IDEAS_STUDIO — Rules

## Données
- Chaque idée : nom, catégorie, difficulté, investissement, revenu estimé, outils, process
- Chaque tutoriel : source YouTube (titre, URL, chaîne, vues), process numéroté, outils, chiffres, tips
- **Exclusions** : pas de langues/language learning, sport/fitness, méditation
- **Données d'abord** : valider avec données réelles (Amazon, Etsy) avant de recommander

## Dev (app Vue.js)
- Stack : Vue 3 + Vite + Express.js + SQLite, pas de TypeScript
- Source de vérité idées : `src/data/ideas.json`
- Ports : 8090 (dev) / 40300 (Docker prod)
- Docker : `--restart unless-stopped`, rebuild après chaque modif significative
- Volume Docker : `/Volumes/T500/PROJECT/VOLUME/ideas-studio/`

## Workflow des idées
- Feasibility : verdict, summary, details[] (5 critères : Crédibilité revenus, Faisabilité technique, Échelle humaine, Marché réel, Outils disponibles), date
- Statuts : Nouveau → Acceptée/Rejetée → En Etude de projet → En attente → Abandonnée → Publiée
- Taux de rejet sain : 25-35%

## Mémoire
- CODE_REPORT.md : màj après chaque session. Si >200 lignes → archiver dans CODE_REPORT_ARCHIVE.md
- ONBOARDING.md : màj si structure/stats changent
- Persister immédiatement toute info importante
