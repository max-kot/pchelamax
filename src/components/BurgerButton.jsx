export const BurgerButton = ({ title }) => {
	return (
		<button className="burger-btn" aria-label={title} title={title}>
			<span></span>
		</button>
	)
}