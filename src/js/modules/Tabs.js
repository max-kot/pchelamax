export class Tabs {
	constructor(selector, options) {
		const defaultOptions = {
			activeClass: 'active',
			tabSelector: '[data-tab]'
		}

		this.options = Object.assign(defaultOptions, options);
		this.selector = selector || '[data-tab-button]';
		this.buttons = document.querySelectorAll(this.selector);
		this.tabs = document.querySelectorAll(this.options.tabSelector);

		this.init();
	}

	addActiveClass(...elements) {
		const { activeClass } = this.options;
		elements.forEach(el => el.classList.add(activeClass));
	}

	removeActiveForAll(btns, tabs) {
		const { activeClass } = this.options;
		const elements = [...btns, ...tabs];
		elements.forEach(el => el.classList.remove(activeClass))
	}

	init() {
		if (!this.buttons.length) {
			console.warn(`[Tabs]: Selector '${this.selector}' is not found!`);
			return;
		}

		this.addActiveClass(this.buttons[0], this.tabs[0]);

		this.buttons.forEach((button) => {
			button.addEventListener('click', (e) => {
				const isLink = button.tagName === 'A';
				const id = button.getAttribute(isLink ? 'href' : 'data-tab-button');

				const currentTab = document.querySelector(`${id}`);

				this.removeActiveForAll(this.buttons, this.tabs)
				this.addActiveClass(button, currentTab);

				isLink && e.preventDefault()
			})
		})
	}
}