export const RunningLine = ({ className, children, speed }) => {
	const icon = <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18.08 11.5121H12.788L16.568 15.2921L14.372 17.4161L10.628 13.6721V19.0001L7.56802 18.9641V13.6721L3.78802 17.4521L1.66402 15.2561L5.40802 11.5121H0.0800171V8.45211H5.40802L1.62802 4.67211L3.78802 2.51211L7.56802 6.29211V0.964111H10.628V6.29211L14.408 2.51211L16.568 4.67211L12.788 8.45211H18.08V11.5121Z" fill="#212529" />
	</svg>

	return (
		<div className={`running-line ${className || ''}`.trim()} style={speed ? { '--running-line-speed': speed } : null} data-running-line>
			<ul className="running-line__list" data-running-line-list>
				<li className="running-line__item">{children}<span className="running-line__icon">{icon}</span></li>
			</ul>
		</div>
	)
};