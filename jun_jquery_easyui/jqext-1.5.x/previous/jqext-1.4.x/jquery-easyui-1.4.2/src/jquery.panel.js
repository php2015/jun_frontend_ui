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
    $.fn._remove = function () {
        return this.each(function () {
            $(this).remove();
            try {
                this.outerHTML = "";
            }
            catch (err) {
            }
        });
    };
    function _1(_2) {
        _2._remove();
    };
    function resize(target, param) {
        var state = $.data(target, "panel");
        var opts = state.options;
        var panel = state.panel;
        var header = panel.children(".panel-header");
        var body = panel.children(".panel-body");
        var footer = panel.children(".panel-footer");
        if (param) {
            $.extend(opts, {
                width: param.width, height: param.height,
                minWidth: param.minWidth, maxWidth: param.maxWidth,
                minHeight: param.minHeight, maxHeight: param.maxHeight,
                left: param.left, top: param.top
            });
        }
        panel._size(opts);
        header.add(body)._outerWidth(panel.width());
        if (!isNaN(parseInt(opts.height))) {
            body._outerHeight(panel.height() - header._outerHeight() - footer._outerHeight());
        } else {
            body.css("height", "");
            var minHeight = $.parser.parseValue("minHeight", opts.minHeight, panel.parent());
            var maxHeight = $.parser.parseValue("maxHeight", opts.maxHeight, panel.parent());
            var height = header._outerHeight() + footer._outerHeight() + panel._outerHeight() - panel.height();
            body._size("minHeight", minHeight ? (minHeight - height) : "");
            body._size("maxHeight", maxHeight ? (maxHeight - height) : "");
        }
        panel.css({ height: "", minHeight: "", maxHeight: "", left: opts.left, top: opts.top });
        opts.onResize.apply(_4, [opts.width, opts.height]);
        $(target).panel("doLayout");
    };
    function move(target, param) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (param) {
            if (param.left != null) {
                opts.left = param.left;
            }
            if (param.top != null) {
                opts.top = param.top;
            }
        }
        panel.css({ left: opts.left, top: opts.top });
        opts.onMove.apply(target, [opts.left, opts.top]);
    };
    function createPanel(target) {
        $(target).addClass("panel-body")._size("clear");
        var panel = $("<div class=\"panel\"></div>").insertBefore(target);
        panel[0].appendChild(target);
        panel.bind("_resize", function (e, doResize) {
            if ($(this).hasClass("easyui-fluid") || doResize) {
                resize(target);
            }
            return false;
        });
        return panel;
    };
    function initialize(target) {
        var target = $.data(target, "panel");
        var opts = target.options;
        var panel = target.panel;
        panel.css(opts.style);
        panel.addClass(opts.cls);
        _1d();
        _1e();
        var header = $(target).panel("header");
        var body = $(target).panel("body");
        var footer = $(target).siblings(".panel-footer");
        if (opts.border) {
            header.removeClass("panel-header-noborder");
            body.removeClass("panel-body-noborder");
            footer.removeClass("panel-footer-noborder");
        } else {
            header.addClass("panel-header-noborder");
            body.addClass("panel-body-noborder");
            footer.addClass("panel-footer-noborder");
        }
        header.addClass(opts.headerCls);
        body.addClass(opts.bodyCls);
        $(target).attr("id", opts.id || "");
        if (opts.content) {
            $(target).panel("clear");
            $(target).html(opts.content);
            $.parser.parse($(target));
        }
        function _1d() {
            if (opts.noheader || (!opts.title && !opts.header)) {
                _1(panel.children(".panel-header"));
                panel.children(".panel-body").addClass("panel-body-noheader");
            } else {
                if (opts.header) {
                    $(opts.header).addClass("panel-header").prependTo(panel);
                } else {
                    var _22 = panel.children(".panel-header");
                    if (!_22.length) {
                        _22 = $("<div class=\"panel-header\"></div>").prependTo(panel);
                    }
                    if (!$.isArray(opts.tools)) {
                        _22.find("div.panel-tool .panel-tool-a").appendTo(opts.tools);
                    }
                    _22.empty();
                    var _23 = $("<div class=\"panel-title\"></div>").html(opts.title).appendTo(_22);
                    if (opts.iconCls) {
                        _23.addClass("panel-with-icon");
                        $("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_22);
                    }
                    var _24 = $("<div class=\"panel-tool\"></div>").appendTo(_22);
                    _24.bind("click", function (e) {
                        e.stopPropagation();
                    });
                    if (opts.tools) {
                        if ($.isArray(opts.tools)) {
                            $.map(opts.tools, function (t) {
                                _25(_24, t.iconCls, eval(t.handler));
                            });
                        } else {
                            $(opts.tools).children().each(function () {
                                $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_24);
                            });
                        }
                    }
                    if (opts.collapsible) {
                        _25(_24, "panel-tool-collapse", function () {
                            if (opts.collapsed == true) {
                                expand(target, true);
                            } else {
                                collapse(target, true);
                            }
                        });
                    }
                    if (opts.minimizable) {
                        _25(_24, "panel-tool-min", function () {
                            minimize(target);
                        });
                    }
                    if (opts.maximizable) {
                        _25(_24, "panel-tool-max", function () {
                            if (opts.maximized == true) {
                                restore(target);
                            } else {
                                maximize(target);
                            }
                        });
                    }
                    if (opts.closable) {
                        _25(_24, "panel-tool-close", function () {
                            close(target);
                        });
                    }
                }
                panel.children("div.panel-body").removeClass("panel-body-noheader");
            }
        };
        function _25(c, _26, _27) {
            var a = $("<a href=\"javascript:void(0)\"></a>").addClass(_26).appendTo(c);
            a.bind("click", _27);
        };
        function _1e() {
            if (opts.footer) {
                $(opts.footer).addClass("panel-footer").appendTo(panel);
                $(target).addClass("panel-body-nobottom");
            } else {
                panel.children(".panel-footer").remove();
                $(target).removeClass("panel-body-nobottom");
            }
        };
    };
    function refresh(target, href) {
        var state = $.data(target, "panel");
        var opts = state.options;
        if (_2d) {
            opts.queryParams = href;
        }
        if (!opts.href) {
            return;
        }
        if (!state.isLoaded || !opts.cache) {
            var param = $.extend({}, opts.queryParams);
            if (opts.onBeforeLoad.call(target, param) == false) {
                return;
            }
            state.isLoaded = false;
            $(target).panel("clear");
            if (opts.loadingMessage) {
                $(target).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
            }
            opts.loader.call(target, param, function (data) {
                var html = opts.extractor.call(target, data);
                $(target).html(html);
                $.parser.parse($(target));
                opts.onLoad.apply(target, arguments);
                state.isLoaded = true;
            }, function () {
                opts.onLoadError.apply(target, arguments);
            });
        }
    };
    function clear(target) {
        var t = $(target);
        t.find(".combo-f").each(function () {
            $(this).combo("destroy");
        });
        t.find(".m-btn").each(function () {
            $(this).menubutton("destroy");
        });
        t.find(".s-btn").each(function () {
            $(this).splitbutton("destroy");
        });
        t.find(".tooltip-f").each(function () {
            $(this).tooltip("destroy");
        });
        t.children("div").each(function () {
            $(this)._size("unfit");
        });
        t.empty();
    };
    function _32(_33) {
        $(_33).panel("doLayout", true);
    };
    function open(target, forceOpen) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (forceOpen != true) {
            if (opts.onBeforeOpen.call(target) == false) {
                return;
            }
        }
        panel.stop(true, true);
        if ($.isFunction(opts.openAnimation)) {
            opts.openAnimation.call(target, cb);
        } else {
            switch (opts.openAnimation) {
                case "slide":
                    panel.slideDown(opts.openDuration, cb);
                    break;
                case "fade":
                    panel.fadeIn(opts.openDuration, cb);
                    break;
                case "show":
                    panel.show(opts.openDuration, cb);
                    break;
                default:
                    panel.show();
                    cb();
            }
        }
        function cb() {
            opts.closed = false;
            opts.minimized = false;
            var buttons = panel.children(".panel-header").find("a.panel-tool-restore");
            if (buttons.length) {
                opts.maximized = true;
            }
            opts.onOpen.call(target);
            if (opts.maximized == true) {
                opts.maximized = false;
                maximize(target);
            }
            if (opts.collapsed == true) {
                opts.collapsed = false;
                collapse(target);
            }
            if (!opts.collapsed) {
                refresh(target);
                _32(target);
            }
        };
    };
    function close(_3d, forceClose) {
        var _3f = $.data(_3d, "panel").options;
        var _40 = $.data(_3d, "panel").panel;
        if (forceClose != true) {
            if (_3f.onBeforeClose.call(_3d) == false) {
                return;
            }
        }
        _40.stop(true, true);
        _40._size("unfit");
        if ($.isFunction(_3f.closeAnimation)) {
            _3f.closeAnimation.call(_3d, cb);
        } else {
            switch (_3f.closeAnimation) {
                case "slide":
                    _40.slideUp(_3f.closeDuration, cb);
                    break;
                case "fade":
                    _40.fadeOut(_3f.closeDuration, cb);
                    break;
                case "hide":
                    _40.hide(_3f.closeDuration, cb);
                    break;
                default:
                    _40.hide();
                    cb();
            }
        }
        function cb() {
            _3f.closed = true;
            _3f.onClose.call(_3d);
        };
    };
    function destroy(_42, forceDestroy) {
        var _44 = $.data(_42, "panel");
        var _45 = _44.options;
        var _46 = _44.panel;
        if (forceDestroy != true) {
            if (_45.onBeforeDestroy.call(_42) == false) {
                return;
            }
        }
        $(_42).panel("clear").panel("clear", "footer");
        _1(_46);
        _45.onDestroy.call(_42);
    };
    function collapse(_47, animate) {
        var _49 = $.data(_47, "panel").options;
        var _4a = $.data(_47, "panel").panel;
        var _4b = _4a.children(".panel-body");
        var _4c = _4a.children(".panel-header").find("a.panel-tool-collapse");
        if (_49.collapsed == true) {
            return;
        }
        _4b.stop(true, true);
        if (_49.onBeforeCollapse.call(_47) == false) {
            return;
        }
        _4c.addClass("panel-tool-expand");
        if (animate == true) {
            _4b.slideUp("normal", function () {
                _49.collapsed = true;
                _49.onCollapse.call(_47);
            });
        } else {
            _4b.hide();
            _49.collapsed = true;
            _49.onCollapse.call(_47);
        }
    };
    function expand(_4e, animate) {
        var _50 = $.data(_4e, "panel").options;
        var _51 = $.data(_4e, "panel").panel;
        var _52 = _51.children(".panel-body");
        var _53 = _51.children(".panel-header").find("a.panel-tool-collapse");
        if (_50.collapsed == false) {
            return;
        }
        _52.stop(true, true);
        if (_50.onBeforeExpand.call(_4e) == false) {
            return;
        }
        _53.removeClass("panel-tool-expand");
        if (animate == true) {
            _52.slideDown("normal", function () {
                _50.collapsed = false;
                _50.onExpand.call(_4e);
                refresh(_4e);
                _32(_4e);
            });
        } else {
            _52.show();
            _50.collapsed = false;
            _50.onExpand.call(_4e);
            refresh(_4e);
            _32(_4e);
        }
    };
    function maximize(_54) {
        var _55 = $.data(_54, "panel").options;
        var _56 = $.data(_54, "panel").panel;
        var _57 = _56.children(".panel-header").find("a.panel-tool-max");
        if (_55.maximized == true) {
            return;
        }
        _57.addClass("panel-tool-restore");
        if (!$.data(_54, "panel").original) {
            $.data(_54, "panel").original = { width: _55.width, height: _55.height, left: _55.left, top: _55.top, fit: _55.fit };
        }
        _55.left = 0;
        _55.top = 0;
        _55.fit = true;
        resize(_54);
        _55.minimized = false;
        _55.maximized = true;
        _55.onMaximize.call(_54);
    };
    function minimize(_59) {
        var _5a = $.data(_59, "panel").options;
        var _5b = $.data(_59, "panel").panel;
        _5b._size("unfit");
        _5b.hide();
        _5a.minimized = true;
        _5a.maximized = false;
        _5a.onMinimize.call(_59);
    };
    function restore(_5d) {
        var _5e = $.data(_5d, "panel").options;
        var _5f = $.data(_5d, "panel").panel;
        var _60 = _5f.children(".panel-header").find("a.panel-tool-max");
        if (_5e.maximized == false) {
            return;
        }
        _5f.show();
        _60.removeClass("panel-tool-restore");
        $.extend(_5e, $.data(_5d, "panel").original);
        resize(_5d);
        _5e.minimized = false;
        _5e.maximized = false;
        $.data(_5d, "panel").original = null;
        _5e.onRestore.call(_5d);
    };
    function setTitle(_62, title) {
        $.data(_62, "panel").options.title = title;
        $(_62).panel("header").find("div.panel-title").html(title);
    };
    var _64 = null;
    $(window).unbind(".panel").bind("resize.panel", function () {
        if (_64) {
            clearTimeout(_64);
        }
        _64 = setTimeout(function () {
            var _65 = $("body.layout");
            if (_65.length) {
                _65.layout("resize");
                $("body").children(".easyui-fluid:visible").each(function () {
                    $(this).triggerHandler("_resize");
                });
            } else {
                $("body").panel("doLayout");
            }
            _64 = null;
        }, 100);
    });
    $.fn.panel = function (options, param) {
        if (typeof options == "string") {
            return $.fn.panel.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "panel");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.isLoaded = false;
            } else {
                opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), options);
                $(this).attr("title", "");
                state = $.data(this, "panel", { options: opts, panel: createPanel(this), isLoaded: false });
            }
            initialize(this);
            if (opts.doSize == true) {
                state.panel.css("display", "block");
                resize(this);
            }
            if (opts.closed == true || opts.minimized == true) {
                state.panel.hide();
            } else {
                open(this);
            }
        });
    };
    $.fn.panel.methods = {
        options: function (jq) {
            return $.data(jq[0], "panel").options;
        }, panel: function (jq) {
            return $.data(jq[0], "panel").panel;
        }, header: function (jq) {
            return $.data(jq[0], "panel").panel.children(".panel-header");
        }, footer: function (jq) {
            return jq.panel("panel").children(".panel-footer");
        }, body: function (jq) {
            return $.data(jq[0], "panel").panel.children(".panel-body");
        }, setTitle: function (jq, title) {
            return jq.each(function () {
                setTitle(this, title);
            });
        }, open: function (jq, forceOpen) {
            return jq.each(function () {
                open(this, forceOpen);
            });
        }, close: function (jq, forceClose) {
            return jq.each(function () {
                close(this, forceClose);
            });
        }, destroy: function (jq, forceDestroy) {
            return jq.each(function () {
                destroy(this, forceDestroy);
            });
        }, clear: function (jq, footer) {
            return jq.each(function () {
                clear(footer == "footer" ? $(this).panel("footer") : this);
            });
        }, refresh: function (jq, href) {
            return jq.each(function () {
                var state = $.data(this, "panel");
                state.isLoaded = false;
                if (href) {
                    if (typeof href == "string") {
                        state.options.href = href;
                    } else {
                        state.options.queryParams = href;
                    }
                }
                refresh(this);
            });
        }, resize: function (jq, options) {
            return jq.each(function () {
                resize(this, options);
            });
        }, doLayout: function (jq, all) {
            return jq.each(function () {
                doLayout(this, "body");
                doLayout($(this).siblings(".panel-footer")[0], "footer");
                function doLayout(target, footer) {
                    if (!target) {
                        return;
                    }
                    var isBody = target == $("body")[0];
                    var s = $(target).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function (index, el) {
                        var p = $(el).parents(".panel-" + footer + ":first");
                        return isBody ? p.length == 0 : p[0] == target;
                    });
                    s.each(function () {
                        $(this).triggerHandler("_resize", [all || false]);
                    });
                };
            });
        }, move: function (jq, options) {
            return jq.each(function () {
                move(this, options);
            });
        }, maximize: function (jq) {
            return jq.each(function () {
                maximize(this);
            });
        }, minimize: function (jq) {
            return jq.each(function () {
                minimize(this);
            });
        }, restore: function (jq) {
            return jq.each(function () {
                restore(this);
            });
        }, collapse: function (jq, animate) {
            return jq.each(function () {
                collapse(this, animate);
            });
        }, expand: function (jq, animate) {
            return jq.each(function () {
                expand(this, animate);
            });
        }
    };
    $.fn.panel.parseOptions = function (target) {
        var t = $(target);
        var hh = t.children(".panel-header,header");
        var ff = t.children(".panel-footer,footer");
        return $.extend({},
            $.parser.parseOptions(target, [
                "id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer",
                { cache: "boolean", fit: "boolean", border: "boolean", noheader: "boolean" },
                { collapsible: "boolean", minimizable: "boolean", maximizable: "boolean" },
                { closable: "boolean", collapsed: "boolean", minimized: "boolean", maximized: "boolean", closed: "boolean" },
                "openAnimation", "closeAnimation",
                { openDuration: "number", closeDuration: "number" },
            ]),
            {
                loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined),
                header: (hh.length ? hh.removeClass("panel-header") : undefined),
                footer: (ff.length ? ff.removeClass("panel-footer") : undefined)
            });
    };
    $.fn.panel.defaults = {
        id: null,
        title: null,
        iconCls: null,
        width: "auto",
        height: "auto",
        left: null,
        top: null,
        cls: null,
        headerCls: null,
        bodyCls: null,
        style: {},
        href: null,
        cache: true,
        fit: false,
        border: true,
        doSize: true,
        noheader: false,
        content: null,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        closed: false,
        openAnimation: false,
        openDuration: 400,
        closeAnimation: false,
        closeDuration: 400,
        tools: null,
        footer: null,
        header: null,
        queryParams: {},
        method: "get",
        href: null,
        loadingMessage: "Loading...",
        loader: function (param, success, error) {
            var opts = $(this).panel("options");
            if (!opts.href) {
                return false;
            }
            $.ajax({
                type: opts.method, url: opts.href, cache: false, data: param, dataType: "html", success: function (data) {
                    success(data);
                }, error: function () {
                    error.apply(this, arguments);
                }
            });
        }, extractor: function (data) {
            var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var matches = pattern.exec(data);
            if (matches) {
                return matches[1];
            } else {
                return data;
            }
        }, onBeforeLoad: function (param) {
        }, onLoad: function () {
        }, onLoadError: function () {
        }, onBeforeOpen: function () {
        }, onOpen: function () {
        }, onBeforeClose: function () {
        }, onClose: function () {
        }, onBeforeDestroy: function () {
        }, onDestroy: function () {
        }, onResize: function (width, height) {
        }, onMove: function (left, top) {
        }, onMaximize: function () {
        }, onRestore: function () {
        }, onMinimize: function () {
        }, onBeforeCollapse: function () {
        }, onBeforeExpand: function () {
        }, onCollapse: function () {
        }, onExpand: function () {
        }
    };
})(jQuery);

