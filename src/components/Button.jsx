export const Button = (props) => {
	let {
		children,
		href,
		className,
		target,
		title,
		type,
		...extraAttrs
	} = props;

	className = className ? "btn " + className : "btn";
	const isLink = href !== undefined;
	const linkProps = { href, target };
	const buttonProps = { type };
	const currentProps = isLink ? linkProps : buttonProps;
	const Component = isLink ? 'a' : 'button';

	return (
		<Component
			className={className}
			{...currentProps}
			title={title}
			aria-label={title}
			{...extraAttrs}
		>
			{children}
		</Component>
	)
}