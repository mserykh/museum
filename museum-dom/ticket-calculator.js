const BASIC_PRICES = {
  'permanent_exhibition': 20,
  'temporary_exhibition': 25,
  'combined_admission': 40,
};

const SENIOR_DISCOUNT = 0.5;

const SENIOR_PRICES = { 
  'permanent_exhibition': (1 - SENIOR_DISCOUNT) * BASIC_PRICES['permanent_exhibition'],
  'temporary_exhibition': (1 - SENIOR_DISCOUNT) * BASIC_PRICES['temporary_exhibition'],
  'combined_admission': (1 - SENIOR_DISCOUNT) * BASIC_PRICES['combined_admission'],
};

const ticketQtyContainer = document.querySelector('.js-overview-ticket-qty-container');
const ticketBasicAmountInputOverview = document.querySelector('.js-overview-basic-ticket-qty-input');
const ticketSeniorAmountInputOverview = document.querySelector('.js-overview-senior-ticket-qty-input');
const ticketAmountInputsOverwview = document.querySelectorAll('.js-overview-ticket-qty-input');
const addTicketBtnsOverview = document.querySelectorAll('.js-overview-add-ticket');
const removeTicketBtnsOverview = document.querySelectorAll('.js-overview-remove-ticket');
const ticketTypesOverview = document.querySelectorAll('.js-overview-ticket-type');
const totalAmountOverview = document.querySelector('.js-overview-total');

function findContainer(btn) {
  let container = btn.parentNode;
  while (container.className === 'js-overview-ticket-qty-container') {
    container = container.parentNode;
  }
  return container;
}

function findInput(container) {
  for (let input of container.childNodes) {
    if (input === ticketBasicAmountInputOverview || input === ticketSeniorAmountInputOverview) {
      return input;
    }
  }
}

function addTicketQty(input) {
  return input.value = (input.value < 20) ? Number(input.value) + 1 : 20;
}

function removeTicketQty(input) {
  return input.value = (input.value > 0) ? Number(input.value) - 1 : 0;
}

function recalculateAmount(event) {
  const container = findContainer(event.currentTarget);
  const input  = findInput(container);
  let inputValue = 0;
  if (event.currentTarget.classList.contains('js-overview-add-ticket')) {
    inputValue = addTicketQty(input);
  }
  if (event.currentTarget.classList.contains('js-overview-remove-ticket')) {
    inputValue = removeTicketQty(input);
  }
  recalculateTotal();
  return inputValue;
}

function getTicketType() {
  pickedTicketType = ([...ticketTypesOverview].filter(ticketType => ticketType.checked)[0] || {}).id;
  recalculateTotal();
}

function recalculateTotal() {
  qtyBasic = +ticketAmountInputsOverwview[0].value;
  qtySenior = +ticketAmountInputsOverwview[1].value;
  ticketType = pickedTicketType;
  totalAmountOverview.textContent = BASIC_PRICES[ticketType] * qtyBasic + SENIOR_PRICES[ticketType] * qtySenior;
}

getTicketType();
recalculateTotal();

addTicketBtnsOverview.forEach(btn => btn.addEventListener('click', recalculateAmount));
removeTicketBtnsOverview.forEach(btn => btn.addEventListener('click', recalculateAmount));
ticketTypesOverview.forEach(ticketType => ticketType.addEventListener('change', getTicketType));
