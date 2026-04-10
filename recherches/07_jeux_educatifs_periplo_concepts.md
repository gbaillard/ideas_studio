# PERIPLO -- Concepts de Jeux Educatifs pour Enfants

> Recherche web du 2026-04-10 | 15 concepts | Stack : React Native Expo + TypeScript + Docker web
> Tranches d'age : 3-5 ans, 5-7 ans, 7-10 ans

---

## Synthese express -- TOP 5 a prototyper en priorite

| Rang | Jeu | Type | Age | Dev (jours) | Complexite | Pourquoi |
|------|-----|------|-----|-------------|------------|----------|
| 1 | **Periplo Memory** | Observation/memoire | 3-7 | 2-3 | 1/5 | Game loop parfait, 0 contenu a creer, infiniment themable |
| 2 | **L'Intrus** (Odd One Out) | Logique/classification | 3-7 | 2-3 | 1/5 | Engagement immediat, scalable en difficulte, viral |
| 3 | **Quelle Suite ?** (Pattern) | Patterns/sequences | 5-10 | 3-4 | 2/5 | Valeur educative enorme, peu de concurrence qualitative |
| 4 | **Periplo Balance** | Maths/comparaison | 5-8 | 3-4 | 2/5 | Concept unique, physique visuelle addictive |
| 5 | **Labo des Couleurs** | Sciences/couleurs | 3-7 | 3-4 | 2/5 | Wow effect immediat, partage parent naturel |

---

## Concept 1 -- Periplo Memory (Memory Match)

**Type :** Observation / Memoire
**Tranche d'age :** 3-5 ans (grille 2x3), 5-7 ans (grille 4x4), 7-10 ans (grille 5x6)
**Complexite dev : 1/5 (2-3 jours)**

### Mecanique
1. Grille de cartes face cachee, l'enfant retourne 2 cartes par tour
2. Si les 2 cartes forment une paire, elles restent visibles
3. Sinon, elles se retournent apres 1 seconde
4. Objectif : trouver toutes les paires en un minimum de coups
5. Timer optionnel pour les plus grands

### Ce que l'enfant apprend
- Memoire visuelle et spatiale
- Concentration et attention
- Strategie (se souvenir des positions)

### Apps similaires
- Memorize: Picture Match (iOS), WonderMini Matching Game (Android), MemoryMatching.com (web)
- La plupart sont generiques, peu ont un univers graphique fort

