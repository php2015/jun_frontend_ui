/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Layout Extensions
* jQuery EasyUI layout 组件扩展
* jeasyui.extensions.layout.js
* 二次开发 流云
* 最近更新：2015-06-01
*
* 依赖项：
*   1、jquery.jdirk.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.layout.extensions");

    $.extend($.fn.layout.extensions, {
        resizeDelay: 500
    });


    function resizeDelay(target) {
        $.util.delay(function () {
            $(target).layout("resize");
        }, $.fn.layout.extensions.resizeDelay);
    }

    function getPanels(target, containsCenter) {
        var t = $(target),
            flag = (containsCenter == null || containsCenter == undefined) ? true : containsCenter,
            regions = flag ? ["north", "west", "east", "center", "south"] : ["north", "west", "east", "south"];
        return $.array.reduce(regions, function (prev, val, index) {
            var p = t.layout("panel", val);
            if (p && p.length) {
                prev.push({ region: val, panel: p });
                prev[val] = p;
            }
            return prev;
        }, []);
    }

    function collapseAll(target) {
        var t = $(target),
            panels = getPanels(target, false);
        $.each(panels, function (index, item) {
            var opts = item.panel.panel("options");
            if (!opts.collapsed) {
                t.layout("collapse", item.region);
            }
        });
        resizeDelay(target);
    }

    function expandAll(target) {
        var t = $(target),
            panels = getPanels(target, false);
        $.each(panels, function (index, item) {
            var opts = item.panel.panel("options");
            if (opts.collapsed) {
                t.layout("expand", item.region);
            }
        });
        resizeDelay(target);
    }

    function toggle(target, region) {
        if (!region || (region != "north" && region != "west" && region != "east" && region != "south")) {
            return;
        }
        var t = $(target),
            p = t.layout("panel", region);
        if (p && p.length) {
            var opts = p.panel("options");
            if (opts.collapsed) {
                t.layout("expand", region);
            } else {
                t.layout("collapse", region);
            }
        }
    }

    function toggleAll(target, type) {
        if (!type || (type != "collapse" && type != "expand" && type != "toggle")) {
            type = "toggle";
        }
        var t = $(target),
            regions = ["north", "west", "east", "south"],
            anyCollapsed = $.array.some(regions, function (region) {
                var p = t.layout("panel", region);
                return p && p.length && p.panel("options").collapsed ? true : false;
            }),
            anyExpanded = $.array.some(regions, function (region) {
                var p = t.layout("panel", region);
                return p && p.length && !p.panel("options").collapsed ? true : false;
            });
        switch (type) {
            case "collapse":
                anyExpanded ? collapseAll(target, false) : expandAll(target, false);
                break;
            case "expand":
                anyCollapsed ? expandAll(target, false) : collapseAll(target, false);
                break;
            case "toggle":
            default:
                toggleRegions();
                break;
        }
        function toggleRegions() {
            $.each(regions, function (i, region) {
                toggle(target, region);
            });
            resizeDelay(target);
        }
    }


    var defaults = $.fn.layout.extensions.defaults = {};

    var methods = $.fn.layout.extensions.methods = {

        // 扩展 easyui-layout 组件的自定义方法；获取 easyui-layout 组件的所有 panel 面板；
        // 该方法的参数 containsCenter 是一个 boolean 类型值，默认为 true；表示返回的数组中是否包含 center panel。
        // 返回值：该方法返回一个 Array 数组对象；数组中的每个元素都是一个包含如下属性定义的 JSON-Object：
        //     region  : String 类型值，表示该面板所在的位置，可能的值为 "north"、"west"、"east"、"center"、"south"；
        //     panel   : jQuery 对象，表示 easyui-panel 面板对象；
        panels: function (jq, containsCenter) { return getPanels(jq[0], containsCenter); },

        // 扩展 easyui-layout 组件的自定义方法；用于折叠 easyui-layout 组件除 center 位置外的所有 panel 面板；
        // 返回值：返回表示当前 easyui-combo layout jQuery 链式对象。
        collapseAll: function (jq) { return jq.each(function () { collapseAll(this); }); },

        // 扩展 easyui-layout 组件的自定义方法；用于展开 easyui-layout 组件除 center 位置外的所有 panel 面板；
        // 返回值：返回表示当前 easyui-combo layout jQuery 链式对象。
        expandAll: function (jq) { return jq.each(function () { expandAll(this); }); },

        // 扩展 easyui-layout 组件的自定义方法；用于切换 panel 面板的 折叠/展开 状态；该方法定义如下参数：
        //     region: String 类型值，表示要切换 折叠/展开 状态的面板的位置；
        // 返回值：返回表示当前 easyui-combo layout jQuery 链式对象。
        toggle: function (jq, region) { return jq.each(function () { toggle(this, region); }); },

        // 扩展 easyui-layout 组件的自定义方法；用于切换所有 panel 面板的 折叠/展开 状态；该方法定义如下参数：
        //     type:   String 类型值，表示在进行 折叠/展开 操作时的操作方式；该参数传入的值限定在以下范围内：
        //         "collapse": 当既有展开的面板也有折叠的面板时，对所有面板执行折叠操作；
        //         "expand"  : 当既有展开的面板也有折叠的面板时，对所有面板执行展开操作；
        //         "toggle"  : 当既有展开的面板也有折叠的面板时，对所有面板执行切换 折叠/展开 状态操作；默认值。
        // 返回值：返回表示当前 easyui-combo layout jQuery 链式对象。
        toggleAll: function (jq, type) { return jq.each(function () { toggleAll(this, type); }); }
    };

    $.extend($.fn.layout.defaults, defaults);
    $.extend($.fn.layout.methods, methods);

})(jQuery);