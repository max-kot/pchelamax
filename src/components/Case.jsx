import { Img } from "../components/Img";

export const Case = ({ data, index }) => {
	const { href, image, title } = data;
	return (<article className="projects__item project" data-aos="fade-down" data-aos-delay={100 * (index + 1)}>
		<a className="project__link" href={href} data-modal-btn={href}>
			<div className="project__image">
				<Img src={image} alt={title} />
			</div>
			<h4 className="project__title title-3">{title}</h4>
		</a>
	</article>)
};