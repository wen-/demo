// JavaScript Document
$(function(){

    /*
     document.addEventListener("deviceready",onDeviceReady,false);
     function onDeviceReady(){
     document.addEventListener("backbutton", onBackKeyDown, false);
     document.addEventListener("menubutton", onMenuKeyDown, false);

     $.wen_plug_appupdate({
     autoUpdate:true,									//是否开启自动更新：true\false
     elemUpdate:"#updateAPP",						//更新触发标签:#id\.class\标签名
     updateUrl:"http://192.168.1.144:3000/updateapp"		//更新服务器的地址
     });

     $(document).on("click","#exitApp",function(){
     navigator.notification.confirm(
     '确定要退出吗？', // message
     onConfirm,            // callback to invoke with index of button pressed
     '退出应用',           // title
     '确定,取消'         // buttonLabels
     );
     function onConfirm(buttonIndex){
     if(buttonIndex==1){
     navigator.app.exitApp();
     }
     }
     return false;
     });

     $(document).on("click",".exitApp_bg",function(){
     $(this).hide();
     });


     //$(document).on("click",function(e){
     //var e = e || window.event;
     //var targ = e.target || e.srcElement;
     //if( !$(targ).attr("id") != "exitApp" ){
     // $("#exitApp").hide();
     //}
     //});

     };
     //返回按钮
     function onBackKeyDown() {
     if($(".exitApp_bg").is(":visible")){
     $(".exitApp_bg").hide();
     return;
     }
     if($(".popup_box_bg").is(":visible")){
     $(".popup_box_bg").hide();
     return;
     }

     if($("#homePage").length > 0){
     navigator.notification.confirm(
     '确定要退出吗？', // message
     onConfirm,            // callback to invoke with index of button pressed
     '退出应用',           // title
     '确定,取消'         // buttonLabels
     );
     function onConfirm(buttonIndex){
     if(buttonIndex==1){
     navigator.app.exitApp();
     }
     }
     }else{
     navigator.app.backHistory();
     }
     }
     //菜单按钮
     function onMenuKeyDown() {
     if($("#exitApp").length > 0){
     $(".exitApp_bg").show();
     }else{
     $('<div class="exitApp_bg ui-page-theme-a" data-role="page" style="background-color:rgba(0,0,0,.3);position: absolute;z-index:100;top: 0;left:0;"><ul data-role="listview" style="position: absolute;left:0;bottom: 0;width:100%;"><li id="updateAPP">检测新版本</li><li id="exitApp">退&nbsp;出</li></ul></div>').appendTo("body").enhanceWithin();
     $(".exitApp_bg").css({"width":$(window).width(),"height":$(window).height()});
     $("#updateAPP").click(function(){
     $(".exitApp_bg").hide();
     });
     }

     //navigator.notification.alert('菜单按钮被点击了！');
     }
     */

    //alert($(window).width()+'----'+$(window).height());

});


$(document).on("pagebeforecreate",function(){
    $.mobile.loading( "show", {
        text:"数据加载中",
        textVisible: "true",
        theme: "a",
        textonly: false,
        html: ""
    });
});

