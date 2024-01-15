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
			translate: ["110%", 0, 0],
		},
	},

	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	}
})

function startModalSlider() {
	const modalSlider = new Swiper('.modal-slider', {
		loop: true,
		autoplay: true,
		grabCursor: true,

		effect: "creative",
		creativeEffect: {
			prev: {
				translate: [0, 0, -400],
			},
			next: {
				translate: ["110%", 0, 0],
			},
		},

		pagination: {
			el: '.modal-slider__pagination',
			clickable: true,
		},

		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		}
	})
}
startModalSlider();

export { startModalSlider };