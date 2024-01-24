import { startModalSlider } from "./swiper";
import { casesInfo } from "../cases-info";
import { renderCase } from "./renderCase";



const modalWrapper = document.querySelector('.modal-wrapper');

if (modalWrapper) {
	const allModalBox = modalWrapper.querySelectorAll('.modal');
	let allModalBtn = document.querySelectorAll('[data-modal-btn]');
	let modalBody = document.querySelector('.modal__body');
	let modal = document.querySelector('.modal')

	allModalBtn.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			let modalId;
			if (e.target.tagName === 'A') {
				e.preventDefault();
				modalId = btn.getAttribute('href').slice(1);
			}

			//! for render
			modal.id = modalId;
			if (casesInfo[modalId]) {
				renderCase(casesInfo[modalId], modalBody);
				startModalSlider();
			}


			let currentModal = modalWrapper.querySelector(`#${modalId}`);
			if (casesInfo[modalId]) {
				modalWrapper.classList.add('active');
				allModalBox.forEach((modal) => {
					modal.classList.remove('active');
				})
				currentModal.classList.add('active');
				document.body.classList.add('no-scroll');
			}

			function closeModal() {
				if (currentModal) {
					modalWrapper?.classList.remove('active');
					currentModal?.classList.remove('active');
					document?.body.classList.remove('no-scroll');
				}

			}
			let btnClose = currentModal.querySelector('.modal__btn-close');

			btnClose.addEventListener('click', closeModal)

			modalWrapper.addEventListener('click', (e) => {
				if (e.target.classList.contains('modal') || e.target.classList.contains('container')) {
					closeModal();
				}
			})

			let allLinks = currentModal.querySelectorAll('a');

			allLinks.forEach((link) => {
				link.addEventListener('click', closeModal);
			})

		})
	})

}