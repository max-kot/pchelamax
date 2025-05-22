import { cls } from "./cls";

export const Swp = ({ className, children, btnPrev, btnNext, pagination,
	hasScrollbar, ...extraAttrs }) => {
	return (
		<div className={cls("swiper", className)} {...extraAttrs}>
			<div className={cls("swiper-wrapper", `${className}__wrapper`)}>
				{children}
			</div>
			{pagination && <div className={cls("swiper-pagination", `${className}__pagination`, pagination)}></div>}
			{hasScrollbar && <div className={cls('swiper-scrollbar', `${className}__pagination`)}></div>}
			{btnPrev && <button className={cls(`${className}__btn`, `${className}__btn-prev`)} type="button">{btnPrev}</button>}
			{btnNext && <button className={cls(`${className}__btn`, `${className}__btn-next`)} type="button">{btnNext}</button>}
		</div>
	)
};