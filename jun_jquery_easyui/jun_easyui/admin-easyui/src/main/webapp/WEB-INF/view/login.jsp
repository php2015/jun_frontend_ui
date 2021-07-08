<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html pageIdentity="login">
<head>
<title>欢迎登录</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/image/iconkey.ico" media="screen" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.cookie.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/zice.style.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/tipsy.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/icon.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/buttons.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/iphone.check.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-jrumble.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.tipsy.js"></script>
<script type="text/javascript">
	if (top != self) {
		if (top.location != self.location)
			top.location = self.location;
	}
</script>
<style type="text/css">
html {
	background-image: none;
}

label.iPhoneCheckLabelOn span {
	padding-left: 0px
}

#versionBar {
	background-color: #212121;
	position: fixed;
	width: 100%;
	height: 35px;
	bottom: 0;
	left: 0;
	text-align: center;
	line-height: 35px;
	z-index: 11;
	-webkit-box-shadow: black 0px 10px 10px -10px inset;
	-moz-box-shadow: black 0px 10px 10px -10px inset;
	box-shadow: black 0px 10px 10px -10px inset;
}

.copyright {
	text-align: center;
	font-size: 10px;
	color: #CCC;
}

.copyright a {
	color: #A31F1A;
	text-decoration: none
}

/*update-begin--Author:tanghong  Date:20130419 for：【是否】按钮错位*/
.on_off_checkbox {
	width: 0px;
}
/*update-end--Author:tanghong  Date:20130419 for：【是否】按钮错位*/
#login .logo {
	width: 500px;
	height: 51px;
}

#cap {
	margin-left: 88px;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		onfocus();
		$(".on_off_checkbox").iphoneStyle();
		$('.tip a ').tipsy({
			gravity : 'sw'
		});
		$('#login').show().animate({
			opacity : 1
		}, 2000);
		$('.logo').show().animate({
			opacity : 1,
			top : '32%'
		}, 800, function() {
			$('.logo').show().delay(1200).animate({
				opacity : 1,
				top : '1%'
			}, 300, function() {
				$('.formLogin').animate({
					opacity : 1,
					left : '0'
				}, 300);
				$('.userbox').animate({
					opacity : 0
				}, 200).hide();
			});
		});

		$('.userload').click(function(e) {
			$('.formLogin').animate({
				opacity : 1,
				left : '0'
			}, 300);
			$('.userbox').animate({
				opacity : 0
			}, 200, function() {
				$('.userbox').hide();
			});
		});
		// 重置
		$('#forgetpass').click(function(e) {
			$(":input").each(function() {
				$('#' + this.name).val("");
			});
		});
		// 点击登录
		$('#but_login').click(function(e) {
			submit();
		});
		//回车登录
		$(document).keydown(function(e) {
			if (e.keyCode == 13) {
				submit();
			}
		});

		$('#Kaptcha').click(function() {
			$(this).hide().attr('src', '${pageContext.request.contextPath}/captcha?' + Math.floor(Math.random() * 100)).fadeIn();
		});
	});
	//表单提交
	function submit() {
		var submit = true;
		$("input[nullmsg]").each(function() {
			if ($("#" + this.name).val() == "") {
				showError($("#" + this.name).attr("nullmsg"), 500);
				jrumble();
				setTimeout('hideTop()', 1000);
				submit = false;
				return false;
			}
		});
		if (submit) {
			hideTop();
			loading('登录中..', 1);
			setTimeout("unloading()", 1000);
			setTimeout("Login()", 1000);
		}

	}
	//登录处理函数
	function Login() {
		setCookie();
		var actionurl = $('form').attr('action');//提交路径
		var formData = new Object();
		var data = $(":input").each(function() {
			formData[this.name] = $("#" + this.name).val();
		});
		$.ajax({
			async : false,
			type : 'POST',
			url : actionurl,// 请求的action路径
			data : formData,
			dataType:'json',
			error : function() {// 请求失败处理函数
			},
			success : function(d) {
				if (d.status==000000) {
					loginsuccess();
					setTimeout("window.location.href='index.html'", 1000);
				} else {
					showError(d.message);
				}
			}
		});
	}
	//设置cookie
	function setCookie() {
		if ($('#on_off').val() == '1') {
			$("input[iscookie='true']").each(function() {
				$.cookie(this.name, $("#" + this.name).val(), "/", 24);
				$.cookie("COOKIE_NAME", "true", "/", 24);
			});
		} else {
			$("input[iscookie='true']").each(function() {
				$.cookie(this.name, null);
				$.cookie("COOKIE_NAME", null);
			});
		}
	}
	//点击消息关闭提示
	$('#alertMessage').click(function() {
		hideTop();
	});
	//显示错误提示
	function showError(str) {
		$('#alertMessage').addClass('error').html(str).stop(true, true).show().animate({
			opacity : 1,
			right : '0'
		}, 500);

	}
	//验证通过加载动画
	function loginsuccess() {
		$("#login").animate({
			opacity : 1,
			top : '40%'
		}, 200, function() {
			$('.userbox').show().animate({
				opacity : 1
			}, 500);
			$("#login").animate({
				opacity : 0,
				top : '60%'
			}, 500, function() {
				$(this).fadeOut(200, function() {
					$(".text_success").slideDown();
					$("#successLogin").animate({
						opacity : 1,
						height : "200px"
					}, 1000);
				});
			});
		});
	}
	function showSuccess(str) {
		$('#alertMessage').removeClass('error').html(str).stop(true, true).show().animate({
			opacity : 1,
			right : '0'
		}, 500);
	}

	function onfocus() {
		if ($(window).width() > 480) {
			$('.tip input').tipsy({
				trigger : 'focus',
				gravity : 'w',
				live : true
			});
		} else {
			$('.tip input').tipsy("hide");
		}
	}

	function hideTop() {
		$('#alertMessage').animate({
			opacity : 0,
			right : '-20'
		}, 500, function() {
			$(this).hide();
		});
	}
	//加载信息
	function loading(name, overlay) {
		$('body').append('<div id="overlay"></div><div id="preloader">' + name + '..</div>');
		if (overlay == 1) {
			$('#overlay').css('opacity', 0.1).fadeIn(function() {
				$('#preloader').fadeIn();
			});
			return false;
		}
		$('#preloader').fadeIn();
	}

	function unloading() {
		$('#preloader').fadeOut('fast', function() {
			$('#overlay').fadeOut();
		});
	}
	// 表单晃动
	function jrumble() {
		$('.inner').jrumble({
			x : 4,
			y : 0,
			rotation : 0
		});
		$('.inner').trigger('startRumble');
		setTimeout('$(".inner").trigger("stopRumble")', 500);
	}
