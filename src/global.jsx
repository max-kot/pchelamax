import { Head } from "minista";

import '@/scss/main.scss';
import { Loader } from "./layouts/Loader";

export default (props) => {
	const {
		children,
		title,
		lang = "en"
	} = props

	return (
		<>
			<Head htmlAttributes={{ lang: lang, class: lang + ' loader-shown' }}>
				<title>{title}</title>
				<script src="/src/js/main.js" type="module" defer />
			</Head>
			<div className="wrapper">
				<Loader />

				{children}
			</div>
		</>
	)
}