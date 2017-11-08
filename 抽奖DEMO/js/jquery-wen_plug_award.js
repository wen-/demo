/* 
 * JS Document for ccb.com
 * wen for geong.com
 * copyright wen
 * email:yellowwen@126.com
 * Date: 2013-11-13
 *
*/
(function($){
	$.fn.wen_plug_award = function(options){
		var defaultVal = {
			star:"#award",		//启动ID
			star_class:"",		//启动点击后样式
			speed:50,			//不建议更改
			slow_long:4000,		//慢转时间
			fast_long:6000,		//快转时间
			slow1_long:3000,	//第一阶段减慢
			slow2_long:2000,	//第二阶段减慢
			stepby:4,			//最小步进，不建议更改
			stepby1:10,			//第一阶段减慢步进
			stepby2:20,			//快转步进
			part:8,				//转盘格数,小于10
			timeout:30000,		//超时
			data_url:"",		//请求数据地址
			star_fn:"",			
			end_fn:""
		};
		var obj = $.extend(defaultVal,options);
		return this.each(function(){
			var $this = $(this);
			if(!obj.star){
				//console.log("请设置启动ID");	
				return false;
			}
			if($this.length > 1 || $(obj.star).length > 1){
				//console.log("存在多个相同对象,请检查！");	
				return false;
			}
			var oDiv = document.getElementById(this.id),
				odiv = $this,
				oDiv_h = odiv.height(),
				oDiv_w = odiv.width();
			var i = 0,
				cjdata = {},
				old_time,
				new_time,
				t,
				Rotation = parseInt(360/obj.part);
				
			function resetval(){
				cjdata = {};
			};
			
			function goodluck(){
				/*if(typeof obj.star_fn == "function"){
					obj.star_fn();
				}*/
				if(!!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) < 9)){
					cj_ie();
				}else{
					cj_other();
				}; 
			};
			
			$(obj.star).bind("click",function(){
				if($(obj.star).hasClass("off")){
					return false; 
				}else{
					$(obj.star).addClass("off " + obj.star_class); 
				}
				if(typeof obj.star_fn == "function"){
					var r = obj.star_fn();
					if(!r){return false;}
				}
				old_time = new Date().getTime();
				get_cjdata();
				goodluck();
			});
			
			
			
			function logic(){
				//cjdata = obj.star_fn() || {};
				new_time = new Date().getTime();
				if((new_time - old_time) > obj.slow_long){
					if(new_time - old_time > (obj.slow_long+obj.fast_long) && new_time - old_time < (obj.slow_long+obj.fast_long+obj.slow1_long) && !!(cjdata.finish)){
						i+=obj.stepby1;
					}else if(new_time - old_time > (obj.slow_long+obj.fast_long+obj.slow1_long) && !!(cjdata.finish)){
						i+=obj.stepby;
						if(new_time - old_time > (obj.slow_long+obj.fast_long+obj.slow1_long+obj.slow2_long) && i > (cjdata.rot-1)*Rotation-10 && i < (cjdata.rot-1)*Rotation+10){
							i = (cjdata.rot-1)*Rotation;
							if(!!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) < 9)){
								oDiv.onfilterchange=null;
							}else{
								window.clearInterval(t);
							}
							if(typeof obj.end_fn == "function"){
								window.setTimeout(function(){
									obj.end_fn(cjdata);
									if(cjdata.gamekey == "1"){
										$(obj.star).removeClass("off " + obj.star_class);
										resetval();
									}
								},1500);
							}
						}
					}else if(new_time - old_time > obj.timeout){
						i = 0;
						if(!!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) < 9)){
							oDiv.onfilterchange=null;
						}else{
							window.clearInterval(t);
						}
						/*
						window.setTimeout(function(){
							window.location.reload();
						},3000);
						*/
					}else{
						i+=obj.stepby2;
					}
				}else{
					i+=obj.stepby;
				}
				if (i>359) {
					i=0;
				}
				if(!!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) < 9)){
					SetRotation(i);
				}else{
					$this.attr("style",transformAll+': rotate('+i+'deg)');
					
				}
			}
			
			function cj_other(){
				
				t = window.setInterval(function(){
					logic();
				},obj.speed)
			};
			
			function cj_ie(){
				function DoAnimation(){
					oDiv.onfilterchange=DoAnimation;
					logic();
				};
				DoAnimation();
			}
			
			function SetRotation(deg) {//cos||sin => Math.cos||Math.sin
				var deg2rad=Math.PI*2/360,
					rad=deg*deg2rad,
					costheta = Math.cos(rad),
					sintheta = Math.sin(rad),
					//旋转方法1（sizingmethod="clip to original"）+dx+dy--比较稳定，适用于圆形
					fdx=-oDiv_w/2*costheta+oDiv_h/2*sintheta+oDiv_w/2,
					fdy=-oDiv_w/2*sintheta-oDiv_h/2*costheta+oDiv_h/2;
					
				oDiv.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(sizingmethod="clip to original",FilterType="bilinear",Dx='+fdx+',Dy='+fdy+',M11='+costheta+',M12='+-sintheta+',M21='+sintheta+',M22='+costheta+')';
			};
			
			function get_cjdata(){
				// (!!(obj.data_url).match(/^http:\/\/ccb\.com|^http:\/\/www\.ccb\.com/))可以在这里检测域名
				if(obj.data_url.indexOf("?") > -1){
					obj.data_url = obj.data_url+"&"+(+new Date());//"&"+(+new Date())防止从缓存取数据
				}else{
					obj.data_url = obj.data_url+"?"+(+new Date());//"?"+(+new Date())防止从缓存取数据
				}
				$.getJSON(obj.data_url,function(json){
					cjdata = json;
				})
			};
			
		})
		
	}
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
