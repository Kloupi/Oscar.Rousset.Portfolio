// Séquence d'intro par images : P0 (nuages) → P1 (ville) → P2 (fenêtre) → chambre
// Étapes discrètes déclenchées au clic ou au scroll (pas de parallax continu).
document.addEventListener('DOMContentLoaded', () => {
  const intro     = document.getElementById('intro');
  const room      = document.getElementById('room');
  const overlay   = document.getElementById('transition-overlay');
  const btn       = document.getElementById('btn-entrer');
  const p0        = document.getElementById('intro-p0');
  const p2        = document.getElementById('intro-p2');
  const scene     = document.getElementById('intro-scene');
  const windowBtn = document.getElementById('intro-window');
  const title     = document.getElementById('intro-overlay-text');

  let step = 0; // 0 = nuages affichés, 1 = fenêtre révélée, 2 = entrée/chambre

  // Étape 1 : dissipe les nuages (P0) pour révéler la ville (P1) + active la fenêtre
  // Effet « on traverse les nuages » : zoom avant + flou croissant + fondu.
  function dissipateClouds() {
    if (step !== 0) return;
    step = 1;
    btn.disabled = true;
    gsap.to(title, { opacity: 0, duration: 0.5, ease: 'power1.out' });
    gsap.fromTo(p0,
      { filter: 'blur(0px)', scale: 1, opacity: 1 },
      {
        opacity: 0, scale: 1.45, filter: 'blur(34px)',
        duration: 2, ease: 'power2.in',
        onComplete: () => { p0.style.display = 'none'; }
      }
    );
    // Révèle la fenêtre interactive (pulse/glow) une fois les nuages presque dissipés
    gsap.delayedCall(1.2, () => windowBtn.classList.add('active'));
  }

  // Étape 2 : allume la fenêtre (P2), zoom dedans, puis bascule vers la chambre
  function enterWindow() {
    if (step !== 1) return;
    step = 2;
    windowBtn.classList.remove('active');
    windowBtn.style.pointerEvents = 'none';

    const tl = gsap.timeline();
    tl.to(p2, { opacity: 1, duration: 0.6, ease: 'power1.inOut' })                          // P1 → P2 (fenêtre éclairée)
      .to(scene, { scale: 11, transformOrigin: '51.04% 48.66%', duration: 2, ease: 'power2.inOut' }, '-=0.1')
      .to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.in' }, '-=0.7')               // fondu vers blanc
      .call(() => {
        sessionStorage.setItem('room_unlocked', '1');
        intro.classList.add('hidden');
        room.classList.remove('hidden');
        if (typeof revealRoom === 'function') revealRoom();
      })
      .to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.out' });                      // révèle la chambre
  }

  // Retour vers l'extérieur : depuis la chambre, on ressort sur la ville (P1)
  // via la fenêtre du fond. On rétablit l'intro à l'état « nuages dissipés, fenêtre active ».
  function returnToCity() {
    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.in' })   // fondu vers blanc
      .call(() => {
        room.classList.add('hidden');
        intro.classList.remove('hidden');
        // Réinitialise les couches : nuages partis, P2 éteinte, zoom remis à zéro
        gsap.set(scene, { scale: 1 });
        gsap.set(p2, { opacity: 0 });
        gsap.set(p0, { display: 'none', opacity: 0 });
        title.style.opacity = '0';
        btn.style.display = 'none';
        windowBtn.classList.add('active');
        windowBtn.style.pointerEvents = 'auto';
        step = 1;
        sessionStorage.removeItem('room_unlocked');
      })
      .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out' });  // révèle la ville
  }
  // Exposé pour la chambre (room.js → bouton « Sortir »)
  window.returnToCity = returnToCity;

  // Déclencheurs (toujours branchés, même si on arrive directement dans la chambre)
  btn.addEventListener('click', dissipateClouds);
  windowBtn.addEventListener('click', enterWindow);
  window.addEventListener('wheel', () => {
    if (step === 0) dissipateClouds();
    else if (step === 1) enterWindow();
  }, { passive: true });

  // Retour depuis une page compétence : aller directement à la chambre sans rejouer l'intro
  // (les fonctions ci-dessus restent disponibles, ex. bouton « Sortir »).
  if (sessionStorage.getItem('room_unlocked')) {
    step = 2;
    intro.classList.add('hidden');
    room.classList.remove('hidden');
    document.getElementById('btn-audio').classList.remove('hidden');
  }
});
