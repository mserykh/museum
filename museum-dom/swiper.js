const currentSlideIndex = document.querySelector('.slider__current-slide');
const lastSlideIndex = document.querySelector('.slider__last-slide');

const swiper = new Swiper('.welcome__slider', {
  slidesPerView: 1,
  loop: true,
  paginationClickable: true,
  pagination: {
    el: '.slider__dots',
    clickable: true,
  },
  navigation: {
		nextEl: ".slider__arrow--forward",
		prevEl: ".slider__arrow--back",
	},
});

swiper.on('activeIndexChange', function () {
  currentSlideIndex.innerHTML = `0${swiper.realIndex + 1}`;
  lastSlideIndex.innerHTML = `0${swiper.slides.length - 2}`;
});
