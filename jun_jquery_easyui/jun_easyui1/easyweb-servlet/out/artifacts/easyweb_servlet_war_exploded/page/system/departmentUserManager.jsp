<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/inc/_header.jsp"%>
    <script src="/js/ajaxfileupload.js" type="text/javascript"></script>
    <script src="departmentUserManager.js" type="text/javascript"></script>
</head>
<body class="easyui-layout">
<!--左边-->
<div id="panel_west" data-options="region:'west',title:'列表',collapsible:true,split:true" style="width:240px;">
    <ul id="tree_left" class="ztree"></ul>
</div>

<div data-options="region:'center',noheader:true," style:"display:none">
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
        </form>
    </div>
</div>

<div id="d_tb_1" style="padding-top: 8px;padding-left:15px;display:none">
    <div style="padding-bottom:5px">
        <a class="easyui-linkbutton btn_add" href="javascript:;" iconCls="icon-add" plain="true">添加</a>
                <span class="updateRecord">
                    <a class="easyui-linkbutton btn_modify" href="javascript:;" iconCls="icon-edit" plain="true">修改</a>
                    <a class="easyui-linkbutton btn_del" href="javascript:;" iconCls="icon-remove" plain="true">删除</a>
                    <a class="easyui-linkbutton btn_resetPassword" href="javascript:;" iconCls="icon-key" plain="true">重置密码</a>
                </span>
        <a href="" class="easyui-linkbutton" iconcls="icon-reload" plain="true">重载</a>
    </div>
    <div>
        <form id="searchForm_1" action="javascript:;">
            <input type="submit" style="display:none" />
            <input name="departmentId" value="0" style="display:none;" />
            用户名:<input name="username" class="easyui-textbox" style="width:120px" />
            昵称:<input name="nickname" class="easyui-textbox" style="width:120px" />
            <a href="javascript:;" class="easyui-linkbutton submit" iconcls="icon-search" plain="true">查询</a>
        </form>
    </div>
</div>


</div>

<!--对话框-->
<div style="display:none">
    <!--主对话框-->
    <div id="dlg" style="width:400px;padding:20px;">
        <form class="mainForm" action="javascript:;">
            <input name="id" value="0" style="display:none;" />
            <input type="submit" style="display:none" />
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

    <!--对话框1-->
    <div id="dlg_1" style="width:400px;padding:20px;">
        <form class="mainForm" action="javascript:;">
            <input name="id" value="0" style="display:none;" />
            <input type="submit" style="display:none" />
            <input name="departmentId" value="0" style="display:none;" />
            <table>
                <tr>
                    <td>
                        用户名:
                    </td>
                    <td>
                        <input name="username" class="easyui-textbox justAddRead" data-options="required:true,missingMessage:'不能为空'" style="width:180px" />
                    </td>
                </tr>

                <tr class="justAddShow">
                    <td>
                        密码:
                    </td>
                    <td>
                        <input name="password" value="888888" readonly="readonly" style="border:none;border-bottom:1px solid gray;width:180px;" />
                    </td>
                </tr>

                <tr>
                    <td>
                        昵称:
                    </td>
                    <td>
                        <input name="nickname" class="easyui-textbox" data-options="required:true,missingMessage:'不能为空'" style="width:180px;" />
                    </td>
                </tr>
                <tr>
                    <td>
                        邮箱:
                    </td>
                    <td>
                        <input name="email" class="easyui-textbox" data-options="validType:'email'" style="width:180px" />
                    </td>
                </tr>

                <tr>
                    <td>
                        性别:
                    </td>
                    <td>
                        <label>
                            <input type="radio" name="sex" value="1" checked="checked" />男
                        </label>

                        <label>
                            <input type="radio" name="sex" value="2" />女
                        </label>
                    </td>
                </tr>

                <tr>
                    <td>角色:</td>
                    <td>
                        <select class="roleCombobox easyui-combobox" data-options="required:true,missingMessage:'不能为空',editable:false,multiple:true" name="roleIds" style="width:180px;"></select>
                    </td>
                </tr>

            </table>
        </form>
    </div>

</div>
</body>

</html>
