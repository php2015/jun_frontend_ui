// version 1.3.2 - By Kant@SeekRoad 2019-09-29
//================= 公共函数(日期类) =================
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
// (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt){ //author: meizz
  var o = {
    'M+' : this.getMonth()+1,                 //月份
    'd+' : this.getDate(),                    //日
    'h+' : this.getHours(),                   //小时
    'm+' : this.getMinutes(),                 //分
    's+' : this.getSeconds(),                 //秒
    'q+' : Math.floor((this.getMonth()+3)/3), //季度
    'S'  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp('('+ k +')').test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
  return fmt;
}
// 判断是否日期字符串
function isDate(str){
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    result = str.match(reg);
    if(result == null)return false;
    var d = new Date(result[1],result[3]-1,result[4]);
    var newStr = d.getFullYear()+result[2]+(d.getMonth()+1)+result[2]+d.getDate();
    var newStr2 = d.getFullYear();
    if(d.getMonth()+1 < 10){newStr2 = newStr2+result[2]+'0'+(d.getMonth()+1);}else{newStr2 = newStr2+result[2]+(d.getMonth()+1);}
    if(d.getDate() < 10){newStr2 = newStr2+result[2]+'0'+d.getDate();}else{newStr2 = newStr2+result[2]+d.getDate();}
    return str == newStr || str == newStr2;
}
function isDateTime(str){
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    result = str.match(reg);
    if(result == null)return false;
    var d = new Date(result[1],result[3]-1,result[4],result[5],result[6],result[7]);
    var newStr = d.getFullYear()+result[2]+(d.getMonth()+1)+result[2]+d.getDate()+' '+result[5]+':'+result[6]+':'+result[7];
    var newStr2 = d.getFullYear();
    if(d.getMonth()+1 < 10){newStr2 = newStr2+result[2]+'0'+(d.getMonth()+1);}else{newStr2 = newStr2+result[2]+(d.getMonth()+1);}
    if(d.getDate() < 10){newStr2 = newStr2+result[2]+'0'+d.getDate();}else{newStr2 = newStr2+result[2]+d.getDate();}
    newStr2 = newStr2+' '+result[5]+':'+result[6]+':'+result[7];
    return ((str == newStr || str == newStr2)&&d.getHours()==result[5]&&d.getMinutes()==result[6]&&d.getSeconds()==result[7]);
}
// 将字符串转换为日期格式
// fmt 为空时使用默认格式
function toDate(strDate, fmt){
	var date = new Date(String(strDate).replace(/-/g, '/'));
	if(typeof(fmt)=='undefined'||fmt==''){fmt='yyyy-MM-dd';}
	return date.Format(fmt);
}
// 比较日期大小
// sdate 小于等于 edate 为 True
function compareDate(checkStartDate, checkEndDate){
    var arys1= new Array();
    var arys2= new Array();
	if(checkStartDate != null && checkEndDate != null) {
		arys1=checkStartDate.split('-');
		var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
		arys2=checkEndDate.split('-');
		var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);
		if(sdate > edate) {
			return false;
		}else{
			return true;
	}}
}
// 比较日期相差天数
function diffDate(date1, date2){
    date1 = stringToTime(String(date1));
    date2 = stringToTime(String(date2));
    return (date2 - date1) /1000/60/60/24;//除1000是毫秒，不加是秒
}
// 字符串转成Time(diffDate)所需方法，格式要求：2017-08-09 08:08:08
function stringToTime(string){
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
        parseInt(d[0], 10) || null,
       (parseInt(d[1], 10) || 1)-1,
        parseInt(d[2], 10) || null,
        parseInt(t[0], 10) || null,
        parseInt(t[1], 10) || null,
        parseInt(t[2], 10) || null)).getTime();
}

//================= 公共函数(字符类) =================
//=== 系统函数扩展 ===============
// 返回字符的长度，一个中文算2个
String.prototype.ChineseLength=function(){
	return this.replace(/[^\x00-\xff]/g, "**").length;
};
// 去所有空格   
String.prototype.TrimAll = function(){   
    return this.replace(/(^\s*)|(\s*)|(\s*$)/g, "");   
};
// 去掉字符串两端的空白字符
String.prototype.Trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
//=== 系统函数扩展 ===============

// 判断非空
function isEmpty(ObjStr){
    var Str = $.trim(ObjStr);
    if(Str !== null && Str !== undefined && Str !== ''){
	    return false;
    }else{
	    return true;
    }
}

// 返回指定类型密码字符串
function getRandomPwd(dstObj,charsLength,chars) {
    var dstElem = document.getElementById(dstObj);
    if (!charsLength){ var charsLength = 12; }
    dstElem.value = randomStr(charsLength,chars);
}
// 获取长度为charsLength的随机字符串
function randomStr(charsLength,chars) {
    var length = charsLength || 32;
    if (!chars){
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    }
    var maxPos = chars.length;
    var randomChars = '';
    for(x=0; x<length; x++) {
        var i = Math.floor(Math.random() * maxPos);
        randomChars += chars.charAt(i);
    }
	return randomChars;
}

// 替换字符串
function ReplaceAll(str, sptr, sptr1){
	var str = str || '';
	while (str.indexOf(sptr) >= 0){
		str = str.replace(sptr, sptr1);
	}
	return str;
}
// 复制字符串
function copyToClipboard(txt){
    if(window.clipboardData){
		window.clipboardData.clearData();
		window.clipboardData.setData('Text', txt);
		alert('已复制到剪贴板了！');
    }else{
		alert('您的浏览器不支持复制功能，请手工复制内容！');
    }
}

