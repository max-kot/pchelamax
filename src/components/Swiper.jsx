export const Swiper = ({className, children, hasPagination, hasScrollbar, buttonPrev, buttonNext}) => {
	return(
		<div className={'swiper ' + className}>
			<div className={'swiper-wrapper ' + className + '__wrapper'}>
				{children}
			</div>
			
			{hasPagination && <div className={className + '__pagination'}></div>}
			{hasScrollbar && <div className={className + '__scrollbar-container'}><div className={'swiper-scrollbar ' +className + '__scrollbar'}></div></div>}
			{buttonPrev && <button className={className + '__btn ' + className + '__btn--prev'} type="button">{buttonPrev}</button>}
			{buttonNext && <button className={className + '__btn ' + className + '__btn--next'} type="button">{buttonNext}</button>}
		</div>
	)
};