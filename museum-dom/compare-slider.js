const slider = document.querySelector('.js-explore-slide-bar');
const imageOverlay = document.querySelector('.js-explore-overlay');

function initComparison() {
  compareImages(imageOverlay);
}

function compareImages(image) {
  const width = 720;
  let clicked = 0;
  image.style.width = 440 + "px";
  slider.style.left = 440 - (slider.offsetWidth / 2) + "px";


  function slideReady(event) {
    event.preventDefault();
    clicked = 1;
    document.addEventListener("mousemove", slideMove);
  }

  function slideFinish() {
    clicked = 0;
  }

  function slideMove(event) {
    let position;
    if (clicked === 0) return false;
    position = getCursorPosition(event)
    if (position < 0) position = 0;
    if (position > width) position = width;
    slide(position);
  }

  function getCursorPosition(event) {
    const rect =  image.getBoundingClientRect();
    let cursorPosition = 0;
    event = (event.changedTouches) ? event.changedTouches[0] : event;
    cursorPosition = event.pageX - rect.left;
    cursorPosition = cursorPosition - window.pageXOffset;
    return cursorPosition;
  }

  function slide(cursorPosition) {
    image.style.width = cursorPosition + "px";
    slider.style.left = image.offsetWidth - (slider.offsetWidth / 2) + "px";
  }

  slider.addEventListener("mousedown", slideReady);
  document.addEventListener("mouseup", slideFinish);
}

initComparison();
