import { Heading } from '../components/Heading';
import { RunningLine } from '../components/RunningLine';
import { Section } from '../components/Section';
import { Img } from '../components/Img';
import { AboutItem } from '../components/AboutItem';
import { Button } from '../components/Button';

export const About = ({ data }) => {
	const { title, subtitle, description, alt, list, buttonTitle, buttonDescription, buttonText } = data;

	return (
		<Section className="about">
			<RunningLine>{title}</RunningLine>
			<div class="container section about__container">
				<Heading className="about__heading" title={subtitle}>{description}</Heading>
				<div className="about__image">
					<Img src="src/assets/images/photo-1.jpg" alt={alt} />
				</div>
				<div className="about__columns">
					<ul className="about__col">
						{list.map((item, index) => ((index + 1) % 2) ? <AboutItem key={index} data={item} /> : '')}
					</ul>
					<ul className="about__col">
						{list.map((item, index) => !((index + 1) % 2) ? <AboutItem key={index} data={item} /> : '')}
					</ul>
				</div>
				<div className="about__btn-box btn-box">
					<h3 className="btn-box__title title-3">{buttonTitle}</h3>
					<p className="btn-box__text">{buttonDescription}</p>
					<Button href="#contacts" className="btn-arrow">{buttonText}<span></span></Button>
				</div>
			</div>
		</Section>
	)
};