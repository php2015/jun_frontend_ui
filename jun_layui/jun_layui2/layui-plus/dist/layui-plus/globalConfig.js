/** layui-plus-v1.0.0 MIT License By https://gitee.com/zqaq_520/layui-plus */
 ;layui.define(['jquery'],function(exports){
	/* 
	//防止页面单独打开【登录页面除外】
	if(/layuicms2.0\/page/.test(top.location.href) && !/login.html/.test(top.location.href)){
		top.window.location.href = window.location.href.split("layuicms2.0/page/")[0] + 'layuicms2.0/';
	} */
	
	exports('globalConfig', {
		container: 'LAY_app' ,//容器ID
		iconUrl: "https://at.alicdn.com/t/font_400842_q6tk84n9ywvu0udi.css",
		distPath: layui.cache.host + 'layui-plus/dist/',
		rootPath: layui.cache.host + 'layui-plus/'
	});
});



 