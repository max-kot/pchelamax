import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { Process } from "./Process";
import { About } from "./About";
import { Reviews } from "./Reviews";
import { Contacts } from "./Contacts";
import { Policy } from "./Policy";
import { Footer } from "./Footer";
import { ModalForm } from "./ModalForm";
import { ModalSuccess } from "./ModalSuccess";

export const Home = ({ locale }) => {
	return (
		<>
			<Header data={locale.header} />
			<main className="main">
				<Hero data={locale.hero} url={locale.header.url} />
				<Services data={locale.services} />
				<Projects data={locale.projects} />
				<Process data={locale.process} />
				<About data={locale.about} />
				<Reviews data={locale.reviews} />
				<Contacts data={locale.contacts} />

			</main>
			<Footer data={locale.footer} />
			<Policy data={locale.policy} />
			<ModalForm data={locale.contacts} />
			<ModalSuccess data={locale.success} />
		</>
	)
};