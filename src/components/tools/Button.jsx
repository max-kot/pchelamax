import { cls } from "./cls";

export const Button = ({ tagName = 'button', className, href, type = 'button', children, hasIcon = false, ...extraAttrs }) => {
	const isLink = href;
	const Tag = isLink ? 'a' : tagName;
	const attrs = isLink ? { href } : { type };

	const icon = <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.32219 17.2782C-0.0683342 17.6688 -0.0683342 18.3019 0.32219 18.6925C0.712714 19.083 1.34588 19.083 1.7364 18.6925L0.32219 17.2782ZM18.9999 1.01479C18.9999 0.462504 18.5521 0.0147888 17.9999 0.0147886L8.99986 0.0147894C8.44757 0.0147891 7.99986 0.462505 7.99986 1.01479C7.99986 1.56707 8.44758 2.01479 8.99986 2.01479L16.9999 2.01479L16.9999 10.0148C16.9999 10.5671 17.4476 11.0148 17.9999 11.0148C18.5521 11.0148 18.9999 10.5671 18.9999 10.0148L18.9999 1.01479ZM1.7364 18.6925L18.707 1.7219L17.2928 0.307682L0.32219 17.2782L1.7364 18.6925Z" fill="#212529" />
	</svg>;

	return (
		<Tag className={cls('button', className)} {...attrs} {...extraAttrs}>
			{children}
			{hasIcon && icon}
		</Tag>
	)
};