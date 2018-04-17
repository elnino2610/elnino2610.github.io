/*
** Fix mobile page
*/

$(window).on('load resize', function() {
	var wh = $(window).height();

	$('.section').each(function() {
		var el = $(this);
		var getHeight = $('.section-wrapper', el).outerHeight();

		if(getHeight > wh) {

			el.removeClass('section-table');

		}else {
			el.addClass('section-table');
		}
	});
	
}).trigger('resize');