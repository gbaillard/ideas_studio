# PERIPLO -- Concepts de Jeux Supplementaires (Batch 2)

> Recherche web du 2026-04-10 | 18 nouveaux concepts | Stack : React Native Expo + TypeScript + Docker web
> Tranches d'age : 3-5 ans, 5-7 ans, 7-10 ans
> **Ne duplique AUCUN des 25 concepts existants** (Sokoban, Mirror/Symetrie, Tower/Empilage, Sequences/Patterns, Pipes/Flow, Tangram, Maze/Labyrinthe, Colors/Melange, Shadows/Ombres, Gears/Engrenages, Memory Grid, Odd One Out/Intrus, Balance, Flow Connect/Routes, Water Sort/Fuel, Sorting/Tri, Spot Difference/Detective, Visual Coding, Rythme/Simon, Nonogram/Picross, Constellation/Grid Memory, Counting/Comptage, Number Bonds, Taquin/Sliding Puzzle)

---

## Synthese express -- TOP 5 a prototyper en priorite

| Rang | Jeu | Type | Age | Complexite | Pourquoi |
|------|-----|------|-----|------------|----------|
| 1 | **Periplo Origami** | Pliage/Spatial | 5-10 | 2/5 | Mecanique unique, 0 concurrent sur mobile enfants, forte retention |
| 2 | **Periplo Laser** | Optique/Reflexion | 5-10 | 2/5 | STEM pur, tres visuel, scalable en difficulte, effet "wow" |
| 3 | **Periplo Domino** | Chaine/Cause-effet | 3-7 | 2/5 | Satisfaction immediate, physique simple, game loop addictif |
| 4 | **Periplo Mosaique** | Tessellation/Art | 3-10 | 2/5 | Creatif + mathematique, partage parent, contenu infini |
| 5 | **Periplo Meteo** | Sciences/Simulation | 3-7 | 3/5 | Educatif fort, lien monde reel, engagement quotidien |

---

## Concept 1 -- Periplo Origami (Paper Folding Puzzle)

