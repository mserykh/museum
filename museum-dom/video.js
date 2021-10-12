const player = document.querySelector('.js-video-player');
const video = player.querySelector('.js-video-viewer');
const controls = player.querySelector('.js-video-player-controls');
const progress = player.querySelector('.js-video-progress-bar');
const toggle = player.querySelector('.js-video-button-toggle');
const previewButton = player.querySelector('.js-video-button-preview');
const volumeRange = player.querySelector('.js-video-volume-range');
const volumeButton = player.querySelector('.js-video-button-volume');
const volumePercentage = player.querySelector('.video-player__volume-percentage');
const ranges = player.querySelectorAll('.js-video-range');
const speedRate = player.querySelector('.video-player__speed-rate');
const playbackRateInfo = player.querySelector('.js-video-playback-rate');
const fullscreenButton = player.querySelector('.js-video-button-fullscreen');

let isPlaying = false;
let isMousedown = false;
let isVolumeOn = true;
let lastVolumeValue = ranges[0].value;

function togglePlay() {
  if (video.paused) {
    video.play();
    updateToggleButton();
    updatePreviewButton();
    isPlaying = true;
  }
  else {
    video.pause();
    updateToggleButton();
    updatePreviewButton();
    isPlaying = false;
  }
}

function updateToggleButton() {
  if (!isPlaying) {
    toggle.style.backgroundImage = `url('assets/svg/video-player/pause.svg')`;
    toggle.style.width = `23 px`;
  }
  else if (isPlaying) {
    toggle.style.backgroundImage = `url('assets/svg/video-player/play.svg')`
    toggle.style.width = `21 px`;
  }
}

function updatePreviewButton() {
  if (!isPlaying) {
    previewButton.style.display = `none`;
  }
  else if (isPlaying) {
    previewButton.style.display = `block`;
  }
}

function handleProgress() {
  const duration = video.duration;
  const currentTime = video.currentTime;
  const percent = (currentTime / duration) * 100;
  progress.value = `${percent}`;
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #C4C4C4 ${percent}%)`;

  if (currentTime === duration) {
    video.pause();
    updateToggleButton();
    updatePreviewButton();
    isPlaying = false;
  }
}

function handleRangeUpdate() {
  const value = this.value;
  video[this.name] = value;
  if (this.name === 'volume') lastVolumeValue = value;
     }

function handleRangeProgress() {
  const value = this.value;
  const max = this.max;
  const min = this.min;
  const percent = Math.floor(((value - min) / (max - min)) * 100);
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #C4C4C4 ${percent}%)`;

  if (this.name === 'volume') showVolumePercentage(percent);
  if (this.name === 'playbackRate') showSpeedRate(value);
}

function showVolumePercentage(percent) {
  /*volumePercentage.innerText = `${percent}%`;*/
  toggleVolumeIcon(percent);
}

function showSpeedRate(value) {
  playbackRateInfo.innerText = `x${value}`;
  playbackRateInfo.classList.add('active');

  setTimeout(function(){
    playbackRateInfo.classList.remove('active');
  }, 500);
}

function toggleVolume() {
  if (isVolumeOn) {
    volumeButton.classList.add('muted');
    video.muted = isVolumeOn;
    ranges[0].value = 0;
    ranges[0].style.background = `linear-gradient(to right, #710707 0%, #710707 ${ranges[0].value}%, #C4C4C4 ${ranges[0].value}%)`;
    showVolumePercentage(Math.floor(ranges[0].value * 100));
    isVolumeOn = false;
  }
  else if (!isVolumeOn) {
    volumeButton.classList.remove('muted');
    video.muted = isVolumeOn;
    video.volume = lastVolumeValue;
    ranges[0].value = lastVolumeValue;
    ranges[0].style.background = `linear-gradient(to right, #710707 0%, #710707 ${ranges[0].value * 100}%, #C4C4C4 ${ranges[0].value * 100}%)`;
    showVolumePercentage(Math.floor(ranges[0].value * 100));
    isVolumeOn = true;
  }
}

