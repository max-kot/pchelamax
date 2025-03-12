import { Img } from "../Img";
import './ImageBox.scss';

export const ImageBox = ({ className, children, src, alt, isDecor = false, ...extraAttrs }) => {
	const hiddenAttrs = isDecor ? { "aria-hidden": "true" } : '';

	return (
		<figure className={className ? 'image-box' + ' ' + className : 'image-box'} {...hiddenAttrs} {...extraAttrs}>
			<Img src={src} alt={alt} />
			{children}
		</figure>
	)
};