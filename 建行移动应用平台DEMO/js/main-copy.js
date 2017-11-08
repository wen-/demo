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
				var _details = $(this).find("p.app_s_txt_d").html();
				clearTimeout(tt1);
				tt1=setTimeout(function(){
					$(".app_s").css({"background-color":"","box-shadow":""});
					$this.css({"background-color":"#ccc","box-shadow":"inset 0 0 6px #000"});
					app_s2.find("p.app_s_txt_t").html(_title);
					app_s2.find("p.app_s_txt_d").html(_details);
					app_s2.appendTo($this).css({"bottom":"auto","background-color":"transparent"}).show();
					$('<div class="door_l"></div>').appendTo($this).css({"height":$this.height(),"width":$this.width()/2-1,"border-right":"solid 1px #ccc","background-color":"#fff","position":"absolute","z-index":"100","left":"0","top":"0"});
					$('<div class="door_r"></div>').appendTo($this).css({"height":$this.height(),"width":$this.width()/2-1,"border-left":"solid 1px #ccc","background-color":"#fff","position":"absolute","z-index":"100","right":"0","top":"0"});
					$this.children(".app_s_pt").fadeOut(500,function(){
						$("div.door_l").animate({width:0},300);
						$("div.door_r").animate({width:0},300);
					});
				},1000);
			}).live("mouseleave",function(){
				var $this = $(this);
				clearTimeout(tt1);
				$("div.door_l").animate({width:$this.width()/2-1},200);
				$("div.door_r").animate({width:$this.width()/2-1},200,function(){
					$this.children(".app_s_pt").fadeIn(500,function(){
						$("div.door_l,div.door_r,div#app_s2").remove();
						$(".app_s").css({"background-color":"","box-shadow":""});
					});
				});
			});
		}else{//悲催的IE10只支持一半的3D，换个思路实现反转
			$(".app_s:not(.recomend_s)").live("mouseenter",function(){
				var $this = $(this);
				var _title = $(this).find("p.app_s_txt_t").html();
				var _details = $(this).find("p.app_s_txt_d").html();
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
			var _details = $(this).find("p.app_s_txt_d").html();
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
		var _details = $(this).find("p.app_s_txt_d").html();
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
				$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt h3").html($(this).find(".app_s_txt_t strong").html())
			}else if($(this).hasClass("app_intro")){
				mm.this_intro = $(this).parents("tr");
			};
			$("#popup").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()/2+$(window).scrollTop()>$("#popup").height()/2?-$("#popup").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).fadeIn("slow").after('<div class="popup_bg"></div>');
	$("div.popup_bg").css({"width":$(window).width(),"height":$('body').height(),"position":"absolute","z-index":1000,"top":0,"left":0,"opacity":"0.4","background-color":"#000"});
		}
	});
	$("div.app_box_m .app_s").click(function(e){});
	$("div.app_box_m .app_s,a.app_intro").live("click",function(){
		if($(this).hasClass("app_s")){
			mm.this_app = $(this).parents(".app_l");
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt h3").html($(this).find(".app_s_txt_t strong").html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul").html($(this).find(".app_s_details ul").html());
		}else if($(this).hasClass("app_intro")){
			mm.this_intro = $(this).parents("tr");
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt h3").html($(this).parents("tr").children("td").first().html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt .devloper_star").html($(this).parents("tr").children("td").eq(1).html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul li").eq(0).children("span").html($(this).parents("tr").children("td").eq(3).html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul li").eq(1).children("span").html($(this).parents("tr").children("td").eq(2).html());
			$("div.app_popup_box").children("ul").children("li").first().find(".popup_app_dt ul li").eq(2).children("span").html($(this).parents("tr").children("td").eq(4).html());
		};
		$("#popup").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()/2+$(window).scrollTop()>$("#popup").height()/2?-$("#popup").height()/2:-$(window).height()/2+$(window).scrollTop()}).fadeIn("slow").after('<div class="popup_bg"></div>');
		$("div.popup_bg").css({"width":$(window).width(),"height":$('body').height(),"position":"absolute","z-index":1000,"top":0,"left":0,"opacity":"0.4","background-color":"#000"});
		return false;
	});
	//登录框显示
	$("a.login_btn").click(function(){
		$(this).addClass("login_show");
		
		$("div.login_box").slideDown("fast").after('<div class="login_box_bg popup1_box_bg absolute"></div>');
		$("div.login_box_bg").css({"height":$("body").height(),"width":$(window).width(),"z-index":"100","top":0,"left":0}).show();
	});
	//登录框关闭按钮
	$("div.close_login_box,div.login_box_bg").live("click",function(){
		$("div.login_box").slideUp("fast",function(){$("div.login_box_bg").remove();$("a.login_btn").removeClass("login_show");});
	});
	//checked-ico勾选框
	$("span.checked_ico").toggle(function(){
		$(this).children("img").css({"width":0,"height":0,"margin-left":"10px","margin-top":"20px"}).css({"display":"block"}).animate({height:"26px",width:"33px",marginTop:0,marginLeft:0},400);
		$(this).addClass("checked_on");
		
	},function(){
		$(this).children("img").animate({height:"0px",width:"0px",marginTop:"20px",marginLeft:"10px"},300);;
		$(this).removeClass("checked_on");
	});
	//点击弹出层关闭按钮
	$("div.popup_close").click(function(){
		$("#popup").fadeOut("slow");
		$("div.popup_bg").remove();
		/*$("#popup").animate({marginTop:parseInt($("#popup").css("marginTop"))+$("#popup").height()/2,height:"5px"},100,function(){
			$("#popup").animate({width:$(window).width(),left:0,marginLeft:0},50,function(){
				$("#popup").hide();
				$("div.popup_bg").hide("slow").remove();
			})
		});*/
	});
	//弹出层TAB
	$(".popup_app_tab h3").click(function(){
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
		$("div.details_box").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()/2+$(window).scrollTop()>$("div.details_box").height()/2?-$("div.details_box").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).fadeIn("fast").after('<div class="details_box_bg popup1_box_bg absolute"></div>');
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
		$("div.bid_box").css({"top":$(window).height()/2+$(window).scrollTop(),"margin-top":$(window).height()/2+$(window).scrollTop()>$("div.bid_box").height()/2?-$("div.bid_box").height()/2:(-$(window).height()/2)+$(window).scrollTop()}).fadeIn("fast").after('<div class="bid_box_bg popup1_box_bg absolute"></div>');
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
	//文件选择
	$("div.fake_file a").click(function(){
		$(this).prev("input:file").click();
		return false;
	});
	//点击增加文件选择框
	$("span.add_new").click(function(){
		var copyfile = $(this).parent("div.fake_file").clone(true);
		copyfile.find("span.add_new").unbind("click").addClass("add--").children("img").attr({src:"images/add--.png",alt:"删除"});
		copyfile.find("input").val("");
		copyfile.appendTo($(this).parents("div.bid_document"));
	});
	$("span.add--").live("click",function(){
		$(this).parent("div.fake_file").remove();
	});
	$("input.fake_file_old").change(function(){
		$(this).prev("input:text").val($(this).val());
	});
	//投标确定－－DEMO演示（开发自行修改）
	$("div.bid_btns span").click(function(){
		$("div.bid_box_bg").die();
		$(this).parents(".bid_btns").siblings("div.bid_upload_bg").hide().css({"position":"absolute","width":$(this).parents("div.bid_box").width(),"height":$(this).parents("div.bid_box").height(),"top":0,"left":0,"z-index":103,"opacity":0.3,"background-color":"#000"}).slideDown("fast",function(){var $p = $(this).siblings("div.bid_upload_msg").children("p");$P_html = $p.html();$(this).siblings("div.bid_upload_msg").css({"top":"50%"}).fadeIn("fast",function(){setTimeout(function(){if(mm.txt == "上传应用"){$p.text("上传完毕！");}else{$p.text("上传完毕，投标成功！")};setTimeout(function(){$("div.bid_box").slideUp("fast",function(){$("div.bid_box_bg").remove();$("div.bid_upload_msg,div.bid_upload_bg").hide().attr("style","");$p.html($P_html);$("div.bid_box_bg").live("click",function(){$("div.bid_box").fadeOut("fast",function(){$("div.bid_box_bg").remove();$("div.bid_upload_msg,div.bid_upload_bg").hide();});});});},1500)},3000);})});
		
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
					self.ul.children("li").eq(1).find(".popup_app_dt h3").html(mm.this_app.find(".app_s_txt_t strong").html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul").html(mm.this_app.find(".app_s_details ul").html());
				}else if(mm.this_intro){
					mm.this_intro = mm.this_intro.next().html()!=null?mm.this_intro.next():mm.this_intro.parent().children().first();
					self.ul.children("li").eq(1).find(".popup_app_dt h3").html(mm.this_intro.children("td").first().html());
					self.ul.children("li").eq(1).find(".popup_app_dt .devloper_star").html(mm.this_intro.children("td").eq(1).html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul li").eq(0).children("span").html(mm.this_intro.children("td").eq(3).html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul li").eq(1).children("span").html(mm.this_intro.children("td").eq(2).html());
					self.ul.children("li").eq(1).find(".popup_app_dt ul li").eq(2).children("span").html(mm.this_intro.children("td").eq(4).html());
				};
			}else if(a == "pre"){
				if(mm.this_app){
					mm.this_app = mm.this_app.prev().html()!=null?mm.this_app.prev():mm.this_app.parent().children().last();
					self.ul.children("li").last().find(".popup_app_dt h3").html(mm.this_app.find(".app_s_txt_t strong").html());
					self.ul.children("li").last().find(".popup_app_dt ul").html(mm.this_app.find(".app_s_details ul").html());
				}else if(mm.this_intro){
					mm.this_intro = mm.this_intro.prev().html()!=null?mm.this_intro.prev():mm.this_intro.parent().children().last();
					self.ul.children("li").last().find(".popup_app_dt h3").html(mm.this_intro.children("td").first().html());
					self.ul.children("li").last().find(".popup_app_dt .devloper_star").html(mm.this_intro.children("td").eq(1).html());
					self.ul.children("li").last().find(".popup_app_dt ul li").eq(0).children("span").html(mm.this_intro.children("td").eq(3).html());
					self.ul.children("li").last().find(".popup_app_dt ul li").eq(1).children("span").html(mm.this_intro.children("td").eq(2).html());
					self.ul.children("li").last().find(".popup_app_dt ul li").eq(2).children("span").html(mm.this_intro.children("td").eq(4).html());
				};
			};
		}
	});
	$(".popup_app_pic").wen_slide({
		speed:800,
		effect:"play1",
		page_style:"n_this"	
	});
	$("#home_news_box").wen_slide({
		speed:800,
		effect:"play0",
		pre_page:".pre_page",
		next_page:".next_page",
		page_style:"n_this"
	});
	$(".app_data").wen_slide({
		speed:800,
		effect:"play0",
		page_style:"n_this"
	});
});
