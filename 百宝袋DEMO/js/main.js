var interface = {
	"origin":window.navigator.userAgent,
	"loadImg":"/assets/h5/images/loading_small.gif",
	"codeImg":"/h5/用户/生成图形验证码",
	"login":"/h5/用户/登录",
	"reg":"/h5/用户/注册",
	"findPassword":"/h5/用户/找回密码",
	"smsCode":"/h5/用户/发送验证码",
	"smsCodeForget":"/h5/用户/发送找回密码验证码",
	"hotLoans":"/h5/贷款/推荐",
	"loans":"/h5/贷款/首页",
	"interestRate":"",
	"applyLoans":"",
	"question":"/h5/攻略/首页",
	"userInfo":"/h5/用户/编辑个人信息",
	"exit":"/h5/用户/退出"
};

var bbd_public = {},
	errtips,
	timer,
	xhr,
	loading_img = '<img src="'+interface.loadImg+'" alt="" />';
//IP地址判断
bbd_public.isIP = function(s){
	var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
	return re.test(s);
};
//最小长度校验
bbd_public.minLength = function(value, length, isByte) {
	var strLength = $.trim(value).length;
	if (isByte) strLength = $.getStringLength(value);
	return strLength >= length
};
//最大长度校验
bbd_public.maxLength = function(value, length, isByte) {
	var strLength = $.trim(value).length;
	if (isByte) strLength = $.getStringLength(value);
	return strLength <= length
};
//获取字符串长度
bbd_public.getStringLength = function(str, mode) {
	str = $.trim(str);
	if (mode == "text") {
		str = str.replace(/<(?:img|embed).*?>/ig, 'K').replace(/\r\n|\n|\r/g, '').replace(/<\/?[^>]*>/g, '')
	}
	if (str == "") return 0;
	var length = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) length += 2;
		else length++
	}
	return length
};
//数字校验
bbd_public.checkNumber = function(value) {
	if ($.trim(value) != ''){
		return !isNaN($.trim(value));
	}else{
		return true;
	}
};
//11位手机校验
bbd_public.checkMobile = function(s){
	if(isNaN(s)){return false;}
	var re = /^1[345678]\d{9}$/i;
	return re.test(s);
};
//座机号校验
bbd_public.checkPhone = function(s){
	var re = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/i;
	return re.test(s);
};
//邮箱校验
bbd_public.checkEmail = function(val) {
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	return reg.test(val)
};
//身份证校验
bbd_public.checkIdCard = function(idCard){
	if(idCard.length==18){
		var regIdCard=/^(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		if(regIdCard.test(idCard)){
			var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 );
			var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 );
			var idCardWiSum=0;
			for(var i=0;i<17;i++){
				idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
			}
			var idCardMod=idCardWiSum%11;
			var idCardLast=idCard.substring(17);
			if(idCardMod==2){
				if(idCardLast=="X"||idCardLast=="x"){
					return true;
				}else{
					return false;
				}
			}else{
				if(idCardLast==idCardY[idCardMod]){
					return true;
				}else{
					return false;
				}
			}
		}else{
			return false;
		}
	}else{
		return false;
	}
};
//格式化浮点数
bbd_public.formatMoney = function(price, len) {
	len = len > 0 && len <= 20 ? len : 2;
	price = parseFloat((price + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";
	var l = price.split(".")[0].split("").reverse(),
		r = price.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "")
	}
	var re = t.split("").reverse().join("") + "." + r;

	return re.replace("-,", "-")
};
//显示模版数据
bbd_public.show_Template = function(uTemplate,obj){
	var txt = $(uTemplate).html();
	$.each(obj,function(i,n){
		var reg = new RegExp('\\{%'+i+'%\\}','g');
		txt = txt.replace(reg,n);
	});
	return txt;
};
//倒计时
bbd_public.countDown = function(s,elem,txt){
	timer&&clearInterval(timer);
	elem.html(s + " s");
	timer = setInterval(function() {
		s -= 1;
		if (s === 0) {
			clearInterval(timer);
			elem.html(txt).removeClass("disable");
		}else{
			elem.html(s + " s")
		}
	}, 1000)
};
//错误提示
bbd_public.errTips = function(msg) {
	errtips&&clearTimeout(errtips);
	$("#errTips").html(msg);
	errtips = window.setTimeout(function () {
		$("#errTips").html("");
	},2000);
};

