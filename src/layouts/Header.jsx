import { BurgerButton } from "../components/BurgerButton";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { Menu } from "../components/Menu";

export const Header = ({ data, className }) => {
	const { url, menu, btn, burgerTitle } = data;

	return (
		<header className={className ? "header " + className : "header"} data-auto-calc="header, height">
			<div className="container header__container">
				<Logo href={url} />
				<Menu menuList={menu} className={"header__menu"} />
				<Button
					href="#contacts"
					className="btn-label header__btn"
					data-auto-calc="btn-contacts, height"
					>
					<span>{btn}</span>
				</Button>
				<BurgerButton title={burgerTitle} />
				{/* data-adaptive-mover=".header__menu, max-width: 1024px" */}
			</div>
		</header>
	)
};