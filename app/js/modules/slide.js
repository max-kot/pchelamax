const sliderListCopy = document.querySelector('.slider__list');

if (sliderListCopy) {
	sliderListCopy.cloneNode(true);
	document?.querySelector('.slider__body').appendChild(sliderListCopy)
}


