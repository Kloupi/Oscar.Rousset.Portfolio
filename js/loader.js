// Écran de chargement : précharge les IMAGES de scène (P0/P1/P2/chambre) sur fond de
// nuages, affiche une progression visible jusqu'à 100 %, puis fond enchaîné vers l'intro.
// Les posters PDF ne sont PAS préchargés ici : ils se chargent à la demande (au clic sur
// un cadre). La progression suit À LA FOIS le chargement réel et une durée minimale,
// pour qu'on voie toujours la barre se remplir (même quand tout est déjà en cache, en local).
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Verrou global : l'intro restera inerte tant qu'on n'a pas atteint 100 % (voir js/intro.js)
  window.__assetsReady = false;

  const fill = document.getElementById('loader-bar-fill');
  const pct  = document.getElementById('loader-pct');

  // Empêche le scroll de déclencher l'intro tant que le loader est affiché.
  // Listener en phase de CAPTURE → s'exécute avant (et neutralise) celui de l'intro.
  function blockWheel(e) {
    e.stopImmediatePropagation();
    if (e.cancelable) e.preventDefault();
  }
  window.addEventListener('wheel', blockWheel, { capture: true, passive: false });

  // À précharger = uniquement les images de scène (les posters PDF se chargent au clic)
  function collectAssets() {
    return ['#intro-p0', '#intro-p1', '#intro-p2', '#room-bg']
      .map(sel => document.querySelector(sel))
      .filter(Boolean)
      .map(el => el.getAttribute('src'));
  }

  const assets = collectAssets();
  const total  = assets.length || 1;
  let done = 0;
  function bump() { done += 1; } // compte les assets chargés (l'affichage est géré par tick())

  // Image : fiable en local (file://) comme en ligne
  function preloadImage(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = src;
    });
  }

  // Lance le préchargement des images en parallèle
  assets.forEach(src => preloadImage(src).then(bump));

  // Durée minimale d'affichage : la barre met au moins MIN_MS à atteindre 100 %,
  // pour qu'on la voie se remplir même si les assets sont déjà en cache.
  const MIN_MS = 1600;
  const clock  = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const startT = clock();

  let rafId = 0;
  function tick() {
    const elapsed = clock() - startT;
    const realPct = (done / total) * 100;                 // ce qui est vraiment chargé
    const timePct = Math.min(100, (elapsed / MIN_MS) * 100); // progression "minimale" liée au temps
    const shown   = Math.floor(Math.min(realPct, timePct));  // on n'affiche jamais plus que les deux
    if (fill) fill.style.width = shown + '%';
    if (pct)  pct.textContent  = shown + '%';
    if (shown >= 100) { finish(); return; }                // 100 % = assets chargés ET durée mini écoulée
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  let finished = false;
  // Fond enchaîné du loader → révèle l'intro (nuages identiques dessous = pas de saut)
  function finish() {
    if (finished) return;
    finished = true;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('wheel', blockWheel, { capture: true });

    // Déverrouille l'intro (assets prêts à 100 %)
    window.__assetsReady = true;
    if (typeof window.__onAssetsReady === 'function') window.__onAssetsReady();
    if (fill) fill.style.width = '100%';
    if (pct)  pct.textContent  = '100%';

    const cleanup = () => { if (loader.parentNode) loader.parentNode.removeChild(loader); };
    const fade = () => {
      if (window.gsap) {
        gsap.to(loader, { opacity: 0, duration: 0.6, ease: 'power2.inOut', onComplete: cleanup });
      } else {
        loader.style.transition = 'opacity 0.6s ease';
        loader.style.opacity = '0';
        setTimeout(cleanup, 650);
      }
    };
    setTimeout(fade, 350); // petit temps d'arrêt sur « 100 % » avant le fondu
  }

  // Filet de sécurité : ne jamais rester bloqué si un asset est lent/indisponible
  setTimeout(finish, 12000);
})();
