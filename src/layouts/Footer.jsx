import { Logo } from "../components/Logo";
import { ReactComponent as Arrow} from "../assets/icons/arrow-up.svg";
import { Button } from "../components/tools/Button";

export const Footer = () => {
	return(
		<footer className="footer">
			<div className="container footer__container">
			<div className="footer__top">
				<Logo className="footer__logo" href="#" />
				<Button className="footer__btn-up" href="#">
					<Arrow/>
					<span>Вверх</span>
				</Button>
			</div>
			<div className="footer__bottom">
				<p className="footer__copy">
					&copy; <span data-year>2023</span> Все права принадлежат правообладателю
				</p>
				<div className="footer__dev">
					Разработка сайта — <a className="link" href="#" target="_black">MAX-KOT</a>
				</div>
			</div>
			</div>
		</footer>
	)
};