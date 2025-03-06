import { RunningLine } from "../components/RunningLine";
import { Heading } from "../components/Heading";
import { Step } from "../components/Step";
import { Button } from "../components/Button";



export const Process = ({ data }) => {
	const { title, subtitle, description, steps, inputTitle, placeholder } = data;

	return (
		<section class="process" id="process">
			<h2 className="visually-hidden">{title}</h2>
			<RunningLine speed="50s">{title}</RunningLine>
			<div class="container section process__container">
				<Heading className="process__heading" title={subtitle}>{description}</Heading>
				<ul className="process__list">
					{steps.map((step, index) => <Step key={index} index={index} data={step} />)}
				</ul>
				<div className="process__form">
					<h3 className="process__form-title title-3">{inputTitle}</h3>
					<div className="process__field">
						<input className="process__input" type="text" placeholder={placeholder}/>
						<Button href="#contacts" className="btn-arrow btn-arrow--small"><span></span></Button>
					</div>
				</div>
			</div>
		</section>
	)
};