const currentSlideIndex = document.querySelector('.slider__current-slide');
const lastSlideIndex = document.querySelector('.slider__last-slide');

new Swiper('.welcome__slider', {
  slidesPerView: 1,
  loop: true,
  paginationClickable: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
		nextEl: ".slider__arrow--forward",
		prevEl: ".slider__arrow--back",
	},
  onAny(activeIndexChange, slides) {
    currentSlideIndex.innerHTML = `${slides.realIndex + 1}`;
    lastSlideIndex.innerHTML = `${slides.slides.length - 2}`;
  },
});
