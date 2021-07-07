/**========================================*/
/**
 * 全局变量配置<br>
 */
/** js工具类定义对象 */
var U = {};
/** 项目路径 eg：/admin-hui */
var app_path = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);
/** js版本，防止旧版本缓存js */
var version = new Date().getTime();
var msg_offline = "网络异常，请检查网络是否通畅";
var msg_noSession = "会话已超时，请重新登录";
var msg_notFound = "加载网页失败";
/** 引入常用JS和CSS，加参数的表示不需要缓存的js */
document.write("<script language='javascript' src='" + app_path + "/js/config.js'></script>");
document.write("<script language='javascript' src='" + app_path + "/js/jquery-1.8.0.min.js'></script>");
document.write("<script language='javascript' src='" + app_path + "/js/core.js?" + version + "'></script>");
document.write("<script language='javascript' src='" + app_path + "/js/jquery.timer.js'></script>");
/**
 * Ajax请求封装
 * 
 * @param url
 *            请求连接，从项目路径后开始
 * @param data
 *            参数
 * @param callback
 *            回调函数
 * @param async
 *            是否异步，默认true为异步
 * @param isShowNotice
 *            是否显示弹框，用来处理notice警告时交给自动处理（弹框）还是手动处理
 * @auther chensi
 * @version 2015-5-26 上午11:23:37
 */
function ajaxCall(url, data, callback, async, isShowNotice) {
	$.ajax({
		async : async == false ? false : true,
		url : app_path + '/' + url,
		data : data,
		type : "POST",
		dataType : "json",
		success : function(_resp) {
			if (C.isEmpty(_resp)) {
				U.showExceptionDialog();
				U.closeAll();
				return;
			}
			if (U.checkExceptionAndPermission(_resp, isShowNotice)) {
				if (callback) {
					callback(_resp);
				}
			} else {
				U.closeAll();
			}
		},
		error : function(_xhr, _errormsg, _e) {
			if (_xhr.status === 0 || _xhr.status === 503) {
				console.log(_xhr.status);
				U.alert(msg_offline);
			} else if (_xhr.status === 401) {
				U.confirm(msg_noSession, function() {
					window.location = app_path + '/login.html';
				});
			} else {
				U.showExceptionDialog();
			}
			U.closeAll();
		}
	});
}

/**
 * 根据请求地址获取HTML信息
 * 
 * @param url
 * @param data
 * @param callback
 * @param async
 * @auther chensi
 */
U.loadHtml = function(url, data, callback, async) {
	$.ajax({
		async : async == false ? false : true,
		url : app_path + '/' + url,
		data : data,
		type : "POST",
		dataType : "text",
		success : function(data, flag, xhr) {
			var response = xhr.responseText;
			// 如果load的页面是登录页面，直接返回到登录页面
			if (xhr.responseText.indexOf('<html pageIdentity="login">') != -1) {
				window.location = app_path + '/login.html';
				return;
			}
			if (callback) {
				callback(data);
			}
		},
		error : function(xhr, _errormsg, _e) {
			if (xhr.status === 0 || xhr.status === 503) {
				U.alert(msg_offline);
			} else if (_xhr.status === 401) {
				U.confirm(msg_noSession, function() {
					window.location = app_path + '/login.html';
				});
			} else if (xhr.status == 404) {
				U.alert(msg_notFound);
			} else {
				U.showExceptionDialog();
			}
			U.closeAll();
		}
	});
}

/**
 * 检查请求是否出现异常或权限问题
 * 
 * @param _resp
 *            返回数据
 * @param isShowNotice
 *            是否直接弹出提示(设置为false时, 不弹出提示)
 * @auther chensi
 * @version 2015-6-25 下午11:22:45
 */
U.checkExceptionAndPermission = function(_resp, isShowNotice) {
	if (_resp.status == '000001') { // 请求出错
		U.alert(_resp.message);
		return false;
	}
	if (_resp.status == '000002') { // 警告提示，并允许回调
		// 是否弹出提示框
		if (isShowNotice) {
			U.alert(_resp.message);
		}
		return true;
	}
	if (_resp.status == '000003') { // 无权限
		// U.confirm("您暂无权限,请重新登录", function() {
		// window.location = app_path + '/login.html';
		// });
		return false;
	}
	if (_resp.status == '000004') { // 重定向
		window.location = app_path + _resp.data;
		return false;
	}
	return true;
}

/**
 * 显示出错提示
 * 
 * @auther chensi
 * @version 2015-6-26 上午8:42:19
 */
U.showExceptionDialog = function(_resp) {
	var errMsg = "系统繁忙，请稍后再试";
	if (!C.isEmpty(_resp) && !C.isEmpty(_resp.message)) {
		errMsg += "<br>错误信息: " + _resp.message;
	}
	U.alert(errMsg);
}

/**
 * 加载层
 * 
 * @auther chensi
 * @version 2015-6-1 下午4:48:17
 */
U.loading = function() {
	$.messager.progress({
		title : '温馨提示',
		msg : '数据处理中,请稍后......'
	});
}

/**
 * 关闭所有层
 */
U.closeAll = function() {
	parent.$.messager.progress('close');
}

/**
 * 消息通知（自动消失）
 */
U.notice = function(message) {
	$.messager.show({
		title : '温馨提示',
		msg : message,
		timeout : 3000,
		showType : 'slide'
	});
}

/**
 * 提示框
 * 
 * @param 需提示的文本
 * @auther chensi
 */
