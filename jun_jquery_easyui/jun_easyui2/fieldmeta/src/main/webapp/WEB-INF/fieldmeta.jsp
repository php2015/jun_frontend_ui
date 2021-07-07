<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<title>表单字段类型</title>
   		<c:import url="/admin/pages/common/headsource.jsp"/>	
   		<script type="text/javascript" src="jquery.edatagrid.js"></script>	
  	</head>
<body>
	<table id="datagrid-table" class="easyui-datagrid" title="表单字段类型"
		data-options="
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true, 
			url				: adminActionPath + '/fieldmeta/findpage?tableName=form_field_type',
			toolbar			: '#toolbar',
			fit				: true,
			pagination		: true,
			pageSize		: 15,
			pageList        : [10,15,20,25,30],
			showFooter		: true,
			idField			: 'id'">
		<thead>			
			<tr>				
				<th data-options="field:'columnName',width:100,align:'left',formatter:complexCol">列名</th>
				<th data-options="field:'columnLabel',width:100,align:'left',formatter:complexCol" editor="{type:'textbox'}">显示名称</th>
				<th data-options="field:'columnType',width:100,align:'left',formatter:complexCol">物理类型</th>
				<th data-options="field:'attrType',width:100,align:'left',formatter:complexCol">javaType</th>
				<th data-options="field:'attrName',width:100,align:'left',formatter:complexCol">字段名称</th>
				
				<th data-options="field:'isPk',width:100,align:'left',formatter:codeCol,codeClass:'yes_or_no'" >主键</th>				
				<th data-options="field:'notNull',width:100,align:'left',formatter:codeCol,codeClass:'yes_or_no'">非空</th>
				
				<th data-options="field:'isList',width:50,align:'left',formatter:codeCol,codeClass:'is_default_code'">列表</th>
				<th data-options="field:'isQuery',width:150,align:'left',formatter:codeCol,codeClass:'sql_dialect_code'">查询</th>
				<th data-options="field:'queryType',width:50,align:'left',formatter:codeCol,codeClass:'query_type'"
					editor="{type:'combobox',options:{valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							codeClass:'query_type'}}">匹配方式</th>
				
			</tr>
		</thead>
	</table>
	<div id="toolbar">	
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" 
        	onclick="javascript:$('#datagrid-table').edatagrid('addRow')">添加</a>  

        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" 
        	onclick="javascript:$('#datagrid-table').edatagrid('destroyRow')">删除</a>

	</div>
	
	<script type="text/javascript">
		$(function(){
			$('#datagrid-table').edatagrid({
			});
		});

	</script>
</body>
</html>
			