/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-07-22 01:45:56 +0200 (Son, 22 Jul 2007) $
 * $Rev: 2447 $
 *
 * Version 2.1.1
 */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);

/**
 * weebox.js
 *
 * weebox js
 *
 * @category   javascript
 * @package    jquery
 * @author     Jack <xiejinci@gmail.com>
 * @copyright  Copyright (c) 2006-2008 9wee Com. (http://www.9wee.com)
 * @license    http://www.9wee.com/license/
 * @version    
 */ 
(function($) {
	/*if(typeof($.fn.bgIframe) == 'undefined') {
		$.ajax({
			type: "GET",
		  	url: '/js/jquery/bgiframe.js',//路径不好处理
		  	success: function(js){eval(js);},
		  	async: false				  	
		});
	}*/
	var weebox = function(content, options) {
		var self = this;
		this._dragging = false;
		this._content = content;
		this._options = options;
		this.dh = null;
		this.mh = null;
		this.dt = null;
		this.dc = null;
		this.bo = null;
		this.bc = null;
		this.selector = null;	
		this.ajaxurl = null;
		this.options = null;
		this.defaults = {
			boxid: null,
			boxclass: null,
			type: 'dialog',
			title: '',
			width: 0,
			height: 0,
			timeout: 0, 
			draggable: true,
			modal: true,
			focus: null,
			position: 'center',
			overlay: 50,
			showTitle: true,
			showButton: true,
			showCancel: true, 
			showOk: true,
			okBtnName: '确定',
			cancelBtnName: '取消',
			contentType: 'text',
			contentChange: false,
			clickClose: false,
			zIndex: 999,
			animate: false,
			trigger: null,
			onclose: null,
			onopen: null,
			onok: null		
		};
		this.types = new Array(
			"dialog", 
			"error", 
			"warning", 
			"success", 
			"prompt",
			"box"
		);
		this.titles = {
			"error": 	"!! Error !!",
			"warning": 	"Warning!",
			"success": 	"Success",
			"prompt": 	"Please Choose",
			"dialog": 	"Dialog",
			"box":		""
		};
		
		this.initOptions = function() {	
			if (typeof(self._options) == "undefined") {
				self._options = {};
			}
			if (typeof(self._options.type) == "undefined") {
				self._options.type = 'dialog';
			}
			if(!$.inArray(self._options.type, self.types)) {
				self._options.type = self.types[0];
			}
			if (typeof(self._options.boxclass) == "undefined") {
				self._options.boxclass = self._options.type+"box";
			}
			if (typeof(self._options.title) == "undefined") {
				self._options.title = self.titles[self._options.type];
			}
			if (content.substr(0, 1) == "#") {
				self._options.contentType = 'selector';
				self.selector = content; 
			}
			self.options = $.extend({}, self.defaults, self._options);
		};
		
		this.initBox = function() {
			var html = '';	
			if (self.options.type == 'wee') {
				html =  '<div class="weedialog">' +
				'	<div class="dialog-top">' +
				'		<div class="dialog-tl"></div>' +
				'		<div class="dialog-tc"></div>' +
				'		<div class="dialog-tr"></div>' +
				'	</div>' +
				'	<table width="100%" border="0" cellspacing="0" cellpadding="0" >' +
				'		<tr>' +
				'			<td class="dialog-cl"></td>' +
				'			<td>' +
				'				<div class="dialog-header">' +
				'					<div class="dialog-title"></div>' +
				'					<div class="dialog-close"></div>' +
				'				</div>' +
				'				<div class="dialog-content"></div>' +
				'				<div class="dialog-button">' +
				'					<input type="button" class="dialog-ok" value="确定">' +
				'					<input type="button" class="dialog-cancel" value="取消">' +
				'				</div>' +
				'			</td>' +
				'			<td class="dialog-cr"></td>' +
				'		</tr>' +
				'	</table>' +
				'	<div class="dialog-bot">' +
				'		<div class="dialog-bl"></div>' +
				'		<div class="dialog-bc"></div>' +
				'		<div class="dialog-br"></div>' +
				'	</div>' +
				'</div>';
				$(".dialog-box").find(".dialog-close").click();
				
			} else {
				html = "<div class='dialog-box'>" +
							"<div class='dialog-header'>" +
								"<div class='dialog-title'></div>" +
								"<div class='dialog-close'></div>" +
							"</div>" +
							"<div class='dialog-content'></div>" +	
							"<div style='clear:both'></div>" +				
							"<div class='dialog-button'>" +
								"<input type='button' class='dialog-ok' value='确定'>" +
								"<input type='button' class='dialog-cancel' value='取消'>" +
							"</div>" +
						"</div>";
			}
			self.dh = $(html).appendTo('body').hide().css({
				position: 'absolute',	
				overflow: 'hidden',
				zIndex: self.options.zIndex
			});	
			self.dt = self.dh.find('.dialog-title');
			self.dc = self.dh.find('.dialog-content');
			self.db = self.dh.find('.dialog-button');
			self.bo = self.dh.find('.dialog-ok');
			self.bc = self.dh.find('.dialog-cancel');
			self.db.show();
			if (self.options.boxid) {
				self.dh.attr('id', self.options.boxid);
			}	
			if (self.options.boxclass) {
				self.dh.addClass(self.options.boxclass);
			}
			if (self.options.height>0) {
				self.dc.css('height', self.options.height);
			}
			if(self.options.contentType=='iframe'){
				self.dc.css('padding', "0");
				self.db.hide();
			}
			
			if (self.options.width>0) {
				self.dh.css('width', self.options.width);
			}
			self.dh.bgiframe();	
		}
		
		this.initMask = function() {							
			if (self.options.modal) {
				self.mh = $("<div class='dialog-mask'></div>")
				.appendTo('body').hide().css({
					opacity: self.options.overlay/100,
					filter: 'alpha(opacity='+self.options.overlay+')',
					width: self.bwidth(),
					height: self.bheight(),
					zIndex: self.options.zIndex-1
				});
			}
		}
		
		this.initContent = function(content) {
			self.dh.find(".dialog-ok").val(self.options.okBtnName);
			self.dh.find(".dialog-cancel").val(self.options.cancelBtnName);	
			self.dh.find('.dialog-title').html(self.options.title);
			if (!self.options.showTitle) {
				self.dh.find('.dialog-header').hide();
			}	
			if (!self.options.showButton) {
				self.dh.find('.dialog-button').hide();
			}
			if (!self.options.showCancel) {
				self.dh.find('.dialog-cancel').hide();
			}							
			if (!self.options.showOk) {
				self.dh.find(".dialog-ok").hide();
			}			
			if (self.options.contentType == "selector") {
				self.selector = self._content;
				self._content = $(self.selector).html();
				self.setContent(self._content);
				//if have checkbox do
				var cs = $(self.selector).find(':checkbox');
				self.dh.find('.dialog-content').find(':checkbox').each(function(i){
					this.checked = cs[i].checked;
				});				
				$(self.selector).empty();
				self.onopen();
				self.show();
				self.focus();
			} else if (self.options.contentType == "ajax") {	
				self.ajaxurl = self._content;			
				self.setContent('<div class="dialog-loading"></div>');				
				self.show();
				$.get(self.ajaxurl, function(data) {
					self._content = data;
			    	self.setContent(self._content);
			    	self.onopen();
			    	self.focus();		  	
			    	if (self.options.position == 'center') {
						self.setCenterPosition();
			    	}
				});
			} else if (self.options.contentType == "iframe") {	
				self.setContent('<iframe frameborder="0" width="100%" height="100%" src="'+self._content+'"></iframe>');
				self.onopen();	
				self.show();	
				self.focus();
			}  else {
				self.setContent(self._content);
				self.onopen();	
				self.show();	
				self.focus();					
			}
		}
		
		this.initEvent = function() {
			self.dh.find(".dialog-close, .dialog-cancel, .dialog-ok").unbind('click').click(function(){self.close();
				if(self.options.type=='wee')
				{
					$(".dialog-box").find(".dialog-close").click();
				}
			});			
			if (typeof(self.options.onok) == "function") {
				self.dh.find(".dialog-ok").unbind('click').click(self.options.onok);
			} 
			if (typeof(self.options.oncancel) == "function") {
				self.dh.find(".dialog-cancel").unbind('click').click(self.options.oncancel);
			}			
			if (self.options.timeout>0) {
				window.setTimeout(self.close, (self.options.timeout * 1000));
			}	
			this.draggable();			
		}
		
		this.draggable = function() {	
			if (self.options.draggable && self.options.showTitle) {
				self.dh.find('.dialog-header').mousedown(function(event){
					self._ox = self.dh.position().left;
					self._oy = self.dh.position().top;					
					self._mx = event.clientX;
					self._my = event.clientY;
					self._dragging = true;
				});
				if (self.mh) {
					var handle = self.mh;
				} else {
					var handle = $(document);
				}
				$(document).mousemove(function(event){
					if (self._dragging == true) {
						//window.status = "X:"+event.clientX+"Y:"+event.clientY;
						self.dh.css({
							left: self._ox+event.clientX-self._mx, 
							top: self._oy+event.clientY-self._my
						});
					}
				}).mouseup(function(){
					self._mx = null;
					self._my = null;
					self._dragging = false;
				});
				var e = self.dh.find('.dialog-header').get(0);
				e.unselectable = "on";
				e.onselectstart = function() { 
					return false; 
				};
				if (e.style) { 
					e.style.MozUserSelect = "none"; 
				}
			}	
		}
		
		this.onopen = function() {							
			if (typeof(self.options.onopen) == "function") {
				self.options.onopen();
			}	
		}
		
		this.show = function() {	
			if (self.options.position == 'center') {
				self.setCenterPosition();
			}
			if (self.options.position == 'element') {
				self.setElementPosition();
			}		
			if (self.options.animate) {				
				self.dh.fadeIn("slow");
				if (self.mh) {
					self.mh.fadeIn("normal");
				}
			} else {
				self.dh.show();
				if (self.mh) {
					self.mh.show();
				}
			}	
		}
		
		this.focus = function() {
			if (self.options.focus) {
				self.dh.find(self.options.focus).focus();
			} else {
				self.dh.find('.dialog-cancel').focus();
			}
		}
		
		this.find = function(selector) {
			return self.dh.find(selector);
		}
		
		this.setTitle = function(title) {
			self.dh.find('.dialog-title').html(title);
		}
		
		this.getTitle = function() {
			return self.dh.find('.dialog-title').html();
		}
		
		this.setContent = function(content) {
			self.dh.find('.dialog-content').html(content);
		}
		
		this.getContent = function() {
			return self.dh.find('.dialog-content').html();
		}
		
		this.hideButton = function(btname) {
			self.dh.find('.dialog-'+btname).hide();			
		}
		
		this.showButton = function(btname) {
			self.dh.find('.dialog-'+btname).show();	
		}
		
		this.setButtonTitle = function(btname, title) {
			self.dh.find('.dialog-'+btname).val(title);	
		}
		
		this.close = function() {
			if (self.animate) {
				self.dh.fadeOut("slow", function () { self.dh.hide(); });
				if (self.mh) {
					self.mh.fadeOut("normal", function () { self.mh.hide(); });
				}
			} else {
				self.dh.hide();
				if (self.mh) {
					self.mh.hide();
				}
			}
			if (self.options.contentType == 'selector') {
				if (self.options.contentChange) {
					//if have checkbox do
					var cs = self.find(':checkbox');
					$(self.selector).html(self.getContent());						
					if (cs.length > 0) {
						$(self.selector).find(':checkbox').each(function(i){
							this.checked = cs[i].checked;
						});
					}
				} else {
					$(self.selector).html(self._content);
				} 
			}								
			if (typeof(self.options.onclose) == "function") {
				self.options.onclose();
			}
			self.dh.remove();
			if (self.mh) {
				self.mh.remove();
			}
		}
		
		this.bheight = function() {
			if ($.browser.msie && $.browser.version < 7) {
				var scrollHeight = Math.max(
					document.documentElement.scrollHeight,
					document.body.scrollHeight
				);
				var offsetHeight = Math.max(
					document.documentElement.offsetHeight,
					document.body.offsetHeight
				);
				
				if (scrollHeight < offsetHeight) {
					return $(window).height();
				} else {
					return scrollHeight;
				}
			} else {
				return $(document).height();
			}
		}
		
		this.bwidth = function() {
			if ($.browser.msie && $.browser.version < 7) {
				var scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				var offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);
				
				if (scrollWidth < offsetWidth) {
					return $(window).width();
				} else {
					return scrollWidth;
				}
			} else {
				return $(document).width();
			}
		}
		
		this.setCenterPosition = function() {
			var wnd = $(window), doc = $(document),
				pTop = doc.scrollTop(),	pLeft = doc.scrollLeft(),
				minTop = pTop;	
			pTop += (wnd.height() - self.dh.height()) / 2;
			pTop = Math.max(pTop, minTop);
			pLeft += (wnd.width() - self.dh.width()) / 2;
			self.dh.css({top: pTop, left: pLeft});
			
		}
		
//		this.setElementPosition = function() {
//			var trigger = $("#"+self.options.trigger);			
//			if (trigger.length == 0) {
//				alert('请设置位置的相对元素');
//				self.close();				
//				return false;
//			}		
//			var scrollWidth = 0;
//			if (!$.browser.msie || $.browser.version >= 7) {
//				scrollWidth = $(window).width() - document.body.scrollWidth;
//			}
//			
//			var left = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)+trigger.position().left;
//			if (left+self.dh.width() > document.body.clientWidth) {
//				left = trigger.position().left + trigger.width() + scrollWidth - self.dh.width();
//			} 
//			var top = Math.max(document.documentElement.scrollTop, document.body.scrollTop)+trigger.position().top;
//			if (top+self.dh.height()+trigger.height() > document.documentElement.clientHeight) {
//				top = top - self.dh.height() - 5;
//			} else {
//				top = top + trigger.height() + 5;
//			}
//			self.dh.css({top: top, left: left});
//			return true;
//		}	
	
		this.setElementPosition = function() {
			var trigger = $(self.options.trigger);	
			if (trigger.length == 0) {
				alert('请设置位置的相对元素');
				self.close();				
				return false;
			}
			var left = trigger.offset().left;
			var top = trigger.offset().top + 25;
			self.dh.css({top: top, left: left});
			return true;
		}	
		
		//窗口初始化	
		this.initialize = function() {
			self.initOptions();
			self.initMask();
			self.initBox();		
			self.initContent();
			self.initEvent();
			return self;
		}
		//初始化
		this.initialize();
	}	
	
	var weeboxs = function() {		
		var self = this;
		this._onbox = false;
		this._opening = false;
		this.boxs = new Array();
		this.zIndex = 999;
		this.push = function(box) {
			this.boxs.push(box);
		}
		this.pop = function() {
			if (this.boxs.length > 0) {
				return this.boxs.pop();
			} else {
				return false;
			}
		}
		this.open = function(content, options) {
			self._opening = true;
			if (typeof(options) == "undefined") {
				options = {};
			}
			if (options.boxid) {
				this.close(options.boxid);
			}
			options.zIndex = this.zIndex;
			this.zIndex += 10;
			var box = new weebox(content, options);
			box.dh.click(function(){
				self._onbox = true;
			});
			this.push(box);
			return box;
		}
		this.close = function(id) {
			if (id) {
				for(var i=0; i<this.boxs.length; i++) {
					if (this.boxs[i].dh.attr('id') == id) {
						this.boxs[i].close();
						this.boxs.splice(i,1);
					}
				}
			} else {
				this.pop().close();
			}
		}
		this.length = function() {
			return this.boxs.length;
		}
		this.getTopBox = function() {
			return this.boxs[this.boxs.length-1];
		}	
		this.find = function(selector) {
			return this.getTopBox().dh.find(selector);
		}		
		this.setTitle = function(title) {
			this.getTopBox().setTitle(title);
		}		
		this.getTitle = function() {
			return this.getTopBox().getTitle();
		}		
		this.setContent = function(content) {
			this.getTopBox().setContent(content);
		}		
		this.getContent = function() {
			return this.getTopBox().getContent();
		}		
		this.hideButton = function(btname) {
			this.getTopBox().hideButton(btname);			
		}		
		this.showButton = function(btname) {
			this.getTopBox().showButton(btname);	
		}		
		this.setButtonTitle = function(btname, title) {
			this.getTopBox().setButtonTitle(btname, title);	
		}
		$(window).scroll(function() {
			if (self.length() > 0) {
				var box = self.getTopBox();
				if (box.options.position == "center") {
					self.getTopBox().setCenterPosition();
				}
			}			
		});
		$(document).click(function() {
			if (self.length()>0) {
				var box = self.getTopBox();
				if(!self._opening && !self._onbox && box.options.clickClose) {
					box.close();
				}
			}
			self._opening = false;
			self._onbox = false;
		});
	}
	$.extend({weeboxs: new weeboxs()});		
})(jQuery);

