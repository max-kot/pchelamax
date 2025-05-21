export const HowWeWorkItem = ({ data }) => {
	const { title, text } = data;
	return (
		<li className="how-we-work__item item-how-we-work">
			<div className="item-how-we-work__wrapper">
				<h3 className="title-3 item-how-we-work__title">{title}</h3>
				<p className="item-how-we-work__text">{text}</p>
			</div>
		</li>
	)
};