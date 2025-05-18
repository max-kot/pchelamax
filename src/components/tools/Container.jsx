import { cls } from "./cls";

export const Container = ({ className, children }) => {
	return (
		<div className={cls('container', className)}>
			{children}
		</div>
	)
};