import { Button } from "./Button";

export const Review = ({ data }) => {
	const { title, text, name, position, link } = data;
	const svg = <svg width="79" height="60" viewBox="0 0 79 60" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M79 0.13916L62.2361 36.6007L60.7692 26.7519C63.9823 26.7519 66.8462 27.5202 69.3607 29.0569C71.8753 30.5936 73.901 32.6193 75.4377 35.1339C76.9744 37.5088 77.7427 40.2329 77.7427 43.3063C77.7427 46.3797 76.9744 49.1736 75.4377 51.6882C73.901 54.2028 71.8753 56.2285 69.3607 57.7652C66.8462 59.1621 63.9823 59.8606 60.7692 59.8606C57.6958 59.8606 54.832 59.1621 52.1777 57.7652C49.6631 56.2285 47.6375 54.133 46.1008 51.4787C44.5641 48.8244 43.7958 45.8907 43.7958 42.6776C43.7958 39.4645 44.4244 36.1118 45.6817 32.6193C47.0787 29.1268 49.5234 24.5866 53.0159 18.9986L64.3316 0.13916H79ZM35.2042 0.13916L18.4403 36.6007L16.9735 26.7519C20.1866 26.7519 23.0504 27.5202 25.565 29.0569C28.0796 30.5936 30.1052 32.6193 31.6419 35.1339C33.1786 37.5088 33.9469 40.2329 33.9469 43.3063C33.9469 46.3797 33.1786 49.1736 31.6419 51.6882C30.1052 54.2028 28.0796 56.2285 25.565 57.7652C23.0504 59.1621 20.1866 59.8606 16.9735 59.8606C13.9001 59.8606 11.0363 59.1621 8.38196 57.7652C5.86737 56.2285 3.84173 54.133 2.30504 51.4787C0.768346 48.8244 0 45.8907 0 42.6776C0 39.4645 0.628647 36.1118 1.88594 32.6193C3.28294 29.1268 5.72767 24.5866 9.22016 18.9986L20.5358 0.13916H35.2042Z" fill="currentColor" />
	</svg>
		;

	return (
		<div className='swiper-slide reviews-slide'>
			<div className='reviews-slide__wrapper'>
				<h3 className='reviews-slide__title title-3'>{svg}<span>{title}</span></h3>
				<p className='reviews-slide__text'>{text}</p>
				<div className='reviews-slide__meta'>
					<div className='reviews-slide__author'>
						<p className='reviews-slide__name'>{name}</p>
						<p className='reviews-slide__position'>{position}</p>
					</div>
					{link && <Button href={link} className="btn-arrow btn-arrow--small"><span></span></Button>}
				</div>
			</div>
		</div>
	)
};