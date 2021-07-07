var $grid = $('#bt_dict_grid'), viewDialog, $typeGrid;
context.ready = function() {
    $grid.datagrid({
        fit: true,
        idField: 'did',
        url: _ROOT_ + '/dict/getData',
        pagination: true,
        columns: [[
                {checkbox: true},
                {field: 'dtName', title: '类别', width: 90, align: 'center'},
                {field: 'dtText', title: '显示值', width: 130, align: 'center'},
                {field: 'dtValue', title: '实际值', width: 130, align: 'center'},
                {field: 'isdefault', title: '是否默认', width: 100, align: 'center', formatter: function(value) {
                        if (value === '0') {
                            return '否';
                        }
                        return '<font color="green">是</font>';
                    }},
                {field: 'isdelete', title: '状态', width: 70, align: 'center', formatter: function(value) {
                        if (value === '0') {
                            return '使用中';
                        }
                        return '<font color="red">已删除</font>';
                    }},
                {field: 'did', title: '操作', width: 100, align: 'center', formatter: function(value) {
                        return '<span title="编辑" class="img-btn icon-edit" did=' + value + '></span>';
                    }}
            ]],
        toolbar: [{
                text: '新增',
                iconCls: 'icon-add',
                handler: addView
            }, {
                text: '删除',
                iconCls: 'icon-remove',
                handler: doDelete
            }, '-', {
                text: '类别管理',
                iconCls: 'icon-category',
                handler: typeView
            }],
        onLoadSuccess: function() {
            var $bodyView = $grid.data('datagrid').dc.view2;
            $bodyView.find('span[did]').click(function(e) {
                e.stopPropagation();
                var did = $(this).attr('did');
                updateView(did);
            });
        }
    });
};

var addView = function() {
    viewDialog = $.dialog({
        title: '字典值添加',
        href: _ROOT_ + '/dict/toaddView',
        width: 300,
        bodyStyle: {overflow: 'hidden'},
        height: 200,
        buttons: [{
                text: '提交',
                handler: doSubmit
            }]
    });
};
var updateView = function(did) {
    viewDialog = $.dialog({
        title: '更新字典值',
        href: _ROOT_ + '/dict/toupdateView?did=' + did,
        width: 350,
        bodyStyle: {overflow: 'hidden'},
        height: 200,
        buttons: [{
                text: '提交',
                handler: doSubmit
            }]
    });
};
var doDelete = function() {
    var checked = $grid.datagrid('getChecked');
    if (checked && checked.length > 0) {
        $.confirm('确认删除？', function(r) {
            if (r) {
                var ids = [];
                $.each(checked, function() {
                    ids.push(this.did);
                });
                $.post(_ROOT_ + '/dict/doDelete', {ids: ids.join(',')}, function(rsp) {
                    if (rsp.status) {
                        $grid.datagrid('reload');
                    } else {
                        $.alert(rsp.msg);
                    }
                }, 'JSON');
            }
        });
    }
};

