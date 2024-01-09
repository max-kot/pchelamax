const src = './app';
const dest = './dist';

const path = {
	src: src,
	dest: dest,

	html: {
		src: src + '/html/**/*.html',
		watch: src + '/html/**/*.html',
		dest: src,
	},

	styles: {
		src: src + '/scss/**/*.{sass,scss}',
		watch: src + '/scss/**/*.{sass,scss}',
		dest: src + '/css',
	},

	scripts: {
		src: [
			src + '/js/**/*.js',
			`!${src}/js/main.min.js`
		],
		watch: [
			src + '/js/**/*.js',
			`!${src}/js/main.min.js`
		],
		dest: src + '/js',
	},

	images: {
		src: src + '/images/src/**/*.{png,jpg,jpeg,gif,ico,svg}',
		watch: src + '/images/src/**/*.{png,jpg,jpeg,gif,ico,svg}',
		dest: src + '/images',
	},

	svg: {
		src: [
			src + '/images/src/**/*.svg',
			`!${src}/images/src/**/sprite.svg`,
		],
		watch:[
			src + '/images/src/**/*.svg',
			`!${src}/images/**/sprite.svg`,
		],
		dest: src + '/images',
	},

	fonts: {
		src: src + '/fonts/src/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		watch: src + '/fonts/src/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		dest: src + '/fonts',
	},

}

module.exports = path;