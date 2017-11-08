// JavaScript Document
/* 
 * JS Document for HUBEI Bank
 * wen_slide.js
 * Date: 2013-08-04
 */

$(function(){
	$("#ad_play").wen_slide({
		pre_page:"",           //上一个标签:#xxx/.xxx
		next_page:"",         //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		rotation:"left",               		//可选项：left\top
		autoplay:true,                		//自动播放：true(是)/false(否)
		effect:"play0",			       		//动画类型，随机random
		pre_next:false,                      //上下按钮是否可以隐藏
		page_copy:false,					    //复制页
		page_style:"current",                      //当前页码样式
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                     //回调2（动画开始前）
	});
	$("div.server_data").hover(function(){
		$(this).find("h3").addClass("hover");
	},function(){
		$(this).find("h3").removeClass("hover");
	});
	$("div.calculator_m li").hover(function(){
		$(this).addClass("hover").siblings("li").removeClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	$("div.quick_server_m li span").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	
	//导航栏鼠标移动弹出二级子菜单
	var d,d1;
	$(".nav_body").mouseenter(function(){
		$(".nav_menu_box").stop();
		d = window.setTimeout(function(){
			$(".nav_menu_box").slideDown(100);
		},500);
		//$(".popup_box_bg").css({"height":$(document).height(),"width":$(window).width(),"position":"absolute","top":"0","left":0,"z-index":"105"}).show();
	}).mouseleave(function(){
		window.clearTimeout(d);
		$(".nav_menu_box").slideUp(100);
	});
	$(".nav_menu_box").mouseenter(function(){
		$(this).stop().slideDown(100);
	}).mouseleave(function(){
		$(this).stop(true,true).slideUp(100);
	});
	//导航栏菜单鼠标移动对应每组子菜单背景灰
	$(".nav_body .child").hover(function(){
		var index = $(this).index()+1;
		$(".nav_menu"+index).addClass("gray_bg").siblings("ul").removeClass("gray_bg");
	},function(){
		var index = $(this).index()+1;
		$(".nav_menu"+index).removeClass("gray_bg");
	});
	//二级菜单弹出层每组鼠标移动背景灰
	$(".nav_menu_box ul").mouseenter(function(){
		$(this).addClass("gray_bg").siblings("ul").removeClass("gray_bg");
	});
	//网点地图
	$(".quick_ico3").click(function(){
		var x = $(this).offset().left;
		var y = $(this).offset().top;
		$(this).parent("a").addClass("current");
		$(".gps_box").fadeIn().css({"left":x-590,"top":y-140});
		$(".popup_box_bg").css({"position":"absolute","z-index":"103","top":0,"left":0,"width":$(window).width(),"height":$(document).height()}).show();
		return false;
	});
	//理财计算器
	$(".calculator_m li a").click(function(){
		var x = $(this).offset().left;
		var y = $(this).offset().top;
		$(".calculator_box_t h4").text($(this).text());
		$(this).parent("li").addClass("current");
		$(".calculator_box").fadeIn().css({"left":x-390,"top":y-240});
		$(".popup_box_bg").css({"position":"absolute","z-index":"103","top":0,"left":0,"width":$(window).width(),"height":$(document).height()}).show();
		return false;
	});
	//点击左下角二维码图片
	$("div.ewm").click(function(){
		var x = $(this).offset().left;
		var y = $(this).offset().top;
		$(".ewm_box").fadeIn().css({"left":x,"top":y-380});
		$(".popup_box_bg").css({"position":"absolute","z-index":"103","top":0,"left":0,"width":$(window).width(),"height":$(document).height()}).show();
		return false;
	});
	//弹出层的关闭按钮
	$(".close_box").click(function(){
		$(this).parents(".popup_box").fadeOut();
		$("div.popup_box_bg").hide();
		$(".quick_server_m li a,.calculator_m li").removeClass("current");
	});
	$("div.popup_box_bg").css({"opacity":".9"}).on("click",function(){
		$(this).hide();
		$("div.menu_box").slideUp();
		$(".gps_box,.calculator_box,.ewm_box").fadeOut();
		$(".quick_server_m li a,.calculator_m li").removeClass("current");
	});
	//动态新闻列表
	$(".trends_show").mouseenter(function(){
		$(this).parents("ul").find("li").removeClass("no_bg");
		$(this).parents("ul").find(".trends_show").show();
		$(this).parents("ul").find(".trends_pt").hide();
		$(this).parents("li").addClass("no_bg");
		$(this).hide().next(".trends_pt").show();
	})
	$(".news_show").mouseenter(function(){
		$(this).parents("ul").find("li").removeClass("no_bg");
		$(this).parents("ul").find(".news_show").show();
		$(this).parents("ul").find(".news_txt").hide();
		$(this).parents("li").addClass("no_bg");
		$(this).hide().next(".news_txt").show();
	})
	//二级菜单弹出层子项鼠标移动效果
	$(".nav_menu_box li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})
	//左侧菜单子项标题点击
	$(".sub_menu_m dt").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on current_on").next("dd").slideUp("fast",function(){
				//
				$(".details_body").css({"min-height":0});
				$(".sub_menu_m").css({"min-height":0});
				if($(".sub_menu_m").height()>$(".details_body").height()){
					$(".details_body").css({"min-height":$(".sub_menu_m").height()-38});
				}else{
					$(".sub_menu_m").css({"min-height":$(".details_body").height()+38});
				};
			});
			$(this).parents(".sub_menu_m").find("dt").removeClass("current_on current_off");
			//$(this).parents(".sub_menu_m").find("dd").slideUp();
		}else{
			$(this).parents(".sub_menu_m").find("dt").removeClass("current_on current_off");
			//$(this).parents(".sub_menu_m").find("dd").slideUp();
			$(this).addClass("on current_on").next("dd").slideDown("fast",function(){
				//
				$(".details_body").css({"min-height":0});
				$(".sub_menu_m").css({"min-height":0});
				if($(".sub_menu_m").height()>$(".details_body").height()){
					$(".details_body").css({"min-height":$(".sub_menu_m").height()-38});
				}else{
					$(".sub_menu_m").css({"min-height":$(".details_body").height()+38});
				};
			});
		}
		
	});
	//左侧菜单子项点击
	/*
	$(".sub_menu_m dd li a").click(function(){
		//$(this).parents(".sub_menu_m").find("dt").removeClass("current current_off");
		$(this).parents(".sub_menu_m").find("li").removeClass("current");
		$(this).parent("li").addClass("current");
		//$(this).parents("dd").prev("dt").addClass("current current_off");
		return false;
		//
		$(".details_body").css({"min-height":"auto"});
		$(".sub_menu_m").css({"min-height":"auto"});
		if($(".sub_menu_m").height()>$(".details_body").height()){
			$(".details_body").css({"min-height":$(".sub_menu_m").height()-38});
		}else{
			$(".sub_menu_m").css({"min-height":$(".details_body").height()+38});
		};
	});
	*/
	$(".sub_menu_m dd li a").click(function(){
		$(this).parents("dd").find(".child_t").removeClass("current current_off");
		$(this).parents(".sub_menu_m").find("li").removeClass("current");
		$(this).parent("li").addClass("current");
		$(this).parents(".child_box").prev(".child_t").addClass("current current_off");
		//
		$(".details_body").css({"min-height":0});
		$(".sub_menu_m").css({"min-height":0});
		if($(".sub_menu_m").height()>$(".details_body").height()){
			$(".details_body").css({"min-height":$(".sub_menu_m").height()-38});
		}else{
			$(".sub_menu_m").css({"min-height":$(".details_body").height()+38});
		};
		return false;
	});
	$(".sub_menu_m .child_t").click(function(){
		if($(this).hasClass("on")){
			$(this).parents("li").removeClass("child_on");
			$(this).css({"background-color":""});
			$(this).removeClass("on").next("ul").slideUp();
		}else{
			$(this).parents("ul").find(".child_on").removeClass("child_on");
			$(this).parents("ul").find(".child_t").removeClass("on");
			$(this).parents("ul").find(".child_box").slideUp();
			$(this).parents("li").addClass("child_on");
			$(this).css({"background-color":"#ebebeb"});
			$(this).addClass("on").next("ul").slideDown();
		}
		//
		$(".details_body").css({"min-height":0});
		$(".sub_menu_m").css({"min-height":0});
		if($(".sub_menu_m").height()>$(".details_body").height()){
			$(".details_body").css({"min-height":$(".sub_menu_m").height()-38});
		}else{
			$(".sub_menu_m").css({"min-height":$(".details_body").height()+38});
		};
	});
	$(".sub_menu_refactor .child_t").click(function(){
		if($(this).hasClass("on")){
			$(this).parents("li").removeClass("child_on");
			$(this).css({"background-color":""});
			$(this).removeClass("on").next("ul").slideUp();
		}else{
			$(this).parents("ul").find(".child_on").removeClass("child_on");
			$(this).parents("ul").find(".child_t").removeClass("on");
			$(this).parents("ul").find(".child_box").slideUp();
			$(this).parents("li").addClass("child_on");
			$(this).css({"background-color":"#ebebeb"});
			$(this).addClass("on").next("ul").slideDown();
		}
	});
	//左侧菜单与右侧内容高度
	if($(".sub_menu_m").height()>$(".details_body").height()){
		$(".details_body").css({"min-height":$(".sub_menu_m").height()-38});
	}else{
		$(".sub_menu_m").css({"min-height":$(".details_body").height()+38});
	};
	
	$(".sub_menu_refactor dt.child").click(function(){
		if($(this).hasClass("child_on")){
			$(this).removeClass("child_on");
			$(this).next("dd").slideUp();
		}else{
			$(this).addClass("child_on");
			$(this).next("dd").slideDown();
		}
	});
	//右侧栏
	if(navigator.userAgent.indexOf("MSIE 6")>-1){
		var top = parseInt($(".float_menu").css("top"));
		var h = $(document).height(),h1 = $(window).height();
		$(window).scroll(function(){
			var t = $(document).scrollTop();
			if(t > top-100 && t<h-h1){
				$(".float_menu").css({"top":t+100});
				//$(".float_menu").animate({"top":t+100},100);
			};
		});
	}
	$(".go_top").click(function(){
		var t = $(window).scrollTop();
		var s = window.setInterval(function(){
			t=t-20;
			if(t<=0){
				t=0;	
				window.clearInterval(s);
			}
			$(window).scrollTop(t);
		},10);
		return false;
	});
	
	//产品推荐
	$("#recommend_play").wen_play({
		show_n : "3",
		page_show:"pre_next",
		pre_page:"recommend_pre",
		next_page:"recommend_next",
		speed:800
	});
	//业务服务
	$("#server_play").wen_play({
		show_n : "3",
		page_show:"pre_next",
		pre_page:"server_pre",
		next_page:"server_next",
		speed:800
	});
	
	
	
	$(".server_list li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	
});


