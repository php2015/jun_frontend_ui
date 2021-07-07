

/**
 * 表单自动填值
 * 2013-12-5
 */
(function($){
	function xxxxxgiveValue($now,opt,item,givenData){
		var form=$now.attr(opt.options);
		var value="";
		var tag=$now[0].tagName.toLowerCase();
		
		if(form){
			try{
				form=eval('({'+form+'})');
				if(typeof form.formatter ==="function"){//如果这是一个方法的话
					value=form.formatter(opt.data[item],opt.data);
					//console.log(value);
				}
			}catch(e){alert(e.message);};
		}else if(givenData!=null && givenData!='undefined'){
			value=givenData;
			//console.log(value+" "+item)
		}else{
			value=opt.data[item];
		}
		
		
		if("input,textarea".indexOf(tag)>-1){
			
			var type=$(this).prop('type');
			if("checkbox".indexOf(type)>-1){
				if(value==$now.val()){
					$now.prop('checked','checked');
				}
			}else if("radio".indexOf(type)>-1 ){
				if(value==$now.val()){
					$now.prop('checked','checked');
				}
			}else{
				$now.val(value);
			}
		}else if("select".indexOf(tag)>-1 ){
			//console.log("==========")
			$.each($now.find('option'),function(i,v){
				//console.log($(v).val()+"  "+value+"")
				if($(v).val()+""===value+""){
					$(v).attr("selected", "selected");
				}
			});
		}else{
			$now.html(value);
		}
	}
	
	function getData(obj,id,v,temp,split){
		var temp=temp;
		
		 for(var n in obj){
		 	if(v === n){
				
				if(temp+v===id){
					return {data:obj[n],id:id};
				}else{
					temp+=v+split;
					getData(obj[n],id,v,temp,split);
				}
			}
		 }
		 return null;
	}
	
	function goInside($now,opt,item){
		var id=$now.prop(opt.type);//得出标识符
		var split=opt.split;//得出分隔符
		var object=opt.data[item];//当前需要取出对象的数据
		
		if(id.indexOf(split)){
			//如果有 x
			var arrays=id.split(split);
			if(arrays[0]===item){
				var temp="";
				var data;
				$.each(arrays,function(i,v){
					data=getData(object,id,v,item+split,split);
					//如果有数据了 就直接退出
					if(data!=null && data!='undefined'){
						return false;
					}
				});
				//调用赋值方法
				xxxxxgiveValue($now,opt,data.id,data.data);
				//console.log();
			}
		}else{
			xxxxxgiveValue($now,opt,item);
		}
	}
	
	$.fn.formFill=function(opts){
		/**
		 * 默认参数
		 */
		var opt={
			data:null,//传过来的数据
			type:'name',//类型名   有  name  id 两个  比如  name=zhangsan 我穿过来的对象里有  name 就把name赋值给他
			options:'fill-options',
			filler:':input',
			split:'-'
		};
		if(opts){
			opt=$.extend(opt,opts);
		}
		
		if(opt.data){//如果对象是有值的话
			var inputs=$(this).find(opt.filler);
			
			$.each(inputs,function(i,v){
				//遍历数据
				for(var item in opt.data){
					var $now=$(v);
					//是对象的话
					if($now.attr(opt.type)===item){
						xxxxxgiveValue($now,opt,item);
						
					}
//					else if(typeof opt.data[item] ==="object" && $now.prop(opt.type).indexOf('-')>-1){
//						goInside($now,opt,item);
//					}
				}
			});
		}
	};
})(jQuery);