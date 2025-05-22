import { CartProduct } from "../components/CartProduct";
import { Button } from "../components/tools/Button";

export const Cart = () => {
	const trashIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 6H5H21" stroke="#CED4DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#CED4DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>;
	return (
		<div className="cart" id="cart" data-modal="#cart">
			<h2 className="cart__title title-2">Корзина (<span data-cart-quantity>0</span>)</h2>
			<ul className="cart__list" data-cart-list>
				{/*<CartProduct />
				<CartProduct />
				<CartProduct />
				<CartProduct />*/}
			</ul>
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