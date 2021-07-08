
/**
该脚本是对easyui的组件进行初始化参数设定，避免后期开发的时候重复设定默认的参数值
如初始化一个datagrid，需要这样做
$('#id').datagrid({
	rownumbers:true,//是否显示行数
	autoRowHeight:true,
	singleSelect:true,
	checkOnSelect:false,
	selectOnCheck:false,
	fitColumns:true,   //列头的宽度自动适应
	border:true,		//表格是否有边框
	pagination:true,//是否显示分页控件
	pageSize:20,
//	sortName:'order',
	pageList : [20, 50, 100, 500]
});

这里面初始化的参数其实就是一个 json对象 ,而看了easyui的源码后，
知道其实它里面有个全局默认的参数对象
$.fn.datagrid.defauls  //这个对象就是存储默认初始化参数对象。
有了这个以后，我们可以在一个脚本中 对这个参数进行拓展或改变其中的参数值。

$.extend($.fn.datagrid.defaults,{pageSize:20,fitColumns:true,....});
等 设定好后，以后的控件初始化 我们只需要传 一个url 及columns设定即可。
大大简化初始化流程。



*/



//===================== normal functions
/**
 * do ajax post
 * @param opts
 */
function post(opts){
	var s={
		type:'post',
		dataType:'json',
		error:function(){
			showCenterErrorMsg('系統繁忙,請稍後再試.');	
		}
	};
	$.extend(s,opts);
	$.ajax(s);
}



//====================   變量
var easyui_common_date_split=40;
var easyui_common_width=160;
var easyui_common_height=30;
var debug=true;

function getValidBirthDay(){
	var now = new Date();
	var birthYear=now.getFullYear()-18;
	var xx=birthYear+"-12-31";
    return new Date(Date.parse(xx.replace(/-/g,   "/")));
}
var datebox_birthdayValidator=function(date){
    return date<=getValidBirthDay();
}

/**
 * 弹出普通信息
 */
function showCenterCommonMsg(Msg){
	$.messager.show({
		title:'操作结果',
		msg:Msg,
		showType:'fade',
		style:{
			right:'',
			bottom:''
		}
	});
}
/**
 * 金額格式化
 * @param s 金額
 * @param n 小數點
 * @returns {String}
 */
function fmoney(s, n)   
{
	try{
		s=parseInt(s)/100;
	}catch(e){}
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
} 

/**
 * 弹出错误信息
 * @param Msg
 */
function showCenterErrorMsg(Msg){
	$.messager.show({
		title:'操作结果',
		msg:Msg,
		showType:'fade',
		style:{
			right:'',
			bottom:''
		}
	});
}

//拓展 datagrid 方法
$.extend($.fn.datagrid.methods,{
	'reloadbyparams':function(grid,formId){
		try{
			try{
				if(!$(formId).form('validate')) return;
			}catch(e){}
			var p=parseForm($(formId));
			$(grid).datagrid('options').queryParams={};
			$.extend($(grid).datagrid('options').queryParams,p);
			$(grid).datagrid('reload');
			
		}catch (e) {
			console.log(e);
		}
	}
});

//================== 擴展控件

//给全部的 datagridview设置默认的参数
//不用每次都去设置
$.extend($.fn.datagrid.defaults,{
	rownumbers:true,//是否显示行数
	autoRowHeight:true,
	singleSelect:true,
	checkOnSelect:false,
	selectOnCheck:false,
	fitColumns:true,   //列头的宽度自动适应
	border:true,		//表格是否有边框
	pagination:true,//是否显示分页控件
	pageSize:20,
//	sortName:'order',
	pageList : [20, 50, 100, 500],
	rowName:"showCount",
	pageName:"currentPage",
	fit:true,
	//&&&&&&
	loadFilter:function(resp){	//对服务器返回的json数据进行过滤
		if(resp && resp.data && resp.data.data){
			if(resp.status&&resp.status===0){
				showCenterErrorMsg(resp.msg);
			}else{
				return {
					total:resp.data.totalResult
					,rows:resp.data.data
				};
			}
		}
		return {
			total:0
			,rows:[]
		};
	}
});

//window
$.extend($.fn.window.defaults,{
	modal:true,
	closed:true,
	resiable:false,
	draggable:false,
	minimizable : false,
	maximizable : false,
	collapsible : false
});

$.extend($.fn.window.methods,{
	'openCenter':function(xx){
		$(xx).window('open').window('center');
	}
});

//combobox
$.extend($.fn.combobox.defaults,{
	editable:false,
	width:easyui_common_width,
	height:easyui_common_height,
	panelHeight:'auto'
});


//= 日曆
if($.fn.calendar){
	$.extend($.fn.calendar.defaults,{
		editable:false,
		width:easyui_common_width,
		height:easyui_common_height,
		validator:function(date){
			var now = date;
			var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			var d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate()+39);
			return d1<=date && date<=d2;
		}
	})
}

// datebox
$.extend($.fn.datebox.defaults,{
	width:easyui_common_width,
	height:easyui_common_height,
	editable:false
});

$.extend($.fn.datebox.methods,{
	'initDateRange':function(datebox,date){
		$(datebox).datebox('calendar').calendar('options').validator=function(date){
				var now = date;
				var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				var d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate()+easyui_common_date_split);
				return d1<=date && date<=d2;
			}
		var selectDate=$.fn.datebox.defaults.formatter.call(datebox,date);
		$(datebox).datebox('setValue',selectDate);
	}
});

//==== numberbox
$.extend($.fn.numberbox.defaults,{
	width:easyui_common_width,
	height:easyui_common_height
//	required:true
});

