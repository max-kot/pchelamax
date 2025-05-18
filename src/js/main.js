import Swiper from 'swiper/bundle';

import { Menu } from "./modules/Menu";
import { AutoCalc } from "./modules/AutoCalc.js";
import { HideHeader } from "./modules/HideHeader.js";
import { AdaptiveMover } from "./modules/AdaptiveMover.js";
//import { RunningLine } from "./modules/RunningLine.js";
//import { Tabs } from "./modules/Tabs.js";
import { Modal } from "./modules/Modal.js";
//import { Counter } from "./modules/Counter.js"; //!
import { Cart } from "./modules/Cart.js";
import { Filter } from "./modules/Filter.js";
//import { Spoiler } from "./modules/Spoiler.js";
//import { Select } from "./modules/Select.js";
//import { ValueChecker } from "./modules/ValueChecker.js";
//import { FormValidator } from "./modules/FormValidator.js";
//import { CurrentYear } from "./modules/CurrentYear.js";
//import { ValueSync } from "./modules/ValueSync.js";
//import { Loader } from "./modules/Loader.js";
//import { SendForm } from "./modules/SendForm.js";
import { SmoothScroll } from "./modules/SmoothScroll.js";

new SmoothScroll();
new AutoCalc();

new Menu(".menu", {
	btnSelector: ".menu__burger-btn",
	listSelector: ".menu",
});

new HideHeader('.header', { showScrollEnd: false, backgroundClass: 'header-bg' });

new Swiper('.hero-swiper', {
	loop: true,

	pagination: {
		el: '.hero-swiper__pagination',
		clickable: true,
	}
})

new AdaptiveMover();

new Modal('[data-modal]', {
	closeButton: {
		innerHTML: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.3042 2.55635C27.89 1.97056 27.89 1.02081 27.3042 0.435029C26.7184 -0.150757 25.7686 -0.150758 25.1828 0.435029L13.8691 11.7487L2.55543 0.435029C1.96965 -0.150758 1.0199 -0.150757 0.434112 0.435029C-0.151674 1.02081 -0.151674 1.97056 0.434112 2.55635L11.7478 13.8701L0.434111 25.1838C-0.151675 25.7696 -0.151675 26.7193 0.434111 27.3051C1.0199 27.8909 1.96965 27.8909 2.55543 27.3051L13.8691 15.9914L25.1828 27.3051C25.7686 27.8909 26.7184 27.8909 27.3042 27.3051C27.89 26.7193 27.89 25.7696 27.3042 25.1838L15.9905 13.8701L27.3042 2.55635Z" fill="#495057"/>
</svg>
`,
		ariaLabel: 'Закрыть',
	}
})
// список с базой данных товаров
const productData = [
	{
		id: 0,
		title: '1 Мёд 0,5л',
		href: '#',
		description: ['2024 год', 'Разнотравье'],
		image: 'src/assets/images/product-1.jpg',
		category: 'Мёд',
		price: 8,
		max: '50',
		min: '1'
	},
	{
		id: 1,
		title: '2 Яйца перепелиные 20 шт',
		href: '#',
		description: ['Домашние'],
		image: 'src/assets/images/product-2.jpg',
		category: 'Фермерские продукты',
		price: 4,
		max: '20',
		min: '1'
	}, {
		id: 2,
		title: '3 Мёд 0,5л',
		href: '#',
		description: ['2024 год', 'Разнотравье'],
		image: 'src/assets/images/product-1.jpg',
		category: 'Мёд',
		price: 8,
		max: '50',
		min: '1'
	},
	{
		id: 3,
		title: '4 Яйца перепелиные 20 шт',
		href: '#',
		description: ['Домашние'],
		image: 'src/assets/images/product-2.jpg',
		category: 'Фермерские продукты',
		price: 4,
		max: '30',
		min: '1'
	},
	{
		id: 4,
		title: '5 Яйца перепелиные 20 шт',
		href: '#',
		description: ['Домашние'],
		image: 'src/assets/images/product-2.jpg',
		category: 'Фермерские продукты',
		price: 4,
		max: '5',
		min: '1'
	}
];

new Cart(productData, {
	itemClass: ['cart__product', 'cart-product'],
	renderItem: (item) => {
		return `<div class="cart-product__image"><img src="${item.image}"></div>
					<div class="cart-product__content">
						<div class="cart-product__content-col">
							<h3 class="cart-product__name title-3">${item.title}</h3>
							<ul class="cart-product__descr-list descr-list">
								${item.description.map(descr => `<li class="descr-list__item">${descr}</li>`).join('')}
							</ul>
							<div class="cart-product__counter-box">
								<small class="cart-product__price-for-one"><span data-cart-price-for-one>${item.price}</span> руб за шт</small>
								<div class="cart-product__counter counter" data-cart-counter>
									<button class="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-cart-counter-btn-minus>-</button>
									<input class="counter__input" type="number" max="${item.max}" min="${item.min}" value="1" data-cart-counter-input data-cart-quantity-value/>
									<button class="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-cart-counter-btn-plus>+</button>
								</div>
							</div>
						</div>
						<div class="cart-product__content-col">
							<button class="cart-product__remove-btn" type="button" aria-label="Удалить товар" data-cart-btn-remove><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 6H5H21" stroke="#CED4DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#CED4DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></button>
							<span class="cart-product__price price"><span data-cart-price>${item.price}</span> руб</span>
						</div>
					</div>`
	},
	renderFormItemText: (item) => `> ${item.title} | ${item.price}`,
	renderFormTotalInfo: (cart) => `[🛒ИТОГО]: ${cart.reduce((acc, item) => acc += item.quantity * item.price, 0)} руб`
});

new Swiper('.products-filters', {
	slidesPerView: 'auto',
	mousewheel: true,
	keyboard: {
		enabled: true,
	},
	navigation: {
		nextEl: '.products-filters__btn-next',
		prevEl: '.products-filters__btn-prev',
	},
})
document.querySelectorAll('.slider-modal-swiper').forEach(swiperEl => {
	const nextBtn = swiperEl.parentElement.querySelector('.slider-modal__btn-next');
	const prevBtn = swiperEl.parentElement.querySelector('.slider-modal__btn-prev');
	const pagination = swiperEl.parentElement.querySelector('.slider-modal__pagination')
	new Swiper(swiperEl, {
		loop: true,
		navigation: {
			nextEl: nextBtn,
			prevEl: prevBtn,
		},
		pagination: {
			el: pagination,
			type: "fraction",
		},
	})
})

const aboutSlider = new Swiper('.about-slider', {
	loop: true,
	effect: "fade",
	allowTouchMove: false,
})

const aboutTextSlider = new Swiper('.about-text-slider', {
	loop: true,
	navigation: {
		nextEl: '.about__btn-next',
		prevEl: '.about__btn-prev',
	},
	pagination: {
		el: '.about__pagination',
		clickable: true,
	},
	thumbs: {
		swiper: aboutSlider,
	},
})
new Filter();
