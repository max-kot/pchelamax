/**
 * data-validator ==> ставиться нужной форме
 * data-validator-required ==> проверяет наличие символов в поле ввода, как required
 * data-validator-min="10" ==> проверяет мин кол-во символов в поле ввода
 * data-validator-max="42" ==> проверяет макс кол-во символов в поле ввода
 * data-validator-same="input#id.class" ==> проверяет схожесть с указанным другим инпутом, указывать другой инпут можно любым селектором (для проверки одинаковых паролей)
 * data-validator-email ==> проверяет правильность ввода эл-почты
 * data-validator-phone ==> проверяет правильность ввода телефона
 */
export class FormValidator {
	constructor(selector, options) {
		const defaultOptions = {
			dynamicChecker: true,

			successClass: '_success',
			errorClass: '_error',

			inputField: '[data-validator-field]',

			needSpecErrorClass: true,
			errorClasses: {
				required: '_required',
				min: '_min',
				max: '_max',
				email: '_email',
				same: '_same',
				phone: '_phone',
			},

			requiredAttr: 'data-validator-required',
			minAttr: 'data-validator-min',
			maxAttr: 'data-validator-max',
			sameAttr: 'data-validator-same',
			emailAttr: 'data-validator-email',
			phoneAttr: 'data-validator-phone',

			errorMessage: {
				create: false,
				className: 'error-message',
				dataAttr: 'data-validator-error-message',
				innerHTML: {
					required: 'Please, fill out the field',
					min: 'The minimum number of characters is',
					max: 'The maximum number of characters is',
					email: 'Please, fill out the valid email',
					same: 'This field must be the same as',
					phone: '',
				}
			},

			successMessage: {
				create: false,
				className: 'success-message',
				dataAttr: 'data-validator-success-message',
				innerHTML: 'Success'
			},
		}

		this.options = Object.assign(defaultOptions, options);
		this.selector = selector || '[data-validator]';
		this.allForms = document.querySelectorAll(this.selector);

		this.isValid = true;

		this.events();
	}

	setError(inputField, specClass) {
		inputField.classList.remove(this.options.successClass);
		inputField.classList.add(this.options.errorClass);
		this.options.needSpecErrorClass && specClass && inputField.classList.add(specClass);
	}

	setSuccess(inputField, specClass) {
		inputField.classList.remove(this.options.errorClass);
		inputField.classList.add(this.options.successClass);
		this.options.needSpecErrorClass && specClass && inputField.classList.remove(specClass);
	}

	validateEmail(email) {
		const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
		return EMAIL_REGEXP.test(String(email).toLowerCase()); // true / false
	}

	checkInputs(input) {
		this.isValid = true;
		const inputField = input.parentElement;

		// required
		if (input.hasAttribute(this.options.requiredAttr) || input.hasAttribute('required')) {
			if (input.value.trim()) {
				this.setSuccess(inputField, this.options.errorClasses.required);
			} else {
				this.isValid = false;
				this.setError(inputField, this.options.errorClasses.required);
			}
		}

		// min
		if (input.hasAttribute(this.options.minAttr)) {
			if (input.value.length >= input.getAttribute(this.options.minAttr)) {
				this.setSuccess(inputField, this.options.errorClasses.min);
			} else {
				this.isValid = false;
				this.setError(inputField, this.options.errorClasses.min);
			}
		}

		// max
		if (input.hasAttribute(this.options.maxAttr)) {
			if (input.value.length <= input.getAttribute(this.options.maxAttr)) {
				this.setSuccess(inputField, this.options.errorClasses.max);
			} else {
				this.isValid = false;
				this.setError(inputField, this.options.errorClasses.max);
			}
		}

		// email
		if (input.hasAttribute(this.options.emailAttr)) {
			input.getAttribute('type') === 'email' && input.setAttribute('type', 'text');

			if (this.validateEmail(input.value)) {
				this.setSuccess(inputField, this.options.errorClasses.email);
			} else {
				this.isValid = false;
				this.setError(inputField, this.options.errorClasses.email);
			}
		}

		// same
		if (input.hasAttribute(this.options.sameAttr)) {
			const sameEl = document.querySelector(input.getAttribute(this.options.sameAttr));

			if (input.value === sameEl.value) {
				this.setSuccess(inputField, this.options.errorClasses.same);
			} else {
				this.isValid = false;
				this.setError(inputField, this.options.errorClasses.same);
			}
		}

		return this.isValid;
	}

	events() {
		if (this.allForms.length) {
			this.allForms.forEach(form => {
				const allInputs = form.querySelectorAll('input');

				if (this.options.dynamicChecker) {
					const checkValidationDynamic = (input) => {
						this.checkInputs(input);
						if (!this.isValid) {
							this.setError(input.closest(this.selector));
						} else {
							this.setSuccess(input.closest(this.selector));
						}
					}
					allInputs.forEach(input => {
						input.addEventListener('input', () => checkValidationDynamic(input));
						input.addEventListener('blur', () => checkValidationDynamic(input));
					})
				}
				form.addEventListener('submit', (event) => {
					let submitBtn = form.querySelector('[type=submit]');

					allInputs.forEach(input => {
						this.checkInputs(input);
					})

					if (!this.isValid) {
						this.setError(form);
						event.preventDefault()
					} else {
						this.setSuccess(form);
					}

				})
			})
		} else {
			console.warn(`[FormValidator] Selector '${this.selector}' is not found!`)
		}
	}
}