const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function html() {
	return app.gulp.src(path.html.src)
		.pipe(app.plumber(
			app.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.fileInclude())
		.pipe(app.gulp.dest(path.html.dest))
		.pipe(app.browserSync.stream())
}

module.exports = html;