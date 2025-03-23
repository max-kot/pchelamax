import { Modal } from "../components/Modal";

export const ModalError = ({ data }) => {
	const { title, text } = data;
	return (
		<Modal className="error-modal" href="error-modal">
			<div className="error-modal__content">
				<h3 className="error-modal__title title-2">{title}</h3>
			</div>
			<p className="error-modal__text title-3">{text}</p>
		</Modal>
	)
};