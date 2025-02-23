export const RunningLine = ({children}) => {
	return (
		<div className="running-line" data-running-line>
			<ul className="running-line__list" data-running-line-list>
				<li className="running-line__item">{children}</li>
			</ul>
		</div>
	)
};