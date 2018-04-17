/**
 *  Slide Custom
 */
if( $('.slide-item').length ) {
	var $sync1 = $(".slide-image__front .swiper-container"),
		$sync2 = $(".slide-image__black .swiper-container");

	var galleryTop = new Swiper($sync1, {
        spaceBetween: 10,
    });
    var galleryThumbs = new Swiper($sync2, {
		spaceBetween: 10,
		centeredSlides: true,
		slidesPerView: 'auto',
		touchRatio: 0.2,
		slideToClickedSlide: true,
	});

    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
}
