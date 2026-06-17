# CONTENT.md — Contenu éditorial du portfolio
## Oscar Rousset — BUT GEA GC2F — IUT de Paris Rives de Seine

Ce fichier contient tout le contenu textuel et les références aux fichiers du site.
Les sections marquées `[TODO]` sont à compléter par Oscar avant de coder la section correspondante.

> **Refonte de juin 2026 :** structure passée de « 1 ensemble de preuves par compétence » à **2 apprentissages critiques (AC) = 2 preuves par compétence** (10 preuves au total), alignée sur l'arborescence réelle `/preuves/`. Les images de scène (intro + chambre) remplacent le SVG/CSS pur. Voir `CLAUDE.md` et `HISTORIQUE_PROJET.md`.

---

## Identité

**Nom complet :** Oscar Rousset
**Formation :** BUT Gestion des Entreprises et des Administrations, parcours GC2F (Gestion Comptable, Fiscale et Financière)
**Établissement :** IUT de Paris Rives de Seine — Université Paris Cité
**Année :** BUT 3 — 2025-2026
**Email de contact :** oscar.rousset.lm@gmail.com
**LinkedIn :** https://www.linkedin.com/in/oscar-louis-marius-rousset
**Téléphone :** +33 7 69 34 97 49

---

## Page d'accueil

**Accroche principale (headline) :** Étudiant en gestion spécialisé en finance, orienté comptabilité et analyse financière.

**Sous-titre :** BUT GEA · Parcours GC2F · IUT de Paris Rives de Seine

**Séquence d'intro (images IA) :**
- P0 — `assets/image/Image nuage init P0.png` (nuages, premier plan)
- P1 — `assets/image/Image de fonds P1.png` (ville la nuit)
- P2 — `assets/image/Image de fonds P2.png` (fenêtre éclairée)
- Chambre — `assets/image/Chambre P3.png` (scène principale)
- Fenêtre interactive sur P1/P2 (coordonnées fournies, mesurées par diff P1/P2) : `left 48,26% · top 44,21% · width 5,56% · height 8,89%` (centre du zoom : `51,04% / 48,66%`). ✅ intégré dans `index.html` / `js/intro.js`.

**Vidéo de pitch :**
- Durée : moins de 2 minutes
- Hébergement : [TODO — lien YouTube non-listé ou Vimeo à ajouter après tournage]
- Emplacement dans la chambre : l'écran d'ordinateur sur le bureau

**Musique de fond :**
- Fichier : `assets/audio/Music website.mp3` (⚠️ espace dans le nom, pas underscore)
- Comportement : se déclenche à l'entrée dans la chambre / au premier clic ; bouton mute/unmute visible en bas à droite

---

## CV

- Fichier PDF : `assets/documents/CV.pdf` ✅
- Prévisualisable sur le site : oui (via modal / overlay)
- Téléchargeable : oui (bouton de téléchargement direct, nom suggéré `CV_Oscar_Rousset.pdf`)
- Emplacement dans la chambre : la feuille posée sur le lit

---

## Cartographie des cadres (chambre `Chambre P3.png`, 5500×3072)

Coordonnées en % (left/top/width/height) du coin haut-gauche de chaque zone, fournies par Oscar et intégrées dans `index.html`. 1 cadre = 1 AC = 1 preuve.

| Mur | Compétence | Cadre (libellé image) | AC | left% | top% | width% | height% |
|---|---|---|---|---|---|---|---|
| Gauche | Analyser | Q3 Revenue Breakdown | AC31.03 | 12,38 | 9,73 | 7,71 | 21,42 |
| Gauche | Analyser | Balance Sheet Summary | AC31.02 | 6,15 | 31,64 | 11,05 | 25,91 |
| Fond | Décider | Risk Assessment Matrix | AC32.03 | 35,31 | 28,35 | 4,20 | 9,93 |
| Fond | Décider | Financial Analysis | AC32.02 | 56,84 | 33,37 | 5,33 | 12,34 |
| Droit | Piloter | Stock Performance | AC33.01 | 69,16 | 23,99 | 6,15 | 26,46 |
| Droit | Piloter | Cash Flow Analysis | AC33.02 | 79,85 | 30,01 | 15,00 | 25,00 |
| Plafond | Évaluer | Margin Evolution | AC35.04 | 34,56 | 5,47 | 10,44 | 6,51 |
| Plafond | Évaluer | KPI Dashboard | AC35.03 | 47,33 | 4,69 | 22,38 | 6,87 |
| Sol | Produire | Debt vs Equity | AC34.03 | 49,16 | 86,07 | 19,85 | 11,10 |
| Sol | Produire | Investment Portfolio | AC34.01 | 68,15 | 86,04 | 20,49 | 11,13 |

