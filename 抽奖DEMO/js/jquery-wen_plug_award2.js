(function($){
	$.fn.wen_plug_award2 = function(options){
		var defaultVal = {
			star:"#gameBtn",		//启动ID
			star_class:"",			//启动class
			styleName:"hold",		//高亮样式
			speed:300,          	//初始速度
			speedQuick:50,   		//加速
			quicks:5,            	//走多少格开始加速
			row:4,					//表格有多少行
			col:4,					//表格有多少列
			endIndex:0,        		//决定在哪一格减速
			endCycle:6,        		//快速转多少圈后减速
			timeout:300000,			//超时 
			data_url:"",			//请求数据地址
			star_fn:"",
			end_fn:""
		};
		var obj = $.extend(defaultVal,options);
		return this.each(function(){
			var $this = $(this),
				gamebox = this,
				arr = GetSide(obj.row, obj.col),  	//初始化数组
				index = 0,           				//当前亮区位置(从哪一格开始)
				prevIndex = 0,        				//前一位置(用于清除高亮样式)
				flag = false,         				//结束转动标志 
				quick = 0,            				//走了多少格
				cycle = 0,							//转了多少圈
				Time,           		 			//定义对象
				old_time,
				new_time,
				cjdata = {};			 			//中奖数据
				
			$(obj.star).bind("click",function () {
				var elm = $(this);
				if($(obj.star).hasClass("off")){
					return false; 
				}else{
					$(obj.star).addClass("off " + obj.star_class); 
				}
				if(typeof obj.star_fn == "function"){
					obj.star_fn();
				};
				get_cjdata();
				old_time = new Date().getTime();
				Time = setInterval(Star, obj.speed);
			});
			
			function resetval(){
				index = 0,           				//当前亮区位置(从哪一格开始)
				prevIndex = 0,        				//前一位置(用于清除高亮样式)
				flag = false,         				//结束转动标志 
				quick = 0,            				//走了多少格
				cycle = 0,							//转了多少圈
				cjdata = {};
				
			};
			
			function Star(num) {
				new_time = new Date().getTime();
				$(gamebox.rows[arr[index][0]].cells[arr[index][1]]).addClass(obj.styleName);
				if (index > 0) {
					prevIndex = index - 1;
				}else {
					prevIndex = arr.length - 1;
				};
				$(gamebox.rows[arr[prevIndex][0]].cells[arr[prevIndex][1]]).removeClass(obj.styleName);
				index++;
				quick++;
				
				
		 		//慢转1圈后停止
				if (flag == true && index == cjdata.grid && cycle == 1) {
					quick = 0;
					clearInterval(Time);
					if(typeof obj.end_fn == "function"){
						obj.end_fn(obj.star,cjdata);
						if(cjdata.gamekey == "1"){
							$(obj.star).removeClass("off " + obj.star_class);
							resetval();
						}
					}
				}
				
				if (index >= arr.length) {
					index = 0;
					cycle++;
				}
		
		
				//跑马灯变速
				if (flag == false) {
					//走多少格开始加速
					if (quick == obj.quicks) {
						clearInterval(Time);
						Time = setInterval(Star, obj.speedQuick);
					}
					//跑指定圈并且数据请求回来后减速
					if (cycle >= obj.endCycle && index == obj.endIndex && !!(cjdata.finish)) {
						clearInterval(Time);
						flag = true;         	//触发结束
						cycle = 0;				//重置圈数，用于慢转1圈后停止
						Time = setInterval(Star, obj.speed);
					}
					//超时
					if(obj.timeout <= new_time - old_time){
						clearInterval(Time);
						flag = true;         	//触发结束
						cycle = 0;				//重置圈数，用于慢转1圈后停止
						cjdata.grid = 1;		//在第一格停止
						Time = setInterval(Star, obj.speed);
					}
				}
				
			}
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
				
				/*
				var dtd = $.Deferred();
				$.get(obj.data_url).done(function(json){
					alert(json.finish);
					cjdata = json;
					dtd.resolve();
				}).fail(function(){
					alert("请求失败");
					dtd.reject();
				});
				return dtd.promise();
				*/
			};
		})
	}
	
	//获取数组最外圈传入参数行、列数
	function GetSide(m, n) {
		//初始化数组
		var arr = [];
		for (var i = 0; i < m; i++) {
			arr.push([]);
			for (var j = 0; j < n; j++) {
				arr[i][j] = i * n + j;
			}
		}
		//获取数组最外圈
		var resultArr = [];
		var tempX = 0,
		tempY = 0,
		direction = "Along",
		count = 0;
		while (tempX >= 0 && tempX < n && tempY >= 0 && tempY < m && count < m * n) {
			count++;
			resultArr.push([tempY, tempX]);
			if (direction == "Along") {
				if (tempX == n - 1)
					tempY++;
				else
					tempX++;
				if (tempX == n - 1 && tempY == m - 1)
					direction = "Inverse"
			}
			else {
				if (tempX == 0)
					tempY--;
				else
					tempX--;
				if (tempX == 0 && tempY == 0)
					break;
			}
		}
		return resultArr;
	}

})(jQuery);
