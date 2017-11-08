// JavaScript Document
$(function(){
	var bwidth = $(window).width();
	var width9 = bwidth*0.9,
	    width8 = bwidth*0.8,
		width7 = bwidth*0.7,
		width6 = bwidth*0.6,
		width5 = bwidth*0.5,
		width4 = bwidth*0.4,
		width3 = bwidth*0.3,
		width2 = bwidth*0.2,
		width1 = bwidth*0.1;
	/*
	var CSS = "css/min320.css";
	if(bwidth <640){
		$("#min320").attr('href',CSS);
		loaded();
	};
	*/
	//$("img").css({"max-width":width8});
	$(".wb_p img").css({"max-width":width4});
	$("#ccblogo").css({"max-width":width5});
	/*
	$(window).resize(function(){
		if(bwidth <640){
			$("#min320").attr('href',CSS);
		}else{
			$("#min320").attr('href',"");
		};
		//$("img").css({"max-width":width8});
		$(".wb_p img").css({"max-width":width4});
		$("#ccblogo").css({"max-width":width5});
	});
	*/
	$(".news_tab h1").click(function(){
		var numb = $(this).index()+1;
		var tab = ".tab";
		$(this).addClass("tab_this").siblings().removeClass("tab_this");
		//alert(tab_content);
		$(tab + numb).show().siblings().hide();
	});
	
	$("#gshq span").click(function(){
		var img_num = $(this).index();
		$("#gshq_img img").eq(img_num).show().siblings().hide();
	});
	$("#jjhq span").click(function(){
		var img_num = $(this).index();
		$("#jjhq_img img").eq(img_num).show().siblings().hide();
	});
	
	//外汇牌价
	//tab切换
	$(".tab_menus ul li").mouseover(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
		var this_i = $(this).parent().find("li").index($(this));
		$(this).parent().parent().siblings(".tab_content_box").hide();
		$(this).parent().parent().siblings(".tab_content_box").eq(this_i).show();
	});
	//人民币利率
	$("#ll_rmb option").click(function(){
		var index = $(this).index()+1;
		var showimg = ".llrmbimg";
		$(showimg+index).show().siblings().hide();
	});
	//外币利率
	$("#ll_wb option").click(function(){
		var index = $(this).index()+1;
		$("#w_b table").eq(index).show().siblings().hide();
	});
});




$(function(){
	$("#no_js").hide();
	
	/*根据屏幕调整尺寸ad及热点应用*/
	$("#home_ad li").width($("#home_ad").width());
	
	$(".hot_app_ico1 .wrapper_data").width(Math.ceil($(".ad_box2").width()));
	$(".ico_w1").css({"width":Math.ceil($(".ad_box2").width()*2)});
	//$(".hot_app_ico1").height($(".hot_app_ico1 li").height());
	
	$(".hot_app_ico3 li").width($(".hot_app_ico3").width()*0.25);
	$(".ico_w3").css({"width":Math.ceil($(".hot_app_ico3").width()*0.25*$(".hot_app_ico3 a").length)});
	//$(".hot_app_ico3").height($(".hot_app_ico3 li").height());
	
	$("#news1 .news_list_slide").width($("#news1").width());
	$("#news_list1").css({"width":$("#news1 .news_list_slide").width()*$("#news1 .news_list_slide").length});
	
	$("#ad6 ul").width($("#ad6 li").outerWidth(true)*$("#ad6 li").length);
	//got-top
	$("span.go_top").click(function(){
		$(window).scrollTop(0);
	});
		
	$(window).resize(function(){
		var bwidth1 = $(window).width();
		$("#home_ad img").css({"max-width":""});
		if(bwidth1 <640){
			$("#min320").attr('href',CSS);
		}else{
			$("#min320").attr('href',"");
		};
		$("#ccblogo").css({"max-width":bwidth1*.5});
		
		$("div.new_financial1 dt").css({"padding-top":"","padding-bottom":""});
		$("div.new_financial2 dt").css({"padding-top":"","padding-bottom":""});
		//changeHeight();
		/*根据屏幕调整尺寸ad及热点应用*/
		$("#home_ad li").width($("#home_ad").width());
		
		$(".hot_app_ico1 .wrapper_data").width(Math.ceil($(".ad_box2").width()));
		$(".ico_w1").css({"width":Math.ceil($(".ad_box2").width()*2)});
		$("#scroller").height($("#scroller li").height());
		
		$(".hot_app_ico3 li").width($(".hot_app_ico3").width()*0.25);
		$(".ico_w3").css({"width":Math.ceil($(".hot_app_ico3").width()*0.25*$(".hot_app_ico3 a").length)});
		$(".hot_app_ico3").height($(".hot_app_ico3 li").height());
		
		$("#news1 .news_list_slide").width($("#news1").width());
		$("#news_list1").css({"width":$("#news1 .news_list_slide").width()*$("#news1 .news_list_slide").length});
		
		$("#ad6 ul").width($("#ad6 li").outerWidth(true)*$("#ad6 li").length);
		
	});
});



var CSS = "css/min320.css";
var bwidth = $(window).width();
if(bwidth <640){
		$("#min320").attr('href',CSS);
};


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
			$ul.width(Math.ceil(li_w*li_n));
			if(li_n <= obj.show_n){
				$this.children(".pre_btn").hide();
				$this.children(".next_btn").hide();
				return false;
			};
			function play(a){
				var $new_li = $this.find("li");
				li_w = $new_li.eq(0).outerWidth();
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