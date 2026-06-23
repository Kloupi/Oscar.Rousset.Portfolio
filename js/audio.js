// Musique de fond : déclenche au premier clic utilisateur, état mute + volume mémorisés en localStorage
document.addEventListener('DOMContentLoaded', () => {
  const audioPath = document.body.dataset.audioPath || 'assets/audio/We can go up up up.mp3';
  const audio     = new Audio(audioPath);
  const btn       = document.getElementById('btn-audio');

  audio.loop = true;

  // Titre affiché : dérivé du nom de fichier (sans dossier ni extension)
  const trackTitle = decodeURIComponent(audioPath.split('/').pop().replace(/\.[^.]+$/, ''));

  // Volume initial mémorisé (0.25 par défaut)
  let volume = parseFloat(localStorage.getItem('audio_volume'));
  if (isNaN(volume)) volume = 0.25;
  audio.volume = volume;

  let started = false;
  let isMuted = localStorage.getItem('audio_muted') === 'true';

  // Applique l'état mute mémorisé au bouton dès le chargement
  if (btn) {
    btn.classList.toggle('muted', isMuted);
    btn.setAttribute('aria-label', isMuted ? 'Activer la musique' : 'Couper la musique');
  }

  // Construit le lecteur (titre + barre de volume) autour du bouton mute existant
  if (btn) {
    const player = document.createElement('div');
    player.id = 'audio-player';
    btn.parentNode.insertBefore(player, btn);
    player.appendChild(btn); // déplace le bouton mute dans le lecteur

    const info = document.createElement('div');
    info.id = 'audio-info';

    const title = document.createElement('span');
    title.id = 'audio-title';
    title.textContent = trackTitle;
    title.title = trackTitle;

    const vol = document.createElement('input');
    vol.id = 'audio-volume';
    vol.type = 'range';
    vol.min = '0';
    vol.max = '100';
    vol.step = '1';
    vol.value = String(Math.round(volume * 100));
    vol.setAttribute('aria-label', 'Volume de la musique');

    // Glisse la barre → ajuste le volume, le mémorise et démarre la musique si besoin
    vol.addEventListener('input', () => {
      volume = vol.value / 100;
      audio.volume = volume;
      localStorage.setItem('audio_volume', volume);
      if (!isMuted) {
        started = true;
        audio.play().catch(() => {});
      }
    });
    // Empêche un clic sur la barre d'être interprété comme un clic du bouton mute
    vol.addEventListener('click', e => e.stopPropagation());

    info.append(title, vol);
    player.append(info);
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
