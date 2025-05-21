export const BenefitItem = ({ data }) => {
	const { icon, title, text } = data;

	return (
		<div className="swiper-slide benefit-slide">
			<div className="benefit-slide__wrapper">
				<div className="benefit-slide__icon"><img src={icon} aria-hidden="true" /></div>
				<div className="benefit-slide__content">
					<h3 className="benefit-slide__title title-3">{title}</h3>
					<p className="benefit-slide__text">{text}</p>
				</div>
			</div>
		</div>
	)
};