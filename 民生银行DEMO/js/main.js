// JavaScript Document
/* 
 * JS Document for MinSheng Bank
 * wen GEONG
 * http://www.geong.com/
 * Date: 2013-08-27
 */
$(function(){
	$("#ad_play").wen_slide({
		pre_page:".wen_pre_page",           //上一个标签:#xxx/.xxx
		next_page:".wen_next_page",         //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		autoplay:true,                		//自动播放：true(是)/false(否)
		auto_speed:5000,               		//自动播放时间间隔：越大停留时间越久
		pre_next:false,                     //上下按钮是否可以隐藏
		page_copy:false,					//复制页
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	});
	$(".wen_pre_page,.wen_next_page").hover(function(){
		if($(this).hasClass("wen_pre_page")){
			$(this).addClass("pre_on");
		}else if($(this).hasClass("wen_next_page")){
			$(this).addClass("next_on");
		}
	},function(){
		if($(this).hasClass("wen_pre_page")){
			$(this).removeClass("pre_on");
		}else if($(this).hasClass("wen_next_page")){
			$(this).removeClass("next_on");
		}
	});
	
	var h = $(".recommend_m").children("ul").height();
	$(".unfold_btn a").click(function(){
		if(!$(this).hasClass("on")){
			$(".recommend_m").animate({height:h},300);
			$(this).addClass("on");
		}else{
			$(".recommend_m").animate({height:"200px"},300);
			$(this).removeClass("on");
		}
		return false;
	})
});

$(function(){
	/*首页消息滚动 msg_play */
	(function play(obj){
		jQuery(obj).each(function(){
			var $root = jQuery(this);
			var $items = $root.find('li');
			var i_height = $items.height();
			var i_count = $items.length;
			var interval_ms = 3000;
			var animate_speed = 'fast';
			var stop_flag = false;
			var cur_idx = 0;
			//clone(items)
			$root.append($items.clone(true));
			var interval_handler = null;
			if ( i_count > 1 ){
				window.clearInterval(interval_handler);
				interval_handler = window.setInterval(function(){
					if ( stop_flag ){
						return false;
					}
					cur_idx = ++cur_idx;
					var need_jump = false;
					if ( cur_idx >= i_count ){
						need_jump = true;
					}
					if( need_jump ){
						$root.stop().animate({top:-cur_idx*i_height},animate_speed,function(){
							$root.css({"top":0})
						});
						cur_idx = 0;
					}else{
						$root.stop().animate({top:-cur_idx*i_height},animate_speed);
					}
				},interval_ms);
			}
			$root.hover(function(){
				stop_flag = true;
			},function(){
				stop_flag = false;
			});
		}); 
	})("#msg_play");
	//play(".js_marquee_notice");
});