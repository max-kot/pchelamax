import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Section } from "../components/Section";
import { FloatingLabel } from "../components/FloatingLabel";
import { Social } from "../components/Social";

export const Contacts = ({ data }) => {
	const { title, subtitle, description, socialTitle, socialLinks, formName, formContacts, select, formMessage, formDescription, buttonText } = data;

	return (
		<Section title={title} className="contacts" speed="30s">
			<Heading title={subtitle} className="contacts__heading">{description}</Heading>
			<form className="contacts__form form" data-validator data-send-form>
				<FloatingLabel label={formName} labelFor="name">
					<input className="form-field__input" id="name" name="name" type="text" required autocomplete="off" data-value-sync="name" />
				</FloatingLabel>
				<FloatingLabel label={formContacts} labelFor="contact-data" className="form-field--select">
					<input className="form-field__input" id="contact-data" name="contact-data" type="text" required autocomplete="off" data-value-sync="contact-data" />
					<select className="form-field__select" name="contact-value" id="contact-value" data-select data-value-sync="select">
						{select.map(({ text, value }) => <option key={value} value={value}>{text}</option>)}
					</select>
				</FloatingLabel>
				<FloatingLabel label={formMessage} labelFor="message">
					<textarea className="form-field__input form-field__textarea" name="message" id="message" data-value-sync="message"></textarea>
				</FloatingLabel>
				<small className="form__description">{formDescription}</small>
				<Button type="submit" className="btn-arrow form__btn">{buttonText}<span></span></Button>
			</form>
			<Social list={socialLinks} title={socialTitle} className="contacts__social"/>
		</Section>
	)
};