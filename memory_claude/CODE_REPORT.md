# IDEAS_STUDIO — Code Report

## Session 2026-04-08 (création)
- Projet créé dans PROJECT/IDEAS_STUDIO/ (erreur : aurait dû être dans PROJECT/APP/)
- 6 agents parallèles lancés → 107 idées brutes dans 6 catégories
- Fiches idées créées dans fiches_idees/ (6 fichiers markdown)
- INDEX.md et README.md créés
- App Vue 3 + Vite initialisée dans app/

## Session 2026-04-08 nuit (recherche massive)
- 12+ agents lancés au total
- 61 tutoriels YouTube documentés dans tutoriels/
- Chaînes fouillées : Wholesale Ted (8), Jordan Welch, Sean Dollwet, Alek, Kimberly Mitchell, etc.
- App web : 30 idées dans le JSON, dashboard avec filtres et commentaires
- yt-brain mis à jour avec cookies Chrome (fix blocage YouTube)

## Session 2026-04-09 (corrections)
- **CORRIGÉ** : déplacé de PROJECT/IDEAS_STUDIO/ vers PROJECT/APP/IDEAS_STUDIO/
- **CORRIGÉ** : ajouté memory_claude/ (ONBOARDING, RULES, CODE_REPORT)
- Mémoire BYTE mise à jour pour refléter ces corrections

## État actuel
- 107 idées dans 6 catégories (fiches_idees/)
- 61 tutoriels YouTube (tutoriels/)
- 30 idées détaillées dans l'app JSON (app/src/data/ideas.json)
- App web fonctionnelle (Vue 3 + Vite, port 8090)

## Session 2026-04-09 (suite corrections + Wholesale Ted complète)
- CORRIGÉ : déplacé de PROJECT/IDEAS_STUDIO/ vers PROJECT/APP/IDEAS_STUDIO/
- CORRIGÉ : ajouté memory_claude/ (ONBOARDING, RULES, CODE_REPORT)
- Wholesale Ted fouillée en profondeur : 240 vidéos listées, 13 extraites au total
- Ajout tutos 62-65 : Canva AI Trivia ($1.5K/jour), Clipart $4K/semaine, 10 Ways Nano Banana, 15 Ways Canva
- Total : 65 tutoriels

## État actuel
- 107 idées dans 6 catégories (fiches_idees/)
- **65 tutoriels YouTube** (tutoriels/)
- 30 idées détaillées dans l'app JSON (app/src/data/ideas.json)
- App web fonctionnelle (Vue 3 + Vite, port 8090)
- **13 vidéos Wholesale Ted** extraites sur 240 disponibles

## Vidéos Wholesale Ted EXTRAITES
1. fL_l8mxU148 — 5 Best AI Business Ideas (412K) — déjà dans session précédente
2. sq417HagzJM — How I'm ACTUALLY Making Money (191K) → tuto 26
3. GHCgg3WWHlU — Making Money Nano Banana (239K) → tuto 27
4. bQOQnNfBG7A — 1-Person AI Business Ideas (153K) → tuto 28
5. MsQYiBrE5qk — Best AI Businesses NO Money (228K) → tuto 29
6. jJ5a3MiLI_w — Claude AI Business RICH (182K) → tuto 30
7. Zl8C3YNquxw — AI Influencers FREE (113K) → tuto 31
8. UaoL86RZYTc — AI Dropshipping (46K) → tuto 32
9. 3lx4sXDvmoU — POD Still Worth It (126K) → tuto 33
10. AEUeN4a_VCs — BYE ETSY Alternative (215K) → tuto 59
11. Sorb3f2TrWc — Canva AI Side Hustle (1.6M) → tuto 62
12. M9ZOiqxuMsg — $3,995/Week Canva Clip Art (1.2M) → tuto 63
13. dip5HXMpujw — 10 Ways Nano Banana (626K) → tuto 64

## Vidéos Wholesale Ted EXTRAITES (suite)
14. 0lr61BObhCs — 15 Ways Make Money Canva (835K) → tuto 65
15. rNBiTOwXWto — Dot-to-Dot Canva (614K) → tuto 66
16. 8dBDoJWIbOQ — AI Influencer Side Hustle (551K) → tuto 67
17. cYOXNI4Gr70 — 108 Free AI Tools (177K) → tuto 68
18. 9SJQMaxdKe0 — AI Bubble Popping (51K) → tuto 69
19. us_9ogFJRUo — Claude AI 5 Business Ideas → tuto 70
20. 7mBdqR8Q0Og — Fiverr $500 Amazon (538K) → tuto 71
21. 4--K3Lx1e_g — AI Like Top 1% (14K) → tuto 72

**NON EXTRAITE** (transcript corrompu) :
- ReHGSGwV4-A — Resell Free Pictures Profit (814K) — auto-transcription YouTube illisible

## Session 2026-04-10 marathon nuit (2h-6h30)

