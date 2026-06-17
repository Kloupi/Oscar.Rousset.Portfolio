# HISTORIQUE_PROJET.md — Journal du portfolio Oscar Rousset

Journal chronologique des décisions et grandes étapes du projet. Le plus récent en haut.
Ce fichier n'existait pas avant la session de juin 2026 ; les entrées antérieures sont
reconstituées à partir de l'état du dépôt et des fichiers `.md` d'origine.

---

## Session — 2026-06-17 — Refonte : images IA + arborescence de preuves par AC

**Décision majeure : abandon du « tout SVG/CSS pur » pour les deux scènes immersives.**
L'intro (façade d'immeuble) et la scène principale (bureau isométrique) ne sont plus dessinées
en SVG/CSS : elles deviennent des **images générées par IA**, fournies par Oscar. Le reste du
concept (palette, typographies, stack HTML/CSS/JS + GSAP, esprit immersif « on explore, on ne
scrolle pas ») reste valable.

### Ce qui change
1. **Nouvelle séquence d'intro** par images, en étapes discrètes (clic/scroll, pas de parallax souris) :
   - P0 `Image nuage init P0.png` (nuages) → dissipation → P1 `Image de fonds P1.png` (ville)
   - fenêtre interactive sur P1 (pulse/glow) → P2 `Image de fonds P2.png` (fenêtre éclairée)
   - zoom + transition → chambre `Chambre P3.png`.
2. **Scène principale = la chambre** (image IA), remplace le bureau isométrique CSS.
   - 5 surfaces = 5 compétences ; **2 cadres déjà dessinés par mur = 2 AC = 2 preuves**.
   - Interaction = **hotspots HTML invisibles** positionnés en `%` par-dessus les cadres, avec
     hover (zoom/lueur) ; clic → overlay de preuve.
   - Feuille sur le lit → CV ; écran d'ordi → vidéo (placeholder) ; bouton audio conservé.
3. **Affichage des preuves = overlay plein écran** avec navigation préc./suiv. au sein d'une même
   compétence + lien externe (Google Doc/Drive) pour les traces volumineuses.
4. **Nouvelle arborescence `/preuves/`** par compétence → par AC (déjà en place sur le disque) :
   `preuves/<n-Compétence>/<ACxx.yy  Intitulé>/` contenant le poster PDF, le `.pptx` source et la/les `Trace - ...`.

