# PERIPLO GAMES -- Rapport Concepts Casse-Tete & Puzzles Enfants

> Recherche du 10 avril 2026 | Cible : enfants 3-10 ans
> Stack technique : React Native Expo + TypeScript | Deploy web Docker
> Contexte : suite du premier jeu PERIPLO_GAMES_TRAFFIC (sliding block / Rush Hour)

---

## Table des matieres

1. [Resume executif](#1-resume-executif)
2. [Grille comparative](#2-grille-comparative)
3. [Fiches detaillees (15 concepts)](#3-fiches-detaillees)
4. [Matrice de priorisation](#4-matrice-de-priorisation)
5. [Recommandations TOP 5](#5-recommandations-top-5)
6. [Sources](#6-sources)

---

## 1. Resume executif

Le marche des puzzle games pour enfants est massif (Puzzle Kids seul = 30M+ utilisateurs mensuels). Apres le succes du concept Rush Hour avec PERIPLO_GAMES_TRAFFIC, il est strategique de capitaliser sur la marque PERIPLO en lancant d'autres casse-tete simples partageant le meme ADN :

- **Univers vehicules / transport** coherent avec la marque
- **Regles simples**, difficulte progressive
- **Developpement lean** (complexite 1-3/5) en React Native Expo
- **Cross-platform** web + mobile natif

Les 15 concepts ci-dessous ont ete selectionnes pour leur simplicite de developpement, leur potentiel educatif, et leur capacite a s'integrer dans l'univers PERIPLO.

---

## 2. Grille comparative

| # | Concept | Type | Age | Complexite Dev | Potentiel Edu | Priorite |
|---|---------|------|-----|---------------|---------------|----------|
| 1 | Tangram | Assemblage spatial | 4-10 | 2/5 | Tres eleve | A |
| 2 | Sokoban | Navigation/logique | 5-10 | 2/5 | Eleve | A |
| 3 | Flow Connect | Connexion/spatial | 4-10 | 2/5 | Eleve | A |
| 4 | Water Sort | Tri/sequence | 4-10 | 1/5 | Moyen-eleve | A |
| 5 | Taquin (15-puzzle) | Sliding/spatial | 5-10 | 1/5 | Eleve | A |
| 6 | Memory Match | Memoire/association | 3-8 | 1/5 | Eleve | B |
| 7 | Pipe Connect | Rotation/connexion | 5-10 | 2/5 | Eleve | B |
| 8 | Labyrinthe | Navigation | 3-8 | 2/5 | Moyen | B |
| 9 | Nonogram/Picross | Logique/pixel art | 6-10 | 3/5 | Tres eleve | B |
| 10 | Block Puzzle (Tetris-like) | Assemblage spatial | 5-10 | 3/5 | Eleve | C |
| 11 | Tour de Hanoi | Sequence/strategie | 5-10 | 1/5 | Tres eleve | B |
| 12 | Pattern Sequence | Memoire/pattern | 3-8 | 1/5 | Eleve | B |
| 13 | Gear Puzzle | Rotation/mecanique | 5-10 | 2/5 | Eleve | C |
| 14 | Spot the Difference | Observation | 3-8 | 2/5 | Moyen | C |
| 15 | Light Up (Akari) | Logique/placement | 7-10 | 3/5 | Tres eleve | C |

---

## 3. Fiches detaillees

---

### 3.1 -- TANGRAM

**Concept** : Le joueur dispose de 7 pieces geometriques (5 triangles, 1 carre, 1 parallelogramme) qu'il doit assembler pour reproduire une silhouette cible.

**Type** : Assemblage spatial / geometrie

**Tranche d'age** : 4-10 ans (3 niveaux de difficulte)

**Mecanique de gameplay** :
1. La silhouette cible est affichee en ombre
2. Le joueur drag & drop les pieces sur le canvas
3. Les pieces peuvent etre tournees (rotation 45 deg)
4. Snap magnetique quand la piece est proche de la bonne position
5. Validation automatique quand toutes les pieces sont placees

**Complexite de developpement** : 2/5
- Drag & drop natif React Native (react-native-gesture-handler)
- Geometrie 2D simple (polygones)
- Pas de physique necessaire
- Snap-to-grid / snap magnetique = logique simple
- Reference open source existante sur React

**Potentiel educatif** :
- Reconnaissance des formes geometriques
- Raisonnement spatial et rotation mentale
- Creativite et resolution de problemes
- Intuition pour la geometrie (angles, symetrie)

**Apps existantes** :
- My First Tangrams (1000+ puzzles, simplifie sans rotation)
- Kinder Tangram: Brain Game (puzzles + coloriage)
- PBS Kids Cyberchase Tangram
- Tangram - Educational Puzzle (App Store)

**Version PERIPLO** : "PERIPLO TANGRAM"
- Les silhouettes a reproduire sont des **vehicules** : voiture, camion, avion, bateau, fusee, velo, train...
- Chaque serie = un "voyage" dans un pays (silhouettes inspirees par la culture locale)
- Pieces colorees avec un design enfantin (yeux sur les triangles = personnages)
- Mode libre "Garage" : l'enfant cree ses propres vehicules

---

### 3.2 -- SOKOBAN

**Concept** : Le joueur deplace un personnage dans une grille et pousse des caisses vers des emplacements cibles. On ne peut pousser qu'une caisse a la fois, jamais tirer.

**Type** : Navigation / logique / planification

**Tranche d'age** : 5-10 ans

**Mecanique de gameplay** :
1. Grille 2D avec murs, caisses et cibles
2. Le joueur controle un personnage (swipe ou tap directionnel)
3. Pousser une caisse = avancer dans la meme direction
4. Impossible de pousser 2 caisses simultanement
5. Bouton "undo" et "restart" essentiels pour les enfants

**Complexite de developpement** : 2/5
- Grille discrete (pas de pixel-perfect)
- Logique de mouvement simple (collision check)
- Le plus complexe = le level design (mais generateurs existent)
- Animations simples (translation d'une case a l'autre)
- Nombreux repos open source de reference

**Potentiel educatif** :
- Planification et anticipation (penser 2-3 coups a l'avance)
- Raisonnement logique et spatial
- Patience et perseverance
- Comprehension cause-effet

**Apps existantes** :
- Sokoban Puzzle Game (App Store/Play Store)
- Bunny Push (version enfantine, 15 niveaux)
- Microchip Puzzle (12 niveaux faciles)
- The Sokoban (Nintendo Switch)

**Version PERIPLO** : "PERIPLO CARGO"
- Le personnage est un **petit chariot elevateur** dans un entrepot/port
- Les caisses sont des **conteneurs de couleur** a livrer sur les bons quais
- Theme portuaire : le joueur aide a charger un bateau
- Chaque monde = un port different (couleurs, decor)
- Les conteneurs peuvent contenir des "surprises" (stickers a collectionner)

---

### 3.3 -- FLOW CONNECT

**Concept** : Sur une grille, des paires de points colores doivent etre reliees par des "tuyaux" sans que les chemins ne se croisent, et en remplissant toute la grille.

**Type** : Connexion / raisonnement spatial

**Tranche d'age** : 4-10 ans

**Mecanique de gameplay** :
1. Grille avec paires de points colores
2. Le joueur trace un chemin en glissant le doigt d'un point a l'autre
3. Les chemins ne doivent pas se croiser
4. Toute la grille doit etre remplie
5. Difficulte = taille de grille (5x5 a 12x12) et nombre de couleurs

**Complexite de developpement** : 2/5
- Grille 2D, input tactile simple (gesture handler)
- Logique de pathfinding pour validation
- Generation de niveaux algorithmique (bien documente)
- Pas de physique, pas d'animations complexes
- Flow Free a 100M+ downloads = concept prouve

**Potentiel educatif** :
- Raisonnement spatial et planification
- Pensee sequentielle
- Reconnaissance des couleurs (petits)
- Resolution de problemes par essai-erreur

**Apps existantes** :
- Flow Free (100M+ downloads, reference du genre)
- Flow Mania
- Dot Connect (Razzle Puzzles)
- Line Puzzle: Pipe Art

**Version PERIPLO** : "PERIPLO ROUTES"
- Les points colores sont des **vehicules** et leurs **destinations** (voiture rouge -> garage rouge)
- Les chemins traces deviennent des **routes** visuellement
- Theme ville/carte : la grille ressemble a un plan de ville
- Chaque monde = un type de ville (village, metropole, ville spatiale)
- Animation de victoire : les vehicules roulent sur les routes tracees

---

### 3.4 -- WATER SORT (Tri de couleurs)

**Concept** : Des tubes contiennent des couches de liquide de differentes couleurs melanges. Le joueur verse le liquide d'un tube a l'autre pour trier toutes les couleurs (un tube = une seule couleur).

**Type** : Tri / sequence / logique

**Tranche d'age** : 4-10 ans

**Mecanique de gameplay** :
1. N tubes remplis de couches colorees melangees + 1-2 tubes vides
2. Tap sur un tube source, tap sur un tube destination
3. On ne peut verser que si la couleur du dessus correspond OU si le tube destination est vide
4. Objectif : chaque tube ne contient qu'une seule couleur
5. Pas de limite de temps, undo disponible

**Complexite de developpement** : 1/5
- Le plus simple de la liste a developper
- Pas de grille : juste des "stacks" (tableaux)
- Logique de pile (LIFO) triviale
- Animation de versement = simple transition CSS/Animated
- Generation de niveaux = melanger une solution valide

**Potentiel educatif** :
- Tri et classification
- Pensee sequentielle
- Planification (utiliser les tubes vides strategiquement)
- Reconnaissance des couleurs

**Apps existantes** :
- Water Sort Puzzle (mega hit, millions de downloads)
- Color Water Sort Puzzle Games
- Water Sorting Puzzle (Amazon)
- Ball Sort Puzzle (variante avec boules)

**Version PERIPLO** : "PERIPLO FUEL"
- Les tubes deviennent des **reservoirs de carburant** de differentes couleurs
- Chaque couleur = un type de carburant pour un vehicule specifique
- Theme station-service / garage
- Animation : quand un reservoir est trie, le vehicule correspondant fait le plein et s'en va
- Variante "huile moteur" avec des couleurs plus foncees pour les grands

---

### 3.5 -- TAQUIN (15-Puzzle / Sliding Tiles)

**Concept** : Une grille (3x3, 4x4...) avec des tuiles numerotees et une case vide. Le joueur fait glisser les tuiles pour les remettre dans l'ordre.

**Type** : Sliding / raisonnement spatial

**Tranche d'age** : 5-10 ans

**Mecanique de gameplay** :
1. Grille NxN avec N*N-1 tuiles et 1 case vide
2. Tap ou swipe sur une tuile adjacente a la case vide pour la deplacer
3. Objectif : remettre les tuiles dans l'ordre (ou reconstituer une image)
4. Compteur de mouvements et chrono optionnel
5. Difficulte : 3x3 (facile) -> 4x4 (moyen) -> 5x5 (difficile)

**Complexite de developpement** : 1/5
- Extremement bien documente (dizaines de repos React Native)
- Grille simple, logique de swap triviale
- Animations fluides avec react-native-reanimated
- Repos open source : marmelab/15-puzzle-app, nosovsh/fifteen
- Verification de solvabilite = algorithme connu

**Potentiel educatif** :
- Raisonnement spatial
- Planification et strategie
- Apprentissage des nombres (version numerotee)
- Patience et perseverance

**Apps existantes** :
- 15 Puzzle (multiple versions sur tous les stores)
- Sliding Puzzle (React Native repos existants)
- Puzzle Kids (mode slider)

**Version PERIPLO** : "PERIPLO PUZZLE"
- Les tuiles forment une **image de vehicule** a reconstituer
- Chaque serie = un type de vehicule (voitures classiques, avions, bateaux)
- Mode "Garage" : une fois l'image reconstituee, le vehicule s'anime
- Les tuiles peuvent avoir des indices visuels (bords colores)
- Version numerotee avec des **plaques d'immatriculation**

---

### 3.6 -- MEMORY MATCH

**Concept** : Des cartes sont disposees face cachee. Le joueur retourne 2 cartes a la fois pour trouver les paires identiques.

**Type** : Memoire / association

**Tranche d'age** : 3-8 ans (ideal premiers ages)

**Mecanique de gameplay** :
1. Grille de cartes face cachee (4x3 a 6x6)
2. Tap pour retourner une carte (animation flip)
3. Retourner une 2eme carte : si identique = la paire reste visible
4. Si differente = les 2 cartes se retournent apres 1 sec
5. Terminer quand toutes les paires sont trouvees

**Complexite de developpement** : 1/5
- Le jeu le plus simple a developper de la liste
- Logique de paires = tableau shuffle basique
- Animation flip = rotation 3D CSS ou Animated
- Aucune IA, aucun pathfinding
- Tutoriels React Native complets disponibles

**Potentiel educatif** :
- Memoire visuelle et de travail
- Concentration et attention
- Reconnaissance visuelle et vocabulaire (images thematiques)
- Prise de decision

**Apps existantes** :
- Kids Memory Game for Toddlers (Google Play)
- Match Cards: Memory Game
- WonderMini: Matching Game for Kids
- Memozor (web)

**Version PERIPLO** : "PERIPLO MEMORY"
- Les cartes representent des **vehicules** et leurs **attributs**
- Mode classique : trouver les paires de vehicules identiques
- Mode apprentissage : associer vehicule + son nom / vehicule + son bruit
- Mode avance : associer vehicule + drapeau du pays d'origine
- Collection : chaque paire trouvee debloque un vehicule dans l'album

---

### 3.7 -- PIPE CONNECT

**Concept** : Sur une grille, le joueur tourne des segments de tuyaux pour creer un circuit continu reliant un point source a un point destination (ou boucle fermee).

**Type** : Rotation / connexion / logique

**Tranche d'age** : 5-10 ans

**Mecanique de gameplay** :
1. Grille avec des segments de tuyaux (droit, coude, T, croix)
2. Tap sur un segment pour le tourner de 90 degres
3. Objectif : connecter la source (robinet) a la destination (fleur/maison)
4. L'eau coule visuellement quand le circuit est complet
5. Certaines pieces peuvent etre fixes (contraintes)

**Complexite de developpement** : 2/5
- Grille 2D, chaque cellule = un type de piece + rotation
- Logique de connexion = verifier les bords adjacents
- Animation de flux (eau qui coule) = optionnelle mais sympa
- Rotation = simple changement d'etat (0, 90, 180, 270)
- Generation de niveaux = partir d'un chemin valide et randomiser les rotations

**Potentiel educatif** :
- Raisonnement spatial (rotation mentale)
- Logique de connexion et circuits
- Planification
- Introduction a l'ingenierie

**Apps existantes** :
- Water Pipes (Google Play)
- Pipe Puzzle - Line Connect
- Pipe Match: Puzzle Game
- Pipe Way (web, 30 niveaux)

**Version PERIPLO** : "PERIPLO PLOMBIER" ou "PERIPLO CIRCUIT"
- Les tuyaux deviennent des **segments de route/rail**
- Objectif : creer un chemin pour qu'un vehicule aille du depart a l'arrivee
- Variante train : construire une voie ferree
- Variante avion : tracer des couloirs aeriens
- Animation de victoire : le vehicule parcourt le circuit construit

---

### 3.8 -- LABYRINTHE

**Concept** : Le joueur guide un personnage a travers un labyrinthe du point de depart au point d'arrivee.

**Type** : Navigation / exploration

**Tranche d'age** : 3-8 ans

**Mecanique de gameplay** :
1. Labyrinthe genere proceduralement (taille selon difficulte)
2. Le joueur trace le chemin avec son doigt OU controle un personnage
3. Collecte d'objets bonus sur le chemin (etoiles, pieces)
4. Timer optionnel pour les grands
5. Indices visuels pour les petits (couleurs, fleches subtiles)

**Complexite de developpement** : 2/5
- Algorithmes de generation de labyrinthes bien documentes (DFS, Prim, Kruskal)
- Rendu grille 2D simple
- Input tactile = tracer un chemin
- Pas de physique complexe
- Generation procedurale = rejouabilite infinie

**Potentiel educatif** :
- Coordination oeil-main
- Raisonnement spatial et orientation
- Patience et perseverance
- Prise de decision (choix aux embranchements)

**Apps existantes** :
- Mazes for Kids (App Store, labyrinthe + histoire)
- Dino Maze (theme dinosaures)
- Maze for Kids (labyrinthes proceduraux)
- Kids Mazes: Educational Game

**Version PERIPLO** : "PERIPLO MAZE"
- Le personnage est un **vehicule** (voiture, avion, bateau)
- Chaque monde = un type de terrain (routes, ciel, mer)
- Collecter du carburant sur le chemin (jauge qui baisse lentement)
- Labyrinthes en forme de vehicules ou de pays
- Mode "GPS" : l'enfant trace la route avant que la voiture ne la suive

---

### 3.9 -- NONOGRAM / PICROSS

**Concept** : Une grille avec des indices numeriques sur chaque ligne et colonne. Le joueur noircit les bonnes cases pour reveler une image cachee.

**Type** : Logique / deduction / pixel art

**Tranche d'age** : 6-10 ans (requiert lecture des nombres)

**Mecanique de gameplay** :
1. Grille 5x5 a 15x15 avec indices numeriques
2. Tap pour noircir une case, long-press pour marquer "vide"
3. Les indices indiquent les sequences de cases pleines par ligne/colonne
4. L'image se revele progressivement
5. Verification automatique ou mode sans erreur pour debutants

**Complexite de developpement** : 3/5
- Grille 2D avec 2 etats par cellule
- Logique de validation = verifier les sequences
- Generation de puzzles a partir d'images = algorithme a implementer
- UI un peu plus complexe (indices + grille + interaction)
- Necessite un bon tutoriel in-app pour les enfants

**Potentiel educatif** :
- Logique deductive avancee
- Comprehension des nombres et sequences
- Concentration soutenue
- Pensee combinatoire
- Creativite (l'image qui se revele = recompense)

**Apps existantes** :
- Nonogram.com (Easybrain)
- Pixelogic (5x5 a 25x25)
- Nonogram Crossing (3000+ puzzles)
- Nonogram Katana Online

**Version PERIPLO** : "PERIPLO PIXEL"
- Les images cachees sont des **vehicules pixelises**
- Chaque puzzle resolu ajoute le vehicule a la collection
- Grilles petites (5x5) pour les debutants = silhouettes simples
- Palette de couleurs PERIPLO (nonograms couleur pour les grands)
- Mode creation : l'enfant dessine son vehicule et le partage en puzzle

---

### 3.10 -- BLOCK PUZZLE (Tetris-like)

**Concept** : Le joueur place des pieces de formes variees (type Tetris) sur une grille pour remplir des lignes ou colonnes completes, qui disparaissent ensuite.

**Type** : Assemblage spatial / strategie

**Tranche d'age** : 5-10 ans

**Mecanique de gameplay** :
1. Grille 8x8 ou 10x10
2. 3 pieces de formes aleatoires sont proposees
3. Le joueur drag & drop chaque piece sur la grille
4. Quand une ligne ou colonne est complete, elle disparait
5. Game over quand aucune piece ne peut etre placee

**Complexite de developpement** : 3/5
- Drag & drop avec snapping sur grille
- Logique de placement et verification lignes/colonnes
- Generation aleatoire des pieces (pool de formes)
- Animations de disparition
- Equilibrage de la difficulte = le plus complexe

**Potentiel educatif** :
- Raisonnement spatial et geometrie
- Planification et optimisation
- Reconnaissance des formes
- Gestion de l'espace

**Apps existantes** :
- Block Puzzle (genre mega-populaire sur mobile)
- Tetris Block Party (officiel Tetris)
- 1010! (reference du genre "place blocks")
- Woodoku (variante bois)

**Version PERIPLO** : "PERIPLO BLOCKS"
- Les pieces sont des **silhouettes de vehicules** stylisees
- Theme atelier/garage : la grille est un "plateau de rangement"
- Les lignes completees = des vehicules qui partent en livraison
- Evenements speciaux : piece geante "camion" = super bonus
- Pas de game over pour les petits (mode zen infini)

---

### 3.11 -- TOUR DE HANOI

**Concept** : Deplacer une pile de disques de taille decroissante d'un poteau a un autre, en respectant la regle : jamais un grand disque sur un petit.

**Type** : Sequence / strategie / recursion

**Tranche d'age** : 5-10 ans

**Mecanique de gameplay** :
1. 3 poteaux, N disques empiles du plus grand au plus petit
2. Deplacer un disque = tap source + tap destination
3. Regle : un disque ne peut pas etre pose sur un plus petit
4. Objectif : deplacer toute la pile sur le poteau de droite
5. Compteur de mouvements (minimum = 2^N - 1)

**Complexite de developpement** : 1/5
- Le plus simple algorithmiquement
- 3 piles (arrays), logique de validation triviale
- Drag & drop ou tap-tap simple
- Animation de deplacement = transition basique
- Pas de generation de niveaux (juste augmenter N)

**Potentiel educatif** :
- Pensee recursive et algorithmique
- Planification a long terme
- Comprehension exponentielle (nombre de coups)
- Patience et methode
- Prefrontal cortex : memoire de travail, concentration

**Apps existantes** :
- Tower of Hanoi (multiple versions iOS/Android)
- Math Playground Tower of Hanoi (web)
- SuperKids Towers of Hanoi (web)
- Hanoi Tower Touch (App Store)

**Version PERIPLO** : "PERIPLO TOWER"
- Les disques sont des **plateformes de parking** de tailles differentes
- Les poteaux sont des **grues** de chantier
- Les vehicules sont gares sur les plateformes (decor)
- Theme chantier/construction
- Histoire : reorganiser le parking pour sortir le bon vehicule
- Variante 4 poteaux pour les niveaux avances

---

### 3.12 -- PATTERN SEQUENCE (Simon Says)

**Concept** : Le jeu affiche une sequence de couleurs/sons que le joueur doit reproduire dans le bon ordre. La sequence s'allonge a chaque tour reussi.

**Type** : Memoire / pattern / sequence

**Tranche d'age** : 3-8 ans

**Mecanique de gameplay** :
1. 4 zones colorees (rouge, bleu, vert, jaune)
2. Le jeu illumine une sequence (ex: rouge, bleu, rouge)
3. Le joueur reproduit la sequence en tapant les zones
4. Chaque tour reussi = +1 element dans la sequence
5. Erreur = fin de partie, score = longueur atteinte

**Complexite de developpement** : 1/5
- 4 boutons + logique de sequence = extremement simple
- Animation flash/illumination basique
- Son par couleur (4 fichiers audio)
- Pas de grille, pas de physique
- Developable en quelques heures

**Potentiel educatif** :
- Memoire a court terme et memoire de travail
- Attention et concentration
- Reconnaissance des couleurs et motifs
- Vitesse de traitement

**Apps existantes** :
- Color Sequence (plays.org)
- Color Matching Sequence Game (App Store)
- Simon Says (classique, nombreuses versions)
- Memorise Colour Pattern (COKOGAMES)

**Version PERIPLO** : "PERIPLO SIGNAL"
- Les 4 zones sont des **feux de signalisation** de couleurs differentes
- Chaque couleur emet un **son de vehicule** (klaxon, moteur, sirene, cloche)
- Theme carrefour/circulation
- Les sequences deviennent des "codes de circulation"
- Mode avance : 6 couleurs (ajout du orange et violet)

---

### 3.13 -- GEAR PUZZLE

**Concept** : Sur un plateau, des engrenages fixes tournent. Le joueur doit placer des engrenages mobiles pour connecter l'engrenage moteur a tous les engrenages cibles.

**Type** : Rotation / mecanique / logique

**Tranche d'age** : 5-10 ans

**Mecanique de gameplay** :
1. Plateau avec emplacements fixes et emplacements vides
2. Engrenage vert (moteur) tourne en permanence
3. Engrenages rouges (cibles) doivent etre connectes
4. Le joueur place des engrenages mobiles pour creer la chaine
5. Quand connecte, tous les engrenages tournent (animation satisfaisante)

**Complexite de developpement** : 2/5
- Grille de placement
- Logique de connexion = adjacence simple
- Animation de rotation continue (Animated en boucle)
- Sens de rotation alterne (engrenage adjacent = sens inverse)
- Visuel tres satisfaisant pour peu d'effort

**Potentiel educatif** :
- Introduction a la mecanique et l'ingenierie
- Raisonnement spatial
- Cause et effet (chaine de transmission)
- Resolution de problemes

**Apps existantes** :
- Gears Logic Puzzles (Google Play, centaines de niveaux)
- Gear Puzzle (plays.org, 30 niveaux)
- Crazy Gears (Edoki Academy, primee)

**Version PERIPLO** : "PERIPLO GEARS"
- Theme **atelier mecanique** : l'enfant repare des vehicules
- Les engrenages sont dans le moteur d'un vehicule
- Chaque serie = un type de vehicule a reparer
- Des pieces speciales : engrenages doubles, poulies
- Animation finale : le vehicule repare demarre et s'en va

---

### 3.14 -- SPOT THE DIFFERENCE

**Concept** : Deux images quasi-identiques sont affichees cote a cote. Le joueur doit trouver les N differences entre les deux.

**Type** : Observation / attention aux details

**Tranche d'age** : 3-8 ans

**Mecanique de gameplay** :
1. Deux images affichees simultanement
2. Le joueur tape sur une difference detectee
3. La difference est entouree/highlightee
4. Trouver les 5 differences pour completer le niveau
5. Indice disponible apres un certain temps

**Complexite de developpement** : 2/5
- Pas de logique complexe (tap + zone detection)
- Le plus dur = creer/sourcer les paires d'images
- Zoom et pan pour les details
- Peut etre genere a partir d'images SVG modifiees
- Besoin de contenu artistique (mais IA generative peut aider)

**Potentiel educatif** :
- Attention aux details et concentration
- Perception visuelle fine
- Vocabulaire (nommer les differences)
- Patience

**Apps existantes** :
- Spot the Difference Kids (Google Play)
- Find Difference Game for Kids (App Store)
- Spot it: Find the Difference
- Safe Kid Games - Spot the Difference (web)

**Version PERIPLO** : "PERIPLO DETECTIVE"
- Les images sont des **scenes avec des vehicules** (parking, route, aeroport)
- Theme detective : l'enfant est un "inspecteur des vehicules"
- Les differences = pieces manquantes, couleurs changees, vehicules supprimes
- Chaque serie = un lieu (garage, port, gare, aeroport)
- Generer les paires via SVG avec des modifications programmatiques

---

### 3.15 -- LIGHT UP (AKARI)

**Concept** : Sur une grille, placer des ampoules pour illuminer toutes les cases blanches. Les cases noires bloquent la lumiere. Certaines cases noires indiquent combien d'ampoules doivent les entourer. Deux ampoules ne doivent pas s'eclairer mutuellement.

**Type** : Logique / placement / deduction

**Tranche d'age** : 7-10 ans (avance)

**Mecanique de gameplay** :
1. Grille avec cases blanches et cases noires (certaines numerotees)
2. Tap sur une case blanche pour placer une ampoule
3. L'ampoule illumine sa ligne et sa colonne jusqu'a un mur
4. Contrainte : pas 2 ampoules qui se voient
5. Contrainte : les nombres sur les murs noirs = nombre d'ampoules adjacentes

**Complexite de developpement** : 3/5
- Grille 2D, 3 etats par cellule (vide, ampoule, mur)
- Logique d'illumination = ray-cast horizontal + vertical
- Validation des contraintes numeriques
- Generation de puzzles = algorithmes existants mais non triviaux
- UI un peu chargee (illumination visuelle + contraintes)

**Potentiel educatif** :
- Logique deductive avancee
- Pensee combinatoire
- Raisonnement par elimination
- Comprehension des contraintes multiples

**Apps existantes** :
- Akari: Light Up Your Brain (iOS/Android)
- Light Up (puzzle-light-up.com)
- Daily Akari (web)
- Akari Puzzle (App Store)

**Version PERIPLO** : "PERIPLO LIGHTS"
- Les ampoules sont des **phares de vehicules**
- Theme nuit/ville sombre : eclairer les rues pour que les vehicules circulent
- Les murs noirs sont des **immeubles**
- Chaque niveau resolu = la ville s'illumine progressivement
- Animation de victoire : les vehicules circulent dans les rues eclairees

---

## 4. Matrice de priorisation

### Criteres de notation (chaque critere sur 5)

| # | Concept | Simplicite Dev | Potentiel Edu | Fit PERIPLO | Fun Factor | Cross-Platform | TOTAL /25 |
|---|---------|---------------|---------------|-------------|------------|---------------|-----------|
| 4 | **Water Sort** | 5 | 3 | 4 | 5 | 5 | **22** |
| 3 | **Flow Connect** | 4 | 4 | 5 | 5 | 5 | **23** |
| 1 | **Tangram** | 4 | 5 | 5 | 4 | 4 | **22** |
| 5 | **Taquin** | 5 | 4 | 4 | 3 | 5 | **21** |
| 12 | **Pattern Sequence** | 5 | 4 | 4 | 4 | 5 | **22** |
| 2 | **Sokoban** | 4 | 4 | 5 | 4 | 5 | **22** |
| 11 | **Tour de Hanoi** | 5 | 5 | 3 | 3 | 5 | **21** |
| 6 | **Memory Match** | 5 | 4 | 4 | 3 | 5 | **21** |
| 7 | **Pipe Connect** | 4 | 4 | 5 | 4 | 5 | **22** |
| 8 | **Labyrinthe** | 4 | 3 | 4 | 4 | 5 | **20** |
| 13 | **Gear Puzzle** | 4 | 4 | 5 | 4 | 4 | **21** |
| 9 | **Nonogram** | 3 | 5 | 4 | 4 | 5 | **21** |
| 14 | **Spot Difference** | 4 | 3 | 4 | 4 | 4 | **19** |
| 10 | **Block Puzzle** | 3 | 4 | 3 | 4 | 4 | **18** |
| 15 | **Light Up** | 3 | 5 | 3 | 3 | 5 | **19** |

---

## 5. Recommandations TOP 5

Voici les 5 jeux recommandes pour le prochain developpement PERIPLO, classes par ordre de priorite :

### #1 : PERIPLO ROUTES (Flow Connect) -- Score 23/25

**Pourquoi en premier :**
- Concept mega-prouve (Flow Free = 100M+ downloads)
- Le "fit PERIPLO" est parfait : vehicules + routes + villes
- Complexite dev moderee (2/5) mais resultat tres polish
- Touche tous les ages (4-10 ans)
- Generation de niveaux algorithmique = contenu infini
- Ideal pour le web ET le mobile

**Estimation dev :** 2-3 semaines

---

### #2 : PERIPLO FUEL (Water Sort) -- Score 22/25

**Pourquoi en deuxieme :**
- Le **plus simple** a developper (1/5)
- Genre hyper-populaire en 2024-2026 (Water Sort = top charts constant)
- Theme carburant = parfait pour PERIPLO
- Monetisation prouvee (freemium + pubs)
- Peut etre lance tres rapidement comme "quick win"

**Estimation dev :** 1-2 semaines

---

### #3 : PERIPLO TANGRAM -- Score 22/25

**Pourquoi en troisieme :**
- Potentiel educatif maximal (geometrie, spatial)
- Les silhouettes de vehicules = differenciation claire vs concurrence
- Heritage culturel fort (puzzle millenaire)
- Mode creation = retention elevee
- Tres apprecie des parents et enseignants

**Estimation dev :** 2-3 semaines

---

### #4 : PERIPLO CARGO (Sokoban) -- Score 22/25

**Pourquoi en quatrieme :**
- Complementaire a PERIPLO_GAMES_TRAFFIC (meme famille logique)
- Theme portuaire/conteneurs = original pour les enfants
- Enormement de contenu possible (generateurs de niveaux open source)
- Mecaniques simples mais profondeur strategique
- Le undo/restart rend le jeu accessible aux petits

**Estimation dev :** 2-3 semaines

---

### #5 : PERIPLO SIGNAL (Pattern Sequence) -- Score 22/25

**Pourquoi en cinquieme :**
- Le **plus rapide** a developper avec Water Sort (1/5)
- Touche les plus jeunes (des 3 ans)
- Le theme feux de signalisation est unique et coherent PERIPLO
- L'audio (sons de vehicules) ajoute de la valeur sans complexite
- Peut etre integre comme mini-jeu dans d'autres apps PERIPLO

**Estimation dev :** 1 semaine

---

## Strategie de lancement suggeree

```
Phase 1 (Mois 1)     : PERIPLO FUEL + PERIPLO SIGNAL     [quick wins, 2-3 sem total]
Phase 2 (Mois 2)     : PERIPLO ROUTES                     [hero product, 2-3 sem]
Phase 3 (Mois 3)     : PERIPLO TANGRAM                    [educatif premium, 2-3 sem]
Phase 4 (Mois 4)     : PERIPLO CARGO                      [complementaire TRAFFIC, 2-3 sem]
Bonus  (Mois 5+)     : PERIPLO MEMORY / PIPE / MAZE       [extension du catalogue]
```

Chaque jeu partage le meme univers visuel PERIPLO, les memes personnages-vehicules, et peut renvoyer vers les autres jeux de la collection (cross-promotion).

---

## 6. Sources

- [25 Best Puzzle Games for Kids 2026 - OurLittleJoys](https://ourlittlejoys.com/blog/25-best-puzzle-games-for-kids-in-2026/)
- [Best Puzzle Game Apps 2026 - Rokform](https://www.rokform.com/blogs/rokform-blog/best-puzzle-game-apps)
- [Best Puzzle Apps for Kids - EducationalAppStore](https://www.educationalappstore.com/best-apps/5-best-jigsaw-puzzle-apps-for-kids)
- [Top Puzzle Apps - Common Sense Media](https://www.commonsensemedia.org/lists/top-puzzle-apps)
- [15 Best Puzzle Games Android/iOS 2026 - GlamGarbs](https://glamgarbs.com/2026/03/27/15-best-puzzle-games-for-android-and-ios-in-2026/)
- [Puzzle Kids: Jigsaw Puzzles - Google Play](https://play.google.com/store/apps/details?id=com.rvappstudios.jigsaw.puzzles.kids&hl=en_US)
- [My First Tangrams - App Store](https://apps.apple.com/us/app/my-first-tangrams/id363843653)
- [Kinder Tangram: Brain Game - App Store](https://apps.apple.com/us/app/kids-learning-puzzles-build/id562542395)
- [Tangram Puzzles - Math Playground](https://www.mathplayground.com/tangram_puzzles.html)
- [Cyberchase Tangram - PBS KIDS](https://pbskids.org/cyberchase/games/tangram-game)
- [Sokoban Games for Kids - CulinarySchools.org](https://www.culinaryschools.org/kids-games/brain/sokoban/)
- [Sokoban - Wikipedia](https://en.wikipedia.org/wiki/Sokoban)
- [Educational Value of Sokoban](https://www.his.com/~pshapiro/about.ss.html)
- [Tower of Hanoi - Math Playground](https://www.mathplayground.com/logic_tower_of_hanoi.html)
- [Tower of Hanoi - MathsIsFun](https://www.mathsisfun.com/games/towerofhanoi.html)
- [Flow Free - Wikipedia](https://en.wikipedia.org/wiki/Flow_Free)
- [Flow Free Review - Common Sense Media](https://www.commonsensemedia.org/app-reviews/flow-free)
- [Flow Free - Google Play](https://play.google.com/store/apps/details?id=com.bigduckgames.flow&hl=en_US)
- [Water Sort Puzzle - App Store](https://apps.apple.com/us/app/water-sort-puzzle/id1514542157)
- [Water Sort - SafeKidGames](https://www.safekidgames.com/water-sort/)
- [Nonogram Puzzle for Children - MyHomeschoolMath](https://www.myhomeschoolmath.com/nonogram.html)
- [Nonogram.com - Google Play](https://play.google.com/store/apps/details?id=com.easybrain.nonogram&hl=en)
- [Light Up / Akari - Wikipedia](https://en.wikipedia.org/wiki/Light_Up_(puzzle))
- [Akari: Light Up Your Brain - Google Play](https://play.google.com/store/apps/details?id=com.iwp.akari&hl=en_US)
- [Build a Bridge! - App Store](https://apps.apple.com/us/app/build-a-bridge/id1165289168)
- [Gears Logic Puzzles - Google Play](https://play.google.com/store/apps/details?id=org.stropin.gearslogicpuzzles)
- [Gear Puzzle Game - plays.org](https://plays.org/gear-puzzle/)
- [Pipe Puzzle - Line Connect - Google Play](https://play.google.com/store/apps/details?id=pipe.puzzle.connect.water.plumber.flow.sort.fix.unblock.untangle.game&hl=en_US)
- [Mazes for Kids - App Store](https://apps.apple.com/us/app/mazes-for-kids-puzzle-games/id1473114613)
- [Spot the Difference - MentalUP](https://www.mentalup.co/blog/spot-the-difference)
- [Color Sequence Game - plays.org](https://plays.org/color-sequence/)
- [Memory Matching Games - MemoryMatching.com](https://memorymatching.com/)
- [15-puzzle React Native - GitHub marmelab](https://github.com/marmelab/15-puzzle-app)
- [15-puzzle React Hooks - DEV Community](https://dev.to/gnsp/making-a-15-puzzle-game-using-react-hooks-3110)
- [5 Free Thinky Games for Preschoolers - Thinky Games](https://thinkygames.com/features/5-free-thinky-games-for-preschoolers/)
- [Rush Hour Alternatives - AlternativeTo](https://alternativeto.net/software/rush-hour/)
- [12 Best Puzzle Apps for Kids - ScreenWise](https://screenwiseapp.com/guides/puzzle-apps-for-kids)
- [MentalUP Brain Games](https://www.mentalup.co/brain-games)
- [LogicLike Brain Teaser Games](https://www.academicschoice.com/apps/logiclike-brain-teaser-games.php)
- [React Native Game Development Guide](https://generalistprogrammer.com/tutorials/react-native-game-development-javascript-mobile-games)
- [QUOKKA Puzzle App](https://quokka.com/pages/puzzle-app-jigsaw-puzzle-games-for-kids-info)
