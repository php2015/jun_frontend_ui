/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Window Extensions
* jQuery EasyUI window 组件扩展
* jeasyui.extensions.window.js
* 二次开发 流云
* 最近更新：2015-06-10
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.menu.js
*   3、jeasyui.extensions.panel.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.window.extensions");

    $.extend($.fn.window.extensions, {
        headerContextMenu: [
            {
                text: "最大化", iconCls: "panel-tool-max",
                disabled: function (e, menuItemOpts, menu, target) {
                    var opts = $(target).window("options");
                    return !opts.maximized && opts.maximizable ? false : true
                },
                handler: function (e, menuItemOpts, menu, target) {
                    $(target).window("maximize");
                }
            },
            {
                text: "恢复", iconCls: "panel-tool-restore",
                disabled: function (e, menuItemOpts, menu, target) {
                    var opts = $(target).window("options");
                    return opts.maximized ? false : true;
                },
                handler: function (e, menuItemOpts, menu, target) {
                    $(target).window("restore");
                }
            },
            "-",
            {
                text: "关闭", iconCls: "panel-tool-close",
                disabled: function (e, menuItemOpts, menu, target) {
                    return !$(target).window("options").closable;
                },
                handler: function (e, menuItemOpts, menu, target) {
                    $(target).window("close");
                }
            }
        ]
    });


    function getShadow(target) {
        var state = $.data(target, "window");
        return state.shadow;
    }


    function initialize(target) {
        var state = $.data(target, "window");
        if (!state._inited) {
            initCls(target);
            initHeaderDblClick(target);
            initHeaderContextMenu(target);
            initDraggable(target);
            initResizable(target);
            state._inited = true;
        }
    }

    function initCls(target) {
        var t = $(target),
            opts = t.window("options"),
            header = t.window("header"),
            body = t.window("body");

        if (opts.bodyCls) {
            body.addClass(opts.bodyCls);
        }
        if (opts.headerCls) {
            header.addClass(opts.headerCls);
        }
    }

    function initHeaderDblClick(target) {
        var t = $(target),
            header = t.window("header");
        header.unbind("dblclick.window-extensions").bind("dblclick.window-extensions", function () {
            var opts = t.window("options");
            if (opts.autoRestore) {
                if (opts.maximized) {
                    t.window("restore");
                } else if (opts.maximizable) {
                    t.window("maximize");
                }
            }
        });
    }

    function initHeaderContextMenu(target) {
        var t = $(target),
            header = t.window("header");
        header.unbind("contextmenu.window-extensions").bind("contextmenu.window-extensions", function (e) {
            var opts = t.window("options");
            if (!opts.enableHeaderContextMenu) {
                return;
            }
            e.preventDefault();
            var state = $.data(target, "window"),
                headerContextMenu = $.array.likeArrayNotString(opts.headerContextMenu) ? opts.headerContextMenu : [],
                defaultMenus = $.fn.window.extensions.headerContextMenu,
                items = [];
            if (headerContextMenu.length) {
                $.util.merge(items, headerContextMenu);
            }
            if (defaultMenus.length) {
                items.length ? $.util.merge(items, "-", defaultMenus) : $.util.merge(items, defaultMenus);
            }

            var menuItems = $.easyui.parseMenuItems(items, [target]);
            state.headerMenu = $.easyui.showMenu({ items: menuItems, left: e.pageX, top: e.pageY, event: e });
        });
    }

    function initDraggable(target) {
        var t = $(target),
            opts = t.window("options");
        if (!opts.draggable) {
            return;
        }
        var state = $.data(target, "window"),
            win = t.window("window"),
            dopts = win.draggable("options"),
            cursor = dopts.cursor,
            defaultCursor = "default",
            onBeforeDrag = dopts.onBeforeDrag,
            onStartDrag = dopts.onStartDrag,
            onStopDrag = dopts.onStopDrag,
            onDrag = dopts.onDrag;

        $.extend(dopts, {
            delay: 0,
            cursor: defaultCursor,
            onBeforeDrag: function (e) {
                if (e.which != 1 || t.window("options").maximized) {
                    return false;
                }
                $.easyui.hideAllMenu();

                var ret = onBeforeDrag.apply(this, arguments);
                if (ret != false) {
                    dopts.cursor = cursor;
                }
                return ret;
            },
            onStartDrag: function () {
                t.window("body").addClass("window-body-hidden").children().addClass("window-body-hidden-proxy");
                onStartDrag.apply(this, arguments);
            },
            onStopDrag: function () {
                onStopDrag.apply(this, arguments);
                t.window("body").removeClass("window-body-hidden").children().removeClass("window-body-hidden-proxy");
                dopts.cursor = defaultCursor;
            },
            onDrag: function (e) {
                if (!opts.inlocale && $.isFunction(onDrag)) {
                    return onDrag.apply(this, arguments);
                }
                var left = e.data.left,
                    top = e.data.top,
                    parent = win.parent(), isRoot = parent.is("body"),
                    scope = $.extend({}, isRoot ? $.util.windowSize() : { width: parent.innerWidth(), height: parent.innerHeight() }),
                    width = $.isNumeric(opts.width) ? opts.width : win.outerWidth(),
                    height = $.isNumeric(opts.height) ? opts.height : win.outerHeight();
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left + width > scope.width && left > 0) {
                    left = scope.width - width;
                }
                if (top + height > scope.height && top > 0) {
                    top = scope.height - height;
                }
                state.proxy.css({
                    display: "block",
                    left: left,
                    top: top
                });
                return false;
            }
        });
    }

    function initResizable(target) {
        var t = $(target),
            opts = t.window("options");
        if (!opts.resizable) {
            return;
        }
        var state = $.data(target, "window"),
            win = t.window("window"),
            ropts = win.resizable("options"),
            onResize = ropts.onResize,
            onStopResize = ropts.onStopResize;

        $.extend(ropts, {
            onResize: function (e) {
                state.proxy.css({
                    left: e.data.left,
                    top: e.data.top
                });
                var width = e.data.width,
                    height = e.data.height,
                    minWidth = $.isNumeric(opts.minWidth) ? opts.minWidth : $.fn.window.extensions._defaults.minHeight,
                    maxWidth = $.isNumeric(opts.maxWidth) ? opts.maxWidth : $.fn.window.extensions._defaults.maxWidth,
                    minHeight = $.isNumeric(opts.minHeight) ? opts.minHeight : $.fn.window.extensions._defaults.minHeight,
                    maxHeight = $.isNumeric(opts.maxHeight) ? opts.maxHeight : $.fn.window.extensions._defaults.maxHeight;
                if (width > maxWidth) {
                    width = maxWidth;
                }
                if (width < minWidth) {
                    width = minWidth;
                }
                if (height > maxHeight) {
                    height = maxHeight;
                }
                if (height < minHeight) {
                    height = minHeight;
                }
                state.proxy._outerWidth(width);
                state.proxy._outerHeight(height);
                return false;
            },
            onStopResize: function (e) {
                var ret = onStopResize.apply(this, arguments);
                if (t.window("options").maximized) {
                    t.window("restore").window("maximize");
                }
                return ret;
            }
        });
    }



    $(function () {

        //  设置当屏幕大小调整时，所有 easyui-window 或 easyui-dialog 窗口在属性 hcenter: true 或 vcenter: true 的情况下自动居中。
        $(window).resize(function () {
            $(".window-body").each(function () {
                var t = $(this),
                    state = $.data(this, "window");
                if (!state || !state.options) {
                    return;
                }
                var opts = t.window("options");
                if (opts.draggable) {
                    if (opts.hcenter || opts.vcenter) {
                        var method = opts.hcenter && opts.vcenter
                            ? "center"
                            : (opts.hcenter ? "hcenter" : "vcenter");
                        t.window(method);
                    } else if (opts.inlocale) {
                        t.window("move");
                    }
                }
            });
        });

        //  在当前打开 modal:true 的 easyui-window 或者 easyui-dialog 时，按 ESC 键关闭顶层的 easyui-window 或者 easyui-dialog 对象。
        $(document).keydown(function (e) {
            if (e.which != 27) {
                return;
            }
            var items = $("div.window-mask:visible");
            if (!items.length) {
                return;
            }
            var item = $.array.max(items, function (a, b) {
                return $(a).css("zindex") - $(b).css("zindex");
            })
            $(item).prevAll("div.panel.window:first").children(".window-body").each(function () {
                if (!$.data(this, "window")) {
                    return;
                }
                var t = $(this),
                    opts = t.window("options");
                if (opts && opts.closable && opts.closeOnEsc && !t.window("header").find(".panel-tool a").attr("disabled")) {
                    //$.util.delay(function () {
                        t.window("close");
                    //});
                }
            });
        });

        //  点击模式对话框（例如 easyui-messager、easyui-window、easyui-dialog）的背景遮蔽层使窗口闪动
        $("body").on("click", "div.window-mask", function (e) {
            $(this).prevAll("div.panel.window:first").shine(125, 6);
        });
    });



    var _window = $.fn.window;
    $.fn.window = function (options, param) {
        if (typeof options == "string") {
            return _window.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this),
                isInited = $.data(this, "window") ? true : false,
                opts = isInited ? options : $.extend({},
                    $.fn.window.parseOptions(this),
                    $.parser.parseOptions(this, [{
                        hcenter: "boolean", vcenter: "boolean", autoRestore: "boolean",
                        closeOnEsc: "boolean", enableHeaderContextMenu: "boolean"
                    }]), options);
            _window.call(jq, opts, param);
            if (!isInited) {
                initialize(this);
            }
        });
    };
    $.union($.fn.window, _window);


    var methods = $.fn.window.extensions.methods = {
        
        //  增加 easyui-window 控件的自定义扩展方法；用于获取当前 easyui-window 窗体组件的 shadow 阴影部件的 jQuery-DOM 对象。
        //  返回值：如果当前 easyui-window 窗体组件设置了阴影效果（shadow: true），则返回表示该 shadow 阴影部件的 jQuery-DOM 对象，否则返回 undefined。
        shadow: function (jq) { return getShadow(jq[0]); }
    };

    var defaults = $.fn.window.extensions.defaults = $.extend({}, $.fn.panel.extensions.defaults, {

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口对象是否在屏幕大小调整的情况下自动进行左右居中，默认为 true。
        hcenter: false,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口对象是否在屏幕大小调整的情况下自动进行上下居中，默认为 true。
        vcenter: false,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口是否在双击头部时自动最大化。
        autoRestore: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该是否在按下 ESC 时关闭该窗口，默认为 true。
        closeOnEsc: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示是否启用该窗口的右键菜单。
        enableHeaderContextMenu: true,

        //  扩展 easyui-window 以及 easyui-dialog 控件的自定义属性，表示该窗口的右键菜单；
        //  这是一个数组格式对象，数组中的每一项都是一个 menu-item 元素；该 menu-item 元素格式定义如下：
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, menuItemOpts, menu, windowDOM)，其中 this 指向菜单项本身
        //  注意：当 enableHeaderContextMenu 属性设置为 true 时，该属性才能生效。
        headerContextMenu: null
    });

    $.extend($.fn.window.defaults, defaults);
    $.extend($.fn.window.methods, methods);


})(jQuery);