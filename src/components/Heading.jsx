export const Heading = ({className, title, children}) => {
	return (
		<div className={className ? "heading " + className : "heading"}>
			<h3 className="heading__title title-2">{title}</h3>
			<p className="heading__description">{children}</p>
		</div>
	)
};