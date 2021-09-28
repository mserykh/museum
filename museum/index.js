const progressVideo = document.querySelector('.controls__progress-bar');

progressVideo.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%)`
})

const volumeChange = document.querySelector('.controls__volume-slider');

volumeChange.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%)`
})

const bookBtn = document.querySelector('.order-form__btn-buy');
const closeBookingBtn = document.querySelector('.booking__btn-close');
const modalWindow = document.querySelector('.booking');
const overlay = document.querySelector('.overlay');

function showBookingForm() {
  modalWindow.classList.add('open');
  overlay.classList.add('open');
}

function closeBookingForm() {
  modalWindow.classList.remove('open');
  overlay.classList.remove('open');
}

bookBtn.addEventListener('click', showBookingForm);
closeBookingBtn.addEventListener('click', closeBookingForm);
