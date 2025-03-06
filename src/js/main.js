import { Menu } from "./modules/Menu";
import { AutoCalc } from "./modules/AutoCalc.js";
import { HideHeader } from "./modules/HideHeader.js";
import { RunningLine } from "./modules/RunningLine.js";
import { Tabs } from "./modules/Tabs.js";
import { Modal } from "./modules/Modal.js";
import { Spoiler } from "./modules/Spoiler.js";
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
		ariaLabel: langRu ? 'Закрыть модальное окно' :'Close modal'
	},
});

new Spoiler();