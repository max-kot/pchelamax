/**
 * * Что делает корзина
 * 1. При нажатии кнопки добавить товар, в корзину добавляется элемент
 * - ищем кнопку
 * - отслеживаем событие по клику
 * - добавляем текущий товар в корзину (может по ID)
 * 
 * 2. Изменяется счётчик количества элементов
 * - меняем счётчик
 * - меняем сумму
 * 3. При изменении количества элементов, счётчик и товар в корзине тоже реагирует и меняется
 * 4. При удалении товара из корзины:
 * - счетчик уменьшается
 * - на товаре появляется кнопка добавить
 * * Счётчик
 * - при уменьшении количества, обратно становиться кнопкой
 * - мин + макс + степ ==> приделать в виде атрибута?
 */

export class Cart {
	constructor(options, selector) {
		const defaultOptions = {
			elements: [
				{
					id: 0,
					title: '1 Мёд 0,5л',
					href: '#',
					description: ['2024 год', 'Разнотравье'],
					image: 'src/assets/images/product-1.jpg',
					category: 'Мёд',
					price: '8',
					max: '50',
					min: '1'
				},
				{
					id: 1,
					title: '2 Яйца перепелиные 20 шт',
					href: '#',
					description: ['Домашние'],
					image: 'src/assets/images/product-2.jpg',
					category: 'Фермерские продукты',
					price: '4',
					max: '50',
					min: '1'
				}, {
					id: 2,
					title: '3 Мёд 0,5л',
					href: '#',
					description: ['2024 год', 'Разнотравье'],
					image: 'src/assets/images/product-1.jpg',
					category: 'Мёд',
					price: '8',
					max: '50',
					min: '1'
				},
				{
					id: 3,
					title: '4 Яйца перепелиные 20 шт',
					href: '#',
					description: ['Домашние'],
					image: 'src/assets/images/product-2.jpg',
					category: 'Фермерские продукты',
					price: '4',
					max: '50',
					min: '1'
				},
				{
					id: 4,
					title: '5 Яйца перепелиные 20 шт',
					href: '#',
					description: ['Домашние'],
					image: 'src/assets/images/product-2.jpg',
					category: 'Фермерские продукты',
					price: '4',
					max: '50',
					min: '1'
				}
			],
			quantitySelector: '[data-cart-quantity-value]', // откуда брать value
			quantityElement: '[data-cart-quantity]', // отображение в HTML
			priceSelector: '[data-cart-price]',
			priceForOne: '[data-cart-price-for-one]',
			sumElement: '[data-cart-price-sum]',
			deleteSelector: '[data-cart-delete]',
			itemSelector: '[data-cart-item]',
			emptyClass: 'cart-empty',

			counter: {
				selector: '[data-cart-counter]',
				className: 'counter',
				transform: '[data-cart-counter-transform]',
				addBtn: '[data-cart-counter-btn-add]',
				removeBtn: '[data-cart-counter-btn-remove]',
				input: '[data-cart-counter-input]',
				readyAttr: 'data-counter-ready'
			},

			renderItem: (item) => `<p data-cart-item>${item.title}</p>`,
			renderCounter: () => `<button class="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-cart-counter-btn-remove>-</button><input class="counter__input" type="number" max="20" min="1" value="1" data-cart-counter-input data-cart-quantity-value /><button class="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-cart-counter-btn-add>+</button>`
		}

		this.options = { ...defaultOptions, ...options };
		this.selector = selector || '[data-cart-btn]';
		this.cart = document.querySelector('[data-cart]');
		this.btns = document?.querySelectorAll(this.selector);
		this.deleteBtns = document?.querySelectorAll(this.options.deleteSelector);
		this.counters = Array.from(document?.querySelectorAll(this.options.counter.selector)).filter((item) => !item.hasAttribute(this.options.counter.readyAttr));

		this.events()
	}

	// COUNTER
	updateCounters() {
		this.counters = Array.from(document?.querySelectorAll(this.options.counter.selector)).filter((item) => !item.hasAttribute(this.options.counter.readyAttr));
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
		counter.classList.add(this.options.counter.className);
		counter.setAttribute('data-cart-counter', '');
		counter.setAttribute('data-cart-counter-transform', '');
		counter.setAttribute('data-cart-btn', btn.getAttribute('data-cart-btn'));
		counter.innerHTML = this.options.renderCounter();

		if (sibling) {
			// если есть сосед то перемещай перед соседом
			sibling.insertAdjacentElement('beforebegin', counter);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', counter);
		}
	}

