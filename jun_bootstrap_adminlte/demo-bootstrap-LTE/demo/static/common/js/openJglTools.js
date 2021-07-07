window.openJgl={};
//date: 2016-11-16 author: 杜关兴 note:必填正则验证工具 other：（失去焦点和点击提交显示提示）
/*
	elelist:json配置（包含输入框id，提示容器id，数组形式的正则与提示文字）
	funsubmit：成功回调
	funerr：失败回调函数
	funerrlist：失败错误输入框ID回调函数
*/
openJgl.tbdValidate=function(elelist,objs){	
	var errlen=0;//错误个数
	var errlist=[];//错误输入框ID
	for(var i=0;i<elelist.length;i++){	//失去焦点操作
		(function(eleinput,eletext,rule){
			document.getElementById(eleinput).onblur=function(){
				var intval=this.value.replace(/(^\s*)|(\s*$)/g, "");//删除前后空格
				for(var j=0;j<rule.length;j++){	
					var resreg=rule[j].reg.test(intval);					
					if(resreg){						
						document.getElementById(eletext).style.display="none";
					}else{					
						document.getElementById(eletext).innerHTML=rule[j].text;
						document.getElementById(eletext).style.display="block";
						break;//终止循环			
					};									
				};		
			};
		})(elelist[i].eleinput,elelist[i].eletext,elelist[i].rule);
	};	
	document.getElementById(objs.elesubmit).onclick=function(){//提交操作
		errlen=0;
		errlist=[];
		for(var i=0;i<elelist.length;i++){	
			(function(eleinput,eletext,rule){
				var intval=document.getElementById(eleinput).value.replace(/(^\s*)|(\s*$)/g, "");//删除前后空格
				for(var j=0;j<rule.length;j++){	
					var resreg=rule[j].reg.test(intval);					
					if(resreg){						
						document.getElementById(eletext).style.display="none";
					}else{					
						document.getElementById(eletext).innerHTML=rule[j].text;
						document.getElementById(eletext).style.display="block";
						errlen+=1;
						errlist.push(eleinput);
						break;			
					};									
				};		
			})(elelist[i].eleinput,elelist[i].eletext,elelist[i].rule);
		};
		if(errlen==0){//验证回调
			objs.funsubmit();//成功
		}else{
			objs.funerr();//失败
			objs.funerrlist(errlist);//失败输入框元素id
		};
	};
};
//date: 2016-11-16 author: 杜关兴 note:图片base64位整理
/*
	url:生成的图片base64路径进一步处理
*/
openJgl.toBase64sub=function(url){
	var startindex=url.indexOf(",");
	return url.substr(startindex+1);
};
//date: 2016-11-17 author: dgx note:非必填正则验证工具  other：（输入错误提示和清空）
/*
	elelist:json配置（包含输入框id，提示容器id，数组形式的正则与提示文字）
*/
openJgl.tbdnoValidate=function(elelist){	
	for(var i=0;i<elelist.length;i++){	//失去焦点操作
		(function(eleinput,eletext,rule){
			document.getElementById(eleinput).onblur=function(){
				var intval=this.value.replace(/(^\s*)|(\s*$)/g, "");//删除前后空格
				for(var j=0;j<rule.length;j++){	
					var resreg=rule[j].reg.test(intval);					
					if(resreg){						
						document.getElementById(eletext).style.display="none";
					}else{					
						document.getElementById(eletext).innerHTML=rule[j].text;
						document.getElementById(eletext).style.display="block";
						this.value="";
						break;			
					};									
				};		
			};
		})(elelist[i].eleinput,elelist[i].eletext,elelist[i].rule);
	};	
};
//date: 2016-11-17 author: 杜关兴 note: 图片base64 支持监测  other：（ie10 ie10+ 谷歌 火狐 safari主流浏览器）
/*
	text:是否支持的错误提示文字
*/
openJgl.supportBase64IMG=function(text){
	if(!window.FileReader){
		alert(text);
	};
};
//date: 2016-12-5 author: 杜关兴 note: 图片比例缩放算法
/*
	boxw:容器宽度
	boxh:容器高度
	imgw:图片宽度
	imgh:图片高度
*/
openJgl.imgPercentScale=function(boxw,boxh,imgw,imgh){
	var res={};
	var wper=imgw/boxw;
	var hper=imgh/boxh;
	if(wper<=1 && hper<1){
		res.w=imgw;
		res.h=imgh;
		return res;
	};
	if(wper>1 && hper<1){
		res.w=boxw;
		var rhper=boxw/imgw;
		res.h=imgh*rhper;
		return res;
	};
	if(wper<=1 && hper>1){
		res.h=boxh;
		var rwper=boxh/imgh;
		res.w=imgw*rwper;
		return res;
	};
	if(wper>1 && hper>1){
		if(wper>=hper){
			res.w=boxw;
			var rhper=boxw/imgw;
			res.h=imgh*rhper;
			return res;
		}else{
			res.h=boxh;
			var rwper=boxh/imgh;
			res.w=imgw*rwper;
			return res;
		};
	};	
};
//date: 2016-12-7 author: 杜关兴 note: 数字格式化 other：（如1457841 转为：1,457,841;如1457841.1245 转为：1,457,841.1245）
/*
	str :格式化内容
*/
openJgl.formatNum=function(str){
	var newStr = "";
	var count = 0;
	if(str.indexOf(".")==-1){
		for(var i=str.length-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
				newStr = str.charAt(i) + "," + newStr;
			}else{
				newStr = str.charAt(i) + newStr;
			};
			count++;
		};
		str = newStr;
		return str;
	}else{
		for(var i = str.indexOf(".")-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
				newStr = str.charAt(i) + "," + newStr;
			}else{
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			};
			count++;
		};
		var xslen=str.substr(str.indexOf(".")+1).length;
		str = newStr + (str + "00").substr((str + "00").indexOf("."),xslen+1);
		return str;
	};
};
//date: 2016-12-7 author: 杜关兴 note: 数字格式化,保留后两位 other：（如1457841 转为：1,457,841.00;如1457841.1245 转为：1,457,841.12）
/*
	str :格式化内容
*/
openJgl.formatNumTwo=function(str){
	var newStr = "";
	var count = 0;	 
	if(str.indexOf(".")==-1){
		for(var i=str.length-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
				newStr = str.charAt(i) + "," + newStr;
			}else{
				newStr = str.charAt(i) + newStr;
			};
			count++;
		};
		str = newStr + ".00"; //自动补小数点后两位
		return str;
	}else{
		for(var i = str.indexOf(".")-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
				newStr = str.charAt(i) + "," + newStr;
			}else{
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			};
			count++;
		};
		str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
		return str;
	};
};
//date: 2016-12-7 author: 杜关兴 note: 数字类型判断
/*
	str :判断内容
*/
openJgl.isNum=function(str){
	var numstr=Number(str);
	if(isNaN(numstr)){
		return false;
	}else{
		return true;
	};
};
//date: 2016-12-7 author: 杜关兴 note: cookie处理封装
/*
	openJgl.cookieHandle.remove:删除cookie
	openJgl.cookieHandle.edit  :修改cookie
	openJgl.cookieHandle.get   :获取cookie
*/
openJgl.cookieHandle={}
openJgl.cookieHandle.remove=function(name){
	var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=openJgl.cookieHandle.get(name);
    if(cval!=null){
		document.cookie= name + "="+cval+";expires="+exp.toUTCString(); 
	};       
};
openJgl.cookieHandle.edit=function(jsons,day){
	var cookval="";
	for(var i=0;i<jsons.length;i++){
		if(i==0){
			var tempval=jsons[i].key + "=" + escape(jsons[i].val);
			cookval=cookval + tempval;
		}else{
			var tempval=";" + jsons[i].key + "=" + escape(jsons[i].val);
			cookval=cookval + tempval;
		};
	};
	var exp = new Date();
	exp.setTime(exp.getTime() + day*24*60*60*1000);
	cookval=cookval + ";expires=" + exp.toUTCString();
	document.cookie=cookval;	
};
openJgl.cookieHandle.get=function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	};	
};
//date: 2016-12-8 author: 杜关兴 note:   other：（）

