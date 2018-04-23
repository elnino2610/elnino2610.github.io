var today = new Date(),
	monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	monthIndex = today.getMonth();
module.exports = {
	info: [
		'# HTML Template 1.0 - ' + monthNames[monthIndex] + ' ' + today.getDate() + ', '+ today.getFullYear(),
		'# ------------------------------------------------------------------------',
		'# Designed & coded by Awe7',
		'# Websites:  http://www.awe7.com -  Email: info@awe7.com'
	],

	fonts: [
		'fontawesome',
		'pe-icon',
		// 'elegant-font',
		// 'linea'
	],

	googleFont: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700',

	bootstrapVersion: 3,

	vendors: [
		'bootstrap/grid.css',
		// 'bootstrap4/bootstrap-grid.min.css',
		'_jquery/jquery.min.js',
		'imagesloaded/imagesloaded.pkgd.js',
		'isotope-layout/isotope.pkgd.js',
		'jquery-one-page/jquery.nav.min.js',
		'jquery.easing/jquery.easing.min.js',
		'jquery.matchHeight/jquery.matchHeight.min.js',
		'magnific-popup/jquery.magnific-popup.min.js',
		'magnific-popup/magnific-popup.min.css',
		'masonry-layout/masonry.pkgd.js',
		'swiper/swiper.jquery.js',
		'menu/menu.js',
		'swiper/swiper.css',
		'typed/typed.min.js',
		'jquery.waypoints/jquery.waypoints.js',
		// 'wow/wow.js',
		// 'wow/animate.css',
		'iconfont/icofont.css'
	],

	appJs: [
		'isMobile.js',
		'fixheight.js',
		// 'carousel.js',
		// 'embed-responsive.js',
		// 'wow.js',
		// 'overflowText.js',
		// 'imageCover.js',
		// 'boxToggle.js',
		// 'gradient-bg.js',
		'debounce.js',
		// 'formItemPlaceholder.js',
	]

}
