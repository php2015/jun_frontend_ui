/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI textbox Extensions
* jQuery EasyUI textbox 组件扩展
* jeasyui.extensions.textbox.js
* 二次开发 流云
* 最近更新：2015-06-11
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.linkbutton.js
*   3、jeasyui.extensions.validatebox.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.textbox.extensions");

    $.extend($.fn.textbox.extensions, {
        destroy: $.fn.textbox.methods.destroy
    });


    function setIconCls(target, iconCls) {
        var t = $(target),
            state = $.data(target, "textbox"),
            opts = state.options,
            addon = getAddon(target);
        if (iconCls) {
            if (opts.iconCls) {
                var icon = addon.find(".textbox-icon:last");
                if (icon.length) {
                    var disabled = icon.is(".textbox-icon-disabled");
                    icon.attr("class", "textbox-icon " + iconCls);
                    if (disabled) {
                        icon.addClass("textbox-icon-disabled");
                    }
                } else {
                    createIcon();
                }
            } else {
                createIcon();
            }
            function createIcon() {
                $("<a href='javascript:void(0)' class='textbox-icon " + iconCls + " textbox-icon-disabled' tabindex='-1' style='width: 18px; height: 20px;'></a>").appendTo(addon);
                addon.find(".textbox-icon").each(function (i) {
                    $(this).attr("icon-index", i);
                });
            }
        } else {
            if (opts.iconCls && addon.length) {
                addon.find(".textbox-icon:last").filter("." + opts.iconCls).remove();
            }
            if (addon.length && !addon.children()) {
                addon.remove();
            }
        }
        opts.iconCls = iconCls;
        t.textbox("resize");
    }

    // param: { iconCls: string, disabled: bool, handler: function, index: number }
    function setIcon(target, param) {
        if (!param || !$.isNumeric(param.index) || param.index < 0) {
            return;
        }
        var state = $.data(target, "textbox"),
            opts = state.options,
            addon = state.textbox.find(".textbox-addon"),
            icon = addon.find(".textbox-icon:eq(" + param.index + ")");
        if (!icon.length) {
            return;
        }
        if (param.iconCls) {
            icon.attr("class", "textbox-icon " + param.iconCls);
        }
        if (param.disabled) {
            icon.addClass("textbox-icon-disabled");
        }
        if (opts.icons && opts.icons.length && opts.icons.length > param.index) {
            $.extend(opts.icons[param.index], param);
        }
        refreshState(target);
    }


    function getAddon(target) {
        var state = $.data(target, "textbox"),
            opts = state.options,
            addon = state.textbox.find(".textbox-addon");
        if (!addon.length) {
            var tb = state.textbox.find(".textbox-text"),
                btn = state.textbox.find(".textbox-button"),
                iconAlign = opts.iconAlign ? opts.iconAlign : opts.iconAlign = $.fn.textbox.defaults.iconAlign;

            addon = $("<span class='textbox-addon textbox-addon- " + iconAlign + "'></span>").insertBefore(tb).css({
                left: (iconAlign == "left" ? (opts.buttonAlign == "left" ? btn._outerWidth() : 0) : ""),
                right: (iconAlign == "right" ? (opts.buttonAlign == "right" ? btn._outerWidth() : 0) : "")
            });
        }
        return addon;
    }

    // 更新 prompt/placeholder、重新绑定点击事件、刷新 icons 的状态、刷新 linkbutton
    function refreshState(target) {
        var state = $.data(target, "textbox"),
            opts = state.options;
        $(target).textbox(opts.disabled ? "disable" : "enable");
    }


    // param: { iconCls: string, disabled: bool, handler: function(e) }
    function appendIcon(target, param) {
        if (!param || !param.iconCls)
            return;

        param = $.extend({}, param, { index: -1 });
        insertIcon(target, param);
    }

    // param: { iconCls: string, disabled: bool, handler: function(e), index: number }
    function insertIcon(target, param) {
        if (!param || !param.iconCls)
            return;

        var state = $.data(target, "textbox"),
            opts = state.options,
            addon = getAddon(target),
            icons = $.array.likeArrayNotString(opts.icons) ? opts.icons : (opts.icons = []),
            icon = $("<a href='javascript:void(0)' class='textbox-icon " + param.iconCls + "' tabindex='-1' style='width: 18px; height: 20px;'></a>");
        if (param.disabled) {
            icon.addClass("textbox-icon-disabled");
        }
        if ($.isNumeric(param.index) && param.index < icons.length && param.index > -1) {
            icon.insertBefore(addon.find(".textbox-icon")[param.index]);
            $.array.insert(icons, param.index, param);
        } else {
            if (opts.iconCls) {
                var last = addon.find(".textbox-icon:last");
                icon.insertBefore(last);
            } else {
                icon.appendTo(addon);
            }
            $.array.push(icons, param);
        }
        addon.find(".textbox-icon").each(function (i) {
            $(this).attr("icon-index", i);
        });
        refreshState(target);
        $(target).textbox("resize");
    }

    function removeIcon(target, index) {
        var state = $.data(target, "textbox"),
            opts = state.options,
            isArray = $.array.likeArrayNotString(opts.icons),
            icons = isArray ? opts.icons : (opts.icons = []);
        state.textbox.find(".textbox-addon .textbox-icon:eq(" + index + ")").remove();
        state.textbox.find(".textbox-addon .textbox-icon").each(function (i) {
            $(this).attr("icon-index", i);
        });
        $.array.removeAt(icons, index);
        $(target).textbox("resize");
    }

    function setRequired(target, required) {
        var state = $.data(target, "textbox"),
            opts = state.options,
            tb = state.textbox,
            box = tb.find(".textbox-text");
        opts.required = box.validatebox("options").required = required;
        box.validatebox("validate")
    }

    function setPrompt(target, prompt) {
        var state = $.data(target, "textbox"),
            opts = state.options,
            tb = state.textbox,
            box = tb.find(".textbox-text");
        opts.prompt = prompt;
        box.validatebox("setPrompt", prompt);
    }

    function setButtonText(target, buttonText) {
        var t = $(target),
            state = $.data(target, "textbox"),
            opts = state.options,
            tb = state.textbox,
            btn = tb.find(".textbox-button");
        opts.buttonText = buttonText;

        if (btn.length) {
            btn.linkbutton("setText", buttonText);
        } else {
            $("<a href='javascript:void(0);' class='textbox-button textbox-button-" + opts.buttonAlign + "'></a>").prependTo(tb).linkbutton({
                text: opts.buttonText, iconCls: opts.buttonIcon
            });
            t.textbox("readonly", opts.readonly)
        }
        t.textbox("resize");
    }

    function setButtonIcon(target, buttonIcon) {
        var t = $(target),
            state = $.data(target, "textbox"),
            opts = state.options,
            tb = state.textbox,
            btn = tb.find(".textbox-button");
        opts.buttonIcon = buttonIcon;

        if (btn.length) {
            btn.linkbutton("setIconCls", buttonIcon);
        } else {
            $("<a href='javascript:void(0);' class='textbox-button textbox-button-" + opts.buttonAlign + "'></a>").prependTo(tb).linkbutton({
                text: opts.buttonText, iconCls: opts.buttonIcon
            });
            t.textbox("readonly", opts.readonly)
        }
        t.textbox("resize");
    }

    function setIconDisabled(target, index, disabled) {
        var state = $.data(target, "textbox"),
            opts = state.options;
        if ($.array.likeArrayNotString(opts.icons) && opts.icons[index]) {
            opts.icons[index].disabled = disabled ? true : false;
            refreshState(target);
        }
    }

    function destroy(target) {
        var t = $(target),
            state = $.data(target, "textbox"),
            opts = state.options;
        if (opts.onBeforeDestroy.call(target) == false) {
            return;
        }
        $.fn.textbox.extensions.destroy.call(target, t);
        opts.onDestroy.call(target);
    }



    var methods = $.fn.textbox.extensions.methods = {

        // 增加 easyui-textbox 控件的自定义扩展方法；用于设置 easyui-textbox 的显示图标属性 iconCls；
        // 该方法的参数 iconCls 表示被设置的图标的 iconCls 属性，为一个 String 类型值。
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        setIconCls: function (jq, iconCls) { return jq.each(function () { setIconCls(this, iconCls); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；用于设置 easyui-textbox 指定位置的图标；
        // 该方法的参数 param 为一个格式如 { iconCls: string, disabled: bool, handler: function, index: number } 的 json-object，其中各属性定义如下：
        //      iconCls :
        //      disabled:
        //      handler :
        //      index   :
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        setIcon: function (jq, param) { return jq.each(function () { setIcon(this, param); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；往 easyui-textbox 控件的 icons 图标列表末尾添加一个新的图标按钮；
        // 该方法的参数 param 为一个格式如 { iconCls: string, disabled: bool, handler: function } 的 json-object，其中各属性定义如下：
        //      iconCls :
        //      disabled:
        //      handler :
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        appendIcon: function (jq, param) { return jq.each(function () { appendIcon(this, param); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；往 easyui-textbox 控件的 icons 图标列表中插入一个新的图标按钮；
        // 该方法的参数 param 为一个格式如 { iconCls: string, disabled: bool, handler: function, index: number } 的 json-object，其中各属性定义如下：
        //      iconCls : 如果该属性值未定义、或者为空字符串，则该方法执行后无任何效果
        //      disabled:
        //      handler :
        //      index   : 如果该属性值未定义、或者不是一个 number 值，则 insertIcon 方法将会当作 appendIcon 方法执行
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        insertIcon: function (jq, param) { return jq.each(function () { insertIcon(this, param); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；删除 easyui-textbox 控件的 icons 图标列表中指定位置的图标按钮；
        // 该方法的参数 index 表示要删除的图标的索引值（从 0 开始计数）。
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        removeIcon: function (jq, index) { return jq.each(function () { removeIcon(this, index); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；设置 easyui-textbox 控件的 required 属性；该属性表示表单输入值是否允许为空。
        // 该方法的参数 required 表示被设置的 bool 类型值。
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        setRequired: function (jq, required) { return jq.each(function () { setRequired(this, required); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；设置 easyui-textbox 控件的 prompt 属性；该属性表示表单输入控件在空值状态下的文字提示信息。
        // 该方法的参数 prompt 表示被设置的 prompt 值。
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        setPrompt: function (jq, prompt) { return jq.each(function () { setPrompt(this, prompt); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；设置 easyui-textbox 控件的 button 按钮文本；
        // 该方法的参数 buttonText 表示被设置的按钮文本内容；
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        setButtonText: function (jq, buttonText) { return jq.each(function () { setButtonText(this, buttonText); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；设置 easyui-textbox 控件的 button 按钮图标；
        // 该方法的参数 buttonIcon 表示被设置的按钮图标样式类；
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        setButtonIcon: function (jq, buttonIcon) { return jq.each(function () { setButtonIcon(this, buttonIcon); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；禁用 easyui-textbox 控件中指定位置的图标按钮事件；
        // 该方法的参数 index 是一个 Number 类型值，表示要禁用点击事件的图标的索引号（从 0 开始计数）；
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        disableIcon: function (jq, index) { return jq.each(function () { setIconDisabled(this, index, true); }); },

        // 增加 easyui-textbox 控件的自定义扩展方法；启用 easyui-textbox 控件中指定位置的图标按钮事件；
        // 该方法的参数 index 是一个 Number 类型值，表示要启用点击事件的图标的索引号（从 0 开始计数）；
        // 返回值：返回表示当前 easyui-textbox 控件的 jQuery 链式对象。
        enableIcon: function (jq, index) { return jq.each(function () { setIconDisabled(this, index, false); }); },

        // 重写 easyui-textbox 控件的 destroy 方法，以支持相应扩展功能（onBeforeDestroy、onDestroy 事件）。
        destroy: function () { return jq.each(function () { destroy(this); }); }
    };

    var defaults = $.fn.textbox.extensions.defaults = {

        // 增加 easyui-textbox 的自定义扩展事件；
        // 该事件表示在执行控件销毁操作（destroy 方法）之前进行的操作；
        // 如果该方法返回 false，则表示取消控件销毁操作（destroy 方法）的执行。
        onBeforeDestroy: function () { },

        // 增加 easyui-textbox 的自定义扩展事件；
        // 该事件表示在执行控件销毁操作（destroy 方法）之后进行的操作；
        onDestroy: function () { }
    };

    $.extend($.fn.textbox.defaults, defaults);
    $.extend($.fn.textbox.methods, methods);

})(jQuery);