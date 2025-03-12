import Swiper from 'swiper/bundle';

import { Menu } from "./modules/Menu";
import { AutoCalc } from "./modules/AutoCalc.js";
import { HideHeader } from "./modules/HideHeader.js";
import { RunningLine } from "./modules/RunningLine.js";
import { Tabs } from "./modules/Tabs.js";
import { Modal } from "./modules/Modal.js";
import { Spoiler } from "./modules/Spoiler.js";
import { Select } from "./modules/Select.js";
import { ValueChecker } from "./modules/ValueChecker.js";
import { FormValidator } from "./modules/FormValidator.js";
import { CurrentYear } from "./modules/CurrentYear.js";

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
	closeBtn: {
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

new Select();
new ValueChecker();
new FormValidator();
new CurrentYear();

