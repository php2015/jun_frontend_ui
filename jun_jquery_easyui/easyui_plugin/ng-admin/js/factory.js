var lf = angular.module('layoutFactory', []);
lf.factory('form', function ($timeout) {
    return {
        //验证的结果
        result: {},
        /**
         * 根据验证状态返回表单颜色className
         * @param obj 当前验证的表单对象
         * @returns {string}
         */
        color: function (obj) {
            if (!obj.$pristine) {
                return obj.$valid == true ? 'has-success' : 'has-error';
            } else {
                return 'has-warning';
            }
        },
        /**
         * 根据验证状态返回表单图标className
         * @param className
         * @returns {string}
         */
        icon: function (className) {
            var obj = {
                'has-warning': 'glyphicon-warning-sign',
                'has-success': 'glyphicon-ok',
                'has-error': 'glyphicon-remove'
            };
            return obj[className];
        },
        message: {
            'required': '请输入%name%',
            'minlength': '请输入最少 %num% 个字符的%name%',
            'maxlength': '请输入最多 %num% 个字符的%name%',
            'pattern': '请输入正确格式的%name%',
            'repeatval': '同  %target% 输入不一致',
            'email': '请输入正确的邮箱格式',
            'number': '%name%请输入数字',
            'min': '%name%不能小于 %num% ',
            'max': '%name%不能大于 %num% '
        },
        /**
         * 根据一个表单刚才输入的值，返回错误信息，
         * @param input 当前验证的表单状态对象
         * @param inputName 当前验证的表单name
         * @returns {string}
         */
        getMsg: function (input, inputName) {
            for (var checkType in input) {
                if (input[checkType]) {
                    var i = this.result[inputName];
                    var msg = this.message[checkType];
                    var tmp = msg.replace(/%num%/, i[checkType]);
                    if (checkType == 'repeatval') {
                        var formText = this.result[i[checkType].split('.')[1]].name;
                        tmp = tmp.replace(/%target%/, formText);
                    }
                    return tmp.replace(/%name%/, i['name']);
                }
            }
            return '';
        },
        /**
         * 根据验证状态返回表单图标className
         * @param className
         * @returns {string}
         */
        getMsgColor: function (className) {
            var obj = {
                'has-warning': 'text-warning',
                'has-success': 'text-success',
                'has-error': 'text-danger'
            };
            return obj[className];
        },
        /**
         * 表单验证
         * @param info 页面需要验证的表单信息
         * @param form angular 表单验证对象
         * @returns Object
         */
        check: function (info, form) {
            this.result = info;
            for (var iName in info) {
                if (iName == 'undefined' || iName == undefined) continue;
                if (form[iName] == undefined || form[iName] == 'undefined') continue;
                this.result[iName]['color'] = this.color(form[iName]);
                this.result[iName]['icon'] = this.icon(this.result[iName]['color']);
                this.result[iName]['msg'] = this.getMsg(form[iName].$error, iName);
                this.result[iName]['msgColor'] = this.getMsgColor(this.result[iName]['color']);
            }
            return this.result;
        }
    };
}).factory('find', function () {
    return {
        /**
         *根据2个对象找不同的key
         * @param newObj 值产生变化的新对象
         * @param oldObj 值没有变化的旧对象
         * @returns {string} 不同的key
         */
        key: function (newObj, oldObj) {
            if (newObj == undefined) {
                return false;
            }
            var keys = [];
            for (var k in newObj) {
                keys.push(k);
            }
            if (oldObj == undefined) {
                return keys[0];
            }
            for (var i = 0, len = keys.length; i < len; i++) {
                if (newObj[keys[i]] !== oldObj[keys[i]]) {
                    return keys[i];
                }
            }
        }
    };
});
