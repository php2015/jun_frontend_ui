var $grid = $('#bt_role_grid'), $rigthGrid = $('#bt_role_right_grid'), $userGrid = $('#bt_role_user_grid');
var viewDialog, rid, grantTree, $chooseuserGrid;

context.ready = function() {
    $grid.datagrid({
        fit: true,
        border: false,
        url: _ROOT_ + '/role/getData',
        pagination: true,
        columns: [[
                {checkbox: true},
                {field: 'text', title: '名称', width: 150, align: 'center'},
                {field: 'remark', title: '备注', width: 200},
                {field: 'status', title: '状态', width: 100, align: 'center', formatter: function(value) {
                        if (value === '0') {
                            return '可用';
                        }
                        return '<font color="red">禁用</font>';
                    }},
                {field: 'rid', title: '操作', width: 100, align: 'center', formatter: function(value) {
                        return '<span title="编辑" class="img-btn icon-edit" kid=' + value + '></span>';
                    }}
            ]],
        toolbar: [{
                text: '新增',
                iconCls: 'icon-add',
                handler: context.addView
            }, {
                text: '删除',
                iconCls: 'icon-remove',
                handler: context.doDelete
            }],
        onLoadSuccess: function() {
            var $bodyView = $grid.data('datagrid').dc.view2;
            $bodyView.find('span[kid]').click(function(e) {
                e.stopPropagation();
                var id = $(this).attr('kid');
                context.updateView(id);
            });
        },
        onClickRow: function(rowIndex, rowData) {
            if (rid && rid === rowData.rid) {
                return;
            }
            var $layout = $('#bt_role_layout');
            var south = $layout.layout('panel', 'south');
            if (south.panel('options').collapsed) {
                $layout.layout('expand', 'south');
            }

            rid = rowData.rid;
            grantTree.tree({
                url: _ROOT_ + '/role/getRightData?rid=' + rid,
                checkbox: true,
                lines: true
            });

            $userGrid.datagrid({
                url: _ROOT_ + '/role/getUserData',
                queryParams: {rid: rid}
            });
        }
    });

    $rigthGrid.datagrid({
        fit: true,
        border: false,
        showHeader: false,
        toolbar: [{
                text: '授权',
                iconCls: 'icon-add',
                handler: context.toGrant
            }, {
                text: '解除',
                iconCls: 'icon-remove',
                handler: context.unGrant
            }]
    });
    grantTree = $('<ul/>');
    $('#bt_role_right_grid').data().datagrid.dc.body2.append(grantTree);

    $userGrid.datagrid({
        fit: true,
        border: false,
        pagination: true,
        columns: [[
                {checkbox: true},
                {field: 'uname', title: '姓名', width: 150},
                {field: 'account', title: '账号', width: 150},
                {field: 'mail', title: '邮箱', width: 150}
            ]],
        toolbar: [{
                text: '新增',
                iconCls: 'icon-add',
                handler: context.addRoleUserView
            }, {
                text: '删除',
                iconCls: 'icon-remove',
                handler: context.doDeleteUser
            }]
    });
};

context.addView = function() {
    viewDialog = $.dialog({
        title: '新增角色',
        href: _ROOT_ + '/role/toadd',
        width: 450,
        bodyStyle: {overflow: 'hidden'},
        height: 200,
        buttons: [{
                text: '提交',
                handler: context.doSubmit
            }]
    });
};

context.addRoleUserView = function() {
    viewDialog = $.dialog({
        title: '角色添加用户',
        href: _ROOT_ + '/common/chooseUser',
        width: 550,
        bodyStyle: {overflow: 'hidden'},
        height: 300,
        buttons: [{
                text: '确认添加',
                handler: context.doAddUserSubmit
            }],
        onLoad: function() {
           setTimeout(function() {
                $chooseuserGrid = BT.common.chooseuser.chooseuserGrid;
                $chooseuserGrid.datagrid({url: _ROOT_ + '/role/getadduserData?rid=' + rid});
            }, 100);
        }
    });
};

