import { Head } from "minista";

import '@/scss/main.scss';

export default (props) => {
	const {
		children,
		title,
		lang = "en"
	} = props

	return (
		<>
			<Head htmlAttributes={{ lang: lang, class: lang }}>
				<title>{title}</title>
				<script src="/src/js/main.js" type="module" defer />
			</Head>
			<div className="wrapper">
				{children}
			</div>
		</>
	)
}