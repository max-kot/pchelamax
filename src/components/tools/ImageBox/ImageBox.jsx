import { cls } from "../cls";
import { Img } from "../Img";
import "./ImageBox.scss";

export const ImageBox = ({ className, children, isVideo = false, loop = true, autoplay = true, src, alt, tagName = 'figure', ...extraAttrs }) => {
	const Video = <video loop={loop} autoPlay={autoplay} muted src={src}></video>;
	const Tag = tagName;
	return (
		<Tag className={cls('image-box', className)} {...extraAttrs}>
			{isVideo ? Video : <Img src={src} alt={alt} />}
			{children}
		</Tag>
	)
};