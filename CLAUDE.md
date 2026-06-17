# CLAUDE.md — Portfolio Oscar Rousset
## Fichier de contexte projet — À placer à la racine du projet

---

## Qui suis-je et quel est l'objectif

Ce site est le portfolio de **Oscar Rousset**, étudiant en **BUT GEA parcours GC2F** (Gestion Comptable, Fiscale et Financière) à l'IUT de Paris Rives de Seine. Il est destiné à deux audiences : l'enseignant référent qui évalue le portfolio en juin 2026, et des recruteurs potentiels pour une alternance en master (Master CCA — IAE Paris-Est, septembre 2026).

L'objectif du site est de démontrer la **montée en compétence progressive** sur les 5 compétences du parcours GC2F à travers des preuves concrètes issues de SAE, missions et projets.

**Contact :** oscar.rousset.lm@gmail.com · +33 7 69 34 97 49 · Paris 75013

---

## Site d'inspiration

Le site de référence est **https://kidsuper.world** — une expérience web immersive dans laquelle le visiteur navigue physiquement dans une scène interactive. L'esprit à retenir : on ne scrolle pas, on explore. Chaque élément de la scène est un point d'entrée vers du contenu. L'animation est purposeful, pas décorative.

---

## Concept visuel et narratif

> ⚠️ **Refonte de juin 2026 — le concept « tout en SVG/CSS pur » est abandonné** pour la scène d'intro et la scène principale. Ces deux scènes reposent désormais sur des **images générées par IA**, fournies par Oscar. Le reste (palette, stack GSAP, contenu éditorial des compétences) reste valable. Voir `HISTORIQUE_PROJET.md` pour le détail de la bascule.

### L'animation d'intro — séquence d'images P0 → P1 → P2 → chambre
Le visiteur arrive face à un **calque de nuages**, puis « traverse » la nuit pour entrer dans une chambre-bureau. La séquence enchaîne **3 images d'intro + l'image de chambre**, par **étapes discrètes déclenchées au clic ou au scroll** (pas de parallax continu à la souris) :

