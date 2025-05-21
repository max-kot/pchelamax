import { Cart } from "../layouts/Cart.jsx"
import { Products } from "../layouts/Products.jsx"
import { About } from "../layouts/About.jsx"
import { Benefits } from "../layouts/Benefits.jsx"
import { Hero } from "../layouts/Hero"
import { Header } from "../layouts/Header"
import { ProductModal } from "../components/ProductModal.jsx"

import { products } from "../data/products.jsx"
import { reviews } from "../data/reviews.jsx"

export const metadata = {
	title: 'Пчеловод и экофермер — Сергей Котляренко',
	lang: 'ru'
}

export default () => {
	return (<>
		<Header />
		<main className="main">
			<Hero />
			<About />
			<Products />
			<Benefits />
		</main>

		{products.map((product, i) => <ProductModal key={i} data={product} reviews={reviews} />)}
		<Cart />
	</>)
}

