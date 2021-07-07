angular.module('setHttp', [], function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});

angular.module('layoutService', ['setHttp'])
    .service('post', ['$http', function ($http) {
        /**
         * post数据到后台，
         * @param data 提交的数据
         * @param url 提交的地址
         * @param fun 回调函数
         */
        return function (data, url, fun) {
            $http.post(url, data).success(function (r) {
                fun(r);
            }).error(function (r) {
                console.log(r);
            })
        };
    }])
    .service('gets',["$http",function($http){
        /**
         * 从后台获取数据
         * @param url 获取的地址
         * @param fun 回调函数
         */
        return function(url,fun){
            $http.get(url).success(function(r){
                fun(r);
            }).error(function(r){
                console.log(r);
            });
        }
    }]);
