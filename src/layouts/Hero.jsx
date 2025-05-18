import { hero } from "../data/hero";
import { HeroSlide } from "../components/HeroSlide";
import { Swp } from "../components/tools/Swp";

export const Hero = () => {
	return (
		<section className="hero">
			<Swp className="hero-swiper" pagination="pagination pagination--accent">
				{hero.map((item, i) => <HeroSlide key={i} data={item} />)}
			</Swp>
		</section>
	)
};