export const Step = ({ data, index }) => {
	const { title, text } = data;
	const className = index === 0 ? "process__item step spoiler-active" : "process__item step";

	return (
		<li className={className} data-spoiler>
			<h4 className="step__title title-4 button-tab">{title}</h4>
			<div className="step__description">
				<p className="step__text">{text}</p>
			</div>
		</li>
	)
}