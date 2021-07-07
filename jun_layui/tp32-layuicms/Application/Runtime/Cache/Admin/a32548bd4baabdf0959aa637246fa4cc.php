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
<form class="layui-form layui-row layui-col-space10" id="form">
	<div class="layui-col-md9 layui-col-xs12">
		<div class="layui-row layui-col-space10">
			<div class="layui-col-md9 layui-col-xs7">
				<div class="layui-form-item magt3">
					<label class="layui-form-label">文章标题</label>
					<div class="layui-input-block">
						<input type="text" class="layui-input article_name" lay-verify="article_name" name="article_name" value="<?php echo ($data["article_name"]); ?>" placeholder="请输入文章标题">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">内容摘要</label>
					<div class="layui-input-block">
						<textarea name="abstract" placeholder="请输入内容摘要" class="layui-textarea abstract"><?php echo ($data["abstract"]); ?></textarea>
					</div>
				</div>
			</div>
			<div class="layui-col-md3 layui-col-xs5">
				<div class="layui-upload-list thumbBox mag0 magt3">
					<img class="layui-upload-img thumbImg" src="/tp32-layuicms<?php echo ($data["article_img"]); ?>">
					<input type="hidden" class="article_img" name="article_img" value="<?php echo ($data["article_img"]); ?>" lay-verify="article_img" />
				</div>
			</div>
		</div>
		<div class="layui-form-item magb0">
			<label class="layui-form-label">文章内容</label>
			<div class="layui-input-block">
				<textarea class="layui-textarea layui-hide" name="art_content" lay-verify="art_content" id="art_content"><?php echo ($data["art_content"]); ?></textarea>
			</div>
		</div>
	</div>
	<div class="layui-col-md3 layui-col-xs12">
		
		<blockquote class="layui-elem-quote title"><i class="layui-icon">&#xe609;</i> 发布</blockquote>
		<div class="border">
			<div class="layui-form-item">
				<label class="layui-form-label">状态&nbsp;&nbsp;</label>
				<div class="layui-input-block newsStatus">
					<select name="article_status" lay-verify="required">
						<option value="0" <?php if(($data["article_status"]) == "0"): ?>selected<?php endif; ?>>保存草稿</option>
						<option value="1" <?php if(($data["article_status"]) == "1"): ?>selected<?php endif; ?>>提交审核</option>
					</select>
				</div>
			</div>
			<div class="layui-form-item releaseDate">
				<label class="layui-form-label">时间&nbsp;&nbsp;</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" name="art_add_time" lay-verify="required" value="<?php echo date('Y-m-d H:i:s',$data['art_add_time']);?>" id="release" 
					placeholder="请选择日期和时间" readonly />
				</div>
			</div>
			<div class="layui-form-item openness">
				<label class="layui-form-label">权限&nbsp;&nbsp;</label>
				<div class="layui-input-block">
					<input type="radio" name="article_look" value="0" title="开放浏览" lay-skin="primary"  <?php if(($data["article_look"]) == "0"): ?>checked<?php endif; ?>/>
					<input type="radio" name="article_look" value="1" title="私密浏览" lay-skin="primary"  <?php if(($data["article_look"]) == "1"): ?>checked<?php endif; ?>/>
				</div>
			</div>
			<div class="layui-form-item newsTop">
				<label class="layui-form-label">置顶&nbsp;&nbsp;</label>
				<div class="layui-input-block">
					<input type="checkbox" class="article_top" name="article_top" 
					value="<?php echo ($data["article_top"]); ?>" lay-filter="article_top" lay-skin="switch" lay-text="是|否" <?php if(($data["article_top"]) == "1"): ?>checked<?php endif; ?>>
				</div>
			</div>
			<hr class="layui-bg-gray" />
			<div class="layui-right">
				<input type="hidden" name="article_id" value="<?php echo ($data["article_id"]); ?>" />
				<a class="layui-btn layui-btn-sm" lay-filter="upd-btn" lay-submit><i class="layui-icon">&#xe609;</i>发布</a>
				<a class="layui-btn layui-btn-primary layui-btn-sm" lay-filter="look" lay-submit>预览</a>
			</div>
		</div>
	</div>
</form>
<script type="text/javascript">
	var uploadImageUrl = "<?php echo U('Upload/uploadImage');?>";
	var baseUrl = "/tp32-layuicms";
	var updUrl = "<?php echo U('upd');?>";
</script>
<script type="text/javascript" src="/tp32-layuicms/Public/layuicms/layui/layui.js"></script>
<script type="text/javascript" src="/tp32-layuicms/Public/admin/js/article_form.js"></script>
</body>
</html>