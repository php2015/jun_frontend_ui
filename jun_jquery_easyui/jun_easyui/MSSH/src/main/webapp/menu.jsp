<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="js/jquery-easyui-1.3.1/themes/cupertino/easyui.css" type="text/css" />
<link rel="stylesheet" href="js/jquery-easyui-1.3.1/themes/icon.css" type="text/css" />
<script type="text/javascript" src="js/jquery-easyui-1.3.1/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.3.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.3.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
$(function(){
	$('#menu_tree').tree({
		//单击节点
		onClick: function(node){
			addTabs(node);
		}, 
		//双击节点
		onDblClick:function(node){
			addTabs(node);
		}
	});
});
//单击或双击右边添加tabs
function addTabs(node){
	var tab =$('#index_centertabs');
	var url =node.attributes.url;
	var text =node.text;
	if(!url){
		$('#menu_tree').tree('expand',node.target);//单击或双击有子节点的的节点，展开子节点。
		return;
	}else{
		if(tab.tabs('exists',text)){
			tab.tabs('select',text);//已经有了的tab，则选中该tab。
		}else{
			tab.tabs('add',{//没有的tab，则创建一个tab并选中。
				title: text,
				selected: true,
				closable :true,
				href :url
			});
		}
	}
}
</script>
<title>异步菜单</title>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',split:false" style="height:100px;"></div>
	<!-- <div data-options="region:'south',split:false"style="height:100px;">
	<div id="p" class="easyui-panel"  style="padding:10px;background:#fafafa;"  
        data-options="closable:true, border:false,fit:true, 
                collapsible:true"> 
	</div>  
	</div> -->
	<div data-options="region:'east',iconCls:'icon-reload',title:'East',split:true" style="width:150px;"></div>
	<div data-options="region:'west',title:'控制面板',split:false" style="width:200px;background:#eee;">

		<div id="aa" class="easyui-accordion"  data-options="fit:true">
			<div title="系统管理"  style="overflow:auto;padding:10px;background:#eee;" data-options="border:false">
				<ul id ="menu_tree" class="easyui-tree" data-options="url:'getMenu.html',lines:true"></ul>
			</div>
			<div title="客户管理" style="padding:10px;background:#eee;"></div>
			<div title="职工管理" style="padding:10px;background:#eee;"></div>
			<div title="日程管理" style="padding:10px;background:#eee;"></div>
			<div title="会议管理" style="padding:10px;background:#eee;"></div>
			<div title="日志管理" style="padding:10px;background:#eee;">系统日志</div>
		</div>

	</div>
	<div data-options="region:'center',title:'center title'" style="background:#eee;">
		<div id="index_centertabs" class="easyui-tabs" data-options="fit:true,border:false">
				<div title="操作指南">系统操作指南</div>
		</div>
	</div>
</body>
</body>
</html>