context.doSubmit = function() {
    $bt_role_from = $('#bt_role_from');
    if ($bt_role_from.form('validate')) {
        $.post(_ROOT_ + '/role/doSave', $bt_role_from.toJson(), function(rsp) {
            if (rsp.status) {
                $grid.datagrid('reload');
                viewDialog.dialog('close');
            } else {
                $.alert(rsp.msg);
            }
        }, "JSON");
    }
};

context.doAddUserSubmit = function() {
    var checked = $chooseuserGrid.datagrid('getChecked');
    if (checked && checked.length > 0) {
        var ids = [];
        $.each(checked, function() {
            ids.push(this.uid);
        });
        $.post(_ROOT_ + '/role/doAddRoleUser', {rid: rid, uids: ids.join(',')}, function(rsp) {
            if (rsp.status) {
                $userGrid.datagrid('reload');
                viewDialog.dialog('close');
            } else {
                $.alert(rsp.msg);
            }
        }, 'JSON');
    } else {
        $.alert('没有选择任何用户！');
    }
};

context.updateView = function(id) {
    viewDialog = $.dialog({
        title: '编辑角色',
        href: _ROOT_ + '/role/toupdate?rid=' + id,
        width: 450,
        bodyStyle: {overflow: 'hidden'},
        height: 200,
        buttons: [{
                text: '提交',
                handler: context.doSubmit
            }]
    });
};

context.doDelete = function() {
    var checked = $grid.datagrid('getChecked');
    if (checked && checked.length > 0) {
        $.confirm('确认删除？', function(r) {
            if (r) {
                var ids = [];
                $.each(checked, function() {
                    ids.push(this.rid);
                });
                $.post(_ROOT_ + '/role/doDelete', {ids: ids.join(',')}, function(rsp) {
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

context.doDeleteUser = function() {
    var checked = $userGrid.datagrid('getChecked');
    if (checked && checked.length > 0) {
        $.confirm('确认删除？', function(r) {
            if (r) {
                var ids = [];
                $.each(checked, function() {
                    ids.push(this.uid);
                });
                $.post(_ROOT_ + '/role/doDeleteRoleUser', {rid: rid, ids: ids.join(',')}, function(rsp) {
                    if (rsp.status) {
                        $userGrid.datagrid('reload');
                    } else {
                        $.alert(rsp.msg);
                    }
                }, 'JSON');
            }
        });
    }
};

context.toGrant = function() {
    if (rid) {
        viewDialog = $.dialog({
            title: '授权',
            href: _ROOT_ + '/role/togrant?rid=' + rid,
            width: 350,
            height: 400,
            buttons: [{
                    text: '确认',
                    handler: context.doGrant
                }]
        });
    }
};

context.doGrant = function() {
    $tree = $('#bt_role_right_tree');
    var checked = $tree.tree('getChecked');
    var indeterminate = $tree.tree('getChecked', 'indeterminate');
    var checkData = $.merge(checked, indeterminate);
    var gids = [];
    $.each(checkData, function() {
        if (this.id) {
            gids.push(this.id);
        }
    });
    $.post(_ROOT_ + 'role/doGrant', {rid: rid, gids: gids.join(',')}, function(rsp) {
        if (rsp.status) {
            grantTree.tree('reload');
            viewDialog.dialog('close');
        } else {
            $.alert(rsp.msg);
        }
    }, 'JSON');
};

context.unGrant = function() {
    var checked = grantTree.tree('getChecked');
    if (checked && checked.length > 0) {
        $.confirm('确认要解除这组授权？', function(r) {
            if (r) {
                var tids = [];
                $.each(checked, function() {
                    tids.push(this.id);
                });

                $.post(_ROOT_ + 'role/doUnGrant', {tids: tids.join(',')}, function(rsp) {
                    if (rsp.status) {
                        grantTree.tree('reload');
                    } else {
                        $.alert(rsp.msg);
                    }
                }, 'JSON');
            }
        });
    }
};