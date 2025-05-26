import { Header } from "../layouts/Header"
import { Cart } from "../layouts/Cart.jsx"
import { Footer } from "../layouts/Footer.jsx"
import { Section404 } from "../layouts/Section404.jsx"

export const metadata = {
	title: 'Пчеловод и экофермер — Сергей Котляренко',
	lang: 'ru'
}

export default () => {
	return (<>
		<Header />
		<main className="main">
			<Section404/>
		</main>
		<Footer />
		<Cart />
	</>)
}

