import { Modal } from "../components/Modal";
import { Button } from "./Button";

export const ModalCase = ({ data, extra }) => {
	const { title, content, href, image} = data;
	const { buttonModalDescription, buttonText } = extra;

	return (
		<Modal className="project-modal" image={image} href={href} title={title}>
			<h3 className="project-modal__title title-2">{title}</h3>
			<div className="project-modal__content">{content}</div>
			<div className="project-modal__btn-box">
				<p className="project-modal__subtitle title-3">{buttonModalDescription}</p>
				<Button href="#contacts" className="btn-arrow" data-modal-close-btn>{buttonText}<span></span></Button>
			</div>
		</Modal>
	)
};