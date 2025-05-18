import { cls } from "./cls";

export const Menu = ({ className, data, ariaMenu = 'Меню сайта', ariaBurger = 'Открыть / закрыть меню', ...extraAttrs }) => {
	return (
		<nav className={cls('menu', className)} data-menu="1023.98, .menu__list" {...extraAttrs}>
			<div className="menu__box">
				<ul className="menu__list" aria-label={ariaMenu}>
					{data.map((item, index) => <li className="menu__item" key={index}><a className="menu__link" href={item.href || '#'}>{item.text || 'Пункт меню'}</a></li>)}
				</ul>
			</div>
			<button className="menu__burger-btn" type="button" aria-label={ariaBurger}><span></span></button>
		</nav>
	)
};