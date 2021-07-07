/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI messager Extensions
* jQuery EasyUI messager 组件扩展
* jeasyui.extensions.messager.js
* 二次开发 流云
* 最近更新：2015-03-19
*
* 依赖项：jquery.jdirk.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.easyui");


    $.easyui.messager = $.util.isUtilTop ? $.messager : ($.util.$ && $.util.$.messager ? $.util.$.messager : $.messager);

    var defaults = {
        title: "操作提醒",
        yes: "是",
        no: "否",
        ok: "确定",
        cancel: "取消",
        icon: "info",
        position: "topCenter",
        confirmMsg: "您确认要进行该操作？",
        solicitMsg: "您确认要进行该操作？",
        promptMsg: "请输入：",
        progressMsg: "正在处理，请稍等...",
        progressText: "正在处理，请稍等...",
        buttonsboxMsg: "您确认要进行该操作？",
        interval: 300
    };

    if ($.messager.defaults) {
        $.extend($.messager.defaults, defaults);
    } else {
        $.messager.defaults = defaults;
    }

    $.messager.icons = {
        "error": "messager-error",
        "info": "messager-info",
        "question": "messager-question",
        "warning": "messager-warning"
    };
    $.messager.original = {
        show: $.messager.show,
        alert: $.messager.alert,
        confirm: $.messager.confirm,
        prompt: $.messager.prompt,
        progress: $.messager.progress
    };



    // 重写 $.messager.show 方法，使其支持图标以及默认的单个字符串参数的重载；该方法提供如下重载：
    //      function (msg)
    //      function (title, msg)
    //      function (title, msg, icon)
    //      function (title, msg, icon, position)
    //      function (options)，options 的格式如 { title, msg, icon, position }
    // 上述重载的命名参数中：
    //      msg     :
    //      title   :
    //      icon    :
    //      options :
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.show = function (options) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            return arguments.length == 1
                ? $.messager.show({ msg: arguments[0] })
                : $.messager.show({ title: arguments[0], msg: arguments[1], icon: arguments[2], position: arguments[3] });
        }
        var positions = {
            topLeft: { showType: "show", style: { right: '', left: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: '' } },
            topCenter: { showType: "slide", style: { right: '', top: document.body.scrollTop + document.documentElement.scrollTop, bottom: '' } },
            topRight: { showType: "show", style: { left: '', right: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: '' } },
            centerLeft: { showType: "fade", style: { left: 0, right: '', bottom: '' } },
            center: { showType: "fade", style: { right: '', bottom: '' } },
            centerRight: { showType: "fade", style: { left: '', right: 0, bottom: '' } },
            bottomLeft: { showType: "show", style: { left: 0, right: '', top: '', bottom: -document.body.scrollTop - document.documentElement.scrollTop } },
            bottomCenter: { showType: "slide", style: { right: '', top: '', bottom: -document.body.scrollTop - document.documentElement.scrollTop } },
            bottomRight: { showType: "show" }
        },
            position = arguments[0].position || $.messager.show.defaults.position,
            opts = $.extend({}, $.messager.show.defaults, positions[position], arguments[0] || {});

        var icon = $.messager.icons[opts.icon];
        opts.msg = "<div class='messager-icon " + icon + "'></div><div>" + String(opts.msg) + "</div>";
        return $.messager.original.show(opts);
    };
    $.union($.messager.show, $.messager.original.show);

    $.messager.show.defaults = {
        title: defaults.title,
        icon: defaults.icon,
        position: defaults.position
    };



    // 重写 $.messager.alert 方法，使其支持如下的多种重载方式：
    //      function (msg)
    //      function (msg, handler)
    //      function (title, msg)
    //      function (title, msg, icon)
    //      function (title, msg, handler)
    //      function (title, msg, icon, handler)
    //      function (options)，options 的格式如 { title, msg, icon, handler }
    // 上述重载的命名参数中：
    //      title   :
    //      msg     :
    //      icon    :
    //      handler :
    //      options :
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.alert = function (title, msg, icon, handler) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            if (arguments.length == 1) {
                return $.messager.alert({ msg: arguments[0] });
            }
            if (arguments.length == 2) {
                var options = $.isFunction(arguments[1])
                    ? { msg: arguments[0], handler: arguments[1] }
                    : { title: arguments[0], msg: arguments[1] };
                return $.messager.alert(options);
            }
            if (arguments.length == 3) {
                var options = $.isFunction(arguments[2])
                    ? { title: arguments[0], msg: arguments[1], handler: arguments[2] }
                    : { title: arguments[0], msg: arguments[1], icon: arguments[2] };
                return $.messager.alert(options);
            }
            if (arguments.length > 3) {
                return $.messager.alert({ title: arguments[0], msg: arguments[1], icon: arguments[2], handler: arguments[3] });
            }
        }
        var opts = $.extend({}, $.messager.alert.defaults, arguments[0] || {});
        return opts.handler
            ? $.messager.original.alert(opts.title, opts.msg, opts.icon, opts.handler)
            : $.messager.original.alert(opts.title, opts.msg, opts.icon);
    };
    $.union($.messager.alert, $.messager.original.alert);

    $.messager.alert.defaults = {
        title: defaults.title,
        icon: defaults.icon
    };



    // 重写 $.messager.confirm 方法，使其支持如下的多种重载方式：
    //      function (msg)
    //      function (msg, handler)
    //      function (title, msg)
    //      function (title, msg, handler)
    //      function (options)，options 为格式如 { title, msg, handler } 的 JSON-Object
    // 上述重载的命名参数中：
    //      title   :
    //      msg     :
    //      handler :
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.confirm = function (title, msg, handler) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            if (arguments.length == 1) {
                return $.messager.confirm({ msg: arguments[0] });
            }
            if (arguments.length == 2) {
                var options = $.isFunction(arguments[1])
                    ? { msg: arguments[0], handler: arguments[1] }
                    : { title: arguments[0], msg: arguments[1] };
                return $.messager.confirm(options);
            }
            if (arguments.length > 2) {
                return $.messager.confirm({ title: arguments[0], msg: arguments[1], handler: arguments[2] });
            }
        }
        var opts = $.extend({}, $.messager.confirm.defaults, arguments[0] || {});
        return opts.handler
            ? $.messager.original.confirm(opts.title, opts.msg, opts.handler)
            : $.messager.original.confirm(opts.title, opts.msg);
    };
    $.union($.messager.confirm, $.messager.original.confirm);

    $.messager.confirm.defaults = {
        title: defaults.title,
        msg: defaults.confirmMsg
    };



    // 重写 $.messager.prompt 方法，使其支持如下的多种重载方式：
    //      function (msg)
    //      function (msg, handler)
    //      function (title, msg)
    //      function (title, msg, handler)
    //      function (options)，options 的格式如 { title, msg, handler }
    // 上述重载的命名参数中：
    //      title   :
    //      msg     :
    //      handler :
    //      options :
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.prompt = function (title, msg, handler) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            if (arguments.length == 1) {
                return $.messager.prompt({ msg: arguments[0] });
            }
            if (arguments.length == 2) {
                var options = $.isFunction(arguments[1])
                    ? { msg: arguments[0], handler: arguments[1] }
                    : { title: arguments[0], msg: arguments[1] };
                return $.messager.prompt(options);
            }
            if (arguments.length > 2) {
                return $.messager.prompt({ title: arguments[0], msg: arguments[1], handler: arguments[2] });
            }
        }
        var opts = $.extend({}, $.messager.prompt.defaults, arguments[0] || {});
        return opts.handler
            ? $.messager.original.prompt(opts.title, opts.msg, opts.handler)
            : $.messager.original.prompt(opts.title, opts.msg);
    };
    $.union($.messager.prompt, $.messager.original.prompt);

    $.messager.prompt.defaults = {
        title: defaults.title,
        msg: defaults.promptMsg
    };



    // 重写 $.messager.progress 方法，使其支持如下的多种重载方式：
    //      function (msg)
    //      function (msg, interval)
    //      function (title, msg)
    //      function (title, msg, text)
    //      function (title, msg, interval)
    //      function (title, msg, text, interval)
    //      function (title, msg, interval, text)
    //      function (options)，options 的格式如 { title, msg, text, interval }
    //      function (method)，method 为 String 类型，其值限定为 "bar" 或 "close"
    // 上述重载的命名参数中：
    //      msg     :
    //      title   :
    //      text    :
    //      interval:
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.progress = function (title, msg, text, interval) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            if (arguments.length == 1) {
                var msg = arguments[0], tmp = String(msg).toLowerCase(), str = $.trim(tmp);
                return (str == "bar" || str == "close")
                    ? $.messager.original.progress(str)
                    : $.messager.progress({ msg: msg });
            }
            if (arguments.length == 2) {
                var options = $.isNumeric(arguments[1])
                    ? { msg: arguments[0], interval: arguments[1] }
                    : { title: arguments[0], msg: arguments[1] };
                return $.messager.progress(options);
            }
            if (arguments.length == 3) {
                var options = $.isNumeric(arguments[2])
                    ? { title: arguments[0], msg: arguments[1], interval: arguments[2] }
                    : { title: arguments[0], msg: arguments[1], text: arguments[2] };
                return $.messager.progress(options);
            }
            if (arguments.length > 3) {
                var options = $.isNumeric(arguments[3])
                    ? { title: arguments[0], msg: arguments[1], text: arguments[2], interval: arguments[3] }
                    : { title: arguments[0], msg: arguments[1], text: arguments[3], interval: arguments[2] };
                return $.messager.progress(options);
            }
        }
        var opts = $.extend({}, $.messager.progress.defaults, arguments[0] || {});
        return $.messager.original.progress(opts);
    };
    $.union($.messager.progress, $.messager.original.progress);

    $.messager.progress.defaults = {
        title: defaults.title,
        msg: defaults.progressMsg,
        text: defaults.progressText,
        interval: defaults.interval
    };



    // 增加 $.messager.buttonsbox 方法，该方法用于创建一个包含多个按钮的对话框，点击对话框中的任意按钮，以执行指定的回调函数；
    // 该方法提供如下方式重载：
    //      function (buttons)
    //      function (buttons, handler)
    //      function (msg, buttons)
    //      function (msg, buttons, handler)
    //      function (title, msg, buttons)
    //      function (title, msg, buttons, handler)
    //      function (options)，options 的格式如 { title, msg, buttons, closeOnClick, handler, width, height }
    //  上述重载的命名参数中：
    //      title   : 表示对话框的标题；
    //      msg     : 表示对话框内的文本提示内容；
    //      buttons : 该参数为一个 Array 数组格式，数组中的每一项都应是一个格式如 { iconCls: string, text: string, value: string, plain: boolean } 的 JSON-Object。
    //      handler : 该参数为一个格式如 function (index, value) 的回调函数，其中
    //          index : 表示被点击按钮的索引号（从 0 开始计数，如果该值在回调函数执行时为 -1，则表示是由于对话框被点击关闭按钮而引发的事件）；
    //          value : 表示按钮定义的 value 属性值。
    //          在点击按钮时，handler 回调函数内的 this 指向按钮本身的 HTML-DOM 对象；
    //          如果是对话框被点击关闭按钮，则 handler 回调函数内的 this 指向表示对话框 easyui-window 窗体 body 的 HTML-DOM 对象。
    //      closeOnClick : 表示在点击按钮后，是否关闭对话框窗体；Boolean 类型值，默认为 true。
    //      width   : Number 类型；表示对话框的宽度；可选，一般用于对话框包含很多按钮的情况下，用于增加对话框的宽度以免按钮换行；
    //      height  : Number 类型；表示对话框的高度；可选。
    //      buttonsAlign: String 类型；表示按钮靠左或者靠右显示；可选的值为 "left"、"center" 或 "right"，默认为 "center"
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.buttonsbox = function (title, msg, buttons, handler) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            if (arguments.length == 1) {
                if ($.util.likeArrayNotString(arguments[0])) {
                    return $.messager.buttonsbox({ buttons: arguments[0] });
                }
            }
            if (arguments.length == 2) {
                var options = $.isFunction(arguments[1])
                    ? { buttons: arguments[0], handler: arguments[1] }
                    : { msg: arguments[0], buttons: arguments[1] };
                return $.messager.buttonsbox(options);
            }
            if (arguments.length == 3) {
                var options = $.isFunction(arguments[2])
                    ? { msg: arguments[0], buttons: arguments[1], handler: arguments[2] }
                    : { title: arguments[0], msg: arguments[1], buttons: arguments[2] };
                return $.messager.buttonsbox(options);
            }
            if (arguments.length > 3) {
                return $.messager.buttonsbox({ title: arguments[0], msg: arguments[1], buttons: arguments[2], handler: arguments[3] });
            }
        }
        if ($.util.likeArrayNotString(arguments[0])) {
            return $.messager.buttonsbox({ buttons: arguments[0], handler: arguments[1] });
        }
        var opts = $.extend({}, $.messager.buttonsbox.defaults, arguments[0] || {}),
            win = $.messager.confirm(opts.title, opts.msg, opts.handler),
            winopts = win.window("options"),
            onClose = winopts.onClose,
            buttons = win.find(".messager-button").empty();
        winopts.onClose = function () {
            if ($.isFunction(onClose)) { onClose.apply(this, arguments); }
            if ($.isFunction(opts.handler)) { opts.handler.call(this, -1, undefined); }
        };
        opts.buttons = opts.buttons.length ? opts.buttons : [{ text: "确定" }];
        $.each(opts.buttons, function (i, n) {
            var item = $.extend({}, $.messager.buttonsbox.item, n || {}, {
                onClick: function () {
                    if (opts.closeOnClick) {
                        winopts.onClose = onClose;
                        win.window("close");
                    }
                    if ($.isFunction(opts.handler)) { opts.handler.call(this, i, item.value); }
                }
            });
            $("<a class=\"messager-buttons-button\"></a>").attr({ index: i, value: item.value }).appendTo(buttons).linkbutton(item);
        });
        if (opts.buttonsAlign) {
            if (!$.array.contains(["left", "center", "right"], opts.buttonsAlign))
                opts.buttonsAlign = "center";

            if (opts.buttonsAlign == "left" || opts.buttonsAlign == "right")
                buttons.css("float", opts.buttonsAlign);
        }

        if (opts.width || opts.height) {
            win.window("resize", opts);
        }
        win.children("div.messager-button").children("a:first").focus();
        return win;
    };

    $.messager.buttonsbox.defaults = {
        title: defaults.title,
        msg: defaults.buttonsboxMsg,
        buttons: [],
        closeOnClick: true,
        handler: function (index, value) { }
    };
    $.messager.buttonsbox.item = { iconCls: null, text: "", value: undefined, plain: false };



    // 增加 $.messager.solicit 方法，该方法弹出一个包含三个按钮("是"、"否" 和 "取消")的对话框，点击任意按钮或者关闭对话框时，以执行指定的回调函数；
    // 该方法提供如下方式重载：
    //      function (msg)
    //      function (msg, handler)
    //      function (title, msg)
    //      function (title, msg, handler)
    //      function (options)，options 的格式如 { title, msg, yes, no, cancel, closeOnClick, handler, width, height, buttonsAlign }
    // 上述重载的命名参数中：
    //      title   :
    //      msg     :
    //      handler :
    //      options :
    //      width   :
    //      height  :
    //      buttonsAlign:
    // 返回值：该方法返回一个表示弹出消息框的 easyui-window 对象，这是一个 jQuery 链式对象。
    $.messager.solicit = function (title, msg, handler) {
        var type = typeof arguments[0];
        if (type != "object" && type != "function") {
            if (arguments.length == 1) {
                return $.messager.solicit({ msg: arguments[0] });
            }
            if (arguments.length == 2) {
                var options = $.isFunction(arguments[1])
                    ? { msg: arguments[0], handler: arguments[1] }
                    : { title: arguments[0], msg: arguments[1] };
                return $.messager.solicit(options);
            }
            if (arguments.length > 2) {
                return $.messager.solicit({ title: arguments[0], msg: arguments[1], handler: arguments[2] });
            }
        }
        var opts = $.extend({}, $.messager.solicit.defaults, arguments[0] || {});
        $.extend(opts, {
            buttons: [
                { text: opts.yes, value: true },
                { text: opts.no, value: false },
                { text: opts.cancel, value: undefined }
            ]
        });
        return $.messager.buttonsbox(opts);
    };

    $.messager.solicit.defaults = {
        title: defaults.title,
        yes: defaults.yes,
        no: defaults.no,
        cancel: defaults.cancel,
        msg: defaults.solicitMsg
    };




})(jQuery);