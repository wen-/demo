// JavaScript Document
$(function(){
	//无障碍辅助
	$.wen_plug_toolbar.initialize();
	$("#open_toolbar").click(function(){
		$(this).parents(".toolbar_t").hide();
		$(".version_info").css({"top":"auto"});
		$.wen_plug_toolbar.showToolBar();
	})
	$("#barClose").click(function(){
		$(".toolbar_t").show();
		$(".version_info").css({"top":"-40px"});
	});
	
	//顶部搜索框
	$(".i_txt").focus(function(){
		if($(this).val() == "请输入关键字"){
			$(this).val("").css({"color":"#000"});
		}
	}).blur(function(){
		if($(this).val() == "请输入关键字" || $(this).val() == ""){
			$(this).val("请输入关键字").css({"color":"#6D6F70"});
		}
	})
	
	//主广告
	$("#ad_play").wen_slide({
		speed:800,             //过渡时间：越大越慢
		rotation:"left",       //可选项：left\top
		autoplay:true,         //自动播放：true(是)/false(否)
		auto_speed:5000,       //自动播放时间间隔
		effect:"play1",		   //动画类型
		pre_next:false,        //上下按钮是否可以隐藏
		page_copy:false,	   //复制页
		page_style:"current",  //当前页码样式
		wen_back:"",           //回调1(动画结束)
		wen_back_start:"",      //回调2（动画开始前）
		pre_next_yese:true
	});
	//导航菜单
	$(".header_bg").hover(function(){
		$(".nav_menu_box").show();
	},function(){
		$(".nav_menu_box").hide();
	});
	var t,t1;
	/*
	$(".nav .child").hover(function(){
		var $this = $(this);
		window.clearTimeout(t);
		t = window.setTimeout(function(){
			$(".sub_menu").css({"top":$this.offset().top + $this.height() + 3,"_top":$this.offset().top + $this.height()-5,"left":$this.offset().left}).show();
		},600);
	},function(){
		window.clearTimeout(t);
		t=window.setTimeout(function(){
			$(".sub_menu").hide();
		},1000)
		
	});
	
	$(".sub_menu").hover(function(){
		window.clearTimeout(t);
		$(this).show();
	},function(){
		window.clearTimeout(t);
		$(".sub_menu").hide();
	})
	
	$(".sub_menu li").hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	})
	*/
	//快捷栏
	$(".nav_safe").hover(function(){
		window.clearTimeout(t1);
		$(this).siblings().find("h1").removeClass("on");
		
		$(this).siblings().find(".arrow").hide();
		$(this).siblings().find(".wy_popup,.hot_popup,.serve_popup").hide();
		
		$(this).children("h1").addClass("on")
		$(this).children(".safe_popup").show();
		
		
		
		$(".bg_js_blur").show();
		$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").show();
		
	},function(){
		var $this = $(this);
		t1=window.setTimeout(function(){
			$this.children("h1").removeClass("on")
			$this.children(".safe_popup,.arrow").hide();
			$(".bg_js_blur").hide();
		  	$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").hide();
		},500)
	})
	
	$(".nav_wy").hover(function(){
		window.clearTimeout(t1);
		$(this).siblings().find("h1").removeClass("on");
		$(this).siblings().find(".arrow").hide();
		$(this).siblings().find(".safe_popup,.hot_popup,.serve_popup").hide();
		$(this).children("h1").addClass("on")
		$(this).children(".wy_popup,.arrow").show();
		$(".bg_js_blur").show();
			$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").show();
	},function(){
		var $this = $(this);
		t1=window.setTimeout(function(){
			$this.children("h1").removeClass("on")
			$this.children(".wy_popup,.arrow").hide();
			$(".bg_js_blur").hide();
		   	$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").hide();
		},500)
	})
	
	$(".nav_hot").hover(function(){
		window.clearTimeout(t1);
		$(this).siblings().find("h1").removeClass("on");
		$(this).siblings().find(".arrow").hide();
		$(this).siblings().find(".safe_popup,.wy_popup,.serve_popup").hide();
		$(this).children("h1").addClass("on")
		$(this).children(".hot_popup,.arrow").show();
	$(".bg_js_blur").show();
			$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").show();
	},function(){
		var $this = $(this);
		t1=window.setTimeout(function(){
			$this.children("h1").removeClass("on")
			$this.children(".hot_popup,.arrow").hide();
			$(".bg_js_blur").hide();
		  	$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").hide();
		},500)
	})
	
	$(".nav_serve").hover(function(){
		window.clearTimeout(t1);
		$(this).siblings().find("h1").removeClass("on");
		$(this).siblings().find(".arrow").hide();
		$(this).siblings().find(".safe_popup,.wy_popup,.hot_popup").hide();
		$(this).children("h1").addClass("on")
		$(this).children(".serve_popup,.arrow").show();
		$(".bg_js_blur").show();
		$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").show();
	},function(){
		var $this = $(this);
		t1=window.setTimeout(function(){
			$this.children("h1").removeClass("on")
			$this.children(".serve_popup,.arrow").hide();
			$(".bg_js_blur").hide();
		   	$(".bg_js_blur_border,.bg_js_blur_border2,.bg_js_blur_border3,.bg_js_blur_border4,.bg_js_blur_border5,.bg_js_blur_border6,.bg_js_blur_border7,.bg_js_blur_border8").hide();
		},500)
	})
	$(document).click(function(e){
		var e = e || window.event;
		var targ = e.target || e.srcElement;
		if( !$(targ).parents().is(".quick_nav") && targ.nodeName != "A" ){
			$(".quick_nav h1").removeClass("on");
			$(".safe_popup,.wy_popup,.hot_popup,.serve_popup").hide();
		}
	});
	
	//公告列表
	$(".msg_content li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})
	
	//重要公告
	$(".close_important_msg").click(function(){
		$(this).parents(".important_msg").slideUp();
	})
	
	//浮动侧栏
	$(".close_float_menu").click(function(){
		$(this).parents(".float_menu").slideUp();
	});
	
	$("#hot_play").wen_slide({
		pre_page:".hot_pre_page",           
		next_page:".hot_next_page",          
		speed:800,             
		pre_next:false,        
		page_copy:false	   
	});
	/*
	$("#preferential_play").wen_slide({
		pre_page:".preferential_pre_page",           
		next_page:".preferential_next_page",          
		speed:800,             
		pre_next:false,        
		page_copy:false	   
	});
	*/
	$("#solution_play").wen_slide({
		page_show:"num",        
		speed:800,     
		page_style:"current",  
		effect:"play1",
		autoplay:true,                		
		auto_speed:3000,               		
		pre_next:false,        
		page_copy:false	   
	});
	
	$(window).scroll(function(){
		if($(window).scrollTop()+$(window).height() < $(".important_msg").offset().top){
			if(navigator.userAgent.indexOf("MSIE 6")>-1){
				$(".important_msg_m").css({"position":"static","margin-left":"auto"});
			}else{
				$(".important_msg_m").css({"position":"relative"});
			}
		}else{
			if(navigator.userAgent.indexOf("MSIE 6")>-1){
				$(".important_msg_m").css({"position":"absolute","margin-left":"-200px"});
			}else{
				$(".important_msg_m").css({"position":"fixed"});
			}
		}
	});
	
	/*首页消息滚动 js_marquee_notice */
	(function play(obj){
		jQuery(obj).each(function(){
			var $root = jQuery(this);
			var $items = $root.find('li');
			var i_height = $items.height();
			var i_count = $items.length;
			var interval_ms = 3000;
			var animate_speed = 'fast';
			var stop_flag = false;
			var cur_idx = 0;
			//clone(items)
			$root.append($items.clone(true));
			var interval_handler = null;
			if ( i_count > 1 ){
				window.clearInterval(interval_handler);
				interval_handler = window.setInterval(function(){
					if ( stop_flag ){
						return false;
					}
					cur_idx = ++cur_idx;
					var need_jump = false;
					if ( cur_idx >= i_count ){
						need_jump = true;
					}
					if( need_jump ){
						$root.stop().animate({top:-cur_idx*i_height},animate_speed,function(){
							$root.css({"top":0})
						});
						cur_idx = 0;
					}else{
						$root.stop().animate({top:-cur_idx*i_height},animate_speed);
					}
				},interval_ms);
			}
			$root.hover(function(){
				stop_flag = true;
			},function(){
				stop_flag = false;
			});
		}); 
	})(".important_msg_play ul");
	
	
	
	
	/*首页优惠快讯*/
	$(".more_button_main").click(function(){
		$(".kuaixun_more").slideDown("slow");
		$(".more_button").hide();
		$(".more_button_hide").show();
	})
	
	$(".more_button_main_hide").click(function(){
		$(".kuaixun_more").slideUp("slow");
		$(".more_button_hide").hide();
		$(".more_button").show();
	})
	
	
//浮动鼠标经过特效
$(".index_hide").mouseenter(function(){
	$(this).hide();
	$(this).next("#index_show").show(); 
	$(this).next("#index_show").mouseleave(function(){ 
	$(this).prev(".index_hide").show();
	$(this).hide();
	
	 }); });

	
});
