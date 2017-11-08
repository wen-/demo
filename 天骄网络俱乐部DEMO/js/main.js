/* 
 * JS Document for 天骄
 * Date: 2014-08-xx
 */

$(function(){
	$("#wen_play").wen_play({
		show_n : "1"
		,page_show:"num_opacity"
		,speed:800
		//,autoplay:true
	});
	
	$(".member_search select").change(function(){
		var v = $(this).val();
		$(this).prev("span").text(v);
	});
	
	$(".bw_ranking dt").click(function(){
		$(this).parent("dl").siblings("dl").find("dt").removeClass("current").next("dd").hide();
		$(this).addClass("current").next("dd").show();
	});
	
	$(".userShowContent_t h1").click(function(){
		var i = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".userShowDataBox").hide().eq(i).show();
	});
});