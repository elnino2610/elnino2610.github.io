$('.portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

$('.portfolio .popup-video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    preloader: false,
    closeOnContentClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});