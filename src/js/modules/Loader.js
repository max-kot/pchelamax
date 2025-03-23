export class Loader {
	constructor(selector, options) {
		const defaultOptions = {
			hiddenClass: 'loader-hidden',
			htmlClass: 'loader-shown'
		};

		this.options = { ...defaultOptions, ...options };

		this.selector = selector || '[data-loader]';
		this.loader = document.querySelector(this.selector);
		this.init();
	}

	init() {
		if (!this.loader) {
			console.warn(`[Loader]: Selector ${this.selector} is not found!`);
			return
		}

		const { hiddenClass, htmlClass } = this.options;

		window.addEventListener('load', () => setTimeout(() => {
			this.loader.classList.add(hiddenClass);
			document.documentElement.classList.remove(htmlClass);
			document.documentElement.classList.add(hiddenClass);
			setTimeout(() => this.loader.remove(), 5000);
		}, 500))
	}
}