// Wow js
var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 100,
		mobile: false,
		live: false
	})
$(window).on('load', function() {
	wow.init();
});