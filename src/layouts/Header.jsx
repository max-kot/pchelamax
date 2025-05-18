import { menu } from "../data/menu"
import { Logo } from "../components/Logo"
import { cls } from "../components/tools/cls"
import { Container } from "../components/tools/Container"
import { Menu } from "../components/tools/Menu"
import { Button } from "../components/tools/Button"

export const Header = ({ className }) => {
	const icon = <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21Z" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>;

	return (
		<header className={cls('header', className)} data-auto-calc="header, height">
			<Container className="header__container flex flex-ai-c flex-jc-sb">
				<Logo className="header__logo" href="#" />
				<Menu className="header__menu" data={menu}/>
				<div className="header__btn-box flex flex-ai-c">
					<Button href="#contacts" className="header__btn btn" data-adaptive-mover=".menu__box, max-width: 1024.98px">Написать</Button>
					<Button href="#cart" className="header__cart-btn cart-btn">
						<div className="cart-btn__quantity" data-cart-quantity>0</div>
						<div className="cart-btn__icon">{icon}</div>
						<div className="cart-btn__text">корзина</div>
					</Button>
				</div>
			</Container>
		</header>
	)
}