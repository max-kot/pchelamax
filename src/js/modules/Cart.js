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
			formSelector: '[data-cart-form]',

			renderItem: (item) => `<p>${item.title}</p>`,
			renderCounter: (value, min, max, steps) => `<button class="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-cart-counter-btn-minus>-</button><input class="counter__input" type="number" max="${max}" min="${min}" value="${value}" steps="${steps}" data-cart-counter-input data-cart-quantity-value /><button class="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-cart-counter-btn-plus>+</button>`,
			renderFormItemText: (item) => `• [ID: ${item.id}] | ${item.title} | кол-во: ${item.quantity} уп. | итого: ${item.quantity * item.price} руб`,
			renderFormTotalInfo: (cart) => `[ИТОГО СТОИМОСТЬ]: ${cart.reduce((acc, item) => acc += item.quantity * item.price, 0)} руб`
		}
		this.data = data;
		this.options = { ...defaultOptions, ...options };
		this.carts = document.querySelectorAll(this.options.cartList);
		//this.addToCartBtns = document.querySelectorAll(this.options.addToCartBtn);
		//this.removeFromCartBtns = document.querySelectorAll(this.options.removeFromCartBtn);
		//this.counters = Array.from(document?.querySelectorAll(this.options.counter.selector)).filter((item) => !item.hasAttribute(this.options.counter.readyAttr));
		this.counterInputs = document.querySelectorAll(this.options.counter.input);
		this.cloneBtn = {};

		this.localStorageKey = 'cart';
		this.cartData = this.loadCartFromStorage();
		this.initCartFromStorage();

		this.events();
	}
	saveCartToStorage() {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartData));
	}

	loadCartFromStorage() {
		try {
			return JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
		} catch {
			return {};
		}
	}
	addToCart(id, cart) {
		// проверка, чтобы не дублировать элемент
		if (!cart.querySelector(`[data-cart-item="${id}"]`)) {
			const item = document.createElement(this.options.itemTag);
			item.innerHTML = this.options.renderItem(this.cartData[id]);
			this.options.itemClass.forEach(className => item.classList.add(className));
			item.setAttribute('data-cart-item', id);
			cart.appendChild(item);
		}

		// обновить UI и количество
		this.updateUI();
	}

	removeFromCart(el) {
		const id = el.getAttribute('data-cart-item');
		delete this.cartData[id];
		this.saveCartToStorage();

		document.querySelectorAll(`[data-cart-item='${id}']`).forEach(el => el.remove());
	}

	createCounter(btn) {
		const key = btn.closest(this.options.product)?.getAttribute('data-cart-product-id');
		if (!this.cloneBtn[key]) this.cloneBtn[key] = [];

		this.cloneBtn[key].push(btn.cloneNode(true));
		//console.log(this.cloneBtn[key])

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
		btn.remove();
	}

	returnTransformBtn(counter, id) {
		const parent = counter.parentElement;
		const sibling = counter.nextElementSibling;
		const i = 0; //this.cloneBtn[id].length - 1
		counter.remove();

		if (sibling) {
			// если есть сосед то перемещай перед соседом
			sibling.insertAdjacentElement('beforebegin', this.cloneBtn[id][i]);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', this.cloneBtn[id][i]);
		}
		this.cloneBtn[id].shift();
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
		this.counterInputs = document.querySelectorAll(this.options.counter.input);
	}

	initCartFromStorage() {
		this.carts.forEach(cart => {
			for (const id in this.cartData) {
				const item = document.createElement(this.options.itemTag);
				item.innerHTML = this.options.renderItem(this.cartData[id]);
				this.options.itemClass.forEach(className => item.classList.add(className));
				item.setAttribute('data-cart-item', id);
				item.querySelector(this.options.counter.input).value = this.cartData[id].quantity;
				cart.appendChild(item);
			}
		});
		for (const id in this.cartData) {
			const products = document.querySelectorAll(`[data-cart-product-id="${id}"`);
			if (products.length) {
				products.forEach(product => {
					this.createCounter(product.querySelector(this.options.counter.transformBtn));
					product.querySelector(this.options.counter.input).value = this.cartData[id].quantity;
				})
			}
		}

		this.updateUI();
	}

	removeAll() {
		const cartItems = document.querySelectorAll(this.options.itemSelector);
		if (!cartItems.length) return;
		cartItems.forEach(el => {
			const id = el.getAttribute('data-cart-item');
			// при удалении удаляется со всех корзин
			this.removeFromCart(el)
			// при удалении counter исчезает и возвращается кнопка transform-btn
			const product = document.querySelector(`[data-cart-product-id="${id}"]`)
			if (product) {
				const counter = product.querySelector(this.options.counter.selector);
				const sameCounters = document.querySelectorAll(`[data-cart-product-id="${counter.closest(this.options.product).getAttribute('data-cart-product-id')}"] ${this.options.counter.selector}`);
				sameCounters.forEach(counter => this.returnTransformBtn(counter, id));
			}
		})
	}

	events() {
		this.updateUI();

		document.addEventListener('click', (e) => {
			// Adding to cart
			if (e.target.closest(this.options.addToCartBtn)) {
				const id = e.target.closest(this.options.product).getAttribute('data-cart-product-id');

				this.carts = document.querySelectorAll(this.options.cartList);
				this.carts.forEach((cart, index) => {

					const data = this.data[id];
					if (!this.cartData[id]) {
						this.cartData[id] = { ...data, quantity: 1 };
					} else if (index === 0) {
						this.cartData[id].quantity++;
					}
					this.addToCart(id, cart)
					this.saveCartToStorage();
				});
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
					const sameCounters = document.querySelectorAll(`[data-cart-product-id="${counter.closest(this.options.product).getAttribute('data-cart-product-id')}"] ${this.options.counter.selector}`);
					sameCounters.forEach(counter => this.returnTransformBtn(counter, id));
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
					if (input) {
						const attrs = {
							max: Number(input.getAttribute('max')),
							min: Number(input.getAttribute('min')) || 0,
							step: Number(input.getAttribute('step')) || 1,
						}

						if (attrs.max > Number(input.value)) {
							input.value = Number(input.value) + attrs.step;
						}
						this.cartData[itemId].quantity = Number(input.value);
						this.saveCartToStorage();
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
					if (input) {
						const counter = item.querySelector(this.options.counter.selector);
						const isTransform = counter.hasAttribute('data-cart-counter-transform');

						const attrs = {
							max: Number(input.getAttribute('max')),
							min: Number(input.getAttribute('min')) || 0,
							step: Number(input.getAttribute('step')) || 1,
						}

						if (attrs.min < Number(input.value)) {
							input.value = Number(input.value) - attrs.step;
							this.cartData[itemId].quantity = Number(input.value);
						} else if (isTransform) {
							const sameCounters = document.querySelectorAll(`[data-cart-product-id="${counter.closest(this.options.product).getAttribute('data-cart-product-id')}"] ${this.options.counter.selector}`);
							sameCounters.forEach(counter => this.returnTransformBtn(counter, itemId));
							this.removeFromCart(cartItem);
						}
						this.saveCartToStorage();
					}

				})

				this.updateUI();
			}

			// Counter Transform Btn
			if (e.target.closest(this.options.counter.transformBtn)) {
				const btn = e.target.closest(this.options.counter.transformBtn);
				const sameBtns = document.querySelectorAll(`[data-cart-product-id="${btn.closest(this.options.product).getAttribute('data-cart-product-id')}"] ${this.options.counter.transformBtn}`);
				sameBtns.forEach(btn => this.createCounter(btn));
				this.updateUI();
			}
		})

		if (this.counterInputs.length) {
			this.counterInputs.forEach(input => input.addEventListener('change', () => {
				const value = Number(input.value);
				const id = input.closest(this.options.product)?.getAttribute('data-cart-product-id') || input.closest(this.options.itemSelector)?.getAttribute('data-cart-item');
				const items = document.querySelectorAll(`[data-cart-product-id="${id}"], [data-cart-item="${id}"]`);
				//console.log(document.querySelectorAll(`[data-cart-item="${id}]"`), id)
				const attrs = {
					max: Number(input.getAttribute('max')),
					min: Number(input.getAttribute('min')) || 0,
					step: Number(input.getAttribute('step')) || 1,
				}
				if (value < attrs.min) {
					input.value = attrs.min;
				};
				if (value > attrs.max) {
					input.value = attrs.max
				};
				items.forEach(item => {
					item.querySelector(this.options.counter.input).value = input.value;
				})
				this.cartData[id].quantity = Number(input.value);
				this.saveCartToStorage();
				this.updateUI();
			}))
		}

		if (document.querySelector(this.options.formSelector)) {
			document.querySelector(this.options.formSelector).addEventListener('submit', e => {
				// ======= для теста
				//e.preventDefault();

				const cart = Object.values(JSON.parse(localStorage.getItem('cart'))) || [];
				let cartText = cart.map(item => this.options.renderFormItemText(item)).join('\n');
				cartText += '\n' + this.options.renderFormTotalInfo(cart);

				// Добавляем текст корзины в textarea перед отправкой
				const textarea = document.createElement('textarea');
				textarea.style.display = 'none';
				textarea.name = 'cart';
				e.target.appendChild(textarea);
				textarea.value = cartText;

				// ======= для теста
				//// Создаём объект FormData из формы
				//const form = e.target;
				//const formData = new FormData(form);

				//// Выводим каждое поле в консоль
				//for (let [key, value] of formData.entries()) {
				//	console.log(`${key}: \n${value}`);
				//}
				//! при отправке чистить корзину и кол-во продуктов
				localStorage.removeItem(this.localStorageKey);
				this.removeAll();
				this.updateUI();
				//? чистка хэша
			});
		}
	}
}