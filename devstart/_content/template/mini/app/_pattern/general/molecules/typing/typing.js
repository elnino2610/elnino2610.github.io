/**
 * Typing effect
 */
$('.typing__module').each(function(index) {
	var self = $(this),
		_wrapper = $('.typed', self)[0],
		optData = eval('(' + self.attr('data-options') + ')'),
		optDefault = {
			stringsElement: self.find('.typed-strings')[0],
			typeSpeed: 80,
			loop: true
		},
		options = $.extend(optDefault, optData);
	var typed = new Typed(_wrapper, options);
});
