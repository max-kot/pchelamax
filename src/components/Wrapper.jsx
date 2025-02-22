import { Img } from "../components/tools/Img";
import { Icon } from "minista";
import { data } from "../data/data.js";

export const Wrapper = () => {

	return (
		<div className="wrapper">
			<h1>Test</h1>
			<Icon iconId="settings" />
			<Img src="/src/assets/images/image-1.png" />
			<Img src="/src/assets/images/image-11.jpg" />
			{/*<Img src="/src/assets/images/copy/image-101.jpg" />*/}
			<ul>
				{data.map((item) => {
					return <li key={item.name}>
						<h3>{item.name}</h3>
						<ul>
							{item.hobbies.map(hobbie => <li key={hobbie}>{hobbie}</li>)}
						</ul>
						<ul>
							{item.address && Object.keys(item.address).map(key => <li key={key}>{key} = {item.address[key]}</li>)}
						</ul>
					</li>
				})}
			</ul>
		</div>
	)
};