**Type :** Spatial / Geometrie / Pliage
**Tranche d'age :** 5-7 ans (pliages simples, 2-3 etapes), 7-10 ans (pliages complexes, symetrie, multi-etapes)
**Complexite dev : 2/5 (3-4 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. Un carre de "papier" virtuel s'affiche a l'ecran avec des lignes de pliage en pointilles
2. L'enfant glisse le doigt pour plier le papier le long des lignes (animation de pliage en temps reel)
3. Objectif : reproduire une forme cible (animal, objet, etoile) en pliant dans le bon ordre
4. Chaque pli revele un morceau du dessin final -- feedback visuel progressif
5. Mode inverse : on montre le resultat plie, l'enfant doit deviner quelle forme de depart a ete utilisee

### Ce que l'enfant apprend
- Raisonnement spatial et rotation mentale
- Symetrie et geometrie
- Planification sequentielle (quel pli en premier ?)
- Motricite fine et precision

### Ce qui le rend original
- **Aucun jeu de pliage interactif n'existe pour les enfants de 5-7 ans sur mobile** -- le marche est vide
- Le geste tactile de "plier" est extremement satisfaisant et intuitif
- **Animaux du monde** : chaque origami est un animal d'un pays (grue japonaise, elephant d'Afrique, colibri d'Amerique du Sud)
- **Mode decouverte** : une fois l'origami termine, il s'anime et une micro-info culturelle s'affiche
- **Collection d'origamis** : l'enfant remplit un "carnet de voyage" avec ses creations

### Reference
- Inspire par *Paper - A Game of Folding* (Steam, adultes) et *Foldology* (jeu physique, 10+), mais simplifie et adapte aux enfants

---

## Concept 2 -- Periplo Laser (Light & Mirrors)

**Type :** Physique / Optique / Logique
**Tranche d'age :** 5-7 ans (1 miroir, trajectoire simple), 7-10 ans (multi-miroirs, prismes, couleurs)
**Complexite dev : 2/5 (3-4 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. Un rayon de lumiere part d'une source (lampe/laser colore) dans une direction fixe
2. L'enfant place et oriente des miroirs sur une grille pour rediriger le rayon vers une cible (etoile, cristal)
3. Le rayon se dessine en temps reel a chaque modification -- feedback instantane
4. Niveaux avances : prismes qui separent la lumiere blanche en couleurs, filtres colores, obstacles opaques
5. Defi : atteindre PLUSIEURS cibles avec un seul rayon et des miroirs bien places

### Ce que l'enfant apprend
- Reflexion de la lumiere (angle d'incidence = angle de reflexion)
- Decomposition de la lumiere (prisme, arc-en-ciel)
- Planification spatiale et angles
- Pensee causale (si je bouge ce miroir, le rayon change de direction)

### Ce qui le rend original
- **Combine sciences et puzzle** -- les parents adorent le STEM, les enfants adorent les lasers
- **Visuellement spectaculaire** : rayons colores, animations de lumiere, effet prisme arc-en-ciel
- **Theme Periplo** : chaque set de niveaux = un phare a allumer dans un port du monde (phare d'Alexandrie, phare de Cordouan, Cape Hatteras...)
- **Mode bac a sable** : experimenter librement avec miroirs, prismes et lumiere sans objectif
- Inexistant dans les apps enfants -- les jeux de lasers existants (Lazors, Reflect Laser) ciblent les adultes

### Reference
- Inspire par *Lazors* (iOS/Android, 280 niveaux adultes), *Light Ignite*, *COKOGAMES Laser Maker*

---

## Concept 3 -- Periplo Domino (Chain Reaction Builder)

**Type :** Physique / Cause-effet / Construction
**Tranche d'age :** 3-5 ans (ligne droite de dominos), 5-7 ans (virages, rampes), 7-10 ans (circuits complexes, elements speciaux)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Eleve**

### Mecanique
1. L'enfant place des dominos sur un plan vu de dessus (ou 2.5D isometrique)
2. Quand il est pret, il pousse le premier domino (tap)
3. Les dominos tombent en chaine -- animation satisfaisante avec son percussif
4. Objectif : relier le point de depart a l'arrivee en utilisant tous les dominos disponibles
5. Elements speciaux : rampes, trampolines, tourniquets, billes qui roulent

### Ce que l'enfant apprend
- Cause et effet / reactions en chaine
- Planification et anticipation
- Estimation des distances et angles
- Concepts physiques de base (gravite, transfert d'energie)

### Ce qui le rend original
- **L'effet "cascade de dominos" est universellement satisfaisant** -- meme les 3 ans comprennent et adorent
- Peu de contenu graphique a creer : les dominos sont des rectangles colores
- **Mode "Rube Goldberg"** pour les 7-10 ans : combiner dominos, billes, rampes, catapultes dans des machines folles
- **Theme Periplo** : les dominos forment des motifs culturels vus de dessus (mandala indien, rosace europeenne)
- **Replay au ralenti** : revoir sa chaine tomber en slow motion avec camera cinematique

### Reference
- Inspire par *Rube Goldberg Machines* (app), les videos virales de dominos sur YouTube, *World of Goo*

---

## Concept 4 -- Periplo Mosaique (Tessellation Art)

**Type :** Geometrie / Art / Creativite
**Tranche d'age :** 3-5 ans (formes simples, couleurs), 5-7 ans (tessellations regulieres), 7-10 ans (tessellations complexes type Escher)
**Complexite dev : 2/5 (3-4 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. Mode Puzzle : une mosaique cible est montree, l'enfant doit la reproduire en placant des tuiles geometriques sur une grille
2. Mode Libre : palette de formes (triangles, hexagones, losanges, etoiles) a placer librement pour creer des motifs
3. Les tuiles s'aimantent a la grille et entre elles -- pas de placement imprecis
4. Rotation des tuiles par geste de rotation a deux doigts
5. Niveaux avances : creer une tessellation qui se repete a l'infini (le motif se propage automatiquement quand l'enfant le valide)

### Ce que l'enfant apprend
- Geometrie : formes, angles, pavage du plan
- Symetrie et repetition
- Creativite et sens artistique
- Raisonnement spatial

### Ce qui le rend original
- **Fusion unique Art + Maths** : les parents voient les maths, les enfants voient l'art -- tout le monde est content
- **Mosaiques du monde** : chaque set de niveaux s'inspire d'un art decoratif reel (zellige marocain, mosaiques romaines, rangoli indien, azulejos portugais, sashiko japonais)
- **Mode "Galerie"** : les creations de l'enfant sont encadrees dans une galerie virtuelle
- **Effet Escher** pour les grands : creer des tessellations ou les formes se transforment progressivement (poisson -> oiseau)
- **Partage** : exporter sa mosaique en image pour l'envoyer aux grands-parents

### Reference
- Inspire par les tessellations de M.C. Escher, les zelliges marocains, *Pattern Blocks* (manipulatif Montessori)

---

## Concept 5 -- Periplo Meteo (Weather Lab)

**Type :** Sciences / Meteo / Simulation
**Tranche d'age :** 3-5 ans (soleil/pluie/neige), 5-7 ans (cycle de l'eau, nuages), 7-10 ans (phenomenes complexes, previsions)
**Complexite dev : 3/5 (4-5 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. L'enfant controle un "tableau de bord meteo" avec des curseurs pour la temperature, l'humidite, le vent
2. En ajustant les parametres, le paysage se transforme en temps reel (soleil -> nuages -> pluie -> neige -> orage)
3. Mode defi : "Fais apparaitre un arc-en-ciel !" -- l'enfant doit trouver la bonne combinaison (pluie + soleil)
4. Mode cycle de l'eau : suivre une goutte d'eau de l'ocean au nuage a la pluie a la riviere
5. Niveaux avances : creer des tornades, vent de sable, aurore boreale en manipulant les variables

### Ce que l'enfant apprend
- Cycle de l'eau et phenomenes meteorologiques
- Cause et effet (temperature -> type de precipitation)
- Vocabulaire scientifique (evaporation, condensation, precipitation)
- Comprehension du climat et des saisons

### Ce qui le rend original
- **Experimentation sandbox** : pas de "bonne reponse" dans le mode libre, juste de l'exploration
- **Visuellement magnifique** : ciel qui change de couleur, gouttes de pluie animees, eclairs, arc-en-ciel
- **Theme Periplo** : chaque biome = un climat du monde (toundra, desert, tropical, tempere, polaire)
- **Lien quotidien** : "Quel temps fait-il chez toi aujourd'hui ? Recree-le dans le jeu !"
- Inspire par *MarcoPolo Weather* et *Pango Kumo* mais avec plus de profondeur interactive

### Reference
- *MarcoPolo Weather* (app iOS/Android), *Pango Kumo*, PBS KIDS Weather Reporter

---

## Concept 6 -- Periplo Circuits (Electric Playground)

**Type :** Sciences / Electricite / Logique
**Tranche d'age :** 5-7 ans (circuit simple : pile + fil + ampoule), 7-10 ans (interrupteurs, series/parallele, moteurs)
**Complexite dev : 3/5 (4-5 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. L'enfant dispose de composants : piles, fils, ampoules, interrupteurs, moteurs, buzzers
2. Il les connecte en glissant des fils entre les bornes (drag & drop)
3. Quand le circuit est ferme, l'ampoule s'allume / le moteur tourne / le buzzer sonne -- feedback immediat
4. Mode puzzle : "Allume les 3 ampoules avec une seule pile" -- l'enfant doit trouver le bon cablage
5. Mode defi : circuits avec composants defaillants a identifier et reparer (debugging electrique)

### Ce que l'enfant apprend
- Bases de l'electricite (circuit ouvert/ferme, conducteur/isolant)
- Circuits en serie vs en parallele
- Resolution de problemes et debogage
- Pensee systematique

### Ce qui le rend original
- **STEM pur** tres demande par les parents et les ecoles
- **Pas un quiz, un simulateur** : l'enfant construit et voit le resultat, comme dans un vrai atelier
- **Theme Periplo** : chaque niveau = eclairer un monument du monde (illuminer la Tour Eiffel, faire tourner un moulin hollandais)
- **Mode bac a sable** : creer des circuits librement, ajouter des LEDs de couleur, faire des montages fun
- Inspire par *Legends of Learning* et *Meet Science*, mais en version interactive tactile optimisee enfants

### Reference
- *Legends of Learning: Circuits*, *Meet Science: Magnetism and Electricity*, *Snap Circuits* (jouet physique)

---

## Concept 7 -- Periplo Jardin (Plant Growing Sim)

**Type :** Sciences naturelles / Patience / Gestion
**Tranche d'age :** 3-5 ans (planter + arroser = fleur), 5-7 ans (soleil/eau/terre), 7-10 ans (ecosysteme complet, saisons)
**Complexite dev : 3/5 (4-5 jours)**
**Potentiel educatif : Eleve**

### Mecanique
1. L'enfant recoit une parcelle de terre et des graines
2. Il plante les graines, arrose, positionne un soleil (curseur) pour l'ensoleillement
3. La plante pousse de maniere acceleree selon les soins (animation timelapse)
4. Trop d'eau = pourriture, pas assez de soleil = etiolement -- l'enfant apprend par l'experimentation
5. Niveaux avances : insectes pollinisateurs, compost, rotation des cultures, saisons

### Ce que l'enfant apprend
- Cycle de vie des plantes (graine -> pousse -> fleur -> fruit -> graine)
- Besoins fondamentaux des plantes (eau, lumiere, terre)
- Patience et responsabilite
- Bases d'ecologie et de biodiversite

### Ce qui le rend original
- **Gratification differee** : contrairement aux autres puzzles, ici l'enfant doit revenir -- retention naturelle
- **Theme Periplo** : planter des especes de chaque continent (baobab d'Afrique, cerisier du Japon, cactus d'Amerique, edelweiss d'Europe)
- **Herbier numerique** : chaque plante reussie s'ajoute a un herbier avec sa fiche (nom, origine, fun fact)
- **Zero violence, zero chrono** : rythme lent et apaisant, ideal avant le coucher
- **Connecte au reel** : "Observe une vraie plante chez toi et compare !"

### Reference
- *Grow Garden: Kids Games*, *Little Botany*, *Terrarium: Garden Idle*, approche Montessori du soin aux plantes

---

## Concept 8 -- Periplo Maestro (Music Composer)

**Type :** Musique / Creativite / Patterns
**Tranche d'age :** 3-5 ans (tap pour jouer des notes), 5-7 ans (composer des melodies simples), 7-10 ans (multi-pistes, rythme + melodie)
**Complexite dev : 3/5 (4-5 jours)**
**Potentiel educatif : Eleve**

### Mecanique
1. Interface grille : axe X = temps, axe Y = notes (do, re, mi...)
2. L'enfant place des "bulles musicales" sur la grille en tapant
3. La grille se lit de gauche a droite automatiquement -- la melodie se joue en boucle
4. Ajouter une deuxieme piste (rythme/percussion) qui se superpose
5. Mode puzzle : reproduire une melodie entendue en placant les bonnes bulles

### Ce que l'enfant apprend
- Notions musicales de base (hauteur, duree, rythme)
- Patterns et repetitions
- Creativite et expression
- Ecoute active et discrimination auditive

### Ce qui le rend original
- **Difference avec Periplo Rythme (Simon)** : ici l'enfant COMPOSE sa musique, il ne reproduit pas une sequence
- **Interface grille** style "boite a musique" ou "Chrome Music Lab" -- extremement intuitive
- **Instruments du monde** : chaque "skin sonore" = instruments d'un pays (kalimba, steel drum, koto, sitar, balafon)
- **Export** : sauvegarder et rejouer ses compositions, les partager en famille
- **Mode "Orchestre cooperatif"** : un enfant fait la melodie, un autre le rythme (meme appareil, ecran partage)

### Reference
- *Chrome Music Lab: Song Maker*, *GarageBand simplifie*, *Building Beats*, *MusiQuest*

---

## Concept 9 -- Periplo Globe (GeoGuesser for Kids)

**Type :** Geographie / Culture / Observation
**Tranche d'age :** 5-7 ans (reconnaitre les continents + animaux), 7-10 ans (pays, drapeaux, monuments, langues)
**Complexite dev : 2/5 (3-4 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. L'enfant voit une illustration d'un lieu (paysage, monument, scene de rue) dessinee en style Periplo
2. Il doit deviner "ou est-on ?" en pointant sur un globe interactif
3. Plus la reponse est proche, plus il gagne d'etoiles
4. Apres chaque reponse, une fiche "carte postale" revele le lieu avec 3 fun facts
5. Mode quiz rapide : drapeaux, langues ("Bonjour" en quelle langue ?), monnaies, animaux par continent

### Ce que l'enfant apprend
- Geographie mondiale (continents, pays, capitales)
- Culture generale et ouverture sur le monde
- Observation et deduction (indices visuels)
- Vocabulaire multilingue de base

### Ce qui le rend original
- **Coeur de marque PERIPLO** : ce jeu INCARNE le voyage, le theme fondateur de la marque
- **GeoGuessr simplifie pour enfants** : le concept adulte explose (100M joueurs), aucun equivalent enfant de qualite
- **Illustrations originales** au lieu de photos Google Street View : controlables, adaptees aux enfants, coherentes avec l'univers graphique
- **Progression = tour du monde** : debloquer les pays un par un sur le globe -- collecte addictive
- **Mode "Correspondant"** : l'enfant recoit une "lettre" d'un enfant fictif d'un pays et doit deviner d'ou elle vient grace aux indices

### Reference
- *GeoGuessr* (adulte, phenomene mondial), *Planet Geo*, *StudyGe*, *Seterra*

---

## Concept 10 -- Periplo Architect (Bridge / Structure Builder)

**Type :** Physique / Ingenierie / Construction
**Tranche d'age :** 5-7 ans (empiler des blocs stables), 7-10 ans (construire des ponts, tester la resistance)
**Complexite dev : 3/5 (5-6 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. L'enfant dispose de poutres, cables, piliers et charnires dans un budget limite
2. Il construit une structure (pont, tour, abri) entre deux points
3. Phase test : un vehicule/personnage traverse la structure -- si elle tient, victoire !
4. Si la structure s'effondre, l'animation montre exactement ou ca casse -- l'enfant corrige et re-teste
5. Niveaux avances : materiaux differents (bois leger, metal lourd, corde flexible), contraintes de budget

### Ce que l'enfant apprend
- Principes de base de l'ingenierie (triangulation, repartition des charges)
- Budget et contraintes (ressources limitees)
- Methode iterative : construire -> tester -> corriger -> re-tester
- Physique : gravite, forces, resistance des materiaux

### Ce qui le rend original
- **Difference avec Tower/Empilage** : ici on ne EMPILE pas, on CONSTRUIT des structures horizontales et diagonales avec de la physique realiste
- **Simulation de crash spectaculaire** : les enfants ADORENT voir les choses s'effondrer (et apprendre pourquoi)
- **Theme Periplo** : construire les ponts et monuments celebres du monde (Golden Gate, Tower Bridge, ponts de lianes d'Amazonie)
- **Mode defi "tremblement de terre"** : la structure doit resister a des secousses
- Inspire par *SimplePhysics*, *Poly Bridge* (adulte), mais simplifie avec drag & drop intuitif

### Reference
- *SimplePhysics*, *Poly Bridge* (Steam, adulte), *Monster Physics*, *Bad Piggies* (Angry Birds spin-off)

---

## Concept 11 -- Periplo Trace (Letter & Shape Drawing)

**Type :** Motricite fine / Pre-ecriture / Graphisme
**Tranche d'age :** 3-5 ans (tracer des lignes, courbes, formes), 5-7 ans (lettres, chiffres, mots simples)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Eleve**

### Mecanique
1. Un modele s'affiche en pointilles (forme, lettre, chiffre)
2. L'enfant trace par-dessus avec le doigt, le trace s'affiche en temps reel
3. Scoring base sur la precision du trace (proximite avec le modele, fluidite)
4. Feedback anime : quand le trace est bon, le dessin "prend vie" (la lettre A se transforme en Avion qui s'envole)
5. Progression : lignes droites -> courbes -> zigzags -> lettres -> chiffres -> mots

### Ce que l'enfant apprend
- Motricite fine et controle du geste
- Pre-ecriture (direction des traces, formes des lettres)
- Reconnaissance des lettres et chiffres
- Concentration et precision

### Ce qui le rend original
- **L'animation "reward"** transforme chaque lettre tracee en illustration vivante -- A = Avion, B = Baleine, C = Chat...
- **Alphabets du monde** : tracer des lettres arabes, des kanji japonais, du cyrillique, du grec -- decouverte des ecritures
- **Mode "Carte postale"** : tracer un message qui s'integre dans une carte postale illustree a envoyer (screenshot)
- **Detection de qualite du trace** en temps reel avec feedback haptique (vibration quand on sort du chemin)
- Simple mais indispensable : le tracage est le #1 des activites prescolaires demandees

### Reference
- *ABC Kids - Tracing & Phonics*, *Writing Wizard*, *iTrace*, approche Montessori des lettres rugueuses

---

## Concept 12 -- Periplo Whack (Reaction & Reflex Game)

**Type :** Reflexes / Coordination / Arcade educatif
**Tranche d'age :** 3-5 ans (taper les animaux qui apparaissent), 5-7 ans (taper seulement les bons), 7-10 ans (regles composees, vitesse elevee)
**Complexite dev : 1/5 (2 jours)**
**Potentiel educatif : Moyen**

### Mecanique
1. Des elements "pop" a l'ecran depuis des trous/buissons/vagues (style Whack-a-Mole)
2. L'enfant tape dessus le plus vite possible
3. Twist educatif : il faut taper SEULEMENT certains elements selon une regle ("tape les nombres pairs", "tape les animaux herbivores", "tape les pays d'Europe")
4. Taper un mauvais element = penalite (perte de points, pas de punition negative)
5. Vitesse progressive : de plus en plus rapide, de plus en plus d'elements a l'ecran

### Ce que l'enfant apprend
- Temps de reaction et coordination oeil-main
- Discrimination rapide (trier mentalement en temps reel)
- Le contenu educatif depend de la regle : maths, sciences, geographie, vocabulaire
- Concentration sous pression

### Ce qui le rend original
- **Le seul jeu "arcade" de la collection** -- change le rythme par rapport aux puzzles calmes
- **Regle educative modulable** : le meme moteur de jeu enseigne n'importe quelle matiere en changeant la regle
- **Theme Periplo** : les elements sortent de "trous" dans une carte du monde, chaque zone = un theme
- **Excellente session courte** : 30 secondes = 1 partie, parfait pour les micro-moments
- Ultra-simple a developper : spawn aleatoire + timer + tap detection

### Reference
- *Whack a Mole* (classique), *Fruit Ninja*, concept de *discrimination rapide* du test de Stroop

---

## Concept 13 -- Periplo Poids (Estimation & Measurement)

**Type :** Maths / Estimation / Mesure
**Tranche d'age :** 5-7 ans (plus grand/plus petit, estimation visuelle), 7-10 ans (mesurer avec regle, estimer des distances)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. Deux objets s'affichent : "Lequel est le plus long / le plus haut / le plus lourd ?"
2. L'enfant repond, puis une animation de mesure revele la bonne reponse (regle qui se deplie, metre-ruban anime)
3. Mode estimation : "A ton avis, combien mesure cette girafe ?" -- l'enfant place un curseur, la vraie mesure s'affiche
4. Mode comparaison : "Combien de pommes faut-il empiler pour atteindre la hauteur d'un elephant ?"
5. Unites progressives : comparaison directe -> unites non standard (pommes) -> cm/m -> conversion

### Ce que l'enfant apprend
- Sens de la mesure et des grandeurs
- Estimation (competence mathematique critique souvent negligee)
- Unites de mesure et conversions
- Comprehension des ordres de grandeur

### Ce qui le rend original
- **Difference avec Balance** : Balance compare des POIDS. Ici on mesure des LONGUEURS, HAUTEURS, DISTANCES, VOLUMES
- **Objets du monde** : comparer la taille de la Tour Eiffel vs la Statue de la Liberte, la longueur du Nil vs l'Amazone
- **"A l'echelle"** : afficher des objets a la bonne echelle pour developper l'intuition des grandeurs
- **Mode "Valise"** : "Est-ce que cette peluche rentre dans cette valise ?" -- estimation de volume
- Competence mathematique fondamentale peu exploitee dans les apps

### Reference
- Inspire par les activites Montessori de mesure, *SplashLearn Measurement Games*, programmes scolaires de geometrie/mesure

---

## Concept 14 -- Periplo Fractions (Pizza / Gateau Cutter)

**Type :** Maths / Fractions / Partage
**Tranche d'age :** 5-7 ans (moities, quarts), 7-10 ans (tiers, sixiemes, equivalences, operations)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. Un gateau / une pizza / un fruit s'affiche entier
2. L'enfant trace des lignes de decoupe pour le diviser en parts egales
3. "Coupe ce gateau en 4 parts egales" -- feedback visuel si les parts ne sont pas egales
4. Mode partage : "Il y a 3 amis. Chacun doit avoir la meme quantite. Comment couper ?"
5. Mode avance : "1/4 + 1/4 = ?" -- manipuler visuellement les parts pour voir le resultat

### Ce que l'enfant apprend
- Concept de fraction (partie d'un tout)
- Equivalence de fractions (2/4 = 1/2)
- Partage equitable
- Pre-addition/soustraction de fractions

### Ce qui le rend original
- **Manipulation directe** : l'enfant COUPE lui-meme -- pas des fractions abstraites sur papier
- **Theme Periplo culinaire** : couper des specialites de chaque pays (pizza italienne, gateau Black Forest allemand, tarte Tatin francaise, mochi japonais)
- **Multi-sensoriel** : son de decoupe satisfaisant, animation de separation, confettis si c'est parfaitement egal
- **Progression vers l'abstrait** : d'abord des vrais aliments, puis des formes geometriques, puis des nombres
- Les fractions sont le #1 des difficultes en maths primaire -- un outil visuel de qualite est tres demande

### Reference
- *Pizza Fractions* (ABCya), *SplashLearn Fractions*, *Fraction Frenzy*, approche concretes-pictographiques du curriculum Singapour

---

## Concept 15 -- Periplo Timeline (Chronologie & Histoire)

**Type :** Culture / Logique temporelle / Histoire
**Tranche d'age :** 5-7 ans (avant/apres, journee), 7-10 ans (frise chronologique, epoques)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. Des cartes illustrees representent des evenements ou des etapes d'un processus
2. L'enfant doit les placer dans le bon ordre chronologique sur une frise
3. Niveau facile : 3 cartes de la vie quotidienne (se lever, petit-dejeuner, ecole)
4. Niveau moyen : cycle de vie (oeuf -> chenille -> chrysalide -> papillon)
5. Niveau avance : frise historique simplifiee (dinosaures -> egyptiens -> romains -> moyen age -> aujourd'hui)

### Ce que l'enfant apprend
- Notion de temps et de chronologie
- Sequences logiques temporelles
- Culture generale et histoire
- Vocabulaire temporel (avant, apres, d'abord, ensuite, enfin)

### Ce qui le rend original
- **Aucun jeu de timeline interactif pour enfants n'existe sur mobile** -- le jeu de societe "Timeline" est un succes chez les adultes
- **Theme Periplo** : "voyage dans le temps" -- chaque epoque = un decor historique anime
- **Mode "Explorateur du temps"** : l'enfant debloque des epoques et les "visite" avec des illustrations animees
- **Double usage** : sequencage logique (processus) + culture generale (histoire)
- **Adaptable a toute matiere** : cycle de l'eau, croissance d'une plante, fabrication du pain, histoire d'un pays

### Reference
- Jeu de societe *Timeline* (Asmodee, succes mondial), *BrainPOP*, programmes scolaires "se reperer dans le temps"

---

## Concept 16 -- Periplo Pixel (Pixel Art Creator)

**Type :** Art / Maths / Grilles / Creativite
**Tranche d'age :** 5-7 ans (grille 8x8, colorier par numero), 7-10 ans (grille 16x16, creation libre)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Moyen-eleve**

### Mecanique
1. Mode coloriage numerote : une grille avec des numeros, chaque numero = une couleur. L'enfant colorie pour reveler l'image
2. Mode reproduction : un modele pixel art est montre a cote d'une grille vide, l'enfant le reproduit
3. Mode libre : creer son propre pixel art sur une grille vierge avec palette de couleurs
4. Mode animation : creer 2-3 frames et les animer en boucle (GIF simplissime)
5. Outils : pinceau, remplissage, gomme, pipette, symetrie miroir

### Ce que l'enfant apprend
- Reperage sur grille (coordonnees lignes/colonnes)
- Reproduction de modele (attention aux details)
- Creativite et expression artistique
- Pre-programmation (les pixels SONT de la donnee numerique)

### Ce qui le rend original
- **Difference avec Nonogram/Picross** : Picross est un PUZZLE logique pour reveler une image. Ici l'enfant CREE et DESSINE librement
- **Pixel art = tendance massive** chez les kids (retro gaming, Minecraft, Roblox)
- **Theme Periplo** : modeles a reproduire = drapeaux du monde, animaux pixel, monuments
- **Mode animation** : creer un mini-GIF anime est un "wow moment" enorme pour un enfant
- **Export et partage** : sauvegarder ses creations, les utiliser comme avatar dans les autres jeux Periplo

### Reference
- *Pixel Art - Color by Number*, *8bit Painter*, *Dotpict*, *Minecraft* (mode creatif)

---

## Concept 17 -- Periplo Potions (Logic Deduction Lab)

**Type :** Logique / Deduction / Experimentation
**Tranche d'age :** 5-7 ans (2 ingredients, resultat visible), 7-10 ans (3-4 ingredients, deduction par elimination)
**Complexite dev : 2/5 (3-4 jours)**
**Potentiel educatif : Tres eleve**

### Mecanique
1. L'enfant est un "alchimiste voyageur" avec des fioles d'ingredients colores
2. Objectif : creer une potion cible (couleur + effet defini)
3. Il melange 2-3 ingredients dans un chaudron -- le resultat est une surprise
4. En observant les resultats de ses essais, l'enfant deduit quelle combinaison donne la potion cible
5. Carnet de notes : l'enfant peut noter ses decouvertes (ingredient A + B = potion verte, A + C = potion rouge...)

### Ce que l'enfant apprend
- Raisonnement hypothetico-deductif (le coeur de la methode scientifique)
- Elimination logique
- Prise de notes et organisation de l'information
- Experimentation systematique

### Ce qui le rend original
- **Difference avec Colors/Melange** : dans Colors on melange pour obtenir une couleur. Ici c'est un JEU DE LOGIQUE ou le melange est le MECANISME DE DEDUCTION, pas le but
- **Univers "magie + science"** : les enfants adorent les potions, les chaudrons, l'alchimie
- **Carnet de decouverte** : l'enfant apprend a prendre des notes scientifiques, une competence de methode
- **Theme Periplo** : chaque niveau = un atelier d'alchimiste dans un pays (apothicaire chinois, herboriste amazonien, parfumeur de Grasse)
- **Rejouabilite** : les combinaisons changent a chaque session, impossible de memoriser

### Reference
- Inspire par les jeux de deduction type *Mastermind*, l'experimentation chimique de *Crazy Alchemy*, la methode scientifique Montessori

---

## Concept 18 -- Periplo Tangram Vivant (Jigsaw Puzzle Anime)

**Type :** Observation / Spatial / Puzzle
**Tranche d'age :** 3-5 ans (4-6 pieces, formes simples), 5-7 ans (9-16 pieces, rotation), 7-10 ans (25+ pieces, formes irregulieres)
**Complexite dev : 2/5 (3 jours)**
**Potentiel educatif : Moyen-eleve**

### Mecanique
1. Une scene animee (un paysage, un animal, une ville) est "brisee" en morceaux
2. L'enfant replace les morceaux pour reconstituer la scene (classique jigsaw puzzle)
3. **Le twist** : la scene est ANIMEE -- les morceaux bougent meme separes (l'oiseau bat des ailes, l'eau coule, les nuages bougent)
4. Quand un morceau est bien place, il s'integre a l'animation globale -- la scene "prend vie" progressivement
5. Pieces aimantees qui snappent quand elles sont proches de la bonne position

### Ce que l'enfant apprend
- Raisonnement spatial et perception visuelle
- Attention aux details (utiliser le mouvement comme indice)
- Patience et perseverance
- Decomposition/recomposition d'image

### Ce qui le rend original
- **Le fait que la scene soit ANIMEE change completement l'experience** d'un puzzle classique
- Le mouvement est un INDICE supplementaire (l'eau coule vers le bas, l'oiseau est en haut) -- aide les plus jeunes
- **Reveler une scene vivante** est infiniment plus satisfaisant qu'une image statique
- **Theme Periplo** : chaque puzzle = une scene vivante d'un lieu du monde (marche flottant de Bangkok, carnaval de Rio, aurore boreale en Norvege)
- **Mode "Decouverte"** : une fois le puzzle fini, la scene s'anime en plein ecran avec des elements interactifs a toucher

### Reference
- Inspire par les puzzles classiques + l'innovation de *Piece by Piece* (Steam) + les scenes animees de *Hidden Folks*

---

## Matrice de priorite complete

### Par complexite de dev (effort minimal -> maximal)

| Complexite | Jeux | Jours estimes |
|------------|------|---------------|
| **1/5** | Whack/Reflexes (#12) | 2 jours |
| **2/5** | Origami (#1), Laser (#2), Domino (#3), Mosaique (#4), Globe (#9), Trace (#11), Poids/Mesure (#13), Fractions (#14), Timeline (#15), Pixel Art (#16), Potions (#17), Jigsaw Anime (#18) | 3-4 jours |
| **3/5** | Meteo (#5), Circuits (#6), Jardin (#7), Maestro/Music (#8), Architect/Ponts (#10) | 4-6 jours |

### Par valeur educative (impact d'apprentissage)

| Impact | Jeux | Competences cle |
|--------|------|-----------------|
| **Tres eleve** | Laser (#2), Circuits (#6), Globe (#9), Architect (#10), Poids (#13), Fractions (#14), Timeline (#15), Potions (#17) | STEM, geographie, maths, logique scientifique |
| **Eleve** | Origami (#1), Domino (#3), Meteo (#5), Jardin (#7), Maestro (#8), Trace (#11) | Spatial, sciences, motricite, creativite |
| **Moyen-eleve** | Mosaique (#4), Pixel Art (#16), Jigsaw Anime (#18) | Art + maths, perception visuelle |
| **Moyen** | Whack (#12) | Reflexes, coordination, discrimination rapide |

### Par potentiel d'engagement (retention / game loop)

| Engagement | Jeux | Pourquoi |
|------------|------|----------|
| **Tres addictif** | Whack (#12), Domino (#3), Globe (#9), Pixel Art (#16) | Game loop court, "encore un !", collecte |
| **Addictif** | Origami (#1), Laser (#2), Fractions (#14), Potions (#17), Jigsaw Anime (#18) | Satisfaction progressive, defi calibre |
| **Engageant** | Mosaique (#4), Meteo (#5), Circuits (#6), Maestro (#8), Architect (#10), Trace (#11), Poids (#13), Timeline (#15) | Exploration, creation, decouverte |
| **Retention longue** | Jardin (#7) | Retour quotidien (croissance des plantes) |

---

## Croisement thematique -- L'univers Periplo enrichi

| Theme voyage | Jeux concernes | Exemples concrets |
|-------------|----------------|-------------------|
| **Monuments** | Laser (#2), Architect (#10), Circuits (#6) | Allumer le phare d'Alexandrie, construire Tower Bridge, illuminer la Tour Eiffel |
| **Nature/Biomes** | Meteo (#5), Jardin (#7), Jigsaw Anime (#18) | Climat tropical, baobab d'Afrique, aurore boreale de Norvege |
| **Art & Culture** | Mosaique (#4), Origami (#1), Pixel Art (#16) | Zellige marocain, grue japonaise, drapeaux du monde |
| **Gastronomie** | Fractions (#14), Potions (#17) | Pizza italienne, the chinois, epices indiennes |
| **Histoire** | Timeline (#15), Globe (#9) | Epoques, grandes decouvertes, civilisations |
| **Ecritures** | Trace (#11) | Alphabets arabe, grec, kanji, cyrillique |
| **Musiques** | Maestro (#8) | Kalimba, koto, steel drum, balafon |

---

## Strategie de lancement recommandee -- Batch 2

### Sprint A (Semaine 1) -- Quick wins a fort impact
1. **Periplo Whack** (2 jours) -- arcade fun, change le rythme, ultra-rapide a dev
2. **Periplo Domino** (3 jours) -- satisfaction physique, game loop addictif

> Resultat : 2 jeux, 5 jours, diversification du portfolio (arcade + construction)

### Sprint B (Semaine 2) -- STEM flagship
3. **Periplo Laser** (3 jours) -- flagship STEM, visuellement spectaculaire
4. **Periplo Fractions** (3 jours) -- besoin educatif massif, manipulation intuitive

> Resultat : 4 jeux, marqueur STEM fort pour le marketing

### Sprint C (Semaine 3) -- Identite Periplo
5. **Periplo Globe** (3 jours) -- coeur de marque, voyage, collecte de pays
6. **Periplo Origami** (3 jours) -- mecanique unique, differenciateur concurrentiel

> Resultat : 6 jeux, identite "voyage" renforcee

### Sprint D+ -- Enrichissement continu
7-18. Deployer les concepts restants en fonction des metriques de retention et feedback parents

---

## Architecture technique suggeree (ajout aux modules existants)

```
/src
  /games
    /origami           -- Paper fold simulation (Reanimated 3 + Skia)
    /laser             -- Ray tracing 2D + mirror placement (Skia canvas)
    /domino            -- Physics chain (Reanimated spring + layout grid)
    /mosaic            -- Tile snap grid + palette (Gesture Handler)
    /weather           -- Parameter sliders + scene renderer (Reanimated)
    /circuits          -- Wire drag & drop + circuit solver (graph logic)
    /garden            -- Growth timer + state machine (AsyncStorage persistence)
    /music-composer    -- Grid sequencer + audio playback (expo-av)
    /globe             -- Interactive globe/map + quiz engine
    /architect         -- 2D physics bridge builder (Skia + simple physics)
    /tracing           -- Path drawing + accuracy scoring (Skia + PanGesture)
    /whack             -- Spawn timer + tap detection (simple state)
    /measurement       -- Comparison UI + estimation slider
    /fractions         -- Cut gesture + partition logic (Skia paths)
    /timeline          -- Drag & drop sortable list (Reanimated layout)
    /pixel-art         -- Grid canvas + color palette + frame animation
    /potions           -- Combination matrix + deduction tracker
    /jigsaw-animated   -- Animated piece puzzle (Reanimated shared values)
```

### Nouvelles libs potentielles
- `react-native-skia` -- indispensable pour Laser (ray tracing), Origami (pliage), Tracing (dessin), Pixel Art (grille), Fractions (decoupe)
- `expo-av` -- Music Composer (playback multi-piste)
- `react-native-maps` ou globe SVG custom -- Globe (carte interactive)
- `AsyncStorage` / `expo-secure-store` -- Jardin (persistence etat plantes entre sessions)

---

## Recapitulatif des 18 concepts

| # | Nom | Type | Age | Dev | Educatif | Original |
|---|-----|------|-----|-----|----------|----------|
| 1 | **Periplo Origami** | Pliage/Spatial | 5-10 | 2/5 | Tres eleve | Seul jeu de pliage interactif pour enfants |
| 2 | **Periplo Laser** | Optique/Reflexion | 5-10 | 2/5 | Tres eleve | STEM spectaculaire, inexistant pour enfants |
| 3 | **Periplo Domino** | Chaine/Physique | 3-7 | 2/5 | Eleve | Satisfaction universelle de la cascade |
| 4 | **Periplo Mosaique** | Tessellation/Art | 3-10 | 2/5 | Tres eleve | Fusion art + maths, mosaiques du monde |
| 5 | **Periplo Meteo** | Sciences/Simulation | 3-7 | 3/5 | Tres eleve | Sandbox meteo avec cycle de l'eau |
| 6 | **Periplo Circuits** | Electricite/Logique | 5-10 | 3/5 | Tres eleve | Simulateur de circuits, pas un quiz |
| 7 | **Periplo Jardin** | Botanique/Patience | 3-10 | 3/5 | Eleve | Retention naturelle, retour quotidien |
| 8 | **Periplo Maestro** | Musique/Composition | 3-10 | 3/5 | Eleve | COMPOSE sa musique (=/= reproduire) |
| 9 | **Periplo Globe** | Geographie/Culture | 5-10 | 2/5 | Tres eleve | GeoGuessr pour enfants, coeur de marque |
| 10 | **Periplo Architect** | Ingenierie/Ponts | 5-10 | 3/5 | Tres eleve | Construction horizontale + simulation crash |
| 11 | **Periplo Trace** | Pre-ecriture/Motricite | 3-7 | 2/5 | Eleve | Lettres qui prennent vie, alphabets du monde |
| 12 | **Periplo Whack** | Arcade/Reflexes | 3-10 | 1/5 | Moyen | Seul jeu arcade, regle educative modulable |
| 13 | **Periplo Poids** | Estimation/Mesure | 5-10 | 2/5 | Tres eleve | Mesure (=/= balance), ordres de grandeur |
| 14 | **Periplo Fractions** | Maths/Fractions | 5-10 | 2/5 | Tres eleve | Decoupe tactile, gastronomie du monde |
| 15 | **Periplo Timeline** | Chronologie/Histoire | 5-10 | 2/5 | Tres eleve | Seul timeline interactif pour enfants |
| 16 | **Periplo Pixel** | Art/Grilles/Code | 5-10 | 2/5 | Moyen-eleve | Creation + animation GIF, tendance pixel |
| 17 | **Periplo Potions** | Deduction/Experience | 5-10 | 2/5 | Tres eleve | Logique deductive (=/= melange couleurs) |
| 18 | **Periplo Tangram Vivant** | Jigsaw/Anime | 3-10 | 2/5 | Moyen-eleve | Puzzle dont la scene est ANIMEE |

---

## Sources

- [25 Best Puzzle Games for Kids 2026 - Our Little Joys](https://ourlittlejoys.com/blog/25-best-puzzle-games-for-kids-in-2026/)
- [Top 6 Educational Games for Kids 2026 - The World Game](https://playworldgame.com/en-us/blogs/news/top-educational-games-for-kids-6)
- [Top 10 Educational Mobile Games 2026 - MARSMATICS](https://marsmatics.com/top-10-educational-mobile-games-in-2025/)
- [Pok Pok - Montessori Preschool App](https://playpokpok.com/)
- [Best Educational Apps for Kids 2026 - KidsAI](https://kidsai.app/blog/best-educational-apps-2026)
- [7 Best Kids Building Games 2026 - Space Ranger Fred](https://www.spacerangerfred.com/2026/02/03/kids-building-games/)
- [STEM Apps for Higher-Order Thinking - Common Sense](https://www.commonsense.org/education/lists/stem-apps-for-higher-order-thinking)
- [GeoGuessr](https://www.geoguessr.com/)
- [Planet Geo - App Store](https://apps.apple.com/us/app/planet-geo-fun-games-of-world-geography-for-kids/id640546476)
- [Paper - A Game of Folding - Steam](https://store.steampowered.com/app/1162370/Paper__A_Game_of_Folding/)
- [Foldology Origami Puzzles](https://foldologypuzzle.com/)
- [Lazors - App Store](https://apps.apple.com/us/app/lazors/id386458926)
- [COKOGAMES Laser Maker](https://www.cokogames.com/light-reflection-game/)
- [Rube Works: Rube Goldberg Game - App Store](https://apps.apple.com/us/app/rube-works-rube-goldberg-game/id716238013)
- [Chrome Music Lab](https://musiclab.chromeexperiments.com/)
- [MarcoPolo Weather - App Store](https://apps.apple.com/us/app/marcopolo-weather/id905425870)
- [Legends of Learning: Circuits](https://app.legendsoflearning.com/assignments/a0fb8590/electric-and-magnetic-forces)
- [Grow Garden: Kids Games - App Store](https://apps.apple.com/us/app/grow-garden-kids-games/id773896387)
- [ABC Kids - Tracing & Phonics - App Store](https://apps.apple.com/us/app/abc-kids-tracing-phonics/id1112482869)
- [Tessellation Activities for Kids - Teaching Expertise](https://www.teachingexpertise.com/classroom-ideas/tessellation-activity/)
- [Games About Weather - Space Ranger Fred](https://www.spacerangerfred.com/2026/01/26/games-about-weather/)
- [Building Beats Toolbox 2026](https://buildingbeats.org/toolbox)
- [Best Educational Games for Kids 2026 - MasrawySat](https://www.masrawysat111.com/2026/02/best-educational-games-for-kids-in-2026.html)
- [Strategy Games for Kids - Keiki](https://keiki.app/blog/strategy-games-kids-development)
- [Kiddopia - Educational Games App](https://kiddopia.com/)
