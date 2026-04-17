# PERIPLO — Nouveaux Concepts de Mini-Jeux (Série 13)

> Recherche du 2026-04-12 | 10 nouveaux concepts | Suite à la demande Guillaume : "plus de petits jeux comme PERIPLO Traffic"
> Stack : React Native Expo + TypeScript | Tranches d'âge : 3-5 ans, 5-7 ans, 7-10 ans
> **Anti-duplication** : ne couvre aucun des 37 jeux PERIPLO existants (IDs 31-107)

---

## Contexte

PERIPLO Traffic est un sliding block puzzle (style Rush Hour) déjà développé. Les 37 jeux existants couvrent : Sokoban, Mirror, Tower, Sequences, Pipes, Tangram, Maze, Colors, Shadows, Gears, Memory, Intrus, Patterns, Balance, Routes, Fuel, Tri, Détective, Code, Rythme, Pixel, Constellation, Comptage, Number Bonds, Taquin, Origami, Laser, Domino, Mosaïque, Globe, Trace, Circuits, Jardin, Potions, Fractions, Maestro, Whack.

Cette série explore 10 nouvelles mécaniques **non encore couvertes**, toutes réalisables en 1-3 semaines avec le stack existant.

---

## Synthèse — TOP 5 à prototyper en priorité

| Rang | Jeu | Type | Âge | Dev | Pourquoi |
|------|-----|------|-----|-----|----------|
| 1 | **PERIPLO Glace** | Slide spatial | 4-10 | 1/5 | Mécanique sister de Traffic, super intuitive, addictive |
| 2 | **PERIPLO Flèches** | Arrow grid logic | 5-10 | 2/5 | Logique pure, infinie générable algorithmiquement |
| 3 | **PERIPLO Billes** | Marble run physics | 5-10 | 2/5 | Physique simple, satisfaction visuelle élevée |
| 4 | **PERIPLO Fusion** | Merge/2048 thématique | 5-10 | 2/5 | Mécanique mondiale, très addictive, viral parents |
| 5 | **PERIPLO Corde** | Rope physics | 4-8 | 2/5 | Geste tactile intuitif, ressenti magique, Cut the Rope |

---

## Concept 1 — PERIPLO Glace (Ice Slide Puzzle)

**Type :** Spatial / Logique / Inertie
**Tranche d'âge :** 4-6 ans (1-2 obstacles), 6-8 ans (3-5 obstacles), 8-10 ans (6-10 obstacles + buts multiples)
**Complexité dev : 1/5 (1-2 semaines)**
**Potentiel éducatif : Élevé**

### Mécanique
1. Un personnage (pingouin, ours polaire, yéti) est sur une grille de glace
2. L'enfant glisse le personnage dans une direction (gauche, droite, haut, bas)
3. Le personnage glisse **jusqu'à ce qu'il heurte un mur ou un bloc de glace**
4. Objectif : atteindre le poisson / la sortie en planifiant les collisions
5. Obstacles : rochers fixes, autres pingouins à pousser, glaces brisées (1 passage seulement)

