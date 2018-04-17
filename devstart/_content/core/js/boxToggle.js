
$('.md-box-toggle').each(function() {
    var el = $(this),
        elId = el.attr('id');
    $('[href="#' + elId + '"]').on('click', function(e) {
        e.preventDefault();
        el.toggleClass('active');
        $(this).toggleClass('active');
        if (el.hasClass('body-overflow-hidden')) {
            $('html, body').toggleClass('overflow-hidden');
        }
    });
    $('html, .md-box-toggle__close').on('click', function() {
        el.removeClass('active');
        $('[href="#' + elId + '"]').removeClass('active');
        $('html, body').removeClass('overflow-hidden');
    });
    $('.md-box-toggle__close').on('click', function(e) {
        e.preventDefault();
    });
    $('.md-box-toggle, [href="#' + elId + '"]').on('click', function(e) {
        e.stopPropagation();
    });
});
