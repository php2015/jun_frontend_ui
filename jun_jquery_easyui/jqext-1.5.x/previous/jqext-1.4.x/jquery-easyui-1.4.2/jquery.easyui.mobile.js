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
    $.fn.navpanel = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.navpanel.methods[options];
            return method ? method(this, param) : this.panel(options, param);
        } else {
            options = options || {};
            return this.each(function () {
                var state = $.data(this, "navpanel");
                if (state) {
                    $.extend(state.options, options);
                } else {
                    state = $.data(this, "navpanel", {
                        options: $.extend(
                            {},
                            $.fn.navpanel.defaults,
                            $.fn.navpanel.parseOptions(this, options)
                        )
                    });
                }
                $(this).panel(state.options);
            });
        }
    };
    $.fn.navpanel.methods = {
        options: function (jq) {
            return $.data(jq[0], "navpanel").options;
        }
    };
    $.fn.navpanel.parseOptions = function (target) {
        return $.extend(
            {},
            $.fn.panel.parseOptions(target),
            $.parser.parseOptions(target, [])
            );
    };
    $.fn.navpanel.defaults = $.extend(
        {},
        $.fn.panel.defaults,
        { fit: true, border: false, cls: "navpanel" }
    );
    $.parser.plugins.push("navpanel");
})(jQuery);

(function ($) {
    $(function () {
        $.mobile.init();
    });
    $.mobile = {
        defaults: {
            animation: "slide",
            direction: "left",
            reverseDirections: {
                up: "down", down: "up", left: "right", right: "left"
            }
        },
        panels: [],
        init: function (target) {
            $.mobile.panels = [];
            var navpanel = $(target || "body").children(".navpanel:visible");
            if (navpanel.length) {
                navpanel.not(":first").children(".panel-body").navpanel("close");
                var p = navpanel.eq(0).children(".panel-body");
                $.mobile.panels.push({
                    panel: p,
                    animation: $.mobile.defaults.animation,
                    direction: $.mobile.defaults.direction
                });
            }
            $(document).unbind(".mobile").bind("click.mobile", function (e) {
                var a = $(e.target).closest("a");
                if (a.length) {
                    var opts = $.parser.parseOptions(a[0], ["animation", "direction", { back: "boolean" }]);
                    if (opts.back) {
                        $.mobile.back();
                        e.preventDefault();
                    } else {
                        var href = $.trim(a.attr("href"));
                        if (/^#/.test(href)) {
                            var to = $(href);
                            if (to.length && to.hasClass("panel-body")) {
                                $.mobile.go(to, opts.animation, opts.direction);
                                e.preventDefault();
                            }
                        }
                    }
                }
            });
            $(window).unbind(".mobile").bind("hashchange.mobile", function () {
                var length = $.mobile.panels.length;
                if (length > 1) {
                    var hash = location.hash;
                    var p = $.mobile.panels[length - 2];
                    if (!hash || hash == "#&" + p.panel.attr("id")) {
                        $.mobile.hash();
                    }
                }
            });
        },
        nav: function (from, to, animation, direction) {
            if (window.WebKitAnimationEvent) {
                animation = animation != undefined ? animation : $.mobile.defaults.animation;
                direction = direction != undefined ? direction : $.mobile.defaults.direction;
                var _f = "m-" + animation + (direction ? "-" + direction : "");
                var p1 = $(from).panel("open").panel("resize").panel("panel");
                var p2 = $(to).panel("open").panel("resize").panel("panel");
                p1.add(p2).bind("webkitAnimationEnd", function () {
                    $(this).unbind("webkitAnimationEnd");
                    var p = $(this).children(".panel-body");
                    if ($(this).hasClass("m-in")) {
                        p.panel("open").panel("resize");
                    } else {
                        p.panel("close");
                    }
                    $(this).removeClass(_f + " m-in m-out");
                });
                p2.addClass(_f + " m-in");
                p1.addClass(_f + " m-out");
            } else {
                $(to).panel("open").panel("resize");
                $(from).panel("close");
            }
        },
        _go: function (target, animation, direction) {
            animation = animation != undefined ? animation : $.mobile.defaults.animation;
            direction = direction != undefined ? direction : $.mobile.defaults.direction;
            var panel = $.mobile.panels[$.mobile.panels.length - 1].panel;
            var to = $(target);
            if (panel[0] != to[0]) {
                $.mobile.nav(panel, to, animation, direction);
                $.mobile.panels.push({ panel: to, animation: animation, direction: direction });
            }
        },
        _back: function () {
            if ($.mobile.panels.length < 2) {
                return;
            }
            var p1 = $.mobile.panels.pop();
            var p2 = $.mobile.panels[$.mobile.panels.length - 1];
            var animation = p1.animation;
            var direction = $.mobile.defaults.reverseDirections[p1.direction] || "";
            $.mobile.nav(p1.panel, p2.panel, animation, direction);
        },
        go: function (target, animation, direction) {
            animation = animation != undefined ? animation : $.mobile.defaults.animation;
            direction = direction != undefined ? direction : $.mobile.defaults.direction;
            location.hash = "#&" + $(target).attr("id");
            $.mobile._go(target, animation, direction);
        },
        back: function () {
            history.go(-1);
        }
    };

    $.map(
        [
            "validatebox",
            "textbox",
            "filebox",
            "searchbox",
            "combo",
            "combobox",
            "combogrid",
            "combotree",
            "datebox",
            "datetimebox",
            "numberbox",
            "spinner",
            "numberspinner",
            "timespinner",
            "datetimespinner"
        ],
        function (_19) {
            if ($.fn[_19]) {
                $.extend($.fn[_19].defaults, {
                    height: 32,
                    iconWidth: 28,
                    tipPosition: "bottom"
                });
            }
        }
    );

    $.map(
        [
            "spinner",
            "numberspinner",
            "timespinner",
            "datetimespinner"
        ],
        function (plugin) {
            $.extend($.fn[plugin].defaults, {
                height: 32, iconWidth: 56
            });
        }
    );

    $.extend($.fn.menu.defaults, {
        itemHeight: 30, noline: true
    });
})(jQuery);

