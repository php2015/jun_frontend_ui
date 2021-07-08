//工具js
window.amaJgl={};
//date: 2016-11-16 author: 杜关兴 note:必填正则验证工具 other：（失去焦点和点击提交显示提示）
/*
	elelist:json配置（包含输入框id，提示容器id，数组形式的正则与提示文字）
	funsubmit：成功回调
	funerr：失败回调函数
	funerrlist：失败错误输入框ID回调函数
*/
amaJgl.tbdValidate=function(elelist,objs){	
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
amaJgl.toBase64sub=function(url){
	var startindex=url.indexOf(",");
	return url.substr(startindex+1);
};
//date: 2016-11-17 author: 杜关兴 note: 图片base64 支持监测  other：（ie10 ie10+ 谷歌 火狐 safari主流浏览器）
/*
	text:是否支持的错误提示文字
*/
amaJgl.supportBase64IMG=function(text){
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
amaJgl.imgPercentScale=function(boxw,boxh,imgw,imgh){
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
amaJgl.formatNum=function(str){
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
amaJgl.formatNumTwo=function(str){
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
amaJgl.isNum=function(str){
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
amaJgl.cookieHandle={}
amaJgl.cookieHandle.remove=function(name){
	var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=openJgl.cookieHandle.get(name);
    if(cval!=null){
		document.cookie= name + "="+cval+";expires="+exp.toUTCString(); 
	};       
};
amaJgl.cookieHandle.edit=function(jsons,day){
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
amaJgl.cookieHandle.get=function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	};	
};
//date: 2016-12-13 author: 杜关兴 note: 城市列表数据文件
/*
	epmty
*/
var cityMaplist={
"ps":[
{"pid":"auto","pname":"请选择省份","citys":[{"cid":"auto_1","cname":"请选择城市"}]},
{"pid":"BJ","pname":"北京市","citys":[{"cid":"BJ_1","cname":"东城区"},{"cid":"BJ_2","cname":"西城区"},{"cid":"BJ_3","cname":"崇文区"},{"cid":"BJ_4","cname":"宣武区"},{"cid":"BJ_5","cname":"朝阳区"},{"cid":"BJ_6","cname":"丰台区"},{"cid":"BJ_7","cname":"石景山区"},{"cid":"BJ_8","cname":"海淀区"},{"cid":"BJ_9","cname":"门头沟区"},{"cid":"BJ_10","cname":"房山区"},{"cid":"BJ_11","cname":"通州区"},{"cid":"BJ_12","cname":"顺义区"},{"cid":"BJ_13","cname":"昌平区"},{"cid":"BJ_14","cname":"大兴区"},{"cid":"BJ_15","cname":"平谷区"},{"cid":"BJ_16","cname":"怀柔区"},{"cid":"BJ_17","cname":"密云县"},{"cid":"BJ_18","cname":"延庆县"}]},
{"pid":"SH","pname":"上海市","citys":[{"cid":"SH_1","cname":"黄浦区"},{"cid":"SH_2","cname":"卢湾区"},{"cid":"SH_3","cname":"徐汇区"},{"cid":"SH_4","cname":"长宁区"},{"cid":"SH_5","cname":"静安区"},{"cid":"SH_6","cname":"普陀区"},{"cid":"SH_7","cname":"闸北区"},{"cid":"SH_8","cname":"虹口区"},{"cid":"SH_9","cname":"杨浦区"},{"cid":"SH_10","cname":"宝山区"},{"cid":"SH_11","cname":"闵行区"},{"cid":"SH_12","cname":"嘉定区"},{"cid":"SH_13","cname":"松江区"},{"cid":"SH_14","cname":"金山区"},{"cid":"SH_15","cname":"青浦区"},{"cid":"SH_16","cname":"南汇区"},{"cid":"SH_17","cname":"奉贤区"},{"cid":"SH_18","cname":"浦东新区"},{"cid":"SH_19","cname":"崇明县"},{"cid":"SH_20","cname":"其他"}]},
{"pid":"TJ","pname":"天津市","citys":[{"cid":"TJ_1","cname":"和平区"},{"cid":"TJ_2","cname":"河东区"},{"cid":"TJ_3","cname":"河西区"},{"cid":"TJ_4","cname":"南开区"},{"cid":"TJ_5","cname":"河北区"},{"cid":"TJ_6","cname":"红桥区"},{"cid":"TJ_7","cname":"塘沽区"},{"cid":"TJ_8","cname":"汉沽区"},{"cid":"TJ_9","cname":"大港区"},{"cid":"TJ_10","cname":"东丽区"},{"cid":"TJ_11","cname":"西青区"},{"cid":"TJ_12","cname":"津南区"},{"cid":"TJ_13","cname":"北辰区"},{"cid":"TJ_14","cname":"武清区"},{"cid":"TJ_15","cname":"宝坻区"},{"cid":"TJ_16","cname":"宁河县"},{"cid":"TJ_17","cname":"静海县"},{"cid":"TJ_18","cname":"蓟  县"}]},
{"pid":"JS","pname":"江苏省","citys":[{"cid":"JS_1","cname":"南京市"},{"cid":"JS_2","cname":"无锡市"},{"cid":"JS_3","cname":"徐州市"},{"cid":"JS_4","cname":"常州市"},{"cid":"JS_5","cname":"苏州市"},{"cid":"JS_6","cname":"南通市"},{"cid":"JS_7","cname":"连云港市"},{"cid":"JS_8","cname":"淮安市"},{"cid":"JS_9","cname":"盐城市"},{"cid":"JS_10","cname":"扬州市"},{"cid":"JS_11","cname":"镇江市"},{"cid":"JS_12","cname":"泰州市"},{"cid":"JS_13","cname":"宿迁市"}]},
{"pid":"ZJ","pname":"浙江省","citys":[{"cid":"ZJ_1","cname":"杭州市"},{"cid":"ZJ_2","cname":"宁波市"},{"cid":"ZJ_3","cname":"温州市"},{"cid":"ZJ_4","cname":"嘉兴市"},{"cid":"ZJ_5","cname":"湖州市"},{"cid":"ZJ_6","cname":"绍兴市"},{"cid":"ZJ_7","cname":"金华市"},{"cid":"ZJ_8","cname":"衢州市"},{"cid":"ZJ_9","cname":"舟山市"},{"cid":"ZJ_10","cname":"台州市"},{"cid":"ZJ_11","cname":"丽水市"}]},
{"pid":"AH","pname":"安徽省","citys":[{"cid":"AH_1","cname":"合肥市"},{"cid":"AH_2","cname":"芜湖市"},{"cid":"AH_3","cname":"蚌埠市"},{"cid":"AH_4","cname":"淮南市"},{"cid":"AH_5","cname":"马鞍山市"},{"cid":"AH_6","cname":"淮北市"},{"cid":"AH_7","cname":"铜陵市"},{"cid":"AH_8","cname":"安庆市"},{"cid":"AH_9","cname":"黄山市"},{"cid":"AH_10","cname":"滁州市"},{"cid":"AH_11","cname":"阜阳市"},{"cid":"AH_12","cname":"宿州市"},{"cid":"AH_13","cname":"巢湖市"},{"cid":"AH_14","cname":"六安市"},{"cid":"AH_15","cname":"亳州市"},{"cid":"AH_16","cname":"池州市"},{"cid":"AH_17","cname":"宣城市"}]},
{"pid":"HEB","pname":"河北省","citys":[{"cid":"HEB_1","cname":"石家庄市"},{"cid":"HEB_2","cname":"唐山市"},{"cid":"HEB_3","cname":"秦皇岛市"},{"cid":"HEB_4","cname":"邯郸市"},{"cid":"HEB_5","cname":"邢台市"},{"cid":"HEB_6","cname":"保定市"},{"cid":"HEB_7","cname":"张家口市"},{"cid":"HEB_8","cname":"承德市"},{"cid":"HEB_9","cname":"沧州市"},{"cid":"HEB_10","cname":"廊坊市"},{"cid":"HEB_11","cname":"衡水市"}]},
{"pid":"SX","pname":"山西省","citys":[{"cid":"SX_1","cname":"太原市"},{"cid":"SX_2","cname":"大同市"},{"cid":"SX_3","cname":"阳泉市"},{"cid":"SX_4","cname":"长治市"},{"cid":"SX_5","cname":"晋城市"},{"cid":"SX_6","cname":"朔州市"},{"cid":"SX_7","cname":"晋中市"},{"cid":"SX_8","cname":"运城市"},{"cid":"SX_9","cname":"忻州市"},{"cid":"SX_10","cname":"临汾市"},{"cid":"SX_11","cname":"吕梁市"}]},
{"pid":"NMG","pname":"内蒙古自治区","citys":[{"cid":"NMG_1","cname":"呼和浩特市"},{"cid":"NMG_2","cname":"包头市"},{"cid":"NMG_3","cname":"乌海市"},{"cid":"NMG_4","cname":"赤峰市"},{"cid":"NMG_5","cname":"通辽市"},{"cid":"NMG_6","cname":"鄂尔多斯市"},{"cid":"NMG_7","cname":"呼伦贝尔市"},{"cid":"NMG_8","cname":"巴彦淖尔市"},{"cid":"NMG_9","cname":"乌兰察布市"}]},
{"pid":"LN","pname":"辽宁省","citys":[{"cid":"LN_1","cname":"沈阳市"},{"cid":"LN_2","cname":"大连市"},{"cid":"LN_3","cname":"鞍山市"},{"cid":"LN_4","cname":"抚顺市"},{"cid":"LN_5","cname":"本溪市"},{"cid":"LN_6","cname":"丹东市"},{"cid":"LN_7","cname":"锦州市"},{"cid":"LN_8","cname":"营口市"},{"cid":"LN_9","cname":"营口市"},{"cid":"LN_10","cname":"辽阳市"},{"cid":"LN_11","cname":"盘锦市"},{"cid":"LN_12","cname":"铁岭市"},{"cid":"LN_13","cname":"朝阳市"},{"cid":"LN_14","cname":"葫芦岛市"}]},
{"pid":"JL","pname":"吉林省","citys":[{"cid":"JL_1","cname":"长春市"},{"cid":"JL_2","cname":"吉林市"},{"cid":"JL_3","cname":"四平市"},{"cid":"JL_4","cname":"辽源市"},{"cid":"JL_5","cname":"通化市"},{"cid":"JL_6","cname":"白山市"},{"cid":"JL_7","cname":"松原市"},{"cid":"JL_8","cname":"白城市"},{"cid":"JL_9","cname":"延边朝鲜族自治州"}]},
{"pid":"HLJ","pname":"黑龙江省","citys":[{"cid":"HLJ_1","cname":"哈尔滨市"},{"cid":"HLJ_2","cname":"齐齐哈尔市"},{"cid":"HLJ_3","cname":"鸡西市"},{"cid":"HLJ_4","cname":"鹤岗市"},{"cid":"HLJ_5","cname":"双鸭山市"},{"cid":"HLJ_6","cname":"大庆市"},{"cid":"HLJ_7","cname":"伊春市"},{"cid":"HLJ_8","cname":"佳木斯市"},{"cid":"HLJ_9","cname":"七台河市"},{"cid":"HLJ_10","cname":"牡丹江市"},{"cid":"HLJ_11","cname":"黑河市"},{"cid":"HLJ_12","cname":"绥化市"}]},
{"pid":"FJ","pname":"福建省","citys":[{"cid":"FJ_1","cname":"福州市"},{"cid":"FJ_2","cname":"厦门市"},{"cid":"FJ_3","cname":"莆田市"},{"cid":"FJ_4","cname":"三明市"},{"cid":"FJ_5","cname":"泉州市"},{"cid":"FJ_6","cname":"漳州市"},{"cid":"FJ_7","cname":"南平市"},{"cid":"FJ_8","cname":"龙岩市"},{"cid":"FJ_9","cname":"宁德市"}]},
{"pid":"JX","pname":"江西省","citys":[{"cid":"JX_1","cname":"南昌市"},{"cid":"JX_2","cname":"景德镇市"},{"cid":"JX_3","cname":"萍乡市"},{"cid":"JX_4","cname":"九江市"},{"cid":"JX_5","cname":"新余市"},{"cid":"JX_6","cname":"鹰潭市"},{"cid":"JX_7","cname":"赣州市"},{"cid":"JX_8","cname":"吉安市"},{"cid":"JX_9","cname":"宜春市"},{"cid":"JX_10","cname":"抚州市"},{"cid":"JX_11","cname":"上饶市"}]},
{"pid":"SD","pname":"山东省","citys":[{"cid":"SD_1","cname":"济南市"},{"cid":"SD_2","cname":"青岛市"},{"cid":"SD_3","cname":"淄博市"},{"cid":"SD_4","cname":"枣庄市"},{"cid":"SD_5","cname":"东营市"},{"cid":"SD_6","cname":"烟台市"},{"cid":"SD_7","cname":"潍坊市"},{"cid":"SD_8","cname":"济宁市"},{"cid":"SD_9","cname":"泰安市"},{"cid":"SD_10","cname":"威海市"},{"cid":"SD_11","cname":"日照市"},{"cid":"SD_12","cname":"莱芜市"},{"cid":"SD_13","cname":"临沂市"},{"cid":"SD_14","cname":"德州市"},{"cid":"SD_15","cname":"聊城市"},{"cid":"SD_16","cname":"滨州市"},{"cid":"SD_17","cname":"菏泽市"}]},
{"pid":"HEN","pname":"河南省","citys":[{"cid":"HEN_1","cname":"郑州市"},{"cid":"HEN_2","cname":"开封市"},{"cid":"HEN_3","cname":"洛阳市"},{"cid":"HEN_4","cname":"平顶山市"},{"cid":"HEN_5","cname":"安阳市"},{"cid":"HEN_6","cname":"鹤壁市"},{"cid":"HEN_7","cname":"新乡市"},{"cid":"HEN_8","cname":"焦作市"},{"cid":"HEN_9","cname":"濮阳市"},{"cid":"HEN_10","cname":"许昌市"},{"cid":"HEN_11","cname":"漯河市"},{"cid":"HEN_12","cname":"三门峡市"},{"cid":"HEN_13","cname":"南阳市"},{"cid":"HEN_14","cname":"商丘市"},{"cid":"HEN_15","cname":"信阳市"},{"cid":"HEN_16","cname":"周口市"},{"cid":"HEN_17","cname":"驻马店市"}]},
{"pid":"HUB","pname":"湖北省","citys":[{"cid":"HUB_1","cname":"武汉市"},{"cid":"HUB_2","cname":"黄石市"},{"cid":"HUB_3","cname":"十堰市"},{"cid":"HUB_4","cname":"宜昌市"},{"cid":"HUB_5","cname":"襄樊市"},{"cid":"HUB_6","cname":"鄂州市"},{"cid":"HUB_7","cname":"荆门市"},{"cid":"HUB_8","cname":"孝感市"},{"cid":"HUB_9","cname":"荆州市"},{"cid":"HUB_10","cname":"黄冈市"},{"cid":"HUB_11","cname":"咸宁市"},{"cid":"HUB_12","cname":"随州市"},{"cid":"HUB_13","cname":"恩施土家族苗族自治州"}]},
{"pid":"HUN","pname":"湖南省","citys":[{"cid":"HUN_1","cname":"长沙市"},{"cid":"HUN_2","cname":"株洲市"},{"cid":"HUN_3","cname":"湘潭市"},{"cid":"HUN_4","cname":"衡阳市"},{"cid":"HUN_5","cname":"邵阳市"},{"cid":"HUN_6","cname":"岳阳市"},{"cid":"HUN_7","cname":"常德市"},{"cid":"HUN_8","cname":"张家界市"},{"cid":"HUN_9","cname":"益阳市"},{"cid":"HUN_10","cname":"郴州市"},{"cid":"HUN_11","cname":"永州市"},{"cid":"HUN_12","cname":"怀化市"},{"cid":"HUN_13","cname":"娄底市"},{"cid":"HUN_14","cname":"湘西土家族苗族自治州"}]},
{"pid":"GD","pname":"广东省","citys":[{"cid":"GD_1","cname":"广州市"},{"cid":"GD_2","cname":"韶关市"},{"cid":"GD_3","cname":"深圳市"},{"cid":"GD_4","cname":"珠海市"},{"cid":"GD_5","cname":"汕头市"},{"cid":"GD_6","cname":"佛山市"},{"cid":"GD_7","cname":"江门市"},{"cid":"GD_8","cname":"湛江市"},{"cid":"GD_9","cname":"茂名市"},{"cid":"GD_10","cname":"肇庆市"},{"cid":"GD_11","cname":"惠州市"},{"cid":"GD_12","cname":"梅州市"},{"cid":"GD_13","cname":"汕尾市"},{"cid":"GD_14","cname":"河源市"},{"cid":"GD_15","cname":"阳江市"},{"cid":"GD_16","cname":"清远市"},{"cid":"GD_17","cname":"潮州市"},{"cid":"GD_18","cname":"揭阳市"},{"cid":"GD_19","cname":"云浮市"}]},
{"pid":"GX","pname":"广西壮族自治区","citys":[{"cid":"GX_1","cname":"南宁市"},{"cid":"GX_2","cname":"柳州市"},{"cid":"GX_3","cname":"桂林市"},{"cid":"GX_4","cname":"梧州市"},{"cid":"GX_5","cname":"北海市"},{"cid":"GX_6","cname":"防城港市"},{"cid":"GX_7","cname":"钦州市"},{"cid":"GX_8","cname":"贵港市"},{"cid":"GX_9","cname":"玉林市"},{"cid":"GX_10","cname":"百色市"},{"cid":"GX_11","cname":"贺州市"},{"cid":"GX_12","cname":"河池市"},{"cid":"GX_13","cname":"来宾市"},{"cid":"GX_14","cname":"崇左市"}]},
{"pid":"HAN","pname":"海南省","citys":[{"cid":"HAN_1","cname":"海口市"},{"cid":"HAN_2","cname":"三亚市"}]},
{"pid":"CQ","pname":"重庆市","citys":[{"cid":"CQ_1","cname":"渝中区"},{"cid":"CQ_2","cname":"大渡口区"},{"cid":"CQ_3","cname":"江北区"},{"cid":"CQ_4","cname":"南岸区"},{"cid":"CQ_5","cname":"北碚区"},{"cid":"CQ_6","cname":"渝北区"},{"cid":"CQ_7","cname":"巴南区"},{"cid":"CQ_8","cname":"长寿区"},{"cid":"CQ_9","cname":"双桥区"},{"cid":"CQ_10","cname":"沙坪坝区"},{"cid":"CQ_11","cname":"万盛区"},{"cid":"CQ_12","cname":"万州区"},{"cid":"CQ_13","cname":"涪陵区"},{"cid":"CQ_14","cname":"黔江区"},{"cid":"CQ_15","cname":"石柱土家族自治县"},{"cid":"CQ_16","cname":"秀山土家族苗族自治县"},{"cid":"CQ_17","cname":"酉阳土家族苗族自治县"},{"cid":"CQ_18","cname":"彭水苗族土家族自治县"},{"cid":"CQ_19","cname":"其他"}]},
{"pid":"SC","pname":"四川省","citys":[{"cid":"SC_1","cname":"成都市"},{"cid":"SC_2","cname":"自贡市"},{"cid":"SC_3","cname":"攀枝花市"},{"cid":"SC_4","cname":"泸州市"},{"cid":"SC_5","cname":"德阳市"},{"cid":"SC_6","cname":"绵阳市"},{"cid":"SC_7","cname":"广元市"},{"cid":"SC_8","cname":"遂宁市"},{"cid":"SC_9","cname":"内江市"},{"cid":"SC_10","cname":"乐山市"},{"cid":"SC_11","cname":"南充市"},{"cid":"SC_12","cname":"眉山市"},{"cid":"SC_13","cname":"宜宾市"},{"cid":"SC_14","cname":"广安市"},{"cid":"SC_15","cname":"达州市"},{"cid":"SC_16","cname":"雅安市"},{"cid":"SC_17","cname":"巴中市"},{"cid":"SC_18","cname":"资阳市"},{"cid":"SC_19","cname":"阿坝藏族羌族自治州"},{"cid":"SC_20","cname":"甘孜藏族自治州"},{"cid":"SC_21","cname":"凉山彝族自治州"}]},
{"pid":"GZ","pname":"贵州省","citys":[{"cid":"GZ_1","cname":"贵阳市"},{"cid":"GZ_2","cname":"六盘水市"},{"cid":"GZ_3","cname":"遵义市"},{"cid":"GZ_4","cname":"安顺市"},{"cid":"GZ_5","cname":"铜仁地区"},{"cid":"GZ_6","cname":"黔西南布依族苗族自治州"},{"cid":"GZ_7","cname":"毕节地区"},{"cid":"GZ_8","cname":"黔东南苗族侗族自治州"},{"cid":"GZ_9","cname":"黔南布依族苗族自治州"}]},
{"pid":"YN","pname":"云南省","citys":[{"cid":"YN_1","cname":"昆明市"},{"cid":"YN_2","cname":"曲靖市"},{"cid":"YN_3","cname":"玉溪市"},{"cid":"YN_4","cname":"保山市"},{"cid":"YN_5","cname":"昭通市"},{"cid":"YN_6","cname":"丽江市"},{"cid":"YN_7","cname":"普洱市"},{"cid":"YN_8","cname":"临沧市"},{"cid":"YN_9","cname":"楚雄彝族自治州"},{"cid":"YN_10","cname":"红河哈尼族彝族自治州"},{"cid":"YN_11","cname":"文山壮族苗族自治州"},{"cid":"YN_12","cname":"西双版纳傣族自治州"},{"cid":"YN_13","cname":"大理白族自治州"},{"cid":"YN_14","cname":"德宏傣族景颇族自治州"},{"cid":"YN_15","cname":"怒江傈僳族自治州"},{"cid":"YN_16","cname":"迪庆藏族自治州"}]},
{"pid":"XZ","pname":"西藏自治区","citys":[{"cid":"XZ_1","cname":"拉萨市"},{"cid":"XZ_2","cname":"昌都地区"},{"cid":"XZ_3","cname":"山南地区"},{"cid":"XZ_4","cname":"日喀则地区"},{"cid":"XZ_5","cname":"那曲地区"},{"cid":"XZ_6","cname":"阿里地区"},{"cid":"XZ_7","cname":"林芝地区"}]},
{"pid":"SHX","pname":"陕西省","citys":[{"cid":"SHX_1","cname":"西安市"},{"cid":"SHX_2","cname":"铜川市"},{"cid":"SHX_3","cname":"宝鸡市"},{"cid":"SHX_4","cname":"咸阳市"},{"cid":"SHX_5","cname":"渭南市"},{"cid":"SHX_6","cname":"延安市"},{"cid":"SHX_7","cname":"汉中市"},{"cid":"SHX_8","cname":"榆林市"},{"cid":"SHX_9","cname":"安康市"},{"cid":"SHX_10","cname":"商洛市"}]},
{"pid":"GS","pname":"甘肃省","citys":[{"cid":"GS_1","cname":"兰州市"},{"cid":"GS_2","cname":"金昌市"},{"cid":"GS_3","cname":"白银市"},{"cid":"GS_4","cname":"天水市"},{"cid":"GS_5","cname":"武威市"},{"cid":"GS_6","cname":"张掖市"},{"cid":"GS_7","cname":"平凉市"},{"cid":"GS_8","cname":"酒泉市"},{"cid":"GS_9","cname":"庆阳市"},{"cid":"GS_10","cname":"定西市"},{"cid":"GS_11","cname":"陇南市"},{"cid":"GS_12","cname":"临夏回族自治州"},{"cid":"GS_13","cname":"甘南藏族自治州"},{"cid":"GS_14","cname":"嘉峪关市"}]},
{"pid":"QH","pname":"青海省","citys":[{"cid":"QH_1","cname":"西宁市"},{"cid":"QH_2","cname":"海东地区"},{"cid":"QH_3","cname":"海北藏族自治州"},{"cid":"QH_4","cname":"黄南藏族自治州"},{"cid":"QH_5","cname":"海南藏族自治州"},{"cid":"QH_6","cname":"果洛藏族自治州"},{"cid":"QH_7","cname":"玉树藏族自治州"},{"cid":"QH_8","cname":"海西蒙古族藏族自治州"}]},
{"pid":"NX","pname":"宁夏回族自治区","citys":[{"cid":"NX_1","cname":"银川市"},{"cid":"NX_2","cname":"石嘴山市"},{"cid":"NX_3","cname":"吴忠市"},{"cid":"NX_4","cname":"固原市"},{"cid":"NX_5","cname":"中卫市"}]},
{"pid":"XJ","pname":"新疆维吾尔自治区","citys":[{"cid":"XJ_1","cname":"乌鲁木齐市"},{"cid":"XJ_2","cname":"克拉玛依市"},{"cid":"XJ_3","cname":"吐鲁番地区"},{"cid":"XJ_4","cname":"哈密地区"},{"cid":"XJ_5","cname":"昌吉回族自治州"},{"cid":"XJ_6","cname":"博尔塔拉蒙古自治州"},{"cid":"XJ_7","cname":"巴音郭楞蒙古自治州"},{"cid":"XJ_8","cname":"阿克苏地区"},{"cid":"XJ_9","cname":"克孜勒苏柯尔克孜自治州"},{"cid":"XJ_10","cname":"喀什地区"},{"cid":"XJ_11","cname":"和田地区"},{"cid":"XJ_12","cname":"伊犁哈萨克自治州"},{"cid":"XJ_13","cname":"塔城地区"},{"cid":"XJ_14","cname":"阿勒泰地区"},{"cid":"XJ_15","cname":"石河子市"},{"cid":"XJ_16","cname":"阿拉尔市"},{"cid":"XJ_17","cname":"图木舒克市"},{"cid":"XJ_18","cname":"五家渠市"}]}
]
} 
//date: 2016-12-14 author: 李春枝 note: 上传图片预览
/*
	obj1  :上传按钮ID
	obj2  :图片预览区ID
	wPic  :图片缩放后宽度
	hPic  :图片缩放后高度
	istarget  :是否给图片父容器添加href
*/
amaJgl.upPic = function (obj){
	$('#'+obj.obj1).get(0).addEventListener('change', function(e) {    
		var options={
	        wPic:80,
	        hPic:60,
	        istarget:true
	      };  
	    obj=$.extend(options,obj);         
		if(window.FileReader){//ie10 ie10+ w3c
			e.stopPropagation();	        
		    var file = e.dataTransfer !== undefined ? e.dataTransfer.files[0] : e.target.files[0];
	        if (!file.type.match(/image.*/)) {
	          alert("文件格式不正确，请选择图片上传！");
	          return;
	        }
	        var fileReader = new FileReader();
	        fileReader.onload = (function() {
	          return function(e) {
	            $('#'+obj.obj2).attr("src",e.target.result);  
	            $('#'+obj.obj2).attr("width",obj.wPic);  
	            $('#'+obj.obj2).attr("height",obj.hPic);   
	            if(obj.istarget){
					$('#'+obj.obj2).parent().attr("href",e.target.result);
					$('#'+obj.obj2).parent().attr("target","_blank");
	            }else{
	            	$('#'+obj.obj2).parent().removeAttr("href");
	            	$('#'+obj.obj2).parent().removeAttr("target");
	            };     
	          }
	        })(file);
	        fileReader.readAsDataURL(file);			   
		}else{
			$(this)[0].select();
			$(this)[0].blur();
			var src = document.selection.createRange().text;
			$('#'+obj.obj2).attr("src",src);
			$('#'+obj.obj2).attr("width",wPic);  
            $('#'+obj.obj2).attr("height",hPic);
            if(obj.istarget){
				$('#'+obj.obj2).parent().attr("href",e.target.result);
				$('#'+obj.obj2).parent().attr("target","_blank");
	        }else{
	            $('#'+obj.obj2).parent().removeAttr("href");
	            $('#'+obj.obj2).parent().removeAttr("target");
	        }; 								
		};
		e.preventDefault();	
	});

};
//date: 2016-12-19 author: 杜关兴 note: 下拉框验证
/*
	id:       元素id
	nullval： 选择为空的值 
*/
amaJgl.ableSelect=function(id,nullval){
	var ele=document.getElementById(id);
	if(ele.value==nullval){
		return false;
	}else{
		return true;
	};
};
//date: 2016-12-21 author: 杜关兴 note: 正则配置文件  other：配置统计全站所需要的正则表达式
/*
	regConfig.xxx  :调用
*/
amaJgl.regExpConfig={
	notnull:/^.+$/,                                                                    //不为空
    phone:/^1[34578][0-9]{9}$/,                                                   //手机号
	email:/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,   //邮箱
	url:/(^(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$)|(^$)/,//有效网址
	hanzi:/^[\u4e00-\u9fa5]{0,}$/,                                                     //必须是汉字
	num:/^\d*$/,                                                                                     //数字
	ffzsnum:/^\\d+$/,　　                                                                            //非负整数（正整数 + 0）
	zzsnum:/^[0-9]*[1-9][0-9]*$/,　　                                                                //正整数
	fzsnum:/^((-\\d+)|(0+))$/,　　                                                                   //非正整数（负整数 + 0）
	fzsnum:/^-[0-9]*[1-9][0-9]*$/,　　                                                               //负整数
	zsnum:/^-?\\d+$/,　　　　                                                                        //整数
	fffdsnum:/^\\d+(\\.\\d+)?$/,　　                                                                 //非负浮点数（正浮点数 + 0）
	zfdsnum:/^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,　　 //正浮点数
	fzfdsnum:/^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$/,　　                                               //非正浮点数（负浮点数 + 0）
	ffdsnum:/^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,  //负浮点数
	fdsnum:/^(-?\\d+)(\\.\\d+)?$/,　　                                                               //浮点数
	zimu:/^[A-Za-z]+$/,　　                                                               //由26个英文字母组成的字符串
	dxzimu:/^[A-Z]+$/,　　                                                                //由26个英文字母的大写组成的字符串
	xzimu:/^[a-z]+$/,　　                                                                 //由26个英文字母的小写组成的字符串
	zimunum:/^[A-Za-z0-9]+$/,　　                                                         //由数字和26个英文字母组成的字符串
	zimunum_:/^\\w+$/,　　                                                                //由数字、26个英文字母或者下划线组成的字符串 
	carded:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/                                  //身份证
};
//date: 2016-12-21 author: 杜关兴 note:form提交校验 
/*
	elelist:json配置（包含输入框id，提示容器id，数组形式的正则与提示文字）
	funerr：失败回调函数
	funerrlist：失败错误输入框ID回调函数
*/
amaJgl.tbdFormValidate=function(elelist,objs){	
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
	document.getElementById(objs.elesubmit).onsubmit=function(){//提交操作
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
		//验证失败	
		if(errlen>0){
			objs.funerr();//失败
			objs.funerrlist(errlist);//失败输入框元素id
			return false;
		};
		
		//验证通过 form 提交
		objs.elesubmit.submit();
	};
};
//date: 2016-12-22 author: 杜关兴 note:邮箱自动补全
/*
	inputid:输入框id
	selectsuccess:选择值后的事件回调
	regpass:符合邮箱格式回调
	regerr:不符合邮箱格式回调
	amaJgl.tbdAutoEmailMap  :邮箱补全列表配置文件
	amaJgl.TbdAutoEmail.keydownevent  :利用键盘选取赋值成功 调用的额外回调 会返回操作输入框id
*/
amaJgl.tbdAutoEmailMap=["qq.com","163.com","126.com","sina.com","hotmail.com","yahoo.com","sohu.com","yahoo.cn","gmail.com","tom.com"];
amaJgl.TbdAutoEmail=function(opts){
	this.inputid=opts.inputid;
	this.selectsuccess=opts.selectsuccess;
	this.regpass=opts.regpass;
	this.regerr=opts.regerr;
	this.emailList=amaJgl.tbdAutoEmailMap  //邮箱补全列表
	this.eleinputid=document.getElementById(this.inputid);//输入框
	this.elebody=document.getElementsByTagName("body")[0];//body元素	
	this.elebox=document.createElement("div");//选择列表根元素
	this.elebox.id=this.inputid+"_layer";
	this.elebox.className="emaillayer";
	this.elebody.appendChild(this.elebox);//body元素 插入 选择列表根元素
 	this.reg=/(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)|(^\w+$)|(^\w+((-\w+)|(\.\w+))*$)|(^\w+((-\w+)|(\.\w+))*\@$)|(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+$)|(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*$)|(^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.$)/;

	this.init=function(){
		this.addevent();
	};

	this.addevent=function(){
		var that=this;
		this.eleinputid.onkeyup=function(event){
			var ev=window.event || event;
			var target=ev.srcElement || ev.target;
			that.layer(this);
		};
		this.eleinputid.onfocus=function(){
			var alllist=document.getElementsByTagName("div");
			for(var i=0;i<alllist.length;i++){
				if(alllist[i].className=="emaillayer"){
					alllist[i].style.display="none";
				};							
			};
			that.layer(this);
		};
		this.eleinputid.onclick=function(event){
			var ev=window.event || event;
			var target=ev.srcElement || ev.target;
			if(ev.stopPropagation){
				ev.stopPropagation();	
			}else{
				ev.cancelBubble = true;
			};					
		};
		this.elebox.onclick=function(event){
			var ev=window.event || event;
			var target=ev.srcElement || ev.target;
			that.eleinputid.value=target.innerHTML;
			that.elebox.style.display="none";
			if(that.selectsuccess){
				that.selectsuccess();
			};	
			if(ev.stopPropagation){
				ev.stopPropagation();	
			}else{
				ev.cancelBubble = true;
			};		
		};
	};	
	this.layer=function(self){
		//输入框x y 宽 高
		var ix=self.getBoundingClientRect().left;
		var iy=self.getBoundingClientRect().top;
		var iw=self.offsetWidth;
		var ih=self.offsetHeight;
		//输入框值位置宽度设置
		this.elebox.style.left=ix+"px";
		this.elebox.style.top=(iy+ih-1)+"px";
		this.elebox.style.width=iw+"px";
		//获取输入框值
		var dval=self.value.replace(/(^\s*)|(\s*$)/g, "");
		//获取@之前的值	
		if(dval==""){
			this.elebox.style.display="none";
			return false;
		};
		if(!this.reg.test(dval)){
			this.elebox.style.display="none";
			if(this.regerr){
				this.regerr();
			};	
			return false;
		};
		if(this.regpass){
			this.regpass();
		};		
		dval=this.realval(dval);
		//形成选择列表 插入到 选择列表根元素
		this.elebox.innerHTML="";
		for(var i=0;i<this.emailList.length;i++){
			var item=document.createElement("div");//选择列表根元素
			item.className="emaillayer_list";
			if(i==0){
				item.className="emaillayer_list active";
			};
			item.innerHTML=dval+"@"+this.emailList[i];
			this.elebox.appendChild(item);
		};
		//显示
		this.elebox.style.display="block";
	};
	this.hidelayer=function(){
		this.elebox.style.display="none";
	};
	this.realval=function(dval){		
		var ri=dval.search("@");
		if(ri==-1){
			return dval;
		}else{
			return dval.substring(0,ri);
		};
	};
};
document.onclick=function(event){
	//页面点击 隐藏所有显示
	var alllist=document.getElementsByTagName("div");
	for(var i=0;i<alllist.length;i++){
		if(alllist[i].className=="emaillayer"){
			alllist[i].style.display="none";
		};							
	};
};
amaJgl.TbdAutoEmail.keydownevent=null;
document.onkeydown=function(event){
	//键盘赋值
	var ev=window.event || event;
	var keyc=ev.keyCode||ev.which||ev.charCode;	
	var alllist=document.getElementsByTagName("div");
	var showautoemail=null;
	for(var i=0;i<alllist.length;i++){
		if(alllist[i].className=="emaillayer"){
			if(alllist[i].style.display=="block"){
				showautoemail=alllist[i];
			};
		};							
	};	
	if(showautoemail){//显示的弹窗根元素
		var showautoemailid=showautoemail.id;
		var showinput=document.getElementById(showautoemailid.substring(0,showautoemailid.lastIndexOf("_")));//显示的弹窗根元素 对应的input		

		var ai=0;//active位置
		var childlist=showautoemail.getElementsByTagName("div");
		for(var i=0;i<childlist.length;i++){
			if(childlist[i].className.search("active")!=-1){
				ai=i;
			};
		};
		childlist[ai].className="emaillayer_list";
		if(keyc==38){//上		
			showinput.blur();//阻止和输入框keyup冲突
			if(ai==0){
				childlist[childlist.length-1].className="emaillayer_list active";
				showinput.value=childlist[childlist.length-1].innerHTML;
			}else{
				childlist[ai-1].className="emaillayer_list active";
				showinput.value=childlist[ai-1].innerHTML;
			};
			if(amaJgl.TbdAutoEmail.keydownevent){
				amaJgl.TbdAutoEmail.keydownevent(showinput.id);
			};	
			return false;//阻止页面滚动
		}else if(keyc==40){//下
			showinput.blur();//阻止和输入框keyup冲突
			if(ai==childlist.length-1){
				childlist[0].className="emaillayer_list active";
				showinput.value=childlist[0].innerHTML;
			}else{
				childlist[ai+1].className="emaillayer_list active";
				showinput.value=childlist[ai+1].innerHTML;
			};
			if(amaJgl.TbdAutoEmail.keydownevent){
				amaJgl.TbdAutoEmail.keydownevent(showinput.id);
			};			
			return false;
		}else if(keyc==13){//回车
			showinput.blur();//阻止和输入框keyup冲突
			showinput.value=childlist[ai].innerHTML;
			showautoemail.style.display="none";
			if(amaJgl.TbdAutoEmail.keydownevent){
				amaJgl.TbdAutoEmail.keydownevent(showinput.id);
			};	
		};
	};	
};
amaJgl.TbdAutoEmail.setposition=function(){
	//位置社会资
	var alllist=document.getElementsByTagName("div");
	var showautoemail=null;
	for(var i=0;i<alllist.length;i++){
		if(alllist[i].className=="emaillayer"){
			if(alllist[i].style.display=="block"){
				showautoemail=alllist[i];
			};
		};							
	};	
	if(showautoemail){//显示的弹窗根元素
		var showautoemailid=showautoemail.id;
		var showinput=document.getElementById(showautoemailid.substring(0,showautoemailid.lastIndexOf("_")));//显示的弹窗根元素 对应的input
		//输入框x y 宽 高
		var ix=showinput.getBoundingClientRect().left;
		var iy=showinput.getBoundingClientRect().top;
		var iw=showinput.offsetWidth;
		var ih=showinput.offsetHeight;
		//输入框值位置宽度设置
		showautoemail.style.left=ix+"px";
		showautoemail.style.top=(iy+ih-1)+"px";
		showautoemail.style.width=iw+"px";
	};
};
window.onresize=function(){
	//窗口变化 重置位置
	amaJgl.TbdAutoEmail.setposition();
};
window.onscroll=function(){	
	//滚动 重置位置
	amaJgl.TbdAutoEmail.setposition();
};
//date: 2016-12- author: 杜关兴 note:
/*
	
*/