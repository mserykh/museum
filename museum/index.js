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


const paymentBtn = document.querySelector('.booking-payment__btn');


function addRipple(event) {
  const circle = document.createElement('div');
  const circleDiameter = Math.max(event.target.clientWidth, event.target.clientHeight);
  const circleRadius = circleDiameter / 2;
  circle.style.width = `${circleDiameter}px`;
  circle.style.height = `${circleDiameter}px`;
  circle.style.left = `${event.clientX - (paymentBtn.offsetTop + circleRadius) - 220}px`;
  circle.style.top = `${event.clientY - (paymentBtn.offsetLeft + circleRadius) + 200}px`;
  circle.classList.add('ripple');
  const ripple = paymentBtn.getElementsByClassName('ripple')[0];

  if (ripple) {
    ripple.remove();
  }

  paymentBtn.appendChild(circle);
  console.log(paymentBtn.offsetTop, paymentBtn.offsetLeft);
}

paymentBtn.addEventListener('click', addRipple);