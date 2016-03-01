/**
 * EMThemes
 *
 * @license commercial software
 * @copyright (c) 2013 Codespot Software JSC - EMThemes.com. (http://www.emthemes.com)
 */

(function($) {

if (typeof EM == 'undefined') EM = {};
if (typeof EM.tools == 'undefined') EM.tools = {};


var isMobile = /iPhone|iPod|iPad|Phone|Mobile|Android|hpwos/i.test(navigator.userAgent);
var isPhone = /iPhone|iPod|Phone|Android/i.test(navigator.userAgent);


var domLoaded = false, 
	windowLoaded = false, 
	last_adapt_i, 
	last_adapt_width;
/**
 * Fix iPhone/iPod auto zoom-in when text fields, select boxes are focus
 */
function fixIPhoneAutoZoomWhenFocus() {
	var viewport = $('head meta[name=viewport]');
	if (viewport.length == 0) {
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>');
		viewport = $('head meta[name=viewport]');
	}
	
	var old_content = viewport.attr('content');
	
	function zoomDisable(){
		viewport.attr('content', old_content + ', user-scalable=0');
	}
	function zoomEnable(){
		viewport.attr('content', old_content);
	}
	
	$("input[type=text], textarea, select").mouseover(zoomDisable).mousedown(zoomEnable);
}


/**
 * Function called when layout size changed by adapt.js
 */
function whenAdapt(i, width) {
	$('body').removeClass('adapt-0 adapt-1 adapt-2 adapt-3 adapt-4 adapt-5 adapt-6')
		.addClass('adapt-'+i);

    if (FREEZED_TOP_MENU !=0 && isPhone == false){
		var sticky_navigation = function(){
			var scroll_top = $(window).scrollTop();
			if (scroll_top > 150) {
				$('.scroll_menu').addClass('fixed-top');
				$('.scroll_menu').css({ 'position': 'fixed', 'top':0, 'z-index':998});
			} else {
				$('.scroll_menu').removeAttr('style');
				$('.scroll_menu').removeClass('fixed-top');
			}   
		};
		sticky_navigation();
		$(window).scroll(function() {
			 sticky_navigation();
		});
    }
    if($('body').hasClass('adapt-0') == true){
        $('.em-area05').removeClass('fixed-top');
    }
	setTimeout(function(){
		if (typeof em_slider!=='undefined')
			em_slider.reinit();
	},100);
	
	//fixtopleft(i);
};

/**
 * Callback function called when stylesheet is changed by adapt.js
 */
ADAPT_CONFIG.callback = function(i, width) {
	last_adapt_i = i;
	last_adapt_width = width;
	
	whenAdapt(last_adapt_i, last_adapt_width);
};

/**
*   Add class mobile
**/
function addClassMobile(){
    if(isMobile == true){
        jQuery('body').addClass('mobile-view');
    }
};

$(document).ready(function() {
	domLoaded = true;  
	isMobile && fixIPhoneAutoZoomWhenFocus();
	alternativeProductImage();
	// safari hack: remove bold in h5, .h5
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		$('h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6').css('font-weight', 'normal');
	}
	addClassMobile();	
    backToTop();
    if(jQuery('body').viewPC()){
		toolbar();
	}
    if (FREEZED_TOP_MENU !=0 && isPhone == false){persistentMenu();}
	toogleStore();
	boxwide_mode();
});

$(window).bind('load', function() {
	windowLoaded = true;
	responsive();
	whenAdapt(last_adapt_i, last_adapt_width);
});

$(window).bind('emadaptchange', function () {
    /*if (typeof em_slider!=='undefined')
        em_slider = new EM_Slider(em_slider.config);*/
});

})(jQuery);

/**
 * Adjust elements to make it responsive
 *
 * Adjusted elements:
 * - Image of product items in products-grid scale to 100% width
 */
function responsive() {
    var $=jQuery;
	
	// resize products-grid's product image to full width 100% {{{
	var position = $('.products-grid .item').css('position');
	if (position != 'absolute' && position != 'fixed' && position != 'relative')
		$('.products-grid .item').css('position', 'relative');
		
	var img = $('.products-grid .item .product-image img');
	if (!(img.parent().parent().parent().parent().hasClass("category-products"))){
		img.each(function() {
			img.data({
				'width': $(this).width(),
				'height': $(this).height()
			})
		});
		img.removeAttr('width').removeAttr('height').css('width', '100%');
	};
	$('.custom-logo').each(function() {
		$(this).css({
			'max-width': $(this).width(),
			'width': '100%'
		});
	});
};

/**
 * Change the alternative product image when hover
 */
function alternativeProductImage() {
    var $=jQuery;
    var tm;
    function swap() {
        clearTimeout(tm);
        setTimeout(function() {
            el = $(this).find('img[data-alt-src]');
            var newImg = $(el).data('alt-src');
            var oldImg = $(el).attr('src');
            $(el).attr('src', newImg).data('alt-src', oldImg);
        }.bind(this), 200);
    }

    $('.item .product-image img[data-alt-src]').parents('.item').bind('mouseenter', swap).bind('mouseleave', swap);
};

function showAgreementPopup(e) {		
	jQuery('#checkout-agreements label.a-click').parent().parent().children('.agreement-content').show()
		.css({
			'left': (parseInt(document.viewport.getWidth()) - jQuery('#checkout-agreements label.a-click').parent().parent().children('.agreement-content').width())/2 +'px',
			'top': (parseInt(document.viewport.getHeight()) - jQuery('#checkout-agreements label.a-click').parent().parent().children('.agreement-content').height())/2 + 'px'
	});	
};

