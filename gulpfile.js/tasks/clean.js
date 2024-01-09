const app = require('../config/app.js');
const path = require('../config/path.js');
const settings = require('../config/settings.js');

function clean() {
	return app.del(path.dest)
}

module.exports = clean;