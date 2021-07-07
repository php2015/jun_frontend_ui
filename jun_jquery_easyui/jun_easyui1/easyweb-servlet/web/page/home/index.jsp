<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/inc/_header.jsp"%>
    <link href="/css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="index.js"></script>
    <style type="text/css">
        a:hover {
            color: #000000; /*鼠标经过颜色*/
        }

        .accordion-header > .panel-title {
            padding-left: 15px;
        }

        .mylistbt a {
            border: none;
            background: #fff;
            font-weight: bold;
            width: 190px;
            text-align: left;
            padding-left: 10px;
            border: 1px solid #fff;
        }

        h1 {
            font-size: 28px;
        }

        .ztree li {
            padding: 0;
            margin: 0;
            list-style: none;
            line-height: 14px;
            text-align: left;
            white-space: nowrap;
            outline: 0;
        }
    </style>

</head>
<body class="easyui-layout">
<div data-options="region:'north',border:false" style="height: 90px; background: #efefef;">
    <div class="easyui-layout" data-options="fit:true" style="background: #ccc;">
        <div data-options="region:'center'" style="background: url(/images/topbg.gif) repeat-x;">
            <div class="topleft">
                <a href="Index.html" target="_parent">
                    <img src="/images/logo.png" title="系统首页" />
                </a>
            </div>
            <div class="topright">
                <ul>
                    <li id="username"><a href="javascript:(0)">&nbsp;&nbsp;</a></li>
                    <li><a href="#" onclick="modifyPass();">修改密码</a></li>
                    <li><a href="/system/user.do?action=logout" target="_parent">退出</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div id="mymenu" data-options="region:'west',split:true" title="菜单导航" style="width: 230px; overflow-y:auto;overflow-x:hidden;">
    <ul class="ztree" id="tree"></ul>
</div>

<div id="mainPanle" region="center" border="false">
    <div id="tabs" class="easyui-tabs" fit="true" border="false">

    </div>
</div>
<div style="display:none">

    <!-- 树菜单 -->
    <div id="treeMenu" class="easyui-menu" style="width: 120px; display: none">
        <div onclick="expand()" iconCls="icon-add">展开</div>
        <div onclick="collapse()" iconCls="icon-remove">收缩</div>
        <div class="menu-sep"></div>
        <div onclick="expandAll()" iconCls="icon-add">展开所有</div>
        <div onclick="collapseAll()" iconCls="icon-remove">收缩所有</div>
        <div class="menu-sep"></div>
        <div onclick="newWin()" data-options="iconCls:'icon-redo'">新标签打开</div>
    </div>

    <!-- 选项卡菜单 -->
    <div id="tabsMenu" class="easyui-menu" style="width: 120px; display: none">
        <div name="close" iconCls="icon-cancel">关闭</div>
        <div class="menu-sep"></div>
        <div name="Other" iconCls="icon-cancel">关闭其它</div>
        <div name="All" iconCls="icon-cancel">关闭所有</div>
    </div>

</div>

</body>
</html>
