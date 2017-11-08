/* 
 * JS Document for appUpdate
 * wen for xxx
 * copyright wen
 * email:yellowwen@126.com
 * Date: 2014-03-28
 *
 *需要用到的插件
 *org.apache.cordova.dialogs
 *org.apache.cordova.file
 *org.apache.cordova.file-transfer
 *org.apache.cordova.network-information
 *org.common.plugins.checkandinstall
 *调用方法：
 *$.wen_plug_appupdate({
 *		autoUpdate:true,									//是否开启自动更新：true\false
 *		elemUpdate:"#checkAndUpdate",						//更新触发标签:#id\.class\标签名
 *		updateUrl:"http://192.168.1.144:3000/updateapp"		//更新服务器的地址
 *	});
 *
 *
*/
(function($){
	var serApkverCode,
		serApkverName,
		serApkName,
		serApkName1,
		serApkPath;
	
	$.wen_plug_appupdate = function(opt) {
		//替换初始值
		var opt = $.extend({},$.wen_plug_appupdate.defaultVal,opt);
		
		if(!opt.updateUrl || (!opt.autoUpdate && !opt.elemUpdate)){
			return false;
		}
		var popbox = '\
			<div class="popup_box_bg" id="popup_msg" style="display:none;background-color: rgba(0, 0, 0, 0.3);-webkit-border-radius: 7px 7px 7px 7px;border-radius: 7px 7px 7px 7px;height: 200px;left: 50%;margin-left: -40%;margin-top: -100px;position: absolute;top: 50%;width: 80%;padding:10px;">\
				<div class="popup_box" style="background-color:#fff;height:100%;">\
					<div class="popup_box_t" style="padding:10px;border-bottom:dotted 1px #ccc;position:relative;">\
						<h2 style="margin:0;">提示</h2>\
						<span class="close_popup" style="position:absolute;top:5px;right:5px;width:40px;height:30px;text-align:center;	line-height:30px;color:#fff;background-color:#ccc;-webkit-border-radius:15px;border-radius:15px;-webkit-text-shadow:1px 1px 0 #999;text-shadow:1px 1px 0 #999;">关闭</span>\
					</div>\
					<div class="popup_box_m" style="padding:10px;height:90px;">\
					<p>说点什么吧！</p>\
					</div>\
					<div class="popup_box_b" style="border-top:dotted 1px #ccc;padding:10px;text-align:center;">\
						<span class="btn_b close_btn" style="background-color:#06F;padding:5px 15px;color:#fff;margin:0 5px;display:inline-block;">关闭</span>\
					</div>\
				</div>\
			</div>';
		$("body").append(popbox);
		
		$(".close_popup,.close_btn").click(function(){
			$("#popup_msg").hide();
		});
		if(!!opt.autoUpdate){
            serverAPPver(opt.updateUrl);
		}
		if(!!opt.elemUpdate){
			$(document).on("click",opt.elemUpdate,function(){
				$("#popup_msg").show();
				$("#popup_msg .popup_box_m p").text("正在获取新版本信息……");
                serverAPPver(opt.updateUrl);
				return false;
			})
		}
		//网络检测
		function checkConnection() { 
			var networkState = navigator.connection.type;
		
			var states = {};
			states[Connection.UNKNOWN]  = '未知网络';//Unknown connection
			states[Connection.ETHERNET] = '以太网络';//Ethernet connection
			states[Connection.WIFI]     = 'WiFi无线网络';//WiFi connection
			states[Connection.CELL_2G]  = '2G网络';//Cell 2G connection
			states[Connection.CELL_3G]  = '3G网络';//Cell 3G connection
			states[Connection.CELL_4G]  = '4G网络';//Cell 4G connection
			states[Connection.CELL]     = '通常网络';//Cell generic connection
			states[Connection.NONE]     = '无网络';//No network connection
			
			//alert('当前网络类型: ' + states[networkState]);
			return networkState;
		}
		function serverAPPver(url){
            var currentCode = 0;
            if(checkConnection() != Connection.NONE){
                window.plugins.checkandinstall.currentVerCode(function(v){currentCode = v;});
            }else{
                $("#popup_msg .popup_box_m p").text("获取版本信息失败。请检查网络后重试！");
                return;
            }
			if(url.indexOf("?") > -1){
				url = url+"&"+(+new Date());//"&"+(+new Date())防止从缓存取数据
			}else{
				url = url+"?"+(+new Date());//"?"+(+new Date())防止从缓存取数据
			}
			$.ajax({
                url:url,
                success: function(json){
                    serApkverCode = json[0].verCode;
                    serApkverName = json[0].verName;
                    serApkPath = json[0].apkPath;
                    serApkName1 = json[0].apkPath.substring((json[0].apkPath.lastIndexOf("/")+1));
                    serApkName = json[0].apkPath.substring(json[0].apkPath.lastIndexOf("/"));
                    if(serApkverCode > currentCode){
                        $("#popup_msg").show();
                        $("#popup_msg .popup_box_m p").text("发现新版本!是否更新？");
                        $(".popup_box_b").html('<span class="btn_b update_y" style="background-color:#06F;padding:5px 15px;color:#fff;margin:0 5px;display:inline-block;">更新</span><span class="btn_b update_n" style="background-color:#06F;padding:5px 15px;color:#fff;margin:0 5px;display:inline-block;">取消</span>');
                        $(".update_y").on("click",function(){
                            //alert(Connection.NONE+'-----'+Connection.WIFI);

                            if(checkConnection() != Connection.WIFI){
                                navigator.notification.confirm(
                                    '当前非WIFI网络，更新会耗费流量，是否继续？', // message
                                    onConfirm,            // callback to invoke with index of button pressed
                                    '是否更新',           // title
                                    '继续,取消'         // buttonLabels
                                );
                                function onConfirm(buttonIndex){
                                    if(buttonIndex==1){
                                        updateVersion();
                                    }else{
                                        return false;
                                    }
                                }
                            }else{
                                updateVersion();
                            }

                        });
                        $(".update_n").on("click",function(){
                            $("#popup_msg").hide();
                            return false;
                        })
                    }else{
                        $("#popup_msg .popup_box_m p").text("当前已是最新版本，无需更新！");
                    }
                },
                error:function(err){
                    $("#popup_msg .popup_box_m p").text("服务器繁忙，请稍后再试！");
                }
            });
		}
		
		function reqRoot() { 
			var dtd = $.Deferred(); 
			window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, function(fileSystem) { 
				//alert(fileSystem.root.fullPath); fileSystem.root.toURL()
				dtd.resolve(fileSystem.root); 
			}, function(evt) { 
					console.log('reqRoot:' +evt.target.error.code); 
					alert('reqRoot:' +evt.target.error.code); 
					dtd.reject(); 
			}); 
			return dtd.promise(); 
		}
		
		function mkDir( entrydir, dir ) { 
			var dtd = $.Deferred(); 
			entrydir.getDirectory( dir, {create:true,exclusive:false}, function(currentdir) { 
				//alert(currentdir); 
				dtd.resolve(currentdir); 
			}, function(evt) { 
				console.log( 'mkDir('+ dir+ '):' + evt.target.error.code); 
				dtd.reject(); 
			}); 
			return dtd.promise(); 
		}
		
		function createFile( entrydir, fname ) { 
			var dtd = $.Deferred(); 
			entrydir.getFile( fname, {create:true,exclusive:false}, function(parent) { 
				//alert(parent+"----" +fname); 
				dtd.resolve(parent, fname); 
			}, function(evt) { 
				console.log( 'createFile('+ fname+ '):' + evt.target.error.code); 
				dtd.reject(); 
			});
			return dtd.promise(); 
		}
		
		function updateVersion() { 
			$("#popup_msg .popup_box_m p").text("下载目录构建中……");
			$(".update_y").remove();
			$.when(reqRoot()).done( function(entrydir){ 
				$.when(mkDir(entrydir, "Download")).done( function (entrydir2) { 
					$.when(mkDir(entrydir2, "update")).done( function (entrydir3) { 
						downloadApp(entrydir3);
						//$.when(createFile(entrydir3, "app2-debug.apk" )).done( downloadApp ); //下载文件 
					}); 
				}); 
			}).always( function () { 
				//setTimeout("$.mobile.loading('hide')",3000); 
			}); 
		}
		var reu = 0;
		function downloadApp(parent) { 
			reu++;
			
			//alert("parent属性: "+parent.toURL()+serApkName);
			$("#popup_msg .popup_box_m p").text("正在下载……");
			var fileTransfer = new FileTransfer(); 
			var uri = encodeURI(serApkPath);
		
			fileTransfer.onprogress = function(progressEvent) {
				
				$("#abb").text(progressEvent.loaded);
				$("#abc").text(progressEvent.total);
				if (progressEvent.lengthComputable) {
					//3.4之前版本存在BUG,进度会是200%。问题在FileTransfer.java这个计算错误
					//var loaded = device.platform == "Android" ? (progressEvent.loaded / 2) : progressEvent.loaded;
					var loaded = progressEvent.loaded;
					var percentLoaded = Math.round(100 * (loaded / progressEvent.total));
					$("#popup_msg .popup_box_m p").html("已下载……"+ percentLoaded +'% \n<br /> load:'+ loaded + "/" + progressEvent.total);
					if( progressEvent.loaded == progressEvent.total ) {
						$("#popup_msg .popup_box_m p").text("下载成功！正在准备更新……");
					}
				} else {  
					$("#popup_msg .popup_box_m p").text('正在下载... \n load:'+ progressEvent.loaded);
				}
			};
		
			fileTransfer.download( uri, (parent.toURL()+serApkName),function(entry){
				//调用自动安装的插件   
				//alert("下载到： "+entry.toURL()+"------"+entry.fullPath);
				$("#popup_msg").hide();
				window.plugins.checkandinstall.openFile(null,null,entry.fullPath); //use the plugin
				//window.localStorage.setItem('version',version.v_online);
			},function(error) {
				//console.log("download error source " + error.source);
				//console.log("download error target " + error.target);
				//console.log("upload error code" + error.code);
				$("#popup_msg .popup_box_m p").text("下载失败，请联网重试！"+reu+"次");
				$(".popup_box_b").prepend('<span class="btn_b update_reset" style="background-color:#06F;padding:5px 15px;color:#fff;margin:0 5px;display:inline-block;">重试</span>');
				$(".update_reset").click(function(){
					downloadApp(parent);
					$(this).remove();
				})
				
			});
		}
	};
	
	//初始值
	$.wen_plug_appupdate.defaultVal = {
		autoUpdate:true,									//是否开启自动更新：true\false
		elemUpdate:"",										//更新触发标签:#id\.class\标签名
		updateUrl:""										//更新服务器的地址
	};
	
})(jQuery);