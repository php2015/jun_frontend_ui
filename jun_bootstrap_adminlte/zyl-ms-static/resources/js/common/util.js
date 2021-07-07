/**
 * 是否float
 */
function isFloat(inputData) {
	if(parseFloat(inputData).toString() == "NaN")
		return false;　　
	else
		return true;　　
}
/**
 * 是否周末
 */
function isWeekend(_date) {
	if(_date.getDay() == 6 || _date.getDay() == 0)
		return true;
	return false;
}
/**
 * 是否午夜房区间
 */
function isMidnight(_date, _midnight_end_hour) {
	var _temp_end = _date.Format("yyyy-MM-dd") + " " + _midnight_end_hour + ":00";
	var _temp_start = _date.Format("yyyy-MM-dd") + " 00:00:00";

	console.log(_temp_end);
	console.log(_temp_start);
	var _midnight_end_time = new Date(Date.parse(_temp_end.replace(/-/g, "/")));
	var _midnight_start_time = new Date(Date.parse(_temp_start.replace(/-/g, "/")));
	if(_midnight_start_time.getTime() < _date.getTime() && _date.getTime() < _midnight_end_time.getTime())
		return true;
	return false;
}
/**
 * 是否正整数
 */
function isPositiveInteger(s) { //是否为正整数
	var re = /^[0-9]+$/;
	return re.test(s)
}

/**
 * 计算订单天数
 * _is_contain_midnight_room 包含午夜房
 */
function fun_calc_order_day(_in_time, _out_time, _is_contain_midnight_room) {
	// 未选择退房时间
	if(_out_time == undefined || _out_time == "") {
		return 0;
	}

	// 凌晨房, 当天退
	if(_out_time.substr(0, 10) == _in_time.substr(0, 10)) {
		return 1;
	}

	var days = fun_calc_day_by_start_end(new Date(Date.parse(_in_time.substr(0, 10).replace(/-/g, "/"))), new Date(Date.parse(_out_time.substr(0, 10).replace(/-/g, "/"))));
	if(_is_contain_midnight_room) {
		days = days + 1;
	}
	return days;
}
/**
 * 计算start与end的时间差(天)
 */
function fun_calc_day_by_start_end(_start, _end) {
	_end = new Date(_end.getTime() + 31 * 60 * 1000);

	var calc_date = _end.getTime() - _start.getTime();
	return Math.abs(parseInt(calc_date / (24 * 60 * 60 * 1000)));
}
/**
 * 日期格式化
 */
var _week_array = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/**
 * aes加密
 */
function fun_encrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("MIGfMA0GCSqGSIb3");
	var iv = CryptoJS.enc.Utf8.parse('5622039203920985');
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC
	});
	return encrypted.toString();
}
/**
 * aes解密
 */
function fun_decrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("MIGfMA0GCSqGSIb3");
	var iv = CryptoJS.enc.Utf8.parse('5622039203920985');
	var decrypt = CryptoJS.AES.decrypt(word, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 * 计算_time与现在的时间差(分钟)
 */
function fun_calc_time_minus(_time) {
	var start_date = fun_format_str_to_date(_time);
	var end_date = new Date();
	var calc_date = start_date.getTime() - end_date.getTime();
	return Math.floor(calc_date / (60 * 1000));
}
/**
 * 字符串格式化为日期
 */
function fun_format_str_to_date(_date_str) {
	if(_date_str == undefined || "" == _date_str) {
		return new Date(0);
	}
	return new Date(Date.parse(_date_str.replace(/-/g, "/")));
}

function fun_get_next_monday() {
	var d = new Date();
	var day = d.getDay() || 7;
	return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1 - day + 7);
}

function fun_update_refresh_time() {
	$.cookie("refresh_time", (new Date()).Format("yyyy-MM-dd hh:mm:ss"), {
		expires: 365,
		path: "/"
	});
}

// esc 关闭所有弹框
$(document).keyup(function(event) {
	switch(event.keyCode) {
		case 27:
			if((layer != undefined && layer != null) || (parent.layer != undefined && parent.layer != null)) {
				layer.closeAll();
				parent.layer.closeAll();
			}
	}
});
