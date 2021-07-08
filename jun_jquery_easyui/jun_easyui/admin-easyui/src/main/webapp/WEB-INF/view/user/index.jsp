<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE HTML>
<html>
<head>
<title>用户管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<jsp:include page="../layout/script.jsp"></jsp:include>
<script type="text/javascript">
	var $dg;
	var $temp;
	var $grid;
	
	$(function() {
		$dg = $("#dg");
		$queryForm=$("#queryForm");
		
		$grid = $dg.datagrid({
			toolbar : '#tb',
			url : "page.do",
			width : 'auto',
			height : $(this).height() - 90,
			pagination : true,
			rownumbers : true,
			border : false,
			singleSelect : true,
			striped : true,
			loadFilter : function(res) {
				return res.data;
			},
			columns : [ [ {
				field : 'username',
				title : '用户名',
				width : parseInt($(this).width() * 0.1),
				align : 'left',
				editor : 'text'
			}, {
				field : 'name',
				title : '姓名',
				width : parseInt($(this).width() * 0.1),
				align : 'left',
				editor : 'text'
			}, {
				field : 'tel',
				title : '电话',
				width : parseInt($(this).width() * 0.1),
				align : 'left',
				editor : 'text'
			}, {
				field : 'email',
				title : '邮箱',
				width : parseInt($(this).width() * 0.1),
				align : 'left',
				editor : 'text'
			}, {
				field : 'status',
				title : '状态',
				width : parseInt($(this).width() * 0.1),
				align : 'left',
				editor : 'text',
				formatter : function(value, row, index) {
					if (row.status == 0) {
						return "正常";
					} else if (row.status == 1) {
						return "待审核";
					} else if (row.status == 2) {
						return "冻结";
					} else if (row.status == 10) {
						return "注销";
					}
				}
			} ] ]
		});

		/**查询*/
		$("#search").click(function() {
			var json = $queryForm.serializeObject();
			$dg.datagrid('reload', json);
		});
		
		/**重置*/
		$("#cancel").click(function() {
			$queryForm.form('reset'); 
		});
		
		$("#status").combobox({    
            editable:false  //是否可编辑
        });
		
	});

	function addRowsOpenDlg() {
		U.showHtmlDialog("添加用户","user/addView",$grid);
	}

	function updRowsOpenDlg() {
		var row = $dg.datagrid('getSelected');
		if (row) {
			U.showHtmlDialog("编辑用户","user/updateView",$grid,row);
		} else {
			U.notice("请选择一行记录");
		}
	}

	function delRows() {
		var row = $dg.datagrid('getSelected');
		if (row) {
			parent.$.messager.confirm("提示", "确定要删除记录吗", function(r) {
				if (r) {
					var rowIndex = $dg.datagrid('getRowIndex', row);
					$dg.datagrid('deleteRow', rowIndex);
					ajaxCall("user/remove.do",{"id":row.id},function(){
						U.notice("操作成功");
					});
				}
			});
		} else {
			U.notice("请选择一行记录");
		}
	}
</script>
</head>
<body>
	<div class="well well-small" style="margin-left: 5px;margin-top: 5px">
		<span class="badge">提示</span>
		<p>
			在此你可以对<span class="label-info"><strong>用户</strong> </span>进行编辑!
		</p>
	</div>
	<div id="tb" style="padding:2px 0">
		<form method="post" id="queryForm">
		<table cellpadding="0" cellspacing="0">
			<tr>
				<td>用户名:<input class="easyui-textbox" type="text" name="username"/>
				</td>
				<td>状态:
				<select id="status" class="easyui-combobox" name="status" style="width:170px;">
								<option value="">---请选择---</option>
								<option value="0">正常</option>
								<option value="1">待审核</option>
								<option value="2">冻结</option>
								<option value="10">注销</option>
							</select>
				</td>
			</tr>
			
			<tr>
				<td style="padding-left:2px"><shiro:hasPermission name="user:add">
						<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addRowsOpenDlg();">添加</a>
					</shiro:hasPermission> <shiro:hasPermission name="user:update">
						<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="updRowsOpenDlg();">编辑</a>
					</shiro:hasPermission> <shiro:hasPermission name="user:delete">
						<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="delRows();">删除</a>
					</shiro:hasPermission><shiro:hasPermission name="user:index">
						<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-search" plain="true" id="search">查询</a>
						<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-reload" plain="true" id="cancel">重置</a>
					</shiro:hasPermission>
				</td>
			</tr>
		</table>
		</form>
	</div>
	<table id="dg" title="用户管理"></table>
</body>
</html>