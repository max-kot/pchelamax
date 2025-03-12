export class CurrentYear {
	constructor(selector, options) {
		const defaultOptions = {
			separator: '-'
		};

		this.options = { ...defaultOptions, ...options };

		this.selector = selector || '[data-year]';
		this.elements = document.querySelectorAll(this.selector);

		this.init();
	}

	init() {
		if (!this.elements.length) {
			console.warn(`[CurrentYear]: Selector ${this.selector} is not found!`);
			return
		}

		const { separator } = this.options;
		this.elements.forEach(element => {
			const year = new Date(element.innerText.trim()).getFullYear();
			const currentYear = new Date().getFullYear();

			if (year < currentYear) {
				element.innerHTML = `${year} ${separator} ${currentYear}`;
			}
		})
	}
}