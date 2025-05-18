import { Container } from "./tools/Container";
import { Button } from "./tools/Button";
import { cls } from "./tools/cls";
import { ImageBox } from "./tools/ImageBox/ImageBox";

export const HeroSlide = ({ data, className, ...extraAttrs }) => {
	const { label, title, text, btnHref, btn, linkHref, link, image, video } = data;

	return (
		<div className={cls("swiper-slide", "hero-slide")} {...extraAttrs}>
			<div className={"hero-slide__wrapper"}>
				<ImageBox src={image || video} isVideo={!image} className="hero-slide__media"></ImageBox>
				<Container className="hero-slide__container">
					<div className="hero-slide__content">
						{label && <div className="hero-slide__label">{label}</div>}
						<h3 className="hero-slide__title title">{title}</h3>
						<p className="hero-slide__text">{text}</p>
						<div className="hero-slide__btn-box flex flex-jc-sb flex-ai-c">
							<Button className="hero-slide__btn btn" href={btnHref}>{btn}</Button>
							<Button className="hero-slide__link btn btn--stroke" href={linkHref} hasIcon={true}>{link}</Button>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
};