//轮播插件
(function($){
	$.fn.wen_play = function(options){
		var defaultVal = {
			show_n : "1",					
			page_show:"pre_next",			//页码显示方式决定了切换方式，"pre_next"/"num"/"num_opacity"
			pre_page:"wen_pre_page",		//上面选择"pre_next"才要设置上按钮的样式
			next_page:"wen_next_page",		//上面选择"pre_next"才要设置下按钮的样式
			hover:false,					//上面选择"pre_next"才要设置是否隐藏上下按钮，鼠标移到其上显示
			speed:800,						//切换时间间隔
			autoplay:false,					//是否为自动播放
			autospeed:3000,					//自动播放时间间隔
			star_fn:"",						//回调切换开始前；选择"pre_next",才会有第三个参数
			end_fn:""						//回调切换开始后；参数：$li列表、n当前页、pre/next点了上还是下
		};
		var obj = $.extend(defaultVal,options);
		return this.each(function(){
			var $this = $(this);
			var i = 1,n=0,autoplay;
			var $li = $this.find(".play_list");
			var $li_1 = $li.eq(0);
			var li_w = $li_1.outerWidth(true);
			var li_n = $li.length;
			var $ul = $this.find(".wen_play_box");
			$ul.width(Math.ceil(li_w*li_n));
			if(li_n <= obj.show_n){
				return false;
			};
			if(obj.page_show == "pre_next"){
				var page_html = '<div class="'+obj.pre_page+'">pre</div><div class="'+obj.next_page+'">next</div>';
				$this.append(page_html);
				
				$this.children('.'+obj.pre_page).click(function(){
					play.pre();
				});
				$this.children('.'+obj.next_page).click(function(){
					play.next();
				});
				if(obj.hover){
					$(this).children('.'+obj.pre_page).hide();
					$(this).children('.'+obj.next_page).hide();
					$this.hover(function(){
						$(this).children('.'+obj.pre_page).fadeIn();
						$(this).children('.'+obj.next_page).fadeIn();
					},function(){
						$(this).children('.'+obj.pre_page).fadeOut();
						$(this).children('.'+obj.next_page).fadeOut();
					});
				};
			}else if(obj.page_show == "num" || obj.page_show == "num_opacity"){
				var page = [];
				for(var i=0;i<li_n;i++){
					if(i>0){
						page.push('<span>'+(i+1)+'</span>');
					}else{
						page.push('<span class="current">'+(i+1)+'</span>');
					}
				}
				var page_html = '<div class="wen_page">'+page.join("")+'</div>';
				$this.append(page_html);
				if(obj.page_show == "num_opacity"){
					$li.css({"position":"absolute"}).hide().eq(0).show();
				};
				$this.children(".wen_page").children("span").click(function(){
					var i = $(this).index();
					$(this).addClass("current").siblings().removeClass("current");
					if(obj.page_show == "num"){
						play.num(i);
					}else{
						play.num_opacity(i);
					}
				});
			};
			if(obj.autoplay){
				var i_auto = 0;
				$this.hover(function(){
					window.clearInterval(autoplay);
				},function(){
					if(obj.page_show == "pre_next"){
						autoplay = window.setInterval(function(){
							$this.children('.'+obj.next_page).trigger("click");
						},obj.autospeed);
					}else if(obj.page_show == "num" || obj.page_show == "num_opacity"){
						autoplay = window.setInterval(function(){
							$this.children(".wen_page").children("span").eq(i_auto).trigger("click");
							//console.log(i_auto);
							i_auto++
							if(i_auto>li_n-1){
								i_auto = 0;	
							}
						},obj.autospeed);
					}
				})
				$this.trigger("mouseleave");
			}
			//动画类型
			var play = {
				/*option:{
					$new_li:$this.find(".play_list"),
					li_w:$new_li.eq(0).outerWidth(true)
				},*/
				next:function(){
					var $new_li = $this.find(".play_list"),
					li_w = $new_li.eq(0).outerWidth(true);
					if(! $ul.is(":animated")){
						if(n<li_n-1){
							++n;
						}else{
							n=0;
						}
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n,"next");	
						}
						$ul.animate({"left":-li_w},obj.speed,function(){
							$new_li.first().appendTo($ul);
							$ul.css({"left":"0"});
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n,"next");	
							}
						});
					};
				},
				pre:function(){
					var $new_li=$this.find(".play_list"),
					li_w=$new_li.eq(0).outerWidth(true);
					if(! $ul.is(":animated")){
						if(n<=0){
							n=li_n-1;
						}else{
							--n;
						};
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n,"pre");	
						}
						$new_li.last().prependTo($ul);
						$ul.css({"left":-li_w});
						$ul.animate({"left":"0"},obj.speed,function(){
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n,"pre");	
							}
						});	
					};
				},
				num:function(n){
					var $new_li=$this.find(".play_list"),
					li_w=$new_li.eq(0).outerWidth(true);
					if(! $ul.is(":animated")){
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n);	
						}
						$ul.animate({"left":-li_w*n},obj.speed,function(){
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n);	
							}
						});	
					}
				},
				num_opacity:function(n){
					if(! $ul.is(":animated")){
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n);	
						}
						$li.eq(n).fadeIn(obj.speed,function(){
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n);	
							}
						}).siblings().fadeOut(obj.speed);	
					}
				}
			};
		});
	};
})(jQuery);