export class Select {
	constructor(selector, options) {
		const defaultOptions = {
			className: {
				active: 'custom-select-active',
				activeButton: 'custom-select-button-active',
				wrapper: 'custom-select',
				input: 'custom-select__input',
				list: 'custom-select__list',
				item: 'custom-select__item',
				button: 'custom-select__button',
			},
			syncAttr: 'data-select-sync',
			buttonAttr: 'data-select-value',
		};

		this.options = { ...defaultOptions, ...options };
		this.selector = selector || '[data-select]'
		this.allSelects = document.querySelectorAll(this.selector);
		this.init();
	}

	copyAttrs(oldEl, newEl) {
		Array.from(oldEl.getAttributeNames()).forEach(attr => {
			const value = oldEl.getAttribute(attr);
			newEl.setAttribute(attr, value);
		})
	}

	copyClass(oldEl, newEl) {
		Array.from(oldEl.classList).forEach(className => newEl.classList.add(className))
	}

	addDefaultAttrs(oldEl, newEl) {
		newEl.setAttribute('name', oldEl.getAttribute('name'));
		newEl.setAttribute('id', oldEl.getAttribute('id'));
		newEl.setAttribute('type', 'text');
	}

	syncInputs(syncId, newValue, currentInput) {
		const { className, syncAttr } = this.options;
		const syncedInputs = document.querySelectorAll(`[${syncAttr}="${syncId}"]`);

		syncedInputs.forEach(input => {
			const wrapper = input.parentElement;

			if (input !== currentInput) {
				input.value = newValue;
				// Убираем старое активное состояние
				wrapper.querySelectorAll(`.${className.activeButton}`).forEach(btn => {
					btn.classList.remove(className.activeButton);
					btn.setAttribute('aria-selected', false);
				});

				// Выделяем нужную кнопку
				const buttons = wrapper.querySelectorAll(`.${className.button}`);
				buttons.forEach(btn => {
					if (btn.textContent === newValue) {
						btn.classList.add(className.activeButton);
						btn.setAttribute('aria-selected', true);
					}
				});
			}
		});
	}

	changeCurrentValue(button, input, wrapper) {
		const { className, syncAttr } = this.options;

		button.addEventListener('pointerdown', () => {
			const newValue = button.innerText;
			input.value = newValue;
			wrapper.classList.toggle(className.active);
			wrapper.setAttribute('aria-expanded', wrapper.classList.contains(className.active));

			wrapper.querySelectorAll(`.${className.activeButton}`).forEach(btn => {
				btn.classList.remove(className.activeButton);
				btn.setAttribute('aria-selected', false);
			});

			button.classList.add(className.activeButton);
			button.setAttribute('aria-selected', true);

			if (syncAttr) {
				const syncId = input.getAttribute(syncAttr);

				if (syncId) {
					this.syncInputs(syncId, newValue, input);
				}
			}

		});
	}

	createOptions(children, list, input, wrapper, selectedOptionIndex) {
		const { className, buttonAttr } = this.options;
		Array.from(children).forEach((option, index) => {
			const value = option.value;
			const text = option.innerText;

			const item = document.createElement('li');
			const button = document.createElement('button');

			item.classList.add(className.item);
			button.classList.add(className.button);
			button.setAttribute(buttonAttr, value);
			button.setAttribute('type', 'button');
			button.innerText = text;

			// Accessability
			button.setAttribute('role', 'option');
			const optionId = `custom-option-${Math.random().toString(36).substr(2, 9)}`;
			button.setAttribute('id', optionId);
			button.setAttribute('aria-selected', index === selectedOptionIndex ? 'true' : 'false');

			if (index === selectedOptionIndex) {
				button.classList.add(className.activeButton);
				input.setAttribute('aria-activedescendant', optionId);
			}

			item.insertAdjacentElement('beforeend', button);
			list.insertAdjacentElement('beforeend', item);
			this.changeCurrentValue(button, input, wrapper);
		})
	}

	closeOtherSelects(currentWrapper) {
		const { className } = this.options;

		const allWrappers = document.querySelectorAll(`.${className.wrapper}`);
		allWrappers.forEach((wrapper) => {
			if (wrapper !== currentWrapper) {
				this.closeSelect(wrapper);
			}
		});
	}

	toggleOptionsList(el, parent) {
		const { className } = this.options;

		el.addEventListener('click', (e) => {
			parent.classList.toggle(className.active);
			parent.setAttribute('aria-expanded', parent.classList.contains(className.active));
		})

		el.addEventListener('keydown', ({ key }) => {
			if (key === 'Enter') {
				parent.classList.toggle(className.active);
				parent.setAttribute('aria-expanded', parent.classList.contains(className.active));
			}
		})
	}

