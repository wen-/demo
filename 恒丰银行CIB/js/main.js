/* 
 * JS Document for hengfeng bank
 * developer: 黄文雄
 * email: yellowwen@126.com
 * Date: 2016-07-06
 * describe: 页面交互
 * 1、首页轮播图
 * 2、首页左侧菜单子项点击
 * 3、首页左侧菜单鼠标移动显示子项菜单
 * 4、列表数据鼠标移动字体变色效果
 * 5、刷新验证码
 * 6、登录按钮
 * 7、忘记密码确认按钮
 * 8、radiobox_ui
 * 9、交互平台
 */
 
$(function(){
	/*--1、首页轮播图--*/
	$("#wen_play").wen_play({
		show_n : "1",	
		play_list:".play_list",			//定义第一层的LI列表，这样子项里面就算有其它的LI也不会受影响	
		page_show:"num_opacity",		//页码显示方式决定了切换方式，"pre_next"/"num"/"num_opacity/mixture"
		speed:800,						//切换时间间隔
		autoplay:true,					//是否为自动播放
		autospeed:3000,					//自动播放时间间隔
		star_fn:"",						//回调切换开始前；
		end_fn:""
	});

	/*--2、首页左侧菜单子项点击--*/
	$(".menu_box dl.open dd").show();
	$(document).on("click",".menu_box dt",function(){
		var $this = $(this);
		$this.parent("dl").addClass("open").siblings("dl").removeClass("open").find("dd").slideUp();
		$this.next("dd").slideDown();
	});

	/*--3、首页左侧菜单鼠标移动显示子项菜单--*/
	var ishover = false,hoverE;
	$(".sub_menu").css({"width":0});
	$(".h_nav .level").hover(function(){
		var $this = $(this);
		ishover = true;
		hoverE&&window.clearTimeout(hoverE);
		$this.siblings(".level").find(".sub_menu").hide();
		$this.children(".sub_menu").show().animate({"width":"420px"},300);
	},function(){
		var $this = $(this);
		ishover = false;
		hoverE = window.setTimeout(function(){
			if(!ishover){
				$this.children(".sub_menu").hide();
			}
		},1500);
	});	
	$(document).click(function(e){
		var e = e || window.event;
		var targ = e.target || e.srcElement;
		if( !$(targ).parents().is(".h_nav") && targ.nodeName != "A" && !$(targ).parents().is(".show_box")){
			$(".sub_menu").hide();
		}
	});

	/*--4、列表数据鼠标移动字体变色效果--*/
	$(".pricing_page .module_m li,.public_page .module_m li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});

	/*--5、刷新验证码--*/
	$("#getEWM").click(function(){
		var $this = $(this);
		var codePath = $this.data("changeurl");
		$this.attr("src",codePath+new Date().getTime());
	});

	/*--6、登录按钮--*/
	$("#loginBtn").click(function(){
		var $this = $(this);
		if($this.hasClass("disable")){
			return false;
		}
		var query = {};
		query.username = $.trim($(".user_name").val());
		query.password = $(".user_pass").val();
		query.code = $(".user_code").val();
		if(!query.username||!query.password||!query.code){
			$(".login_box .tiops").html('<span class="f_red">用户名/密码/验证码 不能为空</span>').css({"visibility": "visible"});
			window.setTimeout(function(){
				$(".login_box .tiops").css({"visibility": "hidden"});
			},2000);
			return false;
		}
		$this.addClass("disable").html('正在登录...');
		$.ajax({
			type: 'POST',
			url: '',
			data: query,
			dataType: 'json',
			success: function(response) {
				//code
				if(response.status == 200){
					window.location.href = response.url;
				}else{
					$(".login_box .tiops").html('<span class="f_red">'+ response.msg +'</span>').css({"visibility": "visible"});
					window.setTimeout(function(){
						$(".login_box .tiops").css({"visibility": "hidden"});
					},2000);
					$this.removeClass("disable").html('登录');
				}
			},
			error: function (e) {
				//code
				$this.removeClass("disable").html('登录');
			}
		})
	});

	/*--7、忘记密码确认按钮--*/
	$("#forgetBtn").click(function(){
		var $this = $(this);
		if($this.hasClass("disable")){
			return false;
		}
		var query = {};
		query.username = $.trim($(".user_name").val());
		query.password = $(".user_pass").val();
		query.password1 = $(".user_passagain").val();
		query.code = $(".user_code").val();
		if(!query.username||!query.password||!query.code||!query.password1){
			$(".login_box .tiops").html('<span class="f_red">用户名/新密码/确认密码/验证码 不能为空</span>').css({"visibility": "visible"});
			window.setTimeout(function(){
				$(".login_box .tiops").css({"visibility": "hidden"});
			},2000);
			return false;
		}
		if(query.password != query.password1){
			$(".login_box .tiops").html('<span class="f_red">新密码 与 确认密码不一致</span>').css({"visibility": "visible"});
			window.setTimeout(function(){
				$(".login_box .tiops").css({"visibility": "hidden"});
			},2000);
			return false;
		}
		$this.addClass("disable").html('正在提交...');
		$.ajax({
			type: 'POST',
			url: '',
			data: query,
			dataType: 'json',
			success: function(response) {
				//code
				if(response.status == 200){
					window.location.href = response.url;
				}else{
					$(".login_box .tiops").html('<span class="f_red">'+ response.msg +'</span>').css({"visibility": "visible"});
					window.setTimeout(function(){
						$(".login_box .tiops").css({"visibility": "hidden"});
					},2000);
					$this.removeClass("disable").html('确认');
				}
			},
			error: function (e) {
				//code
				$this.removeClass("disable").html('确认');
			}
		})
	});

	/*--8、checkbox_ui--*/
	$(document).on("click",".radiobox_ui i",function(){
		var $this = $(this);
		var n = $this.attr("name");
		$(".radiobox_ui i[name="+ n +"]").removeClass("checked");
		$this.addClass("checked");
	});
	/*--交互平台弹框专家选中加背景色--*/
	$(document).on("click",".zj_single .radiobox_ui i",function(){
		var $this = $(this);
		if($this.hasClass("checked")){
			$this.parents(".zj_m").find(".zj_single").removeClass("bg_ccc").find(".zj_type span").removeClass("bg_brown");
			$this.parents(".zj_single").addClass("bg_ccc").find(".zj_type span:first").addClass("bg_brown");
			//在这里可以确定选中哪个专家
		}
	});
	$(document).on("click",".zj_type span",function(){
		var $this = $(this);
		if($this.parents(".zj_single").find(".radiobox_ui i").hasClass("checked")){
			$this.addClass("bg_brown").siblings("span").removeClass("bg_brown");
			//在这里可以确定选中哪个专业
		}
	});

	/*--9、交互平台--*/
	//我要提问
	$(document).on("click",".ask_question",function(){
		$(".zj_bg").css({
			"width":$(document).width(),
			"height":$(document).height()
		}).show();
		$(".zj_box").fadeIn();
	});
	//专家在线回答--我要提问
	$(document).on("click",".ask_expert",function(){
		$(".ask_question_bg").css({
			"width":$(document).width(),
			"height":$(document).height()
		}).show();
		$(".ask_question_box").fadeIn();
	});
	//专家弹框关闭
	$(".zj_bg,.zj_close").click(function(){
		$(".zj_bg,.zj_box").hide();
	});
	//专家弹框确定
	$(document).on("click","#zjBtn",function(){
		//在这里可以获取选中专家的id
		$(".zj_bg,.zj_box").hide();
		$(".ask_question_bg").css({
			"width":$(document).width(),
			"height":$(document).height()
		}).show();
		$(".ask_question_box").fadeIn();
	});
	//通用弹框关闭
	$(".popup_bg,.close_popup").click(function(){
		$(".popup_bg,.popup_box").hide();
	});
	//问题提交
	$(document).on("click","#askBtn",function(){
		var query = {};
		query.ask = $.trim($(".ask_t").val());
		query.code = $(".code").val();
		if(!query.ask||!query.code){
			$(".tiops").html('<span class="f_red">提问标题/验证码 不能为空</span>').css({"visibility": "visible"});
			window.setTimeout(function(){
				$(".tiops").css({"visibility": "hidden"});
			},1500);			
			return false;
		}
		
	});
	//专家在线回答--回答问题
	$(document).on("click","#answer",function(){
		var $this = $(this);
		var $q = $(".radiobox_ui i.checked");
		if(!$q.length){
			$this.next('.tips').show();
			window.setTimeout(function(){
				$this.next('.tips').hide();
			},2000);
			return false;
		}
		var $q_copy = $q.parents("a").clone();
		$q_copy.find("span").remove();
		var q = $q_copy.text().replace("问题：","");
		//console.log(q);
		$(".answer_question_box .question_txt").text(q);
		$(".answer_question_bg").css({
			"width":$(document).width(),
			"height":$(document).height()
		}).show();
		$(".answer_question_box").find('.send_tips_bg,.send_tips').remove();
		$(".answer_question_box").fadeIn();
	});
	//专家在线回答--回答问题弹框提交
	$(document).on("click","#answerBtn",function(){
		var $this = $(this);
		if($this.hasClass("disable")){
			return false;
		}
		var at = $.trim($(".answer_txt").val());
		if(!at){
			$(".answer_question_box .tiops").html('<span class="f_red">请输入回答内容</span>').css({"visibility": "visible"});
			window.setTimeout(function(){
				$(".answer_question_box .tiops").css({"visibility": "hidden"});
			},2000);
			return false;
		}

		var h = '<div class="send_tips_bg"></div><div class="send_tips"><p class="send_tips_txt">您确定要提交吗？</p><div class="send_tips_btn tc"><button type="button" class="btn_brown y">确定</button><button type="button" class="btn_brown n">取消</button></div></div>';
		$(".answer_question_box").append(h);
	});
	//专家在线回答--回答问题取消
	$(document).on("click",".answer_question_box .n",function(){
		$(".answer_question_box").find('.send_tips_bg,.send_tips').remove();
	});
	//专家在线回答--回答问题确认
	$(document).on("click",".answer_question_box .y",function(){
		var at = $.trim($(".answer_txt").val());
		$(".answer_question_box").find('.send_tips_bg,.send_tips').remove();
		$("#answerBtn").addClass("disable").text('提交中...');
		var query = {};
		query.answer = at;
		$.ajax({
			type: 'POST',
			url: '',
			data: query,
			dataType: 'json',
			success: function(response) {
				//code
				window.location.reload();
			},
			error: function (e) {
				//code
				$("#answerBtn").removeClass("disable").html('提交');
			}
		});
	});
	//专家分类列表
	$(document).on("click",".expert_page .expert_type dt",function(){
		var $this = $(this);
		if($this.hasClass("on")){
			$this.removeClass("on");
			$this.next("dd").slideUp();
		}else{
			$this.addClass("on");
			$this.next("dd").slideDown();
		}
	});
	
	/*--10、通讯录--*/
	$(".book_list h2").click(function(){
		var $this = $(this);
		if($this.hasClass("on")){
			$this.removeClass("on");
			$this.next("dl").slideUp();			
		}else{
			$this.addClass("on");
			$this.next("dl").slideDown();
		}
	});

	$(".book_list dt").click(function(){
		var $this = $(this);
		if($this.hasClass("on")){
			$this.removeClass("on");
			$this.next("dd").slideUp();			
		}else{
			$this.addClass("on");
			$this.next("dd").slideDown();
		}
	});


});