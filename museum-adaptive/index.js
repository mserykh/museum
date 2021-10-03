const progressVideo = document.querySelector('.controls__progress-bar');

progressVideo.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, var(--color-accent2) 0%, var(--color-accent2) ${value}%, var(--color-player2) ${value}%)`
})

const volumeChange = document.querySelector('.controls__volume-slider');

volumeChange.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, var(--color-accent2) 0%, var(--color-accent2) ${value}%, var(--color-player2) ${value}%)`
})

const toggleBtn = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-navigation');

function toggleMenu() {
  toggleBtn.classList.toggle('is-active');
  mobileMenu.classList.toggle('is-active');
}

toggleBtn.addEventListener('click', toggleMenu);
