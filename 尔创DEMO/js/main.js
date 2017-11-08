$(function(){
	//页面加载完隐藏加载页
	$(window).on("load",function(){
		$("body").addClass("loaded");
	});
	//定位导航菜单红线
	if($("#header .nav").length){
		function position_line(){
			var nav_l = $("#header .nav li.active").position().left;
			var nav_w = $("#header .nav li.active").width();
			$("#header .unline").css({"width":nav_w,"left":nav_l});
		}
		position_line();
		$(window).resize(function(){
			position_line();
		});
	}
	var tt,t=0;
	//尔创金融
	($('#fullpage').length)&&$('#fullpage').fullpage({
		anchors: ['firstPage', 'secondPage', '3rdPage'],
		css3: true,
		menu: '#menu',
		recordHistory:false,
		navigation:true,
		navigationPosition:'right',
		scrollOverflow: true,
		afterLoad: function(anchorLink, index){
			window.clearInterval(tt);
			if(anchorLink == '3rdPage'){
				$("#section2 img").addClass("slideInUp");
				$("#section2 h1").addClass("slideInDown");
			}
		},
		onLeave: function(index, nextIndex, direction){
			var nav_l = $("#header .nav li").eq(nextIndex-1).position().left;
			$("#header .unline").css({"left":nav_l});
			var winH = $(window).height();
			tt = window.setInterval(function(){
				index > nextIndex?t-=4:t+=4;
				t = t<0?0:t+winH<1560?t:1560-winH;
				$("body").css({"background-position":"center -"+t+"px"});	
			},10);
		}

	});
	//详情页
	var colors = [];
	$(".submenu_box").length&&$(".submenu_box li").each(function(i,n){
		var color = $(this).attr("data-color");
		colors.push(color);
	});
	($('#detailpage').length)&&$('#detailpage').fullpage({
		anchors: ['bankPage', 'wxbankPage', 'financePage', 'appPage'],
		css3: true,
		menu: '#submenu',
		recordHistory:false,
		verticalCentered:false,
		scrollOverflow: true,
		afterLoad: function(anchorLink, index){
			var elem = "li[data-menuanchor='"+anchorLink+"']";
			var colorname = $(elem).attr("data-color");
			$('.submenu_box').removeClass(colors.join(' ')).addClass(colorname);
			//详情页如果要AJAX加载数据可以写在这里
		}
	});
	
	
	//点击底部菜单
	var menubox_hide = true;
	$(".menuBtn").click(function(){
		var winW = $(window).width();
		var IE8 = (navigator.userAgent.indexOf("MSIE 8")>-1);
		if(winW >= 1200||IE8){
			if($(".menubox").is(":visible")){
				$(".menubox").slideUp();
				menubox_hide = false;
				return false;
			}
			menubox_hide?$(".menubox").show():$(".menubox").slideDown();
			$(".menubox ul").slideDown(function(){
				$(".menudata").animate({"marginLeft":"0"},1000,function(){
					$(".menudata_list dl").slideDown();
				});
			});
		}else{
			var menuhtml = $(".menubox ul").html();
			$("body").append('<div class="popupbox menupopupbox animated"><span class="close">×</span><ul>'+menuhtml+'</ul></div>');
			var popupW = $(".popupbox").height();
			$(".popupbox").css({
				"width":"100%",
				"height":"100%",
				"position":"absolute",
				"z-index":"1001",
				"top":"0",
				"left":"0",
				"overflow":"hidden",
				"background-color":"rgba(0,0,0,.8)"
			});
			$(".popupbox").addClass("zoomIn");
			window.setTimeout(function(){
				$(".popupbox li:even").addClass("animated bounceInLeft");
				$(".popupbox li:odd").addClass("animated bounceInRight");
			},1000);
			$(document).on("click",".popupbox .close",function(){
				$(this).parents(".popupbox").remove();
			});
		}
	});
	$(document).click(function(e){
		var e = e || window.event;
		var targ = e.target || e.srcElement;
		if( !$(targ).parents().is("#footer") && targ.nodeName != "A" ){
			$(".menubox").slideUp();
		}
		if( !($(targ).parents().is(".submenu_box")||$(targ).hasClass("submenu_box")) && targ.nodeName != "A" && !($(targ).parents().is(".detailsmenu")||$(targ).hasClass("detailsmenu"))){
			$(".detailsmenu").removeClass("on");
			$(".submenu_box").css({"display":"block","margin-left":"-100%"});
		}
	});
	
	//侧栏
	$(".slide_ico li").hover(function(){
		$(this).addClass("current");
		$(this).children(".pa").fadeIn("fast");
	},function(){
		$(this).removeClass("current");
		$(this).children(".pa").fadeOut("fast");
	});
	
	$(document).on("click",".detailsmenu",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(".submenu_box").css({"display":"block","margin-left":"-100%"});
		}else{
			$(this).addClass("on");
			$(".submenu_box").css({"display":"block","margin-left":"0"});
		}
	});

});
