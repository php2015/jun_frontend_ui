<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>文章列表--layui后台管理模板 2.0</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="/tp32-layuicms/Public/layuicms/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="/tp32-layuicms/Public/layuicms/css/public.css" media="all" />
</head>
<body class="childrenBody">
<form class="layui-form">
	<blockquote class="layui-elem-quote quoteBox">
		<form class="layui-form">
			<div class="layui-inline">
				<div class="layui-input-inline">
					<input type="text" class="layui-input searchVal" placeholder="请输入搜索的内容" />
				</div>
				<a class="layui-btn search_btn" data-type="reload">搜索</a>
			</div>
			<div class="layui-inline">
				<a class="layui-btn layui-btn-normal add-article-btn">添加文章</a>
			</div>
			<div class="layui-inline">
				<a class="layui-btn layui-btn-danger layui-btn-normal delAll_btn">批量删除</a>
			</div>
		</form>
	</blockquote>
	<table id="article-list" lay-filter="article-list"></table>	
</form>
<script type="text/javascript">
	var dataUrl = "<?php echo U('index');?>";
	var topUrl = "<?php echo U('upTop');?>";
	var delUrl = "<?php echo U('del');?>";
	var delAllUrl = "<?php echo U('delAll');?>";
	var addUrl = "<?php echo U('add');?>";
	var updUrl = "<?php echo U('upd');?>";
</script>
<script type="text/javascript" src="/tp32-layuicms/Public/layuicms/layui/layui.js"></script>
<script type="text/javascript" src="/tp32-layuicms/Public/admin/js/lib/public.js"></script>
<script type="text/javascript" src="/tp32-layuicms/Public/admin/js/article_index.js"></script>
</body>
</html>