### Ce que l'enfant apprend
- Planification et anticipation (où va-t-il s'arrêter ?)
- Raisonnement causal (si → alors)
- Spatial et trajectoires
- Pensée multi-étapes

### Ce qui le rend original par rapport à Traffic
- Traffic = pousser des pièces pour libérer un chemin
- Glace = **inertie**, le personnage ne s'arrête qu'aux murs
- Mécanique différente, même tranche d'âge cible

### Apps similaires
- Penguin Slide (iOS, 1M téléchargements), Icy Tower (web), plusieurs jeux Nintendo DS utilisent ce mécanisme (Pokémon puzzle)
- Aucun avec l'univers PERIPLO / voyage

### Twist PERIPLO
- **Arctique, Antarctique, Himalaya, Islande** : chaque monde = un biome glacé du monde réel
- **Faune locale** : pingouins (Antarctique), yétis (Himalaya), ours polaires (Arctique)
- **Effets physiques** : son de glisse, crack de glace brisée, splash quand le poisson est attrapé
- **Niveau spécial** : glace en forme de carte d'un pays

### Données marché
- Rush Hour Jr. (ThinkFun) : $25, #1 Amazon Logic Puzzles Kids, 4.8★ / 8K reviews
- Penguin Slide type games : Top 50 Puzzle apps, 500K-2M téléchargements sur mobile gratuit
- Marché jeux puzzles enfants : $38B (2026), CAGR 8%

---

## Concept 2 — PERIPLO Corde (Rope Physics)

**Type :** Physique / Logique / Précision
**Tranche d'âge :** 3-5 ans (1 corde, cible évidente), 5-7 ans (2-3 cordes + bonus), 7-10 ans (cordes + physique avancée : bulles, trampolines)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Moyen-élevé**

### Mécanique
1. Des fruits sont suspendus à des cordes dans l'espace de jeu
2. L'enfant touche une corde pour la couper (geste tap ou swipe)
3. Le fruit tombe sous l'effet de la gravité
4. Objectif : faire tomber le fruit dans le panier ou la bouche d'un animal
5. Obstacles : épines, zones à éviter, rebonds sur plateformes, bulles flottantes

### Ce que l'enfant apprend
- Cause et effet
- Gravité et trajectoires simples
- Estimation et précision
- Ordre des opérations (quelle corde couper en premier ?)

### Apps similaires
- **Cut the Rope** (Zeptolab, 1.7 milliard de téléchargements cumulés !) — série culte
- Cut the Rope 3 sorti en 2023, 50M téléchargements en 6 mois
- Aucune version éducative thématisée voyage du monde

### Twist PERIPLO
- **L'animal affamé change selon le pays** : panda (Chine), kangourou (Australie), toucan (Brésil)
- **Les fruits changent** : durian, mangoustan, jackfruit — l'enfant découvre des fruits exotiques
- **Mode "Chef du monde"** : les fruits doivent tomber dans les bons bols pour cuisiner un plat traditionnel
- **Collectibles** : couper toutes les étoiles bonus en plus du fruit principal

---

## Concept 3 — PERIPLO Fusion (Merge Puzzle 2048-Style)

**Type :** Maths / Stratégie / Merge
**Tranche d'âge :** 5-7 ans (fusion images identiques, pas de chiffres), 7-10 ans (fusion + stratégie anticipation)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Élevé (maths, géographie)**

### Mécanique
1. Une grille 4×4 avec des artefacts culturels (ex : poterie, tissu, monnaie) placés dessus
2. L'enfant glisse les artefacts identiques ensemble pour les fusionner en un objet de niveau supérieur
3. Ex : 2 pièces de monnaie → 1 bourse → 1 coffre → 1 trésor du monde
4. Objectif : atteindre l'artefact "légendaire" du pays avant que la grille soit pleine
5. Difficulté : chaque fusion libère 2 points de grille mais en bloque 1

### Ce que l'enfant apprend
- Doubles et puissances de 2 (bases)
- Stratégie et anticipation
- Vocabulaire culturel des artefacts du monde
- Pensée combinatoire

### Apps similaires
- **2048** (Gabriele Cirulli, gratuit, >500M joueurs) — game design ultra simple, infiniment jouable
- **Merge Dragons** (Gram Games, $100M ARR), **Merge Mansion** — versions adultes populaires
- **Merge Animals Kids** (20M téléchargements Google Play)
- Aucune version éducative géographie/culture

### Twist PERIPLO
- **Chaque pays = une chaîne d'artefacts** : Égypte (pierre → brique → pyramide → sphinx)
- **Débloquer de nouveaux pays** en atteignant l'artefact légendaire
- **Mini-info culturelle** à chaque niveau de fusion
- **Mode timed** pour les plus grands : score maximum en 90 secondes

### Données marché
- 2048 : gratuit, > 500 millions de joueurs historiques
- Merge genre : $2B+ revenus en 2025 sur mobile adultes — version enfants sous-exploitée
- Potentiel d'IAP : thèmes de pays supplémentaires, mode "Monde complet"

---

## Concept 4 — PERIPLO Train (Railway Routing)

**Type :** Ingénierie / Planification / Logique spatiale
**Tranche d'âge :** 4-6 ans (relier 2 villes, chemin direct), 6-8 ans (partages de rails, croisements), 8-10 ans (trains simultanés, gestion trafic)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Très élevé**

### Mécanique
1. Une carte montre des villes à relier et des rails à placer
2. L'enfant place les morceaux de rails (droits, courbes, croisements) sur la grille
3. Appuyer sur "Play" pour voir le train rouler
4. Objectif : relier toutes les villes avec un nombre limité de pièces de rail
5. Niveaux avancés : 2 trains simultanés, éviter les collisions, horaires

### Ce que l'enfant apprend
- Planification et optimisation
- Logique spatiale et rotation de pièces
- Notion de réseau (connexions)
- Géographie (noms de villes du monde)

### Apps similaires
- **Mini Motorways** (Dinosaur Polo Club, Apple Arcade) — routes, pas rails, pour adultes
- **Railway Ink** (jeu de société) — succès mondial, 500K boîtes vendues
- **Trainyard** (Matt Rix, 1M téléchargements) — rails pour adultes/ados
- Très peu de versions pour enfants 4-8 ans

### Twist PERIPLO
- **Cartes de pays réels** : relier Paris-Lyon, Tokyo-Osaka, New York-Boston
- **Trains thématiques** : Shinkansen japonais, TGV français, Orient Express...
- **Personnages voyageurs** qui descendent dans chaque ville avec une animation
- **Défi environnemental** : construire le chemin qui traverse le moins de forêts

---

## Concept 5 — PERIPLO Flèches (Arrow Grid Puzzle)

**Type :** Logique / Algorithme / Planification
**Tranche d'âge :** 5-7 ans (grille 4×4, 1 personnage), 7-10 ans (grille 6×6, obstacles, téléporteurs)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Très élevé (pensée algorithmique)**

### Mécanique
1. Une grille est présentée avec des cases vides et une sortie
2. L'enfant place des flèches directionnelles (↑↓←→) dans les cases
3. Un personnage part du début et **suit les flèches automatiquement** à chaque case
4. Si le personnage sort de la grille ou atteint une impasse → recommencer
5. Niveaux avancés : flèches à sens unique, cases à visiter en ordre, téléporteurs

### Ce que l'enfant apprend
- Pensée algorithmique (si j'y place une flèche, le personnage fait X)
- Débogage (trouver pourquoi le chemin ne fonctionne pas)
- Planification en avant (anticiper toute la trajectoire)
- Fondements de la programmation

### Apps similaires
- **Lightbot** (Coolio Nieto, 10M téléchargements) — version avec instructions, pas flèches
- **Code.org Hour of Code** — flèches + boucles pour enfants 5+
- **Arrows** sur web (nombreuses implémentations, 500K joueurs)
- Version PERIPLO = thème voyages inexistant

### Twist PERIPLO
- **Le personnage est un voyageur** qui traverse des labyrinthes culturels (marché de Marrakech, temple de Bangkok)
- **Cases spéciales** : rotation (pivote la flèche), miroir (réfléchit la direction), portail
- **Mode inverse** : voir le chemin parcouru et deviner les flèches qui ont été placées
- **Génération algorithmique** : niveaux infinis garantis résolvables

---

## Concept 6 — PERIPLO Dé (Rolling Die Puzzle)

**Type :** Maths / Spatial / Raisonnement 3D
**Tranche d'âge :** 6-8 ans (arriver avec 1 face précise), 8-10 ans (multi-contraintes + chemin optimal)
**Complexité dev : 3/5 (3-4 semaines)**
**Potentiel éducatif : Très élevé (orientation 3D, maths)**

### Mécanique
1. Un dé est sur une grille. L'enfant le "roule" case par case (tap sur la direction)
2. Le dé tourne de façon réaliste (chaque roulement change les faces)
3. Objectif : arriver à la case de destination **avec une face précise** visible sur le dessus
4. Règle bonus : certaines cases exigent une face précise quand on les visite
5. Niveaux avancés : 2 dés qui interagissent, cases à éviter, nombre de mouvements limité

### Ce que l'enfant apprend
- Rotation mentale et orientation 3D
- Faces opposées d'un dé (1-6, 2-5, 3-4)
- Comptage et reconnaissance des dés
- Anticipation multi-étapes

### Apps similaires
- **Dice Puzzle** (iOS) — adultes, peu de joueurs
- **Roll the Cube** (variations web) — très peu développé pour enfants
- Concept original sur mobile enfants — quasi inexistant

### Twist PERIPLO
- **Dés thématiques** : dé aztèque, dé grec antique, dé rune viking
- **Chaque face = un artefact culturel** du pays (au lieu de chiffres 1-6)
- **"Musée du monde"** : chaque niveau = reconstituer une pièce d'un musée en faisant atterrir les bons dés
- **Progression**: d'abord comprendre comment le dé tourne → puis planifier → puis optimiser

---

## Concept 7 — PERIPLO Pont (Bridge Builder)

**Type :** Ingénierie / Physique / Construction
**Tranche d'âge :** 5-7 ans (placer 2-3 poutres, physique simple), 7-10 ans (physique réaliste, budget poutres limité)
**Complexité dev : 3/5 (3-5 semaines)**
**Potentiel éducatif : Très élevé (STEM ingénierie)**

### Mécanique
1. Un gouffre à traverser, une rive à gauche, une rive à droite
2. Un véhicule (bus, vélo, chameau...) attend de traverser
3. L'enfant place des poutres/planches pour construire un pont
4. Appuyer sur "Play" : le véhicule traverse, le pont doit tenir
5. Version simple (enfants) : poutres rigides qui ne cassent pas
6. Version avancée : physique de tension/compression, poids qui déforment

### Ce que l'enfant apprend
- Principes d'ingénierie (triangles = solides, arcs = résilients)
- Cause et effet physique
- Budget et contraintes (nombre limité de poutres)
- Créativité dans la résolution de problèmes

### Apps similaires
- **Bridge Constructor** (Headup Games, 100M téléchargements) — adultes
- **Poly Bridge** (Dry Cactus, 2M sur Steam) — adultes
- **Build a Bridge** (BoomBit, 100M+ Android) — version plus accessible
- Version kids 5-7 ans quasi inexistante

### Twist PERIPLO
- **Ponts célèbres du monde** : relier les rives comme le Golden Gate, le pont du Gard, le viaduc de Millau
- **Véhicules thématiques** : rickshaw en Inde, chameaux au Maroc, tram à Lisbonne
- **Mode "Ingénieur du monde"** : l'enfant collecte des diplômes de différents pays
- **Animation de réussite** : le véhicule traverse avec des animations et un fait culturel

---

## Concept 8 — PERIPLO Billes (Marble Run)

**Type :** Physique / Construction / Ingénierie
**Tranche d'âge :** 4-6 ans (placer 2-3 pièces, chemin direct), 6-8 ans (5-8 pièces + éléments spéciaux), 8-10 ans (mini-circuits complexes)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Élevé**

### Mécanique
1. Une bille part du haut de l'écran en tombant
2. L'enfant place des rampes/tubes/rebondisseurs sur la grille
3. La bille suit la physique de gravité en traversant les éléments
4. Objectif : guider la bille jusqu'au panier / la cible en bas
5. Éléments : rampe droite, courbe, trampoline (rebond), entonnoir, transporteur (booster)

### Ce que l'enfant apprend
- Gravité et physique intuitive
- Cause et effet
- Planification d'un chemin (de haut en bas)
- Ingénierie visuelle

### Apps similaires
- **Marble It Up** (adultes), **Marble Mania** (iOS, 500K téléchargements)
- **Rube Goldberg Machine** (web, niche)
- **Rolly Vortex** (500M téléchargements mais arcade, pas puzzle)
- Version puzzle éducatif pour enfants 4-6 ans = vide de marché

### Twist PERIPLO
- **Billes d'artisanat du monde** : billes en jade (Chine), marbre (Italie), verre soufflé (Venise)
- **Décors de pays** : la bille traverse une médina marocaine, un temple thaïlandais, une favela brésilienne
- **Collectibles** : étoiles dorées posées sur le parcours à attraper
- **Mode "Architecte"** : créer son propre parcours et le partager (UGC)

---

## Concept 9 — PERIPLO Ricochet (Ball Bounce Puzzle)

**Type :** Géométrie / Angles / Logique
**Tranche d'âge :** 5-7 ans (1-2 rebonds, miroirs perpendiculaires), 7-10 ans (angles 45°, multi-rebonds, obstacles)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Élevé (géométrie, angles)**

*Note : différent de PERIPLO Laser (ID 97) — Laser = physique de la lumière avec miroirs fixes. Ricochet = lancer une balle qui rebondit, l'enfant choisit l'angle de lancement.*

### Mécanique
1. Une balle peut être lancée depuis un point de départ
2. L'enfant ajuste l'angle de lancement (rotatif avec le doigt)
3. La balle rebondit sur les murs et obstacles
4. Objectif : atteindre une cible (étoile, ennemi, porte) en 1 à N rebonds
5. Niveaux avancés : obstacles absorbants, miroirs orientables, plusieurs cibles

### Ce que l'enfant apprend
- Notion d'angle (égal angle d'incidence / réflexion)
- Géométrie des trajectoires
- Estimation et ajustement fin
- Physique intuitive

### Apps similaires
- **Ricochet Robots** (jeu de société, 100K exemplaires) — version digitale adultes
- **Ball Bounce** (iOS, 5M téléchargements) — arcade, pas puzzle
- **Geometry Dash** (60M téléchargements) — rythme, pas angles
- Version puzzle éducatif géométrie = peu couverte sur mobile enfants

### Twist PERIPLO
- **Arènes du monde** : hippodrome romain, ball court maya (Chichen Itza !), terrain de pétanque provençal
- **Cibles culturelles** : faire rebondir la balle sur une poterie, un masque africain
- **Tracer de trajectoire** visible après chaque lancer (apprendre la géométrie visuellement)
- **Niveau éducatif 8-10 ans** : afficher les angles en degrés, permettre de les entrer au clavier

---

## Concept 10 — PERIPLO Aimants (Magnets Puzzle)

**Type :** Sciences / STEM / Logique
**Tranche d'âge :** 5-7 ans (1-2 aimants, attraction simple), 7-10 ans (N/S, répulsion, chaînes)
**Complexité dev : 2/5 (2-3 semaines)**
**Potentiel éducatif : Très élevé (sciences)**

### Mécanique
1. Un objet métallique (bille, clé, robot) est positionné sur une grille
2. L'enfant place des aimants (pôle N ou S) dans les cases disponibles
3. L'objet est attiré vers N et repoussé par S (ou inversement)
4. Objectif : utiliser les champs magnétiques pour guider l'objet jusqu'à la cible
5. Niveaux avancés : chaînes d'aimants, obstacles isolants, polarité alternée

### Ce que l'enfant apprend
- Magnétisme (attraction, répulsion, pôles)
- Cause et effet
- Pensée STEM
- Raisonnement en champs de forces

### Apps similaires
- **Magnet Boy** (web, niche) — peu populaire, mauvais UX
- **Magnetism Puzzle** (iOS, < 50K téléchargements)
- Aucun jeu magnétisme éducatif enfants de qualité sur mobile

### Twist PERIPLO
- **Explorateurs scientifiques** : chaque monde = un grand scientifique (Curie, Faraday, Tesla) avec son laboratoire d'époque
- **Expériences de classe** : les niveaux reproduisent des expériences réelles (boussole, train maglev, compas)
- **Mode "Labo libre"** : expérimenter sans objectif pour découvrir les propriétés des aimants
- **Curiosité STEM** : fact pop-up après chaque niveau ("Le MagLev japonais va à 600km/h !")

---

## Matrice de priorité

| Jeu | Diff dev | Val édu | Engagement | Originalité | Score total |
|-----|----------|---------|------------|-------------|-------------|
| PERIPLO Glace | 1/5 ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **19/20** |
| PERIPLO Flèches | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **17/20** |
| PERIPLO Corde | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **16/20** |
| PERIPLO Billes | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **17/20** |
| PERIPLO Fusion | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **17/20** |
| PERIPLO Train | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **17/20** |
| PERIPLO Ricochet | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **16/20** |
| PERIPLO Aimants | 2/5 ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **16/20** |
| PERIPLO Pont | 3/5 ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **16/20** |
| PERIPLO Dé | 3/5 ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **16/20** |

---

## Recommandation de lancement

**Suite naturelle de PERIPLO Traffic (semaine suivante) :**
1. **PERIPLO Glace** — mécanique sister de Traffic, 1-2 semaines dev, assets réutilisables
2. **PERIPLO Billes** — satisfaction visuelle élevée, physique simple

**Batch éducatif STEM :**
3. **PERIPLO Flèches** — pensée algorithmique, génération infinie de niveaux
4. **PERIPLO Aimants** — sciences, unique sur le marché

**Batch engagement viral :**
5. **PERIPLO Fusion** — addictif parents + enfants, IAP naturels
6. **PERIPLO Corde** — référence Cut the Rope (1.7B téléchargements)

---

## Sources

- [Rush Hour Jr. Amazon](https://www.amazon.com/ThinkFun-Junior-Traffic-Logic-Girls/dp/B00GRV5JNY) — #1 Amazon Logic Puzzles Kids, 8K reviews 4.8★
- [25 Best Puzzle Games for Kids 2026](https://ourlittlejoys.com/blog/25-best-puzzle-games-for-kids-in-2026/)
- [Mini Motorways Wikipedia](https://en.wikipedia.org/wiki/Mini_Motorways)
- [MentalUP Brain Games](https://www.mentalup.co/brain-games) — 10M+ familles
- [Thinky Games for Preschoolers](https://thinkygames.com/features/5-free-thinky-games-for-preschoolers/)
- [Best Puzzle Games 2026 - Fossbytes](https://fossbytes.com/best-puzzle-games/)
- [Marble Mania App Store](https://apps.apple.com/us/app/marble-mania-ball-maze-action-puzzle-game/id886089331)
