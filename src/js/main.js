import { Menu } from "./modules/Menu";
import { AutoCalc } from "./modules/AutoCalc.js";
import { AdaptiveMover } from "./modules/AdaptiveMover.js";
import { HideHeader } from "./modules/HideHeader.js";
import { RunningLine } from "./modules/RunningLine.js";
import { Tabs } from "./modules/Tabs.js";

new AutoCalc();

new Menu(".menu", {
	btnSelector: ".burger-btn",
	listSelector: ".menu",
});

new AdaptiveMover()
new HideHeader('.header', { showScrollEnd: false });
new RunningLine('[data-running-line]', {
	quantity: 15,
});

new Tabs();