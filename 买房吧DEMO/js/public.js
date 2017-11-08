/* 
 * JS Document for 安信
 * developer wen
 * Date: 2016-xx-xx
 * 公用方法
 * IP地址判断
 * 最小长度校验
 * 最大长度校验
 * 获取字符串长度
 * 数字校验
 * 11位手机校验
 * 邮箱校验
 * 格式化浮点数
 * 全角转半角
 * 获取URL参数
 */
;!function(){
	var mf8 = {};
	//IP地址判断
	mf8.isIP = function(s){
		var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
		return re.test(s); 
	};
	//最小长度校验
	mf8.minLength = function(value, length, isByte) {
        var strLength = $.trim(value).length;
        if (isByte) strLength = $.getStringLength(value);
        return strLength >= length
    };
	//最大长度校验
	mf8.maxLength = function(value, length, isByte) {
        var strLength = $.trim(value).length;
        if (isByte) strLength = $.getStringLength(value);
        return strLength <= length
    };
	//获取字符串长度
    mf8.getStringLength = function(str, mode) {
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
    mf8.checkNumber = function(value) {
        if ($.trim(value) != ''){
            return !isNaN($.trim(value));
        }else{
            return true;
        }
    };
	//11位手机校验
	mf8.checkMobile = function(s){
		if(isNaN(s)){return false;} 
		var re = /^1[345678]\d{9}$/i;
		return re.test(s);
	};
    //座机号校验
    mf8.checkPhone = function(s){
        var re = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/i;
        return re.test(s);
    };
    //邮箱校验
	mf8.checkEmail = function(val) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return reg.test(val)
    };
	//格式化浮点数
    mf8.formatMoney = function(price, len) {
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
    };
	//请求数据
	mf8.ajax = function(serviceUrl,params,scallback,ecallback,method) {
		//判断是否IE 
		if(/msie/.test(navigator.userAgent.toLowerCase())){
			serviceUrl = encodeURI(serviceUrl);
		}
        $.ajax({
            type: method?method:'POST',
            url: serviceUrl,
            data: params,
            dataType: 'json',
            //async: false,
            //cache: false,
            success: function(response) {
            	typeof scallback == "function"?scallback(response):'';   
            },
			error: function (e) {
				typeof ecallback == "function"?ecallback(e):'';
			}
        });
    };
	//显示模版数据
	mf8.show_Template = function(uTemplate,obj){
        var txt = $(uTemplate).html();
        $.each(obj,function(i,n){
			var reg = new RegExp('\\{%'+i+'%\\}','g');
			txt = txt.replace(reg,n);
        });
        return txt;
	};
	//获取可编辑div光标位置
	mf8.get_po_div = function(obj){
		if (window.getSelection) {
			return window.getSelection().anchorOffset;
		}else if(document.selection){
			var l = 0;
			var range = document.selection.createRange();
            var srcele = range.parentElement();//获取到当前元素
         	var copy = document.body.createTextRange();
            copy.moveToElementText(srcele);
            for (; copy.compareEndPoints("StartToStart", range) < 0; l++) {
                copy.moveStart("character", 1);//改变光标位置，实际上我们是在记录cursor的数量.
            }
			return l;
		}else{
			return 0;
		}
	};
	//获取input光标位置
	mf8.get_po_input = function(obj){
		if (window.getSelection) {
			return obj.selectionStart;
		}else if(document.selection){
			var l = 0;
			var range = document.selection.createRange();
			range.moveStart("character",-obj.value.length);
            return range.text.length;
		}
	};
	//input光标定位（无pos参数定位到最后）
	mf8.po_input = function(obj,pos) {
		obj.focus();//解决ff不获取焦点无法定位问题
		if (window.getSelection) {//ie11 10 9 ff safari
			if(!!pos){
				obj.setSelectionRange(pos-1, pos-1);
			}else{
				var max_Len=obj.value.length;//text字符数
				obj.setSelectionRange(max_Len, max_Len);
			}
		}else if (document.selection) {//ie10 9 8 7 6 5
			var range = obj.createTextRange();//创建range
			if(!!pos){
				range.moveStart("character",pos-1);
				range.collapse(true);
			}else{
				range.collapse(false);//光标移至最后
			}
			range.select();//避免产生空格
		}
	};
	//可编辑DIV光标定位（无pos参数定位到最后）	
	mf8.po_div = function(obj,pos) {
		if (window.getSelection) {//ie11 10 9 ff safari
			obj.focus(); //解决ff不获取焦点无法定位问题
			var range = window.getSelection();//创建range
			range.selectAllChildren(obj);//range 选择obj下所有子内容
			!!pos?range.collapse(range.anchorNode.nodeType==3?range.anchorNode:range.anchorNode.firstChild,pos-1):range.collapseToEnd();//光标移至最后
		}else if (document.selection) {//ie8 7 6 
			var range = document.selection.createRange();//创建选择对象
			range.moveToElementText(obj);//range定位到obj
			if(!!pos){
				range.moveStart("character",pos-1);
				range.collapse(true);
			}else{
				range.collapse(false);//光标移至最后
			}
			range.select();
		}
	};
	//全角转半角
	mf8.ToCDB = function(str){
		var tmp = "";
		for(var i=0;i<str.length;i++){
			if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375){
				tmp += String.fromCharCode(str.charCodeAt(i)-65248);
			}else{
				tmp += String.fromCharCode(str.charCodeAt(i));
			}
		}
		return tmp;
	};
	//获取URL参数
	mf8.getUrlArguments = function(){
		var URLParams = {} ;
		var aParams = decodeURIComponent(document.location.search.substr(1));
		if(aParams.indexOf("&") > -1){
			aParams = aParams.split('&');
			for (i=0 ; i < aParams.length ; i++) {
				var aParam = aParams[i].split('=') ;
				URLParams[aParam[0]] = aParam[1] ;
			}
		}else{
			var aParam = aParams.split('=') ;
			URLParams[aParam[0]] = aParam[1] ;
		}
		return URLParams;
	};
	//可在此处增加新方法（保留注释请写在此注释上面）
	
	
	//requirejs模块化定义
	"function" == typeof define ? define(["jquery"], function(jquery){
		return mf8;
	}):function(){
		window.mf8 = mf8;
	}()
}();