import { RunningLine } from "../components/RunningLine";
import { List } from "../components/List";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const ErrorPage = ({ locale }) => {
	const { error } = locale;

	return (
		<>
			<Header data={locale.header} className="error-page" />
			<main className="main">
				<section className="error-section">
					<RunningLine className="error-section__running-line" speed="60s">404</RunningLine>
					<div className="container error-section__container">
						<h1 className="error-section__title title-2">{error.title}</h1>
						<List
							className="error-section__links"
							itemClassName="error-section__item"
							list={error.links}
							renderItem={(item) => <a className="error-section__link title-3 link link--dark-line" href={item.href}>{item.text}</a>}
						/>
					</div>
				</section>
			</main>
			<Footer data={locale.footer} className="error-page" />
		</>
	)
};