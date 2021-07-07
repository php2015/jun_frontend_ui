// 当前登录用户ID
var _user_id = $.cookie("userId");
var _token = $.cookie("token");
// 接口地址
var api_path = "http://127.0.0.1:81/";
// 图片前缀
var img_prefix = "http://lemon-house-hb2.oss-cn-beijing.aliyuncs.com/";


// 登录控制
if(typeof _no_check_login=="undefined"&&(_user_id==undefined||_user_id<=0)){
	//location.href="/zyl-ms/static_v2/login.html";
}

