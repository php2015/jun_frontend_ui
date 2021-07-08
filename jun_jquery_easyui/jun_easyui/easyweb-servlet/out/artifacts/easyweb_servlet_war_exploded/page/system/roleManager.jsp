<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/inc/_header.jsp"%>
    <script src="roleManager.js" type="text/javascript"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center'">
<table id="dg"></table>
<div id="d_tb" style="padding-top: 8px;padding-left:15px;display:none">
    <div style="padding-bottom:5px">
        <a class="easyui-linkbutton btn_add" href="javascript:;" iconCls="icon-add" plain="true">添加</a>
                <span class="updateRecord">
                    <a class="easyui-linkbutton btn_modify" href="javascript:;" iconCls="icon-edit" plain="true">修改</a>
                    <a class="easyui-linkbutton btn_del" href="javascript:;" iconCls="icon-remove" plain="true">删除</a>
                </span>
        <a href="" class="easyui-linkbutton" iconcls="icon-reload" plain="true">重载</a>
    </div>
    <div>
        <form id="searchForm" action="javascript:;">
            <input type="submit" style="display:none" />
            名称:<input name="name" class="easyui-textbox" style="width:110px" />
            说明:<input name="comment" class="easyui-textbox" style="width:110px" />
            <a href="javascript:;" class="easyui-linkbutton submit" iconcls="icon-search" plain="true">查询</a>
        </form>
    </div>
</div>
</div>
<!--对话框-->
<div style="display:none">
    <!--主对话框-->
    <div id="dlg" style="width:400px;padding:20px;">
        <form class="mainForm">
            <input type="submit" style="display:none;" />
            <input name="id" style="display:none;" />
            <table>
                <tr>
                    <td>名称:</td>
                    <td>
                        <input name="name" class="easyui-textbox" data-options="required:true,missingMessage:'不能为空'" style="width:180px" />
                    </td>
                </tr>
                <tr>
                    <td>
                        图标:
                    </td>
                    <td>
                        <a href="#" title="点击上传图片" id="btn_upload" plain="false" class="easyui-linkbutton" onclick="$('#file_icon').click()">
                            <div style="width:16px;height:16px;">
                                <img id="img_icon" style="border:none;" />
                            </div>
                        </a>
                        <input style="display:none;" id="text_icon" name="icon" value="/icon/group.png" />
                        <input style="display:none;" type="file" id="file_icon" name="iconfile" onchange="onFileIconChange(this);" accept="image/*" />
                        <span style="font-style:italic;color:gray;">上传图片大小低于2M，分辨率建议16*16</span>
                    </td>

                </tr>
            </table>

        </form>
    </div>
</div>
</body>
</html>