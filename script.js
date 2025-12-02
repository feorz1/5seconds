const tracks = [
  { src: 'tracks/track1.mp3', title: 'Первый трек' },
  { src: 'tracks/track2.mp3', title: 'Второй трек' },
  // добавишь остальные
];

let current = 0;
const titleDiv = document.getElementById('track-title');
const showTitleBtn = document.getElementById('show-title');

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#3b4255',
  progressColor: '#1db954',
  barWidth: 2,
  barGap: 1,
  responsive: true,
  height: 80,
  cursorWidth: 0,
  hideScrollbar: true,
  normalize: true,
});

function loadTrack(idx) {
  const track = tracks[idx];
  if (!track) return;

  wavesurfer.empty();
  wavesurfer.load(track.src);

  titleDiv.textContent = track.title;
  titleDiv.classList.add('hidden');

  // можно остановить прошлый таймер 5 секунд, если захочешь его добавить
}

wavesurfer.on('ready', () => {
  wavesurfer.play();

  // если нужно строго "5 секунд", можно обрезать так:
  setTimeout(() => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    }
  }, 5000);
});

wavesurfer.on('finish', () => {
  // если дашь играть полностью — можно автопереходить
  // nextTrack();
});

function nextTrack() {
  current = (current + 1) % tracks.length;
  loadTrack(current);
}

showTitleBtn.addEventListener('click', () => {
  titleDiv.classList.remove('hidden');
  setTimeout(nextTrack, 1500);
});

loadTrack(current);
