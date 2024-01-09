const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function scripts() {
	return app.gulp.src(path.scripts.src)
		.pipe(app.plumber(
			app.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.webpackStream(settings.webpack))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(app.gulp.dest(path.scripts.dest))
		.pipe(app.browserSync.stream())
}

module.exports = scripts;