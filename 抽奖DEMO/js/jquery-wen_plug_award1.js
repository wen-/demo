// JavaScript Document
/* 
 * JS Document for ccb.com
 * wen for geong.com
 * Date: 2013-11-13
*/
(function($){
	$.fn.wen_plug_award1 = function(options){
		var defaultVal = {
			star:"",				//启动ID---"#id"需要#号
			star_class:"",			//启动后样式---"class"不需要点
			list:".cj_777_ico",		//每一容器方格class名称
			speed1:60,				//循环周期时间
			speed2:1000,			//第一阶段慢转时间
			speed3:8000,			//第二阶段快转时间
			speed4:2000,			//第三阶段慢转时间
			speed5:2000,			//第四阶段慢转时间
			stepby1:10,				//第一阶段转速（步进）
			stepby2:50,				//第二阶段转速（步进）
			stepby3:15,				//第三阶段转速（步进）
			stepby4:8,				//第四阶段转速（步进,需小于10）
			delay1:500,				//开始转动时每一格的延迟
			timeout:300000,			//超时（请求不到数据时）
			data_url:"",			//请求数据地址
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
			var i = 0,
				$list = $this.find(obj.list),
				l = $list.length,
				move = [],old_html = [],mar_t = [],
				delay2 = 0,
				cjdata = {};
			for(var j = 0; j < l; j++){
				move[j] = false;
			};
			
			$list.each(function(index, element) {
                old_html[index] = $(this).html();
				mar_t[index] = $(this).css("margin-top");
            });
			function resetval(){
				i = 0;
				move = [];
				delay2 = 0;
				cjdata = {};
				$list.each(function(index, element) {
					$(this).html(old_html[index]).css("margin-top",mar_t[index]);
				});
			};
			
			$(obj.star).bind("mousedown",function(){
				
				var rr;
				//请求数据
				get_cjdata();
				if($(obj.star).hasClass("off")){
					return false; 
				 }else{
					$(obj.star).addClass("off " + obj.star_class); 
				 }
				//执行回调，如果存在
				if(typeof obj.star_fn == "function"){
					obj.star_fn(obj.star);
				}
				//每一格启动的延迟
				rr = window.setInterval(function(){
					cj_777($list.eq(i),i,l);
					i++;
					window.clearInterval(rr);
					delay2 = obj.delay1;
					rr = window.setInterval(function(){
						cj_777($list.eq(i),i,l);
						i++;
						if(i >= l){
							window.clearInterval(rr);
						}
					},delay2);
				},delay2);
			});
			
			
			function cj_777(elm,i,l){
				//初始子元素长度
				var l1 = elm.children().length;
				//复制子元素
				elm.children().clone().appendTo(elm);
				//复制后子元素长度
				var l2 = elm.children().length,
					h = elm.children(":first").height(),
					mtop1 = -h*l1+h,
					mtop2 = -h*l2+h,
					mtop3 = mtop2;
					
				var t,
					flag1,
					flag2,
					flag3,
					flag = true,
					new_time, 
					old_time = new Date().getTime(),
					step = obj.stepby1;
				//复制子元素后定位	
				elm.css({"margin-top":mtop2});
				//开始转动
				t = window.setInterval(star,obj.speed1);
				
				function star(){
					new_time = new Date().getTime();
					//转动步进
					mtop3+=step;
					if(mtop3 >= mtop1){
						mtop3 = mtop2;
					}
					
					elm.css({"margin-top":mtop3});
					
					if(flag){
						if(new_time - old_time >= obj.speed2 && new_time - old_time < obj.speed2 + obj.speed3){
							//第一阶段慢转结束
							flag = false;
							flag1 = true;
							//进入第二阶段快转
							step = obj.stepby2;
						}
					};
					
					if(flag1){
						if(new_time - old_time >=  obj.speed2 + obj.speed3 && !!cjdata.finish){
							//第二阶段快转结束并且请求到数据后,如果请求不到数据或网络问题则快转直到超时
							flag1 = false;
							flag2 = true;
							old_time = new_time;
							//进入第三阶段慢转
							step = obj.stepby3;
						}
						
						//超时处理
						if(new_time - old_time >=  obj.timeout){
							var mt;
							if(i+1 == l1){
								mt = mtop1;
							}else{
								mt = mtop1 + (-h*(i+1));
							}
							window.clearInterval(t);
							elm.css({"margin-top":mt});
							if(i == l-1){
								//执行回调，如果存在
								if(typeof obj.end_fn == "function"){
									window.setTimeout(function(){
										obj.end_fn(cjdata);
									},1000)
								}
							}
						}
					};
					
					if(flag2){
						if(new_time - old_time >=  obj.speed4){
							//第三阶段慢转结束
							flag2 = false;
							flag3 = true;
							//进入第四阶段慢转
							step = obj.stepby4;
						}
					};
					
					if(flag3){
						if(new_time - old_time >=  obj.speed4 + obj.speed5){
							//从请求到的数据中计算停止的位置
							var mt;
							if(cjdata['list'+(i+1)] == l1){
								mt = mtop1;
							}else{
								mt = mtop1 + (-h*cjdata['list'+(i+1)]);
							}
							//判断是否在可停止的范围
							//console.log("mtop3: "+mtop3+'--------'+"mt: "+mt);
							if(mtop3 >= mt-10 && mtop3 < mt){
								//前一格是否已停止
								if(i == 0){
									move[i] = true;	
								}else{
									if(move[i-1] == true){
										move[i] = true;
									}
								};
								
								if(!!move[i]){
									flag3 = false;
									window.clearInterval(t);
									elm.css({"margin-top":mt});
									if(i == l-1){
										//执行回调，如果存在
										if(typeof obj.end_fn == "function"){
											window.setTimeout(function(){
												obj.end_fn(cjdata);
												if(cjdata.gamekey == "1"){
													$(obj.star).removeClass("off " + obj.star_class);
													resetval();
												}
											},1000)
										}
									}
								};
							}
							
						}
					};
				}
			};
			
			//请求数据
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
	
})(jQuery);