window.mapNav=[
	{url:'index.html',index:0},
    {url:'app_manage.html',index:1},
    {url:'apply_application.html',index:1}
];
window.onload=function(){
	var nowurl=location.href;
	var lastindex=nowurl.lastIndexOf("/");
	var realurl=nowurl.substr(lastindex+1);
	for(var i=0;i<mapNav.length;i++){
		if(mapNav[i].url==realurl){
			$(".nav-group ").children().eq(mapNav[i].index).addClass('active').siblings().removeClass('active');
			break;
		};
	};
};

//date: 2016-12-26 author: 杜关兴 note:   other：（）
/*
 openJgl.galert("111");
*/
openJgl.galert=function (title) {
    var elebody=document.getElementsByTagName("body")[0];
	var elestr=document.createElement("div");
    elestr.className="tip-popup";
    elestr.innerHTML='<div class="tip-popup-content" style="height: 180px;" id="ttpop"><p class="text">'+ title +'</p><div class="btn-group" style="text-align: center;"><button id="ttcloce" class="sure-btn">确定</button></div></div>';
    elestr.style.display="block";
    elebody.appendChild(elestr);

    elebody.onclick=function (event) {
		if(event.target.id=="ttcloce"){
            elestr.style.display="none";
            elebody.removeChild(elestr);
		};
    };

};
