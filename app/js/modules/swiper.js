import Swiper from "swiper/bundle";

const firstSlider = new Swiper('.first-slider', {
	loop: true,
	autoplay: true,
	autoHeight: true,
	
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	 },

	pagination: {
		el: '.first-slider__pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.first-slider__btn-next',
		prevEl: '.first-slider__btn-prev',
	},

})