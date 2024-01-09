const app = require('./config/app.js');
const path = require('./config/path.js');

// Tasks
const html = require('./tasks/html.js');
const styles = require('./tasks/styles.js');
const scripts = require('./tasks/scripts.js');
const images = require('./tasks/images.js');
const sprite = require('./tasks/sprite.js');
const fonts = require('./tasks/fonts.js');
const clean = require('./tasks/clean.js');
const copyFront = require('./tasks/copyFront.js');
const copyBack = require('./tasks/copyBack.js');
const htmlMin = require('./tasks/htmlMin.js');
const stylesBack = require('./tasks/stylesBack.js');
const scriptsBack = require('./tasks/scriptsBack.js');

// Watcher
function watcher() {
	app.gulp.watch(path.html.watch, html);
	app.gulp.watch(path.styles.watch, styles);
	app.gulp.watch(path.scripts.watch, scripts);
	app.gulp.watch(path.images.watch, images);
	app.gulp.watch(path.svg.watch, sprite);
	//app.gulp.watch(path.fonts.watch, fonts);
}

// Server
function server() {
	app.browserSync.init({
		server: {
			baseDir: path.src,
		}
	})
}

// Launch tasks
exports.watcher = watcher;
exports.server = server;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.clean = clean;
exports.copyFront = copyFront;
exports.copyBack = copyBack;
exports.htmlMin = htmlMin;
exports.stylesBack = stylesBack;
exports.scriptsBack = scriptsBack;

// Launch mode
const dev = app.gulp.series(
	html,
	styles,
	scripts,
	images,
	sprite,
	//fonts,
	app.gulp.parallel(
		watcher,
		server,
	)
)

const build = app.gulp.series(
	clean,
	html,
	styles,
	scripts,
	images,
	sprite,
	fonts,
	copyFront,
	htmlMin,
);

const back = app.gulp.series(
	clean,
	html,
	styles, // stylesBack
	scripts, // scriptsBack
	images,
	sprite,
	fonts,
	copyBack,
);


exports.dev = dev;
exports.build = build;
exports.back = back;

// Launch default
exports.default = dev;