<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/inc/_header.jsp"%>
    <script src="roleManager2.js" type="text/javascript"></script>
</head>
<body class="easyui-layout">

<!--左边-->
<div id="panel_west" data-options="region:'west',title:'列表',collapsible:true,split:true" style="width:240px;">
    <ul id="tree_left" class="ztree"></ul>
</div>

<div id="panel_center" data-options="region:'center',split:true">
    <table id="dg">
    </table>
    <%--<ul id="tree_center" class="ztree"></ul>--%>
</div>


<div style="display:none;">
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
</div>
</body>
</html>
