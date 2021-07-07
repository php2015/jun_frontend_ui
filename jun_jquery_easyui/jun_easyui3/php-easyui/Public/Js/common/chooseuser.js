var $grid = $('#bt_common_chooseuser_user_grid');

context.chooseuserGrid = $grid;

context.ready = function() {
    $grid.datagrid({
        fit: true,
        border: false,
        pagination: true,
        idField: 'uid', //设定id列，以此支持翻页后能保存之前页的选中项
        columns: [[
                {checkbox: true},
                {field: 'uname', title: '姓名', width: 150},
                {field: 'account', title: '账号', width: 150},
                {field: 'mail', title: '邮箱', width: 150}
            ]]

    });
    //绑定用户查询按钮事件
    $('#bt_common_chooseuser_user_grid_seachBtn').click(function() {
        $grid.datagrid('load', $(this).closest('form').toJson());
    });
};