# PERIPLO -- Game Design Best Practices pour Jeux Educatifs Enfants

> Recherche approfondie du 2026-04-10 | 37 concepts de jeux | Stack : React Native Expo + TypeScript
> Cible : enfants 3-10 ans (3 tranches : 3-5, 5-7, 7-10)
> Premier jeu lance : Traffic (sliding block puzzle)
> Sources : recherches academiques, standards industrie, etudes UX, psychologie du developpement

---

## Table des matieres

1. [Les 10 Principes Fondamentaux de Game Design pour Enfants](#1-les-10-principes-fondamentaux)
2. [Systeme de Recompenses Optimal](#2-systeme-de-recompenses-optimal)
3. [Sound Design : Les Sons qui Marchent](#3-sound-design)
4. [Onboarding Sans Texte](#4-onboarding-sans-texte)
5. [Systeme de Progression](#5-systeme-de-progression)
6. [Accessibilite et Inclusion](#6-accessibilite-et-inclusion)
7. [Couleurs et Design Visuel](#7-couleurs-et-design-visuel)
8. [Attention et Duree de Session](#8-attention-et-duree-de-session)
9. [Feedback Haptique](#9-feedback-haptique)
10. [Conformite Legale (COPPA/GDPR)](#10-conformite-legale)
11. [Retention et Engagement](#11-retention-et-engagement)
12. [Recommandations Specifiques pour PERIPLO](#12-recommandations-specifiques-periplo)

---

## 1. Les 10 Principes Fondamentaux

### Principe 1 -- Zone of Proximal Flow

**Le principe le plus important de tous.** Il s'agit de la fusion de deux theories fondamentales :

- **Zone of Proximal Development (Vygotsky)** : la zone entre ce que l'enfant sait faire seul et ce qu'il ne peut pas encore faire. C'est dans cette zone que l'apprentissage se produit.
- **Flow State (Csikszentmihalyi)** : l'etat de concentration totale ou l'enfant est completement absorbe, quand le defi est parfaitement calibre entre ennui (trop facile) et frustration (trop dur).

> **Regle d'or** : Le jeu doit constamment maintenir l'enfant dans le "canal de flow" -- la difficulte augmente graduellement avec les competences. Si l'enfant echoue 3 fois de suite, le jeu simplifie. S'il reussit sans effort, le jeu complexifie.

**Implementation pour PERIPLO** :
- Tracker le taux de reussite par niveau (cible : 70-80% de reussite)
- Si taux < 50% sur 3 tentatives : proposer un indice, simplifier le niveau suivant
- Si taux = 100% sur 3 niveaux : sauter un palier de difficulte
- Ne JAMAIS afficher "Tu as perdu" -- reformuler en "Essaie encore !" ou "Presque !"

### Principe 2 -- Design par Tranche d'Age (Jamais "Enfants" en Bloc)

**La plus grosse erreur est de traiter "les enfants" comme un seul groupe.** La difference entre un enfant de 4 ans et un de 6 ans est immense -- les recherches montrent que les enfants reagissent negativement a du contenu concu pour un niveau scolaire au-dessus ou en-dessous du leur.

| Tranche | Motricite | Cognition | UI adaptee |
|---------|-----------|-----------|------------|
| **3-5 ans** | Gestes imprecis, tap large, pas de drag fin | Pre-logique, pensee magique, egocentrique | Boutons 80x80px min, pas de texte, voix + sons, max 3 choix |
| **5-7 ans** | Drag basique, swipe, debut de precision | Logique concrete, debut classification, lit quelques mots | Boutons 60x60px, icones + mots courts, 4-5 choix max |
| **7-10 ans** | Precision fine, double-tap, gestes complexes | Logique abstraite, strategies, lit couramment | Interface plus riche, texte possible, 6+ choix, timer optionnel |

**Implementation pour PERIPLO** :
- Selection de la tranche d'age au premier lancement (par le parent)
- Adaptation automatique : taille des elements, complexite, nombre de choix, presence de texte
- Possibilite de changer de tranche a tout moment dans les parametres parentaux

### Principe 3 -- Zero Etat d'Echec (No Fail State)

La philosophie pionniere de Toca Boca et Sago Mini repose sur un principe radical : **il n'y a pas de facon de "perdre"**. Les enfants jouent librement, explorent, et toute action mene a une decouverte.

> Sago Mini croit que "le rire aide les enfants a apprendre, que les activites ouvertes ouvrent des portes, et que les meilleures choses dans la vie commencent par le jeu."

**Adaptation pour PERIPLO (jeux a objectif)** :
- Distinguer les jeux "bac a sable" (Labo Couleurs, mode libre du Code) des jeux "puzzle" (Traffic, Memory, Patterns)
- Pour les puzzles : **echec temporaire, jamais definitif**. L'enfant peut toujours reessayer, avec des indices progressifs
- Jamais de game over, jamais de vies limitees, jamais de compteur d'erreurs visible
- Feedback d'erreur = encouragement anime ("Hmm, pas celui-la ! Continue !")
- Feedback de reussite = celebration disproportionnee (confettis, sons joyeux, personnage qui danse)

### Principe 4 -- Feedback Immediat et Multi-Sensoriel

Les enfants ont besoin de feedback **instantane** (< 200ms) a chaque action. Le feedback doit etre **multi-canal** pour etre compris sans lire :

| Canal | Bonne reponse | Mauvaise reponse |
|-------|--------------|-----------------|
| **Visuel** | Confettis, etoiles, flash vert, personnage content | Leger tremblement, flash orange doux, personnage pensif |
| **Sonore** | Ding joyeux, accord majeur, "Bravo !" voix | Boing doux, note descendante douce, "Hmm" |
| **Haptique** | Vibration courte celebratoire | Vibration legere et rapide |
| **Animation** | Element qui grandit, rebondit, explose en particules | Element qui revient doucement a sa position |

> **Principe cle** : L'asymetrie celebratoire. La reussite doit etre 3x plus spectaculaire que l'echec. L'echec doit etre discret, temporaire, jamais punitif.

**Implementation technique** :
```typescript
// Feedback multi-sensoriel unifie
const celebrateSuccess = async () => {
  await Promise.all([
    playSound('success_chime'),        // expo-av
    triggerHaptic('success'),           // expo-haptics
    animateConfetti(),                  // react-native-reanimated
    showStarBurst(position),           // particules
  ]);
};

const gentleFailure = async () => {
  await Promise.all([
    playSound('soft_boing'),
    triggerHaptic('light'),
    animateShake(element, { amplitude: 4 }),
  ]);
};
```

### Principe 5 -- Interactions Tactiles Adaptees

Les enfants n'utilisent pas un ecran comme les adultes. Les recherches montrent :

- **Tirer est plus facile que pousser** (drag de gauche a droite est naturel pour les droitiers)
- **Le tap est le geste le plus fiable** pour les 3-5 ans
- **Le drag-and-drop est maitrse vers 5-6 ans** mais necessite des zones d'aimantation (snap) generiques
- **Le swipe est maitrise vers 6-7 ans**
- **Le pinch-to-zoom et la rotation sont difficiles** avant 8-9 ans
- Les tablettes sont preferables aux telephones pour les moins de 10 ans (ecran plus grand = motricite moins penalisante)

**Regles d'implementation** :
- Zones de tap : minimum 44x44pt (Apple HIG), idealement 60x60pt pour 3-5 ans, 80x80pt pour le coeur d'action
- Zones de drop : generiques, avec aimantation forte (snap radius = 30-40pt)
- Temps de maintien pour drag : au moins 300ms avant de considerer un drag (eviter les faux positifs)
- Pas de gestes a deux doigts pour les 3-7 ans
- Pas de double-tap pour les 3-5 ans
- Pas de long-press cache pour les fonctions essentielles

### Principe 6 -- Apprentissage Actif par la Pratique (Learning by Doing)

La recherche academique est unanime : l'apprentissage actif surpasse l'apprentissage passif de facon massive.

> Avec le jeu, il faut **10 a 20 repetitions** pour apprendre quelque chose, contre **400 repetitions** sans gamification.

**Principes d'implementation** :
- Chaque concept est decouvert par l'experimentation, jamais par l'explication prealable
- L'enfant agit AVANT de comprendre la regle -- la comprehension emerge de l'action
- Les erreurs sont des opportunites d'apprentissage, pas des punitions
- Le jeu ne dit jamais "maintenant tu vas apprendre les fractions" -- il dit "aide le cuisinier a partager le gateau !"
- L'objectif educatif est invisible pour l'enfant, visible pour le parent

### Principe 7 -- Sessions Courtes et Game Loop Rapide

Les donnees sur la capacite d'attention des enfants sont claires :

| Age | Attention soutenue | Session de jeu recommandee | Game loop ideal |
|-----|-------------------|---------------------------|-----------------|
| 3-5 ans | 5-8 minutes | 5-10 minutes max | 30-60 secondes par niveau |
| 5-7 ans | 10-15 minutes | 10-20 minutes | 1-2 minutes par niveau |
| 7-10 ans | 20-30 minutes | 15-25 minutes | 2-5 minutes par niveau |

> En tests de performance continue (CPT), les enfants montrent une attention moyenne de 29.6 secondes avec un decline de 27% au cours de la session.

**Implementation pour PERIPLO** :
- **Timer parental** : limite de session configurable (15, 30, 45 min)
- **Points de sortie naturels** : apres chaque niveau, encourager la pause ("Super ! Tu veux continuer ou faire une pause ?")
- **Sauvegarde automatique** : l'enfant peut quitter a tout moment et reprendre exactement ou il en etait
- **Pas de mecaniques de retention agressive** : pas de "daily streaks" pour les 3-5 ans, pas de FOMO, pas de contenu temporaire

### Principe 8 -- Personnage-Guide et Connexion Emotionnelle

Les enfants forment naturellement des connexions emotionnelles avec les personnages. Un mascot bien concu :

- Cree un lien affectif qui motive le retour
- Sert de guide non-textuel (ses expressions montrent si l'enfant est sur la bonne voie)
- Humanise le feedback (c'est le personnage qui est content, pas le systeme)

**Design du mascot** :
- **Formes rondes et douces** pour les jeunes enfants (3-7 ans) -- inspires de Mickey, Paw Patrol, Peppa Pig
- **Formes legerement plus angulaires** pour les plus grands (7-10 ans)
- **Couleurs vives et positives** : le personnage rayonne d'energie
- **Expressions exagerees** : joie immense, curiosite, surprise, encouragement -- jamais de colere ni de tristesse prolongee
- **Animations corporelles dynamiques** : body language lisible sans texte

**Pour PERIPLO** : Le petit explorateur Periplo (deja evoque dans les concepts) doit etre le fil conducteur de TOUS les jeux. Il voyage, decouvre, reagit, celebre. C'est lui qui donne l'unitaire emotionnelle au catalogue de 37 jeux.

### Principe 9 -- Scaffolding Progressif et Adaptatif

Le scaffolding (etayage) est la technique pedagogique ou le soutien est maximal au debut puis se retire progressivement a mesure que l'enfant maitrise le concept :

1. **Decouverte guidee** : le jeu montre exactement quoi faire (animation demo)
2. **Pratique assistee** : l'enfant fait, mais avec des indices visuels (zones surbrillantes, fleches)
3. **Pratique autonome** : les indices disparaissent progressivement
4. **Maitrise** : l'enfant joue seul, les contraintes augmentent (timer, moins de tentatives)
5. **Defi** : l'enfant optimise (moins de coups, plus rapide, score maximal)

> La recherche confirme que les jeux a difficulte adaptative produisent des **resultats d'apprentissage significativement superieurs**. Le scaffolding a un effet significatif sur la performance d'apprentissage ET l'engagement.

**Implementation technique** :
```typescript
// Systeme de scaffolding adaptatif
interface ScaffoldingLevel {
  showDemo: boolean;           // Niveau 1 : demo animee
  highlightTargets: boolean;   // Niveau 2 : zones surbrillantes
  showHints: boolean;          // Niveau 3 : indices disponibles
  hintDelay: number;           // Delai avant suggestion d'indice (ms)
  autoSimplify: boolean;       // Simplifier apres N echecs
}

const getScaffoldingForPlayer = (
  successRate: number,
  attemptsOnLevel: number,
  ageGroup: '3-5' | '5-7' | '7-10'
): ScaffoldingLevel => {
  if (attemptsOnLevel === 0) return { showDemo: true, ... };
  if (successRate < 0.5) return { highlightTargets: true, showHints: true, ... };
  if (successRate > 0.9) return { showDemo: false, highlightTargets: false, ... };
  // ...
};
```

### Principe 10 -- Monetisation Ethique et Confiance Parentale

> "Monetiser une app pour enfants, c'est facile. Le faire ethiquement, c'est ce qui est difficile." -- Animal Jam

**Les interdits absolus** :
- Jamais de niveau mathematiquement impossible sans achat
- Jamais de pub avant 6 ans
- Jamais de dark patterns (faux boutons de fermeture, compteurs d'urgence)
- Jamais de mecaniques de casino (lootboxes, roues de la fortune aleatoires)
- Jamais de collecte de donnees personnelles sans consentement parental explicite
- Jamais de chat ou d'interaction sociale non moderee

**Le modele recommande pour PERIPLO** :
- **Freemium ethique** : 3-5 jeux complets gratuits (incluant Traffic), le reste debloquable
- **Abonnement familial** : ~$4.99/mois ou ~$39.99/an pour tout debloquer
- **Trial 7 jours** : acces complet, la valeur doit etre demontree immediatement (55% des annulations de trial 3 jours se font au Jour 0)
- **Zone parentale verrouillee** : tous les achats et parametres derriere un "parental gate" (calcul simple que l'enfant ne peut pas resoudre)
- **Zero pub dans la version payante**, rewarded ads optionnelles en version gratuite (pour les 7+ uniquement, et seulement pour du contenu bonus non-essentiel)

---

## 2. Systeme de Recompenses Optimal

### 2.1 Le Probleme des Recompenses Extrinsiques

La recherche en psychologie est nuancee sur les recompenses :

> Dans une etude de 2024, les enfants a qui on n'avait promis **aucune recompense** pour dessiner etaient **plus engages et creatifs** que ceux a qui on avait promis un prix. Les recompenses extrinsiques peuvent miner la motivation intrinseque.

**Le paradoxe** : les recompenses fonctionnent pour engager initialement, mais peuvent diminuer la motivation a long terme si elles deviennent l'objectif principal.

### 2.2 Le Systeme a 3 Couches de PERIPLO

**Couche 1 -- Micro-Recompenses Immediates (Dopamine)**

Ce sont les feedbacks qui arrivent a chaque bonne action. Leur role est de renforcer le comportement positif :
- Particules/confettis a chaque bonne reponse
- Son celebratoire (accord majeur, "ding" joyeux)
- Element qui s'illumine, grandit, rebondit
- Le personnage Periplo qui applaudit, saute de joie

> Cle : ces recompenses doivent etre **variees** pour eviter l'habituation. Alterner entre confettis, etoiles, explosions de couleur, animations differentes.

**Couche 2 -- Etoiles de Niveau (Accomplissement)**

Systeme de 1 a 3 etoiles par niveau, inspire de la recherche sur les "incentive systems" :

| Etoiles | Critere | Objectif psychologique |
|---------|---------|----------------------|
| 1 etoile | Terminer le niveau | Sentiment d'accomplissement, progresser |
| 2 etoiles | Terminer efficacement (peu d'erreurs) | Defi de maitrise |
| 3 etoiles | Terminer optimalement (minimal moves, temps, sans indice) | Perfectionnisme sain, rejouabilite |

**Important** : 1 etoile = reussite complete. L'enfant ne doit JAMAIS sentir que 1 etoile est un echec. C'est un succes. Les etoiles supplementaires sont des bonus pour ceux qui veulent se depasser.

**Couche 3 -- Collection et Progression (Engagement Long Terme)**

C'est la couche qui genere la retention sans dark patterns :
- **Album du Voyageur** : chaque jeu termine debloque une "carte postale" ou un "souvenir" du pays visite
- **Carte du Monde** : progression geographique visible -- l'enfant "visite" de nouveaux pays en completant des jeux
- **Collection d'animaux/objets** : les paires de Memory, les origamis, les couleurs decouvertes s'ajoutent a un carnet
- **Badges de competence** : "Petit Matheux" (10 jeux de maths), "Explorateur Curieux" (visite 5 pays), "Artiste en Herbe" (tous les jeux creatifs)

### 2.3 Ce qu'il Faut Eviter

| A eviter | Pourquoi | Alternative |
|----------|----------|-------------|
| Classements/leaderboards competeritfs | Anxiete, comparaison sociale nefaste chez les jeunes | Classement personnel ("ton record : 15 !") |
| Recompenses aleatoires (lootboxes) | Mecanique de casino, contraire a l'ethique | Recompenses previsibles et meritees |
| Monnaie virtuelle | Confusion valeur reelle, dark pattern | Etoiles/badges non-echangeables |
| Streak daily obligatoire | FOMO, culpabilite, pression | Encouragement doux ("Ca fait longtemps ! Content de te revoir !") |
| Recompenses qui necessitent des achats | Frustration, inegalite | Tout est deblocable par le jeu |
| Punitions visibles (vies perdues, points enleves) | Demotivation, anxiete | Feedback constructif, encouragement |

---

## 3. Sound Design

### 3.1 Principes Fondamentaux pour les Jeux Enfants

Le sound design est le canal de feedback le plus immediat et le plus emotionnel. Les recherches de Freshmade Music identifient des regles specifiques :

**Regle 1 -- Tonalite Majeure pour les Jeunes**

> Pour les jeux ciblent les K-2 et moins, garder la musique en tonalites majeures. Seul un petit pourcentage de la musique creee pour les jeux de jeunes enfants est en mineur.

- 3-5 ans : **100% majeur**, tempo modere (100-120 BPM), melodique et repetitif
- 5-7 ans : **90% majeur**, introduction de quelques passages mineurs pour le suspense/mystere
- 7-10 ans : **Mix majeur/mineur**, plus de variete tonale, tempos varies selon le contexte

**Regle 2 -- Ne Pas "Babifier" le Son**

> Les enfants peuvent gerer de la musique et de l'audio sophistiques. Pour les jeux prescolaires, les enfants ne veulent pas que la musique sonne "trop jeune". Pour les jeux elementaires (K-2), les enfants ne veulent pas que les jeux sonnent "trop bebe".

- La musique doit etre de qualite professionnelle, pas MIDI cheap
- Utiliser de vrais instruments (ou des samples de haute qualite)
- Le mixage doit etre propre et equilibre

**Regle 3 -- Aligner l'Audio avec le Game Design**

La complexite musicale doit suivre la complexite du gameplay :
- Niveaux simples : melodie simple, peu d'instruments
- Niveaux complexes : couches supplementaires, rythme plus soutenu
- Boss/defi : musique plus intense, tempo accelere

### 3.2 Palette Sonore Recommandee pour PERIPLO

| Contexte | Type de son | Instruments/Style |
|----------|------------|-------------------|
| **Menu / Hub** | Musique douce, accueillante | Ukulele, glockenspiel, marimba, cordes pizzicato |
| **Niveau facile** | Melodie legere, ludique | Xylophone, flute, piano doux, percussions legeres |
| **Niveau moyen** | Plus rythme, energique | Guitare acoustique, percussions, sifflement |
| **Niveau difficile** | Dynamique, engageant | Ensemble plus riche, tempo plus eleve |
| **Bonne reponse** | Son court, joyeux, satisfaisant | Accord majeur ascendant (Do-Mi-Sol), chime, "ding" |
| **Mauvaise reponse** | Son court, neutre, non-punitif | Boing doux, note unique descendante (pas de buzzer) |
| **Niveau complete** | Fanfare courte (2-3 sec) | Trompettes joyeuses, explosion de confettis sonore |
| **Nouvelle etoile** | Son distinctif, memorable | Sparkle + accord celeste |
| **Deblocage (carte, pays)** | Son magique, decouverte | Harpe ascendante + son de "revelation" |

### 3.3 Sons du Monde (Twist PERIPLO)

L'identite voyageur de PERIPLO est une opportunite unique pour le sound design :
- **Chaque pays/zone a sa propre palette sonore** : djembe africain, sitar indien, gamelan balinais, ukulele hawaien, accordeon francais
- **Les sons de feedback integrent des instruments du monde** : le "ding" de reussite est un steel drum dans la zone Caraibes, un gong dans la zone Asie
- **Musique de fond thematique** : bossa nova pour le Bresil, koto pour le Japon, balafon pour l'Afrique de l'Ouest

### 3.4 Details Techniques

```typescript
// Gestion audio avec expo-av
// Precharger tous les sons de feedback au lancement
const soundBank = {
  success: [
    require('./sounds/success_1.mp3'),
    require('./sounds/success_2.mp3'),
    require('./sounds/success_3.mp3'),  // Variation pour eviter l'habituation
  ],
  failure: [require('./sounds/soft_boing.mp3')],
  star: [require('./sounds/star_sparkle.mp3')],
  complete: [require('./sounds/level_complete.mp3')],
  unlock: [require('./sounds/unlock_magic.mp3')],
  tap: [require('./sounds/tap_soft.mp3')],
  drag: [require('./sounds/drag_whoosh.mp3')],
  drop: [require('./sounds/drop_click.mp3')],
};

// Varier les sons de succes pour eviter l'habituation
let successIndex = 0;
const playSuccess = () => {
  const sounds = soundBank.success;
  sounds[successIndex % sounds.length].play();
  successIndex++;
};
```

**Budget sonore** : prevoir 30-50 sons de base (feedback + UI), puis 5-10 sons thematiques par "zone du monde". Les sons doivent etre courts (< 2 secondes pour le feedback, < 5 secondes pour les fanfares). Formats : AAC pour iOS, OGG pour Android, MP3 en fallback web.

---

## 4. Onboarding Sans Texte

### 4.1 Pourquoi Zero Texte

- **3-5 ans** : ne savent pas lire du tout
- **5-7 ans** : lecture debutante, lire demande un effort cognitif qui detourne de la tache
- **Multi-langue** : PERIPLO vise l'international -- un onboarding sans texte = zero cout de localisation pour la partie gameplay
- **Recherche** : les joueurs ne lisent pas les manuels -- ils preferent qu'on leur MONTRE les actions par l'animation

### 4.2 Les 5 Techniques qui Fonctionnent

**Technique 1 -- La Demo Animee (Show, Don't Tell)**

Le jeu joue un tour complet en mode "demo" pendant 3-5 secondes :
- Une main animee (semi-transparente) montre le geste exact a faire
- Le mouvement est lent, exagere, clairement visible
- La demo se joue automatiquement si l'enfant n'interagit pas pendant 5 secondes
- Apres la demo, un call-to-action visuel (fleche pulsante, element qui brille) invite l'enfant a essayer

**Technique 2 -- La Revelation Progressive (Contextual Discovery)**

Au lieu d'expliquer toutes les regles d'un coup :
1. Premier ecran : un seul element interactif, tout le reste est grise/masque
2. L'enfant touche l'element, feedback immediat, decouvre la mecanique de base
3. Deuxieme element apparait, la complexite augmente d'un cran
4. Chaque nouveau concept est introduit isolement, puis combine avec les precedents

**Technique 3 -- Les Indices Visuels Permanents**

| Indice | Usage | Exemple |
|--------|-------|---------|
| **Pulsation/glow** | "Touche-moi !" | Un element brille rythmiquement |
| **Fleche animee** | Direction du mouvement | Fleche courbe montrant un swipe |
| **Couleur surbrillante** | Zone cible du drop | La zone de destination s'illumine en vert |
| **Ombre/silhouette** | Forme attendue | La silhouette de l'objet a sa position finale |
| **Personnage qui pointe** | Attention directionelle | Periplo regarde/pointe vers l'element cle |

**Technique 4 -- L'Echec comme Tutoriel**

Le premier niveau est concu pour que l'enfant puisse echouer sans consequence :
- Le premier "mauvais" choix declenche un feedback doux + un indice plus explicite
- L'element "correct" se met a briller ou a rebondir pour attirer l'attention
- Apres 2 echecs, la demo se rejoue automatiquement
- Le premier niveau est toujours completable en < 30 secondes meme avec des erreurs

**Technique 5 -- L'Audio-Guide (Voix du Personnage)**

Complement optionnel aux visuels (desactivable) :
- Voix courte et joyeuse du personnage : "Touche le rouge !", "Glisse vers la droite !"
- Phrases de 3-4 mots maximum
- Ton encourageant, jamais directif
- Localisable facilement (phrases courtes = cout de localisation minimal)

### 4.3 Anti-Patterns d'Onboarding

| A eviter | Pourquoi | Alternative |
|----------|----------|-------------|
| Ecran de tutoriel avec du texte | L'enfant ne lit pas, il skippe | Demo animee integree au gameplay |
| Pop-ups d'instructions | Interrompent le flow, frustrantes | Indices contextuels dans le jeu |
| Tutoriel obligatoire de 30+ secondes | Trop long, perte d'attention | 5-10 secondes de demo, puis l'enfant joue |
| "Swipe to continue" pour naviguer entre ecrans de tuto | L'enfant ne comprend pas la navigation | Un seul ecran, une seule action |
| Voice-over long et explicatif | Surcharge cognitive | 3-4 mots par instruction vocale |

### 4.4 Pattern d'Onboarding Recommande pour Chaque Jeu PERIPLO

```
SEQUENCE TYPE POUR CHAQUE NOUVEAU JEU :

1. [0-3 sec] Ecran titre anime avec le personnage Periplo + le theme du jeu
2. [3-8 sec] Demo animee : une main fantome joue le premier mouvement
3. [8+ sec]  L'enfant prend le controle
   - Si rien en 5 sec → re-jouer la demo
   - Si echec → feedback doux + indice visuel renforce
   - Si reussite → celebration + niveau suivant (legerement plus complexe)
4. [Niveau 2] Nouveau concept introduit avec mini-demo de 2 sec
5. [Niveau 3+] Pas de demo, l'enfant est autonome
```

---

## 5. Systeme de Progression

### 5.1 La Courbe de Difficulte Ideale

> "Une bonne courbe de progression est invisible quand elle fonctionne, et ressemble a du grind quand elle ne fonctionne pas."

**La courbe de PERIPLO doit suivre un pattern en "dents de scie" :**

```
Difficulte
    ^
    |     /\      /\       /\
    |    /  \    /  \     /  \      /
    |   /    \  /    \   /    \    /
    |  /      \/      \ /      \  /
    | /                \/        \/
    +-----------------------------------> Temps

    Chaque "pic" = nouveau concept introduit
    Chaque "creux" = niveau de consolidation (plus facile pour reprendre confiance)
```

**Principes** :
- **Alterner tension et repos** : les humains saturent avec des stimuli similaires. Le contraste entre les deux amplifie le ressenti
- **Au moins un "level up" par session** : l'enfant doit toujours quitter le jeu en se sentant progresser
- **Le level up doit etre graphique et memorable** : animation speciale, son unique, le personnage celebre
- **Eviter les "murs de grind"** : si l'enfant bloque, proposer un chemin alternatif (autre jeu, niveau bonus plus facile)

### 5.2 Structure de Progression pour PERIPLO

**Niveau Micro -- Dans un jeu** :

```
Monde 1 (Decouverte) → 5-8 niveaux tres faciles
  → Etoile de bronze debloquee
Monde 2 (Apprentissage) → 8-10 niveaux difficulte progressive
  → Etoile d'argent debloquee
Monde 3 (Maitrise) → 10-12 niveaux stimulants
  → Etoile d'or debloquee
Monde Bonus (Defi) → Niveaux generes, infinis, pour les completionnistes
```

**Niveau Macro -- A travers les 37 jeux** :

```
CARTE DU MONDE PERIPLO
├── Europe (6 jeux) → Traffic, Taquin, Tangram, Patterns, Origami, Laser
├── Afrique (5 jeux) → Memory, Ombres, Tri, Comptage, Dominos
├── Asie (6 jeux) → Rythme, Code, Balance, Sokoban, Pipes, Formes
├── Ameriques (5 jeux) → Maze, Differences, Intrus, Couleurs, Gears
├── Oceanie (5 jeux) → Flow Connect, Water Sort, Number Bonds, Nonogram, Constellation
├── Poles (5 jeux) → Meteo, Mosaique, Mirror, Tower, Block Puzzle
└── Monde Secret (5 jeux) → Debloques quand tous les continents sont visites
```

Chaque "pays" visite = un jeu decouvert. Chaque continent complete = une recompense speciale (animation, personnage secret, theme visuel). La carte se remplit progressivement, donnant un sentiment d'accomplissement global.

### 5.3 Difficulte Adaptative (Algorithme)

```typescript
// Algorithme de difficulte adaptative
interface PlayerProfile {
  ageGroup: '3-5' | '5-7' | '7-10';
  currentLevel: number;
  recentSuccessRate: number;     // Sur les 5 derniers niveaux
  averageCompletionTime: number; // En secondes
  hintsUsed: number;             // Sur les 5 derniers niveaux
  consecutiveFailures: number;
}

const calculateNextDifficulty = (profile: PlayerProfile): DifficultyParams => {
  // Zone de flow : 70-85% de reussite
  if (profile.recentSuccessRate > 0.85 && profile.hintsUsed === 0) {
    // Trop facile → augmenter
    return {
      level: profile.currentLevel + 2,  // Sauter un niveau
      showHints: false,
      timeLimit: reducedTime,
    };
  }

  if (profile.recentSuccessRate < 0.5 || profile.consecutiveFailures >= 3) {
    // Trop dur → simplifier
    return {
      level: Math.max(1, profile.currentLevel - 1),
      showHints: true,
      timeLimit: null,  // Retirer la contrainte de temps
      gridSize: reduced, // Reduire la taille de grille si applicable
    };
  }

  // Dans la zone de flow → progression normale
  return {
    level: profile.currentLevel + 1,
    showHints: false,
    timeLimit: standardTime,
  };
};
```

### 5.4 Deblocage et Motivation

| Mecanisme | Condition | Recompense |
|-----------|-----------|------------|
| Nouveau jeu | Completer 5 niveaux du jeu precedent | Animation "nouveau pays decouvert" + apercu du jeu |
| Nouveau theme visuel | 3 etoiles sur 10 niveaux | Skin/couleur pour le personnage Periplo |
| Badge de competence | Milestones specifiques ("100 additions", "50 patterns") | Badge affiche dans le profil |
| Carte postale | Terminer un monde (tous les niveaux) | Carte postale animee du pays dans l'album |
| Personnage secret | Completer un continent entier | Nouveau compagnon de voyage pour Periplo |
| Fait amusant | Chaque niveau termine | Micro-info educative sur le pays/theme |

---

## 6. Accessibilite et Inclusion

### 6.1 Principes "Born Accessible"

> Plutot que d'ajouter l'accessibilite apres coup, le mouvement "born accessible" integre les besoins des utilisateurs de toutes capacites des le debut de la conception.

**PERIPLO doit etre concu accessible par defaut**, pas en ajout tardif. Les adaptations pour les enfants handicapes beneficient a TOUS les enfants.

### 6.2 Checklist d'Accessibilite pour PERIPLO

**Vision**

| Feature | Implementation | Priorite |
|---------|---------------|----------|
| **Mode daltonien** | Palette alternative (Deuteranopia, Protanopia, Tritanopia) + formes/icones en complement des couleurs | Haute |
| **Contraste eleve** | Mode haut contraste activable, ratio minimum 4.5:1 pour le texte, 3:1 pour les elements interactifs | Haute |
| **Taille des elements** | Deja couvert par le design enfant (grands boutons), mais option "taille XXL" | Moyenne |
| **Pas de couleur seule** | Chaque info transmise par la couleur est AUSSI transmise par une forme, une icone ou un pattern | Haute |
| **Animations reduites** | Option pour reduire/desactiver les animations (respect de `prefers-reduced-motion`) | Moyenne |

**Audition**

| Feature | Implementation | Priorite |
|---------|---------------|----------|
| **Feedback visuel pour chaque son** | Chaque son de feedback a un equivalent visuel (flash, icone, animation) | Haute |
| **Sous-titres/bulles** | Instructions vocales accompagnees de bulles avec icones | Moyenne |
| **Pas de jeu dependant uniquement du son** | Meme le jeu Rythme/Simon doit avoir un mode visuel-only | Haute |

**Motricite**

| Feature | Implementation | Priorite |
|---------|---------------|----------|
| **Zones de tap geantes** | Mode "grandes cibles" activable (100x100pt) | Haute |
| **Pas de gestes complexes requis** | Toujours un fallback en tap simple | Haute |
| **Pas de contrainte de temps** | Mode sans timer par defaut, timer = option | Haute |
| **Tolerance au tremblement** | Ignorer les micro-mouvements pendant le drag | Moyenne |
| **Switch access** | Support du controle par contacteur (iOS Switch Control, Android Switch Access) | Basse (v2) |

**Cognitive**

| Feature | Implementation | Priorite |
|---------|---------------|----------|
| **Difficulte adaptative** | Deja couvert (Principe 9) -- essentiel pour les enfants avec troubles d'apprentissage | Haute |
| **Mode simplifie** | Reduire le nombre d'elements a l'ecran, interface minimale | Moyenne |
| **Pas de surcharge sensorielle** | Option pour reduire les effets visuels/sonores simultanees | Moyenne |
| **Consistance** | Memes patterns d'interaction dans tous les jeux (coherence = previsibilite = securite) | Haute |

### 6.3 Jeux Serieux et Enfants avec Besoins Specifiques

La recherche montre que les jeux bien concus beneficient particulierement aux enfants avec ADHD et troubles du spectre autistique :

> Une intervention educative gamifiee de 8 semaines a significativement ameliore l'attention et la performance academique chez les enfants avec ADHD comparee a un programme non-gamifie.

> "Secret Agent Society" aide les enfants autistes a ameliorer significativement leurs capacites de communication sociale a travers des missions de jeu de role.

**Opportunite pour PERIPLO** : se positionner comme app inclusive, testee avec des enfants aux besoins divers, ce qui est un argument marketing puissant aupres des parents ET un differenciateur par rapport a la concurrence.

---

## 7. Couleurs et Design Visuel

### 7.1 Psychologie des Couleurs pour les Enfants

| Couleur | Effet psychologique | Usage dans PERIPLO |
|---------|--------------------|--------------------|
| **Bleu** | Calme, confiance, securite | Fond de menu, zones de repos, eau |
| **Jaune** | Joie, optimisme, energie | Etoiles, recompenses, elements de celebration |
| **Vert** | Succes, nature, croissance | Validation ("correct"), nature, exploration |
| **Rouge** | Attention, energie, urgence | Alerte douce (pas de "erreur" agressive), elements d'action |
| **Orange** | Enthousiasme, creativite, amusement | CTA principaux, elements ludiques, defi |
| **Violet** | Magie, imagination, decouverte | Deblocages, elements mystere, bonus |
| **Rose** | Douceur, affection, jeu | Elements creatifs, personnalisation |

### 7.2 Regles de Palette pour Jeux Enfants

**Regle 1 -- Couleurs vives et saturees** (saturation 70-100%)
- Les enfants sont attires par les couleurs vives. Eviter les pastels trop fades pour les elements interactifs
- Les fonds peuvent etre plus doux (saturation 30-50%) pour ne pas fatiguer les yeux

**Regle 2 -- Contraste fort entre fond et elements interactifs**
- L'element touchable doit "sortir" visuellement du fond
- Utiliser des ombres portees ou des contours pour separer les couches visuelles

**Regle 3 -- Maximum 4-5 couleurs dominantes par ecran**
- Trop de couleurs = chaos visuel = surcharge cognitive
- Une couleur dominante (60%), une secondaire (30%), une d'accentuation (10%)

**Regle 4 -- La couleur ne doit JAMAIS etre le seul vecteur d'information**
- Toujours doubler avec une forme, un icone, un pattern ou une position
- Critique pour l'accessibilite (daltonisme touche ~8% des garcons)

**Regle 5 -- Coherence chromatique a travers tous les jeux**
- Le vert = succes PARTOUT
- L'orange doux = "essaie encore" PARTOUT
- Le jaune = etoile/recompense PARTOUT
- Creer un design system avec des tokens de couleur nommes

### 7.3 Palette de Couleurs Recommandee pour PERIPLO

```
COULEURS PRIMAIRES PERIPLO
├── Bleu Ciel     #4ECDC4  → Fond, navigation, eau
├── Orange Soleil  #FF6B35  → CTA, boutons principaux, action
├── Jaune Etoile   #FFD23F  → Recompenses, etoiles, celebration
├── Vert Foret     #44AF69  → Succes, validation, nature
└── Violet Magie   #8B5CF6  → Deblocage, mystere, bonus

COULEURS SECONDAIRES
├── Rose Doux      #FF8FAB  → Elements creatifs, personnalisation
├── Bleu Nuit      #1A365D  → Texte, headers, contraste
├── Gris Doux      #E2E8F0  → Fonds de carte, elements desactives
├── Blanc          #FFFFFF  → Fond principal, cartes
└── Creme          #FFF8E7  → Fond alternatif chaud

FEEDBACK
├── Succes         #22C55E  → Flash vert validation
├── Erreur douce   #FB923C  → Flash orange encouragement (JAMAIS rouge)
├── Indice         #60A5FA  → Bleu clair surbrillant
└── Nouveau        #A78BFA  → Violet pulsant "nouveau contenu"
```

---

## 8. Attention et Duree de Session

### 8.1 Donnees Cles

| Metrique | 3-5 ans | 5-7 ans | 7-10 ans |
|----------|---------|---------|----------|
| Attention soutenue | 5-8 min | 10-15 min | 20-30 min |
| Session de jeu recommandee | 5-10 min | 10-20 min | 15-25 min |
| Game loop par niveau | 30-60 sec | 1-2 min | 2-5 min |
| Nombre de niveaux par session | 5-8 | 8-12 | 5-10 |
| Delai avant perte d'interet | 3-5 sec d'inactivite | 5-8 sec | 10+ sec |

### 8.2 Strategies Anti-Decrochage

**Pour les 3-5 ans** :
- Chaque interaction produit un resultat visible (meme un tap "random" fait quelque chose d'amusant)
- Animations constantes en arriere-plan (elements qui bougent, clignotent doucement)
- Transition entre niveaux = 0 seconde de chargement visible
- Si inactif > 5 sec : le personnage attire l'attention (animation, son)

**Pour les 5-7 ans** :
- Introduire des mini-objectifs dans le niveau ("trouve 3 paires pour gagner !")
- Compteur de progres visible (barre de progression, etoiles qui se remplissent)
- Variete : alterner les types d'interactions (tap, drag, choix) meme dans un seul jeu

**Pour les 7-10 ans** :
- Defis optionnels qui ajoutent de la profondeur ("finis en moins de 10 coups !")
- Mode chrono pour ceux qui aiment la pression
- Statistiques de performance ("tu t'ameliores ! 20% plus rapide qu'hier")

### 8.3 Timer Parental et Bien-Etre Digital

PERIPLO doit integrer un systeme de gestion du temps :

```
PARAMETRES PARENTAUX (zone verrouillee)
├── Duree de session max : 15 / 30 / 45 / 60 min / illimitee
├── Nombre de sessions par jour : 1 / 2 / 3 / illimite
├── Heures autorisees : 8h-19h (personnalisable)
├── Alerte douce : "Tu joues depuis [X] minutes ! Une pause ?"
│   → Apparait a 50% du temps restant
│   → L'enfant peut continuer (pas de blocage brutal)
├── Fin de session : "Bravo pour aujourd'hui ! A demain !"
│   → Animation de "coucher" du personnage
│   → Recap des accomplissements de la session
└── Rapport parent : resume hebdomadaire par email (optionnel)
    → Temps joue, jeux preferes, progression, competences travaillees
```

---

## 9. Feedback Haptique

### 9.1 Etat de la Recherche

> Les chercheurs pensent que l'integration du retour haptique dans les dispositifs educatifs peut aider les enfants a apprendre en engageant plusieurs sens, en fournissant une confirmation tactile des actions, et en encourageant les experiences d'apprentissage interactives.

> Les evenements narratifs accompagnes de feedback haptique sont mieux compris et plus saillants en memoire pour les enfants de 6 a 9 ans.

### 9.2 Implementation avec expo-haptics

```typescript
import * as Haptics from 'expo-haptics';

// Palette haptique pour PERIPLO
const hapticFeedback = {
  // Actions de base
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  // Feedback positif
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

  // Feedback d'erreur douce
  error: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

  // Celebration (pattern personnalise)
  celebrate: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await delay(100);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await delay(100);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  // Drag en cours (feedback continu leger)
  dragTick: () => Haptics.selectionAsync(),

  // Drop reussi (piece placee)
  dropSuccess: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

  // Deblocage
  unlock: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await delay(200);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
};
```

### 9.3 Quand Utiliser le Haptique

| Moment | Type | Intensite |
|--------|------|-----------|
| Tap sur element interactif | Impact Light | Subtil, confirmation |
| Drag d'un element | Selection (leger tick) | Continu, leger |
| Drop sur la bonne zone | Impact Heavy | Satisfaisant, "atterrissage" |
| Bonne reponse | Notification Success | Court, positif |
| Mauvaise reponse | Impact Medium (unique) | Court, neutre |
| Niveau complete | Pattern celebratoire | Crescendo |
| Etoile gagnee | Impact Heavy x1 | Net, marque |
| Deblocage | Double Success | Memorable |

**Important** : le haptique doit TOUJOURS etre desactivable dans les parametres. Certains enfants (notamment autistes) peuvent etre hypersensibles aux vibrations.

---

## 10. Conformite Legale (COPPA / GDPR)

### 10.1 Cadre Reglementaire 2026

**COPPA (USA) -- Mise a jour majeure avril 2026** :

La FTC a finalise des mises a jour majeures de COPPA effectives le 23 juin 2025, avec une date limite de conformite le **22 avril 2026**.

Changements cles :
- Les identifiants persistants et les donnees biometriques sont desormais des "informations personnelles"
- Consentement parental **separe** pour le partage avec des tiers (pub, analytics)
- Regles plus strictes sur la retention des donnees
- **Amendes : $51,744 par enfant, par violation** -- la FTC a signale que l'enforcement est une priorite 2026

**GDPR-K (UE)** :
- Age de consentement par defaut : 16 ans (abaissable a 13 par les Etats membres)
- Consentement parental obligatoire en-dessous de cet age
- Droit a l'oubli renforce pour les mineurs
- Data minimization : ne collecter que le strict necessaire

### 10.2 Implementation Zero-Data pour PERIPLO

**La strategie la plus sure : ne collecter AUCUNE donnee personnelle de l'enfant.**

```
ARCHITECTURE "PRIVACY BY DESIGN"
├── Stockage local uniquement (AsyncStorage / SQLite)
│   ├── Progression du jeu
│   ├── Preferences (son, haptique, accessibilite)
│   ├── Etoiles et collections debloquees
│   └── Profil age (sans nom, sans photo, sans identifiant)
├── Aucun compte utilisateur requis pour l'enfant
├── Compte parent optionnel (email uniquement, pour sync/backup)
│   └── Consent explicite au moment de la creation
├── Zero analytics cote enfant (pas de Firebase, pas de Mixpanel)
│   └── Analytics agrege cote parent uniquement si opt-in
├── Zero pub dans l'app enfant
│   └── Rewarded ads uniquement pour les 7+ si version freemium
└── Zero partage social depuis l'interface enfant
```

### 10.3 Parental Gate

Chaque acces aux fonctions sensibles est protege par un "parental gate" :

```typescript
// Parental gate : calcul que l'enfant ne peut pas resoudre
const ParentalGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [a] = useState(Math.floor(Math.random() * 20) + 10); // 10-29
  const [b] = useState(Math.floor(Math.random() * 20) + 10); // 10-29

  return (
    <View>
      <Text>Zone parentale</Text>
      <Text>Resous ce calcul pour continuer : {a} + {b} = ?</Text>
      <NumberInput onSubmit={(answer) => {
        if (answer === a + b) onSuccess();
      }} />
    </View>
  );
};
```

---

## 11. Retention et Engagement

### 11.1 Benchmarks 2026

Les benchmarks de retention pour les apps mobiles en 2026 :

| Periode | Moyenne apps | Apps education | Cible PERIPLO |
|---------|-------------|---------------|---------------|
| Jour 1 | 25-30% | 20-25% | 40%+ |
| Jour 7 | 10-15% | 8-12% | 25%+ |
| Jour 30 | 5-8% | 4-6% | 15%+ |

### 11.2 Leviers de Retention Specifiques Enfants

**Levier 1 -- Le "Aha Moment" Immediat**

> 55% des annulations de trial de 3 jours se font au Jour 0. La valeur doit etre demontree IMMEDIATEMENT.

Pour PERIPLO, le premier lancement doit :
1. [0-5 sec] Ecran d'accueil anime (pas de splash statique ennuyeux)
2. [5-15 sec] Selection de la tranche d'age (par le parent)
3. [15-30 sec] L'enfant joue DEJA son premier niveau (pas de creation de compte, pas de tuto long)
4. [30-60 sec] Premier succes, premiere celebration, premier deblocage
5. [< 2 min] L'enfant a compris le concept ET veut continuer

**Levier 2 -- Variete et Surprise**

Avec 37 jeux, PERIPLO a un avantage enorme. La strategie :
- Apres chaque session de 3-5 niveaux dans un jeu, proposer de decouvrir un nouveau jeu
- "Periplo a decouvert un nouveau pays ! Tu veux voir ?"
- Ne jamais forcer -- la suggestion doit etre optionnelle et excitante

**Levier 3 -- Rendez-vous Naturels (sans FOMO)**

Au lieu de streaks obligatoires (anxiogenes pour les enfants), creer des rendez-vous positifs :
- "Reviens demain pour voir ce que Periplo a decouvert dans son voyage !"
- Un nouveau "fait amusant" chaque jour sur l'ecran d'accueil
- Rotation hebdomadaire d'un "jeu de la semaine" mis en avant

**Levier 4 -- L'Experience Parent**

Le parent est le vrai "client" (c'est lui qui telecharge, paye, et decide du screen time) :
- Rapport de progression clair et visuel (pas un tableau de stats ennuyeux)
- Valoriser les competences travaillees en langage parent ("votre enfant a travaille la logique spatiale aujourd'hui")
- Notifications push pour le PARENT (jamais l'enfant) : "Emma a debloquer 3 nouveaux niveaux de maths cette semaine !"
- Partage facile des accomplissements (capture d'ecran automatique des reussites)

**Levier 5 -- Contenu Frais et Evolutif**

- Mise a jour mensuelle avec de nouveaux niveaux pour les jeux existants
- Nouveau jeu tous les 1-2 mois (parmi les 37 concepts restants)
- Evenements saisonniers legers (theme Halloween, Noel, ete) sans FOMO -- le contenu reste disponible apres

### 11.3 Metriques a Tracker (Cote Parent/Dev uniquement)

```
METRIQUES DE SANTE DE L'APP (sans donnees personnelles de l'enfant)
├── Session length moyenne (par tranche d'age)
├── Niveaux completes par session
├── Taux de completion par jeu (ou les enfants decrochent ?)
├── Conversion gratuit → abonnement
├── Retention D1 / D7 / D30
├── NPS parent (enquete in-app trimestrielle)
├── Jeux les plus/moins joues
├── Distribution des etoiles (indicateur de difficulte calibree)
└── Taux d'utilisation des indices (indicateur de frustration)
```

---

## 12. Recommandations Specifiques pour PERIPLO

### 12.1 Les 5 Actions Prioritaires Immediates

**Action 1 -- Creer le Design System PERIPLO** (2-3 jours)

Avant de developper le deuxieme jeu, poser les fondations partagees :

```
/src/shared/design-system/
├── colors.ts          → Tokens de couleur (palette Section 7)
├── typography.ts      → Tailles par tranche d'age
├── spacing.ts         → Grille responsive tablette/telephone
├── haptics.ts         → Palette haptique (Section 9)
├── sounds.ts          → Bank de sons de feedback (Section 3)
├── animations.ts      → Animations reussite/echec/transition
├── components/
│   ├── Button.tsx     → Bouton adaptatif (taille selon age)
│   ├── StarRating.tsx → Affichage 1-3 etoiles
│   ├── Confetti.tsx   → Animation de celebration
│   ├── ProgressBar.tsx→ Barre de progression
│   ├── ParentalGate.tsx→ Verrou parental
│   ├── HandDemo.tsx   → Main animee pour onboarding
│   └── PeeriploChar.tsx→ Personnage Periplo anime
└── hooks/
    ├── useScaffolding.ts → Systeme d'indices adaptatifs
    ├── useDifficulty.ts  → Difficulte adaptative
    ├── useProgress.ts    → Suivi de progression local
    ├── useSound.ts       → Gestionnaire audio
    └── useSession.ts     → Timer et gestion de session
```

**Action 2 -- Designer le Personnage Periplo** (1-2 jours)

Le mascot est le lien emotionnel entre les 37 jeux. Il doit etre :
- Rond, doux, expressif (sourire large, grands yeux)
- Facilement animable (corps simple, extremites expressives)
- Reconnaissable en silhouette (test : sa silhouette est-elle unique ?)
- Equipable avec des accessoires de voyage (chapeau, sac a dos, jumelles)
- Declinable en expressions : joie, surprise, curiosite, encouragement, celebration

**Action 3 -- Implementer le Systeme de Progression Global** (2-3 jours)

La Carte du Monde est le hub qui connecte les 37 jeux. C'est le "meta-game" :
- Carte du monde interactive avec les 6 continents + zone secrete
- Chaque jeu = un point sur la carte
- Animation de "voyage" quand l'enfant passe d'un jeu a un autre
- Progression visible : points allumes = jeux decouverts, etoiles = maitrise
- Stockage local avec AsyncStorage / SQLite

**Action 4 -- Produire la Bank de Sons de Base** (1-2 jours)

30-50 sons essentiels a produire/sourcer :
- 5 sons de succes (varies)
- 2 sons d'echec doux
- 1 son de niveau complete
- 1 son d'etoile
- 1 son de deblocage
- 5 sons d'interaction (tap, drag, drop, swipe, snap)
- 1 musique de menu (loop 30-60 sec)
- 1 musique de jeu generique (loop 30-60 sec)
- Sources : Freesound.org, Zapsplat (free tier), ou creation avec GarageBand / Audacity

**Action 5 -- Refactorer Traffic avec le Design System** (1-2 jours)

Le premier jeu (Traffic/sliding block) doit devenir le "modele de reference" :
- Appliquer la palette de couleurs PERIPLO
- Ajouter le personnage Periplo comme guide
- Implementer le systeme 3 etoiles
- Ajouter les sons de feedback
- Implementer l'onboarding sans texte (demo animee sur le premier niveau)
- Ajouter le feedback haptique

### 12.2 Architecture des 37 Jeux par Famille

Les 37 jeux de PERIPLO partagent beaucoup de mecaniques. Voici le regroupement par "moteur de jeu" pour maximiser la reutilisation de code :

| Moteur | Jeux | Composant cle partage |
|--------|------|----------------------|
| **Grille tap** | Memory, Intrus, Ombres, Patterns, Constellation, Nonogram | `GridBoard` + `TapHandler` |
| **Drag & Drop** | Tangram, Formes, Tri, Balance, Origami | `DragDropZone` + `SnapSystem` |
| **Sliding/Grille mobile** | Traffic, Taquin, Sokoban, Block Puzzle | `SlidingGrid` + `MoveValidator` |
| **Flow/Connexion** | Flow Connect, Pipes, Laser, Gears | `ConnectionGraph` + `PathRenderer` |
| **Sequence/Pattern** | Rythme/Simon, Comptage, Number Bonds, Code | `SequencePlayer` + `InputMatcher` |
| **Canvas/Creatif** | Couleurs, Mosaique, Meteo, Mirror | `DrawCanvas` + `ColorEngine` |
| **Navigation** | Maze, Dominos, Tower | `PathNavigation` + `PhysicsLite` |
| **Spot/Observation** | Differences, Water Sort | `CompareEngine` + `TapMarker` |

En creant ces 8 "moteurs", on couvre les 37 jeux avec un maximum de reutilisation.

### 12.3 Ordre de Lancement Recommande (Revise)

Cet ordre optimise pour : (1) couverture des tranches d'age, (2) variete des mecaniques, (3) reutilisation de code, (4) impact sur la retention.

**Phase 1 -- MVP (4 semaines, 7 jeux)**

| Semaine | Jeu | Moteur | Tranche | Justification |
|---------|-----|--------|---------|---------------|
| S1 | Design System + Carte du Monde | Shared | Toutes | Fondation obligatoire |
| S1 | Refactoring Traffic | Sliding | 5-10 | Premier jeu existant, vitrine technique |
| S2 | Memory | Grille tap | 3-10 | Plus simple, pose les assets visuels, toutes tranches |
| S2 | L'Intrus | Grille tap | 3-10 | Meme moteur que Memory, engagement immediat |
| S3 | Quelle Suite (Patterns) | Sequence | 5-10 | Valeur educative forte, moteur sequence |
| S3 | Labo des Couleurs | Canvas | 3-7 | Wow factor, differenciant, creatif |
| S4 | Periplo Balance | Drag & Drop | 5-8 | Concept unique, pose le moteur drag & drop |

> Resultat S4 : **7 jeux, 3 moteurs, couverture 3-10 ans, 2 jeux par tranche minimum**

**Phase 2 -- Enrichissement (4 semaines, +7 jeux = 14 total)**

| Semaine | Jeu | Moteur reutilise |
|---------|-----|-----------------|
| S5 | Periplo Maze | Navigation |
| S5 | Ombres (Shadows) | Grille tap (reutilise assets Memory) |
| S6 | Tri (Sorting) | Drag & Drop (reutilise moteur Balance) |
| S6 | Comptage | Sequence |
| S7 | Tangram | Drag & Drop |
| S7 | Flow Connect | Flow/Connexion |
| S8 | Periplo Code | Sequence (version avancee) |

**Phase 3 -- Expansion (8 semaines, +10 jeux = 24 total)**

**Phase 4 -- Complete (8 semaines, +13 jeux = 37 total)**

### 12.4 KPIs de Succes pour le MVP

| KPI | Cible Mois 1 | Cible Mois 3 | Cible Mois 6 |
|-----|-------------|-------------|-------------|
| Telechargements | 1,000 | 5,000 | 20,000 |
| Retention D1 | 35% | 40% | 45% |
| Retention D7 | 15% | 20% | 25% |
| Retention D30 | 5% | 10% | 15% |
| Note App Store | 4.0+ | 4.3+ | 4.5+ |
| Conversion freemium | 3% | 5% | 7% |
| Session moyenne | 8 min | 10 min | 12 min |
| Niveaux/session | 5 | 7 | 8 |
| NPS parent | 30+ | 40+ | 50+ |

### 12.5 Differenciateurs Uniques de PERIPLO

En synthese, voici ce qui fait de PERIPLO une proposition unique sur le marche :

| Differenciateur | Explication | Concurrent le plus proche |
|----------------|-------------|--------------------------|
| **37 jeux, 1 univers** | Le plus grand catalogue de mini-jeux educatifs sous une seule marque coherente | Sago Mini (20+ activites), mais sans progression globale |
| **Theme voyage mondial** | Chaque jeu = un pays, sons du monde, faits culturels | Aucun concurrent direct |
| **Carte du monde comme meta-game** | Hub interactif qui connecte tous les jeux et visualise la progression | Prodigy a un monde, mais c'est un RPG, pas un atlas |
| **3-10 ans en difficulte adaptative** | Un seul achat, 3 tranches d'age, adaptation automatique | La plupart des apps ciblent une seule tranche |
| **Privacy-first, zero data enfant** | Aucune donnee personnelle collectee, stockage local | Rare dans l'industrie, fort argument parent |
| **Ethique de monetisation** | Zero pub < 6 ans, zero dark pattern, zero casino | Toca Boca (reference), mais peu de concurrents |
| **Born accessible** | Accessible par defaut, pas en ajout tardif | Tres rare dans les jeux enfants |
| **Open-source friendly** | Stack React Native Expo, potentiel contribution communautaire | Unique dans le marche enfants |

---

## Sources

### UX et Design
- [Designing for Kids: UX Design Tips - Ungrammary](https://www.ungrammary.com/post/designing-for-kids-ux-design-tips-for-children-apps)
- [UX Design for Kids: Principles - Ramotion](https://www.ramotion.com/blog/ux-design-for-kids/)
- [UX Design for Children - Eleken](https://www.eleken.co/blog-posts/ux-design-for-children-how-to-create-a-product-children-will-love)
- [Kids Mobile Games 2026 - CAS.AI](https://cas.ai/blog/kids-mobile-games-2026-how-to-win-tough-developer-challenges/)
- [UX Design for Kids - Gapsy](https://gapsystudio.com/blog/ux-design-for-kids/)
- [UI/UX Tips for Child-Friendly Interfaces - Aufait UX](https://www.aufaitux.com/blog/ui-ux-designing-for-children/)
- [Game Design UX Best Practices - UX Planet](https://uxplanet.org/game-design-ux-best-practices-guide-4a3078c32099)

### Recherche Academique
- [Serious Educational Games for Children - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2405844024041392)
- [Principles of Game-Based Learning - ERIC](https://files.eric.ed.gov/fulltext/EJ1297914.pdf)
- [Design Guidelines for Educational Games - UPV](https://personales.upv.es/thinkmind/dl/conferences/achi/achi_2020/achi_2020_5_410_20188.pdf)
- [Zone of Proximal Flow - ACM](https://dl.acm.org/doi/10.1145/2493394.2493404)
- [Flow Theory and ZPD in Game-Based Learning - ICE Blog](https://icenet.blog/2025/12/02/in-the-zone-the-intersection-of-flow-theory-and-the-zone-of-proximal-development-in-game-based-learning/)
- [Principles for Educational Game Development - ResearchGate](https://www.researchgate.net/publication/315921033_Principles_for_educational_game_development_for_young_children)
- [Adaptive Scaffolding in Game-Based Learning - Springer](https://link.springer.com/article/10.1007/s11423-023-10244-x)

### Gamification et Recompenses
- [Gamification Education Apps - Yu-kai Chou](https://yukaichou.com/gamification-examples/10-best-gamification-education-apps/)
- [Engaging Children via Gamification - Smart Learning Environments](https://slejournal.springeropen.com/articles/10.1186/s40561-019-0085-2)
- [Points-Based Reward Systems - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6566098/)
- [Psychology Behind Reward Systems for Kids - Stimul8](https://stimul8.app/blog/the-psychology-behind-reward-systems-for-kids)
- [Psychology of Rewards in Game-Based Learning - ResearchGate](https://www.researchgate.net/publication/359651248_The_Psychology_of_Rewards_in_Digital_Game-Based_Learning_A_Comprehensive_Review)
- [Gamified Educational App ADHD - Frontiers](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1668260/full)

### Sound Design
- [9 Tips for Kids Game Music - Freshmade Music](https://www.freshmademusic.com/?p=689)
- [Sound Design Importance - Mega Cat Studios](https://megacatstudios.com/blogs/game-development/good-game-design-importance-sound-design-music)
- [9 Sound Design Tips - GameAnalytics](https://www.gameanalytics.com/blog/9-sound-design-tips-to-improve-your-games-audio)

### Onboarding
- [App Onboarding for Kids - Google Android Blog](https://android-developers.googleblog.com/2017/04/app-onboarding-for-kids-how-budge.html)
- [Kid-Friendly App Onboarding - AppSamurai](https://appsamurai.com/blog/building-a-kid-friendly-app-onboarding-and-monetization/)
- [Onboarding for Games - Apple Developer](https://developer.apple.com/app-store/onboarding-for-games/)
- [Designing a Children's App - Medium](https://medium.com/55-minutes/designing-a-childrens-app-5-factors-to-keep-in-mind-4693a8982a33)

### Retention
- [App Retention Benchmarks 2026 - Enable3](https://enable3.io/blog/app-retention-benchmarks-2025)
- [Mobile App Retention Strategies 2026 - Pushwoosh](https://www.pushwoosh.com/blog/increase-user-retention-rate/)
- [Mobile App Retention 2026 - HristovDevelopment](https://www.hristovdevelopment.com/post/mobile-app-retention-2026)

### Couleurs et Design Visuel
- [Color Stories in Game Design - IGDA](https://igda.org/news-archive/color-stories-in-game-design/)
- [Color Theory for Game Art - Pav Creations](https://pavcreations.com/color-theory-for-game-art-design-the-basics/)
- [Psychology of Color in Game Design - Udemy](https://www.udemy.com/course/color-in-game-design/)

### Accessibilite
- [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/)
- [Accessible Game Design for Kids - Can I Play That](https://caniplaythat.com/2020/06/30/accessible-game-design-for-kids-and-everyone/)
- [Inclusive Gaming for Kids - Goally](https://getgoally.com/blog/inclusive-gaming/)
- [Empowering Play for Disabled Children - Frontiers](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1620281/full)

### Attention et Session
- [Attention Span in Children 2026 - EnglishCentral](https://www.englishcentral.com/blog/en/what-is-attention-span-in-children/)
- [User Attention Span Statistics 2026 - Amra and Elma](https://www.amraandelma.com/user-attention-span-statistics/)

### Feedback Haptique
- [Haptic Technology Impact on Children Learning - Wiley](https://advanced.onlinelibrary.wiley.com/doi/10.1002/aisy.202300731)
- [Tactile Devices and Children's Learning - University of Illinois](https://education.illinois.edu/about/news-events/news/article/2024/05/23/how-tactile-devices-can-improve-children-s-learning)
- [Interest Arousal by Haptic Feedback for Kindergarten - ResearchGate](https://www.researchgate.net/publication/344148491_Interest_Arousal_by_Haptic_Feedback_During_a_Storytelling_for_Kindergarten_Children)

### Conformite Legale
- [COPPA Compliance 2026 - Usercentrics](https://usercentrics.com/knowledge-hub/coppa-compliance/)
- [COPPA 2026 New Rules - State of Surveillance](https://stateofsurveillance.org/news/coppa-2026-new-rules-children-privacy-biometric-data/)
- [COPPA Compliance Guide - LegalForge](https://www.legalforge.app/blog/coppa-childrens-privacy-policy)
- [Children's Online Privacy - Countly](https://countly.com/blog/data-privacy-kids-apps)

### Monetisation Ethique
- [Children, Ethics, and Free to Play - Gamedeveloper](https://www.gamedeveloper.com/business/children-ethics-and-free-to-play-games)
- [Ad Monetization in Kids Games - GameBizConsulting](https://www.gamebizconsulting.com/blog/ad-monetization-in-kids-games-and-apps-how-to-do-it-right)
- [Ethical Monetization for Kids Game - GamesBeat](https://venturebeat.com/games/how-one-mobile-developer-says-it-has-an-ethical-monetization-plan-for-its-kids-game/)

### Mascot et Personnage
- [Brand Mascots for Kid-Targeted Innovation - Seed Strategy](https://seedstrategy.com/accelerator/brand-mascots/)
- [Mascot Design Characteristics and Children - ResearchGate](https://www.researchgate.net/publication/277588377_Mascots_design_characteristics_and_children_Does_affective_response_match_with_cognitive_response)

### Progression et Difficulte
- [Game Progression Systems - GameDesignSkills](https://gamedesignskills.com/game-design/game-progression/)
- [Difficulty Curves - DaveTech](http://www.davetech.co.uk/difficultycurves)
- [Progression Curves in Game Design - DEV Community](https://dev.to/sam_novak_574b07811e18495/progression-curves-in-game-design-why-good-systems-feel-invisible-and-bad-ones-feel-like-grind-26bo)
- [Level Curves Art of Game Progression - DesignTheGame](https://www.designthegame.com/learning/courses/course/fundamentals-level-curve-design/level-curves-art-designing-game-progression)

### Philosophie Toca Boca / Sago Mini
- [Sago Mini Our Story](https://sagomini.com/our-story/)
- [Sago Mini World - Screenwise Review](https://screenwiseapp.com/media/sago-mini-world-app)
- [Toca Boca Alternatives - Kokotree](https://kokotree.com/alternatives/toca-boca)
