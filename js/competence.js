// Affichage des preuves : au clic sur un cadre, son poster PDF « vient vers » le
// visiteur depuis le cadre lui-même, tandis que la chambre reste visible (floutée)
// en arrière-plan. Le contenu affiché est uniquement le PDF (aucun texte).

let proofOriginSpot = null; // cadre d'où la preuve est partie (pour l'animation de retour)

// Rectangle cible : grand cadre centré, adapté à la taille de la fenêtre
function proofTargetRect() {
  const margin = 24;
  const width  = Math.min(window.innerWidth  - margin * 2, 1500);
  const height = Math.min(window.innerHeight - margin * 2, 1180);
  return {
    width,
    height,
    left: (window.innerWidth  - width)  / 2,
    top:  (window.innerHeight - height) / 2
  };
}

// Ouvre l'overlay : la preuve grandit depuis le cadre cliqué jusqu'au centre
function openProof(spot) {
  const poster = spot.dataset.poster;
  if (!poster) return;

  const overlay = document.getElementById('modal-proof');
  const frame   = overlay.querySelector('.proof-frame');
  const iframe  = overlay.querySelector('.proof-doc');
  proofOriginSpot = spot;

  // Chemins avec espaces/accents → encodeURI ; on masque la barre d'outils du PDF
  iframe.src = encodeURI(poster) + '#toolbar=0&navpanes=0&view=Fit';

  // Liens de téléchargement : construits selon data-downloads du cadre.
  // Format : "Libellé || chemin || nomDeFichier ;; Libellé2 || chemin2 || nomDeFichier2"
  const dlWrap = overlay.querySelector('.proof-downloads');
  dlWrap.innerHTML = '';
  const spec = spot.dataset.downloads;
  if (spec) {
    spec.split(';;').forEach(entry => {
      const [label, path, filename] = entry.split('||').map(s => s.trim());
      if (!path) return;
      const a = document.createElement('a');
      a.className = 'proof-download';
      a.href = encodeURI(path);
      a.setAttribute('download', filename || path.split('/').pop()); // télécharge (https)
      a.target = '_blank';        // secours : ouvre dans un nouvel onglet (ex. en local file://)
      a.rel = 'noopener';
      a.textContent = label || 'Télécharger';
      dlWrap.appendChild(a);
    });
  }

  // Liens externes (site web) : "Libellé || URL ;; …" → bouton qui ouvre un nouvel onglet
  const links = spot.dataset.links;
  if (links) {
    links.split(';;').forEach(entry => {
      const [label, url] = entry.split('||').map(s => s.trim());
      if (!url) return;
      const a = document.createElement('a');
      a.className = 'proof-download';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label || 'Voir le site';
      dlWrap.appendChild(a);
    });
  }

  dlWrap.classList.toggle('hidden', dlWrap.children.length === 0);

  const start = spot.getBoundingClientRect(); // position du cadre à l'écran
  const end   = proofTargetRect();

  overlay.classList.remove('hidden');
  gsap.killTweensOf([overlay, frame]);
  gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
  gsap.fromTo(frame,
    { left: start.left, top: start.top, width: start.width, height: start.height, opacity: 0.5 },
    { left: end.left, top: end.top, width: end.width, height: end.height, opacity: 1,
      duration: 0.55, ease: 'power3.out' }
  );
}

// Ferme l'overlay : la preuve « repart » vers son cadre d'origine
function closeProof() {
  const overlay = document.getElementById('modal-proof');
  if (!overlay || overlay.classList.contains('hidden')) return;
  const frame  = overlay.querySelector('.proof-frame');
  const iframe = overlay.querySelector('.proof-doc');
  const back   = proofOriginSpot ? proofOriginSpot.getBoundingClientRect() : proofTargetRect();

  gsap.killTweensOf([overlay, frame]);
  gsap.to(frame, {
    left: back.left, top: back.top, width: back.width, height: back.height, opacity: 0,
    duration: 0.4, ease: 'power3.in'
  });
  gsap.to(overlay, {
    opacity: 0, duration: 0.4, ease: 'power2.in',
    onComplete: () => {
      overlay.classList.add('hidden');
      iframe.src = 'about:blank';      // stoppe le rendu du PDF
      gsap.set(overlay, { opacity: '' });
      gsap.set(frame, { clearProps: 'all' });
      proofOriginSpot = null;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modal-proof');
  if (!overlay) return;

  overlay.querySelector('.proof-close').addEventListener('click', closeProof);
  // Clic sur le fond (hors de la preuve) → ferme
  overlay.addEventListener('click', e => { if (e.target === overlay) closeProof(); });
  // Échap → ferme
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProof(); });

  // Recentre la preuve si la fenêtre est redimensionnée
  window.addEventListener('resize', () => {
    if (overlay.classList.contains('hidden')) return;
    const end = proofTargetRect();
    gsap.set(overlay.querySelector('.proof-frame'),
      { left: end.left, top: end.top, width: end.width, height: end.height });
  });
});
