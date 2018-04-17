/**
 * ProgressBar
 */
var progress = $('.progress');

progress.each(function() {

    var _self = $(this);
    var progressNumber = _self.find('.progress__number');
    progressNumber.text('0%');

    _self.waypoint(function(direction) {
        var progressBar = _self.find('.progress__bar'),
            delay = progressBar.data("delay"),
            durations = progressBar.data("duration"),
            timing = progressBar.data("timing"),
            getPercent = (progressBar.data('progress-percent'));

            console.log(durations);

        progressBar.css({
            'width': getPercent + '%',
            'transition': 'all '+durations+'ms '+ timing,
            'transition-delay': delay+'ms'
        });

        setTimeout(function(){
            progressNumber.prop('Counter',0).animate({
                Counter: getPercent
            }, {
                duration: durations,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now)+'%');
                }
            });
        }, delay);

        this.destroy();
    },{
        offset: function() {
          return Waypoint.viewportHeight() - _self.outerHeight() - 150;
        }
    })
});