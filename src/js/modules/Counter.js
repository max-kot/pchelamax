//* сделать кнопку при нажатии на которую превращается в счётчик
// - при уменьшении количества, обратно становиться кнопкой
// - мин + макс + степ ==> приделать в виде атрибута?
// - 

export class Counter {
	constructor(selector, options) {
		const defaultOptions = {
			transform: '[data-counter-transform]',
			addBtn: '[data-counter-btn-add]',
			removeBtn: '[data-counter-btn-remove]',
			input: '[data-counter-input]',
		};

		this.options = { ...defaultOptions, ...options };
		this.selector = selector || '[data-counter]';
		this.counters = Array.from(document.querySelectorAll(`${this.selector}`)).filter((item) => !item.hasAttribute('data-counter-ready'));

		this.events();
	}

	updateCounters() {
		this.counters = Array.from(document.querySelectorAll(`${this.selector}`)).filter((item) => !item.hasAttribute('data-counter-ready'));
	}

	removeBtn(btn, cloneBtn) {
		this.createCounter(btn, cloneBtn)
		btn.remove();
		this.updateCounters();
		this.counters.forEach(counter => this.counterHandler(counter, cloneBtn));
	}

	createCounter(btn) {
		const parent = btn.parentElement;
		const sibling = btn.nextElementSibling;

		const counter = document.createElement('div');
		counter.classList.add('counter');
		counter.setAttribute('data-counter', '');
		counter.setAttribute('data-counter-transform', '');
		counter.innerHTML = `<button class="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-counter-btn-remove>-</button><input class="counter__input" type="number" max="20" min="1" value="1" data-counter-input/><button class="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-counter-btn-add>+</button>`;

		if (sibling) {
			// если есть сосед то перемещай перед соседом
			sibling.insertAdjacentElement('beforebegin', counter);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', counter);
		}
	}

	transformEvents() {
		const { transform } = this.options;
		const transformBtns = document.querySelectorAll(transform);
		if (!transformBtns.length) {
			return;
		}

		transformBtns.forEach(btn => {
			const cloneBtn = btn.cloneNode(true);
			btn.addEventListener('click', () => this.removeBtn(btn, cloneBtn))
		})
	}

	counterHandler(counter, cloneBtn) {
		const { addBtn, removeBtn, input, transform } = this.options;

		const addBtnEl = counter.querySelector(addBtn);
		const removeBtnEl = counter.querySelector(removeBtn);
		const inputEl = counter.querySelector(input);

		counter.setAttribute('data-counter-ready', 'true');

		const attrs = {
			max: Number(inputEl.getAttribute('max')),
			min: Number(inputEl.getAttribute('min')),
			step: Number(inputEl.getAttribute('step')) || 1,
		}

		addBtnEl.addEventListener('click', () => {
			if (attrs.max > Number(inputEl.value)) {
				inputEl.value = Number(inputEl.value) + attrs.step;
			}
		})

		removeBtnEl.addEventListener('click', () => {
			if (attrs.min < Number(inputEl.value)) {
				inputEl.value = Number(inputEl.value) - attrs.step;
			} else if (cloneBtn) {
				//!
				const parent = counter.parentElement;
				const sibling = counter.nextElementSibling;
				counter.remove()
				const superCloneBtn = cloneBtn.cloneNode(true);
				cloneBtn.addEventListener('click', () => this.removeBtn(cloneBtn, superCloneBtn))

				if (sibling) {
					// если есть сосед то перемещай перед соседом
					sibling.insertAdjacentElement('beforebegin', cloneBtn);
				} else {
					// если нет соседа то перемещай в конец родителя
					parent.insertAdjacentElement('beforeend', cloneBtn);
				}
			}
		})
	}

	events() {
		this.transformEvents();

		if (!this.counters.length) {
			console.warn(`[Counter]: selector ${this.selector} is not found!`);
			return;
		}


		this.counters.forEach(counter => this.counterHandler(counter));
	}
}