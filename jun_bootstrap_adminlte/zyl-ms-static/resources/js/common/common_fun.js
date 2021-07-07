
/**
 * 跳转链接
 * @param _url 要跳转的地址
 * @param _this 可以为空, 用于左侧菜单选中
 */
function fun_to_link(_url,_this){
	$(".ajax_main_content").load(_url);
	if(_this!=undefined){
		$(".sidebar-menu li.active").removeClass("active");
		$(_this).parent().addClass("active");
	}
}
/**
 * 操作成功提示
 */
function fun_succ(){
	$(".ajax_load_header").append($('<div id="_my_alert" class="alert alert-success bg-green disabled msg-tip"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>成功！</strong>结果是成功的。</div>'));
	setTimeout(function(){
		$("#_my_alert").find(".close").click();
	},3000);
}
/**
 * 初始化input样式
 */
function fun_init_input_style(){
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue',
		increaseArea: '20%' /* optional */
	});
}
/**
 * 退出登录
 */
function fun_logout(){
	$.cookie("hotelId",0,{expires:-1,path:"/"});
	$.cookie("hotelName",0,{expires:-1,path:"/"});
	$.cookie("userId",0,{expires:-1,path:"/"});
	// 清除cookie
	window.location.href="/happy_house_manager/login.html";
}
