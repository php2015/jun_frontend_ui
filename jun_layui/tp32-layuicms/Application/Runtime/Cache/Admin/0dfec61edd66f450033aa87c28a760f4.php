<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html class="loginHtml">
<head>
	<meta charset="utf-8">
	<title>登录--layui后台管理模板 2.0</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="icon" href="/tp32-layuicms/Public/layuicms/favicon.ico">
	<link rel="stylesheet" href="/tp32-layuicms/Public/layuicms/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="/tp32-layuicms/Public/layuicms/css/public.css" media="all" />
	<style type="text/css">
		.loginBody form.layui-form {
			box-shadow: none;
		}
		.login-title {
			height: 90px;
			line-height: 90px;
			text-align: center;
		}
		.login-title h1 {
		    color: #009688;
		    font-size: 25px;
		    font-weight: bold;
		}
		.loginBody form.layui-form {
			width: 360px;
			height: 330px;
		    margin: -165px 0 0 -180px;
		}
		.layui-block {
			margin-top: 12px;
		}
		.vcode {
			width: 116px;
			height: 36px;
		}
	</style>
</head>
<body class="loginBody">
	<form class="layui-form" id="form">
		<!-- <div class="login_face"><img src="/tp32-layuicms/Public/layuicms/images/face.jpg" class="userAvatar"></div> -->
		<div class="login-title">
			<h1><?php echo C('APP_SYS_NAME');?>登录</h1>
		</div>
		<div class="layui-form-item input-item">
			<label for="userName">用户名</label>
			<input type="text" placeholder="请输入用户名" autocomplete="off" id="username" name="username" class="layui-input" lay-verify="required">
		</div>
		<div class="layui-form-item input-item">
			<label for="password">密码</label>
			<input type="password" placeholder="请输入密码" autocomplete="off" id="password" name="password" class="layui-input" lay-verify="required">
		</div>
		<div class="layui-form-item input-item" id="imgCode">
			<label for="code">验证码</label>
			<input type="text" placeholder="请输入验证码" autocomplete="off" id="vcode" name="vcode" class="layui-input">
			<img class="vcode" src="<?php echo U('vcode');?>">
		</div>
		<div class="layui-form-item">
			<button class="layui-btn layui-block" lay-filter="login" lay-submit>登录</button>
		</div>
		
	</form>
	<script type="text/javascript">
		var vcodeUrl = "<?php echo U('vcode');?>";
		var loginUrl = "<?php echo U('login');?>";
		var indexUrl = "<?php echo U('Index/index');?>";
	</script>
	<script type="text/javascript" src="/tp32-layuicms/Public/layuicms/layui/layui.js"></script>
	<script type="text/javascript" src="/tp32-layuicms/Public/admin/js/login_login.js"></script>
	<script type="text/javascript" src="/tp32-layuicms/Public/layuicms/js/cache.js"></script>
</body>
</html>