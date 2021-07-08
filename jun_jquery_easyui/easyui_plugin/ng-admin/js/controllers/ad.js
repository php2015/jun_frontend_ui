layout.register.controller('adAdd', ['$scope', function ($scope) {
    $scope.$watch('ad.isFileUp', function (newValue, oldValue) {
        if (newValue == false) {
            $scope.ad.isHref = false;
            $scope.ad.width = '-';
            $scope.ad.height = '-';
        }
    });
}]);
layout.register.controller('adIndex', ['$scope', function ($scope) {
    $('#dg').datagrid({
        fitColumns: true,
        url: './data/advertising.json',
        singleSelect: true,
        columns: [[
            {field: 'name', title: '广告位名称', width: 100},
            {field: 'isFileUp', title: '图片上传', width: 100,formatter:function(v,r,i){
                return v ? '开启' : '<code>关闭</code>' ;
            }},
            {field: 'isHref', title: '广告位链接', width: 100,formatter:function(v,r,i){
                return v ? '开启' : '<code>关闭</code>' ;
            }},
            {field: 'width', title: '宽度限制', width: 100,formatter:function(v,r,i){
                return v ? v : '<code>不限制</code>' ;
            }},
            {field: 'height', title: '高度限制', width: 100,formatter:function(v,r,i){
                return v ? v : '<code>不限制</code>' ;
            }},
            {field: 'desc', title: '广告位描述', width: 100},
            {field: 'id', title: '操作', width: 100, formatter: function (v, r, i) {
                return '<a  href="#/advertising/add/' + r.id + '" class="btn btn-default btn-xs">编辑</a>';
            }}
        ]]
    });
}]);
