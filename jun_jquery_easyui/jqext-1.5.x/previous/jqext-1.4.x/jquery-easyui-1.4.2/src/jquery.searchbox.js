/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function ($) {
    function initialize(target) {
        var state = $.data(target, "searchbox");
        var opts = state.options;
        var icons = $.extend(true, [], opts.icons);
        icons.push({
            iconCls: "searchbox-button", handler: function (e) {
                var t = $(e.data.target);
                var topts = t.searchbox("options");
                topts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
            }
        });
        createMenu();
        var menuItem = getMenuItem();
        $(target).addClass("searchbox-f").textbox($.extend({}, opts, {
            icons: icons,
            buttonText: (menuItem ? menuItem.text : "")
        }));
        $(target).attr("searchboxName", $(target).attr("textboxName"));
        state.searchbox = $(target).next();
        state.searchbox.addClass("searchbox");
        selectMenuItem(menuItem);
        function createMenu() {
            if (opts.menu) {
                state.menu = $(opts.menu).menu();
                var mopts = state.menu.menu("options");
                var onClick = mopts.onClick;
                mopts.onClick = function (mitem) {
                    selectMenuItem(mitem);
                    onClick.call(this, mitem);
                };
            } else {
                if (state.menu) {
                    state.menu.menu("destroy");
                }
                state.menu = null;
            }
        };
        function getMenuItem() {
            if (state.menu) {
                var itemEle = state.menu.children("div.menu-item:first");
                state.menu.children("div.menu-item").each(function () {
                    var itemOpts = $.extend({}, $.parser.parseOptions(this), {
                        selected: ($(this).attr("selected") ? true : undefined)
                    });
                    if (itemOpts.selected) {
                        itemEle = $(this);
                        return false;
                    }
                });
                return state.menu.menu("getItem", itemEle[0]);
            } else {
                return null;
            }
        };
        function selectMenuItem(itemOpts) {
            if (!itemOpts) {
                return;
            }
            $(target).textbox("button").menubutton({
                text: itemOpts.text,
                iconCls: (itemOpts.iconCls || null),
                menu: state.menu,
                menuAlign: _4.buttonAlign,
                plain: false
            });
            state.searchbox.find("input.textbox-value").attr("name", itemOpts.name || itemOpts.text);
            $(target).searchbox("resize");
        };
    };

    $.fn.searchbox = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.searchbox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.textbox(options, param);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "searchbox");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "searchbox", { options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), options) });
            }
            initialize(this);
        });
    };
    $.fn.searchbox.methods = {
        options: function (jq) {
            var opts = jq.textbox("options");
            return $.extend($.data(jq[0], "searchbox").options, {
                width: opts.width,
                value: opts.value,
                originalValue: opts.originalValue,
                disabled: opts.disabled,
                readonly: opts.readonly
            });
        },
        menu: function (jq) {
            return $.data(jq[0], "searchbox").menu;
        },
        getName: function (jq) {
            return $.data(jq[0], "searchbox").searchbox.find("input.textbox-value").attr("name");
        },
        selectName: function (jq, name) {
            return jq.each(function () {
                var menu = $.data(this, "searchbox").menu;
                if (menu) {
                    menu.children("div.menu-item").each(function () {
                        var menuItem = menu.menu("getItem", this);
                        if (menuItem.name == name) {
                            $(this).triggerHandler("click");
                            return false;
                        }
                    });
                }
            });
        },
        destroy: function (jq) {
            return jq.each(function () {
                var _19 = $(this).searchbox("menu");
                if (_19) {
                    _19.menu("destroy");
                }
                $(this).textbox("destroy");
            });
        }
    };
    $.fn.searchbox.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.fn.textbox.parseOptions(target),
            $.parser.parseOptions(target, ["menu"]),
            {
                searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined)
            });
    };
    $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
        inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
            keydown: function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    var t = $(e.data.target);
                    var opts = t.searchbox("options");
                    t.searchbox("setValue", $(this).val());
                    opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                    return false;
                }
            }
        }),
        buttonAlign: "left",
        menu: null,
        searcher: function (value, name) {
        }
    });
})(jQuery);

