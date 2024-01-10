const header = document.querySelector('.header');
const headerMenuBtn = document.querySelector('.header__menu .menu__btn');
const headerMenuBox = document.querySelector('.header__menu .menu__box');

headerMenuBtn.addEventListener('click', () => {
	header.classList.toggle('active');
	headerMenuBtn.classList.toggle('active');
	headerMenuBox.classList.toggle('active');
	document.body.classList.toggle('no-scroll');

	if (headerMenuBox.classList.contains('active')) {
		const allLinks = headerMenuBox.querySelectorAll('a');
	
		allLinks.forEach((link) => {
			link.addEventListener('click', () => {
				header.classList.remove('active');
				headerMenuBtn.classList.remove('active');
				headerMenuBox.classList.remove('active');
				document.body.classList.remove('no-scroll');
			})
		})
	}
})

