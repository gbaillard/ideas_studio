# IDEAS_STUDIO — Rules

## Conventions projet
1. **Emplacement** : `PROJECT/APP/IDEAS_STUDIO/` (PAS dans PROJECT/ racine)
2. **memory_claude/** obligatoire : ONBOARDING.md, CODE_REPORT.md, RULES.md
3. **Chaque idée** doit avoir : nom, catégorie, difficulté, investissement, revenu estimé, outils, process étape par étape
4. **Chaque tutoriel** doit avoir : source YouTube (titre, URL, chaîne, vues), process numéroté, outils mentionnés, chiffres/revenus, tips clés
5. **Exclusions** : pas de langues/language learning, pas de sport/nutrition/fitness, pas de méditation
6. **Données d'abord** : toujours valider une idée avec des données réelles (ventes Amazon, stats Etsy) avant de la recommander
7. **Numérotation des tutoriels** : séquentielle (01_, 02_, ..., 61_, etc.)

## Conventions dev (app Vue.js)
1. Stack : Vue 3 + Vite, pas de TypeScript pour rester simple
2. Données dans `src/data/ideas.json`
3. Les commentaires de Guillaume sont stockés en localStorage
4. Port par défaut : 8090 (dev) / 40300 (Docker prod)
5. Docker avec `--restart unless-stopped` pour persistance
6. Toujours rebuild Docker apres chaque modification significative du JSON ou du code

## Workflow des idées (nouveau)
1. Chaque idée a un champ `feasibility` : verdict (acceptee/rejetee), summary, details[], date
2. Les études de faisabilité ont 5 critères obligatoires :
   - Credibilite revenus (chiffres réalistes ?)
   - Faisabilite technique (stack maitrisable ?)
   - Echelle humaine (faisable solo ?)
   - Marche reel (demande verifiee ?)
   - Outils disponibles (outils cites fonctionnent ?)
3. Statuts possibles : Nouveau, Acceptee, Rejetee, En cours, En attente, Abandonnee, Publiee
4. Être critique et honnête : un bon taux de rejet = 25-35%
5. Utiliser un agent "second avis" pour reconcilier les verdicts sur les sujets importants

## Mémoire
1. Mettre à jour CODE_REPORT.md après chaque session de travail significative
2. Mettre à jour ONBOARDING.md si la structure ou les stats changent
3. **Ne jamais perdre le fil** : persister immédiatement toute info importante
