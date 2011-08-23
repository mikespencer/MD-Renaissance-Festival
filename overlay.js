if(typeof jQuery === 'undefined'){
	wpniAds.addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
}

var wpAd = wpAd || {};
		wpAd.overlay = wpAd.overlay || {};
		wpAd.overlay.bg_opacity = 0.6;
		wpAd.overlay.fade_speed = 400;
		wpAd.overlay.isOpen = false;
		wpAd.overlay.firstPlay = true;

wpAd.overlay.thisMovie = function(movieName){
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

wpAd.overlay.beginAnimation = function(){
	wpAd.overlay.thisMovie('MDRF2011_HPoverlay').beginAnimation();
	wpAd.overlay.thisMovie('MDRF2011_LBoverlay').beginAnimation();
}

wpAd.overlay.replay = function(){
	wpAd.overlay.thisMovie('MDRF2011_HPoverlay').resetAnimation();
	wpAd.overlay.thisMovie('MDRF2011_LBoverlay').resetAnimation();
	wpAd.overlay.exec();
}

wpAd.overlay.remove = function(){
	if(wpAd.overlay.isOpen){
		clearTimeout(wpAd.overlay.timer);
		wpAd.overlay.isOpen = false;
		$('#ad_overlay_bg').fadeOut(wpAd.overlay.fade_speed, function(){
			$(this).parent().remove();
		});
		$('#ad_overlay,  #ad_overlay_close').hide();
		wpAd.overlay.firstPlay = false;	
		wpAd.overlay.beginAnimation();
	}
}

wpAd.overlay.exec = function(){
	wpAd.overlay.isOpen = true;
	$('body').prepend('<div id="overlay_wrapper"><div id="ad_overlay"></div><div id="ad_overlay_bg" style="display:none;"></div><div id="ad_overlay_close"><img src="http://media.washingtonpost.com/wp-adv/advertisers/mdrenfest/2011/close.png" height="32" width="70" style="border:0;" alt="Close" /></div></div>');
	
	var $window = $(window),
			w = $window.width(),
			h = $window.height(),
			swf = 'http://media.washingtonpost.com/wp-adv/advertisers/mdrenfest/2011/overlay.swf?clickTag='+wpAd.overlay.ct,
			creative_code = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+w+'" height="'+h+'" name="overlay_swf" id="overlay_swf" align="middle">\
			<param name="movie" value="'+swf+'" />\
			<param name="quality" value="high" />\
			<param name="bgcolor" value="#ffffff" />\
			<param name="play" value="true" />\
			<param name="loop" value="true" />\
			<param name="wmode" value="transparent" />\
			<param name="scale" value="noscale" />\
			<param name="menu" value="true" />\
			<param name="devicefont" value="false" />\
			<param name="salign" value="" />\
			<param name="allowScriptAccess" value="always" />\
			<!-\-[if !IE]>-\->\
			<object type="application/x-shockwave-flash" data="'+swf+'" width="'+w+'" height="'+h+'">\
				<param name="movie" value="'+swf+'" />\
				<param name="quality" value="high" />\
				<param name="bgcolor" value="#ffffff" />\
				<param name="play" value="true" />\
				<param name="loop" value="true" />\
				<param name="wmode" value="transparent" />\
				<param name="scale" value="noscale" />\
				<param name="menu" value="true" />\
				<param name="devicefont" value="false" />\
				<param name="salign" value="" />\
				<param name="allowScriptAccess" value="always" />\
			<!-\-<![endif]-\->\
				<!--a href="http://www.adobe.com/go/getflash">\
					<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />\
				</a-->\
			<!-\-[if !IE]>-\->\
			</object>\
			<!-\-<![endif]-\->\
		</object>',
		$close = $('#ad_overlay_close');
	
	if(!wpAd.overlay.firstPlay ){
		$('#ad_overlay_close, #ad_overlay_bg, #ad_overlay').css({top:$(window).scrollTop()+'px'})
	}

	$('#ad_overlay_bg').css({opacity:wpAd.overlay.bg_opacity, height: $window.height() + 'px'}).fadeIn(wpAd.overlay.fade_speed, function(){
		$('#ad_overlay').html(creative_code);
		$close.css({left : (w - $close.outerWidth())+'px', display : 'block'}).click(wpAd.overlay.remove);
		wpAd.overlay.timer = setTimeout(wpAd.overlay.remove, 7000);
	});
}

if(typeof jQuery !== 'undefined'){
	$(function(){
		//if(typeof getCookie !== 'undefined' && !getCookie('mdrenfest')){
			wpAd.overlay.exec();
	/*		try{
				var expire = new Date();
				expire.setDate(expire.getDate()+1);
				setCookie('mdrenfest','true',expire.toGMTString())
			}
			catch(e){}
		}
		else{
			wpAd.overlay.firstPlay = false;	
			wpAd.overlay.beginAnimation();
		}*/
	})
}