/**
 *   After Layer Update
 **/
window.afterLayerUpdate = function () {
    var $=jQuery;
    if($('body').viewPC()){
        $('.show').each(function(){
			$(this).insertUl();
			$(this).selectUl();
		});

		$('.sortby').each(function(){
			//$(this).insertTitle();
			$(this).insertUl();
			$(this).selectUl();
		});
    }
	responsive();
    alternativeProductImage();

	if (typeof EM_QUICKSHOP_DISABLED == 'undefined' || !EM_QUICKSHOP_DISABLED)
		qs({
			itemClass: '.products-grid li.item, .products-list li.item, li.item .cate_product,.product-upsell-slideshow li.item, .mini-products-list li.item, #crosssell-products-list li.item', //selector for each items in catalog product list,use to insert quickshop image
			aClass: 'a.product-image', //selector for each a tag in product items,give us href for one product
			imgClass: '.product-image img' //class for quickshop href
		});
};

function hideAgreementPopup(e) {
	//$('opc-agreement-popup-overlay').hide();
	jQuery('#checkout-agreements .agreement-content').hide();
	
};

function toolbar(){
    var $=jQuery;
    $('.show').each(function(){
        $(this).insertUl();
        $(this).selectUl();
    });
    $('.sortby').each(function(){
        //$(this).insertTitle();
        $(this).insertUl();
        $(this).selectUl();
    });
	$('.cat-search').each(function(){
		$(this).insertUlCategorySearch();
		$(this).selectUlCategorySearch();
	});
    /*$('#select-language').each(function(){
        $(this).insertUl();
        $(this).selectUl();
    });
    $('.currency').each(function(){
        $(this).insertUl();
        $(this).selectUl();
    });*/
    $('#select-store').each(function(){
		$(this).insertUl();
		$(this).selectUl();
	});
};

// Back to top
function backToTop(){
    var $=jQuery;
    // hide #back-top first
	$("#back-top").hide();
	
	// fade in #back-top
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#back-top a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

};

/**
 * Decorate Product Tab
 */ 
EM.tools.decorateProductCollateralTabs = function() {
	var $=jQuery;
	$(document).ready(function() {
		if($('.box-collateral').length > 1){
            $('.product-collateral').each(function(i) {
				$(this).wrap('<div class="tabs_wrapper_detail collateral_wrapper" />');
	            $(this).prepend('<ul class="tabs_control"></ul>');
	            $(this).children(".product-collateral-item").addClass("ui-slider-tabs-content-container");

				$('.box-collateral', this).addClass('tab-item').each(function(j) {
					var id = 'box_collateral_'+i+'_'+j;
					$(this).addClass('content_'+id);
	                $(this).attr('id',id);
					$('.tabs_wrapper_detail ul.tabs_control').append('<li><a href="#'+id+'">'+$('h2', this).html()+'</a></li>');
				});
	            $("div.tabs_wrapper_detail .product-collateral").sliderTabs();
			});
		
		}
	});
};

function persistentMenu() {
    var $ = jQuery;
   // var setWidth = $('.em_nav, .nav-container').parent().parent().width();
	var sticky_navigation = function(){
		var scroll_top = $(window).scrollTop();
		if (scroll_top > 150) {
            $('.scroll_menu').addClass('fixed-top');
			$('.scroll_menu').css({ 'position': 'fixed', 'top':0, 'z-index':998});
		} else {
			$('.scroll_menu').removeAttr('style');
            $('.scroll_menu').removeClass('fixed-top');
		}   
	};
	sticky_navigation();
	$(window).scroll(function() {
		 sticky_navigation();
	});
}

function toogleStore(){
    if(isMobile == false){
        var $=jQuery;
        $(".btn_storeview").click(function() {
    		store_show();
    	});

    	$(".btn_storeclose").click(function() {
    		store_hide();
    	});

    	function store_show(){
    		var bg	=	$("#bg_fade_color");
    		bg.css("opacity",0.5);
    		bg.css("display","block");    		
            var top =( $(window).height() - $(".storediv").height() ) / 2;
            var left = ( $(window).width() - $(".storediv").width() ) / 2;
			$(".storediv").show();
            $(".storediv").css('top', top+'px');
            $(".storediv").css('left', left+'px');
			
    	}

    	function store_hide(){
    		var bg	=	$("#bg_fade_color");
    		$(".storediv").hide();
    		bg.css("opacity",0);
    		bg.css("display","none");
    	}
    }
};

function fixtopleft(i){
	//jQuery("#header_left_menu").show();
	var pad	=	0;
	if(jQuery(".em_nav .vnav").length > 0){
		if(i == 3)	pad	= 10;
		if(i == 2)	pad = 20;
		if(i == 1)	pad = 30;
	}

	jQuery(".em_nav").each(function() {
		var menu	=	jQuery(this).parent();
		var offset	=	menu.offset();

		jQuery(this).find(".fix-top").each(function() {
			var li	=	jQuery(this).parents('.menu-item-link');
			var cont = jQuery(this).parent();
			//var cont_off = cont.offset();

			//cont.css('top', offset.top - cont_off.top + pad +'px');
			cont.css('top', offset.top - li.offset().top + pad +'px');
		});
	});
	//jQuery("#header_left_menu").hide();
}

function boxwide_mode(){
	var $ = jQuery;
		if(boxwide_v =="wide" && fullslideshow){
			$('.main-slideshow').addClass('em-wide-custom');
		}
};