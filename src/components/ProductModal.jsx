import { Button } from "./tools/Button";
import { ImageBox } from "./tools/ImageBox/ImageBox";
import { Swp } from "./tools/Swp";
import { Review } from "../components/Review.jsx";

export const ProductModal = ({ data, reviews }) => {
	const { href, title, images, text, table, value = 1, min, max, steps, id, price } = data;
	const currentReviews = reviews.filter(review => review.products.includes(id));

	const btnNext = <span><svg width="61" height="68" viewBox="0 0 61 68" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M26.832 67.693C25.8164 67.3961 24.8282 66.9742 23.8916 66.4254L6.46289 56.2125C2.45994 53.8667 4.26377e-05 49.5748 0 44.9352V24.1715C5.02875e-05 19.5318 2.45994 15.24 6.46289 12.8942L23.8916 2.68126C27.9727 0.289807 33.0273 0.289872 37.1084 2.68126L54.5371 12.8942C58.5402 15.2399 61 19.5318 61 24.1715V44.9352C61 49.5749 58.5402 53.8667 54.5371 56.2125L37.1084 66.4254C36.1718 66.9742 35.1836 67.3961 34.168 67.693H26.832Z" fill="#212529" />
		<path d="M25.6704 51.3324C24.9104 51.9534 23.7883 51.9106 23.0786 51.2025C22.3689 50.4943 22.3234 49.3719 22.9428 48.6107L23.0756 48.4632L37.9018 33.6068L23.1528 20.3656C22.3573 19.651 22.2919 18.4269 23.0063 17.6312C23.7208 16.8356 24.9449 16.7693 25.7407 17.4837L41.5004 31.6331C42.6012 32.6214 42.6485 34.331 41.604 35.3783L25.8178 51.1995L25.6704 51.3324Z" fill="#F8F9FA" />
	</svg>
	</span>
	const btnPrev = <span>
		<svg width="61" height="68" viewBox="0 0 61 68" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M34.168 0.887701C35.1836 1.18463 36.1718 1.60645 37.1084 2.15528L54.5371 12.3682C58.5401 14.714 61 19.0059 61 23.6455L61 44.4092C61 49.0489 58.5401 53.3407 54.5371 55.6865L37.1084 65.8994C33.0273 68.2909 27.9727 68.2908 23.8916 65.8994L6.46289 55.6865C2.45982 53.3408 5.1221e-05 49.0489 2.03553e-06 44.4092L3.85075e-06 23.6455C5.00327e-05 19.0058 2.45982 14.7139 6.4629 12.3682L23.8916 2.15528C24.8282 1.60645 25.8164 1.18461 26.832 0.8877L34.168 0.887701Z" fill="#212529" />
			<path d="M35.3296 17.2483C36.0896 16.6273 37.2118 16.6701 37.9214 17.3782C38.6311 18.0864 38.6766 19.2087 38.0572 19.97L37.9244 20.1175L23.0982 34.9739L37.8472 48.2151C38.6427 48.9297 38.7081 50.1538 37.9937 50.9495C37.2792 51.7451 36.0551 51.8114 35.2593 51.097L19.4996 36.9475C18.3988 35.9593 18.3515 34.2497 19.396 33.2024L35.1822 17.3811L35.3296 17.2483Z" fill="#F8F9FA" />
		</svg></span>;
	return (
		<div className="product-modal modal" data-modal={href} id={href.slice(1)} data-cart-product-id={id}>
			<div className="product-modal__slider slider-modal">
				<button className="slider-modal__btn slider-modal__btn-prev" type="button">{btnPrev}</button>
				<Swp className="slider-modal-swiper">
					{images.map((img, i) => <div className="swiper-slide slider-modal-slide" key={i}><ImageBox alt={title} src={img} /></div>)}
				</Swp>
				<button className="slider-modal__btn slider-modal__btn-next" type="button">{btnNext}</button>
				<div className="swiper-pagination slider-modal__pagination"></div>
			</div>
			<div className="product-modal__info">
				<h2 className="product-modal__title title-2">{title}</h2>
				<div className="product-modal__price-box">
					<Button className="product-modal__btn btn" data-cart-counter-transform-btn={value + ', ' + min + ', ' + max + ', ' + steps} data-cart-btn-add={id}>В корзину</Button>
					<div className="product-modal__price price" ><span data-cart-price>{price}</span> руб</div>
				</div>
				<table className="product-modal__table table">
					{table.map((item, i) => <tr className="table__row" key={i}><td className="table__cell table__cell--key">{item.key}</td><td className="table__cell table__cell--value">{item.value}</td></tr>)}
				</table>
				<p className="product-modal__description">{text}</p>
			</div>
			{!!currentReviews.length && (<div className="product-modal__reviews">
				<h3 className="product-modal__title title-2">Отзывы</h3>
				<ul className="product-modal__reviews-list">
					{currentReviews.map((review, i) => <Review key={i} data={review} />)}
				</ul>
			</div>)}
			<div className="product-modal__leave-review">
				<h3 className="product-modal__subtitle title-2">А как вам наши продукты?</h3>
				{!currentReviews.length && (<p className="product-modal__reviews-text">Будьте первым, кто поделится впечатлением о нашем продукте — ваше мнение важно для нас и других покупателей!</p>)}
				{!!currentReviews.length && (<p className="product-modal__reviews-text">Ваш отзыв поможет другим покупателям и вдохновит нас!</p>)}
				<Button className="btn product-modal__reviews-btn" href="#">Оставить отзыв</Button>
			</div>
		</div>
	)
};