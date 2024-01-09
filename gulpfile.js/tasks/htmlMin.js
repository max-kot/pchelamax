const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function htmlMin() {
	return app.gulp.src(`${path.dest}/**/*.html`)
	.pipe(app.htmlmin(settings.htmlmin))
	.pipe(app.gulp.dest(path.dest))
}

module.exports = htmlMin;