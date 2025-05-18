export class Cart {
	constructor(data, options) {
		const defaultOptions = {
			cartList: '[data-cart-list]',
			emptyCartClass: 'cart-empty',
			product: '[data-cart-product-id]', // тут указывается ID копируемого элемента в корзине, при нажатии на нее добавляет элемент в корзину
			addToCartBtn: '[data-cart-btn-add]',
			removeFromCartBtn: '[data-cart-btn-remove]',
			itemTag: 'li',
			itemClass: 'data-cart-item',
			itemSelector: '[data-cart-item]',
			counter: {
				selector: '[data-cart-counter]',
				className: 'counter',
				transformBtn: '[data-cart-counter-transform-btn]',
				plusBtn: '[data-cart-counter-btn-plus]',
				minusBtn: '[data-cart-counter-btn-minus]',
				input: '[data-cart-counter-input]',
				readyAttr: 'data-counter-ready'
			},
			quantitySelector: '[data-cart-quantity]',
			priceForOne: '[data-cart-price-for-one]',
			priceSelector: '[data-cart-price]',
			priceSum: '[data-cart-price-sum]',

			renderItem: (item) => `<p>${item.title}</p>`,
			renderCounter: (value, min, max, steps) => `<button class="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-cart-counter-btn-minus>-</button><input class="counter__input" type="number" max="${max}" min="${min}" value="${value}" steps="${steps}" data-cart-counter-input data-cart-quantity-value /><button class="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-cart-counter-btn-plus>+</button>`
		}
		this.data = data;
		this.options = { ...defaultOptions, ...options };
		this.carts = document.querySelectorAll(this.options.cartList);
		//this.addToCartBtns = document.querySelectorAll(this.options.addToCartBtn);
		//this.removeFromCartBtns = document.querySelectorAll(this.options.removeFromCartBtn);
		//this.counters = Array.from(document?.querySelectorAll(this.options.counter.selector)).filter((item) => !item.hasAttribute(this.options.counter.readyAttr));
		this.cloneBtn = {};

		this.events();
	}

	addToCart(id, cart) {
		const data = this.data[id];
		const item = document.createElement(this.options.itemTag);
		item.innerHTML = this.options.renderItem(data);
		this.options.itemClass.forEach(className => item.classList.add(className));
		item.setAttribute('data-cart-item', id);
		cart.appendChild(item);
	}

	removeFromCart(el) {
		const id = el.getAttribute('data-cart-item');
		document.querySelectorAll(`[data-cart-item='${id}']`).forEach(el => el.remove());
	}

	createCounter(btn) {
		const parent = btn.parentElement;
		const sibling = btn.nextElementSibling;

		const attrs = {
			value: btn.getAttribute('data-cart-counter-transform-btn').replaceAll(' ', '').split(',')[0] || 1,
			min: btn.getAttribute('data-cart-counter-transform-btn').replaceAll(' ', '').split(',')[1] || 1,
			max: btn.getAttribute('data-cart-counter-transform-btn').replaceAll(' ', '').split(',')[2] || 100,
			steps: btn.getAttribute('data-cart-counter-transform-btn').replaceAll(' ', '').split(',')[3] || 1,
		}
		const counter = document.createElement('div');
		counter.classList.add(this.options.counter.className);
		counter.setAttribute('data-cart-counter', '');
		counter.setAttribute('data-cart-counter-transform', '');
		//counter.setAttribute('data-cart-btn', btn.getAttribute('data-cart-btn')); //? наверно для привязки
		counter.innerHTML = this.options.renderCounter(attrs.value, attrs.min, attrs.max, attrs.steps);
		if (sibling) {
			// если есть сосед то перемещай перед соседом
			sibling.insertAdjacentElement('beforebegin', counter);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', counter);
		}
	}

	returnTransformBtn(counter, id) {
		const parent = counter.parentElement;
		const sibling = counter.nextElementSibling;
		counter.remove();
		if (sibling) {
			// если есть сосед то перемещай перед соседом
			sibling.insertAdjacentElement('beforebegin', this.cloneBtn[id]);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', this.cloneBtn[id]);
		}

		delete this.cloneBtn[id]
	}

	updateLength() {
		this.carts = document.querySelectorAll(this.options.cartList);
		const quantity = Array.from(this.carts[0].querySelectorAll(this.options.counter.input)).reduce((acc, input) => acc += Number(input.value), 0);
		document.querySelectorAll(this.options.quantitySelector).forEach(el => el.textContent = quantity);

		if (!quantity) {
			this.carts.forEach(cart => cart.classList.add(this.options.emptyCartClass)
			);
			document.documentElement.classList.add(this.options.emptyCartClass)
		} else {
			this.carts.forEach(cart => cart.classList.remove(this.options.emptyCartClass));
			document.documentElement.classList.remove(this.options.emptyCartClass)
		}
	}

	updatePrice() {
		this.carts = document.querySelectorAll(this.options.cartList);
		this.carts.forEach(cart => {
			const items = cart.querySelectorAll(this.options.itemSelector);

			if (items.length) {
				items.forEach(item => {
					const priceForOne = Number(item.querySelector(this.options.priceForOne).textContent);
					const quantity = Number(item.querySelector(this.options.counter.input).value);
					item.querySelectorAll(this.options.priceSelector).forEach(priceEl => priceEl.textContent = priceForOne * quantity);
				})
			}
		})
	}

	updatePriceSum() {
		this.carts = document.querySelectorAll(this.options.cartList);
		const priceSum = Array.from(this.carts[0].querySelectorAll(this.options.priceSelector)).reduce((acc, price) => acc += Number(price.textContent), 0);
		const sumElems = document.querySelectorAll(this.options.priceSum);

		sumElems.forEach(el => el.textContent = priceSum);
	}

	updateUI() {
		this.updateLength();
		this.updatePrice();
		this.updatePriceSum();
	}

	events() {
		this.updateUI();

		document.addEventListener('click', (e) => {
			// Adding to cart
			if (e.target.closest(this.options.addToCartBtn)) {
				const id = e.target.closest(this.options.product).getAttribute('data-cart-product-id');

				this.carts = document.querySelectorAll(this.options.cartList);
				this.carts.forEach(cart => this.addToCart(id, cart));

				this.updateUI();
			}

			// Removing from cart
			if (e.target.closest(this.options.removeFromCartBtn)) {
				const el = e.target.closest(this.options.itemSelector);
				const id = el.getAttribute('data-cart-item');
				// при удалении удаляется со всех корзин
				this.removeFromCart(el)
				// при удалении counter исчезает и возвращается кнопка transform-btn
				const product = document.querySelector(`[data-cart-product-id="${id}"]`)
				if (product) {
					const counter = product.querySelector(this.options.counter.selector);
					this.returnTransformBtn(counter, id);
				}

				this.updateUI();
			}

			//=== COUNTER
			// Counter plus
			if (e.target.closest(this.options.counter.plusBtn)) {
				const itemId = e.target.closest(this.options.itemSelector)?.getAttribute('data-cart-item') || e.target.closest(this.options.product)?.getAttribute('data-cart-product-id');
				const items = document.querySelectorAll(`[data-cart-item="${itemId}"], [data-cart-product-id="${itemId}"]`);

				items.forEach(item => {
					const input = item.querySelector(this.options.counter.input);
					const attrs = {
						max: Number(input.getAttribute('max')),
						min: Number(input.getAttribute('min')) || 0,
						step: Number(input.getAttribute('step')) || 1,
					}

					if (attrs.max > Number(input.value)) {
						input.value = Number(input.value) + attrs.step;
					}
				})

				this.updateUI();
			}
			// Counter minus
			if (e.target.closest(this.options.counter.minusBtn)) {
				const itemId = e.target.closest(this.options.itemSelector)?.getAttribute('data-cart-item') || e.target.closest(this.options.product)?.getAttribute('data-cart-product-id');
				const items = document.querySelectorAll(`[data-cart-item="${itemId}"], [data-cart-product-id="${itemId}"]`);
				const cartItem = document.querySelector(`[data-cart-item="${itemId}"]`);

				items.forEach(item => {
					const input = item.querySelector(this.options.counter.input);
					const counter = item.querySelector(this.options.counter.selector);
					const isTransform = counter.hasAttribute('data-cart-counter-transform');

					const attrs = {
						max: Number(input.getAttribute('max')),
						min: Number(input.getAttribute('min')) || 0,
						step: Number(input.getAttribute('step')) || 1,
					}

					if (attrs.min < Number(input.value)) {
						input.value = Number(input.value) - attrs.step;
					} else if (isTransform) {
						this.returnTransformBtn(counter, itemId);
						this.removeFromCart(cartItem);
					}
				})

				this.updateUI();
			}
			// Counter Transform Btn
			if (e.target.closest(this.options.counter.transformBtn)) {
				const btn = e.target.closest(this.options.counter.transformBtn);
				const key = e.target.closest(this.options.product)?.getAttribute('data-cart-product-id');
				this.cloneBtn[key] = btn.cloneNode(true);

				this.createCounter(btn);
				btn.remove();

				this.updateUI();
			}
		})
	}
}