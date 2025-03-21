import Swiper from 'swiper/bundle';

import { Menu } from "./modules/Menu";
import { AutoCalc } from "./modules/AutoCalc.js";
import { HideHeader } from "./modules/HideHeader.js";
import { RunningLine } from "./modules/RunningLine.js";
import { Tabs } from "./modules/Tabs.js";
//import { Modal } from "./modules/Modal2.js";
import { Modal } from "./modules/Modal.js";
import { Spoiler } from "./modules/Spoiler.js";
import { Select } from "./modules/Select.js";
import { ValueChecker } from "./modules/ValueChecker.js";
import { FormValidator } from "./modules/FormValidator.js";
import { CurrentYear } from "./modules/CurrentYear.js";
import { ValueSync } from "./modules/ValueSync.js";
import { Loader } from "./modules/Loader.js";

const langRu = document.querySelector('html').classList.contains('ru');

new AutoCalc();

new Menu(".menu", {
	btnSelector: ".burger-btn",
	listSelector: ".menu",
});

new HideHeader('.header', { showScrollEnd: false, backgroundClass: 'header-bg' });
new RunningLine('[data-running-line]', {
	quantity: 15,
});

new Tabs();

new Modal('[data-modal]', {
	closeButton: {
		innerHTML: `<span>${langRu ? 'Закрыть' : 'Close'}</span>`,
		ariaLabel: langRu ? 'Закрыть модальное окно' : 'Close modal'
	},
});


new Spoiler();

new Swiper('.reviews-slider', {
	slidesPerView: 'auto',
	grabCursor: true,
	scrollbar: {
		el: ".reviews-slider__scrollbar",
		draggable: true,
	}
})

new Select('[data-select]', { syncAttr: 'data-value-sync' });
new ValueChecker('input, textarea', { watchAll: true });
new FormValidator();
new CurrentYear();
new ValueSync();
new Loader()

function colorChanger() {
	const colorChanger = document.createElement('div');
	colorChanger.classList.add('color-changer');
	const colorChangerList = document.createElement('ul');
	colorChangerList.classList.add('color-changer__list');
	colorChanger.insertAdjacentElement('beforeend', colorChangerList);
	

	const colors = [
		{
			color: '#FFD43B',
			subColor: '#212529',
			text: '#495057'
		},
		{
			color: '#0ABAB5',
			subColor: '#212529',
			text: '#495057'
		},
		{
			color: '#6741D9',
			subColor: '#f8f9fa',
			text: '#f8f9fa'
		},
		{
			color: '#40C057',
			subColor: '#f8f9fa',
			text: '#f8f9fa'
		},
		{
			color: '#8EDB21',
			subColor: '#f8f9fa',
			text: '#f8f9fa'
		},
		{
			color: '#1C7ED6',
			subColor: '#f8f9fa',
			text: '#f8f9fa'
		},
		{
			color: '#4C6EF5',
			subColor: '#f8f9fa',
			text: '#f8f9fa'
		},
	]

	colors.forEach(({ color }, index) => colorChangerList.innerHTML += `<li class="color-changer__item"><button class="color-changer__btn" type="button" data-color-changer="${index}" style="--color:${color}"></button></li>`);

	colorChanger.innerHTML += `<label class="color-changer__label">Акцентный цвет: <input type="color" class="color-changer__color-picker" value="${colors[0].color}"></label>`;
	colorChanger.innerHTML += `<label class="color-changer__label">Акцентный цвет текста 1: <input type="color" class="color-changer__color-picker" value="${colors[0].subColor}"></label>`;
	colorChanger.innerHTML += `<label class="color-changer__label">Акцентный цвет текста 2: <input type="color" class="color-changer__color-picker" value="${colors[0].text}"></label>`;

	document.body.insertAdjacentElement('beforeend', colorChanger);


	document.querySelectorAll('.color-changer__btn').forEach((btn) => btn.addEventListener('click', () => {
		const index = btn.getAttribute('data-color-changer');
		document.querySelector(':root').style.setProperty(`--color-accent`, colors[index].color);
		document.querySelector(':root').style.setProperty(`--color-sub-accent`, colors[index].subColor);
		document.querySelector(':root').style.setProperty(`--color-text-accent`, colors[index].text);

		const colorPicker = document.querySelectorAll('.color-changer__color-picker');
		colorPicker[0].value = colors[index].color;
		colorPicker[1].value = colors[index].subColor;
		colorPicker[2].value = colors[index].text;
	}))

	document.querySelectorAll('.color-changer__color-picker').forEach((picker, index) => picker.addEventListener('input', () => {
		if (index === 0) document.querySelector(':root').style.setProperty(`--color-accent`, picker.value);
		if (index === 1) document.querySelector(':root').style.setProperty(`--color-sub-accent`, picker.value);
		if (index === 2) document.querySelector(':root').style.setProperty(`--color-text-accent`, picker.value);
	}))
}

colorChanger() 