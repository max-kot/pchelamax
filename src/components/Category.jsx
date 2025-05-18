export const Category = ({ data }) => {
	const { text, id, icon} = data;
	return (
		<div className="swiper-slide category">
			<div className="category__wrapper">
				<button className="category__btn" type="button" data-filter-btn={id}>
					<img src={icon} aria-hidden="true" loading="lazy"/>
					<span>{text}</span>
				</button>
			</div>
		</div>
	)
};