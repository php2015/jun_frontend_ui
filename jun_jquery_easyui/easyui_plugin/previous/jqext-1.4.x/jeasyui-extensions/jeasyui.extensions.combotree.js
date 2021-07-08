/**
* jQuery EasyUI 1.4.2
* Copyright (c) 2010-2015 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI ComboTre Extensions
* jQuery EasyUI combotree 组件扩展
* jeasyui.extensions.combotree.js
* 二次开发 流云
* 最近更新：2015-06-12
*
* 依赖项：
*   1、jquery.jdirk.js
*   2、jeasyui.extensions.js
*   3、jeasyui.extensions.linkbutton.js
*   4、jeasyui.extensions.validatebox.js
*   5、jeasyui.extensions.textbox.js
*   6、jeasyui.extensions.combo.js
*   7、jeasyui.extensions.menu.js
*   8、jeasyui.extensions.panel.js
*   9、jeasyui.extensions.window.js
*  10、jeasyui.extensions.dialog.js
*
* Copyright (c) 2013-2015 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.fn.combotree.extensions");


    var methods = $.fn.combotree.extensions.methods = {
    };

    var defaults = $.fn.combotree.extensions.defaults = $.extend({}, $.fn.tree.extensions.defaults, {
    });

    $.extend($.fn.combotree.methods, methods);
    $.extend($.fn.combotree.defaults, defaults);

})(jQuery);