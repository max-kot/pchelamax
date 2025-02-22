export const Menu = ({ className, menuList }) => {
	className = className ? 'menu' + ' ' + className : 'menu';

	return (
		<nav className={className}>
			<ul className="menu__list">
				{menuList && menuList.map(({ text, href }) => <li className="menu__item" key={text}><a className="menu__link link" href={href}>{text}</a></li>
				)}
			</ul>
		</nav>
	)
};