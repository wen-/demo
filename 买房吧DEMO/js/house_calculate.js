calculate = {
    init: function() {
        try {
            me = this;
            me.chartArea = echarts.init(document.getElementById('chartArea'));
            me._initEventListener();
            me._calculator();
        } catch (a) {}
    },
    _initEventListener: function() {
        me = this;
        $("#loanStyle").change(function(a) {
            me._calculator();
        });
        $("#calculatorStyleData").change(function(a) {
            me._calculator();
        });
        $("#timeStyle").change(function(a) {
            me._calculator();
        });
    },
    _calculator: function() {
        me = this;
        fdjs_bRate = 0;
        fdjs_gRate = 0;
        fdjs_year = $("#timeStyle").val() * 1;
        fdjs_timeStyle = fdjs_year * 12;
        var b = "json/data.json?t=" + fdjs_timeStyle;
        $.ajax({
            type: "GET",
            dataType: "JSON",
            url: b,
            async: false,
            success: function(c) {
                if (c.fdjs_bRate && c.fdjs_gRate) {
                    fdjs_bRate = c.fdjs_bRate / 100;
                    fdjs_gRate = c.fdjs_gRate / 100;
                } else {
                    a();
                }
            },
            error: a
        });
        function a() {
            if (fdjs_year == 1) {
                fdjs_bRate = 0.0435;
                fdjs_gRate = 0.0275;
            } else {
                if (fdjs_year <= 5) {
                    fdjs_bRate = 0.0475;
                    fdjs_gRate = 0.0275;
                } else {
                    fdjs_bRate = 0.049;
                    fdjs_gRate = 0.0325;
                }
            }
        }
        fdjs_sumT = 0;
        fdjs_payStyle = 1;
        fdjs_loanStyle = $("#loanStyle").val();
        fdjs_calculatorStyle = 1;
        fdjs_total = $("#totalPrice").val();
        fdjs_loanTotalData = 0;
        fdjs_calculatorStyleData = $("#calculatorStyleData").val();
        fdjs_fpay = 0;
        $("#fPayPanelStyle").html("(" + me._roundData(1 - fdjs_calculatorStyleData, 1) * 10 + "成)");
        $("#totalPanelStyle").html("(" + me._roundData(fdjs_calculatorStyleData, 1) * 10 + "成)");
        if (fdjs_loanStyle == 1) {
            curavgR = fdjs_gRate;
        } else {
            if (fdjs_loanStyle == 2) {
                curavgR = fdjs_bRate;
            }
        }
        $("#rTotalPanelRate").html("(利率" + me._roundData(curavgR * 100, 2) + "%)");
        curavgR = curavgR / 12;
        fdjs_fpay = fdjs_total * (1 - fdjs_calculatorStyleData);
        fdjs_fpay_val = me._roundData(fdjs_fpay, 2);
        $("#fPayPanel").html(fdjs_fpay_val + "万");
        fdjs_loanTotalData = fdjs_total * fdjs_calculatorStyleData;
        fdjs_loanTotalData_val = me._roundData(fdjs_loanTotalData, 2);
        $("#totalPanel").html(fdjs_loanTotalData_val + "万");
        money = fdjs_loanTotalData * curavgR * Math.pow(1 + curavgR, fdjs_timeStyle) / (Math.pow(1 + curavgR, fdjs_timeStyle) - 1);
        money_val = me._roundData(money * fdjs_timeStyle - fdjs_loanTotalData, 3);
        $("#rTotalPanel").html(money_val + "万");
        $("#avgPPanel").html("¥" + me._roundData(money * 10000, 2));
        me._updateData(fdjs_fpay_val, fdjs_loanTotalData_val, money_val);

    },
    _roundData: function(c, b) {
        for (var a = 0; a < b; a++) {
            c = c * 10;
        }
        c = Math.round(c);
        for (var a = 0; a < b; a++) {
            c = c * 0.1;
        }
        c = c.toFixed(b);
        return c;
    },
    _updateData: function(a, d, b) {
        var option = {
            toolbox: {
                show : false
            },
            calculable : true,
            series : [
                {
                    name:'',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:a, name:'参考首付'},
                        {value:d, name:'贷款金额'},
                        {value:b, name:'支付利息'}
                    ]
                }
            ]
        };
        me.chartArea.setOption(option);
    }
};
calculate.init();


