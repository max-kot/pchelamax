const allRunniglineEl = document.querySelectorAll('[data-runnigline]');

allRunniglineEl.forEach((runningline) => {
	const runniglineList = runningline.querySelector('.slider__list');
	const runniglineListContent = Array.from(runniglineList.children);
	runniglineListContent.forEach((item) => {
		const dublicatedItem = item.cloneNode(true);
		dublicatedItem.setAttribute('aria-hidden', true);
		runniglineList.appendChild(dublicatedItem);
	})


})



//if (runnigLineEl) {
//	const allSliderItems = document.querySelectorAll('.slider__item')

//	allSliderItems.forEach((sliderItem) => {
//		const sliderItemCopy = sliderItem.cloneNode(true);
//		runnigLineEl.appendChild(sliderItemCopy)
//	})
//}