var doSubmit = function() {
    $bt_dict_from = $('#bt_dict_from');
    if ($bt_dict_from.form('validate')) {
        $.post(_ROOT_ + '/dict/doSave', $bt_dict_from.toJson(), function(rsp) {
            if (rsp.status) {
                $grid.datagrid('reload');
                viewDialog.dialog('close');
            } else {
                $.alert(rsp.msg);
            }
        }, "JSON");
    }
};
var typeView = function() {
    viewDialog = $.dialog({
        title: '字典类型管理',
        href: _ROOT_ + '/dict/toTypeView',
        width: 350,
        bodyStyle: {overflow: 'hidden'},
        height: 400,
        onLoad: typeViewOnLoad,
        onBeforeClose: function() {
            var rows = $typeGrid.datagrid('getEditing');
            for (var i = 0; i < rows.length; i++) {
                $typeGrid.datagrid('endEdit', rows[i]);
            }
            rows = $typeGrid.datagrid('getEditing');
            if (rows.length === 0 && $typeGrid.datagrid('getChanges').length) {
                $.confirm("记录已经发生变更,是否提交变更记录?", function(r) {
                    if (r) {
                        doTypeSave();
                    } else {
                        viewDialog.close();
                    }
                });
                return false;
            }
        }
    });
};
var typeViewOnLoad = function() {
    $typeGrid = $('#bt_dict_type_grid');
    $typeGrid.datagrid({
        fit: true,
        border: false,
        fitColumns: true,
        url: _ROOT_ + '/dict/getTypeData',
        columns: [[
                {checkbox: true, field: 'id'},
                {field: 'dtkey', title: '标识', width: 100, align: 'center', editor: {type: 'validatebox', options: {invalidMessage: '该标识已经存在！', required: true,validType: 'remote["' + _ROOT_ + '/dict/validDtkey","dtkey"]'}}},
                {field: 'dtName', title: '名称', width: 100, align: 'center', editor: {type: 'validatebox', options: {required: true}}},
                {field: 'isdelete', title: '状态', width: 70, align: 'center', formatter: function(value) {
                        if (!value) {
                            return '';
                        }
                        if (value === '0') {
                            return '使用中';
                        }
                        return '<font color="red">已删除</font>';
                    }}
            ]],
        toolbar: [{
                text: '新增',
                iconCls: 'icon-add',
                handler: toTypeAdd
            }, {
                text: '删除',
                iconCls: 'icon-remove',
                handler: doTypeDelete
            }, '-', {
                text: '保存',
                iconCls: 'icon-save',
                handler: doTypeSave
            }],
        onDblClickRow: function(rowIndex, rowData) {
            if (rowData.isdelete !== "1") {
                $typeGrid.datagrid('beginEdit', rowIndex);
                var ed = $typeGrid.datagrid('getEditor', {index: rowIndex, field: 'dtkey'});
                $(ed.target).validatebox({validType: 'remote["' + _ROOT_ + '/dict/validDtkey?id=' + rowData.id + '","dtkey"]'}).focus();
            }
        },
        onSelect: function(rowIndex, rowData) {
            if (rowData.isdelete !== "0") {
                $(this).datagrid("unselectRow", rowIndex);
            }
        }
    });
};
var toTypeAdd = function() {
    $typeGrid.datagrid('insertRow', {index: 0, row: {}});
    $typeGrid.datagrid('beginEdit', 0);
    var ed = $typeGrid.datagrid('getEditor', {index: 0, field: 'dtkey'});
    $(ed.target).validatebox({}).focus();
};
var doTypeDelete = function() {
    var rows = $typeGrid.datagrid('getChecked');
    $.each(rows, function() {
        var index = $typeGrid.datagrid('getRowIndex', this);
        $typeGrid.datagrid('deleteRow', index);
    });
};
var doTypeSave = function() {
    var rows = $typeGrid.datagrid('getEditing');
    for (var i = 0; i < rows.length; i++) {
        $typeGrid.datagrid('endEdit', rows[i]);
    }
    rows = $typeGrid.datagrid('getEditing');
    if (rows.length === 0 && $typeGrid.datagrid('getChanges').length) {
        var inserted = $typeGrid.datagrid('getChanges', "inserted");
        var updated = $typeGrid.datagrid('getChanges', "updated");
        var deleted = $typeGrid.datagrid('getChanges', "deleted");
        var effectRow = new Object();
        if (inserted.length) {
            effectRow["inserted"] = JSON.stringify(inserted);
        }
        if (deleted.length) {
            effectRow["deleted"] = JSON.stringify(deleted);
        }
        if (updated.length) {
            effectRow["updated"] = JSON.stringify(updated);
        }

        $.post(_ROOT_ + '/dict/doSaveType', effectRow, function(rsp) {
            if (rsp.status) {
                $.alert("保存成功！");
                $typeGrid.datagrid('acceptChanges');
                $typeGrid.datagrid('reload');
            } else {
                $.alert(rsp.msg);
            }
        }, "JSON");
    }
};