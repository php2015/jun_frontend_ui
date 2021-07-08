/**
 *系统常量声明
 */
var TPLROOT = './tpls/';//模板根路径
var ROOT = 'http://localhost';//web根路径
var CONTROLLERPATH = './js/controllers/' ;
var IS_LOAD = false ;//页面初始化加载数据，加载过后变成true
var RELOAD_TIME = 50 ;//页面跳转间隔时间
//----------------------------------------------------------------------------------------------------------------------
//导航基础控制器
var layoutCtrl = angular.module('layoutCtrl', ['layoutService','layoutDirective', 'ngCookies', 'ui.router']);
layoutCtrl.controller('baseCtrl', ['$scope', '$cookieStore','$state', function ($scope, $cookieStore,$state) {
    $scope.nav = {};//导航所有属性存放容器
    if ($cookieStore.get('navInfo')) {
        $scope.nav = $cookieStore.get('navInfo');
    }
}]);


//封装angularjs查找dom
function _$(element) {
    return angular.element(element);
}


//数据表格自动改变大小
$(window).resize(function () {
    $('#dg').datagrid('resize');
    setHeight();
});


//页面初始化
window.onload = function () {
    setTimeout(function () {
        setHeight();
    }, 1000);
};


/**
 * 给主体内容加上右边框
 * 点击头部指令也有调用
 */
function setHeight() {
    $('#main').css('min-height', $(window).height() - 120);
}

//缓存加载的js文件
$.ajaxSetup({
    cache: true
});
