const currentYear = document.querySelector('.current-year');
const devYear = document.querySelector('.dev-year');

currentYear.innerHTML = currentYear.innerHTML.replace(' - ', '');

if (currentYear.innerHTML === devYear.innerHTML) {
	currentYear.innerHTML = "";
} else {
	currentYear.innerHTML = ` - ${new Date().getFullYear()}`;
}