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
		let defaultOptions = {
			closeBtn: {
				innerHTML: 'close',
				ariaLabel: 'Close modal'
			},
			isOpen: true,
			createStyle: true,
			activeClass: 'active-modal',
			modalBox: {
				selector: '[data-modal-box]',
				class: 'modal-box',
				data: 'data-modal-box',
				background: 'rgba(0, 0, 0, 0.7)',
			},
			modalBoxContainer: {
				selector: '[data-modal-box-container]',
				class: 'modal-box__container',
				data: 'data-modal-box-container',
			},
			moreCloseBtnSelector: '[data-modal-custom-close-btn]',
		}

		this.options = deepMerge(defaultOptions, options);
		this.selector = selector || '[data-modal]';
		this.allModals = document.querySelectorAll(selector).length ? document.querySelectorAll(selector) : document.querySelectorAll('[data-modal]');
		this.isActive = false;
		this.previousActiveElement = null; // Сохраняем текущий элемент в фокусе
		this.eventHandlers = {}; // Словарь для хранения обработчиков событий

		this.event();
	}

	// Метод для подписки на события
	on(eventName, handler) {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(handler);
	}

	// Метод для вызова обработчиков событий
	triggerEvent(eventName, detail) {
		const handlers = this.eventHandlers[eventName];
		if (handlers) {
			handlers.forEach(handler => handler(detail));
		}
	}

	createModalBox() {
		const modalBox = document.createElement('div');
		const body = document.body;
		const bodyStyle = getComputedStyle(body);

		modalBox.innerHTML = `<div ${this.options.modalBoxContainer.class ? `class=${this.options.modalBoxContainer.class}` : ''} ${this.options.modalBoxContainer.data ? `${this.options.modalBoxContainer.data}` : 'data-modal-box-container'}></div>`;

		modalBox.setAttribute(this.options.modalBox.data, '');
		modalBox.classList.add(this.options.modalBox.class);

		if (bodyStyle.position === 'static') {
			body.style.position = 'relative';
		}

		body.insertAdjacentElement('beforeend', modalBox);
	}

	createStyles() {
		const style = document.createElement('style');
		style.classList.add('style-modal-box');

		style.innerHTML = `
				html.${this.options.activeClass} body {
					overflow: hidden;
				}
				${this.options.modalBox.selector} {
					background: ${this.options.modalBox.background};
					position: fixed;
					z-index: 100;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					overflow: auto;

					/* ЭТИ СТИЛИ ВАЖНЫ ДЛЯ ТОГО, ЧТОБЫ СПРЯТАТЬ МОДАЛКУ */
					pointer-events: none;
					opacity: 0;
					visibility: hidden;
					transition: all 0.5s;
				}

				${this.options.modalBox.selector}.${this.options.activeClass} {
					opacity: 1;
					visibility: visible;
					pointer-events: auto;
				}

				${this.options.modalBoxContainer.selector} {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 30px;
					min-height: 100%; /* обязательно, чтобы растянулся на всю высоту modal-box и центрировался */
				}
				
				${this.selector} {
					/* ЭТИ СТИЛИ ВАЖНЫ ДЛЯ ТОГО, ЧТОБЫ СПРЯТАТЬ МОДАЛКУ */
					transform: translateY(-100%);
					visibility: hidden;
					position: absolute;
					transition: all 0.5s;
				}
				${this.selector}.${this.options.activeClass} {
					visibility: visible;
					position: initial;
					transform: translateY(0);
				}
			`.trim().replaceAll('\t', '').replaceAll('\n', '');
		document.head.insertAdjacentElement('beforeend', style);
	}

	createCloseBtn(parent) {
		const modalId = parent.getAttribute('data-modal') || parent.getAttribute('id')
		const closeBtn = document.createElement('button');
		closeBtn.setAttribute('type', 'button');
		closeBtn.innerHTML = this.options.closeBtn.innerHTML;
		closeBtn.setAttribute('aria-label', this.options.closeBtn.ariaLabel);

		closeBtn.classList.add('modal-btn-close');
		closeBtn.setAttribute('data-modal-btn-close', modalId);

		parent.insertAdjacentElement('beforeend', closeBtn);
	}

	closeModal(modal) {
		if (!modal) {
			console.error('The modal window was not found');
			return;
		}

		const modalBox = document.querySelector(this.options.modalBox.selector);

		this.isActive = false;

		this.triggerEvent('close', { modal });

		document.documentElement.classList.remove(this.options.activeClass)
		modal.classList.remove(this.options.activeClass);
		modalBox.classList.remove(this.options.activeClass);

		// Возвращаем фокус на элемент, который открыл модалку
		if (this.previousActiveElement) {
			this.previousActiveElement.focus();
			setTimeout(() => this.previousActiveElement = null, 100);
		}

		// Удаляем обработчик клика, когда модалка закрывается
		document.removeEventListener('click', (event) => this.outsideClickHandler(event, modal));

		if (this.options.moreCloseBtnSelector) {
			let allBtns = modal.querySelectorAll(this.options.moreCloseBtnSelector);

			if (allBtns.length === 0) return;

			allBtns.forEach((btns) => {
				btns.removeEventListener('click', () => this.closeModal(modal))
			})
		}
	}

	openModal(modal) {
		if (!modal) {
			console.error('The modal window was not found');
			return;
		}
		const modalBox = document.querySelector(this.options.modalBox.selector);

		this.isActive = true;
		this.previousActiveElement = document.activeElement; // Сохраняем текущий элемент в фокусе

		this.triggerEvent('open', { modal });

		document.documentElement.classList.add(this.options.activeClass)
		modal.classList.add(this.options.activeClass);
		modalBox.classList.add(this.options.activeClass);

		// Добавляем обработчик клика для закрытия при клике за пределами
		document.addEventListener('click', (event) => this.outsideClickHandler(event, modal));

		if (this.options.moreCloseBtnSelector) {
			let allBtns = modal.querySelectorAll(this.options.moreCloseBtnSelector);

			if (allBtns.length === 0) return;

			allBtns.forEach((btn) => {
				btn.addEventListener('click', () => this.closeModal(modal))
			})
		}
	}

	lockFocus(modal) {
		// !
		let allInterectiveSelectors = modal.querySelectorAll('input, a, button, textarea, [tabindex]');

		if (allInterectiveSelectors.length === 0) return;

		const firstElement = allInterectiveSelectors[0];

		// элементы модального окна загружаются асинхронно и добавляются в DOM позже. В таком случае фокус просто не успевает установиться
		setTimeout(() => firstElement.focus(), 100);

		const lastElement = allInterectiveSelectors[allInterectiveSelectors.length - 1];

		allInterectiveSelectors.forEach((interectiveElement) => {
			interectiveElement.addEventListener('keydown', (event) => {
				if (event.key === 'Tab') {
					if (event.shiftKey) {
						// Если Shift + Tab на первом элементе, фокус на последний
						if (document.activeElement === firstElement) {
							event.preventDefault();
							lastElement.focus();
						}
					} else {
						// Если Tab на последнем элементе, фокус на первый
						if (document.activeElement === lastElement) {
							event.preventDefault();
							firstElement.focus();
						}
					}
				}
			});
		})
	}

	setAccessibleAttr(modal) {
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('aria-modal', 'true');
	}

	// Обработчик клика за пределами модального окна
	outsideClickHandler = (event, modal) => {
		const modalBox = document.querySelector(this.options.modalBox.selector);
		const modalBoxContainer = document.querySelector(this.options.modalBoxContainer.selector);
		const elIncludesModal = event.composedPath().includes(modal);

		//console.log(modalBoxContainer.contains(event.target), !event.target.closest('[data-modal-btn]'), !elIncludesModal)
		//console.log(!event.composedPath().includes(modal), modalBox.contains(event.target))

		//if (modalBox && !modalBox.contains(event.target) &&
		//	!event.target.closest('[data-modal-btn]') && !elIncludesModal) {
		//	this.closeModal(modal, modalBox);
		//}
		if (event.target === modalBoxContainer) {
			this.closeModal(modal, modalBox);
		}
	}

	event() {
		if (this.allModals.length) {
			let modalBox = document.querySelector(this.options.modalBox.selector);

			if (!modalBox) {
				this.createModalBox();
				modalBox = document.querySelector(this.options.modalBox.selector);
			}

			if (modalBox && this.options.createStyle) {
				this.createStyles();
			}

			this.allModals.forEach((modal) => {

				this.createCloseBtn(modal);

				this.setAccessibleAttr(modal);

				if (modalBox) {
					document.querySelector(this.options.modalBoxContainer.selector).insertAdjacentElement('beforeend', modal);
				}

				const allBtns = document.querySelectorAll('[data-modal-btn]');
				const allCloseBtns = document.querySelectorAll('[data-modal-btn-close]');

				allBtns.forEach((btn) => {
					btn.addEventListener('click', (event) => {

						let modalId = btn.getAttribute('data-modal-btn');
						
						if (btn.tagName === 'A') {
							event.preventDefault();
							modalId = btn.getAttribute('href');
						}


						if (modalId) {
							let modal = document.querySelector(`[data-modal=\'${modalId}\']`);

							if (!this.isActive) {
								if (!modal) {
									console.error(`Modal id ${modalId, modal} window was not found`);
									return;
								}
								this.openModal(modal);
								this.lockFocus(modal);
							}
						}

					})
				})

				allCloseBtns.forEach((btnClose) => {
					btnClose.addEventListener('click', () => {
						//let modal = document.querySelector(`[data-modal=${btnClose.getAttribute('data-modal-btn-close')}]`) || document.querySelector(`#${btnClose.getAttribute('data-modal-btn-close')}`);

						if (this.isActive) {
							if (!modal) {
								console.error('The modal window was not found');
								return;
							}
							this.closeModal(modal);
						}
					})
				})

				if (this.options.closeOnInteractiveEl) {

				}

				// close on escape button
				document.addEventListener('keydown', (event) => {
					if (event.code === 'Escape' || event.code === 'Escape') {
						if (this.isActive) {
							this.closeModal(modal);
						}
					}
				})
			})
		}
	}
}