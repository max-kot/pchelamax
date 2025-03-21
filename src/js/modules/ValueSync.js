export class ValueSync {
	constructor(selector, options) {
		const defaultOptions = {
			idAttr: 'data-value-sync'
		};

		this.options = { ...defaultOptions, ...options };
		this.selector = selector || '[data-value-sync]';
		this.inputs = document.querySelectorAll(this.selector);
		this.init();
	}

	syncValue(currentInput, currentIndex) {
		const { idAttr } = this.options;

		const id = currentInput.getAttribute(idAttr);

		this.inputs.forEach((input, index) => {
			if (currentInput !== input && input.getAttribute(idAttr) === id) {
				input.value = currentInput.value;
			}
		})
	}

	init() {
		if (!this.inputs.length) {
			console.warn(`[ValueSync]: Selector ${this.selector} is not found!`);
			return
		}

		this.inputs.forEach((input, index) => {
			input.addEventListener('input', () => this.syncValue(input, index));
			input.addEventListener('change', () => this.syncValue(input, index));
		})
	}
}