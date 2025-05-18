import { cls } from "./tools/cls";
import { Img } from "./tools/Img";

export const Logo = ({ className, tagName = 'a', href, ...extraAttrs }) => {
	const Tag = tagName;
	const linkAttrs = Tag === 'a' ? { href } : '';

	return (
		<Tag className={cls('logo', className)} {...linkAttrs} {...extraAttrs}>
			<div className="logo__icon" aria-hidden="true">
				<svg width="62" height="68" viewBox="0 0 62 68" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M27 3.6188C29.4752 2.18974 32.5248 2.18974 35 3.6188L55.3109 15.3453C57.7861 16.7744 59.3109 19.4154 59.3109 22.2735V45.7265C59.3109 48.5846 57.7861 51.2256 55.3109 52.6547L35 64.3812C32.5248 65.8103 29.4752 65.8103 27 64.3812L6.68911 52.6547C4.2139 51.2256 2.68911 48.5846 2.68911 45.7265V22.2735C2.68911 19.4154 4.2139 16.7744 6.68911 15.3453L27 3.6188Z" fill="#F8F9FA" stroke="#FCD34D" stroke-width="4" />
				</svg>
				<img src="images/icons/logo.svg" alt="Пчёлка" />
			</div>
			<div className="logo__text">
				<p className="logo__name">Сергей Котляренко</p>
				<p className="logo__position">пчеловод и экофермер</p>
			</div>
		</Tag>
	)
};