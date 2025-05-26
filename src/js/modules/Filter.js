export class Filter {
	constructor(options) {
		const defaultOptions = {
			categorySelector: '[data-filter-category]',
			btnSelector: '[data-filter-btn]',
			multiplyMode: true,
			itemActiveClass: 'active',
			btnActiveClass: 'active',
			sort: {
				categories: ['data-filter-price', 'data-filter-popularity'],
				btnSelector: '[data-filter-sort]',
			},
			localStorageKey: 'filter',
			delay: 100, // задержка между появлением товаров
			sectionId: 'filter',
		};

		this.options = Object.assign(defaultOptions, options);
		this.activeFilters = [];
		this.sectionId = document?.querySelector('[data-filter-category]')?.closest('section').id || this.options.sectionId;
		this.events();
	}

	btnHandler(btn) {
		document.querySelectorAll(this.options.btnSelector).forEach(btn => btn.classList.remove(this.options.btnActiveClass));
		btn.classList.add(this.options.btnActiveClass);
	}

	filterHandler(filter) {
		
		let delay = 0;
		setTimeout(() => {
			document.querySelectorAll(`[data-filter-category]`).forEach(item => item.classList.remove(this.options.itemActiveClass));
		}, delay);
		setTimeout(() => {

			document.querySelectorAll(`[data-filter-category="${filter}"]`).forEach(item => item.classList.add(this.options.itemActiveClass));

			if (filter === 'all') document.querySelectorAll(`[data-filter-category]`).forEach(item => item.classList.add(this.options.itemActiveClass));
		}, delay + 100);
		delay += this.options.delay;
		window.location.hash = this.sectionId + '?' + filter;
	}

	events() {
		const categoryItem = document.querySelectorAll(this.options.categorySelector);
		const filterBtns = document.querySelectorAll(this.options.btnSelector);

		if (!categoryItem.length || !filterBtns.length) {
			console.warn(`[Filter]: ${this.options.itemSelector} or ${this.options.btnSelector} are not found!`)
			return;
		}
		document.querySelectorAll(`[data-filter-category]`).forEach(item => item.classList.add(this.options.itemActiveClass))
		document.querySelector(`[data-filter-btn="all"]`).classList.add(this.options.itemActiveClass);

		document.addEventListener('click', (e) => {
			if (e.target.closest(this.options.btnSelector)) {
				const btn = e.target.closest(this.options.btnSelector);
				const filter = btn.dataset.filterBtn;

				this.btnHandler(btn);
				this.filterHandler(filter)
			}
		})

		if (window.location.hash) {
			if (!window.location.hash.includes('?')) return;

			const filter = window.location.hash.replace(`#${this.options.sectionId}?`, '');
			const btn = document.querySelector(`[data-filter-btn="${filter}"]`);
			
			if (!btn) return;
			this.btnHandler(btn);
			this.filterHandler(filter)
		}
	}
}

// ===========================================

//multiplyModeHandler() {
//	if (!this.options.multiplyMode) {
//		this.activeFilters = [];
//		document.querySelectorAll(this.options.btnSelector).forEach(btn => btn.classList.remove('active'))
//	}
//}

//applyFilter(filter) {
//	const allItems = document.querySelectorAll(this.options.categorySelector);
//	const hasItem = document.querySelector(`[data-filter-category=${filter}]`);
//	const items = !hasItem ? allItems : document.querySelectorAll(`[data-filter-category=${filter}]`);
//	let delay = 0;
//	items.forEach(item => {
//		const categories = item.getAttribute('data-filter-category').includes(',') ? item.getAttribute('data-filter-category').replaceAll(' ', '').split(',') : item.getAttribute('data-filter-category').split(' ');
//		const matches = this.activeFilters.length || categories.every(f => this.activeFilters.includes(f));
//		console.log(this.activeFilters.length, categories.every(f => this.activeFilters.includes(f)));

//		// Убираем класс .show сразу, чтобы обнулить позицию
//		if (this.options.multiplyMode) { item.classList.remove(this.options.itemActiveClass) }
//		else { allItems.forEach(item => item.classList.remove(this.options.itemActiveClass)) }

//		if (matches) {
//			if (this.options.delay) {
//				setTimeout(() => {
//					item.classList.add(this.options.itemActiveClass);
//				}, delay);
//				delay += this.options.delay; // задержка между появлением товаров
//			} else {
//				item.classList.add(this.options.itemActiveClass);
//			}
//		} else if (!this.activeFilters.length){
//			allItems.forEach(item => item.classList.remove(this.options.itemActiveClass));
//		}
//	})
//}

//events() {
//	const categoryItem = document.querySelectorAll(this.options.categorySelector);
//	const filterBtns = document.querySelectorAll(this.options.btnSelector);

//	if (!categoryItem.length || !filterBtns.length) {
//		console.warn(`[Filter]: ${this.options.itemSelector} or ${this.options.btnSelector} are not found!`)
//		return;
//	}

//	document.addEventListener('click', (e) => {
//		if (e.target.closest(this.options.btnSelector)) {
//			const btn = e.target.closest(this.options.btnSelector);
//			const filter = btn.dataset.filterBtn;
//			if (btn.classList.contains(this.options.btnActiveClass)) {
//				btn.classList.remove(this.options.btnActiveClass);
//				this.activeFilters = this.activeFilters.filter(f => f !== filter);
//				this.multiplyModeHandler();
//			} else {
//				this.multiplyModeHandler();
//				this.activeFilters.push(filter);
//				btn.classList.add(this.options.btnActiveClass);
//			}
//			console.log(btn)
//			this.applyFilter(filter);
//		}
//	})
//}
//const buttons = document.querySelectorAll('.buttons button[data-filter]');
//let activeFilters = [];

//buttons.forEach(button => {
//	button.addEventListener('click', () => {
//		const filter = button.dataset.filter;

//		if (activeFilters.includes(filter)) {
//			activeFilters = activeFilters.filter(f => f !== filter);
//			button.classList.remove('active');
//		} else {
//			activeFilters.push(filter);
//			button.classList.add('active');
//		}

//		applyFilters();
//	});
//});

//function applyFilters() {
//	const products = document.querySelectorAll('.product');

//	let delay = 0;
//	products.forEach(product => {
//		const categories = product.dataset.category.split(',');
//		const matches = activeFilters.length === 0 || categories.some(f => activeFilters.includes(f));

//		// Убираем класс .show сразу, чтобы обнулить позицию
//		product.classList.remove('show');

//		if (matches) {
//			setTimeout(() => {
//				product.classList.add('show');
//			}, delay);
//			delay += 100; // задержка между появлением товаров
//		}
//	});
//}

//function resetFilters() {
//	activeFilters = [];
//	buttons.forEach(btn => btn.classList.remove('active'));
//	applyFilters();
//}

//// Инициализация при загрузке
//applyFilters();