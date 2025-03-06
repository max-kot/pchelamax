import { Img } from "../components/Img";

export const Case = ({ data }) => {
	const { href, image, title } = data;
	return (<article className="projects__item project">
		<a className="project__link" href={href} data-modal-btn={href}>
			<div className="project__image">
				<Img src={image} alt={title} />
			</div>
			<h4 className="project__title title-3">{title}</h4>
		</a>
	</article>)
};