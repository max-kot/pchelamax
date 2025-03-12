import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Section } from "../components/Section";
import { FloatingLabel } from "../components/FloatingLabel";

export const Contacts = ({ data }) => {
	const { title, subtitle, description, socialTitle, socialLinks, formName, formContacts, select, formMessage, formDescription, buttonText } = data;

	return (
		<Section title={title} className="contacts" speed="30s">
			<Heading title={subtitle} className="contacts__heading">{description}</Heading>
			<form className="contacts__form form" data-validator>
				<FloatingLabel label={formName} labelFor="name">
					<input className="form-field__input" id="name" name="name" type="text" required autocomplete="off" />
				</FloatingLabel>
				<FloatingLabel label={formContacts} labelFor="contact-data" className="form-field--select">
					<input className="form-field__input" id="contact-data" name="contact-data" type="text" required autocomplete="off" />
					<select className="form-field__select" name="contact-value" id="contact-value" data-select>
						{select.map(({ text, value }) => <option key={value} value={value}>{text}</option>)}
					</select>

				</FloatingLabel>
				<FloatingLabel label={formMessage} labelFor="message">
					<textarea className="form-field__input form-field__textarea" name="message" id="message"></textarea>
				</FloatingLabel>
				<small className="form__description">{formDescription}</small>
				<Button type="submit" className="btn-arrow form__btn">{buttonText}<span></span></Button>
			</form>
			<div className="contacts__social social">
				<h3 className="title-3 social__title">{socialTitle}</h3>
				<ul className="social__list">
					{socialLinks.map(({ text, href }) => <li className="social__item" key={href}><a href={href} className="social__link link" target="_blank">{text}</a></li>)}
				</ul>
			</div>
		</Section>
	)
};