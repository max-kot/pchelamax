const allLinks = document.querySelectorAll('a:link');
let topOffset = document.querySelector('.header').offsetHeight;

allLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		const href = link.getAttribute('href');

		if (href === '#') {
			
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
			e.preventDefault();
		}

		if (href !== '#' && href.startsWith('#')) {
			e.preventDefault();

			const sectionEl = document.querySelector(href);
			const sectionElPosition = sectionEl.getBoundingClientRect().top;
			const offsetPosition = sectionElPosition - topOffset;

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	})
})