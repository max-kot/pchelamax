export const SocialLink = ({href, children}) => {
	return (
		<li className="social__item">
			<a href={href} className="social__link link" target="_blank">{children}</a>
		</li>)
};