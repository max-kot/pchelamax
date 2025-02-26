export class HideMenu {
	constructor(selector, options) {
		const defaultOptions = {
			offset: 'auto',
		};

		this.options = Object.assign(defaultOptions, options);
		this.selector = selector || '.header';
		this.element = document.querySelector(this.selector);

		this.init();
	}

	init() {
		if (!this.element) {
			console.warn(`[HideMenu]: Selector ${this.selector} is not found!`);
			return
		}
		let { offset } = this.options;
		window.addEventListener('scroll', (event) => {
			offset = offset === 'auto' ? this.element.offsetHeight / 2 : offset;

		})
	}
}