### Fonctionnalite : Workflow de statuts + etudes de faisabilite
- Ajout d'un champ `feasibility` a chaque idee : `verdict`, `summary`, `details[]` (5 criteres), `date`
- 5 criteres : Credibilite revenus, Faisabilite technique, Echelle humaine, Marche reel, Outils disponibles
- 7 statuts : Nouveau, Acceptee, Rejetee, En cours, En attente, Abandonnee, Publiee
- Statuts persistes en localStorage + derivation du verdict de faisabilite
- Page detail : nouvelle section "Etude de faisabilite" avec verdict visuel, details critere par critere
- Dashboard : nouveau filtre "Tous statuts" + point de couleur statut sur chaque carte
- 164/164 idees evaluees par moi + reconciliees avec un agent "second avis"

### Session 6h00 (2eme vague de recherche)
- 6 agents lances : passive income AI, under-the-radar, indie kids game, nouvelles plateformes, automation workflows, enrichissement TOP 20
- 5 rapports de recherche produits (serie 10_*)
- 9 nouvelles idees ajoutees avec feasibility directe
- 3 idees flaggees par l'enrichissement (ReturnFlow, Finance YouTube, Flip Micro-Apps)

## Session 2026-04-10 (recherche massive + app refonte)

### Recherche multi-agents (20+ agents lancés)
- 4 agents recherche business IA initiale → 80 nouvelles idées dans rapports
- 4 agents recherche jeux enfants PERIPLO → 55 concepts de jeux
- 6 agents deep-dive round 2 (AI agents, Etsy micro-niches, vibe coding, YouTube, kids monetization, PERIPLO concepts)
- 6 agents deep-dive round 3 (POD, micro-SaaS, freelance, KDP, game design, outils IA) - en cours
- 2 agents design UI (Dashboard redesign + Detail page improvements)

### App web refonte
- Stats header dynamiques (computed depuis ideas.json)
- Pills catégorie colorées avec compteurs
- Barres de couleur à gauche de chaque carte
- Page détail : section "Pourquoi cette idée" avec progress bars revenu/difficulté
- Page détail : navigation prev/next entre les idées
- Page détail : commentaires redesignés (avatar, delete, Ctrl+Enter)
- Dockerfile créé, déployé Docker port 40300 (--restart unless-stopped)

### État actuel
- **164 idées** dans l'app JSON (7 catégories) — **119 acceptées, 45 rejetées**
  - games: 37 | micro-saas: 33 | services: 32 | print-on-demand: 29 | kdp: 16 | youtube: 15 | apps: 1
- **25 rapports de recherche** dans recherches/ (séries 07-10 complètes)
- **72 tutoriels YouTube** dans tutoriels/
- App web fonctionnelle Vue 3 + Vite Docker port 40300
- **Études de faisabilité** : 155/155 idées évaluées (réconciliées avec agent second avis)
- **Workflow statuts** : Nouveau → Acceptée/Rejetée → En cours → Publiée (+ En attente, Abandonnée)

### Rapports de recherche produits (recherches/)
- 07_recherche_communautaire_2026-04-10.md (20 idées Reddit/forums)
- 07_success_stories_ia_revenus_2026.md (20 produits avec revenus)
- 07_tendances_produits_digitaux_2026.md (22 niches Etsy/Amazon)
- 07_jeux_educatifs_periplo_concepts.md (15 concepts jeux éducatifs)
- recherche_2026-04-10_nouvelles_idees.md (20 idées YouTube/AI)
- PERIPLO_GAMES_MEMOIRE_LOGIQUE_RAPPORT.md (15 concepts mémoire/logique)
- PERIPLO_PUZZLES_RAPPORT_COMPLET.md (15 concepts puzzles)
- 08_ai_agents_deep_dive.md (20 idées agents IA)
- 08_etsy_micro_niches_deep_dive.md (22 micro-niches Etsy)
- 08_kids_games_monetization.md (stratégie monétisation jeux enfants)
- 08_periplo_concepts_supplementaires.md (18 nouveaux concepts jeux)
- 08_vibe_coding_business.md (20 idées vibe coding)
- 08_youtube_deep_dive.md (20 niches YouTube IA)
- 09_pod_deep_dive.md (20 niches POD physique)
- 09_micro_saas_deep_dive.md (20 idées micro-SaaS)
- 09_freelance_ai_services.md (20 services freelance IA)
- 09_kdp_niches_deep_dive.md (20 niches KDP)
- 09_periplo_game_design_best_practices.md (guide UX/design jeux enfants)
- 09_guide_outils_ia_2026.md (catalogue complet outils IA 2026)

## TODO
- ~~Extraire les vidéos Wholesale Ted restantes~~ ✅ FAIT
- ~~Intégrer les idées dans le JSON de l'app~~ ✅ 131 idées intégrées
- ~~Rapports round 3 en cours~~ ✅ TOUS TERMINÉS ET INTÉGRÉS
- Guillaume doit choisir les projets à lancer en priorité
- **Analyse approfondie TOP 3** terminée : `fiches_idees/00_TOP_3_ANALYSE_APPROFONDIE.md`
  - Learn-to-Draw KDP = 🥇 9/10 (meilleur alignement + marge 45% + $0)
  - Dot-to-Dot KDP = 🥈 7.5/10 (moins saturé mais plus lent à produire)
  - Clipart POD Etsy = 🥉 6/10 (marge 18% physique trop faible, 85% digital OK)
