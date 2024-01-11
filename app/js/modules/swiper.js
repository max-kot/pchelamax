import Swiper from "swiper/bundle";

const taglineSlider = new Swiper('.tagline__slider', {
	loop: true,
	autoplay: true,
	autoHeight: true,
	spaceBetween: 40,
	grabCursor: true,
	
	effect: "creative",
	creativeEffect: {
		prev: {
			translate: [0, 0, -400],
		},
		next: {
			translate: ["100%", 0, 0],
		},
	},

	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	}
})