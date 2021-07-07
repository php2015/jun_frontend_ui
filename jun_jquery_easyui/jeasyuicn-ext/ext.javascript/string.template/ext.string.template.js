/**
 * 字符串模版替换
 * @author ____′↘夏悸
 * @param this 需要替换的字符串
 * @param data 替换的数据。json格式的数据或者数组。 
 * 			eg： 
 * 			  str：我是{{key1}}替换的字符串{{key2}}。 data：{key1:"替换",key2:"替换2"}
 * 			  str：我是{{key.subkey}}替换的字符串{{key.subkey2}}。 data：{key{subkey:"替换",subkey2:"替换2"}}
 * 			  str：我是{{0}}替换的字符串{{1}}。 data：["替换","替换2"]
 * @returns
 */
String.prototype.template = function(data) {
	var str = this;
	if(data && data.sort){
		for(var i=0; i<data.length; i++) {
			str = str.replace(new RegExp("{\\{"+i+"}}", "gm"), data[i]);
		}
		return str;
	}
	
	var placeholder = str.match(new RegExp("{{.+?}}", 'ig'));
	if (data && placeholder) {
		for ( var i = 0; i < placeholder.length; i++) {
			var key = placeholder[i];
			var value = proxy.call(data, key.replace(new RegExp("[{,}]", "gm"), ""));
			key = key.replace(new RegExp("\\\.", "gm"), "\\.").replace("{{","{\\{");
			if (value == null)
				value = "&nbsp;";
			str = str.replace(new RegExp(key, "gm"), value);
		}
	}
	return str;
	
	function proxy(key) {
		try {
			return eval('this.' + key);
		} catch (e) {
			return "";
		}
	}
};