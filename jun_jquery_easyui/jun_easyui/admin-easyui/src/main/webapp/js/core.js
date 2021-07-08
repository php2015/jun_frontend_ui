/**
 * 定义命名空间
 * @param path 命名空间
 * @auther chensi
 * @version 2015-5-26 上午11:26:03
 */
/** 定义core基本类：和组件解耦，纯函数方法 */
var C = {};

function namespace(path) {
	var arr = path.split(".");
	var ns = "";
	for ( var i = 0; i < arr.length; i++) {
		if (i > 0)
			ns += ".";
		ns += arr[i];
		eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
	}
}

/**
 * 输出日志函数
 * @param msg
 */
function log(msg) {
	console.log(msg);
	// log(/function\s+(\w+)/.exec(arguments.callee)[1]);//打印function xx()格式的方法名
}

/**
 * 输出调用方法名日志
 * @param msg
 */
function logf(msg) {
	var tmp = "调用js函数：";
	console.log(tmp + msg);
}

/**
 * 是否为空
 * @auther chensi
 * @version 2015-5-26 上午11:26:03
 */
C.isEmpty = function(obj) {
	return obj === undefined || obj === null || obj === '';
}

/**
 * 模板实现
 * @param html 模板字符串 data 嵌入模板的数据 blankParam 须留空的参数
 * @auther chensi
 * @version 2015-5-26 上午11:26:03
 */
C.template = function(html, data, blankParam) {
	var reg = /\{\{(\w+[\w.]+)\}\}/;
	while (reg.test(html)) {
		var keyWord = RegExp.$1;// RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个子匹配(以括号为标志)字符串，
		var source = "{{" + keyWord + "}}";
		var item;
		if (blankParam != undefined && blankParam == keyWord) {
			item = '';
		} else {
			try {
				item = eval("data." + keyWord);
				item = C.isEmpty(item) ? '' : item;
			} catch (e) {
				item = '';
			}
		}
		html = html.replace(source, item);
	}
	return html;
}

/**
 * 裁剪字符串
 * @param str 待裁剪字符串
 * @param width 裁剪后的长度, 一个中文占两位
 * @return 裁剪后的字符串
 * @auther chensi
 */
C.cutStr = function(str, width) {
	if (!str) {
		return null;
	}
	if (!width || width == 0) {
		return "";
	}
	var realLen = 0;
	var result = "";
	for ( var i = 0; i < width; i++) {
		if (str.charCodeAt(i) > 127) {
			realLen += 2;
		} else {
			realLen++;
		}
		if (realLen > width || i >= str.length) {
			break;
		}
		result += str.charAt(i);
	}
	return result;
}

/**
 * 字符串超出部分用..代替
 * @param str 待填充字符串
 * @param width 填充后的长度, 一个中文占两位
 * @return 裁剪后的字符串
 * @auther chensi
 */
C.fillStr = function(str, width) {
	if (!str) {
		return null;
	}
	if (!width || width == 0) {
		return "";
	}
	if (width < 2) {
		return "..";
	}
	var result = C.cutStr(str, width);
	if (result.length < str.length) {
		result = C.cutStr(result, width - 2) + "..";
	}
	return result;
}

/**
 * 扩展JS数组功能, 是否包含
 * @auther chensi
 * @version 2015-5-26 上午11:26:03
 */
Array.prototype.contains = function(item) {
	for (i = 0; i < this.length; i++) {
		if (this[i] == item) {
			return true;
		}
	}
	return false;
};

/**
 * 扩展JS字符串功能, 字符串是否为空
 * @auther chensi
 * @version 2015-5-26 上午11:26:03
 */
String.prototype.isEmpty = function() {
	return C.isEmpty(this);
};

/**
 * 扩展JS字符串功能, 去除空格
 * @returns
 * @auther chensi
 * @version 2015-6-27 下午4:35:22
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 扩展JS字符串功能, 去除左边空格
 * @returns
 * @auther chensi
 * @version 2015-6-27 下午4:35:38
 */
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
};

/**
 * 扩展JS字符串功能, 去除右边空格
 * @returns
 * @auther chensi
 * @version 2015-6-27 下午4:35:41
 */
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
};

/**
 * 扩展jquery的checkbox DOM, 增加修改值时触发change事件
 * @auther chensi
 */
$.fn.setCheckboxVal = function(flag) {
	var $this = $(this);
	flag = flag === true ? true : false;
	$.each($this, function(key, val) {
		var $ele = $(val);
		if (!$ele.is(":checkbox")) { // 不处理非checkbox的情况
			return true;
		}
		var defaultChecked = $ele.is(":checked");
		if (flag !== defaultChecked) {
			$ele[0].checked = flag;
			$ele.trigger("change");
		}
	});
};

/**
 * 序列化表单name=admin&sex=nan ==> {"name":"admin","sex":"nan"}输出对象为json对象
 * @auther chensi
 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/**
 * 获取ztree所有checked的节点，返回id数组
 */
C.getzTreeAllChecked = function(ztree) {
	var arr = [];
	var nodes = ztree.transformToArray(ztree.getNodes());
	for ( var i = 0; i < nodes.length; i++) {
		if (nodes[i].checked == true) {
			arr.push(nodes[i].id);
		}
	}
	return arr;
}

/**
 * Cookie操作 - 设置值
 * 
 * @auther chensi
 */
C.setCookie = function(name, value, expire) {
	var exp = new Date();
	exp.setTime(exp.getTime() + expire * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

/**
 * Cookie操作 - 获取值
 * 
 * @auther chensi
 */
C.getCookie = function(key) {
	var cookies = document.cookie ? document.cookie.split('; ') : [];
	for ( var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split('=');
		var name = parts.shift();
		var cookie = parts.join('=');
		if (key && key === name) {
			return cookie;
		}
	}
};
