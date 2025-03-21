function deepMerge(target, source) {
	for (const key in source) {
		if (source[key] instanceof Object && key in target) {
			Object.assign(source[key], deepMerge(target[key], source[key]))
		}
	}
	return { ...target, ...source };
}

export class Modal {
	constructor(selector, options) {
		const defaultOptions = {
			button: '[data-modal-btn]',
			buttonIdAttr: 'href',
			modalIdAttr: 'id',
			overlay: {
				data: 'data-modal-overlay',
				className: 'modal-overlay'
			},
			container: {
				data: 'data-modal-container',
				className: 'modal-container'
			},
			closeButton: {
				innerHTML: 'Close',
				ariaLabel: 'Close modal',
				data: 'data-modal-close-button',
				className: 'modal-close-button'
			},
			closeButtonSelector: '.modal-close-button',
			activeClass: 'modal-open',
			currentClass: 'modal-open-current',
			backClass: 'modal-open-back',
			primaryModalSelector: '[data-modal-primary]', // чтобы при вызове модалки с таким селектором закрывались все остальные 
		}

		this.options = deepMerge(defaultOptions, options);
		this.modal = selector || '[data-modal]';
		this.button = this.options.button || '[data-modal-btn]';
		this.modals = document.querySelectorAll(this.modal);
		this.buttons = document.querySelectorAll(this.button);
		this.init()
		this.openModalCounter = 0;
	}

	createOverlay(modal) {
		const { overlay, container, activeClass } = this.options;

		const parent = modal.parentElement;
		const sibling = modal.nextElementSibling;
		const isActive = modal.classList.contains(activeClass);


		const wrapper = document.createElement('div');
		wrapper.setAttribute('role', 'dialog');
		wrapper.setAttribute(overlay.data, true);
		wrapper.classList.add(overlay.className);

		const inner = document.createElement('div');
		inner.setAttribute(container.data, true);
		inner.classList.add(container.className);

		wrapper.insertAdjacentElement('beforeend', inner);



		if (sibling) {
			// если есть сосед то перемещай в перед соседом
			sibling.insertAdjacentElement('beforebegin', wrapper);
		} else {
			// если нет соседа то перемещай в конец родителя
			parent.insertAdjacentElement('beforeend', wrapper);
		}
		inner.insertAdjacentElement('beforeend', modal);


		if (isActive) {
			this.openModal(modal)
		}
	}

	createCloseButton(modal) {
		const { closeButton } = this.options;

		const closeBtn = document.createElement('button');
		closeBtn.setAttribute('type', 'button');
		closeBtn.innerHTML = closeButton.innerHTML;
		closeBtn.setAttribute('aria-label', closeButton.ariaLabel);
		closeBtn.setAttribute(closeButton.className, '');
		closeBtn.classList.add(closeButton.className);

		modal.insertAdjacentElement('beforeend', closeBtn);
	}

	closeModal(modal) {
		const { activeClass, currentClass, overlay } = this.options;
		const currentOverlay = modal.closest(`.${overlay.className}`);

		modal.classList.remove(activeClass);
		currentOverlay.classList.remove(activeClass);

		--this.openModalCounter;
		console.log(this.openModalCounter)

		if (!this.openModalCounter) document.documentElement.classList.remove(activeClass);

		currentOverlay.classList.remove(currentClass);
		// Очистка хэша
		if (window.location.hash === `#${modal.id}`) {
			history.pushState("", document.title, window.location.pathname + window.location.search);
		}
	}

	openModal(modal) {
		const { activeClass, overlay, currentClass, backClass } = this.options;
		const currentOverlay = modal.closest(`.${overlay.className}`);
		this.closeAllIfPrimary(modal)

		modal.classList.add(activeClass);
		currentOverlay.classList.add(activeClass);

		++this.openModalCounter;
		console.log(this.openModalCounter)

		this.openModalCounter && document.documentElement.classList.add(activeClass);

		const allOpenModals = document.querySelectorAll(`.${overlay.className}.${activeClass}`);

		allOpenModals.forEach(openModal => openModal.classList.remove(currentClass));
		currentOverlay.classList.add(currentClass);
	}

	isPrimary(modal) {
		const { primaryModalSelector } = this.options;
		return !!document.querySelector(`${primaryModalSelector}#${modal.id}`);
	}

	closeAllIfPrimary(modal) {
		const { activeClass } = this.options;

		if (this.isPrimary(modal)) {
			const allModals = document.querySelectorAll(`${this.modal}.${activeClass}`);
			allModals.forEach(modal => this.closeModal(modal))
		}
	}

	init() {
		if (!this.modals.length) {
			console.warn(`[Modal]: Selector ${this.selector} is not found!`);
			return
		}

		const { buttonIdAttr, closeButtonSelector, modalIdAttr, container } = this.options;

		this.modals.forEach(modal => {
			const { overlay, closeButton } = this.options;

			overlay && this.createOverlay(modal);
			closeButton && this.createCloseButton(modal);
		})

		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				const isLink = button.tagName === 'A';
				const id = isLink ? button.getAttribute(buttonIdAttr).replace('#', '') : button.getAttribute(buttonIdAttr);
				const modal = document.querySelector(isLink ? `#${id}` : `[${modalIdAttr}="${id}"]`);
				this.openModal(modal);
			})
		})

		const closeButtons = document.querySelectorAll(closeButtonSelector);

		closeButtons.length && closeButtons.forEach(closeBtn => {
			closeBtn.addEventListener('click', () => {
				const modal = closeBtn.parentElement;
				this.closeModal(modal);
			})
		})
		document.querySelectorAll(`.${container.className}`).forEach(container => container.addEventListener('click', ({ target }) => {
			if (target === container) {
				const currentModal = container.querySelector(this.modal);
				this.closeModal(currentModal);
			}
		}))

		// Открытие по хэшу при загрузке страницы
		if (window.location.hash) {
			const hashId = window.location.hash;
			const modal = document.querySelector(this.modal + hashId);
			if (modal && !modal.classList.contains(this.options.activeClass)) {
				this.openModal(modal);
			}
		}

		// Открытие при смене хэша
		window.addEventListener('hashchange', () => {
			const hashId = window.location.hash;
			const modal = document.querySelector(this.modal + hashId)
			if (modal && !modal.classList.contains(this.options.activeClass)) {
				this.openModal(modal);
			}
		});
	}
}