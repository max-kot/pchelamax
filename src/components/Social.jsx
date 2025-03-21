import { SocialLink } from './SocialLink';

export const Social = ({ className, list, title }) => {
	return (
		<div className={`social ${className ? className : ''}`.trim()}>
			<h3 className="title-3 social__title">{title}</h3>
			<ul className="social__list">
				{list.map(({ text, href }, index) => <SocialLink key={index} href={href}>{text}</SocialLink>)}
			</ul>
		</div>
	)
};