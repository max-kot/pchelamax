

const sliderListCopy = document.querySelector('.slider__list');
if (sliderListCopy) {
	const allSliderItems = document.querySelectorAll('.slider__item')

	allSliderItems.forEach((sliderItem) => {
		const sliderItemCopy = sliderItem.cloneNode(true);
		sliderListCopy.appendChild(sliderItemCopy)
	})
}
