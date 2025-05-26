import { Button } from "../components/tools/Button";
import { ReactComponent as Icon } from "../assets/icons/bee.svg";

export const Section404 = () => {
	return (
		<section className="section section--accent section-404">
			<div className="container section-404__container">
				<h1 className="section-404__title title">Ой! Тут только жужжание… а страницы нет</h1>
				<div className="section-404__decor decor-404">
					<span className="decor-404__num">4</span>
					<div className="decor-404__center">
						<span className="decor-404__zero">0</span>
						<span className="decor-404__icon"><img src="images/icons/logo.svg" aria-hidden="true" /></span>
					</div>
					<span className="decor-404__num">4</span>
				</div>
				<p className="section-404__text title-3">
					Не беда — у нас есть много других вкусных мест:
				</p>
				<div className="section-404__btn-box">
					<Button className="btn btn--dark" href="/catalog">Посмотреть товары</Button>
					<Button className="btn btn--stroke" href="/">На главную</Button>
				</div>
			</div>
		</section>
	)
};