U.alert = function(message, callback) {
	$.messager.alert("温馨提示", "<div style='padding:10px;'>" + message + "</div>", 'info', function() {
		if (callback) {
			callback();
		}
	});
}

/**
 * 显示确认提示框
 * 
 * @param message
 *            提示消息
 * @param callback
 *            点击确认后回调
 * @auther chensi
 * @version 2015-6-1 下午4:48:06
 */
U.confirm = function(message, callback) {
	$.messager.confirm("温馨提示", message, function() {
		if (callback) {
			callback();
		}
	});
};


/**
 * 弹出窗口封装（内容为url连接）
 * 
 * @param title
 *            标题
 * @param url
 *            请求的url
 * @param w
 *            弹出层宽度，无单位
 * @param h
 *            弹出层高度，无单位
 * @param $grid
 *            数据表格dom
 * @param row
 *            选中行
 * @auther chensi
 */
U.showHtmlDialog = function(title, url, $grid, row, w, h) {
	w = w || 600;
	h = h || 400;
	parent.$.modalDialog({
		title : title,
		width : w,
		height : h,
		href : url,
		onLoad : function() {
			if (row) {
				parent.$.modalDialog.handler.find("#form").form("load", row);
			}
		},
		buttons : [ {
			text : '保存',
			iconCls : 'icon-ok',
			handler : function() {
				parent.$.modalDialog.openner = $grid;
				parent.$.modalDialog.handler.find("#form").submit();
			}
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				parent.$.modalDialog.handler.dialog('destroy');
				parent.$.modalDialog.handler = undefined;
			}
		} ]
	});
}

/**
 * 创建并初始化下拉框
 * 
 * @param options
 *            配置信息
 * @auther chensi
 */
U.initSelect = function(options) {
	options.idField = options.idField || "id";
	options.nameField = options.nameField || "name";
	options.appendData = options.appendData === false ? false : true;
	options.data = options.data || {};
	ajaxCall(options.url, options.data, function(_resp) {
		var data = _resp.data;
		var html = "<option value=''>请选择</option>";
		if (options.appendData) {
			$.each(data, function(key, val) {
				var id = eval("val." + options.idField);
				var name = eval("val." + options.nameField);
				html += "<option value='" + id + "'>" + name + "</option>";
			});
			options.$dom.html(html);
		}
		if (options.callback) {
			options.callback(data);
		}
	});
}

/**
 * 省市区三级联动
 * 
 * @param $province
 *            省的dom
 * @param $city
 *            城市dom
 * @param $area
 *            区县dom
 * @param provinceDefault
 *            省份回显值
 * @param cityDefault
 *            城市回显值
 * @param areaDefault
 *            区县回显值
 * @auther chensi
 */
U.loadPCA = function($province, $city, $area, provinceDefault, cityDefault, areaDefault) {
	var cityJson;
	$.ajaxSettings.async = false;
	$.getJSON(app_path + "/js/city.json", function(data) {
		cityJson = data;
	});
	$province.on("change", function() {
		U.loadCity(cityJson, $province, $city, cityDefault || '');
	});
	$city.on("change", function() {
		U.loadArea(cityJson, $province, $city, $area, areaDefault || '');
	});
	// 首次触发change必须放在事件函数下面，否则触发了change事件时，事件函数还未加载，导致触发无效。
	U.loadProvince(cityJson, $province, provinceDefault || '');
}
/**
 * 加载省份（U.loadProvince U.loadCity U.loadArea结合使用）
 * 
 * @auther chensi
 */
U.loadProvince = function(cityJson, $province, provinceDefault) {
	var temp_html = "<option value=''>请选择</option>";
	$.each(cityJson, function(i, province) {
		temp_html += "<option value='" + province.name + "'>" + province.name + "</option>";
	});
	$province.html(temp_html);
	if (provinceDefault != '') {
		$province.val(provinceDefault);
	}
	$province.trigger("change");
}

/**
 * 加载城市（U.loadProvince U.loadCity U.loadArea结合使用）
 * 
 * @auther chensi
 */
U.loadCity = function(cityJson, $province, $city, cityDefault) {
	var province = $province.val();
	if (province == "") {
		$city.html("<option value=''>请选择</option>");
		$area.html("<option value=''>请选择</option>");
		return;
	}
	var index = $province.find(":selected").index() - 1;
	var temp_html = "";
	$.each(cityJson[index].city, function(i, city) {
		temp_html += "<option value='" + city.name + "'>" + city.name + "</option>";
	});
	$city.html(temp_html);
	if (cityDefault != '') {
		$city.val(cityDefault);
	}
	$city.trigger("change");
}

/**
 * 加载区县（U.loadProvince U.loadCity U.loadArea结合使用）
 * 
 * @auther chensi
 */
U.loadArea = function(cityJson, $province, $city, $area, areaDefault) {
	var city = $city.val();
	if (city == "") {
		$area.html("<option value=''>请选择</option>");
		return;
	}
	var indexProvince = $province.find(":selected").index() - 1;// 由于第一项为“请选择”，province的坐标从1开始
	var indexCity = $city.find(":selected").index();
	var temp_html = "";
	$.each(cityJson[indexProvince].city[indexCity].area, function(i, area) {
		temp_html += "<option value='" + area + "'>" + area + "</option>";
	});
	$area.html(temp_html);
	if (areaDefault != '') {
		$area.val(areaDefault);
	}
}

