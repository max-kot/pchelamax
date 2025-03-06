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
	}
}