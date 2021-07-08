/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI DataGrid Extensions
* jQuery EasyUI datagrid 组件扩展
* jeasyui.extensions.datagrid.js
* 二次开发 流云
* 最近更新：2015-07-14
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

    $.util.namespace("$.fn.datagrid.extensions");

    $.extend($.fn.datagrid.extensions, {

        appendRow: $.fn.datagrid.methods.appendRow,

        insertRow: $.fn.datagrid.methods.insertRow,

        updateRow: $.fn.datagrid.methods.updateRow,

        refreshRow: $.fn.datagrid.methods.refreshRow,

        deleteRow: $.fn.datagrid.methods.deleteRow,


        beginEdit: $.fn.datagrid.methods.beginEdit,

        endEdit: $.fn.datagrid.methods.endEdit,

        cancelEdit: $.fn.datagrid.methods.cancelEdit,


        getColumnFields: $.fn.datagrid.methods.getColumnFields
    });


    function appendRow(target, row) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.appendRow.call(t, t, row);
        refreshHeaderFilters(target, t);
        return ret;
    }

    //  param: { index: number, row: rowData }
    function insertRow(target, param) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.insertRow.call(t, t, param);
        refreshHeaderFilters(target, t);
        return ret;
    }

    //  param: { index: number, row: rowData }
    function updateRow(target, param) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.updateRow.call(t, t, param);
        refreshHeaderFilters(target, t);
        return ret;
    }

    function refreshRow(target, index) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.refreshRow.call(t, t, index);
        refreshHeaderFilters(target, t);
        return ret;
    }

    function deleteRow(target, index) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.deleteRow.call(t, t, index);
        refreshHeaderFilters(target, t);
        return ret;
    }


    //  param: function (index, row, rows) | array (idField | row | function (index, row, rows))
    function deleteRows(target, param) {
        var data = findRows(target, param);
        if (!data || !data.length) {
            return;
        }
        var t = $(target),
            counter = 0;
        $.each(data, function (i, row) {
            var index = t.datagrid("getRowIndex");
            if (index > -1) {
                $.fn.datagrid.extensions.deleteRow.call(t, t, index);
                counter++;
            }
        });
        if (counter) {
            refreshHeaderFilters(target, t);
        }
    }


    function beginEdit(target, index) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.beginEdit.call(t, t, index),
            editing = isEditing(target, index);
        if (!editing) {
            return;
        }
        setSingleEditing(target, index);
        createRowExtEditor(target, index);
        hideRowTooltip(target, index);
        setRowEditorFocus(target, index);
        return ret;
    }

    function endEdit(target, index) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.endEdit.call(t, t, index);
        disposeRowExtEditor(target, index);
        refreshHeaderFilters(target, t);
        return ret;
    }

    function cancelEdit(target, index) {
        var t = $(target),
            ret = $.fn.datagrid.extensions.cancelEdit.call(t, t, index);
        disposeRowExtEditor(target, index);
        refreshHeaderFilters(target, t);
        return ret;
    }


    function setSingleEditing(target, index) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options;
        if (opts.singleEditing && (state.lastEditIndex != null && state.lastEditIndex != undefined && state.lastEditIndex != index)) {
            endEdit(target, state.lastEditIndex);
        }
        state.lastEditIndex = index;
    }

    function createRowExtEditor(target, index) {
        var state = $.data(target, "datagrid"),
            opts = state.options;
        if (!opts.extEditing) {
            return;
        }
        var tr = getRowDom(target, index);
        if (!tr || !tr.length) {
            return;
        }
        var t = $(target),
            p = t.datagrid("getPanel"),
            v = p.find("div.datagrid-view"),
            v1 = v.find("div.datagrid-view1"),
            v2 = v.find("div.datagrid-view2"),
            b = v2.find("div.datagrid-body").addClass("datagrid-body-rowediting"),
            width = v1.outerWidth(),
            height = tr.outerHeight(),
            pos = tr.position(),
            top = pos.top + height + b.scrollTop() - v2.find("div.datagrid-header").outerHeight(),
            d = $("<div class=\"dialog-button datagrid-rowediting-panel\"></div>").appendTo(b).css("top", top).attr("datagrid-row-index", index);

        $("<a></a>").appendTo(d).linkbutton({
            plain: false, iconCls: "icon-ok",
            text: "保存"
        }).click(function () {
            endEdit(target, index);
            disposeRowExtEditor(target, index);
        });
        $("<a></a>").appendTo(d).linkbutton({
            plain: false,
            iconCls: "icon-cancel",
            text: "取消"
        }).click(function () {
            cancelEdit(target, index);
            disposeRowExtEditor(target, index);
        });

        var diff = (p.outerWidth() - d.outerWidth()) / 2 - width,
            left = diff > 0 ? diff : 0;
        d.css("left", left);
    }

    function disposeRowExtEditor(target, index) {
        var b = $(target).datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        if (!b.length) {
            return;
        }
        var d = b.find("div.datagrid-rowediting-panel[datagrid-row-index=" + index + "]").remove();
        if (!b.find("div.datagrid-rowediting-panel[datagrid-row-index]").length) {
            b.removeClass("datagrid-body-rowediting");
        }
    }

    function setRowEditorFocus(target, index) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options;
        if (opts.autoFocusField) {
            var editors = t.datagrid("getEditors", index);
            if (editors.length) {
                var editor = $.array.first(editors, function (val) { return val.field == opts.autoFocusField; });
                if (!editor) {
                    editor = editors[0];
                }
                if (editor) {
                    $.util.delay(function () {
                        setEditorFocus(editor);
                    });
                }
            }
        }
    }

    function setEditorFocus(editor) {
        if (!editor || !editor.target || !editor.target.length) {
            return;
        }
        if (editor.actions && $.isFunction(editor.actions.setFocus)) {
            editor.actions.setFocus(editor.target[0]);
        } else {
            if (editor.target.is(":hidden")) {
                if ($.easyui.isComponent(editor.target, "textbox")) {
                    editor.target.textbox("textbox").focus();
                }
            } else {
                editor.target.focus();
            }
        }
    }


    function resetHeaderDnd(target, field, t, opts, td) {
        t = t || $(target);
        state = $.data(target, "datagrid");
        opts = opts || state.options;
        if (!opts.headerDnd || state.multiLineHeaders) {
            return;
        }
        td = td || getColumnDom(target, { field: field, type: "header" });
        td.each(function () {
            if ($.data(this, "draggable")) {
                return;
            }
            $(this).draggable({
                disabled: false, revert: true, edge: 5, delay: 300, cursor: "default", deltaX: 10, deltaY: 5,
                proxy: function (source) {
                    return getColumnProxy(target, field);
                },
                onBeforeDrag: function (e) {
                    if (!opts.headerDnd || state.multiLineHeaders || e.which != 1 || e.target.type == "checkbox" || getEditingRowIndexes(target).length) {
                        return false;
                    }
                    if ($.isFunction(opts.onHeaderBeforeDrag) && opts.onHeaderBeforeDrag.call(target, field) == false) {
                        return false;
                    }
                    setHeadersDroppable();
                },
                onStartDrag: function (e) {
                    $(this).draggable("proxy").css({
                        left: -10000, top: -10000
                    });
                    if ($.isFunction(opts.onHeaderStartDrag)) {
                        opts.onHeaderStartDrag.call(target, field);
                    }
                },
                onStopDrag: function (e) {
                    if ($.isFunction(opts.onHeaderStopDrag)) {
                        opts.onHeaderStopDrag.call(target, field);
                    }
                },
                onDrag: function (e) {
                    var x1 = e.pageX, y1 = e.pageY,
                        x2 = e.data.startX, y2 = e.data.startY,
                        d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    if (d > 15) {
                        $(this).draggable("proxy").show();
                    }
                    this.pageY = e.pageY;
                }
            });
        });
        function setHeadersDroppable() {
            t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").each(function () {
                if ($.data(this, "droppable")) {
                    return;
                }
                $(this).droppable({
                    accept: "tr.datagrid-header-row>td[field]",
                    onDragEnter: function (e, source) {
                        var dragger = $(source),
                            dropper = $(this),
                            dragField = dragger.attr("field"),
                            dropField = dropper.attr("field"),
                            mark = getColumnDom(target, { field: dropField, type: "all" }),
                            dnd = {
                                dragger: dragger,
                                dropper: dropper,
                                dragField: dragField,
                                dropField: dropField,
                                mark: mark
                            };
                        $.data(this, "datagrid-header-dnd", dnd);
                        if ($.isFunction(opts.onHeaderDragEnter) && opts.onHeaderDragEnter.call(target, dropField, dragField) == false) {
                            setDraggableStatus(dragger, false);
                            mark.removeClass("datagrid-header-dnd-left datagrid-header-dnd-right");
                            dropper.droppable("disable");
                        }
                    },
                    onDragOver: function (e, source) {
                        var dropper = $(this),
                            dopts = dropper.droppable("options");
                        if (dopts.disabled) {
                            return;
                        }
                        var dnd = $.data(this, "datagrid-header-dnd"),
                            dragger = dnd.dragger,
                            mark = dnd.mark,
                            proxy = dragger.draggable("proxy"),
                            cls = proxy.offset().left - 10 > dropper.offset().left + dropper.outerWidth() / 2
                                ? "datagrid-header-dnd-right"
                                : "datagrid-header-dnd-left";
                        setDraggableStatus(dragger, true);
                        mark.removeClass("datagrid-header-dnd-left datagrid-header-dnd-right").addClass(cls);

                        if ($.isFunction(opts.onHeaderDragOver) && opts.onHeaderDragOver.call(target, dnd.dropField, dnd.dragField) == false) {
                            setDraggableStatus(dragger, false);
                            mark.removeClass("datagrid-header-dnd-left datagrid-header-dnd-right");
                            dropper.droppable("disable");
                        }
                    },
                    onDragLeave: function (e, source) {
                        var dnd = $.data(this, "datagrid-header-dnd"),
                            dragger = dnd.dragger,
                            mark = dnd.mark;
                        setDraggableStatus(dragger, false);
                        mark.removeClass("datagrid-header-dnd-left datagrid-header-dnd-right");
                        if ($.isFunction(opts.onHeaderDragLeave)) {
                            opts.onHeaderDragLeave.call(target, dnd.dropField, dnd.dragField);
                        }
                    },
                    onDrop: function (e, source) {
                        var dnd = $.data(this, "datagrid-header-dnd"),
                            mark = dnd.mark,
                            point = mark.hasClass("datagrid-header-dnd-left") ? "before" : "after";
                        if ($.isFunction(opts.onHeaderBeforeDrop) && opts.onHeaderBeforeDrop.call(target, dnd.dropField, dnd.dragField, point) == false) {
                            mark.removeClass("datagrid-header-dnd-left datagrid-header-dnd-right");
                            return false;
                        }
                        moveColumn(target, {
                            target: dnd.dropField,
                            source: dnd.dragField,
                            point: point
                        });
                        mark.removeClass("datagrid-header-dnd-left datagrid-header-dnd-right");
                        if ($.isFunction(opts.onHeaderDrop)) {
                            opts.onHeaderDrop.call(target, dnd.dropField, dnd.dragField, point);
                        }
                    }
                });
            });
        }
    }

    function getColumnProxy(target, field) {
        var headerTd = getColumnDom(target, { field: field, type: "header" }).clone().removeClass("datagrid-row-over"),
            height = headerTd.outerHeight(),
            table = $("<table class='datagrid-htable datagrid-btable tree-node-proxy' cellspacing='0' cellpadding='0'></table>").height(height);
        $("<tr class='datagrid-header-row'><td style='position: relative;'><span class='tree-dnd-icon tree-dnd-no' >&nbsp;</span></td></tr>").appendTo(table);
        $("<tr class='datagrid-header-row'></tr>").append(headerTd).appendTo(table);
        var cells = getColumnDom(target, { field: field, type: "body" }).clone().removeClass("datagrid-row-over ").each(function (i) {
            if (i < 6) {
                $("<tr class='datagrid-row'></tr>").append(this).appendTo(table);
            }
        });
        if (cells.length > 6) {
            $("<tr class='datagrid-row'><td>...</td></tr>").appendTo(table);
        }
        return $("<div class='datagrid-header-dnd-proxy'></div>").append(table).appendTo("body").hide();
    }


    function resetRowDnd(target, index, t, opts, row, tr) {
        t = t || $(target);
        opts = opts || $.data(target, "datagrid").options;
        if (!opts.rowDnd) {
            return;
        }
        row = row || getRow(target, index);
        tr = tr || getRowDom(target, index);
        tr.each(function () {
            if ($.data(this, "draggable")) {
                return;
            }
            $(this).draggable({
                disabled: false, revert: true, edge: 5, delay: 300, cursor: "default", deltaX: 10, deltaY: 5,
                proxy: function (source) {
                    var tr = $("<tr><td><span class='tree-dnd-icon tree-dnd-no' >&nbsp;</span></td></tr>").addClass("datagrid-row datagrid-row-selected"),
                        cells = getRowDom(target, index).clone().find("td").removeClass("datagrid-row-over").each(function (i) {
                            if (i < 8) {
                                tr.append(this);
                            }
                        });
                    if (cells.length > 8) {
                        $("<td style='width: 40px;'>...</td>").appendTo(tr);
                    }
                    return $("<table class='tree-node-proxy'></table>").append(tr).appendTo("body").hide();
                },
                onBeforeDrag: function (e) {
                    if (!opts.rowDnd || e.which != 1 || e.target.type == "checkbox" || getEditingRowIndexes(target).length) {
                        return false;
                    }
                    if ($.isFunction(opts.onRowBeforeDrag) && opts.onRowBeforeDrag.call(target, index, row) == false) {
                        return false;
                    }
                    setRowsDroppable();
                },
                onStartDrag: function (e) {
                    $(this).draggable("proxy").css({
                        left: -10000, top: -10000
                    });
                    if ($.isFunction(opts.onRowStartDrag)) {
                        opts.onRowStartDrag.call(target, index, row);
                    }
                },
                onStopDrag: function () {
                    if ($.isFunction(opts.onRowStopDrag)) {
                        opts.onRowStopDrag.call(target, index, row);
                    }
                },
                onDrag: function (e) {
                    var x1 = e.pageX, y1 = e.pageY,
                        x2 = e.data.startX, y2 = e.data.startY,
                        d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    if (d > 15) {
                        $(this).draggable("proxy").show();
                    }
                    this.pageY = e.pageY;
                }
            });
        });
        function setRowsDroppable() {
            t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row[datagrid-row-index]").each(function () {
                if ($.data(this, "droppable")) {
                    return;
                }
                $(this).droppable({
                    accept: "tr.datagrid-row[datagrid-row-index]",
                    onDragEnter: function (e, source) {
                        var dragger = $(source),
                            dropper = $(this),
                            dragIndex = window.parseInt(dragger.attr("datagrid-row-index"), 10),
                            dropIndex = window.parseInt(dropper.attr("datagrid-row-index"), 10),
                            rows = t.datagrid("getRows"),
                            dragRow = rows[dragIndex],
                            dropRow = rows[dropIndex],
                            dropTr = getRowDom(target, dropIndex),
                            mark = dropTr.find("td"),
                            dnd = {
                                dragger: dragger,
                                dropper: dropper,
                                dragIndex: dragIndex,
                                dropIndex: dropIndex,
                                dragRow: dragRow,
                                dropRow: dropRow,
                                mark: mark
                            };
                        $.data(this, "datagrid-row-dnd", dnd);
                        if ($.isFunction(opts.onRowDragEnter) && opts.onRowDragEnter.call(target, dropRow, dragRow) == false) {
                            setDraggableStatus(dragger, false);
                            mark.removeClass("datagrid-row-dnd-top datagrid-row-dnd-bottom");
                            dropper.droppable("disable");
                        }
                    },
                    onDragOver: function (e, source) {
                        var dropper = $(this),
                            dopts = dropper.droppable("options");
                        if (dopts.disabled) {
                            return;
                        }
                        var dnd = $.data(this, "datagrid-row-dnd"),
                            dragger = dnd.dragger,
                            mark = dnd.mark,
                            pageY = source.pageY,
                            top = dropper.offset().top,
                            height = top + dropper.outerHeight(),
                            cls = pageY > top + (height - top) / 2
                                ? "datagrid-row-dnd-bottom"
                                : "datagrid-row-dnd-top";
                        setDraggableStatus(dragger, true);
                        mark.removeClass("datagrid-row-dnd-top datagrid-row-dnd-bottom").addClass(cls);

                        if ($.isFunction(opts.onRowDragOver) && opts.onRowDragOver.call(target, dnd.dropDow, dnd.dragRow) == false) {
                            setDraggableStatus(dragger, false);
                            mark.removeClass("datagrid-row-dnd-top datagrid-row-dnd-bottom");
                            dropper.droppable("disable");
                        }
                    },
                    onDragLeave: function (e, source) {
                        var dnd = $.data(this, "datagrid-row-dnd"),
                            dragger = dnd.dragger,
                            mark = dnd.mark;
                        setDraggableStatus(dragger, false);
                        mark.removeClass("datagrid-row-dnd-top datagrid-row-dnd-bottom");
                        if ($.isFunction(opts.onRowDragLeave)) {
                            opts.onRowDragLeave.call(target, dnd.dropDow, dnd.dragRow);
                        }
                    },
                    onDrop: function (e, source) {
                        var dnd = $.data(this, "datagrid-row-dnd"),
                            mark = dnd.mark,
                            point = mark.hasClass("datagrid-row-dnd-top") ? "top" : "bottom";
                        if ($.isFunction(opts.onRowBeforeDrop) && opts.onRowBeforeDrop.call(target, dnd.dropDow, dnd.dragRow, point) == false) {
                            mark.removeClass("datagrid-row-dnd-top datagrid-row-dnd-bottom");
                            return false;
                        }
                        moveRow(target, {
                            target: dnd.dropIndex,
                            source: dnd.dragIndex,
                            point: point
                        });
                        mark.removeClass("datagrid-row-dnd-top datagrid-row-dnd-bottom");
                        if ($.isFunction(opts.onRowDrop)) {
                            opts.onRowDrop.call(target, dnd.dropDow, dnd.dragRow, point);
                        }
                    }
                });
            });
        }
    }

    function setDraggableStatus(source, state) {
        var icon = source.draggable("proxy").find("span.tree-dnd-icon");
        icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(state ? "tree-dnd-yes" : "tree-dnd-no");
    }



    function getRow(target, index) {
        var t = $(target),
            rows = t.datagrid("getRows");
        return rows ? rows[index] : undefined;
    }

    function getRowDom(target, index) {
        var t = $(target),
            p = t.datagrid("getPanel");
        return p.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row[datagrid-row-index=" + index + "]");
    }

    function getColumnData(target, field) {
        var t = $(target),
            rows = t.datagrid("getRows");
        return $.array.map(rows, function (val) { return val[field]; });
    }

    // param: field: string | { field: string, type: string("header", "body"/default, "all") }
    function getColumnDom(target, param) {
        if (!param || !param.field) {
            return undefined;
        }
        var t = $(target),
            p = t.datagrid("getPanel"),
            field = param.field ? param.field : param,
            type = param.type ? param.type : "body";
        switch (type) {
            case "all":
                return p.find("div.datagrid-view")
                    .find("div.datagrid-header,div.datagrid-body")
                    .find("table.datagrid-htable,table.datagrid-btable")
                    .find("tr.datagrid-header-row,tr.datagrid-row")
                    .find("td[field=" + field + "]");
            case "header":
                return p.find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field=" + field + "]");
            case "body":
                return p.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row td[field=" + field + "]");
            default:
                return p.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row td[field=" + field + "]");
        }
    }

    //  param: { field: string, index: number }
    function getCellData(target, param) {
        if (!param || !param.field || (param.index == null || param.index == undefined)) {
            return undefined;
        }
        var row = getRow(target, param.index);
        return row ? row[param.field] : undefined;
    }

    function getCellDom(target, param) {
        if (!param || !param.field || (param.index == null || param.index == undefined)) {
            return undefined;
        }
        var row = getRowDom(target, param.index);
        return row.find("td[field=" + param.field + "]");
    }

    function getCellHtml(target, param) {
        var td = getCellDom(target, param);
        return td ? td.html() : undefined;
    }

    function getCellText(target, param) {
        var td = getCellDom(target, param);
        return td ? td.text() : undefined;
    }


    function getColumnFields(target, frozen) {
        var t = $(target);
        if (frozen == null || frozen == undefined) {
            return $.fn.datagrid.extensions.getColumnFields.call(t, t, frozen);
        }
        return $.type(frozen) == "string"
            ? $.array.merge([],
                $.fn.datagrid.extensions.getColumnFields.call(t, t, true),
                $.fn.datagrid.extensions.getColumnFields.call(t, t, false))
            : $.fn.datagrid.extensions.getColumnFields.call(t, t, frozen);
    }

    function getColumnOptions(target, frozen) {
        var t = $(target),
            fields = getColumnFields(target, frozen);
        return $.array.map(fields, function (val) {
            return t.datagrid("getColumnOption", val);
        });
    }

    function getVisibleColumnOptions(target, frozen) {
        var cols = getColumnOptions(target, frozen);
        return $.array.filter(cols, function (col) {
            return col.hidden ? false : true;
        });
    }

    function getVisibleColumnFields(target, frozen) {
        var cols = getVisibleColumnOptions(target, frozen);
        return $.array.map(cols, function (val) {
            return val.field;
        });
    }

    function getHiddenColumnOptions(target, frozen) {
        var cols = getColumnOptions(target, frozen);
        return $.array.filter(cols, function (col) {
            return col.hidden ? true : false;
        });
    }

    function getHiddenColumnFields(target, frozen) {
        var cols = getHiddenColumnOptions(target, frozen);
        return $.array.map(cols, function (val) {
            return val.field;
        });
    }

    function getDistinctColumnData(target, field) {
        var data = getColumnData(target, field);
        return $.array.distinct(data);
    }


    //  param: idField | row | function (index, row, rows)
    function findRow(target, param, t, opts, rows) {
        t = t && t.length ? t : $(target);
        opts = opts ? opts : $.data(target, "datagrid").options;
        rows = rows && rows.length ? rows : t.datagrid("getRows");
        var type = $.type(param);
        if (type == "function") {
            return $.array.first(rows, function (row, index) {
                return param.call(target, index, row, rows);
            });
        } else if (type == "object") {
            return opts.idField && (opts.idField in param)
                ? findRowById(param[opts.idField])
                : $.array.first(rows, function (val) { return val == param; });
        } else {
            return findRowById(param);
        }
        function findRowById(id) {
            return $.array.first(rows, function (row) {
                return row[opts.idField] == id;
            });
        }
    }

    //  param: function (index, row, rows) | array (idField | row | function (index, row, rows))
    function findRows(target, param) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if ($.isFunction(param)) {
            return $.array.filter(rows, function (val, index) {
                return param.call(target, index, val, rows);
            });
        } else if ($.array.likeArrayNotString(param)) {
            var array = $.array.map(param, function (val) {
                return findRow(target, val, t, opts, rows);
            });
            return $.array.filter(array, function (val) {
                return val != null && val != undefined;
            });
        } else {
            return [findRow(target, param, t, opts, rows)];
        }
    }


    //  param: idField | row | function (index, row, rows)
    function showRow(target, param, t, opts, rows, refreshable) {
        var state = $.data(target, "datagrid");
        t = t && t.length ? t : $(target);
        opts = opts ? opts : state.options;
        rows = rows && rows.length ? rows : t.datagrid("getRows");
        refreshable = (refreshable == null || refreshable == undefined) ? refreshable : false;

        var row = findRow(target, param, t, opts, rows),
            index = t.datagrid("getRowIndex", row);
        if (index > -1) {
            $.array.remove(state.hiddenRows, row);
            getRowDom(target, index).removeClass("datagrid-row-hidden");
            if (refreshable) {
                refreshHeaderFilters(target, t, opts, rows);
            }
        }
    }

    //  param: idField | row | function (index, row, rows)
    function hideRow(target, param, t, opts, rows, refreshable) {
        var state = $.data(target, "datagrid");
        t = t && t.length ? t : $(target);
        opts = opts ? opts : state.options;
        rows = rows && rows.length ? rows : t.datagrid("getRows");
        refreshable = (refreshable == null || refreshable == undefined) ? refreshable : false;

        var row = findRow(target, param, t, opts, rows),
            index = t.datagrid("getRowIndex", row);
        if (index > -1) {
            $.array.attach(state.hiddenRows, row);
            t.datagrid("unselectRow", index).datagrid("uncheckRow", index);
            getRowDom(target, index).addClass("datagrid-row-hidden");
            if (refreshable) {
                refreshHeaderFilters(target, t, opts, rows);
            }
        }
    }

    //  param: function (index, row, rows) | array (idField | row | function (index, row, rows)) | boolean (true)
    function showRows(target, param) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if (param == true) {
            var p = t.datagrid("getPanel"),
                icons = p.find("div.datagrid-header-filter-item-icon");
            $.array.clear(state.hiddenRows);
            p.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").removeClass("datagrid-row-hidden");
            setHeaderFilterItemIconCls(icons, "tree-checkbox1");
            refreshHeaderFiltersPager(t, opts);
        } else {
            var array = findRows(target, param);
            if (array.length) {
                $.each(array, function (i, n) {
                    showRow(target, n, t, opts, rows, false);
                });
                refreshHeaderFilters(target, t, opts, rows);
            }
        }
    }

    //  param: function (index, row, rows) | array (idField | row | function (index, row, rows)) | boolean (false)
    function hideRows(target, param) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if (param == true) {
            var p = t.datagrid("getPanel"),
                icons = p.find("div.datagrid-header-filter-item-icon");
            $.array.clear(state.hiddenRows);
            $.array.copy(state.hiddenRows, rows);
            p.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").addClass("datagrid-row-hidden");
            setHeaderFilterItemIconCls(icons, "tree-checkbox0");
            refreshHeaderFiltersPager(t, opts);
        } else {
            var array = findRows(target, param);
            if (array.length) {
                $.each(array, function (i, n) {
                    hideRow(target, n, t, opts, rows, false);
                });
                refreshHeaderFilters(target, t, opts, rows);
            }
        }
    }


    function getVisibleRows(target) {
        var t = $(target),
            rows = t.datagrid("getRows"),
            p = t.datagrid("getPanel"),
            indexes = [];
        p.find("div.datagrid-view div.datagrid-body table.datagrid-btable:first tr.datagrid-row:not(.datagrid-row-hidden)").each(function () {
            var index = getTrIndex(this);
            if (index != -1) {
                indexes.push(index);
            }
        });
        return (!rows || !rows.length || !indexes.length)
            ? []
            : $.array.map(indexes, function (i) {
                return rows[i];
            });
    }

    function getHiddenRows(target) {
        var t = $(target),
            rows = t.datagrid("getRows"),
            p = t.datagrid("getPanel"),
            indexes = [];
        p.find("div.datagrid-view div.datagrid-body table.datagrid-btable:first tr.datagrid-row.datagrid-row-hidden").each(function () {
            var index = getTrIndex(this);
            if (index != -1) {
                indexes.push(index);
            }
        });
        return (!rows || !rows.length || !indexes.length)
            ? []
            : $.array.map(indexes, function (i) {
                return rows[i];
            });
    }



    function isMultiLineHeaders(target) {
        var state = $.data(target, "datagrid"),
            opts = state.options;
        if (opts.columns && opts.columns.length > 1 && opts.columns[0].length && opts.columns[1].length) {
            return true;
        }
        if (opts.frozenColumns && opts.frozenColumns.length > 1 && opts.frozenColumns[0].length && opts.frozenColumns[1].length) {
            return true;
        }
        return false;
    }

    function isChecked(target, index) {
        if (index == null || index == undefined) {
            return false;
        }
        var t = $(target),
            rows = t.datagrid("getChecked"),
            indexes = $.array.map(rows, function (r) {
                return t.datagrid("getRowIndex", r);
            });
        return $.array.contains(indexes, index);
    }

    function isSelected(target, index) {
        if (index == null || index == undefined) {
            return false;
        }
        var t = $(target),
            rows = t.datagrid("getSelected"),
            indexes = $.array.map(rows, function (r) {
                return t.datagrid("getRowIndex", r);
            });
        return $.array.contains(indexes, index);
    }

    function isEditing(target, index) {
        if (index == null || index == undefined) {
            return false;
        }
        var row = getRowDom(target, index);
        return row && row.length ? row.is(".datagrid-row-editing") : false;
    }

    function getEditingRowIndexes(target) {
        var t = $(target),
            p = t.datagrid("getPanel"),
            indexes = [];
        p.find("div.datagrid-view div.datagrid-body table.datagrid-btable:first tr.datagrid-row.datagrid-row-editing").each(function () {
            var index = getTrIndex(this);
            if (index != -1) {
                indexes.push(index);
            }
        });
        return indexes;
    }

    function getEditingRows(target) {
        var t = $(target),
            indexes = getEditingRowIndexes(target);
        if (!indexes.length) {
            return [];
        } else {
            var rows = t.datagrid("getRows");
            return $.array.map(indexes, function (i) { return rows[i]; });
        }
    }

    function getEditingRowIndex(target) {
        var t = $(target),
            p = t.datagrid("getPanel"),
            tr = p.find("div.datagrid-view div.datagrid-body table.datagrid-btable:first tr.datagrid-row.datagrid-row-editing:first");
        return tr.length ? getTrIndex(tr) : -1;
    }

    function getEditingRow(target) {
        var t = $(target),
            index = getEditingRowIndex(target);
        if (index == -1) {
            return undefined;
        } else {
            var rows = t.datagrid("getRows");
            return rows[index];
        }
    }


    function getPrevRow(target, index) {
        var t = $(target),
            rows = t.datagrid("getRows");
        return rows[index + 1];
    }

    function getNextRow(target, index) {
        var t = $(target),
            rows = t.datagrid("getRows");
        return rows[index - 1];
    }

    function popRow(target, index) {
        var t = $(target),
            rows = t.datagrid("getRows"),
            row = rows[index];
        if (row) {
            t.datagrid("deleteRow", index);
        }
        return row;
    }

    //  param: { target: number, source: number, point: string("top"/default, "bottom") }
    function moveRow(target, param) {
        if (!param
            || (param.source == null || param.source == undefined)
            || (param.target == null || param.target == undefined)
            || (param.point && param.point != "top" && param.point != "bottom")) {
            return;
        }
        if (!param.point) {
            param.point = "top";
        }
        var t = $(target),
            rows = t.datagrid("getRows");
        if (!rows || !rows.length) {
            return;
        }
        var sourceIndex = param.source,
            targetIndex = param.target,
            sourceRow = rows[sourceIndex],
            targetRow = rows[targetIndex];
        if (sourceIndex == targetIndex || sourceRow == undefined || targetRow == undefined) {
            return;
        }
        var state = $.data(target, "datagrid"),
            opts = state.options;
        if ($.isFunction(opts.onBeforeMoveRow) && opts.onBeforeMoveRow.call(target, targetRow, sourceRow, param.point) == false) {
            return;
        }
        $.fn.datagrid.extensions.deleteRow.call(t, t, sourceIndex);

        var index = t.datagrid("getRowIndex", targetRow);
        if (param.point == "top") {
            $.fn.datagrid.extensions.insertRow.call(t, t, {
                index: index,
                row: sourceRow
            });
        } else {
            rows = t.datagrid("getRows");
            if (index++ >= rows.length) {
                $.fn.datagrid.extensions.appendRow.call(t, t, sourceRow);
            } else {
                $.fn.datagrid.extensions.insertRow.call(t, t, {
                    index: index,
                    row: sourceRow
                });
            }
        }
        refreshHeaderFilters(target, t, opts, rows);
        if ($.isFunction(opts.onMoveRow)) {
            opts.onMoveRow.call(target, targetRow, sourceRow, param.point);
        }
    }

    //  param: { index: number, type: string("up"/default, "down") }
    function shiftRow(target, param) {
        if ($.type(param) == "number") {
            param = { index: param, type: "up" };
        }
        if (!param || (param.index == null || param.index == undefined) || (param.type && param.type != "up" && param.type != "down")) {
            return;
        }
        if (!param.type) {
            param.type = "up";
        }
        var sourceIndex = param.index,
            targetIndex = param.type == "up" ? param.index - 1 : param.index + 1,
            point = param.type == "up" ? "top" : "bottom";
        moveRow(target, {
            source: sourceIndex,
            target: targetIndex,
            point: point
        });
    }


    function getPrevColumn(target, field) {
        if (!field) {
            return undefined;
        }
        var fields = getColumnFields(target, "all");
        if (!fields || !fields.length) {
            return undefined;
        }
        var index = $.array.indexOf(fields, field);
        return index < 1
            ? undefined
            : $(target).datagrid("getColumnOption", fields[index - 1])
    }

    function getNextColumn(target, field) {
        if (!field) {
            return undefined;
        }
        var fields = getColumnFields(target, "all");
        if (!fields || !fields.length) {
            return undefined;
        }
        var index = $.array.indexOf(fields, field);
        return index == -1 || index >= fields.length - 1
            ? undefined
            : $(target).datagrid("getColumnOption", fields[index + 1])
    }

    function getPrevVisibleColumn(target, field) {
        if (!field) {
            return undefined;
        }
        var cols = getColumnOptions(target, "all");
        if (!cols || !cols.length) {
            return undefined;
        }
        var index = -1;
        return $.array.last(cols, function (val, i) {
            if (val.field == field) {
                index = i;
            }
            return index != -1 && i < index && !val.hidden ? true : false;
        });
    }

    function getNextVisibleColumn(target, field) {
        if (!field) {
            return undefined;
        }
        var cols = getColumnOptions(target, "all");
        if (!cols || !cols.length) {
            return undefined;
        }
        var index = -1;
        return $.array.first(cols, function (val, i) {
            if (val.field == field) {
                index = i;
            }
            return index != -1 && i > index && !val.hidden ? true : false;
        });
    }




    function deleteColumn(target, field) {
        var state = $.data(target, "datagrid");
        if (state.multiLineHeaders) {
            $.error("不支持在多行表头情况下执行删除表格列的操作。");
        }
        var opts = state.options;
        if ($.isFunction(opts.onBeforeDeleteColumn) && opts.onBeforeDeleteColumn.call(target, field) == false) {
            return;
        }
        var removed = removeField(target, field);
        if (removed) {
            getColumnDom(target, { field: field, type: "all" }).remove();
            if ($.isFunction(opts.onDeleteColumn)) {
                opts.onDeleteColumn.call(target, field);
            }
        }
    }

    function popColumn(target, field) {
        var state = $.data(target, "datagrid");
        if (state.multiLineHeaders) {
            $.error("不支持在多行表头情况下执行删除表格列的操作。");
        }
        var t = $(target),
            copts = t.datagrid("getColumnOption", field);
        if (copts) {
            deleteColumn(target, field);
            return copts;
        } else {
            return undefined;
        }
    }

    //  param: { target: string/field, source: string/field, point: string("before"/default, "after") }
    function moveColumn(target, param) {
        if (!param || !param.target || !param.source || param.target == param.source || (param.point != "before" && param.point != "after")) {
            return;
        }
        var state = $.data(target, "datagrid"),
            opts = state.options;
        if (state.multiLineHeaders) {
            $.error("不支持在多行表头情况下执行移动表格列的操作。");
        }
        var targetField = param.target,
            sourceField = param.source,
            fields = getColumnFields(target, "all"),
            targetIndex = $.array.indexOf(fields, targetField),
            sourceIndex = $.array.indexOf(fields, sourceField);
        if (targetIndex == -1 || sourceIndex == -1 || targetIndex == sourceIndex) {
            return;
        }
        var frozenFields = getColumnFields(target, true),
            targetFrozen = isFrozenColumn(target, targetField, frozenFields),
            sourceFrozen = isFrozenColumn(target, sourceField, frozenFields),
            point = param.point;
        if (sourceIndex == (point == "before" ? targetIndex - 1 : targetIndex + 1) && (targetFrozen == sourceFrozen)) {
            return;
        }
        if ($.isFunction(opts.onBeforeMoveColumn) && opts.onBeforeMoveColumn.call(target, targetField, sourceField, point) == false) {
            return;
        }
        var t = $(target),
            p = t.datagrid("getPanel"),
            v = p.find("div.datagrid-view"),
            v1 = v.find("div.datagrid-view1"),
            v2 = v.find("div.datagrid-view2"),
            hr1 = v1.find("div.datagrid-header table.datagrid-htable tr.datagrid-header-row"),
            hr2 = v2.find("div.datagrid-header table.datagrid-htable tr.datagrid-header-row"),
            br1 = v1.find("div.datagrid-body table.datagrid-btable tr.datagrid-row"),
            br2 = v2.find("div.datagrid-body table.datagrid-btable tr.datagrid-row"),
            targetHeaderTd = (targetFrozen ? hr1 : hr2).find("td[field=" + targetField + "]"),
            sourceHeaderTd = (sourceFrozen ? hr1 : hr2).find("td[field=" + sourceField + "]"),
            targetRow = targetFrozen ? br1 : br2,
            sourceRow = sourceFrozen ? br1 : br2,
            targetCopts = t.datagrid("getColumnOption", targetField),
            sourceCopts = t.datagrid("getColumnOption", sourceField),
            targetColumns = targetFrozen ? opts.frozenColumns[0] : opts.columns[0],
            sourceColumns = sourceFrozen ? opts.frozenColumns[0] : opts.columns[0];

        targetHeaderTd[point](sourceHeaderTd);
        targetRow.each(function (i) {
            var targetTd = $(this).find("td[field=" + targetField + "]"),
                sourceTd = $(sourceRow[i]).find("td[field=" + sourceField + "]");
            targetTd[point](sourceTd);
        });

        $.array.remove(sourceColumns, sourceCopts);
        var targetCoptsIndex = $.array.indexOf(targetColumns, targetCopts);
        $.array.insert(targetColumns, point == "before" ? targetCoptsIndex : targetCoptsIndex + 1, sourceCopts);

        t.datagrid("fixColumnSize");
        if (sourceFrozen) {
            if (!targetFrozen) {
                var index = $.array.indexOf(state.columnOptions, targetCopts, function (col) { return col.field == targetField; });
                $.array.insert(state.columnOptions, point == "before" ? index : index + 1, sourceCopts);
                $.array.insert(state.originalColumnOptions, point == "before" ? index : index + 1, $.extend({}, sourceCopts));
            }
        } else {
            var index = $.array.indexOf(state.columnOptions, sourceCopts, function (col) { return col.field == sourceField; });
            if (targetFrozen) {
                $.array.removeAt(state.columnOptions, index);
                $.array.removeAt(state.originalColumnOptions, index);
            } else {
                var copts = state.columnOptions[index],
                    bcopts = state.originalColumnOptions[index];
                $.array.removeAt(state.columnOptions, index);
                $.array.removeAt(state.originalColumnOptions, index);

                var tindex = $.array.indexOf(state.columnOptions, targetCopts, function (col) { return col.field == targetField; });
                $.array.insert(state.columnOptions, point == "before" ? tindex : tindex + 1, copts);
                $.array.insert(state.originalColumnOptions, point == "before" ? tindex : tindex + 1, bcopts);
            }
        }

        if ($.isFunction(opts.onMoveColumn)) {
            opts.onMoveColumn.call(target, targetField, sourceField, point);
        }
    }

    //  param: { field: string, point: string("before"/default, "after") }
    function shiftColumn(target, param) {
        if (!param || !param.field || (param.point != "before" && param.point != "after")) {
            return;
        }
        var state = $.data(target, "datagrid");
        if (state.multiLineHeaders) {
            $.error("不支持在多行表头情况下执行移动表格列的操作。");
        }
        var sourceField = param.field,
            targetColumn = param.point == "before" ? getPrevVisibleColumn(target, sourceField) : getNextVisibleColumn(target, sourceField);
        if (!targetColumn || !targetColumn.field) {
            return;
        }
        var targetField = targetColumn.field;
        moveColumn(target, {
            target: targetField,
            source: sourceField,
            point: param.point
        });
    }

    function removeField(target, field) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            frozen = isFrozenColumn(target, field);
        return remove(frozen ? opts.frozenColumns : opts.columns);
        function remove(columns) {
            if (!columns || !columns.length) {
                return false;
            }
            var ret = false;
            $.each(columns, function (index, cols) {
                var i = $.array.indexOf(cols, field, function (col) {
                    return col.field == field;
                });
                if (i > -1) {
                    $.array.removeAt(cols, i);
                    ret = true;
                    $.array.remove(state.columnOptions, field, function (col) {
                        return col.field == field;
                    });
                    $.array.remove(state.originalColumnOptions, field, function (col) {
                        return col.field == field;
                    });
                }
            });
            return ret;
        }
    }

    function isFrozenColumn(target, field, frozenFields) {
        if (!field) {
            return undefined;
        }
        var fields = frozenFields && frozenFields.length ? frozenFields : getColumnFields(target, true);
        return $.array.contains(fields, field);
    }


    function freezeColumn(target, field) {
        var state = $.data(target, "datagrid");
        if (state.multiLineHeaders) {
            $.error("不支持在多行表头情况下执行冻结表格列的操作。");
        }
        var frozenFields = getColumnFields(target, true),
            isFrozen = isFrozenColumn(target, field, frozenFields);
        if (isFrozen) {
            return;
        }
        moveColumn(target, {
            target: frozenFields[frozenFields.length - 1],
            source: field,
            point: "after"
        });
    }

    function unfreezeColumn(target, field) {
        var state = $.data(target, "datagrid");
        if (state.multiLineHeaders) {
            $.error("不支持在多行表头情况下执行取消冻结表格列的操作。");
        }
        var fields = getColumnFields(target, false)
        if ($.array.contains(fields, field)) {
            return;
        }
        moveColumn(target, {
            target: fields[0],
            source: field,
            point: "before"
        });
    }




    //  param: { width: number, height: number }
    function setOffset(target, param) {
        var state = $.data(target, "datagrid");
        if (state.offset == null || state.offset == undefined) {
            state.offset = {};
        }
        if (param != null && param != undefined) {
            if (param == false) {
                state.offset.enable = false;
            } else {
                state.offset.enable = true;
                $.extend(state.offset, param);
                state.offset.width = $.isNumeric(state.offset.width) ? state.offset.width : 0;
                state.offset.height = $.isNumeric(state.offset.height) ? state.offset.height : 0;
            }
        }
        $(window).unbind("resize.datagrid-offset").bind("resize.datagrid-offset", offset);
        offset();
        function offset() {
            $(".datagrid-f").each(function () {
                var target = this,
                    state = $.data(target, "datagrid");
                if (state && state.offset && state.offset.enable) {
                    var size = $.util.windowSize();
                    $(target).datagrid("resize", {
                        width: size.width + state.offset.width,
                        height: size.height + state.offset.height
                    });
                }
            });
        }
    }


    function disabledPrevPage(target) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            pager = t.datagrid("getPager");
        if (!opts.pagination || !pager || !pager.length) {
            return true;
        }
        var popts = pager.pagination("options");
        return popts.pageNumber <= 1;
    }

    function disabledNextPage(target) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            pager = t.datagrid("getPager");
        if (!opts.pagination || !pager || !pager.length) {
            return true;
        }
        var popts = pager.pagination("options"),
            pageCount = Math.ceil(parseFloat(popts.total) / parseFloat(popts.pageSize));
        return popts.pageNumber >= pageCount;
    }

    function selectFirstPage(target) {
        var disabled = disabledPrevPage(target);
        if (disabled) {
            return;
        }
        $(target).datagrid("getPager").pagination("select", 1);
    }

    function selectPrevPage(target) {
        var disabled = disabledPrevPage(target);
        if (disabled) {
            return;
        }
        var pager = $(target).datagrid("getPager"),
            popts = pager.pagination("options");
        pager.pagination("select", popts.pageNumber - 1);
    }

    function selectNextPage(target) {
        var disabled = disabledNextPage(target);
        if (disabled) {
            return;
        }
        var pager = $(target).datagrid("getPager"),
            popts = pager.pagination("options");
        pager.pagination("select", popts.pageNumber + 1);
    }

    function selectLastPage(target) {
        var disabled = disabledNextPage(target);
        if (disabled) {
            return;
        }
        var pager = $(target).datagrid("getPager"),
            popts = pager.pagination("options"),
            pageCount = Math.ceil(parseFloat(popts.total) / parseFloat(popts.pageSize));
        pager.pagination("select", pageCount);
    }


    function disabledMoveTop(target, index) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if (!rows || !rows.length) {
            return true;
        }
        return ((opts.movingMenu == true || opts.movingMenu.top == true) && index > 0) ? false : true;
    }

    function disabledMoveUp(target, index) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if (!rows || !rows.length) {
            return true;
        }
        return ((opts.movingMenu == true || opts.movingMenu.up == true) && index > 0) ? false : true;
    }

    function disabledMoveDown(target, index) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if (!rows || !rows.length) {
            return true;
        }
        return ((opts.movingMenu == true || opts.movingMenu.down == true) && index < rows.length - 1) ? false : true;
    }

    function disabledMoveBottom(target, index) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            rows = t.datagrid("getRows");
        if (!rows || !rows.length) {
            return true;
        }
        return ((opts.movingMenu == true || opts.movingMenu.bottom == true) && index < rows.length - 1) ? false : true;
    }


    function moveRowToTop(target, index) {
        var disabled = disabledMoveTop(target, index);
        if (disabled) {
            return;
        }
        moveRow(target, { source: index, target: 0, point: "top" });
    }

    function moveRowUp(target, index) {
        var disabled = disabledMoveUp(target, index);
        if (disabled) {
            return;
        }
        shiftRow(target, { index: index, type: "up" });
    }

    function moveRowDown(target, index) {
        var disabled = disabledMoveDown(target, index);
        if (disabled) {
            return;
        }
        shiftRow(target, { index: index, type: "down" });
    }

    function moveRowToBottom(target, index) {
        var disabled = disabledMoveBottom(target, index);
        if (disabled) {
            return;
        }
        var t = $(target),
            rows = t.datagrid("getRows");
        moveRow(target, { source: index, target: rows.length - 1, point: "bottom" });
    }


    //  param: { field: string, title: string }
    function setColumnTitle(target, param) {
        if (!param || !param.field || !param.title) {
            return;
        }
        var td = getColumnDom(target, { field: param.field, type: "header" });
        if (td && td.length) {
            var t = $(target),
                copts = t.datagrid("getColumnOption", param.field);
            td.find("div.datagrid-cell span:not(.datagrid-header-cell-arrow,.datagrid-sort-icon)").html(param.title);
            copts.title = param.title;
        }
    }

    //  param: { field: string, width: number}
    function resizeColumn(target, param) {
        if (!param || !param.field || !param.width) {
            return;
        }
        var td = getColumnDom(target, { field: param.field, type: "header" }),
            cell = td.find("div.datagrid-cell");
        if (!cell.length) {
            return;
        }
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options,
            field = param.field,
            width = param.width,
            col = t.datagrid("getColumnOption", field);
        col.width = width;
        col.boxWidth = width - col.deltaWidth;
        col.auto = undefined;
        cell.css("width", "");
        t.datagrid("fixColumnSize", field);
        t.datagrid("fitColumns");
        opts.onResizeColumn.call(target, field, width);
    }

    function highlightColumn(target, field) {
        var t = $(target),
            state = $.data(target, "datagrid");
        if (state.highlightField) {
            getColumnDom(target, { field: state.highlightField, type: "all" }).removeClass("datagrid-row-over");
        }
        getColumnDom(target, { field: field, type: "all" }).removeClass("datagrid-row-over").filter(function () {
            return !$(this).closest("tr.datagrid-row").is(".datagrid-row-selected");
        }).addClass("datagrid-row-over");
        state.highlightField = field;
    }

    function unhighlightColumn(target, field) {
        var t = $(target),
            state = $.data(target, "datagrid");
        if (state.highlightField) {
            getColumnDom(target, { field: state.highlightField, type: "all" }).removeClass("datagrid-row-over");
        }
        getColumnDom(target, { field: field, type: "all" }).removeClass("datagrid-row-over");
        state.highlightField = undefined;
    }


    //  param: string | { field: string, value: string, regular: boolean, ignoreCase: boolean }
    function highlightSearch(target, param) {
        var t = $(target),
            pp = { field: "", value: "", regular: false, ignoreCase: true },
            args = param
                ? $.extend(pp, param.field || param.value ? param : { value: param })
                : pp,
            regexp = args.regular ? new RegExp(args.value, args.ignoreCase ? "gm" : "igm") : args.value,
            subselector = args.field ? "field=" + args.field : "field",
            selector = "div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row td[" + subselector + "] div.datagrid-cell";
        t.datagrid("getPanel").find(selector).each(function () {
            var cell = $(this);
            cell.find("span.datagrid-cell-hightlight").replaceWith(function () {
                return $(this).text();
            });
            if (!args.value) {
                return;
            }
            var html = cell.html();
            if (!html) {
                return;
            }
            var newHtml = html.replace(regexp, function (word) {
                return word ? "<span class='datagrid-cell-hightlight'>" + word + "</span>" : "";
            });
            cell.html(newHtml);
        });
    }

    function showFilterDialog(target, field, rows, fieldValues) {
        if (!field) {
            return;
        }
        var t = $(target);
        rows = rows && rows.length ? rows : t.datagrid("getRows");
        fieldValues = fieldValues && fieldValues.length ? fieldValues : getDistinctColumnData(target, field);

        var state = $.data(target, "datagrid"),
            copts = t.datagrid("getColumnOption", field),
            title = copts.title || copts.field,
            d = $.easyui.showDialog({
                title: "过滤/显示",
                iconCls: "icon-standard-application-view-detail",
                height: 300,
                width: 220,
                modal: true,
                resizable: true,
                toolbar: [
                    {
                        text: "全部选择", iconCls: "icon-standard-accept",
                        handler: function () {
                            showRows(target, true);
                            d.dialog("body").find(":checkbox").each(function () { this.checked = true; });
                        }
                    },
                    {
                        text: "全部不选", iconCls: "icon-standard-cancel",
                        handler: function () {
                            hideRows(target, true);
                            d.dialog("body").find(":checkbox").each(function () { this.checked = false; });
                        }
                    }
                ],
                enableApplyButton: false,
                enableSaveButton: false,
                locale: t.datagrid("getPanel")
            }),
            body = d.dialog("body"),
            l = $("<div>"
                + "<div class=\"datagrid-filters-dialog-layout-north\" data-options=\"region: 'north', split: false, border: false\" >列：" + title + "，共" + fieldValues.length + "项</div>"
                + "<div class=\"datagrid-filters-dialog-layout-center\" data-options=\"region: 'center', border: false\" ></div>"
                + "</div>").appendTo(body).layout({
                    fit: true
                }),
            b = l.layout("panel", "center"),
            ul = $("<ul></ul>").appendTo(b);

        $.each(fieldValues, function (i, text) {
            var id = "item_ck_" + $.util.guid("N"),
                checked = !$.array.some(state.hiddenRows, function (val) {
                    return val[field] == text;
                }),
                li = $("<li></li>").appendTo(ul),
                ck = $("<input />").attr({
                    type: "checkbox",
                    id: id,
                    checked: checked
                }).appendTo(li),
                label = $("<label></label>").attr("for", id).text(text).appendTo(li);
            ck.click(function () {
                var hrows = $.array.filter(rows, function (row) { return row[field] == text; }),
                    hcells = $.array.filter(state.hiddenRows, function (row) { return row[field] == text; });
                hcells.length ? showRows(target, hrows) : hideRows(target, hrows);
            });
        });
    }






    function refreshHeaderFilters(target, t, opts, rows, headerFields) {
        var state = $.data(target, "datagrid");
        t = t && t.length ? t : $(target);
        opts = opts ? opts : state.options;
        refreshHeaderFiltersPager(t, opts);

        rows = rows && rows.length ? rows : t.datagrid("getRows");
        headerFields = headerFields || getHeaderFields(t);
        headerFields.each(function () {
            var td = $(this),
                field = td.attr("field");
            refreshHeaderFilterCell(target, t, opts, rows, td, field);
        });
    }

    function getHeaderFields(t) {
        return t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this),
                colspan = td.attr("colspan"),
                field = td.attr("field"),
                copts = t.datagrid("getColumnOption", field);
            return (!colspan || colspan == "1") && !td.is(".datagrid-cell-rownumber") && copts && !copts.checkbox ? true : false;
        });
    }


    function refreshHeaderFilterCell(target, t, opts, rows, td, field) { }


    function setHeaderFilterItemIconCls(icons, iconCls) {
        icons.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2").addClass(iconCls);
    }

    function refreshHeaderFiltersPager(t, opts) {
        var pager = t.datagrid("getPager");
        if (!opts.pagination || !pager || !pager.length) {
            return true;
        }
        var target = t[0],
            rows = t.datagrid("getRows"),
            visibleRows = getVisibleRows(target),
            length = visibleRows.length,
            total = rows.length,
            visible = length < total ? true : false,
            visibleDIV = pager.find("div.datagrid-pagination-visiblerows");
        if (opts.showFilterText == false || ((opts.showFilterText == null || opts.showFilterText == undefined) && !visible)) {
            return visibleDIV.remove();
        }
        if (visibleDIV.length) {
            visibleDIV.each(function () {
                $(this).html("当前页显示" + length + "/" + total + "行");
            });
        } else {
            pager.find("div.pagination-info").each(function () {
                $(this).before("<div class=\"datagrid-pagination-visiblerows\">当前页显示" + length + "/" + total + "行</div>");
            });
        }
    }






    function initializeExtensions(target) {
        var t = $(target),
            state = $.data(target, "datagrid"),
            opts = state.options;

        initExtendColumnOptions(t, opts);
        initHeaderFiltersData(t, opts);
        initDisposeEvent(t, opts);
        initHeaderContextMenu(t, opts);
        initHeaderClickMenu(t, opts);
        initRowContextMenu(t, opts);
        initBindDblClickRowEvent(t, opts);
        initAutoEditingEvent(t, opts);
        initFinishEditEvent(t, opts);
        initHeaderMouseEvent(t, opts);
        initRowMouseEvent(t, opts);
        initRowCellMouseEvent(t, opts);
        initOffset(t, opts);
    }

    function initHeaderFiltersData(t, opts) {
        var target = t[0],
            state = $.data(target, "datagrid");
        state.hiddenRows = [];
    }


    function initDisposeEvent(t, opts) {
        t.datagrid("getPanel").panel("body").undelegate(".datagrid-extensions").delegate("tr.datagrid-header-row, tr.datagrid-row", "click.datagrid-extensions", function () {
            $.easyui.hideAllMenu();
        });
    }

    function initExtendColumnOptions(t, opts) {
        var target = t[0],
            state = $.data(target, "datagrid"),
            cols = getColumnOptions(target, "all");
        $.each(cols, function (i, col) {
            $.union(col, $.fn.datagrid.extensions.columnOptions);
        });
        var columnOptions = getColumnOptions(target, false);
        state.columnOptions = $.array.filter(columnOptions, function (col) {
            return col.title ? true : false;
        });
        state.originalColumnOptions = $.array.map(state.columnOptions, function (col) {
            return $.extend({}, col);
        });
        state.multiLineHeaders = isMultiLineHeaders(target);
    }

    function initHeaderContextMenu(t, opts) {
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-header-row>td[field]", "contextmenu.datagrid-extensions", function (e) {
            var td = $(this),
                field = td.attr("field");
            if (!field) {
                return;
            }
            if (opts.enableHeaderContextMenu) {
                e.preventDefault();
                var menuItems = getHeaderMenuItems(t, opts, e, field);
                $.easyui.showMenu({ items: menuItems, left: e.pageX, top: e.pageY, event: e });
            }
        });
    }

    function initHeaderClickMenu(t, opts) {
        if (opts.enableHeaderClickMenu) {
            getHeaderFields(t).each(function () {
                initHeaderCellClickMenu(t, opts, this);
            });
        }
    }

    function initHeaderCellClickMenu(t, opts, tdDom) {
        var td = $(tdDom),
            cell = td.find("div.datagrid-cell"),
            arrow = $("<span class='s-btn-downarrow datagrid-header-cell-arrow'>&nbsp;</span>").prependTo(cell).click(function (e) {
                $.easyui.hideAllMenu();
                var s = $(this),
                    offset = s.offset(),
                    height = s.outerHeight(),
                    field = s.closest("td[field]").attr("field"),
                    menuItems = getHeaderMenuItems(t, opts, e, field),
                    mm = $.easyui.showMenu({
                        items: menuItems,
                        left: offset.left,
                        top: offset.top + height
                    }),
                    mopts = mm.menu("options"),
                    onHide = mopts.onHide;
                arrow.hidden = false;
                mopts.onHide = function () {
                    arrow.hidden = true;
                    arrow.removeClass("datagrid-header-cell-arrow-show");
                    onHide.apply(this, arguments);
                };
                e.stopPropagation();
            });
        td.unbind(".arrow-hover").bind({
            "mouseenter.arrow-hover": function () {
                arrow.addClass("datagrid-header-cell-arrow-show");
            },
            "mouseleave.arrow-hover": function () {
                if (arrow.hidden == null || arrow.hidden == undefined || arrow.hidden) {
                    arrow.removeClass("datagrid-header-cell-arrow-show");
                }
            }
        });
    }


    function getHeaderMenuItems(t, opts, e, field) {
        var menuItems = [],
            defaultMenuItems = [],
            args = [t[0], field];

        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.datagrid.extensions.sortMenus);
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.datagrid.extensions.fieldToggleMenus);
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.datagrid.extensions.fieldMovingMenus);
        $.array.merge(defaultMenuItems, defaultMenuItems.length ? "-" : [], $.fn.datagrid.extensions.rowToggleMenus);

        if ($.array.likeArrayNotString(opts.headerContextMenu)) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], opts.headerContextMenu);
        }
        if (defaultMenuItems.length) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], defaultMenuItems);
        }
        return $.easyui.parseMenuItems(menuItems, args);
    }


    function initRowContextMenu(t, opts) {
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-row", "contextmenu.datagrid-extensions", function (e) {
            var index = getTrIndex(this);
            if (index == -1) {
                return;
            }
            if (opts.selectOnRowContextMenu) {
                t.datagrid("selectRow", index);
            }
            if (opts.enableRowContextMenu) {
                e.preventDefault();
                if ($.type(opts.pagingMenu) == "object") {
                    opts.pagingMenu = $.union(opts.pagingMenu, { disabled: false, submenu: true });
                }
                if ($.type(opts.movingMenu) == "object") {
                    opts.movingMenu = $.union(opts.movingMenu, { top: true, up: true, down: true, bottom: true, submenu: true });
                }
                var row = getRow(t[0], index),
                    menuItems = getRowMenuItems(t, opts, e, index, row);
                if (opts.autoBindDblClickRow && opts.dblClickRowMenuIndex >= 0 && $.array.likeArrayNotString(opts.rowContextMenu) && opts.rowContextMenu.length > opts.dblClickRowMenuIndex) {
                    menuItems[opts.dblClickRowMenuIndex].bold = true;
                }
                $.easyui.showMenu({ items: menuItems, left: e.pageX, top: e.pageY, event: e });
            }
        });
    }

    function getTrIndex(tr) {
        if (!tr) {
            return -1;
        }
        tr = $.util.isJqueryObject(tr) ? tr : $(tr);
        var attr = tr.attr("datagrid-row-index");
        return (attr == null || attr == undefined || attr == "") ? -1 : window.parseInt(attr, 10);
    }

    function initBindDblClickRowEvent(t, opts) {
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-row", "dblclick.datagrid-extensions", function (e) {
            if (!$.array.likeArrayNotString(opts.rowContextMenu) || !opts.rowContextMenu.length || !opts.autoBindDblClickRow) {
                return;
            }
            var index = getTrIndex(this);
            if (index == -1) {
                return;
            }
            var row = getRow(t[0], index),
                menuItems = getRowMenuItems(t, opts, e, index, row);
            if (opts.dblClickRowMenuIndex >= 0 && menuItems.length > opts.dblClickRowMenuIndex) {
                var item = menuItems[opts.dblClickRowMenuIndex],
                    handler = item.handler || item.onclick;
                if ($.isFunction(handler)) {
                    handler.call(this, e, item, null, t[0], index, row);
                }
            }
        });
    }

    function initAutoEditingEvent(t, opts) {
        var eventName = opts.autoEditingEvent || "dblclick";
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-row", eventName + ".datagrid-extensions", function (e) {
            var index = getTrIndex(this);
            if (index == -1) {
                return;
            }
            if (opts.autoEditing) {
                beginEdit(t[0], index);
            }
        })
    }

    function initFinishEditEvent(t, opts) {
        if (!opts.finishEditLocale) {
            return;
        }
        $(opts.finishEditLocale).click(function (e) {
            if (opts.finishEditOnBlur) {
                var target = t[0],
                    p = t.datagrid("getPanel"),
                    indexes = getEditingRowIndexes(target);
                if (!$.contains(p[0], e.target)) {
                    $.each(indexes, function (index, i) {
                        t.datagrid(opts.finishEditMethod, i);
                    });
                }
            }
        });
    }


    function getRowMenuItems(t, opts, e, index, row) {
        var menuItems = [],
            defaultMenuItems = [],
            args = [t[0], index, row];

        if (opts.refreshMenu) {
            $.array.merge(defaultMenuItems, $.fn.datagrid.extensions.refreshMenus);
        }
        if (opts.pagingMenu != null && opts.pagingMenu != undefined && (opts.pagingMenu == true || !opts.pagingMenu.disabled)) {
            $.array.merge(defaultMenuItems,
                defaultMenuItems.length ? "-" : [],
                opts.pagingMenu.submenu ? $.fn.datagrid.extensions.pagingRootMenus : $.fn.datagrid.extensions.pagingMenus);
        }
        if (opts.movingMenu != null && opts.movingMenu != undefined && (opts.movingMenu == true || opts.movingMenu.top || opts.movingMenu.up || opts.movingMenu.down || opts.movingMenu.bottom)) {
            $.array.merge(defaultMenuItems,
                defaultMenuItems.length ? "-" : [],
                opts.movingMenu.submenu ? $.fn.datagrid.extensions.movingRootMenus : $.fn.datagrid.extensions.movingMenus);
        }

        if ($.array.likeArrayNotString(opts.rowContextMenu)) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], opts.rowContextMenu);
        }
        if (defaultMenuItems.length) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], defaultMenuItems);
        }

        return $.easyui.parseMenuItems(menuItems, args);
    }


    function initHeaderMouseEvent(t, opts) {
        var target = t[0];
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-header-row>td[field]", "mouseenter.datagrid-extensions", function (e) {
            var td = $(this),
                field = td.attr("field");
            if (!field) {
                return;
            }
            resetHeaderDnd(target, field, t, opts, td);
        });
    }


    function initRowMouseEvent(t, opts) {
        var target = t[0];
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-row", {
            "mouseenter.datagrid-extensions": function (e) {
                var tr = $(this);
                if (tr.is(".datagrid-row-editing")) {
                    return;
                }
                var index = getTrIndex(tr);
                if (index == -1) {
                    return;
                }
                var row = getRow(target, index);
                resetRowDnd(target, index, t, opts, row, tr);
                showRowTooltip(target, index, t, opts, row, tr, e);
            },
            "mouseleave.datagrid-extensions": function () {
                var tr = $(this),
                    index = getTrIndex(tr);
                if (index == -1) {
                    return;
                }
                hideRowTooltip(target, index, tr);
            }
        });
    }

    function showRowTooltip(target, index, t, opts, row, tr, e) {
        t = t || $(target);
        opts = opts || $.data(target, "datagrid").options;
        row = row || getRow(target, index);
        tr = tr || getRowDom(target, index);
        if (opts.rowTooltip) {
            var content = $.isFunction(opts.rowTooltip) ? opts.rowTooltip.call(target, index, row) : getRowTooltipContent(target, index, row);
            tr.each(function () {
                if (!$.data(this, "tooltip")) {
                    $(this).tooltip({
                        content: content,
                        trackMouse: true,
                        showDelay: opts.tooltipDelay
                    }).tooltip("show");
                }
            });
        } else {
            tr.children("td[field]").each(function () {
                var td = $(this),
                    field = td.attr("field"),
                    copts = t.datagrid("getColumnOption", field);
                if (!copts || !copts.tooltip) {
                    return;
                }
                if (!$.data(td[0], "tooltip")) {
                    var content = $.isFunction(copts.tooltip) ? copts.tooltip.call(target, index, row, field) : row[field];
                    td.tooltip({
                        content: content,
                        trackMouse: true,
                        showDelay: opts.tooltipDelay
                    });
                }
                if (e && e.target) {
                    if (td[0] == e.target || $.contains(t[0], e.target)) {
                        td.tooltip("show");
                    }
                } else {
                    td.tooltip("show");
                }
            });
        }
    }

    function getRowTooltipContent(target, index, row) {
        var cols = getColumnOptions(target, "all"),
            content = $("<table style='padding: 5px;'></table>");
        $.each(cols, function (i, copts) {
            if (!copts || !copts.field || !copts.title) {
                return;
            }
            var val = row[copts.field],
                text = val != null && val != undefined ? val : "";
            content.append("<tr style='height: 20px;'><td style='text-align: right; width: 150px;'>" + copts.title + ":</td><td style='width: 250px;'>" + text + "</td></tr>");
        });
        return content;
    }

    function hideRowTooltip(target, index, tr) {
        tr = tr || getRowDom(target, index);
        tr.tooltip("destroy").children("td[field]").each(function () {
            $(this).tooltip("destroy");
        });
    }


    function initRowCellMouseEvent(t, opts) {
        t.datagrid("getPanel").panel("body").delegate("tr.datagrid-header-row>td[field],tr.datagrid-row>td[field]", {
            "mouseenter.datagrid-extensions": function () {
                if (!opts.autoHighlightColumn) {
                    return;
                }
                var target = t[0],
                    td = $(this),
                    field = td.attr("field");
                highlightColumn(target, field);
            },
            "mouseleave.datagrid-extensions": function () {
                if (!opts.autoHighlightColumn) {
                    return;
                }
                var target = t[0],
                    td = $(this),
                    field = td.attr("field");
                unhighlightColumn(target, field);
            }
        });
    }



    function initOffset(t, opts) {
        if (opts.offset != null && opts.offset != undefined
            && (opts.offset.enable == null || opts.offset.enable == undefined || opts.offset.enable == true)
            && ($.isNumeric(opts.offset.width) || $.isNumeric(opts.offset.height))) {
            setOffset(t[0], opts.offset);
        }
    }



    $.fn.datagrid.extensions.sortMenus = [
        {
            text: "升序", iconCls: "icon-standard-hmenu-asc",
            disabled: function (e, menuItem, menu, target, field) {
                var t = $(target),
                    copts = t.datagrid("getColumnOption", field);
                return copts.sortable && (copts.colspan == null || copts.colspan == undefined || copts.colspan == 1) ? false : true;
            },
            handler: function (e, menuItem, menu, target, field) {
                return $(target).datagrid("sort", { sortName: field, sortOrder: "asc" });
            }
        },
        {
            text: "降序", iconCls: "icon-standard-hmenu-desc",
            disabled: function (e, menuItem, menu, target, field) {
                var t = $(target),
                    copts = t.datagrid("getColumnOption", field);
                return copts.sortable && (copts.colspan == null || copts.colspan == undefined || copts.colspan == 1) ? false : true;
            },
            handler: function (e, menuItem, menu, target, field) {
                return $(target).datagrid("sort", {
                    sortName: field, sortOrder: "desc"
                });
            }
        }
    ];


    $.fn.datagrid.extensions.fieldMovingMenus = [
        {
            text: "冻结/移动列", iconCls: "icon-standard-application-view-icons",
            disabled: function (e, menuItem, menu, target, field) {
                var state = $.data(target, "datagrid"),
                    t = $(target),
                    copts = t.datagrid("getColumnOption", field);
                return copts.movable && !state.multiLineHeaders ? false : true;
            },
            children: function (e, menuItem, menu, target, field) {
                var t = $(target),
                    mm = $(menu),
                    menuItems = [],
                    freezeMenus = getFieldFreezeMenus(t, field, mm),
                    shiftMenus = getFieldShiftMenus(t, field, mm),
                    movingMenus = getFieldMovingMenus(t, field, mm);
                if (freezeMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], freezeMenus);
                }
                if (shiftMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], shiftMenus);
                }
                if (movingMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], movingMenus);
                }
                return menuItems;
            }
        }
    ];

    function getFieldFreezeMenus(t, field, mm) {
        var target = t[0];
        return [
            {
                text: "冻结该列",
                disabled: function () {
                    return isFrozenColumn(target, field) ? true : false;
                },
                handler: function () {
                    freezeColumn(target, field);
                }
            },
            {
                text: "取消冻结该列",
                disabled: function () {
                    return isFrozenColumn(t[0], field) ? false : true;
                },
                handler: function () {
                    unfreezeColumn(target, field);
                }
            }
        ];
    }

    function getFieldShiftMenus(t, field, mm) {
        var target = t[0];
        return [
            {
                text: "左移一列", iconCls: "icon-standard-arrow-left",
                disabled: function () {
                    var fields = getColumnFields(target, "all"),
                        index = $.array.indexOf(fields, field);
                    return index > 0 ? false : true;
                },
                handler: function () {
                    shiftColumn(target, { field: field, point: "before" })
                }
            },
            {
                text: "右移一列", iconCls: "icon-standard-arrow-right",
                disabled: function () {
                    var fields = getColumnFields(target, "all"),
                        index = $.array.indexOf(fields, field);
                    return index < fields.length - 1 ? false : true;
                },
                handler: function () {
                    shiftColumn(target, { field: field, point: "after" })
                }
            }
        ];
    }

    function getFieldMovingMenus(t, field, mm) {
        var target = t[0],
            cols = $.array.filter(getColumnOptions(target, "all"), function (col) {
                return col.field ? true : false;
            });
        return $.array.map(cols, function (col) {
            var title = col.title || col.field,
                text = "至 \"" + title + "\" 左侧";
            return {
                text: text,
                disabled: col.field != field && !col.hidden ? false : true,
                handler: function () {
                    moveColumn(target, {
                        target: col.field,
                        source: field,
                        point: "before"
                    });
                }
            };
        });
    }



    $.fn.datagrid.extensions.fieldToggleMenus = [
        {
            text: "显示/隐藏列", iconCls: "icon-standard-application-view-columns",
            disabled: false,
            children: function (e, menuItem, menu, target, field) {
                var t = $(target),
                    mm = $(menu),
                    menuItems = [],
                    topMenus = getFieldTopMenus(t, mm),
                    fieldMenus = getFieldToggleMenus(t, mm);
                if (topMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], topMenus);
                }
                if (fieldMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], fieldMenus);
                }
                return menuItems;
            }
        }
    ];

    function getFieldTopMenus(t, mm) {
        var target = t[0],
            state = $.data(target, "datagrid"),
            cols = $.array.filter(getColumnOptions(target, false), function (col) {
                return col.field ? true : false;
            }),
            originalCols = state.originalColumnOptions;
        return [
            {
                text: "显示全部列", hideOnClick: false,
                iconCls: function () {
                    var len = cols.length,
                        count = $.array.sum(cols, function (col) {
                            return col.hidden ? 0 : 1;
                        });
                    return count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2");
                },
                handler: function () {
                    $.each(cols, function (i, col) { t.datagrid("showColumn", col.field); });
                    $(this).parent().children(".menu-item:not(:eq(1))").each(function () {
                        mm.menu("setIcon", { target: this, iconCls: "tree-checkbox1" })
                            .menu("enableItem", this);
                    });
                }
            },
            {
                text: "还原默认", iconCls: "icon-standard-application-view-tile", hideOnClick: false,
                handler: function () {
                    $.each(originalCols, function (i, col) {
                        t.datagrid(col.hidden ? "hideColumn" : "showColumn", col.field);
                    });
                    var mp = $(this).parent();
                    mp.children("div.menu-item:gt(1)").each(function () {
                        var title = $(this).text(),
                            col = $.array.first(originalCols, function (val) {
                                return val.title == title;
                            });
                        if (col) {
                            mm.menu("setIcon", {
                                target: this,
                                iconCls: col.hidden ? "tree-checkbox0" : "tree-checkbox1"
                            });
                        }
                        mm.menu("enableItem", this);
                    });
                    mp.children("div.menu-item:first").each(function () {
                        var len = cols.length,
                            count = $.array.sum(cols, function (col) {
                                return col.hidden ? 0 : 1;
                            });
                        mm.menu("setIcon", {
                            target: this,
                            iconCls: count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2")
                        });
                    });
                }
            }
        ];
    }

    function getFieldToggleMenus(t, mm) {
        var target = t[0],
            cols = $.array.filter(getColumnOptions(target, false), function (col) {
                return col.field ? true : false;
            });
        return $.array.map(cols, function (col) {
            return {
                text: col.title || col.field,
                iconCls: col.hidden ? "tree-checkbox0" : "tree-checkbox1",
                hideOnClick: false,
                disabled: !col.hidable ? true : false,
                handler: function () {
                    var mi = $(this),
                        mp = mi.parent(),
                        mip = mp.find(".menu-item:gt(1)"),
                        mis = mip.find(".tree-checkbox1"),
                        copts = t.datagrid("getColumnOption", col.field);
                    if (!col.hidable) {
                        return;
                    }

                    t.datagrid(copts.hidden ? "showColumn" : "hideColumn", col.field);
                    mm.menu("setIcon", {
                        target: this,
                        iconCls: copts.hidden ? "tree-checkbox0" : "tree-checkbox1"
                    });

                    var length = cols.length,
                        count = $.array.sum(cols, function (col) {
                            return col.hidden ? 0 : 1;
                        });
                    mm.menu("setIcon", {
                        target: mi.parent().children("div.menu-item:first"),
                        iconCls: count >= length ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2")
                    });

                    var mms = mip.filter(function () {
                        return $(".tree-checkbox1", this).length ? true : false;
                    })
                    mms.each(function () {
                        mm.menu(mms.length > 1 ? "enableItem" : "disableItem", this);
                    });
                }
            };
        });
    }

    $.fn.datagrid.extensions.rowToggleMenus = [
        {
            text: "过滤/显示", iconCls: "icon-standard-application-view-list",
            disabled: function (e, menuItem, menu, target, field) {
                var t = $(target),
                    copts = t.datagrid("getColumnOption", field);
                return copts.filterable && (copts.colspan == null || copts.colspan == undefined || copts.colspan == 1) ? false : true;
            },
            children: function (e, menuItem, menu, target, field) {
                var t = $(target),
                    rows = t.datagrid("getRows"),
                    fieldValues = getDistinctColumnData(target, field),
                    mm = $(menu),
                    menuItems = [],
                    topMenus = getRowTopMenus(t, mm, rows, fieldValues),
                    rowMenus = getRowToggleMenus(t, field, mm, rows, fieldValues, e);
                if (topMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], topMenus);
                }
                if (rowMenus.length) {
                    $.array.merge(menuItems, menuItems.length ? "-" : [], rowMenus);
                }
                return menuItems;
            }
        }
    ];

    function getRowTopMenus(t, mm, rows, fieldValues) {
        var target = t[0],
            state = $.data(target, "datagrid");
        return [
            {
                text: "全部", hideOnClick: false,
                iconCls: function () {
                    return !state.hiddenRows.length ? "tree-checkbox1" : (state.hiddenRows.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2");
                },
                handler: function () {
                    if (state.hiddenRows.length) {
                        showRows(target, true);
                    } else {
                        hideRows(target, true);
                    }
                    $(this).parent().children("div.menu-item[hideOnClick=false]").each(function () {
                        mm.menu("setIcon", {
                            target: this,
                            iconCls: state.hiddenRows.length ? "tree-checkbox0" : "tree-checkbox1"
                        });
                    });
                }
            }
        ];
    }

    function getRowToggleMenus(t, field, mm, rows, fieldValues, e) {
        var target = t[0],
            state = $.data(target, "datagrid"),
            opts = state.options,
            hasMore = fieldValues.length > opts.headerFilterMenuLength,
            array = hasMore ? $.array.left(fieldValues, opts.headerFilterMenuLength) : fieldValues,
            menuItems = $.array.map(array, function (val) {
                var hrows = $.array.filter(rows, function (row) { return row[field] == val; });
                return {
                    text: val, hideOnClick: false,
                    iconCls: function () {
                        var hcells = $.array.filter(state.hiddenRows, function (row) { return row[field] == val; });
                        return !hcells.length
                            ? "tree-checkbox1"
                            : (hcells.length >= hrows.length ? "tree-checkbox0" : "tree-checkbox2");
                    },
                    handler: function () {
                        var hcells = $.array.filter(state.hiddenRows, function (row) { return row[field] == val; });
                        hcells.length ? showRows(target, hrows) : hideRows(target, hrows);
                        mm.menu("setIcon", {
                            target: this,
                            iconCls: hcells.length ? "tree-checkbox1" : "tree-checkbox0"
                        });
                        $(this).parent().children("div.menu-item:first").each(function () {
                            mm.menu("setIcon", {
                                target: this,
                                iconCls: (!state.hiddenRows.length)
                                    ? "tree-checkbox1"
                                    : (state.hiddenRows.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2")
                            });
                        });
                    }
                };
            });
        if (hasMore) {
            $.array.merge(menuItems, menuItems.length ? "-" : [], {
                text: "处理更多(共" + fieldValues.length + "项)...",
                iconCls: "icon-standard-application-view-detail",
                handler: function () {
                    showFilterDialog(target, field, rows, fieldValues);
                }
            });
        }
        return menuItems;
    }



    $.fn.datagrid.extensions.refreshMenus = [
        {
            text: "刷新当前页", iconCls: "pagination-load",
            disabled: function (e, menuItem, menu, target, index, row) {
                var t = $(target),
                    state = $.data(target, "datagrid"),
                    opts = state.options;
                return !opts.refreshMenu ? true : false;
            },
            handler: function (e, menuItem, menu, target, index, row) {
                $(target).datagrid("reload");
            }
        }
    ];
    $.fn.datagrid.extensions.pagingMenus = [
        {
            text: "首页", iconCls: "pagination-first",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledPrevPage(target);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                selectFirstPage(target);
            }
        },
        {
            text: "上一页", iconCls: "pagination-prev",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledPrevPage(target);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                selectPrevPage(target);
            }
        },
        {
            text: "下一页", iconCls: "pagination-next",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledNextPage(target);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                selectNextPage(target);
            }
        },
        {
            text: "末页", iconCls: "pagination-last",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledNextPage(target);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                selectLastPage(target);
            }
        }
    ];
    $.fn.datagrid.extensions.pagingRootMenus = [
        {
            text: "翻页", iconCls: "",
            disabled: function (e, menuItem, menu, target, index, row) {
                var state = $.data(target, "datagrid"),
                    opts = state.options;
                return opts.pagingMenu == true || !opts.pagingMenu.disabled ? false : true;
            },
            children: $.fn.datagrid.extensions.pagingMenus
        }
    ];
    $.fn.datagrid.extensions.movingMenus = [
        {
            text: "移至最上", iconCls: "icon-standard-arrow-up",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledMoveTop(target, index);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                moveRowToTop(target, index);
            }
        },
        {
            text: "上移", iconCls: "icon-standard-up",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledMoveUp(target, index);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                moveRowUp(target, index);
            }
        },
        {
            text: "下移", iconCls: "icon-standard-down",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledMoveDown(target, index);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                moveRowDown(target, index);
            }
        },
        {
            text: "移至最下", iconCls: "icon-standard-arrow-down",
            disabled: function (e, menuItem, menu, target, index, row) {
                return disabledMoveBottom(target, index);
            },
            handler: function (e, menuItem, menu, target, index, row) {
                moveRowToBottom(target, index);
            }
        }
    ];
    $.fn.datagrid.extensions.movingRootMenus = [
        {
            text: "上/下移动", iconCls: "",
            disabled: function (e, menuItem, menu, target, index, row) {
                var state = $.data(target, "datagrid"),
                    opts = state.options;
                return !opts.movingMenu || (!opts.movingMenu.top && !opts.movingMenu.up && !opts.movingMenu.down && !opts.movingMenu.bottom) ? true : false;
            },
            children: $.fn.datagrid.extensions.movingMenus
        }
    ];



    $(document).undelegate(".datagrid-editing").delegate("div.datagrid div.datagrid-editable :text:visible", "keydown.datagrid-editing", function (e) {
        switch (e.which) {
            case 13:
                autoNextRowEdit();
                break;
            case 27:
                autoCancelEdit();
                break;
            //case 38:
            //    autoPrevRowEdit();
            //    break;
            //case 40:
            //    autoNextRowEdit();
            //    break;
            default:
                break;
        }
        function autoPrevRowEdit() {
        }
        function autoNextRowEdit() {
            var input = $(e.target),
                t = input.currentDatagrid(),
                target = t[0],
                opts = $.data(target, "datagrid").options,
                isTg = $.data(target, "treegrid") ? true : false;
            if (!opts.autoWrapEdit || isTg) {
                return;
            }
            var tr = input.closest("tr[datagrid-row-index]"),
                index = getTrIndex(tr),
                rows = t.datagrid("getRows");
            if (index == -1 || !rows || !rows.length) {
                return;
            }
            endEdit(target, index);
            if (index < rows.length - 1) {
                beginEdit(target, index + 1);
            }
        }
        function autoCancelEdit() {
            var input = $(e.target),
                t = input.currentDatagrid(),
                target = t[0],
                opts = $.data(target, "datagrid").options,
                isTg = $.data(target, "treegrid") ? true : false;
            if (!opts.cancelEditOnEsc || isTg) {
                return;
            }
            var tr = input.closest("tr[datagrid-row-index]"),
                index = getTrIndex(tr);
            if (index == -1) {
                return;
            }
            cancelEdit(target, index);
        }
    });



    var _datagrid = $.fn.datagrid.extensions._datagrid = $.fn.datagrid;
    $.fn.datagrid = function (options, param) {
        if (typeof options == "string") {
            return _datagrid.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this),
                isInited = $.data(this, "tabs") ? true : false,
                opts = isInited ? options : $.extend({},
                        $.fn.tabs.parseOptions(this),
                        $.parser.parseOptions(this, [
                            "autoEditingEvent", "finishEditMethod",
                            {
                                dblClickRowMenuIndex: "number", headerFilterMenuLength: "number",
                                tooltipDelay: "number"
                            },
                            {
                                rowDnd: "boolean", headerDnd: "boolean",
                                autoBindDblClickRow: "boolean", selectOnRowContextMenu: "boolean",
                                enableHeaderContextMenu: "boolean", enableHeaderClickMenu: "boolean",
                                enableRowContextMenu: "boolean",
                                refreshMenu: "boolean",
                                rowTooltip: "boolean",
                                extEditing: "boolean",
                                autoEditing: "boolean",
                                finishEditOnBlur: "boolean",
                                singleEditing: "boolean",
                                autoFocusField: "boolean",
                                autoWrapEdit: "boolean",
                                cancelEditOnEsc: "boolean",
                                autoHighlightColumn: "boolean"
                            }
                        ]), options);
            _datagrid.call(jq, opts, param);
            if (!isInited) {
                initializeExtensions(this);
            }
        });
    };
    $.union($.fn.datagrid, _datagrid);



    var columnOptions = $.fn.datagrid.extensions.columnOptions = {

        tooltip: false,

        movable: true,

        hidable: true,

        filterable: true,

        filter: "checkbox",

        precision: 1,

        step: 1
    };

    var methods = $.fn.datagrid.extensions.methods = {

        appendRow: function (jq, row) { return jq.each(function () { appendRow(this, row); }); },

        insertRow: function (jq, param) { return jq.each(function () { insertRow(this, param); }); },

        updateRow: function (jq, param) { return jq.each(function () { updateRow(this, param); }); },

        refreshRow: function (jq, index) { return jq.each(function () { refreshRow(this, index); }); },

        deleteRow: function (jq, index) { return jq.each(function () { deleteRow(this, index); }); },


        beginEdit: function (jq, index) { return jq.each(function () { beginEdit(this, index); }); },

        endEdit: function (jq, index) { return jq.each(function () { endEdit(this, index); }); },

        cancelEdit: function (jq, index) { return jq.each(function () { cancelEdit(this, index); }); },


        prevRow: function (jq, index) { return getPrevRow(jq[0], index); },

        nextRow: function (jq, index) { return getNextRow(jq[0], index); },

        popRow: function (jq, index) { return jq.each(function () { popRow(this, index); }); },

        moveRow: function (jq, param) { return jq.each(function () { moveRow(this, param); }); },

        shiftRow: function (jq, param) { return jq.each(function () { shiftRow(this, param); }); },

        moveRowUp: function (jq, index) { return jq.each(function () { moveRowUp(this, index); }); },

        moveRowDown: function (jq, index) { return jq.each(function () { moveRowDown(this, index); }); },


        prevColumn: function (jq, field) { return getPrevColumn(jq[0], field); },

        nextColumn: function (jq, field) { return getNextColumn(jq[0], field); },

        deleteColumn: function (jq, field) { return jq.each(function () { deleteColumn(this, field); }); },

        popColumn: function (jq, field) { return popColumn(jq[0], field); },

        moveColumn: function (jq, param) { return jq.each(function () { moveColumn(this, param); }); },

        shiftColumn: function (jq, param) { return jq.each(function () { shiftColumn(this, param); }); },


        freezeColumn: function (jq, field) { return jq.each(function () { freezeColumn(this, field); }); },

        unfreezeColumn: function (jq, field) { return jq.each(function () { unfreezeColumn(this, field); }); },



        setColumnTitle: function (jq, param) { return jq.each(function () { setColumnTitle(this, param); }); },

        resizeColumn: function (jq, param) { return jq.each(function () { resizeColumn(this, param); }); },

        highlightColumn: function (jq, field) { return jq.each(function () { highlightColumn(this, field); }); },

        unhighlightColumn: function (jq, field) { return jq.each(function () { unhighlightColumn(this, field); }); },


        highlightSearch: function (jq, param) { return jq.each(function () { highlightSearch(this, param); }); },

        showFilterDialog: function (jq, field) { return jq.each(function () { showFilterDialog(this, field); }); }

    };

    var defaults = $.fn.datagrid.extensions.defaults = {

        autoBindDblClickRow: true,

        dblClickRowMenuIndex: 0,

        selectOnRowContextMenu: false,

        rowDnd: false,

        headerDnd: false,

        enableHeaderContextMenu: true,

        enableHeaderClickMenu: true,

        headerContextMenu: null,

        enableRowContextMenu: true,

        rowContextMenu: null,

        movingMenu: false,

        pagingMenu: { submenu: false },

        refreshMenu: true,

        rowTooltip: false,

        tooltipDelay: 300,

        extEditing: true,

        autoEditing: false,

        autoEditingEvent: "dblclick",

        finishEditOnBlur: false,

        finishEditLocale: window.document,

        finishEditMethod: "endEdit",

        singleEditing: true,

        autoFocusField: true,

        autoWrapEdit: true,

        cancelEditOnEsc: true,


        showFilterText: undefined,

        headerFilterMenuLength: 10,


        autoHighlightColumn: false,

        offset: null,



        onBeforeDeleteColumn: function (target, field) { },

        onDeleteColumn: function (target, field) { },

        onBeforeMoveColumn: function (target, source, point) { },

        onMoveColumn: function (target, source, point) { },


        onBeforeMoveRow: function (target, source, point) { },

        onMoveRow: function (target, source, point) { },


        onHeaderBeforeDrag: function (field) { },

        onHeaderStartDrag: function (field) { },

        onHeaderStopDrag: function (field) { },

        onHeaderDragEnter: function (targetField, sourceField) { },

        onHeaderDragOver: function (targetField, sourceField) { },

        onHeaderDragLeave: function (targetField, sourceField) { },

        onHeaderBeforeDrop: function (targetField, sourceField, point) { },

        onHeaderDrop: function (targetField, sourceField, point) { },


        onRowBeforeDrag: function (index, row) { },

        onRowStartDrag: function (index, row) { },

        onRowStopDrag: function (index, row) { },

        onRowDragEnter: function (targetRow, sourceRow) { },

        onRowDragOver: function (targetRow, sourceRow) { },

        onRowDragLeave: function (targetRow, sourceRow) { },

        onRowBeforeDrop: function (targetRow, sourceRow, point) { },

        onRowDrop: function (targetRow, sourceRow, point) { }

    };

    $.extend($.fn.datagrid.methods, methods);
    $.extend($.fn.datagrid.defaults, defaults);

})(jQuery);