</script>
</head>
<body>
	<div id="alertMessage"></div>
	<div id="successLogin"></div>
	<div class="text_success">
		<img src="image/loader_green.gif" alt="Please wait" /> <span>登录成功!请稍后....</span>
	</div>
	<div id="login">
		<div class="ribbon" style="background-image:url(image/typelogin.png);"></div>
		<div class="inner">
			<div class="logo">
				<img src="image/toplogo-jeecg.png" />
			</div>
			<div class="formLogin">
				<form name="formLogin" action="login.do" id="formLogin" method="post">
					<input name="userKey" type="hidden" id="userKey" value="D1B5CC2FE46C4CC983C073BCA897935608D926CD32992B5900" />
					<div class="tip">
						<input class="username" name="username" type="text" id="username" title="用户名" iscookie="true" value="admin" nullmsg="请输入用户名!" />
					</div>
					<div class="tip">
						<input class="password" name="password" type="password" id="password" title="密码" value="admin" nullmsg="请输入密码!" />
					</div>
					<div id="cap" class="tip">
						<input class="captcha" name="captcha" type="text" id="captcha" /> <img style="width:85px;height:35px;margin-top: -10px;" align="absmiddle" id="Kaptcha"
							src="${pageContext.request.contextPath}/captcha" />
					</div>
					<div class="loginButton">
						<div style="float: right; padding: 3px 0; margin-right: -12px;">
							<div>
								<ul class="uibutton-group">
									<li><a class="uibutton normal" href="javascript:void(0);" id="but_login">登录</a></li>
									<li><a class="uibutton normal" href="javascript:void(0);" id="forgetpass">重置</a></li>
								</ul>
							</div>
						</div>
						<div class="clear"></div>
					</div>
				</form>
			</div>
		</div>
		<div class="shadow"></div>
	</div>
	<!--Login div-->
	<div class="clear"></div>
	<div id="versionBar">
		<div class="copyright">
			&copy; 版权所有 <span class="tip"><a href="javascript:void(0);" title="erp">cs</a> (推荐使用IE9+,谷歌浏览器可以获得更快,更安全的页面响应速度)技术支持:<a href="javascript:void(0);"
				title="erp">cs</a> </span>
		</div>
	</div>
</body>
</html>
