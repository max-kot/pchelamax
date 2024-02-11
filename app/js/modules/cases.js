const casesList = document.querySelector('.cases__list');
const allCasesItem = document.querySelectorAll('.cases-item');
const casesBtn = document.querySelector('.cases__btn-more');

if (casesList) {
	allCasesItem.forEach((item, index) => {
		if (index >= 3) {
			// если проектов будет мало
			casesBtn.classList.add('hidden');
		}
		if (index < 4) {
			item.classList.add('active');
		}
	});

	casesBtn.addEventListener('click', () => {
		// убираем кнопку когда показываем всё
		casesBtn.classList.add('hidden');
		allCasesItem.forEach((item, index) => {
			if (index > 4) {
				item.classList.add('active');
			}
		});
	})
}