var tTime = {};
$(document).on("pagecreate","#door7",function(){
    tTime.h = new Date().getHours();
    tTime.h = tTime.h < 12?tTime.h:tTime.h-12;
    tTime.m = new Date().getMinutes();
});
$(document).on("pagecreate",function(){
//开始游戏
$("#startGame").on("click",function(){
    $(".door_l").css({"-webkit-transform":"translateX(0)"});
    $(".door_r").css({"-webkit-transform":"translateX(0)"});
    setTimeout(function(){
        window.location = "game0.html";
    },3000);
    return false;
});

//绑定单门左右滑动事件
$(document).on({
    swipeleft:function(event){
        $(this).addClass("translate_x open");
    },
    swiperight:function(event){
        $(this).removeClass("translate_x open");
    }
},".touchDoor");

//绑定左门左右滑动事件
$(document).on({
    swipeleft:function(event){
        $(this).addClass("translate_l open");
        if($(this).siblings(".doorMM_door").hasClass("open")){
            $(this).siblings(".doorMM_in").children("a").show();
        }else{
            $(this).siblings(".doorMM_in").children("a").hide();
        }
    },
    swiperight:function(event){
        $(this).removeClass("translate_l open");
        $(this).siblings(".doorMM_in").children("a").hide();
    }
},".touchDoor_l");

//绑定右门左右滑动事件
$(document).on({
    swiperight:function(event){
        $(this).addClass("translate_r open");
        if($(this).siblings(".doorMM_door").hasClass("open")){
            $(this).siblings(".doorMM_in").children("a").show();
        }else{
            $(this).siblings(".doorMM_in").children("a").hide();
        }
    },
    swipeleft:function(event){
        $(this).removeClass("translate_r open");
        $(this).siblings(".doorMM_in").children("a").hide();
    }
},".touchDoor_r");

//地毯
$(document).on("click",".rug_for3",function(event){
    $(this).toggleClass("open");
});
$(document).on("click","#door3",function(event){
    if(!$(event.target).hasClass("rug_for3")){
        $(".rug_for3").removeClass("open");
    }
});
$(document).on("click",".card_for3",function(){
    $(this).appendTo($(".toolBox li:first"));
});

//点击道具
var toolObj = {};
$(document).on("click",".toolBox li",function(){
    if(!$(this).is(":empty")){
        $(this).toggleClass("on");
        var d = $(this).children().attr("data-door");
        if($(this).hasClass("on")){
            toolObj[d] = true;
        }else{
            toolObj[d] = false;
        }
    }
});
//点击刷卡器
$(document).on("click","#cardBoxDoor3",function(){
    var d1 = $(this).attr("data-door");
    if(!!toolObj[d1]){
        $(".toolBox li").removeClass("on").empty();
        $(this).find(".cardBox_redLed").css({"visibility":"hidden"}).siblings().css({"visibility":"visible"});
        $(this).siblings(".doorMM_door").addClass("translate_x open");
    }
});
//点击7关小钟
$(document).on("click","#clockSmall",function(){
    $("#clockBig").show();
});
//8关指纹
$(document).on("taphold","#fingerprint",function(){
    $(this).siblings(".doorMM_door").addClass("translate_x tDuration");
});
//9关填字
$(document).on("click","#cardBoxDoor9",function(){
    $('<div class="door9popup" id="door9popup" style="position: absolute;z-index:11;left: 0;top:0;background-color: rgba(0,0,0,.8);width: 100%;height:100%;"><div class="door9popup_body" style="position:relative;top:15em;margin: 0 auto;width: 15em;text-align: center;background-color: #ccc;border-radius: .5em;padding:2em;"><div class="door9popup_txt" style="margin-bottom: 1em;font-size: 2em;">知 <input type="text" size="1" /> <input type="text" size="1" /> 乐</div><div class="finish_btn"><button id="door9popupFinishBtn" type="button">确定</button></div> </div></div>').appendTo("body");
    $("#door9popup").click(function(){
        $(this).fadeOut().remove();
    });
    $(".door9popup_body").click(function(){
        return false;
    });
    $("#door9popupFinishBtn").click(function(){
        var t = contval($(".door9popup_txt input"),"足长");
        if(!!t){
            $("#door9 .doorMMBoard_txt").text("知足长乐");
            $("#door9 .doorMM_door").addClass("translate_x tDuration");
            $("#cardBoxDoor9").find(".cardBox_redLed").css("visibility","hidden").siblings(".cardBox_greenLed").css("visibility","visible");
        }
        $(this).parents("#door9popup").fadeOut().remove();
    })
});
function contval(valArray,txt){
    var valArray_t = [];
    $.each(valArray,function(i,n){
        valArray_t.push($(this).val());
    });
    if(valArray_t.join("") == txt){
        return true;
    }else{
        return false;
    }
}


//4关方向提示
var openOrder = ($(".openOrder").text()).replace(/\s/g,''),
    openArray = [],
    openObj = {};
    openObj.lleftB = true;
    openObj.rrightB = true;
    openObj.ttopB = true;
    openObj.bbottomB = true;
    openObj.rotateN = 0;
    openObj.s1 = 0;
    openObj.s2 = 0;
    openObj.s3 = 0;
    openObj.s4 = 0;
    openObj.s1_1 = false;
    openObj.s2_1 = false;
    openObj.s3_1 = false;
    openObj.s4_1 = false;
    openObj.s1_2 = false;
    openObj.s2_2 = false;
    openObj.s3_2 = false;
    openObj.s4_2 = false;



$(document).on("vmousedown",".touchFollow_l,.touchFollow_r,.touchFollow_t,.clock_big,.rug_box .rug",function(event){
    var x = event.pageX,
        y = event.pageY;
    openObj.t = true;
    openObj.l = $(this);
    openObj.lw = $(this).outerWidth();
    openObj.lh = $(this).outerHeight();
    openObj.lx = x;
    openObj.ly = y;
    openObj.lleft1 = parseInt((openObj.l).css("left"));
    openObj.rright1 = parseInt((openObj.l).css("left"));
    openObj.ttop1 = parseInt((openObj.l).css("top"));
    $(this).removeClass("tDuration");
    clearTimeout(openObj.setT);
    //clearTimeout(openObj.setT1);
    if(openObj.lleftB && (openObj.l).hasClass("touchFollow_l")){
        openObj.lleft = parseInt((openObj.l).css("left"));
        openObj.lleftB = false;
    }
    if(openObj.rrightB && (openObj.l).hasClass("touchFollow_r")){
        openObj.rright = parseInt((openObj.l).css("left"));
        openObj.rrightB = false;
    }
    if(openObj.ttopB && (openObj.l).hasClass("touchFollow_t")){
        openObj.ttop = parseInt((openObj.l).css("top"));
        openObj.ttopB = false;
    }

    if((openObj.l).hasClass("rug")){
        openObj.rugList1_xs = $(".rug_list1").offset().left;
        openObj.rugList2_xs = $(".rug_list2").offset().left;
        openObj.rugList3_xs = $(".rug_list3").offset().left;
        openObj.rugList1_ys = $(".rug_list1").offset().top;
        openObj.rugList2_ys = $(".rug_list2").offset().top;
        openObj.rugList3_ys = $(".rug_list3").offset().top;
        (openObj.l).css({"position":"absolute","left":x-openObj.lw *.5-(openObj.l.parents(".rug_listBox").offset().left),"top":y-openObj.lh *.5-(openObj.l.parents(".rug_listBox").offset().top)+70,"z-index":"11"});
    }

    if((openObj.l).hasClass("clock_big")){
        openObj.clockCenter_x = $(".clockHand_center").offset().left + $(".clockHand_center").width()*.5;
        openObj.clockCenter_y = $(".clockHand_center").offset().top + $(".clockHand_center").height()*.5;
        openObj.n = 0;openObj.n1 = 0;
        //第一象限
        if(openObj.lx > openObj.clockCenter_x && openObj.ly < openObj.clockCenter_y){
            openObj.s = 1;
        }
        //第二象限
        if(openObj.lx < openObj.clockCenter_x && openObj.ly < openObj.clockCenter_y){
            openObj.s = 2;
        }
        //第三象限
        if(openObj.lx < openObj.clockCenter_x && openObj.ly > openObj.clockCenter_y){
            openObj.s = 3;
        }
        //第四象限
        if(openObj.lx > openObj.clockCenter_x && openObj.ly > openObj.clockCenter_y){
            openObj.s = 4;
        }

        openObj.sdeg = Math.floor(Math.atan2(openObj.lx - openObj.clockCenter_x,-(openObj.ly - openObj.clockCenter_y))*180/Math.PI);
        openObj.sdeg1 = openObj.sdeg < 0?openObj.sdeg+360:openObj.sdeg;
        openObj.sdeg1 = (openObj.sdeg1 == 360)?0:openObj.sdeg1;
        var tval_m = $(".clockHand_minute").css("transform"),
            tval_h = $(".clockHand_hour").css("transform");
        tval_m = tval_m.slice(7,-1).split(",");
        tval_h = tval_h.slice(7,-1).split(",");
        openObj.b = false;
        openObj.olddeg_m = Math.ceil(Math.acos(tval_m[0])*180/Math.PI);
        openObj.olddeg_m = tval_m[1] < 0?360-openObj.olddeg_m<360?360-openObj.olddeg_m:0:openObj.olddeg_m;
        openObj.olddeg_h = Math.ceil(Math.acos(tval_h[0])*180/Math.PI);
        openObj.olddeg_h = tval_h[1] < 0?360-openObj.olddeg_h<360?360-openObj.olddeg_h:0:openObj.olddeg_h;
    }

});
$(document).on("vmousemove","body",function(event){
    if(openObj.t) {
        var x1 = event.pageX,
            y1 = event.pageY,
            new_x = x1 - openObj.lx,
            new_y = y1 - openObj.ly;
        var newLeft,newTop;
        //4关开始
        if((openObj.l).hasClass("touchFollow_l")){
            newLeft = (openObj.lleft1 + new_x) > openObj.lleft?openObj.lleft:(openObj.lleft1 + new_x) < openObj.lleft+(-openObj.lw*.5)?openObj.lleft+(-openObj.lw*.5):openObj.lleft1 + new_x;
        }else if((openObj.l).hasClass("touchFollow_r")){
            newLeft = (openObj.rright1 + new_x) < openObj.rright?openObj.rright:(openObj.rright1 + new_x) > openObj.rright+(openObj.lw*.5)?openObj.rright+(openObj.lw*.5):openObj.rright1 + new_x;
        }else if((openObj.l).hasClass("touchFollow_t")){
            newTop = (openObj.ttop1 + new_y) > openObj.ttop?openObj.ttop:(openObj.ttop1 + new_y) < openObj.ttop+(-openObj.lh)?openObj.ttop+(-openObj.lh):openObj.ttop1 + new_y;
        }
        if((openObj.l).hasClass("touchFollow_l") || (openObj.l).hasClass("touchFollow_r")){
            (openObj.l).css("left",newLeft);
            //6关
            if((openObj.l).hasClass("magnetism") && (openObj.l).hasClass("touchFollow_l")){
                (openObj.l).siblings(".magnetism").addClass("tDuration").css("left", "50%");
            }else if((openObj.l).hasClass("magnetism") && (openObj.l).hasClass("touchFollow_r")){
                (openObj.l).siblings(".magnetism").addClass("tDuration").css("left", "-50%");
            }
        }else if((openObj.l).hasClass("touchFollow_t") || (openObj.l).hasClass("touchFollow_b")){
            (openObj.l).css("top",newTop);
        }

        if((openObj.l).hasClass("rug")){
            (openObj.l).css({"position":"absolute","left":x1-openObj.lw *.5-(openObj.l.parents(".rug_listBox").offset().left),"top":y1-openObj.lh *.5-(openObj.l.parents(".rug_listBox").offset().top)+70,"z-index":"11"});
        }

        //时钟
        if((openObj.l).hasClass("clock_big")){
            openObj.edeg = Math.floor(Math.atan2(x1 - openObj.clockCenter_x,-(y1 - openObj.clockCenter_y))*180/Math.PI);
            openObj.edeg = openObj.edeg < 0?openObj.edeg+360:openObj.edeg;
            openObj.edeg = (openObj.edeg == 360)?0:openObj.edeg;

            //第一象限
            if(x1 > openObj.clockCenter_x && y1 < openObj.clockCenter_y){
                openObj.s1 = 1;
                if(openObj.s == 1) {
                    if(openObj.edeg < openObj.sdeg1){
                        if(!!openObj.s1_1){
                            openObj.rotateN--;
                            openObj.s1_1 = false;
                            openObj.s1_2 = true;
                        }
                    }
                    if(openObj.edeg >= openObj.sdeg1){
                        if(!!openObj.s1_2){
                            openObj.rotateN++;
                            openObj.s1_1 = true;
                            openObj.s1_2 = false;
                        }
                    }
                    if(openObj.s2 == 1 && openObj.edeg >= openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s2 = 0;
                        openObj.s1_1 = true;
                        openObj.s1_4 = true;
                    }
                    if(!!openObj.s1_4 && openObj.edeg > openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s1_4 = false;
                    }
                    if(openObj.s4 == 1 && openObj.edeg <= openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s4 = 0;
                        openObj.s1_2 = true;
                        openObj.s1_3 =true;
                    }
                    if(!!openObj.s1_3 && openObj.edeg < openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s1_3 = false;
                    }

                }else{
                    if(openObj.s2 == 1 && openObj.s == 2 && openObj.s2_1 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN+1;
                        openObj.s2 = 0;
                    }else if(openObj.s2 == 1){
                        openObj.rotateN++;
                        openObj.s2 = 0;
                    }
                    if(openObj.s4 == 1 && openObj.s == 4 && openObj.s4_2 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN-1;
                        openObj.s4 = 0;
                    }else if(openObj.s4 == 1){
                        openObj.rotateN--;
                        openObj.s4 = 0;
                    }
                }
                openObj.s2_1 = false;
                openObj.s2_2 = false;
                openObj.s4_1 = false;
                openObj.s4_2 = false;
            }
            //第二象限
            if(x1 < openObj.clockCenter_x && y1 < openObj.clockCenter_y){
                openObj.s2 = 1;
                if(openObj.s == 2){
                    if(openObj.edeg < openObj.sdeg1){
                        if(!!openObj.s2_1){
                            openObj.rotateN--;
                            openObj.s2_1 = false;
                            openObj.s2_2 = true;
                        }
                    }
                    if(openObj.edeg >= openObj.sdeg1){
                        if(!!openObj.s2_2){
                            openObj.rotateN++;
                            openObj.s2_1 = true;
                            openObj.s2_2 = false;
                        }
                    }
                    if(openObj.s3 == 1 && openObj.edeg >= openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s3 = 0;
                        openObj.s2_1 = true;
                        openObj.s2_4 = true;
                    }
                    if(!!openObj.s2_4 && openObj.edeg > openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s2_4 = false;
                    }
                    if(openObj.s1 == 1 && openObj.edeg <= openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s1 = 0;
                        openObj.s2_2 = true;
                        openObj.s2_3 = true;
                    }
                    if(!!openObj.s2_3 && openObj.edeg < openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s2_3 = false;
                    }
                }else{
                    if(openObj.s3 == 1 && openObj.s == 3 && openObj.s3_1 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN+1;
                        openObj.s3 = 0;
                    }else if(openObj.s3 == 1){
                        openObj.rotateN++;
                        openObj.s3 = 0;
                    }
                    if(openObj.s1 == 1 && openObj.s == 1 && openObj.s1_2 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN-1;
                        openObj.s1 = 0;
                    }else if(openObj.s1 == 1){
                        openObj.rotateN--;
                        openObj.s1 = 0;
                    }
                }
                openObj.s1_1 = false;
                openObj.s1_2 = false;
                openObj.s3_1 = false;
                openObj.s3_2 = false;
            }
            //第三象限
            if(x1 < openObj.clockCenter_x && y1 > openObj.clockCenter_y){
                openObj.s3 = 1;
                if(openObj.s == 3) {
                    if(openObj.edeg < openObj.sdeg1){
                        if(!!openObj.s3_1){
                            openObj.rotateN--;
                            openObj.s3_1 = false;
                            openObj.s3_2 = true;
                        }
                    }
                    if(openObj.edeg >= openObj.sdeg1){
                        if(!!openObj.s3_2){
                            openObj.rotateN++;
                            openObj.s3_1 = true;
                            openObj.s3_2 = false;
                        }
                    }
                    if(openObj.s4 == 1 && openObj.edeg >= openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s4 = 0;
                        openObj.s3_1 = true;
                        openObj.s3_4 = true;
                    }
                    if(!!openObj.s3_4 && openObj.edeg > openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s3_4 = false;
                    }
                    if(openObj.s2 == 1 && openObj.edeg <= openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s2 = 0;
                        openObj.s3_2 = true;
                        openObj.s3_3 = true;
                    }
                    if(!!openObj.s3_3 && openObj.edeg < openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s3_3 = false;
                    }
                }else{
                    if(openObj.s4 == 1 && openObj.s == 4 && openObj.s4_1 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN+1;
                        openObj.s4 = 0;
                    }else if(openObj.s4 == 1){
                        openObj.rotateN++;
                        openObj.s4 = 0;
                    }
                    if(openObj.s2 == 1 && openObj.s == 2 && openObj.s2_2 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN-1;
                        openObj.s2 = 0;
                    }else if(openObj.s2 == 1){
                        openObj.rotateN--;
                        openObj.s2 = 0;
                    }
                }
                openObj.s2_1 = false;
                openObj.s2_2 = false;
                openObj.s4_1 = false;
                openObj.s4_2 = false;
            }
            //第四象限
            if(x1 > openObj.clockCenter_x && y1 > openObj.clockCenter_y){
                openObj.s4 = 1;
                if(openObj.s == 4) {
                    if(openObj.edeg < openObj.sdeg1){
                        if(!!openObj.s4_1){
                            openObj.rotateN--;
                            openObj.s4_1 = false;
                            openObj.s4_2 = true;
                        }
                    }
                    if(openObj.edeg >= openObj.sdeg1){
                        if(!!openObj.s4_2){
                            openObj.rotateN++;
                            openObj.s4_1 = true;
                            openObj.s4_2 = false;
                        }
                    }
                    if(openObj.s1 == 1 && openObj.edeg >= openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s1 = 0;
                        openObj.s4_1 = true;
                        openObj.s4_4 = true;
                    }
                    if(!!openObj.s4_4 && openObj.edeg > openObj.sdeg1){
                        openObj.rotateN++;
                        openObj.s4_4 = false;
                    }
                    if(openObj.s3 == 1 && openObj.edeg <= openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s3 = 0;
                        openObj.s4_2 = true;
                        openObj.s4_3 = true;
                    }
                    if(!!openObj.s4_3 && openObj.edeg < openObj.sdeg1){
                        openObj.rotateN--;
                        openObj.s4_3 = false;
                    }
                }else{
                    if(openObj.s1 == 1 && openObj.s == 1 &&  openObj.s1_1 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN+1;
                        openObj.s1 = 0;
                    }else if(openObj.s1 == 1){
                        openObj.rotateN++;
                        openObj.s1 = 0;
                    }
                    if(openObj.s3 == 1 && openObj.s == 3 &&  openObj.s3_2 == true){
                        openObj.rotateN = openObj.rotateN%4!=0?openObj.rotateN:openObj.rotateN-1;
                        openObj.s3 = 0;
                    }else if(openObj.s3 == 1){
                        openObj.rotateN--;
                        openObj.s3 = 0;
                    }
                }
                openObj.s1_1 = false;
                openObj.s1_2 = false;
                openObj.s3_1 = false;
                openObj.s3_2 = false;
            }

            openObj.n = Math.floor(Math.abs(openObj.rotateN)/4);
            openObj.n1 = openObj.n;

            openObj.newdeg = openObj.edeg - openObj.sdeg1;
            if(openObj.newdeg > 0 && openObj.rotateN < 0 ){
                openObj.newdeg = openObj.newdeg - 360;
            }
            if(openObj.newdeg < 0 && openObj.rotateN > 0){
                openObj.newdeg = openObj.newdeg +360;
            }
            var ndeg = openObj.rotateN > 0?360*openObj.n1:-360*openObj.n1;
            openObj.newdeg = openObj.newdeg + ndeg;
            //console.log("滑动开始角度："+Math.ceil(openObj.sdeg1)+"滑动结束角度："+Math.ceil(openObj.edeg)+"滑动角度："+Math.ceil(openObj.newdeg)+"圈数："+openObj.n1);


            $(".clockHand_minute").css("transform","rotate("+(openObj.olddeg_m+openObj.newdeg)+"deg)");
            $(".clockHand_hour").css("transform","rotate("+(openObj.olddeg_h+openObj.newdeg/72*6)+"deg)");
            //角度是否与当前时间相匹配
            var tTime_hdeg = tTime.h* 5*6,tTime_mdeg = tTime.m*6;
            if((openObj.olddeg_h+openObj.newdeg/72*6)%360 > tTime_hdeg && (openObj.olddeg_h+openObj.newdeg/72*6)%360 < tTime_hdeg+30 && (openObj.olddeg_m+openObj.newdeg)%360 > tTime_mdeg-5 && (openObj.olddeg_m+openObj.newdeg)%360 < tTime_mdeg+5){
                openObj.l.fadeOut("slow");
                openObj.l.parents(".doorM_m").find(".doorMM_door").addClass("translate_x tDuration");
            }
        }

    }
});
$(document).on("vmouseup","body",function(event){
    if(openObj.t) {
        var x = event.pageX,
            y = event.pageY;
        openObj.t = false;
        openObj.rotateN = 0;
        openObj.s1 = 0;
        openObj.s2 = 0;
        openObj.s3 = 0;
        openObj.s4 = 0;
        openObj.s1_1 = false;
        openObj.s2_1 = false;
        openObj.s3_1 = false;
        openObj.s4_1 = false;
        openObj.s1_2 = false;
        openObj.s2_2 = false;
        openObj.s3_2 = false;
        openObj.s4_2 = false;
        openObj.b = false;
        if(jQuery.mobile.activePage[0].id != "door6"){
            if((openObj.l).hasClass("touchFollow_l")) {
                (openObj.l).addClass("tDuration").css("left", "-50%");
                if(x < openObj.lx && jQuery.mobile.activePage[0].id == "door4"){
                    openArray.push('0');
                }
            }else if((openObj.l).hasClass("touchFollow_r")){
                (openObj.l).addClass("tDuration").css("left", "50%");
                if(x > openObj.lx && jQuery.mobile.activePage[0].id == "door4"){
                    openArray.push('1');
                }
            }else if((openObj.l).hasClass("touchFollow_t")){
                window.setTimeout(function(){
                    (openObj.l).addClass("tDuration").css("top", "0");
                },500)
            }
            if(openArray.length == openOrder.length && jQuery.mobile.activePage[0].id == "door4"){
                if(openArray.join("") == openOrder){
                    (openObj.l).addClass("tDuration").css("left", "-100%").siblings(".doorMM_door").addClass("tDuration").css("left", "98%");
                    (openObj.l).siblings(".doorMM_in").children("a").show();
                }
                openArray =[];
            }
        }
        if(jQuery.mobile.activePage[0].id == "door6"){
            if((openObj.l).hasClass("touchFollow_l") && parseInt((openObj.l).css("left")) == openObj.lleft*2) {
                //console.log(parseInt((openObj.l).css("left"))+'--左--'+openObj.lleft);
                openObj.setT = setTimeout(function(){
                    $("#ledBtn").addClass("on");
                    (openObj.l).removeClass("magnetism");
                    openObj.setT1 = setTimeout(function(){
                        if($("#ledBtn").hasClass("on")){
                            $("#ledBtn").removeClass("on");
                            (openObj.l).addClass("magnetism");
                            $(".touchFollow_l").addClass("tDuration").css("left", "-50%");
                            $(".touchFollow_r").addClass("tDuration").css("left", "50%");
                            (openObj.l).siblings(".doorMM_in").children("a").hide();
                        }
                    },3000)
                },3000)
            }
            if((openObj.l).hasClass("touchFollow_r") && parseInt((openObj.l).css("left")) == openObj.rright*2) {
                //console.log(parseInt((openObj.l).css("left"))+'----'+openObj.rright);
                if($("#ledBtn").hasClass("on")) {
                    (openObj.l).siblings(".doorMM_in").children("a").show();
                }
            }
        }
        if((openObj.l).hasClass("rug")){
            if(x>openObj.rugList1_xs && x<openObj.rugList1_xs+openObj.lw && y>openObj.rugList1_ys && y<openObj.rugList1_ys+openObj.lh){
                (openObj.l).appendTo(".rug_list1");
            }else if(x>openObj.rugList2_xs && x<openObj.rugList2_xs+openObj.lw && y>openObj.rugList2_ys && y<openObj.rugList2_ys+openObj.lh){
                (openObj.l).appendTo(".rug_list2");
            }else if(x>openObj.rugList3_xs && x<openObj.rugList3_xs+openObj.lw && y>openObj.rugList3_ys && y<openObj.rugList3_ys+openObj.lh){
                (openObj.l).appendTo(".rug_list3");
            }
            (openObj.l).css({"position":"static"});
            var l1 = $(".rug_list1").children().length,
                l2 = $(".rug_list2").children().length,
                l3 = $(".rug_list3").children().length;
            if(l1 == 2 && l2 == 5 && l3 == 3){
                $("#door10 .doorMM_door").addClass("translate_x tDuration");
            }
        }
    }
});


});
