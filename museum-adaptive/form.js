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
  const circleDiameter = Math.max(paymentBtn.clientWidth, paymentBtn.clientHeight);
  const crcl = paymentBtn.getBoundingClientRect();
  const circleRadius = circleDiameter / 2;
  circle.style.width = `${circleDiameter}px`;
  circle.style.height = `${circleDiameter}px`;
  circle.style.top = `${event.clientY - crcl.top - circleRadius}px`;
  circle.style.left = `${event.clientX - crcl.left - circleRadius}px`;
  circle.classList.add('ripple');
  const ripple = paymentBtn.getElementsByClassName('ripple')[0];

  if (ripple) {
    ripple.remove();
  }

  paymentBtn.appendChild(circle);
}

paymentBtn.addEventListener('click', addRipple);


const inputDate = document.querySelector('.input--date');
const inputTime = document.querySelector('.input--time');

function getValue() {
  let value = this.value;
  this.setAttribute('data-placeholder', value)
}

inputDate.addEventListener('input', getValue);
inputTime.addEventListener('input', getValue);
