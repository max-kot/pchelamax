import { Image, Picture } from "minista";
const isDev = import.meta.env.MODE !== 'production'; // Проверяем режим сборки

export const Img = ({ src, alt }) => {
	if (isDev) {
		return <Image src={src} alt={alt} title={alt}/>
	}
	return <Picture src={src} formats={["avif", "webp", "inherit"]} alt={alt} title={alt}/>
};