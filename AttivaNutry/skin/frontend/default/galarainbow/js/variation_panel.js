/**
 * EMThemes
 *
 * @license commercial software
 * @copyright (c) 2012 Codespot Software JSC - EMThemes.com. (http://www.emthemes.com)
 */
jQuery(function($) {
	var panel = $('#demotool_variation').css({'left':'-100%', 'position':'absolute'});
	
	$('a.btn-toggle').click(function () {
		if (!panel.hasClass('show')) {
			$('.variation-cp').show();
			panel.css('top', Math.max($(document).scrollTop(), Math.min($(this).offset().top, $(document).scrollTop() + $(window).height() - panel.outerHeight())) + 'px')
				.addClass('show')
				.animate({'left':$(this).width() + 1 + 'px'});
		} else {
			panel.removeClass('show')
				.animate({'left':-$(this).width() - panel.outerWidth() - 10 + 'px'}, 
				500, function () {
					$('.variation-cp').hide();
				});
			
		}
		return false;
	});

	// toogle section content-title
	$('#demotool_variation .content-title').click(function() {
		$(this).next('.wrapper-content').slideToggle('fast');
	}).trigger('click').first().trigger('click');
	

	// toggle box content
	$('#demotool_variation .box .title').click(function () {alert('box');
		var box = $(this).parent();

		if (box.children('.content').is(':visible')) {
			box.children('.content').slideUp('fast');
			box.addClass('close');
		} else {
			box.children('.content').slideDown('fast');
			box.removeClass('close');
		}
			
	});
	
	
	var oldCss = $('#emcssvariation').attr('href');
	$('#demotool_variation .btn-apply').click(function() {
		$('#emcssvariation').attr('href', $('#emvariationform').attr('action') + '?' + $('#emvariationform').serialize());
        // box/wide mode
        var mode = $('#em_box_wide').val();
        if(mode == 'box'){
            //$('#emoption_wideslideshow').hide();
			var isMobile = /iPhone|iPod|iPad|Phone|Mobile|Android|hpwos/i.test(navigator.userAgent);
			 if(isMobile == false)
				$('.wrapper').addClass('em-box-custom');
            $('.main-slideshow').removeClass('em-wide-custom');
        }else{
            $('.wrapper').removeClass('em-box-custom');
            $('#emoption_wideslideshow').show();
            if ($('#wide_full').is(':checked')){
                $('.main-slideshow').addClass('em-wide-custom');
            }else{
                $('.main-slideshow').removeClass('em-wide-custom');
            }            
        }
		return false;
	});
	
	$('#demotool_variation .btn-reset').click(function() {
		$('#emcssvariation').attr('href', oldCss);
		$('#demotool_variation input[type=text], #demotool_variation select, #demotool_variation input[type=hidden]').val('').css('background-color', '');
	        if($('.wrapper').hasClass('em-box-custom')){
	            $('.wrapper').removeClass('em-box-custom');
	        }
	        if($('.main-slideshow').hasClass('em-wide-custom')){
	            $('.main-slideshow').removeClass('em-wide-custom');   
	        }        
		return false;
	});


	// load google fonts
	var fontLoaded = {};
	$('#em_variation_google_font').after('<p id="em_variation_google_font_preview" style="font-size:20px;padding:10px 0"></p>')
		.bind('change', function() {
			var font = $(this).val();
			if (font.length > 0) {
				font = font[font.length-1];
				if (typeof fontLoaded[font] == 'undefined') {
					$('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family='+encodeURIComponent(font)+':400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic&subset=latin,cyrillic-ext,cyrillic,greek-ext,greek,vietnamese,latin-ext"></link>');
					$('#em_variation_google_font_preview').html(font)
						.css('font-family', font);
				}
			}
		});

	// stripes pattern
	$('#demotool_variation a.page_bg_image').click(function() {
		$('#demotool_variation a.page_bg_image').removeClass('selected');
		$(this).addClass('selected');
		$('#demotool_variation input[name=page_bg_image]').val('url(../images/stripes/' + $(this).data('input-value') + ')');
		return false;
	});

	// stripes pattern
	$('#demotool_variation a.h_bg_image').click(function() {
		$('#demotool_variation a.h_bg_image').removeClass('selected');
		$(this).addClass('selected');
		$('#demotool_variation input[name=h_bg_image]').val('url(../images/stripes/' + $(this).data('input-value') + ')');
		return false;
	});

	// stripes pattern
	$('#demotool_variation a.bd_bg_image').click(function() {
		$('#demotool_variation a.bd_bg_image').removeClass('selected');
		$(this).addClass('selected');
		$('#demotool_variation input[name=bd_bg_image]').val('url(../images/stripes/' + $(this).data('input-value') + ')');
		return false;
	});

	// stripes pattern
	$('#demotool_variation a.f_bg_image').click(function() {
		$('#demotool_variation a.f_bg_image').removeClass('selected');
		$(this).addClass('selected');
		$('#demotool_variation input[name=f_bg_image]').val('url(../images/stripes/' + $(this).data('input-value') + ')');
		return false;
	});

    $('#em_box_wide').change(function(){
        var modevalue = $('#em_box_wide').val();
        if(modevalue == 'box'){
            $('#emoption_wideslideshow').hide();
			$('.box_item').show();
			$('.hidden_in_box').hide();
        }else{
            $('#emoption_wideslideshow').show();
            $('.box_item').hide();
			$('.hidden_in_box').show();
        }
    });

    $(document).ready(function(){
        var b = $('#em_box_wide').val();
        if(b=='wide'){
            $('#emoption_wideslideshow').show();
			$('.box_item').hide();
			$('.hidden_in_box').show();
			if ($('#wide_full').is(':checked'))
				$('.main-slideshow').addClass('em-wide-custom');
        }else{
            $('#emoption_wideslideshow').hide();
			$('.box_item').show();
			$('.hidden_in_box').hide();
        }
    });

});