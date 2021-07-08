/**
 * jquery-easyui 公用扩展库
 */
(function(window, document, $, undefined) {
    
    /* 覆盖扩展属性以将所有 jeasui 表单输入控件的默认宽度调整为 150 */
    $.extend($.fn.textbox.defaults, { width: 150 });
    $.extend($.fn.passwordbox.defaults, { width: 150 });
    $.extend($.fn.combo.defaults, { width: 150 });
    $.extend($.fn.combobox.defaults, { width: 150, panelHeight: "auto" });
    $.extend($.fn.combotree.defaults, { width: 150 });
    $.extend($.fn.combogrid.defaults, { width: 150 });
    $.extend($.fn.combotreegrid.defaults, { width: 150 });
    $.extend($.fn.numberbox.defaults, { width: 150 });
    $.extend($.fn.datebox.defaults, { width: 150 });
    $.extend($.fn.datetimebox.defaults, { width: 150 });
    $.extend($.fn.datetimespinner.defaults, { width: 150 });
    $.extend($.fn.calendar.defaults, { width: 150 });
    $.extend($.fn.spinner.defaults, { width: 150 });
    $.extend($.fn.numberspinner.defaults, { width: 150 });
    $.extend($.fn.timespinner.defaults, { width: 150 });
    $.extend($.fn.searchbox.defaults, { width: 150 });

    
    if ($.fn.datebox) {
        $.fn.datebox.defaults.formatter = function(date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
        };
        $.fn.datebox.defaults.parser = function(s) {
            if (!s)
                return new Date();
            var ss = s.split('-');
            var y = parseInt(ss[0], 10);
            var m = parseInt(ss[1], 10);
            var d = parseInt(ss[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                return new Date(y, m - 1, d);
            } else {
                return new Date();
            }
        };
    }
    if ($.fn.datetimebox && $.fn.datebox) {
        $.extend($.fn.datetimebox.defaults, {
            currentText : $.fn.datebox.defaults.currentText,
            closeText : $.fn.datebox.defaults.closeText,
            okText : $.fn.datebox.defaults.okText
        });
    }
    if ($.fn.datetimespinner) {
        $.fn.datetimespinner.defaults.selections = [ [ 0, 4 ], [ 5, 7 ], [ 8, 10 ], [ 11, 13 ], [ 14, 16 ], [ 17, 19 ] ]
    }
    
    
    /**
     * 页面加载完成初始化后加载
     */
    $(function() {
    	/**
         * 给表格单元格加上默认的 easyui-tooltip 效果.
         */
        $(document.body).on("mouseenter", ".datagrid-view .datagrid-body .datagrid-row td[field] .datagrid-cell", function() {
            var cell = $(this),
                td = cell.closest("td[field]"),
                field = td.attr("field"),
                tr = td.closest(".datagrid-row"),
                index = tr.attr("datagrid-row-index");
            if (index == null || index == undefined) {
            	return;
            }
            var view = tr.closest(".datagrid-view"),
                t = view.children(".datagrid-f");
            if (!view.length || !t.length) {
            	return;
            }
            var colopts = t.datagrid("getColumnOption", field);
            if (!colopts) {
            	return;
            }
            var formatter = colopts.formatter,
                rows = t.datagrid("getRows");
            if (!rows || !rows.length) {
            	return;
            }
            var row = rows[index],
                value = row[field];
            if (!row || !value) {
            	return;
            }
            var content = $.isFunction(formatter) ? formatter.call(t[0], value, row, index) : value;
            if (content == null || content == undefined) {
            	return;
            }
            cell.tooltip({
                position: "bottom",
                content: content,
                onHide: function (e) {
                    $(this).tooltip("destroy");
                }
            }).tooltip("show");
        });
	});
    
})(window, document, jQuery);