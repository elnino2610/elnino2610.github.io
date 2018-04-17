(function($) {
	"use strict";
	window.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
	if (isMobile.any()) {
		$('html').addClass('mobiletest-html');
	}
	function remove_duplicates(arr) {
		var obj = {};
		var ret_arr = [];
		for (var i = 0; i < arr.length; i++) {
			obj[arr[i]] = true;
		}
		for (var key in obj) {
			ret_arr.push(key);
		}
		return ret_arr;
	}
	function encode(str) {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
		}));
	}

	$.fn.wilMenuCore = function(opt) {
		return $(this).each(function() {
			var el = $(this),
				optsDefault = {
					menuClass: 'wil-menu-core',
					breakpoint: 1000,
					toggleClass: 'active',
					classButtonToggle: 'toggle-menu',
					subMenu: {
						class: 'sub-menu',
						parentClass: 'has-children',
						toggleClass: 'active'
					}
				},
				options = $.extend({}, optsDefault, opt);
			el.find('.' + options.subMenu.class).hide();

			
			$('.' + options.subMenu.parentClass, el).on('click', '> a', function(e) {
				e.preventDefault();
				var self = $(this);
				// self.next('.' + options.subMenu.class).stop().slideToggle(100);
				self.next('.' + options.subMenu.class).stop().toggle();

				if (self.parent().hasClass('has-content-core')) {
					$('.has-content-core').removeClass('active');
					$('.has-content-core > .wil-text-content-core').scrollTop(0);
					self.parent().addClass(options.subMenu.toggleClass);
				} else {
					self.parent().toggleClass(options.subMenu.toggleClass);
				}

				var textcontentcore = self.siblings('.wil-text-content-core');
				if (typeof textcontentcore.html() != 'undefined') {
					if (self.siblings('.wil-text-content-core').html().indexOf('!--checkload') !== -1) {
						textcontentcore.html(
							textcontentcore.html()
								.replace(/<!--checkload|endcheckload-->/g, '')
						);
						// Hmr js
						$('.wil-text-content-core--demo').attr('data-html', '');
						textcontentcore.find('.wil-text-content-core--demo').attr('data-html', encode(textcontentcore.find('.wil-text-content-core--demo').html()));

						setTimeout(function() {
							Prism.highlightElement(self.siblings('.wil-text-content-core').find('code')[0]);
						}, 100);
					}
				}

				
				

				$('.wil-core-range').each(function(index) {
					var self = $(this);
					if ($.cookie('val-range-' + index)) {
						self.val($.cookie('val-range-' + index));
						self.next('.wil-text-content-core--demo').css('background-color', 'rgba(0,0,0,' + $.cookie('val-range-' + index)/20 + ')');
					}
					self.on('change', function() {
						var val = self.val();
						$.cookie('val-range-' + index, val, { expires: 365 });
						self.next('.wil-text-content-core--demo').css('background-color', 'rgba(0,0,0,' + self.val()/20 + ')');
					});
				});


				$('.EndCoreCodeHtml').remove();
				$('.core-code-html').remove();
				
				
				if (self.attr('href').indexOf('demo.pug') !== -1) {
					appCheckForCore();
					appCheckProgress();
				}


				$.cookie('open_items', 'the_value', { expires: 365 });
				let openItems = new Array();
				$('.' + options.subMenu.parentClass, el).each(function(index, item) {
					if ($(item).hasClass(options.subMenu.toggleClass)) {
						openItems.push(index);
					}
				});
				$.cookie('open_items', openItems.join(','), { expires: 365 });

			});
			
			if( $.cookie('open_items') && $.cookie('open_items').length > 0 ) {
				let previouslyOpenItems = $.cookie('open_items');
				let openItemIndexes = previouslyOpenItems.split(',');
				$(openItemIndexes).each(function(index, item) {
					$('.' + options.subMenu.parentClass, el).eq(item).addClass(options.subMenu.toggleClass).children('ul').toggle();
				});
			}

		});
	}


	function elementNewVisited() {
		$('.wil-menu-core .has-children').each(function(index) {
			$(this).attr('data-id', index);
		});

		$('.has-children.el-new').on('click', '> a', function() {
			var self = $(this),
				parent = self.parent(),
				id = parent.data('id');

			parent.addClass('el-visited');
			var value = $.cookie('visited') == null ? [] : $.cookie('visited');
			if(value.length) {
				value = value.split(',');
			}
			value.push(id);
		
			$.cookie('visited', remove_duplicates(value), { expires: 365 });
		});

		function loadCookie() {
			var value = $.cookie('visited') == null ? [] : $.cookie('visited');
			if(value.length) {
				value = value.split(',');
			}
			value.forEach(function(val) {
				var self = $('[data-id="'+ val +'"]');
				self.addClass('el-visited');
			});
		}
		loadCookie();
	}
	



	$(window).on('load', function() {

		window.appCheckProgress = function() {
			var progress = $('.wil-header-core').data('progress');
			var progressLabel = '{' + JSON.stringify(progress).match(/,.*/g).join('').match(/".*/g).join('');
			var classLabel = '';
			for (var item in JSON.parse(progressLabel)) {
				classLabel += item + ' ';
			}
			$('.has-content-core').parent().siblings('.wil-menu-link-core').addClass(Object.keys(JSON.parse(progressLabel))[0]);
			$('.wil-core-checkList .status')
				.attr('data-status', Object.keys(JSON.parse(progressLabel))[0])
				.html('<span></span>' + Object.keys(JSON.parse(progressLabel))[0]);
			
			setTimeout(function() {

				$('[data-checkwork]:first-child').each(function() {
					var self = $(this),
						datacheck = self.attr('data-checkwork');
					self.closest('form').find('input').removeAttr('checked');
					self.closest('form').find('input[value*="' + datacheck + '"]').attr('checked', 'checked');
					self.closest('.sub-menu').prev('.wil-menu-link-core').removeClass(classLabel);
					self.closest('.sub-menu').prev('.wil-menu-link-core').addClass(datacheck);
					$('td[data-dir="' + self.closest('.sub-menu').prev('.wil-menu-link-core').data('dir').replace(/\\/g, '/') + '/"]')
						.attr('data-status', '')
						.html('<span></span>');
					$('td[data-dir="' + self.closest('.sub-menu').prev('.wil-menu-link-core').data('dir').replace(/\\/g, '/') + '/"]')
						.attr('data-status', datacheck)
						.html('<span></span>' + datacheck);
				});

				$('.wil-core-check-list input').on('click', function() {
					var self = $(this);
					self.closest('.wil-core-check-list').siblings('button[type="submit"]').trigger('click');
					self.closest('.sub-menu').prev('.wil-menu-link-core').removeClass(classLabel);
					self.closest('.sub-menu').prev('.wil-menu-link-core').addClass(JSON.parse(self.val())[0]);
					$('td[data-dir="' + self.closest('.sub-menu').prev('.wil-menu-link-core').data('dir').replace(/\\/g, '/') + '/"]')
						.attr('data-status', '')
						.html('<span></span>');
					$('td[data-dir="' + self.closest('.sub-menu').prev('.wil-menu-link-core').data('dir').replace(/\\/g, '/') + '/"]')
						.attr('data-status', JSON.parse(self.val())[0])
						.html('<span></span>' + JSON.parse(self.val())[0]);
					for ( var item in JSON.parse(progressLabel) ) {
						$('.wil-menu-link-core.' + item + ', .wil-core-checkList td.status[data-status="' + item + '"]').css('color', JSON.parse(progressLabel)[item]);
						$('.wil-core-checkList td.status[data-status="' + item + '"] span').css('background-color', JSON.parse(progressLabel)[item]);
					}
				});
				for ( var item in JSON.parse(progressLabel) ) {
					$('.wil-menu-link-core.' + item + ', .wil-core-checkList td.status[data-status="' + item + '"]').css('color', JSON.parse(progressLabel)[item]);
					$('.wil-core-checkList td.status[data-status="' + item + '"] span').css('background-color', JSON.parse(progressLabel)[item]);
				}
			}, 200);
		}

		var promise = new Promise(function(resolve, reject) {
			$('.wil-menu-link-core[href*="cssmodule.pug"]').parent('li').remove();

			$('.wil-text-content-core').parent('li').addClass('has-content-core has-children');

			$('.wil-desc-core').closest('.sub-menu').prepend(function() {
				return $(this).children().children('.wil-desc-core').clone();
			});
			$('.wil-desc-core').next('.wil-desc-core').remove();


			$('.wil-menu-link-core.new').parent().parent().parent('.has-children').addClass('el-new');
			$('.wil-menu-link-core[href*=".txt"]').parent('li').remove();


			$('.wil-desc-core').each(function() {
				$(this).css('padding-left', (parseInt($(this).parent().prev('a').css('padding-left')) + 24) + 'px');
			});

			setTimeout(function() {
				$('.navigation-core').wilMenuCore();
				$('.wil-header-core').addClass('loaded');
				elementNewVisited();
				if ($('.has-content-core.active > .wil-menu-link-core').attr('href') != 'demo.pug') {
					$('.has-content-core.active > .wil-menu-link-core').trigger('click');
				}

				$('.active').children('[href="demo.pug"]').trigger('click');
			}, 200);
			resolve('done');
		});

		promise.then(function(mes) {
			appCheckProgress();
		});


		
		$('.wil-core-table .table-toggle').each(function(index) {
			var self = $(this);
			self.on('click', function() {
				$(this).closest('.wil-core-table').toggleClass('children-none');
				$.cookie('children-index' + index, index, { expires: 365 });
				$(this).toggleClass('flag');
				if ($(this).hasClass('flag')) {
					$.cookie('children-class' + index, 'children-none', { expires: 365 });
				} else {
					$.cookie('children-class' + index, '', { expires: 365 });
				}
			});
			$('.wil-core-table .table-toggle').removeClass('children-none');
			$('.wil-core-table .table-toggle').eq($.cookie('children-index' + index)).closest('.wil-core-table').addClass($.cookie('children-class' + index));
			self.closest('.children-none').find('.table-toggle').addClass('flag');
		});


		$('.wil-core-label [data-filter="all"]').addClass('active');
		$('.wil-core-label').on('click', 'a', function(e) {
			e.preventDefault();
			var self = $(this),
				filter = self.data('filter');
			$('.wil-core-label a').removeClass('active');
			self.addClass('active');
			$('.has-content-core').parent().siblings('.wil-menu-link-core').parent().css({
				'opacity': 0,
				'height': 0,
				'overflow': 'hidden'
			});
			$('.wil-menu-link-core.' + filter).parent().css({
				'opacity': 1,
				'height': 'auto',
				'overflow': 'visible'
			});
		});

		setTimeout(function() {
			$('.wil-core-checkList').on('click', 'a', function(e) {
				e.preventDefault();
				var self = $(this),
					datafolder = self.data('folder');
				$('.navigation-core .has-children.active').children('.wil-menu-link-core').trigger('click');
				datafolder.forEach(function(folder) {
					$('.navigation-core .wil-menu-link-core[href="' + folder + '"]').trigger('click');
				});
			});
		}, 400);

	});

	// wil-text-content-core scroll
	if (localStorage.getItem('scroll') != null) {
		$('.wil-text-content-core').scrollTop(localStorage.getItem('scroll'));
	}
	$('.wil-text-content-core').on('scroll', function() {
		localStorage.setItem('scroll', $(this).scrollTop());
	});



	$('.initComment').each(function() {
		willCoreInitComment(this);
	});

	function realtimefaker() {
		$('.has-children.active > ul > .has-content-core.active').find('.initComment').each(function() {
			willCoreInitComment(this);
		});
	}
	
	var myRealTime = setInterval(function() {
		realtimefaker();
	}, 2000);

	
	// check responsive
	function loading(selector) {
		var responsivePromise = new Promise(function(resolve, reject) {
			$(selector).append('<div class="wil-core-loader"></div>');
			resolve('Ok');
		});
		responsivePromise.then(function() {
			$(selector).find('.wil-core-loader').remove();
		});
	}
	$('.link-check-responsive').on('click', function(event) {
		event.preventDefault();
		$('body').toggleClass('body-app-responsive');
		if ($('.body-app-responsive').length) {
			var optsC = { expires: 365 };
			$.cookie('bodyAppResponsive', 'body-app-responsive', optsC);
			$.cookie('iframeResponsiveContent', '<div id="iframe-check-responsive"><div class="wil-core-loader"></div><iframe src="' + window.location.href + '" frameborder="0"></iframe></div>', optsC);
			$.cookie('link-check-responsive-active', 'active', optsC);
			$.cookie('body-in-iframe', 'body-in-iframe', optsC);
		} else {
			$.cookie('bodyAppResponsive', '', optsC);
			$.cookie('iframeResponsiveContent', '', optsC);
			$.cookie('link-check-responsive-active', '', optsC);
			$.cookie('body-in-iframe', '', optsC);
		}

		$(this).toggleClass('active');
		
		if ($(document).find('#iframe-check-responsive').length) {
			$('#iframe-check-responsive').remove();
		} else {
			$('body').prepend($.cookie('iframeResponsiveContent'));
		}
		$(document).find('#iframe-check-responsive iframe').on('load', function() {
			$(document).find('#iframe-check-responsive .wil-core-loader').remove();
			$(document).find('#iframe-check-responsive iframe').contents().find('body').addClass('body-in-iframe');
			$(document).find('#iframe-check-responsive iframe').contents().find('#iframe-check-responsive').remove();
			$(document).find('#iframe-check-responsive iframe').width($.cookie('data-device'));
		});
	});

	$('.app-check-responsive [data-device]').on('click', function() {
		$('.app-check-responsive [data-device]').removeClass('active');
		$(this).addClass('active');
		var device = $(this).attr('data-device');
		$.cookie('data-device', device, { expires: 365 });
		$.cookie('data-device-active', 'active', { expires: 365 });
		$(document).find('#iframe-check-responsive iframe').width(device);
	});


	$(window).on('load', function() {
		$('.link-check-responsive').addClass($.cookie('link-check-responsive-active'));
		$('.link-check-responsive').addClass($.cookie('link-check-responsive-active'));
		$('body').addClass($.cookie('bodyAppResponsive'));
		$('body').prepend($.cookie('iframeResponsiveContent'));

		$(document).find('#iframe-check-responsive iframe').on('load', function() {
			$(document).find('#iframe-check-responsive .wil-core-loader').remove();
			$(document).find('#iframe-check-responsive iframe').contents().find('body').addClass($.cookie('body-in-iframe'));
			$(document).find('#iframe-check-responsive iframe').contents().find('#iframe-check-responsive').remove();
			$(document).find('#iframe-check-responsive iframe').width($.cookie('data-device'));
			var iframeWidth = $(document).find('#iframe-check-responsive iframe').attr('style').replace(/width:\s|;/g, '');
			$('[data-device="' + iframeWidth + '"]').addClass('active');
		});
	});
	
	
})(jQuery);

