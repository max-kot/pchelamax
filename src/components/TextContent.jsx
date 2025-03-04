export const TextContent = ({title, children}) => {
	return (
		<div className="text-content">
			{title && <h4 className="title-3">{title}</h4>}
			{children}
		</div>
	)
};