import { Header } from "./Header";
import { Hero } from "./Hero";

export const Home = ({ locale }) => {
	return (
		<>
			<Header data={locale.header} />
			<main className="main">
				<Hero data={locale.hero} url={locale.header.url}/>
			</main>
		</>
	)
};