function changeScreenSize() {        
	window.resizeTo(screen.width-300,screen.height-500)   
}

function wilCoreComment(event) {
	event.preventDefault();
	var url = $(event.target).attr('action');
	var dataForm = $(event.target).serialize();
	
	$.get(url + '?' + dataForm, function(res){
		if (res.status == 200) {
			_html = buildTemplateComment(res.result);
			$(event.target).find('.wil-core-commentlist').append(_html);
			$(event.target).find('textarea').val('');
			
			$(event.target).find('.wil-core-commentlist').find('li').last().find('.wil-core-body').addClass('wil-core-commentlist-anim');
						
			// setTimeout(function(event){
			// 	$(event.target).find('.wil-core-commentlist').find('li').last().removeClass('wil-core-commentlist-anim');
			// }, 3000);
			// $('.wil-core-author, .wil-core-content').each(function() {
			// 	if ($(this).text() == '') {
			// 		$(this).parent().attr('data-display', 'none');
			// 	}
			// });
		}



		// $('.wil-core-commentlist').each(function() {
		// 	var self = $(this),
		// 		list = $('li', self);
		// 	if (list.find('.wil-core-author').html() != '' || list.find('.wil-core-content').html() != '') {
		// 		var titleComment = list.length < 10 ? '<span>0' + list.length + '</span> Comments' : '<span>' + list.length + '</span> Comments';
		// 	}
		// 	self.closest('.wil-text-content-core--footer').find('.wil-core-commenttitle').html(titleComment);
		// });


	});
	
}

