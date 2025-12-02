// main.js
const tracks = [
  { src: 'tracks/track1.mp3', title: 'Первый трек' },
  { src: 'tracks/track2.mp3', title: 'Второй трек' }
  // ...добавляете столько треков, сколько нужно
];

let current = 0;
const titleDiv = document.getElementById('track-title');
const showTitleBtn = document.getElementById('show-title');
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#bdbdbd',
  progressColor: '#4caf50',
  barWidth: 2,
  responsive: true,
  height: 80,
  cursorWidth: 1,
  hideScrollbar: true
});

function loadTrack(idx) {
  wavesurfer.load(tracks[idx].src);
  titleDiv.style.display = 'none';
  titleDiv.innerText = tracks[idx].title;
}
wavesurfer.on('ready', () => wavesurfer.play());
wavesurfer.on('finish', () => nextTrack());

function nextTrack() {
  current = (current + 1) % tracks.length;
  loadTrack(current);
}

showTitleBtn.onclick = function() {
  titleDiv.style.display = '';
  setTimeout(nextTrack, 1500);
};

loadTrack(current);
