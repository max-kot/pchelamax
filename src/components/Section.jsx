export const Section = ({ className, title, children }) => {
	return (
		<section class={className} id={className}>
			<h2 className="visually-hidden">{title}</h2>
			{children}
		</section>
	)
};