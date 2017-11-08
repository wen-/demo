// JavaScript Document
(function ($) {
$.fn.extend({
Scroll: function (opt, callback) {
	if (!opt) var opt = {};
	var timerID;
	var _this_ul = this.find("ul").eq(0);
	var _this_li = _this_ul.find("li").eq(0);
	var lineH = _this_li.height();//获取容器高度
	line = opt.line ? parseInt(opt.line, 10) : parseInt(_this_li.height() / lineH, 10);
	speed = opt.speed ? parseInt(opt.speed, 10) : 500; //滚动速度，数值越大，速度越慢（毫秒）
	timer = opt.timer ? parseInt(opt.timer, 10) : 3000; //滚动的时间间隔（毫秒)
    if (line == 0) line = 1;
    var upheight = 0 - line * lineH;
	
	//滚动函数
	var scrollTop = function () {
		if (!_this_ul.is(":animated")) {
			_this_ul.animate({
			top: upheight
			}, speed, function () {
				for (i = 1; i <= line; i++) {
				 _this_ul.find("li:first").appendTo(_this_ul);
				}
				_this_ul.css({ top: 0 });
			});
		}
	}
	
	//自动播放
	if (timer) timerID = window.setInterval(scrollTop, timer);


}
})
})(jQuery);

$(function(){
	$(".jp_txt").append("<span></span>");
	if($(".pop_wrap_msg").height > parseInt($(".pop_wrap_msg").css("line-height"))){
		$(".pop_wrap_msg").css("text-align","left");
	}
});