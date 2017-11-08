/* 
 * JS Document for xxx
 * wen
 * copyright wen
 * email:yellowwen@126.com
 * Date: 2013-11-5
*/
/*
$(function(){
	var tt1,tt2,mm={};
	//鼠标移到小图应用上显示详情
	var app_s1 = $("#app_s1").clone(true,true);
	var app_s2 = $("#app_s2").clone(true,true);
	$("#app_s1,#app_s2").remove();
	if(Modernizr.csstransforms3d){//判断是否支持CSS--3D样式，如果支持就用3D反转切换，不支持就上下切换
		//检测前缀
		function prefixStyle(style) {
			var dummyStyle = document.createElement('div').style,
				vendor = (function () {
					var vendors = 't,webkitT,MozT,msT,OT'.split(','),
						t,
						i = 0,
						l = vendors.length;
					for ( ; i < l; i++ ) {
						t = vendors[i] + 'ransform';
						if ( t in dummyStyle ) {
							return vendors[i].substr(0, vendors[i].length - 1);
						}
					}
					return false;
				})(),
				cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '';
			if ( cssVendor === '' ) return style;
			//style = style.charAt(0).toUpperCase() + style.substr(1);
			return cssVendor + style;
		};
		
		// 还原样式前缀
		var transformAll = prefixStyle('transform'),
		transitionAll = prefixStyle('transition'),
		transformStyleAll = prefixStyle('transformStyle'),
		backfaceVisibilityAll = prefixStyle('backfaceVisibility'),
		perspectiveAll = prefixStyle('perspective');
		
		//判断是否支持3D空间（IE10暂不支持）
		if(Modernizr.preserve3d){
			//$(".app_s:not(.recomend_s)").mouseenter(function(){}).mouseleave(function(){});
			$(".details_3d").live("mouseenter",function(){//鼠标移进
				var $this = $(this);
				var _title = $(this).find("p.app_s_txt_t").html();
				var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
				$this.children(".app_s_pt").wrap('<div class="app_s_3d"></div>');
				clearTimeout(tt1);
				tt1=setTimeout(function(){
					$(".app_s").css({"background-color":"","box-shadow":""});
					$this.css({"background-color":"#ccc","box-shadow":"inset 0 0 6px #000"});
					$("div#app_s2").unwrap().remove();
					app_s2.find("p.app_s_txt_t").html(_title);
					app_s2.find("p.app_s_txt_d").html(_details);
					app_s2.appendTo($this.children(".app_s_3d")).css({"bottom":"auto"}).show();
					$this.children(".app_s_3d").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 180deg)');
				},1000);
			}).live("mouseleave",function(){
				var $this = $(this);
				clearTimeout(tt1);
				$this.children(".app_s_3d").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg)');
				setTimeout(function(){
					$(".app_s").css({"background-color":"","box-shadow":""});
					$("div#app_s2").unwrap().remove();
				},800);
			});
		}else{//悲催的IE10只支持一半的3D，换个思路实现反转
			$(".app_s:not(.recomend_s)").live("mouseenter",function(){
				var $this = $(this);
				var _title = $(this).find("p.app_s_txt_t").html();
				var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
				$this.children(".app_s_pt").wrap('<div class="app_s_3d"></div>');
				clearTimeout(tt1);
				tt1=setTimeout(function(){
					$("div#app_s2").unwrap().remove();
					app_s2.find("p.app_s_txt_t").html(_title);
					app_s2.find("p.app_s_txt_d").html(_details);
					$this.children(".app_s_3d").children(".app_s_pt").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 90deg)');
					setTimeout(function(){
						$this.children(".app_s_3d").children(".app_s_pt").hide();
						app_s2.prependTo($this.children(".app_s_3d")).css({"bottom":"auto"}).show();
						$this.children(".app_s_3d").children(".app_s2").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg)');
					},600);
					
				},1000);
			}).live("mouseleave",function(){//鼠标移出
				var $this = $(this);
				clearTimeout(tt1);
				$this.children(".app_s_3d").children(".app_s2").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 90deg)');
				setTimeout(function(){
					$this.children(".app_s_3d").children(".app_s2").hide();
					$this.children(".app_s_3d").children(".app_s_pt").show()
					$this.children(".app_s_3d").children(".app_s_pt").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg)');
				},600);
			});
		};
		
	}else{
		$(".app_s:not(.recomend_s)").mouseenter(function(){}).mouseleave(function(){});
		$(".app_s:not(.recomend_s)").live("mouseenter",function(){
			var $this = $(this);
			var _title = $(this).find("p.app_s_txt_t").html();
			var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
			tt1=setTimeout(function(){
				app_s2.find("p.app_s_txt_t").html(_title);
				app_s2.find("p.app_s_txt_d").html(_details);
				app_s2.appendTo($this).css({"bottom":"auto"}).show().siblings(".app_s_pt").stop(true).animate({marginTop:"-198px"},200);
			},1000);
		}).live("mouseleave",function(){
			var $this = $(this);
			clearTimeout(tt1);
			$(".app_s_pt").stop(true).animate({marginTop:"0"},100,function(){
				$this.find("#app_s2").remove();
			});
		});
	}
	
	
	
});
*/

