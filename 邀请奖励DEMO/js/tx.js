$(function () {
	var token = "";
	/*客户端显示页面*/
	if (typeof(APPANDROID) != "undefined") {
		token = APPANDROID.getToken();
	} else {
		if (typeof(APPiOS) != "undefined") {
			token = iOS_token;
		}
	}

	var t,isajax = false;
	function errTips(msg) {
		t&&clearTimeout(t);
		$("#errTips").html(msg);
		t = window.setTimeout(function () {
			$("#errTips").html("");
		},2000);
	}

	$("#invite").on("click",function () {
		$(".share_box_layout").show();
		$(".share_box").removeClass("translate_top");
		return false;
	});

	$(".share_list").on("click",function () {
		var $this = $(this);
		var address = $this.parent(".share_box_m").data("url");
		if($this.hasClass("wx_friend")){
			if (typeof(APPANDROID) != "undefined") {
				APPANDROID.invite(JSON.stringify({"分享类型":"朋友","分享地址":address}));
			}else if(typeof(APPiOS) != "undefined") {
				window.webkit.messageHandlers.js交互.postMessage({"method":"invite","分享类型":"朋友","分享地址":address});
			}
		}else if($this.hasClass("wx_friends")){
			if (typeof(APPANDROID) != "undefined") {
				APPANDROID.invite(JSON.stringify({"分享类型":"朋友圈","分享地址":address}));
			}else if(typeof(APPiOS) != "undefined") {
				window.webkit.messageHandlers.js交互.postMessage({"method":"invite","分享类型":"朋友圈","分享地址":address});
			}
		}
		$(".share_box_layout").hide();
		$(".share_box").addClass("translate_top");
		return false;
	});

	$("#shareCancel,.share_box_bg").on("click",function () {
		$(".share_box_layout").hide();
		$(".share_box").addClass("translate_top");
		return false;
	});

	$(document).on("click","a",function () {
		var $this = $(this);
		var src = $this.attr("href");
		if(/api\/邀请注册/.test(src)){
			$this.attr("href",src+"?token="+token);
		}
	});

	//提现页，全部提现按钮事件
	$(".tx_all").on("click",function () {
		var remaining = $("#remaining").text();
		if(remaining > 0){
			$("#txMoney").val(remaining);
		}
	});

	$(".left_layout").on("click",function () {
		if (typeof(APPANDROID) != "undefined") {
			APPANDROID.goBack(-1);
		}else if(typeof(APPiOS) != "undefined") {
			window.webkit.messageHandlers.js交互.postMessage({"method":"goBack"});
		}
	});

	//邀请记录切换
	var yqajax1 = false;
	var yqajax2 = false;
	var yqajax1_page = 10;
	var yqajax2_page = 10;
	$(".app_t").on("click",function () {
		var $this = $(this);
		var index = $this.index();
		var 类型 = "邀请记录";
		$(".ajax_loading").hide();
		$this.addClass("current").siblings().removeClass("current");
		$(".yq_history").hide().eq(index).show();
		if((index == 0 && yqajax1) || (index == 1 && yqajax2)){
			return false;
		}
		if(index == 0 && !yqajax1){
			yqajax1 = true;

		}else if(index == 1 && !yqajax2){
			yqajax2 = true;
			类型 = "资金明细";
		}
		$(".yq_history").eq(index).find(".yq_history_data").html('<div class="loading"></div>');

		var query = {};
		query.类型 = 类型;
		query.位置 = 10;
		query.elem = $(".yq_history").eq(index).find(".yq_history_data");
		获取邀请数据(query);

	});

	function 获取邀请数据(obj) {
		$.ajax({
			type: 'POST'
			,url: obj.url || "/api/邀请注册/邀请记录"
			,dataType: "json"
			,data: {"类型":obj.类型,"位置":obj.位置,"token":token,"ajax":1}
			,success: function (json) {
				if(json.状态==200){
					if(json.数据.数据列表 && json.数据.数据列表.length){
						if(obj.类型 == "邀请记录"){
							yqajax1_page = obj.位置;
						}else{
							yqajax2_page = obj.位置;
						}
						var html = [];
						$.each(json.数据.数据列表,function (i,n) {
							var htm = "";
							if(obj.类型 == "邀请记录"){
								htm = '<div class="yq_history_list ui_list ub"><div class="ub ub-f1 ub-ac ub-pc">'+ n.好友帐号 +'</div><div class="ub ub-f1 ub-ac ub-pc">'+ n.添加时间 +'</div><div class="ub ub-f1 ub-ac ub-pc">'+ n.状态 +'</div></div>';
							}else{
								htm = '<div class="yq_history_list ui_list ub"><div class="ub ub-f1 ub-ac ub-pc">'+ n.金额 +'元</div><div class="ub ub-f1 ub-ac ub-pc">'+ n.添加时间 +'</div><div class="ub ub-f1 ub-ac ub-pc">'+ n.备注 +'</div></div>';
							}
							html.push(htm);
						});
						if(obj.位置 == 10){
							obj.elem.html(html.join(""));
						}else{
							obj.elem.append(html.join(""));
						}
						if(obj.位置 == json.数据.每页显示数目*json.数据.总页数){
							obj.elem.siblings(".ajax_loading").show().html("无更多数据");
						}else{
							obj.elem.siblings(".ajax_loading").show().html("正在加载更多数据");
						}
						window.setTimeout(function () {
							var h = obj.elem.parent(".yq_history").height();
							var h1 = obj.elem.parent(".yq_history").parent(".ui_mbox").height();
							if((h < h1) && (obj.位置 < json.数据.每页显示数目*json.数据.总页数)){
								obj.位置 = obj.位置+json.数据.每页显示数目;
								获取邀请数据(obj);
							}
						},50);
					}else{
						if(obj.位置 == 10){
							obj.elem.html('<div class="no_data"><p>暂无记录~</p></div>')
						}else{
							obj.elem.siblings(".ajax_loading").show().html("无更多数据");
						}

					}
				}else{
					if(obj.位置 == 10){
						obj.elem.html('<p style="margin-top: 4em;text-align: center;">获取数据失败（'+ json.状态说明 +'）</p>')
					}else{
						obj.elem.siblings(".ajax_loading").show().html(json.状态说明);
					}
				}
				if(obj.类型 == "邀请记录"){
					yqajax1 = false;
				}else{
					yqajax2 = false;
				}
			}
			,error:function () {
				if(obj.位置 == 10){
					obj.elem.html('<div class="no_data"><p>暂无记录~</p></div>');
				}else{
					obj.elem.siblings(".ajax_loading").show().html("无更多数据");
				}

				if(obj.类型 == "邀请记录"){
					yqajax1 = false;
				}else{
					yqajax2 = false;
				}
			}
		})
	}
	获取邀请数据({"类型":"邀请记录","位置":"10","elem":$('.yq_history_data').eq(0)});
	$(".ui_mbox").on("scroll",function (e) {
		var $this = $(this);
		var scroll_h = $this.scrollTop();
		if(scroll_h > 0){
			var h = $this.find(".yq_history:visible").height() - $this.height();
			if(scroll_h > h - 30){
				var query = {};
				query.类型 = $(".app_t.current").index() == 1?"资金明细":"邀请记录";
				query.位置 = ($(".app_t.current").index() == 1?"yqajax2_page":"yqajax1_page")+10;
				query.elem = $(".yq_history:visible").find(".yq_history_data");
				if(($(".app_t.current").index() == 0 && yqajax1) || ($(".app_t.current").index() == 1 && yqajax2)){
					return false;
				}
				if($(".app_t.current").index() == 0 && !yqajax1){
					yqajax1 = true;

				}else if($(".app_t.current").index() == 1 && !yqajax2){
					yqajax2 = true;
				}
				获取邀请数据(query);
			}
		}


	});

	//提现页，提交按钮
	$("#txSend").on("click",function () {
		var $this = $(this);
		if($this.hasClass("disable")){
			return;
		}
		$this.addClass("disable");
		var txmoney = $("#txMoney").val();
		if(txmoney > 0 && txmoney < $("#remaining").text()){
			$.ajax({
				type: 'POST'
				,url: "/api/邀请注册/提现保存"
				,dataType: "json"
				,data: {"金额":txmoney,"token":token}
				,success: function (json) {
					if(json.状态==500){
						errTips(json.状态说明);
						$this.removeClass("disable");
						return;
					}
					errTips("提现成功");
					setTimeout(function(){
						if (typeof(APPANDROID) != "undefined") {
							token = APPANDROID.goBack(-1);
						}else if(typeof(APPiOS) != "undefined") {
							window.webkit.messageHandlers.js交互.postMessage({"method":"goBack"});
						}
					}, 1000);
				}
				,error:function () {
					errTips("提交失败，请稍候重试！");
					$this.removeClass("disable");
				}
			})
		}else{
			if($("#remaining").text() > 0){
				errTips("请输入正确的提现金额，大于0小于"+$("#remaining").text());
			}else{
				errTips("无可提现金额");
			}
			$this.removeClass("disable");
		}
	});

	//选择银行卡
	$(".bank_selectlist .link").on("click",function () {
		var $this = $(this);
		window.localStorage.setItem("默认银行卡编号",$this.data("code"));
		window.localStorage.setItem("默认银行logo",$this.find(".bank_ico").attr("src"));
		window.localStorage.setItem("默认银行名称",$this.find(".tx_banktxt h2").text());
		window.localStorage.setItem("默认银行卡尾号",$this.find(".endcode").text());
		$this.addClass("bg_checked").parent(".tx_bank").siblings(".tx_bank").find(".link").removeClass("bg_checked");
		// if(!isajax && !$this.hasClass("bg_checked")){
		// 	isajax = true;
		// 	$this.parent(".bank_selectlist").find(".link").removeClass("bg_loading");
		// 	$this.addClass("bg_loading");
		// 	$.ajax({
		// 		type: 'POST'
		// 		,url: ""
		// 		,dataType: "json"
		// 		,data: {}
		// 		,success: function () {
		// 			isajax = false;
		// 			$this.removeClass("bg_loading").addClass("bg_checked").parent(".tx_bank").siblings(".tx_bank").find(".link").removeClass("bg_checked");
		// 		}
		// 		,error:function () {
		// 			isajax = false;
		// 			$this.removeClass("bg_loading");
		// 		}
		// 	});
		// }
		return false;
	});

	//添加银行卡，提交绑定
	$("#addCardSend").on("click",function () {
		var $this = $(this);
		if($this.hasClass("disable")){
			return;
		}
		var username = $.trim($(".username").val());
		var cardnum = $.trim($(".cardnum").val());
		var cardaddress = $.trim($(".cardaddress").val());
		var cardsub = $.trim($(".cardsub").val());
		if(!username){
			errTips($(".username").attr("placeholder"));
			return false;
		}else if(!cardnum){
			errTips($(".cardnum").attr("placeholder"));
			return false;
		}else if(!cardaddress){
			errTips($(".cardaddress").attr("placeholder"));
			return false;
		}else if(!cardsub){
			errTips($(".cardsub").attr("placeholder"));
			return false;
		}
		$this.addClass("disable");
		$this.html("正在绑定...");
		var query = {};
		query.账号 = cardnum;
		query.开户人姓名 = username;
		query.银行名称 = cardaddress;
		query.开户行 = cardsub;
		query.token = token;
		$.ajax({
			type: 'POST'
			,url: "/api/邀请注册/保存银行卡"
			,dataType: "json"
			,data: query
			,success: function (json) {
				if(json.状态 == 200){
					errTips("绑定成功");
					setTimeout(function(){
						if (typeof(APPANDROID) != "undefined") {
							token = APPANDROID.goBack(-1);
						}else if(typeof(APPiOS) != "undefined") {
							window.webkit.messageHandlers.js交互.postMessage({"method":"goBack"});
						}
					}, 1000);
				}else{
					errTips(json.状态说明);
					$this.html("提交绑定");
					$this.removeClass("disable");
				}
			}
			,error:function (e) {
				errTips("通讯失败，稍后重试");
				$this.html("提交绑定");
				$this.removeClass("disable");
			}
		});
	});

	$(".tx_bank").on("swipeLeft",".card_list",function () {
		$(".tx_bank").removeClass("translate5em");
		$(this).parent(".tx_bank").addClass("translate5em");
	}).on("swipeRight",".card_list",function () {
		$(this).parent(".tx_bank").removeClass("translate5em");
	});

	function ui_alert(obj){
		$(".ui_alert_msg").html(obj.msg||"提示信息");
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

	$(".del_card").on("click",function () {
		var $this = $(this);
		ui_alert({
			msg:"确定删除？",
			yes:function () {
				var query = {};
				$(".ui_alert_b").hide();
				$(".ui_alert_msg").html("正在删除...");
				query.银行卡编号 = $this.siblings("a").data("code");
				query.token = token;
				$.ajax({
					type: 'POST'
					,url: "/api/邀请注册/删除银行卡"
					,dataType: "json"
					,data: query
					,success: function (json) {
						if(json.状态 == 200){
							$(".ui_alert_msg").html("删除成功");
							$this.parent(".tx_bank").remove();
						}else{
							$(".ui_alert_msg").html(json.状态说明);
						}
						window.setTimeout(function () {
							$(".ui_alert_bg").hide();
						},1000);
					}
					,error:function (e) {
						$(".ui_alert_msg").html("删除失败");
						window.setTimeout(function () {
							$(".ui_alert_bg").hide();
						},1000);
					}
				});
			}
		});

	})
});
