var layout = angular.module('layout', ['ui.router', 'layoutCtrl']);
var global = null;
layout.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    layout.register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };
});

layout.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("index");
    $stateProvider
        .state('/', {
            url: '/',
            views: {
                '': {templateUrl: TPLROOT + 'public/body.html'},
                'header@/': {templateUrl: TPLROOT + 'public/header.html'},
                'main@/': {templateUrl: TPLROOT + 'public/main.html'},
                'left@/': {templateUrl: TPLROOT + 'index.html'},
                'right@/': {templateUrl: TPLROOT + 'public/nav_list.html'}
            }
        })
        .state('/.index', {
            url: 'index',
            views: {
                'main@/': {templateUrl: TPLROOT + 'index.html'}
            }
        })
        .state('/.user', {
            url: 'user',
            views: {
                'left@/': {templateUrl: TPLROOT + 'user/index.html', controller:'userIndex', file:['user']}
            }
        })
        .state('/.user.add', {
            url: '/add/:id',
            views: {
                'left@/': {templateUrl: TPLROOT + 'user/add.html', controller: 'userAdd', file: ['user']}
            }
        })
        .state('/.system', {
            url: 'system',
            views: {
                'left@/': {templateUrl: TPLROOT + 'system/index.html', controller: 'setSystem', file: ['system']}
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: TPLROOT + 'public/login.html'
        })
        .state('/.advertising', {
            url: 'advertising',
            views: {
                'left@/': {templateUrl: TPLROOT + 'system/advertising.html',controller:'adIndex',file:['ad']}
            }
        })
        .state('/.advertising.add', {
            url: '/add/:id',
            views: {
                'left@/': {templateUrl: TPLROOT + 'system/advertising_add.html', controller: 'adAdd',file:['ad']}
            }
        })
        .state('/.empty', {
            url: 'empty',
            views: {
                'left@/': {templateUrl: TPLROOT + 'public/404.html'}
            }
        })
        .state('/.loading', {
            url: 'loading',
            views: {
                'left@/': {templateUrl: TPLROOT + 'public/loading.html'}
            }
        });

});

