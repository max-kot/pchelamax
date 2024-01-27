const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`)

window.addEventListener('scroll', () => {
	if (window.scrollY > parseInt(headerHeight)) {
		header.classList.add('cover');
	} else {
		header.classList.remove('cover');
	}
})