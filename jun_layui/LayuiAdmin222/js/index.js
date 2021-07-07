layui.config({
    base: 'js/'
}).extend({
    'navbar' : 'navbar'
});
layui.use(['element','navbar'],function(){
    var element = layui.element,
        navbar  = layui.navbar;
    // 顶部导航栏渲染
    navbar.render({
        data: [{
            icon : 'fa-envelope-o',
            badge : 'layui-bg-blue',
            badgeTitle: 9
        },{
            icon : 'fa-bell-o',
            badgeTitle: 6
        },{
            title : '管理人员',
            children : [{
                title : '密码修改',
                layId : 'password',
                layUrl : 'page/password.html'
            },{
                title : '退出'
            }]
        }]
    });
    // 侧边导航栏渲染
    navbar.render({
        filter : 'side',
        data : [{
            title : '组件文档',
            icon : 'fa-bars',
            children : [{
                title : '主题',
                icon : 'fa-bank',
                layId : 'theme',
                layUrl : 'page/theme-document.html'
            },{
                title : '导航',
                icon : 'fa-bar-chart',
                layId : 'navbar',
                layUrl : 'page/navbar-document.html'
            }]
        },{
            title : '页面',
            icon : 'fa-bars',
            children : [{
                title : '列表',
                icon : 'fa-list',
                layId : 'list',
                layUrl : 'page/list.html'
            },{
                title : '404页面',
                icon : 'fa-tasks',
                layId : 'found',
                layUrl : 'page/not-found.html'
            },{
                title : '登陆页面',
                icon : 'fa-send',
                layId : 'login',
                layUrl : 'page/login.html'
            }]
        }]
    });
    navbar.init();
});