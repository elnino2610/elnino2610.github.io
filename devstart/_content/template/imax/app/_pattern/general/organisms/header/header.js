//*
// Header
//*


var wh = $(window).height(),
    half = wh / 2,
    headerHeight = $('header').outerHeight();
    
$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();

	if(scrollTop >=  100) {
		$('header').addClass('is-scroll');
        $('.header__logo').find('img').attr("src","img/logo.png");
	}else {
		$('header').removeClass('is-scroll');
        $('.header__logo').find('img').attr("src","img/logo-light.png");

	}

});




$('.onepage-nav').dropdownMenu({
    menuClass: 'onepage-menu',
    breakpoint: 1200,
    toggleClass: 'active',
    classButtonToggle: 'navbar-toggle',
    subMenu: {
        class: 'sub-menu',
        parentClass: 'menu-item-has-children',
        toggleClass: 'active'
    }
});

$('.onepage-nav').onePageNav({
    currentClass: 'current-menu-item',
    scrollOffset: headerHeight,
});

