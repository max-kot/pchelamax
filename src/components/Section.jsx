import { RunningLine } from "./RunningLine";

export const Section = ({ className, containerClassName, title, children, speed }) => {
	containerClassName = containerClassName ? containerClassName + ` ${className}__container` : "container section" + ` ${className}__container`;
	return (
		<section class={className} id={className}>
			<h2 className="visually-hidden">{title}</h2>
			<RunningLine speed={speed}>{title}</RunningLine>
			<div className={containerClassName}>
				{children}
			</div>
		</section>
	)
};