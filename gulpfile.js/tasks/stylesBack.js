const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function stylesBack() {
	return app.gulp.src(path.styles.src)
		.pipe(app.plumber(
			app.notify.onError({
			  title: "SCSS",
			  message: "Error: <%= error.message %>"
			})
		 ))
		.pipe(app.sass())
		.pipe(app.autoprefixer(settings.autoprefixer))
		.pipe(app.gulp.dest(path.styles.dest))
		.pipe(app.browserSync.stream())
}

module.exports = stylesBack;