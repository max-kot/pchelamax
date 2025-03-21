export class ValueChecker {
	constructor(selector, options) {
		const defaultOptions = {
			className: 'has-value',
			watchAll: false, // нужен для синхронного плагина ValueSync
		}
		this.selector = selector || 'input, textarea';
		this.options = { ...defaultOptions, ...options };
		this.allInputs = document.querySelectorAll(this.selector);
		this.init()
	}

	compareValue(input) {
		const { className } = this.options;

		if (input.value.trim()) {
			input.classList.add(className)
		} else {
			input.classList.remove(className)
		}
	}
	checkValue(input) {
		const { watchAll } = this.options;

		if (watchAll) {
			this.allInputs.forEach(inputItem => {
				this.compareValue(inputItem)
			})
		}

		this.compareValue(input);
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