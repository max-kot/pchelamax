import { ImageBox } from "../components/tools/ImageBox/ImageBox";

export const CartProduct = () => {
	const trashIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 6H5H21" stroke="#CED4DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#CED4DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>;

	return (
		<li className="cart__product cart-product" data-cart-item>
			<ImageBox className="cart-product__image" src="src/assets/images/product-1.jpg" />
			<div className="cart-product__content">
				<div className="cart-product__content-col">
					<h3 className="cart-product__name title-3">Мёд 0,5л</h3>
					<ul className="cart-product__descr-list descr-list">
						<li class="descr-list__item">2024 год</li>
						<li class="descr-list__item">Разнотравье</li>
					</ul>
					<div className="cart-product__counter-box">
						<small className="cart-product__price-for-one"><span data-cart-price-for-one>8</span> руб за шт</small>
						<div className="cart-product__counter counter" data-cart-counter>
							<button className="counter__btn counter__btn--remove" type="button" aria-label="Убрать" data-cart-counter-btn-minus>-</button>
							<input className="counter__input" type="number" max="20" min="1" value="1" data-cart-counter-input data-cart-quantity-value />
							<button className="counter__btn counter__btn--add" type="button" aria-label="Добавить" data-cart-counter-btn-plus>+</button>
						</div>
					</div>
				</div>
				<div className="cart-product__content-col">
					<button className="cart-product__remove-btn" type="button" aria-label="Удалить товар" data-cart-btn-remove>{trashIcon}</button>
					<span className="cart-product__price price"><span data-cart-price>8</span> руб</span>
				</div>
			</div>
		</li>
	)
};
