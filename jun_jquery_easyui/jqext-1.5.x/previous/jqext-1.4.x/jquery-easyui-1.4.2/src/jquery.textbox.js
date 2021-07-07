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
    function getTextBox(target) {
        $(target).addClass("textbox-f").hide();
        var textbox = $("<span class=\"textbox\">" + "<input class=\"textbox-text\" autocomplete=\"off\">" + "<input type=\"hidden\" class=\"textbox-value\">" + "</span>").insertAfter(target);
        var name = $(target).attr("name");
        if (name) {
            textbox.find("input.textbox-value").attr("name", name);
            $(target).removeAttr("name").attr("textboxName", name);
        }
        return textbox;
    };
    function create(target) {
        var state = $.data(target, "textbox");
        var opts = state.options;
        var tb = state.textbox;
        tb.find(".textbox-text").remove();
        if (opts.multiline) {
            $("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
        } else {
            $("<input type=\"" + opts.type + "\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
        }
        tb.find(".textbox-addon").remove();
        var bb = opts.icons ? $.extend(true, [], opts.icons) : [];
        if (opts.iconCls) {
            bb.push({ iconCls: opts.iconCls, disabled: true });
        }
        if (bb.length) {
            var bc = $("<span class=\"textbox-addon\"></span>").prependTo(tb);
            bc.addClass("textbox-addon-" + opts.iconAlign);
            for (var i = 0; i < bb.length; i++) {
                bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon " + bb[i].iconCls + "\" icon-index=\"" + i + "\" tabindex=\"-1\"></a>");
            }
        }
        tb.find(".textbox-button").remove();
        if (opts.buttonText || opts.buttonIcon) {
            var _9 = $("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
            _9.addClass("textbox-button-" + opts.buttonAlign).linkbutton({ text: opts.buttonText, iconCls: opts.buttonIcon });
        }
        setDisabled(target, opts.disabled);
        setReadonly(target, opts.readonly);
    };
    function destroy(target) {
        var tb = $.data(target, "textbox").textbox;
        tb.find(".textbox-text").validatebox("destroy");
        tb.remove();
        $(target).remove();
    };
    function resize(target, width) {
        var state = $.data(target, "textbox");
        var opts = state.options;
        var tb = state.textbox;
        var _13 = tb.parent();
        if (width) {
            opts.width = width;
        }
        if (isNaN(parseInt(opts.width))) {
            var c = $(target).clone();
            c.css("visibility", "hidden");
            c.insertAfter(target);
            opts.width = c.outerWidth();
            c.remove();
        }
        var _14 = tb.is(":visible");
        if (!_14) {
            tb.appendTo("body");
        }
        var _15 = tb.find(".textbox-text");
        var btn = tb.find(".textbox-button");
        var _16 = tb.find(".textbox-addon");
        var _17 = _16.find(".textbox-icon");
        tb._size(opts, _13);
        btn.linkbutton("resize", { height: tb.height() });
        btn.css({ left: (opts.buttonAlign == "left" ? 0 : ""), right: (opts.buttonAlign == "right" ? 0 : "") });
        _16.css({ left: (opts.iconAlign == "left" ? (opts.buttonAlign == "left" ? btn._outerWidth() : 0) : ""), right: (opts.iconAlign == "right" ? (opts.buttonAlign == "right" ? btn._outerWidth() : 0) : "") });
        _17.css({ width: opts.iconWidth + "px", height: tb.height() + "px" });
        _15.css({ paddingLeft: (target.style.paddingLeft || ""), paddingRight: (target.style.paddingRight || ""), marginLeft: _18("left"), marginRight: _18("right") });
        if (opts.multiline) {
            _15.css({ paddingTop: (target.style.paddingTop || ""), paddingBottom: (target.style.paddingBottom || "") });
            _15._outerHeight(tb.height());
        } else {
            var _19 = Math.floor((tb.height() - _15.height()) / 2);
            _15.css({ paddingTop: _19 + "px", paddingBottom: _19 + "px" });
        }
        _15._outerWidth(tb.width() - _17.length * opts.iconWidth - btn._outerWidth());
        if (!_14) {
            tb.insertAfter(target);
        }
        opts.onResize.call(target, opts.width, opts.height);
        function _18(_1a) {
            return (opts.iconAlign == _1a ? _16._outerWidth() : 0) + (opts.buttonAlign == _1a ? btn._outerWidth() : 0);
        };
    };
    function createValidateBox(target) {
        var state = $(target).textbox("options");
        var opts = $(target).textbox("textbox");
        opts.validatebox($.extend({}, state, {
            deltaX: $(target).textbox("getTipX"),
            onBeforeValidate: function () {
                var box = $(this);
                if (!box.is(":focus")) {
                    state.oldInputValue = box.val();
                    box.val(state.value);
                }
            },
            onValidate: function (valid) {
                var box = $(this);
                if (state.oldInputValue != undefined) {
                    box.val(state.oldInputValue);
                    state.oldInputValue = undefined;
                }
                var tb = box.parent();
                if (valid) {
                    tb.removeClass("textbox-invalid");
                } else {
                    tb.addClass("textbox-invalid");
                }
            }
        }));
    };
    function refreshState(target) {
        var state = $.data(target, "textbox");
        var opts = state.options;
        var tb = state.textbox;
        var text = tb.find(".textbox-text");
        text.attr("placeholder", opts.prompt);
        text.unbind(".textbox");
        if (!opts.disabled && !opts.readonly) {
            text.bind("blur.textbox", function (e) {
                if (!tb.hasClass("textbox-focused")) {
                    return;
                }
                opts.value = $(this).val();
                if (opts.value == "") {
                    $(this).val(opts.prompt).addClass("textbox-prompt");
                } else {
                    $(this).removeClass("textbox-prompt");
                }
                tb.removeClass("textbox-focused");
            }).bind("focus.textbox", function (e) {
                if (tb.hasClass("textbox-focused")) {
                    return;
                }
                if ($(this).val() != opts.value) {
                    $(this).val(opts.value);
                }
                $(this).removeClass("textbox-prompt");
                tb.addClass("textbox-focused");
            });
            for (var inputEvent in opts.inputEvents) {
                text.bind(inputEvent + ".textbox", { target: target }, opts.inputEvents[inputEvent]);
            }
        }
        var addon = tb.find(".textbox-addon");
        addon.unbind().bind("click", { target: target }, function (e) {
            var icon = $(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
            if (icon.length) {
                var index = parseInt(icon.attr("icon-index"));
                var iconItem = opts.icons[index];
                if (iconItem && iconItem.handler) {
                    iconItem.handler.call(icon[0], e);
                    opts.onClickIcon.call(target, index);
                }
            }
        });
        addon.find(".textbox-icon").each(function (i) {
            var iconItem = opts.icons[i];
            var icon = $(this);
            if (!iconItem || iconItem.disabled || opts.disabled || opts.readonly) {
                icon.addClass("textbox-icon-disabled");
            } else {
                icon.removeClass("textbox-icon-disabled");
            }
        });
        var btn = tb.find(".textbox-button");
        btn.unbind(".textbox").bind("click.textbox", function () {
            if (!btn.linkbutton("options").disabled) {
                opts.onClickButton.call(target);
            }
        });
        btn.linkbutton((opts.disabled || opts.readonly) ? "disable" : "enable");
        tb.unbind(".textbox").bind("_resize.textbox", function (e, item) {
            if ($(this).hasClass("easyui-fluid") || item) {
                resize(target);
            }
            return false;
        });
    };
    function setDisabled(target, disabled) {
        var state = $.data(target, "textbox");
        var opts = state.options;
        var tb = state.textbox;
        if (disabled) {
            opts.disabled = true;
            $(target).attr("disabled", "disabled");
            tb.addClass("textbox-disabled");
            tb.find(".textbox-text,.textbox-value").attr("disabled", "disabled");
        } else {
            opts.disabled = false;
            tb.removeClass("textbox-disabled");
            $(target).removeAttr("disabled");
            tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
        }
    };
    function setReadonly(target, readonly) {
        var state = $.data(target, "textbox");
        var opts = state.options;
        opts.readonly = readonly == undefined ? true : readonly;
        state.textbox.removeClass("textbox-readonly").addClass(opts.readonly ? "textbox-readonly" : "");
        var textbox = state.textbox.find(".textbox-text");
        textbox.removeAttr("readonly");
        if (opts.readonly || !opts.editable) {
            textbox.attr("readonly", "readonly");
        }
    };
    $.fn.textbox = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.textbox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.each(function () {
                    var tb = $(this).textbox("textbox");
                    tb.validatebox(options, param);
                });
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "textbox");
            if (state) {
                $.extend(state.options, options);
                if (options.value != undefined) {
                    state.options.originalValue = options.value;
                }
            } else {
                state = $.data(this, "textbox", {
                    options: $.extend({}, $.fn.textbox.defaults, $.fn.textbox.parseOptions(this), options),
                    textbox: getTextBox(this)
                });
                state.options.originalValue = state.options.value;
            }
            create(this);
            refreshState(this);
            resize(this);
            createValidateBox(this);
            $(this).textbox("initValue", state.options.value);
        });
    };
    $.fn.textbox.methods = {
        options: function (jq) {
            return $.data(jq[0], "textbox").options;
        },
        cloneFrom: function (jq, source) {
            return jq.each(function () {
                var t = $(this);
                if (t.data("textbox")) {
                    return;
                }
                if (!$(source).data("textbox")) {
                    $(source).textbox();
                }
                var textboxName = t.attr("name") || "";
                t.addClass("textbox-f").hide();
                t.removeAttr("name").attr("textboxName", textboxName);
                var textbox = $(source).next().clone().insertAfter(t);
                textbox.find("input.textbox-value").attr("name", textboxName);
                $.data(this, "textbox", { options: $.extend(true, {}, $(source).textbox("options")), textbox: textbox });
                var button = $(source).textbox("button");
                if (button.length) {
                    t.textbox("button").linkbutton($.extend(true, {}, button.linkbutton("options")));
                }
                refreshState(this);
                createValidateBox(this);
            });
        },
        textbox: function (jq) {
            return $.data(jq[0], "textbox").textbox.find(".textbox-text");
        },
        button: function (jq) {
            return $.data(jq[0], "textbox").textbox.find(".textbox-button");
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroy(this);
            });
        },
        resize: function (jq, _40) {
            return jq.each(function () {
                resize(this, _40);
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
                refreshState(this);
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
                refreshState(this);
            });
        },
        readonly: function (jq, readonly) {
            return jq.each(function () {
                setReadonly(this, readonly);
                refreshState(this);
            });
        },
        isValid: function (jq) {
            return jq.textbox("textbox").validatebox("isValid");
        },
        clear: function (jq) {
            return jq.each(function () {
                $(this).textbox("setValue", "");
            });
        },
        setText: function (jq, text) {
            return jq.each(function () {
                var opts = $(this).textbox("options");
                var textbox = $(this).textbox("textbox");
                if ($(this).textbox("getText") != text) {
                    opts.value = text;
                    textbox.val(text);
                }
                if (!textbox.is(":focus")) {
                    if (text) {
                        textbox.removeClass("textbox-prompt");
                    } else {
                        textbox.val(opts.prompt).addClass("textbox-prompt");
                    }
                }
                $(this).textbox("validate");
            });
        },
        initValue: function (jq, value) {
            return jq.each(function () {
                var state = $.data(this, "textbox");
                state.options.value = "";
                $(this).textbox("setText", value);
                state.textbox.find(".textbox-value").val(value);
                $(this).val(value);
            });
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                var opts = $.data(this, "textbox").options;
                var oldValue = $(this).textbox("getValue");
                $(this).textbox("initValue", value);
                if (oldValue != value) {
                    opts.onChange.call(this, value, oldValue);
                    $(this).closest("form").trigger("_change", [this]);
                }
            });
        },
        getText: function (jq) {
            var textbox = jq.textbox("textbox");
            if (textbox.is(":focus")) {
                return textbox.val();
            } else {
                return jq.textbox("options").value;
            }
        },
        getValue: function (jq) {
            return jq.data("textbox").textbox.find(".textbox-value").val();
        },
        reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).textbox("options");
                $(this).textbox("setValue", opts.originalValue);
            });
        },
        getIcon: function (jq, index) {
            return jq.data("textbox").textbox.find(".textbox-icon:eq(" + index + ")");
        },
        getTipX: function (jq) {
            var state = jq.data("textbox");
            var opts = state.options;
            var tb = state.textbox;
            var textbox = tb.find(".textbox-text");
            var addonWidth = tb.find(".textbox-addon")._outerWidth();
            var buttonWidth = tb.find(".textbox-button")._outerWidth();
            if (opts.tipPosition == "right") {
                return (opts.iconAlign == "right" ? addonWidth : 0) + (opts.buttonAlign == "right" ? buttonWidth : 0) + 1;
            } else {
                if (opts.tipPosition == "left") {
                    return (opts.iconAlign == "left" ? -addonWidth : 0) + (opts.buttonAlign == "left" ? -buttonWidth : 0) - 1;
                } else {
                    return addonWidth / 2 * (opts.iconAlign == "right" ? 1 : -1);
                }
            }
        }
    };
    $.fn.textbox.parseOptions = function (target) {
        var t = $(target);
        return $.extend(
            {},
            $.fn.validatebox.parseOptions(target),
            $.parser.parseOptions(target, [
                "prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign",
                { multiline: "boolean", editable: "boolean", iconWidth: "number" }
            ]),
            {
                value: (t.val() || undefined),
                type: (t.attr("type") ? t.attr("type") : undefined),
                disabled: (t.attr("disabled") ? true : undefined),
                readonly: (t.attr("readonly") ? true : undefined)
            });
    };
    $.fn.textbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
        width: "auto",
        height: 22,
        prompt: "",
        value: "",
        type: "text",
        multiline: false,
        editable: true,
        disabled: false,
        readonly: false,
        icons: [],
        iconCls: null,
        iconAlign: "right",
        iconWidth: 18,
        buttonText: "",
        buttonIcon: null,
        buttonAlign: "right",
        inputEvents: {
            blur: function (e) {
                var t = $(e.data.target);
                var opts = t.textbox("options");
                t.textbox("setValue", opts.value);
            },
            keydown: function (e) {
                if (e.keyCode == 13) {
                    var t = $(e.data.target);
                    t.textbox("setValue", t.textbox("getText"));
                }
            }
        },
        onChange: function (newVlaue, oldValue) {
        },
        onResize: function (width, height) {
        },
        onClickButton: function () {
        },
        onClickIcon: function (index) {
        }
    });
})(jQuery);

