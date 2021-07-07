
/**
 * 模版
 * @param {} opts
 */
$.fn.lkqmodel=function(opts){
	
	/**
	 * 替换
	 * @param {Object} oldStr 要替换的字符串
	 * @param {Object} repStr 替换的东东 数组['xxx','sss']
	 * @param {Object} repToStr 替换成的字符串
	 */
	function replaceAll(oldStr,repStr,repToStr){
		if(oldStr!=="undefined" && typeof repStr ==="object" && repStr.length>0){
			for(var i=0;i<repStr.length;i++){
				for(;;){
					try{
						if(oldStr.indexOf(repStr[i])>=0){
							oldStr=oldStr.replace(repStr[i],repToStr);
						}else{
							break;
						}
					}catch(e){
						break;
					}
				}
			}
		}
		return oldStr;
	}
	
	var model=$(this);
	var opt=$.fn.lkqmodel.defaults;
	opt=$.extend(opt,opts);
	var data=opt.data;
	if(data && typeof data=='object'){
		var html=model.html();
		for (var key in data) {
			if(opt.formatter && typeof opt.formatter =='function'){
				var value=opt.formatter.call(this,data,key,data[key]);
				html=html.replace(('{'+key+'}'),value);
			}else{
				html=html.replace(('{'+key+'}'),data[key]);
			}
		}
		return html;
	}
};



$.fn.lkqmodel.defaults={
	/**
	 * 要绑定的数据
	 * @type 
	 */
	data:null
	/**
	 * 格式化输出
	 * 
	 */
	//,formatter:function(obj){}
};