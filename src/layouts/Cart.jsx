import { CartProduct } from "../components/CartProduct";
import { Recommended } from "../components/Recommended.jsx";
import { CartEmptyDescr } from "../components/CartEmptyDescr.jsx";
import { Button } from "../components/tools/Button";

export const Cart = () => {
	return (
		<div className="cart" id="cart" data-modal="#cart">
			<h2 className="cart__title title-2">Корзина (<span data-cart-quantity>0</span>)</h2>
			<CartEmptyDescr/>
			<ul className="cart__list" data-cart-list>
			</ul>
			<Recommended/>
			<div className="cart__order-box">
				<small className="cart__info small-descr">*Цена указана без доставки, финальная цена с доставкой обговаривается при контакте с продавцом</small>
				<div className="cart__total total">
					<span className="total__text">Итого:</span>
					<div className="total__price price"><span data-cart-price-sum>0</span> руб</div>
				</div>
				<Button className="cart__btn btn">Оформить заказ</Button>
			</div>
		</div>
	)
};