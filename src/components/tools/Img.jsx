import { Image, Picture } from "minista";
const isDev = import.meta.env.MODE !== 'production'; // Проверяем режим сборки

export const Img = ({ src }) => {
	if (isDev) {
		return <Image src={src} />
	}
	return <Picture src={src} formats={["avif", "webp", "inherit"]}/>
};