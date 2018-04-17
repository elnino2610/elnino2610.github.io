$('.page-nav').dropdownMenu({
    menuClass: 'page-menu',
    breakpoint: 1200,
    toggleClass: 'active',
    classButtonToggle: 'navbar-toggle',
    subMenu: {
        class: 'sub-menu',
        parentClass: 'menu-item-has-children',
        toggleClass: 'active'
    }
});

$('.header__iconsearch').on('click', function() {
	$('.header__search').addClass('active');
});

$('.header__search_close').on('click', function() {
	$('.header__search').removeClass('active');
});

$(window).on('scroll', function() {
	var scrollTop = $(window).scrollTop();


	if(scrollTop > 50) {
		$('.header').addClass('header--bg');
	}else {
		$('.header').removeClass('header--bg');
	}
})