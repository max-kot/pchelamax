export class HideHeader {
	constructor(selector, options) {
		const defaultOptions = {
			offset: 'auto', // то расстояние, после которого исчезнет header при скролле вниз
			hiddenClass: 'hidden',
			backgroundClass: false,
			showScrollEnd: true, // появляется когда закончил события прокрутки (прокрутил шапка прячется, остановился ==> показывается)
		}

		this.selector = selector || '.header';
		this.elements = document.querySelectorAll(this.selector);
		this.options = Object.assign(defaultOptions, options);
		this.lastScroll = 0; // отвечает за последнюю позицию прокрутки, т.е. относительно него мы будем отмечать, куда мы скроллим страницу: вверх или вниз
		this.init();
	}
	// функция, определяющая позицию скролла === где мы сейчас находимся
	scrollPosition() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}

	// функция, которая определяет, есть ли у нас класс hidden на header
	containsHidden(el) {
		const { hiddenClass } = this.options;
		return el.classList.contains(hiddenClass);
	}

	hideOnScroll(header, offset) {
		const { hiddenClass } = this.options;

		if (this.scrollPosition() > this.lastScroll && !this.containsHidden(header) && this.scrollPosition() > offset) {
			header.classList.add(hiddenClass);
		}

		if (this.scrollPosition() < this.lastScroll && this.containsHidden(header)) header.classList.remove(hiddenClass);
	};

	showScrollEnd(header) {
		const { hiddenClass } = this.options;

		window.addEventListener('scrollend', (event) => {
			if (header.classList.contains(hiddenClass)) {
				header.classList.remove(hiddenClass);
			}
		})
	}

	addBgClass(header, offset) {
		const { backgroundClass } = this.options;

		if (this.scrollPosition() > offset) {
			header.classList.add(backgroundClass);
		}

		if (!this.scrollPosition()) {
			header.classList.remove(backgroundClass);
		}
	}

	init() {
		if (!this.elements.length) {
			console.warn(`[Header]: Selector ${this.selector} is not found!`);
			return
		}
		let { offset, backgroundClass, showScrollEnd } = this.options;
		this.elements.forEach((header) => {
			offset = offset === 'auto' ? header.offsetHeight / 2 : offset


			window.addEventListener('scroll', (event) => {
				this.hideOnScroll(header, offset);
				backgroundClass && this.addBgClass(header, offset);

				this.lastScroll = this.scrollPosition(header);
			})

			showScrollEnd && this.showScrollEnd(header);
		})
	}
}