import { Button } from "../components/Button";
import { Img } from "../components/Img";
import { RunningLine } from "../components/RunningLine";
import { Modal } from "../components/Modal";

export const Projects = ({ data }) => {
	const { title, subtitle, description, cases, buttonText, buttonDescription, buttonModalDescription } = data;
	const Case = ({ data }) => {
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
	
	
	return (
		<section class="projects" id="projects">
			<h2 className="visually-hidden">{title}</h2>
			<RunningLine>{title}</RunningLine>
			<div class="container projects__container">
				<div className="projects__column projects__column--left">
					<div className="projects__item projects__item--title-box">
						<h3 className="projects__subtitle title-2">{subtitle}</h3>
						<p className="projects__description">{description}</p>
					</div>
					{cases.map((item, index) => !((index + 1) % 2) ? <Case data={item} key={index} /> : '')}
				</div>
				<div className="projects__column projects__column--right">
					{cases.map((item, index) => (index + 1) % 2 ? <Case data={item} key={index} /> : '')}
					<div className="projects__item projects__item--btn-box">
						<p className="projects__text">{buttonDescription}</p>
						<Button href="#contacts" className="btn-arrow">{buttonText}<span></span></Button>
					</div>
				</div>
			</div>
			<div className="project__modals">
				{cases.map((item, index) => <Modal data={item} key={index} extra={{buttonModalDescription, buttonText}}/>)}
			</div>
		</section>
	)
};