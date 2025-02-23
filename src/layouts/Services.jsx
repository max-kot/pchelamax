import { RunningLine } from "../components/RunningLine";

export const Services = ({ data }) => {
	const { title, tabs } = data;

	return (
		<section className="services" id="services">
			<h2 className="visually-hidden">{title}</h2>
			<RunningLine>{title}</RunningLine>
			<div className="container services__container">
				<ul className="services__tab-buttons tab-buttons">
					{tabs.map(({button, id}) => <li className="tab-buttons__item" key={button}><a className="tab-buttons__button" href={"#" + id} data-tab-button>{button}</a></li>)}
				</ul>
				<ol className="services__tabs tabs">
					{tabs.map(({text, id}) => <li className="tabs__item" key={id} data-tab={id} id={id}>{text}</li>)}
				</ol>
			</div>
		</section>

	)
};