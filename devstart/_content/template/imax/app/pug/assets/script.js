$('.core-code-html').each(function(index) {
	var self = $(this),
		code = $('.line-numbers', self),
		EndCoreCodeHtml = self.next('.EndCoreCodeHtml');
		codeWrap = $('.core-pre-wrapper', self),
		toggleBtn = $('[data-toggle-html-button]', self),
		closeBtn = $('[data-close-html-button]', self),
		toggleContent = $('[data-toggle-html]', self);
	toggleContent.attr('data-toggle-number', index);
	toggleBtn.attr('data-toggle-number-button', index);
	
	self.appendTo(self.prev());
	$('.EndCoreCodeHtml').remove();
	
	toggleContent.appendTo($('body'));
	
	var codeWrapHtml = codeWrap.html();
	codeWrapHtml = '<!--checkload' + codeWrapHtml + 'endcheckload-->';
	codeWrapHtml = codeWrapHtml.replace(/(<div class="core-code-html)(.*?)(<\/div>)/g, '');
	codeWrapHtml = codeWrapHtml.replace(/(<\/code><\/pre>)(.*?)(<span class="EndCoreCodeHtml">EndCoreCodeHtml<\/span>)/g, '');
	codeWrapHtml = codeWrapHtml.replace(/<code class="language-markup">/g, '<code class="language-markup"><xmp>').replace(/<\/code>/g, '</xmp></code>');
	codeWrapHtml = codeWrapHtml.replace(/\s"/g, '"');
	codeWrapHtml = codeWrapHtml.replace(/<!--checkload|endcheckload-->/g, '');

	// For html pretty true
	// codeWrapHtml = codeWrapHtml.replace(/<div class="core-code-html">.*(\n.*){3}/g, '');
	// codeWrapHtml = codeWrapHtml.replace(/<\/code><\/pre>(\n.*){3}<span class="EndCoreCodeHtml">EndCoreCodeHtml<\/span>/g, '');
	// codeWrapHtml = codeWrapHtml.replace(/<code class="language-jade">/g, '<code class="language-jade"><xmp>').replace(/<\/code>/g, '</xmp></code>');
	// codeWrapHtml = codeWrapHtml.replace(/<div class="core-code-html.*(\n.*){2}/g, '');
	// codeWrapHtml = codeWrapHtml.replace(/<!--checkload|endcheckload-->/g, '');

	codeWrap.html('');


	toggleBtn.on('click', function() {
		var _toggleContent = $('[data-toggle-html="' + $(this).attr('data-toggle-html-button') + '"][data-toggle-number="' + $(this).attr('data-toggle-number-button') + '"]');
		var pretty = style_html(codeWrapHtml, {
			'indent_inner_html': false,
			'indent_size': 4,
			'indent_char': ' ',
			'wrap_line_length': 78,
			'brace_style': 'expand',
			'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
			'preserve_newlines': true,
			'max_preserve_newlines': 0,
			'indent_handlebars': true
		});
		// fix tag a
		pretty = pretty.replace(/"\n.*href/g, '" href');
		_toggleContent.find('.core-pre-wrapper').html(pretty);
		$('[data-toggle-html]').removeClass('html-active');
		_toggleContent.addClass('html-active');
		$('[data-toggle-html-button]').removeClass('active');
		$(this).addClass('active');
		$('body').addClass('show-html-active');
		$(document).find('.core-element-border').removeClass('core-element-border');
		$(this).parent().parent().addClass('core-element-border');
		Prism.highlightElement(_toggleContent.find('code')[0]);
		document.getSelection().removeAllRanges();
	});
	closeBtn.on('click', function() {
		$('[data-toggle-html]').removeClass('html-active');
		$('[data-toggle-html-button]').removeClass('active');
		$('body').removeClass('show-html-active');
		$(document).find('.core-element-border').removeClass('core-element-border');
		document.getSelection().removeAllRanges();
		setTimeout(function() {
			$('.core-pre-wrapper').html('');
		}, 400);
	});
	toggleBtn.closest('a').on('click', function(e) {
		e.preventDefault();
	});
	
	toggleBtn.parent().siblings().find('[data-toggle-html-button]').each(function() {
		if (toggleBtn.offset().left == $(this).offset().left) {
			$(this).css({
				'right': '40px'
			})
		}
	});
});

$(document).keyup(function(e) {
	if (e.keyCode === 27 || e.keyCode === 192) {
		e.preventDefault();
		$('.html-active [data-close-html-button]').trigger('click');
	}
});
