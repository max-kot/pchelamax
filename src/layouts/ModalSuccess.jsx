import { ImageBox } from "../components/ImageBox/ImageBox";
import { Modal } from "../components/Modal";
import { Social } from "../components/Social";

export const ModalSuccess = ({ data }) => {
	const { title, image, text, socialLinks, socialTitle } = data;
	return (
		<Modal className="success" href="success">
			<ImageBox src={image} className="success__image" simpleImg={true}/>
			<div className="success__content">
				<h3 className="success__title title-2">{title}</h3>
				<p className="success__text title-3">{text}</p>
				<Social list={socialLinks} title={socialTitle} className="success__social"/>
			</div>
		</Modal>
	)
};