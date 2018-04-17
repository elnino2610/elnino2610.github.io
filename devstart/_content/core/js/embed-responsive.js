var selectors = [
	'iframe[src*="player.vimeo.com"]',
	'iframe[src*="youtube.com"]',
	'iframe[src*="youtube-nocookie.com"]',
	'iframe[src*="kickstarter.com"][src*="video.html"]',
	'object',
	'embed'
];
var $allVideos = $('body').find(selectors.join(','));
$allVideos.each(function() {
	var vid = $(this),
		vidWidth = vid.outerWidth(),
		vidHeight = vid.outerHeight(),
		ratio = (vidHeight / vidWidth) * 100;
	$allVideos
		.addClass('embed-responsive-item');
	if (ratio == 75) {
		$allVideos
			.wrap('<div class="embed-responsive embed-responsive-4by3"></div>');
	} else {
		$allVideos
			.wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	}
});
