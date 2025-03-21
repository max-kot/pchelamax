import { Modal } from "../components/Modal";

export const Policy = ({ data }) => {
	const { title, content } = data;

	return (
		<Modal href="policy" className="policy">
			<h3 className="policy__title title-2">{title}</h3>
			<div className="policy__content">{content}</div>
		</Modal>
	)
};