Boutons utilitaires :

| Élément | Action | left% | top% | width% | height% |
|---|---|---|---|---|---|
| Écran d'ordinateur (bureau) | Vidéo de pitch | 29,09 | 49,48 | 6,18 | 7,16 |
| Feuille sur le lit | CV (PDF) | 59,93 | 64,49 | 10,24 | 7,91 |

> **« Investment Portfolio » = AC34.01 (DCF MONAP).** Le label provisoire `PREUVE_1.PPT` n'existe pas dans le dépôt ; le seul cadre Produire restant à placer était AC34.01, qui lui est donc affecté. À ré-ouvrir/valider si un fichier `PREUVE_1` distinct apparaît.

---

## Compétence 1 — Analyser
*Analyser les processus de l'organisation dans son environnement*

**Surface dans la chambre :** Mur gauche (2 cadres)
**Niveau atteint :** Niveau 3 — Conseiller pour l'amélioration des processus de l'organisation

**Définition courte (affichée sur le site) :**
Analyser, c'est comprendre une organisation dans sa globalité — ses enjeux, ses processus, ses parties prenantes — pour être capable de proposer des améliorations concrètes. Au fil de ma formation et de mon alternance chez KPMG, j'ai appris à ne pas me contenter d'observer : j'analyse pour recommander.

### Preuve AC31.02 — Conseiller un type d'organisation
- Apprentissage critique : **AC31.02 — Conseiller un type d'organisation**
- Cadre dans la chambre : Mur gauche, cadre 1
- Poster (overlay) : `preuves/1-Analyser/AC31.02  Conseiller un type d'organisation/preuve_AC31-02_conseil_franchise_poster.pdf`
- Source : `.../preuve_AC31-02_conseil_franchise.pptx`
- Trace : `.../Trace - AC31.02  Conseiller un type d'organisation.pdf`
- Sujet : conseil sur un type d'organisation (franchise)
- Interprétation : [TODO — interprétation à rédiger par Oscar]
- Lien document complet en ligne : [TODO — si pertinent]