$(function(){
	$(".banner").height(($("body").width()*.7/1.77)*1.1);
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 3,
		spaceBetween: 5,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
		//loop: true,
		initialSlide:1,
		slidesPerView: 'auto',
		centeredSlides: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		}
	});
	$(window).resize(function(){
		$(".banner").height(($("body").width()*.7/1.77)*1.1);
	});

	function ui_alert(obj){
		$(".ui_alert_msg").html(obj.msg||"提示信息");
		if(obj.type && (obj.type == "msg")){
			$(".ui_alert_bg").show();
			$(".ui_alert_b").hide();
			setTimeout(function(){
				$(".ui_alert_bg").hide();
			},2000)
		}else{
			$(".ui_alert_bg,.ui_alert_b").show();
			$(".ui_alert_btn_y").off("click").on("click",function () {
				typeof(obj.yes) == "function" && obj.yes();
				//$(".ui_alert_bg").hide();
			});
			$(".ui_alert_btn_n").off("click").on("click",function () {
				typeof(obj.no) == "function" && obj.no();
				$(".ui_alert_bg").hide();
			});
		}
	}

	function ajaxfun(address,data,fun1,fun2,type){
		return $.ajax({
			type: type || 'POST'
			,url: address
			,dataType: "json"
			,data: data
			,success: function (obj) {
				if(typeof(fun1) == "function"){
					fun1(obj);
				}
			}
			,error:function(err){
				if(typeof(fun2) == "function"){
					fun2(err);
				}
			}
		});
	}

	$(document).on("click",".getImgCode",function(){
		$(this).attr("src",interface.codeImg + "?" + new Date().getTime());
	});

	$(".get_code").on("click",function(){
		var $this = $(this);
		var phone = $.trim($("#phone").val());
		if($this.hasClass("disable")){
			return false;
		}
		if(!phone || !(bbd_public.checkMobile(phone))){
			bbd_public.errTips("请输入正确的手机号");
			return false;
		}
		ui_alert({
			"msg":'<div><img class="getImgCode" src="'+ interface.codeImg + "?" + new Date().getTime() +'" alt="" style="width: 100%;height: 2.5em;display: block;margin: -.5em auto 1em;background: url('+ interface.loadImg +') no-repeat center center;" /><input type="text" id="imgCode" placeholder="请输入图形码" style="width: 100%;border: solid 1px #ccc;padding: .5em 0;text-align: center;border-radius: 6px;" /></div>',
			"yes":function(){
				var 图形码 = $("#imgCode").val();
				var smsCode = interface.smsCode;
				if(!图形码){
					return false;
				}
				$(".ui_alert_bg").hide();
				$this.addClass("disable");
				$this.html("正在发送");
				if($this.hasClass("forget_code")){
					smsCode = interface.smsCodeForget;
				}
				ajaxfun(smsCode,{"手机":phone,"验证码":图形码},function(obj){
					if(obj.状态 == 200){
						bbd_public.countDown(60,$this,"获取验证码");
					}else{
						bbd_public.errTips(obj.状态说明);
						$this.removeClass("disable").html("获取验证码");
					}
				},function(err){
					bbd_public.errTips("获取失败 "+err.status);
					$this.removeClass("disable").html("获取验证码");
				});
			}
		});

	});

	$("#regBtn,#resetPassBtn").on("click",function(){
		var $this = $(this);
		var id = $this[0].id;
		var phone = $.trim($("#phone").val());
		var code = $.trim($("#code").val());
		var password = $.trim($("#password").val());
		if($this.hasClass("disable")){
			return false;
		}
		if(!phone || !(bbd_public.checkMobile(phone))){
			bbd_public.errTips("请输入正确的手机号");
			return false;
		}
		if(!code){
			bbd_public.errTips($("#code").attr("placeholder"));
			return false;
		}
		if(!password){
			bbd_public.errTips($("#password").attr("placeholder"));
			return false;
		}
		$this.addClass("disable");
		$this.html("提交中" + loading_img);
		var query = {
			"手机":phone,
			"验证码":code,
			"密码":password,
			"来源":interface.origin,
			"对外编号":$this.data("code")
		};
		if(id == "regBtn"){
			ajaxfun(interface.reg,query,function(obj){
				if(obj.状态 == 200){
					var url = $this.data("url") || "/h5/贷款/推荐";
					if($this.hasClass("tg_page")){
						$this.removeClass("disable").html("注册领现金");
						window.location.href = "/h5/用户/添加微信";
					}else{
						$this.removeClass("disable").html("注册");
						window.location.href = url;
					}
				}else{
					bbd_public.errTips(obj.状态说明);
					if($this.hasClass("tg_page")){
						$this.removeClass("disable").html("注册领现金");
					}else{
						$this.removeClass("disable").html("注册");
					}
				}
			},function(err){
				bbd_public.errTips("提交失败 "+err.status);
				if($this.hasClass("tg_page")){
					$this.removeClass("disable").html("注册领现金");
				}else{
					$this.removeClass("disable").html("注册");
				}
			});
		}else{
			query.帐号 = phone;
			ajaxfun(interface.findPassword,query,function(obj){
				if(obj.状态 == 200){
					$this.html("重置成功");
					setTimeout(function(){
						window.location.href = "/h5/贷款/推荐";
					},1500);
				}else{
					bbd_public.errTips(obj.状态说明);
					$this.removeClass("disable").html("重置密码");
				}
			},function(err){
				bbd_public.errTips("重置失败 "+err.status);
				$this.removeClass("disable").html("重置密码");
			});
		}
	});

	$(".login_tab h2").on("click",function(){
		var $this = $(this);
		var index = $this.index();
		$(this).addClass("current").siblings("h2").removeClass("current");
		if(index == 1){
			$(".login_code").hide();
			$(".login_pass").show();
		}else{
			$(".login_code").show();
			$(".login_pass").hide();
		}
	});

	$("#loginBtn").on("click",function(){
		var $this = $(this);
		var phone = $.trim($("#phone").val());
		var code = $.trim($("#code").val());
		var password = $.trim($("#password").val());
		var index = $(".login_tab h2.current").index();
		if($this.hasClass("disable")){
			return false;
		}
		if(!phone || !(bbd_public.checkMobile(phone))){
			bbd_public.errTips("请输入正确的手机号");
			return false;
		}
		if(index == 1){
			if(!password){
				bbd_public.errTips($("#password").attr("placeholder"));
				return false;
			}
		}else{
			if(!code){
				bbd_public.errTips($("#code").attr("placeholder"));
				return false;
			}
		}

		$this.addClass("disable");
		$this.html("登录中" + loading_img);
		var query = {
			"手机":phone,
			"来源":interface.origin
		};
		if(index == 1){
			query.密码 = password;
		}else{
			query.密码 = code;
			query.是否验证码登录 = 1;
		};
		ajaxfun(interface.login,query,function(obj){
			if(obj.状态 == 200){
				var url = $this.data("url") || "/h5/贷款/推荐";
				$this.removeClass("disable").html("登录");
				window.location.href = url;
			}else{
				bbd_public.errTips(obj.状态说明);
				$this.removeClass("disable").html("登录");
			}
		},function(err){
			bbd_public.errTips("提交失败 "+err.status);
			$this.removeClass("disable").html("登录");
		});
	});

	if($(".hot_loans").length){
		var window_h = $(window).height();
		var get_loans = false;
		var get_loans_page = 10;
		function getHotLoansScroll(){
			var document_h = $(document).height();
			var scroll_top = $(window).scrollTop();
			if((scroll_top > (document_h - window_h - 240)) && !get_loans){
				get_loans = true;
				$(".load_more").html('正在加载更多数据 ' + loading_img).show();
				ajaxfun(interface.hotLoans,{"ajax":1,"位置":get_loans_page},function(obj){
					if(obj.状态 == 200){
						if(obj.数据.数据列表&&obj.数据.数据列表.length){
							get_loans_page += obj.数据.每页显示数目;
							var html = [];
							$.each(obj.数据.数据列表,function(i,n){
								var htm = bbd_public.show_Template("#uTemplate",n);
								html.push(htm);
							});
							$(".hot_loans_m").append(html.join(""));
							$(".limit").each(function(i,n) {
								$(this).text(parseInt($(this).text()));
							});
							$(".load_more").hide();
						}else{
							$(".load_more").html("无更多数据");
						}
					}else{
						console.log(obj.状态说明);
						$(".load_more").html(obj.状态说明);
					}
					get_loans = false;
				},function(err){
					get_loans = false;
					$(".load_more").html("无更多数据");
					console.log(err.status);
				});
			}
		}
		$(window).on("scroll",function(){
			getHotLoansScroll();
		});
	}

	if($(".quest_box").length){
		var window_h = $(window).height();
		var get_quest = false;
		var get_quest_page = 10;
		function getQuestScroll(){
			var document_h = $(document).height();
			var scroll_top = $(window).scrollTop();
			if((scroll_top > (document_h - window_h - 240)) && !get_loans){
				get_quest = true;
				$(".load_more").html('正在加载更多数据 ' + loading_img).show();
				var query = {
					"ajax":1,
					"分类编号":分类编号||0,
					"位置":get_loans_page,
				};
				ajaxfun(interface.question,query,function(obj){
					if(obj.状态 == 200){
						if(obj.数据.数据列表&&obj.数据.数据列表.length){
							get_quest_page += obj.数据.每页显示数目;
							var html = [];
							$.each(obj.数据.数据列表,function(i,n){
								var htm = bbd_public.show_Template("#uTemplate",n);
								html.push(htm);
							});
							$(".quest_box").append(html.join(""));
							$(".load_more").hide();
						}else{
							$(".load_more").html("无更多数据");
						}
					}else{
						console.log(obj.状态说明);
						$(".load_more").html(obj.状态说明);
					}
					get_quest = false;
				},function(err){
					get_quest = false;
					$(".load_more").html("无更多数据");
					console.log(err.status);
				});
			}
		}
		$(window).on("scroll",function(){
			getQuestScroll();
		});
	}

	if($(".loans").length){
		var window_h = $(".loans").height();
		var get_loans = false;
		var get_loans_page = 10;
		function getLoansScroll(){
			var document_h = $(".hot_loans_m").height() + $(".load_more").height();
			var scroll_top = $(".loans").scrollTop();
			if((scroll_top > (document_h - window_h - 240)) && !get_loans){
				get_loans = true;
				$(".load_more").html('正在加载更多数据 ' + loading_img).show();
				var query = {
					"ajax":1,
					"位置":get_loans_page,
					"职业身份":$(".sort_list.current").text(),
					"贷款金额":$("#loansMoney").val(),
					"贷款期限":$("#loansTime").val()
				};
				ajaxfun(interface.loans,query,function(obj){
					if(obj.状态 == 200){
						if(obj.数据.数据列表&&obj.数据.数据列表.length){
							get_loans_page += obj.数据.每页显示数目;
							var html = [];
							$.each(obj.数据.数据列表,function(i,n){
								var htm = bbd_public.show_Template("#uTemplate",n);
								html.push(htm);
							});
							$(".hot_loans_m").append(html.join(""));
							$(".limit").each(function(i,n) {
								$(this).text(parseInt($(this).text()));
							});
							$(".load_more").hide();
						}else{
							$(".load_more").html("无更多数据");
						}
					}else{
						console.log(obj.状态说明);
						$(".load_more").html(obj.状态说明);
					}
					get_loans = false;
				},function(err){
					get_loans = false;
					$(".load_more").html("无更多数据");
					console.log(err.status);
				});
			}
		}
		$(".loans").on("scroll",function(){
			getLoansScroll();
		});
	}

	function getLoans(elem){
		if(elem&&elem.hasClass("sort_list")){
			elem.addClass("current").siblings().removeClass("current");
		}
		var query = {
			"ajax":1,
			"位置":0,
			"职业身份":$(".sort_list.current").text(),
			"贷款金额":$("#loansMoney").val(),
			"贷款期限":$("#loansTime").val()
		};
		if(xhr && xhr.readyState!= 4 && xhr.readyState!= 0){
			xhr.abort();
		}
		$(".hot_loans_m").html("");
		$(".load_more").html('正在加载更多数据 ' + loading_img).show();
		xhr = ajaxfun(interface.loans,query,function(obj){
			if(obj.状态 == 200){
				if(obj.数据.数据列表&&obj.数据.数据列表.length){
					var html = [];
					$.each(obj.数据.数据列表,function(i,n){
						var htm = bbd_public.show_Template("#uTemplate",n);
						html.push(htm);
					});
					$(".hot_loans_m").html(html.join(""));
					$(".limit").each(function(i,n) {
						$(this).text(parseInt($(this).text()));
					});
					$(".load_more").hide();
				}else{
					$(".load_more").html("无更多数据");
				}
			}else{
				console.log(obj.状态说明);
				$(".load_more").html(obj.状态说明);
			}
		},function(err){
			$(".load_more").html("无更多数据");
			console.log(err.status);
		});
	}
	$(".sort_list").on("click",function(){
		var $this = $(this);
		getLoans($this);
	});

	$("#loansTime").on("change",function(){
		var $this = $(this);
		getLoans($this);
	});

	$("#loansMoney").on("keyup",function () {
		var $this = $(this);
		var v = $this.val();
		if(!v || v > 100){
			getLoans();
		}
	});

	$("#loansBtn").on("click",function(){
		var $this = $(this);
		var money = $.trim($("#loansMoney").val());
		var time = $("#applyLoansTime").val();
		if(!money){
			ui_alert({
				type:"msg",
				msg:"请输入贷款金额"
			});
			return false;
		}
		var query = {
			"金额":money,
			"期限":time
		};
		ui_alert({
			msg:"确定申请贷款 <span class='f_pink'>"+money+"</span> 元，期限 <span class='f_pink'>"+time+"</span> 日",
			yes:function(){
				$(".ui_alert_b").hide();
				$(".ui_alert_msg").html("申请提交中"+loading_img);
				ajaxfun(interface.applyLoans,query,function(obj){
					if(obj.状态 == 200){
						$(".ui_alert_msg").html("申请成功");
					}else{
						$(".ui_alert_msg").html(obj.状态说明);
					}
					window.setTimeout(function () {
						$(".ui_alert_bg").hide();
					},1000);
				},function(err){
					$(".ui_alert_msg").html("申请失败");
					window.setTimeout(function () {
						$(".ui_alert_bg").hide();
					},1000);
				});
			}
		});
	});

	$("#applyLoansMoney,#applyLoansTime").on("change input",function(){
		var money = $.trim($("#applyLoansMoney").val());
		var time = $("#applyLoansTime").val();
		if(!money){
			return false;
		}
		var query = {
			"金额":money,
			"期限":time
		};
		if(xhr && xhr.readyState!= 4 && xhr.readyState!= 0){
			xhr.abort();
		}
		xhr = ajaxfun(interface.interestRate,query,function(obj){
			if(obj.状态 == 200){
				$("#refundLoans").html(obj.数据.月还款);
				$("#refundInterest").html(obj.数据.总利息);
				$("#interestRate").html(obj.数据.月利率);
			}else{
				ui_alert({
					type:"msg",
					msg:obj.状态说明
				});
			}
		},function(err){

		});
	});

	$("#userinfoBtn").on("click",function(){
		var $this = $(this);
		if($this.hasClass("disable")){
			return false;
		}
		var query = {"ajax":1};
		var userinfoName = $.trim($("#userinfoName").val());
		var userinfoIdCard = $.trim($("#userinfoIdCard").val());
		var userinfoPhone = $.trim($("#userinfoPhone").val());
		var userinfoZM = $.trim($("#userinfoZM").val());
		var userinfoProfession = $("#userinfoProfession").val();
		var userinfoCreditCard = $("#userinfoCreditCard").val();
		var userinfoPhoneTime = $("#userinfoPhoneTime").val();
		if(!userinfoName){
			bbd_public.errTips("请输入姓名");
			return false;
		}
		if(userinfoIdCard && !bbd_public.checkIdCard(userinfoIdCard)){
			bbd_public.errTips("请输入正确的身份证号");
			return false;
		}
		if(!userinfoPhone || !bbd_public.checkMobile(userinfoPhone)){
			bbd_public.errTips("请输入正确的手机号");
			return false;
		}
		$this.addClass("disable").html("正在保存 " + loading_img);
		query.姓名 = userinfoName;
		query.身份证号码 = userinfoIdCard;
		query.手机号 = userinfoPhone;
		query.芝麻信用分 = userinfoZM;
		query.职业 = userinfoProfession;
		query.有无信用卡 = userinfoCreditCard;
		query.手机使用时间 = userinfoPhoneTime;
		ajaxfun(interface.userInfo,query,function(obj){
			if(obj.状态 == 200){
				$this.html("保存成功");
				setTimeout(function(){
					$this.removeClass("disable").html("保存资料");
					location.href = "/h5/用户/我的";
				},1500);
			}else{
				bbd_public.errTips(obj.状态说明);
				$this.removeClass("disable").html("保存资料");
			}
		},function(err){
			bbd_public.errTips("保存失败");
			$this.removeClass("disable").html("保存资料");
		});
	});

	$("#exit").on("click",function () {
		var $this = $(this);
		if($this.hasClass("disable")){
			return false;
		}
		$this.addClass("disable").html("正在退出 " + loading_img);
		ajaxfun(interface.exit,{},function(obj){
			if(obj.状态 == 200){
				location.href = "/h5/贷款/推荐";
			}else{
				bbd_public.errTips(obj.状态说明);
				$this.removeClass("disable").html("退出");
			}
		},function(err){
			bbd_public.errTips("退出失败");
			$this.removeClass("disable").html("退出");
		});
	});
});
