export const RunningLine = ({ children, speed }) => {
	return (
		<div className="running-line" style={speed ? { '--running-line-speed': speed } : null} data-running-line>
			<ul className="running-line__list" data-running-line-list>
				<li className="running-line__item">{children}</li>
			</ul>
		</div>
	)
};