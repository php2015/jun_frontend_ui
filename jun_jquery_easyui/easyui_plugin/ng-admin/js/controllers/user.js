layout.register.controller('userAdd', ['$scope', 'post', '$stateParams', function ($scope, post, $stateParams) {
    console.log($stateParams.id);//路由参数
    $scope.save = function () {
        post($scope.user, ROOT + '/hr/home/public/test', function (res) {
            if (res)  $scope.routers.jump('/.user');
        });
    }
}]);
layout.register.controller('userIndex', ['$scope', function ($scope) {
    $('#dg').datagrid({
        fitColumns: true,
        url: './data/user.json',
        //data: data,
        singleSelect: true,
        columns: [[
            {field: 'name', title: '姓名', width: 100},
            {field: 'age', title: '年龄', width: 100},
            {field: 'sex', title: '性别', width: 100},
            {
                field: 'id', title: '操作', width: 100, formatter: function (v, r, i) {
                return '<a href="#user/add/' + r.id + '" class="btn btn-default btn-xs">编辑</a>';
            }
            }
        ]]
    });


}]);

