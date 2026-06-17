# Portfolio — Oscar Rousset (BUT GEA GC2F)

Portfolio web immersif : on entre par une fenêtre dans une chambre-bureau où chaque
mur / sol / plafond représente une compétence GC2F, et chaque cadre ouvre une preuve
(poster PDF qui « vient vers » le visiteur).

## Lancer en local
Site statique, sans build. Ouvrir `index.html` dans un navigateur (Chrome / Edge / Firefox).
Pour éviter les restrictions `file://` (chargement des PDF), servir le dossier via un petit
serveur local, par exemple :
- VS Code → extension **Live Server**, ou
- `python -m http.server` puis http://localhost:8000

## Stack
HTML / CSS / JavaScript pur + **GSAP** (via CDN) + **Google Fonts** (Playfair Display,
Inter, JetBrains Mono). Aucun framework, aucun bundler.

## Hébergement
**GitHub Pages** (branche `main`, dossier racine). Le fichier `.nojekyll` désactive Jekyll.

## Structure
- `index.html` — intro (images P0 → P2) + chambre interactive + overlay de preuve
- `activites.html` — double entrée par activité
- `competences/` — pages détaillées par compétence (entrée mobile)
- `css/`, `js/` — styles et logique (intro, chambre, overlay, audio)
- `assets/` — images de scène, audio, CV
- `preuves/` — preuves classées par compétence → apprentissage critique (poster PDF + source + traces)
- `CLAUDE.md`, `CONTENT.md`, `HISTORIQUE_PROJET.md`, `PROMPTS.md` — documentation projet

## À venir (version suivante)
- Vidéo de présentation (remplacer le placeholder du modal vidéo)
- CV mis à jour
