/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Tree Extensions
* jQuery EasyUI tree 组件扩展
* jeasyui.extensions.tree.js
* 二次开发 流云
* 最近更新：2015-06-03
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.js
*   3、jeasyui.extensions.menu.js
*   4、jeasyui.extensions.linkbutton.js
*   5、jeasyui.extensions.panel.js
*   6、jeasyui.extensions.window.js
*   7、jeasyui.extensions.dialog.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.tree.extensions");


    function isRoot(target, nodeTarget) {
        var t = $(target),
            nodeDOM = $(nodeTarget)[0],
            roots = t.tree("getRoots");
        return $.array.some(roots, function (node) {
            return node.target == nodeDOM;
        });
    }

    function showOption(target, nodeTarget) {
        var t = $(target), opts, pos;
        if (nodeTarget) {
            nodeDOM = $(nodeTarget)[0];
            opts = t.tree("getNode", nodeDOM);
            pos = $(nodeDOM).offset();
        } else {
            opts = t.tree("options");
            pos = t.offset();
        }
        $.extend(pos, {
            left: pos.left + 25,
            top: pos.top + 15
        });
        $.easyui.showOption(opts, pos);
    }

    function getLevel(target, nodeTarget) {
        var t = $(target),
            node = $(nodeTarget);
        if (!t[0] || !node[0] || !node.is(".tree-node") || !$.contains(t[0], node[0])) {
            return -1;
        }
        return node.parentsUntil("ul.tree", "ul").length;
    }

    function isParent(target, param) {
        var t = $(target),
            target1 = $(param.target1)[0],
            target2 = $(param.target2)[0];
        var children = t.tree("getChildren", target1);
        return $.array.some(children, function (val) {
            return val.target == target2;
        });
    }

    function isChild(target, param) {
        var t = $(target),
            target1 = $(param.target1)[0],
            target2 = $(param.target2)[0];
        var children = t.tree("getChildren", target2);
        return $.array.some(children, function (val) {
            return val.target == target1;
        });
    }

    function isSibling(target, param) {
        var t = $(target),
            target1 = $(param.target1)[0],
            target2 = $(param.target2)[0],
            p1 = t.tree("getParent", target1),
            p2 = t.tree("getParent", target2);
        return p1.target == p2.target;
    }

    function compare(target, param) {
        if (isChild(target, param)) {
            return "child";
        }
        if (isParent(target, param)) {
            return "parent";
        }
        if (isSibling(target, param)) {
            return "sibling";
        }
        return "normal";
    }


    function prev(target, nodeTarget) {
        var node = $(nodeTarget);
        if (!node.is(".tree-node")) {
            return null;
        }
        var other = node.closest("li").prev().children(".tree-node");
        if (!other.length) {
            return null;
        }
        return other.length ? $(target).tree("getNode", other[0]) : null;
    }

    function next(target, nodeTarget) {
        var node = $(nodeTarget);
        if (!node.is(".tree-node")) {
            return null;
        }
        var other = node.closest("li").next().children(".tree-node");
        if (!other.length) {
            return null;
        }
        return other.length ? $(target).tree("getNode", other[0]) : null;
    }

    function siblings(target, nodeTarget) {
        var t = $(target),
            node = $(nodeTarget);
        if (!$.contains(t[0], node[0]) || !node.is(".tree-node")) {
            return null;
        }
        var result = [];
        node.closest("ul").find("li>.tree-node").each(function () {
            var n = t.tree("getNode", this);
            result.push(n);
        });
        return result;
    }

    function getNearChildren(target, nodeTarget) {
        var t = $(target),
            node = $(nodeTarget);
        if (!$.contains(t[0], node[0]) || !node.is(".tree-node")) {
            return null;
        }
        var result = [];
        node.siblings("ul").find(">li>.tree-node").each(function () {
            var n = t.tree("getNode", this);
            result.push(n);
        });
        return result;
    }

    function unselect(target, nodeTarget) {
        $(nodeTarget).removeClass("tree-node-selected");
    }


    function move(target, param) {
        if (!param || !param.source || !param.target || !param.point) {
            return;
        }
        if (param.point != "append" && param.point != "top" && param.point != "bottom") {
            param.point = "append";
        }
        param.source = $(param.source)[0];
        param.target = $(param.target)[0];
        if (param.source == param.target) {
            return;
        }
        var t = $(target),
            opts = t.tree("options");
        if (isParent(target, { target1: param.source, target2: param.target })) {
            return;
        }
        if ($.isFunction(opts.onBeforeDrop) && opts.onBeforeDrop.call(target, param.target, param.source, param.point) == false) {
            return;
        }
        var node = t.tree("pop", param.source);
        if (!node) {
            return;
        }
        switch (param.point) {
            case "append":
                t.tree("append", { parent: param.target, data: [node] });
                break;
            case "top":
                t.tree("insert", { before: param.target, data: node });
                break;
            case "bottom":
                t.tree("insert", { after: param.target, data: node });
                break;
            default:
                t.tree("append", { parent: param.target, data: [node] });
                break;
        }
        if (node && $.isFunction(opts.onDrop)) {
            opts.onDrop.call(target, param.target, param.source, param.point);
        }
    }

    function shit(target, param) {
        if (!param || !param.target || !param.point) {
            return;
        }
        if (param.point != "up" && param.point != "upLevel" && param.point != "down" && param.point != "downLevel") {
            return;
        }
        param.target = $(param.target)[0];
        var t = $(target),
            source = param.target,
            node;
        switch (param.point) {
            case "up":
                node = prev(target, source);
                break;
            case "upLevel":
                node = t.tree("getParent", source);
                break;
            case "down":
                node = next(target, source);
                break;
            case "downLevel":
                node = prev(target, source);
                break;
            default:
                break;
        }
        if (!node) {
            return;
        }
        move(target, {
            source: source,
            target: node.target,
            point: param.point == "up" ? "top" : (param.point == "downLevel" ? "append" : "bottom")
        });
    }

    function load(target, param) {
        var t = $(target);
        if (!param) {
            t.tree("reload");
            return;
        }
        var opts = t.tree("options");

        if (typeof param == "string") {
            opts.url = param;
            t.tree("reload");
            return;
        }
        var queryParams = opts.queryParams;
        opts.queryParams = $.extend({}, queryParams, param);
        t.tree("reload");
    }

    function setNodeIcon(target, param) {
        if (!param || !param.target || !param.iconCls) {
            return;
        }
        $(target).tree("update", {
            target: param.target, iconCls: param.iconCls
        })
    }

    function setNodeText(target, param) {
        if (!param || !param.target || !param.text) {
            return;
        }
        $(target).tree("update", {
            target: param.target, text: param.text
        })
    }




    function initializeExtensions(target) {
        var t = $(target),
            state = $.data(target, "tree"),
            opts = t.tree("options");
        initToggleOnClick(t, opts);
        initContextMenu(t, opts);
        initBindDblClickEvent(t, opts);
    }

    function initToggleOnClick(t, opts) {
        t.delegate(".tree-node", "click", function (e) {
            if (!$(e.target).is(".tree-hit") && opts.toggleOnClick) {
                t.tree("toggle", this);
            }
        });
    }

    function initContextMenu(t, opts) {
        t.delegate(".tree-node", "contextmenu", function (e) {
            if (opts.selectOnContextMenu) {
                t.tree("select", this);
            }
            if (opts.enableContextMenu) {
                e.preventDefault();
                var node = t.tree("getNode", this),
                    menuItems = getContextMenuItems(t, opts, e, node);
                if (opts.autoBindDblClick && opts.dblClickMenuIndex >= 0 && $.array.likeArrayNotString(opts.contextMenu) && opts.contextMenu.length > opts.dblClickMenuIndex) {
                    menuItems[opts.dblClickMenuIndex].bold = true;
                }
                $.easyui.showMenu({ items: menuItems, left: e.pageX, top: e.pageY, event: e });
            }
        });
    }

    function initBindDblClickEvent(t, opts) {
        t.delegate(".tree-node", "dblclick", function (e) {
            if (!$.array.likeArrayNotString(opts.contextMenu) || !opts.contextMenu.length || !opts.autoBindDblClick) {
                return;
            }
            var node = t.tree("getNode", this),
                menuItems = getContextMenuItems(t, opts, e, node);
            if (opts.dblClickMenuIndex >= 0 && menuItems.length > opts.dblClickMenuIndex) {
                var item = menuItems[opts.dblClickMenuIndex],
                    handler = item.handler || item.onclick;
                if ($.isFunction(handler)) {
                    handler.call(this, e, item, null, t[0], node);
                }
            }
        });
    }

    function getContextMenuItems(t, opts, e, node) {
        var menuItems = [],
            defaultMenuItems = [],
            toggle = opts.toggleMenu,
            toggleNonSubMenu = typeof toggle == "object" && !toggle.submenu ? true : false,
            toggleMenuItems = toggleNonSubMenu ? $.fn.tree.extensions.toggleMenus : $.fn.tree.extensions.toggleRootMenus,
            move = opts.moveMenu,
            moveNonSubMenu = typeof move == "object" && !move.submenu ? true : false,
            moveMenuItems = moveNonSubMenu ? $.fn.tree.extensions.moveMenus : $.fn.tree.extensions.moveRootMenus,
            args = [t[0], node];

        if (opts.showOption) {
            $.array.merge(defaultMenuItems, $.fn.tree.extensions.optionMenus);
        }

        if (isRoot(t[0], node.target)) {
            toggleMenuItems = toggleNonSubMenu
                ? $.array.merge([], $.fn.tree.extensions.toggleAllMenus, "-", toggleMenuItems)
                : $.fn.tree.extensions.toggleRootAllMenus;
        }
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], toggleMenuItems);
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], moveMenuItems);

        if ($.array.likeArrayNotString(opts.contextMenu)) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], opts.contextMenu);
        }
        if (defaultMenuItems.length) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], defaultMenuItems);
        }
        return $.easyui.parseMenuItems(menuItems, args);
    }


    $.fn.tree.extensions.toggleMenus = [
        {
            text: "展开当前所有", iconCls: "icon-metro-expand",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), toggle = opts.toggleMenu;
                return !(toggle == true || toggle.expandAll == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                $(target).tree("expandAll", node.target);
            }
        },
        {
            text: "展开当前", iconCls: "icon-metro-expand2",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), toggle = opts.toggleMenu;
                return !(toggle == true || toggle.expand == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                $(target).tree("expand", node.target);
            }
        },
        {
            text: "折叠当前", iconCls: "icon-metro-contract2",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), toggle = opts.toggleMenu;
                return !(toggle == true || toggle.collapse == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                $(target).tree("collapse", node.target);
            }
        },
        {
            text: "折叠当前所有", iconCls: "icon-metro-contract",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), toggle = opts.toggleMenu;
                return !(toggle == true || toggle.collapseAll == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                $(target).tree("collapseAll", node.target);
            }
        }
    ];
    $.fn.tree.extensions.toggleRootMenus = [
        {
            text: "展开/折叠", iconCls: "",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), toggle = opts.toggleMenu;
                return !toggle;
            },
            children: $.fn.tree.extensions.toggleMenus
        }
    ];
    $.fn.tree.extensions.toggleAllMenus = [
        {
            text: "展开所有", iconCls: "icon-standard-arrow-out",
            handler: function (e, menuItem, menu, target, node) { $(target).tree("expandAll"); }
        },
        {
            text: "折叠所有", iconCls: "icon-standard-arrow-in",
            handler: function (e, menuItem, menu, target, node) { $(target).tree("collapseAll"); }
        }
    ];
    $.fn.tree.extensions.toggleRootAllMenus = [
        {
            text: "展开/折叠", iconCls: "",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), toggle = opts.toggleMenu;
                return !toggle;
            },
            children: $.array.merge([], $.fn.tree.extensions.toggleAllMenus, "-", $.fn.tree.extensions.toggleMenus)
        }
    ];
    $.fn.tree.extensions.moveMenus = [
        {
            text: "上移一级", iconCls: "icon-standard-arrow-up",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), move = opts.moveMenu;
                return !(move == true || move.upLevel == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                shit(target, { point: "upLevel", target: node.target });
            }
        },
        {
            text: "上移", iconCls: "icon-standard-up",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), move = opts.moveMenu;
                return !(move == true || move.up == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                shit(target, { point: "up", target: node.target });
            }
        },
        {
            text: "下移", iconCls: "icon-standard-down",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), move = opts.moveMenu;
                return !(move == true || move.down == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                shit(target, { point: "down", target: node.target });
            }
        },
        {
            text: "下移一级", iconCls: "icon-standard-arrow-down",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), move = opts.moveMenu;
                return !(move == true || move.downLevel == true);
            },
            handler: function (e, menuItem, menu, target, node) {
                shit(target, { point: "downLevel", target: node.target });
            }
        }
    ];
    $.fn.tree.extensions.moveRootMenus = [
        {
            text: "上/下移(级)", iconCls: "",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options"), move = opts.moveMenu;
                return !move;
            },
            children: $.fn.tree.extensions.moveMenus
        }
    ];
    $.fn.tree.extensions.optionMenus = [
        {
            text: "显示 Option", iconCls: "icon-standard-application-form",
            disabled: function (e, menuItem, menu, target, node) {
                var t = $(target), opts = t.tree("options");
                return !opts.showOption;
            },
            children: [
                {
                    text: "树控件 Option", iconCls: "icon-hamburg-category",
                    handler: function (e, menuItem, menu, target, node) {
                        showOption(target);
                    }
                },
                {
                    text: "该节点 Option", iconCls: "tree-icon tree-file",
                    handler: function (e, menuItem, menu, target, node) {
                        showOption(target, node.target);
                    }
                }
            ]
        }
    ];



    // 将一个平滑数组格式数据集合转换成级联数据集合。
    $.fn.tree.extensions.arrayToCascade = function (data, idField, parentField) {
        data = data || [];
        idField = idField || "id";
        parentField = parentField || "pid";

        var array = $.array.filter(data, function (val) {
            var pid = val[parentField];
            if (val == null || val == undefined) {
                return true;
            }
            return !$.array.some(data, function (value) {
                return val[parentField] == value[idField];
            });
        });
        function findChildren(array, value) {
            var temps = $.array.filter(array, function (val) {
                var pid = val[parentField];
                return pid == null || pid == undefined ? false : pid == value[idField];
            });
            return $.array.map(temps, function (val) {
                var children = findChildren(array, val);
                if (children.length) {
                    val.children = $.array.likeArrayNotString(val.children) ? val.children : [];
                    $.array.merge(val.children, children);
                }
                return val;
            });
        }
        return $.array.map(array, function (val) {
            var children = findChildren(data, val);
            if (children.length) {
                val.children = $.array.likeArrayNotString(val.children) ? val.children : [];
                $.array.merge(val.children, children);
            }
            return val;
        });
    };

    // 将一个级联数据集合转换成平滑数组格式数据集合。
    $.fn.tree.extensions.cascadeToArray = function (data, childrenField) {
        data = data || [];
        childrenField = childrenField || "children";
        var result = [],
            getNodeArray = function (node) {
                if (node == null || node == undefined) {
                    return undefined;
                }
                var tmp = $.extend({}, node),
                    array = [tmp],
                    children = tmp[childrenField];
                if (!$.util.likeArrayNotString(children)) {
                    return array;
                }
                $.each(children, function (i, n) {
                    $.array.merge(array, getNodeArray(n));
                });
                tmp[childrenField] = undefined;
                return array;
            };
        $.each(data, function (i, n) {
            var array = getNodeArray(n);
            if (array && array.length) {
                $.array.merge(result, getNodeArray(n));
            }
        });
        return result;
    };

    $.fn.tree.extensions.parseQueryParams = function (t, opts, param) {
        return $.util.parseMapFunction(param, [], t[0]);
    };

    $.fn.tree.extensions._loader = $.fn.tree.defaults.loader;
    $.fn.tree.extensions.loader = function (param, success, error) {
        var t = $(this),
            opts = t.tree("options");
        if (!opts.url) {
            return false;
        }
        param = $.fn.tree.extensions.parseQueryParams(param);
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: "json",
            beforeSend: function (XmlHttpRequest) {
                loading();
            },
            success: function (data, textStatus, jqXHR) {
                success(data);
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                error.apply(this, arguments);
            },
            complete: function (XmlHttpRequest, textStatus) {
                loaded();
            }
        });
        function loading() {
            if (opts.loading != "mask" && opts.loading != "progress") {
                return;
            }
            if (opts.loading == "mask") {
                $.easyui.loading({ locale: t.parent()[0], msg: opts.loadMsg });
            } else if (opts.loading == "progress") {
                $.messager.progress({ msg: opts.loadMsg });
            }
        }
        function loaded() {
            if (opts.loading != "mask" && opts.loading != "progress") {
                return;
            }
            if (opts.loading == "mask") {
                $.easyui.loaded({ locale: t.parent()[0] });
            } else if (opts.loading == "progress") {
                $.messager.progress("close");
            }
        }
    };

    $.fn.tree.extensions._onExpand = $.fn.tree.defaults.onExpand;
    $.fn.tree.extensions.onExpand = function (node) {
        if ($.isFunction($.fn.tree.extensions._onExpand)) {
            $.fn.tree.extensions._onExpand.apply(this, arguments);
        }
        var t = $(this),
            opts = t.tree("options");
        if (opts.onlyNodeExpand) {
            var nodes = siblings(this, node.target),
                openNodes = $.array.filter(nodes, function (val) {
                    return val.target != node.target && val.state == "open";
                }),
                animate = opts.animate;
            opts.animate = false;
            $.each(openNodes, function (i, n) {
                t.tree("collapse", n.target);
            });
            opts.animate = animate;
        }
    };

    $.fn.tree.extensions._loadFilter = $.fn.tree.defaults.loadFilter;
    $.fn.tree.extensions.loadFilter = function (data, parent) {
        if ($.isFunction($.fn.tree.extensions._loadFilter)) {
            data = $.fn.tree.extensions._loadFilter.apply(this, arguments);
        }
        data = $.array.likeArrayNotString(data) ? data : [];
        if (!data.length) {
            return data;
        }
        var t = $(this),
            opts = t.tree("options");
        return opts.dataPlain ? $.fn.tree.extensions.cascadeToArray(data) : data;
    };



    var _tree = $.fn.tree.extensions._tree = $.fn.tree;
    $.fn.tree = function (options, param) {
        if (typeof options == "string") {
            return _tree.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this),
                isInited = $.data(this, "tree") ? true : false,
                opts = isInited ? options : $.extend({},
                        $.fn.tree.parseOptions(this),
                        $.parser.parseOptions(this, [
                            "parentField", "loading", "loadMsg",
                            { dblClickMenuIndex: "number" },
                            {
                                autoBindDblClick: "boolean", dataPlain: "boolean",
                                selectOnContextMenu: "boolean", toggleOnClick: "boolean",
                                onlyNodeExpand: "boolean", enableContextMenu: "boolean",
                                toggleMenu: "boolean", moveMenu: "boolean", showOption: "boolean"
                            }
                        ]), options);
            _tree.call(jq, opts, param);
            if (!isInited) {
                initializeExtensions(this);
            }
        });
    };
    $.union($.fn.tree, _tree);



    var methods = $.fn.tree.extensions.methods = {

        // 扩展 easyui-tree 的自定义方法；判断制定的 tree-node 是否为根节点；该方法定义如下参数：
        //     nodeTarget: 用于判断的 tree-node 的 jQuery 或 DOM 对象。
        // 返回值：如果指定的 jQuery 对象是该 easyui-tree 的根节点，则返回 true，否则返回 false。
        isRoot: function (jq, nodeTarget) { return isRoot(jq[0], nodeTarget); },

        // 扩展 easyui-tree 的自定义方法；用于显示指定节点或树控件的属性信息；该方法定义如下参数：
        //     nodeTarget: 要显示属性信息的 tree-node 的 jQuery 或 DOM 对象；该参数可选；如果不定义该参数，则显示树控件的属性信息；
        // 返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        showOption: function (jq, nodeTarget) { return jq.each(function () { showOption(this, nodeTarget); }); },

        // 扩展 easyui-tree 的自定义方法；用于获取指定节点的级别；该方法的参数 target 表示要获取级别的 tree-node 节点的 jQuery 或 DOM 对象；
        // 返回值：如果 nodeTarget 表示的 DOM 对象存在于此 easyui-tree，则返回表示其所在节点级别的数字(从 0 开始计数)，否则返回 -1。
        getLevel: function (jq, nodeTarget) { return getLevel(jq[0], nodeTarget); },

        //  扩展 easyui-tree 的自定义方法；判断一个节点是否为另一个节点的父节点；该方法定义如下参数：
        //      param：  这是一个 JSON-Object，该对象定义如下属性：
        //          target1:    用于判断的第一个 tree-node 的 jQuery 或 DOM 对象；
        //          target2:    用于判断的第二个 tree-node 的 jQuery 或 DOM 对象；
        //  返回值：如果 tree-node target1 是 tree-node target2 的父节点，则返回 true，否则返回 false。
        isParent: function (jq, param) { return isParent(jq[0], param); },

        //  扩展 easyui-tree 的自定义方法；判断一个节点是否为另一个节点的子节点；该方法定义如下参数：
        //      param：  这是一个 JSON-Object，该对象定义如下属性：
        //          target1:    用于判断的第一个 tree-node 的 jQuery 或 DOM 对象；
        //          target2:    用于判断的第二个 tree-node 的 jQuery 或 DOM 对象；
        //  返回值：如果 tree-node target1 是 tree-node target2 的子节点，则返回 true，否则返回 false。
        isChild: function (jq, param) { return isChild(jq[0], param); },

        //  扩展 easyui-tree 的自定义方法；判断一个节点是否和另一个节点为具有同一个父节点的平级节点；该方法定义如下参数：
        //      param：  这是一个 JSON-Object，该对象定义如下属性：
        //          target1:    用于判断的第一个 tree-node 的 jQuery 或 DOM 对象；
        //          target2:    用于判断的第二个 tree-node 的 jQuery 或 DOM 对象；
        //  返回值：如果 tree-node target1 和 tree-node target2 是具有同一个父级节点的平级节点，则返回 true，否则返回 false。
        isSibling: function (jq, param) { return isSibling(jq[0], param); },

        //  扩展 easyui-tree 的自定义方法；判断两个 tree-node 之间的关系；该方法定义如下参数：
        //      param：  这是一个 JSON-Object，该对象定义如下属性：
        //          target1:    用于判断的第一个 tree-node 的 jQuery 或 DOM 对象；
        //          target2:    用于判断的第二个 tree-node 的 jQuery 或 DOM 对象；
        //  返回值：返回一个 String 类型的值：
        //      如果 target1 是 target2 的子节点，则返回 "child"；
        //      如果 target1 是 target2 的父节点，则返回 "parent"；
        //      如果 target1 和 target2 是具有同一个父级节点的平级节点，则返回 "sibling"；
        //      如果 target1 和 target2 既不是父子级关系，也不是具有同一个父级节点的平级节点关系，则返回 "normal"；
        compare: function (jq, param) { return compare(jq[0], param); },

        //  扩展 easyui-tree 的自定义方法；获取指定节点的平级上一格位置的 tree-node 节点；该方法定义如下参数：
        //      target:  指定的表示 tree-node 的 jQuery 或 DOM 对象。
        //  返回值：返回 tree-node target 的同级别上一格位置的 tree-node 节点对象；该 tree-node 对象含有如下属性：
        //      id、text、iconCls、checked、state、attributes、target；
        //      如果该 tree-node target 为当前级别的第一个节点即没有上一格节点；则返回 null。
        prev: function (jq, target) { return prev(jq[0], target); },

        //  扩展 easyui-tree 的自定义方法；获取指定节点的平级下一格位置的 tree-node 节点；该方法定义如下参数：
        //      target:  指定的表示 tree-node 的 jQuery 或 DOM 对象。
        //  返回值：返回 tree-node target 的同级别下一格位置的 tree-node 节点 node 对象；该 node 对象含有如下属性：
        //      id、text、iconCls、checked、state、attributes、target；
        //      如果该 tree-node target 为当前级别的最后一个节点即没有下一格节点；则返回 null。
        next: function (jq, target) { return next(jq[0], target); },

        //  扩展 easyui-tree 的自定义方法；获取指定节点的同级所有节点(包含自身)；该方法定义如下参数：
        //      target:  指定的表示 tree-node 的 jQuery 或 DOM 对象。
        //  返回值：返回 tree-node target 的同级别(具有和当前 target 同一个父级节点)所有节点构成的一个数组对象；
        //      数组中每一个元素都是一个包含属性 id、text、iconCls、checked、state、attributes、target 的 tree-node 对象。
        //      如果传入的参数 target 是根节点或者未定义 target 参数，则该方法和 getRoots 方法返回的值相同；
        //      如果传入的参数 target 不是一个 div.tree-node 或者其不包含在当前 easyui-tree 中，则返回 null。
        siblings: function (jq, target) { return siblings(jq[0], target); },

        //  扩展 easyui-tree 的自定义方法；获取指定节点的下一级所有节点；该方法定义如下参数：
        //      target:  指定的表示 tree-node 的 jQuery 或 DOM 对象。
        //  返回值：返回 tree-node target 的下一级所有节点构成的一个数组对象；
        //      数组中每一个元素都是一个包含属性 id、text、iconCls、checked、state、attributes、target 的 tree-node 对象。
        //      如果传入的参数 target 没有子节点，则返回一个包含 0 个元素的数组。
        //      如果传入的参数 target 不是一个 div.tree-node 或者其不包含在当前 easyui-tree 中，则返回 null。
        //  备注：该方法和 getChildren 的不同之处在于，getChildren 方法返回的是 target 下的所有子节点内容；
        getNearChildren: function (jq, target) { return getNearChildren(jq[0], target); },

        //  扩展 easyui-tree 的自定义方法；用于取消指定树节点的选择状态；该方法定义如下参数：
        //      target:  指定的表示 tree-node 的 jQuery 或 DOM 对象。
        //  返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        unselect: function (jq, target) { return jq.each(function () { unselect(this, target); }); },

        // 扩展 easyui-tree 的自定义方法；移动指定的节点到另一个位置；该方法定义如下参数：
        //     param:   这是一个 JSON-Object，该对象定义如下属性：
        //         target: 表示目标位置的 tree-node 的 jQuery 或 DOM 对象；
        //         source: 表示要移动的 tree-node 的 jQuery 或 DOM 对象；
        //         point:  表示移动到目标节点 target 的位置，String 类型，可选的值包括：
        //             "append":   表示追加为目标节点 target 的子节点，默认值；
        //             "top":      表示移动到目标节点 target 的上一格位置；
        //             "bottom":   表示追加为目标节点 target 的下一格位置；
        // 返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        move: function (jq, param) { return jq.each(function () { move(this, param); }); },

        // 扩展 easyui-tree 的自定义方法；移动指定节点的位置；该方法定义如下参数：
        //     param:  这是一个 JSON-Object，该对象定义如下属性：
        //         target: 表示要移动的 tree-node 的 jQuery 或 DOM 对象；
        //         point:  表示移动 target 的方式，String 类型，可选的值报错：
        //             "up":       表示将 target 所表示的 tree-node 移动到上一格位置；
        //             "upLevel":  表示将 target 所表示的 tree-node 移动到上一级的末尾；
        //             "down":     表示将 target 所表示的 tree-node 移动到下一格位置；
        //             "downLevel":表示将 target 所表示的 tree-node 移动到上一格的子级位置；
        //             如果不定义该值或者该值为空或该值不是上面四个之一，则不进行任何操作；
        // 返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        shift: function (jq, param) { return jq.each(function () { shift(this, param); }); },

        //  扩展 easyui-tree 的自定义方法；请求远程服务器地址并加载数据，并将返回的数据设置为当前 easyui-tree 的节点数据集；该方法定义如下参数：
        //      param：表示要进行远程请求的方式，该参数可以定义为以下类型：
        //          String 类型值：表示作为远程数据请求的目标 url 地址；
        //          JSON-Object 类型值：表示发送至远程服务器的查询参数；
        //      如果未定义参数 param，则相当于直接执行不带参数 { id } 的 reload 方法(reload 方法的执行默认会将指定节点的 id 作为参数发送到远程服务器地址)。
        //  返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        load: function (jq, param) { return jq.each(function () { load(this, param); }); },

        //  扩展 easyui-tree 的自定义方法；设置指定节点的图标；该方法定义如下参数：
        //      param: JSON-Object 类型值，该对象包含如下属性定义：
        //          target: 表示要设置图标的 easyui-tree node HTML-DOM 对象；
        //          iconCls:表示要设置的节点样式；
        //  返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        setIcon: function (jq, param) { return jq.each(function () { setNodeIcon(this, param); }); },

        //  扩展 easyui-tree 的自定义方法；设置指定节点的显示文本；该方法定义如下参数：
        //      param: JSON-Object 类型值，该对象包含如下属性定义：
        //          target: 表示要设置图标的 easyui-tree node HTML-DOM 对象；
        //          text  : 表示要设置的显示文本值；
        //  返回值：返回表示当前 easyui-tree 组件的 jQuery 对象。
        setText: function (jq, param) { return jq.each(function () { setNodeText(this, param); }); }
    };

    var defaults = $.fn.tree.extensions.defaults = {

        //  增加 easyui-tree 的自定义扩展属性；
        //      该属性表示当设定了属性 contextMenu 时，是否将双击数据行 onDblClick 事件的响应函数
        //      设置为 contextMenu 的第一个菜单项的点击响应函数，并将该菜单项的字体加粗；
        //  Boolean 类型值，默认为 true；
        //  备注：当设置了自定义属性 contextMenu 时候，该功能方有效。
        //      自动绑定的 onClick 的回调函数中将会调用 contextMenu 的第 "dblClickMenuIndex" 个菜单项的点击响应函数，但是回调函数中不能用到参数 e 和 menu。
        autoBindDblClick: true,

        //  增加 easyui-tree 的自定义扩展属性；
        //  该属性表示当设定了属性 autoBindDblClick: true，双击行数据触发的右键菜单项事件的索引号；
        //      意即触发第几个右键菜单项上的事件。
        //  Number 类型值，从 0 开始计数，默认为 0；
        //  备注：当设置了自定义属性 autoBindDblClick: true 时，该功能方有效；如果此索引值超出菜单数量范围，则无效。
        dblClickMenuIndex: 0,

        //  扩展 easyui-tree 的自定义属性，表示当前 easyui-tree 控件是否支持平滑数据格式。
        //  当支持平滑数据格式时，数据元素中不需要通过指定 children 来指定子节点，而是支持通过 pid 属性来指示其父级节点。
        //  Boolean 类型值，默认为 false。
        dataPlain: false,

        //  扩展 easyui-treegrid 的自定义属性；
        //      该属性表示当前 easyui-tree 控件支持平滑数据格式时（dataPlain: true），程序用哪个 field 表示当前行数据的父级节点 idField 值
        //  String 类型值，默认为 "pid"。
        parentField: "pid",

        //  扩展 easyui-tree 的自定义属性，表示当右键点击 tree-node 时，是否自动选择被点击的 tree-node 对象；
        //  Boolean 类型值，默认为 false；
        selectOnContextMenu: false,

        //  扩展 easyui-tree 的自定义属性，表示当左键点击带有子节点的条目时，是否自动展开/折叠相应节点。
        //  Boolean 类型，默认为 false。
        //  备注：该功能不会影响到 easyui-tree 的原生事件 onClick。
        toggleOnClick: false,

        //  扩展 easyui-tree 的自定义属性，表示同一级菜单节点下，只允许一个节点被展开。
        //  Boolean 类型，默认为 false。
        //  当该属性设置为 true 时，建议同时把 animate 属性设置为 false，以免影响菜单联动折叠时的美观效果。
        onlyNodeExpand: false,

        //  扩展 easyui-tree 的自定义属性，表示是否启用当前 easyui-tree 组件的右键菜单。
        //  Boolean 类型，默认为 true。
        //  备注：该功能不会影响到 easyui-tree 的原生事件 onContextMenu。
        enableContextMenu: true,

        //  扩展 easyui-tree 的自定义属性，表示当前 easyui-tree 的右键菜单；
        //  这是一个数组类型，数组中的每一个元素都是一个 JSON-Object，该 JSON-Object 定义如下属性：
        //      id:         表示菜单项的 id；
        //      text:       表示菜单项的显示文本；
        //      iconCls:    表示菜单项的左侧显示图标；
        //      disabled:   表示菜单项是否被禁用(禁用的菜单项点击无效)；
        //      hideOnClick:    表示该菜单项点击后整个右键菜单是否立即自动隐藏；
        //      bold:           Boolean 类型值，默认为 false；表示该菜单项是否字体加粗；
        //      style:          JSON-Object 类型值，默认为 null；表示要附加到该菜单项的样式；
        //      handler:    表示菜单项的点击事件，该事件函数格式为 function(e, menuItemOpts, menuDOM, treeDOM, node)，其中 this 指向菜单项本身
        //  备注：当 enableContextMenu 属性设置为 true 时，该属性才有效。
        //  备注：该功能不会影响到 easyui-tree 的原生事件 onContextMenu。
        contextMenu: null,

        //  扩展 easyui-tree 的自定义属性，表示是否启用右键菜单中的“展开当前、折叠当前、展开当前所有、折叠当前所有”菜单项的功能；
        //  该属性可以定义为以下类型：
        //      Boolean 类型，表示是否启用这四个菜单项；
        //      JSON-Object 类型，该 JSON-Object 可以包含如下属性：
        //          expand:     布尔类型的值，表示是否显示“展开当前”菜单；
        //          expandAll:  布尔类型的值，表示是否显示“展开当前所有”菜单；
        //          collapse:   布尔类型的值，表示是否显示“折叠当前”菜单；
        //          collapseAll: 布尔类型的值，表示是否显示“折叠当前所有”菜单；
        //          submenu:    表示这四个菜单项是否以子菜单方式呈现，默认为 true；
        //  备注：当 enableContextMenu 属性设置为 true 时，该属性才有效。
        //      这四个菜单点击时，会自动触发 easyui-tree 的折叠/展开菜单项的相应事件。
        toggleMenu: true,

        //  扩展 easyui-tree 的自定义属性，表示是否启用右键菜单中的“上移、下移、上移一级、下移一级”菜单项的功能；
        //  备注：当 enableContextMenu 属性设置为 true 时，该属性才有效。
        //  该属性可以定义为以下类型：
        //      Boolean 类型，表示是否启用这四个菜单项，默认为 false；
        //      JSON-Object 类型，该 JSON-Object 可以包含如下属性：
        //          up:         布尔类型的值，表示是否显示“上移”菜单；
        //          upLevel:    布尔类型的值，表示是否显示“上移一级”菜单；
        //          down:       布尔类型的值，表示是否显示“下移”菜单；
        //          downLevel:  布尔类型的值，表示是否显示“下移一级”菜单；
        //          submenu:    表示这四个菜单项是否以子菜单方式呈现，默认为 true；
        //      这四个菜单点击时，会自动触发 easyui-tree 的 onDrop 事件。
        moveMenu: false,

        //  扩展 easyui-tree 的自定义属性，该属性表示在启用右键菜单的情况下，右键菜单项中是否显示 "显示 Tree 的 Option" 菜单项
        //  Boolean 类型值；默认为 false。
        showOption: false,

        //  增加 easyui-tree 的自定义扩展属性；该属性表示当 easyui-tree 组件加载远程数据时，显示的遮蔽层进度条类型。
        //  String 类型值，可选的值限定范围如下：
        //      "mask": 表示遮蔽层 mask-loading 进度显示，默认值
        //      "progress": 表示调用 $.messager.progress 进行进度条效果显示
        //      "none": 表示不显示遮蔽层和进度条
        loading: "mask",

        //  增加 easyui-tree 的自定义扩展属性；该属性表示当 easyui-tree 组件加载远程数据时，显示的遮蔽层提示文字内容。
        loadMsg: "正在加载数据，请稍等...",

        //  覆盖 easyui-tree 的原生属性 loader，以支持相应扩展功能（使得 queryParams 参数中的属性值支持函数返回值运行时解析、以及 loading、loadMsg 属性）。
        loader: $.fn.tree.extensions.loader,

        //  覆盖 easyui-tree 的原生属性 loadFilter，以支持相应扩展功能(支持平滑数据格式/dataPlain 属性)。
        loadFilter: $.fn.tree.extensions.loadFilter,

        //  覆盖 easyui-tree 的原生事件 onExpand，以支持相应扩展功能（onlyNodeExpand 属性）。
        onExpand: $.fn.tree.extensions.onExpand
    };

    $.extend($.fn.tree.defaults, defaults);
    $.extend($.fn.tree.methods, methods);

})(jQuery);