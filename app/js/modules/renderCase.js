function renderCase(item, parent) {
	if (item) {
		let htmlStart = `
	<button class="modal__btn-close" type="button"><span>Закрыть</span></button>
	<div class="modal__heading box">
		<h2 class="modal__title section-title">
			${item['title']}
		</h2>
		<p class="modal__subtitle">${item['subtitle']}</p>
	</div>
		<div class="modal__slider modal-slider swiper box">
		<div class="swiper-wrapper modal-slider__wrapper">
	`
		let htmlEnd = `
	</div>
		<div class="modal-slider__pagination"></div>
	</div>
	<div class="modal__info box">
		${item['shortInfo']}
	</div>
	<div class="modal__content box">
		${item['content']}
	</div>
	<a class="modal__btn btn" href="#contacts">
		Давайте обсудим ваш проект
	</a>
	</div>`;

		let htmlSlides = '';
		item['slider'].forEach((slide) => {
			if (slide !== undefined) {
				htmlSlides += `
		<div class="swiper-slide modal-slide">
			<div class="modal-slide__wrapper">
				<div class="modal-slide__image">
					<img src="${slide['image']}" alt="${slide['text']}">
				</div>
				<div class="modal-slide__description" style="${!slide['textVisible']? 'display: none;' : ''}">
					${slide['text']}
				</div>
			</div>
		</div>`;
			}

		})

		parent.innerHTML = htmlStart + htmlSlides + htmlEnd;
	}
}
/*
let html = `
	<button class="modal__btn-close" type="button"><span>Закрыть</span></button>
	<div class="modal__heading box">
		<h2 class="modal__title section-title">
			${item['title']}
		</h2>
		<p class="modal__subtitle">${item['subtitle']}</p>
	</div>
		<div class="modal__slider modal-slider swiper box">
		<div class="swiper-wrapper">
						<div class="swiper-slide modal-slide">
							<div class="modal-slide__wrapper">
								<div class="modal-slide__image">
									<picture>
										<source srcset="images/cases/image-1.avif" type="image/avif">
										<source srcset="images/cases/image-1.webp" type="image/webp">
										<img src="images/cases/image-1.jpg" alt="Фото 1">
									</picture>
								</div>
								<div class="modal-slide__description">
									Фото 1
								</div>
							</div>

						</div>
						<div class="swiper-slide modal-slide">
							<div class="modal-slide__wrapper">
								<div class="modal-slide__image">
									<picture>
										<source srcset="images/cases/image-2.avif" type="image/avif">
										<source srcset="images/cases/image-2.webp" type="image/webp">
										<img src="images/cases/image-2.jpg" alt="Фото 2">
									</picture>
								</div>
								<div class="modal-slide__description">
									Фото 2
								</div>
							</div>

						</div>
						<div class="swiper-slide modal-slide">
							<div class="modal-slide__wrapper">
								<div class="modal-slide__image">
									<picture>
										<source srcset="images/cases/image-3.avif" type="image/avif">
										<source srcset="images/cases/image-3.webp" type="image/webp">
										<img src="images/cases/image-3.jpg" alt="Фото 2">
									</picture>
								</div>
								<div class="modal-slide__description">
									Фото 3
								</div>
							</div>

						</div>
					</div>
					<div class="modal-slider__pagination"></div>
		</div>
		<div class="modal-slider__pagination"></div>
	</div>
	<div class="modal__info box">
		${item['shortInfo']}
	</div>
	<div class="modal__content box">
		${item['content']}
	</div>
	<a class="modal__btn btn" href="#contacts">
		Давайте обсудим ваш проект
	</a>
</div>
	`
*/

export { renderCase };