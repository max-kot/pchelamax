import { Button } from "../components/Button.jsx"
import { TextContent } from "../components/TextContent.jsx"

export const en = {
	id: "en",
	meta: {
		title: "Vera Target"
	},
	header: {
		url: "#",
		menu: [
			{
				text: "Services",
				href: "#services"
			},
			{
				text: "Project",
				href: "#projects"
			},
			{
				text: "About me",
				href: "#about"
			},
			{
				text: "Work process",
				href: "#process"
			},
			{
				text: "Reviews",
				href: "#reviews"
			}
		],
		btn: "Get in touch",
		burgerTitle: "Open / close menu"
	},
	hero: {
		title: [
			"Set up Instagram",
			"adverts",
			"without",
			"extra costs"
		],
		text: "Achieve high audience reach with a personalized strategy!",
		langList: [
			{
				text: "eng",
				href: "https://max-kot.github.io/veratarget/en",
				isActive: true,
				title: "switch site on english version"
			},
			{
				text: "рус",
				href: "https://max-kot.github.io/veratarget/",
				isActive: false,
				title: "переключить сайт на русский язык"
			}
		],
		scrollBtnTitle: "Scroll to learn more"
	},
	services: {
		title: "Services",
		tabs: [
			{
				id: "tab-1",
				button: "Strategy design",
				text: "The advertising company does not start blindly.Each project begins with the preparation of a marketing strategy to achieve maximum sales."
			},
			{
				id: "tab-2",
				button: "Making creatives",
				text: "I make both static creatives and videos.I will help with the preparation of photos and video materials, if necessary."
			},
			{
				id: "tab-3",
				button: "Advertising setting",
				text: "I launch advertising campaigns to different groups of the target audience and analyze which give the best result."
			},
			{
				id: "tab-4",
				button: "Feedback of the results",
				text: "Every day you get a report on the results of an advertising campaign, as well as a monthly report."
			},
			{
				id: "tab-5",
				button: "Focus of your goals",
				text: "In each project, I plunge with my head and help you achieve the maximum result!"
			}
		]
	},
	projects: {
		title: "Cases",
		subtitle: "From clicks to sales - real cases",
		description: "Targeted advertising is not luck, but a strategy.We analyze the cases where the right solutions led to high results.",
		cases: [
			{
				title: "Master of permanent makeup",
				image: "src/assets/images/case-1.jpg",
				href: "#case-1",
				content: <>
					<TextContent title="About the client:">
						<p>
							The master of permanent makeup, who wanted to launch an advertisement, but did not know where to start.She already had an Instagram account, but there was no clear promotion strategy.
						</p>
					</TextContent>
					<TextContent title="The process of work:">
						<p>
							We held two consultations at which:
						</p>
						<ul>
							<li>Determined positioning</li>
							<li>We conducted an audit Instagram: dismantled errors, determined the strengths and improved the profile</li>
							<li>Worked as a strategy for content and interaction with subscribers</li>
							<li>Determined the marketing strategy of launch</li>
							<li>Technical part - I explained how the advertisement works, helped create an advertising cabinet and prepare an account for launch and tuned the first advertising campaign together</li>
						</ul>
					</TextContent>
					<TextContent title="Result:">
						<p>
							The client received an understandable strategy for promotion and a clear understanding of Instagram development.He completely mastered the process of adjusting advertising and can now launch it on its own.The first advertising campaign was successful, brought the first applications and new records.
						</p>
					</TextContent>
				</>
			},
			{
				title: "Startup installation of stretch ceilings",
				image: "src/assets/images/case-2.jpg",
				href: "#case-2"
			},
			{
				title: "Startup for the development of sites and web applications",
				image: "src/assets/images/case-3.jpg",
				href: "#case-3"
			},
			{
				title: "Fisheries Import Company from Norway",
				image: "src/assets/images/case-4.jpg",
				href: "#case-4"
			}
		],
		buttonDescription: "Is there a project that needs effective advertising?Let's promote him together!",
		buttonText: "Let's discuss your project",
		buttonModalDescription: "Do you want advertising to work effectively?"
	},
	process: {
		title: 'Work process',
		subtitle: 'I set up advertising on a clear strategy',
		description: 'I launch advertising according to the proven process: I study the audience, select effective creatives, test, optimize and scalit successful ligaments.',
		steps: [
			{
				title: 'Briefing and discussion of the project',
				text: 'I spend a briefing with you to set tasks, determine the advertising budget, understand the features of your business and discuss the audience.'
			},
			{
				title: 'Analysis',
				text: 'I conduct an analysis of your landing pages, competitors, as well as your past advertising campaigns (if available).'
			},
			{
				title: 'Strategy',
				text: 'I am forming groups of the target audience and hypotheses for launching an advertising campaign, I distribute the budget.'
			},
			{
				title: 'Preparation for launch',
				text: 'I check and prepare an advertising room, as well as create creatives.'
			},
			{
				title: 'Launching advertising and monitoring',
				text: 'I launch an advertising campaign, analyze the results, conduct daily reporting and optimize the strategy to achieve your goals.'
			}
		],
		inputTitle: 'Need details?',
		placeholder: 'Ask me, I\'m always in touch!'
	},
	about: {
		title: 'About me',
		subtitle: <>Hello!<br />I am Vera<br />— Your Targetologist</>,
		description: 'My experience in various fields allows me not just to configure advertising, but to build it so that it works for you and your business.',
		alt: 'Hello! I am Vera - your targetologist',
		list: [
			{
				title: 'I understand complex tasks and bring projects to the result',
				text: 'Experience in the factory taught me endurance and a systematic approach, so I cope with projects of any complexity.',
			},
			{
				title: 'I know how to interact with customers and increase sales',
				text: 'A year in sales helped me understand what is important for customers.Therefore, it will be easy and comfortable for me to work with me, and I, in turn, can give recommendations on sales scripts that will strengthen your business.',
			},
			{
				title: 'I create a service that brings the result',
				text: 'Work in the casino taught me responsibility and customer orientation.Launching an advertisement with me, you are betting on stable growth and profit.',
			},
			{
				title: 'Expert approach to your advertising',
				text: 'Having passed the training “more than just a targetologist”, I combined my love of analytics and numbers with practical experience.Now I do not just set up advertising, but build a marketing strategy, starting with the analysis of landing pages and ending with an improvement in customer service.',
			}
		],
		buttonTitle: 'Do you want advertising to work effectively?',
		buttonDescription: 'Let\'s discuss your project!',
		buttonText: 'Discuss the project'
	},
	reviews: {
		title: 'Reviews',
		subtitle: 'Satisfied customers are the best success indicator',
		description: 'They have already received the result.Now you!',
		list: [
			{
				title: 'Very easy and pleasant to work',
				text: 'Verochka, thank you very much for your consultation, I chewed everything clearly, showed it, helped in the future, it’s very pleasant and easy to work with you, thanks 🙏❤',
				name: 'Elena',
				position: 'Master of permanent makeup',
				link: '#case-1',
			},
			{
				title: 'Thanks for the cool result!',
				text: 'Before working with Vera, our applications were expensive, and sales are unstable. After the launch of advertising, we reduced the value of the application by 40% and increased the conversion!Everything is clear, transparent and with understandable reports.Thanks for the cool result!',
				name: 'Dmitry',
				position: 'Owner of the online clothing store',
				link: '#case-2',
			}
		]
	},
	contacts: {
		title: 'Contacts',
		subtitle: 'Let\'s discuss your promotion strategy',
		description: 'Leave your contacts or write to me, and I will help you start advertising.',
		socialTitle: 'You can also contact me through social networks:',
		socialLinks: [
			{
				text: 'Instagram',
				href: '#'
			},
			{
				text: 'Telegram',
				href: '#'
			},
			{
				text: 'LinkedIn',
				href: '#'
			}
		],
		formName: 'Your name',
		formContacts: 'Contact details',
		select: [
			{
				text: 'phone',
				value: 'phone',
			},
			{
				text: 'instagram',
				value: 'instagram',
			},
			{
				text: 'telegram',
				value: 'telegram',
			},
			{
				text: 'whatsapp',
				value: 'whatsapp',
			},
			{
				text: 'viber',
				value: 'viber',
			},
			{
				text: 'email',
				value: 'email',
			}
		],
		formMessage: 'Your message',
		formDescription: <>*By sending an application, you agree <Button href="#policy" data-modal-btn="#policy" className="link-policy">with personal data processing policy</Button></>,
		buttonText: 'Send'
	},
	policy: {
		title: 'Personal data processing policy',
		content: <>
			<TextContent title="General provisions">
				<ol>
					<li>This Personal Data Processing Policy (hereinafter referred to as Policy) describes how the personal data of users are processed on the Veratarget website (hereinafter - the site).</li>
					<li>Site owner: Gurinovich Vera Nikolaevna.</li>
					<li>Using the site means the consent of the user with this policy.</li>
				</ol>
			</TextContent>
			<TextContent title="What data is collected and why">
				<ol>
					<li>
						<p>The following data can be processed on the site:</p>
						<ul>
							<li>Name (if the user indicates it in the form);</li>
							<li>E-mail;</li>
							<li>Phone number;</li>
							<li>Another information provided by the user.</li>
						</ul>
					</li>
					<li>
						<p>These data are used exclusively for:</p>
						<ul>
							<li>Feedback with the user;</li>
							<li>Reply to requests through the feedback form.</li>
						</ul>
					</li>
				</ol>
			</TextContent>
			<TextContent title="How the data is processed">
				<ol>
					<li>Personal data is transmitted by the user voluntarily through forms on the site.</li>
					<li>Data is not transmitted to third parties and are not used for advertising purposes.</li>
					<li>Data storage is carried out during the time necessary for fulfilling the goals for which they were transferred.</li>
				</ol>
			</TextContent>
			<TextContent title="User rights">
				<p>The user has the right:</p>
				<ul>
					<li>Request information about your personal data;</li>
					<li>Demand the deletion of your data by sending a request to the address <Button href="mailto:i.veratarget@gmail.com">i.veratarget@gmail.com</Button>.</li>
				</ul>
			</TextContent>
			<TextContent title="Data protection">
				<ol>
					<li>The site owner takes the necessary measures to protect personal data from unauthorized access.</li>
				</ol>
			</TextContent>
			<TextContent title="Contact information">
				<ol>
					<li>On issues of processing personal data, you can contact by email: <Button href="mailto:i.veratarget@gmail.com">i.veratarget@gmail.com</Button>.</li>
				</ol>
			</TextContent>
			<TextContent title="This policy comes into force from the moment of publication on the site.">
			</TextContent>
		</>
	},
	footer: {
		url: '/',
		buttonUp: 'To the top',
		copyrights: 'All rights belong to the copyright holder.',
		developer: 'Site development'
	},
	error: {
		title: 'Page is not found. Where will you go next?',
		links: [
			{
				text: 'Home',
				href: 'https://max-kot.github.io/veratarget/'
			},
			{
				text: 'Contact me',
				href: 'https://max-kot.github.io/veratarget/#contacts'
			},
			{
				text: 'View cases',
				href: 'https://max-kot.github.io/veratarget/#projects'
			}
		]
	},
	success: {
		title: 'Thanks for the application!',
		text: 'I will contact you in the near future!',
		image: 'images/kiss-kitty.gif',
		socialTitle: 'You can also contact me through social networks:',
		socialLinks: [
			{
				text: 'Instagram',
				href: '#'
			},
			{
				text: 'Telegram',
				href: '#'
			},
			{
				text: 'LinkedIn',
				href: '#'
			}
		],
	},
	errorForm: {
		title: 'Error when sending a form',
		text: 'Try again, or check the Internet connection',
	}
}