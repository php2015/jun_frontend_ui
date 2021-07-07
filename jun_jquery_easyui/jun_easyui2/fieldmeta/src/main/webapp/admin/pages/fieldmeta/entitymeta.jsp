<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<title>实体元数据</title>

   		<c:import url="/admin/pages/common/headsource.jsp"/>
   				
  	</head>
<body class="easyui-layout" fit="true">
<div data-options="region:'center'" title="实体元数据">
	<c:import url="${root}/admin/pages/fieldmeta/_entitymeta.jsp"></c:import>
</div>	
<div data-options="region:'south',split:true,hideCollapsedContent:false" title="字段元数据" style="height:60%;" >
	<c:import url="${root}/admin/pages/fieldmeta/_fieldmeta.jsp"></c:import>
</div>	
<div style="display: none">
        <a href="javascript:void(0)" id="optionfield-button" class="easyui-linkbutton" iconCls="icon-text_list_bullets" plain="true" 
       	onclick="openOptionfieldDlg()">可选字段</a>  
</div>	

<c:import url="${root}/admin/pages/fieldmeta/_optionfield-dlg.jsp"></c:import>
	<script type="text/javascript">	
		$(function(){
			$("#fieldmeta-toolbar").append($("#optionfield-button"));
		});
	
	
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
		
		function loadTables(){
			var moduleName = $("#search-moduleName").combobox("getValue");
			$("#datagrid-table").datagrid({
				url				: adminActionPath + '/tablemeta/findlist',
				queryParams		: {moduleName : moduleName},
				onSelect		: function(index, row){
					ag_table.selectTable = row.tableName;
					laodWithTableName();
				}
			});
		};
		function selectOptionfieldCall(index, row){	
			$.get(adminActionPath + '/pagefield/findlist',"entityField.id="+row.id,function(json){
				if(json.type == "success"){
					appendRow(row,json.data[0] );	
				}
			},"json")
			
		}	
	</script>
</body>
</html>
			