/**
 * Created by Administrator on 2015/3/15.
 */
angular.module('layoutDirective', ['layoutFactory'])
    //总导航控制指令 ,点击横向导航，显示纵向导航
    .directive('nav', function ($timeout, $cookieStore, $cookies) {
        return {
            link: function (scope, element, attr) {
                if (attr.nav == 'init') {
                    alert('init 为初始化变量，您不能使用');
                }
                ////初始化一个导航显示
                //if (scope.nav.init == false) {
                //    scope.nav.init = true;
                //    scope.nav[attr.nav] = true;
                //}
                element.bind('click', function () {
                    angular.forEach(scope.nav, function (item, key) {
                        scope.nav[key] = false;
                    });
                    $timeout(function () {
                        scope.nav[attr.nav] = true;
                        //记录导航状态
                        $cookieStore.put('navInfo', scope.nav);
                        //设置主体右边框
                        setHeight();
                    });
                });
            }
        }
    }
)
    //点击纵向导航增加当前样式
    .directive('navList', function () {
        return {
            link: function (scope, element, attr) {
                element.find('a').bind('click', function () {
                    _$(this).parent('div').find('a').removeClass('active');
                    _$(this).addClass('active');
                });
            },
            templateUrl: TPLROOT + 'public/nav_list.html'
        }
    })
    //重复值验证，调用格式 repeatpwd=“formName.inputName” 【repeatpwd=“表单name.输入框name”】
    .directive('repeatval', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var tageCtrl = scope.$eval(attrs.repeatval);
                tageCtrl.$parsers.push(function (viewValue) {
                    ctrl.$setValidity('repeatval', viewValue == ctrl.$viewValue);
                    return viewValue;
                });
                ctrl.$parsers.push(function (viewValue) {
                    if (viewValue == tageCtrl.$viewValue) {
                        ctrl.$setValidity('repeatval', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('repeatval', false);
                        return undefined;
                    }
                });
            }
        };
    })
    //表单验证指令，调用格式 form-check="obj" [obj 是 $scope下面的一个对象]
    .directive('formCheck', function (form, $timeout) {
        return {
            link: function (scope, element, attrs) {
                var info = {};//存放验证信息
                //验证属性配置
                var validate = ['required', 'ng-required', 'ng-minlength', 'ng-maxlength', 'pattern', 'ng-pattern', 'repeatval', 'min', 'max'];
                var not_types = ['button', 'hidden', 'submit', 'reset'];
                //循环记录验证属性
                angular.forEach(element[0], function (item) {
                    var i_name = _$(item)[0].localName;//输入框标签名称
                    var i_type = _$(item).attr('type');//输入框type
                    if ($.inArray(i_type, not_types) != -1 || i_name == 'button') return; //按钮隐藏域跳过
                    //循环验证属性，取得设置的验证值
                    var tmp = {};
                    for (var i = 0, len = validate.length; i < len; i++) {
                        var attr_value = _$(item).attr(validate[i]);
                        if (attr_value == undefined || attr_value == 'undefined') continue;
                        //分割验证属性ng-minlength 变成 minlength
                        var check_type = validate[i].split('-');
                        check_type = (check_type.length > 1) ? check_type[1] : check_type[0];
                        tmp[check_type] = attr_value;
                    }
                    tmp['name'] = _$(item).parent('div.form-group').find('label').text();
                    info[_$(item).attr('name')] = tmp;
                });
                var formName = attrs.name;//表单Name
                //监听表单对象，启动验证
                scope.$watch(attrs.formCheck, function (newValue, oldValue) {
                    if (newValue == oldValue) return false;
                    scope.info = form.check(info, scope[formName]);
                }, true);
                console.log('如果写了验证规则，不起作用，请检查是否给表单赋值了ng-model,设置格式为 [obj.input]。label不边颜色，请查看label是否加了control-label');
            }
        }
    })
    //动态加载控制器，显示加载中GIF动画
    .directive('route', function ($state) {
        return {
            controller: function ($scope, $timeout) {
                $scope.routers = {
                    /**
                     * 加载文件
                     * @param files 需要加载的文件数组
                     * @param url 加载完成后跳转的URL地址
                     */
                    include: function (files, url) {
                        var This = this;
                        for (var i = 0, len = files.length; i < len; i++) {
                            (function (file) {
                                var path = CONTROLLERPATH + file + '.js';
                                $.getScript(path)
                                    .done(function (script, textStatus) {//加载成功
                                        This.jump(url);
                                        This.loades.push(file);//已经加载过的文件存放，下次不再加载
                                    })
                                    .fail(function (jqxhr, settings, exception) {//加载失败
                                        $state.go('/.empty');
                                    });
                            })(files[i]);
                        }
                    },
                    /**
                     * 获取要加载的文件列表
                     * @param route 当前点击的路由
                     * @returns {Array}
                     */
                    getincludes: function (route) {
                        var views = route.views;
                        var files = [];
                        for (var k in views) {
                            var file = views[k].file;
                            if($.isArray(file)){
                                for(var i = 0,len = file.length ; i < len ; i++ ){
                                    if ($.inArray(file[i], this.loades) == -1 && file[i] != undefined && file[i] != 'undefined') {
                                        files.push(file[i]);
                                    }
                                }
                            }else{
                                if ($.inArray(file, this.loades) == -1 && file != undefined && file != 'undefined') {
                                    files.push(file);
                                }
                            }

                        }
                        return files;
                    },
                    /**
                     * 页面跳转
                     * @param url 需要跳转的地址
                     */
                    jump: function (url) {
                        $timeout(function () {
                            $state.go(url);
                        }, RELOAD_TIME);
                    },
                    loades: [],//已经加载过的文件存放，
                    /**
                     * 加载文件，页面跳转
                     * @param url 路由地址
                     */
                    init : function(url){
                        $state.go('/.loading');
                        var includes = this.getincludes($state.get(url));
                        if (includes.length > 0) {
                            this.include(includes, url);
                        } else {
                            this.jump(url);
                        }
                    },
                    //页面刷新加载控制器
                    windowOnLoad:function(){
                        var reg = /#\/.*/g;
                        var url = window.location.href.match(reg)[0];
                        url = url.substring(2,url.length);
                        urls = url.split('/');
                        var resUrl = '/' ;
                        for(var i = 0,len=urls.length;i<len;i++){
                            if(urls[i]){
                                resUrl += '.' + urls[i] ;
                            }
                        }
                        this.init(resUrl);
                    },
                    bind : function(element,attrs){
                        element.css('cursor', 'pointer');
                        element.bind('click', function () {
                            var reg = new RegExp($state.href(attrs.route) + '$', 'gi');//当前点击的路由地址
                            //如果点击的地址和地址栏相同，则返回，不进行任何操作
                            if (reg.test(window.location.href)) {
                                return;
                            } else {
                                $scope.routers.init(attrs.route)
                            }
                        });
                    }
                }
            },
            link: function (scope, element, attrs) {
                if(IS_LOAD==false){//页面刷新加载控制器
                    scope.routers.windowOnLoad();
                    IS_LOAD = true ;
                }
               scope.routers.bind(element,attrs);
            }
        }
    });