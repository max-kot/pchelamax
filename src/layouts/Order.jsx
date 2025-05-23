import { Button } from "../components/tools/Button";

const contacts = ['телефон', 'эл-почта', 'ватсап', 'вайбер', 'телеграм']

export const Order = () => {
	return (
		<section className="section section--accent order">
			<div className="container order__container">
				<h2 className="title order__title">
					Оставьте заявку и я свяжусь с вами в ближайшее время
				</h2>
				<div className="order__flex-box">
					<div className="order__cart cart">
						<h2 className="cart__title title-2">Корзина (<span data-cart-quantity>0</span>)</h2>
						<ul className="cart__list" data-cart-list>
						</ul>
					</div>
					<form className="order__form form" action="#" data-cart-form data-validator>
						<h3 className="title-2 form__title">Ваши контактные данные</h3>
						<div className="form__field">
							<input className="form__input" type="text" name="name" id="name" placeholder="Ваше имя" required/>
						</div>
						<div class="form__field form__field--select">
							<input className="form__input form__input--select" type="text" name="contact" id="contact" placeholder="Ваши контакты" required/>
							<select className="form__select" name="contact-value" id="contact-value" data-select>
								{contacts.map((item, i) => <option key={i} value={item}>{item}</option>)}
							</select>
						</div>
						<div className="form__field">
							<textarea className="form__input form__textarea" name="message" id="message" placeholder="Ваше сообщение или комментарии к заказу"></textarea>
						</div>
						<div className="form__order-box">
							<small className="form__info small-descr">*Цена указана без доставки, финальная цена с доставкой обговаривается при контакте с продавцом</small>
							<div className="form__total total">
								<span className="total__text">Итого:</span>
								<div className="total__price price"><span data-cart-price-sum>0</span> руб</div>
							</div>
						</div>
						<Button className="form__btn btn">Отправить</Button>
					</form>
				</div>
			</div>
		</section>
	)
};