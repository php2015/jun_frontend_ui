var $grid = $('#bt_function_grid');
var viewDialog;
var selectedMenuId, selectedMenuText;

context.ready = function() {
    $grid.datagrid({
        fit: true,
        border: false,
        idField:'fid',
        url: _ROOT_ + '/function/getData',
        pagination: true,
        columns: [[
                {checkbox: true},
                {field: 'text', title: '名称', width: 100, align: 'center'},
                {field: 'resources', title: '资源', width: 300},
                {field: 'relegation', title: '归属', width: 150, align: 'center'},
                {field: 'fid', title: '操作', width: 100, align: 'center', formatter: function(value) {
                        return '<span title="编辑" class="img-btn icon-edit" fid=' + value + '></span>';
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
            $bodyView.find('span[fid]').click(function(e) {
                e.stopPropagation();
                var fid = $(this).attr('fid');
                context.updateView(fid);
            });
        }
    });

    $('#bt_function_menu_tree').tree({
        url: _ROOT_ + "/function/menuTree",
        lines: true,
        onSelect: function(node) {
            if (node.attributes.issort == 1) {
                $(this).tree('unSelect', node.target);
            } else {
                $grid.datagrid('load', {mid: node.id});
                $('#bt_function_laout_center').panel('setTitle', '<' + node.text + '> 功能列表');
                selectedMenuId = node.id;
                selectedMenuText = node.text;
            }
        }
    });
};

context.addView = function() {
    if (selectedMenuText) {
        viewDialog = $.dialog({
            title: selectedMenuText + ' 新增功能',
            href: _ROOT_ + '/function/toadd',
            width: 450,
            bodyStyle: {overflow: 'hidden'},
            height: 200,
            buttons: [{
                    text: '提交',
                    handler: context.doSubmit
                }],
            onLoad: function() {
                $('#bt_function_from').find('input[name=mid]').val(selectedMenuId);
            }
        });
    } else {
        $.alert('请先选择对应的菜单！');
    }
};

context.updateView = function(fid) {
    viewDialog = $.dialog({
        title: '编辑功能',
        href: _ROOT_ + '/function/toupdate?fid=' + fid,
        width: 450,
        bodyStyle: {overflow: 'hidden'},
        height: 200,
        buttons: [{
                text: '提交',
                handler: context.doSubmit
            }]
    });
};

context.doSubmit = function() {
    $bt_function_from = $('#bt_function_from');
    if ($bt_function_from.form('validate')) {
        $.post(_ROOT_ + '/function/doSave', $bt_function_from.toJson(), function(rsp) {
            if (rsp.status) {
                $grid.datagrid('reload');
                viewDialog.dialog('close');
            } else {
                $.alert(rsp.msg);
            }
        }, "JSON");
    }
};

context.doDelete = function() {
    var checked = $grid.datagrid('getChecked');
    if (checked && checked.length > 0) {
        $.confirm('确认删除？', function(r) {
            if (r) {
                var ids = [];
                $.each(checked, function() {
                    ids.push(this.fid);
                });
                $.post(_ROOT_ + '/function/doDelete', {ids: ids.join(',')}, function(rsp) {
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