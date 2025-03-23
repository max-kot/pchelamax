import { Img } from "../Img";
import './ImageBox.scss';

export const ImageBox = ({ className, children, src, alt, isDecor = false, simpleImg = false, ...extraAttrs }) => {
	const hiddenAttrs = isDecor ? { "aria-hidden": "true" } : '';

	return (
		<figure className={className ? 'image-box' + ' ' + className : 'image-box'} {...hiddenAttrs} {...extraAttrs} >
			{simpleImg ? <img src={src} alt={alt} loading="lazy" /> : <Img src={src} alt={alt} />}
			{children}
		</figure>
	)
};