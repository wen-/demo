/*
 * JS Document for 安信
 * developer: 黄文雄
 * email: yellowwen@126.com
 * Date: 2016-08-05
 * 1、初始化一些动画效果
 * 2、首页广告图效果
 * 3、图片延迟加载
 * 4、导航菜单
 * 5、首页搜索TAB
 * 6、房源列表右侧
 * 7、小区列表下拉
 * 8、小区列表数字
 * 9、首页图表
 * 10、小区页图表
 */
var base_url = "";
layer&&layer.config({
	path:base_url+"js/layer"
});
$(function(){
	/*--1、初始化一些动画效果--*/
	if (document.querySelectorAll) {
		if(!(parseInt((navigator.userAgent).slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+9)) <= 9)){
			window.GHOST&&new GHOST().init();
		}
	}
	/*--2、首页广告图效果--*/
	if($(".show_box").length){
		function animateImg(){
			var size = 1920,sizeNew = size*1.5;
			var s = window.setInterval(function(){
				sizeNew -= 20;
				if(sizeNew > size){
					$(".show_box").css({"backgroundSize":sizeNew + "px"});
				}else{
					$(".show_box").css({"backgroundSize":"auto"});
					window.clearInterval(s);
				}
			},50);
		}
		var showImg = new Image();
		showImg.onload = function(){
			animateImg();
		};
		showImg.onerror = function(){
			animateImg();
		};
		showImg.src = base_url+"images/show.jpg";
	}
	/*--3、图片延迟加载--*/
	$("img.lazy").lazyload({
		effect : "fadeIn",
		failure_limit:30
	});
	/*--4、导航菜单--*/
	$(".header .nav dl").hover(function(){
		if(!$(this).children("dd").is(':animated')){
			$(this).children("dd").slideDown(100);
		}
	},function(){
		$(this).children("dd").slideUp();
	});
	/*--5、首页搜索TAB--*/
	$(".h_search_box .tab span").click(function(){
		var index = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(this).parents(".h_search_box").siblings(".tips").hide().eq(index).show();
		$(this).siblings("input[name='hstype']").val($(this).data("type"));
	});
	//搜索
	if($(".houseVal").length){
		$(".houseVal").each(function(i,n){
			var $this = $(this);
			var cache = {};
			var url = $this.data("url");
			var w = $this.outerWidth();
			$this.autocomplete({
				//source: ["ActionScript","AppleScript","Asp","BASIC","C","C++","Clojure","COBOL"]
				//minLength:2,
				delay:500,
				source:function(request, response){
					var term = request.term;
					if ( term in cache ) {
					  response( cache[ term ] );
					  return;
					}
	
					$.getJSON( url, request, function( data, status, xhr ) {
					  cache[ term ] = data;
					  response( data );
					});
				},
				select:function(){
					/*window.setTimeout(function(){
						$("#searchHs").submit();
					},500)*/
				}
			}).autocomplete( "instance" )._renderItem = function( ul, item ) {
				//console.log(item);
				var t = "";
				t = item.parentAreaName?t+'<span class="hs-district lfloat">'+item.parentAreaName+'</span>':t;
				t = item.childAreaName?t+'<span class="hs-area lfloat">'+item.childAreaName+'</span>':t;
				t = item.roomTotal?t+'<span class="hs-count rfloat">约'+item.roomTotal+'套房源</span>':t;
				return $( "<li>" )
				.append('<a href="'+item.url+'" class="clearfix"><span class="hs_name lfloat">'+item.label+'</span>'+t+'</a>')
				.appendTo( ul );
			};
		});
		$("#searchHsBtn").click(function(){
			var type = $("#searchHs").find("span.current").data("type");
			var keyword = $(".houseVal").val();
			var url = $("#searchHs").data("url");
			type = type?"/"+type:"";
			keyword = keyword?"/"+keyword:"";
			window.location.href = url+type+keyword;
			return false;
		});
		$(".houseVal").keydown(function(e) {
			if (e.which == 13) {
				var type = $("#searchHs").find("span.current").data("type");
				var keyword = $(this).val();
				var url = $("#searchHs").data("url");
				type = type?"/"+type:"";
				keyword = keyword?"/"+keyword:"";
				window.location.href = url+type+keyword;
			}
		});
	}

	/*--6、房源列表右侧--*/
	$(".house_aside .info2 li,.house_aside .info3 li").mouseenter(function(){
		var $this = $(this);
		$this.children(".pt").show();
		$this.siblings("li").children(".pt").hide();
	});
	/*--7、小区列表下拉--*/
	$(".select_box").hover(function(){
		if(!$(this).children("ul").is(':animated')){
			$(this).children("ul").slideDown(100);
		}
	},function(){
		$(this).children("ul").slideUp();
	});
	/*--8、小区列表数字--*/
	if($("#counterNum").length){
		var n = $("#counterNum").data('num');
		$('#counterNum').kCounter({ initial: "12345", duration: 2000, easing: 'swing', width: 25,s:","}) ;
		$('#counterNum').kCounter('update', n) ;
	}
	/*--9、首页图表--*/
	if($("#deal").length){
		$.ajax({
			type: 'get',
			url: 'json/data.json',
			dataType: 'json',
			success: function(response) {
				if(response.success == 200){
					deal(response);
				}else{
					deal();
				}
			},
			error: function (e) {
				deal();
			}
		});
		function deal(obj){
			if(!obj){
				$("#deal").text("数据获取失败！").css({
					"text-align":"center",
					"line-height":"350px"
				});
				return false;
			}
			var deal = echarts.init(document.getElementById('deal'));
			var option = {
				title: {
					show:false,
					text: '成交量走势图',
					subtext: '二手房'
				},
				tooltip : {
					trigger: 'axis',
					formatter: function (params,ticket,callback) {
						var res =  params[0].name;
						for (var i = 0, l = params.length; i < l; i++) {
							res += '<br/>' + params[i].seriesName+'：'+params[i].value+(params[i].seriesName=="成交套数"?' 套':' 元/m2');
						}
						return res;
					}
				},
				legend: {
					y:"bottom",
					data:['成交套数','成交均价']
				},
				toolbox: {
					show : false,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				xAxis : [
					{
						type : 'category',
						splitLine: {show:false},
						data :  obj.date
					}
				],
				yAxis : [
					{
						name:'套数',
						type : 'value',
						nameTextStyle:{'color':'#444',"fontSize":"16"}
					},
					{
						name:'价格(元)',
						position: 'left',
						type : 'value',
						nameTextStyle:{'color':'#444',"fontSize":"16"}
					}
				],
				series : [
					{
						name:'成交套数',
						type:'bar',
						data:obj.deal
					},
					{
						name:'成交均价',
						type:'line',
						yAxisIndex: 1,
						data:obj.price
					}
				]
			};
			deal.setOption(option);
		}
	}
	/*--10、小区页图表--*/
	if($("#zs").length){
		$.ajax({
			type: 'get',
			url: 'json/data.json',
			dataType: 'json',
			success: function(response) {
				if(response.success == 200){
					zs(response);
				}else{
					zs();
				}
			},
			error: function (e) {
				zs();
			}
		});
		function zs(obj){
			if(!obj){
				$("#zs").text("数据获取失败！").css({
					"text-align":"center",
					"line-height":"100px"
				});
				return false;
			}
			var zs = echarts.init(document.getElementById('zs'));
			var option = {
				grid:{
					x:50,
					y:10,
					x2:10,
					y2:30
				},
				title: {
					show:false,
					text: '成交量走势图',
					subtext: '二手房'
				},
				tooltip : {
					trigger: 'axis',
					formatter: function (params,ticket,callback) {
						var res =  params[0].name;
						for (var i = 0, l = params.length; i < l; i++) {
							res += params[i].seriesName+'：<br/>'+params[i].value+(params[i].seriesName=="成交套数"?' 套':' 元/m2');
						}
						return res;
					}
				},
				legend: {
					show:false,
					y:"bottom",
					data:['成交均价']
				},
				toolbox: {
					show : false,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				xAxis : [
					{
						type : 'category',
						data :  obj.date1
					}
				],
				yAxis : [
					{
						type : 'value',
						scale: true,
						data:["一万","二万","三万","四万","五万"]
					}
				],
				series : [
					{
						name:'成交均价',
						type:'line',
						data:obj.price1
					}
				]
			};
			zs.setOption(option);
		}
	}

	//房源收藏
	$(".drop-menu-item").hover(function() {
		$(this).find(".drop-menu-list").show()
	}, function() {
		$(this).find(".drop-menu-list").hide()
	}).find(".drop-menu-list a").on("click", function() {
		var c = $.trim($(this).text());
		$(this).addClass("cur").siblings().removeClass("cur").parent().siblings().find("span").addClass("selected").text(c);
		$(this).parent().hide()
	});

	//二维码
	$("#qrCode").hover(function() {
		$(this).find(".qr-code-dropmenu").show();
	}, function() {
		$(this).find(".qr-code-dropmenu").hide()
	});

	//我邀请的人搜索
	if($("#inviteFrom").length){
		var start = {
			elem: '#inviteFrom',
			format: 'YYYY-MM-DD',
			//min: laydate.now(), //设定最小日期为当前日期
			max: '2099-06-16', //最大日期
			istime: true,
			istoday: false,
			choose: function(datas){
				end.min = datas; //开始日选好后，重置结束日的最小日期
				end.start = datas //将结束日的初始值设定为开始日
			}
		};
		var end = {
			elem: '#inviteTo',
			format: 'YYYY-MM-DD',
			//min: laydate.now(),
			max: '2099-06-16',
			istime: true,
			istoday: false,
			choose: function(datas){
				start.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(start);
		laydate(end);
	}

	$("body").on("click", ".confirm-close", function() {
		$(this).parent().addClass("dn");
	});
	//显示正在保存
	function showSave(layero,txt){
		layero.append('<div class="showSave" style="display:none;">'+txt+'&nbsp;<img src="'+base_url+'images/loading_small.gif" alt="" /></div>');
		$(".showSave").css({
			"position":"absolute",
			"top":0,
			"left":0,
			"height":layero.outerHeight(true),
			"line-height":layero.outerHeight(true)+"px",
			"width":layero.outerWidth(true),
			"opacity":.5,
			"color":"#fff",
			"font-size":"1.15em",
			"text-align":"center",
			"z-index":"1000",
			"background-color":"#000"
		});
	}
	//新房首页
	$("#wen_play").wen_play({
		show_n : "1",
		play_list:".play_list",			//定义第一层的LI列表，这样子项里面就算有其它的LI也不会受影响
		page_show:"num_opacity",		//页码显示方式决定了切换方式，"pre_next"/"num"/"num_opacity/mixture"
		speed:800,						//切换时间间隔
		autoplay:true,					//是否为自动播放
		autospeed:3000,					//自动播放时间间隔
		star_fn:"",						//回调切换开始前；
		end_fn:""
	});
	$(".pics-play").wen_play({
		show_n : "1",
		play_list:".play_list",			//定义第一层的LI列表，这样子项里面就算有其它的LI也不会受影响
		page_show:"mixture",		//页码显示方式决定了切换方式，"pre_next"/"num"/"num_opacity/mixture"
		speed:800,						//切换时间间隔
		autoplay:true,					//是否为自动播放
		autospeed:3000,					//自动播放时间间隔
		star_fn:"",						//回调切换开始前；
		end_fn:function(elem,n){
			var $li = elem.eq(n);
			var $pics = $li.find(".lazy");
			$pics.length&&$pics.each(function(i,n){
				var $this = $(this);
				var src = $(this).attr("src");
				var original = $(this).data("original");
				if(src&&original&&src != original){
					$this.attr("src",original).removeAttr("data-original");
				}
			});
		}
	});

	$(".apply_newhouse").click(function(){
		var txt = $("#getyhTemplate").html();
		layer.open({
			type:1,
			skin:'popup-class',
			title:'获取优惠',
			area: '480px',
			content: txt,
			success:function(layero){
				$(".lf-keyword").placeholder();
			}
		});
		return false;
	});
	$(document).on("click","#applySendNewHouse",function(){
		var query = {};
		query.phone = $("#telNum").val();
		query.code = $("#verificationCode").val();
		if(!query.phone||!mf8.checkMobile(query.phone)){
			layer.tips("请输入正确的手机号","#telNum");
			return false;
		}
		if(!query.code){
			layer.tips("请输入验证码","#verificationCode");
			return false;
		}
		showSave(layero,"正在提交");
		$(".showSave").slideDown(function(){
			$.ajax({
				type: 'post',
				url: "",
				data:query,
				dataType: 'json',
				success: function(res) {
					if (res.status == 200) {
						$(".showSave").html("提交成功！");
						window.setTimeout(function(){
							window.location.reload();
						},1000);
					}else {
						$(".showSave").html(res.msg);
						window.setTimeout(function(){
							$(".showSave").slideUp(function(){
								$(".showSave").remove();
							});
						},2000);
					}
				},
				error: function (e) {
					$(".showSave").html("提交失败！");
					window.setTimeout(function(){
						$(".showSave").slideUp(function(){
							$(".showSave").remove();
						});
					},1000);
				}
			});
		});
	});

	//新房展开户型图
	$(".gz_newhouse .pt .unfold").click(function(){
		var $this = $(this);
		if($this.hasClass("open")){
			$this.removeClass("open");
			$this.parents(".pt_txt").siblings(".house_img").slideUp();
		}else{
			$this.addClass("open");
			var $pics = $this.parents(".pt_txt").siblings(".house_img").slideDown().find(".lazy");
			$pics.length&&$pics.each(function(i,n){
				var $this = $(this);
				var src = $(this).attr("src");
				var original = $(this).data("original");
				if(src&&original&&src != original){
					$this.attr("src",original).removeAttr("data-original");
				}
			})
		}
	});
	//详情
	$("#guideBtns").wen_play({
		show_n : "5",
		play_list:".play_list",			//定义第一层的LI列表，这样子项里面就算有其它的LI也不会受影响
		page_show:"pre_next",		//页码显示方式决定了切换方式，"pre_next"/"num"/"num_opacity/mixture"
		speed:800,						//切换时间间隔
		autoplay:false,					//是否为自动播放
		autospeed:3000,					//自动播放时间间隔
		star_fn:function(){
			$("#curGuide").hide();
			$("#guideBtns .play_list.cur .photoalbum-dsp").hide();
		},						//回调切换开始前；
		end_fn:function(){
			$("#curGuide").css({"left":$("#guideBtns .play_list.cur").position().left}).fadeIn();
			$("#guideBtns .play_list.cur .photoalbum-dsp").fadeIn();
		}
	});
	$("#guideBtns .play_list").click(function(){
		var $this = $(this);
		$this.addClass("cur").siblings().removeClass("cur");
		var src_b = $this.children("img").data("src");
		var offset = $this.position();
		$("#previewCon img").attr("src",src_b);
		$this.siblings("li").find(".photoalbum-dsp").hide().css("bottom","-50px");
		$this.find(".photoalbum-dsp").show().animate({"bottom":0},500);
		$("#curGuide").animate({"left":offset.left},500);
	});

	if($("#anchorNav").length){
		var d = $("#anchorNav");
		var a = d.offset().top;
		var c = d.outerHeight();
		jQuery.scrollto = function(f, e) {
			$(f).click(function() {
				var g = $(this).attr("date-scroll");
				var h = $(g).offset().top - c;
				$("html,body").animate({
					scrollTop: h
				}, e);
				return false;
			});
		}
		;
		$.scrollto("#anchor-6,#anchor-1,#anchor-2,#anchor-3,#anchor-4,#anchor-5,#anchor-7", 1);
		function b() {
			var l = $(window).scrollTop();
			var e = d.find('li[data-type="anchor"]').find("a");
			var h = [];
			$.each(e, function(n, j) {
				h.push($(this).attr("id").replace(/anchor-/g, ""));
			});
			var k = [];
			for (var g = 0; g < h.length; g++) {
				k.push($("#scrollto-" + h[g]).offset().top - c);
			}
			function m(j, i) {
				return j - i;
			}
			k.sort(m);
			for (var f = k.length - 1; f >= 0; f--) {
				if (l == $(document).height() - $(window).height()) {
					d.find('li[data-type="anchor"]').eq(k.length - 1).addClass("cur").siblings().removeClass("cur");
					break;
				}
				if (l >= k[f]) {
					d.find('li[data-type="anchor"]').eq(f).addClass("cur").siblings().removeClass("cur");
					break;
				}
			}
		}
		winScrollFun = function() {
			var e = $(window).scrollTop();
			if (e >= a) {
				d.addClass("anchor-nav-fixed");
			} else {
				d.removeClass("anchor-nav-fixed");
			}
			b();
		};
		$(window).on("scroll", winScrollFun);
		winScrollFun();
	}
	(function(e) {
		var d = e("#toolbars");
		var c = d.find("li");
		var b = d.find("li.tool-backtop");
		b.css("visibility", "hidden");
		d.fadeIn();
		var a = function() {
			var f = e(window).scrollTop();
			if (f > 300) {
				b.css("visibility", "");
			} else {
				b.css("visibility", "hidden");
			}
		};
		a();
		var f;
		e(window).on("scroll", function() {
			if (f) {
				clearTimeout(f);
			}
			f = setTimeout(a, 30);
		});
		e(window).resize(a);
		d.find(".tool-backtop > span").on("click", function() {
			e("html, body").animate({
				scrollTop: 0
			},500);
		});
		c.hover(function() {
			e(this).find(".tool-desp").show().stop().animate({
				"right": 40,
				"opacity": 1
			});
		}, function() {
			e(this).find(".tool-desp").stop().animate({
				"right": 60,
				"opacity": 0
			}, function() {
				e(this).hide();
			});
		});
	})(jQuery);

	//收藏
	$(".like").click(function(){
		var txt = $("#loginTemplate").html();
		layer.open({
			type:1,
			skin:'popup-class',
			title:'',
			area: '500px',
			content: txt,
			success:function(layero){
				$(".lf-keyword").placeholder();
			}
		})
	});

	//价格走势
	if($("#jgChart").length){
		$.ajax({
			type: 'get',
			url: 'json/data.json',
			dataType: 'json',
			success: function(response) {
				if(response.success == 200){
					jgChart(response);
				}else{
					jgChart();
				}
			},
			error: function (e) {
				jgChart();
			}
		});
		function jgChart(obj){
			if(!obj){
				$("#jgChart").text("数据获取失败！").css({
					"text-align":"center",
					"line-height":"350px"
				});
				return false;
			}
			var deal = echarts.init(document.getElementById('jgChart'));
			var option = {
				title: {
					show:false,
					text: '价格走势图',
					subtext: ''
				},
				tooltip : {
					trigger: 'axis',
					formatter: function (params,ticket,callback) {
						var res =  params[0].name;
						for (var i = 0, l = params.length; i < l; i++) {
							res += '<br/>' + params[i].seriesName+'：'+params[i].value+(params[i].seriesName=="成交套数"?' 元/m2':' 元/m2');
						}
						return res;
					}
				},
				legend: {
					y:"bottom",
					data:['车陂','骏景花园']
				},
				toolbox: {
					show : false,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				xAxis : [
					{
						type : 'category',
						splitLine: {show:false},
						data :  obj.date
					}
				],
				yAxis : [
					{
						name:'价格(元)',
						type : 'value',
						nameTextStyle:{'color':'#444',"fontSize":"16"}
					}
				],
				series : [
					{
						name:'车陂',
						type:'line',
						data:obj.price2
					},
					{
						name:'骏景花园',
						type:'line',
						data:obj.price
					}
				]
			};
			deal.setOption(option);
		}
	}
	
	//描述展开
	if($("#hsEvaluation").length){
		var layou_h = $("#hsEvaluation").height();
		var inset_h = $("#hsEvaluation .ct").height();
		if(inset_h > layou_h){
			$("#moreHsInfo").show();
		}else{
			$("#moreHsInfo").hide();
		}
		$("#moreHsInfo a").click(function(){
			var $this = $(this);
			if($this.hasClass("open")){
				$this.removeClass("open");
				$("#hsEvaluation").height("200");
				$this.text("展开更多信息");
			}else{
				$this.addClass("open");
				$("#hsEvaluation").height("auto");
				$this.text("收起");
			}
		});
	}

	//详情页图片尺寸调整
	$("#hsPics li img").each(function(i,n){
		var $this = $(this);
		var w = $this.width();
		var h = $this.height();
		$this.css({
			"position":"absolute",
			"left":"50%",
			"top":"50%",
			"margin-left":-w *.5,
			"margin-top":-h *.5
		})
	});

	$(".title .exit").click(function(){
		layer.open({
			skin:'popup-class',
			title:'提示',
			area: '300px',
			content: '<p>确定退出？</p>',
			btn:['确定','取消'],
			btn1:function(){
				window.location.href="";
			},
			btn2:function(){
				layer.closeAll();
			}
		})
	});

	$(".lf-keyword").placeholder();

});
(function(a) {
	a.fn.placeholder = function(b) {
		var d = {
			placeholderClass: "lf-label"
		};
		var c = a.extend(d, b);
		return this.each(function() {
			var f = a(this);
			var e = a(this).siblings("." + c.placeholderClass);
			f.on("input propertychange", function() {
				if (f.val() !== "") {
					e.hide()
				} else {
					e.show()
				}
			})
		})
	}
})(jQuery);