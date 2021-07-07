/**
 * 网页自动布局
 * @author yzzhouyalei@foxmail.com
 */
$.layout_zyl = {
	config:{class_name:"layout",wend:"800",},// 自动布局参数
	init:function(options){
		$.extend(this.config,options);
		
		var _config = this.config;
		var _this = this;
		
		// 页面重新布局
		_this.layout_support();
		$(window).resize(function(){
			setTimeout(function() {$.layout_zyl.layout_support();}, 100);
		});
	},
	/**
	 * 网页重新布局
	 * @author yzzhouyalei@foxmail.com
	 * 使用方法:$.layout_zyl.init({class_name:"layout"});
	 * 使用默认配置时简写为:$.layout_zyl.init({}); 网页布局时,<div class="a b c layout"
	 * layout_w="w-20" layout_h="h-50"></div> w代表网页宽度,h代表网页高度
	 */
	layout_support:function(){
		var _layout = this.config;
		var w = $(window).width();
		var h = $(window).height();
		if (w<=_layout.wend) {
			return;
		}
		
		$.each($("."+_layout.class_name),function(i,v){
			var pw = $(this).parent().width();
			var ph = $(this).parent().height();
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
};