function toggleVolumeIcon(percent) {
  if (percent < 49 & percent !== 0) {
    volumeButton.classList.remove('muted');
    volumeButton.classList.remove('volume-high');
    volumeButton.classList.add('volume-low');
    isVolumeOn = true;
    video.muted = !isVolumeOn;
  } else if (percent >= 49) {
    volumeButton.classList.remove('muted');
    volumeButton.classList.remove('volume-low');
    volumeButton.classList.add('volume-high');
    isVolumeOn = true;
    video.muted = !isVolumeOn;
  } else if (percent === 0) {
    volumeButton.classList.add('muted');
    isVolumeOn = false;
    video.muted = !isVolumeOn;
  }
}

function backToNormalSpeedRate() {
  video.playbackRate = 1;
  ranges[1].value = +video.playbackRate;
  showSpeedRate(+video.playbackRate);
}

function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}

function getDuration() {
  const duration = video.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenButton.style.background = `url(''assets/svg/video-player/fullscreen.svg')`;
  }
  else if (document.webkitFullscrrenElement) {
    document.webkitExitFullscreen();
    fullscreenButton.style.background = `url(''assets/svg/video-player/fullscreen.svg')`;
  }
  else if (player.fullscreenElement) {
    player.webkitExitFullscreen();
    fullscreenButton.style.background = `url(''assets/svg/video-player/fullscreen.svg')`;
  }
  else {
    player.requestFullscreen();
    fullscreenButton.style.background = `url('assets/svg/video-player/fullscreen_exit.svg')`;
  }
}

function onKeyElementClick(e) {

  if ((video.getBoundingClientRect().top < 400) 
  && (video.getBoundingClientRect().top > -200)) {

    e.preventDefault();

    if (e.code === 'Space' || e.code === 'KeyK') {
      togglePlay();
    }

    if (e.code === 'KeyJ') {
      video.currentTime -= 10;
      if (video.paused) {
        togglePlay();
      }
    }

    if (e.code === 'KeyM') {
      toggleVolume();
    }

    if (e.getModifierState("Shift") && e.code === 'Period') {
      if (video.playbackRate >= 2) return;
      video.playbackRate += 0.25;
      showSpeedRate(+video.playbackRate);
    }

    if (e.getModifierState("Shift") && e.code === 'Comma') {
      if (video.playbackRate <= 0.5) return;
      video.playbackRate -= 0.25;
      showSpeedRate(+video.playbackRate);
    }

    if (e.code === 'KeyR') {
      backToNormalSpeedRate();
    }

    if (e.code === 'KeyF') {
      toggleFullscreen();
    }

    if (e.code === 'Digit0' || e.code === 'Numpad0') {
      video.currentTime = 0;
    }

    if (e.code === 'Digit1' || e.code === 'Numpad1') {
      video.currentTime = video.duration * 0.1;
    }

    if (e.code === 'Digit2' || e.code === 'Numpad2') {
      video.currentTime = video.duration * 0.2;
    }

    if (e.code === 'Digit3' || e.code === 'Numpad3') {
      video.currentTime = video.duration * 0.3;
    }

    if (e.code === 'Digit4' || e.code === 'Numpad4') {
      video.currentTime = video.duration * 0.4;
    }

    if (e.code === 'Digit5' || e.code === 'Numpad5') {
      video.currentTime = video.duration * 0.5;
    }

    if (e.code === 'Digit6' || e.code === 'Numpad6') {
      video.currentTime = video.duration * 0.6;
    }

    if (e.code === 'Digit7' || e.code === 'Numpad7') {
      video.currentTime = video.duration * 0.7;
    }

    if (e.code === 'Digit8' || e.code === 'Numpad8') {
      video.currentTime = video.duration * 0.8;
    }

    if (e.code === 'Digit9' || e.code === 'Numpad9') {
      video.currentTime = video.duration * 0.9;
    }
  }
}

document.addEventListener('keydown', onKeyElementClick);

video.addEventListener('timeupdate', handleProgress);
video.addEventListener('click', togglePlay);
video.addEventListener('loadeddata', getDuration)

toggle.addEventListener('click', togglePlay);
previewButton.addEventListener('click', togglePlay);

volumeButton.addEventListener('click', toggleVolume);

ranges.forEach(range => range.addEventListener('input', handleRangeProgress));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', () => isMousedown && handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMousedown && scrub(e));
progress.addEventListener('mousedown', () => isMousedown = true);
progress.addEventListener('mouseup', () => isMousedown = false);

fullscreenButton.addEventListener('click', toggleFullscreen);

/* *********************************************************** */
// Youtube videos creation
function findVideos() {
  let videos = document.querySelectorAll('.video__item');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/mqdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
