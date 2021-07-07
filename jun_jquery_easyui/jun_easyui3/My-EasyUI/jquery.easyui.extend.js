/***********************************************************************
* 修改日期：2013-7-29 // 2015-3-5
**********************************************************/

var root_url='',app_url='',mod_url='';

//$(document).ready(function(){
	
	// 2015-3-5 Kant 扩展改写setValue方法
	$.extend($.fn.datagrid.defaults.editors.combobox, {
		getValue : function(jq) {
			var opts = $(jq).combobox('options');
			if(opts.multiple){
				var values = $(jq).combobox('getValues');
				if(values.length>0){
					if(values[0]==''||values[0]==' '){
						return values.join(',').substring(1);//新增的时候会把空白当成一个值了，去掉
					}
				}
				return values.join(',');
			}
			else
				return $(jq).combobox('getValue');
		},
        setValue : function(jq, value) {
			var opts = $(jq).combobox('options');
			if(opts.multiple && value.indexOf(opts.separator)!=-1){//多选且不只一个值
				var values = value.split(opts.separator);
				$(jq).combobox("setValues", values);
			}else{
				$(jq).combobox("setValue", value);
			}
		}
	});

	// 2013-7-29
	$.extend($.fn.validatebox.defaults.rules, {
		minLength: {
			validator: function(value, param){   //value 为需要校验的输入框的值 , param为使用此规则时存入的参数
				return value.length >= param[0];
			},
			message: '请输入最小{0}位字符.'
		},
		maxLength: {
			validator: function(value, param){
				return param[0] >= value.length;
			},
			message: '请输入最大{0}位字符.'
		}
	});
	/*
	$.extend($.fn.validatebox.defaults.rules, {
		length: {
			validator: function(value, param){
				return value.length >= param[0] && param[1] >= value.length;
			},
			message: '请输入{0}-{1}位字符.'
		}
	});

	// extend the 'equals' rule
	$.extend($.fn.validatebox.defaults.rules, {
		equals: {
			validator: function(value,param){
				return value == $(param[0]).val();
			},
			message: '字段不相同.'
		}
	});
	  
	$.extend($.fn.validatebox.defaults.rules, {
		web : {
			validator: function(value){
				return /^(http[s]{0,1}|ftp):\/\//i.test($.trim(value));
			},
			message: '网址格式错误.'
		}
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
	    mobile : {
			validator: function(value){
				return /^1[0-9]{10}$/i.test($.trim(value));
			},
			message: '手机号码格式错误.'
		}
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
	    date : {
			validator: function(value){
				return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i.test($.trim(value));
			},
			message: '曰期格式错误,如2012-09-11.'
		}
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
	    email : {
			validator: function(value){
				return /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/i.test($.trim(value));
			},
			message: '电子邮箱格式错误.'
		}
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
	    captcha : {
			validator: function(value){
				var data0 = false;
				$.ajax({
					type: "POST",async:false,
					url:contextPath + "/json/valSimulation.action",
					dataType:"json",
					data:{"simulation":value},
					async:false,
					success: function(data){
						data0=data;
					}
				});
			    return data0;
                //   return /^[a-zA-Z0-9]{4}$/i.test($.trim(value));
			},
			message: '验证码错误.'
		}
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
	    txtName : {
			validator: function(value,param){
				var data0 = false;
				if(value.length >= param[0] && param[1] >= value.length)
				{
					$.ajax({
						type: "POST",async:false,
						url:contextPath + "/json/valName.action",
						dataType:"json",
						data:{"txtName":value},
						async:false,
						success: function(data){
							data0=!data;
						}
					});
				}else{
					param[2] = "请输入"+param[0]+"-"+param[1]+"位字符.";
					return false;
				}
				param[2] = "用户名称已存在.";
			    return data0;
			},
			message: "{2}"
		}
	});
	*/
//});

//解决placeholder属性在IE中失效问题
(function($){$.fn.placeholder=function(options){
	var opts = $.extend({}, $.fn.placeholder.defaults, options);
	var isIE = document.all ? true : false;
	return this.each(function(){
		var _this=this, placeholderValue=_this.getAttribute('placeholder');
		if(isIE){
			if($.trim(_this.value)==''){
				_this.value = placeholderValue;
				if($(this).attr('type')=='password'){
					$(this).data('placetype','password');
					$(this).attr('type','text');
				}
				$(this).data('placecolor',$(this).css('color'));
				$(this).css('color','gray');
			}
			_this.onfocus = function(){
			  if($.trim(_this.value)==placeholderValue){
				_this.value = '';
				if($(this).data('placetype')=='password'){
					$(this).attr('type','password');
				}
				$(this).css('color',$(this).data('placecolor'));
			  }
			};
			_this.onblur = function(){
			  if($.trim(_this.value)==''){
				_this.value = placeholderValue;
				if($(this).attr('type')=='password'){
					$(this).data('placetype','password');
					$(this).attr('type','text');
				}
				$(this).data('placecolor',$(this).css('color'));
				$(this).css('color','gray');
			  }
			};
		}
	});
};})(jQuery);
$(function(){
	if(!$.support.leadingWhitespace){	//IE6-8 执行
		$('input[placeholder]').placeholder(); $('textarea[placeholder]').placeholder();
	}
});