// 获取系统时间
function showtime () {
	var now = new Date();
	var year = now.getYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var day = now.getDay();
	Day = new MakeArray(7);
	Day[0]='星期天';
	Day[1]='星期一';
	Day[2]='星期二';
	Day[3]='星期三';
	Day[4]='星期四';
	Day[5]='星期五';
	Day[6]='星期六';
	var timeValue = '';
	//timeValue += '<b><span style="font-size:20px;">';
	timeValue += ((hours < 10) ? '0'+hours: hours);
	timeValue += ((minutes < 10) ? ':0' : ':') + minutes;
	timeValue += ((seconds < 10) ? ':0' : ':') + seconds;
	//timeValue += (hours < 12) ? '<span style="font-size:12px;">上午</span>' : '<span style="font-size:12px;">下午</span>';
	timeValue += (hours < 12) ? ' 上午' : ' 下午';
	//timeValue += '</span> '+(Day[day]) + ' ';
	timeValue += ' '+(Day[day]) + ' ';
	timeValue += year + '年';
	timeValue += ((month < 10) ? '0' : '') + month + '月';
	timeValue += date + '日';
	//timeValue += '</b>';
	return timeValue;
	//timerID = setTimeout('showtime()',1000);
}

//================= 公共函数(数字类) =================
// 转换为整数
function int(num){return num-num%1}
// 是否为整数
function isInt(s){
	var patrn=/^\d*$/;
	if (!patrn.test(s)) return false;
	return true;
}
// 是否为正整数
function isZInt(s){
	var patrn=/^[1-9][0-9]*$/;
	if (!patrn.test(s)) return false;
	return true;
}
// 是否为数字(含小数和负数)
function isDouble(s){
	var patrn=/^-?[1-9]+\d*$|^(-?[1-9]+\d*)(\.\d+)$|^(-?[0])(\.\d+)$|^[0]$/;
	if (!patrn.test(s)) return false;
	return true;
}

// 保留指定位数小数
function ForDight(Dight,HowMany,Show0){
	if(Dight==0){ if(Show0=='null'){ return ''; }else{ return 0; } }
	if(typeof(HowMany)=='undefined'||HowMany==''||(!isInt(HowMany))){HowMany=2;}
	Dight = Math.round(Dight*Math.pow(10,HowMany)+0.05)/Math.pow(10,HowMany);
	return Dight;
}
// 强制保留指定位数小数
function ForDightEnforce(Dight,HowMany,Show0){
	if(Dight==0){
		if(Show0=='null'){ return '';
		}else if(Show0==true){
			strDight = '0.';
			while(strDight.length<=1+HowMany){ strDight+='0'; }
			return strDight;
		}else{ return 0; }
	}
	Dight = Math.round(Dight*Math.pow(10,HowMany)+0.05)/Math.pow(10,HowMany);
	var strDight=Dight.toString();
	if(HowMany>0){
		var pos_decimal=strDight.indexOf('.');
		if(pos_decimal<0){
			pos_decimal=strDight.length;
			strDight+='.';
		}
		while(strDight.length<=pos_decimal+HowMany){
			strDight+='0';
	}}
	return strDight;
}

// 去处千分号
function DelQF(str){
	return ReplaceAll(str.toString(),',','');
}
// 添加千分号
function AddQF(num){
	var str,str1,str2,strTmp;
	str = num.toString().TrimAll();
	if(str != ''){
		if(isDouble(str)){
			str1='';str2='';strTmp='';
			if(str.indexOf('.')!=-1){
				str1 = str.split('.')[0];
				str2 = str.split('.')[1];
			}else{
				str1 = str;
			}
			if(str1.indexOf('-')!=-1){
				str1 = str1.substring(1,str1.length);
			}
			//添加千分号        
			var i = str1.length/3;
			var k = str1.length%3;
			if( k== 0){
				for(var j=0;j<i;j++){            
					strTmp+=str1.substring(j*3,3*j+3)+',';        
				}
			}else{
				var l = int(i);
				strTmp+=str1.substring(0,k)+',';
				for(var j=0;j<l;j++){            
					strTmp+=str1.substring(j*3+k,3*j+3+k)+',';        
				}
			}
			//去除最后一个千分号        
			strTmp=strTmp.substring(0,strTmp.length-1);
			if(str2!=''){strTmp+='.'+str2;}
			if(str.indexOf('-')!=-1){
				str = '-'+strTmp;
			}else{
				str = strTmp;
			}
		}else{
			str = '0';
		}         
	}else{
		str = '';
	}
	return str;
}

