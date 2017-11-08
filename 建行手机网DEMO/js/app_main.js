// JavaScript Document
/* 
 * CSS Document for appstore
 * http://ccb.com/
 *
 * Copyright 2012, wen CCB GEONG
 * http://www.geong.com/
 *
 * Date: 2012-10-15
 */
$(function(){
	$("#app_login_img").click(function(){
		$(".login_info_box").toggle();
	});
	$("#app_search_img").click(function(){
		$(".app_search_box").toggle();
	});
	$(".app_search_box button").click(function(){
		window.location="app_page4.html";
	});
	$(".app_box li,.app_box1 li").click(function(){
		window.location="app_page2.html";
	});
	$(".remember_checked").click(function(){
		$(this).toggleClass("remember_on");
	});
	$(".app_title_m").myplay({pre_page:".app_title_pre",next_page:".app_title_next",speed:500,linkage:true,linkage_box:".linkage_box"});
	if($(".app_title_m li").length == 1){
		$(".app_title_m ul").css({"left":$(".app_title_m li").eq(0).width()});
	};
	$(".show_box").myplay({show_n:2,pre_page:".pre_page",next_page:".next_page"});
});
//轮播插件

(function($){
	$.fn.myplay = function(options){
		var defaultVal = {
			show_n : "1",
			pre_page:".pre_btn",
			next_page:".next_btn",
			speed:800,
			linkage:false,
			linkage_box:".linkage_box",
			move_n : false
		};
		var obj = $.extend(defaultVal,options);
		return this.each(function(){
			var $this = $(this);
			var i = 1;
			var $li = $this.find("li");
			var $li_1 = $li.eq(0);
			var li_w = $li_1.outerWidth();
			var li_n = $li.length;
			var $ul = $this.find("ul");
			$ul.width(li_w*li_n);
			if(li_n <= obj.show_n){
				$this.children(".pre_btn").hide();
				$this.children(".next_btn").hide();
				return false;
			};
			function play(a){
				var $new_li = $this.find("li");
				if(a == "next"){
					if(! $ul.is(":animated")){
						
						$ul.animate({"left":-li_w},obj.speed,function(){
							$(".title_on").removeClass("title_on").next().addClass("title_on");
							$new_li.first().appendTo($ul);
							$ul.css({"left":"0"});
							if(obj.linkage == true){//设置关联内容
								if(i < li_n-1){
									i++;
								}else{
									i=0;
								};
								$(obj.linkage_box).children().eq(i).show().siblings().hide();
							};
						});
					};
				};
				if(a == "pre"){
					if(! $ul.is(":animated")){
						$new_li.last().prependTo($ul);
						$ul.css({"left":-li_w});
						$ul.animate({"left":"0"},obj.speed);
						if(obj.linkage == true){//设置关联内容
							if(i > 0){
								i--;
							}else{
								i=li_n-1;
							};
							$(obj.linkage_box).children().eq(i).show().siblings().hide();
						};
					};
				};
			};
			$(obj.pre_page).click(function(){
				play("pre");
			});
			$(obj.next_page).click(function(){
				play("next");
			});
		});
	};
})(jQuery);