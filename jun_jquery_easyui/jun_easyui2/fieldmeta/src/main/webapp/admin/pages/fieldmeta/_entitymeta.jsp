<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
   		
	<table id="datagrid-table" class="easyui-datagrid"
		data-options="
			rownumbers		: true,
			singleSelect	: true,
			selectOnCheck	: false,
			fitColumns		: true, 
			toolbar			: '#toolbar',
			fit				: true,
			showFooter		: true,
			idField			: 'id',
			loadFilter		: function(json){return json.data;},
			onDblClickRow   : function(){dataTable.edit();}">
		<thead>
			<tr>
				<th data-options="field:'ck',checkbox:true"></th>
				
				<th data-options="field:'tableName',width:80,align:'left',formatter:complexCol">表名</th>
				<th data-options="field:'entityName',width:80,align:'left',formatter:complexCol">实体名</th>
				<th data-options="field:'simpleName',width:50,align:'left',formatter:complexCol">简称</th>
				<th data-options="field:'moduleName',width:50,align:'left',formatter:complexCol">所属模块</th>
				<th data-options="field:'canDelete',width:50,align:'left',formatter:codeCol,codeClass:'yes_or_no'">删除功能</th>
				<th data-options="field:'canEdit',width:50,align:'left',formatter:codeCol,codeClass:'yes_or_no'">编辑功能</th>
				<th data-options="field:'entitySuperClass',width:150,align:'left',
					formatter:codeCol,codeClass:'entity_super_class'">实体基类</th>
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
					style="color: red"  onclick="clearForm('search-form')">条件清空</a>	
		
				<label>名称</label>
				<input name="name" style="width:125px;" type="text">
				<span class="inline-clear"></span>
				
				<label>所属模块</label>
				<input id="search-moduleName" name="moduleName" class="easyui-combobox"
					data-options="valueField:'moduleName',textField:'moduleName',editable:false,panelHeight:'auto',defaultFirst:true,
							url:adminActionPath +'/module/defalut_project',dataField : 'data',onLoadSuccess:loadTables">
				<span class="inline-clear"></span>
				
				<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="dataTable.search()">查询</a>
		     </form>
		</div>
	
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="dataTable.add()">添加</a>  
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="dataTable.edit()">修改</a>  
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="dataTable.remove()">删除</a>
        
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-database_table" plain="true" onclick="javascript:$.messager.alert('提示','开发中...');">数据库导入</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-page_code" plain="true" onclick="javascript:codegen()">生成代码</a>
       
	</div>
	
	<div id="data-form-dlg" class="easyui-dialog" style="width: 600px; height: 400px; padding: 10px 20px" closed="true"
		buttons="#dlg-buttons" modal="true">
		<form id="data-form" class="data-form" method="post">
			<input name="id" style="display: none" />
			<table style="margin-left:-20px;">
				<tr class="tr_padding">
					<td><label>表名</label></td>
					<td>
						<input onChange="tableNameOnChange(this.value)" name="tableName" class="easyui-validatebox" data-options="required:true,validType:'word'">
					</td>
					<td><label>实体名</label></td>
					<td>
						<input id="input-entityName" name="entityName" class="easyui-validatebox" data-options="required:true,validType:'word'">
					</td>		
				</tr>
				<tr class="tr_padding">
					<td><label>简称</label></td>
					<td>
						<input name="simpleName" class="easyui-validatebox" data-options="required:true,validType:'CHS'">
					</td>
					<td><label>所属模块</label></td>
					<td>
						<input name="moduleName" class="easyui-combobox"
					data-options="valueField:'moduleName',textField:'moduleName',defaultFirst:true,editable:false,panelHeight:'auto',
							url:adminActionPath +'/module/defalut_project',dataField : 'data'">
					</td>		
				</tr>
				
				
				<tr class="tr_padding">
					<td><label>删除功能</label></td>
					<td>
						<input name="canDelete" class="easyui-combobox" value="yes"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,defaultFirst:true,codeClass:'yes_or_no'">
					</td>	
					<td><label>编辑功能</label></td>
					<td>
						<input name="canEdit" class="easyui-combobox" value="yes"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							required:true,defaultFirst:true,codeClass:'yes_or_no'">
					</td>		
				</tr>
				
				<tr class="tr_padding">
					<td><label>实体基类</label></td>
					<td colspan="3">
						<input name="entitySuperClass" class="easyui-combobox" style="width: 375px"
						data-options="valueField:'code',textField:'name',editable:false,panelHeight:'auto',
							defaultFirst:true,codeClass:'entity_super_class',defaultFirst:true">
					</td>
				</tr>
				<tr class="tr_padding">
					<td><label>备<span class="letter-space-2"></span>注</label></td>
					<td	colspan="3">
						<textarea rows="3" name="remark" class="textarea easyui-validatebox"
							style="width: 375px"></textarea>
					</td>
				</tr>
			</table> 
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-ok" onclick="dataTable.save()">保存</a> 
		<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#data-form-dlg').dialog('close')">取消</a>
	</div>
	
	
	<script type="text/javascript">
	function tableNameOnChange(newValue){
        	$("#input-entityName").val(NamingStrategy.tableNameToClassName(newValue));
	}
	
	function clearForm(id){
		$("#"+id).form("clear");	
	}
	
	function codegen(){
		var checked_rows = $("#datagrid-table").datagrid("getChecked");
		if(!checked_rows.length){
			$.messager.alert({
				title : "提示",
				msg : "请勾选实体元数据！"
			})
			return ;
		}
		$.messager.alert({
			title : "提示",
			msg : "开发中..."
		})
	}
	
	</script>
	