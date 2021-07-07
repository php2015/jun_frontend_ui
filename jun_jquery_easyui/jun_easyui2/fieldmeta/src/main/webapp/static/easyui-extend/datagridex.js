// datagrid 扩展，增加字典数据支持，如果数据字典需要ajax，则不用该方法
$.extend($.fn.datagrid.defaults.view,{
	onAfterRender:function(target){
		target.isRendered=true;
	},
	renderRow : function(target, fields, frozen, rowIndex, rowData) {
		var opts = $.data(target, "datagrid").options;
		var cc = [];
		if (frozen && opts.rownumbers) {
			var rowNum = rowIndex + 1;
			if (opts.pagination) {
				rowNum += (opts.pageNumber - 1) * opts.pageSize;
			}
			cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"
							+ rowNum + "</div></td>");
		}
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			var col = $(target).datagrid("getColumnOption", field);
			if (col) {
				var fieldValue = rowData[field];
				var fieldStyleElem = col.styler ? (col.styler(fieldValue, rowData,
						rowIndex) || "") : "";
				var fieldStyle = col.hidden ? "style=\"display:none;"
						+ fieldStyleElem + "\"" : (fieldStyleElem ? "style=\""
						+ fieldStyleElem + "\"" : "");
				cc.push("<td field=\"" + field + "\" " + fieldStyle
						+ ">");
				if (col.checkbox) {
					fieldStyle = "";
				} else {
					fieldStyle = fieldStyleElem;
					if (col.align) {
						fieldStyle += ";text-align:" + col.align
								+ ";";
					}
					if (!opts.nowrap) {
						fieldStyle += ";white-space:normal;height:auto;";
					} else {
						if (opts.autoRowHeight) {
							fieldStyle += ";height:auto;";
						}
					}
				}
				cc.push("<div style=\"" + fieldStyle + "\" ");
				if (col.checkbox) {
					cc.push("class=\"datagrid-cell-check ");
				} else {
					cc.push("class=\"datagrid-cell "
							+ col.cellClass);
				}
				cc.push("\">");
				if (col.checkbox) {
					cc.push("<input type=\"checkbox\" name=\""
							+ field + "\" value=\""
							+ (fieldValue != undefined ? fieldValue : "")
							+ "\"/>");
				} else {
					//TODO: 这里是实现字典转换的关键
					var value = fieldValue;
					if (col.formatter) {
						value = col.formatter(fieldValue, rowData,rowIndex);
					}
					if (col.codeClass){
						//console.log(this["onAfterRender"]);表明this指向继承之后对象
						var dg = this;
						var rd=target.isRendered;//避免重复刷新
						value = $.dictManager.getCodeValue(col.codeClass, value, function(){
							//console.log("rd:"+rd+"\ttarget.isRendered:"+target.isRendered);闭包
							if(!rd)
								dg.refreshRow(target,rowIndex);
						});
					}
					cc.push(value);
				}
				cc.push("</div>");
				cc.push("</td>");
			}
		}
		return cc.join("");
	}
});


