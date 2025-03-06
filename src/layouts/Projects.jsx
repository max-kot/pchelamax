import { Button } from "../components/Button";
import { RunningLine } from "../components/RunningLine";
import { Case } from "../components/Case";
import { Modal } from "../components/Modal";
import { Heading } from "../components/Heading";

export const Projects = ({ data }) => {
	const { title, subtitle, description, cases, buttonText, buttonDescription, buttonModalDescription } = data;
	return (
		<section class="projects" id="projects">
			<h2 className="visually-hidden">{title}</h2>
			<RunningLine>{title}</RunningLine>
			<div class="container projects__container section">
				<div className="projects__column projects__column--left">
					<Heading className="projects__heading" title={subtitle}>{description}</Heading>
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