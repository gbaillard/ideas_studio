# PERIPLO GAMES -- Rapport de Recherche : Jeux de Memoire & Logique pour Enfants

> Date : 2026-04-10 | Recherche web multi-sources | 15 concepts analyses
> Contexte : Suite a PERIPLO_GAMES_TRAFFIC (sliding block puzzle, 180 niveaux, 3 tranches d'age)
> Stack existant : React Native (Expo) + TypeScript + Docker (web)

---

## Table des matieres

1. [Vue d'ensemble et recommandations](#vue-densemble)
2. [Fiches detaillees des 15 concepts](#fiches-concepts)
3. [Matrice de comparaison](#matrice-comparaison)
4. [TOP 5 recommande pour PERIPLO](#top-5)
5. [Sources](#sources)

---

## Vue d'ensemble

Le marche des jeux educatifs enfants reste en forte croissance en 2026. Netflix vient de lancer "Netflix Playground", une app standalone pour enfants de moins de 8 ans (avril 2026). MentalUP revendique 10+ millions de familles. Le sweet spot prix est 5-10 EUR/mois en abonnement.

### Criteres d'evaluation

- **Complexite dev** : 1/5 (< 1 semaine) a 5/5 (> 2 mois)
- **Potentiel educatif** : impact reel sur le developpement cognitif
- **Fit PERIPLO** : coherence avec la marque, reutilisation du stack, synergie 3 tranches d'age
- **Originalite potentielle** : capacite a se differencier des apps existantes

---

## Fiches concepts

---

### 1. MEMORY MATCH -- Jeu de Paires Classique

**Type** : Memoire visuelle / Concentration
**Tranche d'age** : 3-10 ans (toutes tranches PERIPLO)
**Complexite dev** : 1/5

#### Mecanique de gameplay
1. Une grille de cartes est disposee face cachee (2x3 a 6x6 selon l'age)
2. Le joueur retourne 2 cartes par tour
3. Si les 2 cartes sont identiques, la paire est retiree du jeu
4. Si elles sont differentes, elles se retournent face cachee
5. Objectif : trouver toutes les paires en un minimum de coups/temps

#### Potentiel educatif
- Memoire a court terme et memoire de travail
- Concentration et attention soutenue
- Reconnaissance visuelle et categorisation
- Strategie (ordre d'exploration de la grille)

#### Apps existantes
- **MemoKids** (thème animaux, App Store)
- **Memory Kids** (PescApps, Google Play, 2 niveaux de difficulte)
- **Memory Matching Game for Kids** (App Family, thème animaux)
- **Netflix Playground** (jeu Sesame Street avec memory cards)
- **Preschool Memory Match** (Common Sense Media recommande)

#### Comment le rendre unique pour PERIPLO
- **Twist "Memoire Progressive"** : au lieu de paires identiques, matcher des associations logiques (animal + son habitat, fruit + sa couleur, ombre + objet). Evolue avec l'age.
- **3-5 ans** : paires identiques avec grosses cartes, thème animaux mignons, sons rigolos
- **5-7 ans** : paires associatives (chat + souris, abeille + fleur), grilles plus grandes
- **7-10 ans** : paires logiques (capitale + pays, operation + resultat), mode chrono, mode multijoueur local
- **Systeme "Collection"** : chaque paire debloquee s'ajoute a un album/bestiaire a collectionner

---

### 2. SIMON SAYS -- Sequence de Memoire

**Type** : Memoire sequentielle / Attention
**Tranche d'age** : 3-10 ans
**Complexite dev** : 1/5

#### Mecanique de gameplay
1. L'app montre une sequence de couleurs/sons (1 element au depart)
2. Le joueur reproduit la sequence en tapant les bons elements dans l'ordre
3. A chaque tour reussi, un element est ajoute a la sequence
4. Erreur = fin de partie, le score = longueur max de la sequence
5. Feedback visuel et sonore a chaque interaction

#### Potentiel educatif
- Memoire sequentielle (essentielle pour lecture et maths)
- Ecoute active et attention auditive
- Coordination oeil-main
- Gestion de la pression (sequences de plus en plus longues)

#### Apps existantes
- **Simon Memorize** (Kidmons.com, version web gratuite)
- **Pattern Play - Memory Game** (Google Play, DashGames)
- **treZimon** (calculators.org, version web)
- **Simon Says** (mathsisfun.com, version web)

#### Comment le rendre unique pour PERIPLO
- **Twist "Orchestre"** : au lieu de 4 boutons colores, utiliser des instruments de musique. L'enfant compose une melodie en memorisant la sequence. Les 3 tranches d'age ont des instruments differents.
- **3-5 ans** : 3 gros boutons animes (tambour, xylophone, clochette), sequences courtes, animations encourageantes
- **5-7 ans** : 4-5 instruments, introduction du mode "reverse" (reproduire la sequence a l'envers)
- **7-10 ans** : 6+ instruments, sequences bimodales (couleur + son), mode "speed" avec tempo accelere
- **Mode histoire** : chaque sequence reussie fait progresser un personnage dans une aventure

---

### 3. SPOT THE DIFFERENCE -- Trouve les Differences

**Type** : Attention visuelle / Observation
**Tranche d'age** : 4-10 ans
**Complexite dev** : 3/5 (creation de contenu visuel intensive)

#### Mecanique de gameplay
1. Deux images quasi-identiques sont affichees cote a cote (ou l'une apres l'autre sur mobile)
2. Le joueur doit trouver les N differences entre les deux images
3. Chaque difference trouvee est validee par un cercle/animation
4. Timer optionnel pour ajouter du challenge
5. Indices disponibles apres un certain temps

#### Potentiel educatif
- Attention aux details et perception visuelle fine
- Capacite de comparaison et discrimination visuelle
- Patience et perseverance
- Balayage visuel systematique

#### Apps existantes
- **Find Difference Game for Kids** (Rafal Grabos, 5 differences par image)
- **Differences - Find & Spot It** (systeme de zoom, App Store + Google Play)
- **Spot the Differences Game!** (110+ niveaux, pas de limite de temps)
- **Spot it: Find the Difference** (award-winning, perception visuelle)

#### Comment le rendre unique pour PERIPLO
- **Twist "Monde Vivant"** : les images ne sont pas statiques mais legerement animees (un oiseau bouge, une feuille tombe). Certaines differences apparaissent/disparaissent avec l'animation.
- **3-5 ans** : 2-3 grosses differences evidentes, scenes simples et colorees, pas de timer
- **5-7 ans** : 4-5 differences, scenes plus riches, certaines differences dans les details
- **7-10 ans** : 5-7 differences subtiles (changement de couleur, element manquant), mode chrono
- **Generation procedurale** : un moteur qui genere des variantes a partir de scenes de base (repositionner/recolorer des elements) pour un contenu quasi-infini
- **ATTENTION** : complexite 3/5 surtout a cause du contenu artistique necessaire. Si on investit dans un bon pipeline de generation de scenes, ca devient tres rentable.

---

### 4. PATTERN COMPLETION -- Complete le Motif

**Type** : Logique / Reconnaissance de patterns
**Tranche d'age** : 3-8 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. Une sequence de formes/couleurs/objets est affichee avec un element manquant
2. Le joueur choisit parmi 3-4 options celle qui complete le motif
3. Les patterns deviennent plus complexes : ABABAB -> ABCABC -> AABBCC -> ABACAB
4. Validation immediate avec feedback visuel
5. Progression par niveaux

#### Potentiel educatif
- Reconnaissance de patterns (fondement des mathematiques)
- Pensee logique et raisonnement inductif
- Pre-algebre (comprendre les regles qui generent des sequences)
- Prediction et anticipation

#### Apps existantes
- **Learning Patterns / Learning Patterns PRO** (App Store, 120 patterns)
- **Kids Pattern Recognition** (Amazon Appstore, 120 puzzles ABAB/ABCABC)
- **Ibbleobble Patterns** (award-winning, sequences d'images)
- **Funexpected Math** (3-7 ans, adaptatif)

#### Comment le rendre unique pour PERIPLO
- **Twist "Usine a Motifs"** : au lieu de juste completer, l'enfant CREE aussi ses propres patterns qu'il peut partager. Les meilleurs patterns crees par la communaute sont integres au jeu.
- **3-5 ans** : patterns AB simples avec grosses formes colorees, drag & drop
- **5-7 ans** : patterns ABC, introduction de patterns numeriques, mode creation
- **7-10 ans** : patterns multi-attributs (forme + couleur + taille), patterns rotatifs/symetriques
- **Synergie avec l'existant** : les patterns peuvent utiliser les vehicules de PERIPLO_GAMES_TRAFFIC comme elements visuels

---

### 5. ODD ONE OUT -- L'Intrus

**Type** : Logique / Categorisation / Raisonnement
**Tranche d'age** : 3-10 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. 4 a 6 images sont affichees
2. Le joueur doit identifier celle qui n'appartient pas au groupe
3. La raison de l'exclusion varie : categorie, couleur, forme, taille, fonction...
4. Plusieurs niveaux de subtilite (un chat parmi des chiens vs. un mammifere parmi des oiseaux)
5. Feedback expliquant pourquoi l'element est l'intrus

#### Potentiel educatif
- Categorisation et classification (taxonomie naturelle)
- Raisonnement par elimination
- Pensee critique (il peut y avoir plusieurs reponses valides)
- Vocabulaire et connaissance du monde

#### Apps existantes
- **Spot the Wrong One: Logic Game** (BabyApps, 4-10 ans, categories variees)
- **Differ By Kind** (iOS, des 2.5 ans, tri visuel)
- **Odd One Out: What Does Not Belong** (iOS, 3-6 ans)
- **SplashLearn** (version en ligne, integration math)

#### Comment le rendre unique pour PERIPLO
- **Twist "Detective"** : l'enfant est un detective qui doit trouver le "suspect" (l'intrus) dans chaque scene. Narration et univers visuel de detective/enquete.
- **3-5 ans** : 4 elements, differences evidentes (couleur, espece), gros visuels
- **5-7 ans** : 5 elements, criteres plus abstraits (volant/non-volant, comestible/non-comestible)
- **7-10 ans** : 6 elements, criteres multiples (l'intrus peut etre different sur 2 criteres), mode "pourquoi?" ou l'enfant doit expliquer son choix
- **Mode "Double intrus"** : 2 elements ne collent pas, pour des raisons differentes

---

### 6. SHADOW MATCH -- Ombres et Silhouettes

**Type** : Perception visuelle / Logique spatiale
**Tranche d'age** : 2-7 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. Un objet colore est affiche en haut de l'ecran
2. Plusieurs silhouettes/ombres sont proposees en bas
3. Le joueur fait glisser l'objet sur sa silhouette correspondante (drag & drop)
4. Les silhouettes peuvent etre legerement differentes (orientation, taille)
5. Niveaux progressifs : objets simples -> objets complexes -> objets pivotes

#### Potentiel educatif
- Reconnaissance de formes et perception spatiale
- Correspondance forme/contour (pre-ecriture)
- Rotation mentale (fondement de la geometrie)
- Motricite fine (drag & drop)

#### Apps existantes
- **Shadow Match Up: Kids Puzzle** (BabyApps, 3-8 ans)
- **Match Shadow for Kids Puzzle** (6 ans et moins)
- **Shadowmatic** (Apple Design Award 2015, rotation 3D d'objets)
- **Shadow Match Puzzle** (minimaliste, tous ages)

#### Comment le rendre unique pour PERIPLO
- **Twist "Theatre d'Ombres"** : l'enfant cree des histoires avec des ombres chinoises. Chaque match reussi ajoute un personnage a une scene de theatre d'ombres animee.
- **3-5 ans** : objets simples (animaux, fruits), silhouettes identiques en taille
- **5-7 ans** : objets plus complexes, silhouettes retournees ou pivotees a 90 degres
- **7-10 ans** : (moins pertinent pour cette tranche, fusionner avec Tangram)
- **Inspiration Shadowmatic** : mode avance ou l'enfant tourne un objet 3D pour obtenir la bonne ombre

---

### 7. TANGRAM -- Puzzle de Formes Geometriques

**Type** : Logique spatiale / Geometrie
**Tranche d'age** : 4-10 ans
**Complexite dev** : 3/5

#### Mecanique de gameplay
1. Une silhouette cible est affichee (animal, objet, lettre...)
2. 7 pieces geometriques (triangles, carre, parallelogramme) sont disponibles
3. Le joueur doit placer, pivoter et assembler les pieces pour remplir la silhouette
4. Snap-to-grid pour aider les plus jeunes
5. Des centaines de figures possibles

#### Potentiel educatif
- Geometrie et conscience spatiale
- Rotation mentale et transformation
- Decomposition de formes complexes en formes simples
- Resolution de problemes et perseverance

#### Apps existantes
- **My First Tangrams** (iOS, 1000+ tangrams, pas de rotation = simplifie)
- **Edujoy Tangram** (36 designs, enfants)
- **Games for Kids 5 Year: Tangram** (56 niveaux)
- **Tangram Puzzle: Polygrams** (999+ puzzles, Google Play)
- **PBS KIDS Cyberchase Tangram** (version educative PBS)

#### Comment le rendre unique pour PERIPLO
- **Twist "Animaux en Pieces"** : au lieu des 7 pieces classiques, utiliser des pieces en forme de parties d'animaux. L'enfant assemble des animaux fantastiques.
- **3-5 ans** : 3-4 pieces seulement, pas de rotation, snap magnetique fort, formes simples
- **5-7 ans** : 5-6 pieces, rotation par pas de 90 degres, formes animaux
- **7-10 ans** : 7 pieces classiques, rotation libre, mode creation + partage
- **ATTENTION** : la gestion de la rotation et du snap est techniquement plus complexe qu'un simple grid. Complexite 3/5 justifiee.
- **Synergie TRAFFIC** : meme philosophie de "placer des pieces sur une grille", UX similaire

---

### 8. MAZE RUNNER -- Labyrinthes

**Type** : Logique / Planification / Orientation spatiale
**Tranche d'age** : 3-10 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. Un labyrinthe est affiche avec un point de depart et une sortie
2. Le joueur trace le chemin avec son doigt (swipe/drag)
3. Des obstacles ou objets a collecter enrichissent le parcours
4. Les labyrinthes sont generes proceduralement (infini)
5. Progression en taille et complexite

#### Potentiel educatif
- Planification et anticipation (regarder avant d'agir)
- Orientation spatiale et conscience directionnelle
- Resolution de problemes et backtracking
- Motricite fine (tracer un chemin precis)

#### Apps existantes
- **Mazes for Kids - Puzzle Games** (iOS, labyrinthes varies)
- **Kids Mazes: Educational Game** (Google Play, colore)
- **Maze for Kids** (generation procedurale, tailles multiples)
- **Piggy Maze Runner** (90 niveaux + histoire)

#### Comment le rendre unique pour PERIPLO
- **Twist "Expedition"** : le personnage PERIPLO explore des mondes thematiques. Chaque labyrinthe est un niveau d'exploration avec des tresors a collecter.
- **3-5 ans** : labyrinthes simples 5x5, chemins larges, un seul chemin correct
- **5-7 ans** : labyrinthes 10x10, chemins multiples, objets a collecter, impasses
- **7-10 ans** : labyrinthes 15x15+, portes/cles, teleporteurs, mode course contre la montre
- **Generation procedurale** : algorithmes DFS/Prim pour generation infinie, comme le solver BFS de TRAFFIC
- **FORTE SYNERGIE** : meme expertise algorithmique que PERIPLO_GAMES_TRAFFIC (generation + validation)

---

### 9. N-BACK SIMPLIFIE -- Memoire de Travail

**Type** : Memoire de travail / Attention
**Tranche d'age** : 5-10 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. Des elements (animaux, objets) apparaissent un par un a l'ecran
2. Le joueur doit signaler quand l'element actuel est identique a celui d'il y a N tours
3. 1-back pour les debutants (est-ce le meme que le precedent ?), 2-back pour les avances
4. La vitesse augmente progressivement
5. Score base sur la precision et le temps de reaction

#### Potentiel educatif
- Memoire de travail (le predicateur #1 de la reussite scolaire selon la recherche)
- Attention soutenue et controle inhibitoire
- Vitesse de traitement cognitif
- Fondation pour les fonctions executives

#### Apps existantes
- **Memory Birds N-Back Game** (iOS/Android, oiseaux, adapte enfants)
- **MyMindfulKit N-Back** (version web, TDAH-friendly)
- **Brain Gymmer N-Back** (version web adulte simplifiable)

#### Comment le rendre unique pour PERIPLO
- **Twist "Defile d'Animaux"** : des animaux traversent l'ecran en "defile". L'enfant tape quand il voit le meme animal que N positions avant. Thematique cirque/zoo.
- **5-7 ans** : mode 1-back uniquement, animaux simples et distincts, vitesse lente
- **7-10 ans** : mode 2-back, double stimulus (animal + couleur), vitesse adaptative
- **Pas adapte aux 3-5 ans** : trop abstrait pour cette tranche
- **VALEUR DIFFERENCIANTE FORTE** : tres peu d'apps N-Back adaptees aux enfants. Niche quasi-vide.

---

### 10. WHACK-A-MOLE -- Tape la Taupe (Reaction + Memoire)

**Type** : Reaction / Attention selective / Memoire de consigne
**Tranche d'age** : 3-8 ans
**Complexite dev** : 1/5

#### Mecanique de gameplay
1. Des taupes/animaux apparaissent aleatoirement dans des trous
2. Le joueur doit taper les "bonnes" cibles et eviter les "mauvaises"
3. La vitesse d'apparition augmente progressivement
4. Regles variables : taper seulement les rouges, eviter les bombes, taper dans un ordre precis
5. Score base sur la precision et le temps de reaction

#### Potentiel educatif
- Temps de reaction et reflexes
- Attention selective (inhiber la reponse aux mauvaises cibles)
- Coordination oeil-main
- Memoire de la consigne (retenir les regles qui changent)

#### Apps existantes
- **Mega Mole - Whack A Mole** (iOS/Android, style cartoon)
- **Whack Em All** (web, HTML5, gratuit)
- **Whac-a-Mole** (Mattel, version officielle)

#### Comment le rendre unique pour PERIPLO
- **Twist "Jardin Magique"** : au lieu de taupes, des fleurs poussent dans un jardin. L'enfant "cueille" les bonnes fleurs selon des regles (couleur, type, nombre de petales).
- **3-5 ans** : taper tout ce qui apparait, gros elements, vitesse lente
- **5-7 ans** : regles de selection (cueillir seulement les fleurs rouges), speed progressif
- **7-10 ans** : regles composees (fleurs rouges OU bleues, mais PAS les epineuses), mode "combo"
- **Tres simple techniquement** : pas de physique, pas d'algo complexe, juste du timing et des sprites

---

### 11. NONOGRAM / PICROSS -- Puzzle de Pixels

**Type** : Logique pure / Deduction
**Tranche d'age** : 6-10 ans
**Complexite dev** : 3/5

#### Mecanique de gameplay
1. Une grille vide avec des indices numeriques sur chaque ligne et colonne
2. Les nombres indiquent les groupes consecutifs de cases a colorier
3. Le joueur deduit quelles cases colorier par elimination logique
4. La grille completee revele une image en pixel art
5. Pas de hasard : 100% logique et deduction

#### Potentiel educatif
- Raisonnement logique pur (deduction, elimination)
- Pensee mathematique (combinatoire, contraintes)
- Patience et methode
- Satisfaction de la resolution (image revelee)

#### Apps existantes
- **Nonogram.com** (Easybrain, Google Play, evenements temporels)
- **Pixelogic** (iOS/Android, 5x5 a 25x25)
- **Nonogram - Picross puzzle game** (AMANEKS, pixel art)
- **MyHomeschoolMath Nonogram** (version educative)

#### Comment le rendre unique pour PERIPLO
- **Twist "Pixel Zoo"** : chaque grille revelee est un animal du "zoo PERIPLO". L'enfant collectionne les animaux en resolvant les grilles.
- **6-7 ans** : grilles 5x5, indices simples (0, 1, 2, 3), tutoriel guide pas a pas
- **7-10 ans** : grilles 8x8 a 10x10, indices plus complexes, mode couleur (multi-couleur)
- **Pas adapte aux 3-5 ans** : necessite de comprendre les nombres
- **Solver integre** : comme pour TRAFFIC, un solver BFS/backtracking peut valider que chaque grille a une solution unique
- **FORTE SYNERGIE** : meme philosophie puzzle a solution unique que PERIPLO_GAMES_TRAFFIC

---

### 12. COLOR/OBJECT SORTING -- Tri et Classement

**Type** : Logique / Categorisation / Pre-maths
**Tranche d'age** : 2-6 ans
**Complexite dev** : 1/5

#### Mecanique de gameplay
1. Des objets colores/varies apparaissent en vrac
2. Le joueur doit les trier dans les bons conteneurs (par couleur, forme, taille, categorie)
3. Drag & drop intuitif
4. Le critere de tri change a chaque niveau (couleur -> forme -> taille -> categorie)
5. Niveaux multi-criteres pour les plus grands

#### Potentiel educatif
- Classification et categorisation (fondement de la pensee scientifique)
- Reconnaissance des attributs (couleur, forme, taille)
- Pre-mathematiques (ensembles, groupes)
- Motricite fine (drag & drop)

#### Apps existantes
- **Kids Learning: Sort & Match** (Google Play, 13 categories)
- **Sorting Puzzles for Kids** (TinyHands, developpe avec psychologues)
- **Sesame Street Sorting Colors** (Elmo, tri par couleur primaire)

#### Comment le rendre unique pour PERIPLO
- **Twist "Usine de Jouets"** : l'enfant travaille dans une usine de jouets et doit trier les jouets sur un tapis roulant dans les bonnes boites.
- **3-5 ans** : tri par 1 critere (couleur), gros objets, 3 boites max
- **5-7 ans** : tri par 2 criteres (couleur + forme), tapis roulant plus rapide
- **7-10 ans** : (moins pertinent, fusionner avec Odd One Out pour cette tranche)
- **Montessori-compatible** : le tri est un pilier de la pedagogie Montessori, bon argument marketing

---

### 13. SEQUENCE BUILDER -- Reproduis la Sequence

**Type** : Memoire sequentielle / Logique d'ordre
**Tranche d'age** : 3-8 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. Une sequence d'images/evenements est montree (ex: lever du soleil -> petit-dejeuner -> ecole -> diner -> coucher)
2. Les images sont melangees
3. Le joueur doit les remettre dans le bon ordre chronologique/logique
4. Variante : remettre les etapes d'une recette, d'une construction, d'une histoire
5. Difficulte : nombre d'etapes, abstraction des sequences

#### Potentiel educatif
- Pensee sequentielle (fondation pour la programmation)
- Comprehension temporelle (avant/apres, cause/consequence)
- Narration et logique causale
- Organisation et planification

#### Apps existantes
- **Step-by-Step Sequence Game** (Spark Innovations, physique + app)
- **COKOGAMES Sequence** (web, creer et memoriser)
- **Smart Tales** (histoires interactives avec sequences)

#### Comment le rendre unique pour PERIPLO
- **Twist "Raconte l'Histoire"** : l'enfant remet en ordre les scenes d'une mini-histoire illustree. Quand c'est correct, l'histoire s'anime comme un petit dessin anime.
- **3-5 ans** : 3-4 images, sequences de la vie quotidienne, gros drag & drop
- **5-7 ans** : 5-6 images, sequences plus abstraites (cycle de l'eau, croissance d'une plante)
- **7-10 ans** : 6-8 images, sequences logiques/causales, mode creation d'histoires
- **Contenu pedagogique** : peut enseigner les sciences naturelles, l'histoire, les processus

---

### 14. SLIDING PUZZLE (15-PUZZLE) -- Taquin

**Type** : Logique spatiale / Planification
**Tranche d'age** : 5-10 ans
**Complexite dev** : 2/5

#### Mecanique de gameplay
1. Une image est decoupee en tuiles sur une grille (3x3 a 5x5)
2. Une case est vide, permettant de faire glisser les tuiles adjacentes
3. Le joueur doit reconstituer l'image en faisant glisser les tuiles
4. Le nombre de mouvements est compte
5. Timer optionnel

#### Potentiel educatif
- Planification et vision globale (anticiper les coups)
- Logique spatiale et sequencage de mouvements
- Patience et resolution de problemes
- Pensee algorithmique (les strategies de resolution sont des algorithmes)

#### Apps existantes
- **Kids Sliding Puzzle Horses** (100+ niveaux, simple a complexe)
- **15 Puzzle Block Sliding Game** (iOS, classique)
- **Sliding Math Puzzle** (equations dans les tuiles, 5 modes)
- **Picture Tile Slider** (3x3 a 6x6, photos)

#### Comment le rendre unique pour PERIPLO
- **Twist "Photo Souvenir"** : l'enfant doit reconstituer des photos/illustrations d'animaux ou de lieux. Chaque image completee donne une "carte postale" pour la collection.
- **5-7 ans** : grille 3x3 (8-puzzle), images simples avec guidage
- **7-10 ans** : grille 4x4 (15-puzzle) et 5x5, mode numerique, mode chrono
- **Pas adapte aux 3-5 ans** : trop complexe cognitivement
- **TRES FORTE SYNERGIE** : meme mecanique de sliding que PERIPLO_GAMES_TRAFFIC ! Code reutilisable (grid, sliding, collision detection). Guillaume maitrise deja ce type de jeu.

---

### 15. VISUAL N-BACK GRID -- Grille de Memoire Flash

**Type** : Memoire visuelle instantanee / Memoire de travail
**Tranche d'age** : 4-10 ans
**Complexite dev** : 1/5

#### Mecanique de gameplay
1. Une grille (3x3 a 5x5) s'affiche avec certaines cases illuminees pendant 2-3 secondes
2. La grille s'eteint
3. Le joueur doit reproduire le pattern en tapant les bonnes cases
4. Le nombre de cases illuminees augmente progressivement
5. Variantes : reproduire avec un delai, reproduire en miroir, reproduire en rotation

#### Potentiel educatif
- Memoire visuo-spatiale (Corsi block test, valide scientifiquement)
- Memoire photographique / echoique
- Attention et concentration
- Capacite de la memoire de travail

#### Apps existantes
- **Aucune app dominante specifiquement pour enfants** dans ce format
- **MentalUP** inclut ce type d'exercice parmi d'autres
- **Helpful Games Memory** (web, version adulte)
- **Lumosity / Peak** (adultes, incluent des variantes)

#### Comment le rendre unique pour PERIPLO
- **Twist "Constellation"** : l'enfant doit memoriser des etoiles qui s'allument dans le ciel nocturne, puis les "redessiner". Chaque constellation completee raconte une legende.
- **3-5 ans** : grille 3x3, 2-3 cases, temps d'observation long (5 sec)
- **5-7 ans** : grille 4x4, 3-5 cases, temps plus court (3 sec)
- **7-10 ans** : grille 5x5, 5-8 cases, modes miroir/rotation, mode "disparition progressive"
- **NICHE TRES PEU EXPLOITEE** pour enfants : les apps existantes sont pour adultes (Lumosity, Peak). Enorme opportunite.
- **Validation scientifique** : base sur le test de Corsi, utilise en neuropsychologie. Argument marketing fort pour les parents.

---

## Matrice de comparaison

| # | Concept | Type | Ages | Dev | Fit PERIPLO | Niche vide ? | Contenu infini ? |
|---|---------|------|------|-----|-------------|--------------|------------------|
| 1 | Memory Match | Memoire | 3-10 | 1/5 | +++ | Non | Oui (themes) |
| 2 | Simon Says | Sequence | 3-10 | 1/5 | ++ | Partiel | Oui (procedural) |
| 3 | Spot Difference | Attention | 4-10 | 3/5 | ++ | Non | Partiel (contenu) |
| 4 | Pattern Completion | Logique | 3-8 | 2/5 | +++ | Partiel | Oui (procedural) |
| 5 | Odd One Out | Logique | 3-10 | 2/5 | ++ | Non | Partiel (contenu) |
| 6 | Shadow Match | Perception | 2-7 | 2/5 | ++ | Partiel | Partiel |
| 7 | Tangram | Spatiale | 4-10 | 3/5 | +++ | Non | Oui (puzzles) |
| 8 | Maze Runner | Logique | 3-10 | 2/5 | +++ | Non | Oui (procedural) |
| 9 | N-Back Simplifie | Memoire | 5-10 | 2/5 | ++ | **OUI** | Oui (procedural) |
| 10 | Whack-a-Mole | Reaction | 3-8 | 1/5 | + | Non | Oui (procedural) |
| 11 | Nonogram | Logique | 6-10 | 3/5 | +++ | Partiel | Oui (generation) |
| 12 | Color Sorting | Logique | 2-6 | 1/5 | ++ | Non | Partiel |
| 13 | Sequence Builder | Memoire | 3-8 | 2/5 | ++ | Partiel | Partiel (contenu) |
| 14 | Sliding Puzzle | Logique | 5-10 | 2/5 | **++++** | Non | Oui (procedural) |
| 15 | Visual Grid Memory | Memoire | 4-10 | 1/5 | +++ | **OUI** | Oui (procedural) |

---

## TOP 5 recommande pour PERIPLO

### Criteres de selection du TOP 5
1. **Synergie maximale** avec le stack et l'expertise PERIPLO_GAMES_TRAFFIC
2. **Ratio effort/impact** le plus favorable
3. **Differenciation possible** par rapport aux apps existantes
4. **Couverture des 3 tranches d'age** (3-5, 5-7, 7-10)
5. **Contenu genereable proceduralement** (pas de creation manuelle a l'infini)

---

### TOP 1 : PERIPLO_GAMES_MEMORY -- Visual Grid Memory (#15)

**Pourquoi #1 :**
- Complexite dev 1/5 : une grille, des cases qui s'allument, c'est tout
- Niche quasi-vide pour les enfants (apps existantes = adultes)
- Validation scientifique (test de Corsi) = argument marketing puissant pour les parents
- Contenu 100% procedural = infini sans creation manuelle
- Stack identique a TRAFFIC (grille, interaction tap, niveaux progressifs)
- Les 3 tranches d'age fonctionnent parfaitement avec la progression de difficulte

**Estimation :** 1-2 semaines de dev pour un MVP jouable

---

### TOP 2 : PERIPLO_GAMES_SEQUENCE -- Simon Says / Orchestre (#2)

**Pourquoi #2 :**
- Complexite dev 1/5 : quelques boutons, des sons, une liste de sequence
- Concept universellement connu (pas besoin d'expliquer les regles)
- Twist musical = forte differenciation et engagement sensoriel
- 100% procedural (sequences aleatoires progressives)
- Tres adapte au mobile (tap simple, pas de drag complexe)
- Potentiel viral (partage de score / longueur de sequence)

**Estimation :** 1-2 semaines de dev pour un MVP jouable

---

### TOP 3 : PERIPLO_GAMES_PATTERN -- Pattern Completion (#4)

**Pourquoi #3 :**
- Complexite dev 2/5 : generateur de patterns + selection de reponse
- Enorme valeur educative (fondement mathematique)
- Synergie visuelle avec l'univers PERIPLO (vehicules, animaux)
- Genereable proceduralement (algorithme de creation de patterns)
- Mode creation = engagement supplementaire et contenu communautaire
- Bien adapte aux 3-8 ans, coeur de cible PERIPLO

**Estimation :** 2-3 semaines de dev

---

### TOP 4 : PERIPLO_GAMES_MAZE -- Labyrinthes (#8)

**Pourquoi #4 :**
- Complexite dev 2/5 : generation procedurale bien documentee (DFS, Prim, Kruskal)
- Synergie algorithmique directe avec TRAFFIC (generation + validation par algo)
- Contenu infini par generation procedurale
- Les 3 tranches d'age marchent tres bien (taille de grille = difficulte)
- Theme "Expedition PERIPLO" = coherence de marque forte
- Guillaume a l'expertise en algo de graphes grace a TRAFFIC

**Estimation :** 2-3 semaines de dev

---

### TOP 5 : PERIPLO_GAMES_NONOGRAM -- Picross / Pixel Zoo (#11)

**Pourquoi #5 :**
- Forte synergie avec TRAFFIC : puzzle a solution unique, solver validable par algo
- Image revelee = recompense naturelle (pixel art d'animaux a collectionner)
- Generable proceduralement + solver pour valider unicite de solution
- Tres forte retention (les joueurs de Picross sont extremement fideles)
- Cible 7-10 ans specifiquement = complete la gamme PERIPLO vers le haut

**Estimation :** 3-4 semaines de dev (solver + generateur de grilles + UI)

---

## Calendrier suggere

| Phase | Jeu | Duree estimee | Cumul |
|-------|-----|---------------|-------|
| Phase 1 | PERIPLO_GAMES_MEMORY (Visual Grid) | 1-2 sem | 2 sem |
| Phase 2 | PERIPLO_GAMES_SEQUENCE (Simon/Orchestre) | 1-2 sem | 4 sem |
| Phase 3 | PERIPLO_GAMES_PATTERN (Patterns) | 2-3 sem | 7 sem |
| Phase 4 | PERIPLO_GAMES_MAZE (Labyrinthes) | 2-3 sem | 10 sem |
| Phase 5 | PERIPLO_GAMES_NONOGRAM (Picross) | 3-4 sem | 14 sem |

**Total : 5 jeux deployables en ~3.5 mois**, en reutilisant le stack React Native/Expo + TypeScript + Docker existant.

---

## Strategie de monetisation recommandee

- **Modele** : Freemium avec abonnement "PERIPLO Pass" (5-8 EUR/mois)
- **Gratuit** : 20-30 premiers niveaux de chaque jeu
- **Payant** : acces illimite a tous les jeux PERIPLO, niveaux premium, mode hors-ligne
- **Bundle familial** : un seul abo pour tous les jeux de la marque PERIPLO
- **Pas de pubs** : argument fort pour les parents (cf. Netflix Playground, meme approche)

---

## Sources

- [TutoClub - Best Memory Games For Kids 2026](https://tutoclub.com/blog/best-memory-games-for-kids)
- [LogicLike - Top-11 Apps for Kids Memory & Concentration](https://logiclike.com/en/blog/memory-concentration-apps-for-kids)
- [MentalUP - Memory Games for Kids Online](https://www.mentalup.co/memory-games)
- [Curious World - 13 Games That Boost Kids Memory Skills](https://www.curiousworld.com/blog/games-that-boost-memory-skills)
- [Common Sense Media - Critical Thinking Apps & Games](https://www.commonsensemedia.org/lists/critical-thinking-apps-games)
- [LogicLike - Educational Games for Logic & Thinking](https://logiclike.com/en)
- [MentalUP - Logic Games and Puzzles](https://www.mentalup.co/logic-games-and-logic-puzzles)
- [EducationalAppStore - 8 Memory Games for Kids](https://www.educationalappstore.com/best-apps/memory-games-for-kids)
- [Keiki.app - Memory Games by Age](https://keiki.app/learning-games-for-kids/memory/4yo-memory)
- [Smart Tales - Pattern Recognition Activities for Kids](https://smarttales.app/2024/05/13/pattern-recognition-activities-for-kids/)
- [Empowered Parents - Odd One Out Game for Preschoolers](https://empoweredparents.co/odd-one-out-game/)
- [COKOGAMES - Sequence Memory Game](https://www.cokogames.com/sequence-memory-game/)
- [TeachHUB - Memory Games for Kids in the Classroom](https://www.teachhub.com/classroom-activities/2025/09/memory-games-for-kids-in-the-classroom/)
- [Early Impact Learning - 22 Preschool Memory Games](https://earlyimpactlearning.com/22-preschool-memory-games-that-really-work/)
- [Raising Children - Memory Game for Kids 3-6](https://raisingchildren.net.au/guides/activity-guides/thinking-and-brain-games/memory-game)
- [OT Mom Learning Activities - Visual Sequential Memory](https://www.ot-mom-learning-activities.com/visual-sequential-memory.html)
- [Shadowmatic](https://www.shadowmatic.com/)
- [MentalUP - Tangram for Kids](https://www.mentalup.co/blog/tangram-for-kids)
- [TechCrunch - Netflix Playground Kids Games App (2026)](https://techcrunch.com/2026/04/06/netflix-launches-a-standalone-app-for-kids-games/)
- [N-Back Wikipedia](https://en.wikipedia.org/wiki/N-back)
- [MyHomeschoolMath - Nonogram Puzzle for Children](https://www.myhomeschoolmath.com/nonogram.html)
