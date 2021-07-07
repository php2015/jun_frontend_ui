/*!
 * jQuery JavaScript Library v1.12.4, v2.2.4, v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * jQuery Extensions Basic Library(jquery.jdirk.js) v0.2-beta
 * 作者: 陈建伟
 *
 * dependencies:
 *     1. jquery 1.12.x late or
 *     2. jquery 2.2.x late or
 *     3. jquery 3.2.x late
 *
 * Copyright 2013-2017 ChenJianwei personal All rights reserved.
 * http://www.chenjianwei.org
 */
(function (global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document && global.jQuery ?
            factory(global, global.jQuery) :
            function (w) {
                if (!w.document || !w.jQuery) {
                    throw new Error("jQuery Extensions Basic Library(jquery.jdirk) requires a window with a document and jQuery JavaScript Library");
                }
                return factory(w, w.jQuery);
            };
    } else {
        factory(global, global.jQuery);
    }

})(typeof window !== "undefined" ? window : this,
function (global, $, undefined) {
    "use strict";

    // 最近更新日期
    var version = "v0.2.20180120",

        //  定义 字符串对象(String) 扩展对象基元
        extrasString = function () { return String.apply(this, arguments); },

        //  定义 日期对象(Date) 扩展对象基元
        extrasDate = function () { return Date.apply(this, arguments); },

        //  定义 数值对象(Number) 扩展对象基元
        extrasNumber = function () { return Number.apply(this, arguments); },

        //  定义 数组对象(Array) 扩展对象基元
        extrasArray = function () { return Array.apply(this, arguments); },

        //  定义 布尔值对象(Boolean) 扩展对象基元
        extrasBoolean = function () { return Boolean.apply(this, arguments); },

        //  定义 jQuery 扩展对象基元
        extrasJquery = function () { return $.apply(this, arguments); },

        //  定义 通用工具方法 扩展对象基元
        extrasUtil = function () { return Object.apply(this, arguments); },

        //  定义 HTML5 工具组件对象基元
        extrasHtml5 = {},

        //  定义 空值 集合基元
        extrasNullable = {
            String: new String(),
            Date: new Date(),
            Number: new Number(),
            Array: [],
            Boolean: new Boolean(),
            Function: new Function(),
            Object: new Object(),
            jQuery: $()
        };


    extrasString.fn = extrasString.prototype = {};
    extrasDate.fn = extrasDate.prototype = {};
    extrasNumber.fn = extrasNumber.prototype = {};
    extrasArray.fn = extrasArray.prototype = {};
    extrasBoolean.fn = extrasBoolean.prototype = {};
    extrasJquery.fn = extrasJquery.prototype = {};


    var window = global,
        jQuery = $,
        document = window && window.document ? window.document : null,
        location = window && window.location ? window.location : null,
        history = window && window.history ? window.history : null,
        docElem = document && document.documentElement ? document.documentElement : null,

        core_string = version,

        core_date = extrasNullable.Date,//
        core_number = extrasNullable.Number,//
        core_array = extrasNullable.Array,
        core_boolean = extrasNullable.Boolean,//
        core_function = extrasNullable.Function,//
        core_object = extrasNullable.Object,
        core_jquery = extrasNullable.jQuery,

        core_trim = core_string.trim,//
        core_push = core_array.push,
        core_concat = core_array.concat,
        core_slice = core_array.slice,
        core_splice = core_array.splice,
        core_sort = core_array.sort,
        core_join = core_array.join,//
        core_isArray = Array.isArray,
        core_type = $.type,

        isWindow = $.isWindow,
        isFunction = $.isFunction,
        noop = $.noop || function () { },
        trim = $.trim || core_trim,
        parseJSON = $.parseJSON || function () {
            return JSON.parse.apply(this, arguments);
        },
        escapeSelector = $.escapeSelector || function (selector) {
            if (selector === null || selector === undefined) {
                return selector;
            }
            // CSS string/identifier serialization, https://drafts.csswg.org/cssom/#common-serializing-idioms
            var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {
                        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                        if (ch === "\0") {
                            return "\uFFFD";
                        }
                        // Control characters and (dependent upon position) numbers get escaped as code points
                        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                    }
                    // Other potentially-special ASCII characters get backslash-escaped
                    return "\\" + ch;
                };
            return (selector + "").replace(rcssescape, fcssescape);
        },

        // 测试对象是否是字符串(String)类型值
        isString = function (obj) {
            return core_type(obj) === "string";
        },
        // 测试对象是否是日期(Date)类型值。
        isDate = function (obj) {
            return core_type(obj) === "date";
        },
        // 判断对象是否是数值(Number)类型
        isNumber = function (obj) {
            return core_type(obj) === "number";
        },
        isNumeric = function (str, flag) {
            //验证是否是数字
            if (!$.isNumeric(str)) {
                return false;
            }
            str = String(str).trim();
            switch (flag) {
                case "":
                    return true;
                case "+":        //正数
                    return /(^\+?|^\d?)\d*\.?\d+$/.test(str);
                case "-":        //负数
                    return /^-\d*\.?\d+$/.test(str);
                case "i":        //整数
                    return /(^-?|^\+?|\d)\d+$/.test(str);
                case "+i":        //正整数
                    return /(^\d+$)|(^\+?\d+$)/.test(str);
                case "-i":        //负整数
                    return /^[-]\d+$/.test(str);
                case "f":        //浮点数
                    return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(str);
                case "+f":        //正浮点数
                    return /(^\+?|^\d?)\d*\.\d+$/.test(str);
                case "-f":        //负浮点数
                    return /^[-]\d*\.\d$/.test(str);
                default:        //缺省
                    return true;
            }
        },
        // 测试对象是否是布尔(Boolean)类型值
        isBoolean = function (obj) {
            return core_type(obj) === "boolean";
        },

        isArray = $.isArray || core_isArray,
        arrayLike = function (obj) {
            if (obj == null || obj == undefined || isWindow(obj)) {
                return false;
            }
            var type = core_type(obj);
            if (type === "array" || type === "string") {
                return true;
            }
            if (type === "function" || type === "number" || type === "boolean") {
                return false;
            }
            // Support: real iOS 8.2 only (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = !!obj && "length" in obj && obj.length;
            return length === 0
                || typeof length === "number" && length > 0 && length - 1 in obj;
        },
        isArrayLike = function (obj) {
            return core_type(obj) !== "string" && arrayLike(obj)
        },

        // 测试对象是否是正则表达式(RegExp)。
        isRegExp = function (obj) {
            return core_type(obj) === "regexp";
        },
        // 测试传入的参数是否是一个 javscript 对象；
        isObject = function (obj) {
            return core_type(obj) === "object";
        },

        isEmptyString = function (str) {
            return str === undefined || str === null || str === "";
        },
        isBlank = function (str) {
            return isEmpty(str) || trim(str + "") == "";
        },
        isEmptyArray = function (array) {
            return !isArrayLike(array) || !array.length
        },
        isEmptyObject = $.isEmptyObject,
        isEmpty = function (obj) {
            switch (core_type(obj)) {
                case "string":
                    return isEmptyString(obj);
                case "array":
                    return obj.length === 0;
                case "date":
                    return Date.parse(obj) === 0;
                case "object":
                    return isEmptyObject(obj);
            }
            return obj === null || obj === undefined;
        },

        isPlainObject = $.isPlainObject,

        $$ = extrasJquery.emptyJquery
            = extrasJquery.empty$
            = extrasJquery.$$
            = extrasUtil.emptyJquery
            = extrasUtil.empty$
            = extrasUtil.$$
            = core_jquery;


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
    var union = extrasJquery.union = extrasJquery.fn.union = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) !== null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = $.extend(deep, clone, copy);
                    } else if (copy !== undefined && copy !== null && (src === undefined || src === null)) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };


    
    var rootDepth = 0,
        request = getRequest(),
        hostPath = getHostPath(),
        rootPath = getRootPath(hostPath, rootDepth),
        currentUri = hostPath + location.pathname,
        currentPath = currentUri.substr(0, currentUri.lastIndexOf("/")),

        parent = getParent(),
        parentJquery = getParentJquery(),
        top = getTop(),
        topJquery = getTopJquery(),
        isTopMost = verifyIsTopMost(),
        isSameDomainTopMost = verifyIsSameDomainTopMost(),
        FileSize_Sepatators = [
            ["B", 1],
            ["KB", Math.pow(1024, 1)],
            ["MB", Math.pow(1024, 2)],
            ["GB", Math.pow(1024, 3)],
            ["TB", Math.pow(1024, 4)],
            ["PB", Math.pow(1024, 5)],
            ["EB", Math.pow(1024, 6)],
            ["ZB", Math.pow(1024, 7)],
            ["NB", Math.pow(1024, 8)],
            ["DB", Math.pow(1024, 9)]
        ];

    
    var extras_string = {

        //  判断传入的对象是否是一个字符串, 同 $.util.isString
        isString: isString,

        //  判断传入的字符串是否为Null或者为空字符串
        isNullOrEmpty: isEmptyString,

        //  判断传入的字符串是否为Null或者为空字符串或者全是空格
        isNullOrWhiteSpace: isBlank,

        // 同 $.string.isNullOrEmpty
        isEmpty: isEmptyString,

        // 同 $.string.isNullOrWhiteSpace
        isBlank: isBlank,
        
        //  格式化字符串，类似于 .NET 中的 string.format 函数功能
        //  使用方法：$.string.format('字符串{0}字符串{1}字符串','第一个变量','第二个变量','第三个变量', ...'第 N 个变量');
        //  该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
        format: function (str, arg1, arg2, arg3, argn) {
            if (str === null || str === undefined) {
                return str;
            }
            str = str + "";
            var isArr = isArrayLike(arg1),
                data = (isArrayLike(arg1) || isObject(arg1))
                    ? arg1
                    : extras_array.range(arguments, 1);
            if (isArr) {
                for (var i = 0; i < data.length; i++) {
                    var value = data[i] + "";
                    str = str.replace(RegExp("\\{" + i + "}", "gm"), data[i] + "");
                }
            } else {
                for (var key in data) {
                    str = str.replace(RegExp("\\{" + key + "}", "gm"), data[key] + "");
                }
            }
            return str;
        },

        // 生成一个 Guid(全局唯一标识符) 值；该函数定义如下参数：
        //      format: String 类型值，一个单格式说明符，它指示如何格式化此 Guid 的值。‎format 参数可以是：
        //          "N":    返回值的格式 32 位(xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
        //          "D":    返回值的格式 由连字符分隔的 32 位数字(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
        //          "B":    返回值的格式 括在大括号中、由连字符分隔的 32 位数字({xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})
        //          "P":    返回值的格式 括在圆括号中、由连字符分隔的 32 位数字((xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx))
        //          如果 format 为 null 或空字符串 ("")，则使用 "D"。
        //      length: Number 类型值，表示返回字符串的长度；如果不定义该参数，则全部返回。
        guid: function (format, length) {
            format = isString(format) ? format.toLowerCase() : "d";
            length = length === null || length === undefined || !isNumeric(length) ? 32 : length;
            if (length > 32 || length === 0) {
                length = 32;
            }
            if (length < -32) {
                length = -32;
            }
            var result = "";
            for (var i = 1; i <= 32; i++) {
                result += Math.floor(Math.random() * 16.0).toString(16);
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    result += "-";
                }
            }
            switch (format) {
                case "n":
                    result = extras_string.replaceAll(result, "-", "");
                    break;
                case "b":
                    result = "{" + result + "}";
                    break;
                case "p": result = "(" + result + ")";
                    break;
                case "d":
                default: break;
            }
            return length >= 0
                ? extras_string.left(result, length)
                : extras_string.right(result, Math.abs(length));
        },

        //  用新字符串替换与给定字符串匹配的所有子串；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
        replaceAll: function (str, substr, replacement, ignoreCase) {
            if (substr === null || substr === undefined || replacement === null || substr === replacement) {
                return str;
            }
            var regexp = isRegExp(substr)
                ? substr
                : RegExp(String(substr), ignoreCase ? "gm" : "igm");
            return str.replace(regexp, replacement);
        },
        
        //  获取字符串包含非 ASCII 码字符(例如中文、日文、俄文等)的 byte 字节长度
        getByteLen: function (str) {
            str = isEmpty(str) ? "" : String(str);
            var bytelen = 0,
                i = 0,
                length = str.length,
                charset = (document.charset || "utf-8").toLowerCase(),
                s = charset == "iso-8859-1" ? 5 : 2;
            for (; i < length; i++) {
                bytelen += str.charCodeAt(i) > 255 ? s : 1;
            }
            return bytelen;
        },

        //  获取字符串中从 index 索引号开始的指定字节数的字符串。该方法定义如下参数:
        //      str       : 源头字符串
        //      index     : str 开始位置的索引号，从 0 开始计数
        //      byteLength: 返回的字符串的字节数。
        //  返回值: 该方法从 str 的 index 位置开始截取字节长度为 byteLength 的内容返回，如果截取内容的最后一个字符字节数
        //      大于1（即返回值包含它时将超过 byteLength 的限制、但不包含则又小于 byteLength）时，将舍弃最后一个字符并返回。
        substrByte: function (str, index, byteLength) {
            str = isEmpty(str) ? "" : String(str);
            if (byteLength === null || byteLength === undefined) {
                return str.substr(index);
            }
            var bytelen = 0,
                i = index,
                length = str.length,
                charset = (document.charset || "utf-8").toLowerCase(),
                s = charset === "iso-8859-1" ? 5 : 2;
            for (; i < length; i++) {
                bytelen += str.charCodeAt(i) > 255 ? s : 1;
                if (bytelen === byteLength) {
                    break;
                } else if (bytelen > byteLength) {
                    i--;
                    break;
                }
            }
            return str.substring(0, i);
        },

        //  判断当前字符串对象是否包含指定的字符串内容。
        contains: function (str, val) {
            str = isEmpty(str) ? "" : String(str);
            return str.indexOf(val) > -1;
        },

        //  字符串反转；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
        reverse: function (str) {
            var charArray = [];
            str = isEmpty(str) ? "" : String(str);
            for (var i = str.length - 1; i > -1; i--) {
                charArray.push(str[i]);
            }
            return charArray.join("");
        },

        //  判断当前 String 对象是否以指定的字符串开头。
        startsWith: function (str, val) {
            str = isEmpty(str) ? "" : String(str);
            return str.substr(0, val.length) === val;
        },

        //  判断当前 String 对象是否以指定的字符串结尾。
        endsWith: function (str, val) {
            str = isEmpty(str) ? "" : String(str);
            return str.substr(str.length - val.length) === val;
        },

        //  截取当前字符串左边的指定长度内容。
        left: function (str, len) {
            str = isEmpty(str) ? "" : String(str);
            if (!isNumeric(len)) {
                len = parseInt(len, 10);
            }
            if (len < 0 || len > str.length) {
                len = str.length;
            }
            return str.substr(0, len);
        },

        //  截取当前字符串右边的指定长度内容。
        right: function (str, len) {
            str = isEmpty(str) ? "" : String(str);
            if (!isNumeric(len)) {
                len = parseInt(len, 10);
            }
            if (len < 0 || len > str.length) {
                len = str.length;
            }
            return str.substring(str.length - len, str.length);
        },

        //  截取当前字符串左边的指定字节长度内容。
        leftBytes: function (str, len) {
            str = isEmpty(str) ? "" : String(str);
            if (!isNumeric(len)) {
                len = parseInt(len, 10);
            }
            var length = extras_string.getByteLen(str),
                i = 0,
                bytelen = 0,
                charset = (document.charset || "utf-8").toLowerCase(),
                s = charset == "iso-8859-1" ? 5 : 2;
            if (len < 0 || len > length) {
                len = length;
            }
            for (; i < str.length; i++) {
                bytelen += str.charCodeAt(i) > 255 ? s : 1;
                if (bytelen == len) {
                    break;
                } else if (bytelen > len) {
                    i--;
                    break;
                }
            }
            return extras_string.left(str, i + 1);
        },

        //  截取当前字符串右边的指定字节长度内容。
        rightBytes: function (str, len) {
            str = isEmpty(str) ? "" : String(str);
            if (!isNumeric(len)) {
                len = parseInt(len, 10);
            }
            var length = extras_string.getByteLen(str),
                i = 0,
                bytelen = 0,
                charset = (document.charset || "utf-8").toLowerCase(),
                s = (charset == "iso-8859-1") ? 5 : 2;
            if (len < 0 || len > length) {
                len = length;
            }
            for (; i < str.length; i++) {
                bytelen += str.charCodeAt(str.length - 1 - i) > 255 ? s : 1;
                if (bytelen == len) {
                    break;
                } else if (bytelen > len) {
                    i--;
                    break;
                }
            }
            return extras_string.right(str, i + 1);
        },

        //  计算字符串的打印长度。
        lengthOfPrint: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return str.replace(/[^\x00-\xff]/g, "**").length;
        },

        //  去除字符串左右两边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
        trim: trim,

        //  去除字符串左边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
        ltrim: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return str.replace(/(^\s*)/g, "");
        },

        //  去除字符串右边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值
        rtrim: function () {
            str = isEmpty(str) ? "" : String(str);
            return str.replace(/(\s*$)/g, "");
        },

        //  返回一个新字符串，该字符串通过在此实例中的字符左侧填充空格或指定字符来来达到指定的总长度，从而使这些字符右对齐。
        padLeft: function (str, len, paddingChar) {
            str = isEmpty(str) ? "" : String(str);
            paddingChar = (isEmpty(paddingChar) || !paddingChar.length)
                ? " "
                : paddingChar;
            len = isNumeric(len) ? len : str.length;
            while (str.length < len) {
                str = paddingChar + str;
            }
            return str;
        },

        //  返回一个新字符串，该字符串通过在此字符串中的字符右侧填充空格或指定字符来达到指定的总长度，从而使这些字符左对齐
        padRight: function (str, len, paddingChar) {
            str = isEmpty(str) ? "" : String(str);
            paddingChar = (isEmpty(paddingChar) || !paddingChar.length)
                ? " "
                : paddingChar;
            len = isNumeric(len) ? len : str.length;
            while (str.length < len) {
                str += paddingChar;
            }
            return str;
        },

        //  返回字符串中的的字符，注意从 0 开始。
        mid: function (str, start, len) {
            if (!start) {
                start = 0;
            }
            if (!len) {
                len = 0;
            }
            str = isEmpty(str) ? "" : String(str);
            return str.substr(start, len);
        },

        //  判断传入的字符串是否为 HTML 代码段。
        isHtmlText: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return str.length >= 3
                && str[0] === "<"
                && str[str.length - 1] === ">";
        },

        //  判断当前 String 对象是否是正确的长日期格式。
        isLongDate: function (str) {
            str = isEmpty(str) ? "" : String(str);
            var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            if (!r || !r.length) {
                return false;
            }
            var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
            return (d.getFullYear() === r[1]
                && (d.getMonth() + 1) === r[3]
                && d.getDate() === r[4]
                && d.getHours() === r[5]
                && d.getMinutes() === r[6]
                && d.getSeconds() === r[7]);
        },

        //  判断当前 String 对象是否是正确的段日期格式。
        isShortDate: function (str) {
            str = isEmpty(str) ? "" : String(str);
            var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (!r || !r.length) {
                return false;
            }
            var d = new Date(r[1], r[3] - 1, r[4]);
            return (d.getFullYear() === r[1]
                && (d.getMonth() + 1) === r[3]
                && d.getDate() === r[4]);
        },

        //  判断当前 String 对象是否是正确的日期格式。
        isDate: function (str) {
            return isDate(str) || extras_string.isLongDate(str) || extras_string.isShortDate(str);
        },

        //  判断当前 String 对象是否是正确的电话号码格式(中国)。
        isTel: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
        },

        //  判断当前 String 对象是否是正确的手机号码格式(中国)。
        isMobile: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^(13|14|15|16|17|18|19)\d{9}$/i.test(str);
        },

        //  判断当前 String 对象是否是正确的电话号码或者手机号码格式(中国)
        isTelOrMobile: function (str) {
            return extras_string.isTel(str) || extras_string.isMobile(str);
        },

        //  判断当前 String 对象是否是正确的传真号码格式
        isFax: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
        },

        //  判断当前 String 对象是否是正确的 电子邮箱地址(Email) 格式。
        isEmail: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(str);
        },

        //  判断当前 String 对象是否是正确的 邮政编码(中国) 格式。
        isZipCode: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[\d]{6}$/.test(str);
        },

        //  判断当前 String 对象是否是否存在汉字字符。
        existChinese: function (str) {
            str = isEmpty(str) ? "" : String(str);
            //[\u4E00-\u9FA5]為漢字﹐[\uFE30-\uFFA0]為全角符號
            return !/^[\x00-\xff]*$/.test(str);
        },

        //  验证中文
        isChinese: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[\u0391-\uFFE5]+$/i.test(str);
        },

        //  验证英文
        isEnglish: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[A-Za-z]+$/i.test(str);
        },

        //  判断当前 String 对象是否是正确的 文件名称(路径) 格式。
        isFileName: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return !/[\\\/\*\?\|:"<>]/g.test(str);
        },

        //  判断当前 String 对象是否是正确的 IPv4 地址格式。
        isIPv4: isIPv4,

        // 判断当前 String 对象是否是正确的 IPv4 地址格式, 同 $.string.isIPv4
        isIP: isIPv4,

        //  判断当前 String 对象是否是正确的 url 格式。
        isUrl: function (str) {
            str = isEmpty(str) ? "" : String(str);
            //        var strRegex = "^((https|http|ftp|rtsp|mms)?:                     //)"
            //          + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"    //ftp的user@
            //          + "(([0-9]{1,3}\.){3}[0-9]{1,3}"                                // IP形式的URL- 199.194.52.184
            //          + "|"                                                           // 允许IP和DOMAIN（域名）
            //          + "([0-9a-z_!~*'()-]+\.)*"                                      // 域名- www.
            //          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."                        // 二级域名
            //          + "[a-z]{2,6})"                                                 // first level domain- .com or .museum
            //          + "|"                                                           // 允许为本机
            //          + "localhost|127.0.0.1"                                         // 允许为本机地址
            //          + "(:[0-9]{1,4})?"                                              // 端口- :80
            //          + "((/?)|"                                                      // a slash isn't required if there is no file name
            //          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            var strRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                re = new RegExp(strRegex);
            return re.test(str);
        },

        //  判断是否为合法的 ipv4 或者 url 格式
        isUrlOrIPv4: function (str) {
            return extras_string.isUrl(str) || extras_string.isIPv4(str);
        },

        //  判断当前 String 对象是否是正确的 身份证号码(中国) 格式。
        isIDCard: function (str) {
            str = isEmpty(str) ? "" : String(str);
            var iSum = 0,
                sId = str,
                aCity = {
                    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
                    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
                    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
                    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
                    46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
                    54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
                    65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
                };
            if (!/^\d{17}(\d|x)$/i.test(sId)) {
                if (sId.length == 15) {
                    return extras_string.isIDCard15(sId);
                }
                return false;
            }
            sId = sId.replace(/x$/i, "a");
            //非法地区
            if (aCity[parseInt(sId.substr(0, 2), 10)] == null) {
                return false;
            }
            var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2)),
                d = new Date(sBirthday.replace(/-/g, "/"));
            //非法生日
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
                return false;
            }
            for (var i = 17; i >= 0; i--) {
                iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
            }
            if (iSum % 11 != 1) {
                return false;
            }
            return true;
        },

        //  判断当前 String 对象是否是正确的 一代身份证号码(中国，15位) 格式。
        isIDCard15: function (str) {
            str = isEmpty(str) ? "" : String(str);
            var iSum = 0,
                sId = str,
                aCity = {
                    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
                    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
                    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
                    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
                    46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
                    54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
                    65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
                };
            if (!/^\d{15}$/i.test(sId)) {
                return false;
            }
            sId = sId.replace(/x$/i, "a");
            //非法地区
            if (aCity[parseInt(sId.substr(0, 2), 10)] == null) {
                return false;
            }
            var sYear = "19",
                sBirthday = sYear + sId.substr(6, 2) + "-" + Number(sId.substr(8, 2)) + "-" + Number(sId.substr(10, 2)),
                d = new Date(sBirthday.replace(/-/g, "/"));
            //非法生日
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
                return false;
            }
            return true;
        },

        //  判断是否为合法的货币格式
        isCurrency: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^\d{0,}(\.\d+)?$/i.test(str);
        },

        //  判断是否为合法的 QQ 号码格式
        isQQ: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[1-9]\d{4,11}$/i.test(str);
        },

        //  判断是否为合法的 MSN 帐号格式
        isMSN: function (str) {
            return extras_string.isEmail(str);
        },

        //  验证是否包含空格和非法字符Z
        isUnnormal: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /.+/i.test(str);
        },

        //  验证是否为合法的车牌号码
        isCarNo: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(str);
        },

        //  验证是否为合法的汽车发动机序列号
        isCarEngineNo: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[a-zA-Z0-9]{16}$/.test(str);
        },

        //  验证是否可以作为合法的用户名字符(字母开头，允许6-16字节，允许字母数字下划线)
        isUsername: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(str);
        },

        //  判断当前 String 对象是否可以作为安全密码字符(由字符和数字组成，至少 6 位).
        isSafePassword: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(str));
        },

        //  验证是否为整数格式
        isInteger: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return /^[+]?[1-9]+\d*$/i.test(str);
        },
        
        // 测试对象是否是数值或数值格式的字符串
        // 方法检查它的参数是否代表一个数值。如果是这样，它返回 true。否则，它返回false。该参数可以是任何类型的
        isNumber: isNumber,

        //  判断当前 String 对象是否是正确的 数字 格式。
        isNumeric: isNumeric,

        likeNumber: isNumeric,

        likeNumeric: isNumeric,

        //  判断当前 String 对象是否是正确的 颜色(#FFFFFF形式) 格式。
        isColor: function (str) {
            str = isEmpty(str) ? "" : String(str);
            if (!str || str.length != 7) {
                return true;
            }
            return (str.search(/\#[a-fA-F0-9]{6}/) != -1);
        },

        //  转换成全角
        toCase: function (str) {
            str = isEmpty(str) ? "" : String(str);
            var tmp = "";
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) {
                    tmp += String.fromCharCode(str.charCodeAt(i) + 65248);
                }
                else {
                    tmp += String.fromCharCode(str.charCodeAt(i));
                }
            }
            return tmp;
        },

        //  对字符串进行Html编码。
        toHtmlEncode: function (str) {
            str = isEmpty(str) ? "" : String(str);
            return str.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\'/g, "&apos;")
                .replace(/\"/g, "&quot;")
                .replace(/\n/g, "&lt;br/&gt;")
                .replace(/\ /g, "&nbsp;")
                .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        },

        //  转换成日期。
        toDate: function (str) {
            if (isDate(str)) {
                return str;
            }
            try {
                if (isNumeric(str)) {
                    return new Date(str);
                }
                str = isEmpty(str) ? "" : String(str);
                return new Date(str.replace(/-/g, "\/"));
            } catch (e) {
                return undefined;
            }
        },

        //  将字符串对象转换成 布尔(boolean) 值
        toBoolean: function (str) {
            if (!isString(str)) {
                return !!str;
            }
            str = isEmpty(str) ? "" : str.trim().toLowerCase();
            return str == "true"
                || str == "yes"
                || str == "right"
                || str == "real"
                || str == "really"
                || str == "genuine"
                || str == "checked"
                || str == "1"
                || str == "t"
                || str == "y"
                || str == "r"
                || str == "on"
                || str == "好"
                || str == "是"
                || str == "对"
                || str == "真"
                || str == "没错";
        },

        //  将字符串对象转换成 整数(int) 值
        toInteger: function (str) {
            return parseInt(str);
        },

        //  将字符串对象转换成 数值(Number)。
        toNumber: function (str) {
            str = isEmpty(str) ? "" : String(str).trim();
            return Number(str);
        },

        //  将字符串对象转换成 数值
        toNumeric: function (str) {
            return extras_string.toNumber(str);
        },

        //  将字符串对象转换成 浮点数(float) 值
        toFloat: function (str) {
            return parseFloat(str);
        },

        //  将字符串对象转换成 对象(Object) 值
        toObject: function (str) {
            if (!isString(str)) {
                return str;
            }
            var str = trim(str);
            try {
                var obj = eval("(" + str + ")");
                if (!obj) {
                    return parseJSON(str);
                }
                return obj;
            } catch (e) {
                return parseJSON(str);
            }
        },

        toJSONString: function (str) {
            if (isFunction(str)) {
                str = str.toString();
            }
            str = extras_string.isHtmlText(str)
                ? $(str).text()
                : str;
            return JSON.stringify(str);
        },

        //  将字符串对象转换成 函数(function) 值
        toFunction: function (str) {
            if (isFunction(str)) {
                return str;
            }
            str = isEmpty(str) ? "" : String(str).trim();
            if (!str.startsWith("function")) {
                str = "function(){" + str + "}";
            }
            var text = "{ \"func\": " + str + " }",
                obj = extras_string.toObject(text);
            return obj ? obj.func : undefined;
        }
    };

    var extras_date = {

        //  判断指定的对象是否为合法的日期(Date)格式对象；
        isDate: isDate,

        //  判断指定的对象是否为一个日期(Date)对象或者是一个日期格式的字符串。
        likeDate: function (date) {
            return extras_string.isDate(date);
        },
        
        //  判断指定的日期字符串是否是合法的长日期格式；
        //  该函数依赖于 $.array.isLongDate 函数。
        isLongDate: function (date) {
            return extras_string.isLongDate(date);
        },

        //  判断指定的日期字符串是否是合法的短日期格式；
        //  该函数依赖于 $.array.isShortDate 函数。
        isShortDate: function (date) {
            return extras_string.isShortDate(date);
        },

        //  判断指定的日期是否为闰年；该函数定义如下参数：
        //      date: 可以是一个 日期(Date) 对象，也可以是表示日期的字符串，或者是一个表示年份的数字。
        //  返回值：如果指定的日期是闰年，则返回 true，否则返回 false。
        isLeapYear: function (date) {
            var year = 0;
            if (isDate(date)) {
                year = new Date(date).getFullYear();
            } else if (isNumeric(date)) {
                year = date;
            } else {
                throw "传入的参数 date 的数据类型必须为 Date、String 或者 Number。";
            }
            return year >= 0
                ? (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
                : (year % 4 == 1 && year % 100 != 0) || (year % 400 == 1);
        },

        //  将 String 或 Number 类型值转换成 Date 类型值；
        //  返回值：该方法返回一个新创建的 Date 类型值；
        toDate: function (obj) {
            return extras_string.toDate(obj);
        },

        //  创建一个新的 日期(Date) 对象，返回的值与当前 日期对象 的值相同；
        clone: function (date) {
            var mills = extras_date.toDate(date).getTime()
            return new Date(mills);
        },

        //  比较两个日期对象的大小；该函数定义如下参数：
        //      date1: 第 1 个待比较的日期对象；
        //      date2: 第 2 个待比较的日期对象；
        //  返回值：如果 date1 > date2，则返回一个大于 0 的值；
        //      如果 date1 < date2，则返回一个小于 0 的值；
        //      如果 date1 == date2，则返回 0。
        compare: function (date1, date2) {
            date1 = extras_date.toDate(date1);
            date2 = extras_date.toDate(date2);
            var d1 = date1.getTime(),
                d2 = date2.getTime();
            return extras_util.compare(d1, d2);
        },

        //  比较两个日期对象是否相等；该函数定义如下参数：
        //      date1: 第 1 个待比较的日期对象；
        //      date2: 第 2 个待比较的日期对象；
        //  返回值：返回一个表示 date1、date2 是否相等的 boolean 值。
        equals: function (date1, date2) {
            return extras_date.compare(date1, date2) === 0;
        }



        // 农历(含年月日别称、闰月)、天干地支、节气、星座、节假日、生肖
        // 星期(含星期几、年第几周、月第几周)、季度
        // 时间单位: 毫秒, 秒, 分, 刻, 时, 日, 周, 月, 季, 年
        // 按时间单位设置、按时间单位增减、按时间单位比较、获取时间的指定单位部分值、按时间单位表达式格式化



    };

    var extras_number = {

        // 同 $.string.isNumber
        isNumber: isNumber,

        // 同 $.string.isNumeric
        isNumeric: isNumeric,

        // 同 $.string.likeNumber
        likeNumber: isNumeric,

        // 同 $.string.likeNumeric
        likeNumeric: isNumeric,


        //  把一个数字/浮点数舍入为指定精度的数值；该函数定义如下参数：
        //      num:    需要进行舍入计算的数值;
        //      precision:  舍入操作保留的精度(意即保留多少为小数)，默认为 0;
        round: function (num, precision) {
            if (!isNumeric(num)) {
                throw "传入的参数 num 必须是一个数值";
            }
            precision = isNumeric(precision) ? precision : 0;
            var str = new Number(num).toFixed(precision);
            return precision ? parseFloat(str) : parseInt(str);
        },

        //  获取或设置数值对象的精度；该函数定义如下重载：
        //      重载一：function(num)，该重载用于获取数值的精度，该重载定义如下参数：
        //              num:    需要获取精度的数值。
        //          返回值：返回数值 num 的精度(小数位数)。
        //      重载二：function(num, precision)，该重载用于设置数值的精度(即进行数值舍入操作)，该重载定义如下参数：
        //              num:    需要设置精度的数值。
        //              precision: 需要设置的精度。
        //          返回值：返回数值 num 按照指定的精度进行舍入操作后的值；
        //          备注：该重载会调用函数 $.number.round 进行数值舍入操作。
        precision: function (num, precision) {
            if (!isNumeric(num)) {
                throw "传入的参数 num 必须是一个数值";
            }
            if (isNumeric(precision)) {
                return extras_number.round(num, precision);
            } else {
                var str = String(num),
                    i = str.indexOf(".");
                return i == -1
                    ? 0
                    : str.length - str.indexOf(".") - 1;
            }
        },

        //  判断传入的数值是否是一个奇数；该函数定义如下参数：
        //      num:    需要判断的数值；
        //  返回值：如果传入的参数 num 是一个奇数，则返回 true，否则返回 false。
        isOdd: function (num) {
            return (num % 2) === 1;
        },

        //  判断传入的数值是否是一个偶数；该函数定义如下参数：
        //      num:    需要判断的数值；
        //  返回值：如果传入的参数 num 是一个偶数，则返回 true，否则返回 false。
        isEven: function (num) {
            return (num % 2) === 0;
        },
        
        //  将传入的数值转换成一个描述文件大小的字符串；该函数定义如下参数：
        //      num :  待转换格式的数值，表示文件大小字节数(B)
        //      flag:  待转换的格式，String 类型值，可选的值包括 "AUTO"(默认)、"B"、"KB"、"MB"、"GB"、"TB"、"PB"、"EB"、"ZB"、"NB"、"DB"
        toFileSize: function (num, flag) {
            num = Number(num);
            flag = trim(String(flag)).toUpperCase();
            var sepatators = FileSize_Sepatators,
                result = num,
                size = 1;
            if (!flag || !extras_array.contains(sepatators, flag, function (a, b) {
                return a[1] === b;
            })) {
                flag = "AUTO";
            }
            if (flag === "AUTO") {
                for (var i = sepatators.length - 1; i >= 0; i--) {
                    var item = sepatators[i]
                    if (num >= item[1]) {
                        size = item[1];
                        flag = item[0];
                        break;
                    }
                }
            } else {
                $.each(sepatators, function (i, item) {
                    if (item[0] === flag) {
                        size = item[1];
                        return false;
                    }
                });
            }
            return extras_number.round(num / size, 2) + flag;
        }

    };

    var extras_array = {

        // 判断对象是否是一个数组
        isArray: isArray,

        // 检测一个对象是否为一个数组对象或者类似于数组对象，同 $.util.arrayLike
        arrayLike: arrayLike,

        // 同 $.util.isArrayLike
        isArrayLike: isArrayLike,

        // 判断传入的 数组 是否为 Null 或者为空数组。
        isNullOrEmpty: isEmptyArray,

        // 判断是否为空数组对象, 如果传入的对象不是一个 array, 或者为 null、undefined, 或者 array.length, 该方法将返回 true
        isEmpty: isEmptyArray,

        // 判断是否为空数组对象, 如果传入的对象不是一个 array, 或者为 null、undefined, 或者 array.length, 该方法将返回 true. 同 $.array.isEmpty
        isEmptyArray: isEmptyArray,

        //  比较两个数组对象是否元素相同（不考虑元素顺序和重复元素情况）；该函数定义如下参数：
        //      array:  必需。 一个数组对象。
        //      anotherArray:  必需。 另一个数组对象。
        //  返回值：如果 array 与 anotherArray 中任何一个对象不是数组，或者其两者的 length 属性不同，或者其两者之一任何一个包含另外一个数组所不包含的元素，则返回 false，否则返回 true。
        equals: function (array, anotherArray) {
            if (array === anotherArray) {
                return true;
            }
            if (!isArray(array) || !isArray(anotherArray) || array.length != anotherArray.length) {
                return false;
            }
            var arr1 = extras_array.distinct(extras_array.clone(array)),
                arr2 = extras_array.distinct(extras_array.clone(anotherArray));
            return arr1.length === arr2.length && extras_array.unique(arr1, arr2).length === arr1.length;
        },

        //  将另一数组中的所有项复制到当前指定数组中，该函数定义如下参数：
        //      target: 目标数组，源数组 source 中的所有项将被赋值到该数组中；
        //      source: 源数据数组，该数组内的所有项将被赋值到目标数组 target 中；
        //  注意：该方法会改变目标数组 target 中的元素数量。
        //  返回值：源数组数据复制过来后的目标数组 target。
        copy: arrayCopy,

        // 同 $.array.copy
        copyFrom: arrayCopy,

        //  将当前指定数组中的所有项复制到另一数组中；该函数定义如下参数：
        //      source: 源数据数组，该数组内的所有项将被赋值到目标数组 target 中；
        //      target: 目标数组，源数组 source 中的所有项将被赋值到该数组中；
        //  注意：该方法会改变目标数组 target 中的元素数量。
        //  返回值：源数组数据复制过来后的目标数组 target
        copyTo: function (source, target) {
            return extras_array.copy(target, source);
        },

        //  创建一个和当前数组对象相同的数组并返回
        clone: function (source) {
            return extras_array.copy([], source);
        },

        // 清空数组中的所有元素, 注意: 该方法会改变现有的数组。
        clear: function (array) {
            if (!isArrayLike(array)) {
                throw "传入的参数 array 必须是一个数组";
            }
            core_splice.call(array, 0, array.length);
            return array;
        },

        // 颠倒数组中元素的顺序。
        // 返回值：返回传入的参数 array 本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
        // 注意：该方法会改变原来的数组，而不会创建新的数组。
        reverse: function (array) {
            array = isArrayLike(array) ? array : [];
            if (isArray(array)) {
                array.reverse();
                return array;
            }
            var len = array.length,
                l = len / 2,
                j;
            for (var i = 0; i < l; i++) {
                j = len - i - 1;
                var a = array[i],
                    b = array[j];
                array[i] = b;
                array[j] = a;
            }
            return array;
        },

        // 对 Array 排序。该函数定义如下参数:
        //      array       : 必需。 任意 Array 对象。
        //      sortFunction: 可选。 用来确定元素顺序的函数的名称。 如果省略 ASCII 字符顺序，则将按升序对这些元素进行排序。
        // 返回值: 已排序的源数组(该函数会改变源数组 array 中元素的顺序、而不会创建新数组)
        // 注意: sort 方法就地对 Array 对象进行排序；在执行过程中不会创建新 Array 对象。
        //      如果在 sortFunction 参数中提供一个函数，则该函数必须返回下列值之一：
        //      如果所传递的第一个参数小于第二个参数，则返回负值。
        //      如果两个参数相等，则返回零。
        //      如果第一个参数大于第二个参数，则返回正值。
        // 参考: https://msdn.microsoft.com/ZH-CN/library/4b4fbfhk(v=VS.94,d=hv.2).aspx
        sort: function (array, sortFunction) {
            return core_sort.call(array, sortFunction);
        },
        
        //  过滤查找当前数组中的元素，并返回查找的结果；返回的查找结果是一个新的数组；该函数定义如下参数：
        //      array: 必需。 一个数组对象。
        //      compare: 必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， filter 方法都会调用 callbackfn 函数一次。
        //          该回调函数的语法如：function callbackfn(value, index, array)；
        //          如果该回调函数返回 true，则该元素将被包含在返回的集合当中。
        //  返回值：一个包含回调函数为其返回 true 的所有值的新数组。 如果回调函数为 array 的所有元素返回 false，则新数组的长度为 0。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679973(v=vs.94).aspx
        filter: function (array, compare, thisArg) {
            array = isArrayLike(array) ? array : [];
            if (!isFunction(compare)) {
                return array;
            }
            var result = [];
            for (var i = 0; i < array.length; i++) {
                if (compare.call(thisArg, array[i], i, array) === true) {
                    result.push(array[i]);
                }
            }
            return result;
        },

        //  对数组的每个元素调用定义的回调函数并返回包含结果的数组；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， map 方法都会调用 callbackfn 函数一次。
        //          该回调函数语法如：function callbackfn(value, index, array1)；
        //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        //  返回值：其中的每个元素均为关联的原始数组元素的回调函数返回值的新数组。
        //  备注：对于数组中的每个元素， map 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。 不为数组中缺少的元素调用该回调函数。
        //      除了数组对象之外， map 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679976(v=vs.94).aspx
        map: arrayMap,

        // 对数组进行格式转换，将数组中的每一项转换成新的格式，然后合并成一个新的数组并返回
        // 同 $.array.map
        cast: arrayMap,

        //  在数组中搜索指定的项，并返回整个数组中第一个匹配项的从零开始的索引，该函数定义如下参数：
        //      array: 源数据数组；
        //      item:  要搜索的项；
        //      startIndex: 从零开始的搜索的起始索引，空列表中 0（零）为有效值；该参数可选；如果该参数未定义则从 0 开始；
        //      count: 要搜索的部分中的元素数；该参数可选，如果该参数未定义则搜索至数组的末尾；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "===" 进行值的匹配；
        //  返回值：如果在数组中从 startIndex 开始并包含 count 个元素的元素范围内找到 item 的第一个匹配项，则为该项的从零开始的索引；否则为 -1。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679977(v=vs.94).aspx
        indexOf: function (array, item, startIndex, count, compare) {
            array = isArrayLike(array) ? array : [];
            var result = -1;
            if (!array.length) {
                return result;
            }
            if (arguments.length > 2) {
                var c = arguments[arguments.length - 1];
                compare = isFunction(c) ? c : null;
                var s = arguments[2];
                startIndex = isNumeric(s) ? s : 0;
                if (startIndex < 0 || array.length < startIndex) {
                    return result;
                }
                if (arguments.length > 3) {
                    c = arguments[3];
                    count = isNumeric(c) ? c : array.length - startIndex;
                } else {
                    count = array.length - startIndex;
                }
                if (count < 0 || startIndex + count > array.length) {
                    return result;
                }
            } else {
                startIndex = 0;
                count = array.length - startIndex;
                compare = null;
            }
            var stopIndex = startIndex + count;
            for (var i = startIndex; i < stopIndex; i++) {
                if (extras_util.equals(array[i], item, compare)) {
                    result = i;
                    break;
                }
            }
            return result;
        },

        //  在数组中搜索指定的项，并返回整个数组中最后一个匹配项的从零开始的索引。
        //      array: 源数据数组；
        //      item:  要搜索的项；
        //      startIndex: 向后搜索的从零开始的起始索引；该参数可选；如果该参数未定义则从数组末尾开始；
        //      count: 要搜索的部分中的元素数；该参数可选，如果该参数未定义则搜索至数组的起始位置；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        //  返回值：如果在数组中包含 count 个元素、在 startIndex 处结尾的元素范围内找到 item 的最后一个匹配项，则为该项的从零开始的索引；否则为 -1。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679972(v=vs.94).aspx
        lastIndexOf: function (array, item, startIndex, count, compare) {
            array = isArrayLike(array) ? array : [];
            var result = -1;
            if (!array.length) {
                return result;
            }
            if (arguments.length > 2) {
                var c = arguments[arguments.length - 1];
                compare = isFunction(c) ? c : null;
                var s = arguments[2];
                startIndex = isNumeric(s) ? s : 0;
                if (startIndex < 0 || array.length < startIndex) {
                    return result;
                }
                if (arguments.length > 3) {
                    c = arguments[3];
                    count = isNumeric(c) ? c : array.length - startIndex;
                } else {
                    count = array.length - startIndex;
                }
                if (count < 0 || startIndex + count > array.length) {
                    return result;
                }
            } else {
                startIndex = 0;
                count = array.length - startIndex;
                compare = null;
            }
            var begin = array.length - startIndex - 1,
                end = begin - count;
            for (var i = begin; i > end; i--) {
                if (extras_util.equals(array[i], item, compare)) {
                    result = i;
                    break;
                }
            }
            return result;
        },

        //  确定指定的回调函数是否为数组中的任意一个元素返回 true；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   必需。 一个接受最多三个参数的函数。 some 方法会为 array1 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的结尾。
        //          该函数语法如：function callbackfn(value, index, array1)
        //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        //  返回值：如果 callbackfn 函数为数组中的任意一个元素返回 true，则为 true；否则为 false。
        //  异常：如果 callbackfn 参数不是函数对象，则将引发 TypeError 异常。
        //  备注：some 方法会按升序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 some 方法会立即返回 true。 如果回调不对任何元素返回 true，则 some 方法会返回 false。
        //      除了数组对象之外， some 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679978(v=vs.94).aspx
        some: function (array, callback, thisArg) {
            array = isArrayLike(array) ? array : [];
            if (!isFunction(callback)) {
                throw "传入的参数 callback 不是一个函数。";
            }
            for (var i = 0; i < array.length; i++) {
                if (callback.call(thisArg, array[i], i, array) === true) {
                    return true;
                }
            }
            return false;
        },

        // 为数组中的每个元素执行指定操作；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， forEach 都会调用 callbackfn 函数一次。
        //          该函数语法如：function callbackfn(value, index, array)；
        //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        //  返回值：返回传入的参数 array 本身。
        //  备注：对于数组中的每个元素， forEach 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。
        //      如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略。
        //      除了数组对象之外， forEach 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679980(v=vs.94).aspx
        forEach: function (array, callback, thisArg) {
            if (!isFunction(callback)) {
                throw "传入的参数 callback 不是一个函数。";
            }
            var length,
                i = 0;
            if (isArrayLike(array)) {
                length = array.length;
                for (; i < length; i++) {
                    if (callback.call(thisArg, array[i], i, array) === false) {
                        break;
                    }
                }
            } else {
                for (i in array) {
                    if (callback.call(thisArg, array[i], i, array) === false) {
                        break;
                    }
                }
            }
            return array;
        },

        //  对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   必需。 一个接受最多四个参数的函数。 对于数组中的每个元素， reduce 方法都会调用 callbackfn 函数一次。
        //          该回调函数语法如：function (previousValue, currentValue, currentIndex, array)
        //      initialValue:可选。 如果指定 initialValue，则它将用作初始值来启动累积。 第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
        //  返回值：通过最后一次调用回调函数获得的累积结果。
        //  异常：当满足下列任一条件时，将引发 TypeError 异常：
        //      1、callbackfn 参数不是函数对象。
        //      2、数组不包含元素，且未提供 initialValue。
        //  备注：如果提供了 initialValue，则 reduce 方法会对数组中的每个元素调用一次 callbackfn 函数（按升序索引顺序）。
        //      如果未提供 initialValue，则 reduce 方法会对从第二个元素开始的每个元素调用 callbackfn 函数。
        //      回调函数的返回值在下一次调用回调函数时作为 previousValue 参数提供。 最后一次调用回调函数获得的返回值为 reduce 方法的返回值。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679975(v=vs.94).aspx
        reduce: function (array, callback, initialValue) {
            if (!isFunction(callback)) {
                throw "传入的参数 callback 不是一个函数";
            }
            array = isArrayLike(array) ? array : [];
            if (!array.length && initialValue === undefined) {
                throw "数组不包含元素，且未提供 initialValue";
            }
            var index = 0;
            if (initialValue == undefined) {
                initialValue = array[0];
                index = 1;
            }
            for (var i = index; i < array.length; i++) {
                initialValue = callback.call(this, initialValue, array[i], i, array);
            }
            return initialValue;
        },

        //  按降序顺序对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   必需。 一个接受最多四个参数的函数。 对于数组中的每个元素， reduce 方法都会调用 callbackfn 函数一次。
        //          该回调函数语法如：function (previousValue, currentValue, currentIndex, array)
        //      initialValue:可选。 如果指定 initialValue，则它将用作初始值来启动累积。 第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
        //  返回值：通过最后一次调用回调函数获得的累积结果。
        //  异常：当满足下列任一条件时，将引发 TypeError 异常：
        //      1、callbackfn 参数不是函数对象。
        //      2、数组不包含元素，且未提供 initialValue。
        //  备注：如果提供了 initialValue，则 reduceRight 方法会按降序索引顺序对数组中的每个元素调用一次 callbackfn 函数。
        //      如果未提供 initialValue，则 reduceRight 方法会按降序索引顺序对每个元素（从倒数第二个元素开始）调用 callbackfn 函数。
        //      回调函数的返回值在下一次调用回调函数时作为 previousValue 参数提供。 最后一次调用回调函数获得的返回值为 reduceRight 方法的返回值。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679979(v=vs.94).aspx
        reduceRight: function (array, callback, initialValue) {
            if (!isFunction(callback)) {
                throw "传入的参数 callback 不是一个函数";
            }
            array = isArrayLike(array) ? array : [];
            if (!array.length && initialValue === undefined) {
                throw "数组不包含元素，且未提供 initialValue";
            }
            var index = array.length - 1;
            if (initialValue === undefined) {
                initialValue = array[array.length - 1];
                index = array.length - 2;
            }
            for (var i = index; i > -1; i--) {
                initialValue = callback.call(this, initialValue, array[i], i, array);
            }
            return initialValue;
        },

        //  确定数组的所有成员是否满足指定的测试；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   必需。 一个接受最多三个参数的函数 function (value, index, array) this -> thisArg。
        //                  every 方法会为 array1 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 false，或直到到达数组的结尾。
        //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        //  返回值：如果 callbackfn 函数为所有数组元素返回 true，则为 true；否则为 false。 如果数组没有元素，则 every 方法将返回 true。
        //  备注：除了数组对象之外， every 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
        //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679981(v=vs.94).aspx
        every: function (array, callback, thisArg) {
            array = isArrayLike(array) ? array : [];
            if (!array.length) {
                return true;
            }
            if (!isFunction(callback)) {
                throw "传入的参数 callback 不是一个函数。";
            }
            for (var i = 0; i < array.length; i++) {
                if (callback.call(thisArg, array[i], i, array) === false) {
                    return false;
                }
            }
            return true;
        },

        //  获取数组中最大值的项；该函数定义如下参数:
        //      array: 待查找的源数组；
        //      compare: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
        //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
        //              如果 a > b ，则返回一个 大于 0 的值；
        //              如果 a < b ，则返回一个 小于 0 的值；
        //              如果 a == b，则返回 0；
        //      如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
        max: function (array, compare) {
            array = isArrayLike(array) ? array : [];
            if (!array.length) {
                return undefined;
            }
            if (array.length === 1) {
                return array[0];
            }
            return extras_array.reduce(extras_array.range(array, 1),
                function (prev, current, index, array) {
                    return extras_util.compare(prev, current, compare) > 0 ? prev : current;
                }, array[0]);
        },

        //  获取数组中值等于最大值的集合数组；该函数的参数定义和 $.array.max 相同；
        //  该函数返回的是一个新的数组，即使查找到的结果只有一项；
        maxs: function (array, compare) {
            array = isArrayLike(array) ? array : [];
            if (!array.length) {
                return [];
            }
            var sorted = extras_array.sort(array, compare),
                i = extras_array.lastIndexOf(sorted, sorted[sorted.length - 1], function (a, b) {
                    return extras_util.compare(a, b, compare) !== 0;
                });
            return extras_array.range(sorted, i + 1);
        },

        //  获取数组中最小值的项；该函数的参数定义和 $.array.max 相同；
        min: function (array, compare) {
            array = isArrayLike(array) ? array : [];
            if (!array.length) {
                return undefined;
            }
            if (array.length === 1) {
                return array[0];
            }
            return extras_array.reduce(extras_array.range(array, 1),
                function (prev, current, index, array) {
                    return extras_util.compare(prev, current, compare) < 0 ? prev : current;
                }, array[0]);
        },

        //  获取数组中值等于最小值的集合；该函数的参数定义和 $.array.max 相同；
        //  该函数返回的是一个新的数组，即使查找到的结果只有一项；
        mins: function (array, compare) {
            array = isArrayLike(array) ? array : [];
            if (!array.length) {
                return [];
            }
            var sorted = extras_array.sort(array, compare),
                i = extras_array.indexOf(sorted, sorted[0], function (a, b) {
                    return extras_util.compare(a, b, compare) !== 0;
                });
            return extras_array.range(sorted, 0, i);
        },

        //  计算数组中各项累加后的合计值；该函数定义如下参数:
        //      array:  源数据数组
        //      callback: 转换函数，该函数被循环调用，用于将 array 中的每一项转换成一个新的数值并输出；如果定义该函数，则其必须返回一个数值；该参数可选；
        //          该函数的签名应该是 function (item) { }，参数 item 表示源数组中的项；
        //          如果不定义该参数，则默认将 array 中的每一项直接相加。
        //      thisArg:    可选。 可在 callback 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        sum: function (array, callback, thisArg) {
            return extras_array.reduce(array,
                isFunction(callback) ?
                    function (prev, current) {
                        return prev + callback.call(thisArg, current);
                    } :
                    function (prev, current) {
                        return prev + current;
                    },
                0);
        },

        //  计算数组中各项累积后的平均值；该函数参数的定义和 coreArray.sum 一样；
        avg: function (array, callback, thisArg) {
            array = isArrayLike(array) ? array : [];
            var sum = extras_array.sum(array, callback, thisArg),
                avg = parseFloat(sum) / array.length;
            return avg;
        },

        //  从数组的开头返回指定数量的连续元素构成的新数组；该函数定义如下参数:
        //      array: 源数据数组；
        //      count: 要提取的元素项的数量，必须是一个正整数；该参数可选；如果不传入该参数或传入的值超出范围，则默认为 1。
        take: function (array, count) {
            return extras_array.range(array, 0, count);
        },

        //  跳过数组中指定数量的元素，然后返回剩余元素构成的新数组；该函数定义如下参数：
        //      array: 源数据数组；
        //      count: 返回剩余元素前要跳过的元素数量，必须是一个非负整数；该参数可选；如果不传入该参数或传入的值为负数，则默认为 0。
        skip: function (array, count) {
            return extras_array.range(array, count);
        },

        //  获取指定数组的前 N 项元素所构成的一个新数组；该函数定义如下参数：
        //      array:  必需。 一个数组对象。
        //      length: 必须。 一个 Number 类型值，表示要获取的项的数量；
        //  返回值：返回指定的数组对象 array 的前面长度为 length 的元素所构成的一个新的数组。
        //      如果 length 的值为 0，则返回一个空数组；
        //      如果 length 的值大于 array.length，则返回 array 的一个副本；
        left: function (array, length) {
            array = isArrayLike(array) ? array : [];
            if (!length || !isNumeric(length) || length <= 0 || !array.length) {
                return [];
            }
            if (length >= array.length) {
                return extras_array.clone(array);
            }
            return extras_array.range(array, 0, length);
        },

        //  获取指定数组的后 N 项元素所构成的一个新数组；该函数定义如下参数：
        //      array:  必需。 一个数组对象。
        //      length: 必须。 一个 Number 类型值，表示要获取的项的数量；
        //  返回值：返回指定的数组对象 array 的后面长度为 length 的元素所构成的一个新的数组。
        //      如果 length 的值为 0，则返回一个空数组；
        //      如果 length 的值大于 array.length，则返回 array 的一个副本；
        right: function (array, length) {
            array = isArrayLike(array) ? array : [];
            if (!length || !isNumeric(length) || length <= 0 || !array.length) {
                return [];
            }
            if (length >= array.length) {
                return extras_array.clone(array);
            }
            return extras_array.range(array, array.length - length);
        },

        //  查找指定数组中第一个符合条件判定的项会将其返回；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   可选。 一个接受最多三个参数的函数。 first 方法会为 array 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的结尾。
        //          该函数语法如：function callbackfn(value, index, array1)
        //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        //  返回值：如果定义了参数 callbackfn ，返回 array 中第一个导致回调函数 callback 返回 true 的项目；
        //      如果未定义参数 callback，则返回 array 中的第一个元素；
        //      如果数组 array 不包含任何元素，或者 callback 回调函数遍历完 array 中所有元素后始终未返回 true 值，则 first 方法返回 null。
        //  备注：first 方法会按升序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 first 方法会立即返回该元素。 如果回调不对任何元素返回 true，则 first 方法会返回 undefined。
        //      除了数组对象之外， first 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
        first: function (array, callback, thisArg) {
            array = isArrayLike(array) ? array : [];
            if (!isFunction(callback)) {
                return array.length ? array[0] : undefined;
            }
            for (var i = 0; i < array.length; i++) {
                if (callback.call(thisArg, array[i], i, array) === true) {
                    return array[i];
                }
            }
            return undefined;
        },

        //  查找指定数组中最后一个符合条件判定的项会将其返回；该函数定义如下参数：
        //      array:      必需。 一个数组对象。
        //      callback:   可选。 一个接受最多三个参数的函数。 last 方法会从 array 的结束位置其为它的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的起始位置。
        //          该函数语法如：function callbackfn(value, index, array1)
        //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
        //  返回值：如果定义了参数 callbackfn ，返回 array 中最后一个导致回调函数 callback 返回 true 的项目；
        //      如果未定义参数 callback，则返回 array 中的最后一个元素；
        //      如果数组 array 不包含任何元素，或者 callback 回调函数遍历完 array 中所有元素后始终未返回 true 值，则 last 方法返回 null。
        //  备注：last 方法会按降序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 last 方法会立即返回该元素。 如果回调不对任何元素返回 true，则 last 方法会返回 undefined。
        //      除了数组对象之外， last 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
        last: function (array, callback, thisArg) {
            array = isArrayLike(array) ? array : [];
            if (!isFunction(callback)) {
                return array.length ? array[array.length - 1] : undefined;
            }
            for (var i = array.length - 1; i >= 0; i--) {
                if (callback.call(thisArg, array[i], i, array) === true) {
                    return array[i];
                }
            }
            return undefined;
        },
        
        //  提取指定数组中介于两个指定索引号之间的元素构成的一个新的数组；该函数定义如下参数：
        //      array: 源数据数组；
        //      startIndex: 必需。一个大于或等于 0 的整数，规定从何处开始选取，从 0 开始计数。
        //      stopIndex: 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 startIndex 到数组结束的所有元素。
        //  返回值：返回一个新的数组，包含从 startIndex 到 stopIndex （不包括该元素）的 arrayObject 中的元素。
        range: function (array, startIndex, stopIndex) {
            array = isArrayLike(array) ? array : [];
            startIndex = isNumeric(startIndex) ? startIndex : 0;
            if (startIndex < 0) {
                startIndex = 0;
            }
            stopIndex = isNumeric(stopIndex) ? stopIndex : array.length;
            if (stopIndex < 0 || stopIndex > array.length) {
                stopIndex = array.length;
            }
            return core_slice.call(array, startIndex, stopIndex);
        },

        //  提取指定数组中从 startIndex 位置开始后指定数量的元素构成的一个新的数组；该函数定义如下参数：
        //      array: 源数据数组；
        //      startIndex: 一个非负的整数，规定要提取的起始位置的索引号；
        //      length: 一个非负的整数，规定要提取的元素的数量；该参数可选，如果不定义该参数，则一直提取到数组的末尾；
        //  返回值：返回一个新的数组，包含从 startIndex 处开始后长度为 length 的所有元素。
        rangeLen: function (array, startIndex, length) {
            startIndex = isNumeric(startIndex) ? startIndex : 0;
            length = isNumeric(length) ? length : array.length;
            var stopIndex = startIndex + length;
            return extras_array.range(array, startIndex, stopIndex);
        },

        //  将另一数组中的元素复制到当前数组中一定范围的元素上；该函数定义如下参数：
        //      array: 源数据数组；
        //      index: 从 0 开始的数组索引，从该位置开始赋值 collect 元素；该参数可选，如果不定义该参数，则默认为数组的末尾；
        //      collect: 要将其元素赋值到 array 中，该数组本身不能为 null，但它可以包含为null 的元素。
        //  返回值：返回设置元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
        //  注意：该方法会改变现有数组中的项。
        setRange: function (array, index, collect) {
            if (!isArrayLike(array)) {
                throw "传入的参数 array 必须是一个数组";
            }
            index = isNumeric(index) ? index : 0;
            if (index < 0 || array.length < index) {
                throw "ArgumentOutOfRangeException: 传入的索引号 index 超出数组 array 的范围。";
            }
            collect = isArrayLike(collect) ? collect : [];
            extras_array.removeRange(array, collect.length);
            return extras_array.insertRange(array, index, collect);
        },

        //  对指定的数组进行分页处理，并返回分页后的结果；该函数定义如下参数：
        //      array: 源数据数组；
        //      pageIndex: 一个非负整数，表示要返回的数据所在页面的索引号，从 0 开始计算；该参数可选，如果未定义该参数或不合法，则默认为 0；
        //      pageSize: 一个非负整数，表示每一个分页页面的尺寸，即每页有多少行记录；该参数可选，如果未定义该参数或不合法，则默认为 10；
        //          sortby: 用于排序的比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
        //              该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
        //              如果 a > b ，则返回一个 大于 0 的值；
        //              如果 a < b ，则返回一个 小于 0 的值；
        //              如果 a == b，则返回 0；
        //          如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
        //  该函数返回一个具有如下属性的 JSON 对象：
        //      pageSize:   一个非负整数，表示每一个分页页面的尺寸，即每页有多少行记录；
        //      pageIndex:  一个非负整数，表示返回的数据所在页面的索引号，从 0 开始计算；
        //      rowCount:   一个非负整数，表示返回的数据的未分页前的总行数；
        //      data:       一个数组，为传入的参数 array 的子集，表示分页后的页面数据；
        //      pageCount:  一个非负整数，表示源数据数组分页后的总页面数量；
        //      pageNumber: 一个非负整数，表示返回的数据所在的页面的序号，从 1 开始计算；同 pageIndex + 1；
        //      total:      一个非负整数，同 rowCount。
        splitPage: function (array, pageIndex, pageSize, sortby) {
            array = isArrayLike(array) ? array : [];
            if (!pageIndex || !isNumeric(pageIndex) || pageIndex < 0) {
                pageIndex = 0;
            }
            if (!pageSize || !isNumeric(pageSize) || pageSize < 1) {
                pageSize = 10;
            }
            array = isFunction(sortby)
                ? extras_array.clone(array).sort(sortby)
                : array;
            var startIndex = pageIndex * pageSize,
                stopIndex = (pageIndex + 1) * pageSize,
                data = extras_array.range(array, startIndex, stopIndex),
                rowCount = array.length,
                pageCount = Math.ceil(parseFloat(rowCount) / pageSize),
                pageNumber = pageIndex + 1,
                total = rowCount;
            return {
                pageSize: pageSize,
                pageIndex: pageIndex,
                rowCount: rowCount,
                data: data, pageCount: pageCount,
                pageNumber: pageNumber,
                total: total
            };
        },

        //  从数组中移除一定范围的元素，该函数定义如下参数：
        //      array: 源数据数组；
        //      index: 要移除的元素的范围从零开始的起始索引；该参数可选，如果不定义该参数则默认为 0；
        //      count: 要移除的元素数；该参数可选，如果不定义该参数则默认为从 index 起始位置一直到数组的末尾，可以为 0。
        //  注意：该方法会改变现有的数组。
        removeRange: function (array, index, count) {
            if (!isArrayLike(array)) {
                throw "传入的参数 array 必须是一个数组";
            }
            index = isNumeric(index) ? index : 0;
            count = isNumeric(count) && count >= 0 ? count : array.length;
            core_splice.call(array, index, count);
            return array;
        },

        //  移除数组中的指定索引位置的项；该函数定义如下参数：
        //      array: 源数据数组，被移除的项包含在该数组中；
        //      index: 指定的索引位置，当检测到源数据数组中存在该索引项时，则移除源数据中的该索引项。
        //  注意：该方法会改变现有的数组。
        removeAt: function (array, index) {
            return extras_array.removeRange(array, index, 1);
        },

        //  移除数组中的指定项；该函数定义如下参数：
        //      array: 源数据数组，被移除的项包含在该数组中；
        //      item: 被移除的项，当检测到源数据数组中存在该项时，则移除源数据中的该项；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        //  注意：该方法会改变现有的数组。
        remove: function (array, item, compare) {
            var index = extras_array.indexOf(array, item, compare);
            if (index < 0) {
                return array;
            }
            return extras_array.removeAt(array, index);
        },

        //  将另一个数组插入到当前数组的指定索引处；该方法定义如下参数：
        //      array: 源数据数组；
        //      index: 应插入 item 的位置的零始索引；
        //      collect:  包含要插入的元素的数组；该值可以为 null。
        //  返回值：返回插入元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
        //  注意：该方法会改变现有的数组。
        insertRange: function (array, index, collect) {
            if (!isArrayLike(array)) {
                throw "传入的参数 array 必须是一个数组";
            }
            collect = isArrayLike(collect) ? collect : [collect];
            if (!isNumeric(index) || index < 0 || index > array.length) {
                throw "ArgumentOutOfRangeException: 传入的索引号 index 超出数组 array 的范围。";
            }
            var part = extras_array.range(array, index);
            extras_array.removeRange(array, index);
            extras_array.copy(array, collect);
            extras_array.copy(array, part);
            return array;
        },

        //  将元素插入数组的指定索引处；该方法定义如下参数：
        //      array: 源数据数组；
        //      index: 应插入 item 的位置的零始索引；
        //      item:  要插入的元素；该值可以为 null。
        //  返回值：返回插入元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
        //  注意：该方法会改变现有的数组。
        insert: function (array, index, item) {
            var collect = [item];
            return extras_array.insertRange(array, index, collect);
        },

        //  确认数组中是否包含指定的元素。该函数定义如下参数：
        //      array: 被检测的数组；
        //      item: 被检测的元素，判断该元素是否存在于数组 array 中；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        contains: function (array, item, compare) {
            return extras_array.some(array, function (val) {
                return extras_util.equals(val, item, compare);
            });
        },

        //  如果源数组中不存在指定的项，则将该项添加到源数组中；该方法提供如下参数：
        //      array: 源数据数组；
        //      item: 将要被合并到源数组中的项，如果源数组中不存在该项，则将其添加至源数组；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        //  返回值：返回添加元素后的数组对象本身。
        //  注意：该方法会改变现有的数组。
        attach: function (array, item, compare) {
            if (!extras_array.contains(array, item, compare)) {
                array.push(item);
            }
            return array;
        },

        //  合并两个或多个数组；该方法提供如下参数:
        //      array: 初始源数组，之后所有的项都将被合并入该数组；
        //      item1: 第 1 个待合并项；
        //      item2: 第 2 个待合并项；
        //      item3: 第 3 个待合并项；
        //      itemn... 第 n 个待合并项；
        //  如果要进行 merge 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
        //  返回值：返回合并多个数组(元素)后的数组对象本身。
        //  注意：该方法会改变现有的数组，item1、item2、item3、itemn...等所有的参数项将被合并入 array 数组。
        merge: function (array, item1, item2, itemn) {
            if (!isArrayLike(array)) {
                throw "传入的参数 array 必须是一个数组对象。";
            }
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    var arg = arguments[i];
                    extras_array.copy(array, isArrayLike(arg) ? arg : [arg]);
                }
            }
            return array;
        },
        
        //  去除数组中重复项；该方法提供如下参数:
        //      array: 源数据数组；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        //  返回值：返回去除重复元素后的数组对象本身。
        //  注意：该方法会改变现有的数组。
        distinct: function (array, compare) {
            if (!isArrayLike(array)) {
                throw "传入的参数 array 必须是一个数组对象。";
            }
            if (!array.length) {
                return array;
            }
            var elems = extras_array.reduce(array, function (pre, now, index, arr) {
                if (!extras_array.contains(pre, now, compare)) {
                    pre.push(now);
                }
                return pre;
            }, []);
            extras_array.removeRange(array, 0);
            extras_array.copy(array, elems);
            return array;
        },

        //  合并两个或多个数组，重复项将不会被合并；该方法提供如下参数:
        //      array: 初始源数组；
        //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        //      item1: 第 1 个待合并项；
        //      item2: 第 2 个待合并项；
        //      item3: 第 3 个待合并项；
        //      itemn... 第 n 个待合并项；
        //  如果要进行 unique 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
        //  返回值：返回合并多个数组(元素)后的数组对象本身。
        //  注意：该方法会改变现有的数组，item1、item2、item3、itemn...等所有的参数项将被合并入 array 数组。
        //  该方法与 $.array.merge 方法的区别在于：
        //      merge 方法会将源数组与所有的 item 进行合并；
        //      unique 方法会判断源数组中是否存在相应的 item，如果存在则不合并；并且如果源数组中本身的元素如果存在重复，也会进行 distinct 处理。
        unique: function (array, compare, item1, item2, itemn) {
            var args = extras_array.clone(arguments);
            // args.callee = arguments.callee;
            if (isFunction(compare)) {
                extras_array.removeAt(args, 1);
            }
            extras_array.merge.apply(this, args);
            extras_array.distinct(array, isFunction(compare) ? compare : null);
            return array;
        }
    };

    var extras_boolean = {};

    var extras_jquery = {

        //  获取浏览器的名称以及版本号。判断浏览器版本示例：
        //      判断浏览器是否为 IE    : $.browser.msie == true
        //      判断浏览器是否为 Chrome: $.browser.chrome == true
        //  判断浏览器版本号：$.browser.version，IE下可能的值为 6.0/7.0/8.0/9.0/10.0 等等。
        browser: createBrowserAgent(),

        union: union,

        // 同 $.util.parseJSON
        parseJSON: parseJSON,

        // 同 $.util.escapeSelector
        escapeSelector: escapeSelector

    };

    var extras_util = {

        version: version,
        document: document,
        docElem: docElem,
        location: location,
        history: history,

        // 同 $.array.merge
        merge: extras_array.merge,

        // 同 $.array.unique
        unique: extras_array.unique,

        union: union,

        //  同 extras_jquery.browser
        browser: extras_jquery.browser,

        // 获取指定对象的类型, 同 $.type
        type: core_type,

        // 测试对象是否是窗口(有可能是Frame), 同 $.isWindow
        isWindow: isWindow,

        // 测试对象是否是字符串(String)类型值
        isString: isString,

        // 测试对象是否是日期(Date)类型值。
        isDate: isDate,

        // 判断对象是否是数值(Number)类型
        isNumber: isNumber,

        // 测试对象是否是数值或数值格式的字符串
        // 方法检查它的参数是否代表一个数值。如果是这样，它返回 true。否则，它返回false。该参数可以是任何类型的
        isNumeric: isNumeric,

        likeNumber: isNumeric,

        likeNumeric: isNumeric,

        // 测试对象是否是数组(Array)。
        isArray: isArray,

        // 测试对象是否是布尔(Boolean)类型值
        isBoolean: isBoolean,

        // 测试对象是否是 jQuery 对象
        isJqueryObject: function (obj) {
            return obj !== null
                && obj !== undefined
                && (obj.constructor === $$.constructor || (obj.jquery ? true : false));
        },

        // 判断对象是否是一个空的 jQuery 对象(不包含任何 DOM 元素，即 length = 0)
        isEmptyJquery: function (obj) {
            return extras_util.isJqueryObject(obj) && !obj.length;
        },

        // 将一个 DOM 对象或者表达式解析为 jQuery 对象
        // 如果该对象本身就已经是一个 jQuery 对象，则直接将其返回
        wrapJquery: function (obj) {
            return extras_util.isJqueryObject(obj) ? obj : $(obj);
        },

        // 测试对象是否是正则表达式(RegExp)。
        isRegExp: isRegExp,

        // 测试传入的参数是否是一个 javscript 对象；
        isObject: isObject,

        //  测试对象是否是函数, 同 $.isFunction
        isFunction: isFunction,

        isNumeric: isNumeric,

        // 判断对象是否为 "未定义" 值(即 undefined)
        isUndefined: function (obj) {
            return obj === undefined || typeof obj === "undefined";
        },

        // 判断对象是否为空(Null)值
        isNull: function (obj) {
            return obj === null;
        },

        // 判断对象是否为 "未定义" 值(即 undefined)或空(Null)值
        isNullOrUndefined: function (obj) {
            return extras_util.isUndefined(obj) || extras_util.isNull(obj);
        },

        // 测试对象是否是空对象(不包含任何属性), 同 $.isEmptyObject
        // 这个方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使用hasOwnProperty)
        isEmptyObject: isEmptyObject,

        // 测试对象是否为空(不包含任何属性的空对象、null、undefined、空字符串、全空格)
        // 这个方法既检测对象本身的属性，也检测从原型继承的属性（因此没有使用hasOwnProperty）
        isEmpty: isEmpty,

        // 判断是否为空数组对象, 如果传入的对象不是一个 array, 或者为 null、undefined, 或者 array.length, 该方法将返回 true. 同 $.array.isEmpty
        isEmptyArray: isEmptyArray,

        // 测试对象是否是纯粹的对象(通过 "{}" 或者 "new Object" 创建的), 同 $.isPlainObject
        isPlainObject: isPlainObject,
        
        //  判断指定的对象是否为一个 HTML-DOM 对象；该函数定义如下参数：
        //      obj：    要判断的对象；
        //      doc：    该参数可选；表示 obj 所在页面的 document；如果不定义该参数，则默认使用当前页面的 document；
        //  返回值：如果 obj 是一个 HTML-DOM 对象且存在于指定的 document 中，则返回 true；否则返回 false。
        isDOM: function (obj, doc) {
            if (!obj) {
                return false;
            }
            return !!obj.nodeName
                && obj.nodeType === 1
                && obj.ownerDocument === (doc || document);
        },

        //  判断指定的对象是否为一个包含 HTML-DOM 对象的 jQuery 对象；该函数定义如下参数：
        //      obj：    要判断的对象；
        //      doc：    该参数可选；表示 obj 所在页面的 document；如果不定义该参数，则默认使用当前页面的 document；
        //  返回值：如果 obj 是一个包含 HTML-DOM 对象的 jQuery 对象且存在于指定的 document 中，则返回 true；否则返回 false。
        isJqueryDOM: function (obj, doc) {
            if (!extras_util.isJqueryObject(obj) || !obj.length) {
                return false;
            }
            for (var i = 0; i < obj.length; i++) {
                if (extras_util.isDOM(obj[i], doc)) {
                    return true;
                }
            }
            return false;
        },

        // 测试对象不为 "未定义" 值(即 undefined)、空(Null)值、Boolean-False值、空字符串值或数字 0 中的任何一种
        isPositive: function (obj) {
            return obj ? true : false;
        },

        // 判断对象是否为 "未定义" 值(即 undefined)、空(Null)值、Boolean-False值、空字符串值或数字 0 中的一种
        isNegative: function (obj) {
            return obj ? false : true;
        },

        parseJSON: parseJSON,

        // 定义一个空函数, 同 $.noop
        noop: noop,

        // 去除字符串左右两边的空格, 并返回处理后的一个新字符串副本, 同 $.string.trim
        trim: trim,

        // 这个方法通常被用在类选择器或者ID选择器中包含一些CSS特殊字符的时候，这个方法基本上与CSS中CSS.escape()方法类似，唯一的区别是jquery中的这个方法支持所有浏览器
        escapeSelector: escapeSelector,

        //  提取 JSON 对象指定名称列表的属性, 并返回该 JSON 对象的一个新副本, 该函数提供如下重载方式:
        //      function (obj, fn): 根据指定的回调函数规则提取 json 对象的属性
        //      function (obj, properties): 根据指定的属性名称列表提取 json 对象的属性
        //      以上重载中, 各参数定义如下:
        //      obj: 待操作的 JSON 对象, 可以是 JSON-Object、Array 或者 Function 等类型
        //      fn : 签名为 function (obj, name, value) => this -> obj 的回调函数
        //      properties:需要从 obj 中提取的属性名称列表, 该参数的类型为一个数组对象，数组中的每一项都是一个 String 类型值
        //  返回值: 返回一个 JSON Object，该对象为传入的 obj 提取指定列表所示属性值后的一个新 JSON-Object 副本
        filterProperties: function (obj, properties) {
            if (obj === undefined || obj === null) {
                return obj;
            }
            var result = {},
                isFun = isFunction(properties);
            $.each(obj, function (key, value) {
                if (isFun) {
                    if (properties.call(value, obj, key, value)) {
                        result[key] = value;
                    }
                } else {
                    if (extras_array.contains(properties, key)) {
                        result[key] = value;
                    }
                }
            });
            return result;
        },

        //  排除 JSON 对象指定名称列表的属性, 并返回该 JSON 对象的一个新副本, 该函数提供如下重载方式:
        //      function (obj, fn): 根据指定的回调函数规则排除 json 对象的属性
        //      function (obj, properties): 根据指定的属性名称列表排除 json 对象的属性
        //      以上重载中, 各参数定义如下:
        //      obj: 待操作的 JSON 对象, 可以是 JSON-Object、Array 或者 Function 等类型
        //      fn : 签名为 function (obj, name, value) 回调函数
        //      properties:需要从 obj 中排除的属性名称列表, 该参数的类型为一个数组对象，数组中的每一项都是一个 String 类型值
        //  返回值: 返回一个 JSON Object，该对象为传入的 obj 排除指定列表所示属性值后的一个新 JSON-Object 副本
        excludeProperties: function (obj, properties) {
            var callback = isFunction(properties)
                ? function () {
                    return !properties.apply(this, arguments);
                }
                : function (obj, key, value) {
                    return !extras_array.contains(properties, key);
                };
            return extras_util.filterProperties(obj, callback);
        },


        // 检测一个对象是否为一个数组对象或者类似于数组对(具有数组的访问方式：具有 length 属性、且具有属性名为数字的索引访问器)
        // 注意：此方法传入 字符串 时执行，也会返回 true，因为 字符串 是一个字符数组
        arrayLike: arrayLike,

        // 检测一个对象是否为一个数组对象或者类似于数组对（具有数组的访问方式：具有 length 属性、且具有属性名为数字的索引访问器）且不是字符串
        isArrayLike: isArrayLike,

        //  定义默认的对象比较函数，该函数返回一个 bool 值表示传入的两个对象是否等值。
        equalsCompare: function (a, b) {
            return a === b;
        },

        //  定义默认的数值比较函数，该函数返回一个 int 值，该返回值的意义如下：
        //      如果大于 0，则表示 a > b；
        //      如果小于 0，则表示 a < b；
        //      如果等于 0，则表示 a == b。
        numericCompare: function (a, b) {
            if (!isNumber(a)) {
                a = parseFloat(a, 10);
            }
            if (!isNumber(b)) {
                b = parseFloat(b, 10);
            }
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        },

        //  确认两个 javascript 对象是否等值，该函数定义如下参数:
        //      a: 待比较的对象1；
        //      b: 待比较的对象2，用于和对象1进行比较；
        //      compare: 用于比较运算的函数，该函数用于比较 a 是否与 b 等值；该函数返回一个 bool 值；这是一个可选参数。
        //          该函数的签名应该是 function (a, b) { }，参数 a 表示源数组中的项、b 表示要进行比较的项；
        //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        //  返回值：如果 a 与 b 等值，则返回 true，否则返回 false。
        equals: function (a, b, compare) {
            if (!isFunction(compare)) {
                compare = extras_util.equalsCompare;
            }
            return compare.call(this, a, b) === true;
        },

        //  比较两个 javascript 对象的大小，该函数定义如下参数：
        //      a: 待比较的对象1；
        //      b: 待比较的对象2，用于和对象1进行比较；
        //      compare: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
        //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
        //              如果 a > b ，则返回一个 大于 0 的值；
        //              如果 a < b ，则返回一个 小于 0 的值；
        //              如果 a == b，则返回 0；
        //          如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
        //  返回值：如果 a > b ，则返回一个 大于 0 的值；
        //          如果 a < b ，则返回一个 小于 0 的值；
        //          如果 a == b，则返回 0；
        compare: function (a, b, compare) {
            if (!isFunction(compare)) {
                compare = extras_util.numericCompare;
            }
            return compare.call(this, a, b);
        },

        
        // 表示当前应用程序所嵌套的虚拟目录的层数。默认为 0，表示未嵌套虚拟目录。
        rootDepth: rootDepth,

        // 获取当前页面 url 参数。
        // 返回值：该方法返回一个数组，数组中的每个元素都是一个 JSON 对象，该 JSON 对象包含如下属性：
        //     name:   表示 url 参数的名称；
        //     value:  表示 url 参数的值；
        // 也可以通过数组访问器快速访问某个特定名称的参数值，方法如：$.util.getRequest()["id"]。
        getRequest: getRequest,

        // 获取当前应用程序的完整主机地址部分，返回的结果格式如( http://127.0.0.1 )
        getHostPath: getHostPath,

        //  返回当前应用程序（含站点名或者虚拟目录路径）的完整根路径。
        //  该方法依赖于全局参数 $.util.rootDepth 的值。
        //      $.util.rootDepth 该全局参数表示 虚拟目录 的层数。
        //      $.util.rootDepth 参数设置正确，该方法方能返回正确的结果。
        //      $.util.rootDepth 默认值为 0，即应用程序没有设置虚拟目录。
        getRootPath: getRootPath,

        // 获取当前页面 url 参数, 同 $.util.getRequest()
        request: request,

        // 获取当前应用程序的完整主机地址部分, 同 $.util.getHostPath()
        hostPath: hostPath,

        // 返回当前应用程序（含站点名或者虚拟目录路径）的完整根路径, 同 $.util.getRootPath()
        rootPath: rootPath,

        // 返回当前页面不带参数的完整路径
        currentUri: currentUri,

        // 返回当前页面所在目录的完整路径。
        currentPath: currentPath,
        

        // 根据传入的 uri 地址返回该 uri 相对于应用程序的完整客户端访问url地址。
        //      传入的 uri 地址应为相对于应用程序根路径的完整地址
        //      该方法依赖于当前文件的 $.util.rootPath 属性
        resolveClientUrl: resolveClientUrl,

        // 根据传入的 uri 地址返回该 uri 相对于应用程序的完整客户端访问url地址, 同 $.util.resolveClientUrl
        resolveUrl: resolveClientUrl,


        // 关闭当前浏览器窗口，同 window.close
        closeWindow: window.close,

        // 在不弹出关闭提示确认的情况下直接关闭当前浏览器窗口。
        closeForce: closeForce,

        // 在不弹出关闭提示确认的情况下直接关闭当前浏览器窗口, 同 $.util.closeForce
        closeWindowForce: closeForce,

        
        // 屏蔽当前页面的 HTML 源代码 (该方法目前尚存在 bug，不建议使用)
        disableSourceCode: function () {
            var source = document.body.innerHTML;  //获取文档的原有内容
            document.open();                 //打开文档
            document.close();                //关闭文档
            document.body.innerHTML = source;  //重新写入旧内容
        },

        // 屏蔽当前页面的鼠标右键默认事件,而调用指定的回调函数
        // 如果回调函数为空，则点击鼠标右键没有任何反应
        disableContxtMenu: function (callback) {
            document.oncontextmenu = function (e) {
                e.preventDefault();
                if (extras_util.type(callback) === "function") {
                    callback.apply(this, arguments);
                }
            };
        },


        //  对某个对象及其所有可见属性进行多次嵌套递归循环调用某个方法；该函数定义如下参数：
        //      obj:    目标对象
        //      call:   要被针对目标对象循环调用的方法
        //      depth:  嵌套的层数
        recursion: function (obj, callback, depth) {
            if (!isFunction(callback)) {
                return;
            }
            if (!isNumber(depth) || depth < 0) {
                depth = 1;
            }
            var result = {
                result: callback.call(this, obj)
            };
            if (depth === 0) {
                return result;
            }
            var properties = result.properties = [];
            for (var key in obj) {
                properties.push({
                    name: key,
                    value: obj[key],
                    result: extras_util.recursion.call(this, obj[key], callback, depth - 1)
                });
            }
            return result;
        },

        //  阻止向对象添加新属性 (通过递归方式模拟 Object.preventExtensions 方法执行)
        preventExtensions: function (obj, depth) {
            extras_util.recursion.call(this, obj, Object.preventExtensions, depth);
            return obj;
        },

        //  阻止修改现有属性的特性，并阻止添加新属性 (通过递归方式模拟 Object.seal 方法执行)
        seal: function (obj, depth) {
            extras_util.recursion.call(this, obj, Object.seal, depth);
            return obj;
        },

        //  阻止修改现有属性的特性和值，并阻止添加新属性 (通过递归方式模拟 Object.freeze 方法执行)
        freeze: function (obj, depth) {
            extras_util.recursion.call(this, obj, Object.freeze, depth);
            return obj;
        },


        // 通过向 html-header 动态创建 script 标签的方式执行一段 js 脚本，脚本执行完后自动将动态创建的 script 删除，该方法定义如下参数:
        //      code: 被动态执行的 js 脚本
        //      doc:  用于执行该脚本的上下文 document 对象，如果未传入该参数，则默认取当前 window.document 对象
        // 返回值: 该方法返回动态自动创建的、并在后续被自动删除的 script 标签对象
        evalDOM: function (code, doc) {
            doc = doc || document;
            var script = doc.createElement("script");
            script.text = code;
            doc.head.appendChild(script).parentNode.removeChild(script);
            return script;
        },

        //  动态引入一个或多个 javascript 脚本文件至当前页面文档，并在所有脚本引入成功后调用指定的回调函数。
        //  参数 url 表示需要载入的 javascript 脚本路径；如果需要一次性载入多个脚本，则 url 可以是一个数组，数组中每个元素表示 javascript 脚本路径。
        loadJs: function (url, callback) {
            if (isArrayLike(url)) {
                var scripts = [];
                for (var i = 0; i < url.length; i++) {
                    var js = loadJs(url[i], i === url.length - 1 ? callback : null);
                    scripts.push(js);
                }
                return scripts;
            } else {
                return loadJs(url, callback);
            }
        },

        //  一次性执行一个后多个 javascript 脚本文件，并在所有脚本加载并执行成功后调用指定的回调函数。
        //  参数 url 表示需要载入的 javascript 脚本路径；如果需要一次性载入多个脚本，则 url 可以是一个数组，数组中每个元素表示 javascript 脚本路径。
        runJs: function (url, callback) {
            return loadJs(url, function (script) {
                document.head.removeChild(script);
                if (isFunction(callback)) {
                    callback.apply(this, arguments);
                }
            });
        },

        //  动态引入一个或多个 css 样式表文件至当前页面文档，并在引入成功后调用指定的回调函数。
        loadCss: function (url, callback) {
            if (isArrayLike(url)) {
                var links = [];
                for (var i = 0; i < url.length; i++) {
                    var link = loadCss(url[i], i === url.length - 1 ? callback : null);
                    links.push(link);
                }
                return links;
            } else {
                return loadCss(url, callback);
            }
        },


        //  在指定的毫秒数后调用函数或计算表达式；该函数定义如下参数：
        //      code:       必需。要调用的函数后要执行的 JavaScript 代码串。
        //      millisec:   可选。在执行代码前需等待的毫秒数。
        //  模拟 setTimeout/setImmediate 方法。
        //  备注：如果不传入参数 millisec 或该参数值为 0，则自动调用 setImmediate(该方法相对于 setTimeout 可以有效降低浏览器资源开销) 方法；
        delay: function (code, millisec) {
            if (!code) {
                return;
            }
            var handler = isFunction(code)
                ? code
                : extras_string.toFunction ? extras_string.toFunction(code) || code : code;
            var a = {};
            return !millisec && window.setImmediate
                ? {
                    id: window.setImmediate(handler),
                    called: window.setImmediate,
                    clear: window.clearImmediate
                }
                : {
                    id: window.setTimeout(handler, millisec),
                    called: window.setTimeout,
                    clear: window.clearTimeout
                };
        },

        //  取消由 $.util.delay 方法设置的函数延迟调用等待；该函数定义如下参数：
        //      id_of_delay: 必须。要取消的延迟等待函数调用的 handle 值（该值由方法 $.util.delay 返回）。
        //      undelayJust: 可选。Boolean 类型值，表示要取消的延迟函数是否为即时调用函数（即通过 $.util.delay 设定该函数时未传入 millisec 值或 millisec 值为 0。）；该参数默认为 false。
        //  模拟 clearTimeout/clearImmediate 方法。
        //  备注：如果不传入参数 id_of_delay 或该参数值为 0，则不执行任何动作。
        undelay: function (id_of_delay, undelayJust) {
            if (!id_of_delay) {
                return;
            }
            if (isFunction(id_of_delay.clear) && id_of_delay.id) {
                return id_of_delay.clear(id_of_delay.id);
            }
            undelayJust = undelayJust === null || undelayJust === undefined
                ? false
                : !!undelayJust;
            if (undelayJust) {
                return window.clearImmediate
                    ? window.clearImmediate(id_of_delay)
                    : window.clearTimeout(id_of_delay);
            } else {
                return window.clearTimeout(id_of_delay);
            }
        },

        //  以 try...catch... 方式执行指定的函数代码块；该函数提供如下重载方式:
        //      function (options):该重载中，参数 options 表示一个 JSON-Object.
        //          格式如 { code: function|string , error: function|string , final: function|string , tryError: boolean , tryFinal: boolean }
        //          其中 code 表示将被 try 块执行的函数代码块.
        //               error 表示在 code 执行出错时将执行的代码块.
        //               final 表示在 code 和 error 执行完成后将执行的代码块.
        //               tryError 指定 error 是否同样以 try...catch... 方式执行.
        //               tryFinal 指定 final 是否同样以 try...catch... 方式执行.
        //      function (code, error, final): 该重载将会被自动转换成 function ({ code: code, error: error, final: finall, tryError: false, tryFinal: false }) 方式执行；
        //  返回值：{ code: Function, error: Function, final: Function, result: Object, errorObj: Object, finalObj: Object, executed: Object }
        exec: function (code, error, final) {
            var defaults = { code: null, error: null, final: null },
                opts = isFunction(code)
                    ? { code: code, error: error, final: final }
                    : code ? $.extend(defaults, code) : null,
                result = $.extend({ executed: {} }, opts);
            if (!opts || !opts.code) {
                return result;
            }
            if (!isFunction(opts.code)) {
                opts.code = opts.code ? extras_util.toFunction(opts.code) : opts.code;
            }
            try {
                if (isFunction(opts.code)) {
                    result.executed.code = opts.code;
                    result.reslut = opts.code.call(this, result);
                }
            } catch (e) {
                if (isFunction(opts.error)) {
                    result.executed.error = opts.error;
                    result.exception = e;
                    result.errorObj = extras_util.exec(opts.error);
                }
            } finally {
                if (isFunction(opts.final)) {
                    result.executed.final = opts.final;
                    result.finalObj = extras_util.exec(opts.final);
                }
            }
            return result;
        },

        //  判断指定的 window 对象是否具有可访问的父级页面；
        //  返回值：返回一个 boolean 值；
        //      当前页面在一个 FRAME/IFRAME 中且父级页面和当前页面同域，则返回 true；
        //      当前页面不是在一个 FRAME/IFRAME 中或父级页面和当前页面不同域，则返回 false。
        hasParent: hasParent,

        // 判断指定的 window 是否存在可访问的父级页面（即被判断的 window 处于 IFRAME 中且和父级页面处于同一域中）、且父级页面中也引入了 jQuery；
        hasParentJquery: hasParentJquery,

        //  获取指定 window 对象的可访问(同域)的父级页面；
        //  返回值：返回一个 window 对象
        //      当前页面在一个 FRAME/IFRAME 中且父级页面和当前页面同域，则返回父级页面的 window 对象；
        //      当前页面不是在一个 FRAME/IFRAME 中或父级页面和当前页面不同域，则返回 undefined。
        getParent: getParent,

        // 获取指定 window 对象的可访问(同域)的父级页面的 jQuery 函数对象
        // 返回值：返回一个 jQuery 函数对象，如果该页面没有父级页面、或者父级页面不可访问(跨域)、或者父级页面没有引入 jQuery，则返回 undefined
        getParentJquery: getParentJquery,

        //  获取指定 window 对象的可访问(同域)的顶级页面；
        //  返回值：该方法递归查找当前页面上级的 window 对象并返回.
        //      如果当前页面处于 FRAME/IFRAME 中且父级页面和当前页面同域，则返回父级(递归查找直至同域的顶级页面)页面的 window 对象；
        //      当前页面不是在一个 FRAME/IFRAME 中或父级页面和当前页面不同域，则返回当前页面的 window 对象
        getTop: getTop,

        // 获取指定 window 对象的可访问(同域)的顶级页面的 jQuery 函数对象；
        // 返回值：返回一个 jQuery 函数对象，如果该页面没有顶级页面、或者顶级页面不可访问(跨域)、或者顶级页面没有引入 jQuery，则返回 undefined
        getTopJquery: getTopJquery,

        // 同方法 $.util.getParent() 的返回值
        parent: parent,

        // 同方法 $.util.getParentJquery() 的返回值
        parentJquery: parentJquery,

        // 同方法 $.util.getTop() 的返回值
        top: top,

        // 同方法 $.util.getTopJquery() 的返回值
        topJquery: topJquery,


        // 判断指定 window 对象是否是当前浏览器窗体的顶级 window 对象(跨域验证)
        // 返回值: 返回 boolean 类型值, 如果当前 window 为浏览器窗体的顶级 window 对象则返回 true, 否则返回 false
        verifyIsTopMost: verifyIsTopMost,

        // 判断指定 window 对象是否是当前浏览器窗体的顶级 window 对象(同域验证)
        // 返回值: 返回 boolean 类型值
        //      如果当前 window 为浏览器窗体的顶级 window 对象、或者其自身虽然处于 frame/iframe 中但与父页面跨域, 则返回 true, 否则返回 false
        verifyIsSameDomainTopMost: verifyIsSameDomainTopMost,
        
        // 同方法 $.util.verifyIsTopMost() 的返回值
        isTopMost: verifyIsTopMost(),

        // 同方法 $.util.verifyIsSameDomainTopMost() 的返回值
        isSameDomainTopMost: verifyIsSameDomainTopMost()

        
    };

    var extras_html5 = {};
    
    var extras_full = extrasJquery.jdirk = extrasJquery.extras = {
        string: extrasString,
        date: extrasDate,
        number: extrasNumber,
        array: extrasArray,
        boolean: extrasBoolean,
        util: extrasUtil,
        h5: extrasHtml5,
        html5: extrasHtml5,
        nullable: extrasNullable
    };
    


    function isIPv4(str) {
        str = isEmpty(str) ? "" : String(str);
        var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (reSpaceCheck.test(str)) {
            str.match(reSpaceCheck);
            if (RegExp.$1 <= 255 && RegExp.$1 >= 0
                && RegExp.$2 <= 255 && RegExp.$2 >= 0
                && RegExp.$3 <= 255 && RegExp.$3 >= 0
                && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function arrayCopy(target, source) {
        target = isArrayLike(target) ? target : [];
        source = isArrayLike(source) ? source : [];
        core_push.apply(target, source);
        return target;
    }
    function arrayMap(array, callback, thisArg) {
        array = isArrayLike(array) ? array : [];
        if (!isFunction(callback)) {
            throw "传入的参数 callback 不是一个函数。";
        }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = callback.call(thisArg, array[i], i, array);
            temps.push(item);
        }
        return temps;
    }

    function getRequest() {
        var search = location.search;
        if (search.substr(0, 1) === "?") {
            search = search.substr(1, search.length - 1);
        }
        var result = [];
        if (search.length > 0) {
            var params = search.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var pos = param.indexOf("=");
                var name = param.substring(0, pos);
                var value = param.substr(pos + 1);
                result.push({ name: name, value: value });
                result[name] = value;
            }
        }
        return result;
    }
    function getHostPath() {
        var href = location.href,
            pathname = location.pathname;
        return href.substr(0, href.lastIndexOf(pathname));
    }
    function getRootPath(hostPath, depth) {
        var result = isString(hostPath) ? hostPath : getHostPath(),
            pathname = location.pathname;
        if (pathname.indexOf("/") > -1) {
            var paths = pathname.split("/"),
                temps = [];
            for (var i = 0; i < paths.length; i++) {
                if (paths[i].length > 0) {
                    temps.push(paths[i]);
                }
            }
            depth = isNumeric(hostPath)
                ? hostPath
                : (isNumeric(depth) ? depth : extras_util.rootDepth);
            for (var j = 0; j < depth && j < temps.length; j++) {
                result += "/" + temps[j];
            }
        }
        return result;
    }
    function resolveClientUrl(url) {
        url = url + "";
        if (isEmpty(url) || extras_string.isUrl(url)) {
            return url;
        }
        url = extras_string.replaceAll(url, "\\", "/");
        while (url.substring(0, 2) === "./" || url.substring(0, 1) === "/") {
            url = url.substring(1, url.length);
        }
        var tmps1 = extras_util.rootPath.split("/"),
            tmps2 = url.split("/");
        while (tmps1.length > 3 && tmps2.length > 1 && tmps2[0] === "..") {
            tmps1.pop();
            tmps2.shift();
        }
        while (tmps2.length > 1 && tmps2[0] === "..") {
            tmps2.shift();
        }
        return tmps1.join("/") + "/" + tmps2.join("/");
    }
    function closeForce() {
        extras_util.top.opener = null;
        extras_util.top.open("", "_self", "");
        extras_util.top.close();
    }
    
    function loadJs(url, callback) {
        var done = false,
            script = document.createElement("script");
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = url;
        if (isFunction(callback)) {
            script.onload = script.onreadystatechange = function () {
                if (!done && (script.readyState === "complete" || script.readyState === "loaded")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;

                    var args = extras_array.clone(arguments);
                    extras_array.insertRange(args, 0, [script, url]);
                    // args.callee = arguments.callee;
                    callback.apply(this, args);
                }
            };
        }
        document.head.appendChild(script);
        return script;
    }
    function loadCss(url, callback) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.head.appendChild(link);
        if (isFunction(callback)) {
            callback.call(link, link, url);
        }
        return link;
    }

    function createBrowserAgent() {
        var matched = userAgentMatch(window.navigator.userAgent),
            browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        return browser;
    }
    function userAgentMatch(userAgent) {
        userAgent = (userAgent + "").toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(userAgent)
            || /(webkit)[ \/]([\w.]+)/.exec(userAgent)
            || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent)
            || /(msie) ([\w.]+)/.exec(userAgent)
            || userAgent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent)
            || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    }

    function hasParent(win) {
        try {
            var context = win || window,
                p = context ? context.parent : null;
            return isWindow(p) && context != p;
        } catch (e) {
            return false;
        }
    }
    function hasParentJquery(win) {
        try {
            var context = win || window,
                p = context ? context.parent : null;
            return isWindow(p) && context != p && isFunction(p.jQuery || p.$);
        } catch (e) {
            return false;
        }
    }

    function getParent(win) {
        try {
            var context = win || window,
                p = context ? context.parent : null;
            return (isWindow(p) && context != p)
                ? p
                : undefined;
        } catch (e) {
            return undefined;
        }
    }
    function getParentJquery(win) {
        var p = getParent(win);
        return p && isFunction(p.jQuery || p.$)
            ? (p.jQuery || p.$)
            : undefined;
    }

    function getTop(win) {
        var result = win || window,
            parent = getParent(result);
        while (parent) {
            result = parent;
            parent = getParent(result);
        }
        return result;
    }
    function getTopJquery(win) {
        var t = getTop(win);
        return t && isFunction(t.jQuery || t.$)
            ? (t.jQuery || t.$)
            : undefined;
    }

    function verifyIsTopMost(win) {
        try {
            var context = win || window;
            return context === context.top;
        } catch (e) {
            return false;
        }
    }
    function verifyIsSameDomainTopMost(win) {
        var context = win || window;
        return context === getTop(win);
    }



    union(extras_string, {});

    union(extras_date, {});

    union(extras_number, {});

    union(extras_array, {});

    union(extras_boolean, {});

    union(extras_jquery, {});

    union(extras_util, {});

    union(extras_html5, {});



    var original_string = {},
        original_date = {},
        original_number = {},
        original_array = {},
        original_boolean = {},

        original_string_methods = [
            "anchor",
            "big",
            "blink",
            "bold",
            "charAt",
            "charCodeAt",
            "codePointAt",
            "concat",
            "endsWith",
            "fixed",
            "fontcolor",
            "fontsize",
            "includes",
            "indexOf",
            "italics",
            "lastIndexOf",
            "link",
            "localeCompare",
            "match",
            "normalize",
            "padEnd",
            "padStart",
            "repeat",
            "replace",
            "search",
            "slice",
            "small",
            "split",
            "startsWith",
            "strike",
            "sub",
            "substr",
            "substring",
            "sup",
            "toLocaleLowerCase",
            "toLocaleUpperCase",
            "toLowerCase",
            "toString",
            "toUpperCase",
            "trim",
            "trimLeft",
            "trimRight",
            "valueOf"
        ],
        original_date_methods = [
            "getDate",
            "getDay",
            "getFullYear",
            "getHours",
            "getMilliseconds",
            "getMinutes",
            "getMonth",
            "getSeconds",
            "getTime",
            "getTimezoneOffset",
            "getUTCDate",
            "getUTCDay",
            "getUTCFullYear",
            "getUTCHours",
            "getUTCMilliseconds",
            "getUTCMinutes",
            "getUTCMonth",
            "getUTCSeconds",
            "getYear",
            "setDate",
            "setFullYear",
            "setHours",
            "setMilliseconds",
            "setMinutes",
            "setMonth",
            "setSeconds",
            "setTime",
            "setUTCDate",
            "setUTCFullYear",
            "setUTCHours",
            "setUTCMilliseconds",
            "setUTCMinutes",
            "setUTCMonth",
            "setUTCSeconds",
            "setYear",
            "toDateString",
            "toGMTString",
            "toISOString",
            "toJSON",
            "toLocaleDateString",
            "toLocaleString",
            "toLocaleTimeString",
            "toString",
            "toTimeString",
            "toUTCString",
            "valueOf"
        ],
        original_number_methods = [
            "toExponential",
            "toFixed",
            "toLocaleString",
            "toPrecision",
            "toString",
            "valueOf"
        ],
        original_array_methods = [
            "concat",
            "copyWithin",
            "entries",
            "every",
            "fill",
            "filter",
            "find",
            "findIndex",
            "forEach",
            "includes",
            "indexOf",
            "join",
            "keys",
            "lastIndexOf",
            "map",
            "pop",
            "push",
            "reduce",
            "reduceRight",
            "reverse",
            "shift",
            "slice",
            "some",
            "sort",
            "splice",
            "toLocaleString",
            "toString",
            "unshift"
        ],
        original_boolean_methods = [
            "toString",
            "valueOf"
        ],

        basic_original_methods_array = [
            { basic: String, original: original_string, methods: original_string_methods },
            { basic: Date, original: original_date, methods: original_date_methods },
            { basic: Number, original: original_number, methods: original_number_methods },
            { basic: Array, original: original_array, methods: original_array_methods },
            { basic: Boolean, original: original_boolean, methods: original_boolean_methods }
        ];

    // 扩展 original_string、original_date、original_number、original_array、original_boolean, 使这些对象分别具有 String、Date、Number、Array、Boolean 对象的成员 属性/ 方法 作为其静态 属性/ 方法
    (function (items) {
        $.each(items, function (i, item) {
            var basic = item.basic,
                prototype = basic.prototype,
                methods = item.methods,
                original = item.original;
            $.each(methods, function (j, name) {
                var method = prototype[name];
                if (!isFunction(method) || original[name]) {
                    return;
                }
                original[name] = function () {
                    var thisArg = arguments[0],
                        args = core_slice.call(arguments, 1);
                    // args.callee = arguments.callee;
                    return method.apply(thisArg, args);
                };
            });
        });
    }(basic_original_methods_array));

    // 扩展 $.string、$.date、$.number、$.array、$.boolean，使这些对象分别具有 String、Date、Number、Array、Boolean 对象的成员 属性/方法 作为其静态 属性/方法
    union(extrasString, original_string);
    union(extrasDate, original_date);
    union(extrasNumber, original_number);
    union(extrasArray, original_array);
    union(extrasBoolean, original_boolean);
    
    union(extrasString, extras_string);
    union(extrasDate, extras_date);
    union(extrasNumber, extras_number);
    union(extrasArray, extras_array);
    union(extrasBoolean, extras_boolean);
    union(extrasJquery, extras_jquery);
    union(extrasUtil, extras_util);

    union(extrasJquery, extras_full);

    // 扩展 $.string、$.date、$.number、$.array、$.boolean，使这些对象的静态方法能够以实例方法的形式被调用
    (function (items) {
        $.each(items, function (i, extras) {
            var fn = extras.fn;
            $.each(extras, function (name, method) {
                if (!isFunction(method)) {
                    return;
                }
                if (!fn[name]) {
                    fn[name] = function () {
                        var args = extras_array.clone(arguments);
                        extras_array.insert(args, 0, this);
                        return method.apply(extras, args);
                    };
                }
            });
        });
    }([extrasString, extrasDate, extrasNumber, extrasArray, extrasBoolean, extrasJquery]));


    union(String, extrasString);
    union(String.prototype, extrasString.fn);
    union(Date, extrasDate);
    union(Date.prototype, extrasDate.fn);
    union(Number, extrasNumber);
    union(Number.prototype, extrasNumber.fn);
    union(Array, extrasArray);
    union(Array.prototype, extrasArray.fn);
    union(Boolean, extrasBoolean);
    union(Boolean.prototype, extrasBoolean.fn);

    union($, extrasJquery);
    union($.fn, extrasJquery.fn);

    // union($, extrasArray);
    // union($.fn, extrasArray.fn);

    return extrasJquery;
});