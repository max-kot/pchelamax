import { Review } from "../components/Review";
import { Button } from "../components/tools/Button";
import { Swp } from "../components/tools/Swp";
import { reviews } from "../data/reviews";

export const Reviews = () => {
	return (
		<section className="section section--light reviews" id="reviews">
			<div className="container reviews__container">
				<div className="reviews__content">
					<h2 className="reviews__title title">Что наши клиенты говорят о нас</h2>
					<p className="reviews__text">
						Мы всегда рады получать теплые слова от тех, кто уже попробовал нашу продукцию.Их доверие и довольные отзывы — лучшая награда для нас.
					</p>
				</div>
				<div className="reviews__sliders">
					<Swp className="reviews-slider reviews-slider--1">
						{reviews.map((item, i) => <Review data={item} key={i} className="swiper-slide reviews-slide" />)}
					</Swp>
					<Swp className="reviews-slider reviews-slider--2">
						{[...reviews.slice(1), reviews[0]].map((item, i) => <Review data={item} key={i} className="swiper-slide reviews-slide" />)}
					</Swp>
				</div>
				<div className="reviews__btn-box">
					<Button className="btn reviews__btn " href="#">Оставить отзыв</Button>
					<p className="reviews__btn-text">
						Оставьте свой отзыв — нам важно ваше мнение!
					</p>
				</div>
			</div>
		</section>
	)
};