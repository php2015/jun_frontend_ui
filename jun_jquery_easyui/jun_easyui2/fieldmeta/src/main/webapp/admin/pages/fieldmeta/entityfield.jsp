<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<title>实体字段</title>
   		<c:import url="/admin/pages/common/headsource.jsp"/>	
   		<script type="text/javascript" src="${roow}/static/easyui-extend/jquery.edatagrid.js"></script>	
   		<link rel="stylesheet" type="text/css" href="${root}/static/easyui-extend/IconsExtension/icon.css">
   		
  	</head>
<body>
	<table id="datagrid-table" class="easyui-datagrid" title="表单字段类型"
		data-options="
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true, 
			url				: adminActionPath + '/entityfield/findlist',
			toolbar			: '#toolbar',
			fit				: true,
			showFooter		: true,
			idField			: 'id',
			loadFilter		: function(json){return json.data;}">
		<thead>			
			<tr>
				<th data-options="field:'ck',checkbox:true"></th>
								
				<th data-options="field:'columnName',width:80,align:'left',formatter:complexCol" 
					editor="{type:'textbox',options:{validType:'word',required:true}}">列名</th>

				<th data-options="field:'columnType',width:50,align:'left',formatter:complexCol"
					editor="{type:'combobox',options:{valueField:'sqlType',textField:'sqlType',editable:false,panelHeight:'auto',
							dataFn:getSqlTypeJson,onSelect:sqlTypeOnSelect}}">物理类型</th>
				<th data-options="field:'attrType',width:50,align:'left',formatter:complexCol,"
					editor="{type:'combobox',options:{valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							codeClass:'java_type'}}">javaType</th>
							
				<th data-options="field:'attrName',width:80,align:'left',formatter:complexCol" 
					editor="{type:'textbox',options:{validType:'word'}}">java字段</th>
					
				<th data-options="field:'length',width:50,align:'left',formatter:complexCol" 
					editor="{type:'numberbox'}">长度</th>
				<th data-options="field:'decimalPlaces',width:50,align:'left',formatter:complexCol" 
					editor="{type:'numberbox'}">小数点</th>
				<th data-options="field:'pkRestrict',width:30,align:'left',
					formatter:checkboxCol,editor:ag_checkbox_editor">主键约束</th>
				<th data-options="field:'notNullRestrict',width:30,align:'left',
					formatter:checkboxCol,editor:ag_checkbox_editor">非空约束</th>
					
				<th data-options="field:'uniqueRestrict',width:30,align:'left',
					formatter:checkboxCol,editor:ag_checkbox_editor">唯一约束</th>
				<th data-options="field:'notInsertRestrict',width:30,align:'left',
					formatter:checkboxCol,editor:ag_checkbox_editor">不可插入</th>
				<th data-options="field:'notUpdateRestrict',width:30,align:'left',
					formatter:checkboxCol,editor:ag_checkbox_editor">不可更新</th>	
				<th data-options="field:'comments',width:100,align:'left',formatter:complexCol" 
					editor="{type:'textbox',options:{onChange:commentsOnChange}}">列注释</th>
				<th data-options="field:'columnLabel',width:100,align:'left',formatter:complexCol" 
					editor="{type:'textbox'}">显示名称</th>				
			</tr>
		</thead>
	</table>
	<div id="toolbar">	
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" 
        	onclick="javascript:$('#datagrid-table').edatagrid('addRow')">添加</a>  

        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" 
        	onclick="javascript:$('#datagrid-table').edatagrid('destroyRow')">删除</a>

        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-save" plain="true" 
        	onclick="javascript:saveSort();">保存</a> 
        	
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-arrow_up" plain="true" 
        	onclick="moveUp()">上移</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-arrow_down" plain="true" 
        	onclick="moveDown()">下移</a>
	</div>
	
	<script type="text/javascript">
		$(function(){
			$('#datagrid-table').edatagrid({
				autoSave	: true,
				saveUrl		: adminActionPath + '/entityfield/add',
				destroyUrl	: adminActionPath + '/entityfield/delete',
				updateUrl	: adminActionPath + '/entityfield/edit'
			});
		});
		//全局变量
		var ag_sqlTypeJson=[];
		var ag_$dg=$("#datagrid-table");

		
		$.get(adminActionPath +'/typemapping/findlist',function(json){
			ag_sqlTypeJson=json.data;
		},'json')
		
		function getSqlTypeJson(){
			return ag_sqlTypeJson;
		}
		function sqlTypeOnSelect(record){
            var row = ag_$dg.datagrid('getSelected');  
            var rindex = ag_$dg.datagrid('getRowIndex', row);  
            var editor = ag_$dg.datagrid('getEditor', {  
                    index : rindex,  
                    field : 'attrType'  
                }); 
            if(editor && editor.target)
            	$(editor.target).combobox("setValue",record.javaType);
		}

		
		function commentsOnChange(newValue, oldValue){
            var row = ag_$dg.datagrid('getSelected');  
            var rindex = ag_$dg.datagrid('getRowIndex', row);  
            var editor = ag_$dg.datagrid('getEditor', {  
                    index : rindex,  
                    field : 'columnLabel'  
                }); 

            if(editor && editor.target)
            	$(editor.target).textbox("setValue",newValue);
		}
		// 保存排序
		
		function saveSort(){
			//保存正在编辑的
		    var select_row = ag_$dg.datagrid('getSelected');
		    var select_index = ag_$dg.datagrid('getRowIndex', select_row);
		    ag_$dg.datagrid("endEdit",select_index);
		    var list=[];
		    
			var rows=ag_$dg.datagrid("getRows");
			for(var i = 0; i < rows.length; i++){
				var id=rows[i].id;
				if(id){
					list.push({id : id,columnSort : i});
				}
			}
			
			$.ajax({
				url			: adminActionPath + '/entityfield/update_sort',
				/**必须是POST方法**/
				type		: 'post',
				/**必须制定请求的类型**/
				contentType	: 'application/json;charset=utf-8',
				data		: JSON.stringify(list),
				dataType	: 'json',

				success		: function(json){
					if(json.type == "success"){
						$.messager.show({
							title : '提示',
							msg : "保存成功！"
						});
					}
				}
			});
		} 
		
		//----------move up and down
		
		function moveUp() {
		    var row = ag_$dg.datagrid('getSelected');
		    var index = ag_$dg.datagrid('getRowIndex', row);
		    mysort(index, 'up', ag_$dg);
		     
		}
		//下移
		function moveDown() {
		    var row = ag_$dg.datagrid('getSelected');
		    var index = ag_$dg.datagrid('getRowIndex', row);
		    mysort(index, 'down', ag_$dg);
		     
		}
		function mysort(index, type, $dg) {	
			//结束行编辑，否则处于编辑状态的行，移动后丢失数据
			$dg.datagrid("endEdit",index);
		    if ("up" == type) {
		        if (index != 0) {
		            var toup = $dg.datagrid('getData').rows[index];
		            var todown = $dg.datagrid('getData').rows[index - 1];
		            $dg.datagrid('getData').rows[index] = todown;
		            $dg.datagrid('getData').rows[index - 1] = toup;
		            $dg.datagrid('refreshRow', index);
		            $dg.datagrid('refreshRow', index - 1);
		            $dg.datagrid('selectRow', index - 1);
		        }
		    } else if ("down" == type) {
		        var rows = $dg.datagrid('getRows').length;
		        if (index != rows - 1) {
		            var todown = $dg.datagrid('getData').rows[index];
		            var toup = $dg.datagrid('getData').rows[index + 1];
		            $dg.datagrid('getData').rows[index + 1] = todown;
		            $dg.datagrid('getData').rows[index] = toup;
		            $dg.datagrid('refreshRow', index);
		            $dg.datagrid('refreshRow', index + 1);
		            $dg.datagrid('selectRow', index + 1);
		        }
		    }		 
		}		
	
	</script>
	
	
</body>
</html>
			