//=====dialog
$.extend($.fn.dialog.defaults,{
	modal:true
});
//==== textbox
$.extend($.fn.textbox.defaults,{
	width:easyui_common_width,
	height:easyui_common_height
//	required:true
});

//==== combotree
$.extend($.fn.combotree.defaults,{
	width:easyui_common_width,
	height:easyui_common_height
//	required:true
});

//===== form
$.extend($.fn.form.defaults,{
	method:'post',
	//传递的消息格式体
	msg:{
		url:'',
		title:'',
		sucMsg:'',
		sucHandler:function(){}
	},
	success:function(result){
		var msg=this.msg;
		var resultO=$.parseJSON(result);//将结果序列化成json对象
		result=$.parseJSON(result);
		if(result.status===0){
			showCenterErrorMsg(result.msg,msg.title);
		}else{
			//添加成功后的操作
			$(this.self).form('reset');
			showCenterCommonMsg(msg.sucMsg,msg.title);
			msg.sucHandler.call(this.self);
		}
	},
	onSubmit:function(){
		return $(this).form('enableValidation').form('validate');
	}
});
//扩展  form表单在提交的时候 的简便方法
$.extend($.fn.form.methods,{
	'doSubmit':function(self,msg){
		var $form=$(self);
		$form.form('options').msg=msg;//在提交时候  传递一些自定义参数
		if(msg.url != null){
			$form.form('options').url=msg.url;
			$form.form('submit',{self:self});
		}else{
			$form.form('submit',{self:self});//传递自身
		}	
	},
	'remeberLoad':function(self,ObjData){
		var $form=$(self);
		$form.form('options').ObjData={};
		$form.form('options').ObjData=ObjData;
		$form.form('load',ObjData);//传递自身
		$(self).formFill({data:ObjData,filler:'span'});
	},
	'remeberReset':function(self){
		var $form=$(self);
		$form.form('reset');
		$form.form('load',$form.form('options').ObjData);//传递自身
	}
});
 

function parseForm(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		var value = this['value'];
		var name = this['name'];
		if (value) {
			if (value === "on") {
				value = true;
			}
		}
		if (o[name]) {
			o[this['name']] = o[this['name']] + ',' + value;
		} else {
			o[this['name']] = value;
		}
	});
	return o;
}
//treegrid
$.extend($.fn.treegrid.defaults,{
	loadFilter:function(resp){	//对服务器返回的json数据进行过滤
		if(resp && resp.data && resp.data.data){
			return {
				total:resp.data.totalResult
				,rows:resp.data.data
			};
		}else if(resp && resp.data){
			return resp.data;
		}else{
			return resp;
		}
		return {
			total:0
			,rows:[]
		};
	}
});
//tree
$.extend($.fn.tree.defaults,{
	//&&&&&&
	loadFilter:function(resp){	//对服务器返回的json数据进行过滤
		if(resp && resp.data && resp.data.data){
			var x=(resp.data.data).sort();
			return x;
		}else if(resp && resp.data){
			return resp.data.sort();;
		}else{
			return resp;
		}
	}
});
//combotree
$.extend($.fn.tree.defaults,{
	loadFilter:function(resp){	//对服务器返回的json数据进行过滤
		if(resp && resp.data && resp.data.data){
			var x=(resp.data.data).sort();
			return x;
		}else if(resp && resp.data){
			return resp.data.sort();;
		}else{
			return resp;
		}
	}
});
//combobox
$.extend($.fn.combobox.defaults,{
	loadFilter:function(resp){	//对服务器返回的json数据进行过滤
		if(resp && resp.data && resp.data.data){
			var x=(resp.data.data).sort();
			return x;
		}else if(resp && resp.data){
			return resp.data.sort();;
		}else{
			return resp;
		}
	}
});

//&&&&&&
//validatebox  擴展驗證規則
$.extend($.fn.validatebox.defaults.rules,{
	//驗證修改用戶登錄密碼
	loginPwd:{
		validator : function (loginPwd) {
			var xx=/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,30}$/.test(loginPwd)
			return xx;
		},
		message : "密码应由不少于8位的大小写字母、数字以及标点符号组成。"
	},
	pwdPair:{
		validator : function (currentPwd,pwdEles) {
			return currentPwd===$(pwdEles[0]).val();
		},
		message : "兩次新密碼不一致"
	},
	//檢查截至日期是否超出起始日期的範圍
	searchDateRangeCheck:{
		validator : function (currentDate,startDateEle) {
			try{
				var startDate=$(startDateEle[0]).datebox('getValue');
				if(startDate){
					var startD = new Date(Date.parse(startDate.replace(/-/g,"/")));
					var endD   = new Date(Date.parse(currentDate.replace(/-/g,"/")));
					var days = parseInt((endD.getTime()-startD.getTime()) / (1000 * 60 * 60 * 24));
					if(startDateEle[1] && startDateEle[1]>0){}
					else{
						startDateEle[1]=45;
					}
					return days<=startDateEle[1] && days>=0;
				}
				return true;
			}catch(e){return true;}
			return false;
		},
		message : "截至日期不能超過{1}天或者小于开始时间"
	},
	money: {
        validator: function (value, param) {
            return /^\d+.\d\d$/.test(value) || /^\d+$/.test(value) ||  /^\d+.\d$/.test(value);
        },
        message: '请输入正确的金额(例：10.50)'
    },
	bitChar:{
		validator : function (value,param) {
			var res = /^(\d|[A-F]|[a-f]){16}$/.test(value);
			return res;
		},
		message : "請輸入16位長度的16進制[0-9,A-F,a-f]字符"
	}
});
