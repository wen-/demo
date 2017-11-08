/* 
 * js Document for ccb mobile
 * http://ccb.com/
 * wen CCB GEONG
 * http://www.geong.com/
 * Date: 2013-04-23
 */


$(function(){
	var tt1,tt2,mm={};
	//鼠标移到小图应用上显示详情
	var app_s1 = $("#app_s1").clone(true,true);
	var app_s2 = $("#app_s2").clone(true,true);
	$("#app_s1,#app_s2").remove();
	if(Modernizr.csstransforms3d){//判断是否支持CSS--3D样式，如果支持就用3D反转切换，不支持就上下切换
		function prefixStyle(style) {
			if ( cssVendor === '' ) return style;
			//style = style.charAt(0).toUpperCase() + style.substr(1);
			return cssVendor + style;
		};
		var dummyStyle = document.createElement('div').style,
		vendor = (function () {
			var vendors = 't,webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = vendors.length;
			for ( ; i < l; i++ ) {
				t = vendors[i] + 'ransform';
				if ( t in dummyStyle ) {
					return vendors[i].substr(0, vendors[i].length - 1);
				}
			}
			return false;
		})(),
		cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',
		
		// 还原样式前缀
		transformAll = prefixStyle('transform'),
		transitionAll = prefixStyle('transition'),
		transformStyleAll = prefixStyle('transformStyle'),
		backfaceVisibilityAll = prefixStyle('backfaceVisibility'),
		perspectiveAll = prefixStyle('perspective');
		//判断是否支持3D空间（IE10暂不支持）
		if(Modernizr.preserve3d){
			//$(".app_s:not(.recomend_s)").mouseenter(function(){}).mouseleave(function(){});
			$(".app_s:not(.recomend_s)").live("mouseenter",function(){//鼠标移进
				var $this = $(this);
				var _title = $(this).find("p.app_s_txt_t").html();
				var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
				$this.children(".app_s_pt").wrap('<div class="app_s_3d"></div>');
				clearTimeout(tt1);
				tt1=setTimeout(function(){
					$(".app_s").css({"background-color":"","box-shadow":""});
					$this.css({"background-color":"#ccc","box-shadow":"inset 0 0 6px #000"});
					$("div#app_s2").unwrap().remove();
					app_s2.find("p.app_s_txt_t").html(_title);
					app_s2.find("p.app_s_txt_d").html(_details);
					app_s2.appendTo($this.children(".app_s_3d")).css({"bottom":"auto"}).show();
					$this.children(".app_s_3d").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 180deg)');
				},1000);
			}).live("mouseleave",function(){
				var $this = $(this);
				clearTimeout(tt1);
				$this.children(".app_s_3d").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg)');
				setTimeout(function(){
					$(".app_s").css({"background-color":"","box-shadow":""});
					$("div#app_s2").unwrap().remove();
				},800);
			});
		}else{//悲催的IE10只支持一半的3D，换个思路实现反转
			$(".app_s:not(.recomend_s)").live("mouseenter",function(){
				var $this = $(this);
				var _title = $(this).find("p.app_s_txt_t").html();
				var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
				$this.children(".app_s_pt").wrap('<div class="app_s_3d"></div>');
				clearTimeout(tt1);
				tt1=setTimeout(function(){
					$("div#app_s2").unwrap().remove();
					app_s2.find("p.app_s_txt_t").html(_title);
					app_s2.find("p.app_s_txt_d").html(_details);
					$this.children(".app_s_3d").children(".app_s_pt").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 90deg)');
					setTimeout(function(){
						$this.children(".app_s_3d").children(".app_s_pt").hide();
						app_s2.prependTo($this.children(".app_s_3d")).css({"bottom":"auto"}).show();
						$this.children(".app_s_3d").children(".app_s2").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg)');
					},600);
					
				},1000);
			}).live("mouseleave",function(){//鼠标移出
				var $this = $(this);
				clearTimeout(tt1);
				$this.children(".app_s_3d").children(".app_s2").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 90deg)');
				setTimeout(function(){
					$this.children(".app_s_3d").children(".app_s2").hide();
					$this.children(".app_s_3d").children(".app_s_pt").show()
					$this.children(".app_s_3d").children(".app_s_pt").attr("style",transformAll+': translate3d(0px, 0px, 0px) rotate3d(0, 1, 0, 0deg)');
				},600);
			});
		};
		
	}else{
		$(".app_s:not(.recomend_s)").mouseenter(function(){}).mouseleave(function(){});
		$(".app_s:not(.recomend_s)").live("mouseenter",function(){
			var $this = $(this);
			var _title = $(this).find("p.app_s_txt_t").html();
			var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
			tt1=setTimeout(function(){
				app_s2.find("p.app_s_txt_t").html(_title);
				app_s2.find("p.app_s_txt_d").html(_details);
				app_s2.appendTo($this).css({"bottom":"auto"}).show().siblings(".app_s_pt").stop(true).animate({marginTop:"-198px"},200);
			},1000);
		}).live("mouseleave",function(){
			var $this = $(this);
			clearTimeout(tt1);
			$(".app_s_pt").stop(true).animate({marginTop:"0"},100,function(){
				$this.find("#app_s2").remove();
			});
		});
	}
	//鼠标移到大图应用上显示详情
	$(".recomend_s").mouseenter(function(){}).mouseleave(function(){});
	$(".recomend_s").live("mouseenter",function(){
		var $this = $(this);
		var _title = $(this).find("p.app_s_txt_t").html();
		var _details = $(this).parents("div.app_l").find("p.app_s_txt_d").text();
		tt2=setTimeout(function(){
			app_s1.find("p.app_s_txt_t").html(_title);
			app_s1.find("p.app_s_txt_d").html(_details);
			app_s1.appendTo($this).css({"bottom":"-115px"}).show().stop(true).animate({bottom:0},500);
		},1000);
	}).live("mouseleave",function(){
		var $this = $(this);
		clearTimeout(tt2);
		app_s1.animate({bottom:"-115px"},500,function(){
			$this.find("#app_s1").remove();
		});
	});
	$("div.input_t input").focus(function(){
		if($(this).val() == "请输入应用名或信息关键字"){
			$(this).val("").css({"color":"#000"});
		};
	}).blur(function(){
		if($(this).val() == ""){
			$(this).val("请输入应用名或信息关键字").css({"color":"#666"});
		};
	});
	//防止点击跳转
	$("div.app_l a").click(function(){});
	$("div.app_l a").live("click",function(){
		return false;
	});
	//点击应用显示详情弹出层
	$("#recomend_box .app_s").mouseup(function(e){});
	$("#recomend_box .app_s").mousedown(function(e){
		mm.x_str = e.pageX;
		mm.y_str = e.pageY;
	}).live("mouseup",function(e) {
		mm.x_end = e.pageX;
		mm.y_end = e.pageY;
		if(mm.x_str != mm.x_end){
			return false;
		}else{
			if($(this).hasClass("app_s")){
				mm.this_app = $(this).parents(".app_l");
				$("#popup .popup_app_list").html($(this).parents(".app_l").find(".popup_app_list").html());
			}else if($(this).hasClass("app_intro")){
				mm.this_intro = $(this).parents("tr");
			};
			$("#popup").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("#popup").height()/2?-$("#popup").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).fadeIn("slow").after('<div class="popup_bg"></div>');
	$("div.popup_bg").css({"width":$(window).width(),"height":$('body').height(),"position":"absolute","z-index":1000,"top":0,"left":0,"opacity":"0.4","background-color":"#000"});
		}
	});
	$("div.app_box_m .app_s").click(function(e){});
	$("div.app_box_m .app_s,a.app_intro,a.reward_msg,a.recomend_msg").live("click",function(){
		if($(this).hasClass("app_s")){
			mm.this_app = $(this).parents(".app_l");
			$("#popup .popup_app_list").html($(this).parents(".app_l").find(".popup_app_list").html());
			$(".popup_app_pic").wen_slide({speed:800,effect:"play1",page_style:"n_this"});
			$(".popup_par, .popup_next").show();
		}else if($(this).hasClass("app_intro")){
			mm.this_intro = $(this).parents("tr");
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt h3").html($(this).parents("tr").children("td").first().html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt .devloper_star").html($(this).parents("tr").children("td").eq(1).html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul li").eq(0).children("span").html($(this).parents("tr").children("td").eq(3).html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul li").eq(1).children("span").html($(this).parents("tr").children("td").eq(2).html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul li").eq(2).children("span").html($(this).parents("tr").children("td").eq(4).html());
			$(".popup_par, .popup_next").show();
		}else if($(this).hasClass("reward_msg")){
			mm.this_reward = $(this).parents("li");
			$("#popup .popup_app_list").html($(this).siblings(".reward_details").html());
			$(".popup_app_pic").wen_slide({speed:800,effect:"play1",page_style:"n_this"});
			$(".popup_par, .popup_next").show();
		}else if($(this).hasClass("recomend_msg")){
			mm.this_recomend = $(this).parents(".recomend_down");
			$("#popup .popup_app_list").html($(this).parents(".recomend_down").find(".recomend_details").html());
			$(".popup_app_pic").wen_slide({speed:800,effect:"play1",page_style:"n_this"});
			$(".popup_par, .popup_next").hide();		
		};
		$("#popup").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("#popup").height()/2?-$("#popup").height()/2:-$(window).height()/2+$(window).scrollTop()}).fadeIn("slow").after('<div class="popup_bg"></div>');
		$("div.popup_bg").css({"width":$(window).width(),"height":$('body').height(),"position":"absolute","z-index":1000,"top":0,"left":0,"opacity":"0.4","background-color":"#000"});
		return false;
	});
	$(".devloper_s").live("click",function(){
		$("#popup1").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("#popup").height()/2?-$("#popup").height()/2:-$(window).height()/2+$(window).scrollTop()}).fadeIn("slow").after('<div class="popup_bg"></div>');
		$("div.popup_bg").css({"width":$(window).width(),"height":$('body').height(),"position":"absolute","z-index":1000,"top":0,"left":0,"opacity":"0.4","background-color":"#000"});
		return false;
	});
	//登录框显示
	$("a.login_btn").live("click",function(){
		$(this).addClass("login_show");
		$("div.login_box").css({"left":"50%","top":"100px"}).slideDown("fast").after('<div class="login_box_bg popup1_box_bg absolute"></div>');
		$("div.login_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"109","top":0,"left":0,"background-color":"#000","opacity":"0.4"}).show();
	});
	//没登录加关注时显示登录框
	/*
	$("a.app_gz").live("click",function(){
		$("div.login_box").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("div.login_box").height()/2?-$("div.login_box").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).slideDown("fast").after('<div class="login_box_bg popup1_box_bg absolute"></div>');
		$("div.login_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"109","top":0,"left":0,"background-color":"#000","opacity":"0.4"}).show();
		return false;
	})
	*/
	$(".app_gz").click(function(){
		gz($(this));
		return false;
	});
	function gz(obj){
		var $this = obj;
		var h = $this.outerHeight();
		var w = $this.outerWidth();
		//var $msg = $(this).clone();
		$this.wrap('<span style="position:relative;display:inline-block;"></span>');
		$('<span class="msg"></span>').css({"display":"block","background-color":"#4CBF1A","color":"#fff","font-size":"14px","position":"absolute","right":0,"z-index":"100","display":"none","height":h,"width":w,"text-align":"center","line-height":h+"px"}).html("关注成功").insertAfter($this);
		$("span.msg").slideDown("slow",function(){
			$this.css({"background-color":"#ccc","cursor":"default"}).html("已关注").addClass("no_hover");
		}).delay(1000).animate({width:0},500,function(){
			$(this).remove();
			$this.unwrap().unbind("click").click(function(){return false;});
		});
	};
	//没登录时显示登录
	function showlogin(){
		$("div.login_box").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("div.login_box").height()/2?-$("div.login_box").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).slideDown("fast").after('<div class="login_box_bg popup1_box_bg absolute"></div>');
		$("div.login_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"109","top":0,"left":0,"background-color":"#000","opacity":"0.4"}).show();
	};
	//登录框关闭按钮
	$("div.close_login_box,div.login_box_bg").live("click",function(){
		$("div.login_box").slideUp("fast",function(){$("div.login_box_bg").remove();$("a.login_btn").removeClass("login_show");});
	});
	//checked-ico勾选框
	$("span.checked_ico").live("click",function(){
		if($(this).hasClass("on")){
			$(this).children("img").css({"width":0,"height":0,"margin-left":"10px","margin-top":"20px"}).css({"display":"block"}).animate({height:"26px",width:"33px",marginTop:0,marginLeft:0},400);
			$(this).addClass("checked_on on");
		}else{
			$(this).children("img").animate({height:"0px",width:"0px",marginTop:"20px",marginLeft:"10px"},300);;
			$(this).removeClass("checked_on on");
		}	
	});
	//点击弹出层关闭按钮
	$("div.popup_close").click(function(){
		$(".popup").fadeOut("slow");
		$("div.popup_bg").remove();
		/*$("#popup").animate({marginTop:parseInt($("#popup").css("marginTop"))+$("#popup").height()/2,height:"5px"},100,function(){
			$("#popup").animate({width:$(window).width(),left:0,marginLeft:0},50,function(){
				$("#popup").hide();
				$("div.popup_bg").hide("slow").remove();
			})
		});*/
	});
	//弹出层TAB
	$(".popup_app_tab h3").live("click",function(){
		var index = $(this).index();
		$(this).addClass("popup_tab_on").siblings().removeClass("popup_tab_on");
		$(this).parent().siblings(".popup_app_data").hide().eq(index).show();
	});
	//弹出层表单滚动
	$(".t1").each(function(index, element) {
		var p = true;
        var $pt = $(this).find("tr:first").clone();
		var $pt_parent = $('<table class="position"></table>').html($pt);
		$pt_parent.insertBefore($(this));
		$(this).scroll(function(){
			if($(this).scrollTop() > $(this).find("tr:first").height()*2){
				if(p){
					$pt_parent.fadeIn("slow");
					p=false;
				};
			}else{
				if(!p){
					$pt_parent.fadeOut("slow");
					p=true;
				}
			}
		});
    });
	
	//首页top排名
	$(".app_rank_pt").hide();
	$(".app_rank_on .app_rank_pt").show();
	$("div.app_rank_m li").mouseenter(function(){
		var $this = $(this);
		mm.rank=setTimeout(function(){
			$this.addClass("app_rank_on");
			$this.children(".app_rank_pt").slideDown();
			$this.siblings("li").removeClass("app_rank_on").children(".app_rank_pt").slideUp();
		},500);
	}).mouseleave(function(){
		var $this = $(this);
		clearTimeout(mm.rank);
	});
	//表单行鼠标移动背景色
	$(".app_list_m tr:not(:first)").hover(function(){
		$(this).addClass("tr_bg");
	},function(){
		$(this).removeClass("tr_bg");	
	});
	//我要反馈弹出层
	$("div.help_feedback a").click(function(){
		var x = $(this).offset().left;
		var y = $(this).offset().top;
		var w = $("div.feedback_box").width();
		
		$("div.feedback_box").css({"left":x,"top":y-100,"width":0,"height":"400px","overflow":"hidden"}).show().animate({left:x-w-4,width:w},800,function(){
			$(this).css({"height":"auto","overflow":"auto"});
		}).after('<div class="feedback_box_bg popup1_box_bg absolute"></div>');$("div.feedback_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"100","top":0,"left":0}).show();
		return false;
	});
	//我要反馈弹出层关闭
	$("div.close_feedback_box,div.feedback_box_bg").live("click",function(){
		$("div.feedback_box").fadeOut("fast",function(){$("div.feedback_box_bg").remove();});
	});
	//注册页面
	$("div.reg_btns input").click(function(){
		$(this).parents("div.reg_data").hide().next("div.reg_data").show();
		$("div.reg_step").hide().eq(1).show();
		return false;
	});
	//详情弹出层
	$("a.app_need_details").click(function(){
		$("div.details_box").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("div.details_box").height()/2?-$("div.details_box").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).fadeIn("fast").after('<div class="details_box_bg popup1_box_bg absolute"></div>');
		$("div.details_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"100","top":0,"left":0}).show();
		return false;
	});
	//详情弹出层关闭按钮
	$("div.close_details_box,div.details_box_bg").live("click",function(){
		$("div.details_box").fadeOut("fast",function(){$("div.details_box_bg").remove();});
	});
	//投标弹出层--上传应用
	$("a.app_bid,a.user7_btns").click(function(){
		
		//这个判断仅用于DEMO演示
		if($(this).hasClass("user7_btns")){
			mm.txt = "上传应用";
		}else{
			mm.txt = "";
		};
		$("div.bid_box").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()*0.5+$(window).scrollTop()>$("div.bid_box").height()/2?-$("div.bid_box").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).fadeIn("fast").after('<div class="bid_box_bg popup1_box_bg absolute"></div>');
		$("div.bid_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"100","top":0,"left":0}).show();
		return false;
	});
	//投标弹出层关闭按钮
	$("div.close_bid_box").live("click",function(){
		$("div.bid_box").fadeOut("fast",function(){
			$("div.bid_box_bg").remove();
			$("div.bid_upload_msg,div.bid_upload_bg").hide();
		});
	});
	$("div.bid_box_bg").live("click",function(){
		$("div.bid_box").fadeOut("fast",function(){
			$("div.bid_box_bg").remove();
			$("div.bid_upload_msg,div.bid_upload_bg").hide();
		});
	});
	//点击增加文件选择框
	var file_i = 1;
	$("span.add_new").click(function(){
		file_i++;
		var copyfile = $(this).parent("div.fake_file").clone(true);
		copyfile.find("span.add_new").unbind("click").addClass("add--").children("img").attr({src:"images/add--.png",alt:"删除"});
		copyfile.find("input").val("");
		copyfile.find(".fake_file_old").attr("name","num"+file_i);
		copyfile.appendTo($(this).parents("div.bid_document"));
	});
	$("span.add--").live("click",function(){
		$(this).parent("div.fake_file").remove();
	});
	//投标确定－－DEMO演示（开发自行修改）
	mm.upload = true;
	$("div.bid_btns span").click(function(){
		if(mm.upload){
			//成功上传
			$(this).parents(".bid_btns").siblings("div.bid_upload_bg").hide().css({"position":"absolute","width":$(this).parents("div.bid_box").width(),"height":$(this).parents("div.bid_box").height(),"top":0,"left":0,"z-index":103,"opacity":0.3,"background-color":"#000"}).slideDown("fast",function(){var $p = $(this).siblings("div.bid_upload_msg").children("p");$P_html = $p.html();$(this).siblings("div.bid_upload_msg").css({"top":"50%"}).fadeIn("fast",function(){setTimeout(function(){if(mm.txt == "上传应用"){$p.text("上传完毕！");}else{$p.text("上传完毕，投标成功！")};setTimeout(function(){$("div.bid_box").slideUp("fast",function(){$("div.bid_box_bg").remove();$("div.bid_upload_msg,div.bid_upload_bg").hide().attr("style","");$p.html($P_html);$("div.bid_box_bg").live("click",function(){$("div.bid_box").fadeOut("fast",function(){$("div.bid_box_bg").remove();$("div.bid_upload_msg,div.bid_upload_bg").hide();});});});},1500)},3000);})});
			mm.upload = false;
		}else{
			//上传失败
			$(this).parents(".bid_btns").siblings("div.bid_upload_bg").hide().css({"position":"absolute","width":$(this).parents("div.bid_box").width(),"height":$(this).parents("div.bid_box").height(),"top":0,"left":0,"z-index":103,"opacity":0.3,"background-color":"#000"}).slideDown("fast",function(){var $p = $(this).siblings("div.bid_upload_msg").children("p");$P_html = $p.html();$(this).siblings("div.bid_upload_msg").css({"top":"50%"}).fadeIn("fast",function(){setTimeout(function(){if(mm.txt == "上传应用"){$p.text("上传失败！请重新上传。");}else{$p.text("上传失败！请重新上传。")};setTimeout(function(){$("div.bid_upload_msg").hide().attr("style","");$("div.bid_upload_bg").slideUp("fast");$p.html($P_html);$("div.bid_box_bg").live("click",function(){$("div.bid_box").fadeOut("fast",function(){$("div.bid_box_bg").remove();$("div.bid_upload_msg,div.bid_upload_bg").hide();});});},1500)},3000);})});
			mm.upload = true;
		}		
	});
//});

//$(function(){
	$("#recomend").wen_slide({
		speed:800,
		pre_page:".pre_page",
		next_page:".next_page",
		page_style:"n_this",
		drag:true//,  
		//autoplay:true
	});
	$("#app_popup").wen_slide({
		speed:800,
		pre_page:".popup_par",
		next_page:".popup_next",
		pre_next:false,
		wen_back_start:function(self,a){
			if(a == "next"){
				if(mm.this_app){
					mm.this_app = mm.this_app.next().html()!=null?mm.this_app.next():mm.this_app.parent().children().first();
					self.ul.children("li").eq(1).find(".popup_app_list").html(mm.this_app.find(".popup_app_list").html());
				}else if(mm.this_intro){
					mm.this_intro = mm.this_intro.next().html()!=null?mm.this_intro.next():mm.this_intro.parent().children().first();
					self.ul.children("li").eq(1).find(".popup_app_dt h3").html(mm.this_intro.children("td").first().html());
					self.ul.children("li").eq(1).find(".popup_app_dt .devloper_star").html(mm.this_intro.children("td").eq(1).html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul li").eq(0).children("span").html(mm.this_intro.children("td").eq(3).html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul li").eq(1).children("span").html(mm.this_intro.children("td").eq(2).html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul li").eq(2).children("span").html(mm.this_intro.children("td").eq(4).html());
				}else if(mm.this_reward){
					mm.this_reward = mm.this_reward.next().html()!=null?mm.this_reward.next():mm.this_reward.parent().children().first();
					self.ul.children("li").eq(1).find(".popup_app_list").html(mm.this_reward.find(".reward_details").html());
				};
				$(".popup_app_pic").wen_slide({speed:800,effect:"play1",page_style:"n_this",page_copy:false});
			}else if(a == "pre"){
				if(mm.this_app){
					mm.this_app = mm.this_app.prev().html()!=null?mm.this_app.prev():mm.this_app.parent().children().last();
					self.ul.children("li").last().find(".popup_app_list").html(mm.this_app.find(".popup_app_list").html());
				}else if(mm.this_intro){
					mm.this_intro = mm.this_intro.prev().html()!=null?mm.this_intro.prev():mm.this_intro.parent().children().last();
					self.ul.children("li").last().find(".popup_app_dt h3").html(mm.this_intro.children("td").first().html());
					self.ul.children("li").last().find(".popup_app_dt .devloper_star").html(mm.this_intro.children("td").eq(1).html());
					self.ul.children("li").last().find(".popup_app_dt ul li").eq(0).children("span").html(mm.this_intro.children("td").eq(3).html());
					self.ul.children("li").last().find(".popup_app_dt ul li").eq(1).children("span").html(mm.this_intro.children("td").eq(2).html());
					self.ul.children("li").last().find(".popup_app_dt ul li").eq(2).children("span").html(mm.this_intro.children("td").eq(4).html());
				}else if(mm.this_reward){
					mm.this_reward = mm.this_reward.prev().html()!=null?mm.this_reward.prev():mm.this_reward.parent().children().last();
					self.ul.children("li").last().find(".popup_app_list").html(mm.this_reward.find(".reward_details").html());
				};
				$(".popup_app_pic").wen_slide({speed:800,effect:"play1",page_style:"n_this",page_copy:false});
			};
		}
	});
	$(".popup_app_pic").wen_slide({
		speed:800,
		effect:"play1",
		page_style:"n_this",
		page_copy:false
	});
	$("#home_news_box").wen_slide({
		speed:800,
		effect:"play0",
		pre_page:".pre_page",
		next_page:".next_page",
		page_style:"n_this"
	});
	$("#devloper_popup").wen_slide({
		speed:800,
		effect:"play0",
		pre_page:".popup_par",
		next_page:".popup_next",
		pre_next:false
	});
	$(".app_data").wen_slide({
		speed:800,
		effect:"play0",
		page_style:"n_this",
		page_copy:false
	});
	
});





//图片上传前预览
$(function(){
	$(".file_obj").change(function(evt){
		fileupload($(this)[0],evt);
	});
	/*
	$("div.user_btns input").live("click",function(){
		var i = 0;
		$(".fake_file_old").each(function(index, element) {
            if($(this).val()){
				i++;	
			}
        });
		if(i==0){
			alert("请选择要上传的文件！");
		}
	});
	*/
});

//获取文件名
function getFileName(str){
	var reg = /[^\\\/]*[\\\/]+/g;
	//xxx\或者是xxx/
	str = str.replace(reg,'');
	return str;
};

function fileupload(file_obj,evt){
if(!file_obj.value){
	return false;
}
if(evt.target.files){
	var files = evt.target.files;
	var file = files[0];
}
if (window.FormData) {
	formdata = new FormData();
}
var allowSuffix = $(file_obj).parents("li").hasClass("annex")?"txt,pdf,doc":"jpg,bmp,gif,png,jpeg";//.txt,.pdf,.doc,.jpg,.bmp,.gif,.png,允许上传文件的后缀名
var suffix=file_obj.value.substring(file_obj.value.lastIndexOf(".")+1).toLowerCase();//截取文件后缀名      
var browserVersion= window.navigator.userAgent.toUpperCase();//浏览器版本信息
//判断是否选取了图片格式的文件
if(allowSuffix.indexOf(suffix)>-1){
	
	//现代浏览器，支持html5 FILE api
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		//判断文件类型，低端浏览器不支持，以外层的判断即可
		/*
		alert(file.type);
		if(file.type.indexOf("image") === -1){
			alert('"' + file.name + '"' + ' 不是图片或不支持该格式!');
			return false;
		}
		*/
		//实例化file reader对象
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			window.URL = window.URL || window.webkitURL;
			if(!$(file_obj).parents("li").hasClass("annex")){
				if(window.URL){
					//现代浏览器直接用URL
					$(file_obj).parents("li").find(".img_show").attr("src",window.URL.createObjectURL(file));
				}else{
					//读取的内容base64来当路径如opera浏览器
					$(file_obj).parents("li").find(".img_show").attr("src",e.target.result);
				};  
			}else{
				var path = getFileName($(file_obj).val());
				$(file_obj).parents(".fake_file").find(".txt_show").val(path);
			}
		};
		/*
		if (formdata) {
            formdata.append("files[]", file);
        }
		$("div.user_btns input").die("click").live("click",function(){
			if (formdata && file_obj.value) {
				$.ajax({
					url: "upload.php",
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (res) {
						alert("保存成功");
						file_obj.value="";
						$(file_obj).parents(".fake_file").find(".path_show").val("");
					}
				});
			}else{
				alert("请选择要上传的文件！");	
			}
		})
		*/
	//不支持HTML5 FILE API
	}else{
		/*
		//调用隐藏iframe无刷新上传
		$("#upload_form").attr("target","up_load").after('<iframe id="up_load" name="up_load" style="display:none;"></iframe>');
		$("div.upload_btn").children().hide().end().append('<button type="submit">上 传</button>');
		*/
		//ie6直接赋值
		if(browserVersion.indexOf("MSIE 6.0")>-1){
			if(!$(file_obj).parents("li").hasClass("annex")){
				$(file_obj).parents("li").find(".img_show").attr("src",file_obj.value);
			}else{
				$(file_obj).parents(".fake_file").find(".txt_show").val($(file_obj).val());
			}
			
		//ie7\8\9由于安全限制，使用滤镜
		}else if(browserVersion.indexOf("MSIE 7.0")>-1 || browserVersion.indexOf("MSIE 8.0")>-1 || browserVersion.indexOf("MSIE 9.0")>-1){
			var imgobj = new Image();
			file_obj.select();
			$(file_obj).siblings().focus();//如果让file控件得到焦点的话会拒绝访问，所以让另一个元素取得焦点
			//console.log(document.selection.createRange().text);
			var path = document.selection.createRange().text;
			if(!$(file_obj).parents("li").hasClass("annex")){
				
				var newPreview =document.getElementById("new_img_show"+$(file_obj).parents("li").index());
				if(newPreview==null){
					newPreview =document.createElement("span");
					newPreview.setAttribute("id","new_img_show"+$(file_obj).parents("li").index());
					newPreview.style.width = $(file_obj).parents("li").find(".img_show").css("width");
					newPreview.style.height = $(file_obj).parents("li").find(".img_show").css("height");
					newPreview.style.display = "inline-block";
					newPreview.style.border="solid 1px #ccc";
				}
				newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + path + "')";                            
				$(file_obj).parents("li").find(".img_show").attr("style","display:none").after(newPreview);  
				$(file_obj).focus();
				
				//imgobj.src = path;
				//alert(imgobj.style.width);
				//setTimeout(function(){alert(imgobj.fileSize)},2000);
			}else{
				$(file_obj).parents(".fake_file").find(".txt_show").val(path);
				$(file_obj).focus();
			}
			
		//火狐7以下
		}else if(parseInt(window.navigator.userAgent.toUpperCase().slice(window.navigator.userAgent.toUpperCase().indexOf("FIREFOX")+8,window.navigator.userAgent.toUpperCase().indexOf("FIREFOX")+12))
	< 7){
			if(!$(file_obj).parents("li").hasClass("annex")){
				$(file_obj).parents("li").find(".img_show").attr("src", file.getAsDataURL());
			}else{
				$(file_obj).parents(".fake_file").find(".txt_show").val($(file_obj).val());
			}
			
		//其它未知
		}else{
			if(!$(file_obj).parents("li").hasClass("annex")){
				$(file_obj).parents("li").find(".img_show").attr("src",file_obj.value);
			}else{
				$(file_obj).parents(".fake_file").find(".txt_show").val($(file_obj).val());
			}
		};
	};
//如果不是图片文件
}else{
	alert("仅支持"+allowSuffix+"为后缀名的文件!");   
	//清空选中文件           
	file_obj.value="";
	if(browserVersion.indexOf("MSIE 7.0")>-1 || browserVersion.indexOf("MSIE 8.0")>-1 || browserVersion.indexOf("MSIE 9.0")>-1){
		file_obj.select();
		$(file_obj).siblings().focus();
		document.selection.clear();
	}                
	//file_obj.outerHTML=file_obj.outerHTML;
	$(file_obj).parents(".fake_file").find(".txt_show").val("");
};
};

$(function(){
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
	})(".js_marquee_notice");
	//play(".js_marquee_notice");
});