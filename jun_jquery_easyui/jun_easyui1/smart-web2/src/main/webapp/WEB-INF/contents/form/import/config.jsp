<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="wrap-content-dialog" id="form-import-config-wrap">
    <form class="form-horizontal" role="form" id="form-import-config">
        <div class="panel panel-default">
            <div class="panel-heading p-t-8 p-b-8 p-l-4 text-bold">基本信息</div>
            <table class="table table-bordered table-condensed table-sm">
                <tbody>
                <tr>
                    <th class="text-right" style="width: 80px;">绑定表：</th>
                    <td>
                        <div class="col-sm-12 p-l-0 p-r-0">
                            <select name="tableId" id="import-table-id" class="form-control require" data-default-value="${objBean.tableId}">
                                <option class="cnoj-dyn-opt" value="">正在加载数据</option>
                            </select>
                        </div>
                    </td>
                    <th class="text-right" style="width: 80px;">类型：</th>
                    <td>
                        <div class="col-sm-12 p-l-0 p-r-0">
                            <select name="importType" id="import-import-type" class="form-control input-sm require">
                                <option value="excel">Excel类型</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="text-right" style="width: 80px;">分隔符：</th>
                    <td>
                        <div class="col-sm-12 p-l-0 p-r-0">
                            <input type="text" class="form-control input-sm" id="import-separator" data-label-name="表名" name="separator"
                                   placeholder="类型为“Excel”时,此处为空" />
                        </div>
                    </td>
                    <th class="text-right" style="width: 80px;">开始行：</th>
                    <td>
                        <div class="col-sm-12 p-l-0 p-r-0">
                            <input type="text" class="form-control input-sm require" data-format="integer" id="import-start-row" data-label-name="开始行"  name="startRow" value="1" />
                        </div>
                    </td>
                </tr>
                <tr class="bg-color-pd">
                    <td colspan="4">
                        <div class="col-sm-6 p-t-5 p-b-3 p-l-0 p-r-0 color-pd text-bold">配置关联关系</div>
                        <div class="col-sm-6 p-t-5 p-b-3 p-r-5 text-right"><button type="button" class="add-field btn btn-primary btn-xs"><i class="glyphicon glyphicon-plus-sign"></i> 添加</button></div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="seamless-embed-table">
                        <table class="table table-bordered table-condensed table-sm">
                            <thead>
                            <tr class="ui-state-default" style="border: none;">
                                <td style="width: 40px;">序号</td>
                                <td style="width: 250px;">绑定字段</td>
                                <td colspan="2">绑定列</td>
                            </tr>
                            </thead>
                        </table>
                        <div class="table-wrap-limit form-import-config-field">
                            <table class="table table-condensed table-sm">
                                <tbody>
                                    <tr class="tr-tmpl hidden">
                                        <td style="width: 40px;" class="seq-num text-right">0</td>
                                        <td style="width: 250px;">
                                            <div class="col-sm-12 p-l-0 p-r-0">
                                                <select id="bind-field-0" class="cnoj-select bind-field form-control input-sm">
                                                    <option class="cnoj-dyn-opt" value="">正在加载数据</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="col-sm-12 p-l-0 p-r-0">
                                                <input type="text" class="form-control bind-col input-sm require" data-format="num" />
                                            </div>
                                        </td>
                                        <td class="del"></td>
                                    </tr>
                                    <c:if test="${not empty fields}">
                                        <c:forEach var="field" items="${fields }" varStatus="st">
                                            <tr class="config-field">
                                                <td style="width: 40px;" class="seq-num text-right">${st.index+1}</td>
                                                <td style="width: 250px;">
                                                    <div class="col-sm-12 p-l-0 p-r-0">
                                                        <select id="bind-field-${st.index+1}" class="cnoj-select bind-field form-control input-sm" data-default-value="${field.tableFieldId}">
                                                            <option class="cnoj-dyn-opt" value="">正在加载数据</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="col-sm-12 p-l-0 p-r-0">
                                                        <input type="text" class="form-control bind-col input-sm require" data-format="num" value="${field.columnIndex}" />
                                                    </div>
                                                </td>
                                                <td id="del${st.index+1 }">
                                                    <button type="button" title="删除" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </c:if>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div><!-- panel -->
        <div class="text-center p-t-10">
            <button type="button" class="btn btn-primary" id="form-import-config-ok"><i class="glyphicon glyphicon-ok-sign"></i> 确定</button>
        </div>
    </form>
</div>
<script type="text/javascript">
    ////plugins/form/js/form.import.config.js
    setTimeout("loadJs()", 200);
    function loadJs(){
        $(".form-import-config-field").formImportConfigListener({
            rowsCount: ${rowsCount},
            formId: '${formId}'
        });
    }
</script>