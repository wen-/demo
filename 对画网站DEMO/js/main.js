/* 
 * JS Document for 对画
 * Date: 2014-05-xx
 */

$(function(){
	//搜索切换
	$(".search_t span").click(function(){
		$(this).addClass("current").siblings("span").removeClass("current");
	});
	
	//导航
	var navT = $(".nav").offset().top;
	var additionH = $(".nav").height();
	var sectionH = [],section_n = 8,section_i = 1,i1 = 0,scrollEv = true;
	for(;section_i<=section_n;section_i++){
		var sectionH_s = $(".section"+section_i).offset().top;
		var sectionH_l = sectionH_s + $(".section"+section_i).height();
		sectionH.push([sectionH_s,sectionH_l]);
	}
	$(".nav_m li a").on("click",function(){
		scrollEv = false;
		var index = $(this).parents("li").index();
		$(".nav_m li").removeClass("current");
		$(this).parents("li").addClass("current");
		var goElem = $(this).attr("data-fixed"),
			goT = $(goElem).offset().top - additionH;
		$("html,body").animate({
			scrollTop: goT
		}, 2000, 'easeInOutQuint',function(){
			scrollEv = true;
			if(index == 3){
				$(goElem).find(".teamDWAD_ico img").addClass("animated rotateIn");
				$(goElem).find(".teamDWAD_teachers").addClass("animated fadeInLeft");
				$(goElem).find(".teamDWAD_core").addClass("animated fadeInRight");
			}
		});
		$(goElem).find(".module_title h1").addClass("animated fadeInLeft");
		
		return false;
	});
	$(window).scroll(function(){
		var t = $(window).scrollTop();
		if(t > navT){
			$(".nav").addClass("nav_fixed");
		}else{
			$(".nav").removeClass("nav_fixed");
			if(!!scrollEv){
				$(".nav_m li").removeClass("current");
			}
		}
		if(!!scrollEv){
			for(;i1<section_n;i1++){
				if(t >= sectionH[i1][0] && t <= sectionH[i1][1]){
					if(!$(".nav_m li").eq(i1).hasClass("current")){
						$(".nav_m li").removeClass("current");
						$(".nav_m li").eq(i1).addClass("current");
					}
				}
				if(t+768 > $(".section"+(i1+1)).offset().top && t < $(".section"+(i1+1)).offset().top){
					$(".section"+(i1+1)).find(".module_title h1").addClass("animated fadeInLeft");
					if(i1 == 3){
						$(".section"+(i1+1)).find(".teamDWAD_ico img").addClass("animated rotateIn");
						$(".section"+(i1+1)).find(".teamDWAD_teachers").addClass("animated fadeInLeft");
						$(".section"+(i1+1)).find(".teamDWAD_core").addClass("animated fadeInRight");
					}
				}
			}
			i1 == section_n?i1 = 0:i1;
		}
	});
	//导航区新增响应菜单
	function sNav(){
		var nav_w = $(".nav_m ul").width();
		var nav_li_l = $(".nav_m ul li").length;
		var nav_li_w = $(".nav_m ul li").eq(0).width();
		var nav_n = Math.floor(nav_w/nav_li_w);
		if(nav_n < nav_li_l){
			$(".sNav").show();
			$(".sNav_list a").show();
			$(".sNav_list a:lt("+nav_n+")").hide();
		}else{
			$(".sNav").hide();
		}
	};
	sNav();
	$(window).resize(function(){
		sNav();
	});
	
	$(".sNav_ico").click(function(){
		$(this).toggleClass("sNav_ico_open");
		$(".sNav_list").toggle();
	});
	
	//内容1区图片切换
	$("#content1_play").wen_play({
		show_n : "1",
		page_show:"num_opacity",
		speed:1000,
		autospeed:4000,
		autoplay:true
	});
	//对画成绩切换
	$("#resultsDWAD_play").wen_play({
		show_n : "1",
		page_show:"pre_next",
		speed:1000,
		autoplay:false
	});
	
	//视频和tab切换
	$(".informationDWAD_video li").click(function(){
		$(this).addClass("current").siblings("li").removeClass("current");
	});
	
	//高亮区
	$(".module_light a").hover(function(){
		if(! $(this).find(".vertical").is(":animated")){
			$(this).find(".vertical").animate({width:'100%'},100);
			$(this).find(".moduleLight_ico").addClass("current");
			$(this).find("p").css({"color":"#3e3e3e"});
		}
	},function(){
		$(this).find(".vertical").animate({width:'10px'},100);
		$(this).find(".moduleLight_ico").removeClass("current");
		$(this).find("p").css({"color":"#a4a4a4"});
	});
	
	//返回顶部
	$("#goTop").click(function(){
		$("html,body").animate({
			scrollTop: 0
		}, 2000, 'easeInOutQuint');
		return false;
	});
});