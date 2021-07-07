<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<title>字段元数据</title>
   		<c:import url="/admin/pages/common/headsource.jsp"/>	
   		<script type="text/javascript" src="${roow}/static/easyui-extend/jquery.edatagrid.js"></script>	
   		<link rel="stylesheet" type="text/css" href="${root}/static/easyui-extend/IconsExtension/icon.css">
   		
  	</head>
<body>
	<div class="easyui-panel">
		<div id="toolbar">	
	        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" 
	        	onclick="javascript:$('#entityfield-table').edatagrid('addRow')">添加</a>  
	
	        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" 
	        	onclick="javascript:$('#entityfield-table').edatagrid('destroyRow')">删除</a>
	
	        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-save" plain="true" 
	        	onclick="javascript:saveSort();">保存</a> 
	        	
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-arrow_up" plain="true" 
	        	onclick="moveUp()">上移</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-arrow_down" plain="true" 
	        	onclick="moveDown()">下移</a>
		</div>		
	</div>
	<div class="easyui-tabs" id="tt" data-options="fit:true,border:false,plain:true,onSelect:keepSame">
		<div title="实体字段">
			<c:import url="${root}/admin/pages/fieldmeta/_entityfield.jsp"></c:import>
		</div>
		<div title="页面字段" >
			<c:import url="${root}/admin/pages/fieldmeta/_pagefield.jsp"></c:import>
		</div>
	</div>

<script type="text/javascript">

//初始未被勾选
var ag_checked_index = -1;

// 保存排序

function saveSort(){
	//保存正在编辑的
    var select_row = ag_$entityfield_table.datagrid('getSelected');
    var select_index = ag_$entityfield_table.datagrid('getRowIndex', select_row);
    ag_$entityfield_table.datagrid("endEdit",select_index);
    var list=[];
    
	var rows=ag_$entityfield_table.datagrid("getRows");
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



function set_ag_checked_index(index, row){
		ag_checked_index = index;
}

function keepSame(title,index){
	keepFieldInfoSame(title,index);
	keepCheckedSame();
}


function keepCheckedSame(){	
	var entity_checked_row=ag_$entityfield_table.datagrid('getSelected');
	var page_checked_row=ag_$pagefield_table.datagrid('getSelected');
	if(ag_checked_index !=-1){
		ag_$entityfield_table.datagrid('checkRow', ag_checked_index);
		ag_$pagefield_table.datagrid('checkRow', ag_checked_index);
	}else{
		ag_$entityfield_table.datagrid('uncheckAll');
		ag_$pagefield_table.datagrid('uncheckAll');
	}
}

function keepFieldInfoSame(title,index){

	if(title == "实体字段"){
		flashData(ag_$pagefield_table);
		return ;
	}

	if(title == "页面字段"){
		flashData(ag_$entityfield_table);
	}
	
	var entity_fields = ag_$entityfield_table.datagrid("getRows");	
	var page_fields = ag_$pagefield_table.datagrid("getRows");
	var changes = 0;	
	for(var i=0; i < entity_fields.length;i++){		
		if(page_fields[i].entityField.columnName != entity_fields[i].columnName
				|| page_fields[i].entityField.attrName != entity_fields[i].attrName){
			page_fields[i].entityField.columnName = entity_fields[i].columnName;
			page_fields[i].entityField.attrName = entity_fields[i].attrName;
			changes += 1;			
		}
	}
	if(changes){
		console.log(page_fields.length)
		var load_data = {"data":{"total":page_fields.length, "rows" : page_fields}};	
		ag_$pagefield_table.datagrid("loadData",load_data);
	}
}	


function flashData($dg){
	var rows=$dg.datagrid("getRows");
	for(var i=0; i < rows.length;i++){
		$dg.datagrid("endEdit",i);
		$dg.datagrid("refreshRow",i);
		$dg.datagrid("beginEdit",i);
	}
}


//----------move up and down----begin

function isChecked(){
	console.log("ag_checked_index:" +ag_checked_index)
	if(ag_checked_index == -1){
		$.messager.show({
			title : '提示',
			msg : "请勾选一行记录！"
		});
		return false;
	}
	return true;
}

function moveUp(){
	if(isChecked()){
		var index = ag_checked_index;
		mysort(index, 'up', ag_$pagefield_table);  
		mysort(index, 'up', ag_$entityfield_table);  
	}
}

function moveDown(){
	if(isChecked()){
		//变量 index 是来保持同步的
		var index = ag_checked_index;
		 mysort(index, 'down', ag_$pagefield_table);
		 mysort(index, 'down', ag_$entityfield_table); 
	}
}

function mysort(index, type, $dg) {		
	//结束行编辑，否则处于编辑状态的行，移动后丢失数据
    if ("up" == type) {
        if (index != 0) {
        	$dg.datagrid("endEdit",index);
        	$dg.datagrid("endEdit",index -1);
            var toup = $dg.datagrid('getData').rows[index];
            var todown = $dg.datagrid('getData').rows[index - 1];
            $dg.datagrid('getData').rows[index] = todown;
            $dg.datagrid('getData').rows[index - 1] = toup;
            $dg.datagrid('refreshRow', index);
            $dg.datagrid('refreshRow', index - 1);
            $dg.datagrid('selectRow', index - 1);
            $dg.datagrid("beginEdit",index);
            $dg.datagrid("beginEdit",index - 1);
        }
    } else if ("down" == type) {
        var rows = $dg.datagrid('getRows').length;
        if (index != rows - 1) {
        	$dg.datagrid("endEdit",index);
        	$dg.datagrid("endEdit",index + 1);
            var todown = $dg.datagrid('getData').rows[index];
            var toup = $dg.datagrid('getData').rows[index + 1];
            $dg.datagrid('getData').rows[index + 1] = todown;
            $dg.datagrid('getData').rows[index] = toup;
            $dg.datagrid('refreshRow', index);
            $dg.datagrid('refreshRow', index + 1);
            $dg.datagrid('selectRow', index + 1);
            $dg.datagrid("beginEdit",index);
            $dg.datagrid("beginEdit",index + 1);
        }
    }
}

//----------move up and down----end

</script>
	
</body>


</html>
			