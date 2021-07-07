<%--
  Created by IntelliJ IDEA.
  User: WangGenshen
  Date: 12/3/15
  Time: 20:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
%>
<html>
<head>
    <title>模块管理</title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="<%=path %>/js/jquery-easyui/themes/default/easyui.css"/>
    <link rel="stylesheet" href="<%=path %>/js/jquery-easyui/themes/icon.css"/>
    <link rel="stylesheet" href="<%=path %>/css/site_main.css"/>

    <script src="<%=path %>/js/jquery.min.js"></script>
    <script src="<%=path %>/js/jquery.form.js"></script>
    <script src="<%=path %>/js/jquery-easyui/jquery.easyui.min.js"></script>
    <script src="<%=path %>/js/jquery-easyui/locale/easyui-lang-zh_CN.js"></script>
    <script src="<%=path %>/js/site_main.js"></script>

    <script>

        $(function () {
            setPagination("#module_list");
        });

        function toAddModule() {
            $("#addModule").window("open");
        }

        function addModule() {
            $.post("<%=path %>/moduleAction/add",
                    $("#addModuleForm").serialize(),
                    function (data) {
                        if (data.result == "ok") {
                            $("#addModule").window("close");
                            $("#module_list").datagrid("reload");
                        } else {
                            $.messager.alert("提示", data.errMsg, "info");
                        }
                    }
            );
        }
    </script>
</head>
<body style="margin:0;padding:0;">
<table id="module_list" class="easyui-datagrid" toolbar="#module_tb" style="height:100%;"
       data-options="
        url:'<%=path %>/moduleAction/listPager',
        method:'get',
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pagination:true,
				border:false,
				pageSize:20">
    <thead>
    <tr>
        <th field="id" checkbox="true" width="50">模块ID</th>
        <th field="name" width="150">模块名称</th>
    </tr>
    </thead>
</table>
<div id="module_tb">
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-add" plain="true"
       onclick="toAddModule();">添加</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-cut" plain="true"
       onclick="javascript:alert('Cut')">Cut</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-save" plain="true"
       onclick="javascript:alert('Save')">Save</a>
</div>

<div class="easyui-window" title="添加模块" id="addModule" resizable="false" style="width:300px; height:200px;" mode="true"
     closed="true">
    <form id="addModuleForm">
        <table>
            <tr>
                <td>模块名称:</td>
                <td><input type="text" name="name" class="easyui-textbox"/></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button type="button" onclick="addModule();">确认</button>
                </td>
            </tr>
        </table>
    </form>
</div>

</body>
</html>
