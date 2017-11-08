/* 
 * JS Document for ccb.com
 * wen for geong.com
 * copyright wen
 * email:yellowwen@126.com
 * Date: 2013-11-13
 *
*/

 
(function($){
	var page_i = 0,
		//fsize_i = 16,
		modifiers = '',
		keyN = null,
		toolZoom = "toolZoom",
		guides_line = "guides_line",
		pageX,
		pageY,
		z = true,
		clo = "",
		guidesSwitch = false,
		tipsSwitch = false,
		pySwitch = true,
		fontSwitch = true,
		_initialize = true,
		//cookie
		toorbar_view = false,
		toorbar_tview = false,
		toorbar_tips = false,
		toorbar_pagez = '',
		//toorbar_textz = '',
		toorbar_clo = '',
		toorbar_guidesSwitch = false,
		toorbar_tipsSwitch = false,
		toorbar_pySwitch = true,
		toorbar_fontSwitch = true,
		TAG = "a,abbr,address,article,aside,b,base,bdo,blockquote,button,caption,cite,code,col,colgroup,command,datagrid,datalist,datatemplate,dd,del,details,dialog,div,dfn,dl,dt,em,fieldset,figure,font,footer,form,head,header,i,input,ins,label,legend,li,m,menu,nav,ol,optgroup,option,output,p,pre,q,s,samp,section,select,small,span,strong,sub,sup,tbody,td,textarea,tfoot,th,thead,time,title,tr,u,ul";
	
	
	$.wen_plug_toolbar = {
		tView : function(){//纯文本显示
			toorbar_tview = true;
			//去掉行内样式
			$("body *:not(#toolbar,#tipsMsgBox)").each(function(index, element) {
                var style = $(this).attr("style");
				var fsize = $(this).data("fsize");
				if(!!style){
					$(this).attr("data-cs3",style).removeAttr("style");
				};
				if(!fsize){
					$(this).attr("data-fsize",$(this).css("font-size"))
				}
            });
			//去掉内链样式
			$("style:not(#hLight)").each(function(index, element) {
                var style = $(this).html();
				if(!!style){
					$(this).attr("data-cs2",style);
					if(element.styleSheet){
						element.styleSheet.cssText = "";
					}else{
						$(this).html("");
					}
				}
            });
			//去掉外链样式
			$("link").each(function(index, element) {
				var url = $(this).attr("href");
                if(url.indexOf(".css") > 0 && url.indexOf("wen_plug_toolbar") < 0){
					$(this).attr({"data-cs1":url,"href":""});	
				}
            });
			//不显示图片
			$("img").each(function(index, element) {
                var url = $(this).attr("src");
				if(!!url){
					$(this).attr("data-1url",url).removeAttr("src");
					$(this).attr("src","")
				}
            });
		},
		tpView : function(){//富文本显示
			toorbar_tview = false;
			//恢复外链样式
			$("link").each(function(index, element) {
				var url = $(this).data("cs1");
                if(!!url){
					$(this).attr("href",url).removeAttr("data-cs1");	
				}
            });
			//恢复内链样式
			
			$("style").each(function(index, element) {
                var style = $(this).data("cs2");
				if(!!style){
					if(element.styleSheet){
						element.styleSheet.cssText = style;
					}else{
						$(this).html(style);
					}
					$(this).removeAttr("data-cs2");
				}
            });
			
			//恢复行内样式
			$("body *:not(#toolbar,#tipsMsgBox)").each(function(index, element) {
                var style = $(this).data("cs3");
				var newStyle = $(this).attr("style");
				var newStyle = !!newStyle?newStyle:"";
				if(!!style){
					$(this).attr("style",style+" "+newStyle).removeAttr("data-cs3");
				}
            });
			//显示图片
			
			$("img").each(function(index, element) {
                var url = $(this).data("1url");
				if(!!url){
					$(this).attr("src",url).removeAttr("data-url");
				}
            });
			
		},
		textTipsON : function(){
			tipsSwitch = true;
			toorbar_tips = true;
			$.wen_plug_toolbar.showTipsBox();
			$("body").children(":not(#tipsMsgBox)").mousemove(function(e){
				if(tipsSwitch){
					var target = e.target||e.srcElement;
					//var c = e.target.childNodes || e.srcElement.childNodes;
					var c = target.childNodes;
					//console.log(c);
					
					
					if(target.nodeName=="IMG"){
						if(target.parentNode.parentNode.nodeName=="A"||target.parentNode.nodeName=="A"){
							textMessage="图片链接："+target.getAttribute("alt");
						}
						else{
							textMessage="图片："+target.getAttribute("alt");
						}
						pingyin(textMessage);
						
					}else if(target.nodeName=="OBJECT"){
						textMessage="媒体：";
						pingyin(textMessage);
					}else if(target.nodeName=="SELECT"){
						textMessage="下拉菜单";
						pingyin(textMessage);
					}else if(target.nodeName=="INPUT"){
						var inputType=target.getAttribute("type");
						switch(inputType){
							case"button":textMessage="表单按钮："+target.getAttribute("value");
							break;
							case"image":textMessage="图形按钮："+target.getAttribute("alt");
							break;
							case"submit":textMessage="提交按钮："+target.getAttribute("value");
							break;
							case"reset":textMessage="重置按钮："+target.getAttribute("value");
							break;
							case"file":textMessage="文件域："+target.getAttribute("title");
							break;
							case"password":textMessage="密码域："+target.getAttribute("title");
							break;
							case"radio":textMessage="单选框："+target.getAttribute("title");
							break;
							case"checkbox":textMessage="复选框："+target.getAttribute("title");
							break;
							case"text":textMessage="文本域："+target.getAttribute("title");
							break
						}
						pingyin(textMessage);
					}
				   
					if(!!c && c.length > 0){
						var l_l = c.length,i_i = 0;
						for(;i_i < l_l;i_i++){
							if(c[i_i].nodeType == 3){
								var c0_value = $.trim(c[i_i].nodeValue);
								if(!/^[\n,\f,\r,\t]/.test(c0_value) && c0_value.length > 0){
									if(c0_value.length > 30){
											var t="";
											var str = c0_value;
											t=mySplit(str,/[，。！？；、：]/);
											//因为t是字符串，没办法进行节点替换，所以把它插到生成的节点里再替换
											var tempDiv = document.createElement("span");
											tempDiv.id = "tempText";
											document.body.appendChild(tempDiv);
											document.getElementById("tempText").style.display = "none";
											document.getElementById("tempText").innerHTML = t;
											var tempHTML = document.getElementById("tempText");
											c[i_i].parentNode.replaceChild(tempHTML,c[i_i]);
											$("#tempText").children().unwrap();
											
											//c[i_i].parentNode.innerHTML=t;//为什么不直接用这个？
											//<p><strong>特别提示：</strong>xxxxx</p> 在这种结构的情况下防止
											//strong标签被覆盖
										
									}else{
										if(c[0].parentNode.parentNode.nodeName=="A"||c[0].parentNode.nodeName=="A"){
											c0_value = "链接："+c0_value;
										};
										pingyin(c0_value);
									
									}
								}
							}
						}
					}
				}
			});
			//给长的文本节点加标签
			function mySplit(str,reg){
				var result,x=str,y,sl,ss,zzz=true;
				var stringArray=new Array();
				do{
					result=reg.exec(x);//以给定的标点符号分割字符串
					if(result!=null){
						var stringIndex=result.index;
						ss = x.substring(0,stringIndex+1);
						if(ss.length > 30){
							var n = Math.ceil(ss.length/30);
							for(var i=0;i<n;i++){
								sl = x.substring(i*30,i==(n-1)?stringIndex+1:(i+1)*30);
								stringArray.push(sl);
							};
						}else{
							stringArray.push(ss);			
							//stringArray.push(x.substring(0,stringIndex+1));
						}
						x=x.substring(stringIndex+1)
					}else{
						if(!!x){
							if(x.length > 30){//长度超过30个字符且中间没有标点符号分割
								var n = Math.ceil(x.length/30);
								for(var i=0;i<n;i++){
									sl = x.substring(i*30,i==(n-1)?x.length:(i+1)*30);
									stringArray.push(sl);
								};
							}else{
								stringArray.push(x);
							}
						}
						zzz=false
					}
					
				}
				while(zzz)
				var tt="";
				for(var i=0;i<stringArray.length;i++){
					tt+='\<span class="t1">'+stringArray[i]+'\</span>';
				}
				return tt;
			}
			
			//加拼音
			function pingyin(s){
				var txt="",ee=0;
				if(!!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) < 8)){
					s = s.split("");
				}
				for(;ee<s.length;ee++){
					var hz = s[ee];
					if(pySwitch){
						py = !!pinyin[s[ee]]?'<sup>'+pinyin[s[ee]]+'</sup>':"<sup>&nbsp;</sup>";
					}else{
						py="";
					}
					txt+='<span>'+hz+py+'</span>';
				};
				$("#tipsMsgBoxContent").html(txt);
			}

		},
		textTipsOFF : function(){
			tipsSwitch = false;
			toorbar_tips = false;
			$.wen_plug_toolbar.hideTipsBox();
		},
		pageZoomB : function(){
			page_i++;
			toorbar_pagez = page_i;
			pagezoom(page_i);
		},
		pageZoomS : function(){
			page_i--;
			toorbar_pagez = page_i;
			pagezoom(page_i);
		},
		resetPage : function(){
			resetPagezoom();
		},
		textZoomB : function(){
			/*fsize_i++;
			toorbar_textz = fsize_i;
			$("body").css({"font-size":fsize_i});
			*/
			$(TAG).filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				var elem_t = $.trim($(this).clone().children().remove().end().text());
				//上面这行主要用于检测<p><strong>xxx</strong>aaaaa</p>这种情况
				if(elem_t.length > 0){
					var old_fsize = parseInt($(this).css("font-size"));
					if(toorbar_fontSwitch){
						var fsize = $(this).data("fsize");
						if(!fsize){
							$(this).attr("data-fsize",old_fsize);
						}
					}
					$(this).css({"font-size":old_fsize+1});
				}
				elem_t = "";
				if($(this).children().length == 0){
					var old_fsize = parseInt($(this).css("font-size"));
					if(toorbar_fontSwitch){
						var fsize = $(this).data("fsize");
						if(!fsize){
							$(this).attr("data-fsize",old_fsize);
						}
					}
					$(this).css({"font-size":old_fsize+1});
				}
			});
			toorbar_fontSwitch = false;
			
		},
		textZoomS : function(){
			/*fsize_i--;
			toorbar_textz = fsize_i;
			$("body").css({"font-size":fsize_i});
			*/
			//$("body *").filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
			$(TAG).filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				var elem_t = $.trim($(this).clone().children().remove().end().text());
				//上面这行主要用于检测<p><strong>xxx</strong>aaaaa</p>这种情况
				if(elem_t.length > 0){
					var old_fsize = parseInt($(this).css("font-size"));
					if(toorbar_fontSwitch){
						var fsize = $(this).data("fsize");
						if(!fsize){
							$(this).attr("data-fsize",old_fsize);
						}
					}
					$(this).css({"font-size":old_fsize-1});
				}
				elem_t = "";
				if($(this).children().length == 0){
					var old_fsize = parseInt($(this).css("font-size"));
					if(toorbar_fontSwitch){
						var fsize = $(this).data("fsize");
						if(!fsize){
							$(this).attr("data-fsize",old_fsize);
						}
					}
					$(this).css({"font-size":old_fsize-1});
				}
			});
			toorbar_fontSwitch = false;
		},
		resetText : function(){
			//fsize_i = 16;
			//$("body").css({"font-size":fsize_i});
			$(TAG).filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				var elem_t = $.trim($(this).clone().children().remove().end().text());
				//上面这行主要用于检测<p><strong>xxx</strong>aaaaa</p>这种情况
				if(elem_t.length > 0){
					var old_fsize = $(this).data("fsize");
					if(!!old_fsize){
						$(this).css({"font-size":old_fsize}).removeAttr("data-fsize");
					}
				}else{
					var old_fsize = $(this).data("fsize");
					if(!!old_fsize){
						$(this).removeAttr("data-fsize");
					}
				}
				elem_t = "";
				if($(this).children().length == 0){
					var old_fsize = $(this).data("fsize");
					if(!!old_fsize){
						$(this).css({"font-size":old_fsize}).removeAttr("data-fsize");
					}
				}
			});
			toorbar_fontSwitch = true;
		},
		contrast : function(color){
			hLight(color);
		},
		guidesON : function(){
			lineON();
		},
		guidesOFF : function(){
			lineOFF();
		},
		showToolBar : function(){
			if(_initialize){
				alert("请先初始化辅助工具栏：\n $.wen_plug_toolbar.initialize()");
			}else{
				toorbar_view = true;
				$("body").children("#toolbar").show();
				$("body").css({"padding-top":"100px"});
			}
		},
		hideToolBar : function(){
			if(_initialize){
				alert("请先初始化辅助工具栏：\n $.wen_plug_toolbar.initialize()");
			}else{
				toorbar_view = false;
				$("body").children("#toolbar").hide();
				$("body").css({"padding-top":"0"});
			}
		},
		showTipsBox : function(){
			if(_initialize){
				alert("请先初始化辅助工具栏：\n $.wen_plug_toolbar.initialize()");
			}else{
				$("body").children("#tipsMsgBox").show();
				$("body").css({"padding-bottom":"140px"});
			}
		},
		hideTipsBox : function(){
			if(_initialize){
				alert("请先初始化辅助工具栏：\n $.wen_plug_toolbar.initialize()");
			}else{
				$("body").children("#tipsMsgBox").hide();
				$("body").css({"padding-bottom":"0"});
			}
		},
		initialize : function(){
			if(_initialize){
				_initialize = false;
				if($("body").children("#toolbar").length > 0){
					alert("文档中存在有与辅助工具栏相同的ID，请更改。");
				}else{
					$("body").append('\
						<div class="toolbar" id="toolbar">\
							<div class="toolbar_tool clearfix">\
								<ul>\
									<li>\
										<input id="textMode" type="button" value="纯文本模式">\
									</li>\
								</ul>\
								<ul>\
									<li>\
										<input id="textTips2" type="button" value="开启文字提示">\
									</li>\
								</ul>\
								<ul>\
									<li>\
										<input id="pageZoom1" type="button" value="页面放大">\
									</li>\
									<li>\
										<input id="pageZoom2" type="button" value="页面缩小">\
									</li>\
								</ul>\
								<ul>\
									<li>\
										<input id="fontZoom1" type="button" value="文字放大">\
									</li>\
									<li>\
										<input id="fontZoom2" type="button" value="文字缩小">\
									</li>\
								</ul>\
								<ul>\
									<li>\
										<input id="hightContrast" type="button" value="高亮对比">\
										<ol id="hightContrastList" class="hclistclose">\
											<li id="de">默认样式</li>\
											<li id="bw">黑白对比</li>\
											<li id="wp">白紫对比</li>\
											<li id="bb">黑蓝对比</li>\
											<li id="rw">红白对比</li>\
										</ol>\
									</li>\
								</ul>\
								<ul>\
									<li>\
										<input id="guides" type="button" value="开启辅助线">\
									</li>\
								</ul>\
								<ul>\
									<li style="margin-right:20px;">\
										<input id="barReset" type="button" value="重置">\
									</li>\
								</ul>\
								<ul class="pluginlast">\
									<li>\
										<input id="barClose" type="button" value="关闭">\
									</li>\
								</ul>\
							</div>\
						</div>\
						<div id="tipsMsgBox" class="tipsMsgBox">\
							<div class="clearfix">\
								<div id="closeTipsMsgBox" class="closeTipsMsgBox">\
									<a href="#" title="关闭"></a>\
								</div>\
								<!--<div id="textbgbuttonbox" class="textbgbuttonbox">\
									<a href="#">开启标记功能</a>\
								</div>-->\
								<div id="pinyinbuttonbox" class="pinyinbuttonbox">\
									<a href="#" class="on">关闭拼音功能</a>\
								</div>\
							</div>\
							<div id="tipsMsgBoxContent" class="tipsMsgBoxContent"></div>\
						</div>\
					');
					$(".toolbar_tool").css({"margin-left":-($(".toolbar_tool").width()*.5)});
					$("body").children("#toolbar,#tipsMsgBox").hide();
				
					$("#textMode").click(function(){
						if($(this).hasClass("on")){
							$(this).removeClass("on").val("纯文本模式");
							$.wen_plug_toolbar.tpView();
						}else{
							$(this).addClass("on").val("富文本模式");
							$.wen_plug_toolbar.tView();
						}
					});
					
					$("#textTips2").click(function(){
						if($(this).hasClass("on")){
							$(this).removeClass("on").val("开启文字提示");
							$.wen_plug_toolbar.textTipsOFF();
						}else{
							$(this).addClass("on").val("关闭文字提示");
							$.wen_plug_toolbar.textTipsON();
						}
					});
					
					$("#pageZoom1").click(function(){
						$.wen_plug_toolbar.pageZoomB();
					});
					$("#pageZoom2").click(function(){
						$.wen_plug_toolbar.pageZoomS();
					});
					
					$("#fontZoom1").click(function(){
						$.wen_plug_toolbar.textZoomB();
					});
					$("#fontZoom2").click(function(){
						$.wen_plug_toolbar.textZoomS();
					});
					
					$("#hightContrast").parents("li").hover(function(){
						$("#hightContrastList").show();
					},function(){
						$("#hightContrastList").hide();
					});
					$("#hightContrastList li").click(function(){
						$(this).parent().hide();
						clo = $(this).attr("id");
						toorbar_clo = clo;
						$.wen_plug_toolbar.contrast(clo);
					});
					
					$("#guides").click(function(){
						if($(this).hasClass("on")){
							$(this).removeClass("on").val("开启辅助线");
							$.wen_plug_toolbar.guidesOFF();
						}else{
							$(this).addClass("on").val("关闭辅助线");
							$.wen_plug_toolbar.guidesON();
						}
					});
					
					$("#barReset").click(function(){
						$.wen_plug_toolbar.pageReset();
					});
					
					$("#barClose").click(function(){
						$.wen_plug_toolbar.hideToolBar();
					});
					
					$("#pinyinbuttonbox a").click(function(){
						if($(this).hasClass("on")){
							$(this).removeClass("on").text("开启拼音功能");
							pySwitch = false;
							toorbar_pySwitch = false;
						}else{
							$(this).addClass("on").text("关闭拼音功能");
							pySwitch = true;
							toorbar_pySwitch = true;
						}
						return false;
					});
					
					$("#closeTipsMsgBox").click(function(){
						$("#textTips2").removeClass("on").val("开启文字提示");
						$.wen_plug_toolbar.textTipsOFF();
						$.wen_plug_toolbar.hideTipsBox();
						return false;
					});
					
					setCookie = function(name, value, options) {
						var cookie, expires, _ref;
					
						if (options == null) {
						  options = {};
						}
						if (options.expires === true) {
						  options.expires = -1;
						}
						if (typeof options.expires === 'number') {
						  expires = new Date;
						  expires.setTime(expires.getTime() + options.expires * 24 * 60 * 60 * 1000);
						  options.expires = expires;
						}
						if ((_ref = options.path) == null) {
						  options.path = '/';
						}
						value = (value + '').replace(/[^!#-+\--:<-\[\]-~]/g, encodeURIComponent);
						cookie = encodeURIComponent(name) + '=' + value;
						if (options.expires) {
						  cookie += ';expires=' + options.expires.toGMTString();
						}
						if (options.path) {
						  cookie += ';path=' + options.path;
						}
						if (options.domain) {
						  cookie += ';domain=' + options.domain;
						}
						return document.cookie = cookie;
					  };
					
					  getCookie = function(name) {
						var cookie, cookies, index, key, value, _i, _len;
					
						cookies = document.cookie.split('; ');
						for (_i = 0, _len = cookies.length; _i < _len; _i++) {
						  cookie = cookies[_i];
						  index = cookie.indexOf('=');
						  key = decodeURIComponent(cookie.substr(0, index));
						  value = decodeURIComponent(cookie.substr(index + 1));
						  if (key === name) {
							return value;
						  }
						}
						return null;
					  };
					//获取COOKIE值
					if(!!getCookie('toorbar_view')){
						toorbar_view = getCookie('toorbar_view');
						if(toorbar_view == 'true'){
							$.wen_plug_toolbar.showToolBar();
							$(".toolbar_t").hide();
						}
					};
					if(!!getCookie('toorbar_tview')){
						toorbar_tview = getCookie('toorbar_tview');
						if(toorbar_tview == 'true'){
							$("#textMode").trigger("click");
						}
					};
					if(!!getCookie('toorbar_tips')){
						toorbar_tips = getCookie('toorbar_tips');
						if(toorbar_tips == 'true'){
							$("#textTips2").trigger("click");
						}
					};
					if(!!getCookie('toorbar_pagez')){
						toorbar_pagez = parseInt(getCookie('toorbar_pagez'));
						if(!!toorbar_pagez){
							pagezoom(toorbar_pagez);
						}
					};
					if(!!getCookie('toorbar_textz')){
						/*toorbar_textz = getCookie('toorbar_textz');
						if(!!toorbar_textz){
							$("body").css({"font-size":toorbar_textz});
						}*/
					};
					if(!!getCookie('toorbar_clo')){
						toorbar_clo = getCookie('toorbar_clo');
						if(!!toorbar_clo){
							$.wen_plug_toolbar.contrast(toorbar_clo);
						}
					};
					if(!!getCookie('toorbar_guidesSwitch')){
						toorbar_guidesSwitch = getCookie('toorbar_guidesSwitch');
						if(toorbar_guidesSwitch == 'true'){
							$("#guides").trigger("click");
						}
					};
					if(!!getCookie('toorbar_tipsSwitch')){
						//toorbar_tipsSwitch = getCookie('toorbar_tipsSwitch');
						//$.wen_plug_toolbar.showTipsBox();
					};
					if(!!getCookie('toorbar_pySwitch')){
						toorbar_pySwitch = getCookie('toorbar_pySwitch');
						if(toorbar_pySwitch == 'true'){
							pySwitch = true;
							$("#pinyinbuttonbox a").addClass("on").text("关闭拼音功能");
						}else{
							pySwitch = false;
							$("#pinyinbuttonbox a").removeClass("on").text("开启拼音功能");
						}
					};
					$(window).unload(function(){
						setCookie('toorbar_view', toorbar_view, { expires: 3650, path: '/' });
						setCookie('toorbar_tview', toorbar_tview, { expires: 3650, path: '/' });
						setCookie('toorbar_tips', toorbar_tips, { expires: 3650, path: '/'});
						setCookie('toorbar_pagez', toorbar_pagez, { expires: 3650, path: '/'});
						//setCookie('toorbar_textz', toorbar_textz, { expires: 3650, path: '/'});
						setCookie('toorbar_clo', toorbar_clo, { expires: 3650, path: '/'});
						setCookie('toorbar_guidesSwitch', toorbar_guidesSwitch, { expires: 3650, path: '/'});
						setCookie('toorbar_tipsSwitch', toorbar_tipsSwitch, { expires: 3650, path: '/'});
						setCookie('toorbar_pySwitch', toorbar_pySwitch, { expires: 3650, path: '/'});
					});
					
				}
			}
			
		},
		pageReset : function(){
			//fsize_i = 16;
			toorbar_tview = false,
			toorbar_pagez = 0,
			//toorbar_textz = 16,
			toorbar_clo = 'de',
			toorbar_guidesSwitch = false,
			$.wen_plug_toolbar.tpView();
			$.wen_plug_toolbar.textTipsOFF();
			$.wen_plug_toolbar.contrast("de");
			$.wen_plug_toolbar.guidesOFF();
			$.wen_plug_toolbar.resetPage();
			$.wen_plug_toolbar.resetText();
			$("#textMode").removeClass("on").val("纯文本模式");
			$("#textTips2").removeClass("on").val("开启文字提示");
			$("#guides").removeClass("on").val("开启辅助线");
			
			$(".t1").each(function(index, element) {
                var t = $(this).text();
				$(this).after(t);
				$(this).detach();
            });
			//上面的操作会产生相邻的文本节点
			//normalize()合并相邻的 Text 节点并删除空的 Text 节点。
			document.body.normalize();
			
		}	
	};
	
	$(document).keydown(function(evt){
		keyN = keyCodeToKeyName[evt.which];
		if(keyN == "Alt") keyN = "Alt_";
		if(keyN == "Control") keyN = "Ctrl_";
		if(keyN == "Shift") keyN = "Shift_";
		modifiers += keyN;
		keyFUN(modifiers);
	}).keyup(function(evt){
		modifiers = '';
	});
	var keyCodeToKeyName = {
		// Keys with words or arrows on them
		8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
		19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Spacebar", 33:"PageUp",  
		34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right",
		40:"Down", 45:"Insert", 46:"Del",
	
		// Number keys on main keyboard (not keypad)
		48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
	
		// Letter keys. Note that we don't distinguish upper and lower case
		65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
		74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
		83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",
	
		// Keypad numbers and punctuation keys. (Opera does not support these.)
		96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
		106:"Multiply", 107:"Add", 109:"Subtract", 110:"Decimal", 111:"Divide",
	
		// Function keys
		112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6",
		118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12",
		124:"F13", 125:"F14", 126:"F15", 127:"F16", 128:"F17", 129:"F18",
		130:"F19", 131:"F20", 132:"F21", 133:"F22", 134:"F23", 135:"F24",
	
		// Punctuation keys that don't require holding down Shift
		// Hyphen is nonportable: FF returns same code as Subtract
		59:";", 61:"=", 186:";", 187:"=", // Firefox and Opera return 59,61 
		188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
	};
	
					
	function keyFUN(keyval){
		if(keyval == "Alt_J"){
			if(_initialize){
				alert("请先初始化辅助工具栏：\n $.wen_plug_toolbar.initialize()");
			}else{
				if(!!($("body").children("#toolbar:hidden").length)){
					$.wen_plug_toolbar.showToolBar();
				}else{
					$.wen_plug_toolbar.hideToolBar();
				}
			}
		};
	};
	
	//页面放大、缩小
	function pagezoom(siz){
		if($("body").children("."+toolZoom).length < 1){
			//z = false;
			$("body").children().filter(":not(#toolbar,#guides_line,#tipsMsgBox,script)").wrapAll('<div class="'+toolZoom+'"></div>');
		}
		//var domStyle = document.createElement('div').style;
		//if("zoom" in domStyle){
		if(navigator.userAgent.indexOf("MSIE") > -1){
			$("body").children("."+toolZoom).css({"zoom":(siz+10)/10,"overflow":"auto","position":"relative"});
		}else{
			//var old_style = $("body").children("."+toolZoom).attr("style");
			if(siz>0){
				$("body").children("."+toolZoom).attr("style",transformAll+':scale('+(siz+10)/10+') translate(0px, 0px);'+transformOriginAll+':left top;overflow:auto;');
			}else{
				$("body").children("."+toolZoom).attr("style",transformAll+':scale('+(siz+10)/10+') translate(0px, 0px);overflow:auto;');
			};
		}
	};
	function resetPagezoom(){
		if($("body").children("."+toolZoom).length > 0){
			$("body").children("."+toolZoom).children().unwrap();
		}
	};
	//辅助线开启
	function lineON(){
		guidesSwitch = true;
		toorbar_guidesSwitch = true;
		if($("body").children("."+guides_line).length < 1){
			//z = false;
			$("body").prepend(
				'<div id="'+guides_line+'" class="'+guides_line+'">\
					<div class="'+guides_line+'X"></div>\
					<div class="'+guides_line+'Y"></div>\
				</div>'
			);
		}
		$("body").children("."+guides_line).show();
		$(document).bind("mousemove",function(e){
			if(guidesSwitch){
				changeLine(e);
			};
		});
		$(window).bind("scroll",function(e){
			if(guidesSwitch){
				changeLine(e);
			};
		});
		function changeLine(e){
			if(!!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) < 8)){
				pageX = e.clientX + 3 + $(window).scrollLeft();
				pageY = e.clientY + 3 + $(window).scrollTop();
				$(".guides_lineX").css({"position":"absolute"});
				$(".guides_lineY").css({"position":"absolute"});
			}else{
				pageX = e.pageX + 3 - $(window).scrollLeft();
				pageY = e.pageY + 3 - $(window).scrollTop();
				$(".guides_lineX").css({"position":"fixed"});
				$(".guides_lineY").css({"position":"fixed"});
			}
			$(".guides_lineX").css({
				"width":$(window).width(),
				"height":"4px",
				"background-color":"red",
				"left":"0",
				"z-index":"1001",
				"font-size":0,
				"top":pageY
			});
			$(".guides_lineY").css({
				"height":$(document).height(),
				"width":"4px",
				"background-color":"red",
				"top":"0",
				"z-index":"1001",
				"font-size":0,
				"left":pageX
			});
		};
	};	
	//辅助线关闭
	function lineOFF(){
		$("body").children("."+guides_line).hide();
		guidesSwitch = false;
		toorbar_guidesSwitch = false;
		//$(document).unbind("mousemove");
		//$(window).unbind("scroll");
	};	
	//对比度
	function hLight(colour){
		if($("head").children("#hLight").length < 1){
			$("head").append('<style type="text/css" id="hLight"></style>');
			var csstxt = "\
				.bw{\
					background-color:#000 !important;\
					color:#fff !important;\
					/*background-image:none !important;*/\
				}\
				.wp{\
					background-color:#9933FF !important;\
					color:#fff !important;\
					/*background-image:none !important;*/\
				}\
				.bb{\
					background-color:#0099FF !important;\
					color:#000 !important;\
					/*background-image:none !important;*/\
				}\
				.rw{\
					background-color:#fff !important;\
					color:red !important;\
					/*background-image:none !important;*/\
				}\
			";
			if($("#hLight")[0].styleSheet){
				$("#hLight")[0].styleSheet.cssText = csstxt;
			}else{
				$("#hLight").html(csstxt);
			};
		}
		if(colour == "bw"){
			
			$("*").filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				$(this).removeClass("wp bb rw").addClass("bw");
			});
		}else if(colour == "wp"){
			
			$("*").filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				$(this).removeClass("bw bb rw").addClass("wp");
			});
		}else if(colour == "bb"){
			
			$("*").filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				$(this).removeClass("bw wp rw").addClass("bb");
			});
		}else if(colour == "rw"){
			
			$("*").filter(":not(#toolbar,#toolbar *,.guides_line,.guides_line *,#tipsMsgBox,#tipsMsgBox *)").each(function(index, element) {
				$(this).removeClass("bw,wp,bb").addClass("rw");
			});
		}else if(colour == "de"){
			$("*").removeClass("bw wp bb rw");
		}
	};
	
	//检测前缀
	function prefixStyle(style) {
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
			cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '';
			//cssVendor = vendor ?vendor: '';
		if ( cssVendor === '' ) return style;
		//style = style.charAt(0).toUpperCase() + style.substr(1);
		return cssVendor + style;
	};
	
	// 还原样式前缀
	var transformAll = prefixStyle('transform'),
	transitionAll = prefixStyle('transition'),
	transformStyleAll = prefixStyle('transformStyle'),
	backfaceVisibilityAll = prefixStyle('backfaceVisibility'),
	perspectiveAll = prefixStyle('perspective'),
	transformOriginAll = prefixStyle('transform-origin');
})(jQuery);