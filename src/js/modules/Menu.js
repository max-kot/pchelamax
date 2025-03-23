export class Menu {
	constructor(selector, options) {
		const defaultOptions = {
			btnSelector: '[data-menu-btn]',
			listSelector: '[data-menu-list]',
			activeClass: 'menu-open',
			parents: ['html', '.wrapper'],
			accessibility: {
				mediaScreen: 'max-width: 1024px',
				role: 'dialog',
				aria: 'aria-modal'
			},
			additionalCloseButton: '[data-menu-close-btn]',
		}

		this.options = Object.assign(defaultOptions, options);
		this.elements = document.querySelectorAll(selector);
		this.menuOpen = false;

		this.init();
	}

	accessibleMenu(list) {
		const { role, aria, mediaScreen } = this.options.accessibility;
		let matchMedia = window.matchMedia(`(${mediaScreen})`);

		if (matchMedia.matches) {
			list.setAttribute('role', role);
			list.setAttribute(aria, true);
		} else {
			list.removeAttribute('role');
			list.removeAttribute(aria);
		}

		matchMedia.addEventListener('change', () => this.accessibleMenu(list))
	}

	correctFocus(list, btn) {
		const links = list.querySelectorAll('input, a, button, textarea, [tabindex]');

		links.forEach(link => {
			let lastLink = links[links.length - 1];

			link.addEventListener('blur', (event) => {
				if (event.target === lastLink) {
					btn.focus();
				}
			})
		})

		btn.addEventListener('blur', () => links[0].focus());
	}

	closeMenu(parents, activeClass) {
		parents.forEach((parent) => {
			document.querySelector(parent).classList.remove(activeClass);

			this.menuOpen = false;
		})
	}

	toggleMenu(parents, activeClass) {
		parents.forEach((parent) => {
			const el = document.querySelector(parent);

			el.classList.toggle(activeClass);
			el.classList.contains(activeClass) ? this.menuOpen = true : this.menuOpen = false;

		})
	}

	init() {
		const { btnSelector, listSelector, parents, activeClass, accessibility, additionalCloseButton } = this.options;

		if (!this.elements) {
			console.warn(`Selector ${this.elements} is not found!`)
			return;
		}
		this.elements.forEach((element) => {

			const btn = element.querySelector(btnSelector) || document.querySelector(btnSelector);
			const list = element.querySelector(listSelector) || document.querySelector(listSelector);
			const allLinks = element.querySelectorAll('a')

			if (list && Object.keys(accessibility)) {
				this.accessibleMenu(list)
			}

			if (btn && parents) {
				btn.addEventListener("click", () => {
					this.toggleMenu(parents, activeClass)
					this.menuOpen && this.correctFocus(list, btn);
				})
			}

			allLinks.forEach(link => link.addEventListener('pointerdown', () => this.closeMenu(parents, activeClass)))
		})

		document.addEventListener('keydown', ({ code: key }) => key === 'Escape' && this.closeMenu(parents, activeClass))
		document.addEventListener('click', e => {
			const closeTrigger = e.target.closest(additionalCloseButton);
			if (closeTrigger) {
				this.menuOpen && this.toggleMenu(parents, activeClass)
			}
		})
	}
}