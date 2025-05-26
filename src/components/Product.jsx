import { Button } from "./tools/Button";
import { cls } from "./tools/cls";
import { ImageBox } from "./tools/ImageBox/ImageBox";

export const Product = ({className, data }) => {
	const { id, href, image, category, categoryId, title, price, description, value = 1, max, min, steps = 1 } = data;
	return (
		<article className={cls("product", className)} data-cart-product-id={id} data-filter-category={categoryId}>
			<ImageBox className="product__image-link" src={image} href={href} data-modal-btn={href} tagName="a" aria-label="Узнать подробнее" data-card-link />
			<span className="product__category">{category}</span>
			<div className="product__content">
				<div className="product__heading">
					<span className="product__price">{price} руб</span>
					<a className="product__title-link" href={href}><h3 className="product__title title-3">{title}</h3></a>
				</div>
				<ul className="product__description descr-list">
					{description.map((descr, i) => <li key={i} className="descr-list__item">{descr}</li>)}
				</ul>
				<Button className="product__btn btn" data-cart-counter-transform-btn={value + ', ' + min + ', ' + max + ', ' + steps} data-cart-btn-add={id}>В корзину</Button>
			</div>
		</article>
	)
};