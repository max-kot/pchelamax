
export class SmoothScroll {
	constructor(options) {

		this.links = Array.from(document.querySelectorAll('a[href]')).filter(link => link.href.includes('#'));
		this.events();
	}

	
	events() {
		if (!this.links.length) return;

		document.addEventListener('click', e => {
			if (this.links.includes(e.target)) {
				e.preventDefault();
				const href = e.target.closest('a[href]').getAttribute('href');
				console.log(href);
				const section = document.querySelector(href) || document.body;

				const coord = section.getBoundingClientRect();

				window.scrollTo({
					left: coord.left + window.pageXOffset,
					top: coord.top + window.pageYOffset,
					behavior: 'smooth'
				})
				section.scrollIntoView({ behavior: 'smooth' });
			}
		})
	}
}