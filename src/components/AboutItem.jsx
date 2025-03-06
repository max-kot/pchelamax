import { TextContent } from "./TextContent";

export const AboutItem = ({ data }) => {
	const { title, text } = data;

	return (
		<li className="about__item">
			<TextContent title={title}>
				<p>{text}</p>
			</TextContent>
		</li>
	)
};