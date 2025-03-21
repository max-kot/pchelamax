import { ErrorPage } from "../layouts/ErrorPage.jsx";
import { ru as locale } from "../locales/ru.jsx";

export const metadata = {
	title: locale.meta.title,
	lang: locale.id
}
export default () => {
	return <ErrorPage locale={locale} />
}