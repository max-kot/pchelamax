import { Swp } from "../components/tools/Swp";
import { Category } from "../components/Category.jsx";
import { Product } from "../components/Product.jsx";

import { categories, products } from "../data/products.jsx"

export const Products = () => {
	const btnNext = <span><svg width="61" height="68" viewBox="0 0 61 68" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M26.832 67.693C25.8164 67.3961 24.8282 66.9742 23.8916 66.4254L6.46289 56.2125C2.45994 53.8667 4.26377e-05 49.5748 0 44.9352V24.1715C5.02875e-05 19.5318 2.45994 15.24 6.46289 12.8942L23.8916 2.68126C27.9727 0.289807 33.0273 0.289872 37.1084 2.68126L54.5371 12.8942C58.5402 15.2399 61 19.5318 61 24.1715V44.9352C61 49.5749 58.5402 53.8667 54.5371 56.2125L37.1084 66.4254C36.1718 66.9742 35.1836 67.3961 34.168 67.693H26.832Z" fill="#212529" />
		<path d="M25.6704 51.3324C24.9104 51.9534 23.7883 51.9106 23.0786 51.2025C22.3689 50.4943 22.3234 49.3719 22.9428 48.6107L23.0756 48.4632L37.9018 33.6068L23.1528 20.3656C22.3573 19.651 22.2919 18.4269 23.0063 17.6312C23.7208 16.8356 24.9449 16.7693 25.7407 17.4837L41.5004 31.6331C42.6012 32.6214 42.6485 34.331 41.604 35.3783L25.8178 51.1995L25.6704 51.3324Z" fill="#F8F9FA" />
	</svg>
	</span>
	const btnPrev = <span>
		<svg width="61" height="68" viewBox="0 0 61 68" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M34.168 0.887701C35.1836 1.18463 36.1718 1.60645 37.1084 2.15528L54.5371 12.3682C58.5401 14.714 61 19.0059 61 23.6455L61 44.4092C61 49.0489 58.5401 53.3407 54.5371 55.6865L37.1084 65.8994C33.0273 68.2909 27.9727 68.2908 23.8916 65.8994L6.46289 55.6865C2.45982 53.3408 5.1221e-05 49.0489 2.03553e-06 44.4092L3.85075e-06 23.6455C5.00327e-05 19.0058 2.45982 14.7139 6.4629 12.3682L23.8916 2.15528C24.8282 1.60645 25.8164 1.18461 26.832 0.8877L34.168 0.887701Z" fill="#212529" />
			<path d="M35.3296 17.2483C36.0896 16.6273 37.2118 16.6701 37.9214 17.3782C38.6311 18.0864 38.6766 19.2087 38.0572 19.97L37.9244 20.1175L23.0982 34.9739L37.8472 48.2151C38.6427 48.9297 38.7081 50.1538 37.9937 50.9495C37.2792 51.7451 36.0551 51.8114 35.2593 51.097L19.4996 36.9475C18.3988 35.9593 18.3515 34.2497 19.396 33.2024L35.1822 17.3811L35.3296 17.2483Z" fill="#F8F9FA" />
		</svg>

	</span>
	return (
		<section className="products section section--accent">
			<div className="container">
				<h2 className="title products__title">Наша продукция</h2>
				<div className="products__filter-box">
					<button className="products-filters__btn products-filters__btn-prev" type="button">{btnPrev}</button>
					<Swp className="products-filters">
						{categories.map((category, i) => <Category data={category} key={i} />)}
					</Swp>
					<button className="products-filters__btn products-filters__btn-next" type="button">{btnNext}</button>
				</div>

				<ul className="products__list">
					{products.map((product, i) => <Product key={i} data={product} />)}
				</ul>
			</div>
		</section>
	)
};