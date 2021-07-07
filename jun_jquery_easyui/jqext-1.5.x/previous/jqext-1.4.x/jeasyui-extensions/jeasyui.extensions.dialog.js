/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Dialog Extensions
* jQuery EasyUI dialog 组件扩展
* jeasyui.extensions.dialog.js
* 二次开发 流云
* 最近更新：2015-11-23
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.menu.js
*   3、jeasyui.extensions.linkbutton.js
*   4、jeasyui.extensions.panel.js
*   5、jeasyui.extensions.window.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.dialog.extensions");
    $.util.namespace("$.easyui");


    // 以 easyui-dialog 方法在当前浏览器窗口的顶级(可访问)窗体中弹出对话框窗口；该函数定义如下参数：
    //     options: 一个 JSON Object，具体格式参考 easyui-dialog 官方 api 中的属性列表。
    //              该参数在 easyui-dialog 官方 api 所有原属性列表基础上，增加如下属性：
    //          autoDestroy:
    //          locale:
    //          iniframe:
    //          topMost:
    //          enableSaveButton:
    //          enableCloseButton:
    //          enableApplyButton:
    //          onSave:
    //          onClose:
    //          onApply:
    //          saveButtonIndex:
    //          closeButtonIndex:
    //          applyButtonIndex:
    //          saveButtonText:
    //          applyButtonText:
    //          closeButtonText:
    //          saveButtonIconCls:
    //          applyButtonIconCls:
    //          closeButtonIconCls:
    //          buttonsPlain:
    //              另，重写 easyui-dialog 官方 api 的 buttons 属性，使其不支持 String - jQuery Selector 格式。
    // 备注：
    // 返回值：返回弹出的 easyui-dialog 的 jQuery 链式对象。
    $.easyui.showDialog = function (options) {
        var opts = $.extend({}, $.easyui.showDialog.defaults, options || {});
        var currentFrame = arguments[1] ? arguments[1] : $.util.currentFrame;

        if (opts.topMost && $.easyui.showDialog.ntop) {
            return $.util.$.easyui.showDialog(opts, currentFrame);
        }

        if (!opts.onApply) { opts.onApply = opts.onSave; }
        if (!opts.onSave) { opts.onSave = opts.onApply; }

        var onBeforeClose = opts.onBeforeClose,
            onClose = opts.onClose,
            onBeforeDestroy = opts.onBeforeDestroy;
        opts.onBeforeClose = function () {
            if (opts.closeAnimation && opts.shadow) {
                var shadow = $(this).dialog("shadow");
                if (shadow) {
                    shadow.hide();
                }
            }
            var ret = $.isFunction(onBeforeClose)
                ? onBeforeClose.apply(this, arguments)
                : undefined;
            return ($.isFunction($.fn.dialog.defaults.onBeforeClose) && $.fn.dialog.defaults.onBeforeClose.apply(this, arguments) == false)
                ? false
                : ret;
        };
        opts.onClose = function () {
            if ($.isFunction(onClose)) {
                onClose.apply(this, arguments);
            }
            if ($.isFunction($.fn.dialog.defaults.onClose)) {
                $.fn.dialog.defaults.onClose.apply(this, arguments);
            }
            if (opts.autoDestroy) {
                $(this).dialog("destroy");
            }
        };
        opts.onBeforeDestroy = function () {
            if (opts.iniframe) {
                var iframe = $(this).dialog("iframe");
                removeFromCache(iframe[0]);
            }
            var ret = $.isFunction(onBeforeDestroy)
                ? onBeforeDestroy.apply(this, arguments)
                : undefined;
            return ($.isFunction($.fn.dialog.defaults.onBeforeDestroy) && $.fn.dialog.defaults.onBeforeDestroy.apply(this, arguments) == false)
                ? false
                : ret;
        };
        opts.closed = true;

        if (opts.locale) {
            opts.inline = true;
        }
        var t = $("<div></div>").appendTo(opts.locale ? opts.locale : "body");

        if ($.isArray(opts.toolbar)) {
            opts.toolbar = $.array.map(opts.toolbar, function (val) {
                return $.extend({}, val);
            });
            $.each(opts.toolbar, function (index, item) {
                var handler = item.handler;
                if ($.isFunction(handler)) {
                    item.handler = function () {
                        handler.call(this, t[0], item)
                    };
                }
            });
            if (!opts.toolbar.length) { opts.toolbar = null; }
        }

        var save =
            {
                id: $.util.guid("N") + "_save",
                text: opts.saveButtonText,
                iconCls: opts.saveButtonIconCls,
                index: opts.saveButtonIndex,
                hidden: opts.enableSaveButton ? false : true,
                handler: function (dia, btn) {
                    if ($.isFunction(opts.onSave) && opts.onSave.call(this, dia, btn) == false) {
                        return false;
                    }
                    $.util.delay(function () { $(dia).dialog("close"); });
                }
            },
            close = {
                id: $.util.guid("N") + "_close",
                text: opts.closeButtonText,
                iconCls: opts.closeButtonIconCls,
                index: opts.closeButtonIndex,
                hidden: opts.enableCloseButton ? false : true,
                handler: function (dia, btn) {
                    $(dia).dialog("close");
                }
            },
            apply = {
                id: $.util.guid("N") + "_apply",
                text: opts.applyButtonText,
                iconCls: opts.applyButtonIconCls,
                index: opts.applyButtonIndex,
                hidden: opts.enableApplyButton ? false : true,
                handler: function (dia, btn) {
                    if ($.isFunction(opts.onApply) && opts.onApply.call(this, dia, btn) == false) {
                        return false;
                    }
                    $(this).linkbutton("disable");
                }
            },
            buttons = [save, close, apply];

        opts.buttons = $.isArray(opts.buttons)
            ? $.array.map(opts.buttons, function (val) { return $.extend({}, val) })
            : [];
        $.array.merge(opts.buttons, buttons);

        opts.buttons = $.array.filter(opts.buttons, function (val) {
            return $.util.parseFunction(val.hidden, [val]) ? false : true;
        });
        $.each(opts.buttons, function (index, item) {
            var handler = item.handler;
            if ($.isFunction(handler)) {
                item.handler = function () {
                    handler.call(this, t[0], item);
                };
            }
        });
        if (opts.buttons.length) {
            $.array.sort(opts.buttons, function (a, b) {
                return ($.isNumeric(a.index) ? a.index : 0) - ($.isNumeric(b.index) ? b.index : 0);
            });
        } else {
            opts.buttons = null;
        }

        var topts,
            btns,
            toolbuttons;
        if (!opts.iniframe && opts.href) {
            var onBeforeLoad = opts.onBeforeLoad || $.fn.dialog.defaults.onBeforeLoad,
                onLoad = opts.onLoad || $.fn.dialog.defaults.onLoad;
            opts.onBeforeLoad = function (param) {
                if ($.isFunction(onBeforeLoad)) {
                    onBeforeLoad.apply(this, arguments);
                }
                btns.linkbutton("disable");
                toolbuttons.attr("disabled", "disabled")
                topts.onBeforeLoad = onBeforeLoad;
            };
            opts.onLoad = function () {
                if ($.isFunction(onLoad)) {
                    onLoad.apply(this, arguments);
                }
                btns.linkbutton("enable");
                toolbuttons.removeAttr("disabled");
                topts.onLoad = onLoad;
            };
        }
        topts = t.dialog(opts).dialog("options");
        var state = $.data(t[0], "dialog"),
            dialog = t.dialog("dialog"),
            iframe = t.dialog("iframe"),
            buttonbar = dialog.children(".dialog-button");

        btns = buttonbar.children("a");
        toolbuttons = t.dialog("header").find(".panel-tool a");

        //var topts = t.dialog(opts).dialog("open").dialog("options"),
        //    state = $.data(t[0], "dialog"),
        //    dialog = t.dialog("dialog"),
        //    iframe = t.dialog("iframe"),
        //    buttonbar = dialog.children(".dialog-button"),
        //    btns = buttonbar.children("a"),
        //    closeButton = btns.filter("#" + close.id),
        //    saveButton = btns.filter("#" + save.id),
        //    applyButton = btns.filter("#" + apply.id);

        //if ($.type(topts.buttonsPlain) == "boolean") {
        //    btns.linkbutton("setPlain", topts.buttonsPlain);
        //}
        //if (!topts.iniframe) {
        //    if (topts.href) {
        //        btns.linkbutton("disable");
        //        var toolbuttons = t.dialog("header").find(".panel-tool a").attr("disabled", "disabled"),
        //            onLoad = topts.onLoad;
        //        topts.onLoad = function () {
        //            if ($.isFunction(onLoad)) {
        //                onLoad.apply(this, arguments);
        //            }
        //            $.util.delay(function () {
        //                btns.linkbutton("enable");
        //                toolbuttons.removeAttr("disabled");
        //            });
        //            topts.onLoad = onLoad;
        //        };
        //    }
        //}

        var closeButton = btns.filter("#" + close.id),
            saveButton = btns.filter("#" + save.id),
            applyButton = btns.filter("#" + apply.id);
        save.target = saveButton[0];
        close.target = closeButton[0];
        apply.target = applyButton[0];

        if (iframe.length) {
            $.easyui.showDialog.caches.push({ current: iframe[0], parent: currentFrame });
        }

        $.extend(state, {
            saveButton: save,
            closeButton: close,
            applyButton: apply,
            save: function () { save.handler.call(save.target, t[0], save); },
            close: function () { close.handler.call(close.target, t[0], close); },
            apply: function () { apply.handler.call(apply.target, t[0], apply); }
        });
        $.extend(t, {
            state: state,
            saveButton: save,
            closeButton: close,
            applyButton: apply,
            save: state.save,
            close: state.close,
            apply: state.apply
        });

        if ($.type(topts.buttonsPlain) == "boolean") {
            btns.linkbutton("setPlain", topts.buttonsPlain);
        }
        return t.dialog("open");
    };

    function removeFromCache(iframe) {
        var array = $.array.filter($.easyui.showDialog.caches, function (val) {
            return val.current == iframe;
        }),
            i = array.length;
        while (i--) {
            $.array.remove($.easyui.showDialog.caches, array[i]);
        };
    }

    function getDialogParent() {
        var current = $.util.currentFrame;
        if (!current) {
            return $.util.top;
        }
        var p = $.array.first($.easyui.showDialog.caches, function (val) {
            return val.current == current;
        });
        return (p && p.parent && p.parent.contentWindow) ? p.parent.contentWindow : $.util.parent;
    }

    // 该字段仅作为内部数据标识字段，请不要作为公开 API 使用。
    $.easyui.showDialog.ntop = (!$.util.isUtilTop && $.util.$.easyui && $.util.$.easyui.showDialog) ? true : false;

    // 该字段仅作为内部数据标识字段，请不要作为公开 API 使用。
    $.easyui.showDialog.caches = $.easyui.showDialog.ntop && $.util.$.easyui.showDialog.caches
        ? $.util.$.easyui.showDialog.caches
        : [];


    // 该属性仅可以在通过 $.easyui.showDialog 打开的 easyui-dialog 中的 iframe 中使用；
    // 用于获取通过 $.easyui.showDialog 打开此 easyui-dialog 所执行的命令上下文所在页面的 window 对象。
    $.easyui.showDialog.parent = $.easyui.dialogParent = getDialogParent();

    // 该方法仅可以在通过 $.easyui.showDialog 打开的 easyui-dialog 中的 iframe 中使用；
    // 用于关闭当前页面所在的 easyui-dialog 窗体。
    $.easyui.showDialog.close = $.easyui.dialogParent.closeDialog = $.easyui.closeCurrentDialog = function () {
        if ($.util.isUtilTop) {
            return;
        }
        if ($.easyui.showDialog.parent && $.easyui.showDialog.parent.$) {
            var currentFrame = $.util.currentFrame;
            $.easyui.showDialog.parent.$(currentFrame).closest("div.window-body").dialog("close");
        }
    };



    // 定义 $.easyui.showDialog 方法打开 easyui-dialog 窗体的默认属性。
    // 备注：该默认属性定义仅在方法 $.easyui.showDialog 中被调用。
    $.easyui.showDialog.defaults = {
        title: "新建对话框",
        iconCls: "icon-standard-application-form",
        width: 600,
        height: 360,
        modal: true,
        collapsible: false,
        maximizable: false,
        closable: true,
        draggable: true,
        resizable: true,
        shadow: true,
        minimizable: false,
        toolbar: null,
        buttons: null,
        href: null,
        hcenter: true,
        vcenter: true,

        // 表示弹出的 easyui-dialog 窗体是否在关闭时自动销毁并释放浏览器资源；
        // Boolean 类型值，默认为 true。
        autoDestroy: true,

        // 表示将要打开的 easyui-dialog 的父级容器；可以是一个表示 jQuery 元素选择器的表达式字符串，也可以是一个 html-dom 或 jQuery-dom 对象。
        // 注意：如果为 null 或者 undefined 则表示父级容器为 body 标签。
        locale: null,

        // 是否在顶级窗口打开此 easyui-dialog 组件。
        topMost: false,

        // 是否在iframe加载远程 href 页面数据
        iniframe: false,


        // 是否启用保存按钮，保存按钮点击后会关闭模式对话框
        enableSaveButton: true,

        // 是否启用应用按钮
        enableApplyButton: true,

        // 是否启用关闭按钮
        enableCloseButton: true,

        saveButtonIndex: 101,

        closeButtonIndex: 102,

        applyButtonIndex: 103,

        // 点击保存按钮触发的事件，如果该事件函数返回 false，则点击保存后窗口不关闭。
        // 该事件函数签名为 function (d) { }，其中 this 指向按钮本身的 DOM 对象，参数 d 表示当前 easyui-dialog 窗体 DOM 对象。
        onSave: null,

        // 点击应用按钮触发的事件，如果该事件函数返回 false，则点击应用后该按钮不被自动禁用。
        // 该事件函数签名为 function (d) { }，其中 this 指向按钮本身的 DOM 对象，参数 d 表示当前 easyui-dialog 窗体 DOM 对象。
        onApply: null,

        // 关闭窗口时触发的事件，同 easyui-dialog 的默认事件 onClose。
        onClose: null,

        // 保存按钮的文字内容
        saveButtonText: "确定",

        // 关闭按钮的文字内容
        closeButtonText: "取消",

        // 应用按钮的文字内容
        applyButtonText: "应用",

        // 保存按钮的图标样式
        saveButtonIconCls: "icon-save",

        // 应用按钮的图标样式
        applyButtonIconCls: "icon-ok",

        // 关闭按钮的图标样式
        closeButtonIconCls: "icon-cancel",

        // 底部按钮栏的所有按钮是否全部设置 plain 属性为 true 或者 false。
        buttonsPlain: null
    };



    // 通过调用 $.easyui.showDialog 方法，以 easyui-dialog 的方式显示一个 JSON - Object 对象的所有属性值；该函数定义如下参数：
    //      data   : 需要显示的 JSON - Object；
    //      options: 该参数可选，表示要打开的 easyui-dialog 的 options。
    // 备注：该方法一般用于对象值显示，例如可以用于项目开发过程中的参数显示调试。
    // 返回值：返回弹出的 easyui-dialog 的 jQuery 链式对象。
    $.easyui.showOption = function (data, options) {
        data = (data != null && data != undefined) ? data : "无数据显示";
        var opts = $.extend({}, $.easyui.showOption.defaults, options || {}),
            type = $.type(data),
            jq = opts.topMost ? $.util.$ : $,
            content = jq("<table class='dialog-options-body'></table>");
        if (type == "array" || type == "object" || type == "function") {
            for (var key in data) {
                content.append("<tr class='dialog-options-row'><td class='dialog-options-cell'>" + key + ":</td><td class='dialog-options-cell-content'>" + $.string.toHtmlEncode(data[key]) + "</td></tr>");
            }
        } else {
            content.append("<tr class='dialog-options-row'><td class='dialog-options-cell'>data:</td><td class='dialog-options-cell-content'>" + $.string.toHtmlEncode(String(data)) + "</td></tr>");
        }
        opts.content = content;
        return $.easyui.showDialog(opts);
    };

    // 定义 $.easyui.showOption 方法打开 easyui-dialog 窗体的默认属性。
    // 备注：该默认属性定义仅在方法 $.easyui.showOption 中被调用。
    $.easyui.showOption.defaults = $.extend({}, $.easyui.showDialog.defaults, {
        title: "查看数据内容",
        width: 480,
        height: 260,
        minWidth: 360,
        minHeight: 220,
        vcenter: false,
        hcenter: false,
        enableSaveButton: false,
        enableApplyButton: false
    });


    var methods = $.fn.dialog.extensions.methods = {
    };

    var defaults = $.fn.dialog.extensions.defaults = $.extend({}, $.fn.window.extensions.defaults, {
    });

    $.extend($.fn.dialog.defaults, defaults);
    $.extend($.fn.dialog.methods, methods);


})(jQuery);