//================= 公共函数(操作类) =================
// 反选
function seleInvert(domName){
    $('input[name="'+domName+'"]').each(function(i,o){
        if($(o).prop('checked')){
            $(o).prop('checked',false);
            $(o).removeAttr('checked');
            $(o).parent().parent().removeClass('seleit');
        }else{
            $(o).attr('checked','true');
            $(o).prop('checked','true');
            $(o).parent().parent().addClass('seleit');
        }
    });
}
// 全选
function seleAll(domName,domID){
    var currState = true;
    if(domID){ if($('#'+domID).length > 0){
        if(!$('#'+domID).is(':checked')){currState=false;}
    }}
    $('input[name="'+domName+'"]').each(function(i,o){
        if(currState==true){
            $(o).attr('checked','true');
            $(o).prop('checked','true'); //使CSS生效
            $(o).parent().parent().addClass('seleit');
        }else{
            $(o).prop('checked',false);
            $(o).removeAttr('checked');
            $(o).parent().parent().removeClass('seleit');
        }
    });
}
// 检索获取Json对象中的内容
function getObjText(jsonObj,seaVal,getKeyName,seaKeyName){
	var isValid = true;
	seaKeyName = seaKeyName||'id';
	getKeyName = getKeyName||'text';
	if($.isEmptyObject(jsonObj)){
		isValid = false;
	}else{
		if(!jsonObj[0].hasOwnProperty(seaKeyName)){
			isValid = false;
		}else{
			if(!jsonObj[0].hasOwnProperty(getKeyName)){
				if(jsonObj[0].hasOwnProperty('text')){
					getKeyName = 'text';
				}else{
					isValid = false;
				}
			}
		}
	}
	if(isValid==true){
		for(var ii in jsonObj){ 
			if(jsonObj[ii][seaKeyName]==seaVal){
				return jsonObj[ii][getKeyName];
			}
		}
	}
	return seaVal;
}
// 信息提示框
if(!typeof(showMsg)==='function'){
	if(typeof($.messager.alert)==='function'){
		//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
		function showMsg(msgString, msgType, title){
			title = title||'提示';
			$.messager.alert(title, msgString, msgType);
		}
	}else{
		function showMsg(msgString, msgType, title){
			alert(msgString);
		}
	}
}
// 错误信息，红色X
function showMsgError(msgString, title){
	showMsg(msgString, 'error', title);
}
// 警告信息，黄色!
function showMsgWarning(msgString, title){
	showMsg(msgString, 'warning', title);
}
// 通知信息，蓝色i
function showMsgInfo(msgString, title){
	showMsg(msgString, 'info', title);
}
// 疑问信息，橙色?
function showMsgQuestion(msgString, title){
	showMsg(msgString, 'question', title);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 常用标准颜色
var colorApproved = 'green';
 var colorChecked2 = 'blue';
 var colorChecked1 = colorChecked = 'blue';
 var colorPending = 'red';
 var colorGoBack = '#ff4e20';
 var colorDraft = 'orange';
 var colorCancel = 'gray';

// 设置文字颜色
function setColorSpan(text,strColor){
	if(strColor.length>0){
		return '<span style="color:'+strColor+';">'+text+'</span>';
	}else{
		return text;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 使用easyui弹窗显示内容
function showDialog(jsonPara){
	var diaTitle='查看',diaIcon='icon icon-0407',diaUrl='',diaContent='nothing...';
    var diaIFrame=false,diaWidth=815,diaHeight=$(window).height()-10,disNew=false;
	if(jsonPara.hasOwnProperty('title')&&jsonPara['title']!=''){diaTitle=jsonPara['title'];}
	if(jsonPara.hasOwnProperty('icon')&&jsonPara['icon']!=''){diaIcon=jsonPara['icon'];}
	if(jsonPara.hasOwnProperty('url')&&jsonPara['url']!=''){diaUrl=jsonPara['url'];}
	if(jsonPara.hasOwnProperty('content')&&jsonPara['content']!=''){diaContent=jsonPara['content'];}
	if(jsonPara.hasOwnProperty('iframe')&&jsonPara['iframe']!=''){diaIFrame=jsonPara['iframe'];}
	if(jsonPara.hasOwnProperty('width')&&jsonPara['width']!=''){diaWidth=jsonPara['width'];}
	if(jsonPara.hasOwnProperty('height')&&jsonPara['height']!=''){diaHeight=jsonPara['height'];}
    if(diaWidth>$(window).width()){ diaWidth=$(window).width(); }
    if(diaHeight>$(window).height()){ diaHeight=$(window).height(); }

    var diaConfig;
    if(diaUrl==''){
        diaConfig = {content:diaContent};
    }else{
      if(diaIFrame==false){
        diaConfig = {href:diaUrl};
      }else{
        if(diaUrl.substr(0,8)=='https://'){disNew=true;}
        diaConfig = {content:'<iframe src="'+diaUrl+'" width="100%" height="100%" frameborder="0"></iframe>'};
      }
    }
	if(disNew==true){
        window.open(diaUrl);
    }else{
        if($('#srshowdialog').length<1){
            $('body').append('<div id="srshowdialog" style="display:none;padding:0px;"></div>');
        }
        $('#srshowdialog').show();
        $('#srshowdialog').dialog(
            jQuery.extend( diaConfig, {
                title:diaTitle,
                iconCls:diaIcon,
                modal:true,
                maximizable:true,
                resizable:true,
                width:diaWidth,
                height:diaHeight,
                onClose:function(){$(this).dialog('destroy');}
            })
        );
    }
}

// jq用post形式提交数据
function openBlank(action,data,n){
	var form = $('<form/>').attr('action',action).attr('method','post');
	if(n){form.attr('target','_blank');}
	var input = '';
	$.each(data, function(i,n){
		input += '<input type="hidden" name="'+ i +'" value="'+ n +'" />';
	});
	form.append(input).appendTo('body').css('display','none').submit();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 调用EasyUI弹窗通用函数  From datagrid_common.js  version 1.2.17.3  Copy at 2019-7-16
function griddialogInit(dialogName){
	dialogName = dialogName||'griddialog';
	var dialogStyle = '';
	if(arguments[1]-0==0){
		dialogStyle = 'padding:0px;';		//arguments[1]==0，边框间距为0
	}else{
		if(arguments[1]){
			if(arguments[1]-0>0){			//非空值，是数字就设置边框间距，否则作为css赋值
				dialogStyle = 'padding:'+arguments[1]+'px;';
			}else{
				dialogStyle = arguments[1];
			}
		}else{
			dialogStyle = 'padding:5px;';	//空值，用默认设置5px
		}
	}
	if($('#'+dialogName).length<1){
		$('body').append('<div id="'+dialogName+'" style="display:none;'+dialogStyle+'"></div>');
	}
}
function griddialogShow(settings){
	var defaultSetting = {
			iframe:false,
			newpage:false,
			dialogname:'griddialog',
			dialogstyle:undefined,
			title:'编辑记录',
			iconCls:'icon-edit',
			href:null,//mod_url+gridEditUrl,
			modal:true,//dialogModal,
			resizable:true,
			width:500,//dialogWidth,
			height:500,//dialogHeight,
			buttons:[{
				text: '关闭&nbsp;', iconCls: 'icon-cancel', id: 'btnCancel',
				handler: function(){$('#'+defaultSetting.dialogname).dialog('destroy');}
			}],//getDialogSubmitBtn(),
			extendSet:{}
		};
	jQuery.extend(defaultSetting,settings);
    if(defaultSetting.newpage==true){
		window.open(defaultSetting.href);
	}else{
		if(defaultSetting.iframe==true){
			jQuery.extend(defaultSetting.extendSet,{content:'<iframe src="'+defaultSetting.href+'" width="100%" height="100%" frameborder="0"></iframe>'});
			defaultSetting.href = null;
		}
		var dWidthMargin,dHeightMargin,dWidthMax,dHeightMax;
		if(isNaN(defaultSetting.width)){defaultSetting.width=500;}
		if(isNaN(defaultSetting.height)){defaultSetting.height=500;}
		dWidthMargin = (!isNaN(defaultSetting.widthMargin))?defaultSetting.widthMargin:10;
		dHeightMargin = (!isNaN(defaultSetting.heightMargin))?defaultSetting.heightMargin:10;
		dWidthMax = $(window).width()-dWidthMargin;
		dHeightMax = $(window).height()-dHeightMargin;
		if(defaultSetting.width>dWidthMax){defaultSetting.width=dWidthMax;}
		if(defaultSetting.height>dHeightMax){defaultSetting.height=dHeightMax;}
		var dialogParam = {
				title:defaultSetting.title,
				iconCls:defaultSetting.iconCls,
				modal:defaultSetting.modal,
				resizable:defaultSetting.resizable,
				href:defaultSetting.href,
				width:defaultSetting.width,
				height:defaultSetting.height,
				onClose:function(){$(this).dialog('destroy');},
				buttons:defaultSetting.buttons
			};
		if(!$.isEmptyObject(defaultSetting.extendSet)){
			jQuery.extend(dialogParam,defaultSetting.extendSet);
		}
		griddialogInit(defaultSetting.dialogname,defaultSetting.dialogstyle);
		$('#'+defaultSetting.dialogname).show();
		$('#'+defaultSetting.dialogname).dialog(dialogParam);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 检查浏览器是否支持flash
function flashChecker(){
   var hasFlash = 0; //是否安装了flash
   var flashVersion = 0; //flash版本
   if (document.all) {
      var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (swf) {
        hasFlash = 1;
        VSwf = swf.GetVariable("$version");
        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
      }
   } else {
      if (navigator.plugins && navigator.plugins.length > 0) {
        var swf = navigator.plugins["Shockwave Flash"];
        if (swf) {
          hasFlash = 1;
          var words = swf.description.split(" ");
          for (var i = 0; i < words.length; ++i) {
            if (isNaN(parseInt(words[i]))) continue;
            flashVersion = parseInt(words[i]);
          }
        }
      }
   }
   return { f: hasFlash, v: flashVersion };
}

//================= 公共函数(插件类) =================
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 生成并插入bootstrap格式的单选按钮组html代码
// jsonData		String（预设样式名称）或json格式为：[{id:1,text:"是",icon:"icon-yes"},{id:0,text:"否",icon:"icon-no2"}]
// defValue		默认选中的值
// jsonPara		格式为：{iptclass:'btn-default',iptname:'type',iptid:'dic',defvalact:'toyesnot'}
function getYesNotBtn(jsonData,defValue,jsonPara){
	var s_html='',s_key, iptType='radio',iptClass='btn-default',iptName='type',iptId='dic'+randomStr(5),defvalact='';
	var arr_active=['','active'],arr_checked=['','checked'];
	var dataValue='id',dataText='text';
	if(!($.isEmptyObject(arguments[3])||arguments[3]=='')){dataValue=arguments[3];};
	if(!($.isEmptyObject(arguments[4])||arguments[4]=='')){dataText=arguments[4];};
	if(typeof(jsonData)=='string' || $.isEmptyObject(jsonData)){	//不是json格式的就使用默认搭配样式
		switch((jsonData).toLowerCase()){
		case 'num-openclose':
			jsonData = [{id:1,text:'开启',icon:'icon-yes'},{id:0,text:'关闭',icon:'icon-no2'}]; break;
		case 'num-openclose-s':
			jsonData = [{id:1,text:'开',icon:'icon-yes'},{id:0,text:'关',icon:'icon-no2'}]; break;
		case 'str-yesnot':
			jsonData = [{id:'yes',text:'是',icon:'icon-yes'},{id:'no',text:'否',icon:'icon-no2'}];defvalact='toyesnot'; break;
		case 'str-onlyyes':
			jsonData = [{id:'yes',text:'是',icon:'icon-yes'}]; iptType='checkbox';defvalact='toyesnot'; break;
		case 'num-yesnot':
		default:
			jsonData = [{id:1,text:'是',icon:'icon-yes'},{id:0,text:'否',icon:'icon-no2'}];
		}
	}
	if(!$.isEmptyObject(jsonData)){
		if(!$.isEmptyObject(jsonPara)){
			if(jsonPara.hasOwnProperty('ipttype')){iptType=jsonPara['ipttype'];}
			if(jsonPara.hasOwnProperty('iptclass')){iptClass=jsonPara['iptclass'];}
			if(jsonPara.hasOwnProperty('iptname')){iptName=jsonPara['iptname'];}
			if(jsonPara.hasOwnProperty('iptid')){iptId=jsonPara['iptid'];}
			if(jsonPara.hasOwnProperty('defvalact')){defvalact=jsonPara['defvalact'];}
		}
        if(defvalact=='toyesnot'){
            if(defValue==1){ defValue='yes'; }else{ defValue='no'; }
        }
		if(defValue==jsonData[0][dataValue]){
			arr_active=['active','']; arr_checked=['checked',''];
		}
		s_html += '<div class="btn-group" data-toggle="buttons">';
		for(var s_key=0; s_key<jsonData.length; s_key++){
			s_html += '<label class="btn '+ iptClass +' '+ arr_active[s_key] +'">';
			s_html += '<input type="'+ iptType +'" name="'+ iptName +'" id="'+ iptId+s_key +'" value="'+ jsonData[s_key][dataValue] +'" autocomplete="off" '+ arr_checked[s_key] +'>';
			if(jsonData[s_key]['icon']!='none' && jsonData[s_key]['icon']!='' && typeof(jsonData[s_key]['icon'])!='undefined'){
				s_html += '<span class="icon '+ jsonData[s_key]['icon'] +'"></span>';
			}
			s_html += jsonData[s_key][dataText]+'</label>';
		}
		s_html += '</div>';
	}
	return s_html;
}

// 生成并插入bootstrap格式的单选按钮组html代码
// iptType		按钮类型：单选 radio ，复选 checkbox
// jsonData		格式为：[{id:1,text:"发布"},{id:2,text:"隐藏"}]
// defValue		默认选中的值
// jsonPara		格式为：{iptclass:'btn-default',ipticon:'icon-check',iptname:'type',iptid:'dic'}
function getRadioBtnGroup(jsonData,defValue,jsonPara){
	return getBsBtnGroup('radio',jsonData,defValue,jsonPara);
}
function getBsBtnGroup(iptType,jsonData,defValue,jsonPara){
	var s_html='', iptClass='btn-default',ipticon='icon-check',iptName='type',iptId='dic'+randomStr(5);
	var dataValue='id',dataText='text';
    if(iptType==''){iptType='radio';}   //默认是单选按钮
	if(!($.isEmptyObject(arguments[4])||arguments[4]=='')){dataValue=arguments[4];};
	if(!($.isEmptyObject(arguments[5])||arguments[5]=='')){dataText=arguments[5];};
	if(!$.isEmptyObject(jsonData)){
		if(!$.isEmptyObject(jsonPara)){
			if(jsonPara.hasOwnProperty('iptclass')){iptClass=jsonPara['iptclass'];}
			if(jsonPara.hasOwnProperty('ipticon')){ipticon=jsonPara['ipticon'];}		// none 表示不显示
			if(jsonPara.hasOwnProperty('iptname')){iptName=jsonPara['iptname'];}
			if(jsonPara.hasOwnProperty('iptid')){iptId=jsonPara['iptid'];}
		}
		s_html += '<div class="btn-group" data-toggle="buttons">';
		for (var s_key in jsonData){
			if(defValue==jsonData[s_key][dataValue]){
				s_html += '<label class="btn '+ iptClass +' active">';
				s_html += '<input type="'+ iptType +'" name="'+ iptName +'" id="'+ iptId+s_key +'" value="'+ jsonData[s_key][dataValue] +'" autocomplete="off" checked>';
			}else{
				s_html += '<label class="btn '+ iptClass +'">';
				s_html += '<input type="'+ iptType +'" name="'+ iptName +'" id="'+ iptId+s_key +'" value="'+ jsonData[s_key][dataValue] +'" autocomplete="off">';
			}
			if(ipticon!='none'){
				s_html += '<span class="icon '+ ipticon +'"></span>';
			}
			s_html += jsonData[s_key][dataText]+'</label>';
		}
		s_html += '</div>';
	}
	return s_html;
}

// 生成并插入bootstrap格式的复选按钮组html代码
// jsonData		格式为：[{id:1,text:"发布"},{id:2,text:"隐藏"}]
// defValue		默认选中的值
// jsonPara		格式为：{iptclass:'btn-default',ipticon:'icon-check',iptname:'type',iptid:'dic'}
function getCheckboxBtnGroup(jsonData,defValue,jsonPara){
	var s_html='', iptClass='',ipticon='icon-check',iptName='type',iptId='dic'+randomStr(5),fgsign=',',iptdisa='';
	var dataValue='id',dataText='text';
	if(!($.isEmptyObject(arguments[3])||arguments[3]=='')){dataValue=arguments[3];};
	if(!($.isEmptyObject(arguments[4])||arguments[4]=='')){dataText=arguments[4];};
	if(!$.isEmptyObject(jsonData)){
		if(!$.isEmptyObject(jsonPara)){
			if(jsonPara.hasOwnProperty('iptclass')){iptClass=jsonPara['iptclass'];}
			if(jsonPara.hasOwnProperty('ipticon')){ipticon=jsonPara['ipticon'];}		// none 表示不显示
			if(jsonPara.hasOwnProperty('iptname')){iptName=jsonPara['iptname'];}
			if(jsonPara.hasOwnProperty('iptid')){iptId=jsonPara['iptid'];}
			if(jsonPara.hasOwnProperty('fgsign')){fgsign=jsonPara['fgsign'];}
			if(jsonPara.hasOwnProperty('iptdisa')){iptdisa=' disabled="disabled"';}
		}
		if(defValue=='' && jsonData.length==1){
			defValue = jsonData[0][dataValue];	//只有一个可选的话就默认为选中状态
		}
		defValue = ','+defValue+',';
		//s_html += '<div>';
		for (var s_key in jsonData){
			if(defValue.indexOf(','+jsonData[s_key][dataValue]+',')>=0){
				s_html += '<label class="col-xs-3 checkbox '+ iptClass +' active">';
				s_html += '<input type="checkbox" name="'+ iptName +'" id="'+ iptId+s_key +'" value="'+ jsonData[s_key][dataValue] +'"'+ iptdisa +' autocomplete="off" checked>';
			}else{
				s_html += '<label class="col-xs-3 checkbox '+ iptClass +'">';
				s_html += '<input type="checkbox" name="'+ iptName +'" id="'+ iptId+s_key +'" value="'+ jsonData[s_key][dataValue] +'"'+ iptdisa +' autocomplete="off">';
			}
			if(ipticon!='none'){
				s_html += '<span class="icon '+ ipticon +'"></span>';
			}
			s_html += jsonData[s_key][dataText]+'</label>';
		}
		//s_html += '</div>';
	}
	return s_html;
}
// 获取Checkbox选中的值
function getCheckboxValue(iptName){
	var s_val = '';
	$('input[name="'+iptName+'"]:checked').each(function(){
		s_val += ','+$(this).val();
	});
	if(s_val.length>1){
		s_val = s_val.substring(1);
	}
	return s_val; 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 加载并初始化上传插件 DmUploader
// jquery.dm-uploader.css已放入公共库，调用时不需要再次加载样式文件
// 插入插件默认操作代码并初始化
function initSRDmUploader(paramObj, ActAreaId, DndZoneId){
  DndZoneId = DndZoneId||'dmUploader-DndZone';
  ActAreaId = ActAreaId||'dmUploader-ActPanel';
  if(ActAreaId){
    var strHtml='';
	strHtml+='<div class="act-area">';
	strHtml+='<div role="button" class="btn l-btn l-btn-small"><div class="l-btn-left l-btn-icon-left">';
	strHtml+='<span class="l-btn-text">选择文件 </span><i class="l-btn-icon icon icon-2613"></i>';
	strHtml+='<input type="file" title="Click to add Files">';
	strHtml+='</div></div>';
	strHtml+='<small class="status text-muted">选择文件或拖放文件到本区域..</small>&nbsp;';
	strHtml+='<div class="progress d-none" style="display:inline-block;width:130px;">';
	strHtml+='<div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0">0%</div>';
	strHtml+='</div>';
	strHtml+='</div>';
    $('#'+ActAreaId).html(strHtml);
	$('#'+DndZoneId).prepend('<div class="dnd-mask">拖放文件到本区域</div>');
	var strPadding,strHeight = $('#'+DndZoneId).parent().height();
	if(typeof($('#'+DndZoneId).attr('dm-type'))=='undefined'){
		strPadding = 17; // dialog
	}else{
		strPadding = 35; // panel
	}
	$('#'+DndZoneId).find('.dnd-mask').height(strHeight-strPadding);
	$('#'+DndZoneId).find('.dnd-mask').width($('#'+DndZoneId).width()-17);
	strHeight = strHeight/2 -24;
	if(strHeight>100){ strHeight=100; }
	$('#'+DndZoneId).find('.dnd-mask').css('padding-top',strHeight+'px');
    setSRDmUploader(DndZoneId,paramObj);
  }
}
// 初始化上传插件
function setSRDmUploader(DndZoneId,paramObj){
  if(DndZoneId){ $.getScript(root_url+'/public/js/uploader/jquery.dm-uploader.min.js', function(){
	var defaultSetting = {
			//queue: true,							// (boolean)默认true，文件将逐个上传
			//auto: true,							// (boolean)默认true，选中文件后立即开始上传。设置为false将要使用API​​方法手动启动上传
			//dnd: true,							// (boolean)默认true，启用拖放功能
			//hookDocument: true,					// (boolean)默认true，禁止在 $(document) 上删除文件，能防止浏览器在删除文件时重定向
			multiple: false,						// (boolean)默认true，允许用户同时选择或删除多个文件
			url: mod_url+'/save-upload.html',		// (string)默认document.URL，用于处理文件上传的服务器URL
			//extraData: {},						// (object/function) 要在上传请求中添加的参数集合
			dataType: 'json',						// (string)默认null，上传时请求使用的响应类型，其他值可以是：xml，json，script，html或text
			fieldName: 'file',						// (string)默认'file'，上传请求中的“文件”的字段名称
			maxFileSize: 30000000,					// (integer)默认0，文件验证：最大文件大小（以字节b为单位）。0意味着没有限制。30000000 = 30Mb
			//allowedTypes: 'image/*',				// (string)默认'*'，文件验证：匹配文件mime-type的正则表达式
			extFilter: ['doc','docx','xls','xlsx','rar','zip','7z','pdf','txt','png','jpg','jpeg','gif','bmp'],	// (array)默认null，文件验证：允许的扩展名数组
			onDragEnter: function(){this.addClass('active');},		// 拖动文件经过拖放区域
			onDragLeave: function(){this.removeClass('active');},	// 拖动文件离开拖放区域(删除文件也会触发此操作)
			//onInit: function(){},									// 初始化
			//onComplete: function(){},								// 所有待处理文件均已完成。（仅逐个上传时有效，queue: true）
			onFallbackMode: function(){								// 当浏览器不支持此插件时:(
			  srDmUploader_update_status(this, '当前浏览器不支持此插件！', 'danger');
			},
			onFileSizeError: function(file){						// 文件大小验证失败 File excess the size limit
			  srDmUploader_update_status(this, '上传文件大小超出限制！', 'danger');
			},
			onFileTypeError: function(file){						// 文件类型验证失败 File type is not an image
			  srDmUploader_update_status(this, '非法上传文件类型！', 'danger');
			},
			onFileExtError: function(file){							// 文件扩展名验证失败 File extension not allowed
			  srDmUploader_update_status(this, '上传文件类型不允许！', 'danger');
			},
			//onNewFile: function(id, file){},						// 用户选择或删除了一个新文件，file（object）：File对象，用它来访问文件详细信息，如名称，大小等。
			onBeforeUpload: function(id){							// 执行上传请求前触发
			  srDmUploader_update_progress(this, 0, true, '');
			  srDmUploader_update_active(this, true);
			  srDmUploader_update_status(this, 'Uploading...');
			},
			onUploadProgress: function(id, percent){				// 获取文件的上传进度（百分比），percent (integer) : 0-100
			  srDmUploader_update_progress(this, percent);
			},
			onUploadSuccess: function(id, data){					// 文件已成功上传并从服务器获得响应时触发，data（object）：上传请求响应。此参数的对象类型取决于：dataType
			  srDmUploader_update_progress(this, 100, false, 'success');
			  srDmUploader_update_active(this, false);
			  if( typeof(data)==='object' && data.hasOwnProperty('error') ){
				 if(data.error==1){
					srDmUploader_update_status(this, '上传失败！'+data.message, 'danger');
				 }else{
					srDmUploader_update_status(this, '上传完成！'+data.url, 'success');
				 }
			  }else{
				 srDmUploader_update_status(this, '上传失败！', 'danger');
			  }
			},
			onUploadError: function(id, xhr, status, message){		// 上传请求期间发生错误时触发，
			  // xhr (object) : XMLHttpRequest；
			  // status (integer) : 错误类型，例如："timeout", "error", "abort", "parsererror"
			  // message (string) : 仅在发生HTTP错误时出现，例如：未找到(Not Found), 错误请求(Bad Request), 等.
			  srDmUploader_update_progress(this, 0, false, 'danger');
			  srDmUploader_update_active(this, false);
			  srDmUploader_update_status(this, 'Error: ['+status+']' + message, 'danger');
			},
			//onUploadComplete: function(id){},						// 文件上传完成。这个在 onUploadSuccess 或 onUploadError 之后立即触发
			onUploadCanceled: function(id){							// 上传已被用户取消。当使用API方法取消上传时触发此操作
			  srDmUploader_update_progress(this, 0, false, 'warning');
			  srDmUploader_update_active(this, false);
			  srDmUploader_update_status(this, '用户取消上传！', 'warning');
			}
		};

    var fn_AfterSuccess;
	if(paramObj.hasOwnProperty('onUploadSuccess') && typeof(paramObj['onUploadSuccess'])==='function'){
		fn_AfterSuccess = paramObj.onUploadSuccess;
		paramObj.onUploadSuccess = function(id, data){
			  srDmUploader_update_progress(this, 100, false, 'success');
			  srDmUploader_update_active(this, false);
			  if( typeof(data)==='object' && data.hasOwnProperty('error') ){
				 if(data.error==1){
					srDmUploader_update_status(this, '上传失败！'+data.message, 'danger');
				 }else{
					srDmUploader_update_status(this, '上传完成！'+data.url, 'success');
					fn_AfterSuccess(id, data);
				 }
			  }else{
				 srDmUploader_update_status(this, '上传失败！', 'danger');
			  }
			};
    }
	if(paramObj.hasOwnProperty('extFilter') && typeof(paramObj['extFilter'])==='object' && (paramObj['extFilter']).length==1){
		if(paramObj['extFilter'][0]=='pic'){
			paramObj['extFilter'] = ['jpg','jpeg','png','gif','bmp'];
		}else if(paramObj['extFilter'][0]=='xls'){
			paramObj['extFilter'] = ['xls','csv'];
		}
	}
	jQuery.extend(defaultSetting,paramObj);
	$('#'+DndZoneId).dmUploader(defaultSetting);
  }); }
}
// 更新上传按钮状态
function srDmUploader_update_active(element, active){
  element.find('div.progress').toggleClass('d-none', !active);
  //element.find('input[type="text"]').toggleClass('d-none', active);

  element.find('input[type="file"]').prop('disabled', active);
  element.find('.btn').toggleClass('disabled', active);

  element.find('.btn i').toggleClass('fa-circle-o-notch fa-spin', active);
  element.find('.btn i').toggleClass('fa-folder-o', !active);
}
// 更新文件上传进度
function srDmUploader_update_progress(element, percent, active, color){
  active = (typeof active === 'undefined' ? true : active);
  color = (typeof color === 'undefined' ? false : color);

  var bar = element.find('div.progress-bar');
  bar.width(percent + '%').attr('aria-valuenow', percent);
  bar.toggleClass('progress-bar-striped progress-bar-animated', active);

  if (percent === 0){
    bar.html('');
  } else {
    bar.html(percent + '%');
  }
  if (color !== false){
    bar.removeClass('bg-success bg-info bg-warning bg-danger');
    bar.addClass('bg-' + color);
  }
}
// 更新上传状态提示信息
function srDmUploader_update_status(element, message, color){
  color = (typeof color === 'undefined' ? 'muted' : color);
  element.find('small.status').prop('class','status text-' + color).html(message);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 加载并初始化Json渲染插件
function setSRJsonView(jsonObj, ViewZoneId, ViewType, fn_AfterLoaded){
  ViewType = ViewType||'json-viewer';
  ViewZoneId = ViewZoneId||'json-renderer';
  if(ViewZoneId){
	jsonObj = srJsonView_dataGet(jsonObj);
	if(typeof(jsonObj)=='string'){ $('#'+ViewZoneId).html(jsonObj); return false; }

	var fn_JsonViewInit,js_FilePath='',b_IsLoadFile=false;
	if(ViewType=='jsonview'){
		js_FilePath = root_url+'/public/js/jsonview/jquery.jsonview.min.js';
		fn_JsonViewInit = srJsonViewInit_jsonview;
		try{ if(typeof($.fn.JSONView)=='undefined'){
			b_IsLoadFile = true;
		} }catch(error){
			b_IsLoadFile = true;
		}
	}else{	//'json-viewer'
		js_FilePath = root_url+'/public/js/jsonview/jquery.json-viewer.js';
		fn_JsonViewInit = srJsonViewInit_jsonViewer;
		try{ if(typeof($.fn.jsonViewer)=='undefined'){
			b_IsLoadFile = true;
		} }catch(error){
			b_IsLoadFile = true;
		}
	}
	if(b_IsLoadFile==true){
		$.getScript(js_FilePath, function(){fn_JsonViewInit(jsonObj, ViewZoneId, fn_AfterLoaded);} );
	}else{
		fn_JsonViewInit(jsonObj, ViewZoneId, fn_AfterLoaded);
	}
  }
}
// 加载并初始化Json渲染插件
function srJsonView_dataGet(jsonObj){
	if(typeof(jsonObj)=='string'){
		var s_JsonText = '';
		try{
			if($('#'+jsonObj).length>0){
				//console.log('对象存在');
				s_JsonText = $('#'+jsonObj).text();
			}else{
				//console.log('对象不存在');
				s_JsonText = jsonObj;
			}
			jsonObj = eval('(' + s_JsonText + ')');
		}catch(error){
			return 'Cannot eval JSON: ' + error;
		}
	}
	return jsonObj;
}
// 初始化Json渲染插件 root_url+'/public/js/jsonview/jquery.json-viewer.js'
function srJsonViewInit_jsonViewer(jsonObj, ViewZoneId, fn_AfterLoaded){
	ViewZoneId = ViewZoneId||'json-renderer';
	$('#'+ViewZoneId).jsonViewer(jsonObj, {
		collapsed:false,		//初始化时是否收起节点
		rootCollapsable:true,	//根节点是否可收起
		withQuotes:false,		//Key是否添加双引号
		withLinks:false			//网址内容是否添加超链接
	});
	if(typeof(fn_AfterLoaded)=='function'){fn_AfterLoaded();}
}
// 初始化Json渲染插件 root_url+'/public/js/jsonview/jquery.jsonview.min.js'
function srJsonViewInit_jsonview(jsonObj, ViewZoneId, fn_AfterLoaded){
	ViewZoneId = ViewZoneId||'json-renderer';
	$('#'+ViewZoneId).JSONView(jsonObj, {
		collapsed:false,			//是否在第一次渲染时收缩所有的节点，默认值为：false
		nl2br:false,				//是否将一个新行转换为<br>字符串，默认值为false
		recursive_collapser:false,	//是否递归收缩节点，默认值为false
		escape:true					//Escape HTML in key，默认值为true
	});
	if(typeof(fn_AfterLoaded)=='function'){fn_AfterLoaded();}
}

//================= 公共函数 结束End =================

/////////////////////////////////////////////////////////////////////////////////////////////////////////
