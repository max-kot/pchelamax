import { Heading } from '../components/Heading';
import { Section } from '../components/Section';
import { Swiper } from '../components/Swiper';
import { Review } from '../components/Review';

export const Reviews = ({ data }) => {
	const { title, subtitle, description, list } = data;

	return (
		<Section className="reviews" title={title} speed="30s" containerClassName="reviews__container">
			<Heading title={subtitle}>{description}</Heading>
			<Swiper className="reviews__slider reviews-slider" hasScrollbar={true}>
				{list.map((item, index) => <Review data={item} key={index}/>)}
			</Swiper>
		</Section>
	)
};