	transformEvents() {
		const { transform } = this.options.counter;
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
		const { addBtn, removeBtn, input } = this.options.counter;

		const addBtnEl = counter.querySelector(addBtn);
		const removeBtnEl = counter.querySelector(removeBtn);
		const inputEl = counter.querySelector(input);
		const price = counter.closest(this.options.itemSelector)?.querySelector(this.options.priceSelector);

		counter.setAttribute('data-cart-counter-ready', 'true');

		const attrs = {
			max: Number(inputEl.getAttribute('max')),
			min: Number(inputEl.getAttribute('min')),
			step: Number(inputEl.getAttribute('step')) || 1,
		}

		addBtnEl.addEventListener('click', () => {
			if (attrs.max > Number(inputEl.value)) {
				inputEl.value = Number(inputEl.value) + attrs.step;
			}
			this.changePrice(price, inputEl.value);
			this.updateUI()
		})

		removeBtnEl.addEventListener('click', () => {
			if (attrs.min < Number(inputEl.value)) {
				inputEl.value = Number(inputEl.value) - attrs.step;
			} else if (cloneBtn) {
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
			this.changePrice(price, inputEl.value);
			this.updateUI()
		})
	}
	initCounter() {
		if (!this.counters.length) {
			return;
		}
		this.transformEvents();
		this.counters.forEach(counter => this.counterHandler(counter));
	}

	// ============
	changePrice(price, value) {
		const priceForOne = price.closest(this.options.itemSelector).querySelector(this.options.priceForOne);
		price.textContent = Number(priceForOne.textContent) * value;
		//price.closest(this.options.priceForOne).textContent = Number(price.closest(this.options.priceForOne).textContent) * value
		//document.querySelectorAll(this.options.priceSelector).forEach(price => {
		//	const priceForOne = price.closest(this.options.itemSelector).querySelector(this.options.priceForOne);
		//	price.textContent = Number(priceForOne.textContent) * value;
		//});
	}

	isEmptyCart() {
		if (!this.cart.children.length) {
			this.cart.classList.add(this.options.emptyClass);
			document.documentElement.classList.add(this.options.emptyClass);
		} else {
			this.cart.classList.remove(this.options.emptyClass);
			document.documentElement.classList.remove(this.options.emptyClass);
		}
	}

	deleteElement(el) {
		el.remove();
	}

	addElement(id) {
		const currEl = this.options.elements[id];
		this.cart.innerHTML += this.options.renderItem(currEl);
	}

	updateQuantity() {
		//console.log(this.options.quantitySelector, document.querySelectorAll(this.options.quantitySelector))
		const quantity = Array.from(this.cart.children).reduce((acc, el) => acc += Number(el.querySelector(this.options.quantitySelector).value), 0);
		document.querySelectorAll(this.options.quantityElement).forEach(el => el.innerHTML = quantity)
	}

	updateSum() {
		const sum = Array.from(document.querySelectorAll(this.options.priceSelector)).reduce((acc, item) => acc + Number(item.textContent), 0);
		document.querySelectorAll(this.options.sumElement).forEach(el => el.innerHTML = sum);
	}

	initDeleteBtns() {
		if (!this.deleteBtns.length) return;
		this.deleteBtns = document?.querySelectorAll(this.options.deleteSelector);

		this.deleteBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const el = btn.closest(this.options.itemSelector);
				this.deleteElement(el);
				this.updateUI();
			})
		})
	}

	updateUI() {
		this.updateQuantity();
		this.updateSum();
		this.isEmptyCart()
	}

	events() {
		this.initCounter()
		if (!this.btns.length) {
			console.warn(`[Cart]: selector ${this.selector} is not found!`);
			return;
		}
		this.updateUI();

		// ADD
		this.btns.forEach(btn => {
			const id = btn.getAttribute('data-cart-btn');

			btn.addEventListener('click', () => {
				this.addElement(id);
				this.initDeleteBtns();
				this.updateCounters();
				this.counters.forEach(counter => this.counterHandler(counter));
				this.updateUI();


			})
		})

		// DELETE
		this.initDeleteBtns()
	}
}
