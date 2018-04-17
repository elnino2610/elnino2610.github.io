$('[data-gradient-bg]').each(function(index, el) {
	var _self = $(this),
		_img = '',
		_opacity = _self.data('gradient-opacity') ? _self.data('gradient-opacity'):'1,1',
		_direction = _self.data('gradient-direction') ? _self.data('gradient-direction'):'diagonal',
		_gradient = _self.data('gradient-bg').replace(/'/g, '"');
		_gradient = JSON.parse("[" + _gradient + "]");
		_opacity = _opacity.split(',');
	if (_self.data('gradient-img')) {
		_img = ' class="md-bg-cover" style="background-image: url(\'' + _self.data('gradient-img') + '\')"';
	}

	_self.prepend('<canvas id="gradient-' + index + '"' + _img + '></canvas>');
	var granimInstance = new Granim({
		element: '#gradient-' + index,
		direction: _direction,
		opacity: _opacity,
		isPausedWhenNotInView: true,
		states : {
			"default-state": {
				gradients: _gradient
			}
		}
	});
})