$(function() {
    //Calculator.init("loan");
});
$("body").on("click", ".mortgage-calculate a", function() {
    var b = $(this).attr("flg");
    var d = $(this).attr("avgPrice");
    var c = $(this).attr("area");
    var a = $(this).attr("layoutId");
    if (d != null && c != null ) {
        d = parseFloat(d);
        c = parseFloat(c);
        $("#total").val((d * c / 10000).toFixed(2));
    }
    getLayouts(b, a);
    //弹框
    var txt = $("#jsqTemplate").html();
    layer.open({
        //type:1,
        skin:'popup-class',
        title:'房贷计算器',
        area: '830px',
        content: txt,
        btn:[],
        success:function(layero){
            Calculator.init("loan");
        }
    });
});
$(document).on("click","#mortgageCalculateClose", function() {
    $("#cardBox").css("top", "-224px");
    //关闭弹框
    layer.closeAll();
});
function selectDropmenuAClick() {
    var a = $(this).parents(".select-box")
        , b = a.find(".selected-txt");
    b.text("").text($.trim($(this).text()));
    $(this).addClass("cur").siblings().removeClass("cur");
    closeDropmenu();
}
function closeDropmenu() {

    if (window.navigator.appVersion.indexOf("MSIE 6") > -1) {
        $(".select-dropmenu").hide();
        $(".select-box").removeClass("select-box-hover");
    } else {
        $(".select-dropmenu").slideUp(150);
        setTimeout(function() {
            $(".select-box").removeClass("select-box-hover");
        }, 150);
    }
}
$(document).click(function() {
    closeDropmenu();
});
Calculator = {
    _oldTabType: null ,
    _tipsMap: {
        "本息": {
            title: "等额本息还款方式",
            content: "等额本息还款方式：在还款期内，每月偿还同等数额的贷款（包括本金和利息），这样由于每月的还款额固定，可以有计划地控制家庭收入的支出，也便于每个家庭根据自己的收入情况，确定还贷能力。"
        },
        "本金": {
            title: "等额本金还款方式",
            content: "所谓等额本金还款，又称利随本清、等本不等息还款法。贷款人将本金分摊到每个月内，同时付清上一交易日至本次还款日之间的利息。"
        }
    },
    init: function(a) {
        var b = this;
        b._initEvent();
        Calculator.Loan.init();
    },
    _closeDropmenu: function() {
        if (window.navigator.appVersion.indexOf("MSIE 6") > -1) {
            $selectDropmenu.hide();
            $selectBox.removeClass("select-box-hover");
        } else {
            $selectBox.find(".select-dropmenu").slideUp(150);
            setTimeout(function() {
                $selectBox.removeClass("select-box-hover");
            }, 150);
        }
    },
    _selectMenuClick: function(d) {
        var c = this;
        var e = $(d).parent(".select-dropmenu")
            , a = $(d).parents(".select-box")
            , b = a.find(".selected-txt");
        b.text("").text($.trim($(d).text()));
        b.attr("value", $(d).attr("value"));
        $(d).addClass("cur").siblings().removeClass("cur");
        if ($(d).parent().attr("id") == "HOUSING_FUNDlilvSelectMenu") {
            $("#HOUSING_FUND_lilv_value").val($(d).attr("value"));
        }
        if ($(d).parent().attr("id") == "BUSINESSlilvSelectMenu") {
            $("#BUSINESS_lilv_value").val($(d).attr("value"));
        }
        c._closeDropmenu();
    },
    _initEvent: function() {
        var a = this;
        $selectBox = $(".select-box");
        $selectDropmenu = $selectBox.find(".select-dropmenu");
        $targeChild = $selectDropmenu.find("a");
        $targeChild.click(function() {
            a._selectMenuClick($(this));
        });
        $selectBox.click(function(b) {
            b.stopPropagation();
            var c = $(this).find(".select-dropmenu");
            if (c.is(":hidden")) {
                $(this).addClass("select-box-hover");
                if (window.navigator.appVersion.indexOf("MSIE 6") > -1) {
                    c.show();
                } else {
                    c.slideDown(200);
                }
            } else {
                a._closeDropmenu();
            }
        });
        $selectBox.mouseleave(function() {
            a._closeDropmenu();
        });
        $(document).click(function() {
            a._closeDropmenu();
        });
        $(document).on("click","a[name='showDialogInterest']",function() {
            //Calculator.queryRateTab(1);
        });
    },
    _initRate: function() {},
    getRate: function(d, b, a) {
        var c = this;
        var d = parseInt(d);
        if (a == 1) {
            if (b == 1 && c._Rates[d][1][1]) {
                return c._Rates[d][1][1];
            } else {
                return c._Rates[d][b][5];
            }
        } else {
            if (a <= 5) {
                return c._Rates[d][b][5];
            } else {
                return c._Rates[d][b][10];
            }
        }
    },
    changeTab: function(b) {
        var c = this;
        var a = $("div[class='tabs']");
        a.find("li[class='on']").removeClass("on");
        a.find("li[tag='" + b + "']").addClass("on");
        if (c._oldTabType && c._oldTabType != b) {
            $("div[tag='" + c._oldTabType + "Panel']").hide();
        }
        $("div[tag='" + b + "Panel']").show();
        c._oldTabType = b;
    },
    _resetForm: function(a, d, b) {
        var c = a.find("#" + d + "SelectMenu").find("a[value='" + b + "']");
        a.find("#" + d).attr("value", c.attr("value"));
        a.find("#" + d).text(c.text());
        c.addClass("cur").siblings().removeClass("cur");
    },
    _output: function() {
        var b = $("#cardBox")
            , a = parseInt(b.css("top"));
        if (a < 0) {
            b.animate({
                "top": "0" + "px"
            }, {
                easing: "easeOutBounce",
                duration: 800
            });
        }
    },
    queryRateTab: function(a) {
        $.get("json/data.json", function(b) {
            $("#interestDialog").html(b);
            if (a == 1) {
                //弹框显示利率表
            }
        });
    },
    queryRateData: function(a, b) {
        $.getJSON("json/data1.json", {
            loanType: a,
            loanPeriod: b
        }, function(d) {
            $("#" + a + "lilvSelectMenu").find("a").remove();
            for (var c = 0; c < d.length; c++) {
                if (c == 0) {
                    $("#" + a + "lilv").attr("value", d[c].rate);
                    $("#" + a + "lilv").text(d[c].desc);
                    $("#" + a + "lilvSelectMenu").append("<a href='javascript:;' onclick='Calculator._selectMenuClick(this)' class='cur' value='" + d[c].rate + "'>" + d[c].desc + "</a>");
                    $("#" + a + "_lilv_value").val(d[c].rate);
                } else {
                    $("#" + a + "lilvSelectMenu").append("<a href='javascript:;' onclick='Calculator._selectMenuClick(this)' value='" + d[c].rate + "'>" + d[c].desc + "</a>");
                }
            }
        });
    }
};
Calculator.Loan = {
    _tipsMap: {
        "本息": {
            title: "等额本息还款方式",
            content: "等额本息还款方式：在还款期内，每月偿还同等数额的贷款（包括本金和利息），这样由于每月的还款额固定，可以有计划地控制家庭收入的支出，也便于每个家庭根据自己的收入情况，确定还贷能力。"
        },
        "本金": {
            title: "等额本金还款方式",
            content: "所谓等额本金还款，又称利随本清、等本不等息还款法。贷款人将本金分摊到每个月内，同时付清上一交易日至本次还款日之间的利息。"
        }
    },
    init: function() {
        var a = this;
        a._div = $("div[tag='loanPanel']");
        a.queryRateSelectList();
        a._initEventListener();
        a._payStyleOnChange();
        a._loanStyleOnChange();
        a._setClassName();
    },
    _initEventListener: function() {
        var a = this;
        a._div.find("#calculate").click(function(b) {
            a._calculate();
        });
        a._div.find("#reset").click(function(b) {
            a._reset();
        });
        a._div.find("#payStyleSelectMenu").find("a").click(function(b) {
            a._payStyleOnChange();
            a._setClassName();
        });
        a._div.find("#loanStyleSelectMenu").find("a").click(function(b) {
            a.queryRateSelectList();
            a._loanStyleOnChange();
            a._setClassName();
        });
        a._div.find("#calculatorSelectMenu").find("a").click(function(b) {
            a._calculatorStyleDataOnChange();
            a._setClassName();
        });
        a._div.find("#timeStyleSelectMenu").find("a").click(function(b) {
            a.queryRateSelectList();
            a._timeStyleOnChange();
        });
        a._div.find("#HOUSING_FUNDlilvSelectMenu").find("a").click(function(b) {});
        a._div.find("#BUSINESSlilvSelectMenu").find("a").click(function(b) {});
    },
    _reset: function() {
        var a = this;
        Calculator._resetForm(a._div, "payStyle", 1);
        a._payStyleOnChange();
        Calculator._resetForm(a._div, "loanStyle", 1);
        a._loanStyleOnChange();
        Calculator._resetForm(a._div, "calculator", 1);
        a._calculatorStyleDataOnChange();
        Calculator._resetForm(a._div, "calculatorStyleData", 0.7);
        Calculator._resetForm(a._div, "timeStyle", 30);
        a._div.find("#loanTotal").val(0);
        a._div.find("#total").val(0);
        a._div.find("#gongjijin").val(0);
        a._div.find("#shangye").val(0);
        a.queryRateSelectList();
    },
    _roundData: function(c, b) {
        for (var a = 0; a < b; a++) {
            c = c * 10;
        }
        c = Math.round(c);
        for (var a = 0; a < b; a++) {
            c = c * 0.1;
        }
        c = c.toFixed(b);
        return c;
    },
    _setClassName: function() {
        var b = this;
        var a = b._div.find("#payStyle").attr("value");
        var d = b._div.find("#loanStyle").attr("value");
        var c = b._div.find("#calculator").attr("value");
        if ("2" == a && "1" == d && "1" == c) {
            $("#cardBox").attr("class", "card-box card-box01");
            $("#card_data_loan").attr("class", "card-data-loan01");
        } else {
            if ("2" == a && "2" == d && "1" == c) {
                $("#cardBox").attr("class", "card-box card-box02");
                $("#card_data_loan").attr("class", "card-data-loan02");
            } else {
                if ("2" == a && "1" == d && "2" == c) {
                    $("#cardBox").attr("class", "card-box card-box03");
                    $("#card_data_loan").attr("class", "card-data-loan03");
                } else {
                    if ("2" == a && "2" == d && "2" == c) {
                        $("#cardBox").attr("class", "card-box card-box04");
                        $("#card_data_loan").attr("class", "card-data-loan04");
                    } else {
                        if ("2" == a && "3" == d) {
                            $("#cardBox").attr("class", "card-box card-box05");
                            $("#card_data_loan").attr("class", "card-data-loan05");
                        } else {
                            if ("1" == a && "1" == d && "1" == c) {
                                $("#cardBox").attr("class", "card-box card-box06");
                                $("#card_data_loan").attr("class", "card-data-loan06");
                            } else {
                                if ("1" == a && "2" == d && "1" == c) {
                                    $("#cardBox").attr("class", "card-box card-box07");
                                    $("#card_data_loan").attr("class", "card-data-loan07");
                                } else {
                                    if ("1" == a && "1" == d && "2" == c) {
                                        $("#cardBox").attr("class", "card-box card-box08");
                                        $("#card_data_loan").attr("class", "card-data-loan08");
                                    } else {
                                        if ("1" == a && "2" == d && "2" == c) {
                                            $("#cardBox").attr("class", "card-box card-box09");
                                            $("#card_data_loan").attr("class", "card-data-loan09");
                                        } else {
                                            if ("1" == a && "3" == d) {
                                                $("#cardBox").attr("class", "card-box card-box091");
                                                $("#card_data_loan").attr("class", "card-data-loan091");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    _getData: function() {
        var a = this;
        fdjs_sumT = 0;
        fdjs_timeStyle = a._div.find("#timeStyle").attr("value") * 12;
        fdjs_payStyle = a._div.find("#payStyle").attr("value");
        fdjs_loanStyle = a._div.find("#loanStyle").attr("value");
        fdjs_calculatorStyle = a._div.find("#calculator").attr("value");
        fdjs_total = a._div.find("#total").val();
        fdjs_loanTotalData = a._div.find("#loanTotal").val();
        fdjs_calculatorStyleData = a._div.find("#calculatorStyleData").attr("value");
        fdjs_houseArea = a._div.find("#houseArea").val();
        fdjs_gongjijin = a._div.find("#gongjijin").val();
        fdjs_shangye = a._div.find("#shangye").val();
        fdjs_fpay = 0;
    },
    _timeStyleOnChange: function() {},
    _setRate: function() {
        var a = this;
    },
    _resetPanel: function() {
        var a = this;
        a._div.find("#totalPanel").html("0万元");
        a._div.find("#pTotalPanel").html("0万元");
        a._div.find("#fPayPanel").html("0万元");
        a._div.find("#rTotalPanel").html("0万元");
        a._div.find("#lTotalPanel").html("0万元");
        a._div.find("#monthTPanel").html("0月");
        a._div.find("#avgPPanel").html("0万元");
        a._div.find("#fmPayPanel").html("0万元");
        a._div.find("#lmPayPanel").html("0万元");
    },
    _computeLoanTotalData: function() {
        var a = this;
        if (fdjs_calculatorStyle == 1) {
            a._div.find("#totalPanel").html(a._roundData(fdjs_total, 2) + "万元");
            fdjs_fpay = fdjs_total * (1 - fdjs_calculatorStyleData);
            a._div.find("#fPayPanel").html(a._roundData(fdjs_fpay, 2) + "万元");
            fdjs_loanTotalData = fdjs_total * fdjs_calculatorStyleData;
        } else {
            if (fdjs_calculatorStyle == 2) {
                fdjs_loanTotalData = a._div.find("#loanTotal").val();
            }
        }
        a._div.find("#lTotalPanel").html(a._roundData(fdjs_loanTotalData, 2) + "万元");
    },
    _computeMoneyPlan: function(b, a) {
        var f = this;
        var e = 0;
        if (fdjs_payStyle == 1) {
            e = b * a * Math.pow(1 + a, fdjs_timeStyle) / (Math.pow(1 + a, fdjs_timeStyle) - 1);
            f._div.find("#pTotalPanel").html(f._roundData(e * fdjs_timeStyle, 3) + "万元");
            f._div.find("#rTotalPanel").html(f._roundData(e * fdjs_timeStyle - b, 3) + "万元");
            fdjs_sumT = fdjs_sumT - (-(e * fdjs_timeStyle - b));
            f._div.find("#avgPPanel").html(f._roundData(e * 10000, 2) + "元");
        } else {
            if (fdjs_payStyle == 2) {
                var g = 0;
                var d = "";
                for (var c = 1; c < fdjs_timeStyle + 1; c++) {
                    e = b / fdjs_timeStyle + (b - (c - 1) * b / fdjs_timeStyle) * a;
                    if (c == 1) {
                        f._div.find("#fmPayPanel").html(f._roundData(e * 10000, 2) + "元");
                    } else {
                        if (c == fdjs_timeStyle) {
                            f._div.find("#lmPayPanel").html(f._roundData(e * 10000, 2) + "元");
                        }
                    }
                    g = g + e;
                    d = d + "<p>第" + c + "月" + f._roundData(e * 10000, 2) + "元</p>";
                }
                f._div.find("#pTotalPanel").html(f._roundData(g, 3) + "万元");
                f._div.find("#rTotalPanel").html(f._roundData(g - b, 3) + "万元");
                fdjs_sumT = fdjs_sumT - (-(g - b));
                f._div.find("#loanListBox").html(d);
            }
        }
    },
    _calculate: function() {
        var e = this;
        e._getData();
        e._div.find("#monthTPanel").html(e._roundData(fdjs_timeStyle, 2) + "月");
        fdjs_gRate = parseFloat($("#HOUSING_FUND_lilv_value").val()) / 100;
        fdjs_bRate = parseFloat($("#BUSINESS_lilv_value").val()) / 100;
        if (fdjs_loanStyle == 1) {
            e._computeLoanTotalData();
            e._computeMoneyPlan(fdjs_loanTotalData, fdjs_gRate / 12);
        } else {
            if (fdjs_loanStyle == 2) {
                e._computeLoanTotalData();
                e._computeMoneyPlan(fdjs_loanTotalData, fdjs_bRate / 12);
            } else {
                if (fdjs_loanStyle == 3) {
                    var d = 0;
                    e._div.find("#lTotalPanel").html(e._roundData(fdjs_gongjijin - (-fdjs_shangye), 3) + "万元");
                    if (fdjs_payStyle == 1) {
                        var f = fdjs_gongjijin * fdjs_gRate / 12 * Math.pow(1 + fdjs_gRate / 12, fdjs_timeStyle) / (Math.pow(1 + fdjs_gRate / 12, fdjs_timeStyle) - 1);
                        var c = fdjs_shangye * fdjs_bRate / 12 * Math.pow(1 + fdjs_bRate / 12, fdjs_timeStyle) / (Math.pow(1 + fdjs_bRate / 12, fdjs_timeStyle) - 1);
                        d = f + c;
                        e._div.find("#pTotalPanel").html(e._roundData(d * fdjs_timeStyle, 3) + "万元");
                        e._div.find("#rTotalPanel").html(e._roundData(d * fdjs_timeStyle - fdjs_gongjijin - fdjs_shangye, 3) + "万元");
                        fdjs_sumT = fdjs_sumT - (-(d * fdjs_timeStyle - fdjs_gongjijin - fdjs_shangye));
                        e._div.find("#avgPPanel").html(e._roundData(d * 10000, 2) + "元");
                    } else {
                        if (fdjs_payStyle == 2) {
                            var g = 0;
                            var b = "";
                            var f;
                            var c;
                            for (var a = 1; a < fdjs_timeStyle + 1; a++) {
                                f = fdjs_gongjijin / fdjs_timeStyle + (fdjs_gongjijin - (a - 1) * fdjs_gongjijin / fdjs_timeStyle) * fdjs_gRate / 12;
                                c = fdjs_shangye / fdjs_timeStyle + (fdjs_shangye - (a - 1) * fdjs_shangye / fdjs_timeStyle) * fdjs_bRate / 12;
                                d = f + c;
                                if (a == 1) {
                                    e._div.find("#fmPayPanel").html(e._roundData(d * 10000, 2) + "元");
                                } else {
                                    if (a == fdjs_timeStyle) {
                                        e._div.find("#lmPayPanel").html(e._roundData(d * 10000, 2) + "元");
                                    }
                                }
                                g = g + d;
                                b = b + "<p>第" + a + "月" + e._roundData(d * 10000, 2) + "元</p>";
                            }
                            e._div.find("#pTotalPanel").html(e._roundData(g, 3) + "万元");
                            e._div.find("#rTotalPanel").html(e._roundData(g - fdjs_gongjijin - fdjs_shangye, 3) + "万元");
                            fdjs_sumT = fdjs_sumT - (-(g - fdjs_gongjijin - fdjs_shangye));
                            e._div.find("#loanListBox").html(b);
                        }
                    }
                }
            }
        }
        Calculator._output();
    },
    _payStyleOnChange: function() {
        var b = this;
        var a = b._div.find("#payStyle").attr("value");
        if (a == 1) {
            b._div.find("#loanListBox").parent().hide();
            b._div.find("#avgPPanel").parent().parent().show();
            b._div.find("#fmPayPanel").parent().parent().hide();
            b._div.find("#lmPayPanel").parent().parent().hide();
            b._div.find("#baseInfoTitle").show();
            b._div.find("#baseInfoContent").show();
        } else {
            if (a == 2) {
                b._div.find("#loanListBox").parent().show();
                b._div.find("#avgPPanel").parent().parent().hide();
                b._div.find("#fmPayPanel").parent().parent().show();
                b._div.find("#lmPayPanel").parent().parent().show();
                b._div.find("#baseInfoTitle").hide();
                b._div.find("#baseInfoContent").hide();
            }
        }
        b._resetPanel();
    },
    _changeTips: function(b) {
        var c = this;
        var a = c._tipsMap[b];
        c._div.find("div[tag='tipsTitle']").html(a.title);
        c._div.find("div[class='tips']").html(a.content);
    },
    _loanStyleOnChange: function() {
        var b = this;
        var a = b._div.find("#loanStyle").attr("value");
        if (a == 1) {
            b._div.find("#calculatorPanel").show();
            b._div.find("#totalPanel").parent().parent().show();
            b._div.find("#calculatorRate").show();
            b._div.find("#totalPrice").show();
            b._div.find("#loanTotalPanel").hide();
            b._div.find("#loanSum").hide();
            b._div.find("#fPayPanel").parent().parent().show();
            b._calculatorStyleDataOnChange();
        } else {
            if (a == 2) {
                b._div.find("#calculatorPanel").show();
                b._div.find("#totalPanel").parent().parent().show();
                b._div.find("#calculatorRate").show();
                b._div.find("#totalPrice").show();
                b._div.find("#loanTotalPanel").hide();
                b._div.find("#loanSum").hide();
                b._div.find("#fPayPanel").parent().parent().show();
                b._calculatorStyleDataOnChange();
            } else {
                if (a == 3) {
                    b._div.find("#loanSum").show();
                    b._div.find("#calculatorPanel").hide();
                    b._div.find("#totalPanel").parent().parent().hide();
                    b._div.find("#calculatorRate").hide();
                    b._div.find("#totalPrice").hide();
                    b._div.find("#loanTotalPanel").hide();
                    b._div.find("#fPayPanel").parent().parent().hide();
                }
            }
        }
        b._resetPanel();
    },
    _calculatorStyleDataOnChange: function() {
        var b = this;
        var a = b._div.find("#calculator").attr("value");
        if (a == 1) {
            b._div.find("#totalPrice").show();
            b._div.find("#calculatorRate").show();
            b._div.find("#loanTotalPanel").hide();
            b._div.find("#totalPanel").parent().parent().show();
            b._div.find("#fPayPanel").parent().parent().show();
        } else {
            b._div.find("#totalPrice").hide();
            b._div.find("#calculatorRate").hide();
            b._div.find("#loanTotalPanel").show();
            b._div.find("#totalPanel").parent().parent().hide();
            b._div.find("#fPayPanel").parent().parent().hide();
        }
        b._resetPanel();
    },
    queryRateSelectList: function() {
        var b = $("#loanStyle").attr("value");
        var a = parseInt($("#timeStyle").attr("value")) * 12;
        if ("1" == b) {
            $("#HOUSING_FUNDLi").show();
            $("#BUSINESSLi").hide();
            Calculator.queryRateData("HOUSING_FUND", a);
        } else {
            if ("2" == b) {
                $("#BUSINESSLi").show();
                $("#HOUSING_FUNDLi").hide();
                Calculator.queryRateData("BUSINESS", a);
            } else {
                if ("3" == b) {
                    $("#HOUSING_FUNDLi").show();
                    $("#BUSINESSLi").show();
                    Calculator.queryRateData("HOUSING_FUND", a);
                    Calculator.queryRateData("BUSINESS", a);
                }
            }
        }
    }
};
function getLayouts(b, a) {
    $.ajax({
        url: "json/data.json",
        data: {
            pageSize: 100,
            currentPage: 1
        },
        success: function(m) {
            if (m != null ) {
                var i = m.page;
                var g = m.avgPrice;
                if (i != null ) {
                    var j = "";
                    var h = '<div class="select-dropmenu">';
                    var d;
                    var k;
                    var f;
                    var l;
                    var e;
                    var c;
                    $.each(i.items, function(o, p) {
                        d = p.name;
                        k = p.bedRoom;
                        f = p.area;
                        l = p.livingRoom;
                        e = p.id;
                        c = p.houseType;
                        if (d == null ) {
                            d = "";
                        }
                        if (k == null ) {
                            k = "";
                        } else {
                            k += "室";
                        }
                        if (l == null ) {
                            l = "";
                        } else {
                            l += "厅";
                        }
                        if (c == null ) {
                            c = "";
                        } else {
                            k = "";
                            l = "";
                            if (c == "VILLA") {
                                c = "别墅";
                            } else {
                                if (c == "OTHER") {
                                    c = "其他";
                                } else {
                                    c = "";
                                }
                            }
                        }
                        var n = 0;
                        if (g != null && f != null && f != "") {
                            g = parseFloat(g);
                            f = parseFloat(f);
                            n = g * f / 10000;
                        }
                        if (f == null ) {
                            f = "";
                        } else {
                            f += "平米";
                        }
                        if (e == a) {
                            j += '<p class="selected-con clearfix"><span class="selected-txt lfloat">' + d + c + k + l + f + '</span><i class="selected-arrow lfloat"></i></p>';
                        }
                        if (e == a) {
                            h += '<a href="javascript:;" class="cur" onClick=changeLayout(' + n + ")>" + d + c + k + l + f + "</a>";
                        } else {
                            h += '<a href="javascript:;" onClick=changeLayout(' + n + ")>" + d + c + k + l + f + "</a>";
                        }
                    });
                    h += "</div>";
                    $("#layoutNameId").html(j + h);
                    $("body .select-dropmenu a").on("click", selectDropmenuAClick);
                    Calculator.Loan._calculate();
                }
            }
        }
    });
}
function changeLayout(a) {
    $("#total").val(a);
}
