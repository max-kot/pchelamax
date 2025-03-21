import { ImageBox } from "../components/ImageBox/ImageBox";

export const Modal = ({ className, href, children, image, title}) => {
	return (
		<div className={`modal ${className}`.trim()} data-modal={href} id={href.replace('#', '')}>
			{image && <ImageBox
				className="modal__image"
				src={image}
				alt={title}
				isDecor={true}
			/>}
			<div className="modal__inner">
				{children}
			</div>
		</div>
	)
}