import { ImageBox } from "../components/tools/ImageBox/ImageBox";

import { ReactComponent as Insta } from '../assets/icons/insta.svg';
import { ReactComponent as Ok } from '../assets/icons/ok.svg';
import { ReactComponent as Whatsapp } from '../assets/icons/whatsapp.svg';
import { ReactComponent as Viber } from '../assets/icons/viber.svg';
import { ReactComponent as Telega } from '../assets/icons/telega.svg';
import { ReactComponent as Vk } from '../assets/icons/vk.svg';
import { ReactComponent as Yt } from '../assets/icons/yt.svg';

const contacts = [
	{
		name: 'Адрес',
		href: '#',
		text: 'ул. Первомайская 10а, г. Гомель, Беларусь',
		linkType: false
	},
	{
		name: 'Телефон',
		href: '+375332221100',
		text: '+ 375 (33) 222-11-00',
		linkType: 'tel:',
	},
	{
		name: 'E-mail',
		href: 'seregakot@gmail.com',
		text: 'seregakot@gmail.com',
		linkType: 'mailto:'
	}
]
const socials = [
	{
		text: 'Инстаграм',
		href: '#',
		icon: <Insta />
	},
	{
		text: 'Одноклассники',
		href: '#',
		icon: <Ok />
	},
	{
		text: 'Ватсап',
		href: '#',
		icon: <Whatsapp />
	},
	{
		text: 'Вайбер',
		href: '#',
		icon: <Viber />
	},
	{
		text: 'Телеграм',
		href: '#',
		icon: <Telega />
	},
	{
		text: 'ВКонтакте',
		href: '#',
		icon: <Vk />
	},
	{
		text: 'Ютуб',
		href: '#',
		icon: <Yt />
	}
]

export const Contacts = () => {
	return (
		<section className="section contacts" id="contacts">
			<div className="container contacts__container">
				<div className="contacts__body">
					<div className="contacts__content">
						<h2 className="contacts__title title">Наши контакты</h2>
						<ul className="contacts__list">
							{contacts.map(({ name, href, text, linkType }, i) => <li key={i} className="contacts__item"><span className="contacts__name title-3">{name}:</span><a className="contacts__link link" href={linkType ? linkType + href : href}>{text}</a></li>)}
						</ul>
						<p className="contacts__subtitle title-3">
							Вы также можете связаться с нами в мессенджерах или в соцсетях
						</p>
						<ul className="contacts__social social">
							{socials.map(({ icon, text, href }, i) => <li key={i} className="social__items"><a className="social__link" href={href} target="_blank" aria-label={text}>{icon}</a></li>)}
						</ul>
					</div>
					<div className="contacts__map">
						<iframe src="https://yandex.by/map-widget/v1/?ll=31.014272%2C52.424160&z=10" width="100%" height="100%" frameborder="1" allowfullscreen="true" ></iframe>
					</div>
				</div>
				<ImageBox className="contacts__image" src="src/assets/images/contacts-bg.jpg" aria-hidden="true" />
			</div>
		</section>
	)
};