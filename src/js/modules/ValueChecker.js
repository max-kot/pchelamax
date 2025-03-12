export class ValueChecker {
	constructor(selector, options) {
		const defaultOptions = {
			className: 'has-value'
		}
		this.selector = selector || 'input, textarea';
		this.options = { ...defaultOptions, ...options };
		this.allInputs = document.querySelectorAll(this.selector);
		this.init()
	}

	checkValue(input) {
		const { className } = this.options;

		if (input.value.trim()) {
			input.classList.add(className)
		} else {
			input.classList.remove(className)
		}
	}

	init() {
		if (!this.allInputs.length) {
			console.warn(`[ValueChecker]: Selector ${this.selector} is not found!`);
			return
		}

		this.allInputs.forEach(input => {
			input.addEventListener('change', () => this.checkValue(input))
			input.addEventListener('input', () => this.checkValue(input))
		})
	}
}