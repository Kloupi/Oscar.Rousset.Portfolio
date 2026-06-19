// Logique de la scène interactive : hotspots → compétences + objets
document.addEventListener('DOMContentLoaded', () => {

  // Hotspots cliquables : route selon data-action
  document.querySelectorAll('.hotspot').forEach(spot => {
    spot.addEventListener('click', () => {
      const action = spot.dataset.action;
      if (action === 'competence' && typeof openProof === 'function') {
        // Affiche le poster PDF de la preuve (overlay), depuis le cadre cliqué
        openProof(spot);
      } else if (action === 'video') {
        openModal('modal-video');
        window.portfolioAudio?.pause();
      } else if (action === 'cv') {
        // Le CV s'affiche dans le grand overlay (comme les preuves) + bouton de téléchargement
        if (typeof openProof === 'function') openProof(spot);
      } else if (action === 'activites') {
        goToActivites();
      } else if (action === 'exit') {
        // Ressort de la chambre vers l'extérieur (ville P1)
        if (typeof window.returnToCity === 'function') window.returnToCity();
      }
    });
  });

  // Survol d'une surface (mur/sol/plafond) OU d'un de ses cadres → affiche le nom
  // de la compétence (et seulement le nom, aucun surlignage de zone).
  function setCompetenceLabel(slug, active) {
    const label = document.querySelector('.surface-label[data-label="' + slug + '"]');
    if (label) label.classList.toggle('is-active', active);
  }
  document.querySelectorAll('.surface[data-surface]').forEach(surf => {
    const slug = surf.dataset.surface;
    surf.addEventListener('mouseenter', () => setCompetenceLabel(slug, true));
    surf.addEventListener('mouseleave', () => setCompetenceLabel(slug, false));
  });
  document.querySelectorAll('.hotspot[data-slug]').forEach(spot => {
    const slug = spot.dataset.slug;
    spot.addEventListener('mouseenter', () => setCompetenceLabel(slug, true));
    spot.addEventListener('mouseleave', () => setCompetenceLabel(slug, false));
  });

  // Fermeture via bouton ×
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
  });

  // Fermeture au clic sur le fond (overlay)
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Fermeture via Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(m => closeModal(m));
    }
  });

  // Boutons mobile : vidéo et CV (doublons des hotspots pour petits écrans)
  const mobileBtnVideo = document.getElementById('mobile-btn-video');
  const mobileBtnCv    = document.getElementById('mobile-btn-cv');
  if (mobileBtnVideo) {
    mobileBtnVideo.addEventListener('click', () => {
      openModal('modal-video');
      window.portfolioAudio?.pause();
    });
  }
  if (mobileBtnCv) {
    mobileBtnCv.addEventListener('click', () => {
      if (typeof openProof === 'function') openProof(mobileBtnCv);
    });
  }

  // Menu des preuves (mobile) : chaque bouton ouvre le même poster que le cadre
  // correspondant. On recopie les données du hotspot (source unique de vérité),
  // puis openProof fait « grandir » la preuve depuis le bouton tapé.
  document.querySelectorAll('.mobile-proof-btn').forEach(btn => {
    const hot = document.querySelector('.hotspot[data-ac="' + btn.dataset.openAc + '"]');
    if (!hot) return;
    if (hot.dataset.poster)    btn.dataset.poster    = hot.dataset.poster;
    if (hot.dataset.downloads) btn.dataset.downloads = hot.dataset.downloads;
    if (hot.dataset.links)     btn.dataset.links     = hot.dataset.links;
    btn.addEventListener('click', () => {
      if (typeof openProof === 'function') openProof(btn);
    });
  });

});

// Transition vers la page activités via l'overlay
function goToActivites() {
  const overlay = document.getElementById('transition-overlay');
  gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.in',
    onComplete: () => { window.location.href = 'activites.html'; }
  });
}

// Ouvre un modal avec animation GSAP (fade in + scale depuis 0.92)
function openModal(id) {
  const modal   = document.getElementById(id);
  const content = modal.querySelector('.modal-content');
  modal.classList.remove('hidden');
  gsap.fromTo(modal,   { opacity: 0 },               { opacity: 1, duration: 0.25, ease: 'power2.out' });
  gsap.fromTo(content, { scale: 0.92, opacity: 0 },  { scale: 1,   opacity: 1, duration: 0.30, ease: 'power2.out' });
  // Lance la lecture de la vidéo dès l'ouverture (clic = geste utilisateur, son autorisé)
  if (id === 'modal-video') {
    const video = document.getElementById('presentation-video');
    if (video) video.play().catch(() => {}); // silencieux si le navigateur bloque l'autoplay
  }
}

// Ferme un modal avec animation GSAP (scale vers 0.92 + fade out)
function closeModal(modal) {
  const content = modal.querySelector('.modal-content');
  // Reprend la musique et stoppe la vidéo si c'était le modal vidéo
  if (modal.id === 'modal-video') {
    window.portfolioAudio?.resume();
    const video = document.getElementById('presentation-video');
    if (video) { video.pause(); video.currentTime = 0; }
  }
  gsap.to(content, { scale: 0.92, opacity: 0, duration: 0.20, ease: 'power2.in' });
  gsap.to(modal,   { opacity: 0,  duration: 0.25, ease: 'power2.in',
    onComplete: () => { modal.classList.add('hidden'); gsap.set(modal, { opacity: '' }); gsap.set(content, { scale: '', opacity: '' }); }
  });
}

// Révèle le bouton audio et la mention de copyright une fois la scène affichée (appelé par intro.js)
function revealRoom() {
  const btn = document.getElementById('btn-audio');
  if (btn) btn.classList.remove('hidden');
  const credit = document.getElementById('site-credit');
  if (credit) credit.classList.remove('hidden');
}
