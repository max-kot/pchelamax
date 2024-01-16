const allSpoilerEl = document.querySelectorAll('[data-spoiler]');

allSpoilerEl.forEach((spoiler) => {
	let spoilerTitle = spoiler.firstElementChild;
	let spoilerContent = spoiler.lastElementChild;
	let spoilerContentHeight = spoilerContent.scrollHeight;

	if (spoiler.classList.contains('active')) {
		spoilerContent.style.height = `${spoilerContentHeight}px`;
	} else {
		spoilerContent.style.height = 0;
	}

	spoilerTitle.addEventListener('click', () => {
		if (spoiler.classList.contains('active')) {
			spoiler.classList.remove('active');
			spoilerContent.style.height = 0;
		} else {
			spoiler.classList.add('active');
			spoilerContent.style.height = `${spoilerContentHeight}px`;
		}
	})
})