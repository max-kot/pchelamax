const settings = {
	sass: {
		outputStyle: 'compressed',
	},

	webpack: {
		mode: 'production',
		output: {
			filename: 'main.min.js',
		},
		module: {
			rules: [{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: "defaults"
							}]
						]
					}
				}
			}]
		},
	},

	webpackBack: {
		mode: 'development',
		output: {
			filename: 'main.min.js',
		},
		module: {
			rules: [{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: "defaults"
							}]
						]
					}
				}
			}]
		},
		devtool: false
	},

	autoprefixer: {
		cascade: false,
		grid: true,
		overrideBrowserslist: ["last 10 versions"]
	},

	cleanCss: {
		level: 2,
	},

	avif: {
		quality: 50,
	},

	imagemin: {
		vebose: true,
	},

	svgmin: {
		js2svg: {
			pretty: true,
		}
	},

	cheerio: {
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
		},
		parserOptions: {
			xmlMode: true
		},
	},

	svgSprite: {
		mode: {
			stack: {
				sprite: "../sprite.svg"
			}
		},
	},

	fonter: {
		formats: ['ttf', 'woff', 'eot', 'svg']
	},

	htmlmin: {
		collapseWhitespace: true,
	},

}

module.exports = settings;