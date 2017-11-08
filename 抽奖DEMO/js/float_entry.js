// JavaScript Document
$(function(){
	//浮动客服入口菜单定位函数及载入执行
	float_sv_bbs();
	window.onresize=float_sv_bbs;//改变窗口大小时，重定位
	function float_sv_bbs()
	{	
		var doc_w=($(document).width()-997)/2;
		$(".sv_bbs_popup").css("overflow","hidden");			
		if($(".full_black").size()<1)
		{
			var full_black="<div class='full_black'></div>";
			$("body").append(full_black);
			$(".full_black").css("opacity","0.2");	
			$(".full_black").css({"width":$(window).width()+"px","height":$(document).height()+"px","display":"none"});
		}
		if($(".ie6_hack_iframe").size()<1)
			{
				var ie6_hack_iframe="<iframe src='about:blank' scrolling='no' frameborder='0' class='ie6_hack_iframe' style='padding:0px;margin:0px;background-color:#fff;position:absolute;top:0px;left:0px; z-index:-1;'></iframe>"
				$(".sv_bbs_popup .border_big_top").before(ie6_hack_iframe);
				$(".ie6_hack_iframe").css({"width":$(".sv_bbs_popup").width()-5,"height":$(".sv_bbs_popup").height()-5});	
			}
		
		if(navigator.userAgent.indexOf("TheWorld")>-1)//世界之窗		
			{
				$(".float_entry").css({"right":doc_w-11+1+"px"});
				$(".sv_bbs_popup").css({"right":doc_w-14+1+"px"});
				//$(".hot_line").css({"right":doc_w+203+1+"px"});
			}
		else
		if(navigator.userAgent.indexOf("MSIE 6")>-1)//IE6		
			{				
				$(".float_entry").css({"right":"0px"});
				$(".sv_bbs_popup").css({"right":"0px"});
				//$(".hot_line").css({"right":doc_w+203+"px"});
				$("html").css({"background-image":"url(about:blank)","background-attachment":"fixed","background-color":"#ffffff"});
				$("body").css("background-image",$("body").css("background-image"));
				
				
			}
		else
		if(navigator.userAgent.indexOf("MSIE 7")>-1)//IE7		
			{
				//$(".float_entry").css({"right":doc_w-11+12+"px"});
				//$(".sv_bbs_popup").css({"right":doc_w-14+12+"px"});
				//$(".hot_line").css({"right":doc_w+203+12+"px"});
				$(".float_entry").css({"right":"0px"});
				$(".sv_bbs_popup").css({"right":"0px"});
				//$(".hot_line").css({"right":doc_w+203+"px"});
				$("html").css({"background-image":"url(about:blank)","background-attachment":"fixed","background-color":"#ffffff"});
				$("body").css("background-image",$("body").css("background-image"));
			}
		else
		if(navigator.userAgent.indexOf("MSIE 8")>-1)//IE8		
			{
				$(".float_entry").css({"right":doc_w-11+1+"px"});
				$(".sv_bbs_popup").css({"right":doc_w-14+1+"px"});
				//$(".hot_line").css({"right":doc_w+203+1+"px"});
			}
		else
		if(navigator.userAgent.indexOf("MSIE 9")>-1)//IE9		
			{
				$(".float_entry").css({"right":doc_w-11+1+"px"});
				$(".sv_bbs_popup").css({"right":doc_w-14+1+"px"});
				//$(".hot_line").css({"right":doc_w+203+1+"px"});
			}
		else
		if(navigator.userAgent.indexOf("WebKit")>-1)//safari.chrome.傲游3等webkit内核浏览器		
			{
				$(".float_entry").css({"right":doc_w-11+12+"px"});
				$(".sv_bbs_popup").css({"right":doc_w-14+12+"px"});
				//$(".hot_line").css({"right":doc_w+203+12+"px"});
			}
		else
		if(navigator.userAgent.indexOf("Gecko")>-1)//firefox等gecok内核浏览器		
			{
				$(".float_entry").css({"right":doc_w-11+11+"px"});
				$(".sv_bbs_popup").css({"right":doc_w-14+11+"px"});
				//$(".hot_line").css({"right":doc_w+203+11+"px"});
			}
		else
		if(navigator.userAgent.indexOf("Opera")>-1)//Opera内核浏览器		
			{
				$(".float_entry").css({"right":doc_w-11+12+"px"});
				$(".sv_bbs_popup").css({"right":doc_w-14+12+"px"});
				//$(".hot_line").css({"right":doc_w+203+12+"px"});
			}	
		var hot_line_right=parseInt($(".float_entry").width())+parseInt($(".float_entry").css("padding-left"))+parseInt($(".float_entry").css("padding-right"))+22;		
		$(".hot_line").css({"right":hot_line_right});
	};
		
	
	//点击关闭
	$(".sv_bbs_popup_close").click(function(){
		$(".sv_bbs_popup").hide();
		$(".full_black").hide();
	});
	//点击“在线客服”和白箭头，如果弹出层显示则关闭，否则显示。
	$(".svol,.white_arrow").click(function(){
		$(".sv_bbs_popup").toggle();
		$(".full_black").toggle();
	});
	//"在线客服"悬停
	$(".svol").hover(function(){
		$(this).css("text-decoration","underline");
	},function(){
		$(this).css("text-decoration","none");
	});
	
	//鼠标放在黑块时，在线客服弹出关闭
	$(".full_black").mouseover(function(){
		$(this).hide();
		$(".sv_bbs_popup").hide();
	});


//load结束
});