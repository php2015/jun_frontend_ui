var _temp_timeout;
var _dropdown_refresh_allow = true;
var resubmit_token = undefined;
/**
 * 基础工具类
 * @author yzzhouyalei@foxmail.com
 */
$.basic_zyl = {
	config:{
		layout:{auto:true,class_name:"layout",wend:"800",},// 自动布局参数
		infowin:{width:600,height:400,hasParent:0,title:"信息窗口",setContent:function(){},bindShowClass:"temp"},// 信息窗口参数
		chrome_autocomplete:"off",
		confirm_win:{msg:"msg",fun_ok:function(){console.log("ok");},fun_cancel:function(){console.log("cancel");},btn_ok:"确定",btn_cancel:"取消"},
		alert_win:{msg:"msg",fun_ok:function(){console.log("ok");}},
		info_win:{info:"info",fun_ok:function(){console.log("ok");},fun_cancel:function(){console.log("cancel");},btn_ok:"确认",btn_cancel:"取消"},
	},
	init:function(options){
		$.extend(this.config,options);
		
		var _config = this.config;
		var _layout = _config.layout;
		var _this = this;
		
		// 页面重新布局
		if(_layout.auto){
			_this.layout_support();
			/*$(window).resize(function(){
				_this.layout_support();
				_this.layout_support();
			});*/
			$(window).resize(function(){
				//_this.layout_support();
				setTimeout(function() {$.basic_zyl.layout_support();}, 100);
			});
		}
		// chrome浏览器记住输入框内容
		if (_config.chrome_autocomplete=="off") {
			if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1){
				var selectors = document.getElementsByTagName("input");
				for(var i=0;i<selectors.length;i++){
					if((selectors[i].type !== "submit") && (selectors[i].type !== "password")){
						selectors[i].disabled= true;
					}
				}
				setTimeout(function(){
					for(var i=0;i<selectors.length;i++){
						if(selectors[i].type !== "submit"){
							selectors[i].disabled= false;
						}
					}
				},100)
			}
		}
	},
	/**
	 * TODO 获取当前链接中参数
	 */
	get_query_string: function(str) {
		var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURI(r[2]);
		return null;
	},
	/**
	 * TODO 获取接口json数据并调用回调函数
	 * @param conf 例{url:"",data:{},callback:function(data){alert(data.text);}}
	 */
	get_data_cross_domain : function(conf) {
		var _this = this, _pr = parent || window, _now = new Date().getTime();
		
		if (typeof conf.init_before == 'function') {
			conf.init_before();
		}
		var u = conf.url==undefined?router_path:conf.url;

		conf.data._random = Math.random();
		conf.data.token = _token;
		
		var _data = JSON.stringify(conf.data||{});
		
		// 重复提交
		if(resubmit_token == u+_data){
			console.log("不能重复提交!");
			return;
		}
		resubmit_token = u+_data;
		setTimeout(function(){resubmit_token=undefined},500);
		
		console.log(_data);
		$.ajax({
			url : u,
			traditional:true,
			data : _data,
			dataType : "text",
			type : "POST",
			crossDomain:true,
			contentType:"application/json;charset=UTF-8",
			cache:false,
			success : function(data) {
				data = $.parseJSON(data);
				console.log(data);
				conf.callback(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (typeof conf.error == 'function') {
					conf.error();
				}
				_this.show_tip({"msg":"服务器异常! 错误信息:" + XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus,scene:"danger","time":10*1000});
			}
		});
	},
	/**
	 * $.basic_zyl.show_tip({"msg":"操作成功","time":1*60*60*1000,"close_finish":function(){}});
	 */
	show_tip : function(conf){
		$(".msg_body").remove();
		clearTimeout(_temp_timeout);
		
		var msg_body = $("<div class='msg_body'></div>");
		msg_body.html("<div class='ztip-content'></div>");
		msg_body.find(".ztip-content").html(conf.msg);
		
		// css
		msg_body.css({
			"background":"rgba(0,0,0,0.6)",
			"box-shadow":"0 0 1vw #000",
			"border-radius":"0.5vw",
			"font-size":"1vw",
			"color":"#fff",
			"z-index":"99999",
			"position": "fixed",
		    "bottom": "15%",
		    "left": "20%",
		    "width":"60%",
			"text-align": "center",
			"padding":"0.5vw 0 0.5vw 0",
		}).appendTo($("body"));
		_temp_timeout = setTimeout(function(){
			$('.msg_body').remove();
		},conf.time==undefined?5*1000:conf.time);
	},
	show_tip_destroy:function(_time){
		setTimeout(function(){
			$(".msg_body").remove();
		},_time==undefined?800:_time);
	},
	/**
	 * 显示提示信息
	 */
	show_confirm:function(conf){
		$("#style_show_confirm").remove();
		$(".confirm_bg").remove();
		$(".confirm_body").remove();
		
		$.extend(true,this.config,conf);
		var _confirm_conf = this.config.confirm_win;
		
		var _body = $("<div class='confirm_body'></div>");
		var _msg = $("<div class='confirm_msg'></div>").html(_confirm_conf.msg);
		var _btns = $("<div class='confirm_btns'></div>");
		var _ok = $("<span class='confirm_btn_ok'></span>").html(_confirm_conf.btn_ok);
		var _cancel = $("<span class='confirm_btn_cancel'></span>").html(_confirm_conf.btn_cancel);
		var _bg = $("<div class='confirm_bg'></div>");
		
		_ok.bind("click",function(){
			$(".confirm_bg").remove();
			$(".confirm_body").remove();
			$("#style_show_confirm").remove();
			_confirm_conf.fun_ok();
		});
		_cancel.bind("click",function(){
			$(".confirm_bg").remove();
			$(".confirm_body").remove();
			$("#style_show_confirm").remove();
			_confirm_conf.fun_cancel();
		});
		
		$("body").append(_body.append(_msg).append(_btns.append(_ok).append(_cancel))).append(_bg);
		$("body").append($('<style type="text/css" id="style_show_confirm">'+
			'.confirm_bg{position:fixed;width:100%;height:100%;z-index:999;background:rgba(0,0,0,0.5);top:0;left:0;}'+
			'.confirm_body{position:fixed;width:80%;background:#FFF;border-radius:1vw;top:30%;left:10%;display:inline-block;z-index:9999;}'+
			'.confirm_body .confirm_msg{margin:4vw;font-size:3.5vw;padding:5vw 0;}'+
			'.confirm_body .confirm_btns{text-align:right;margin:4vw;font-size:3.5vw;}'+
			'.confirm_body .confirm_btns .confirm_btn_ok{color:green;margin-right:2vw;padding:1vw 4vw;cursor:pointer;}'+
			'.confirm_body .confirm_btns .confirm_btn_ok:hover{background:#ccc;}'+
			'.confirm_body .confirm_btns .confirm_btn_cancel{color:#666;padding:1vw 4vw;cursor:pointer;}'+
			'.confirm_body .confirm_btns .confirm_btn_cancel:hover{background:#ccc;color:#FFF;}'+
		'</style>'));
	},
	show_alert:function(conf){
		$("#style_show_alert").remove();
		$(".confirm_bg").remove();
		$(".confirm_body").remove();
		
		$.extend(true,this.config,conf);
		var _confirm_conf = this.config.alert_win;
		
		var _body = $("<div class='confirm_body'></div>");
		var _msg = $("<div class='confirm_msg'></div>").html(_confirm_conf.msg);
		var _btns = $("<div class='confirm_btns'></div>");
		var _ok = $("<span class='confirm_btn_ok'>确定</span>");
		var _bg = $("<div class='confirm_bg'></div>");
		
		_ok.bind("click",function(){
			$(".confirm_bg").remove();
			$(".confirm_body").remove();
			$("#style_show_alert").remove();
			_confirm_conf.fun_ok();
		});
		
		$("body").append(_body.append(_msg).append(_btns.append(_ok))).append(_bg);
		$("body").append($('<style type="text/css" id="style_show_alert">'+
			'.confirm_bg{position:fixed;width:100%;height:100%;z-index:999;background:rgba(0,0,0,0.5);top:0;left:0;}'+
			'.confirm_body{position:fixed;width:80%;background:#FFF;border-radius:1vw;top:30%;left:10%;display:inline-block;z-index:9999;}'+
			'.confirm_body .confirm_msg{margin:4vw;font-size:3.5vw;padding:5vw 0;}'+
			'.confirm_body .confirm_btns{text-align:right;margin:4vw;font-size:3.5vw;}'+
			'.confirm_body .confirm_btns .confirm_btn_ok{color:green;margin-right:4vw;padding:0 2vw;cursor:pointer;}'+
		'</style>'));
	},
	/**
	 * $.basic_zyl.show_info_window({info_win:{info:"html",fun_ok:function(){},fun_cancel:function(){},btn_ok:"确认提交",btn_cancel:"取消"}});
	 */
	show_info_window:function(conf){
		$("#style_show_info_window").remove();
		$(".confirm_bg").remove();
		$(".confirm_body").remove();
		
		$.extend(true,this.config,conf);
		var _info_window_conf = this.config.info_win;
		
		var _body = $("<div class='confirm_body'></div>");
		var _msg = $("<div class='confirm_info'></div>").html(_info_window_conf.info);
		var _btns = $("<div class='confirm_btns'></div>");
		var _ok = $("<span class='confirm_btn_ok'></span>").html(_info_window_conf.btn_ok);
		var _cancel = $("<span class='confirm_btn_cancel'></span>").html(_info_window_conf.btn_cancel);
		var _bg = $("<div class='confirm_bg'></div>");
		var _clear = $("<div class='clear_both'></div>");
		
		_ok.bind("click",function(){
			$(".confirm_bg").remove();
			$(".confirm_body").remove();
			$("#style_show_info_window").remove();
			_info_window_conf.fun_ok();
		});
		_cancel.bind("click",function(){
			$(".confirm_bg").remove();
			$(".confirm_body").remove();
			$("#style_show_info_window").remove();
			_info_window_conf.fun_cancel();
		});
		
		$("body").append(_body.append(_msg).append(_btns.append(_cancel).append(_ok).append(_clear))).append(_bg);
		$("body").append($('<style type="text/css" id="style_show_info_window">'+
			'.confirm_bg{position:fixed;width:100%;height:100%;z-index:999;background:rgba(0,0,0,0.5);top:0;left:0;}'+
			'.confirm_body{position:fixed;width:80%;background:#FFF;top:30%;left:10%;z-index:9999;overflow:hidden;margin:0px;padding:0px;border-radius:2vw;}'+
			'.confirm_body .confirm_info{margin:4vw 4vw 2vw 4vw;font-size:3.5vw;}'+
			'.confirm_body .confirm_btns{width:100%;text-align:center;font-size:3.5vw;border-top:1px solid #EBEBEB;border-bottom-right-radius:2vw;}'+
			'.confirm_body .confirm_btns .confirm_btn_cancel{width:50%;color:#666;cursor:pointer;padding:3vw 0vw 2.5vw 0vw;float:left;background:#FFF;}'+
			'.confirm_body .confirm_btns .confirm_btn_ok{width:50%;color:#fff;background:#fecf0d;cursor:pointer;padding:3vw 0vw 2.5vw 0vw;float:left;border-bottom-right-radius:2vw;}'+
		'</style>'));
	},
	/**
	 * 网页重新布局
	 * @author yzzhouyalei@foxmail.com
	 * 
	 * 使用方法:$.basic_zyl.init({config:{layout:{auto:true,class_name:"layout"}}});
	 * 使用默认配置时简写为:$.basic_zyl.init({}); 网页布局时,<div class="a b c layout"
	 * layout_w="w-20" layout_h="h-50"></div> w代表网页宽度,h代表网页高度
	 */
	layout_support:function(){
		var _layout = this.config.layout;
		var w = $(window).width();
		var h = $(window).height();
		if (w<=_layout.wend) {
			return;
		}
		
		$.each($("."+_layout.class_name),function(i,v){
			var pw = $(this).parent().width();
			var ph = $(window).parent().height();
			var ew = $(this).attr("layout_w"),
				eh = $(this).attr("layout_h"),
				elh = $(this).attr("layout_lh"),
				center = $(this).attr("layout_center");
			
			if(eh!=undefined)
				$(this).css({"height":eval("("+eh+")")});
			if(ew!=undefined)
				$(this).css({"width":eval("("+ew+")")});
			if(elh!=undefined)
				$(this).css({"line-height":eval("("+elh+")")+"px"});
			if(center=="yes"){
				$(this).css({"position":"absolute","left":($(window).width()-$(this).width())/2});
			}
		});
	},
	/**
	 * 日期格式化传入参数:{date:,fmt:"yyyy-MM-dd HH:mm:ss"}
	 * @author yzzhouyalei@foxmail.com
	 * @param opt
	 * @returns
	 */
	datetime_format:function(opt){
		var _date = opt.date;
		var _fmt = opt.fmt;
		
		var o = {
		        "M+": _date.getMonth() + 1, //月份 
		        "d+": _date.getDate(), //日 
		        "H+": _date.getHours(), //小时 
		        "m+": _date.getMinutes(), //分 
		        "s+": _date.getSeconds(), //秒 
		        "q+": Math.floor((_date.getMonth() + 3) / 3), //季度 
		        "S": _date.getMilliseconds() //毫秒 
		    };
	    if (/(y+)/.test(_fmt)) _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(_fmt)) _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return _fmt;
	},
	/**
	 * 在新标签页打开
	 */
	open_new_tab:function(opt){
		var a = $("<a href='"+opt.url+"' target='_blank'>test</a>").get(0);
		var e = document.createEvent('MouseEvents');
		e.initEvent( 'click', true, true );
		a.dispatchEvent(e);
	},
	/**
	 * 上传图片
	 * @param $.basic_zyl.upload_image({file_selector:"#user_head"});
	 */
	upload_image:function(opt){
		var p = $.extend({  
			file_type: "gif|jpg|jpeg|png|bmp",					//允许的文件格式
			//url: "/ajax/handler.html",						//上传URL地址
			before_fun: "upload_before",						//上传前执行的方法
			success: function(d){},						//上传成功后执行的方法
			error_fun: "upload_error",							//上传失败后执行的方法
			file_selector:"#user_head",							// 
		}, opt);
		console.log(p);
		// 校验文件格式
		var postfix = $(p.file_selector).val().substring($(p.file_selector).val().lastIndexOf("."), $(p.file_selector).val().length).toLowerCase();
		var re = new RegExp("\.(" + p.file_type + ")$");
		if(!re.test(postfix)){
			_this.show_tip({"msg":"文件格式不属于gif|jpg|jpeg|png|bmp",scene:"danger","time":5*1000});
			return false;
		}
		
		// 设置表单
		var _form = $(p.file_selector+"_form");

		// 显示正在上传
		$(p.file_selector).parent().append($("<span class='temp_loadding'>正在上传...</span>"));

		// 禁用上传控件
		$(p.file_selector).attr("readonly",true);

		// 构建ajaxSubmit参数
		_form.ajaxSubmit({
			dataType:"text",
			success:function(d){
				d = $.parseJSON(d);
				// 删除正在上传提示
				$(".temp_loadding").remove();
				// 解除禁用上传控件
				$(p.file_selector).attr("readonly",false);
				// 回调
				p.success(d);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
	},
	/**
	 * 获取年龄
	 * @param {Object} str
	 */
	get_age_by_birthday:function(str){
		if(str==undefined)return 0;
		
		
		var returnAge;
		var strArr = str.split("-");
		var birthYear = strArr[0];
		var birthMonth = strArr[1];
		var birthDay = strArr[2];
		
		d = new Date();
		var nowYear = d.getFullYear();
		var nowMonth = d.getMonth() + 1;
		var nowDay = d.getDate();
		
		if(nowYear == birthYear) {
			returnAge = 0; //同年 则为0岁  
		} else {
			var ageDiff = nowYear - birthYear; //年之差  
			if(ageDiff > 0) {
				if(nowMonth == birthMonth) {
					var dayDiff = nowDay - birthDay; //日之差  
					if(dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					var monthDiff = nowMonth - birthMonth; //月之差  
					if(monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天  
			}
		}
		
		return returnAge; //返回周岁年龄  
	},
	/**
	 * 下拉刷新
	 * $.basic_zyl.drop_down_refresh({operate:function(){alert("刷新");}});
	 * document.body.style.overflow="auto";//隐藏页面水平和垂直滚动条
	 */
	drop_down_refresh: function(opt) {
		//console.log("scroll_top:"+$(window).scrollTop()+",document.height:"+ $(document).height()+",window.height:"+$(window).height());
		if ($(document).height() - $(window).height() - $(window).scrollTop()<=30 && _dropdown_refresh_allow) {
			_dropdown_refresh_allow = false;
			document.body.style.overflow="hidden";//隐藏页面水平和垂直滚动条
			console.log(new Date()+"执行回调");
			setTimeout(function(){_dropdown_refresh_allow=true;},500);
			// 回调
			opt.operate();
	    }
	},
	/**
	 * 页面展示事件, 仅用于iphone浏览器
	 */
	page_show:function(opt){
		if(navigator.userAgent.toLowerCase().indexOf("iphone")!=-1){
			window.onpageshow=function(evt){opt.callback();};
			return;
		}
		opt.callback();
	},
};