import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Projects } from "./Projects";

export const Home = ({ locale }) => {
	return (
		<>
			<Header data={locale.header} />
			<main className="main">
				<Hero data={locale.hero} url={locale.header.url}/>
				<Services data={locale.services}/>
				<Projects data={locale.projects}/>
			</main>
		</>
	)
};