### Mapping des 10 AC (déduit de l'arborescence réelle sur disque)
| Compétence | Mur | AC 1 | AC 2 |
|---|---|---|---|
| Analyser | gauche | AC31.02 Conseiller un type d'organisation (conseil franchise) | AC31.03 Améliorations des processus (kit macros KPMG) |
| Décider | fond | AC32.02 Exploiter les données (dashboard Etu'Explore) | AC32.03 Décision sous contraintes (RCF adopt) |
| Piloter | droit | AC33.01 Animer une équipe (SAE reprise) | AC33.02 Projet collaboratif (Etu'Explore) |
| Produire | sol | AC34.01GC2F Évaluation actifs/passifs (DCF MONAP) | AC34.03GC2F Diagnostic/audit (VDD SFR) |
| Évaluer | plafond | AC35.03GC2F Plan de financement (PFI MONAP) | AC35.04GC2F Trésorerie court terme (Tréso MONAP) |

### Fichiers `.md` mis à jour cette session
- `CLAUDE.md` : section « Concept visuel », arborescence, conventions, tableau des compétences.
- `CONTENT.md` : passage à 2 AC / 2 preuves par compétence ; `[TODO]` sur les interprétations à rédiger.
- `HISTORIQUE_PROJET.md` : création de ce journal.
- `PROMPTS.md` : réécriture de la séquence (images, hotspots, overlay, arborescence preuves).

### Intégration coordonnées + décisions (2e passe, même jour) — Oscar a fourni les coordonnées
- **Fenêtre d'intro (P1/P2)** intégrée : `left 48,26% / top 44,21% / width 5,56% / height 8,89%`, centre du zoom `51,04% / 48,66%`.
- **Intro reconstruite** en couches P1/P2/P0 (`index.html`, `css/intro.css`, `js/intro.js`) : dissipation des nuages au clic/scroll, fenêtre pulsante, allumage P2 + zoom → chambre.
- **10 cadres + 2 boutons** posés en hotspots `%` dans `index.html` (table complète dans `CONTENT.md` › « Cartographie des cadres »).
- **Mapping mur→compétence confirmé** (gauche=Analyser, fond=Décider, droit=Piloter, sol=Produire, plafond=Évaluer).
- **`PREUVE_1.PPT` n'existe pas** dans le dépôt → le cadre « Investment Portfolio » (Sol/Produire) est affecté à **AC34.01 (DCF MONAP)**, seul cadre Produire restant. À revoir si un fichier `PREUVE_1` distinct apparaît.
- **Fashion Day : retiré** du portfolio (décision Oscar) — supprimé de `CONTENT.md` et `CLAUDE.md`. NB : `activites.html` peut encore contenir une carte Fashion Day → à nettoyer lors de la refonte de cette page.
- **MONAP** : pas de fusion ; chaque preuve garde son AC/mur/dossier.
- **`index.html`** : références d'images corrigées vers les vrais fichiers (`Image de fonds P1/P2.png`, `Image nuage init P0.png`, `Chambre P3.png`).

### Ajustements d'animation (3e passe, même jour)
- **Transition nuages P0→P1** retravaillée : effet « on traverse les nuages » (zoom 1→1,45 + flou 0→34px + fondu) au lieu d'un simple fondu (`js/intro.js` › `dissipateClouds`).
- **Zone de sortie** ajoutée sur la fenêtre du fond de la chambre (coords estimées `43% / 29% / 12% / 23%` sur `Chambre P3.png`, à ajuster) : `data-action="exit"` → `returnToCity()` ramène à la ville (P1) ; recliquer la fenêtre éclairée re-rentre dans la chambre. Fonctionne aussi au retour depuis une page compétence (fonctions/listeners branchés avant le court-circuit `room_unlocked`). **Rendu discret** (décision Oscar) : pas de label « Sortir » ni de point pulsant, seulement un léger halo au survol (`.hotspot--exit`).

### Overlay de preuve (4e passe, même jour)
- **Bug corrigé :** l'ancien `openCompetence` zoomait via une table `SURFACE_ORIGINS` figée (1 origine par compétence, issue de l'ancien layout) → le zoom partait au mauvais endroit avec 2 cadres/mur. Supprimé.
- **Nouveau `js/competence.js` :** au clic sur un cadre, le **poster PDF** (`data-poster`) s'affiche dans `#modal-proof` et **grandit depuis le cadre cliqué** (origine = `getBoundingClientRect()` du hotspot, donc toujours juste) jusqu'à un grand cadre centré. **Chambre floutée** en fond (`backdrop-filter`), pas masquée. Fermeture × / clic fond / Échap. `room.js` appelle désormais `openProof(spot)`.
- **Contenu = uniquement le PDF** (décision Oscar : pas de texte, pas de page compétence intermédiaire). Les pages `competences/*.html` ne sont plus ouvertes depuis la chambre (encore liées depuis les cartes mobiles).
- **Différé** (toujours souhaité à terme) : navigation préc./suivant entre les 2 AC d'un mur + liens documents en ligne.

### Affinages survol / preuve / halo (5e passe, même jour)
- **Surfaces = compétences au survol :** 5 zones `.surface` (clip-path polygones des murs/sol/plafond) sous les cadres (z-index 1 vs 4). Au survol d'une surface — ou d'un de ses cadres — le **nom de la compétence** apparaît.
- **Labels de cadre réduits au code AC** (ex. `AC31.03`), le nom de la compétence étant porté par la surface.
- **Zone d'affichage du poster agrandie** (`competence.js` › `proofTargetRect` : marge 24px, plafonds 1500×1180).
- **Halo de la fenêtre d'intro renforcé** (`intro.css` : 380%, dégradé plus opaque, pulse plus marqué).

### Correction surfaces (6e passe, même jour) — coords précises fournies par Oscar
- **Plus aucun surlignage de zone** : suppression du voile doré ; au survol, **seul le label** apparaît (fondu léger). `.surface { background: transparent }`, jamais de fill.
- **Polygones isométriques exacts** (boîte 844×474, sommets A–H) appliqués aux 5 `.surface` (plafond `15.8/0 … `, etc.).
- **Labels découplés des surfaces** : sortis du `clip-path` (éléments `.surface-label[data-label]` séparés, `z-index 6`, `pointer-events:none`) → jamais rognés, centrés via `translate(-50%,-50%)` sur les points exacts fournis (Évaluer 61.7/18.7, Décider 48.9/30.5, Analyser 13.0/76.2, Piloter 88.3/68.5, Produire 33.5/89.5).
- `room.js` : survol surface **ou** cadre → `setCompetenceLabel(slug)` active le bon label.

### Sauvegarde Version 1 + publication GitHub (7e passe, même jour)
- **Blocage chemin long résolu :** dossier `AC34.01GC2F  Résoudre…charges et produ` (138 car., chemin total 309 > limite Windows 260, `LongPathsEnabled=0`) **renommé** en `AC34.01GC2F  Évaluation actifs-passifs` (chemin 209). Référence `data-poster` mise à jour dans `index.html` ; docs alignées.
- **Fichiers d'hébergement ajoutés :** `.nojekyll` (désactive Jekyll sur Pages), `.gitignore` (ignore `.claude/`, fichiers OS/Office), `README.md` (présentation + lancement local + structure).
- **Sauvegarde « Version 1 » :** copie complète du site dans un dossier frère `..\Sprint\Portfolio_v1` (57/57 fichiers, 10/10 posters, `.claude` exclu).
- **Git :** Git for Windows 2.54 installé par Oscar. Dépôt initialisé (`git init -b main`, `core.longpaths true`). Identité : `Oscar Rousset <racsoloma@gmail.com>`. Commit initial **« Version 1 »** = `04d65c0` (57 fichiers).
- **Publication GitHub :** remote `origin` = `https://github.com/Kloupi/Oscar.Rousset.Portfolio.git`, `git push -u origin main` **réussi**.
- **GitHub Pages :** à activer côté Oscar (Settings → Pages → branche `main`, dossier `/root`). URL cible : **https://kloupi.github.io/Oscar.Rousset.Portfolio/**.

### Reste à trancher / à fournir par Oscar
- **Activer GitHub Pages** (Settings → Pages) puis vérifier que le site répond.
- **Vidéo de présentation** : remplacer le placeholder du modal vidéo (lien à fournir) → étape « vidéo » de `PROMPTS.md`.
- ✅ **Nouveau CV fourni** : `assets/documents/CV_Oscar_Rousset_FR.pdf` (remplace `CV.pdf` ; références mises à jour dans `index.html`).
- **Interprétations manquantes** pour plusieurs AC (conseil franchise, RCF adopt, SAE reprise, DCF/PFI/Tréso MONAP, VDD SFR) → `[TODO]` dans `CONTENT.md` (utiles si on réactive les pages compétences / la navigation).
- **Liens en ligne** (VDD SFR, Excel SFR, guide macros VBA) : à fournir.
- **Accès « activités » sur desktop** : la feuille du lit est désormais le CV ; il n'y a plus de hotspot activités dans la scène (seulement la carte mobile). Décider d'un point d'entrée desktop (coords d'un objet ou lien discret).
- **Nom de la chambre :** harmonisé sur `Chambre P3.png` (5500×3072) — le fichier a été renommé de « P4 » vers « P3 » par Oscar entre les deux passes ; code et docs alignés.
- Fichiers `PREUVES_SESSION.md` et `ETAT_AVANCEMENT_SESSION.md` cités par le prompt de refonte **absents du dépôt** ; mapping repris de l'arborescence `/preuves/`.

---

## État antérieur — Concept initial (jusqu'à juin 2026)

- Concept « tout SVG/CSS pur, aucune image externe » : intro = façade d'immeuble SVG avec zoom
  vers une fenêtre ; scène principale = bureau en perspective isométrique dessiné en SVG.
- 5 compétences GC2F mappées sur 5 surfaces (murs, sol, plafond), 1 ensemble de preuves par compétence.
- Preuves dans un dossier `/preuves/` à plat (`preuve_KPMG_VBA.pptx`, `preuve_SAE_finance.pptx`,
  `preuve_valorisation_SFR_2.pptx`, `preuve_etuexplore.pptx`, `preuve_fashion_day.pptx`).
- Stack confirmée : HTML/CSS/JS pur + GSAP via CDN, Google Fonts (Playfair Display, Inter, JetBrains Mono).
- Implémentation partielle déjà présente : `index.html` (intro + chambre + modals CV/vidéo + audio),
  `css/` (main, intro, room, competence), `js/` (intro, room, competence, audio), 5 pages
  `competences/*.html`, `activites.html`. Une première bascule vers des images avait été amorcée
  dans `index.html` (balises `<img>` + hotspots), mais avec des noms de fichiers provisoires.
