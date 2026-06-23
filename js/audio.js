// Musique de fond : déclenche au premier clic utilisateur, état mute mémorisé en localStorage
document.addEventListener('DOMContentLoaded', () => {
  const audioPath = document.body.dataset.audioPath || 'assets/audio/We can go up up up.mp3';
  const audio     = new Audio(audioPath);
  const btn       = document.getElementById('btn-audio');

  audio.loop   = true;
  audio.volume = 0.25;

  let started = false;
  let isMuted = localStorage.getItem('audio_muted') === 'true';

  // Applique l'état mute mémorisé au bouton dès le chargement
  if (btn) {
    btn.classList.toggle('muted', isMuted);
    btn.setAttribute('aria-label', isMuted ? 'Activer la musique' : 'Couper la musique');
  }

  // Premier clic n'importe où (sauf le bouton, qui stopPropagation) → démarre la musique
  document.addEventListener('click', () => {
    started = true;
    if (!isMuted) audio.play().catch(() => {});
  }, { once: true });

  // Contrôles exposés globalement pour usage inter-fichiers (ex : pause pendant la vidéo)
  window.portfolioAudio = {
    pause:  () => audio.pause(),
    resume: () => { if (started && !isMuted) audio.play().catch(() => {}); }
  };

  if (btn) {
    btn.addEventListener('click', e => {
      e.stopPropagation(); // empêche le listener { once: true } de se déclencher ici
      isMuted = !isMuted;
      localStorage.setItem('audio_muted', isMuted);
      btn.classList.toggle('muted', isMuted);
      btn.setAttribute('aria-label', isMuted ? 'Activer la musique' : 'Couper la musique');

      if (isMuted) {
        audio.pause();
      } else {
        // Clic utilisateur → autorisation navigateur garantie, on peut démarrer ici
        started = true;
        audio.play().catch(() => {});
      }
    });
  }
});
