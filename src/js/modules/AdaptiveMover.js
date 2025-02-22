export class AdaptiveMover {
	constructor(selector, options) {
		const defaultOptions = {
		}

		this.selector = selector || '[data-adaptive-mover]';
		this.options = Object.assign(defaultOptions, options);
		this.elements = document.querySelectorAll(this.selector);
		this.init();
	}

	moveElement(element, data) {
		const { parent, oldSibling, oldParent, matchMedia, order } = data;

		if (matchMedia.matches) {
			if (order === "first") {
				parent.insertAdjacentElement('afterbegin', element)
			} else {
				parent.insertAdjacentElement('beforeend', element)
			}
		} else {
			if (oldSibling !== null) {
				// если есть сосед то перемещай в перед соседом
				oldSibling.insertAdjacentElement('beforebegin', element);
			} else {
				// если нет соседа то перемещай в конец родителя
				oldParent.insertAdjacentElement('beforeend', element);
			}
		}
	}
	init() {
		if (!this.elements.length) {
			console.warn(`[AdaptiveMover]: Selector '${this.selector}' is not found!`);
			return;
		}

		this.elements.forEach((element) => {
			const props = element.getAttribute(this.selector.replaceAll('[', '').replace(']', '')).replaceAll(' ', '').toLowerCase().split(',');
			let [parentSelector, mediaScreen, order = 'last'] = props;

			const data = {
				parent: document.querySelector(parentSelector),
				oldSibling: element.nextElementSibling,
				oldParent: element.parentElement,
				matchMedia: window.matchMedia(`(${mediaScreen})`),
				order
			}

			this.moveElement(element, data);
			window.addEventListener('resize', () => this.moveElement(element, data))
		})
	}
} 