### Twist PERIPLO
- **Themes voyages du monde** : chaque set de cartes = un pays (animaux d'Afrique, monuments d'Europe, fruits d'Asie...)
- **Mode "Decouverte"** : quand l'enfant trouve une paire, une micro-info apparait ("Le flamant rose vit en Afrique !")
- **Paires intelligentes** : au lieu de 2 images identiques, associer un animal a son habitat, un drapeau a son pays, un chiffre a sa quantite
- **Progression geographique** : debloquer de nouveaux "pays" = nouveaux themes

---

## Concept 2 -- L'Intrus (Odd One Out)

**Type :** Logique / Classification / Observation
**Tranche d'age :** 3-5 ans (3 items, critere visuel simple), 5-7 ans (4 items, critere semantique), 7-10 ans (5-6 items, critere abstrait)
**Complexite dev : 1/5 (2-3 jours)**

### Mecanique
1. Afficher 3 a 6 elements a l'ecran
2. L'enfant doit toucher celui qui "ne va pas avec les autres"
3. Feedback anime immediat (confettis si correct, encouragement si erreur)
4. Expliquer pourquoi c'etait l'intrus apres chaque reponse
5. Niveaux progressifs : couleur -> forme -> taille -> categorie -> critere abstrait

### Ce que l'enfant apprend
- Classification et categorisation
- Raisonnement logique et deduction
- Discrimination visuelle
- Vocabulaire (nommer les categories)

### Apps similaires
- Odd One Out: What Does Not Belong (iOS/Android), Differ By Kind, SplashLearn Odd One Out
- Beaucoup sont visuellement pauvres ou bourrees de pubs

### Twist PERIPLO
- **Mode "Detecteur d'intrus"** : l'enfant est un "detective" avec une loupe animee
- **Multi-critere** : parfois il y a DEUX reponses possibles selon le critere choisi (la banane est la seule jaune OU la seule qui est un fruit) -- feedback qui valorise les deux raisonnements
- **Intrus genere dynamiquement** via categories d'assets, permettant un nombre infini de niveaux
- **Defi parent** : mode ou le parent cree des intrus pour l'enfant et vice-versa

---

## Concept 3 -- Quelle Suite ? (What Comes Next -- Patterns)

**Type :** Patterns / Sequences / Logique mathematique
**Tranche d'age :** 5-7 ans (AB, ABC patterns), 7-10 ans (AABB, rotation, croissance)
**Complexite dev : 2/5 (3-4 jours)**

### Mecanique
1. Afficher une sequence de formes/couleurs/nombres avec un emplacement vide a la fin
2. Proposer 3-4 choix possibles
3. L'enfant selectionne ce qui complete la sequence
4. Difficulte progressive : alternance simple -> repetition -> rotation -> taille croissante -> combinaisons
5. Systeme de series (5 patterns = 1 etoile)

### Ce que l'enfant apprend
- Reconnaissance de patterns (fondement des maths)
- Prediction et anticipation
- Pensee abstraite
- Pre-algebre (les patterns sont la base des fonctions)

### Apps similaires
- Learning Patterns (iOS), ABCya Shape Patterns, Education.com Roly's Pattern Quiz
- Marie's Pattern Matching (ABCmouse), Ibbleobble Patterns

### Twist PERIPLO
- **Patterns du monde** : sequences basees sur des motifs culturels (frises grecques, tissages africains, mosaiques arabes)
- **Mode creation** : l'enfant cree ses propres patterns et les partage
- **Patterns sonores** : pas seulement visuels, aussi des sequences de sons/rythmes a completer
- **Pattern Machine** : l'enfant "programme" un robot en definissant un pattern, le robot le repete a l'infini de facon animee

---

## Concept 4 -- Periplo Tri (Sorting & Categories)

**Type :** Classification / Tri / Logique
**Tranche d'age :** 3-5 ans (2 categories, attribut visuel), 5-7 ans (3 categories, semantique), 7-10 ans (diagramme de Venn)
**Complexite dev : 2/5 (3 jours)**

### Mecanique
1. Des objets tombent ou apparaissent au centre de l'ecran
2. L'enfant les glisse vers le bon "panier" / "boite" / "valise"
3. Criteres : couleur, forme, taille, categorie (fruits/legumes, animaux terre/mer/air...)
4. Bonus de vitesse pour les plus grands
5. Niveaux avec criteres caches que l'enfant doit deviner par essai-erreur

### Ce que l'enfant apprend
- Categorisation et classification
- Pensee logique et deductive
- Vocabulaire thematique
- Raisonnement scientifique (hypothese -> test -> conclusion)

### Apps similaires
- Shape Sorter (iOS), Dubby Dino Shapes & Colors, ABCmouse sorting activities
- MathMammoth sorting game, Category Sorting (itch.io)

### Twist PERIPLO
- **"Valises de voyage"** : trier les objets dans la bonne valise avant le depart (urgence ludique)
- **Critere mystere** : l'enfant ne connait pas le critere de tri, il doit le deduire des feedbacks
- **Mode "Defi chrono"** : trier le plus d'objets possible en 30 secondes
- **Tri multi-niveaux** : d'abord trier par animal/vehicule, puis re-trier les animaux par habitat

---

## Concept 5 -- Periplo Balance (Balance Scale Math)

**Type :** Maths / Comparaison / Estimation
**Tranche d'age :** 5-7 ans (plus lourd/plus leger), 7-10 ans (equilibrer avec des poids)
**Complexite dev : 2/5 (3-4 jours)**

### Mecanique
1. Une balance a deux plateaux s'affiche a l'ecran
2. Niveau facile : "Quel objet est le plus lourd ?" -- l'enfant touche, la balance s'anime
3. Niveau moyen : placer des objets pour equilibrer la balance
4. Niveau avance : utiliser des poids chiffres (1, 2, 5) pour equilibrer un objet inconnu
5. Animation physique realiste de la balance qui penche

### Ce que l'enfant apprend
- Concepts de poids et mesure
- Comparaison (plus que / moins que / egal)
- Addition mentale (pour equilibrer)
- Estimation et raisonnement logique

### Apps similaires
- SplashLearn Weight Games, iKnowIt Heavier/Lighter, Kiddos Balance Scale Game
- Turtle Diary Heavy or Light, MathGames Light and Heavy

### Twist PERIPLO
- **Objets du monde** : comparer des objets exotiques (un ananas vs une noix de coco, un sac de riz vs un melon)
- **Animation physique fluide** avec spring animations React Native Reanimated
- **Mode "Marchand"** : l'enfant est un marchand qui doit peser des ingredients pour une recette
- **Progression** : lourd/leger -> equilibrer -> peser en kg -> problemes a plusieurs etapes

---

## Concept 6 -- Labo des Couleurs (Color Mixing Lab)

**Type :** Sciences / Couleurs / Experimentation
**Tranche d'age :** 3-5 ans (2 couleurs primaires), 5-7 ans (3 couleurs + quantites), 7-10 ans (nuances et cibles precises)
**Complexite dev : 2/5 (3-4 jours)**

### Mecanique
1. L'ecran affiche des tubes/pots de peinture avec les couleurs primaires
2. L'enfant verse/melange 2 couleurs dans un recipient central
3. Le melange s'anime en temps reel pour reveler la nouvelle couleur
4. Mode cible : "Fabrique du orange !" -- l'enfant doit trouver la bonne combinaison
5. Mode libre : experimentation sans objectif

### Ce que l'enfant apprend
- Theorie des couleurs (primaires, secondaires, tertiaires)
- Cause et effet
- Experimentation scientifique
- Vocabulaire des couleurs et nuances

### Apps similaires
- Baby Panda's Color Mixing (BabyBus), Mix to Match (web), Magical Color Mixing Studio
- Kids Color Mix Lab, ABCya True Colors

### Twist PERIPLO
- **"Atelier du peintre voyageur"** : chaque niveau = recreer les couleurs d'un paysage celebre (coucher de soleil au Sahara, aurore boreale, mer des Caraibes)
- **Interactions tactiles riches** : verser, secouer, melanger avec le doigt
- **Mode "Commande"** : un personnage demande une couleur precise, l'enfant doit la fabriquer
- **Collection de nuances** : debloquer et nommer ses propres couleurs dans un "carnet de couleurs"

---

## Concept 7 -- Compte avec Periplo (Counting Game)

**Type :** Maths / Denombrement
**Tranche d'age :** 3-5 ans (compter 1-10), 5-7 ans (compter 1-20, additions simples)
**Complexite dev : 1/5 (2-3 jours)**

### Mecanique
1. Un groupe d'objets animes apparait a l'ecran
2. L'enfant touche chaque objet pour le compter (feedback sonore + visuel a chaque tap)
3. Puis selectionne le bon nombre parmi les choix proposes
4. Variante : glisser le bon nombre d'objets dans un panier
5. Les objets bougent/se cachent pour les niveaux avances

### Ce que l'enfant apprend
- Denombrement et correspondance terme a terme
- Reconnaissance des chiffres
- Concept de quantite
- Coordination oeil-main

### Apps similaires
- Math Kids (RV AppStudio), Funny Food 3, 123 Genius, Preschool Math
- Khan Academy Kids (section maths)

### Twist PERIPLO
- **Animaux vivants** : les elements a compter sont des animaux animes qui bougent, ce qui rend le comptage plus engageant et difficile
- **"Safari photo"** : l'enfant doit compter les animaux dans une scene de nature foisonnante
- **Comptage interactif** : chaque animal touche fait un bruit et un mouvement unique
- **Mode "Colis"** : emballer exactement le bon nombre de fruits pour un envoi (trop ou pas assez = le colis ne ferme pas)

---

## Concept 8 -- Periplo Formes (Shape Builder / Tangram simplifie)

**Type :** Geometrie / Spatial / Puzzle
**Tranche d'age :** 3-5 ans (placer des formes dans des trous), 5-7 ans (assembler 3-4 pieces), 7-10 ans (tangram complet)
**Complexite dev : 3/5 (4-5 jours)**

### Mecanique
1. Une silhouette/ombre s'affiche comme objectif
2. L'enfant dispose de pieces geometriques a placer (drag & drop)
3. Les pieces s'aimantent quand elles sont proches de la bonne position
4. Niveaux : formes simples -> compositions -> tangram libre
5. Rotation des pieces pour les niveaux avances

### Ce que l'enfant apprend
- Reconnaissance des formes geometriques
- Raisonnement spatial et rotation mentale
- Decomposition/recomposition de formes
- Patience et resolution de problemes

### Apps similaires
- Math Playground Tangram, ABCya Tangrams, Fit It 3D
- Toy Theater Tangram, MentalUP

### Twist PERIPLO
- **Construire des monuments** : les silhouettes sont des monuments celebres (Tour Eiffel, Pyramides, Taj Mahal)
- **"Carte postale"** : une fois le puzzle complete, il se transforme en carte postale animee du pays
- **Mode libre** : creer ses propres formes et les sauvegarder dans un "carnet de croquis"
- **Progression geographique** coherente avec le theme Periplo de voyage autour du monde

---

## Concept 9 -- Trouve les Differences (Spot the Difference)

**Type :** Observation / Attention / Concentration
**Tranche d'age :** 3-5 ans (2 differences, grandes), 5-7 ans (3-5 differences), 7-10 ans (5-7 differences subtiles)
**Complexite dev : 2/5 (3-4 jours)**

### Mecanique
1. Deux images quasi-identiques cote a cote (ou l'une au-dessus de l'autre en portrait)
2. L'enfant touche les differences qu'il repere
3. Feedback anime a chaque difference trouvee (etoile, son, cercle lumineux)
4. Timer optionnel + compteur d'indices
5. 3 indices disponibles par niveau (un indice zoome sur une zone)

### Ce que l'enfant apprend
- Attention aux details et discrimination visuelle
- Concentration soutenue
- Balayage visuel systematique
- Patience

### Apps similaires
- Find Differences Kids Game (iOS/Android), Spot the Differences (Edujoy)
- Can You Spot It, Fun Differences, SafeKidGames Spot the Difference

### Twist PERIPLO
- **Scenes de voyage** : les images sont des scenes de villes du monde (Tokyo, Paris, New York...) avec des differences culturellement pertinentes
- **"Journal de bord"** : chaque niveau resolu ajoute une page au journal du voyageur
- **Differences educatives** : certaines differences sont l'occasion d'apprendre un fait ("Le drapeau a change -- au Japon c'est un cercle rouge, pas bleu !")
- **Generation dynamique** : un systeme qui permute des elements dans les scenes pour creer des niveaux infinis sans nouveau contenu graphique

---

## Concept 10 -- Periplo Maze (Labyrinthe)

**Type :** Logique / Spatial / Planification
**Tranche d'age :** 3-5 ans (chemins simples), 5-7 ans (labyrinthes moyens + collectibles), 7-10 ans (labyrinthes complexes + contraintes)
**Complexite dev : 2/5 (3 jours)**

### Mecanique
1. Un labyrinthe est affiche, l'enfant guide un personnage du depart a l'arrivee
2. Controle par glissement du doigt ou tap sur les fleches
3. Objets a collecter en chemin (etoiles, pieces, lettres d'un mot)
4. Labyrinthes generes algorithmiquement = contenu infini
5. Challenges optionnels : chemin le plus court, collecter tous les items

### Ce que l'enfant apprend
- Planification et anticipation
- Raisonnement spatial
- Resolution de problemes
- Motricite fine (tracage du chemin)

### Apps similaires
- Kids Mazes Educational Game (Android), Logic & Maze Games (iOS)
- Piggy Maze Runner, HappyClicks Mazes, Maze for Kids

### Twist PERIPLO
- **Le labyrinthe est une carte** : chaque labyrinthe represente le plan d'une ville ou d'un lieu celebre
- **Collectibles educatifs** : ramasser des lettres qui forment le nom de la ville, ou des objets culturels
- **Personnage voyageur** : le meme petit explorateur Periplo que dans les autres jeux
- **Generation procedurale** : algorithme de generation de labyrinthes (recursive backtracking), donc contenu illimite pour un cout dev minimal

---

## Concept 11 -- Number Bonds Periplo (Liens Numeriques)

**Type :** Maths / Addition / Decomposition
**Tranche d'age :** 5-7 ans (liens a 10), 7-10 ans (liens a 20, 50, 100)
**Complexite dev : 2/5 (3 jours)**

### Mecanique
1. Un nombre cible s'affiche (ex : 10)
2. L'enfant doit trouver les deux nombres qui s'additionnent pour faire la cible
3. Interface : bulles flottantes avec des nombres, l'enfant en connecte deux
4. Variante : un nombre est donne, trouver le complement (7 + ? = 10)
5. Speed mode : enchainer le plus de liens corrects en 60 secondes

### Ce que l'enfant apprend
- Decomposition des nombres
- Fluence en addition/soustraction
- Calcul mental rapide
- Comprehension du systeme decimal

### Apps similaires
- Vemolo Number Bonds, SplashLearn Number Bonds, Math Mammoth Number Bonds
- Number Bond Blasters, MathPlayground Number Bonds 20

### Twist PERIPLO
- **"Recettes du monde"** : les nombres sont des ingredients, l'enfant doit trouver la bonne combinaison pour "cuisiner" un plat (7 tomates + 3 oignons = recette de 10 ingredients)
- **Bulles flottantes** avec physique amusante (rebondissent, se poussent)
- **Mode duel** : deux joueurs sur le meme ecran, chacun d'un cote
- **Progression** : liens a 5 -> 10 -> 20 -> 100 avec des paliers de maitrise clairs

---

## Concept 12 -- Periplo Code (Visual Coding Simplifie)

**Type :** Codage visuel / Logique / Sequences d'instructions
**Tranche d'age :** 5-7 ans (2-3 instructions), 7-10 ans (boucles, conditions simples)
**Complexite dev : 3/5 (4-5 jours)**

### Mecanique
1. Un personnage sur une grille doit atteindre un objectif (drapeau, tresor)
2. L'enfant place des blocs d'instructions en sequence (avancer, tourner gauche, tourner droite)
3. Appuyer sur "Play" pour voir le personnage executer les instructions
4. Si le personnage atteint l'objectif = victoire
5. Niveaux avances : introduction des boucles ("repete 3 fois") et conditions ("si mur, tourne")

### Ce que l'enfant apprend
- Pensee algorithmique et sequentielle
- Decomposition de problemes
- Concepts de base de programmation (sequence, boucle, condition)
- Debugging (trouver pourquoi ca ne marche pas)

### Apps similaires
- ScratchJr, Code.org, Blockly Games, Tynker Junior
- Code Karts (prescolaire), Lightbot

### Twist PERIPLO
- **"Guide le voyageur"** : le personnage est un explorateur qui doit traverser des paysages (jungle, desert, ocean)
- **Pas de texte** : instructions 100% visuelles (fleches, icones) -- accessible des 5 ans et multi-langue
- **Collectibles en chemin** : optimiser le code pour ramasser tous les souvenirs
- **Mini-niveaux courts** (30 secondes a 2 minutes) adaptes a l'attention des enfants

---

## Concept 13 -- Periplo Shadows (Ombres et Silhouettes)

**Type :** Observation / Association / Perception visuelle
**Tranche d'age :** 3-5 ans (silhouettes simples), 5-7 ans (silhouettes rotations), 7-10 ans (ombres partielles)
**Complexite dev : 1/5 (2 jours)**

### Mecanique
1. Une silhouette noire s'affiche au centre de l'ecran
2. 3-4 images en couleur sont proposees autour
3. L'enfant touche l'image qui correspond a la silhouette
4. Difficulte : silhouettes entieres -> partielles -> avec rotation -> avec distorsion
5. Timer pour gamification + score par serie

### Ce que l'enfant apprend
- Perception visuelle et discrimination de formes
- Rotation mentale (forme vue sous un autre angle)
- Association et correspondance
- Vocabulaire (nommer les objets)

### Apps similaires
- Shadow matching dans plusieurs apps generiques (BabyBus, KidloLand)
- Generalement une mini-activite dans une app plus grande, rarement un jeu complet

### Twist PERIPLO
- **Monuments en ombres** : reconnaitre les silhouettes de monuments celebres (facile : Tour Eiffel, difficile : Angkor Wat)
- **"Nuit au musee"** : ambiance nocturne, lampe torche que l'enfant bouge pour eclairer partiellement la silhouette
- **Mode progressif** : d'abord voir l'objet en couleur, puis en silhouette, puis avec rotation
- **Tres peu d'assets a creer** : une image couleur + son masque noir = 2 niveaux differents du meme asset

---

## Concept 14 -- Periplo Rythme (Sequence Sonore)

**Type :** Patterns / Musique / Memoire auditive
**Tranche d'age :** 3-5 ans (2-3 sons), 5-7 ans (4-5 sons), 7-10 ans (6-8 sons + rythme)
**Complexite dev : 2/5 (3-4 jours)**

### Mecanique
1. Le jeu joue une sequence de sons (instruments, bruits d'animaux, notes de musique)
2. Les sons sont associes a des boutons colores/animes a l'ecran
3. L'enfant doit reproduire la sequence dans le bon ordre (style Simon)
4. Chaque tour ajoute un son supplementaire a la sequence
5. Variante : "quel son manque dans la sequence ?"

### Ce que l'enfant apprend
- Memoire auditive et sequentielle
- Reconnaissance de patterns sonores
- Rythme et timing
- Concentration et ecoute active

### Apps similaires
- Simon classique, Baby Piano (BabyBus), Music games generiques
- Peu de jeux de sequence sonore pure pour enfants

### Twist PERIPLO
- **Instruments du monde** : djembe africain, sitar indien, ukulele hawaiien, gamelan balinais...
- **Chaque niveau = un pays** avec ses sonorrites propres
- **Mode "Orchestre"** : enchainer plusieurs instruments pour creer un morceau
- **Dual mode** : pattern visuel + sonore en meme temps pour les plus grands (stimulation multimodale)

---

## Concept 15 -- Periplo Puzzle Glissant (Sliding Puzzle)

**Type :** Logique / Spatial / Resolution de problemes
**Tranche d'age :** 5-7 ans (grille 2x2 puis 3x3), 7-10 ans (grille 4x4)
**Complexite dev : 2/5 (2-3 jours)**

### Mecanique
1. Une image est decoupee en tuiles sur une grille avec une case vide
2. L'enfant fait glisser les tuiles pour reconstituer l'image
3. Avant le melange, l'image complete est montree pendant quelques secondes
4. Aide visuelle : apercu de l'image cible en miniature
5. Progression : 2x2 (3 tuiles) -> 3x3 (8 tuiles) -> 4x4 (15 tuiles)

### Ce que l'enfant apprend
- Raisonnement spatial et planification
- Resolution de problemes etape par etape
- Patience et perseverance
- Memoire visuelle (se souvenir de l'image cible)

### Apps similaires
- Sliding puzzle classique (15-puzzle), nombreuses implementations generiques
- Peu d'implementations avec un vrai univers enfantin et educatif

### Twist PERIPLO
- **Photos de voyage** : chaque puzzle est une photo d'un lieu celebre, une fois resolu on apprend un fait dessus
- **Collection de cartes postales** : chaque puzzle resolu = une carte postale dans l'album du voyageur
- **Mode progressif** : la meme image passe de 2x2 a 3x3 a 4x4 pour construire la confiance
- **Tres simple a implementer** : une seule logique de grille + n'importe quelle image = un puzzle

---

## Matrice de priorite

### Par complexite de dev (effort minimal -> maximal)

| Complexite | Jeux | Jours estimes |
|------------|------|---------------|
| **1/5** | Memory (#1), L'Intrus (#2), Ombres (#13), Comptage (#7) | 2-3 jours |
| **2/5** | Patterns (#3), Tri (#4), Balance (#5), Couleurs (#6), Differences (#9), Maze (#10), Number Bonds (#11), Rythme (#14), Puzzle Glissant (#15) | 3-4 jours |
| **3/5** | Formes/Tangram (#8), Code Visuel (#12) | 4-5 jours |

### Par valeur educative (impact d'apprentissage)

| Impact | Jeux | Competences cle |
|--------|------|-----------------|
| **Tres eleve** | Patterns (#3), Number Bonds (#11), Code (#12), Balance (#5) | Maths, logique, pre-algebre, pensee algorithmique |
| **Eleve** | L'Intrus (#2), Tri (#4), Formes (#8), Comptage (#7) | Classification, geometrie, denombrement |
| **Moyen-eleve** | Memory (#1), Couleurs (#6), Differences (#9), Ombres (#13), Rythme (#14) | Observation, memoire, sciences, perception |
| **Moyen** | Maze (#10), Puzzle Glissant (#15) | Spatial, resolution de problemes |

### Par potentiel d'engagement (retention / game loop)

| Engagement | Jeux | Pourquoi |
|------------|------|----------|
| **Tres addictif** | Memory (#1), L'Intrus (#2), Rythme (#14), Maze (#10) | Game loop court, satisfaction immediate, "encore un !" |
| **Addictif** | Patterns (#3), Balance (#5), Differences (#9), Number Bonds (#11) | Progression claire, defi juste assez difficile |
| **Engageant** | Couleurs (#6), Tri (#4), Comptage (#7), Ombres (#13), Code (#12), Formes (#8), Puzzle (#15) | Decouverte et experimentation |

---

## Strategie de lancement recommandee

### Sprint 1 (Semaine 1) -- Les fondations
1. **Periplo Memory** (2 jours) -- le plus simple, permet de poser l'univers graphique Periplo
2. **L'Intrus** (2 jours) -- engage immediatement, reutilise les memes assets
3. **Periplo Ombres** (1 jour) -- reutilise les images du Memory en version silhouette

> Resultat : 3 jeux jouables, univers graphique pose, 5 jours de dev

### Sprint 2 (Semaine 2) -- Maths & Patterns
4. **Quelle Suite ?** (3 jours) -- valeur educative maximale
5. **Compte avec Periplo** (2 jours) -- couvre la tranche 3-5 ans

> Resultat : 5 jeux, couverture maths + observation, 5 jours de dev

### Sprint 3 (Semaine 3) -- Differenciation
6. **Labo des Couleurs** (3 jours) -- wow effect, sciences
7. **Periplo Balance** (3 jours) -- concept unique sur le marche enfants

> Resultat : 7 jeux, positionnement unique, 6 jours de dev

### Sprint 4+ -- Enrichissement
8-15. Ajouter progressivement les autres jeux selon les retours utilisateurs

---

## Architecture technique suggeree (React Native Expo)

```
/src
  /games
    /memory          -- Flip card grid component
    /odd-one-out     -- Selection grid + feedback
    /patterns        -- Sequence display + choice picker
    /sorting         -- Drag & drop containers
    /balance         -- Animated scale (Reanimated 3)
    /colors          -- Color blending canvas
    /counting        -- Tap counter + number picker
    /shapes          -- Drag & drop puzzle pieces
    /differences     -- Dual image tap zones
    /maze            -- Grid pathfinding + swipe control
    /number-bonds    -- Bubble connect + target number
    /coding          -- Instruction block sequencer
    /shadows         -- Silhouette matcher
    /rhythm          -- Audio sequencer (expo-av)
    /sliding-puzzle  -- Tile grid sliding logic
  /shared
    /components      -- Button, Star, Timer, ProgressBar, Confetti
    /hooks           -- useScore, useTimer, useDifficulty, useSound
    /assets          -- Themes par pays (images, sons)
    /engine          -- Game loop, scoring, progression, analytics
    /navigation      -- World map (hub central des jeux)
```

### Libs cle
- `react-native-reanimated` -- animations fluides (balance, couleurs, cartes)
- `react-native-gesture-handler` -- drag & drop, swipe
- `expo-av` -- sons et musique (rythme, feedback)
- `expo-haptics` -- retour haptique sur mobile
- `react-native-skia` -- dessin/canvas pour le labo couleurs

---

## Sources

- [15 Best Math Apps for Kids - Prodigy](https://www.prodigygame.com/main-en/blog/best-math-apps-for-kids)
- [5 Best Educational Apps for Kids 2026 - Smart Tales](https://smarttales.app/top-5-must-have-educational-apps-for-kids-in-2025/)
- [Best Math Apps for Kids 2026 - Funexpected](https://funexpectedapps.com/blog-posts/best-math-apps-for-kids-2025-edition)
- [Best Math Games for Kids 2026 - Hooda Math](https://www.hoodamath.com/blog/the-best-math-games-for-kids-in-2026-fun-free-and-educational)
- [Learning Patterns App - App Store](https://apps.apple.com/us/app/learning-patterns-pattern-logic-game-for-kids/id717236674)
- [ABCya Shape Patterns](https://www.abcya.com/games/shape_patterns)
- [Odd One Out - App Store](https://apps.apple.com/us/app/odd-one-out-what-does-not-belong-for-kindergarten-kids/id879922575)
- [Why Odd-One-Out is Great for Preschoolers - Empowered Parents](https://empoweredparents.co/odd-one-out-game/)
- [What Comes Next Pattern Recognition - Learners Planet](https://learnersplanet.com/public/pattern-play-what-comes-next)
- [Pattern Activities for Preschoolers - Wonjo](https://wonjo.kids/blog/learning/pattern-activities-for-preschoolers/)
- [Color Mixing App - Science Kiddo](https://sciencekiddo.com/kids-color-mixing-app/)
- [Mix to Match - Color Mixing Game](https://mixtomatch.org/)
- [Sorting & Classifying Activities - Wonjo](https://wonjo.kids/blog/learning/sorting-classifying-activities-for-preschoolers/)
- [Sorting Activities - ABCmouse](https://www.abcmouse.com/learn/activities/sorting-activities-for-preschoolers/21432)
- [Apps to Build Visual Processing Skills - Special Mom Advocate](https://specialmomadvocate.com/apps-help-visual-processing/)
- [Visual Perception Activities - Empowered Parents](https://empoweredparents.co/12-ideas-to-develop-your-childs-visual-perception/)
- [Find Differences Kids Game - App Store](https://apps.apple.com/us/app/find-differences-kids-game/id1473947414)
- [Spot the Difference - MentalUP](https://www.mentalup.co/blog/spot-the-difference)
- [20 Best Coding Apps for Kids 2026 - Create & Learn](https://www.create-learn.us/blog/coding-apps-for-kids/)
- [Blockly Games - Codingal](https://www.codingal.com/coding-for-kids/blog/blockly-games-best-coding-games-for-kids-and-beginners/)
- [Math Kids - Google Play](https://play.google.com/store/apps/details?id=com.rvappstudios.math.kids.counting)
- [Number Bonds - SplashLearn](https://www.splashlearn.com/math/number-bonds-games)
- [Number Bonds - Math Mammoth](https://www.mathmammoth.com/practice/number-bonds)
- [Kids Mazes Educational Game - Google Play](https://play.google.com/store/apps/details?id=com.babyhub.kids.maze.educational.puzzle)
- [Tangram Puzzles - Math Playground](https://www.mathplayground.com/tangram_puzzles.html)
- [Tangram for Kids - MentalUP](https://www.mentalup.co/blog/tangram-for-kids)
- [Balance Scale Weight Games - SplashLearn](https://www.splashlearn.com/math/compare-weights-games)
- [Balance Scale Game - Kiddos Games](https://kiddos.games/for-kids/balance-scale/)
- [Memory Matching Game - WonderMini - Google Play](https://play.google.com/store/apps/details?id=com.wondermini.matchinggameforkids_funflipcards)
- [MemoryMatching.com](https://memorymatching.com/)
