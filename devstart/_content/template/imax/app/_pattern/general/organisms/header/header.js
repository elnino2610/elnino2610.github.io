//*
// Header
//*


var wh = $(window).height(),
    half = wh / 2,
    headerHeight = $('header').outerHeight();
    
$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();

	if(scrollTop >=  half) {
		$('header').addClass('is-scroll');
	}else {
		$('header').removeClass('is-scroll');
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

