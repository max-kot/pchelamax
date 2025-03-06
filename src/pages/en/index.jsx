import { Home } from "../../layouts/Home";
import {en as locale} from "../../locales/en";

export const metadata = {
	title: locale.meta.title,
	lang: locale.id
}
export default () => {
	return <Home locale={locale}/>;
}