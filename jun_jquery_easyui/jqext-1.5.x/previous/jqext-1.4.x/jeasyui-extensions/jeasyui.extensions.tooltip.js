/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI tooltip Extensions
* jQuery EasyUI tooltip 组件扩展
* jeasyui.extensions.tooltip.js
* 二次开发 流云
* 最近更新：2015-03-13
*
* 依赖项：jquery.jdirk.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.tooltip.extensions");





     
    var defaults = $.fn.tooltip.extensions.defaults = {

        // 增加 easyui-tooltip 的自定义扩展事件；该属性表示当鼠标移开 easyui-tooltip 控件时，是否自动对其执行 destroy 操作以释放 DOM 资源。
        // boolean 类型值，默认为 false。
        autoDestroy: false
    };

    var methods = $.fn.tooltip.extensions.methods = {};

    $.extend($.fn.tooltip.defaults, defaults);
    $.extend($.fn.tooltip.methods, methods);

})(jQuery);