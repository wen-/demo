var result = "";

var uploader = WebUploader.create({
	// 选完文件后，是否自动上传。
	auto: true,
	// 文件接收服务端。
	server: 'http://192.168.1.161:3000/upload/blog',
	// 选择文件的按钮。可选。
	pick: {
		id:"#fileToUpload",
		multiple : false
	},
	fileVal:"upfile",
	compress:false,
	// 只允许选择图片文件。
	accept: {
		title: 'Images',
		extensions: 'gif,jpg,jpeg,bmp,png',
		mimeTypes: 'image/*'
	},
	fileSingleSizeLimit :2*1024*1024  //2M
});
// 当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
	$("#fileToUpload").addClass("webuploader-element-invisible");
	$(".upload-btn span").text("上传中...");
});
// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
	var $percent = $(".upload-photo").find('.progress span');
	// 避免重复创建
	if ( !$percent.length ) {
		$percent = $('<span class="progress"><span></span></span>')
			.appendTo($(".upload-photo") )
			.find('span');
	}
	$percent.css( 'width', percentage * 100 + '%' );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
uploader.on( 'uploadSuccess', function( file ,response) {
	$(".upload-btn span").text("上传成功");
	window.setTimeout(function(){
		$(".upload-btn span").text("修改头像");
		$("#fileToUpload").removeClass("webuploader-element-invisible");
	},1000);
	$("#userPicShow").attr("src",response.url);
	$("#pictureUrl").val(response.url);
	//返回的参数response这里操作
});

// 文件上传失败，显示上传出错。
uploader.on( 'uploadError', function( file ) {
	$(".upload-btn span").text("上传失败");
	window.setTimeout(function(){
		$(".upload-btn span").text("修改头像");
		$("#fileToUpload").removeClass("webuploader-element-invisible");
	},1000);
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {
	$('.progress').remove();
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadFinished', function( file ) {
	$('.progress').remove();
	uploader.reset();
});

uploader.on( 'error', function( err ) {
	layer.msg('出错了！请选择不超过 '+ uploader.options.fileSingleSizeLimit/1024/1024 +'M 大小的图片文件');
	$(".upload-btn span").text("修改头像");
	$("#fileToUpload").removeClass("webuploader-element-invisible");
});
$("#eyes2").on("click", function() {
	var c = $(this).siblings(".keyword-text");
	var d = $.trim(c.val());
	c.remove();
	if (!$(this).hasClass("open")) {
		$(this).addClass("open").before('<input class="keyword-text" type="text" value="' + d + '" />')
	} else {
		$(this).removeClass("open").before('<input id="newPWD" class="keyword-text" type="password" value="' + d + '" />')
	}
});

$("body").on("click", ".msg-setting-ctrl", function() {
	if ($(this).hasClass("on")) {
		$(this).removeClass("on");
		$(this).attr("value", "0");
		UserOperation.updateTipsByPhone()
	} else {
		$(this).addClass("on");
		$(this).attr("value", "1");
		UserOperation.updateTipsByPhone()
	}
});
var UserOperation = {
	updateUserInfo: function() {
		var e = $("#name").val();
		var f = $("#pictureUrl").val();
		var d = $("#email").val();
		var g = $("#city").html();
		var c = base_url + "/uo/updateUserInfo";
		if (e == null || e.length == 0) {
			layer.tips("请输入用户名", "#name");
			return false
		}
		if (!UserOperation.checkEmail()) {
			return false
		}
		$.ajax({
			type: "POST",
			url: c,
			async: true,
			data: {
				name: e,
				pictureUrl: f,
				email: d,
				city: g
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if(res.tatus == 200){
					window.location.reload();
				}else{
					layer.msg(res.msg);
				}
			},
			error: function() {
				layer.msg("网络异常，请稍后重试");
				window.location.reload();
			}
		})
	},
	updatePwdDo: function() {
		var d = $("#newPWD").val();
		var b = $("#oldPWD").val();
		var c = base_url + "/uo/updatePwdDo";
		if (b == null || b.length == 0) {
			layer.tips("请输入旧密码", "#oldPWD");
			return false
		}
		if (d == null || d.length == 0) {
			layer.tips("请输入新密码", "#newPWD");
			return false
		}
		$.ajax({
			type: "POST",
			url: c,
			async: true,
			data: {
				newPWD: d,
				oldPWD: b
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if(res.status == 200){
					layer.msg("修改成功！");
					window.setTimeout(function(){
						window.location.reload();
					},1000);
				}else{
					layer.msg(res.msg);
				}
			},
			error: function() {
				layer.msg("网络异常，请稍后重试");
				window.setTimeout(function(){
					window.location.reload();
				},1000);
			}
		})
	},
	getVCode: function() {
		$("#codeImg").attr("src", base_url + "/checkCode/getValidateCode?r=" + Math.random());
		$("#showVCode").attr("class", "confirm-tips confirm-tips-mbvcode")
	},
	checkEmail: function() {
		var a = $("#email").val();
		var b = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if (a == null || a == "" || !b.test(a)) {
			layer.tips("请输入正确的邮箱", "#email");
			return false
		}
		if (a != null && a != "" && a.length > 30) {
			layer.tips("邮箱长度控制在30个字符以内", "#email");
			return false
		}
		return true
	},
	updateTipsByPhone: function() {
		var c = $("#SALE_PRICE").attr("value");
		var g = $("#NEWHOUSE_PRICE").attr("value");
		var d = $("#NEWHOUSE_INFO").attr("value");
		var b = $("#NEWHOUSE_PREFERENTIAL").attr("value");
		var a = base_url + "/uo/remindMsgDo";
		$.ajax({
			type: "POST",
			url: a,
			async: true,
			data: {
				SALE_PRICE: c,
				NEWHOUSE_PRICE: g,
				NEWHOUSE_INFO: d,
				NEWHOUSE_PREFERENTIAL: b
			},
			cache: false,
			dataType: "json",
			success: function(res) {
				if (res.tatus == 200) {
					layer.msg("操作成功！")
				} else {
					layer.msg(res.msg);
					window.setTimeout(function(){
						window.location.reload();
					},1500)
				}
			},
			error: function() {
				layer.msg("网络异常，请稍后重试");
				window.setTimeout(function(){
					window.location.reload();
				},1000);
			}
		})
	}
};
