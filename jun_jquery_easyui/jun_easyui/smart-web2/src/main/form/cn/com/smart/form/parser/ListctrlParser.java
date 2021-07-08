package cn.com.smart.form.parser;

import com.mixsmart.constant.IMixConstant;
import com.mixsmart.enums.YesNoType;
import com.mixsmart.utils.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;

/**
 * 解析控件列表
 * @author lmq
 * @version 1.0 
 * @since 1.0
 */
@Component
public class ListctrlParser implements IFormParser {

	
	@Override
	public String getPlugin() {
		return "listctrl";
	}

	@Override
	public String parse(Map<String, Object> dataMap) {
		if(null == dataMap || dataMap.size()<1) {
			return null;
		}
		
		String title = StringUtils.handleNull(dataMap.get("orgtitle"));
		String colType = StringUtils.handleNull(dataMap.get("orgcoltype"));

		String fillUrl = StringUtils.handleNull(dataMap.get("fill_url"));
		String fillRelateField = StringUtils.handleNull(dataMap.get("fill_relate_field"));
		
		String unit = StringUtils.handleNull(dataMap.get("orgunit"));
		String sum = StringUtils.handleNull(dataMap.get("orgsum"));
		//String sumBindTable = StringUtils.handleNull(dataMap.get("csum_bind_table"));
		String sumBindTableField = StringUtils.handleNull(dataMap.get("csum_bind_table_field"));
		
		String pluginType = StringUtils.handleNull(dataMap.get("plugintype"));
		String pluginUri = StringUtils.handleNull(dataMap.get("pluginuri"));
		String fieldRequire = StringUtils.handleNull(dataMap.get("fieldrequire"));
		String fieldHide = StringUtils.handleNull(dataMap.get("fieldhide"));
		
		String colValue = StringUtils.handleNull(dataMap.get("orgcolvalue"));
		String fieldName = StringUtils.handleNull(dataMap.get("bind_table_field"));
		String name = StringUtils.handleNull(dataMap.get("bind_table"));
		String tableWidth = StringUtils.handleNull(dataMap.get("tablewidth"));
		String remarks = StringUtils.handleNull(dataMap.get("remarks"));

		String validateExpr = StringUtils.handleNull(dataMap.get("validate_expr"));
		String validateExprMsg = StringUtils.handleNull(dataMap.get("validate_expr_msg"));

		String sumRowName = StringUtils.handleNull(dataMap.get("sum_row_name"));
		String bindSumRowField = StringUtils.handleNull(dataMap.get("bind_sum_row_field"));
		String sumRelateField = StringUtils.handleNull(dataMap.get("sum_relate_field"));
		String sumRowExpr = StringUtils.handleNull(dataMap.get("sum_row_expr"));

		String rowSumBindTable = StringUtils.handleNull(dataMap.get("row_sum_bind_table"));
		String rowSumBindTableField = StringUtils.handleNull(dataMap.get("row_sum_bind_table_field"));

		if(StringUtils.isEmpty(tableWidth)) {
			tableWidth = "100%";
		}
		
		String[] titles = title.split("`");
		String[] colTypes = colType.split("`");
		String[] pluginTypes = pluginType.split("`");
		String[] pluginUris = pluginUri.split("`");
		String[] colValues = colValue.split("`");
		String[] fieldNames = fieldName.split("`");
		String[] fieldRequires = fieldRequire.split("`");
		String[] fieldHides = fieldHide.split("`");
		String[] remarksArray = remarks.split("`");
		
		String[] units = unit.split("`");
		String[] sums = sum.split("`");
		//String[] sumBindTables = sumBindTable.split("`");
		String[] sumBindTableFields = sumBindTableField.split("`");
		String[] validateExprArray = validateExpr.split("`");
		String[] validateExprMsgArray = validateExprMsg.split("`");

        pluginTypes = handleProp(pluginTypes, titles);
        pluginUris = handleProp(pluginUris, titles);
        colValues = handleProp(colValues, titles);
        fieldRequires = handleProp(fieldRequires, titles);
        fieldHides = handleProp(fieldHides, titles);
        remarksArray = handleProp(remarksArray, titles);

        units = handleProp(units, titles);

        validateExprArray = handleProp(validateExprArray, titles);
        validateExprMsgArray = handleProp(validateExprMsgArray, titles);

		StringBuilder strBuild = new StringBuilder();
		strBuild.append("<script type=\"text/javascript\">\r\n var addRows=1;\r\n function tbAddRow(dname, isInputEvent) {addRows++;\r\n");
		strBuild.append("   var sTbid = dname+\"_table\";\r\n if(typeof(isInputEvent) == 'undefined') isInputEvent = true;\r\n");
		strBuild.append("  var $addTr = $(\"#\"+sTbid+\" .template\") \r\n ");
		strBuild.append("   //连同事件一起复制   \r\n ");
		strBuild.append("   .clone();\r\n");  
		strBuild.append("   //去除模板标记 \r\n   "); 
		strBuild.append("   $addTr.removeClass(\"template\");$addTr.attr(\"id\",\"row\"+addRows);\r\n var $sum = $addTr.find('.sum');if($sum.length>0){$sum.removeClass('sum')} ");
		strBuild.append("   //修改内部元素 \r\n ");
		strBuild.append("   $addTr.find(\".delrow\").removeClass(\"hide\");\r\n");
		//strBuild.append("$addTr.find(\"input[type=hidden]\").remove();");
		strBuild.append("   $addTr.find(\"input,textarea\").each(function(){\r\n");
		strBuild.append(" var id = $(this).attr(\"id\");if(utils.isNotEmpty(id)) { \r\n");
        strBuild.append(" id = id.replace('row-','row'+addRows+'-');var $this = $(this);$this.attr(\"id\",id);$this.val($this.attr('default-value'));\r\n");
        strBuild.append(" $(this).attr(\"name\", $(this).attr(\"original-name\")); \r\n");
		strBuild.append(" $(this).removeClass(function(index, oldClass){var classArray = oldClass.split(' ');var removeClassName = '';");
		strBuild.append("for(var i=0;i<classArray.length;i++) { if(classArray[i].indexOf('-listener')>=0) { removeClassName +=classArray[i]+' '}} return removeClassName});");
		//strBuild.append(" $(this).removeClass('cnoj-auto-complete-relate-listener cnoj-input-tree-listener cnoj-input-select-relate-listener cnoj-input-org-tree-listener");
        //strBuild.append(" cnoj-auto-complete-listener cnoj-input-select-listener cnoj-datetime-listener cnoj-date-listener cnoj-time-listener');");
        strBuild.append(" $(this).parent().find('.glyphicon-calendar').remove();");
        strBuild.append(" \r\n}});\r\n");
        strBuild.append("   //插入表格  \r\n  ");
        strBuild.append("   $addTr.appendTo($(\"#\"+sTbid+' .listctrl-tbody'));if(isInputEvent){inputPluginEvent();countRowListener()};");
        strBuild.append("  if(typeof(formAddRow) !== 'undefined' && !utils.isEmpty(formAddRow) && typeof(formAddRow)==='function'){formAddRow(addRows);}}\r\n ");
        
        strBuild.append("//统计\r\n ");
        strBuild.append("function sumTotal(dname,e) {\r\n ");
		strBuild.append(" var tsum = 0; \r\n");
		strBuild.append(" $('input[name=\"\'+dname+\'\"]').each(function(){\r\n");
		strBuild.append("          var t = parseFloat($(this).val());\r\n");
		strBuild.append("          if(!t) t=0;\r\n"); 
		strBuild.append("          if(t) tsum +=t;\r\n");
		strBuild.append("          $(this).val(t);\r\n");
		strBuild.append("      });\r\n");
        strBuild.append("  $('#\'+dname+\'_total').val(tsum);$('#\'+dname+\'_total').trigger('change'); \r\n}\r\n");
        
        strBuild.append(" /*删除tr*/\r\n");
        strBuild.append("function fnDeleteRow(obj,dname) { \r\n");
        strBuild.append("  var sTbid = dname+\"_table\";\r\n");
        strBuild.append("  var oTable = document.getElementById(sTbid);\r\n");
        strBuild.append("  while(obj.tagName !=\"TR\") {\r\n");
        strBuild.append("     obj = obj.parentNode;\r\n}\r\n");
        strBuild.append("     var id = $(obj).find('.id-value').val();\r\n");
        strBuild.append(" if(utils.isNotEmpty(id)){ var delValue = $(oTable).find('.del-value').val();\r\n");
        strBuild.append(" if(utils.isNotEmpty(delValue)){delValue = delValue+','+id;} else {delValue=id;}\r\n");
        strBuild.append(" $(oTable).find('.del-value').val(delValue);} \r\n");
        strBuild.append("  oTable.deleteRow(obj.rowIndex);\r\n");
        strBuild.append("//删除后重新计算合计\r\n $('.sum').each(function(){var dname = $(this).attr('name');sumTotal(dname, this)});\r\n }");
        
        strBuild.append(" /*监听修改情况tr*/\r\n");
        strBuild.append(" function changeValue(obj){");
        strBuild.append(" var $table = $(obj).parents(\"table:eq(0)\"); var id =$(obj).parents(\"tr:eq(0)\").find(\".id-value\").val(); ");
        strBuild.append(" if(utils.isNotEmpty(id)){ var changeValue = $table.find('.change-value').val(); var isset=false \r\n");
        strBuild.append(" if(utils.isNotEmpty(changeValue)){if(changeValue.indexOf(id) == -1){changeValue = changeValue+','+id;isset=true}} else {changeValue=id;isset=true}\r\n");
        strBuild.append(" if(isset){$table.find('.change-value').val(changeValue); }}\r\n");
        strBuild.append(" };\r\n");
        strBuild.append("</script>");
        
        StringBuilder thBuild = new StringBuilder(),tbBuild = new StringBuilder(),tfTdBuild = new StringBuilder();
        int isNum = 0,tdNum = 0;
        String require = "";
        String tdEndTag = "</td>";
        thBuild.append("<th class=\"hidden\">");
        thBuild.append("<input type=\"hidden\" class=\"del-value\" name=\""+name+"_del\" />");
        thBuild.append("<input type=\"hidden\" class=\"change-value\" name=\""+name+"_change\" />");
        thBuild.append("</th>");
        tbBuild.append("<td class=\"hidden\">");
        tbBuild.append("<input type=\"hidden\" class=\"id-value\" id=\"row-"+name+"-0\" name=\""+name+"_id\" />");
        tbBuild.append("</td>");
        //String[] sumFlag = sums;
        for (int i=0;i<titles.length;i++) {
        	tdNum++;
        	if(!YesNoType.YES.getStrValue().equals(fieldHides[i])) {
        		thBuild.append("<th>"+titles[i]);
        		if(StringUtils.isNotEmpty(remarksArray[i])) {
        			thBuild.append("<p class=\"help-block\" style=\"margin:0;padding:0\">"+StringUtils.handleNull(remarksArray[i])+"</p>");
        		}
        		thBuild.append("</th>");
        	}
			if(YesNoType.YES.getStrValue().equals(fieldRequires[i])) {
				require = " require";
			} else {
				require = "";
			}
			pluginTypes[i] = pluginTypes[i]+require;
        	//判断是否需要验证
			String validateProp = "";
			if(StringUtils.isNotEmpty(validateExprArray[i])) {
				pluginTypes[i] += " cnoj-value-validate";
				validateProp = " data-validate-expr=\""+validateExprArray[i]+"\" data-validate-expr-msg=\""+StringUtils.handleNull(validateExprMsgArray[i])+"\"";
			}

			if("text".equals(colTypes[i])) {
			    //判断字段是否设置为隐藏
				if(!YesNoType.YES.getStrValue().equals(fieldHides[i])) {
					if("cnoj-datetime".equals(pluginTypes[i]) || "cnoj-date".equals(pluginTypes[i]) || "cnoj-time".equals(pluginTypes[i])) {
						tbBuild.append("<td><input id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-input input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" type=\"text\" data-label-name=\""+titles[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" default-value=\""+colValues[i]+"\" value=\""+colValues[i]+"\"></td>");
					} else {
						tbBuild.append("<td><input id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-input input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" "+validateProp+" type=\"text\" data-label-name=\""+titles[i]+"\" data-uri=\""+pluginUris[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" default-value=\""+colValues[i]+"\"  value=\""+colValues[i]+"\"></td>");
					}
				} else {
					if(tbBuild.toString().endsWith(tdEndTag)) {
						tbBuild.delete(tbBuild.length() - tdEndTag.length(), tbBuild.length());
						tbBuild.append("<input id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-input hidden input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" "+validateProp+" type=\"text\" data-label-name=\""+titles[i]+"\" data-uri=\""+pluginUris[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" default-value=\""+colValues[i]+"\" value=\""+colValues[i]+"\"></td>");
					}
				}
			} else if("textarea".equals(colTypes[i])) {
				if(!YesNoType.YES.getStrValue().equals(fieldHides[i])) {
					tbBuild.append("<td><textarea id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-textarea input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" type=\"text\" data-label-name=\""+titles[i]+"\" data-uri=\""+pluginUris[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" >"+colValues[i]+"</textarea></td>");
				} else {
					if(tbBuild.toString().endsWith(tdEndTag)) {
						tbBuild.delete(tbBuild.length() - tdEndTag.length(), tbBuild.length());
						tbBuild.append("<textarea id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-textarea hidden input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" type=\"text\" data-label-name=\""+titles[i]+"\" data-uri=\""+pluginUris[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" >"+colValues[i]+"</textarea></td>");
					}
				}
			} else if("int".equals(colTypes[i]) && "1".equals(sums[i])) {
			    tbBuild.append("<td><input id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-input sum input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" "+validateProp+" type=\"text\" data-label-name=\""+titles[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" onblur=\"sumTotal('"+fieldNames[i]+"', this)\" default-value=\""+colValues[i]+"\" value=\""+colValues[i]+"\"> "+getUnit(units, i)+"</td>");
			} else {
				tbBuild.append("<td><input id=\"row-"+fieldNames[i]+"-"+(i+1)+"\" onchange=\"changeValue(this)\" class=\"form-control listctrl-input input-medium "+fieldNames[i]+" "+pluginTypes[i]+"\" "+validateProp+" type=\"text\" data-label-name=\""+titles[i]+"\" name=\""+fieldNames[i]+"\" original-name=\""+fieldNames[i]+"\" default-value=\""+colValues[i]+"\" value=\""+colValues[i]+"\"> "+getUnit(units, i)+"</td>");
			}
			//tfTdBuild.append("<td></td>");
		}
		//如果有行统计
		if(StringUtils.isNotEmpty(sumRowName)) {
			thBuild.append("<th>"+sumRowName+"</th>");
			String expr = sumRowExpr;
			String[] relateFeilds = sumRelateField.split(IMixConstant.MULTI_VALUE_SPLIT);
			for(int i=0; i<relateFeilds.length; i++) {
				expr = expr.replace("${"+(i+1)+"}", "${"+relateFeilds[i]+"}");
			}
			String classTmp = "";
			String eventProp = "";
			if(StringUtils.isNotEmpty(rowSumBindTableField)) {
				classTmp = "sum";
				eventProp = "onchange=\"sumTotal('"+bindSumRowField+"', this)\"";
			}
			tbBuild.append("<td><input id=\"row-" + bindSumRowField + "-" + (titles.length + 1) + "\" class=\"form-control listctrl-input cnoj-row-count input-medium " +classTmp +" "+ bindSumRowField + "\" type=\"text\" relate-field=\"" + sumRelateField + "\" count-expr=\"" + expr + "\" name=\"" + bindSumRowField + "\" original-name=\"" + bindSumRowField + "\" default-value=\"0\" value=\"0\" "+eventProp+" /></td>");
		}
        if(sums.length > 0) {
            //int len = sums.length;
            for (int i=0;i<titles.length;i++) {
				if(YesNoType.YES.getStrValue().equals(fieldHides[i])) {
					continue;
				}
                if(StringUtils.isNotEmpty(sums[i])) {
                    if(Integer.parseInt(sums[i]) == 1) {
                        isNum = 1;
                        tfTdBuild.append("<td>合计：<input id=\""+fieldNames[i]+"_total\" onchange=\"changeValue(this)\" type=\"text\" style=\"width:80%;\" class=\"form-control sums input-medium "+sumBindTableFields[i]+" \" name=\""+sumBindTableFields[i]+"\" original-name=\""+sumBindTableFields[i]+"\" onblur=\"sumTotal('"+fieldNames[i]+"', this)\" /> "+getUnit(units, i)+"</td>");
                    } else {
                        tfTdBuild.append("<td></td>");
                    }
                }
            }
        }
        //判断行统计是否合计
        if(StringUtils.isNotEmpty(sumRowName) && StringUtils.isNotEmpty(rowSumBindTableField)) {
        	if(sums.length == 0) {
				for (int i=0; i < titles.length; i++) {
					tfTdBuild.append("<td></td>");
				}
			}
        	tfTdBuild.append("<td>合计：<input id=\""+bindSumRowField+"_total\" onchange=\"changeValue(this)\" type=\"text\" style=\"width:80%;\" class=\"form-control row-sums input-medium "+rowSumBindTableField+" \" name=\""+rowSumBindTableField+"\" original-name=\""+rowSumBindTableField+"\" onblur=\"sumTotal('"+bindSumRowField+"', this)\" /></td>");
		}
        String fillListctrlTag = "";
        String fillRelateFieldAttr = StringUtils.isEmpty(fillRelateField) ? "" : ("data-fill-relate-field='" + fillRelateField+"'");
        String fillUrlAttr = "";
        if(StringUtils.isNotEmpty(fillUrl)) {
            fillListctrlTag = "cnoj-auto-fill-listctrl";
            fillUrlAttr = "data-fill-url='"+fillUrl+"'";
        }
        strBuild.append("<table name=\""+ name +"\" id=\""+ name +"_table\" cellspacing=\"0\" "+fillUrlAttr+" "+ fillRelateFieldAttr +" class=\""+ fillListctrlTag +" list-ctrl table table-bordered table-condensed\" style=\"width:"+tableWidth+"\">");
        strBuild.append("<thead><tr style=\"background-color: #f5f5f5;\"><th colspan=\""+(tdNum+1)+"\"><div class=\"col-sm-6 p-l-5 listctrl-title\">"+dataMap.get("title")+"</div> <div class=\"col-sm-6 p-r-5 text-right\">");
        strBuild.append("<button class=\"btn btn-sm btn-success listctrl-add-row hidden-print \" type=\"button\" onclick=\"tbAddRow('"+name+"')\">添加一行</button>");
        strBuild.append("</div></th></tr><tr><tr>"+thBuild.toString()+"<th><span class=\"hidden-print\">操作</span></th></tr></thead><tbody class=\"listctrl-tbody\">");
		
        strBuild.append("<tr class=\"template\" id='row-1'>"+tbBuild.toString()+"<td><a href=\"javascript:void(0);\" onclick=\"fnDeleteRow(this,'"+name+"')\" class=\"delrow hide hidden-print\">删除</a></td></tr></tbody>");
        
        if(tfTdBuild.length() > 0) {
        	strBuild.append("<tfooter><tr id='row-tfooter-1'>"+tfTdBuild.toString()+"<td></td></tr></tfooter>");
        }
        strBuild.append("</table>");
		return strBuild.toString();
	}

	/**
	 * 获取单位
	 * @param units
	 * @param index
	 * @return
	 */
	private String getUnit(String[] units, int index) {
	    String unit = "";
	    if(units.length <= (index+1)) {
            unit = units[index];
        }
	    return unit;
	}

	/**
	 * 处理属性
	 * @param array
	 * @param titles
	 * @return
	 */
	private String[] handleProp(String[] array, String[] titles) {
		if(null == array || array.length < titles.length) {
			String[] tmps = array;
			array = Arrays.copyOf(tmps, titles.length);
			for (int i = tmps.length; i < titles.length; i++) {
				array[i] = "";
			}
		}
		return array;
	}
}
