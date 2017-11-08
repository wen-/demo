/* 
 * JS Document for xxx
 * Copyright 2012, wen 
 * Date: 2012-12-18
 */
$(function(){
	 $(".search_tab li").click(function(){
		 $(this).addClass("on_search").siblings().removeClass("on_search");
	 });
	$(".section_3_tab li").click(function(){
		var index = $(this).index();
		$(this).addClass("on_tab1").siblings().removeClass("on_tab1");
		$(".section_3_list").eq(index).show().siblings(".section_3_list").hide();
	});
	
});