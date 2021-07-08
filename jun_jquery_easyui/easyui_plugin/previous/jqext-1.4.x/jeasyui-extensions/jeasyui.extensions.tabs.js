/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Tabs Extensions
* jQuery EasyUI tabs 组件扩展
* jeasyui.extensions.tabs.js
* 二次开发 流云
* 最近更新：2015-07-14
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.js
*   3、jeasyui.extensions.messager.js
*   4、jeasyui.extensions.menu.js
*   5、jeasyui.extensions.linkbutton.js
*   6、jeasyui.extensions.panel.js
*   7、jeasyui.extensions.window.js
*   8、jeasyui.extensions.dialog.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.tabs.extensions");

    $.extend($.fn.tabs.extensions, {
        add: $.fn.tabs.methods.add,
        update: $.fn.tabs.methods.update
    });

    function addTab(target, options) {
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options,
            index = $.isNumeric(options.index) ? options.index : -1,
            popts = $.extend({}, $.fn.tabs.extensions.tabOptions, options || {}),
            poptsbak = $.extend({}, popts);
        updateTabLoading(t, opts, index, popts);
        $.fn.tabs.extensions.add.call(t, t, popts);
    }

    function updateTab(target, param) {
        param = $.extend({ tab: null, type: "all", options: null }, param);
        if (!param.tab || !param.tab.length) {
            return;
        }
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options,
            index = t.tabs("getTabIndex", param.tab),
            popts = $.union(param.options, $.fn.tabs.extensions.tabOptions),
            poptsbak = $.extend({}, popts);

        if (param.type == "all") {
            beginUpdateHeader(t, opts, index, popts);
            updateTabLoading(t, opts, index, popts);
            $.fn.tabs.extensions.update.call(t, t, { tab: param.tab, type: param.type, options: popts });
            endUpdateHeader(t, opts, index, poptsbak);

        } else if (param.type == "header") {
            beginUpdateHeader(t, opts, index, popts);
            $.fn.tabs.extensions.update.call(t, t, { tab: param.tab, type: param.type, options: popts });
            endUpdateHeader(t, opts, index, poptsbak);

        } else if (param.type == "body") {
            updateTabLoading(t, opts, index, popts);
            $.fn.tabs.extensions.update.call(t, t, { tab: param.tab, type: param.type, options: popts });
        }
    }

    function beginUpdateHeader(t, opts, index, popts) {
        if (popts.refreshable) {
            popts.tools = $.array.likeArrayNotString(popts.tools)
                ? $.array.merge([], popts.tools, $.fn.tabs.extensions.tabMiniButtons)
                : $.array.merge([], $.fn.tabs.extensions.tabMiniButtons);
        }
        updateTabLineheight(t, opts);
    }

    function endUpdateHeader(t, opts, index, poptsbak) {
        var p = t.tabs("getTab", index),
            popts = p.panel("options");
        popts.tools = poptsbak.tools;
        if (popts.closable) {
            t.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li>.tabs-inner").eq(index).attr("title", "双击此选项卡标题可以将其关闭");
        }
        if (opts.dnd) {
            enableDnd(t[0], index);
        }
    }

    function updateTabLoading(t, opts, index, popts) {
        if (popts.href && (opts.loading == "mask" || opts.loading == "progress") && (popts.selected || index == -1 || t.tabs("getTabIndex", t.tabs("getSelected")) == index)) {
            var target = t[0],
                onBeforeLoad = popts.onBeforeLoad,
                onLoad = popts.onLoad,
                onLoadError = popts.onLoadError;
            popts.onBeforeLoad = function () {
                var ret = $.isFunction(onBeforeLoad) ? onBeforeLoad.apply(this, arguments) : undefined;
                loading(target);
                if (ret == false) {
                    loaded(target);
                }
                return ret;
            };
            popts.onLoad = function () {
                var ret = $.isFunction(onLoad) ? onLoad.apply(this, arguments) : undefined;
                $.util.delay(function () {
                    loaded(target);
                });
                popts.onLoad = onLoad;
                return ret;
            };
            popts.onLoadError = function () {
                var ret = $.isFunction(onLoadError) ? onLoadError.apply(this, arguments) : undefined;
                $.util.delay(function () {
                    loaded(target);
                });
                popts.onLoadError = onLoadError;
                return ret;
            };
        }
    }


    function updateTabLineheight(t, opts) {
        if (opts.lineheight > 0) {
            var pos = opts.tabPosition;
            if (pos != "top" && pos != "bottom" && pos != "left" && pos != "right") {
                pos = "top";
            }
            t.children("div.tabs-panels").css("padding-" + pos, opts.lineheight + "px").children().children().css("border-" + pos + "-width", "1px");
        }
    }


    function loading(target) {
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options;
        if (opts.loading == "mask") {
            $.easyui.loading({
                topMost: false,
                locale: target,
                msg: opts.loadMsg
            });
        } else if (opts.loading == "progress") {
            $.messager.progress({
                title: "操作提醒",
                msg: opts.loadMsg,
                interval: 100
            });
        }
    }

    function loaded(target) {
        var t = $(target),
                state = $.data(target, "tabs"),
                opts = state.options;
        if (opts.loading == "mask") {
            $.easyui.loaded({ topMost: false, locale: target });
        } else if (opts.loading == "progress") {
            $.messager.progress("close");
        }
    }


    function insertTab(target, param) {
        if (!param || param.which == null || param.which == undefined || !param.options) {
            return;
        }
        if (param.point == null || param.point == undefined) {
            param.point = "before";
        }
        if (param.point != "before" && param.point != "after") {
            return;
        }
        var t = $(target),
            type = $.type(param.which),
            p = (type == "number" || type == "string") ? t.tabs("getTab", param.which) : $(param.which),
            index = t.tabs("getTabIndex", p);
        if (index == -1) {
            return;
        }
        var i = param.point == "before" ? index : index + 1,
            popts = $.extend({}, param.options, {
                index: i
            });
        t.tabs("add", popts);
    }


    function openTab(target, which) {
        var t = $(target),
            tab = (which == null || which == undefined) ? t.tabs("getSelected") : t.tabs("getTab", which),
            popts = tab.panel("options");
        if (popts.href && popts.iniframe) {
            window.open(popts.href, "_blank");
        } else {
            $.easyui.messager.show("\"" + popts.title + "\" 选项卡不可在新页面中打开。");
        }
    }

    function newTab(target, which) {
        var content = $("<table></table>").css({ width: "95%", height: "100%" }),
            txtTitle = $("<input type='text' style='width: 98%;'/>"),
            txtHref = $("<input type='text' style='width: 98%;'/>"),
            ckRefreshable = $("<input id='refreshable' type='checkbox' checked='true' />"),
            ckIniframe = $("<input id='iniframe' type='checkbox' />"),
            lblRefreshable = $("<label>是否可刷新</label>"),
            lblIniframe = $("<label>是否嵌至 IFRAME(浏览器内部窗体) 中</label>"),
            tr1 = $("<tr></tr>").append("<td width='24%' align='right'>选项卡标题：</td>").appendTo(content),
            tr2 = $("<tr></tr>").append("<td width='24%' align='right'>路径(href)：</td>").appendTo(content),
            tr3 = $("<tr></tr>").appendTo(content);

        $("<td></td>").append(txtTitle).appendTo(tr1);
        $("<td></td>").append(txtHref).appendTo(tr2);
        $("<td width='24%' align='right'></td>").append(ckRefreshable).append(lblRefreshable).appendTo(tr3);
        $("<td align='right'></td>").append(ckIniframe).append(lblIniframe).appendTo(tr3);

        var t = $(target),
            offset = (which != null && which != undefined) ? t.tabs("getTab", which).panel("header").offset() : t.offset(),
            pos = { left: offset.left + 10, top: offset.top + 10 },
            dopts = $.extend({
                iconCls: "icon-standard-application-form",
                title: "新建选项卡 - 设置参数",
                width: 400,
                height: 165,
                maximizable: false,
                resizable: false,
                vcenter: false,
                hcenter: false,
                enableSaveButton: true,
                enableCloseButton: false,
                enableApplyButton: false,
                topMost: false,
                saveButtonIndex: 1,
                saveButtonText: "打开",
                onSave: function (dia) {
                    var title = txtTitle.val(),
                        href = txtHref.val();
                    href = href || $.fn.tabs.extensions.tabOptions.href;
                    if ($.string.isNullOrWhiteSpace(title)) {
                        title = "新建选项卡";
                    }
                    var i = 0;
                    while (t.tabs("getTab", title = title + (i ? i : ""))) {
                        i++;
                    }
                    if ($.string.isNullOrWhiteSpace(href)) {
                        $.easyui.messager.show("操作提醒", "请输入要创建的选项卡的路径！", "info");
                        txtHref.focus();
                        return false;
                    }
                    var iniframe = ckIniframe.prop("checked"),
                        refreshable = ckRefreshable.prop("checked");
                    t.tabs("add", {
                        title: title,
                        href: href,
                        refreshable: refreshable,
                        closable: true,
                        iniframe: iniframe
                    });
                },
                content: content
            }, pos);

        var d = $.easyui.showDialog(dopts);
        $.util.delay(function () {
            var enter = d.saveButton.target;
            txtTitle.keydown(function (e) {
                if (e.which == 13) { txtHref.focus(); }
            });
            txtHref.keydown(function (e) {
                if (e.which == 13) {
                    ckRefreshable.focus();
                }
            });
            ckRefreshable.keydown(function (e) {
                if (e.which == 13) {
                    ckIniframe.focus();
                }
            });
            ckIniframe.keydown(function (e) {
                if (e.which == 13) {
                    enter.focus();
                }
            });
            lblRefreshable.click(function () {
                ckRefreshable.click();
            });
            lblIniframe.click(function () {
                ckIniframe.click();
            });
            enter.focus();
            txtTitle.focus();
        });
    }

    function repeatTab(target, which) {
        var t = $(target),
            p = t.tabs("getTab", which),
            popts = p.panel("options");
        var opts = $.extend({}, popts, { selected: true, closable: true }),
            i = 2,
            title = opts.title;
        while (t.tabs("getTab", opts.title = title + "-" + i.toString())) {
            i++;
        }
        t.tabs("add", {
            title: opts.title,
            content: opts.content,
            href: opts.href,
            iniframe: opts.iniframe,
            cache: opts.cache,
            iconCls: opts.iconCls,
            collapsible: opts.collapsible,
            bodyCls: opts.bodyCls,
            border: opts.border,
            doSize: opts.doSize,
            method: opts.method,
            queryParams: opts.queryParams,
            loader: opts.loader,
            repeatable: opts.repeatable,
            refreshable: opts.refreshable,
            closeOnDblClick: opts.closeOnDblClick,
            selected: opts.selected,
            closable: opts.closable
        });
    }

    function showOption(target, which) {
        var t = $(target),
            opts,
            pos;
        if (which != null && which != undefined) {
            var p = t.tabs("getTab", which);
            opts = p.panel("options");
            pos = p.panel("header").offset();
        } else {
            var state = $.data(target, "tabs");
            opts = state.options;
            pos = t.offset();
        }
        $.easyui.showOption(opts, { left: pos.left + 25, top: pos.top + 15 });
    }

    function refreshTab(target, which) {
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options,
            p = t.tabs("getTab", which),
            popts = p.panel("options");
        if ($.string.isNullOrWhiteSpace(popts.href)) {
            return;
        }
        var index = t.tabs("getTabIndex", p)
        if ($.isFunction(opts.onBeforeRefresh) && opts.onBeforeRefresh.call(target, opts.title, index) == false) {
            return;
        }
        updateTabLoading(t, opts, index, popts);
        p.panel("refresh");
        if ($.isFunction(opts.onRefresh)) {
            opts.onRefresh.call(target, opts.title, index);
        }
    }

    function setTitle(target, param) {
        if (!param || param.which == null || param.which == undefined || !param.title) {
            return;
        }
        var t = $(target),
            p = t.tabs("getTab", param.which);
        p.panel("setTitle", param.title);
    }

    function isSelected(target, which) {
        var t = $(target),
            p = t.tabs("getSelected"),
            index = t.tabs("getTabIndex", p),
            tab = t.tabs("getTab", which),
            tabIndex = t.tabs("getTabIndex", tab);
        return index == tabIndex;
    }

    function isClosable(target, which) {
        var t = $(target),
            p = t.tabs("getTab", which),
            popts = p.panel("options");
        return popts.closable;
    }

    function isDisabled(target, which) {
        return $(target).tabs("getTab", which).panel("options").tab.is(".tabs-disabled");
    }

    function getTabOption(target, which) {
        var t = $(target),
            p = t.tabs("getTab", which),
            popts = p.panel("options");
        return popts;
    }

    function getSelectedOption(target) {
        var t = $(target),
            p = t.tabs("getSelected"),
            popts = p.panel("options");
        return popts;
    }

    function getSelectedIndex(target) {
        var t = $(target),
            p = t.tabs("getSelected");
        return t.tabs("getTabIndex", p);
    }

    function getSelectedTitle(target) {
        return getSelectedOption(target).title;
    }


    function leftTabs(target, which) {
        var t = $(target),
            index = $.isNumeric(which) ? which : t.tabs("getTabIndex", t.tabs("getTab", which)),
            panels = t.tabs("tabs");
        return $.array.range(panels, 0, index);
    }

    function rightTabs(target, which) {
        var tabs = $(target),
            index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.range(panels, index + 1);
    }

    function otherTabs(target, which) {
        var tabs = $(target),
            index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.merge($.array.range(panels, 0, index), $.array.range(panels, index + 1));
    }


    function closableFinder(p) {
        return p.panel("options").closable;
    }

    function closableTabs(target) {
        var t = $(target),
            panels = t.tabs("tabs");
        return $.array.filter(panels, closableFinder);
    }

    function leftClosableTabs(target, which) {
        var panels = leftTabs(target, which);
        return $.array.filter(panels, closableFinder);
    }

    function rightClosableTabs(target, which) {
        var panels = rightTabs(target, which);
        return $.array.filter(panels, closableFinder);
    }

    function otherClosableTabs(target, which) {
        var panels = otherTabs(target, which);
        return $.array.filter(panels, closableFinder);
    }


    function closeLeftTabs(target, which) {
        var t = $(target),
            panels = leftTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }

    function closeRightTabs(target, which) {
        var t = $(target),
            panels = rightTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }

    function closeOtherTabs(target, which) {
        var t = $(target),
            panels = otherTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }

    function closeAllTabs(target) {
        var t = $(target),
            panels = t.tabs("tabs");
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }


    function closeClosableTab(target, which) {
        var t = $(target),
            p = t.tabs("getTab", which);
        if (p && p.panel("options").closable) {
            var index = $.isNumeric(which) ? which : t.tabs("getTabIndex", panel);
            t.tabs("close", index);
        }
    }

    function closeLeftClosableTabs(target, which) {
        var t = $(target),
            panels = leftClosableTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }

    function closeRightClosableTabs(target, which) {
        var t = $(target),
            panels = rightClosableTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }

    function closeOtherClosableTabs(target, which) {
        var t = $(target),
            panels = otherClosableTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }

    function closeAllClosableTabs(target, which) {
        var t = $(target),
            panels = closableTabs(target, which);
        $.each($.array.clone(panels), function () {
            t.tabs("close", t.tabs("getTabIndex", this));
        });
    }


    //  param: { target: numer | string | DOM | jQuery, source: numer | string | DOM | jQuery, point: string("before"/default, "after") }
    function moveTab(target, param) {
        if (param == undefined || param == null
            || param.source == undefined || param.source == null
            || param.target == undefined || param.target == null) {
            return;
        }
        var t = $(target),
            sourceType = $.type(param.source),
            sourceTab = (sourceType == "number" || sourceType == "string") ? t.tabs("getTab", param.source) : $(param.source),
            sourceIndex = t.tabs("getTabIndex", sourceTab);
        if (sourceIndex == -1) {
            return;
        }
        var targetType = $.type(param.target),
            targetTab = (targetType == "number" || targetType == "string") ? t.tabs("getTab", param.target) : $(param.target),
            targetIndex = t.tabs("getTabIndex", targetTab);
        if (targetIndex == -1 || targetIndex == sourceIndex) {
            return;
        }
        sourceTab = t.tabs("getTab", sourceIndex);
        targetTab = t.tabs("getTab", targetIndex);

        var point = (param.point == "before" || param.point == "after") ? param.point : "before";
        if ((point == "before" && sourceIndex == (targetIndex - 1)) || (point == "after" && (sourceIndex == targetIndex + 1))) {
            return;
        }
        var state = $.data(target, "tabs"),
            opts = state.options;
        if ($.isFunction(opts.onBeforeMove) && opts.onBeforeMove.call(target, targetTab[0], sourceTab[0], point) == false) {
            return;
        }

        var tabs = t.tabs("tabs"),
            sourceHeader = sourceTab.panel("header"),
            targetHeader = targetTab.panel("header"),
            sourcePanel = sourceTab.panel("panel"),
            targetPanel = targetTab.panel("panel");

        $.array.removeAt(tabs, sourceIndex);
        var i = targetIndex > sourceIndex ? targetIndex - 1 : targetIndex;
        $.array.insert(tabs, point == "before" ? i : i + 1, sourceTab);

        targetHeader[point](sourceHeader);
        targetPanel[point](sourcePanel);

        if ($.isFunction(opts.onMove)) {
            opts.onMove.call(target, targetTab[0], sourceTab[0], point);
        }
    }

    function enableDnd(target, which) {
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options,
            list = t.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li>.tabs-inner");
        list.droppable({
            accept: ".tabs-inner",
            onDragEnter: function (e, source) {
                var dragger = $(source),
                    dropper = $(this),
                    sourceLi = dragger.closest("li"),
                    targetLi = dropper.closest("li"),
                    sourceIndex = sourceLi.index(),
                    targetIndex = targetLi.index(),
                    sourceTab = t.tabs("getTab", sourceIndex),
                    targetTab = t.tabs("getTab", targetIndex);
                if ($.isFunction(opts.onDragEnter) && opts.onDragEnter.call(target, targetTab, sourceTab) == false) {
                    setDraggableStatus(dragger, true);
                    targetLi.removeClass("tabs-dnd-left tabs-dnd-right tabs-dnd-top tabs-dnd-bottom");
                    dropper.droppable("disable");
                }
            },
            onDragOver: function (e, source) {
                var dragger = $(source),
                    dropper = $(this),
                    sourceLi = dragger.closest("li"),
                    targetLi = dropper.closest("li"),
                    sourceIndex = sourceLi.index(),
                    targetIndex = targetLi.index(),
                    sourceTab = t.tabs("getTab", sourceIndex),
                    targetTab = t.tabs("getTab", targetIndex),
                    proxy = dragger.draggable("proxy"),
                    cls = (opts.tabPosition == "top" || opts.tabPosition == "bottom")
                        ? (proxy.offset().left + 25 > dropper.offset().left + targetLi.width() / 2 ? "tabs-dnd-right" : "tabs-dnd-left")
                        : (proxy.offset().top - 5 > dropper.offset().top + targetLi.height() / 2 ? "tabs-dnd-bottom" : "tabs-dnd-top");
                setDraggableStatus(dragger, true);
                targetLi.removeClass("tabs-dnd-left tabs-dnd-right tabs-dnd-top tabs-dnd-bottom").addClass(cls);
                if ($.isFunction(opts.onDragOver) && opts.onDragOver.call(target, targetTab, sourceTab) == false) {
                    setDraggableStatus(dragger, true);
                    targetLi.removeClass("tabs-dnd-left tabs-dnd-right tabs-dnd-top tabs-dnd-bottom");
                    dropper.droppable("disable");
                }
            },
            onDragLeave: function (e, source) {
                var dragger = $(source),
                    dropper = $(this),
                    sourceLi = dragger.closest("li"),
                    targetLi = dropper.closest("li"),
                    sourceIndex = sourceLi.index(),
                    targetIndex = targetLi.index(),
                    sourceTab = t.tabs("getTab", sourceIndex),
                    targetTab = t.tabs("getTab", targetIndex);
                setDraggableStatus(dragger, false);
                targetLi.removeClass("tabs-dnd-left tabs-dnd-right tabs-dnd-top tabs-dnd-bottom");
                if ($.isFunction(opts.onDragLeave)) {
                    opts.onDragLeave.call(target, targetTab, sourceTab);
                }
            },
            onDrop: function (e, source) {
                var dragger = $(source),
                    dropper = $(this),
                    sourceLi = dragger.closest("li"),
                    targetLi = dropper.closest("li"),
                    sourceIndex = sourceLi.index(),
                    targetIndex = targetLi.index(),
                    sourceTab = t.tabs("getTab", sourceIndex),
                    targetTab = t.tabs("getTab", targetIndex),
                    point = (opts.tabPosition == "top" || opts.tabPosition == "bottom")
                        ? (targetLi.is(".tabs-dnd-left") ? "before" : "after")
                        : (targetLi.is(".tabs-dnd-top") ? "before" : "after");
                if ($.isFunction(opts.onBeforeDrop) && opts.onBeforeDrop.call(target, targetTab, sourceTab, point)) {
                    targetLi.removeClass("tabs-dnd-left tabs-dnd-right tabs-dnd-top tabs-dnd-bottom");
                    return;
                }
                t.tabs("move", {
                    source: sourceIndex, target: targetIndex, point: point
                });
                targetLi.removeClass("tabs-dnd-left tabs-dnd-right tabs-dnd-top tabs-dnd-bottom");
                if ($.isFunction(opts.onDrop)) {
                    opts.onDrop.call(target, targetTab, sourceTab, point);
                }
            }
        });
        if (which != null && which != undefined) {
            var p = t.tabs("getTab", which),
                index = t.tabs("getTabIndex", p);
            list = list.eq(index);
        }
        list.draggable({
            disabled: false, revert: true, edge: 5, delay: 300, cursor: "default", deltaX: -25, deltaY: 5,
            proxy: function (source) {
                var html = $(source).clone(),
                    icon = "<span class='tree-dnd-icon tree-dnd-no' >&nbsp;</span>";
                return $("<div class=\"tree-node-proxy\"></div>").appendTo("body").append(icon).append(html).hide();
            },
            onBeforeDrag: function (e) {
                if (e.which != 1) {
                    return false;
                }
                var li = $(this).closest("li"),
                    index = li.index(),
                    disabled = isDisabled(target, index);
                if (disabled) {
                    return false;
                }
                var title = getTabOption(target, index).title;
                if ($.isFunction(opts.onBeforeDrag) && opts.onBeforeDrag.call(target, title, index) == false) {
                    return false;
                }
            },
            onStartDrag: function (e) {
                $(this).draggable("proxy").css({
                    left: -10000, top: -10000
                });
                var panels = t.children(".tabs-panels").addClass("tabs-dnd-panels");
                state.shade = $("<div class='tabs-dnd-shade'></div>").appendTo(panels);

                var li = $(this).closest("li"),
                    index = li.index(),
                    title = getTabOption(target, index).title;
                if ($.isFunction(opts.onStartDrag)) {
                    opts.onStartDrag.call(target, title, index);
                }
            },
            onStopDrag: function () {
                t.children(".tabs-panels").removeClass("tabs-dnd-panels");
                if (state.shade && state.shade.length) {
                    state.shade.remove();
                    state.shade = undefined;
                }
                var li = $(this).closest("li"),
                    index = li.index(),
                    title = getTabOption(target, index).title;
                if ($.isFunction(opts.onStopDrag)) {
                    opts.onStopDrag.call(target, title, index);
                }
            },
            onDrag: function (e) {
                var x1 = e.pageX, y1 = e.pageY,
                    x2 = e.data.startX, y2 = e.data.startY,
                    d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 10) {
                    $(this).draggable("proxy").show();
                }
                this.pageY = e.pageY;
            }
        });
        function setDraggableStatus(source, state) {
            var icon = source.draggable("proxy").find("span.tree-dnd-icon");
            icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(state ? "tree-dnd-yes" : "tree-dnd-no");
        }
    }

    function disableDnd(target, which) {
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options,
            list = t.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li>.tabs-inner");

        if (which != null && which != undefined) {
            var p = t.tabs("getTab", which),
                index = t.tabs("getTabIndex", p);
            list = list.eq(index);
        } else {
            opts.dnd = false;
        }
        list.draggable("disable");
    }



    function initializeExtensions(target) {
        var t = $(target),
            state = $.data(target, "tabs"),
            opts = state.options;
        initContextMenu(t, opts);
        initTabHeaderDblClickEvent(t, opts);
        initTabHeaderDnd(t, opts);
    }

    function initContextMenu(t, opts) {
        t.children("div.tabs-header").unbind(".tabs-contextmenu").bind({
            "contextmenu.tabs-contextmenu": function (e) {
                var li = $(e.target).closest('li');
                if (li.length && !li.is(".tabs-disabled")) {
                    e.preventDefault();
                    var title = li.find("span.tabs-title").html(),
                        index = li.index(),
                        menuItems = getContextMenuItems(t, opts, e, title, index);
                    $.easyui.showMenu({ items: menuItems, left: e.pageX, top: e.pageY, event: e });
                }
            },
            "click.tabs-contextmenu": function (e) {
                $.easyui.hideAllMenu();
            }
        });
    }

    function initTabHeaderDblClickEvent(t, opts) {
        t.children("div.tabs-header").delegate(".tabs-inner", "dblclick", function (e) {
            var li = $(e.target).closest('li');
            if (li.length && !li.is(".tabs-disabled")) {
                var index = li.index(),
                    popts = getTabOption(t[0], index);
                if (popts.closeOnDblClick && popts.closable) {
                    t.tabs("close", index);
                }
            }
        });
    }

    function initTabHeaderDnd(t, opts) {
        if (opts.dnd) {
            enableDnd(t[0]);
        }
    }

    function getContextMenuItems(t, opts, e, title, index) {
        var menuItems = [],
            defaultMenuItems = [],
            popts = getTabOption(t[0], index),
            args = [t[0], title, index];

        if (opts.enableOpenTabMenu) {
            $.array.merge(defaultMenuItems, $.fn.tabs.extensions.openTabMenus);
        }
        if (opts.showOption) {
            $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.tabs.extensions.optionMenus);
        }
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.tabs.extensions.closeTabsMenus);
        if (popts.refreshable) {
            $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.tabs.extensions.refreshTabMenus);
        }
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.tabs.extensions.closeOtherTabsMenus);
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.tabs.extensions.newTabMenus);

        if ($.array.likeArrayNotString(opts.contextMenu)) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], opts.contextMenu);
        }
        if (defaultMenuItems.length) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], defaultMenuItems);
        }
        return $.easyui.parseMenuItems(menuItems, args);
    }


    $.fn.tabs.extensions.openTabMenus = [
        {
            text: '在新页面中打开', iconCls: 'icon-standard-shape-move-forwards',
            disabled: function (e, menuItem, menu, target, title, index) {
                var popts = getTabOption(target, index);
                return popts.href && popts.iniframe ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                openTab(target, index);
            }
        }
    ];
    $.fn.tabs.extensions.optionMenus = [
        {
            text: "显示 Option", iconCls: "icon-standard-application-form",
            disabled: function (e, menuItem, menu, target, title, index) {
                return $(target).tabs("options").showOption ? false : true;
            },
            children: [
                {
                    text: "选项卡组 Option", iconCls: "icon-standard-tab-go",
                    handler: function (e, menuItem, menu, target, title, index) {
                        showOption(target);
                    }
                },
                {
                    text: "该选项卡 Option", iconCls: "icon-standard-tab",
                    handler: function (e, menuItem, menu, target, title, index) {
                        showOption(target, index);
                    }
                }
            ]
        }
    ];
    $.fn.tabs.extensions.closeTabsMenus = [
        {
            text: "关闭选项卡", iconCls: "icon-standard-application-form-delete",
            disabled: function (e, menuItem, menu, target, title, index) {
                return getTabOption(target, index).closable ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                closeClosableTab(target, index);
            }
        },
        {
            text: "关闭其他选项卡", iconCls: "icon-standard-cancel",
            disabled: function (e, menuItem, menu, target, title, index) {
                return otherClosableTabs(target, index).length ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                closeOtherClosableTabs(target, index);
            }
        }
    ];
    $.fn.tabs.extensions.refreshTabMenus = [
        {
            text: "刷新选项卡", iconCls: "icon-standard-table-refresh",
            disabled: function (e, menuItem, menu, target, title, index) {
                var popts = getTabOption(target, index);
                return popts.refreshable && popts.href ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                refreshTab(target, index);
            }
        }
    ];
    $.fn.tabs.extensions.closeOtherTabsMenus = [
        {
            text: "关闭左侧选项卡", iconCls: "icon-standard-tab-close-left",
            disabled: function (e, menuItem, menu, target, title, index) {
                return leftClosableTabs(target, index).length ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                closeLeftClosableTabs(target, index);
            }
        },
        {
            text: "关闭右侧选项卡", iconCls: "icon-standard-tab-close-right",
            disabled: function (e, menuItem, menu, target, title, index) {
                return rightClosableTabs(target, index).length ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                closeRightClosableTabs(target, index);
            }
        },
        {
            text: "关闭所有选项卡", iconCls: "icon-standard-cross",
            disabled: function (e, menuItem, menu, target, title, index) {
                return closableTabs(target).length ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                closeAllClosableTabs(target, index);
            }
        }
    ];
    $.fn.tabs.extensions.newTabMenus = [
        {
            text: "新建选项卡", iconCls: "icon-standard-tab-add",
            disabled: function (e, menuItem, menu, target, title, index) {
                return $(target).tabs("options").enableNewTabMenu ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                newTab(target, index);
            }
        },
        {
            text: "重复选项卡", iconCls: "icon-standard-control-repeat",
            disabled: function (e, menuItem, menu, target, title, index) {
                return getTabOption(target, index).repeatable ? false : true;
            },
            handler: function (e, menuItem, menu, target, title, index) {
                repeatTab(target, index);
            }
        }
    ];
    $.fn.tabs.extensions.tabMiniButtons = [
        {
            iconCls: "icon-mini-refresh",
            handler: function () {
                var li = $(this).closest("li"),
                    index = li.index();
                $.util.delay(function () {
                    var target = li.closest(".tabs-container")[0];
                    refreshTab(target, index);
                });
            }
        }
    ];


    $.fn.tabs.extensions.closeCurrentTab = function (target, iniframe) {
        if (!target) {
            return;
        }
        var isiframe = iniframe && !$.util.isUtilTop ? true : false;
        if (isiframe && ($.util.currentFrame == null || $.util.currentFrame == undefined)) {
            return;
        }
        var jq = isiframe ? $.util.parent.$ : $,
            current = isiframe ? jq($.util.currentFrame) : jq(target),
            t = current.currentTabs();
        if (t.length) {
            var index = current.currentTabIndex();
            if (index > -1) {
                t.tabs("close", index);
            }
        }
    };

    $.fn.tabs.extensions.refreshCurrentTab = function (target, iniframe) {
        if (!target) {
            return;
        }
        var isiframe = iniframe && !$.util.isUtilTop ? true : false;
        if (isiframe && ($.util.currentFrame == null || $.util.currentFrame == undefined)) {
            return;
        }
        var jq = isiframe ? $.util.parent.$ : $,
            current = isiframe ? jq($.util.currentFrame) : jq(target),
            t = current.currentTabs();
        if (t.length) {
            var index = current.currentTabIndex();
            if (index > -1) {
                t.tabs("refresh", index);
            }
        }
    };


    var _tabs = $.fn.tabs.extensions._tabs = $.fn.tabs;
    $.fn.tabs = function (options, param) {
        if (typeof options == "string") {
            return _tabs.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this),
                isInited = $.data(this, "tabs") ? true : false,
                opts = isInited ? options : $.extend({},
                        $.fn.tabs.parseOptions(this),
                        $.parser.parseOptions(this, [
                            "loading", "loadMsg",
                            { lineheight: "number" },
                            {
                                enableConextMenu: "boolean", enableNewTabMenu: "boolean",
                                enableOpenTabMenu: "boolean", showOption: "boolean"
                            }
                        ]), options);
            _tabs.call(jq, opts, param);
            if (!isInited) {
                initializeExtensions(this);
            }
        });
    };
    $.union($.fn.tabs, _tabs);



    var tabOptions = $.fn.tabs.extensions.tabOptions = {

        //  该选项卡的 href 是否在 iframe 中打开。
        iniframe: false,

        //  该选项卡是否具有重复打开功能
        repeatable: false,

        //  该选项卡是否具有刷新功能。
        refreshable: true,

        //  双击选项卡标题是否能将其关闭，当该选项卡 closable: true 时，该属性有效。
        closeOnDblClick: true,

        //  选项卡页指向的 url 地址
        href: null,

        // 选项卡页图标
        iconCls: "icon-standard-application-form"
    };

    var methods = $.fn.tabs.extensions.methods = {

        //  覆盖 easyui-tabs 的原生方法 add，以支持扩展的功能；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        add: function (jq, options) { return jq.each(function () { addTab(this, options); }); },

        //  覆盖 easyui-tabs 的原生方法 update，以支持扩展的功能；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        update: function (jq, param) { return jq.each(function () { updateTab(this, param); }); },

        //  在当前 easyui-tabs 组件上创建一个新的选项卡，并将其移动至指定选项卡的前一格位置；该方法的参数 param 为包含如下属性的 JSON-Object 对象：
        //      options:  表示要创建的新选项卡的属性；是一个 JSON-Object 对象；
        //          该对象的各项属性参考 easyui-tabs 中 add 方法的参数 options，并在此基础上增加了如下属性：
        //      which : Number、String、jQuery 或 DOM 类型值，表示移动位置的 tab-panel 的索引号、标题 title 值或 jQuery 对象、DOM 对象；
        //      point : 表示新选项卡插入的位置
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        insert: function (jq, param) { return jq.each(function () { insertTab(this, param); }); },

        //  将指定的选项卡在新页面中打开；该方法定义如下参数：
        //      which:  可选值参数；表示需要在新页面打开的的选项卡的 索引号(index) 或者原标题名(title)；如果未传入该参数，则对当前选中的选项卡进行操作。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        openTab: function (jq, which) { return jq.each(function () { openTab(this, which); }); },

        //  弹出一个 easyui-dialog，可以在该 dialog 中输入参数以在当前选项卡组件中创建一个新的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题，可选，默认为 0；该参数用于指示弹出的 easyui-dialog 出现的位置。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        newTab: function (jq, which) { return jq.each(function () { newTab(this, which); }); },

        //  创建一个和指定选项卡相同内容的新选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        repeat: function (jq, which) { return jq.each(function () { repeatTab(this, which); }); },

        //  刷新指定的选项卡；该方法定义如下参数：
        //      which:  表示被刷新的选项卡的 索引号（从 0 开始计数） 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        refresh: function (jq, which) { return jq.each(function () { refreshTab(this, which); }); },

        //  以 easyui-dialog 的方式弹出一个 dialog 对话框窗体，该窗体中显示指定选项卡的所有属性值(options)；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。该参数可选；如果不定义该参数，则显示选项卡组的 options 信息。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        showOption: function (jq, which) { return jq.each(function () { showOption(this, which); }); },

        //  判断指定的选项卡是否被选中；该方法定义如下参数：
        //      which:  要判断的选项卡的 索引号 或者 标题。
        //  返回值：如果指定的选项卡被选中，则返回 true，否则返回 false。
        isSelected: function (jq, which) { return isSelected(jq[0], which); },

        //  判断指定的选项卡是否可关闭(closable:true)；该方法定义如下参数：
        //      which:  要判断的选项卡的 索引号 或者 标题。
        //  返回值：如果指定的选项卡可被关闭(closable:true)，则返回 true，否则返回 false。
        isClosable: function (jq, which) { return isClosable(jq[0], which); },

        //  判断制定的选项卡是否已被禁用；该方法定义如下参数：
        //      which:  要判断的选项卡的 索引号 或者 标题。
        //  返回值：如果指定的选项卡已被禁用（被执行 disableTab 操作），则返回 true，否则返回 false。
        isDisabled: function (jq, which) { return isDisabled(jq[0], which); },

        //  获取指定选项卡的属性值集合(option)；
        getTabOption: function (jq, which) { return getTabOption(jq[0], which); },

        //  获取当前选中的选项卡的属性值集合 (option)；
        getSelectedOption: function (jq) { return getSelectedOption(jq[0]); },

        //  获取当前选中的选项卡的索引号；
        getSelectedIndex: function (jq) { return getSelectedIndex(jq[0]); },

        //  获取当前选中的选项卡的标题。
        getSelectedTitle: function (jq) { return getSelectedTitle(jq[0]); },

        //  获取指定选项卡的左侧所有选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡左侧没有其他选项卡，则返回一个空数组。
        leftTabs: function (jq, which) { return leftTabs(jq[0], which); },

        //  获取指定选项卡的右侧所有选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡右侧没有其他选项卡，则返回一个空数组。
        rightTabs: function (jq, which) { return rightTabs(jq[0], which); },

        //  获取当前选项卡控件中除指定选项卡页在的其他所有选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果当前选项卡控件除指定的选项卡页外没有其他选项卡，则返回一个空数组。
        otherTabs: function (jq, which) { return otherTabs(jq[0], which); },

        //  获取所有可关闭的选项卡页元素集合；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果没有可关闭的选项卡，则返回一个空数组。
        closableTabs: function (jq) { return closableTabs(jq[0]); },

        //  获取指定选项卡左侧的所有可关闭的选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡左侧没有可关闭的选项卡，则返回一个空数组。
        leftClosableTabs: function (jq, which) { return leftClosableTabs(jq[0], which); },

        //  获取指定选项卡右侧的所有可关闭的选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果指定选项卡右侧没有可关闭的选项卡，则返回一个空数组。
        rightClosableTabs: function (jq, which) { return rightClosableTabs(jq[0], which); },

        //  获取当前选项卡控件中除指定选项卡页在的其他所有可关闭的选项卡元素；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回一个数组，数组中的每一项都是一个表示选项卡页的 panel(jQuery) 对象；
        //      如果当前选项卡控件除指定的选项卡页外没有其他可关闭的选项卡，则返回一个空数组。
        otherClosableTabs: function (jq, which) { return otherClosableTabs(jq[0], which); },

        //  关闭指定选项卡左侧的所有选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeLeft: function (jq, which) { return jq.each(function () { closeLeftTabs(this, which); }); },

        //  关闭指定选项卡右侧的所有选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeRight: function (jq, which) { return jq.each(function () { closeRightTabs(this, which); }); },

        //  关闭除指定选项卡外的其他所有选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeOther: function (jq, which) { return jq.each(function () { closeOtherTabs(this, which); }); },

        //  关闭所有选项卡；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeAll: function (jq) { return jq.each(function () { closeAllTabs(this); }); },

        //  指定指定的选项卡，但是如果该选项卡不可被关闭(closable:false)，则不执行任何动作；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeClosable: function (jq, which) { return jq.each(function () { closeClosableTab(this, which); }); },

        //  指定指定的选项卡左侧的所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeLeftClosable: function (jq, which) { return jq.each(function () { closeLeftClosableTabs(this, which); }); },

        //  指定指定的选项卡右侧的所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeRightClosable: function (jq, which) { return jq.each(function () { closeRightClosableTabs(this, which); }); },

        //  指定除指定选项卡外的所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeOtherClosable: function (jq, which) { return jq.each(function () { closeOtherClosableTabs(this, which); }); },

        //  指定所有可关闭的选项卡；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        closeAllClosable: function (jq) { return jq.each(function () { closeAllClosableTabs(this); }); },

        //  将指定的 easyui-tabs tab-panel 选项卡页移动至另一位置；该方法定义如下参数：
        //      param:  这是一个 JSON-Object 对象，该对象定义如下属性：
        //          target: Number、String、jQuery 或 DOM 类型值，表示移动目标位置的 tab-panel 的索引号、标题 title 值或 jQuery 对象、DOM 对象；
        //          source: Number、String、jQuery 或 DOM 类型值，表示要移动的 tab-panel 的索引号、标题 title 值或 jQuery 对象、DOM 对象；
        //          point:  移动到目标位置的方式，String 类型值，仅限于定义为如下值：
        //              "before":   表示把 source 选项卡移动至 target 选项卡的前面，默认值；
        //              "after":    表示把 source 选项卡移动至 target 选项卡的后面；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        move: function (jq, param) { return jq.each(function () { moveTab(this, param); }); },

        //  启用 easyui-tabs 选项卡组件的选项卡头拖动排序功能；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。该参数可选，如果未指定该参数，则表示启用 easyui-tabs 组件所有选项卡的选项卡头拖动排序功能。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        enableDnd: function (jq, which) { return jq.each(function () { enableDnd(this, which); }); },

        //  禁用 easyui-tabs 选项卡组件的选项卡头拖动排序功能；该方法定义如下参数：
        //      which:  指定的选项卡的 索引号 或者 标题。该参数可选，如果未指定该参数，则表示禁用 easyui-tabs 组件所有选项卡的选项卡头拖动排序功能。
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        disableDnd: function (jq, which) { return jq.each(function () { disableDnd(this, which); }); },

        //  显示 easyui-tabs 组件的选项卡页面加载状态遮罩层；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        loading: function (jq) { return jq.each(function () { loading(this); }); },

        //  关闭 easyui-tabs 组件的选项卡页面加载状态遮罩层；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        loaded: function (jq) { return jq.each(function () { loaded(this); }); },

        //  重设指定选项卡的标题名；该方法定义如下参数：
        //      param:  这是一个 JSON-Object 对象，该对象定义如下属性：
        //          which: 需要重设标题名的选项卡的 索引号(index) 或者原标题名(title)；
        //          title: 新的标题名；
        //  返回值：返回表示当前选项卡控件 easyui-tabs 的 jQuery 链式对象。
        setTitle: function (jq, param) { return jq.each(function () { setTitle(this, param); }); }
    };

    var defaults = $.fn.tabs.extensions.defaults = {

        //  增加 easyui-tabs 的自定义扩展属性，该属性表示当前选项卡标题栏和选项卡的 pane-body 之间的空白区域高(宽)度(px)；
        //  该参数是一个 Number 数值，默认为 2.
        lineheight: 2,

        //  是否启用点击选项卡头的右键菜单。
        enableConextMenu: true,

        //  是否启用 “创建新选项卡” 的右键菜单。
        enableNewTabMenu: false,

        //  是否启用 "在新页面中打开" 选项卡的右键菜单。
        enableOpenTabMenu: false,

        //  定义当 enableContextMenu 为 true 时，右键点击选项卡标题时候弹出的自定义右键菜单项内容；
        //  这是一个数组格式对象，数组中的每一项都是一个 menu-item 元素；该 menu-item 元素格式定义如下：
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, menuItem, menu, target, title, index)，其中 this 指向菜单项本身
        contextMenu: null,

        //  增加 easyui-tabs 的自定义扩展属性；该属性表示当 easyui-tabs 组件加载 panel 时，显示的遮蔽层进度条类型。
        //  String 类型值，可选的值限定范围如下：
        //      "mask": 表示遮蔽层 mask-loading 进度显示，默认值
        //      "progress": 表示调用 $.messager.progress 进行进度条效果显示
        //      "none": 表示不显示遮蔽层和进度条
        loading: "mask",

        //  增加 easyui-tabs 的自定义扩展属性；该属性表示当 easyui-tabs 组件加载 panel 时，显示的遮蔽层提示文字内容。
        loadMsg: "正在加载数据，请稍等...",

        //  增加 easyui-tabs 的自定义扩展事件，当调用 easyui-tabs 的 refresh 方法前，将触发该事件。如果该事件函数返回 false，将中断 refresh 方法的执行。
        onBeforeRefresh: function (title, index) { },

        //  增加 easyui-tabs 的自定义扩展事件，当调用 easyui-tabs 的 refresh 方法后，将触发该事件。
        onRefresh: function (title, index) { },

        //  增加 easyui-tabs 的自定义扩展事件，当调用 easyui-tabs 的 move 方法前，将触发该事件。如果该事件函数返回 false，将中断 move 方法的执行。
        //  该事件回调函数签名中定义如下参数：
        //      target: html-DOM 类型值，表示移动目标位置的 tab-panel 的 DOM 对象；
        //      source: html-DOM 类型值，表示要移动的 tab-panel 的 DOM 对象；
        //      point : 移动到目标位置的方式，String 类型值，仅限于定义为如下值：
        //          "before":   表示把 source 选项卡移动至 target 选项卡的前面，默认值；
        //          "after":    表示把 source 选项卡移动至 target 选项卡的后面；
        onBeforeMove: function (target, source, point) { },

        //  增加 easyui-tabs 的自定义扩展事件，当调用 easyui-tabs 的 move 方法后，将触发该事件。
        //  该事件回调函数签名中定义如下参数：
        //      target: html-DOM 类型值，表示移动目标位置的 tab-panel 的 DOM 对象；
        //      source: html-DOM 类型值，表示要移动的 tab-panel 的 DOM 对象；
        //      point : 移动到目标位置的方式，String 类型值，仅限于定义为如下值：
        //          "before":   表示把 source 选项卡移动至 target 选项卡的前面，默认值；
        //          "after":    表示把 source 选项卡移动至 target 选项卡的后面；
        onMove: function (target, source, point) { },

        //  增加 easyui-tabs 的自定义扩展属性；表示当右键点击选项卡头时，是否显示 "显示该选项卡的 option" 菜单项。
        //  Boolean 类型值，默认为 false。
        showOption: false,

        //  增加 easyui-tabs 的自定义扩展属性；表示是否启用选项卡组件的选项卡头拖动排序功能；
        //  Boolean 类型值，默认为 false。
        dnd: false,

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在开始拖动选项卡头前瞬间所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      title : 表示被拖动的选项卡的标题；
        //      index : 表示被拖动的选项卡的索引号（从 0 开始计数）。
        //  如果该事件函数返回 false，则将取消该选项卡的拖动行为。
        onBeforeDrag: function (title, index) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在开始拖动选项卡头后瞬间所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      title : 表示被拖动的选项卡的标题；
        //      index : 表示被拖动的选项卡的索引号（从 0 开始计数）。
        onStartDrag: function (title, index) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在停止拖动选项卡头后瞬间所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      title : 表示被拖动的选项卡的标题；
        //      index : 表示被拖动的选项卡的索引号（从 0 开始计数）。
        onStopDrag: function (title, index) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在拖动一个选项卡头进入另一个选项卡头区域前瞬间所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      target : 表示当前拖放到的目标位置的选项卡的 jQuery-DOM 对象。
        //      source : 表示被拖动的选项卡的 jQuery-DOM 对象。
        //      point  : 表示被拖动的选项卡当前处于拖放到的目标位置选项卡的具体位置，该参数可能的值为：
        //          "before": 表示 source 处于 target 的前一格位置；
        //          "after" : 表示 source 处于 target 的后一格位置；
        //  如果该事件函数返回 false，则将取消该选项卡的拖动放置行为。
        onDragEnter: function (target, source) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在拖动一个选项卡头进入另一个选项卡头区域后在其上方移动时所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      target : 表示当前拖放到的目标位置的选项卡的 jQuery-DOM 对象。
        //      source : 表示被拖动的选项卡的 jQuery-DOM 对象。
        //      point  : 表示被拖动的选项卡当前处于拖放到的目标位置选项卡的具体位置，该参数可能的值为：
        //          "before": 表示 source 处于 target 的前一格位置；
        //          "after" : 表示 source 处于 target 的后一格位置；
        //  如果该事件函数返回 false，则将立即取消该选项卡的拖动放置行为。
        onDragOver: function (target, source) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在拖动一个选项卡头进入另一个选项卡头区域后并拖动离开该区域时所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      target : 表示当前拖放到的目标位置的选项卡的 jQuery-DOM 对象。
        //      source : 表示被拖动的选项卡的 jQuery-DOM 对象。
        //      point  : 表示被拖动的选项卡当前处于拖放到的目标位置选项卡的具体位置，该参数可能的值为：
        //          "before": 表示 source 处于 target 的前一格位置；
        //          "after" : 表示 source 处于 target 的后一格位置；
        onDragLeave: function (target, source) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在拖动一个选项卡头进入另一个选项卡头区域后，松开鼠标以将被拖动的选项卡放置在相应位置前瞬间所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      target : 表示当前拖放到的目标位置的选项卡的 jQuery-DOM 对象。
        //      source : 表示被拖动的选项卡的 jQuery-DOM 对象。
        //      point  : 表示被拖动的选项卡当前处于拖放到的目标位置选项卡的具体位置，该参数可能的值为：
        //          "before": 表示 source 处于 target 的前一格位置；
        //          "after" : 表示 source 处于 target 的后一格位置；
        //  如果该事件函数返回 false，则将立即取消该选项卡的拖动放置行为。
        onBeforeDrop: function (target, source, point) { },

        //  增加 easyui-tabs 的自定义扩展事件；表示当启用选项卡头拖动排序功能时（dnd: true），在拖动一个选项卡头进入另一个选项卡头区域后，松开鼠标以将被拖动的选项卡放置在相应位置后瞬间所触发的动作。
        //  该事件函数签名中定义如下参数：
        //      target : 表示当前拖放到的目标位置的选项卡的 jQuery-DOM 对象。
        //      source : 表示被拖动的选项卡的 jQuery-DOM 对象。
        //      point  : 表示被拖动的选项卡当前处于拖放到的目标位置选项卡的具体位置，该参数可能的值为：
        //          "before": 表示 source 处于 target 的前一格位置；
        //          "after" : 表示 source 处于 target 的后一格位置；
        onDrop: function (target, source, point) { }
    };

    $.extend($.fn.panel.defaults, $.fn.tabs.extensions.tabOptions);

    $.extend($.fn.tabs.defaults, defaults);
    $.extend($.fn.tabs.methods, methods);

    $.fn.extend({

        //  扩展 jQuery 对象的实例方法；用于关闭当前对象所在的 easyui-tabs 当前选项卡(支持当前选项卡页面为 iframe 加载的情况)。
        //  该方法定义如下参数：
        //      iniframe: Boolean 类型值，表示是否为关闭当前对象所在的父级页面的选项卡；默认为 false。
        //          如果当前页面为顶级页面，
        //          或者当前对象在 iframe 中但是不在当前iframe中的某个 easyui-tabs 内，则参数参数 inframe 无效。
        //  返回值：返回当前 jQuery 链式对象(实际上返回的 jQuery 对象中，所包含的元素已经被销毁，因为其容器 tab-panel 被关闭销毁了)。
        closeCurrentTab: function (iniframe) { return this.each(function () { $.fn.tabs.extensions.closeCurrentTab(this, iniframe); }); },

        //  扩展 jQuery 对象的实例方法；用于刷新当前对象所在的 easyui-tabs 当前选项卡(支持当前选项卡页面为 iframe 加载的情况)。
        //  该方法定义如下参数：
        //      iniframe: Boolean 类型值，表示是否为刷新当前对象所在的父级页面的选项卡；默认为 false。
        //          如果当前页面为顶级页面，
        //          或者当前对象在 iframe 中但是不在当前iframe中的某个 easyui-tabs 内，则参数参数 inframe 无效。
        //  返回值：返回当前 jQuery 链式对象。
        refreshCurrentTab: function (iniframe) { return this.each(function () { $.fn.tabs.extensions.refreshCurrentTab(this, iniframe); }); }
    });

})(jQuery);