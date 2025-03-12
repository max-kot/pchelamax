export const Policy = ({ data }) => {
	const { title, content } = data;
	
	return (
		<div className="project-modal" data-modal="#policy" id="policy">
			<div className="project-modal__inner">
				<h3 className="project-modal__title title-2">{title}</h3>
				<div className="project-modal__content">{content}</div>
			</div>
		</div>
	)
};