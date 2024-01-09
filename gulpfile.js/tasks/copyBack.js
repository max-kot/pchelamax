const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function copyBack() {
	return app.gulp.src([
		`${path.src}/**/*.*`,
		`!${path.src}/html/**/*.html`,
		`!${path.src}/scss/**/*.{scss,css,sass}`,
		`!${path.src}/images/src/**/*.*`,
		`!${path.src}/fonts/src/**/*.*`,
	])
		.pipe(app.gulp.dest(path.dest))
}

module.exports = copyBack;