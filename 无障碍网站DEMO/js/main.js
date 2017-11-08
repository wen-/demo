// JavaScript Document
/* 
 * JS Document for CCB Bank
 * wen GEONG
 * http://www.geong.com/
 * Date: 2013-08-30
 */
$(function(){
	$.wen_plug_toolbar.initialize();
	$("#staff_world").wen_slide({
		pre_page:".world_pre",              //上一个标签:#xxx/.xxx
		next_page:".world_next",            //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	$("#ad_box").wen_slide({
		pre_page:"",                        //上一个标签:#xxx/.xxx
		next_page:"",                       //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		autoplay:true,                		//自动播放：true(是)/false(否)
		auto_speed:5000,               		//自动播放时间间隔：越大停留时间越久
		pre_next:false,                     //上下按钮是否可以隐藏
		page_style:"current",               //当前页码样式
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	$("#active_play").wen_slide({
		pre_page:".active_pre",             //上一个标签:#xxx/.xxx
		next_page:".active_next",           //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:function(self,around){advance(self,around)}                   //回调2（动画开始前）
	});
	$("#employe_play").wen_slide({
		pre_page:".employe_pre",            //上一个标签:#xxx/.xxx
		next_page:".employe_next",          //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:function(self,around){advance(self,around)}                   //回调2（动画开始前）
	});
	$("#dt_list").wen_slide({
		pre_page:".world_pre",            //上一个标签:#xxx/.xxx
		next_page:".world_next",          //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	$("#pic_box").wen_slide({
		pre_page:".pic_pre",            //上一个标签:#xxx/.xxx
		next_page:".pic_next",          //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	$(".jy_show").wen_slide({
		pre_page:".jy_pre",            //上一个标签:#xxx/.xxx
		next_page:".jy_next",          //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	$("#center_play").wen_slide({
		pre_page:".center_pre",            //上一个标签:#xxx/.xxx
		next_page:".center_next",          //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		pre_next:true,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	/*底部图片*/
	$("#fc_foot_play").wen_slide({
		pre_page:".fc_foot_pre",            //上一个标签:#xxx/.xxx
		next_page:".fc_foot_next",          //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		autoplay:true,                		//自动播放：true(是)/false(否)
		auto_speed:8000,               		//自动播放时间间隔：越大停留时间越久
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:function(self,around){advance(self,around)}                   
	});
	$("#staff_world img.load_pic").lazyload({
		failure_limit : 10
		,effect: "fadeIn"
		//,event_obj: ".pic_load"
	});
	$("#active_play img.load_pic").lazyload({
		failure_limit : 10
		,effect: "fadeIn"
		//,event_obj: ".pic_load1"
	});
	$("#employe_play img.load_pic").lazyload({
		failure_limit : 10
		,effect: "fadeIn"
		//,event_obj: ".pic_load2"
	});
	$(".jy_body img.load_pic").lazyload({
		failure_limit : 10
		,effect: "fadeIn"
		//,event_obj: ".pic_load2"
	});
	$(".show_pic img.load_pic").lazyload({
		failure_limit : 10
		,effect: "fadeIn"
		//,event_obj: ".pic_load2"
	});
	
	//图片先加载前后各一张
	$(".wen_move").each(function(index, element) {
		var $ico_obj_first = $(this).find("li").eq(0).find("img");
		var $ico_obj = $(this).find("li").eq(1).find("img");
		var $ico_obj_last = $(this).find("li").eq(-1).find("img");
		if($ico_obj_first.length > 1){
			$ico_obj_first.each(function(index,element){
				var ico_obj_n1 = $(element).attr("data-original");
				if(!!ico_obj_n1){
					$(element).attr("src",ico_obj_n1);
					$(element).removeAttr("data-original");
					$(element).load(function(){
						//console.log("width:"+$(element).width());
						$(element).parents("li").css({"background":"none"});
					});
				}
			})
		}else{
			var ico_obj_first = $ico_obj_first.attr("data-original");
			if(!!ico_obj_first){
				$ico_obj_first.attr("src",ico_obj_first);
				$ico_obj_first.removeAttr("data-original");
				$ico_obj_first.load(function(){
					//console.log("width:"+$(element).width());
					$ico_obj_first.parents("li").css({"background":"none"});
				});
			}
		}
		if($ico_obj.length > 1){
			$ico_obj.each(function(index,element){
				var ico_obj_n = $(element).attr("data-original");
				if(!!ico_obj_n){
					$(element).attr("src",ico_obj_n);
					$(element).removeAttr("data-original");
					$(element).load(function(){
						//console.log("width:"+$(element).width());
						$(element).parents("li").css({"background":"none"});
					});
				}
			})
		}else{
			var ico_obj = $ico_obj.attr("data-original");
			if(!!ico_obj){
				$ico_obj.attr("src",ico_obj);
				$ico_obj.removeAttr("data-original");
				$ico_obj.load(function(){
					//console.log("width:"+$(element).width());
					$ico_obj.parents("li").css({"background":"none"});
				});
			}
		}
		if($ico_obj_last.length > 1){
			$ico_obj_last.each(function(index,element){
				var ico_obj_n1 = $(element).attr("data-original");
				if(!!ico_obj_n1){
					$(element).attr("src",ico_obj_n1);
					$(element).removeAttr("data-original");
					$(element).load(function(){
						//console.log("width:"+$(element).width());
						$(element).parents("li").css({"background":"none"});
					});
				}
			})
		}else{
			var ico_obj_last = $ico_obj_last.attr("data-original");
			if(!!ico_obj_last){
				$ico_obj_last.attr("src",ico_obj_last);
				$ico_obj_last.removeAttr("data-original");
				$ico_obj_last.load(function(){
					//console.log("width:"+$(element).width());
					$ico_obj_last.parents("li").css({"background":"none"});
				});
			}
		}
    });
	function advance(obj,around){
		if(around == "pre"){
			//var $url_obj = obj.wrapper.find("li").eq(-2).find("img");
			var $url_obj = obj.wrapper.find("li").slice(-3).find("img");
			if($url_obj.length > 1){
				$url_obj.each(function(index,element){
					var ico_url_pre = $(element).attr("data-original");
					if(!!ico_url_pre){
						$(element).attr("src",ico_url_pre);
						$(element).removeAttr("data-original");
						$(element).load(function(){
							//console.log("width:"+$(element).width());
							$(element).parents("li").css({"background":"none"});
						});
					}
				});
			}else{
				var ico_url_pre1 = $url_obj.attr("data-original");
				if(!!ico_url_pre1){
					$url_obj.attr("src",ico_url_pre1);
					$url_obj.removeAttr("data-original");
					$url_obj.load(function(){
						//console.log("width:"+$(element).width());
						$url_obj.parents("li").css({"background":"none"});
					});
				}
			}
		}else if(around == "next"){
			//var $url_obj = obj.wrapper.find("li").eq(2).find("img");
			var $url_obj = obj.wrapper.find("li").slice(2,4).find("img");
			if($url_obj.length > 1){
				$url_obj.each(function(index,element){
					var ico_url_next = $(element).attr("data-original");
					if(!!ico_url_next){
						$(element).attr("src",ico_url_next);
						$(element).removeAttr("data-original");
						$(element).load(function(){
							//console.log("width:"+$(element).width());
							$(element).parents("li").css({"background":"none"});
						});
					}
				});
			}else{
				var ico_url_next1 = $url_obj.attr("data-original");
				if(!!ico_url_next1){
					$url_obj.attr("src",ico_url_next1);
					$url_obj.removeAttr("data-original");
					$url_obj.load(function(){
						//console.log("width:"+$(element).width());
						$url_obj.parents("li").css({"background":"none"});
					});
				}
			}
			
		};
	};
	
	if($("div").find(".jg_move").length > 0){
		$(".jg_move").css({"top":$(".jg").offset().top - $(".introduce_txt").offset().top});
	}
	
	$(".sub_list dt").click(function(){
		if($(this).hasClass("only")){
			$(this).parents(".sub_list").find("dt").removeClass("on no_child");
			$(this).parents(".sub_list").find("dd").hide();
			$(this).addClass("no_child");
		}else{
			if(!$(this).hasClass("on")){
				$(this).parents(".sub_list").find("dt").removeClass("on no_child");
				$(this).parents(".sub_list").find("dd").hide();
				$(this).addClass("on").next("dd").show();
			}else{
				$(this).removeClass("on").next("dd").hide();
			}
		}
	});
	$(".sub_list dd a").click(function(){
		$(this).parents(".sub_list").find("dd a").removeClass("current");
		$(this).addClass("current");
		//return false;
	});
	$(".party_title h1").click(function(){
		if($(this).hasClass("tab1")){
			$(this).addClass("on1");
			$(this).siblings("h1").removeClass("on2");
			$(this).parent().find("a").hide().eq(0).show();
			$(".party_body .ui_list").hide().eq(0).show();
		}else if($(this).hasClass("tab2")){
			$(this).addClass("on2");
			$(this).siblings("h1").removeClass("on1");	
			$(this).parent().find("a").hide().eq(1).show();		
			$(".party_body .ui_list").hide().eq(1).show();
		}
	});
	
	$(".fc_motto_up").click(function(){
		$(this).parent().find(".fc_motto").css({"height":"auto","max-height":"255px","overflow":"auto"});
		$(this).parent().find(".fc_motto p:not('.motto_txt')").show();
		$(this).hide().parent().find(".fc_motto_down").show();
		return false;
	});
	$(".fc_motto_down").click(function(){
		$(this).parent().find(".fc_motto").css({"height":"60px","overflow":"hidden"});
		$(this).parent().find(".fc_motto").scrollTop(0);
		$(this).parent().find(".fc_motto p:not('.motto_txt')").hide();
		$(this).hide().parent().find(".fc_motto_up").show();
		return false;
	});
	
	//人员架构滚动
	var u_jg = false,t_jg,t1_jg,h_jg = 0;
	var h_body = $(".jg_body").height();
	var h_box = $(".jg").height();
	if(h_body > h_box){
		var h_scoll = h_body - h_box;
		$(".jg_down").addClass("jg_down_on");
		$(".jg_down").mousedown(function() {
			if($(this).hasClass("jg_down_on")){
				if(u_jg){
					t_jg = window.setInterval(function(){
						if(h_jg < h_scoll){
							h_jg++;
							$(".jg").scrollTop(h_jg);
							if(!$(".jg_up").hasClass("jg_up_on")){
								$(".jg_up").addClass("jg_up_on");
							}
						}else{
							window.clearInterval(t_jg);	
							$(".jg_down_on").removeClass("jg_down_on")
						}
					},10);
				}
			}
        }).mouseenter(function() {
			u_jg = true;
            
        }).mouseup(function(e) {
            //u_jg = false;
			window.clearInterval(t_jg);	
        }).mouseleave(function(e) {
            u_jg = false;
			window.clearInterval(t_jg);	
        });
		
		$(".jg_up").mousedown(function() {
			if($(this).hasClass("jg_up_on")){
				if(u_jg){
					t1_jg = window.setInterval(function(){
						if(h_jg > 0){
							h_jg--;
							$(".jg").scrollTop(h_jg);
							if(!$(".jg_down").hasClass("jg_down_on")){
								$(".jg_down").addClass("jg_down_on");
							}
						}else{
							window.clearInterval(t1_jg);	
							$(".jg_up_on").removeClass("jg_up_on")
						}
					},10);
				}
			}
		}).mouseenter(function() {
			u_jg = true;
			
		}).mouseup(function(e) {
			//u_jg = false;
			window.clearInterval(t1_jg);	
		}).mouseleave(function(e) {
			u_jg = false;
			window.clearInterval(t1_jg);	
		});
	}
	
	//
	$(".sub_list dt:contains('总行动态')").click(function(){
		window.location = "page8.html";
	})
	$(".sub_list dt:contains('工作动态')").click(function(){
		window.location = "page12.html";
	})
	$(".sub_list dt:contains('党团生活')").click(function(){
		window.location = "page11.html";
	})
	$(".sub_list dt:contains('规章制度与资料')").click(function(){
		window.location = "page13.html";
	})
	$(".sub_list dt:contains('员工风采')").click(function(){
		window.location = "page16.html";
	})
	
	$(window).scroll(function(e) {
		if($(this).scrollLeft() > 0){
			var z, sty = $(".header_bg").parent().attr("style")||"";
			if(sty.indexOf("zoom") > -1){
				z = (Number(sty.slice(sty.indexOf("zoom")+5,sty.indexOf("zoom")+9))-1).toFixed(2);
        		$(".header_bg,.nav_bg,.footer_bg").css({"min-width":$(window).width()-($(window).width()*z) + $(this).scrollLeft()});
				return false;
			}else if(sty.indexOf("scale") > -1){
				z = (Number(sty.slice(sty.indexOf("scale")+6,sty.indexOf("scale")+9))-1).toFixed(2);
        		$(".header_bg,.nav_bg,.footer_bg").css({"min-width":$(window).width()-($(window).width()*z) + $(this).scrollLeft()});
				return false;
			}else{
        		$(".header_bg,.nav_bg,.footer_bg").css({"min-width":$(window).width() + $(this).scrollLeft()});
			}
		}
    });
	
	//点击小图显示大图
	function popup_pic_box(pic_src){
		if(pic_src){
			$("body").append('<div class="pic_box_b_bg"></div><div class="pic_box_b" style="width:0;height:0;overflow:hidden;background: url(images/loading.gif) no-repeat center center;"><img src='+pic_src+' alt="" /><div class="close_pic_box">关闭</div></div>');
			$(".pic_box_b img").load(function(){
				$(".pic_box_b_bg").css({"width":$(window).width(),"height":$(document).height(),"position":"absolute","top":0,"left":0,"z-index":"999","background-color":"#000","opacity":.3});
				$(".close_pic_box").css({"position":"absolute","z-index":"1001","width":"30px","height":"30px","right":"-8px","top":"-8px","overflow":"hidden","text-indent":"-100px","cursor":"pointer","background":"url(images/close.png) no-repeat"});
				var window_w = $(window).width()*.9;
				var window_h = $(window).height()*.9;
				var pic_w = $(".pic_box_b img").width();
				var pic_h = $(".pic_box_b img").height();
				if(window_h < pic_h || window_w < pic_w){
					if(window_h/window_w < pic_h/pic_w){
						$(".pic_box_b img").css({"height":window_h,"width":"auto"});
						//var w1 = $(".pic_box_b img").width();
						$(".pic_box_b").css({"position":"absolute","z-index":"1000","top":"50%","margin-top":-window_h*.5+$(window).scrollTop(),"left":"50%","margin-left":-$(".pic_box_b img").width()*.5,"background-color":"#fff","padding":"5px"});
						$(".pic_box_b").css({"width":$(".pic_box_b img").width(),"height":window_h,"overflow":"visible"})
					}else{
						$(".pic_box_b img").css({"width":window_w,"height":"auto"});
						//var h1 = $(".pic_box_b img").height();
						$(".pic_box_b").css({"position":"absolute","z-index":"1000","left":"50%","margin-left":-window_w*.5,"top":"50%","margin-left":-$(".pic_box_b img").height()*.5+$(window).scrollTop(),"background-color":"#fff","padding":"5px"});
						$(".pic_box_b").css({"width":window_w,"height":$(".pic_box_b img").height(),"overflow":"visible"})
					};
				}else{
					$(".pic_box_b").css({"width":pic_w,"height":pic_h,"overflow":"visible"})
					$(".pic_box_b").css({"position":"absolute","z-index":"1000","top":"50%","margin-top":-pic_h*.5+$(window).scrollTop(),"left":"50%","margin-left":-pic_w*.5,"background-color":"#fff","padding":"5px"});
				}
				$(".close_pic_box,.pic_box_b_bg").click(function(){
					$(".pic_box_b_bg").remove();
					$(".pic_box_b").remove();
				});
			})
		}
	}
	$(".fc_list li .popup_b img").click(function(){
		var pic_src = $(this).attr("src");
		popup_pic_box(pic_src);
		return false;
	});
	
	//无障碍辅助
	$("#open_toolbar").click(function(){
		$.wen_plug_toolbar.showToolBar();
	})
	
});
