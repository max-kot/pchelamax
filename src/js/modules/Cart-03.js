export class Cart {
	constructor(options) {
		const defaultOptions = {
			elements: [
				{
					id: 0,
					title: '1 Мёд 0,5л',
					href: '#',
					description: ['2024 год', 'Разнотравье'],
					image: 'src/assets/images/product-1.jpg',
					category: 'Мёд',
					price: 8,
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
					price: 4,
					max: '50',
					min: '1'
				}, {
					id: 2,
					title: '3 Мёд 0,5л',
					href: '#',
					description: ['2024 год', 'Разнотравье'],
					image: 'src/assets/images/product-1.jpg',
					category: 'Мёд',
					price: 8,
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
					price: 4,
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
					price: 4,
					max: '50',
					min: '1'
				}
			], // список с базой данных товаров

			cartListSelector: '[data-cart-list]',
			cartProduct: '[data-cart-product-id]', // тут указывается ID копируемого элемента в корзине, при нажатии на нее добавляет элемент в корзину
			addToCartBtn: '[data-cart-btn-add]',
			removeFromCartBtn: '[data-cart-btn-remove]',
			itemTag: 'li',
			itemClass: 'data-cart-item',
			itemSelector: '[data-cart-item]',
			counter: {
				selector: '[data-cart-counter]',
				className: 'counter',
				transform: '[data-cart-counter-transform]',
				addBtn: '[data-cart-counter-btn-add]',
				removeBtn: '[data-cart-counter-btn-remove]',
				input: '[data-cart-counter-input]',
				readyAttr: 'data-counter-ready'
			},

			renderItem: (item) => `<p>${item.title}</p>`,
			renderCounter: () => `<button class="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-cart-counter-btn-remove>-</button><input class="counter__input" type="number" max="20" min="1" value="1" data-cart-counter-input data-cart-quantity-value /><button class="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-cart-counter-btn-add>+</button>`
		}

		this.options = { ...defaultOptions, ...options };
		this.carts = document.querySelectorAll(this.options.cartListSelector);
		this.addToCartBtns = document.querySelectorAll(this.options.addToCartBtn);
		this.removeFromCartBtns = document.querySelectorAll(this.options.removeFromCartBtn);
		this.counters = Array.from(document?.querySelectorAll(this.options.counter.selector)).filter((item) => !item.hasAttribute(this.options.counter.readyAttr));

		this.events();
	}

	// === COUNTER ===
	updateCounters() {
		this.counters = Array.from(document?.querySelectorAll(this.options.counter.selector)).filter((item) => !item.hasAttribute(this.options.counter.readyAttr));
	}

	counterHandler(counter, cloneBtn) {
		const { addBtn, removeBtn, input } = this.options.counter;

		const addBtnEl = counter.querySelector(addBtn);
		const removeBtnEl = counter.querySelector(removeBtn);
		const inputEl = counter.querySelector(input);
		
		// sync
		const parentId = counter.closest(this.options.itemSelector || this.options.cartProduct).getAttribute('data-cart-item');
		const parents = document.querySelectorAll(`[data-cart-product-id="${parentId}"], [data-cart-item="${parentId}"]`)

		counter.setAttribute('data-cart-counter-ready', 'true');

		const attrs = {
			max: Number(inputEl.getAttribute('max')),
			min: Number(inputEl.getAttribute('min')),
			step: Number(inputEl.getAttribute('step')) || 1,
		}

		addBtnEl.addEventListener('click', () => {
			if (attrs.max > Number(inputEl.value)) {
				inputEl.value = Number(inputEl.value) + attrs.step;

				parents.forEach(parent => {
					const currInput = parent.querySelector(input);
					if (currInput) currInput.value = Number(inputEl.value);
					// чем больше элементов тем больше увеличивается счётчик
				})
			}
		})

		removeBtnEl.addEventListener('click', () => {
			if (attrs.min < Number(inputEl.value)) {
				inputEl.value = Number(inputEl.value) - attrs.step;
				parents.forEach(parent => {
					const currInput = parent.querySelector(input);
					if (currInput) currInput.value = Number(inputEl.value);
				})
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
		})
	}

	initCounter() {
		
		//this.transformEvents();
		this.counters.forEach(counter => this.counterHandler(counter));
	}

	// === CART ===
	// ? не знаю надо ли вообще
	update() {
		this.carts = document.querySelectorAll(this.options.cartListSelector);
		this.addToCartBtns = document.querySelectorAll(this.options.addToCartBtn);
		//this.addToCartHandler()
		this.removeFromCartHandler()
	}

	// Add Element
	addToCart(id, cart) {
		const data = this.options.elements[id];
		const item = document.createElement(this.options.itemTag);
		item.innerHTML = this.options.renderItem(data);
		this.options.itemClass.forEach(className => item.classList.add(className));
		item.setAttribute('data-cart-item', id);
		cart.appendChild(item);
	}

	addToCartHandler() {
		this.addToCartBtns.forEach(btn => btn.addEventListener('click', () => {
			//const id = btn.getAttribute('data-cart-btn-add');
			const id = btn.closest(this.options.cartProduct).getAttribute('data-cart-product-id');
			this.carts.forEach(cart => this.addToCart(id, cart));

			this.updateCounters();
			this.counters.forEach(counter => this.counterHandler(counter));

			this.removeFromCartHandler()
		}))
	}

	// Remove Element
	removeElement(el) {
		el.remove();
	}

	removeFromCartHandler() {
		this.removeFromCartBtns = document.querySelectorAll(this.options.removeFromCartBtn);

		this.removeFromCartBtns.forEach(btn => btn.addEventListener('click', () => {
			const el = btn.closest(this.options.itemSelector);
			const id = el.getAttribute('data-cart-item');
			document.querySelectorAll(`[data-cart-item='${id}']`).forEach(el => this.removeElement(el));
		}))
	}

	events() {
		if (!this.carts.length && !this.addToCartBtns.length) {
			console.warn(`[Cart]: ${this.options.cartListSelector} or ${this.options.addToCartBtn} selectors are not found!`);
			return;
		}
		if (this.addToCartBtns.length) this.addToCartHandler();
		if (this.removeFromCartBtns.length) this.removeFromCartHandler();
		if (this.counters.length) this.initCounter();
	}
}