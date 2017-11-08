/* 
 * JS Document for 纽约方行
 * Date: 2014-09-xx
 */

$(function(){
	$("#recommend_play").wen_play({
		show_n : "3"
		,page_show:"pre_next"
		,speed:800
		//,autoplay:true
	});
	
	
	$(".search_box input").focus(function(){
		if($(this).val() == "请输入关键字"){
			$(this).val("");	
		}
		$(this).css({"color":"#000"});
	}).blur(function(){
		if($(this).val() == ""){
			$(this).val("请输入关键字");	
		}
		$(this).css({"color":"#ccc"});
	});
	
	$(".news_list li,.submenu_m li,.quickmenu li").mouseenter(function(){
		$(this).addClass("current").siblings("li").removeClass("current");
	})
});