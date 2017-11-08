var isPhoneUseValue = false;
var $that = $("#getVCodes"), dafaultHtml = $that.html(), wait = 60, timer;
var $tel = $("#telNum");
var $telError = $tel.siblings(".lf-error");
var ImgCode = {
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
	isPhoneUse: function(a) {
		if (!ImgCode.isPhone("#telNum", a)) {
			return false
		}
		var b = base_url + "/userRegisert/register/queryUserByPhone";
		$.ajax({
			type: "POST",
			url: b,
			async: false,
			data: {
				phone: a
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.status == 1) {
					layer.tips("该号码已经注册过买房吧", "#telNum");
					isPhoneUseValue = false
				} else {
					isPhoneUseValue = true
				}
			},
			error: function() {

			}
		});
		return isPhoneUseValue
	},
	pictureCode: function(b) {
		if (b.stopPropagation) {
			b.stopPropagation()
		} else {
			if (window.event) {
				window.event.cancelBubble = true
			}
		}
		var a = $("#telNum").val();
		if (!ImgCode.isPhone("#telNum", a)) {
			return false
		}
		ImgCode.isPhoneUse(a);
		if (isPhoneUseValue == false) {
			//layer.tips("该号码已经注册过买房吧", "#telNum");
			//return false
		}
		$("#codeImg").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
		$("#imgCode").attr("class", "confirm-tips confirm-tips-mbvcode");
	},
	pictureCode_findRoom: function(b) {
		if (b.stopPropagation) {
			b.stopPropagation()
		} else {
			if (window.event) {
				window.event.cancelBubble = true
			}
		}
		var a = $("#telNum").val();
		if (!ImgCode.isPhone("#telNum", a)) {
			layer.tips("请输入正确的手机号码！", "#telNum");
			return false
		}
		$("#codeImg").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
		$("#imgCode").attr("class", "confirm-tips confirm-tips-mbvcode")
	},
	pictureCode_bindPhone: function(c) {
		if (c.stopPropagation) {
			c.stopPropagation()
		} else {
			if (window.event) {
				window.event.cancelBubble = true
			}
		}
		var b = base_url + "/uo/phoneIsBindWeChat";
		var a = $("#telNum").val();
		if (!ImgCode.isPhone("#telNum", a)) {
			layer.tips("请输入正确的手机号码！", "#telNum");
			return false
		}
		$.ajax({
			type: "POST",
			url: b,
			async: false,
			data: {
				phone: a
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.tatus == -1) {
					layer.tips("该号码已经绑定过！", "#telNum");
					isPhoneBind = false
				} else {
					if (d.msg == 1) {
						isPhoneBind = true
					}
				}
			},
			error: function() {
				window.location.reload();
			}
		});
		if (isPhoneBind == false) {
			return false
		} else {
			$("#codeImg").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
			$("#imgCode").attr("class", "confirm-tips confirm-tips-mbvcode")
		}
	},
	changeSecurityCode: function() {
		$("#codeImg").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random())
	},
	registerPhoneTrendCode: function(d) {
		var a = $("#telNum").val();
		var c = $("#imgCodeText").val();
		var b = base_url + "/checkCode/checkValueCode";
		$.ajax({
			type: "POST",
			url: b,
			async: true,
			data: {
				phone: a,
				type: d,
				code: c
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.status == 200) {
					layer.msg("发送成功");
					$("#imgCode").attr("class", "confirm-tips confirm-tips-mbvcode dn");
					ImgCode.getVCode();
				} else {
					if (res.msg == -1) {
						layer.msg("抱歉，今日获取的验证码已超过5次，明日再来。");
					} else if (e.msg == -2) {
						layer.msg("抱歉，半小时内针对同一号码只能发送三条，请半小时后重试。");
					} else if (e.msg == -3) {
						layer.msg("该手机号码已经注册过。");
					} else if (e.msg == -4) {
						layer.msg("验证码为空");
					} else if (e.msg == -5) {
						layer.msg("验证码错误");
					}
				}
			},
			error: function() {}
		})
	},
	checkPhoneCode: function() {
		var a = $("#msgCode").val();
		if (a == null || a.length == 0) {
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
