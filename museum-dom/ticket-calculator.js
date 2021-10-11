const BASIC_PRICES = {
  'permanent': 20,
  'temporary': 25,
  'combined': 40,
};

const SENIOR_DISCOUNT = 0.5;

const SENIOR_PRICES = { 
  'permanent': (1 - SENIOR_DISCOUNT) * BASIC_PRICES['permanent'],
  'temporary': (1 - SENIOR_DISCOUNT) * BASIC_PRICES['temporary'],
  'combined': (1 - SENIOR_DISCOUNT) * BASIC_PRICES['combined'],
};

let selectedTicketTypeValue = 'permanent';
const ticketsQty = {
  'basic': 1,
  'senior': 1,
};

const ticketQtyContainer = document.querySelector('.js-overview-ticket-qty-container');
const ticketBasicAmountInputOverview = document.querySelector('.js-overview-basic-ticket-qty-input');
const ticketSeniorAmountInputOverview = document.querySelector('.js-overview-senior-ticket-qty-input');
const ticketAmountInputsOverview = document.querySelectorAll('.js-overview-ticket-qty-input');
const addTicketBtnsOverview = document.querySelectorAll('.js-overview-add-ticket');
const removeTicketBtnsOverview = document.querySelectorAll('.js-overview-remove-ticket');
const ticketTypesOverview = document.querySelectorAll('.js-overview-ticket-type');
const totalAmountOverview = document.querySelector('.js-overview-total');

// modal window
const selectTicketType = document.querySelector('.js-booking-select-ticket-type');
const ticketQtyContainerBooking = document.querySelector('.js-booking-ticket-qty-container');
const ticketBasicAmountInputBooking = document.querySelector('.js-booking-basic-ticket-qty-input');
const ticketSeniorAmountInputBooking = document.querySelector('.js-booking-senior-ticket-qty-input');
const ticketAmountInputsBooking = document.querySelectorAll('.js-booking-ticket-qty-input');
const addTicketBtnsBooking = document.querySelectorAll('.js-booking-add-ticket');
const removeTicketBtnsBooking = document.querySelectorAll('.js-booking-remove-ticket');
const ticketTypesBooking = document.querySelectorAll('.js-booking-select-ticket-type'); //!!!!!! redo
const totalAmountBooking = document.querySelector('.js-booking-total');

const ticketTypePrintBooking = document.querySelector('.js-booking-ticket-type')
const basicTicketTotalBooking = document.querySelector('.js-booking-basic-total');
const seniorTicketTotalBooking = document.querySelector('.js-booking-senior-total');
const basicTicketPriceBooking = document.querySelectorAll('.js-basic-ticket-price');
const seniorTicketPriceBooking = document.querySelectorAll('.js-senior-ticket-price');
const ticketBasicAmountBooking = document.querySelector('.js-booking-basic-ticket-qty');
const ticketSeniorAmountBooking = document.querySelector('.js-booking-senior-ticket-qty');

function findContainer(btn) {
  let container = btn.parentNode;

  // TODO: add search if parent is not direct
  /*while (container.className !== 'js-overview-ticket-qty-container' || container.className !== 'js-booking-ticket-qty-container') {
    container = container.parentNode;
  }*/

  return container.dataset.ticketType;
}

function addTicketQty(ticketTypeValue) {
  ticketsQty[ticketTypeValue] = (ticketsQty[ticketTypeValue] < 20) ? Number(ticketsQty[ticketTypeValue]) + 1 : 20;

  updatetucketQty(ticketTypeValue);
}

function removeTicketQty(ticketTypeValue) {
  ticketsQty[ticketTypeValue] = (ticketsQty[ticketTypeValue] > 0) ? Number(ticketsQty[ticketTypeValue]) - 1 : 0;
  updatetucketQty(ticketTypeValue);
}

function updatetucketQty(ticketTypeValue) {
  const containers = document.querySelectorAll(`[data-ticket-type = ${ticketTypeValue}]`);
  containers.forEach(container => {
    for (let input of container.childNodes) {
      if (input.tagName === 'INPUT') {
        input.value = ticketsQty[container.dataset.ticketType];
      }
    }
  });
}

function recalculateAmount(event) {
  const ticketTypeValue = findContainer(event.currentTarget);

  if (event.currentTarget.classList.contains('js-overview-add-ticket') || event.currentTarget.classList.contains('js-booking-add-ticket')) {
    addTicketQty(ticketTypeValue);
  }
  if (event.currentTarget.classList.contains('js-overview-remove-ticket') || event.currentTarget.classList.contains('js-booking-remove-ticket')) {
    removeTicketQty(ticketTypeValue);
  }
  showTicketQty(ticketTypeValue);
  recalculateTotal();
}

function setTicketType() {
  selectTicketType.value = selectedTicketTypeValue;
  const input = [...ticketTypesOverview].find(input => input.value === selectedTicketTypeValue);
  input.checked = true;

  recalculateTotal();
  showTicketType(input);
  showTicketPrice(selectedTicketTypeValue);
}

function updateTicketTypeFromRadio() {
  selectedTicketTypeValue = [...ticketTypesOverview].filter(ticketType => ticketType.checked)[0].value;
  setTicketType()
}

function updateTicketTypeFromSelect() {
  selectedTicketTypeValue = selectTicketType.value;
  setTicketType()
}

function showTicketType(type) {
  ticketTypePrintBooking.innerHTML = type.nextElementSibling.innerText;
}

function showTicketPrice(type) {
  basicTicketPriceBooking.forEach(price => price.innerHTML = BASIC_PRICES[type]);
  seniorTicketPriceBooking.forEach(price => price.innerHTML = SENIOR_PRICES[type]);
}

function showTicketQty() {
  ticketBasicAmountBooking.innerHTML = ticketsQty['basic'];
  ticketSeniorAmountBooking.innerHTML = ticketsQty['senior'];
}

function showTicketTypePrice() {
  basicTicketTotalBooking.innerHTML = ticketsQty['basic'];
}

function recalculateTotal() {
  qtyBasic = +ticketAmountInputsOverview[0].value;
  qtySenior = +ticketAmountInputsOverview[1].value;
  
  basicTicketTotalBooking.innerHTML = BASIC_PRICES[selectedTicketTypeValue] * qtyBasic;
  seniorTicketTotalBooking.innerHTML = SENIOR_PRICES[selectedTicketTypeValue] * qtySenior;
  totalAmountOverview.innerHTML = BASIC_PRICES[selectedTicketTypeValue] * qtyBasic + SENIOR_PRICES[selectedTicketTypeValue] * qtySenior;
  totalAmountBooking.innerHTML = BASIC_PRICES[selectedTicketTypeValue] * qtyBasic + SENIOR_PRICES[selectedTicketTypeValue] * qtySenior;
}

showTicketQty();
setTicketType();
recalculateTotal();

addTicketBtnsOverview.forEach(btn => btn.addEventListener('click', recalculateAmount));
removeTicketBtnsOverview.forEach(btn => btn.addEventListener('click', recalculateAmount));
ticketTypesOverview.forEach(ticketType => ticketType.addEventListener('change', updateTicketTypeFromRadio));


addTicketBtnsBooking.forEach(btn => btn.addEventListener('click', recalculateAmount));
removeTicketBtnsBooking.forEach(btn => btn.addEventListener('click', recalculateAmount));
selectTicketType.addEventListener('change', updateTicketTypeFromSelect);
