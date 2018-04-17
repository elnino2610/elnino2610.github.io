/*
** Service js
*/

if($('.service-wrapper').length ) {
	var bg_wrap = $('.service-wrapper').closest('.section-wrapper');

	if( bg_wrap.children('.service-bg').length === 0 ) {
		bg_wrap.prepend('<div class="service-bg"></div>');
	}

	var f_length =  $('.service-wrapper .service').length;
	var f_index = 0;

	var setautoimage = function() {
		f_index++ ;

		if( f_index > f_length ) {
			f_index = 0;
		}

		$('.service-wrapper .service').removeClass('active');
		$('.service-bg .service-bg__item').removeClass('active');

		$('.service-wrapper .service:eq('+f_index+')').addClass('active');
		$('.service-bg .service-bg__item:eq('+f_index+')').addClass('active');

	};

	var autonextimage = setInterval(setautoimage, 10000);

	$('.service-wrapper .service').each(function() {
		var el = $(this),
			link_image = el.data('img');

		$('.service-bg').append('<div class="service-bg__item" style="background-image: url('+link_image+')"></div>');
		$('.service-bg .service-bg__item:first-child').addClass('active');

		el.mouseover(function() {
			$('.service-wrapper .service').removeClass('active');
			el.addClass('active');

			var index = $('.service').index(this);
			$('.service-bg .service-bg__item').removeClass('active');
			$('.service-bg .service-bg__item:eq('+index+')').addClass('active');

			clearInterval(autonextimage);
		});

		el.mouseleave(function() {
			autonextimage = setInterval(setautoimage, 10000);
		});

	});
}

