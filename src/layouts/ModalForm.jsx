import { Button } from "../components/Button";
import { FloatingLabel } from "../components/FloatingLabel";
import { Heading } from "../components/Heading";
import { Modal } from "../components/Modal";

export const ModalForm = ({ data }) => {
	const { modalTitle, formName, formContacts, formMessage, formDescription, buttonText, select, modalDescription } = data;

	return (
		<Modal href="modal-form" className="modal-form">
			<Heading title={modalTitle}>{modalDescription}</Heading>
			<div className="modal__form form" data-validator>
				<FloatingLabel label={formName} labelFor="name-2">
					<input className="form-field__input" id="name-2" name="name" type="text" required autocomplete="off" data-value-sync="name" />
				</FloatingLabel>
				<FloatingLabel label={formContacts} labelFor="contact-data-2" className="form-field--select">
					<input className="form-field__input" id="contact-data-2" name="contact-data" type="text" required autocomplete="off" data-value-sync="contact-data" />
					<select className="form-field__select" name="contact-value" id="contact-value" data-value-sync="select" data-select>
						{select.map(({ text, value }) => <option key={value} value={value}>{text}</option>)}
					</select>
				</FloatingLabel>
				<FloatingLabel label={formMessage} labelFor="message-2">
					<textarea className="form-field__input form-field__textarea" name="message" id="message-2" data-value-sync="message"></textarea>
				</FloatingLabel>
				<small className="form__description">{formDescription}</small>
				<Button type="button" className="btn-arrow form__btn" data-send-form-btn>{buttonText}<span></span></Button>
			</div>
		</Modal>
	)
};