function reverseArr(arr) {
	var newArr = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		if (i === len) break;
		newArr.push(arr[len-i-1]);
	}
	return newArr;
}

function willCoreInitComment(target) {
	var data = $(target).data();
	if (typeof data.filename != 'undefined') {
		var query = {
			filename: data.filename
		}
		$.get(data.url + '?' + $.param(query), function(res){
			if (res.status == 200) {
				var _html = '';

				var itemload = 1;
				if ($(target).closest('.has-content-core').hasClass('active')) {
					itemload = res.result.length;
				}
				$.each(reverseArr(res.result), function(index, value) {
					if (index < itemload) {
						_html += buildTemplateComment(value);
					}
				});
				_html += '';
				$(target).next('.wil-core-commentlist').html(_html);

			}
		});
	}
}

function buildTemplateComment(data) {
	var _dataContent = data.content;
	if (_dataContent.indexOf('[[') !== -1) {
		var link = _dataContent.match(/\[\[.*\]\]/g).join('').replace(/\[\[|\]\]/g, '');
		var html = '';
		if (link.search(/\.(jpe?g|png|gif|svg)/g) !== -1) {
			html = ' <a href="' + link + '" target="_blank" style="display:block;text-decoration: none;margin-top:5px!important"><img src="' + link + '" alt="' + link + '" style="max-width: 45%" /></a>';
		} else {
			html = ' <a href="' + link + '" target="_blank" style="text-decoration: underline">' + link + '</a>';
		}
		_dataContent = _dataContent.replace(/\[.*\]/g, html);
	}
	_dataContent = _dataContent
						.replace(/\n/g, '<br />')
						.replace(/\t/g, '<span style="display:inline-block;width: 10px"></span>')
						.replace(/\s\s/g, '<span style="display:inline-block;width: 6px"></span>');

	var emojiObj = {
		"XD": "https://cdn.shopify.com/s/files/1/1061/1924/files/Smiling_Face_with_Tightly_Closed_eyes_Icon_42x42.png",
		":D": "https://cdn.shopify.com/s/files/1/1061/1924/files/Smiling_Face_Emoji_Icon_42x42.png",
		":'(": "https://cdn.shopify.com/s/files/1/1061/1924/files/Cold_Sweat_Emoji_42x42.png",
		":P": "https://cdn.shopify.com/s/files/1/1061/1924/files/Tongue_Out_Emoji_with_Winking_Eye_Icon_42x42.png",
		"<3": "https://cdn.shopify.com/s/files/1/1061/1924/files/Heart_Eyes_Emoji_42x42.png",
		":O": "https://cdn.shopify.com/s/files/1/1061/1924/files/Surprised_Face_Emoji_42x42.png",
		":(": 'https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji_Icon_42x42.png',
		"8)": 'https://cdn.shopify.com/s/files/1/1061/1924/files/Sunglasses_Emoji_42x42.png',
		"8(": 'https://cdn.shopify.com/s/files/1/1061/1924/files/Nerd_with_Glasses_Emoji_42x42.png',
		":*": "https://cdn.shopify.com/s/files/1/1061/1924/files/Kissing_Face_Emoji_42x42.png",
		":poop:": "https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji_42x42.png",
		":3": "https://cdn.shopify.com/s/files/1/1061/1924/files/Confounded_Face_Emoji_42x42.png",
		"(Y)": "https://cdn.shopify.com/s/files/1/1061/1924/files/Thumbs_Up_Hand_Sign_Emoji_42x42.png"
	};
	for (var emoji in emojiObj) {
		if (_dataContent.indexOf(emoji) !== -1) {
			var _emoji = emoji.search(/\)|\(|\*/g) !== -1 ? emoji.replace(/\)/g, '\\)').replace(/\(/g, '\\(').replace(/\*/g, '\\*') : emoji;
			_dataContent = _dataContent.replace(new RegExp(_emoji, 'g'), ' <img src="' + emojiObj[emoji] + '" alt="' + emoji + '" style="width: 20px"></img>');
		}
	}


	return '<li data-checkwork="'+data.checkwork+'"><div class="flag1">' + data.author + '</div><div class="flag2">' + _dataContent + '</div><div class="wil-core-body ' + data.computername + '" style="border-left: 2px solid ' + data.checkcolor + '"><div class="wil-core-author">' + data.author + '</div><span class="wil-core-time">' + data.time + '</span><div class="wil-core-content">' + _dataContent + '</div></div></li>';
}
