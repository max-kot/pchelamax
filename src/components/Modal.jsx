import { Img } from "../components/Img";
import { Button } from "./Button";

export const Modal = ({ data, extra }) => {
	const { href, image, title, content } = data;
	const { buttonModalDescription, buttonText } = extra;

	return (
		<div className="project-modal" data-modal={href}>
			<div className="project-modal__image" aria-hidden="true">
				<Img src={image} alt={title} />
			</div>
			<div className="project-modal__inner">
				<h3 className="project-modal__title title-2">{title}</h3>
				<div className="project-modal__content">{content}</div>
				<div className="project-modal__btn-box">
					<p className="project-modal__subtitle title-3">{buttonModalDescription}</p>
					<Button href="#contacts" className="btn-arrow">{buttonText}<span></span></Button>
				</div>
			</div>
		</div>
	)
}