import { Home } from "../../layouts/Home";
import locale from "../../locales/en.json";

export const metadata = {
	title: locale.meta.title,
	lang: locale.id
}
export default () => {
	return <Home locale={locale}/>;
}