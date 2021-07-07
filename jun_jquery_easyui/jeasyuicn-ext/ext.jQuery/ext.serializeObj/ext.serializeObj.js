/**
 * @author ____′↘夏悸
 * 
 * 将form表单元素的值序列化成对象
 * 
 * @returns object
 */
 (function(){
	 $.fn.serializeObj = function() {
		var o = {},arrayObj = this.serializeArray();
		$.each(arrayObj, function(index) {
			if (o[this['name']]) {
				o[this['name']] = o[this['name']] + "," + this['value'];
			} else {
				o[this['name']] = this['value'];
			}
		});
		return o;
	};
 })(jQuery);
