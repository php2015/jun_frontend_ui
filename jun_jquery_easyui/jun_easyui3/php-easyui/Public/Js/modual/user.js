var $grid = $('#bt_user_grid');
var viewDialog;

context.ready = function() {
    $grid.datagrid({
        fit: true,
        border: false,
        url: _ROOT_ + '/user/getData',
        pagination: true,
        columns: [[
                {checkbox: true},
                {field: 'account', title: '账号', width: 100, align: 'center'},
                {field: 'uname', title: '姓名', width: 100, align: 'center'},
                {field: 'mail', title: '邮箱', width: 200, align: 'center'},
                {field: 'createTime', title: '创建时间', width: 150, align: 'center', sortable: true},
                {field: 'updateTime', title: '更新时间', width: 150, align: 'center', sortable: true},
                {field: 'uid', title: '操作', width: 100, align: 'center', formatter: function(value) {
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
                var uid = $(this).attr('kid');
                context.updateView(uid);
            });
        }
    });

    $('#bt_user_search_btn').click(function() {
        $grid.datagrid('load', $('#bt_user_search_from').toJson());
    });
};

context.addView = function() {
    viewDialog = $.dialog({
        title: '新增用户',
        href: _ROOT_ + '/user/toadd',
        width: 450,
        height: 170,
        bodyStyle: {overflow: 'hidden'},
        buttons: [{
                text: '提交',
                handler: context.doSubmit
            }]
    });
};

context.updateView = function(uid) {
    viewDialog = $.dialog({
        title: '编辑用户',
        href: _ROOT_ + '/user/toUpdate?uid=' + uid,
        width: 450,
        height: 170,
        bodyStyle: {overflow: 'hidden'},
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
                    ids.push(this.uid);
                });
                $.post(_ROOT_ + '/user/doDelete', {ids: ids.join(',')}, function(rsp) {
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

context.doSubmit = function() {
    $bt_user_from = $('#bt_user_from');
    if ($bt_user_from.form('validate')) {
        $.post(_ROOT_ + '/user/doSave', $bt_user_from.toJson(), function(rsp) {
            if (rsp.status) {
                $grid.datagrid('reload');
                viewDialog.dialog('close');
            } else {
                $.alert(rsp.msg);
            }
        }, "JSON");
    }
};