/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI panel Extensions
* jQuery EasyUI panel 组件扩展
* jeasyui.extensions.panel.js
* 二次开发 流云
* 最近更新：2015-06-08
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.panel.extensions");
    $.util.namespace("$.fn.window.extensions");
    $.util.namespace("$.fn.dialog.extensions");


    $.extend($.fn.panel.extensions, {
        header: $.fn.panel.methods.header,
        setTitle: $.fn.panel.methods.setTitle,
        onBeforeDestroy: $.fn.panel.defaults.onBeforeDestroy,
        onResize: $.fn.panel.defaults.onResize,
        onMove: $.fn.panel.defaults.onMove
    });

    $.extend($.fn.window.extensions, {
        onBeforeDestroy: $.fn.window.defaults.onBeforeDestroy,
        onResize: $.fn.window.defaults.onResize,
        onMove: $.fn.window.defaults.onMove
    });

    $.extend($.fn.dialog.extensions, {
        onBeforeDestroy: $.fn.dialog.defaults.onBeforeDestroy,
        onResize: $.fn.dialog.defaults.onResize,
        onMove: $.fn.dialog.defaults.onMove
    });


    function onBeforeDestroy() {
        $("iframe,frame", this).each(function () {
            try {
                if (this.contentWindow && this.contentWindow.document && this.contentWindow.close) {
                    this.contentWindow.document.write("");
                    this.contentWindow.close();
                }
                if (window.CollectGarbage) {
                    window.CollectGarbage();
                }
            } catch (ex) { }
        }).remove();
    }

    $.fn.panel.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.window.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.dialog.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.datagrid.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.datalist.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.propertygrid.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.treegrid.defaults.onBeforeDestroy = onBeforeDestroy;


    function onResize(width, height) {
        var target = this,
            t = $(target),
            _isWindow = t.panel("isWindow"),
            _isDialog = t.panel("isDialog"),
            plugin = _isDialog ? "dialog" : (_isWindow ? "window" : "panel"),
            originalOnResize = $.fn[plugin].extensions.onResize;

        if ($.isFunction(originalOnResize)) {
            originalOnResize.apply(this, arguments);
        }

        if (!t.panel("isRegion")) {
            var opts = t.panel("options"),
                minWidth = $.isNumeric(opts.minWidth) ? opts.minWidth : $.fn[plugin].extensions.defaults.minWidth,
                maxWidth = $.isNumeric(opts.maxWidth) ? opts.maxWidth : $.fn[plugin].extensions.defaults.maxWidth,
                minHeight = $.isNumeric(opts.minHeight) ? opts.minHeight : $.fn[plugin].extensions.defaults.minHeight,
                maxHeight = $.isNumeric(opts.maxHeight) ? opts.maxHeight : $.fn[plugin].extensions.defaults.maxHeight,
                flag = false;

            if (width > maxWidth) {
                width = maxWidth;
                flag = true;
            }
            if (width < minWidth) {
                width = minWidth;
                flag = true;
            }
            if (height > maxHeight) {
                height = maxHeight;
                flag = true;
            }
            if (height < minHeight) {
                height = minHeight;
                flag = true;
            }
            if (flag && !opts.fit) {
                t[plugin]("resize", { width: width, height: height });
            }
        }
    }

    function onMove(left, top) {
        var target = this,
            t = $(target),
            _isWindow = t.panel("isWindow"),
            _isDialog = t.panel("isDialog"),
            plugin = _isDialog ? "dialog" : (_isWindow ? "window" : "panel"),
            originalOnMove = $.fn[plugin].extensions.onMove;

        if ($.isFunction(originalOnMove)) {
            originalOnMove.apply(this, arguments);
        }

        var opts = t.panel("options");
        if (opts.maximized) {
            return t[plugin]("restore");
        }
        if (!opts.inlocale) {
            return;
        }

        var panel = t.panel("panel"),
            parent = panel.parent(),
            isRoot = parent.is("body"),
            scope = isRoot ? $.util.windowSize() : { width: parent.innerWidth(), height: parent.innerHeight() },
            width = $.isNumeric(opts.width) ? opts.width : panel.outerWidth(),
            height = $.isNumeric(opts.height) ? opts.height : panel.outerHeight(),
            flag = false;

        if (left < 0) {
            left = 0;
            flag = true;
        }
        if (top < 0) {
            top = 0;
            flag = true;
        }
        if (left + width > scope.width && left > 0) {
            left = scope.width - width;
            flag = true;
        }
        if (top + height > scope.height && top > 0) {
            top = scope.height - height;
            flag = true;
        }
        if (flag) {
            return t[plugin]("move", { left: left, top: top });
        }
    }




    function isRegion(target) {
        var t = $(target),
            body = t.panel("body"),
            panel = t.panel("panel");
        return body.hasClass("layout-body") && panel.hasClass("layout-panel");
    }

    function isTab(target) {
        var t = $(target),
            panel = t.panel("panel"),
            panels = panel.parent(),
            container = panels.parent();
        return panels.hasClass("tabs-panels") && container.hasClass("tabs-container") && $.easyui.isComponent(container, "tabs");
    }

    function isAccordion(target) {
        var t = $(target),
            body = t.panel("body"),
            panel = t.panel("panel"),
            container = panel.parent();
        return body.hasClass("accordion-body") && container.hasClass("accordion") && $.easyui.isComponent(container, "accordion")
            ? true
            : false;
    }

    function isWindow(target) {
        var t = $(target),
            body = t.panel("body");
        return body.hasClass("window-body") && body.parent().hasClass("window") && $.easyui.isComponent(target, "window");
    }

    function isDialog(target) {
        var t = $(target),
            body = t.panel("body");
        return isWindow(target) && $.easyui.isComponent(target, "dialog");
    }


    function getHeader(target) {
        var t = $(target);
        if (!isTab(target))
            return $.fn.panel.extensions.header.call(t, t);

        var panel = t.panel("panel"),
            index = panel.index(),
            tabs = panel.closest(".tabs-container");
        return tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(index);
    }

    function getIframe(target) {
        var t = $(target),
            body = t.panel("body");
        return body.children("iframe.panel-iframe");
    }

    function setTitle(target, title) {
        var t = $(target);
        if (!isTab(target))
            return $.fn.panel.extensions.setTitle.call(t, t, title);

        var opts = t.panel("options"),
            header = t.panel("header");
        header.find(">a.tabs-inner>span.tabs-title").text(opts.title = title);
    }



    function setExtensionsOptions(opts) {
        opts._ext_panel_originals = { href: opts.href, content: opts.content };
        if (opts.iniframe) {
            opts.href = null;
            opts.content = null;
        }
    }

    function initializeExtensions(target) {
        var t = $(target),
            state = $.data(target, "panel"),
            opts = state.options,
            originals = opts._ext_panel_originals ? opts._ext_panel_originals : opts._ext_panel_originals = { href: opts.href, content: opts.content };

        opts.href = originals.href; opts.content = originals.content;
        if (opts.bodyStyle) {
            t.panel("body").css(opts.bodyStyle);
        }
        if (opts.iniframe) {
            refresh(target);
        }
        if (opts.inline) {
            var panel = t.panel("panel"),
                parent = panel.parent();
            if (!parent.is("body") && !$.array.contains(["fixed", "absolute", "relative"], parent.css("position"))) {
                parent.addClass("panel-container");
            }
        }
    }



    function loadPanel(target) {
        var state = $.data(target, "panel");
        if (!state.isLoaded || !opts.cache) {
            var t = $(target),
                opts = state.options,
                param = $.extend({}, opts.queryParams);
            if (opts.onBeforeLoad.call(target, param) == false) {
                return;
            }
            state.isLoaded = false;
            t.panel("clear");
            if (opts.loadingMessage) {
                t.html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
            }
            opts.loader.call(target, param, success, error);
            function success(data) {
                var html = opts.extractor.call(target, data);
                $(target).html(html);
                $.parser.parse($(target));
                opts.onLoad.apply(target, arguments);
                state.isLoaded = true;
            }
            function error() {
                opts.onLoadError.apply(target, arguments);
            }
        }
    }

    function loadPanelIframe(target) {
        var t = $(target),
            state = $.data(target, "panel"),
            opts = state.options,
            param = $.extend({}, opts.queryParams);
        if (opts.onBeforeLoad.call(target, param) == false) {
            return;
        }
        var content = "<iframe class='panel-iframe' frameborder='0' width='100%' height='100%' marginwidth='0px' marginheight='0px' scrolling='auto'></iframe>";
        t.panel("clear");
        t.addClass("panel-body-withframe").html(content);

        t.panel("iframe").bind({
            load: function () {
                if ($.isFunction(opts.onLoad)) {
                    opts.onLoad.apply(target, arguments);
                }
            },
            error: function () {
                if ($.isFunction(opts.onLoadError)) {
                    opts.onLoadError.apply(target, arguments);
                }
            }
        }).attr("src", opts.href || "");
        state.isLoaded = true;
    }

    function refresh(target, href) {
        var t = $(target),
            state = $.data(target, "panel"),
            opts = state.options;
        state.isLoaded = false;
        if (href) {
            if (typeof href == "string") {
                opts.href = href;
            } else {
                opts.queryParams = href;
            }
        }

        if (!opts.href)
            return;

        t.panel("body").removeClass("panel-body-withframe");
        if (opts.iniframe) {
            loadPanelIframe(target);
        } else {
            loadPanel(target);
        }
    }



    var _panel = $.fn.panel;
    $.fn.panel = function (options, param) {
        if (typeof options == "string") {
            return _panel.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this),
                isInited = $.data(this, "panel") ? true : false,
                opts = isInited ? options : $.extend({},
                        $.fn.panel.parseOptions(this),
                        $.parser.parseOptions(this, [
                            { minWidth: "number", maxWidth: "number", minHeight: "number", maxHeight: "number" },
                            { iniframe: "boolean", inlocale: "boolean" }
                        ]), options);
            if (!isInited) {
                setExtensionsOptions(opts);
            }
            _panel.call(jq, opts, param);
            if (!isInited) {
                initializeExtensions(this);
            }
        });
    };
    $.union($.fn.panel, _panel);


    var methods = $.fn.panel.extensions.methods = {

        //  判断当前 easyui-panel 是否为 easyui-layout 的 region-panel 部件；
        //  返回值：如果当前 easyui-panel 是 easyui-layout 的 region-panel 部件，则返回 true，否则返回 false。
        isRegion: function (jq) { return isRegion(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-tabs 的选项卡。
        isTab: function (jq) { return isTab(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-accordion 中的一个折叠面板。
        isAccordion: function (jq) { return isAccordion(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-window 组件；
        isWindow: function (jq) { return isWindow(jq[0]); },

        //  判断当前 easyui-panel 是否为 easyui-dialog 组件；
        isDialog: function (jq) { return isDialog(jq[0]); },

        //  重写 easyui-panel 控件的 header 方法，支持位于 easyui-tabs 中的 tab-panel 部件获取 header 对象；
        //  备注：如果该 panel 位于 easyui-tabs 中，则该方法返回 easyui-tabs 的 div.tabs-header div.tabs-wrap ul.tabs 中对应该 tab-panel 的 li 对象。
        header: function (jq) { return getHeader(jq[0]); },

        //  增加 easyui-panel 控件的扩展方法；该方法用于获取当前在 iniframe: true 时当前 panel 控件中的 iframe 容器对象；
        //  备注：如果 inirame: false，则该方法返回一个空的 jQuery 对象。
        iframe: function (jq) { return getIframe(jq[0]); },

        //  重写 easyui-panel 控件的 refresh 方法，用于支持 iniframe 属性。
        refresh: function (jq, href) { return jq.each(function () { refresh(this, href); }); },

        //  重写 easyui-panel 控件的 setTitle 方法，支持位于 easyui-tabs 中的 tab-panel 部件设置 title 操作；
        //  返回值：返回当前选项卡控件 easyui-panel 的 jQuery 链式对象。
        setTitle: function (jq, title) { return jq.each(function () { setTitle(this, title); }); }
    };

    var defaults = $.fn.panel.extensions.defaults = {

        //  增加 easyui-panel 控件的自定义属性，该属性表示 href 加载的远程页面是否装载在一个 iframe 中。
        iniframe: false,

        //  扩展 easyui-panel、easyui-window 以及 easyui-dialog 控件的自定义属性，表示该面板 body 对象的自定义 CSS 样式；
        //  该属性作用于 panel-body 对象；格式请参照 style 属性；
        bodyStyle: null,


        //  扩展 easyui-panel/window/dialog 控件的自定义属性，表示该窗口是否无法移除父级对象边界，默认为 true。
        inlocale: true,

        //  增加 easyui-panel/window/dialog 控件的自定义属性，表示 easyui-panel/window/dialog 面板的最小宽度。
        minWidth: 10,

        //  增加 easyui-panel/window/dialog 控件的自定义属性，表示 easyui-panel/window/dialog 面板的最大宽度。
        maxWidth: 10000,

        //  增加 easyui-panel/window/dialog 控件的自定义属性，表示 easyui-panel/window/dialog 面板的最小高度。
        minHeight: 10,

        //  增加 easyui-panel/window/dialog 控件的自定义属性，表示 easyui-panel/window/dialog 面板的最大高度。
        maxHeight: 10000,

        //  增加 easyui-panel/window/dialog 控件的自定义属性，重新定义的 onResize 事件。用于扩展四个新增属性 minWidth、maxWidth、minHeight、maxHeight 的功能。
        //onResize: onResize,

        //  重写 easyui-panel/window/dialog 控件的原生事件 onMove，以支持相应扩展功能。
        onMove: onMove,

        //  重写 easyui-panel/window/dialog 控件的原生事件 onBeforeDestroy，以在 easyui-panel/window/dialog 控件执行 destroy 时能够释放浏览器资源。
        onBeforeDestroy: onBeforeDestroy
    };

    $.extend($.fn.panel.defaults, defaults);
    $.extend($.fn.panel.methods, methods);

    $.extend($.fn.panel.defaults, defaults);
    $.extend($.fn.window.defaults, defaults);
    $.extend($.fn.dialog.defaults, defaults);

    $.fn.window.extensions.defaults = $.extend({}, defaults);
    $.fn.dialog.extensions.defaults = $.extend({}, defaults);

})(jQuery);