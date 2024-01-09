const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function fonts() {
	return app.gulp.src(path.fonts.src)
		.pipe(app.plumber(
			app.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.newer(path.fonts.src))
		.pipe(app.fonter(settings.fonter))
		.pipe(app.gulp.dest(path.fonts.dest))
		.pipe(app.ttf2woff2())
		.pipe(app.gulp.dest(path.fonts.dest))
		.pipe(app.browserSync.stream())
}

module.exports = fonts;