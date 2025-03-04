import { Home } from "../layouts/Home";
import { ru as locale } from "../locales/ru.jsx";

export const metadata = {
	title: locale.meta.title,
	lang: locale.id
}

export default () => {
	return <Home locale={locale} />
}

