const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function images() {
	return app.gulp.src([
		path.images.src,
		`!${path.src}/images/**/*.{webp,svg,ico}`
	])
		.pipe(app.plumber(
			app.notify.onError({
				title: "AVIF",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.newer(path.images.src))
		.pipe(app.avif(settings.avif))

		.pipe(app.gulp.src(path.images.src))
		.pipe(app.plumber(
			app.notify.onError({
				title: "WEBP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.newer(path.images.src))
		.pipe(app.webp())

		.pipe(app.gulp.src(path.images.src))
		.pipe(app.plumber(
			app.notify.onError({
				title: "IMAGEMIN",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.newer(path.images.src))
		.pipe(app.imagemin(settings.imagemin))

		.pipe(app.gulp.dest(path.images.dest))
		.pipe(app.browserSync.stream())
}

module.exports = images;