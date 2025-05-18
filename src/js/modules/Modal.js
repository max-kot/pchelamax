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
			additionalCloseButton: '[data-modal-close-btn]',
			modalTitle: null, // для aria-labelledby
		}

		this.options = deepMerge(defaultOptions, options);
		this.modal = selector || '[data-modal]';
		this.button = this.options.button || '[data-modal-btn]';
		this.modals = document.querySelectorAll(this.modal);
		this.buttons = document.querySelectorAll(this.button);
		this.init()
		this.openModalCounter = 0;
		this.lastFocusedElement = null;
	}

	createOverlay(modal) {
		const { overlay, container, activeClass, modalTitle } = this.options;

		const parent = modal.parentElement;
		const sibling = modal.nextElementSibling;
		const isActive = modal.classList.contains(activeClass);


		const wrapper = document.createElement('div');
		wrapper.setAttribute('role', 'dialog');
		wrapper.setAttribute('aria-modal', 'true');
		wrapper.setAttribute(overlay.data, true);
		wrapper.classList.add(overlay.className);

		// Если у модалки есть заголовок — ссылаемся на него
		const titleEl = modal.querySelector('h1, h2, h3, h4, h5, h6');
		if (titleEl) {
			if (!titleEl.hasAttribute('id')) titleEl.setAttribute('id', `modal-${modal.id}-title`);
			wrapper.setAttribute('aria-labelledby', titleEl.id);
		}

		// Альтернативно можно добавить описание
		const descriptionEl = modal.querySelector(modalTitle);
		if (descriptionEl?.id) {
			wrapper.setAttribute('aria-describedby', descriptionEl.id);
		}

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
			this.openModal(modal);
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
		//console.log(this.openModalCounter);
		if (!this.openModalCounter) document.documentElement.classList.remove(activeClass);

		currentOverlay.classList.remove(currentClass);
		// Очистка хэша
		if (window.location.hash === `#${modal.id}`) {
			history.pushState("", document.title, window.location.pathname + window.location.search);
		}

		// Возвращаем фокус к элементу, который был до открытия модалки
		if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
			this.lastFocusedElement.focus();
		}

		// удаляем обработчик ловушки
		if (modal._trapFocusHandler) {
			modal.removeEventListener('keydown', modal._trapFocusHandler);
			delete modal._trapFocusHandler;
		}
	}

	openModal(modal) {
		const { activeClass, overlay, currentClass, backClass } = this.options;
		console.log(modal, `.${overlay.className}`)
		const currentOverlay = modal.closest(`.${overlay.className}`);

		//if (modal.classList.contains(activeClass)) return; //? 

		this.closeAllIfPrimary(modal)
		modal.classList.add(activeClass);
		currentOverlay.classList.add(activeClass);

		++this.openModalCounter;
		//console.log(this.openModalCounter);
		this.openModalCounter && document.documentElement.classList.add(activeClass);

		const allOpenModals = document.querySelectorAll(`.${overlay.className}.${activeClass}`);

		allOpenModals.forEach(openModal => openModal.classList.remove(currentClass));
		currentOverlay.classList.add(currentClass);

		// Сохраняем элемент, у которого был фокус до открытия модалки
		this.lastFocusedElement = document.activeElement;

		// Переносим фокус на первый элемент в модалке (или саму модалку)
		const focusable = modal.querySelector('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
		if (focusable) {
			focusable.focus();
		} else {
			modal.setAttribute('tabindex', '-1');
			modal.focus();
		}

		this.trapFocus(modal); // ✅ включаем ловушку фокуса
	}

	isPrimary(modal) {
		const { primaryModalSelector } = this.options;
		return !!document.querySelector(`${primaryModalSelector}#${modal.id}` || `${primaryModalSelector}[${this.modal.replace('[', '').replace(']', '')}="${modal.dataset.modal}"]`)
	}

	closeAllIfPrimary(modal) {
		const { activeClass } = this.options;

		if (this.isPrimary(modal)) {
			const allModals = document.querySelectorAll(`${this.modal}.${activeClass}`);
			allModals.forEach(modal => this.closeModal(modal))
		}
	}
	trapFocus(modal) {
		const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
		const focusableElements = Array.from(modal.querySelectorAll(focusableSelectors))
			.filter(el => el.offsetParent !== null); // Фильтруем видимые элементы

		if (!focusableElements.length) return;

		const firstEl = focusableElements[0];
		const lastEl = focusableElements[focusableElements.length - 1];

		const handleKeydown = (e) => {
			if (e.key !== 'Tab') return;

			// Если только один элемент фокуса — просто запрещаем переход
			if (focusableElements.length === 1) {
				e.preventDefault();
				return;
			}

			// Shift+Tab → если фокус на первом элементе, перескакиваем на последний
			if (e.shiftKey && document.activeElement === firstEl) {
				e.preventDefault();
				lastEl.focus();
			}
			// Tab → если фокус на последнем элементе, перескакиваем на первый
			else if (!e.shiftKey && document.activeElement === lastEl) {
				e.preventDefault();
				firstEl.focus();
			}
		};

		//  Сохраняем обработчик, чтобы потом можно было снять его при закрытии
		modal._trapFocusHandler = handleKeydown;
		modal.addEventListener('keydown', handleKeydown);
	}
	init() {
		if (!this.modals.length) {
			console.warn(`[Modal]: Selector ${this.selector} is not found!`);
			return
		}

		const { buttonIdAttr, closeButtonSelector, modalIdAttr, container, activeClass, additionalCloseButton } = this.options;

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
		if (window.location.hash && window.location.hash.length > 1) {
			const hashId = window.location.hash;
			if (hashId !== '#' && !hashId.includes('?')) {
				const modal = document.querySelector(`${this.modal}${hashId}`) || document.querySelector(`[${this.modal.replace('[', '').replace(']', '')}="${hashId}"]`);
				if (modal) this.openModal(modal);
			}

		}

		// Открытие при смене хэша
		window.addEventListener('hashchange', () => {
			const hashId = window.location.hash;
			if (hashId.length > 1 && hashId !== '#' && !hashId.includes('?')) {
				const modal = document.querySelector(`${this.modal}${hashId}`);
				if (modal && !modal.classList.contains(this.options.activeClass)) {
					this.openModal(modal);
				}
			}
		});

		// закрытие по дополнительным кнопках
		document.addEventListener('click', e => {
			const closeTrigger = e.target.closest(additionalCloseButton);
			if (closeTrigger) {
				const modal = closeTrigger.closest(this.modal);
				if (modal) this.closeModal(modal);
			}
		})

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				const openModals = document.querySelectorAll(`${this.modal}.${this.options.activeClass}`);
				openModals.forEach(modal => this.closeModal(modal));
			}
		});
	}
}