	correctFocus(wrapper, input) {
		const buttons = wrapper.querySelectorAll('button');

		buttons.forEach(button => {
			let lastButton = buttons[buttons.length - 1];

			button.addEventListener('blur', (event) => {
				if (event.target === lastButton) {
					input.focus();
				}
			})
		})

		input.addEventListener('blur', () => buttons[0].focus());
	}

	closeSelect(wrapper) {
		const { className } = this.options;
		wrapper?.classList.remove(className.active);
		wrapper?.setAttribute('aria-expanded', false);;
	}

	createSelect(select) {
		const { className } = this.options;

		const parent = select.parentElement;
		const sibling = select.nextElementSibling;
		const children = select.children;

		const wrapper = document.createElement('div');
		const input = document.createElement('input');
		const list = document.createElement('ul');

		// Accessability
		wrapper.setAttribute('role', 'combobox');
		wrapper.setAttribute('aria-haspopup', 'listbox');
		wrapper.setAttribute('aria-expanded', 'false');
		input.setAttribute('tabindex', '0');
		list.setAttribute('role', 'listbox');
		list.setAttribute('tabindex', '-1');
		// Уникальный ID для списка и связь input с ним
		const listId = `${className.list}-${Math.random().toString(36).slice(2, 9)}`;
		list.setAttribute('id', listId);
		input.setAttribute('aria-controls', listId);
		input.setAttribute('data-select-input', true);

		this.copyClass(select, wrapper);
		this.copyAttrs(select, input);
		wrapper.classList.add(className.wrapper)

		this.addDefaultAttrs(select, input);
		input.classList.add(className.input);

		const selectedOption = select.querySelector('option[selected]') || children[0];
		const selectedOptionIndex = select.selectedIndex || 0;
		input.value = selectedOption.innerText;
		input.setAttribute('autocomplete', 'off')

		input.setAttribute('readonly', true)
		this.toggleOptionsList(input, wrapper);

		list.classList.add(className.list);

		wrapper.insertAdjacentElement('beforeend', input);
		wrapper.insertAdjacentElement('beforeend', list);

		this.createOptions(children, list, input, wrapper, selectedOptionIndex);

		if (sibling) {
			// если есть сосед то перемещай в перед соседом
			sibling.insertAdjacentElement('beforebegin', wrapper);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', wrapper);
		}

		document.addEventListener('click', (e) => {
			if (!e.target.closest(`.${className.wrapper}`)) {
				this.closeSelect(wrapper);
			}
		})

		input.addEventListener('keydown', (e) => {
			this.handleKeyboardNavigation(e, wrapper, list);
		});

		this.correctFocus(wrapper, input);
	}

	removeSelect(select) {
		select.remove();
	}
	// Выбирает элемент и закрывает список
	selectOption(button, input, wrapper, list) {
		const { className } = this.options;

		const buttons = list.querySelectorAll(`.${className.button}`);

		buttons.forEach((btn) => {
			btn.classList.remove(this.options.className.activeButton);
			btn.setAttribute('aria-selected', 'false');
		});

		button.classList.add(this.options.className.activeButton);
		button.setAttribute('aria-selected', 'true');

		input.value = button.textContent;
		this.closeSelect(wrapper);
	}

	// Навигация по клавиатуре
	handleKeyboardNavigation(e, wrapper, list) {
		const { className } = this.options;

		const buttons = Array.from(list.querySelectorAll(`.${className.button}`));
		let index = buttons.findIndex((btn) => btn.getAttribute('aria-selected') === 'true');
		const input = wrapper.querySelector(`.${className.input}`)

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				index = (index + 1) % buttons.length;
				this.highlightOption(buttons, index);
				break;
			case 'ArrowUp':
				e.preventDefault();
				index = (index - 1 + buttons.length) % buttons.length;
				this.highlightOption(buttons, index);
				break;
			case 'Enter':
				//e.preventDefault();
				this.selectOption(buttons[index], input, wrapper, list);
				break;
			case 'Escape':
				this.closeSelect(wrapper);
				break;
		}
	}

	// Подсвечивает текущий элемент при навигации
	highlightOption(buttons, index) {
		buttons.forEach((btn, i) => {
			btn.classList.toggle(this.options.className.activeButton, i === index);
			btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
		});

		const activeButton = buttons[index];
		const input = activeButton.closest(`.${this.options.className.wrapper}`).querySelector(`.${this.options.className.input}`);
		if (input && activeButton?.id) {
			input.setAttribute('aria-activedescendant', activeButton.id);
		}
	}

	init() {
		if (!this.allSelects.length) {
			console.warn(`[Select]: Selector ${this.selector} is not found!`);
			return
		}

		this.allSelects.forEach(select => {
			this.createSelect(select);
			this.removeSelect(select);
		})
	}
}