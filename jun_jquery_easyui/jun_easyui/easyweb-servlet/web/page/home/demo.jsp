<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/inc/_header.jsp"%>
</head>
<body>



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

<script>
    function Dg(){
        this.init = Dg_Method.init;
        this.getColumns = function () {
            var columns = new Array();
            columns.push(
                    { field: "id", title: "ID", hidden: false, checkbox: true },
                    { field: "name", title: "名称", width: 200 },
                    { field: "value", title: "值", width: 200 },
                    { field: "comment", title: "说明", width: 200 }
            );
            return columns;
        };
    }

    $(function(){
        var dg = new Dg();
        dg.init();
    })

</script>


</body>
</html>
