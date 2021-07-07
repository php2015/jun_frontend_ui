<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<title>table元数据</title>
   		<c:import url="/admin/pages/common/headsource.jsp"/>		
  	</head>
<body>
	<table id="datagrid-table" class="easyui-datagrid" title="实体元数据"
		data-options="
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true, 
			url				: adminActionPath + '/tablemeta/findpage',
			toolbar			: '#toolbar',
			fit				: true,
			pagination		: true,
			pageSize		: 15,
			pageList        : [10,15,20,25,30],
			showFooter		: true,
			idField			: 'id',
			onDblClickRow   : function(){dataTable.edit();}">
		<thead>
			<tr>
				<th data-options="field:'tableName',width:80,align:'left',formatter:complexCol">表名</th>
				<th data-options="field:'entityName',width:60,align:'left',formatter:complexCol">实体名</th>
				<th data-options="field:'simpleName',width:50,align:'left',formatter:complexCol">简称</th>
				<th data-options="field:'moduleName',width:50,align:'left',formatter:complexCol">所属模块</th>
				<th data-options="field:'parentTableName',width:80,align:'left',formatter:complexCol">父表表名</th>
				<th data-options="field:'parentTableFkName',width:50,align:'left',formatter:complexCol">关联外键</th>
				<th data-options="field:'isHaveDelete',width:150,align:'left',formatter:codeCol,codeClass:'yes_or_no'">软删除</th>
				<th data-options="field:'isHaveDisableEnable',width:150,align:'left',formatter:codeCol,codeClass:'yes_or_no'">停启用</th>
				<th data-options="field:'remark',width:150,formatter:complexCol">备注</th>
				<th data-options="field:'modifyTime',width:120,align:'left',formatter:EasyUiDateTime">更新时间</th>
			</tr>
		</thead>
	</table>
	<div id="toolbar">
		<div class="easyui-panel"
		    data-options="collapsible:true,minimizable:true">
			<form id="search-form" class="search-form" enctype="multipart/form-data">    
			    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-reload" plain="true"
					style="color: red"  onclick="resetForm('search-form')">条件重置</a>	
		
				<label>名称</label>
				<input name="name" style="width:125px;" type="text">
				<span class="inline-clear"></span>
				
				<label>所属模块</label>
				<input name="moduleName" class="easyui-combobox"
					data-options="valueField:'moduleName',textField:'moduleName',editable:false,panelHeight:'auto',
							url:adminActionPath +'/module/findlist',dataField : 'data'">
				<span class="inline-clear"></span>
				
				<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="dataTable.search()">查询</a>
		     </form>
		</div>
	
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="dataTable.add()">添加</a>  
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="dataTable.edit()">修改</a>  
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="dataTable.remove()">删除</a>

	</div>
	
	<div id="data-form-dlg" class="easyui-dialog" maximized=true closed="true"
		buttons="#dlg-buttons" modal="true">
		
		<form id="data-form" class="data-form" method="post">
			<input name="id" style="display: none" />
			<table style="margin-left:-20px;">
				<tr class="tr_padding">
					<td><label>表名</label></td>
					<td>
						<input name="tableName" class="easyui-validatebox" data-options="required:true,validType:'word'">
					</td>
					<td><label>实体名</label></td>
					<td>
						<input name="entityName" class="easyui-validatebox" data-options="required:true,validType:'word'">
					</td>		

					<td><label>简称</label></td>
					<td>
						<input name="simpleName" class="easyui-validatebox" data-options="required:true,validType:'CHS'">
					</td>
					<td><label>所属模块</label></td>
					<td>
						<input name="moduleName" class="easyui-combobox"
					data-options="valueField:'moduleName',textField:'moduleName',defaultFirst:true,editable:false,panelHeight:'auto',
							url:adminActionPath +'/module/findlist',dataField : 'data'">
					</td>		
				</tr>
				
				
				<tr class="tr_padding">
					<td><label>删除功能</label></td>
					<td>
						<input name="isHaveDelete" class="easyui-combobox"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,defaultFirst:true,codeClass:'yes_or_no'">
					</td>	
					<td><label>编辑功能</label></td>
					<td>
						<input name="isHaveDisableEnable" class="easyui-combobox"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,defaultFirst:true,codeClass:'yes_or_no'">
					</td>		

					<td><label>软删除</label></td>
					<td>
						<input name="isHaveDelete" class="easyui-combobox"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,defaultFirst:true,codeClass:'yes_or_no'">
					</td>	
					<td><label>停启用</label></td>
					<td>
						<input name="isHaveDisableEnable" class="easyui-combobox"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,defaultFirst:true,codeClass:'yes_or_no'">
					</td>
				</tr>
				<tr class="tr_padding">
					<td><label>父表表名</label></td>
					<td>
						<input name="parentTableName" class="easyui-validatebox" data-options="required:true,validType:'word'">
					</td>
					<td><label>关联外键</label></td>
					<td>
						<input name="parentTableFkName" class="easyui-validatebox" data-options="required:true,validType:'word'">
					</td>
					<td><label>baseEntity</label></td>
					<td colspan="3">
						<input name="javaType" class="easyui-combobox" style="width: 375px"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,codeClass:'java_type',defaultFirst:true">
					</td>

				</tr>
				<tr class="tr_padding">
					<td><label>备<span class="letter-space-2"></span>注</label></td>
					<td	colspan="7">
						<textarea rows="2" name="remark" class="textarea easyui-validatebox"
							style="width: 100%"></textarea>
					</td>
				</tr>
				
			</table> 
			
		</form>
		<iframe name="fieldmeta-iframe" src="${root}/admin/pages/fieldmeta/fieldmeta-iframe.jsp"
			 scrolling="no" frameborder="0" style="width:100%;height: 70%"></iframe>		
		
		
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-ok" onclick="dataTable.save()">保存</a> 
		<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#data-form-dlg').dialog('close')">取消</a>
	</div>
	
	
	
	<script type="text/javascript">	
		
		var dataTable = new DataTable({
			$datagrid_table :$("#datagrid-table"),
			$data_form_dialog : $("#data-form-dlg"),
			$data_form : $("#data-form"),
			data_form_name : "实体元数据",
			
			addOpt : {
				url : adminActionPath+"/tablemeta/add"
			},
			editOpt : {
				url : adminActionPath+"/tablemeta/edit"
			},
			removeOpt : {
				url : adminActionPath+"/tablemeta/delete"
			},
			saveOpt : {},
			searchOpt : {
				$searchForm : $("#search-form"),
			}
		});
	</script>
</body>
</html>
			