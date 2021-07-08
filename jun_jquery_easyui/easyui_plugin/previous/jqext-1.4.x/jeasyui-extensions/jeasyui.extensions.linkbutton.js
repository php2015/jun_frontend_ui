/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI linkbutton Extensions
* jQuery EasyUI linkbutton 组件扩展
* jeasyui.extensions.linkbutton.js
* 二次开发 流云
* 最近更新：2015-03-24
*
* 依赖项：
*   1、jquery.jdirk.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.linkbutton.extensions");


    function setIconCls(target, iconCls) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options,
            span = t.find(">span"),
            icon = t.find(".l-btn-icon");
        span.removeClass("l-btn-icon-left l-btn-icon-right l-btn-icon-top l-btn-icon-bottom");
        if (iconCls) {
            if (icon.length) {
                icon.attr("class", "l-btn-icon " + iconCls);
            } else {
                t.find(".l-btn-text").after("<span class=\"l-btn-icon " + iconCls + "\">&nbsp;</span>");
                span.addClass("l-btn-icon-" + opts.iconAlign);
            }
        } else {
            icon.remove();
        }
        opts.iconCls = iconCls;
    };

    function setText(target, text) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options,
            btnText = t.find(".l-btn-text");
        if (text) {
            btnText.removeClass("l-btn-empty").text(text);
        } else {
            btnText.addClass("l-btn-empty").html("&nbsp;");
        }
        opts.text = text;
    };

    function setIconAlign(target, iconAlign) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options,
            left = t.find(".l-btn-left");
        left.removeClass("l-btn-icon-left l-btn-icon-right l-btn-icon-top l-btn-icon-bottom").addClass("l-btn-icon-" + iconAlign);
        opts.iconAlign = iconAlign;
    };

    function setStyle(target, style) {
        if (!style) { return; }
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options;
        if (style) {
            t.css(style);
            $.extend(opts.style ? opts.style : (opts.state = {}), style);
        }
    };

    function setPlain(target, plain) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options;
        opts.plain = plain ? true : false;
        if (opts.plain) {
            t.addClass("l-btn-plain");
        } else {
            t.removeClass("l-btn-plain");
        }
    };

    function setSize(target, size) {
        if (!size) { return; }
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options;
        t.removeClass("l-btn-small l-btn-large").addClass("l-btn-" + size);
        opts.size = size;
    };

    // tooltip: string | function | boolean(false)
    function setTooltip(target, tooltip) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options;

        opts.tooltip = tooltip;
        t.tooltip("destroy");

        if (opts.tooltip) {
            var topts = { content: typeof tooltip == "string" ? tooltip : null };
            if ($.isFunction(tooltip)) {
                topts.onShow = function (e) {
                    $(this).tooltip("update", tooltip.call(target, e));
                };
            }
            t.tooltip(topts);
        }
    };



    var _linkbutton = $.fn.linkbutton;
    $.fn.linkbutton = function (options, param) {
        if (typeof options == "string") {
            return _linkbutton.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var t = $(this),
                isInited = $.data(this, "linkbutton") ? true : false,
                opts = isInited ? options : $.extend({},
                    $.fn.linkbutton.parseOptions(this),
                    $.parser.parseOptions(this, ["tooltip"]),
                    options
                );
            _linkbutton.call(t, opts);
            if (!isInited) {
                initialize(this);
            }
        });
    };
    $.union($.fn.linkbutton, _linkbutton);


    function initialize(target) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options,
            exts = opts.extensions ? opts.extensions : opts.extensions = {};
        if (!exts._initialized) {
            setStyle(target, opts.style);
            setTooltip(target, opts.tooltip);
            exts._initialized = true;
        }
    };


    var defaults = $.fn.linkbutton.extensions.defaults = {

        // 增加 easyui-linkbutton 控件的自定义扩展属性；表示 linkbutton 按钮的自定义样式，为一个 json-object 对象类型值。
        style: null,

        // 增加 easyui-linkbutton 控件的自定义扩展属性；表示 linkbutton 按钮鼠标放置提示，为 String 或 Function 类型值。
        tooltip: null
    };

    var methods = $.fn.linkbutton.extensions.methods = {

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 easyui-linkbutton 控件的图标；
        // 该方法的参数 iconCls 表示要设置的新的图标样式，为一个 String 类型值。
        //  返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setIconCls: function (jq, iconCls) { return jq.each(function () { setIconCls(this, iconCls); }); },

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 linkbutton 按钮的文字；
        // 该方法的参数 text 表示要设置的新的按钮文本内容，为一个 String 类型值。
        // 返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setText: function (jq, text) { return jq.each(function () { setText(this, text); }); },

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 easyui-linkbutton 按钮的图标位置；
        // 该方法的参数 iconAlign 表示要设置的按钮的图标位置；该参数限定取值 "left"、"right"、"top"、"bottom"。
        // 返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setIconAlign: function (jq, iconAlign) { return jq.each(function () { setIconAlign(this, iconAlign); }); },

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 easyui-linkbutton 按钮的自定义样式；
        // 该方法的参数 style 表示要设置的按钮的样式，为一个 json-object 对象类型值。
        // 返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setStyle: function (jq, style) { return jq.each(function () { setStyle(this, style); }); },

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 easyui-linkbutton 按钮的 plain 属性；
        // 该方法的参数 plain 表示要设置的按钮的 plain 属性值，为一个 bool 类型值。
        // 返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setPlain: function (jq, plain) { return jq.each(function () { setPlain(this, plain); }); },

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 easyui-linkbutton 按钮的 size 属性；
        // 该方法的参数 size 表示要设置的按钮的 size 属性值；该参数限定取值 'small','large'。
        // 返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setSize: function (jq, size) { return jq.each(function () { setSize(this, size); }); },

        // 增加 easyui-linkbutton 控件的自定义扩展方法；
        // 设置 easyui-linkbutton 按钮的 tooltip 属性；
        // 该方法的参数 tooltip 表示要设置的按钮的 tooltip 属性值；该值可以定义为如下类型：
        //      String   : 用于作为 tooltip 显示文本；
        //      function : 表示在 easyui-tooltip 组件触发 onShow 所执行的回调函数，该 function 应返回一个 String 值用于作为 tooltip 显示文本；
        //      Boolean  : 仅可为 false，则表示销毁该按钮的 easyui-tooltip 效果；
        // 返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setTooltip: function (jq, tooltip) { return jq.each(function () { setTooltip(this, tooltip); }); }
    };


    $.extend($.fn.linkbutton.defaults, defaults);
    $.extend($.fn.linkbutton.methods, methods);

})(jQuery);