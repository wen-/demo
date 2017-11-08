layer.config({
	path: 'js/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
(function(a) {
	a.fn.placeholder = function(b) {
		var d = {
			placeholderClass: "lf-label"
		};
		var c = a.extend(d, b);
		return this.each(function() {
			var f = a(this);
			var e = a(this).siblings("." + c.placeholderClass);
			f.on("input propertychange", function() {
				if (f.val() !== "") {
					e.hide()
				} else {
					e.show()
				}
			})
		})
	}
})(jQuery);
var $that = $("#getVCode2"), dafaultHtml = $that.html();
$(function() {
	$(".lf-keyword").placeholder();
	$(document).on("click","#loginTbs a",function(){
		var $this = $(this);
		var i = $this.index();
		$this.addClass("cur").siblings().removeClass("cur");
		$(".login-form-item").hide().eq(i).show();
		return false;
	});
	$(document).keyup(function(b) {
		if (b.keyCode == 13) {
			Login.loginSubmit();
		}
	});
	$(document).on("keyup keydown",".login-form-item:first input",function() {
		Login.isBtnOpen();
	});
	$(document).on("keyup keydown",".login-form-item:last input",function() {
		Register.isBtnOpen();
	});
	$(document).on("blur","#telNum",function() {
		Register.isPhoneUse()
	});
	$(document).on("blur","#pwd",function() {
		Register.checkPassword();
	});
	$(document).on("blur","#msgCode",function() {
		Register.checkPhoneCode()
	});
	$(document).on("blur","#phone",function() {
		var v = $(this).val();
		Login.isPhone("#phone",v);
	});
	$(document).on("click","#agreeProtocol",function() {
		Register.isBtnOpen()
	});
	$("body").on("click", ".confirm-close", function() {
		$(this).parent().addClass("dn");
	});
	$(document).on("click","#eyes", function() {
		var c = $(this).siblings(".lf-keyword");
		var d = $.trim(c.val());
		c.remove();
		if (!$(this).hasClass("open")) {
			$(this).addClass("open").before('<input class="lf-keyword" type="text" value="' + d + '" />')
		} else {
			$(this).removeClass("open").before('<input id="pwd" class="lf-keyword" type="password" value="' + d + '" />')
		}
		$(".lf-keyword").placeholder()
	});
});
var Login = {
	//登录按钮状态
	isBtnOpen: function() {
		var a = $("#phone").val();
		var b = $("#password").val();
		if (a != null && a != "" && b != null && b != "") {
			$("#loginSubmit").removeClass("btnoff");
		} else {
			$("#loginSubmit").addClass("btnoff");
		}
	},
	//校验密码
	checkPassword: function(b) {
		var a = $("#password").val();
		if (a == null || a.length == 0) {
			layer.tips("请输入密码",b);
			return false
		} else {
			return true
		}
	},
	//校验手机号
	isPhone: function(c, a) {
		if (a == null || a.length == 0) {
			layer.tips("请输入手机号",c);
			return false
		}
		var b = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if (!b.test(a)) {
			layer.tips("手机号码格式不正确",c);
			return false
		} else {
			return true
		}
	},
	//登录按钮
	loginSubmit: function(btn) {
		if($(btn).hasClass("btnoff")){
			//return false;
		}
		var a = $("#phone").val();
		var c = $("#password").val();
		if (!Login.isPhone("#phone", a)) {
			return false
		}
		if (!Login.checkPassword("#password")) {
			return false
		}
		var b = base_url + "/userLogin/login/submit";

		$.ajax({
			type: "POST",
			url: b,
			async: true,
			data: {phone: a,pwd: c},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.status = 200) {
					window.location.href = res.url;
				} else {
					layer.msg(res.msg);
					window.setTimeout(function(){
						window.location.reload();
					},1500);
				}
			},
			error: function() {
				layer.msg("网络异常，请稍后重试");
				window.setTimeout(function(){
					window.location.reload();
				},1500);
			}
		})
	}
};
var isPhoneUseValue;
var Register = {
	isBtnOpen: function() {
		var b = $("#telNum").val();
		var a = $("#msgCode").val();
		var d = $("#pwd").val();
		var c = $("#agreeProtocol").prop("checked");

		if (b != null && b.length > 0 && a != null && a.length > 0 && d != null && d.length > 0 && c == true) {
			$("#registerBtn").removeClass("btnoff");
		} else {
			$("#registerBtn").addClass("btnoff");
		}
	},
	checkPassword: function() {
		var a = $("#pwd").val();
		if (a == null || (a != null && (a.length < 6 || a.length > 16))) {
			layer.tips("请输入正确的密码,密码长度为6-16个字符","#pwd");
			return false
		} else {
			return true
		}
	},
	isPhoneUse: function() {
		var a = $("#telNum").val();
		if (!Login.isPhone("#telNum", a)) {
			return false
		}
		var b = base_url + "/userRegisert/register/queryUserByPhone";
		$.ajax({
			type: "POST",
			url: b,
			async: true,
			data: {
				phone: a
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.status == -1) {
					layer.tips("该号码已经注册过买房吧", "#telNum");
					isPhoneUseValue = false
				} else {
					if (res.status == 1) {
						isPhoneUseValue = true
					}
				}
			},
			error: function() {

			}
		});
		return isPhoneUseValue
	},
	checkPhoneCode: function() {
		var a = $("#msgCode").val();
		if (a == null && a.length == 0) {
			layer.tips("短信验证码不能为空", "#msgCode");
			return false
		}
		var b = new RegExp("^[0-9]*$");
		if (!b.test(a) || a.length != 6) {
			layer.tips("请输入正确的短信验证码", "#msgCode");
			return false
		} else {
			return true
		}
	},
	registerSubmit: function() {
		var a = $("#telNum").val();
		var d = $("#pwd").val();
		var b = $("#msgCode").val();
		var e = $("#agreeProtocol").prop("checked");
		if (!Login.isPhone("#telNum", a)) {
			return false
		}
		if (!Register.checkPhoneCode()) {
			return false
		}
		if (!Register.checkPassword()) {
			return false
		}
		if (e != true) {
			layer.tips("请同意协议条款",".q-book-deal label");
			return false
		}
		var c = base_url + "/userRegisert/register/submit";
		$("#registerBtn").removeAttr("onclick");
		$("#registerBtn").attr("class", "btn_big btnoff");
		$.ajax({
			type: "POST",
			url: c,
			async: true,
			data: {
				phone: a,
				pwd: d,
				code: b
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.status == 200) {
					layer.msg("注册成功");
					window.setTimeout(function() {
						window.location.href = "";
					}, 1000)
				} else {
					if (res.msg == -1) {
						layer.msg("该号码已经注册过买房吧");
					} else if (e.msg == -2) {
						layer.msg("请输入正确是手机号码");
					} else if (e.msg == -3) {
						layer.msg("请输入正确的手机验证码");
					}
				}
			},
			error: function() {}
		})
	},
	getVCode: function() {
		if (!$that.hasClass("mb-msg-code-disable")) {
			$tel.removeClass("lf-keyword-error");
			$telError.addClass("dn");
			$that.html(wait + "S之后再获取").addClass("mb-msg-code-disable");
			timer = setInterval(function() {
				wait -= 1;
				if (wait === 0) {
					clearInterval(timer);
					$that.html(dafaultHtml).removeClass("mb-msg-code-disable")
				} else {
					$that.html(wait + "S之后再获取")
				}
			}, 1000)
		}
	}
};
