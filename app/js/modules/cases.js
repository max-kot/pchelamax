const casesList = document.querySelector('.cases__list');
const allCasesItem = document.querySelectorAll('.cases-item');
const casesBtn = document.querySelector('.cases__btn-more');

allCasesItem.forEach((item, index) => {
	if (index <= 5) {
		item.classList.add('active');
	}
});

casesBtn.addEventListener('click', () => {
	casesBtn.classList.add('hidden');
	allCasesItem.forEach((item, index) => {
		if (index > 5) {
			item.classList.add('active');
		}
	});
})

