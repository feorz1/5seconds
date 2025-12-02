// Список треков — подставьте свои реальные файлы и названия
const tracks = [
  { src: 'tracks/track1.mp3', title: 'Трек 1' },
  { src: 'tracks/track2.mp3', title: 'Трек 2' },
  { src: 'tracks/track3.mp3', title: 'Трек 3' },
];

let current = 0;
let gameStarted = false;
const titleDiv = document.getElementById('track-title');
const showTitleBtn = document.getElementById('show-title');
const timerDiv = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');

const SHOW_SECONDS = 5;
let timerInterval = null;
let autoPauseTimeout = null;

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

function clearTimers() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (autoPauseTimeout) {
    clearTimeout(autoPauseTimeout);
    autoPauseTimeout = null;
  }
}

function startTimer() {
  clearTimers();

  let secondsLeft = SHOW_SECONDS;
  timerDiv.textContent = `0:${secondsLeft.toString().padStart(2, '0')}`;

  timerInterval = setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft >= 0) {
      timerDiv.textContent = `0:${secondsLeft.toString().padStart(2, '0')}`;
    }
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDiv.textContent = 'Время вышло!';
    }
  }, 1000);

  autoPauseTimeout = setTimeout(() => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    }
    timerDiv.textContent = 'Время вышло!';
  }, SHOW_SECONDS * 1000);
}

function loadTrack(idx) {
  const track = tracks[idx];
  if (!track) return;

  clearTimers();
  wavesurfer.empty();

  titleDiv.classList.add('hidden');
  titleDiv.textContent = track.title;

  timerDiv.textContent = `0:${SHOW_SECONDS.toString().padStart(2, '0')}`;

  wavesurfer.load(track.src);
}

wavesurfer.on('ready', () => {
  if (gameStarted) {
    wavesurfer.play();
    startTimer();
  }
});

function nextTrack() {
  clearTimers();
  current = (current + 1) % tracks.length;
  loadTrack(current);
}

showTitleBtn.addEventListener('click', () => {
  titleDiv.classList.remove('hidden');
  setTimeout(nextTrack, 1500);
});

// Кнопка старта
startBtn.addEventListener('click', () => {
  gameStarted = true;
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadTrack(current);
});
