import "./FlexBox.scss";

export const FlexBox = ({className, children}) => {
	return (
		<div className={className ? 'flex-box' + ' ' + className : 'flex-box'}>
			{children}
		</div>
	)
}