### Preuve AC31.03 — Proposer des améliorations des processus
- Apprentissage critique : **AC31.03 — Proposer des améliorations des processus**
- Cadre dans la chambre : Mur gauche, cadre 2
- Poster (overlay) : `preuves/1-Analyser/AC31.03  Proposer des améliorations des processus/preuve_AC31-03_kit_macros_KPMG_poster.pdf`
- Source : `.../preuve_AC31-03_kit_macros_KPMG.pptx`
- Trace : `.../Trace - Guide_integration_macros_VBA.docx`
- Mission d'origine : Alternance BUT3 — KPMG, pôle Asset Management
- Interprétation : Avant de coder quoi que ce soit, j'ai mené une enquête auprès de 12 alternants pour identifier les 4 tests d'audit les plus chronophages sur les workpapers Excel. Cette analyse préalable du besoin — identifier les enjeux, qualifier les processus existants, évaluer leur performance — est au cœur de la compétence Analyser niveau 3. La solution (kit de 4 macros VBA via PERSONAL.XLSB) est directement issue de ce diagnostic : je n'ai pas proposé une amélioration générique, mais une réponse précise à un problème identifié par les acteurs du processus eux-mêmes.
- Lien document complet en ligne (guide d'installation macros VBA) : [TODO — lien Google Doc/Drive à fournir par Oscar]

---

## Compétence 2 — Décider
*Aider à la prise de décision*

**Surface dans la chambre :** Mur du fond (2 cadres)
**Niveau atteint :** Niveau 3 — Concourir à la prise de décision

**Définition courte :**
Décider, c'est transformer des données brutes en information utile — structurée, fiable, exploitable. C'est aussi savoir choisir les bons outils pour que l'information produite serve vraiment la décision. Chez KPMG et dans mes projets académiques, j'ai développé une approche rigoureuse de la donnée au service de l'action.

### Preuve AC32.02 — Exploiter les données pour accompagner la prise de décision
- Apprentissage critique : **AC32.02 — Exploiter les données pour accompagner la prise de décision**
- Cadre dans la chambre : Mur du fond, cadre 1
- Poster (overlay) : `preuves/2-Décider/AC32.02  Exploiter les données pour accompagner la prise de décision/preuve_AC32-02_dashboard_etuexplore_poster.pdf`
- Source : `.../preuve_AC32-02_dashboard_etuexplore.pptx`
- Trace : `.../Trace - AC32.02  Exploiter les données pour accompagner la prise de décision.png`
- Projet d'origine : SAE Etu'Explore (plateforme Wix) — volet données / dashboard
- Interprétation : Sur Etu'Explore, le système de notation, le compteur collectif et le suivi des balades produisent des données d'usage. Les structurer dans un dashboard permet de transformer une activité communautaire en information exploitable pour orienter les décisions (quels arrondissements/balades mettre en avant, quels contenus enrichir). [TODO — à confirmer/préciser par Oscar : ce texte est adapté de l'ancienne version, valider qu'il décrit bien la trace dashboard livrée]

### Preuve AC32.03 — Participer à la prise de décision en fonction des contraintes identifiées
- Apprentissage critique : **AC32.03 — Participer à la prise de décision en fonction des contraintes identifiées**
- Cadre dans la chambre : Mur du fond, cadre 2
- Poster (overlay) : `preuves/2-Décider/AC32.03  Participer à la prise de décision en fonction des contraintes identifiées/preuve_AC32-03_RCF_adopt_poster.pdf`
- Source : `.../preuve_AC32-03_RCF_adopt.pptx`
- Trace : `.../Trace - AC32.03  Participer à la prise de décision en fonct.pdf`
- Sujet : RCF adopt (prise de décision sous contraintes)
- Interprétation : [TODO — interprétation à rédiger par Oscar]

---

## Compétence 3 — Piloter
*Piloter les relations avec les parties prenantes de l'organisation*

**Surface dans la chambre :** Mur droit (2 cadres)
**Niveau atteint :** Niveau 3 — Améliorer les relations entre les parties prenantes

**Définition courte :**
Piloter, c'est faire avancer un projet collectif en mobilisant les bonnes personnes, avec les bons outils de communication, au bon moment. C'est une compétence que j'ai exercée aussi bien dans des projets académiques collaboratifs que dans des initiatives personnelles menées de bout en bout.

### Preuve AC33.01 — Animer une équipe
- Apprentissage critique : **AC33.01 — Animer une équipe**
- Cadre dans la chambre : Mur droit, cadre 1
- Poster (overlay) : `preuves/3-Piloter/AC33.01  Animer une équipe/preuve_AC33-01_SAE_reprise_poster.pdf`
- Source : `.../preuve_AC33-01_SAE_reprise.pptx`
- Projet d'origine : SAE reprise d'entreprise [TODO — confirmer l'intitulé exact de la SAE]
- Interprétation : [TODO — interprétation à rédiger par Oscar]

### Preuve AC33.02 — Mener un projet collaboratif
- Apprentissage critique : **AC33.02 — Mener un projet collaboratif**
- Cadre dans la chambre : Mur droit, cadre 2
- Poster (overlay) : `preuves/3-Piloter/AC33.02  Mener un projet collaboratif/preuve_AC33-02_etuexplore_poster.pdf`
- Source : `.../preuve_AC33-02_etuexplore.pptx`
- SAE d'origine : SAE BUT GEA GC2F — plateforme Etu'Explore
- Interprétation : Sur Etu'Explore, j'ai mené un projet collaboratif de A à Z avec un camarade : répartition des rôles, développement en parallèle de modules différents (moi sur l'infrastructure et les systèmes, l'autre sur le contenu), puis intégration cohérente. La gamification (badges, défis mensuels, compteur collectif) que nous avons conçue ensemble témoigne d'une capacité à enrichir un projet collaboratif par des propositions créatives portées collectivement.

---

## Compétence 4 — Produire
*Produire l'information comptable, fiscale et sociale de l'organisation*

**Surface dans la chambre :** Sol (2 cadres)
**Niveau atteint :** Optimiser l'information comptable, fiscale et sociale produite

**Définition courte :**
Produire, c'est maîtriser les règles comptables, fiscales et sociales pour générer une information fiable, sécurisée et conforme. Dans mon alternance chez KPMG et mes SAE de finance, j'ai appris que produire une bonne information, c'est autant une question de rigueur technique que de capacité à sécuriser les processus qui la génèrent.

### Preuve AC34.01GC2F — Résoudre les problèmes comptables d'évaluation des actifs et passifs
- Apprentissage critique : **AC34.01GC2F — Résoudre les problèmes comptables spécifiques à l'évaluation des actifs et passifs et à la détermination des charges et produits**
- Cadre dans la chambre : Sol, cadre 1
- Poster (overlay) : `preuves/4-Produire/AC34.01GC2F  Évaluation actifs-passifs/preuve_AC34-01_résoudre les pb d'évaluation d'actif et de passif_poster.pdf`
- Source : `.../preuve_AC34-01_DCF_MONAP.pptx`
- Trace : `.../Trace - SAE Finance Dossier 2.docx`
- Projet d'origine : SAE Finance (dossier 2) / dossier MONAP — modèle DCF
- Interprétation : [TODO — interprétation à rédiger par Oscar]

### Preuve AC34.03GC2F — Réaliser un diagnostic et/ou un audit pour apporter des conseils
- Apprentissage critique : **AC34.03GC2F — Réaliser un diagnostic et/ou un audit pour apporter des conseils**
- Cadre dans la chambre : Sol, cadre 2
- Poster (overlay) : `preuves/4-Produire/AC34.03GC2F  .../preuve_AC34-03_VDD_SFR_poster.pdf`
- Source : `.../preuve_AC34-03_VDD_SFR.pptx`
- Traces : `.../Trace - SFR_MnA_model.xlsx` · `.../Trace - SFR_Rapport_Valorisation.docx`
- Contexte : Vendor Due Diligence / diagnostic de valorisation du Groupe Altice/SFR (démarche autonome sur comptes consolidés réels)
- Interprétation : [TODO — interprétation à rédiger par Oscar — base possible : DCF 3 scénarios Bear/Base/Bull, formule de Hamada, FCFF 5 ans, valeur terminale ; conclusion actionnable sur l'offre du consortium]
- Liens documents complets en ligne (rapport VDD SFR + modèle Excel M&A SFR) : [TODO — liens Google Doc/Drive à fournir par Oscar]

---

## Compétence 5 — Évaluer
*Évaluer l'activité de l'organisation*

**Surface dans la chambre :** Plafond (2 cadres)
**Niveau atteint :** Optimiser les outils d'analyse et de prévision de l'activité

**Définition courte :**
Évaluer, c'est aller au-delà de la description des chiffres pour comprendre ce qu'ils signifient — et ce qu'ils impliquent. C'est la compétence que j'ai le plus développée personnellement, en allant chercher des méthodes avancées de modélisation financière bien au-delà du programme.

### Preuve AC35.03GC2F — Établir un plan de financement équilibré
- Apprentissage critique : **AC35.03GC2F — Établir un plan de financement équilibré**
- Cadre dans la chambre : Plafond, cadre 1
- Poster (overlay) : `preuves/5-Evaluer/AC35.03GC2F  Établir un plan de financement équilibré/preuve_AC35-03_PFI_MONAP_poster.pdf`
- Source : `.../preuve_AC35-03_PFI_MONAP.pptx`
- Trace : `.../Trace - plan de financement.xlsx`
- Projet d'origine : dossier MONAP — plan de financement
- Interprétation : [TODO — interprétation à rédiger par Oscar]

### Preuve AC35.04GC2F — Réaliser la gestion de trésorerie sur le court terme
- Apprentissage critique : **AC35.04GC2F — Réaliser la gestion de trésorerie sur le court terme**
- Cadre dans la chambre : Plafond, cadre 2
- Poster (overlay) : `preuves/5-Evaluer/AC35.04GC2F  Réaliser la gestion de trésorerie sur le court terme/preuve_AC35-04_tresorerie_MONAP_poster.pdf`
- Source : `.../preuve_AC35-04_tresorerie_MONAP.pptx`
- Trace : `.../Trace - gestion de tréso.xlsx`
- Projet d'origine : dossier MONAP — gestion de trésorerie court terme
- Interprétation : [TODO — interprétation à rédiger par Oscar]

---

## Double entrée — Par activité

> [TODO — à confirmer par Oscar] Le regroupement ci-dessous est déduit des noms de fichiers. « MONAP » semble désigner une même SAE de reprise/finance couvrant Piloter + Produire + Évaluer — à valider.

**Activité 1 — Alternance KPMG Asset Management**
- Entreprise : KPMG — Pôle Asset Management · Période : BUT3 — 2025-2026
- AC couverts : Analyser AC31.03 (kit de macros VBA)
- Description : Mission d'audit en alternance. Projet phare : kit de 4 macros VBA pour automatiser les tests d'audit récurrents sur les workpapers Excel, réduire les erreurs humaines et sécuriser l'information produite. Déployé auprès de l'équipe avec un guide d'installation.

**Activité 2 — SAE / dossier MONAP (reprise & finance)** [TODO — confirmer intitulé]
- AC couverts : Piloter AC33.01 (animer une équipe), Produire AC34.01 (DCF), Évaluer AC35.03 (plan de financement) + AC35.04 (trésorerie)
- Description : [TODO — à rédiger par Oscar]

**Activité 3 — Diagnostic / valorisation Altice-SFR (VDD)**
- AC couverts : Produire AC34.03 (diagnostic/audit pour conseiller)
- Description : Modélisation financière sur comptes consolidés réels d'Altice France — DCF multi-scénarios, modèle M&A, rapport de valorisation. [TODO — préciser par Oscar]

**Activité 4 — SAE Etu'Explore**
- AC couverts : Décider AC32.02 (exploiter les données / dashboard), Piloter AC33.02 (projet collaboratif)
- Description : Co-développement d'une plateforme Wix de balades étudiantes à Paris — comptes membres, notation, forum, gamification (badges, défis mensuels, compteur collectif).

**Activité 5 — Conseil à un type d'organisation (franchise)**
- AC couverts : Analyser AC31.02
- Description : [TODO — à rédiger par Oscar]

**Activité 6 — RCF adopt (décision sous contraintes)**
- AC couverts : Décider AC32.03
- Description : [TODO — à rédiger par Oscar]

---

## Compétences complémentaires

> **Fashion Day a été retiré du portfolio** (décision Oscar, juin 2026) : ni cadre, ni compétence complémentaire. Aucune section complémentaire pour l'instant.

---

## Assets visuels

L'intro et la chambre reposent sur des **images IA** dans `assets/image/`. Le reste de l'UI est en CSS pur.

Fichiers réels disponibles :
- `assets/image/Image nuage init P0.png` ✅
- `assets/image/Image de fonds P1.png` ✅
- `assets/image/Image de fonds P2.png` ✅
- `assets/image/Chambre P3.png` ✅
- `assets/audio/Music website.mp3` ✅
- `assets/documents/CV.pdf` ✅
- 10 posters de preuve `preuves/<Compétence>/<AC>/preuve_*_poster.pdf` ✅ (cf. arborescence dans `CLAUDE.md`)
