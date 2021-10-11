const FORM = document.getElementById('booking-info')
const bookBtn = document.querySelector('.order-form__btn-buy');
const closeBookingBtn = document.querySelector('.booking__btn-close');
const modalWindow = document.querySelector('.booking');
const overlay = document.querySelector('.overlay');
const paymentBtn = document.querySelector('.booking-payment__btn');
const INPUT_DATE = document.querySelector('.input--date');
const INPUT_TIME = document.querySelector('.input--time');
const timeSlotList = document.querySelector('.js-time__list')
const timeSlots = document.querySelectorAll('.js-time__option')
const INPUT_NAME = document.querySelector('.input--name');
const INPUT_EMAIL = document.querySelector('.input--email');
const INPUT_PHONE = document.querySelector('.input--phone');
const SELECT_TICKET_TYPE = document.querySelector('.field__ticket-type');
const TICKET_DATE = document.querySelector('.js-booking-date');
const TICKET_TIME = document.querySelector('.js-booking-time');

const TODAY = new Date();
const MIN_DATE = TODAY.toISOString().slice(0, 10);

const ERROR_TEXT_NAME = 'Please enter your name, e.g. Alexandra I (3 to 15 latin or cyrilic characters).';
const ERROR_TEXT_EMAIL = 'Please enter a valid email, e.g. User-Name_@exapmle.com.';
const ERROR_TEXT_PHONE = 'Please enter a valid phone number, maximum 10 digits, eg. 628-456-179';
const ERROR_TEXT_DATE = 'Please pick a date of your visit.';
const ERROR_TEXT_TIME = 'Please pick a time of your visit.';
const ERROR_TEXT_TICKET_TYPE = 'Please select a ticket type.'

function showBookingForm() {
  modalWindow.classList.add('open');
  overlay.classList.add('open');
}

function closeBookingForm() {
  modalWindow.classList.remove('open');
  overlay.classList.remove('open');
}

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

function getValue() {
  let value = this.value;
  this.setAttribute('data-placeholder', value);
  setValue(this.value);
}

function setValue(value) {
  const pickedDate = new Date(value);
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(pickedDate)
  const date = pickedDate.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(pickedDate);
  TICKET_DATE.innerText = `${day}, ${month} ${date}`;
}

function openTimeSlots() {
  timeSlotList.classList.add('picked');
}

function closeTimeSlots() {
  timeSlotList.classList.remove('picked');
}

function pickTimeSlot(event) {
  TICKET_TIME.innerHTML = event.currentTarget.innerHTML;
  INPUT_TIME.setAttribute('data-placeholder', TICKET_TIME.innerHTML);
  closeTimeSlots();
}

function checkInputs() {
  if (INPUT_EMAIL.value === '') {
    showError(INPUT_EMAIL, ERROR_TEXT_EMAIL);
  }
}

function showError(input, message) {
  input.nextElementSibling.innerHTML = message;
}

const checkNameParameters = () => {
  const regName = /^[а-яА-Яёa-zA-Я\s]+$/;

  if ((INPUT_NAME.value.length > 15 || INPUT_NAME.value.length < 3) || !(regName.test(INPUT_NAME.value))) return false;
  
  return true;
};

const checkEmailParameters= () => {
  const regEmail = /^[a-z0-9_-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/i;
  if (!(regEmail.test(INPUT_EMAIL.value))) return false;
  
  return true;
};


const checkPhoneParameters = (phone) => {
  let totalDigitCount = 0;
  let currentGroupDigitCount = 0;
  let isHyphen = false;
  let isSpace = false;
  const hyphen = '-';
  const space = ' ';
  let phoneNumber = phone;

  function isNumber(char) {
    return !Number.isNaN(+char);
  }

  function isAcceptableChar(char) {
    return isNumber(char) || char === hyphen || char === space;
  }

  for (let char of phone) {
    if (!isAcceptableChar(char)) {
      return false;
    }
    if (char === space) {
      if (currentGroupDigitCount < 2 && !isSpace) {
        return false;
      }
      else {
        isSpace = true;
        currentGroupDigitCount = 0;
      }
    }
    if (char === hyphen) {
      if ((currentGroupDigitCount < 2) && !isHyphen) {
        return false;
      }
      else {
        isSpace = true;
        currentGroupDigitCount = 0;
      }
    }
    if (char !== space && isNumber(char)) {
      totalDigitCount++;
      if (currentGroupDigitCount < 3) {
        currentGroupDigitCount++;
      }
    }
    if (!isNumber(char) && totalDigitCount > 10) {
       return false;
    }
    if ((char === hyphen || char === space) && totalDigitCount >= 10) {
      return false;
    }
    if (totalDigitCount === 0 || totalDigitCount > 10) {
      return false;
    }
  }

  if (phone.split(space).some((el, index, array) => (array.length > 1 && el.length > 3))) {
    return false;
  }

  if (phone.split(hyphen).some((el, index, array) => (array.length > 1 && el.length > 3))) {
    return false;
  }

  if (currentGroupDigitCount < 2) return false;


  return true;
};

bookBtn.addEventListener('click', showBookingForm);
closeBookingBtn.addEventListener('click', closeBookingForm);

paymentBtn.addEventListener('click', addRipple);

INPUT_DATE.addEventListener('input', getValue);
INPUT_TIME.addEventListener('input', getValue);
INPUT_TIME.addEventListener('focus', openTimeSlots);
INPUT_TIME.addEventListener('change', closeTimeSlots);
timeSlots.forEach(timeSlot => timeSlot.addEventListener('click', pickTimeSlot));

INPUT_DATE.min = MIN_DATE;


FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  checkInputs();
});

INPUT_NAME.addEventListener('input', () => {
  const isValid = checkNameParameters();

  if (!isValid) {
    INPUT_NAME.parentElement.classList.remove('valid');
    INPUT_NAME.parentElement.classList.add('error');
    showError(INPUT_NAME, ERROR_TEXT_NAME);
  }
  else {
    INPUT_NAME.parentElement.classList.remove('error');
    INPUT_NAME.parentElement.classList.add('valid');
    showError(INPUT_NAME, '');
  }
});

INPUT_EMAIL.addEventListener('input', () => {
  const isValid = checkEmailParameters();
  if (!isValid) {
    INPUT_EMAIL.parentElement.classList.remove('valid');
    INPUT_EMAIL.parentElement.classList.add('error');
    showError(INPUT_EMAIL, ERROR_TEXT_EMAIL);
  }
  else {
    INPUT_EMAIL.parentElement.classList.remove('error');
    INPUT_EMAIL.parentElement.classList.add('valid');
    showError(INPUT_EMAIL, '');
  }
});

INPUT_PHONE.addEventListener('input', (event) => {
  const isValid = checkPhoneParameters(INPUT_PHONE.value);
  if (!isValid) {
    INPUT_PHONE.parentElement.classList.remove('valid');
    INPUT_PHONE.parentElement.classList.add('error');
    showError(INPUT_PHONE, ERROR_TEXT_PHONE);
  }
  else {
    INPUT_PHONE.parentElement.classList.remove('error');
    INPUT_PHONE.parentElement.classList.add('valid');
    showError(INPUT_PHONE, '');
  }
});
