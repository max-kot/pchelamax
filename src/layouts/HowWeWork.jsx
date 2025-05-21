import { HowWeWorkItem } from "../components/HowWeWorkItem.jsx";
import { howWeWork } from "../data/howWeWork.jsx"

export const HowWeWork = () => {
	return (
		<section className="section section--accent how-we-work" id="how-we-work">
			<div className="container how-we-work__container">
				<h2 className="title how-we-work__title">Как заказать?</h2>
				<ul className="how-we-work__list">
					{howWeWork.map((item, i) => <HowWeWorkItem key={i} data={item} />)}
				</ul>
			</div>
		</section>
	)
};