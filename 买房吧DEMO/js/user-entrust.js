$(function() {
	var $entrustType = $("#entrustType");
	var $stepBox = $(".step01");
	var $prices = $(".prices");
	var $setTabBox = $(".step02");
	//委托类型TAB
	$entrustType.find("span").click(function() {
		var _dataType = $(this).attr("data-type");
		var _index = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		if (_dataType == "type-office") {
			clearText($stepBox.find("li[data-type=office]"));
			changeText(_index);
			$stepBox.find("li[data-type=sale]").hide();
			$stepBox.find("li[data-type=office]").show();
			$setTabBox.hide();
			$("#offciesumbit").show();
			$("#buildsumbit").hide();
		} else {
			clearText($stepBox.find("li[data-type=sale]"));
			$stepBox.find("li[data-type=sale]").show();
			$stepBox.find("li[data-type=office]").hide();
			$setTabBox.show();
			$("#buildsumbit").show();
			$("#offciesumbit").hide();
		}
	});

	//写字楼租售文字修改
	function changeText(_index) {
		switch (_index) {
			case 2:
				$prices.find(".field-name").html("").html("租<em class='double_words'></em>金");
				$prices.find("#officePrice").attr("maxLength", "9");
				$(".average").find("#avgoffice").attr("maxLength", "6");
				$prices.find(".unit").text("").text("元/月");
				$("#offciesumbit").removeClass().addClass("btn_big btnoff");
				break;
			case 3:
				$prices.find(".field-name").html("").html("售<em class='double_words'></em>价");
				$prices.find("#officePrice").attr("maxLength", "6");
				$(".average").find("#avgoffice").attr("maxLength", "4");
				$prices.find(".unit").text("").text("万元");
				$("#offciesumbit").removeClass().addClass("btn_big btnoff");
				break;
			default:
				break;
		}
	}
	function getBizType() {
		var initType = "";
		if ($("#entrustType").length > 0) {
			$("#entrustType").find("span[class='cur']").each(function() {
				var type = $(this).attr("id");
				if (type == "rent-house") {
					initType = "RENT";
				} else {
					if (type == "sale-house") {
						initType = "SALE";
					} else {
						if (type == "rent-office") {
							initType = "OFFICERENT";
						} else {
							if (type == "sale-office") {
								initType = "OFFICESALE";
							} else {
								initType = "SALE";
							}
						}
					}
				}
			});
			return initType;
		} else {
			return null ;
		}
	}
	//清空已有值
	function clearText(obj) {
		obj.find("input").each(function() {
			$(this).val("");
		});
		$(".settab_box").find("input[type='text']").each(function() {
			$(this).val("");
		});
	}

	//委托类型初始值
	var intialtype = $("#intial-entrust").val();
	if ("RENT" == intialtype) {
		$("#rent-house").addClass("cur").siblings().removeClass("cur");
	} else {
		if ("SALE" == intialtype) {
			$("#sale-house").addClass("cur").siblings().removeClass("cur");
		} else {
			if ("OFFICERENT" == intialtype) {
				$("#rent-office").addClass("cur").siblings().removeClass("cur");
				$("#rent-office").click();
			} else {
				if ("OFFICESALE" == intialtype) {
					$("#sale-office").addClass("cur").siblings().removeClass("cur");
					$("#sale-office").click();
				} else {
					$("#rent-house").addClass("cur").siblings().removeClass("cur");
				}
			}
		}
	}
	//下拉框UI
	$(".dropdown-box").each(function() {
		$(this).find("p").first().click(function(event) {
			event.stopPropagation();
			if (!$(this).parent().hasClass("dropdown-box-open")) {
				$(this).parent().addClass("dropdown-box-open").siblings().removeClass("dropdown-box-open");
			} else {
				$(this).parent().removeClass("dropdown-box-open");
			}
		});
		$(this).find("p").last().find("a").click(function() {
			$(this).parents(".dropdown-box").removeClass("dropdown-box-open").find("p").first().find("span").text($.trim($(this).text()));
			checklivingroom();
		});
	});
	$("body").click(function() {
		$(".dropdown-box").removeClass("dropdown-box-open");
	});
	//性别单选UI
	$(".gender").find("label").click(function() {
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//校验小区名
	function checkgardenName() {
		var gardenName = $("#gardenName").val();
		if (gardenName == "") {
			layer.tips('小区不能为空！', '#gardenName');
			return false;
		}else{
			return true;
		}
	}
	//校验栋座
	function checkbuildingName() {
		var buildingName = $("#buildingName").val();
		if (buildingName == "") {
			layer.tips('栋座不能为空！', '#buildingName');
			return false;
		} else {
			return true;
		}
	}
	//校验房号
	function checkRoomNumber() {
		var roomNumber = $("#roomNumber").val();
		if (roomNumber == "") {
			layer.tips('房号不能为空！', '#roomNumber');
			return false;
		} else {
			return true;
		}
	}
	$("#gardenName").blur(function() {
		checkgardenName();
	});
	$("#buildingName").blur(function() {
		checkbuildingName();
	});
	$("#roomNumber").blur(function() {
		checkRoomNumber();
	});
	//校验写字楼名
	function checkofficeName() {
		var officeName = $("#officeName").val();
		if (officeName == "") {
			layer.tips('写字楼不能为空！', '#officeName');
			return false;
		} else {
			return true;
		}
	}
	//校验写字楼栋座
	function checkofficebuildingName() {
		var buildingName = $("#officebuildingName").val();
		if (buildingName == "") {
			layer.tips('栋座不能为空！', '#officebuildingName');
			return false;
		} else {
			return true;
		}
	}
	//校验写字楼楼层
	function checkofficefloorName() {
		var officefloorName = $("#officefloorName").val();
		if (officefloorName == "") {
			layer.tips('楼层不能为空！', '#officefloorName');
			return false;
		} else {
			return true;
		}
	}
	$("#officefloorName").blur(function() {
		checkofficefloorName();
	});

	 /*//下一步
	$("#firstnext").click(function() {
		var gardenName = $("#gardenName").val();
		var buildingName = $("#buildingName").val();
		var roomNumber = $("#roomNumber").val();
		var biztype = "";
		$("#entrustType").find("span[class='cur']").each(function() {
			var type = $(this).attr("id");
			if (type.indexOf("rent") > -1) {
				biztype = "RENT";
			} else {
				biztype = "SALE";
			}
		});
		if (!checkgardenName() || !checkbuildingName() || !checkRoomNumber()) {
			return false;
		}

		window.location.href = "";
	});
	//返回上一步
	$("#goBack").click(function() {
		history.back(-1);
		return false;
	});*/

	//房型校验
	function checklivingroom() {
		var bedroom = $.trim($("#bedroom").html());
		var livingRoom = $.trim($("#livingRoom").html());
		var bathroom = $.trim($("#bathroom").html());
		if ("" == bedroom) {
			layer.tips('室不能为空！', '#bedroom');
			return false;
		} else if ("" == livingRoom) {
			layer.tips('厅不能为空！', '#livingRoom');
			return false;
		} else if ("" == bathroom) {
			layer.tips('卫不能为空！', '#bathroom');
			return false;
		} else {
			return true;
		}
	}
	//面积校验
	function checkBiuldArea() {
		var buildArea = $.trim($("#buildArea").val());
		var numreg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
		if (buildArea == "") {
			layer.tips('面积不能为空！', '#buildArea');
			return false;
		}
		var partn = /^[0-9]{0}([0-9]|[.])+$/;
		if (!partn.test(buildArea)) {
			layer.tips('面积只允许输入正数和小数！', '#buildArea');
			window.setTimeout(function() {
				$("#buildArea")[0].select();
			}, 0);
			return false;
		}
		if (!numreg.test(buildArea)) {
			layer.tips('面积允许最多输入两位小数的正数！', '#buildArea');
			window.setTimeout(function() {
				$("#buildArea")[0].select();
			}, 0);
			return false;
		}
		if (parseFloat(buildArea) > parseFloat(1500)) {
			layer.tips('面积不允许超过1500㎡！', '#buildArea');
			window.setTimeout(function() {
				$("#buildArea")[0].select();
			}, 0);
			return false;
		} else {
			if (parseFloat(buildArea) == parseFloat(0)) {
				layer.tips('面积必须大于0㎡！', '#buildArea');
				window.setTimeout(function() {
					$("#buildArea")[0].select();
				}, 0);
				return false;
			}
		}
		return true;
	}
	$("#buildArea").blur(function() {
		checkBiuldArea();
	});
	$("#buildArea").keyup(function() {
		var value = $("#buildArea").val();
		value = value.replace(/[^\d.]/g, "");
		$("#buildArea").val(value);
	});
	//校验价格
	function checkbuildingPrice() {
		var buildingPrice = $.trim($("#buildingPrice").val());
		var numreg = new RegExp("^[0-9]*$");
		if (buildingPrice == "") {
			layer.tips('价格不能为空！', '#buildingPrice');
			return false;
		} else {
			if (!numreg.test(buildingPrice)) {
				layer.tips('价格只能输入大于0的整数！', '#buildingPrice');
				return false;
			} else {
				if (numreg.test(buildingPrice) && buildingPrice < 1) {
					layer.tips('价格只能输入大于0的整数！', '#buildingPrice');
					return false;
				} else {
					return true;
				}
			}
		}
	}
	$("#buildingPrice").blur(function() {
		checkbuildingPrice();
	});
	$("#buildingPrice").keyup(function() {
		var value = $("#buildingPrice").val();
		value = value.replace(/[^\d.]/g, "");
		$("#buildingPrice").val(value);
	});
	//校验电话号码
	function isPhone(phone) {
		var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if (!myreg.test(phone)) {
			return false;
		} else {
			return true;
		}
	}
	function checkPhone() {
		var ownerPhone = $.trim($("#ownerPhone").val());
		if ($("#ownerPhone").parent("p").css("display") == "none") {
			return true;
		}
		if (ownerPhone == "") {
			layer.tips('手机号码不能为空！', '#ownerPhone');
			return false;
		} else {
			if (!isPhone(ownerPhone)) {
				layer.tips('手机号码格式不正确！', '#ownerPhone');
				window.setTimeout(function() {
					$("#ownerPhone")[0].select();
				}, 0);
				return false;
			} else {
				return true;
			}
		}
	}
	$("#ownerPhone").blur(function() {
		checkPhone();
	});

	//获取验证码
	$("#sendCode").click(function() {
		var ownerPhone = "";
		if ($("#ownerPhone").parent("p").css("display") == "none") {
			ownerPhone = $("#loginPhone").html();
		} else {
			ownerPhone = $.trim($("#ownerPhone").val());
		}
		if (checkPhone()) {
			var checkCodeFlag = $("#checkCodeFlag2").val();
			if (checkCodeFlag == "N") {
				$("#codeImg2").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
				$("#checkCode2").show();
				return;
			} else {
				layer.tips('每60秒只能发送一条验证短信！', '#sendCode');
			}
		}
		$("#checkCodeTxt2").val("");
	});
	//确定发送短信验证码
	$("a[name='toCheckPhone']").unbind("click").click(function() {
		var ownerPhone, ctxt, $that;
		ctxt = $("#checkCodeTxt2").val();
		if (ctxt == null || ctxt == "" || ctxt.length != 4) {
			$("#tip2").text("请正确填写验证码！");
			$("#tip2").show();
			return;
		}
		$that = $("#sendCode");
		var dafaultHtml = $that.html()
			, wait = 60;
		if ($("#ownerPhone").parent("p").css("display") == "none") {
			ownerPhone = $("#loginPhone").html();
		} else {
			ownerPhone = $.trim($("#ownerPhone").val());
		}
		if (checkPhone()) {
			if (!$that.hasClass("btn-disable")) {
				$.ajax({
					type: "post",
					url: base_url + "/authorize/sendSMSCode",
					dataType: "json",
					data: {
						phone: ownerPhone,
						checkCode: ctxt
					},
					success: function(data) {
						if (data && data.status == 200) {
							$("#checkCode2").hide();
							$that.html(wait + "秒后重发").addClass("btn-disable");
							timer = setInterval(function() {
								wait -= 1;
								if (wait === 0) {
									clearInterval(timer);
									$that.html(dafaultHtml).removeClass("btn-disable");
									$("#checkCodeFlag2").val("N");
								} else {
									$("#checkCodeFlag2").val("Y");
									$that.html(wait + "秒后重发");
								}
							}, 1000);
						} else {
							$("#codeImg2").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
							if (data && data.status == -1) {
								layer.msg("抱歉，您今天的在线委托次数已用完，请您明天再试！");
							} else {
								if (data && data.status == -2) {
									layer.msg("短信发送失败，请稍后再试");
								} else {
									if (data && data.status == -3) {
										layer.msg("参数丢失，请稍后再试！");
									} else {
										if (data && data.status == -4) {
											layer.msg("您输入的验证码错误！");
										} else {
											layer.msg("系统异常，请稍后再试！");
										}
									}
								}
							}
						}
					},
					error: function() {
						layer.msg("系统异常，请稍后再试！");
					}
				});
			}
		}
	});
	//关闭验证码发送框
	$("#security-code-close-phonecode").click(function() {
		$("#checkCode2").hide();
		return false;
	});
	//换一张
	$("#changeVoliCode").click(function() {
		$("#codeImg2").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
		return false;
	});
	//短信验证码检验
	$("#trendCode").bind("input propertychange", function() {
		var code = $(this).val();
		var maxlength = $(this).attr("maxLength");
		if (code.length == maxlength) {
			if (checkTrendCode() && checkPhone()) {
				var ownerPhone = "";
				if ($("#ownerPhone").parent("p").css("display") == "none") {
					ownerPhone = $("#loginPhone").html();
				} else {
					ownerPhone = $.trim($("#ownerPhone").val());
				}
				$.ajax({
					type: "post",
					url: base_url + "/authorize/validateCode",
					dataType: "json",
					data: {
						phone: ownerPhone,
						inputCode: code
					},
					success: function(data) {
						if (data && data.status == 200) {
							if ($("#buildsumbit").length > 0) {
								$("#buildsumbit").removeClass().addClass("btn_big");
							} else {
								$("#offciesumbit").removeClass().addClass("btn_big");
							}
						} else {
							if (data && data.status == 1) {
								layer.tips('验证码校验错误！', '#trendCode');
								changeOff();
							} else {
								if (data && data.status == 2) {
									layer.tips('参数丢失，校验失败！', '#trendCode');
									changeOff();
								} else {
									layer.tips('系统异常！', '#trendCode');
									changeOff();
								}
							}
						}
					},
					error: function() {
						layer.tips('系统异常！', '#trendCode');
						changeOff();
					}
				});
			}
		}
	});
	function changeOff() {
		if ($("#buildsumbit").length > 0) {
			$("#buildsumbit").removeClass().addClass("btn_big btnoff");
		} else {
			$("#offciesumbit").removeClass().addClass("btn_big btnoff");
		}
	}
	//短信验证码检验
	$("#trendCode").blur(function() {
		checkTrendCode();
	});
	function checkTrendCode() {
		var code = $.trim($("#trendCode").val());
		var maxlength = $("#trendCode").attr("maxLength");
		var reg = new RegExp("^[0-9]*$");
		if (code == "") {
			layer.tips('验证码不能为空！', '#trendCode');
			return false;
		} else {
			if ((!reg.test(code)) || (code.length != maxlength)) {
				layer.tips('请填写正确的验证码！', '#trendCode');
				return false;
			} else {
				return true;
			}
		}
	}
	//姓名校验
	$("#loginName").blur(function() {
		checkName();
	});
	function checkName() {
		var specialreg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）;—|{}【】‘；：”“'。，、？]");
		var reg = new RegExp("^[0-9]*$");
		var ownerName = $.trim($("#loginName").val());
		if (ownerName == "") {
			layer.tips('姓名不能为空！', '#loginName');
			return false;
		} else {
			if (reg.test(ownerName)) {
				layer.tips('姓名不能为纯数字！', '#loginName');
				return false;
			} else {
				if (specialreg.test(ownerName)) {
					layer.tips('姓名不能为含有特殊字符！', '#loginName');
					return false;
				} else {
					if (ownerName.length < 2) {
						layer.tips('姓名需大于等于2个字符！', '#loginName');
						return false;
					} else {
						return true;
					}
				}
			}
		}
	}
	//小区委托提交
	$("#buildsumbit").click(function() {
		$("#checkCodeFlag2").val("N");
		if ($(this).hasClass("btnoff")) {
			return;
		}
		var gardenName = $("#gardenName").val();
		var buildingName = $("#buildingName").val();
		var roomNumber = $("#roomNumber").val();
		var biztype = "";
		$("#entrustType").find("span[class='cur']").each(function() {
			var type = $(this).attr("id");
			if (type.indexOf("rent") > -1) {
				biztype = "RENT";
			} else {
				biztype = "SALE";
			}
		});
		if (!checkgardenName() || !checkbuildingName() || !checkRoomNumber()) {
			return false;
		}
		var buildArea = $("#buildArea").val();
		var bedroom = $("#bedroom").html();
		var livingRoom = $("#livingRoom").html();
		var bathroom = $("#bathroom").html();
		var ownerName = $("#loginName").val();
		var code = $("#trendCode").val();
		var salePrice = "";
		var rentPrice = "";
		var propertyType = "APARTMENT";
		var floorName = "";
		var sex = $.trim($(".gender").find(".cur").find("span").html());
		if ("先生" == sex) {
			sex = 0;
		} else {
			sex = 1;
		}
		var ownerPhone = "";
		if ($("#ownerPhone").parent("p").css("display") == "none") {
			ownerPhone = $("#loginPhone").html();
		} else {
			ownerPhone = $.trim($("#ownerPhone").val());
		}
		var check1 = checkPhone();
		var check2 = checkName();
		var check3 = checkBiuldArea();
		var check4 = checkbuildingPrice();
		var check5 = checklivingroom();
		var check6 = checkTrendCode();
		if (!(check1&&check2&&check3&&check4&&check5&&check6)) {
			return false;
		}
		if (!$("#agreement").is(":checked")) {
			layer.tips('请勾选同意《买房吧房屋出售/出租协议》！', '#agreement');
			return false;
		}
		$("#buildsumbit").removeClass().addClass("btn_big btnoff");
		var data = {
			buildArea: buildArea,
			bedroom: bedroom,
			livingRoom: livingRoom,
			bathroom: bathroom,
			salePrice: salePrice,
			rentPrice: rentPrice,
			floorName: floorName,
			ownerPhone: ownerPhone,
			ownerName: ownerName,
			sex: sex,
			propertyType: propertyType,
			inputCode: code
		};
		$.ajax({
			type: "post",
			url: base_url + "/authorize/add",
			dataType: "json",
			data: data,
			success: function(res) {
				if (data && res.status == 200) {
					window.location.href = res.url;
				} else {
					layer.msg(res.msg);
					$("#buildsumbit").removeClass().addClass("btn_big");
				}
			},
			error: function() {
				layer.msg('网络异常');
				$("#buildsumbit").removeClass().addClass("btn_big");
			}
		});
	});

	//写字楼面积校验
	function checkofficeBiuldArea() {
		var buildArea = $.trim($("#officebuildArea").val());
		var numreg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
		if (buildArea == "") {
			layer.tips('面积不能为空！', '#officebuildArea');
			return false;
		} else {
			if (!numreg.test(buildArea)) {
				layer.tips('面积允许最多输入两位小数的正数！', '#officebuildArea');
				return false;
			} else {
				return true;
			}
		}
	}
	$("#officeName").blur(function() {
		checkofficeName();
	});
	$("#officebuildingName").blur(function() {
		checkofficebuildingName();
	});
	$("#officebuildArea").blur(function() {
		checkofficeBiuldArea();
	});
	$("#officebuildArea").keyup(function() {
		$("#officePrice").val("");
		$("#avgoffice").val("");
	});
	$("#officePrice").keyup(function() {
		checkofficePrice();
	});
	$("#officePrice").blur(function() {
		checkofficePrice();
	});
	$("#avgoffice").keyup(function() {
		checkavgoffice();
	});
	$("#avgoffice").blur(function() {
		checkavgoffice();
	});
	$("#officeroomNum").blur(function() {
		checkofficeroomNum();
	});
	//面积租金/售价
	function checkofficePrice() {
		var numreg = new RegExp("^[0-9]*$");
		var officePrice = $.trim($("#officePrice").val());
		if (officePrice == "") {
			if (getBizType().indexOf("SALE") > -1) {
				layer.tips('售价不能为空！', '#officePrice');
			} else {
				layer.tips('租金不能为空！', '#officePrice');
			}
			return false;
		} else {
			if (!numreg.test(officePrice)) {
				if (getBizType().indexOf("SALE") > -1) {
					layer.tips('售价只能为整数！', '#officePrice');
				} else {
					layer.tips('租金只能为整数！', '#officePrice');
				}
				return false;
			} else {
				if (officePrice.length > 9 && getBizType().indexOf("RENT") > -1) {
					layer.tips('总价限制输入9位数！', '#officePrice');
					return false;
				} else {
					if (officePrice.length > 6 && getBizType().indexOf("SALE") > -1) {
						layer.tips('总价限制输入6位数！', '#officePrice');
						return false;
					} else {
						var area = $.trim($("#officebuildArea").val());
						if (area <= 0) {
							return false;
						}
						if (checkofficeBiuldArea()) {
							var total = Math.ceil((officePrice / area));
							$("#avgoffice").val(total);
							return true;
						} else {
							return false;
						}
					}
				}
			}
		}
	}
	//每平米价格
	function checkavgoffice() {
		var numreg = new RegExp("^[0-9]*$");
		var avgoffice = $.trim($("#avgoffice").val());
		if (avgoffice == "") {
			if (getBizType().indexOf("SALE") > -1) {
				layer.tips('售价不能为空！', '#avgoffice');
			} else {
				layer.tips('租金不能为空！', '#avgoffice');
			}
			return false;
		} else {
			if (!numreg.test(avgoffice)) {
				if (getBizType().indexOf("SALE") > -1) {
					layer.tips('售价只能为整数！', '#avgoffice');
				} else {
					layer.tips('租金只能为整数！', '#avgoffice');
				}
				return false;
			} else {
				if (avgoffice.length > 6 && getBizType().indexOf("RENT") > -1) {
					layer.tips('租金只能为整数！', '#avgoffice');
					return false;
				} else {
					if (avgoffice.length > 6 && getBizType().indexOf("SALE") > -1) {
						layer.tips('租金只能为整数！', '#avgoffice');
						return false;
					} else {
						var area = $.trim($("#officebuildArea").val());
						if (checkofficeBiuldArea()) {
							var total = (avgoffice * area);
							$("#officePrice").val(total);
							return true;
						} else {
							return false;
						}
					}
				}
			}
		}
	}
	function checksumbitprice() {
		var numreg = new RegExp("^[0-9]*$");
		var avgoffice = $.trim($("#avgoffice").val());
		if (avgoffice == "") {
			if (getBizType().indexOf("SALE") > -1) {
				layer.tips('售价不能为空！', '#avgoffice');
			} else {
				layer.tips('租金不能为空！', '#avgoffice');
			}
			return false;
		} else {
			if (!numreg.test(avgoffice)) {
				layer.tips('租金只能为整数！', '#avgoffice');
				return false;
			} else {
				if (avgoffice.length > 6 && getBizType().indexOf("RENT") > -1) {
					layer.tips('单价限制输入6位数！', '#avgoffice');
					return false;
				} else {
					if (avgoffice.length > 4 && getBizType().indexOf("SALE") > -1) {
						layer.tips('单价限制输入4位数！', '#avgoffice');
						return false;
					} else {
						if (checkofficeBiuldArea()) {
							return true;
						} else {
							return false;
						}
					}
				}
			}
		}
	}
	function checkofficeroomNum() {
		var officeroomNum = $.trim($("#officeroomNum").val());
		if (officeroomNum == "") {
			layer.tips('室号不能为空！', '#officeroomNum');
			return false;
		} else {
			if (checkofficefloorName()) {
				return true;
			} else {
				return false;
			}
		}
	}
	//写字楼委托提交
	$("#offciesumbit").click(function() {
		$("#checkCodeFlag2").val("N");
		if ($(this).hasClass("btnoff")) {
			return;
		}
		var curBizType = "";
		var houseState = "";
		$("#entrustType").find("span[class='cur']").each(function() {
			var type = $(this).attr("id");
			if (type.indexOf("rent") > -1) {
				houseState = "RENT";
				curBizType = "OFFICERENT";
			} else {
				houseState = "SALE";
				curBizType = "OFFICESALE";
			}
		});
		var officeId = $("#officeId").val();
		var officeName = $("#officeName").val();
		var buildingId = $("#officebuildingId").val();
		var buildingName = $("#officebuildingName").val();
		var floorId = $("#officefloorId").val();
		var floorName = $("#officefloorName").val();
		var roomNumber = $("#officeroomNum").val();
		var officeArea = $("#officebuildArea").val();
		var ownerName = $("#loginName").val();
		var code = $("#trendCode").val();
		var salePrice = "";
		var rentPrice = "";
		if ("RENT" == houseState) {
			rentPrice = $("#officePrice").val();
		} else {
			salePrice = $("#officePrice").val();
		}
		var sex = $.trim($(".gender").find(".cur").find("span").html());
		if ("先生" == sex) {
			sex = 0;
		} else {
			sex = 1;
		}
		var ownerPhone = "";
		if ($("#ownerPhone").parent("p").css("display") == "none") {
			ownerPhone = $("#loginPhone").html();
		} else {
			ownerPhone = $.trim($("#ownerPhone").val());
		}
		var propertyType = "SHOP";
		var livingRoom = "";
		var bathroom = "";
		var bedroom = "";
		var roomId = "";
		var check1 = checkPhone();
		var check2 = checkofficeName();
		var check3 = checkofficebuildingName();
		var check4 = checkofficefloorName();
		var check5 = checkofficeBiuldArea();
		var check6 = checkofficePrice();
		var check7 = checksumbitprice();
		var check8 = checkName();
		var check9 = checkofficeroomNum();
		var check10 = checkTrendCode();

		if (!(check1&&check2&&check3&&check4&&check5&&check6&&check7&&check8&&check9&&check10)) {
			return false;
		}
		if (!$("#agreement").is(":checked")) {
			layer.tips('请勾选同意《买房吧房屋出售/出租协议》！', '#agreement');
			return;
		}
		if ("SALE" == houseState) {
			if (salePrice > 999999) {
				layer.tips('售价过大，请重新输入！', '#officePrice');
				return false;
			}
		} else {
			if ("RENT" == houseState) {
				if (rentPrice >= 100 * 10000 * 10000) {
					layer.tips('租金过大，请重新输入！', '#officePrice');
					return false;
				}
			}
		}
		$("#offciesumbit").removeClass().addClass("btn_big btnoff");
		var data = {
			houseState: houseState,
			gardenName: officeName,
			bedroom: bedroom,
			livingRoom: livingRoom,
			bathroom: bathroom,
			buildArea: officeArea,
			buildingName: buildingName,
			floorName: floorName,
			roomNumber: roomNumber,
			salePrice: salePrice,
			rentPrice: rentPrice,
			ownerPhone: ownerPhone,
			ownerName: ownerName,
			sex: sex,
			propertyType: propertyType,
			roomType: curBizType,
			inputCode: code
		};
		$.ajax({
			type: "post",
			url: base_url + "/authorize/add",
			dataType: "json",
			data: data,
			success: function(res) {
				if (data && res.status == 200) {
					window.location.href = res.url;
				} else {
					layer.msg(res.msg);
					$("#offciesumbit").removeClass().addClass("btn_big");
				}
			},
			error: function() {
				layer.msg('网络异常');
				$("#offciesumbit").removeClass().addClass("btn_big");
			}
		});

	});
});
