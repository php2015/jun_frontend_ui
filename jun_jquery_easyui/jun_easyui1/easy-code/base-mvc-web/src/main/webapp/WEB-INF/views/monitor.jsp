<%@ page contentType="text/html;charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>应用监控</title>
    <link rel="stylesheet" type="text/css" href="./easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="./easyui/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="./easyui/demo/demo.css">
    <script type="text/javascript" src="./easyui/jquery.min.js"></script>
    <script type="text/javascript" src="./easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="./js/monitor.js"></script>
</head>
<body>
    <h2>Basic DataGrid</h2>

    <p>The DataGrid is created from markup, no JavaScript code needed.</p>

    <div style="margin:20px 0;"></div>
    <table id="controllerMonitor" class="easyui-datagrid" title="Controller Monitor" style="height:250px">
        <thead>
            <tr>
                <th data-options="field:'method',width:600">Controller Method</th>
                <th data-options="field:'totalCount',width:100">Total Count (次)</th>
                <th data-options="field:'totalTime',width:100">Total Time (ms)</th>
                <th data-options="field:'avgTime',width:100">Avg Time (ms)</th>
                <th data-options="field:'exceptionCount',width:120">Exception Count (次)</th>
            </tr>
        </thead>
    </table>

    <div style="margin:20px 0;"></div>
    <table id="serviceMonitor" class="easyui-datagrid" title="Service Monitor" style="height:250px">
        <thead>
        <tr>
            <th data-options="field:'method',width:600">Service Method</th>
            <th data-options="field:'totalCount',width:100">Total Count (次)</th>
            <th data-options="field:'totalTime',width:100">Total Time (ms)</th>
            <th data-options="field:'avgTime',width:100">Avg Time (ms)</th>
            <th data-options="field:'exceptionCount',width:120">Exception Count (次)</th>
        </tr>
        </thead>
    </table>

    <div style="margin:20px 0;"></div>
    <table id="daoMonitor" class="easyui-datagrid" title="Dao Monitor" style="height:250px">
        <thead>
            <tr>
                <th data-options="field:'method',width:600">Dao Method</th>
                <th data-options="field:'totalCount',width:100">Total Count (次)</th>
                <th data-options="field:'totalTime',width:100">Total Time (ms)</th>
                <th data-options="field:'avgTime',width:100">Avg Time (ms)</th>
                <th data-options="field:'exceptionCount',width:120">Exception Count (次)</th>
            </tr>
        </thead>
    </table>
</body>
</html>