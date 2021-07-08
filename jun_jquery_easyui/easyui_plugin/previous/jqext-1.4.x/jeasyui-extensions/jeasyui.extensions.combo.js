/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Combo Extensions
* jQuery EasyUI combo 组件扩展
* jeasyui.extensions.combo.js
* 二次开发 流云
* 最近更新：2015-06-11
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.linkbutton.js
*   3、jeasyui.extensions.validatebox.js
*   4、jeasyui.extensions.textbox.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.combo.extensions");


    function hideAllComboPanel(target) {
        $.util.pageNestingExecute(function (win) {
            if (!win || !win.document || !win.jQuery) {
                return;
            }
            var jq = win.jQuery;
            if (target) {
                var p = jq(target).closest("span.combo,div.combo-p,div.menu");
                if (p.length) {
                    p.find(".combo-f").each(function () {
                        var pp = jq(this).combo("panel");
                        if (pp.is(":visible")) {
                            pp.panel("close");
                        }
                    });
                    if (target && target.ownerDocument == win.document) {
                        return;
                    }
                }
            }
            jq("body>div.combo-p>div.combo-panel:visible").panel("close");
        });
    }

    $.util.bindDocumentNestingEvent("mousedown.combo-nesting", function (doc, e) {
        hideAllComboPanel(e.target);
    });




    function initializeExtensions(target) {
        var t = $(target),
            state = $.data(target, "combo"),
            opts = state.options;
        t.combo("textbox").click(function () {
            var p = t.combo("panel");
            if (opts.autoShowPanel && p.is(":hidden")) {
                t.combo("showPanel");
            }
        });
    }


    var _combo = $.fn.combo.extensions._combo = $.fn.combo;
    $.fn.combo = function (options, param) {
        if (typeof options == "string") {
            return _combo.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this),
                isInited = $.data(this, "combo") ? true : false,
                opts = isInited ? options : $.extend({},
                        $.fn.combo.parseOptions(this),
                        $.parser.parseOptions(this, [
                            { autoShowPanel: "boolean" }
                        ]), options);
            _combo.call(jq, opts, param);
            if (!isInited) {
                initializeExtensions(this);
            }
        });
    };
    $.union($.fn.combo, _combo);


    var defaults = $.fn.combo.extensions.defaults = {

        //  增加 easyui-combo 的自定义扩展属性；表示该 easyui-combox 组件是否在 textbox 文本框获取焦点时自动执行 showPanel 方法以显示下拉 panel 面板；
        //  Boolean 类型值，默认为 true。
        autoShowPanel: true
    };

    var methods = $.fn.combo.extensions.methods = {
    };

    $.extend($.fn.combo.defaults, defaults);
    $.extend($.fn.combo.methods, methods);

})(jQuery);