import { ImageBox } from "../components/tools/ImageBox/ImageBox";
import { Swp } from "../components/tools/Swp";
import { BenefitItem } from "../components/BenefitItem.jsx";
import { benefits } from "../data/benefits.jsx"

export const Benefits = () => {
	return (
		<section className="section section--light benefits" id="benefits">
			<div className="container benefits__container">
				<div className="benefits__content">
					<h2 className="benefits__title title" data-auto-calc="benefits-title, height">
						Почему выбирают наc и наши продукты
					</h2>
					<div className="benefits__sliders">
						<Swp className="benefits-slider benefits-slider--1">
							{benefits.map((item, i) => <BenefitItem data={item} key={i} />)}
						</Swp>
						<Swp className="benefits-slider benefits-slider--2">
							{[...benefits.slice(1), benefits[0]].map((item, i) => <BenefitItem data={item} key={i} />)}
						</Swp>
						<Swp className="benefits-slider benefits-slider--3">
							{[...benefits.slice(2), benefits[0], benefits[1]].map((item, i) => <BenefitItem data={item} key={i} />)}
						</Swp>
					</div>
				</div>

				<ImageBox className="benefits__image sota-mask" src="src/assets/images/benefit-1.jpg" aria-hidden="true" />
			</div>
		</section>
	)
};