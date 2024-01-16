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
const reviewSlider = new Swiper('.reviews-slider', {
	loop: true,
	autoplay: true,
	slidesPerView: 1,
	spaceBetween: 30,
	navigation: {
		nextEl: '.reviews-slider__btn-next',
		prevEl: '.reviews-slider__btn-prev',
	},

	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},

	breakpoints: {
		// when window width is >= 400px
		400: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		// when window width is >= 600px
		600: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 800px
		800: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		// when window width is >= 1000px
		1000: {
			slidesPerView: 3,
			spaceBetween: 40
		},
	},
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