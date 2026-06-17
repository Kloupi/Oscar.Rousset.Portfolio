# PROMPTS.md — Séquence de prompts pour Claude Code
## Portfolio Oscar Rousset — version « images IA » (refonte juin 2026)

Ce fichier est ton guide de travail. Ouvre-le à côté de Claude Code dans VS Code.
Copie-colle chaque prompt dans l'ordre, et attends que chaque étape soit terminée
et validée avant de passer à la suivante.

> ⚠️ **Changement majeur :** la scène d'intro et la chambre ne sont plus en SVG/CSS pur.
> Elles reposent sur des **images générées par IA** (`assets/image/`), par-dessus lesquelles on
> pose des **zones cliquables invisibles (hotspots)** positionnées en `%`. Le reste de l'UI
> (overlays, modals, pages compétences) reste en CSS pur + GSAP via CDN.
> Lis `CLAUDE.md`, `CONTENT.md` et `HISTORIQUE_PROJET.md` avant de coder.

### Assets réels (noms exacts — attention aux espaces)
- `assets/image/Image nuage init P0.png` (P0, nuages)
- `assets/image/Image de fonds P1.png` (P1, ville)
- `assets/image/Image de fonds P2.png` (P2, fenêtre éclairée)
- `assets/image/Chambre P3.png` (scène chambre)
- `assets/audio/Music website.mp3` · `assets/documents/CV.pdf`
- Posters : `preuves/<n-Compétence>/<ACxx.yy  Intitulé>/preuve_*_poster.pdf`

---

### ÉTAPE 0 — Prise de connaissance du projet

```
Lis CLAUDE.md, CONTENT.md et HISTORIQUE_PROJET.md à la racine.
Confirme-moi ce que tu as compris :
- la séquence d'intro par images P0 → P1 → P2 → chambre (étapes au clic/scroll) ;
- la chambre image avec 2 cadres = 2 AC par mur (10 hotspots), feuille/lit = CV,
  écran d'ordi = vidéo, bouton audio ;
- l'overlay plein écran de preuve avec navigation préc./suivant + lien externe ;
- l'arborescence /preuves/<Compétence>/<AC>/.
Ne code rien avant ma confirmation.
```

---

### ÉTAPE 1 — Nettoyage des références et structure CSS

```
Sans toucher au design, mets index.html en cohérence avec les fichiers réels :
- corrige les <img> pour pointer vers les vrais fichiers de assets/image/
  (Image nuage init P0.png, Image de fonds P1.png, Image de fonds P2.png, Chambre P3.png) ;
- vérifie data-audio-path = "assets/audio/Music website.mp3" et le PDF = "assets/documents/CV.pdf" ;
- garde css/main.css (variables :root) inchangé.
Liste les références cassées que tu corriges.
```

---

### ÉTAPE 2 — Séquence d'intro par images (P0 → P1 → P2 → chambre)

```
Dans index.html / css/intro.css / js/intro.js, implémente l'intro en étapes discrètes
(déclenchées au clic OU au scroll — PAS de parallax continu à la souris) :

Empilement (z-index) : P1 au fond, P0 (nuages) au premier plan, par-dessus P1.
1. Affichage initial : P0 visible plein écran (+ nom "Oscar Rousset" en overlay, bouton "Entrer").
2. Au clic/scroll : GSAP dissipe progressivement P0 (opacity + léger scale) → révèle P1 (la ville).
3. Sur P1, une fenêtre précise = zone interactive : hotspot invisible avec animation pulse/glow
   (box-shadow animée en --color-accent) pour signaler qu'elle est cliquable.
   Coordonnées de la fenêtre (en %) : [DEMANDER À OSCAR ou estimer visuellement sur l'image].
4. Au clic sur la fenêtre : crossfade P1 → P2 (même vue, fenêtre plus éclairée), puis zoom
   progressif (scale, transformOrigin sur la fenêtre) + transition vers la chambre.
   À la fin : masquer #intro, afficher #room, déclencher l'audio.

Durées fluides, easing power2.inOut. Toute la logique dans js/intro.js.
```

---

### ÉTAPE 3 — Chambre : hotspots des 10 cadres (2 AC par mur)

```
Dans index.html / css/room.css / js/room.js, sur l'image Chambre P3.png :

- Mets en place 10 hotspots-cadres invisibles (boutons HTML positionnés en %),
  2 par compétence, alignés sur les cadres déjà dessinés dans l'image :
    Mur gauche  → Analyser : AC31.02, AC31.03
    Mur fond    → Décider  : AC32.02, AC32.03
    Mur droit   → Piloter  : AC33.01, AC33.02
    Sol         → Produire : AC34.01, AC34.03
    Plafond     → Évaluer  : AC35.03, AC35.04
  Chaque hotspot porte data-competence, data-ac et data-poster (chemin du PDF).
  Coordonnées (% left/top/width/height, + clip-path si perspective) : à caler visuellement
  sur l'image ; pars du mapping provisoire déjà présent dans index.html et dédouble-le.
- Hover : signal clair "c'est un bouton" (léger zoom, lueur/box-shadow --color-accent, ombre)
  + label compétence/AC en Playfair Display.
- Garde les 3 hotspots utilitaires : feuille/lit → CV, écran d'ordi → vidéo, (option) carnet → activités.
- Au clic sur un cadre : ouvre l'overlay de preuve (étape 4) avec l'AC ciblé.

Conserve la version mobile en cartes scrollables (remplace l'image < 768px).
```

---

