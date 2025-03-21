import { ErrorPage } from "../../layouts/ErrorPage.jsx";
import { en as locale } from "../../locales/en.jsx";
export const metadata = {
	title: locale.meta.title,
	lang: locale.id
}
export default () => {
	return <ErrorPage locale={locale} />
}