//*
// Back to top
//*

$(window).scroll(function() {
	var wh = $(window).height(),
		scrollTop = $(window).scrollTop();


	if(scrollTop >= wh ){
		$('#back-to-top').addClass('is-visible')
	}else {
		$('#back-to-top').removeClass('is-visible')
	}
});

var headerHeight = $('header').outerHeight();

$('#back-to-down').on('click', function() {
	var offsets = $(this).closest('.hero').next().offset().top - headerHeight;

	$('html,body').animate({
        scrollTop: offsets
    }, 700);
})