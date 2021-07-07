/**
* jQuery JavaScript Library v1.9.x, v2.x, v3.x
* http://jquery.com/
*
* Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
* Released under the MIT license
* http://jquery.org/license
*
* jQuery Extensions Basic Library 基础函数工具包 v0.1 beta
* jquery.jdirk.js
* 作者 陈建伟
*
* 依赖项：jquery 1.9.x/2.1.x/3.x late
*
* Copyright 2013-2017 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function (window, $, undefined) {
    "use strict";

    // 最近更新日期
    var version = "v0.1.20171218",

        //  定义 字符串对象(String) 扩展对象基元
        coreString = function () { return String.apply(this, arguments); },

        //  定义 日期对象(Date) 扩展对象基元
        coreDate = function () { return Date.apply(this, arguments); },

        //  定义 数值对象(Number) 扩展对象基元
        coreNumber = function () { return Number.apply(this, arguments); },

        //  定义 数组对象(Array) 扩展对象基元
        coreArray = function () { return Array.apply(this, arguments); },

        //  定义 布尔值对象(Boolean) 扩展对象基元
        coreBoolean = function () { return Boolean.apply(this, arguments); },

        //  定义 通用工具方法 扩展对象基元
        coreUtil = function () { return Object.apply(this, arguments); },

        //  定义 jQuery 扩展对象基元
        coreJquery = function () { return $.apply(this, arguments); },

        //  定义 空值 集合基元
        coreNullable = {
            String: new String(),
            Date: new Date(),
            Number: new Number(),
            Array: [],
            Boolean: new Boolean(),
            Function: new Function(),
            Object: new Object()
        },

        //  定义 HTML5 工具组件对象基元
        coreHtml5 = {};

    coreString.fn = coreString.prototype = {};
    coreDate.fn = coreDate.prototype = {};
    coreNumber.fn = coreNumber.prototype = {};
    coreArray.fn = coreArray.prototype = {};
    coreBoolean.fn = coreBoolean.prototype = {};
    coreUtil.fn = coreUtil.prototype = {};
    coreJquery.fn = coreJquery.prototype = {};

    coreJquery.string = coreString;
    coreJquery.date = coreDate;
    coreJquery.number = coreNumber;
    coreJquery.array = coreArray;
    coreJquery.boolean = coreBoolean;
    coreJquery.util = coreUtil;
    coreJquery.nullable = coreNullable;
    coreJquery.html5 = coreHtml5;



    var document = coreUtil.document = window.document,
        location = coreUtil.location = window.location,
        docElem = coreUtil.docElem = document.documentElement,
        history = coreUtil.history = window.history,
        parent = coreUtil.parent = window.parent,
        top = coreUtil.top = window.top,
        $$ = coreJquery.emptyJquery 
            = coreJquery.empty$
            = coreJquery.$$
            = coreUtil.emptyJquery
            = coreUtil.empty$
            = coreUtil.$$
            = $(),
        core_string = coreUtil.version = version,
        //core_date = coreNullable.Date,
        //core_number = coreNullable.Number,
        core_array = coreNullable.Array,
        //core_boolean = coreNullable.Boolean,
        //core_trim = core_string.trim,
        core_push = core_array.push,
        core_slice = core_array.slice,
        core_splice = core_array.splice,
        //core_sort = core_array.sort,
        //core_join = core_array.join,
        core_isArray = Array.isArray;
    

    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 工具，提供常用的 js 工具方法。
    //  包括解析和判断对象的类型、url 解析等功能。
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 字符(串)函数功能扩充
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 的数值(Number)函数功能扩充。
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 的数组函数功能扩充。
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    

    
    
    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript 的日期函数功能扩充。
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    

    

    

    //  获取指定日期对象当前表示的季度（0: 春, 1: 夏, 2: 秋, 3: 冬）
    coreDate.getQuarter = function (date) {
        date = coreDate.toDate(date);
        var m = date.getMonth();
        var q = 0;
        if (m >= 0 && m < 3) {
            q = 0;
        } else if (m >= 3 && m < 6) {
            q = 1;
        } else if (m >= 6 && m < 9) {
            q = 2;
        } else if (m >= 9 && m < 12) {
            q = 3;
        }
        return q;
    };

    //  获取当前日期对象表示所在周的星期几（0 - 6）
    coreDate.getDayOfWeek = function (date) {
        date = coreDate.toDate(date);
        return date.getDay();
    };

    //  获取当前日期对象所在年的第几周计数。
    coreDate.getWeek = function (date, weekStart) {
        date = coreDate.toDate(date);
        weekStart = (weekStart || 0) - 0;
        if (!coreUtil.isNumeric(weekStart) || weekStart > 6) {
            weekStart = 0;
        }
        var year = date.getFullYear(),
            firstDay = new Date(year, 0, 1),
            firstWeekDays = 7 - firstDay.getDay() + weekStart,
            dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;
        return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
    };

    //  获取当前日期对象所在月的第几周计数。
    coreDate.getWeekOfMonth = function (date, weekStart) {
        date = coreDate.toDate(date);
        weekStart = (weekStart || 0) - 0;
        if (!coreUtil.isNumeric(weekStart) || weekStart > 6) {
            weekStart = 0;
        }
        var dayOfWeek = date.getDay(),
            day = date.getDate();
        return Math.ceil((day - dayOfWeek - 1) / 7) + ((dayOfWeek >= weekStart) ? 1 : 0);
    };

    //  给指定日期对象添加指定的毫秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      millisec: 要添加的毫秒数，可以是一个负数。
    //  返回值：date 添加指定毫秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addTime = function (date, millisec) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(millisec)) {
            millisec = Date.parse(millisec);
        }
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的天数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      days: 要添加的天数，可以是一个负数。
    //  返回值：date 添加指定天数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addDays = function (date, days) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(days)) {
            return new Date(d);
        }
        var millisec = 86400000 * days;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的小时数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      hours: 要添加的小时数，可以是一个负数。
    //  返回值：date 添加指定小时数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addHours = function (date, hours) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(hours)) {
            return new Date(d);
        }
        var millisec = 3600000 * hours;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的毫秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      millisec: 要添加的毫秒数，可以是一个负数。
    //  返回值：date 添加指定毫秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addMilliseconds = function (date, millisec) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(millisec)) {
            return new Date(d);
        }
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的分钟数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      minutes: 要添加的分钟数，可以是一个负数。
    //  返回值：date 添加指定分钟数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addMinutes = function (date, minutes) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(minutes)) {
            return new Date(d);
        }
        var millisec = 60000 * minutes;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的星期周数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      weeks: 要添加的星期周数，可以是一个负数。
    //  返回值：date 添加指定星期周数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addWeeks = function (date, weeks) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(weeks)) {
            return new Date(d);
        }
        var millisec = 86400000 * 7 * weeks;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的月数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      months: 要添加的月数，可以是一个负数。
    //  返回值：date 添加指定月数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addMonths = function (date, months) {
        date = coreDate.toDate(date);
        if (!coreUtil.isNumeric(months)) {
            months = 0;
        }
        return new Date(date.getFullYear(),
            date.getMonth() + months,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds());
    };

    //  给指定日期对象添加指定的秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      seconds: 要添加的秒数，可以是一个负数。
    //  返回值：date 添加指定秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addSeconds = function (date, seconds) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(seconds)) {
            return new Date(d);
        }
        var millisec = 1000 * seconds;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的百纳秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      ticks: 要添加的百纳秒数，可以是一个负数。
    //  返回值：date 添加指定百纳秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addTicks = function (date, ticks) {
        date = coreDate.toDate(date);
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(ticks)) {
            return new Date(d);
        }
        var millisec = 0.000001 * ticks;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的年数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      years: 要添加的年数，可以是一个负数。
    //  返回值：date 添加指定年数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addYears = function (date, years) {
        date = coreDate.toDate(date);
        if (!coreUtil.isNumeric(years)) {
            years = 0;
        }
        return new Date(date.getFullYear() + years,
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds());
    };

    //  给指定日期对象添加指定的季度数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      quarters: 要添加的季度数，可以是一个负数。
    //  返回值：date 添加指定季度数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.addQuarters = function (date, quarters) {
        date = coreDate.toDate(date);
        if (!coreUtil.isNumeric(quarters)) {
            quarters = 0;
        }
        return new Date(date.getFullYear(),
            date.getMonth() + quarters * 3,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds());
    };

    //  给指定日期对象添加指定日期部分的指定数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //      number: 要添加的指定日期部分的指定数量，可以是一个负数；
    //  返回值：date 添加指定日期部分的指定数后的一个新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    coreDate.add = function (date, datepart, number) {
        if (!coreUtil.isString(datepart)) {
            return date;
        }
        if (!coreUtil.isNumeric(number)) {
            return date;
        }
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = coreDate.addYears(date, number);
                break;
            case "qq":
            case "q":
                d = coreDate.addQuarters(date, number);
                break;
            case "mm":
            case "m":
                d = coreDate.addMonths(date, number);
                break;
            case "dd":
            case "d":
                d = coreDate.addDays(date, number);
                break;
            case "wk":
            case "ww":
                d = coreDate.addWeeks(date, number);
                break;
            case "hh":
                d = coreDate.addHours(date, number);
                break;
            case "mi":
            case "n":
                d = coreDate.addMinutes(date, number);
                break;
            case "ss":
            case "s":
                d = coreDate.addSeconds(date, number);
                break;
            case "ms":
                d = coreDate.addMilliseconds(date, number);
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };

    //  比较两个日期对象指定部分的差，并返回比较结果；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //      value: 要比较的日期对象；
    //  返回值：返回 date 日期对象 和 value 日期对象 指定部分的数值的差。
    coreDate.diff = function (date, datepart, value) {
        if (!coreUtil.isString(datepart)) {
            return undefined;
        }
        date = coreDate.toDate(date);
        value = coreDate.toDate(value);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = value.getFullYear() - date.getFullYear();
                break;
            case "qq":
            case "q":
                var quarter = coreDate.getQuarter(value);
                d = quarter + ((value.getFullYear() - date.getFullYear()) * 3) - quarter;
                break;
            case "mm":
            case "m":
                d = (value.getMonth() + 1) + ((value.getFullYear() - date.getFullYear()) * 12) - (date.getMonth() + 1);
                break;
            case "dd":
            case "d":
                d = parseInt((value.getTime() - date.getTime()) / 86400000);
                break;
            case "wk":
            case "ww":
                d = parseInt((value.getTime() - date.getTime()) / (86400000 * 7));
                break;
            case "hh":
                d = parseInt((value.getTime() - date.getTime()) / 3600000);
                break;
            case "mi":
            case "n":
                d = parseInt((value.getTime() - date.getTime()) / 60000);
                break;
            case "ss":
            case "s":
                d = parseInt((value.getTime() - date.getTime()) / 1000);
                break;
            case "ms":
                d = value.getTime() - date.getTime();
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };

    //  返回指定日期对象的指定部分的值；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //  返回值：返回指定日期对象的指定部分的值；
    coreDate.part = function (date, datepart) {
        if (!coreUtil.isString(datepart)) {
            return undefined;
        }
        date = coreDate.toDate(date);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = date.getFullYear();
                break;
            case "qq":
            case "q":
                d = coreDate.getQuarter(date);
                break;
            case "mm":
            case "m":
                d = date.getMonth();
                break;
            case "dd":
            case "d":
                d = date.getDate();
                break;
            case "wk":
            case "ww":
                d = date.getWeek();
                break;
            case "hh":
                d = date.getHours();
                break;
            case "mi":
            case "n":
                d = date.getMinutes();
                break;
            case "ss":
            case "s":
                d = date.getSeconds();
                break;
            case "ms":
                d = date.getMilliseconds();
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };

    //  返回当前日期对象的格式化字符值；该函数定义如下参数：
    //      date:   要进行格式化的日期对象
    //      format: 返回字符串格式定义；如果该参数不传入，则默认值为 "yyyy-MM-dd"
    coreDate.format = function (date, format) {
        date = coreDate.toDate(date);
        format = coreUtil.isEmptyObjectOrNull(format) ? "yyyy-MM-dd" : format;
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    };

    //  获取当前日期时间的长字符串格式，返回的日期时间字符串格式如 “2013年05月16日 星期四 夏季, 下午 15:38:11”
    coreDate.toLongDateTimeString = function (date) {
        date = coreDate.toDate(date);
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            week = date.getDay(),
            quarter = coreDate.getQuarter(date),
            hoursArray = ["午夜", "凌晨", "早上", "上午", "中午", "下午", "傍晚", "晚上"],
            weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            //monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            quarterArray = ["春", "夏", "秋", "冬"],
            hourSpan = hoursArray[Math.floor(parseFloat(hours) / 3)],
            weekSpan = weekArray[week],
            //monthSpan = monthArray[month],
            quarterSpan = quarterArray[quarter];
        return coreString.format(
            "{0}年{1}月{2}日 {3} {4}季, {5} {6}:{7}:{8}",
            year,
            ("" + (month + 101)).substr(1),
            ("" + (day + 100)).substr(1),
            weekSpan,
            quarterSpan,
            hourSpan,
            ("" + (hours + 100)).substr(1),
            ("" + (minutes + 100)).substr(1),
            ("" + (seconds + 100)).substr(1));
    };





    var _html5ValidateCache = {};
    //  测试指定的 html 标签是否具备相应的属性；该函数定义如下参数：
    //      propName:   待测试的属性名；
    //      tagName:    被测试的 html 标签名。
    //  返回值：如果指定的标签名(tagName)所表示的 html 标签具备相应的属性名 propName，则返回 true，否则返回 false。
    coreHtml5.testProp = function (propName, tagName) {
        propName = coreString.trim(propName);
        tagName = coreString.trim(tagName);
        if (propName) {
            propName = propName.toLowerCase();
        }
        if (tagName) {
            tagName = tagName.toLowerCase();
        }
        var tag = _html5ValidateCache[tagName];
        if (!tag) {
            _html5ValidateCache[tagName] = tag = document.createElement(tagName);
        }
        return propName in tag ? true : false;
    };




    

    

    //  该属性表示是否启用浏览器自动给所有 DOM 元素增加唯一标识符的功能。
    var _enableUniqueID = false;
    //  该属性表示浏览器自动给所有 DOM 元素增加的唯一标识符的名称。
    coreUtil.uniqueIdName = "uniqueID";

    //  获取 HTML DOM 对象的 GUID 值；该函数定义如下参数：
    //      element:    必须，表示需要获取 uniqueID 属性的 DOM 对象；
    //  返回值：返回 element 元素的 uniqueID 值；如果该元素未定义该值，则返回 undefined。
    coreUtil.getElementUniqueID = function (element) {
        return element != undefined
            && element != null
            && element.getAttribute ? element.getAttribute(coreUtil.uniqueIdName) : null;
    };

    //  判断 HTML DOM 对象是否具有 uniqueID 属性；该函数定义如下参数：
    //      element:    必须，表示需要判断是否具有 uniqueID 属性的 DOM 对象。
    //  返回值：如果 element 元素具有 uniqueID 属性，则返回 true，否则返回 false。
    coreUtil.hasUniqueID = function (element) {
        return !coreString.isNullOrWhiteSpace(coreUtil.getElementUniqueID(element));
    };

    //  给 HTML DOM 对象设置一个新的 uniqueID 值；该函数定义如下参数：
    //      element:    必须，表示需要设置 uniqueID 属性的 DOM 对象；
    //      uniqueID:   可选，表示要给 element 元素设置的 uniqueID 值；如果不定义该值，则会调用 coreUtil.guid 方法自动生成一个 uniqueID 值。
    coreUtil.setElementUniqueID = function (element, uniqueID) {
        if (element == undefined || element == null || !element.setAttribute) {
            return;
        }
        var nodeName = (element.nodeName || coreUtil.uniqueIdName) + "_";
        uniqueID = coreString.isNullOrWhiteSpace(uniqueID) ? nodeName + coreUtil.guid("N") : uniqueID;
        element.setAttribute(coreUtil.uniqueIdName, uniqueID, 0);
    };

    //  初始化 HTML DOM 对象的 uniqueID 值；该函数定义如下参数：
    //      element:    必须，表示需要初始化 uniqueID 属性的 DOM 对象；
    //  备注：该方法判断 element 元素是否具有 uniqueID 属性值，如果有则不进行任何更改；如果没有则为期设置一个新的 uniqueID 值。
    coreUtil.initElementUniqueID = function (element) {
        if (!coreUtil.hasUniqueID(element)) {
            coreUtil.setElementUniqueID(element);
        }
    };

    coreUtil._createElement = document.createElement;
    coreUtil._createDocumentFragment = document.createDocumentFragment;

    //  重写 document.createElement 方法，使之在创建 dom 对象的同时还给对象添加一个唯一标识符 uniqueID。
    coreUtil.createElement = function () {
        var element = coreUtil._createElement.apply(this, arguments);
        if (!_enableUniqueID) {
            return element;
        }
        coreUtil.initElementUniqueID(element);
        return element;
    };

    //  重写 document.createDocumentFragment 方法，使之在创建文档碎片并向文档碎片添加子节点时向子节点添加一个唯一标识符 uniqueID。
    coreUtil.createDocumentFragment = function () {
        var documentFragment = coreUtil._createDocumentFragment.apply(this, arguments);
        if (!_enableUniqueID) {
            return documentFragment;
        }
        var appendChild = documentFragment.appendChild;
        documentFragment.appendChild = function (child) {
            $("*", child).add(child).each(function () {
                coreUtil.initElementUniqueID(this);
            });
            return appendChild.apply(this, arguments);
        };
        return documentFragment;
    };

    //  启用或者禁用浏览器自动给 DOM 元素设置全局唯一标识符功能；该函数定义如下参数：
    //      enableUniqueID；必须，布尔类型值，表示启用或禁用该功能；
    coreUtil.setEnableUniqueID = function (enableUniqueID) {
        enableUniqueID = coreUtil.isBoolean(enableUniqueID) ? enableUniqueID : false;
        _enableUniqueID = enableUniqueID;
        if (enableUniqueID) {
            document.createElement = coreUtil.createElement;
            document.createDocumentFragment = coreUtil.createDocumentFragment;
            $("*").each(function () {
                coreUtil.initElementUniqueID(this);
            });
        } else {
            document.createElement = coreUtil._createElement;
            document.createDocumentFragment = coreUtil._createDocumentFragment;
        }
    };

    //  启用浏览器自动给 DOM 元素设置全局唯一标识符功能；
    coreUtil.enableUniqueID = function () {
        coreUtil.setEnableUniqueID(true);
    };

    //  禁用浏览器自动给 DOM 元素设置全局唯一标识符功能；
    coreUtil.disableUniqueID = function () {
        coreUtil.setEnableUniqueID(false);
    };

    //  获取浏览器是否启用了自动给 DOM 元素设置全局唯一标识符功能；
    coreUtil.getEnableUniqueID = function () {
        return _enableUniqueID;
    };








    
    //  获取包含当前页面的 iframe 对象。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回 null。
    coreUtil.currentFrame = null;

    //  获取包含当前页面的 iframe 对象的 id。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回 null。
    coreUtil.currentFrameId = null;

    //  获取包含当前页面的 iframe 对象的 uniqueID。
    //  如果当前页面为顶级页面或当前页面的父级页面和当前页面不在同一个域下，则返回 null。
    coreUtil.currentFrameUniqueID = null;
    coreUtil.getCurrentFrame = function () {
        if (coreUtil.isUtilTop) {
            return undefined;
        }
        var result = null;
        var frames = coreArray.merge([], top.document.getElementsByTagName("iframe"),
            top.document.getElementsByTagName("frame"));
        var find = function (frame) {
            var win = frame.contentWindow;
            if (win == window) {
                return frame;
            }
            try {
                if (!win || !coreUtil.isObject(win.document)) {
                    return undefined;
                }
                var fs = coreArray.merge([], win.document.getElementsByTagName("iframe"),
                    win.document.getElementsByTagName("frame"));
                $.each(fs, function () {
                    result = find(this);
                    return result == null;
                });
            } catch (ex) {
            }
            return result;
        };
        $.each(frames, function () {
            result = find(this);
            return result == null;
        });
        return result;
    };
    coreUtil.currentFrame = coreUtil.getCurrentFrame();
    if (coreUtil.currentFrame) {
        coreUtil.currentFrameId = coreUtil.currentFrame.id;
    }
    if (coreUtil.currentFrame) {
        coreUtil.currentFrameUniqueID = coreUtil.getElementUniqueID(coreUtil.currentFrame);
    }

    //  获取当前焦点对象；
    coreUtil.getActiveElement = function () {
        return $(document.activeElement);
    };

    //  获取或设置当前 window 窗体的大小；该函数定义如下重载：
    //  1、function ()；获取当前 window 的窗体大小；该方法返回一个格式如 { width, height } 的 JSON-Object；
    //  2、function (valType)；获取当前 window 的窗体大小的指定属性值；该函数定义如下参数：
    //      valType: String 类型值；该参数的值必须为 "width" 或 "height" 其中之一；表示返回当前 window 窗体大小的哪个属性值；
    //  3、function (size)；设置当前 window 的窗体大小；该函数定义如下参数：
    //      size: JSON-Object 类型值；该参数格式必须为 { width, height }，表示要将当前窗体设置的新的尺寸；
    //  4、function (width, height)；设置当前 window 的窗体大小；该函数定义如下参数：
    //      width : Number 类型值；表示窗体的新宽度；
    //      height: Number 类型值；表示窗体的新高度；
    //  5、function (valType, val)；根据指定的属性值设置窗体的尺寸大小；该函数定义如下参数：
    //      valType: String 类型值；该参数的值必须为 "width" 或 "height" 其中之一；表示要设置哪个属性；
    //      val: 表示窗体的新宽度或者新宽度，对应 valType 指示的属性；
    coreUtil.windowSize = function () {
        var length = arguments.length,
            arg1,
            arg2,
            arg1Type,
            arg2Type,
            getSize = function () {
                var win = $(window);
                return {
                    width: window.innerWidth ? window.innerWidth : win.width(),
                    height: window.innerHeight ? window.innerHeight : win.height()
                };
            },
            size = getSize();
        if (length == 0) {
            return size;
        }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") {
                return size[arg1];
            }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") {
                coreUtil.windowSize(arg1.width || size.width, arg1.height || size.height);
            }
        }
        if (length >= 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newSize = $.extend({}, size);
                newSize[arg1] = arg2;
                if (size.width != newSize.width || size.height != newSize.height) {
                    window.resizeTo(newSize.width, newSize.height);
                }
            }
            if (arg1Type == "number" && arg2Type == "number") {
                window.resizeTo(arg1, arg2);
            }
        }
    };

    //  获取或设置当前 window 窗体的位置；该方法定义如下重载：
    //  1、function ()；获取当前 window 的窗体位置；该方法返回一个格式如 { left, top } 的 JSON-Object；
    //  2、function (valType)；获取当前 window 的窗体位置的指定属性值；该函数定义如下参数：
    //      valType: String 类型值；该参数的值必须为 "left" 或 "top" 其中之一；表示返回当前 window 窗体位置的哪个属性值；
    //  3、function (left, top)；设置当前 window 的窗体位置；该函数定义如下参数：
    //      left: Number 类型值；表示窗体新位置的 left 值；
    //      top : Number 类型值；表示窗体新位置的 top 值；
    //  4、function (valType, val)；设置当前 window 的窗体位置；该函数定义如下参数：
    //      valType: String 类型值；表示要设置的值的类型，是 left 还是 top；该参数的值必须为 "left" 或 "top" 其中之一；
    //      val:     Number 类型值；表示 valType 对应的值；
    coreUtil.windowOffset = function () {
        var length = arguments.length,
            arg1,
            arg2,
            arg1Type,
            arg2Type,
            getOffset = function () {
                return {
                    left: window.screenLeft || window.screenX,
                    top: window.screenTop || window.screenY
                };
            },
            offset = getOffset();
        if (length == 0) {
            return offset;
        }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") {
                return offset[arg1];
            }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") {
                coreUtil.windowOffset(arg1.left || offset.left, arg1.top || offset.top);
            }
        }
        if (length >= 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newOffset = $.extend({}, offset);
                newOffset[arg1] = arg2;
                if (offset.left != newOffset.left || offset.top != newOffset.top) {
                    window.moveTo(newSize.left, newSize.top);
                }
            }
            if (arg1Type == "number" && arg2Type == "number") {
                window.moveTo(arg1, arg2);
            }
        }
    };

    //  获取或设置当前 window 窗体的大小和位置；该函数定义如下重载：
    //  1、function ()；获取当前 window 的窗体大小和位置；该方法返回一个格式如 { left, top, width, height } 的 JSON-Object；
    //  2、function (valType)；获取当前 window 的窗体大小和位置的指定属性值；该函数定义如下参数：
    //      valType: String 类型值；该参数的值必须为 "left"、"top"、"width" 或 "height" 其中之一；表示返回当前 window 窗体大小和位置的哪个属性值；
    //  3、function (pos)；
    //  4、function (valType, val)；
    //  5、function (width, height)；
    //  6、function (width, height, left, top)；
    coreUtil.windowPosition = function () {
        var length = arguments.length,
            arg1,
            arg2,
            arg3,
            arg4,
            arg1Type,
            arg2Type,
            getPosition = function () {
                return $.extend(coreUtil.windowSize(), coreUtil.windowOffset());
            },
            position = getPosition();
        if (length == 0) {
            return position;
        }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") {
                return position[arg1];
            }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") {
                coreUtil.position(arg1.width || position.width,
                    arg1.height || position.height,
                    arg1.left || position.left,
                    arg1.top || position.top);
            }
        }
        if (length == 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newPosition = $.extend({}, position);
                newPosition[arg1] = arg2;
                if (position.width != newPosition.width
                    || position.height != newPosition.height
                    || position.left != newPosition.left
                    || position.top != newPosition.top) {
                    window.moveTo(newSize.left, newSize.top);
                    coreUtil.windowPosition(newPosition.width, newPosition.height, newPosition.left, newPosition.top);
                }
            }
            if (arg1Type == "number" && arg2Type == "number") {
                coreUtil.windowSize(arg1, arg2);
            }
        }
        if (length >= 3) {
            arg2 = arguments[1];
            arg3 = arguments[2];
            arg4 = arguments.length > 3 ? arguments[3] : null;
            coreUtil.windowSize(arg1, arg2);
            coreUtil.windowOffset(arg3, arg4);
        }
    };

    //  解析函数的运行值并返回；该函数定义如下参数：
    //      callback:   需要解析的函数，可以是一个值，也可以是函数；如果是函数，则该方法返回该函数的运行值；
    //      args:       表示需要传入函数 callback 的参数，是一个数组对象，该参数可选；
    //      thisArg:    表示传入函数 callback 包内的 this 引用对象，该参数可选。
    //  返回值：如果参数 callback 是一个函数，则进行 callback.apply(thisArg, args) 运算后并将其返回；否则直接将其返回。
    coreUtil.parseFunction = function (callback, args, thisArg) {
        var val = callback,
            arrayArgs = [];
        if (coreUtil.isFunction(callback)) {
            if (arguments.length == 1) {
                args = [];
                thisArg = this;
            } else {
                if (coreUtil.likeArrayNotString(args)) {
                    thisArg = this;
                } else {
                    thisArg = args;
                    args = [];
                }
            }
            coreArray.copy(arrayArgs, args);
            arrayArgs.callee = callback;
            if (arguments.caller) {
                arrayArgs.caller = callback.caller || arguments.caller;
            }
            val = callback.apply(thisArg, arrayArgs);
        }
        return val;
    };

    //  解析键值对格式对象中键值格式为 key: function 的 JSON 格式对象的函数运算值并返回解析后的数据；该函数定义如下参数：
    //      obj     : 需要解析的对象；该对象中每个属性如果是一个函数，则会调用属性函数进行执行，并将函数执行返回值重新设置为该属性的新值。
    //      args    : 用于在执行 obj 对象中每个属性函数时作为参数列表传入；该参数可选。
    //      thisArg : 用于在执行 obj 对象中每个属性函数时作为 this 引用参数传入；该参数可选。
    //  返回值：返回对象中所有的 key: function 中的 function 运算后的结果与 key 序列组合成的新的对象副本；
    //  示例： var obj = { arg: 20, sex: function () { return "男"; } };
    //         coreUtil.parseMapFunction(obj); 
    //      此时，obj 的值为：{ arg: 20, sex: "男" }。
    coreUtil.parseMapFunction = function (obj, args, thisArg) {
        obj = obj || {};
        var val = {};
        var type = coreUtil.type(obj);
        if (type == "object" || type == "function") {
            for (var key in obj) {
                val[key] = coreUtil.parseFunction(obj[key], args, thisArg);
            }
        }
        return val;
    };

    //  将通过 SOA(例如 ASP.NET 一般处理程序 或者 WebService) 方式返回的数据转换成 JSON 格式数据。
    coreUtil.parseJSON = function (data) {
        var val = null,
            isString = coreUtil.isString(data);
        if (coreUtil.isPlainObject(data) || (coreUtil.likeArrayNotString(data))) {
            val = coreUtil.isPlainObject(data.d) ? coreUtil.parseJSON(data.d) : data;
        } else {
            val = $.parseJSON(isString ? coreString.toJSONString(data) : $(data).text());
        }
        return val;
    };

    //  采用同步发送 ajax 请求的方式，以指定的参数请求远程数据并返回；该函数定义如下参数：
    //      url:    请求的远程服务地址；
    //      args:   发送至远程服务的数据，在发送数据之前该参数将会被序列化；
    //  返回值：返回远程请求的数据；
    //  备注：该方法为 $.ajax 方法的快捷调用，采用 post 方式提交，并且 async 属性设置为 false；
    //      如果需要更加丰富的 ajax 调用，请使用 $.ajax 方法。
    coreUtil.requestAjaxData = function (url, args) {
        var val = null;
        args = coreUtil.parseMapFunction(args);
        $.ajax({
            url: url,
            type: "POST",
            data: args,
            async: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                throw XMLHttpRequest.responseText;
            },
            success: function (data, textStatus, jqXHR) {
                val = data;
            }
        });
        return val;
    };

    //  采用同步发送 ajax 请求的方式，以指定的参数请求远程布尔类型数据并返回；该函数定义如下参数：
    //      url:    请求的远程服务地址；
    //      args:   发送至远程服务的数据，在发送数据之前该参数将会被序列化；
    //  返回值：返回远程请求的布尔数据；
    //  备注：该方法为 $.ajax 方法的快捷调用，采用 post 方式提交，并且 async 属性设置为 false；
    //      如果需要更加丰富的 ajax 调用，请使用 $.ajax 方法。
    coreUtil.requestAjaxBoolean = function (url, args) {
        var data = coreUtil.requestAjaxData(url, args),
            type = typeof data;
        if (type == "object"
            || (type == "string"
                && data.charAt(0) == "<"
                && data.charAt(data.length - 1) == ">"
                && data.length >= 3)) {
            data = $(data).text();
        }
        return coreString.toBoolean(data);
    };

    //  采用同步发送 ajax 请求的方式，以指定的参数请求远程数据并将其转换成 JSON 格式后返回；该函数定义如下参数：
    //      url:    请求的远程服务地址；
    //      args:   发送至远程服务的数据，在发送数据之前该参数将会被序列化；
    //  返回值：返回转换成 JSON 格式后的远程请求的数据；
    //  备注：该方法为 $.ajax 方法的快捷调用，采用 post 方式提交，并且 async 属性设置为 false；
    //      如果需要更加丰富的 ajax 调用，请使用 $.ajax 方法。
    coreUtil.requestAjaxJson = function (url, args) {
        var data = coreUtil.requestAjaxData(url, args);
        return coreUtil.parseJSON(data);
    };

    //  以指定的 CSS 内容创建一个 CSS 对象；该函数定义如下参数：
    //      context: 表示 css 内容；
    //      target:  该参数可选；表示包含该 css 的 style 标签被添加到的目标位置，可以是一个 DOM 对象或者 jQuery 对象。
    //  返回值：返回创建的 CSS 标签的 jQuery DOM 对象；
    //  备注：该方法会在 target 表示的 DOM 对象或当前页面的 head 中添加一个 <style type="text/css"></style> 标签，标签中的内容即为传入的 context 值。
    coreUtil.addCss = function (context, target) {
        return $("<style>" + context + "</style>").attr("type", "text/css").appendTo(target || "head");
    };

    //  通过 javascript 前端本地方式导出 Excel 数据；该函数定义如下参数：
    //      options: JSON Object 类型；定义导出数据的参数信息，该对象定义如下属性：
    //          file:   String 类型，表示要导出的文件名；
    //          columns: Array 类型，表示要导出的 Excel 数据的列信息，该数组中每一个元素都是一个 JSON Object，该 Object 定义如下属性：
    //              field:  表示数据参数 rows 中对应的列字段名；
    //              title:  表示 field 对应的列的标题(导出后显示的名称)，默认为 field 的值；
    //              width:  表示 field 对应的列的列宽(单位：像素)，默认为 140；
    //              type:   表示 field 对应的列的数据类型，可选的值有 "boolean", "number", "string", "date"，默认为 "string"。
    //              formatter:  表示 field 对应的列数据导出时的格式化函数；导出的结果显示内容为该函数运算后返回的结果，Function 类型，定义参数列表如下：
    //                  field:
    //                  rowIndex:
    //                  rowData:
    //                  array:
    //                  默认值为 function (field, rowIndex, rowData, array) { return rowData[field]; }
    //          data: 实际要导出的数据；是一个数组对象，数组中的每一个元素都是一个 JSON Object 对象，表示一行数据；该 JSON Object 中的每一个属性都表示一个列字段值；
    //              关于数据的列字段属性信息由 columns 参数定义；
    //  返回值：
    //  注意：该函数不支持 ie6。
    coreUtil.exportExcel = function (options) {
        $.error("未实现");
    };




    coreJquery.wrapJquery = coreUtil.wrapJquery;
    
    //  获取或设置当前表达式匹配到的元素的父级元素的内尺寸大小；如果当前元素是 HTML BODY 的顶级元素，则直接返回其内尺寸大小。
    //  返回值：返回一个格式如 { width: number, height: number } 的 JSON-Object，表示其父级元素的内尺寸大小。
    coreJquery.parentSize = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector);
        if (!thisArg.length) {
            return coreUtil.windowSize();
        }
        var t = thisArg[0],
            p = (t.tagName == "BODY" ? t : thisArg.parent()[0]);
        return {
            width: $(p).width(),
            height: $(p).height()
        }
    };
    
    //  获取或设置当前表达式匹配到的元素的边框值(css-border 属性)；该方法提供如下重载：
    //      function(selector)              : 获取当前表达式匹配到的第一个元素的边框值，该函数返回一个格式如 { top: number, left: number, right: number, bottom: number } 的 JSON 对象；
    //      function(selector, region)      : 获取当前表达式匹配到的第一个元素的 region 所示位置的边框值，该函数返回一个 Number 数值表示该位置的边框值；
    //      function(selector, val)         : 设置当前表达式匹配到的所有元素的所有位置边框值为 val；该函数返回当前 jquery 链式对象；
    //      function(selector, region, val) : 设置当前表达式匹配到的所有元素的 region 位置边框值为 val；该函数返回当前 jquery 链式对象；
    //  以上重载中，region 参数表示边框的位置，String 类型值，可选的值限定为 "top"、"left"、"right" 或 "bottom"
    //              val 参数表示要设定的边框的值，Number 类型值，不能为负数。
    coreJquery.border = function (selector, region, val) {
        if (arguments.length == 1) {
            return {
                top: getRegionBorder("top"),
                left: getRegionBorder("left"),
                right: getRegionBorder("right"),
                bottom: getRegionBorder("bottom")
            };
        }
        var thisArg = coreUtil.wrapJquery(selector);
        if (arguments.length == 2) {
            if (coreUtil.isNumeric(region) || coreString.endsWith(region, "px")) {
                return thisArg.css("border", region);
            } else {
                var locale = coreString.toLowerCase(region);
                return coreArray.contains(["top", "left", "right", "bottom"], locale)
                    ? getRegionBorder(locale)
                    : null;
            }
        } else {
            var locale = coreString.toLowerCase(region);
            if (coreArray.contains(["top", "left", "right", "bottom"], locale)) {
                return thisArg.css("border-" + locale + "-width", val);
            } else {
                return thisArg;
            }
        }
        function getRegionBorder(locale) {
            var str = thisArg.css("border-" + locale + "-width");
            return toNumber(str);
        };
        function toNumber(str) {
            str = coreString.isNullOrEmpty(str) ? "" : String(str).toLowerCase();
            str = str.replace("px", "");
            return str ? coreString.toInteger(str) : 0;
        };
    };


    //  获取当前表达式匹配到的所有元素中的第一个元素是否具有 uniqueID 属性值；
    //  返回值：如果当当前表达式匹配到的所有元素中的第一个元素具有 uniqueID 属性值，则返回 true，否则返回 false
    coreJquery.hasUniqueID = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector);
        return thisArg.length ? coreUtil.hasUniqueID(thisArg[0]) : false;
    };

    //  获取当前表达式匹配到的所有元素中的第一个元素的 uniqueID 属性值；
    //  返回值：如果当前表达式没有匹配的元素，则返回 null；否则返回 所有元素中的第一个元素的 uniqueID 属性值
    coreJquery.getUniqueID = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector);
        return thisArg.length ? coreUtil.getElementUniqueID(thisArg[0]) : null;
    };

    //  设置当前表达式匹配到的所有元素的 uniqueID 属性值；该函数定义如下参数：
    //      uniqueID: 可选，表示要设置为的 uniqueID 属性值；如果不定义该值，则默认用 coreUtil.guid() 为其创建一个随机值
    //  返回值：返回当前 jquery 对象的引用。
    coreJquery.setUniqueID = function (selector, uniqueID) {
        return coreUtil.wrapJquery(selector).each(function () {
            coreUtil.setElementUniqueID(this, uniqueID);
        });
    };

    //  初始化当前表达式匹配到的所有元素的 uniqueID 属性值；
    //  返回值：返回当前 jquery 对象的引用。
    //  备注：该方法循环判断每一个元素是否具有 uniqueID 属性值，如果有则不进行任何更改；如果没有则其期设置一个新的 uniqueID 值
    coreJquery.initUniqueID = function (selector) {
        return coreUtil.wrapJquery(selector).each(function () {
            coreUtil.initElementUniqueID(this);
        });
    };

    //  获取或设置当前表达式元素的 uniqueID 属性值；该函数定义如下重载：
    //      1、function()；该重载表示：获取当前表达式匹配到的所有元素中第一个元素的 uniqueID 属性值；等效于 coreJquery.fn.getUniqueID 函数；
    //      2、function(uniqueID)；该重载表示：设置当前表达式匹配到的所有元素的 uniqueID 属性值；等效于 coreJquery.fn.setUniqueID 函数；
    coreJquery.uniqueID = function (selector, uniqueID) {
        var thisArg = coreUtil.wrapJquery(selector);
        return arguments.length <= 1 ? thisArg.getUniqueID() : thisArg.setUniqueID(uniqueID);
    };

    //  判断当前匹配到的元素是否具有焦点；
    coreJquery.isFocus = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector);
        if (!thisArg.length) {
            return false;
        }
        return coreArray.contains(thisArg, document.activeElement)
            || coreArray.contains(thisArg.find("*"), document.activeElement);
    };

    //  测试当前 jQuery 对象是否包含另一个 DOM 对象；该函数定义如下参数：
    //      selector: jQuery 对象；
    //      item: DOM节点，可能被其他元素所包含
    //  返回值：如果 item DOM节点包含在 this 指向的当前 jQuery 对象中，则返回 true，否则返回 false。
    coreJquery.contains = function (selector, item) {
        var thisArg = coreUtil.wrapJquery(selector),
            result = false;
        thisArg.each(function () {
            if ($.contains(this, item)) {
                result = true;
                return false;
            }
        });
        return result;
    };

    //  如果当前 jQuery 对象不包含指定表达式匹配的元素，则把与表达式匹配的元素添加到 jQuery 对象中。这个函数可以用于连接分别与两个表达式匹配的元素结果集；该函数定义如下参数：
    //      thisArg: jQuery 对象；
    //      其他参数同 jQuery 的官方 API 方法 jQuery.fn.add 相同；
    //  返回值：返回处理后的 this 的引用。
    coreJquery.attach = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector),
            args = coreArray.removeAt(arguments, 0);
        return thisArg.add(args);
    };

    //  获取匹配元素相对滚动条顶部的偏移百分比
    coreJquery.scrollTopP = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector),
            height = thisArg.height();
        height = height <= 0
            ? parseFloat(height)
            : parseFloat(1);
        return this.scrollTop() / height;
    };

    //  获取匹配元素相对滚动条左侧的偏移百分比
    coreJquery.scrollLeftP = function (selector) {
        var thisArg = coreUtil.wrapJquery(selector),
            width = thisArg.width();
        width = width <= 0
            ? parseFloat(width)
            : parseFloat(1);
        return this.scrollLeft() / width;
    };

    //  将当前表达式匹配到的所有元素及其子元素序列化成 JSON 对象并返回；该函数定义如下类型的重载方式：
    //      1、Function(Object)：其中参数 Object 对象定义如下属性：
    //          onlyEnabled:    表示返回的结果数据中是否仅包含启用(disabled == false)的 HTML 表单控件；Boolean 类型值，默认为 false。
    //          transcript :    表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
    ///                 这是一个 String 类型值，可选的值限定在以下范围：
    //              cover  :    覆盖方式，只取后面元素 的值，丢弃前面元素的值；默认值；
    //              discard:    丢弃后面元素的值，只取前面元素的值；
    //              overlay:    将所有元素的值进行叠加；
    //          overtype   :    元素叠加方式，当 transcript 的值定义为 "overlay" 时，此属性方有效；
    //                  这是一个 String 类型值，可选的值限定在以下范围：
    //              array  :    将所有重复的元素叠加为一个数组；
    //              append :    将所有的重复元素叠加为一个字符串；默认值；
    //          separator  :    元素叠加的分隔符，定义将所有重名元素叠加为一个字符串时用于拼接字符串的分隔符；
    //                  这是一个 String 类型值，默认为 ","；当 transcript 的值定义为 "overlay" 且 overtype 的值定义为 "append" 时，此属性方有效。
    //      2、Function(String)：其中参数 String 表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
    //          其取值范围和当参数格式为 JSON-Object 时的属性 transcript 一样。
    //  返回值：该方法返回一个 JSON Object，返回对象中的每个数据都表示一个表单控件值。
    coreJquery.serializeObject = function (selector, options) {
        var thisArg = coreUtil.wrapJquery(selector),
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i,
            //rsubmittable_radio = /^(?:radio)$/i,
            //rsubmittable_checkbox = /^(?:checkbox)$/i,
            rcheckableType = (/^(?:checkbox|radio)$/i),
            list,
            names,
            result = {};
        options = options || {};

        var defaults = {
                onlyEnabled: false,
                transcript: "cover",
                overtype: "append",
                separator: ","
            },
            opts = $.extend({},
                defaults, 
                (typeof options == "string")
                    ? { transcript: options }
                    : options || {});
        if (!coreArray.contains(["cover", "discard", "overlay"], opts.transcript)) {
            opts.transcript = defaults.transcript;
        }
        if (!coreArray.contains(["array", "append"], opts.overtype)) {
            opts.overtype = defaults.overtype;
        }

        list = thisArg.map(function () {
            var elements = $.prop(this, "elements"),
                children = elements ? $.makeArray(elements) : $(this).find("*");
            return $.merge([], children);
        }).filter(function () {
            return (this.name || this.id)
                && (!opts.onlyEnabled || !$(this).is(":disabled"))
                && rsubmittable.test(this.nodeName)
                && !rsubmitterTypes.test(this.type);
        }).map(function (i, elem) {
            var id = elem.id,
                name = elem.name,
                type = this.type,
                value = $(this).val(),
                checked = (this.checked == undefined || this.checked == null) ? null : this.checked;
            return {
                name: name || id,
                type: type,
                checked: checked,
                val: $.isArray(value)
                    ? $.map(value, function (val) {
                        return val ? val.replace(rCRLF, "\r\n") : val;
                    })
                    : (value ? value.replace(rCRLF, "\r\n") : value)
            };
        });
        names = coreArray.distinct(list.map(function (i, elem) {
            return elem.name;
        }));
        $.each(names, function (i, name) {
            var elems = list.filter(function (i, elem) {
                    return elem.name == name;
                }),
                val = elems.length == 1
                    ? getElemVal(elems[0])
                    : getElemsVal(elems);
            result[name] = (val == undefined || val == null) ? null : val;
        });
        function getElemVal(elem) {
            return rcheckableType.test(elem.type) ? elem.checked : elem.val;
        };
        function getElemsVal(elems) {
            var items = coreArray.filter(elems, function (elem) {
                    return (rcheckableType.test(elem.type) && elem.checked == true)
                        || !rcheckableType.test(elem.type);
                }),
                values = coreArray.map(items, function (val) {
                    return val.val;
                });
            switch (opts.transcript) {
                case "cover": return values[values.length - 1];
                case "discard": return values[0];
                case "overlay":
                    return opts.overtype == "array"
                        ? (values.length > 1 ? values : values[0])
                        : values.join(opts.separator);
                default: return values[0];
            }
        };
        return result;
    };




    //  创建或定义命名空间；该函数定义如下参数：
    //      obj:        表示用于创建命名空间的对象；该参数可选，默认为 window 对象。
    //      namespace:  要创建的命名空间，不同级别的命名请用符号 "." 隔开，请不要包含任何空格；
    //      callback:   可选，创建完命名空间后执行的回调函数；
    //      thisArg:    可选，同参数 callback 一起定义；表示 callback 回调函数执行中的 this 对象
    coreUtil.namespace = function (obj, namespace, callback, thisArg) {
        var index = 0, ret;
        if (typeof obj != "string") {
            ret = obj || window;
            index++;
        } else {
            ret = window;
        }
        namespace = arguments[index++];
        callback = arguments[index++];
        thisArg = arguments[index++];

        if (!namespace) {
            return ret;
        }
        var names = String(namespace).split("."),
            array = [],
            n;
        for (var i = 0; i < names.length; i++) {
            n = coreString.trim(names[i]);
            if (n != "") { array.push(n); }
        }
        $.each(array, function (i, name) {
            ret = (ret[name] == null || ret[name] == undefined) ? (ret[name] = {}) : ret[name];
        });
        if (coreUtil.isFunction(callback)) {
            callback.call(thisArg, ret);
        }
        return ret;
    };

    //  获取指定全名称的 JavaScript 类型函数对象；该函数定义如下参数：
    //      namespace   : 要获取的类的类名称，对应命名空间限定名用符号 "." 隔开，请不要包含任何空格；
    //  返回值：
    //      如果 namespace 指定的类型函数存在，则返回该类型函数对象；
    //      如果 namespace 指定的类型函数不存在，namespace 值为空字符串或者 null/undefined，否则返回 null。
    coreUtil.getNamespace = coreUtil.getDefined = function (namespace) {
        var index = 0, ret;
        if (typeof obj != "string") {
            ret = obj || window;
            index++;
        } else {
            ret = window;
        }
        namespace = arguments[index++];
        if (!namespace) {
            return ret;
        }
        var names = String(namespace).split("."),
            array = [],
            n;
        for (var i = 0; i < names.length; i++) {
            n = coreString.trim(names[i]);
            if (n != "") {
                array.push(n);
            }
        }
        $.each(array, function (i, name) {
            ret = (ret == null || ret == undefined || ret[name] == null || ret[name] == undefined) ? null : ret[name];
        });
        return ret;
    };

    //  创建或定义一个 JavaScript 类；该函数定义如下参数：
    //      namespace   : 要创建的类的类名，对应命名空间限定名用符号 "." 隔开，请不要包含任何空格；
    //      data        : 可选；被创建的类型默认定义的成员属性或方法(即 prototype)；
    //      createFn    : 可选；被创建的类型的默认构造函数；
    //  返回值：返回被创建的类型的 Function 对象；
    //  注意：
    //      如果传入的参数 namespace 的值为 null，则创建的这个 JavaScript 类为匿名类；
    //      如果指定此定义函数时，namespace 所指定的对象已经存在，则该对象将会被覆盖；
    //      可以用 coreUtil.getDefined(namespace) 来判断 namespace 所指定的对象是否已经存在；
    coreUtil.define = function (namespace, data, createFn) {
        if (coreUtil.isFunction(data)) {
            createFn = data;
            data = {};
        }
        var p,
            name,
            constructor,
            func;
        if (namespace) {
            var names = String(namespace).split("."),
                array = [],
                n;
            for (var i = 0; i < names.length; i++) {
                n = coreString.trim(names[i]);
                if (n != "") {
                    array.push(n);
                }
            }
            if (array[0] != "window") {
                array.splice(0, 0, "window");
            }
            if (array.length > 1) {
                p = coreUtil.namespace(array.slice(0, array.length - 1).join("."));
                name = array[array.length - 1];
            }
        }
        createFn = coreUtil.isFunction(createFn) ? createFn : function () { };
        constructor = function (options) {
            return createFn.call(this, options);
        };
        func = function (options) {
            return new constructor(options);
        };
        func.defaults = func.fn = func.prototype = constructor.defaults = constructor.fn = constructor.prototype;
        $.extend(func, { extend: $.extend, union: coreJquery.union, init: constructor, inst: createFn });
        $.extend(func.defaults, data, { extend: $.extend, union: coreJquery.union });
        if (p && name) {
            var old = p[name];
            p[name] = func;
            if (old) {
                coreJquery.union(func, old);
            }
        }
        return func;
    };

    //  以指定的参数创建一个指定类型的对象；该函数定义如下参数：
    //      namespace   : 必须，String 类型值，指定的类型函数名称；
    //      options     : 可选，JSON-Object 类型值；构造 namespace 类型对象所用的参数，默认为 null；
    //  返回值：
    //      如果 namespace 指定的类型函数存在，则返回该函数通过 options 参数和 thisArgs 参数所构造的对象；
    //      如果 namespace 指定的类型函数不存在，则返回 null。
    coreUtil.createDefinedObject = function (namespace, options) {
        var type = coreUtil.getDefined(namespace);
        return coreUtil.isFunction(type) ? type(options) : null;
    };



    //  禁用页面的 window.console 脚本功能；
    //  返回值：无返回值。
    coreUtil.disableConsole = function () {
        try {
            var _console = window.console;
            if (Object.defineProperties) {
                Object.defineProperties(window, "console", {
                    get: function () {
                        if (_console._commandLineAPI) {
                            throw "抱歉, 为了用户安全, 本站已禁用 console 脚本功能";
                        }
                        return _console;
                    },
                    set: function (val) {
                        return _console = val;
                    }
                });
            }
        } catch (e) {
        }
    };



    //  下段代码提供 javascript 控制浏览器 进入/退出 全屏模式的 API。
    var fullScreen = {
        supports: false,
        eventName: "",
        prefix: "",
        prefixes: "webkit moz o ms khtml".split(" "),
        isFullScreen: function () {
        },
        requestFullScreen: function () {
        },
        cancelFullScreen: function () {
        }
    };
    if (typeof document.cancelFullScreen != "undefined") {
        fullScreen.supports = true;
    } else {
        for (var i = 0; i < fullScreen.prefixes.length; i++) {
            fullScreen.prefix = fullScreen.prefixes[i];
            if (typeof document[fullScreen.prefix + "CancelFullScreen"] != "undefined") {
                fullScreen.supports = true;
                break;
            }
        }
    }
    if (fullScreen.supports) {
        fullScreen.eventName = fullScreen.prefix + "fullscreenchange";
        fullScreen.isFullScreen = function () {
            switch (this.prefix) {
                case "":
                    return document.fullScreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + "FullScreen"];
            }
        };
        fullScreen.requestFullScreen = function (elem) {
            return (this.prefix == "")
                ? elem.requestFullScreen()
                : elem[this.prefix + "RequestFullScreen"]();
        };
        fullScreen.cancelFullScreen = function (elem) {
            return (this.prefix == "")
                ? document.cancelFullScreen()
                : document[this.prefix + "CancelFullScreen"]();
        };
    }

    //  判断当前页面是否正处于全屏模式；
    coreUtil.isFullScreen = coreJquery.isFullScreen = function () {
        return fullScreen.isFullScreen();
    };

    //  将指定的 jQueryObject/HtmlElement 设置为全屏模式；如果参数 selector 为空，则将整个页面设置为全屏模式；
    coreUtil.requestFullScreen = coreJquery.requestFullScreen = function (selector) {
        if (selector == null || selector == undefined) {
            selector = document.documentElement;
        }
        selector = coreUtil.wrapJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) {
                fullScreen.requestFullScreen(this);
            }
        });
    };

    //  退出指定的 jQueryObject/HtmlElement 对象的全屏模式；如果参数 selector 为空，则退出整个页面的全屏模式；
    coreUtil.cancelFullScreen = coreJquery.cancelFullScreen = function (selector) {
        if (selector == null || selector == undefined) {
            selector = document.documentElement;
        }
        selector = coreUtil.wrapJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) {
                fullScreen.cancelFullScreen(this);
            }
        });
    };
    //  切换指定的 jQueryObject/HtmlElement 对象的全屏模式；如果参数 selector 为空，则切换整个页面的全屏模式；
    coreUtil.toggleFullScreen = coreJquery.toggleFullScreen = function (selector) {
        if (selector == null || selector == undefined) { selector = document.documentElement; }
        selector = coreUtil.wrapJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) {
                if (coreUtil.isFullScreen()) {
                    fullScreen.cancelFullScreen(this);
                } else {
                    fullScreen.requestFullScreen(this);
                }
            }
        });
    };

    //  获取一个 bool 类型值，该值指示当前浏览器是否支持全屏 API。
    coreUtil.supportsFullScreen = fullScreen.supports;
    //  如果 $.util.supportsFullScreen 值为 true，则该属性获取浏览器的全屏 API 事件名称；如果 $.util.supportsFullScreen 值为 false；则该属性返回 null/undefined。
    coreUtil.fullScreenEventName = fullScreen.eventName;
    //  获取当前浏览器关于全屏 API 的支持信息。
    coreUtil.fullScreen = fullScreen;


    
    //  使元素闪动
    coreUtil.shine = coreJquery.shine = function (selector, interval, times) {
        if (selector == null || selector == undefined) {
            return selector;
        }
        selector = coreUtil.wrapJquery(selector);
        if (!coreUtil.isNumeric(interval) || interval <= coreJquery.shine.defaults.minInterval) {
            interval = coreJquery.shine.defaults.minInterval;
        }
        if (!coreUtil.isNumeric(times) || times < coreJquery.shine.defaults.minTimes) {
            times = coreJquery.shine.defaults.minTimes;
        }
        initCss();
        coreUtil.delay(shineClass);
        return selector;

        function initCss() {
            if (coreJquery.shine.defaults.initedCss) {
                return;
            }
            var name = coreJquery.shine.defaults.cls,
                value = coreJquery.shine.defaults.css,
                css = "." + name + " { " + value + " }";
            coreJquery.shine.defaults.style = coreUtil.addCss(css);
            coreJquery.shine.defaults.initedCss = true;
        }
        function addClass() {
            selector.addClass("jdirk-shine");
        }
        function removeClass() {
            selector.removeClass("jdirk-shine");
        }
        function shineClass() {
            coreUtil.delay(addClass, interval / 2);
            coreUtil.delay(removeClass, interval);
            times--;
            if (times > 0) {
                coreUtil.delay(shineClass, interval);
            }
        }
    };

    coreJquery.shine.defaults = {
        // 元素闪动的默认时间间隔（毫秒）
        interval: 100,
        // 元素闪动的最小时间间隔（毫秒）
        minInterval: 40,
        // 元素闪动的默认次数
        times: 8,
        // 元素闪动的最少次数
        minTimes: 4,
        // 元素闪动时附加的 style class name
        cls: "jdirk-shine",
        // 元素闪动时附加的 style 内容
        css: "filter: alpha(opacity=40); opacity: 0.4;",
        // 元素闪动时附加的 style-jquery 对象(初始时为 null，第一次运行 shine 方法后赋值)
        style: null,
        // 表示是否页面初始化了元素闪动的 css dom 对象(开发者请勿直接修改该属性的值)
        initedCss: false
    };
    


    //  将指定的 url 和 title 作为收藏信息添加至浏览器收藏夹；如果浏览器不支持收藏夹操作的 API，则会弹出 alert 消息框。
    coreUtil.addFavorites = function (url, title) {
        var favo = {
            url: window.location.href,
            title: document.title
        };
        if (arguments.length == 1) {
            $.extend(favo, url);
        }
        if (arguments.length > 1) {
            $.extend(favo, {
                url: url,
                title: title
            });
        }
        if (window.external && coreUtil.isFunction(window.external.AddFavorite)) {
            window.external.AddFavorite(favo.url, favo.title);
        } else {
            window.alert("请按 Ctrl + D 为您的浏览器添加 收藏/书签!");
        }
    };

    //  基于当前 IFRAME/PAGE 的 document 作为起始位置，在浏览器的当前整个页面及其可访问（同域）的所有子 IFRAME/FRAME 页面中，执行一个指定的函数；该方法提供如下参数：
    //      callback :一个签名为 function (win) 的函数，其中 win 表示所在的 IFRAME/PAGE 执行该参数时传入的 window 对象。
    //  备注：只有当 IFRAME/PAGE 所示的页面中引入了 jQuery 库，callback 指定的函数才能被执行。
    coreUtil.pageNestingExecute = function (callback) {
        if (!coreUtil.isFunction(callback)) {
            return;
        }
        var windowList = [],
            decline = function (win) {
                if (coreArray.contains(windowList, win)) {
                    return;
                }
                callback.call(win, win);
                windowList.push(win);
                var jq = win.jQuery;
                if (jq) {
                    jq("frame,iframe").each(function () {
                        try {
                            if (this.contentWindow && this.contentWindow.document && this.contentWindow.jQuery && this.contentWindow.jQuery.fn) {
                                decline(this.contentWindow);
                            }
                        } catch (ex) {
                        }
                    });
                }
            },
            bubble = function (win) {
                var parentWin = win.parent;
                try {
                    if (parentWin && win !== parentWin && parentWin.document && parentWin.jQuery && parentWin.jQuery.fn) {
                        decline(parentWin);
                    }
                } catch (ex) {
                }
            };
        decline(window);
        bubble(window);
    };

    //  基于当前页面 document 触发，当前页面嵌套的所有子级和父级页面的 document 对象均绑定一个签名为 function (win, e) 事件触发函数；该方法提供如下参数：
    //      types : 表示需要绑定的事件名称或包含事件信息的键值对集合，关于该参数具体数据格式参考 jQuery.fn.bind 方法；
    //      data  : 绑定到事件中的数据，关于该参数参考 jQuery.fn.bind 方法；该参数可选；
    //      fn    : 一个签名为 function (doc, e) 的函数，其中 win 表示所在 iframe 执行函数传入的 window 对象，e 表示最初触发该循环函数调用的事件对象，该函数内的 this 指向该函数本身被调用时的 window 对象。
    //  备注：只有当 IFRAME/PAGE 所示的页面中引入了 jQuery 库，fn 指定的函数才能被执行。
    coreUtil.bindDocumentNestingEvent = function (types, data, fn) {
        if (typeof types == "string") {
            if (arguments.length == 2 && coreUtil.isFunction(data)) {
                coreUtil.pageNestingExecute(function (win) {
                    if (!win || !win.jQuery || !win.document)
                        return;
                    win.jQuery(win.document).unbind(types).bind(types, function (e) {
                        data.call(win, this, e, types);
                    });
                });
            } else if (arguments.length > 2 && coreUtil.isFunction(fn)) {
                coreUtil.pageNestingExecute(function (win) {
                    if (!win || !win.jQuery || !win.document)
                        return;
                    win.jQuery(win.document).unbind(types).bind(types, data, function (e) {
                        fn.call(win, this, e, types, data);
                    });
                });
            }
        } else {
            coreUtil.pageNestingExecute(function (win) {
                if (!win || !win.jQuery || !win.document)
                    return;

                for (var name in types) {
                    var eventName = name, eventData = data, callback = types[name];
                    if (!eventName || !callback)
                        continue;
                    win.jQuery(win.document).unbind(eventName).bind(eventName, eventData, function (e) {
                        callback.call(win, this, e, eventName, eventData);
                    });
                }
            });
        }
    };


    //  该方法用于 HTML-DOM 对象冒泡查找；从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素。
    //  该方法提供如下参数：
    //      selector: 表示一个 HTML-DOM 或 jQuery-DOM 对象；jQuery 对象选择器，或者 DOM 对象，或者 jQuery 对象均可；
    //      filter  : 表示一个用以过滤元素的表达式，或一个用于匹配元素的 jQuery 对象，或一个用于匹配元素的 DOM 元素，或一个用于匹配元素的函数；
    //          如果该参数为 string/jQueryDOM/HTMLDOM 类型，则该方法同 jQuery.fn.closest 方法；
    //          如果该参数为 function 类型，则该函数的签名为 function(level, item)，其中 item 表示函数执行时的 jQuery DOM，level 表示 item 相对于起始位置的级别；
    //              该函数中 this 等同于 item。
    //  返回值：如果查找到指定匹配条件的元素，则返回该元素的 jQuery Object；否则返回一个空的 jQuery Object。
    coreUtil.closest = function (selector, filter) {
        var t = coreUtil.wrapJquery(selector);
        if (coreUtil.isFunction(filter)) {
            var i = 0;
            while (t.length && !filter.call(t, i++, t)) {
                t = t.parent();
            }
            return t;
        } else {
            return t.closest(filter);
        }
    };



    //  用一个或多个其他对象来扩展一个对象，返回被扩展的对象；该函数定义如下参数：
    //      deep:   可选；如果设为 true，则递归合并；
    //      target: 可选；一个对象，如果附加的对象被传递给这个方法将那么它将接收新的属性，如果它是唯一的参数将扩展jQuery的命名空间；
    //      object1:待合并到 target 的对象；
    //      object2:待合并到 target 的对象；
    //      objectN:待合并到 target 的对象；
    //      ...
    //  参考 jquery 中关于 jQuery.extend 以及 jQuery.fn.extend 方法的定义；
    //  注意：该方法与 jQuery.extend 以及 jQuery.fn.extend 的不同之处在于：
    //      jQuery.extend 以及 jQuery.fn.extend：无论 target 对象中是否存在 object1、object2、objectN 等待合并对象中相应的属性，待合并对象中的相应属性都将会合并到 target 中；
    //      union: 如果 target 对象中存在 object1、object2、objectN 等待合并对象中相应的属性，则该属性将不会被合并到 target 中。
    var union = coreUtil.union = coreJquery.union = coreJquery.fn.union = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target == "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !coreUtil.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (coreUtil.isPlainObject(copy) || (copyIsArray = coreUtil.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && coreUtil.isArray(src) ? src : [];
                        } else {
                            clone = src && coreUtil.isPlainObject(src) ? src : {};
                        }
                        target[name] = union(deep, clone, copy);
                    } else if ((copy !== undefined && copy !== null) && (src === undefined || src === null)) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    

    //  _enableUniqueID = true;
    //  初始化浏览器的自动给 DOM 元素创建全局唯一标识符 uniqueID 功能；
    if (_enableUniqueID) {
        $(function () {
            if (coreUtil.currentFrame) {
                coreUtil.initElementUniqueID(coreUtil.currentFrame);
            }
            coreUtil.setEnableUniqueID(_enableUniqueID);
        });
    }



    
    /**
     * 初始化 JSON 对象（兼容 IE 6、7、8 使之支持 JSON 对象）//  json2.js
     * 2016-10-28
     * Public Domain.
     * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     * See http://www.JSON.org/js.html
     * This code should be minified before deployment.
     * See http://javascript.crockford.com/jsmin.html
     */
    (function (factory) {
        if (typeof window.JSON !== "object") {
            window.JSON = {};
        }
        factory(window.JSON);
    }(function (JSON) {
        var rx_one = /^[\],:{}\s]*$/;
        var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
        var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

        function f(n) {
            return n < 10 ? "0" + n : n;
        }
        function this_value() {
            return this.valueOf();
        }

        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function () {
                return isFinite(this.valueOf())
                    ? this.getUTCFullYear() + "-" +
                    f(this.getUTCMonth() + 1) + "-" +
                    f(this.getUTCDate()) + "T" +
                    f(this.getUTCHours()) + ":" +
                    f(this.getUTCMinutes()) + ":" +
                    f(this.getUTCSeconds()) + "Z"
                    : null;
            };
            Boolean.prototype.toJSON = this_value;
            Number.prototype.toJSON = this_value;
            String.prototype.toJSON = this_value;
        }

        var gap;
        var indent;
        var meta;
        var rep;

        function quote(string) {
            rx_escapable.lastIndex = 0;
            return rx_escapable.test(string)
                ? "\"" + string.replace(rx_escapable, function (a) {
                    var c = meta[a];
                    return typeof c === "string"
                        ? c
                        : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                }) + "\""
                : "\"" + string + "\"";
        }
        function str(key, holder) {
            var i;          // The loop counter.
            var k;          // The member key.
            var v;          // The member value.
            var length;
            var mind = gap;
            var partial;
            var value = holder[key];

            if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
                value = value.toJSON(key);
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value);
            }

            switch (typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null";
                    }
                    gap += indent;
                    partial = [];

                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null";
                        }
                        v = partial.length === 0
                            ? "[]"
                            : gap
                                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                                : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === "string") {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0
                        ? "{}"
                        : gap
                            ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                            : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v;
            }
        }

        if (typeof JSON.stringify !== "function") {
            meta = {    // table of character substitutions
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                "\"": "\\\"",
                "\\": "\\\\"
            };
            JSON.stringify = function (value, replacer, space) {
                var i;
                gap = "";
                indent = "";
                if (typeof space === "number") {
                    for (i = 0; i < space; i += 1) {
                        indent += " ";
                    }
                } else if (typeof space === "string") {
                    indent = space;
                }
                rep = replacer;
                if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                        typeof replacer.length !== "number")) {
                    throw new Error("JSON.stringify");
                }
                return str("", { "": value });
            };
        }

        if (typeof JSON.parse !== "function") {
            JSON.parse = function (text, reviver) {
                var j;
                function walk(holder, key) {
                    var k;
                    var v;
                    var value = holder[key];
                    if (value && typeof value === "object") {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }
                text = String(text);
                rx_dangerous.lastIndex = 0;
                if (rx_dangerous.test(text)) {
                    text = text.replace(rx_dangerous, function (a) {
                        return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                if (
                    rx_one.test(
                        text
                            .replace(rx_two, "@")
                            .replace(rx_three, "]")
                            .replace(rx_four, "")
                    )
                ) {
                    j = eval("(" + text + ")");
                    return (typeof reviver === "function")
                        ? walk({ "": j }, "")
                        : j;
                }
                throw new SyntaxError("JSON.parse");
            };
        }
    }));




    /**
     * jQuery Cookie Plugin v1.4.1, Apr 27 2014
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2013 Klaus Hartl
     * Released under the MIT license
     */
    (function () {
        var pluses = /\+/g;
        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }
        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }
        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }
        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                // If we can't parse the cookie, ignore it, it's unusable.
                s = decodeURIComponent(s.replace(pluses, ' '));
                return config.json ? JSON.parse(s) : s;
            } catch (e) {
            }
        }
        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }
        var config = coreUtil.cookie = coreJquery.cookie = function (key, value, options) {
            // Write
            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setTime(+t + days * 864e+5);
                }
                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }
            // Read
            var result = key ? undefined : {};
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = parts.join('=');
                if (key && key === name) {
                    // If second argument (value) is a function it's a converter...
                    result = read(cookie, value);
                    break;
                }
                // Prevent storing a cookie that we couldn't decode.
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        };
        config.defaults = {};
        coreUtil.removeCookie = coreJquery.removeCookie = function (key, options) {
            if (config(key) === undefined) {
                return false;
            }
            // Must not alter options, thus extending a fresh object...
            config(key, '', $.extend({}, options, { expires: -1 }));
            return !config(key);
        };
    }());



    (function (items) {
        $.each(items, function (i, core) {
            var fn = core.fn;
            $.each(core, function (name, method) {
                if (!coreUtil.isFunction(method)) {
                    return;
                }
                if (!fn[name]) {
                    fn[name] = function () {
                        var args = coreArray.insert(arguments, 0, this);
                        return method.apply(core, args);
                    };
                }
            });
        });
    }([coreString, coreDate, coreNumber, coreArray, coreBoolean, coreJquery]));

    
    union(String, coreString);
    union(String.prototype, coreString.fn);
    union(Date, coreDate);
    union(Date.prototype, coreDate.fn);
    union(Number, coreNumber);
    union(Number.prototype, coreNumber.fn);
    union(Array, coreArray);
    union(Array.prototype, coreArray.fn);
    union(Boolean, coreBoolean);
    union(Boolean.prototype, coreBoolean.fn);

    union($, coreJquery);
    union($.fn, coreJquery.fn);
    union($, Array);
    union($.fn, Array.prototype);
    
})(window, jQuery);