### ÉTAPE 4 — Overlay de preuve plein écran avec navigation

```
Crée l'overlay de preuve (dans index.html + css/room.css + js/room.js) :

- Overlay plein écran (fond sombre opacité ~0.9), au-dessus de la chambre.
- Affiche le poster PDF de l'AC (preuve_*_poster.pdf) en grand via <iframe> ou <embed>,
  lisible (tableaux financiers, formules).
- En-tête : nom de la compétence + intitulé de l'AC (depuis CONTENT.md).
- Navigation : boutons "‹ Preuve précédente" / "Preuve suivante ›" qui basculent entre les
  2 AC de la MÊME compétence (boucle sur 2). Bouton fermer (×) + fermeture sur Échap / clic fond.
- Bloc "Aller plus loin" : si l'AC a des traces volumineuses, afficher un lien cliquable vers
  le document complet en ligne (Google Doc/Drive). URLs depuis CONTENT.md ([TODO] tant qu'absentes).
- Animation d'ouverture GSAP (fade + scale 0.96→1). L'audio baisse/coupe pendant l'overlay si tu veux.

Les chemins de poster et les intitulés d'AC viennent de CONTENT.md / de l'arborescence /preuves/.
```

---

### ÉTAPE 5 — Pages de compétences (template + 5 pages)

```
Mets à jour js/competence.js et les 5 pages competences/*.html pour refléter 2 AC / 2 preuves :

Chaque page compétence :
1. Header : nom compétence (Playfair Display) + niveau atteint (sous-titre).
2. Définition courte (CONTENT.md).
3. Section "Mes preuves" : 2 cartes (une par AC) avec :
   - intitulé de l'AC + nom de la preuve ;
   - interprétation (CONTENT.md ; laisser le [TODO] visible tant qu'Oscar n'a pas rédigé) ;
   - bouton "Voir la preuve" → ouvre le poster PDF (ou l'overlay) ;
   - le cas échéant, lien vers le document complet en ligne.
4. Bouton "← Retour à la chambre" (index.html).

N'invente aucun contenu : reprends strictement CONTENT.md, conserve les [TODO].
```

---

### ÉTAPE 6 — Audio

```
Dans js/audio.js : charge assets/audio/Music website.mp3, lecture en boucle, volume 0.25,
démarrage au 1er clic / à l'entrée dans la chambre (politique navigateurs). Bouton mute/unmute
fixe en bas à droite (déjà dans index.html), état mémorisé en localStorage, présent sur toutes
les pages (index + competences + activites). Coupe la musique à l'ouverture du modal vidéo,
reprise à la fermeture.
```

---

### ÉTAPE 7 — Modal CV & placeholder vidéo

```
Vérifie/complète les deux modals de index.html :
1. CV : iframe sur assets/documents/CV.pdf + bouton "Télécharger le CV" (download) + fermer.
2. Vidéo : placeholder "Vidéo de présentation — à venir" + commentaire TODO pour l'iframe future.
   La musique se coupe à l'ouverture et reprend à la fermeture.
Animations d'ouverture GSAP (fade + scale).
```

---

### ÉTAPE 8 — Page activités (double entrée) & responsive

```
1. activites.html : double entrée PAR ACTIVITÉ (CONTENT.md, section "Par activité"),
   chaque activité listant ses AC couverts avec liens vers les pages compétences.
   Traite le statut de Fashion Day selon la décision d'Oscar (complémentaire ou retiré).
2. Responsive < 768px : la chambre (image+hotspots) est remplacée par des cartes scrollables
   (5 compétences ; idéalement 10 sous-cartes AC). Modals/overlays en plein écran.
   Boutons ≥ 44px, contraste OK, bouton audio partout, posters PDF bien liés.
3. Teste l'ensemble et liste ce qui manque.
```

---

### ÉTAPE 9 — Intégration de la vidéo (quand elle est prête)

```
URL de la vidéo de pitch : [COLLER L'URL ICI]
Dans index.html, remplace le placeholder (commentaire TODO du modal vidéo) par une iframe
YouTube/Vimeo (autoplay=0, width 100%, ratio 16/9). La musique se coupe à l'ouverture et
reprend à la fermeture. Mets à jour le [TODO] vidéo dans CONTENT.md avec l'URL.
```

---

## Récapitulatif — Ordre de travail recommandé

1. **Étape 0–1** : prise de connaissance + nettoyage des références d'assets (débloque tout le reste).
2. **Étape 2** : intro images P0 → P1 → P2 → chambre (le « wow » d'entrée).
3. **Étape 3** : hotspots des 10 cadres dans la chambre.
4. **Étape 4** : overlay de preuve + navigation (cœur du contenu portfolio).
5. **Étape 5** : pages compétences alignées sur 2 AC.
6. **Étape 6–7** : audio + modals CV/vidéo.
7. **Étape 8** : activités + responsive + recette.
8. **Étape 9** : vidéo, quand tournée et hébergée.

### À fournir par Oscar en parallèle
- Coordonnées (%) de la fenêtre interactive (P1/P2) et des 10 cadres (chambre) — ou validation des estimations.
- Interprétations `[TODO]` de CONTENT.md (conseil franchise, RCF adopt, SAE reprise, DCF/PFI/Tréso MONAP, VDD SFR…).
- Liens Google Doc/Drive (VDD SFR, Excel SFR, guide macros VBA).
- Décision sur Fashion Day (garder en complémentaire / retirer).
- Confirmation du regroupement par activité (notamment « MONAP »).
- URL de la vidéo de pitch (étape 9).
```