| Repère | Fichier réel sur disque | Rôle |
|---|---|---|
| **P0** | `assets/image/Image nuage init P0.png` | Calque de nuages au premier plan (écran d'accueil) |
| **P1** | `assets/image/Image de fonds P1.png` | Vue de la ville / immeuble de bureaux la nuit, derrière P0 |
| **P2** | `assets/image/Image de fonds P2.png` | Identique à P1 mais **une fenêtre précise est davantage éclairée** |
| **P3 (chambre)** | `assets/image/Chambre P3.png` | Scène principale (5500×3072) |

**Comportement attendu :**
1. Affichage de **P0** (nuages) en premier plan.
2. Au clic/scroll : transition qui **dissipe progressivement P0** pour révéler **P1** (la ville) derrière.
3. Une **fenêtre précise sur P1** est une zone interactive : une animation (pulse / glow / oscillation lumineuse) signale qu'elle est cliquable. Coordonnées (en %) à fournir/estimer une fois les images calées.
4. Au clic sur la fenêtre : affichage de **P2** (même vue, fenêtre plus éclairée), puis **zoom progressif + transition vers la chambre** (entrée dans la scène principale).

### L'espace de navigation — La chambre (remplace le bureau isométrique)
Une fois entré, le visiteur se trouve dans une **chambre-bureau**, qui est une **image IA** (`Chambre P3.png`) et non plus un dessin SVG. Les objets sont **déjà dessinés dans l'image** ; on ne les recrée pas, on pose **par-dessus des zones cliquables invisibles (hotspots)** alignées sur les éléments visibles.

Les **5 surfaces** (plafond, sol, mur gauche, mur droit, mur du fond) portent toujours les **5 compétences GC2F**. Nouveauté : **chaque mur contient 2 cadres déjà dessinés dans l'image**, et **1 cadre = 1 apprentissage critique (AC) = 1 preuve**. Soit **2 AC + 2 preuves par compétence**, **10 hotspots-cadres au total**.

- **Mur gauche** → **Analyser** — 2 cadres : AC31.02 + AC31.03
- **Mur du fond** → **Décider** — 2 cadres : AC32.02 + AC32.03
- **Mur droit** → **Piloter** — 2 cadres : AC33.01 + AC33.02
- **Sol** → **Produire** — 2 cadres : AC34.01 + AC34.03
- **Plafond** → **Évaluer** — 2 cadres : AC35.03 + AC35.04

> Le mapping mur↔compétence ci-dessus suit `CLAUDE.md` historique. La position réelle de chaque cadre dépend de l'image livrée : les hotspots (coordonnées en %) sont à caler visuellement sur `Chambre P3.png`. L'`index.html` actuel contient un mapping provisoire (1 hotspot par compétence) à reprendre et à dédoubler (2 hotspots par mur).

**Interaction sur chaque cadre/bouton :**
- Zone cliquable invisible positionnée par-dessus le cadre déjà visible dans l'image (hover détecté).
- Animation au hover qui signale clairement « ceci est un bouton » (léger zoom, lueur, ombre).
- Au clic : ouverture de l'overlay de preuve correspondant (voir ci-dessous).

Éléments supplémentaires dans la chambre :
- Une **feuille posée sur le lit** : cliquable → affichage du **CV** dans le grand overlay (`#modal-proof`, comme les preuves) + bouton « Télécharger le CV » (`assets/documents/CV_Oscar_Rousset_FR.pdf`).
- Un **écran d'ordinateur sur le bureau** : cliquable → **vidéo de présentation** (placeholder pour l'instant, vidéo à intégrer via l'étape « vidéo » dans `PROMPTS.md`).
- Un **bouton audio** fixe en bas à droite : mute/unmute la musique de fond (`assets/audio/Music website.mp3`), déclenchée à l'entrée dans la chambre.
- La **fenêtre du fond** (vue sur la ville) est un bouton **« Sortir »** : elle ramène à l'extérieur (image P1) via `returnToCity()`. Depuis la ville, recliquer la fenêtre éclairée fait re-rentrer dans la chambre.

### Affichage des preuves — le poster « vient vers » le visiteur
Au clic sur un cadre, **seul le poster PDF** de l'AC s'affiche (`preuve_ACxx-yy_*_poster.pdf`) — aucun texte, pas de page intermédiaire. Implémentation (`js/competence.js` + `#modal-proof`) :
- la preuve **grandit depuis le cadre cliqué** jusqu'à un grand cadre centré (effet « elle vient vers nous »), animée via GSAP à partir du `getBoundingClientRect()` du hotspot — l'origine est donc toujours le bon cadre ;
- la **chambre reste visible, floutée** en arrière-plan (`backdrop-filter: blur`), pas masquée ;
- fermeture par **bouton ×**, clic sur le fond, ou **Échap** ; la preuve « repart » vers son cadre.
- *(différé, décision Oscar « juste le PDF ») :* navigation préc./suivant entre les 2 AC d'un mur et lien vers les documents complets en ligne (VDD SFR, Excel SFR, guide macros VBA) — à ajouter plus tard.

### Identité visuelle
**Palette de couleurs :**
- `#0A1628` — Bleu marine profond (fond principal)
- `#1B2E4B` — Bleu marine secondaire (surfaces, cartes)
- `#F5F0E8` — Blanc cassé (texte principal)
- `#C9A84C` — Or discret (accents, titres, hover)
- `#2A4A7F` — Bleu moyen (éléments interactifs secondaires)

**Typographie :**
- Display / titres : `Playfair Display` (Google Fonts) — serif élégant, finance
- Corps de texte : `Inter` (Google Fonts) — sans-serif lisible, corporate
- Données/chiffres : `JetBrains Mono` (Google Fonts) — monospace pour les données

**Ambiance :** sérieux, premium, finance. Animations fluides et purposeful. Pas d'effets tape-à-l'œil.

---

## Architecture des fichiers du projet

```
Portfolio/
├── CLAUDE.md               ← ce fichier
├── CONTENT.md              ← contenu éditorial complet
├── PROMPTS.md              ← séquence de travail
├── HISTORIQUE_PROJET.md    ← journal des sessions / décisions
├── index.html              ← page d'accueil (intro images + chambre)
├── activites.html          ← double entrée par activité
├── css/
│   ├── main.css            ← variables CSS, reset, styles globaux
│   ├── intro.css           ← séquence d'intro P0→P1→P2→chambre
│   ├── room.css            ← chambre interactive (hotspots) + overlay preuves
│   └── competence.css      ← pages compétences
├── js/
│   ├── intro.js            ← enchaînement des images d'intro + zoom fenêtre
│   ├── room.js             ← hotspots de la chambre + overlay de preuves
│   ├── competence.js       ← overlay de preuve (le poster PDF vient vers le visiteur)
│   └── audio.js            ← musique de fond
├── competences/
│   ├── analyser.html
│   ├── decider.html
│   ├── piloter.html
│   ├── produire.html
│   └── evaluer.html
├── assets/
│   ├── audio/
│   │   └── Music website.mp3        ← ✅ disponible (NB : espace, pas underscore)
│   ├── documents/
│   │   └── CV_Oscar_Rousset_FR.pdf   ← ✅ disponible
│   └── image/
│       ├── Image nuage init P0.png  ← ✅ P0 (nuages)
│       ├── Image de fonds P1.png    ← ✅ P1 (ville)
│       ├── Image de fonds P2.png    ← ✅ P2 (fenêtre éclairée)
│       └── Chambre P3.png           ← ✅ scène chambre
└── preuves/                          ← arborescence par compétence → par AC
    ├── 1-Analyser/
    │   ├── AC31.02  Conseiller un type d'organisation/
    │   │   ├── preuve_AC31-02_conseil_franchise_poster.pdf   ← affiché dans l'overlay
    │   │   ├── preuve_AC31-02_conseil_franchise.pptx         ← source du poster
    │   │   └── Trace - AC31.02 ....pdf                       ← trace source
    │   └── AC31.03  Proposer des améliorations des processus/
    │       ├── preuve_AC31-03_kit_macros_KPMG_poster.pdf
    │       ├── preuve_AC31-03_kit_macros_KPMG.pptx
    │       └── Trace - Guide_integration_macros_VBA.docx
    ├── 2-Décider/
    │   ├── AC32.02  Exploiter les données .../   (dashboard Etu'Explore)
    │   └── AC32.03  Participer à la prise de décision .../   (RCF adopt)
    ├── 3-Piloter/
    │   ├── AC33.01  Animer une équipe/   (SAE reprise)
    │   └── AC33.02  Mener un projet collaboratif/   (Etu'Explore)
    ├── 4-Produire/
    │   ├── AC34.01GC2F  Évaluation actifs-passifs/   (DCF MONAP ; dossier raccourci)
    │   └── AC34.03GC2F  Réaliser un diagnostic/audit pour conseiller/   (VDD SFR)
    └── 5-Evaluer/
        ├── AC35.03GC2F  Établir un plan de financement équilibré/   (PFI MONAP)
        └── AC35.04GC2F  Réaliser la gestion de trésorerie court terme/   (Tréso MONAP)
```

> **Convention d'un dossier d'AC :** chaque dossier `AC..` contient le **poster PDF** (`*_poster.pdf`, affiché dans l'overlay), la **source PowerPoint** (`*.pptx`) ayant servi à le générer, et la/les **trace(s) source** (préfixées `Trace - ...` : Excel, PDF, screenshots…). Le prompt de refonte évoquait un sous-dossier `traces/` ; sur le disque les traces sont actuellement **à plat dans le dossier de l'AC** — conserver cet état tel quel, ne pas réorganiser sans validation d'Oscar.

---

## Stack technique

Site en **HTML/CSS/JavaScript pur**, sans framework ni bundler. Déployable via GitHub Pages ou tout hébergement statique.

Dépendances externes via CDN uniquement :
- **GSAP 3.12.2** — toutes les animations : `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- **Google Fonts** — Playfair Display, Inter, JetBrains Mono

Pas de React, Vue, npm, ou bundler. Tout fonctionne en ouvrant index.html dans un navigateur.

---

## Déploiement & versions

- **Dépôt Git :** `https://github.com/Kloupi/Oscar.Rousset.Portfolio` (branche `main`).
- **Hébergement :** GitHub Pages (branche `main`, dossier racine), `.nojekyll` présent. URL publique : **https://kloupi.github.io/Oscar.Rousset.Portfolio/**.
- **Mettre à jour le site :** `git add -A` → `git commit -m "…"` → `git push` (Pages se redéploie en 1–2 min).
- **Sauvegardes :** historique Git (versionnage principal) + copie figée `..\Sprint\Portfolio_v1` (Version 1).
- **Contrainte Windows :** chemins > 260 caractères (`LongPathsEnabled=0`). Garder les noms de dossiers de preuves **courts** ; le dossier AC34.01 a déjà été raccourci pour cette raison. `git config core.longpaths true` est activé sur le dépôt.
- **Version 1** (2026-06-17) : intro images + chambre + overlay de preuves. **Version 2** prévue : vidéo de présentation + CV à jour.

---

## Conventions de code

- Les variables CSS sont toutes définies dans `:root` dans `main.css`
- Chaque animation GSAP est dans son propre fichier JS
- Les couleurs ne sont **jamais** écrites en dur dans le HTML ou le JS — toujours via variables CSS
- L'intro et la chambre reposent sur des **images IA** (`assets/image/`) ; les zones cliquables sont des **hotspots HTML invisibles** positionnés en `%` par-dessus. Le reste de l'UI (overlays, modals, pages compétences) reste en CSS pur. Plus de scène SVG façade/bureau.
- Les textes éditoriaux viennent de `CONTENT.md` — ne pas inventer de contenu
- Commenter chaque fonction JS avec une ligne d'explication
- Mobile-responsive : sur écran < 768px, la scène chambre (image + hotspots) est remplacée par des cartes scrollables (5 compétences ; idéalement les 10 AC en sous-cartes)

---

## Contenu obligatoire (consignes portfolio BUT3)

1. **Pitch de présentation** (vidéo < 2 min) — placeholder en place, vidéo à intégrer via l'étape « vidéo » de `PROMPTS.md`
2. **5 compétences GC2F** avec preuves (traces + justification) — double entrée : par compétence ET par activité ✅
3. **Compétences complémentaires** — Fashion Day **retiré** (décision juin 2026) ; aucune compétence complémentaire pour l'instant
4. **CV téléchargeable** ✅
5. **Bande-son** ✅

---

## Les 5 compétences GC2F — Résumé

Chaque compétence = **2 cadres = 2 apprentissages critiques = 2 preuves** (10 preuves au total). Mapping aligné sur l'arborescence réelle `/preuves/` :

| Compétence | Surface | Niveau atteint | AC 1 (preuve) | AC 2 (preuve) |
|---|---|---|---|---|
| Analyser | Mur gauche | Niveau 3 — Conseiller pour l'amélioration des processus | AC31.02 — Conseiller un type d'organisation (conseil franchise) | AC31.03 — Proposer des améliorations des processus (kit macros KPMG) |
| Décider | Mur fond | Niveau 3 — Concourir à la prise de décision | AC32.02 — Exploiter les données pour la décision (dashboard Etu'Explore) | AC32.03 — Participer à la décision sous contraintes (RCF adopt) |
| Piloter | Mur droit | Niveau 3 — Améliorer les relations entre les parties prenantes | AC33.01 — Animer une équipe (SAE reprise) | AC33.02 — Mener un projet collaboratif (Etu'Explore) |
| Produire | Sol | Optimiser l'information comptable, fiscale et sociale | AC34.01GC2F — Résoudre les pb d'évaluation actifs/passifs (DCF MONAP) | AC34.03GC2F — Diagnostic/audit pour conseiller (VDD SFR) |
| Évaluer | Plafond | Optimiser les outils d'analyse et de prévision | AC35.03GC2F — Plan de financement équilibré (PFI MONAP) | AC35.04GC2F — Gestion de trésorerie court terme (Tréso MONAP) |

Le détail complet de chaque preuve (interprétations, AC démontrés, fichiers) est dans `CONTENT.md`. Plusieurs interprétations restent à rédiger par Oscar (marquées `[TODO]` dans `CONTENT.md`).