(function($){
	
	$.fn.wen_plug_details = function(options){
		if(!window.Modernizr){alert("Modernizr.js没有加载");return false;}
		var defaultVal = {
			view_class:"details_3d_view",
			view_front_class:"details_3d_front",
			view_versa_class:"details_3d_versa",
			effects:"door1",
			//speed:1000,
			delay:2000,
			star_fn:"",						
			end_fn:""	
		};
		
		var obj = $.extend(defaultVal,options);
		
		return this.each(function(){
			var $this = $(this);
			var t,t1;
			var $details_3d = $this.find(".details_3d");
			var w = $details_3d.width(),h = $details_3d.height();
			var play = {
				door1_in:function(box){
					
				},
				door1_out:function(box){
					
				},
				door2_in:function(box){
					
				},
				door2_out:function(box){
					
				},
				ud_in:function(box){
					
				},
				ud_out:function(box){
					
				}
			};
			if(Modernizr.csstransforms3d){//判断是否支持CSS--3D样式，如果支持就用3D反转切换，不支持就上下切换
						
				//判断是否支持3D空间（IE10暂不支持）
				if(Modernizr.preserve3d){
					$details_3d.mouseenter(function(){//鼠标移进
						var $box_3d = $(this);
						if(!$box_3d.children().hasClass(obj.view_class)){
							$box_3d.css({"background-color":"#ccc","box-shadow":"inset 0 0 6px #000"});
							$box_3d.children().wrapAll('<div class="'+obj.view_front_class+'"></div>');
							$("."+obj.view_front_class).after('<div class="'+obj.view_versa_class+'"></div>');
							$box_3d.children().wrapAll('<div class="'+obj.view_class+'"></div>');
							$("."+obj.view_class).css({"height":h,"width":w,"position":"relative"});
							$("."+obj.view_front_class).css({"height":h,"width":w,"position":"absolute","z-index":"101","left":0,"top":0});
							$("."+obj.view_versa_class).css({"height":h,"width":w,"position":"absolute","z-index":"100","left":0,"top":0});
							if(typeof obj.star_fn == "function"){
								obj.star_fn($box_3d);
							}
						}
						
						clearTimeout(t);
						t=setTimeout(function(){
							$box_3d.children("."+obj.view_class).attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 180deg);height:'+h+'px;width:'+w+'px;position:relative;');
						},obj.delay);
						
					}).mouseleave(function(){//鼠标离开
						var $box_3d = $(this);
						clearTimeout(t);
						$box_3d.children("."+obj.view_class).attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg);height:'+h+';width:'+w+';position:relative;');
					});
					
				}else{//悲催的IE10只支持一半的3D，换个思路实现反转
					$details_3d.mouseenter(function(){//鼠标移进
						var $box_3d = $(this);
						if(!$box_3d.children().hasClass(obj.view_class)){
							$box_3d.css({"background-color":"#ccc","box-shadow":"inset 0 0 6px #000"});
							$box_3d.children().wrapAll('<div class="'+obj.view_front_class+'"></div>');
							$("."+obj.view_front_class).after('<div class="'+obj.view_versa_class+'"></div>');
							$box_3d.children().wrapAll('<div class="'+obj.view_class+'"></div>');
							$("."+obj.view_class).css({"height":h,"width":w,"position":"relative"});
							$("."+obj.view_front_class).css({"height":h,"width":w,"position":"absolute","z-index":"101","left":0,"top":0});
							$("."+obj.view_versa_class).css({"height":h,"width":w,"position":"absolute","z-index":"100","left":0,"top":0}).hide();
							if(typeof obj.star_fn == "function"){
								obj.star_fn($box_3d);
							}
						}
						
						clearTimeout(t);
						
						t=setTimeout(function(){
							$box_3d.children("."+obj.view_class).children("."+obj.view_front_class).attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 90deg);height:'+h+'px;width:'+w+'px;position:absolute;z-index;101;left:0;top:0');
							setTimeout(function(){
								$box_3d.children("."+obj.view_class).children("."+obj.view_front_class).hide();
								$box_3d.children("."+obj.view_class).children("."+obj.view_versa_class).show().children().css({"bottom":"auto"});
								$box_3d.children("."+obj.view_class).children("."+obj.view_versa_class).attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg);height:'+h+'px;width:'+w+'px;position:absolute;z-index;101;left:0;top:0');
							},600);
							
						},obj.delay);
					}).mouseleave(function(){//鼠标离开
						var $box_3d = $(this);
						clearTimeout(t);
						$box_3d.children("."+obj.view_class).children("."+obj.view_versa_class).attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 90deg);height:'+h+'px;width:'+w+'px;position:absolute;z-index;101;left:0;top:0');
						setTimeout(function(){
							$box_3d.children("."+obj.view_class).children("."+obj.view_versa_class).hide();
							$box_3d.children("."+obj.view_class).children("."+obj.view_front_class).show()
							$box_3d.children("."+obj.view_class).children("."+obj.view_front_class).attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg);height:'+h+'px;width:'+w+'px;position:absolute;z-index;101;left:0;top:0');
						},600);
					});
				};
				
			}else{
				$details_3d.mouseenter(function(){//鼠标移进
					var $box_3d = $(this);
					if(!$box_3d.children().hasClass(obj.view_class)){
						$box_3d.css({"background-color":"#ccc","box-shadow":"inset 0 0 6px #000"});
						$box_3d.children().wrapAll('<div class="'+obj.view_front_class+'"></div>');
						$("."+obj.view_front_class).after('<div class="'+obj.view_versa_class+'"></div>');
						$box_3d.children().wrapAll('<div class="'+obj.view_class+'"></div>');
						$("."+obj.view_class).css({"height":h,"width":w,"position":"relative"});
						$("."+obj.view_front_class).css({"height":h,"width":w});
						$("."+obj.view_versa_class).css({"height":h,"width":w,"position":"relative"});
						if(typeof obj.star_fn == "function"){
							obj.star_fn($box_3d);
						}
					}					
					clearTimeout(t);
					t=setTimeout(function(){
						$box_3d.children("."+obj.view_class).children("."+obj.view_versa_class).children().css({"bottom":"auto"});
						$box_3d.children("."+obj.view_class).children("."+obj.view_front_class).stop(true).animate({marginTop:"-198px"},500);						
					},obj.delay);
				}).mouseleave(function(){//鼠标离开
					var $box_3d = $(this);
					clearTimeout(t);
					$box_3d.children("."+obj.view_class).children("."+obj.view_front_class).stop(true).animate({marginTop:"0"},500);	
				});
			}
		});
		
	}
	//检测前缀
	function prefixStyle(style) {
		var dummyStyle = document.createElement('div').style,
			vendor = (function () {
				var vendors = 't,webkitT,MozT,msT,OT'.split(','),
					t,
					i = 0,
					l = vendors.length;
				for ( ; i < l; i++ ) {
					t = vendors[i] + 'ransform';
					if ( t in dummyStyle ) {
						return vendors[i].substr(0, vendors[i].length - 1);
					}
				}
				return false;
			})(),
			cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '';
		if ( cssVendor === '' ) return style;
		//style = style.charAt(0).toUpperCase() + style.substr(1);
		return cssVendor + style;
	};
	
	// 还原样式前缀
	var transformAll = prefixStyle('transform'),
	transitionAll = prefixStyle('transition'),
	transformStyleAll = prefixStyle('transformStyle'),
	backfaceVisibilityAll = prefixStyle('backfaceVisibility'),
	perspectiveAll = prefixStyle('perspective');
	
})(jQuery);