export const FloatingLabel = ({ className, labelFor, label, children}) => {
	return (
		<div className={className ? "form-field " + className : "form-field"}>
			{children}
			<label htmlFor={labelFor} className="form-field__label">{label}</label>
		</div>
	)
};