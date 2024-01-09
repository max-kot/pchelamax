const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function sprite() {
	return app.gulp.src(path.svg.src)
		.pipe(app.plumber(
			app.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.imagemin(settings.imagemin))// (можно и этим).pipe(app.svgmin(settings.svgmin))
		.pipe(app.cheerio(settings.cheerio))
		.pipe(app.replace('&gt;', '>'))
		.pipe(app.svgSprite(settings.svgSprite))
		.pipe(app.gulp.dest(path.svg.dest))
		.pipe(app.browserSync.stream())
}

module.exports = sprite;