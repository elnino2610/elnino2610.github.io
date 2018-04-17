
// Config
var appConfig = {
	folders: {
		path: '_content',
		content: 'template',
		// content: 'free',
		// content: 'broad',
		core: 'core',
		docs: 'docs'
	},

	progress: {
		all: '#41a5fa',
		inprogress: '#bc74ff',
		codereview: '#ff7474',
		designreview: '#F2D600',
		complete: '#61BD4F',
	},

	toggleHtmlElement: false,

	generateScopedName: 'custom',

	classModulePrefix: {
		general: '',
		// hien: 'listing'
	},

	// data comment & check
	data: 'data',

	createfileScss: false,

	createDevVersion: "free",
	// createDevVersion: false,

	entry: {
		path: 'app',
		filename: 'main.js',
		img: 'img',
		font: 'fonts',
		css: 'styles/app.js',
		js: 'js/app.js',
		scssImportInline: 'abstracts',
	},
	output: {
		path: 'build',
		css: 'assets/css/main.css',
		libsCss: 'assets/css/libs',
		js: 'assets/js/main.js',
		img: 'assets/img',
		font: 'assets/fonts'
	},
	use: {
		html: /\.(pug|html)$/,
		css: /\.(scss|sass|less|css)$/,
		js: /\.exec\.js$/
	}

}
module.exports = appConfig;