/*这里是之前eval解密后的代码*/
(function($) {
    $.fn.ui_select = function(options) {
        var op = {
            id: 0,
            event: "click",
            refresh: false
        };
        options = $.extend({}, op, options);
        var o = $(this);
        var height = $(o).attr("height");
        $(o).hide();
        if (options.refresh) {
            $(o).show();
            options.id = $(o).next().attr("id");
            $(o).next().remove()
        }
        var DLselect = $("<dl id='" + options.id + "'></dl>");
        $(DLselect).attr("class", $(o).attr("class"));
        $(DLselect).attr("name", $(o).attr("name"));
        $(DLselect).css({
            "display": "inline-block"
        });
        var DTselect = $("<dt></dt>");
        $(DLselect).append(DTselect);
        $(DTselect).attr("class", "ui-select-selected");
        var selectNode = $(o).find("option:selected");
        $(DTselect).html("<span>" + selectNode.html() + "</span><i></i>");
        $(DTselect).attr("value", selectNode.attr("value"));
        var DDselect = $("<dd></dd>");
        $(DLselect).append(DDselect);
        $(o).find("option").each(function(ii, oo) {
            var SPANselect = $("<a href='javascript:void(0);'></a>");
            $(SPANselect).css({
                "display": "block"
            });
            $(SPANselect).attr("value", $(oo).attr("value"));
            $(SPANselect).html($(oo).html());
            if (selectNode.attr("value") == $(oo).attr("value")) SPANselect.addClass("current");
            $(DDselect).append(SPANselect)
        });
        $(o).after(DLselect);
        $(DDselect).css({
            "position": "absolute",
            "z-index": 50
        });
        $(DDselect).addClass("ui-select-drop");
        var top = $(DLselect).position().top + $(DLselect).height();
        var left = $(DLselect).position().left;
        $(DDselect).css("left", left);
        $(DDselect).css("top", top);
        if (height && $(DDselect).height() > parseInt(height)) {
            $(DDselect).css("height", parseInt(height))
        }
        $(DDselect).hide();
        if (options.refresh) $(o).hide();
        if (options.event == "click") {
            $(DLselect).bind("click", function() {
                var top = $(this).position().top + $(this).height();
                var left = $(this).position().left;
                $(this).find("dd").css("left", left);
                $(this).find("dd").css("top", top);
                $(this).find("dd").slideDown("fast");
                $(this).addClass("dropdown")
            })
        } else {
            $(DLselect).hover(function() {
                $(this).oneTime(100, function() {
                    var top = $(this).position().top + $(this).height();
                    var left = $(this).position().left;
                    $(this).find("dd").css("left", left);
                    $(this).find("dd").css("top", top);
                    $(this).find("dd").slideDown("fast");
                    $(this).addClass("dropdown")
                })
            }, function() {
                $(this).stopTime();
                $(this).find("dd").fadeOut("fast");
                $(this).removeClass("dropdown")
            })
        }
        $(DLselect).find("dd a").bind("click", function() {
            var dl = $(this).parent().parent();
            var span = $(this);
            $(dl).find("dt").html("<span>" + $(span).html() + "</span><i></i>");
            $(dl).find("dt").attr("value", $(span).attr("value"));
            $(dl).prev().val($(span).attr("value"));
            $(dl).prev().trigger("change");
            $(dl).find("dd a").removeClass("current");
            $(this).addClass("current")
        })
    }, $.fn.ui_button = function() {
        var btn = $(this);
        if (btn.css("display") == "none") return;
        $(btn).hide();
        var o = $("<div><div><span></span></div></div>");
        $(btn).after(o);
        $(o).attr("class", $(btn).attr("class"));
        $(o).addClass($(btn).attr("rel"));
        $(o).attr("rel", $(btn).attr("rel"));
        $(o).find("span").html($(btn).html());
        $(o).bind("click", function() {
            if (btn.attr("type") == "submit") {
                var parent = btn.parent();
                try {
                    while (parent.get(0).tagName.toLowerCase() != "form") {
                        parent = parent.parent()
                    }
                    parent.submit()
                } catch (e) {
                    $(btn).click()
                }
            } else $(btn).click()
        });
        $(o).bind("mouseover", function() {
            $(o).removeClass($(o).attr("rel") + "_hover");
            $(o).removeClass($(o).attr("rel") + "_active");
            $(o).removeClass($(o).attr("rel"));
            $(o).addClass($(o).attr("rel") + "_hover")
        });
        $(o).bind("mouseout", function() {
            $(o).removeClass($(o).attr("rel") + "_hover");
            $(o).removeClass($(o).attr("rel") + "_active");
            $(o).removeClass($(o).attr("rel"));
            $(o).addClass($(o).attr("rel"))
        });
        $(o).bind("mousedown", function() {
            $(o).removeClass($(o).attr("rel") + "_hover");
            $(o).removeClass($(o).attr("rel") + "_active");
            $(o).removeClass($(o).attr("rel"));
            $(o).addClass($(o).attr("rel") + "_active")
        });
        $(o).bind("mouseup", function() {
            $(o).removeClass($(o).attr("rel") + "_hover");
            $(o).removeClass($(o).attr("rel") + "_active");
            $(o).removeClass($(o).attr("rel"));
            $(o).addClass($(o).attr("rel") + "_hover")
        })
    }, $.fn.ui_textbox = function() {
        var obj = $(this);
        $(obj).bind("focus", function() {
            $(obj).removeClass("hover");
            $(obj).removeClass("normal");
            $(obj).addClass("hover")
        });
        $(obj).bind("blur", function() {
            $(obj).removeClass("hover");
            $(obj).removeClass("normal");
            $(obj).addClass("normal")
        });
        if ($(obj).attr("holder") == "" || !$(obj).attr("holder")) return;
        if ('placeholder' in document.createElement('input')) {
            $(obj).attr("placeholder", $(obj).attr("holder"))
        } else {
            var holder = $(obj).prev();
            if ($(holder).attr("rel") != "holder") {
                holder = $("<span style='position:absolute; color:#8596B0;' rel='holder'>" + $(obj).attr("holder") + "</span>");
                $(holder).css({
                    "font-size": $(obj).css("font-size"),
                    "padding-left": $(obj).css("padding-left"),
                    "padding-right": $(obj).css("padding-right"),
                    "padding-top": $(obj).css("padding-top"),
                    "padding-bottom": $(obj).css("padding-bottom")
                });
                $(holder).css("left", 0);
                $(holder).css("top", 0);
                $(holder).css("font-weight", "normal");
                $(holder).css("display", "block");
                $(holder).css("z-index", "100");
                var outer = $(obj).wrap("<i style='font-style:normal;font-weight:normal; display:block;'></i>");
                $(obj).before(holder)
            }
            if ($.trim($(obj).val()) != "") {
                $(holder).css("display", "none")
            }
            $(holder).click(function() {
                $(obj).focus()
            });
            $(obj).focus(function() {
                $(holder).css("display", "none")
            });
            $(obj).blur(function() {
                if ($.trim($(obj).val()) == "") $(holder).show()
            })
        }
    }, $.fn.ui_checkbox = function(options) {
        var op = {
            refresh: false
        };
        options = $.extend({}, op, options);
        var ImgCbo = $(this);
        var o = $(ImgCbo).find("input[type='checkbox']");
        $(o).hide();
        var checked = $(o).attr("checked");
        var relClass = $(ImgCbo).attr("rel");
        $(ImgCbo).addClass(relClass);
        $(ImgCbo).attr("name", $(o).attr("name"));
        $(ImgCbo).css({
            "display": "inline-block"
        });
        $(ImgCbo).attr("checked", checked ? true : false);
        if (checked) {
            $(ImgCbo).removeClass(relClass);
            $(ImgCbo).removeClass(relClass + "_checked");
            $(ImgCbo).addClass(relClass + "_checked")
        } else {
            $(ImgCbo).removeClass(relClass);
            $(ImgCbo).removeClass(relClass + "_checked");
            $(ImgCbo).addClass(relClass)
        } if (options.refresh) return;
        $(o).bind("click", function() {
            return false
        });
        $(ImgCbo).hover(function() {
            var cbo = $(this).find("input[type='checkbox']");
            var checked = $(cbo).attr("checked");
            var relClass = $(ImgCbo).attr("rel");
            if (!checked) $(this).addClass(relClass + "_hover")
        }, function() {
            $(this).removeClass(relClass + "_hover")
        });
        $(ImgCbo).bind("click", function() {
            var img = $(this);
            var cbo = $(img).find("input[type='checkbox']");
            var checked = $(cbo).attr("checked");
            var relClass = $(ImgCbo).attr("rel");
            checked = checked ? false : true;
            $(cbo).attr("checked", checked);
            $(img).attr("checked", checked);
            $(img).removeClass(relClass + "_hover");
            if (checked) {
                $(cbo).trigger("checkon");
                $(img).removeClass(relClass);
                $(img).removeClass(relClass + "_checked");
                $(img).addClass(relClass + "_checked")
            } else {
                $(cbo).trigger("checkoff");
                $(img).removeClass(relClass);
                $(img).removeClass(relClass + "_checked");
                $(img).addClass(relClass)
            }
        })
    }, $.fn.ui_starbar = function(options) {
        var op = {
            refresh: false,
            max: 5
        };
        options = $.extend({}, op, options);
        var ipt = $(this);
        $(ipt).hide();
        var disabled = $(ipt).attr("disabled");
        var val = $(ipt).val();
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > options.max) val = options.max;
        if (!options.refresh) $(ipt).wrap("<span><span></span></span>");
        var outBar = $(ipt).parent().parent();
        outBar.attr("class", $(ipt).attr("class"));
        $(outBar).find("span").css("width", (parseFloat(val) / options.max * 100) + "%");
        if (!options.refresh && !disabled) {
            var total_width = $(outBar).width();
            var sec_width = total_width / options.max;
            $(outBar).bind("mousemove mouseover", function(event) {
                var pageX = event.pageX;
                var left = $(outBar).offset().left;
                var move_left = pageX - left;
                var sector = Math.ceil(move_left / sec_width);
                var cssWidth = (sector * sec_width) + "px";
                $(outBar).find("input").attr("sector", sector);
                $(outBar).find("span").css("width", cssWidth);
                $(outBar).find("input").trigger("uichange")
            });
            $(outBar).bind("mouseout", function() {
                var current_sec = $(outBar).find("span").find("input").val();
                var cssWidth = (current_sec * sec_width) + "px";
                $(outBar).find("span").css("width", cssWidth);
                $(outBar).find("input").attr("sector", current_sec);
                $(outBar).find("input").trigger("uichange")
            });
            $(outBar).bind("click", function() {
                var current_sec = $(outBar).find("input").attr("sector");
                $(outBar).find("span").find("input").val(current_sec);
                $(outBar).find("input").trigger("onchange")
            })
        }
    }, $.fn.ui_radiobox = function(options) {
        var op = {
            refresh: false
        };
        options = $.extend({}, op, options);
        var ImgCbo = $(this);
        var o = $(ImgCbo).find("input[type='radio']");
        $(o).hide();
        var checked = $(o).attr("checked");
        var relClass = $(ImgCbo).attr("rel");
        $(ImgCbo).addClass(relClass);
        $(ImgCbo).attr("name", $(o).attr("name"));
        $(ImgCbo).css({
            "display": "inline-block"
        });
        $(ImgCbo).attr("checked", checked ? true : false);
        if (checked) {
            $(ImgCbo).removeClass(relClass);
            $(ImgCbo).removeClass(relClass + "_checked");
            $(ImgCbo).addClass(relClass + "_checked")
        } else {
            $(ImgCbo).removeClass(relClass);
            $(ImgCbo).removeClass(relClass + "_checked");
            $(ImgCbo).addClass(relClass)
        } if (options.refresh) return;
        $(o).bind("click", function() {
            return false
        });
        $(ImgCbo).hover(function() {
            var cbo = $(this).find("input[type='radio']");
            var checked = $(cbo).attr("checked");
            var relClass = $(ImgCbo).attr("rel");
            if (!checked) $(this).addClass(relClass + "_hover")
        }, function() {
            $(this).removeClass(relClass + "_hover")
        });
        $(ImgCbo).bind("click", function() {
            var img = $(this);
            var cbo = $(img).find("input[type='radio']");
            var checked = $(cbo).attr("checked");
            var relClass = $(ImgCbo).attr("rel");
            var ochecked = checked;
            checked = true;
            $(cbo).attr("checked", checked);
            $(img).attr("checked", checked);
            $(img).removeClass(relClass + "_hover");
            $("input[name='" + img.attr("name") + "'][type='radio']").parent().each(function(i, olb) {
                $(olb).ui_radiobox({
                    refresh: true
                })
            });
            if (!ochecked) {
                $(cbo).trigger("click");
                $(img).removeClass(relClass);
                $(img).removeClass(relClass + "_checked");
                $(img).addClass(relClass + "_checked")
            }
        })
    }, $.fn.ui_upload = function(options) {
        var op = {
            url: UPLOAD_URL,
            multi: true,
            FilesAdded: null,
            FileUploaded: null,
            UploadComplete: null,
            Error: null
        };
        options = $.extend({}, op, options);
        var btn = $(this);
        var uploader = new plupload.Uploader({
            browse_button: btn[0],
            url: options.url,
            flash_swf_url: UPLOAD_SWF,
            silverlight_xap_url: UPLOAD_XAP,
            multi_selection: options.multi,
            filters: {
                max_file_size: MAX_IMAGE_SIZE,
                mime_types: [{
                    title: "Image files",
                    extensions: ALLOW_IMAGE_EXT
                }]
            }
        });
        uploader.init();
        uploader.bind('FilesAdded', function(uploader, files) {
            if (options.FilesAdded != null) {
                if (options.FilesAdded.call(null, files) != false) {
                    uploader.start()
                }
            } else {
                uploader.start()
            }
        });
        uploader.bind('FileUploaded', function(uploader, file, responseObject) {
            if (options.FileUploaded != null) {
                var ajaxobj = $.parseJSON(responseObject.response);
                options.FileUploaded.call(null, ajaxobj);
                if (ajaxobj.error != 0) {
                    uploader.stop()
                }
            }
        });
        uploader.bind('UploadComplete', function(uploader, files) {
            if (options.UploadComplete != null) options.UploadComplete.call(null, files)
        });
        uploader.bind('Error', function(uploader, errObject) {
            if (options.Error != null) options.Error.call(null, errObject)
        })
    }, $.fn.ui_editor = function(options) {
        var op = $.extend({}, {
            "url": "",
            "width": 400,
            "height": 300,
            "fun": null
        }, options);
        var dom = $(this);
        var keditor = KindEditor.create(dom, {
            uploadJson: op.url,
            basePath: K_BASE_PATH,
            themesPath: K_THEMES_PATH,
            allowFileManager: true,
            allowFileManager: false,
            filterMode: true,
            width: op.width,
            height: op.height,
            items: ['fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
            htmlTags: {
                font: ['color', 'size', 'face', '.background-color'],
                span: ['.color', '.background-color', '.font-size', '.font-family', '.background', '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'],
                div: ['align', '.border', '.margin', '.padding', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight', '.background', '.font-style', '.text-decoration', '.vertical-align', '.margin-left'],
                table: ['border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor', '.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background', '.width', '.height', '.border-collapse'],
                'td,th': ['align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.background', '.border'],
                a: ['href', 'target', 'name'],
                embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
                img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
                'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': ['align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background', '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'],
                pre: ['class'],
                hr: ['class', '.page-break-after'],
                'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del': []
            },
            afterBlur: function() {
                this.sync()
            },
            afterCreate: op.fun
        })
    }, $.fn.ui_lazy = function(options) {
        var op = {
            placeholder: "",
            src: "",
            refresh: false
        };
        options = $.extend({}, op, options);
        var imgs = this;
        imgs.each(function() {
            var img = $(this);
            var scrolltop = $(window).scrollTop();
            var windheight = $(window).height();
            var imgoffset = img.offset().top;
            if (!img.attr("isload") || options.refresh) {
                $(img).attr("src", options.placeholder);
                if (windheight + scrolltop >= imgoffset && scrolltop <= imgoffset + img.height()) {
                    if (options.src != "") img.attr("src", options.src);
                    else img.attr("src", img.attr("data-src"));
                    img.attr("isload", true)
                }
            }
        })
    }
})(jQuery);

$.showErr = function(str, func) {
    $.weeboxs.open(str, {
        boxid: 'fanwe_error_box',
        contentType: 'text',
        showButton: true,
        showCancel: false,
        showOk: true,
        title: '错误',
        width: 250,
        type: 'wee',
        onopen: function() {
            //init_ui_button()
        },
        onclose: func
    })
};

$.showSuccess = function(str, func) {
    $.weeboxs.open(str, {
        boxid: 'fanwe_success_box',
        contentType: 'text',
        position: 'center',
        showButton: true,
        showCancel: false,
        showOk: true,
        title: '提示',
        width: 250,
        type: 'wee',
        onopen: function() {
            init_ui_button()
        },
        onclose: func
    })
};
$.showConfirm = function(str, funcok, funcclose) {
    var okfunc = function() {
        $.weeboxs.close("fanwe_confirm_box");
        funcok.call()
    };
    $.weeboxs.open(str, {
        boxid: 'fanwe_confirm_box',
        contentType: 'text',
        showButton: true,
        showCancel: true,
        showOk: true,
        title: '确认',
        width: 250,
        type: 'wee',
        onopen: function() {
            init_ui_button()
        },
        onclose: funcclose,
        onok: okfunc
    })
};

$(document).ready(function() {
	/*
    $("img").one("error", function() {
        $(this).attr("src", ERROR_IMG)
    });
    $.each($("img"), function(i, n) {
        if ($(n).attr("src") == '') $(n).attr("src", ERROR_IMG)
    });
	*/
	//导航栏子菜单鼠标移动显示效果
    $(".jcur").hover(function() {
        $(this).find(".sub_main_nav").removeClass("hide");
        var w = $(this).outerWidth();
        var sw = $(this).find(".sub_main_nav").outerWidth();
        var lf = 0;
        if (w > sw) {
            lf = (w - sw) / 2
        } else {
            lf = -(sw - w) / 2
        }
        $(this).find(".sub_main_nav").css({
            "left": lf
        })
    }, function() {
        $(this).find(".sub_main_nav").addClass("hide")
    });
	//我要投资-投资列表鼠标移动效果
    $(".deal_list_table tr.item").hover(function() {
        $(this).addClass("item_cur")
    }, function() {
        $(this).removeClass("item_cur")
    });
	//导航菜单
    $(".main_nav").find("a").bind("focus", function() {
        $(this).blur();
    });
	
	//编辑个人资料
    $("#edit-account").click(function() {
        if ($(this).html() == "编辑资料") {
            $(this).html("取消编辑");
            $(".account-view-box").addClass("hide");
            $(".account-edit-box").removeClass("hide")
        } else {
            $(this).html("编辑资料");
            $(".account-view-box").removeClass("hide");
            $(".account-edit-box").addClass("hide")
        }
    });
	
	//右上角二维码APP先保留
    $("#J_APP_DOWN a").click(function() {
        var obj = $(this);
        var vobj = obj.parent().find(".grcode_box");
        if (vobj.hasClass("hide")) {
            vobj.removeClass("hide")
        } else {
            vobj.addClass("hide")
        }
        $("body").one("click", function() {
            vobj.addClass("hide")
        });
        return false
    });
	//初始化表单UI
    init_ui_checkbox();
    init_ui_radiobox();
    init_ui_textbox();
    init_ui_select();
    init_top_nav()
});

function init_top_nav() {
    if ($("#header .sub_main_nav a.current").length > 0) {
        $("#header .sub_main_nav a.current").parent().parent().addClass('current')
    }
}

function init_ui_textbox() {
    $(".ui-textbox[init!='init'],.ui-textarea[init!='init']").each(function(i, o) {
        $(o).attr("init", "init");
        $(o).ui_textbox()
    })
}

function init_ui_checkbox() {
    $("label.ui-checkbox[init!='init']").each(function(i, ImgCbo) {
        $(ImgCbo).attr("init", "init");
        $(ImgCbo).ui_checkbox()
    })
}

function init_ui_radiobox() {
    $("label.ui-radiobox[init!='init']").each(function(i, ImgCbo) {
        $(ImgCbo).attr("init", "init");
        $(ImgCbo).ui_radiobox()
    })
}
var droped_select = null;
var uiselect_idx = 0;

function init_ui_select() {
    $("select.ui-select[init!='init']").each(function(i, o) {
        uiselect_idx++;
        var id = "uiselect_" + Math.round(Math.random() * 10000000) + "" + uiselect_idx;
        var op = {
            id: id
        };
        $(o).attr("init", "init");
        $(o).ui_select(op)
    });
    $("select.ui-drop[init!='init']").each(function(i, o) {
        uiselect_idx++;
        var id = "uiselect_" + Math.round(Math.random() * 10000000) + "" + uiselect_idx;
        var op = {
            id: id,
            event: "hover"
        };
        $(o).attr("init", "init");
        $(o).ui_select(op)
    });
    $(document.body).click(function(e) {
        if ($(e.target).attr("class") != 'ui-select-selected' && $(e.target).parent().attr("class") != 'ui-select-selected') {
            $(".ui-select-drop").fadeOut("fast");
            $(".ui-select").removeClass("dropdown");
            droped_select = null
        } else {
            if (droped_select != null && droped_select.attr("id") != $(e.target).parent().attr("id")) {
                $(droped_select).find(".ui-select-drop").fadeOut("fast");
                $(droped_select).removeClass("dropdown")
            }
            droped_select = $(e.target).parent()
        }
    })
}



//最小长度校验
$.minLength = function(value, length, isByte) {
    var strLength = $.trim(value).length;
    if (isByte) strLength = $.getStringLength(value);
    return strLength >= length
};
//最大长度校验
$.maxLength = function(value, length, isByte) {
    var strLength = $.trim(value).length;
    if (isByte) strLength = $.getStringLength(value);
    return strLength <= length
};
//获取字符串长度
$.getStringLength = function(str, mode) {
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
$.checkNumber = function(value) {
    if ($.trim(value) != ''){
		return !isNaN($.trim(value));
	}else{
		return true;
	} 
};
//11位手机校验
$.checkMobilePhone = function(value) {
    if ($.trim(value) != '') return /^\d{11}$/i.test($.trim(value));
    else return true
};
//邮箱校验
$.checkEmail = function(val) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(val)
};
//placeholder属性支持校验
function hasPlaceholderSupport() {
    var attr = "placeholder";
    var input = document.createElement("input");
    return attr in input
}
//发送手机验证码o:按钮，obj:手机号码输入框，i:,url:请求地址
function sendPhoneCode(o, obj, i, url) {
    if ($(o).hasClass("btn_disable")) {
        return false
    }
    if (i == null) {
        i = '0'
    }
    if ($.trim($(obj).val()) == "") {
        $.showErr("请输入手机号");
        return false
    }
    if (!$.checkMobilePhone($(obj).val())) {
        $.showErr("请填写正确的手机号码");
        return false
    }
    if (!$(o).hasClass('btn_disable')) {
        $(o).addClass('btn_disable');
        get_verify_code(obj, url, function() {
            ResetsendPhoneCode(o, 60, i)
        })
    }
}
var resetSpcThread = new Array();
//显示倒计时
function ResetsendPhoneCode(o, times, i) {
    if (i == null) {
        i = "0"
    }
    clearTimeout(resetSpcThread[i]);
    if (times > 0) {
        times--;
        $(o).addClass("btn_disable");
        $(o).val("获取手机验证码" + " " + times);
        resetSpcThread[i] = setTimeout(function() {
            ResetsendPhoneCode(o, times, i)
        }, 1000)
    } else {
        $(o).removeClass("btn_disable");
        $(o).val("获取手机验证码")
    }
}
//发送手机验证
function get_verify_code(obj, url, func) {
    var user_mobile = $(obj).val();
    var ajaxurl = url;
    //if (url == null) ajaxurl = APP_ROOT + "/index.php?ctl=ajax&act=get_verify_code";

    //else ajaxurl = url;
    var query = new Object();
    query.user_mobile = user_mobile;
    $.ajax({
        url: ajaxurl,
        data: query,
        type: "post",
        dataType: "json",
        success: function(obj) {
            if (obj.status) {
                if (func != null) {
                    func.call(this)
                }
                $.showSuccess(obj.info, function() {
                    to_send_msg = true
                })
            } else {
                $("#reveiveActiveCode").removeClass("btn_disable");
                $.showErr(obj.info)
            }
        },
        error: function(ajaxobj) {}
    })
}


function ajax_login(func) {
    $.weeboxs.open(APP_ROOT + "/index.php", {
        contentType: 'ajax',
        showButton: false,
        title: "请先登录",
        width: 570,
        type: 'wee',
        onopen: function() {
            init_ui_checkbox();
            init_ui_textbox()
        },
        onclose: func
    })
}
//格式化浮点数
function foramtmoney(price, len) {
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
}


function formatNum(num) {
    num = String(num.toFixed(2));
    var re = /(\d+)(\d{3})/;
    while (re.test(num)) {
        num = num.replace(re, "$1,$2")
    }
    return num
}

//关闭弹窗
function close_pop() {
    $(".dialog-close").click()
}

//横幅大广告
var timer;
var c_idx = 1;
var total = 0;
var is_has_show = false;
$(document).ready(function(){
	$("#main_adv_box").find("span").each(function(){
		if($.trim($(this).html())!=""){
			if (!is_has_show) {
				$(this).show();
				is_has_show = true;
			}
			total ++;
		}

	});
	if (total > 1) {
		$("#main_adv_ctl li").hide();
		init_main_adv();
		for(i=1;i<=total;i++){
			$("#main_adv_ctl li[rel='"+i+"']").show();
		}
		$("#main_adv_ctl ul").css({"width":35*total+"px"});
	}
	else {
		if(total==0)
			$("#main_adv_box").hide();
                else{
                    $("img","#main_adv_img ").each(function(){
                        var img_str = $(this).attr("src");
                        $(this).hide();

                        $(this).parent().css({"background":"url("+img_str+") no-repeat center 0","width":"100%","height":"100%"});
                     });
                }
		$("#main_adv_ctl").hide();
	}	
});

function init_main_adv(){
	$("#main_adv_box").find("span[rel='1']").show();
	$("#main_adv_box").find("li[rel='1']").addClass("act");
	$("img","#main_adv_img ").each(function(){
           var img_str = $(this).attr("src");
           $(this).hide();
           
           $(this).parent().css({"background":"url("+img_str+") no-repeat center 0","width":"100%","height":"100%"});
        });
	timer = window.setInterval("auto_play()", 5000);
	$("#main_adv_box").find("li").hover(function(){
		show_current_adv($(this).attr("rel"));		
	});
	
	$("#main_adv_box").hover(function(){
		clearInterval(timer);
	},function(){
		timer = window.setInterval("auto_play()", 5000);
	});
}

function auto_play(){	
	if(c_idx == total)
	{
		c_idx = 1;
	}
	else
	{
		c_idx++;
	}
	show_current_adv(c_idx);
}

function show_current_adv(idx){	
	$("#main_adv_box").find("span[rel!='"+idx+"']").hide();
	$("#main_adv_box").find("li").removeClass("act");
	$("#main_adv_box").find("li").find("div div div div").css("background-color","#fff");
	if($("#main_adv_box").find("span[rel='"+idx+"']").css("display")=='none')
	$("#main_adv_box").find("span[rel='"+idx+"']").fadeIn();
	$("#main_adv_box").find("li[rel='"+idx+"']").addClass("act");
	$("#main_adv_box").find("li[rel='"+idx+"']").find("div div div div").css("background-color","#f60");
	c_idx = idx;
}


//提现页
var Jcarry_From_Lock = false;
jQuery(function() {
    $("#Jcarry_amount").keyup(function() {
        setCarryResult()
    });
    $("#Jcarry_amount").blur(function() {
        setCarryResult()
    });
    $("#Jcarry_From").submit(function() {
        if (Jcarry_From_Lock) {
            return false
        }
        Jcarry_From_Lock = true;
        if ($.trim($("#Jcarry_amount").val()) == "" || !$.checkNumber($("#Jcarry_amount").val()) || parseFloat($("#Jcarry_amount").val()) <= 0) {
            Jcarry_From_Lock = false;
            $.showErr("请输入正确金额", function() {
                $("#Jcarry_amount").focus()
            });
            return false
        }
        if (parseFloat($("#Jcarry_acount_balance_res").val()) < 0) {
            Jcarry_From_Lock = false;
            $.showErr("您的账户余额不足", function() {
                $("#Jcarry_acount_balance_res").focus()
            });
            return false
        }
        if ($.trim($("#J_PAYPASSWORD").val()) == "") {
            Jcarry_From_Lock = false;
            $.showErr("请输入支付密码", function() {
                $("#J_PAYPASSWORD").focus()
            });
            return false
        }
        return true
    });
});

function tips(input, msg, top, left) {
    var tip = '<div class="cashdraw_tips" style="top: ' + top + 'px; left:' + left + 'px; display: block;"><div class="cashdraw_tip_header"></div><div class="cashdraw_tip_body_container"><div class="cashdraw_tip_body"><div class="cashdraw_tip_content">' + msg + '</div></div></div></div>';
    $("#imgtips").after(tip);
    input.onmouseout = function() {
        setTimeout(function() {
            $(".cashdraw_tips").remove()
        }, 500)
    }
}

function setCarryResult() {
    var carry_amount = 0;
    var total_amount = parseFloat($("#Jcarry_totalAmount").val());
    if ($.trim($("#Jcarry_amount").val()).length > 0) {
        if ($("#Jcarry_amount").val() == "-") {
            carry_amount = "-0"
        } else {
            carry_amount = parseFloat($("#Jcarry_amount").val())
        }
    }
    carry_amount = parseFloat(carry_amount);
    if (carry_amount < 0) {
        $("#Jcarry_balance").html("请输入正确金额")
    } else if (carry_amount > total_amount) {
        $("#Jcarry_balance").html("您的账户余额不足")
    } else if (carry_amount == 0) {
        $("#Jcarry_balance").html("取现最低只能是0.1元")
    } else {
        $("#Jcarry_balance").html("")
    }
    var fee = 0;
    var fee_type = 0;
    if (json_fee.length > 0) {
        if (carry_amount >= json_fee[json_fee.length - 1].max_price) {
            fee = json_fee[json_fee.length - 1].fee;
            fee_type = json_fee[json_fee.length - 1].fee_type
        } else {
            $.each(json_fee, function(n, data) {
                if (carry_amount >= data.min_price && carry_amount <= data.max_price) {
                    fee = data.fee;
                    fee_type = data.fee_type
                }
            })
        }
    }
    fee = parseFloat(fee);
    if (fee_type == 1) {
        fee = carry_amount * fee * 0.01
    }
    if (carry_amount + fee > total_amount) {
        $("#Jcarry_balance").html("您的账户余额不足")
    }
    $("#Jcarry_fee").html(foramtmoney(fee, 2) + " 元");
    var realAmount = carry_amount + fee;
    $("#Jcarry_realAmount").html(foramtmoney(realAmount, 2) + " 元");
    var acount_balance = total_amount - carry_amount - fee;
    $("#Jcarry_acount_balance_res").val(foramtmoney(acount_balance, 2));
    $("#Jcarry_acount_balance").html(foramtmoney(acount_balance, 2) + " 元")
}


