import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { Year } from "../components/Year/Year";

export const Footer = ({ data, className }) => {
	const { url, buttonUp, copyrights, developer } = data;
	return (
		<footer className={`footer ${className || ''}`.trim()}>
			<div className="container section footer__container">
				<Logo href={url} />
				<Button href="#" className="btn-arrow btn-arrow--up">{buttonUp}</Button>
				<small className="footer__copyrights"> &copy;<Year from="2024" /> {copyrights}</small>
				<p className="footer__developer">{developer} - <Button href="https://t.me/maxkot_web" target="_blank" className="link">MAX-KOT</Button></p>
			</div>
		</footer>
	)
};