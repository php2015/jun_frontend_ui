<?php
$module_config = isset($_GET['module_config']) ? $_GET['module_config'] : '';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>自定义表单</title>
	<meta content="text/html; charset=utf-8" http-equiv="content-type" />
	<link rel="stylesheet" type="text/css" href="css/form.css">
	<script type="text/javascript" src="editor/ckeditor.js"></script>
	<script type="text/javascript" src="editor/ck_utility.js"></script>
	<script type="text/javascript" src="editor/plugin_config.js"></script>
	<script type="text/javascript" src="lib/jquery.min.js"></script>
	<style type="text/css">
		html,body{width:100%;margin:0;}	
		button{
			margin:0;
		}	
		button.btnTool{
			width:120px;
			height:24px;
			text-align:left;
			font-size:9pt;
		}
		button.btnTool img{
			height:16px;
			width:16px;
			vertical-align:middle;
		}
		button.btnControl{
			width:120px;
			height:30px;
			text-align:center;
			font-weight:bold;
		}

		table.btnControl{
			margin-top:5px;
		}
	</style>
	<script type="text/javascript">
		<?php
		//解析业务模块配置文件
		if($module_config){
			require_once('extra/'.$module_config);
			$config_js = '';
			if(!empty($MODULE_CONFIG)){
				$config_js .= 'var MODULE_CONFIG = {';
				foreach($MODULE_CONFIG as $key => $value){
					$config_js .= '"'.$key.'" : "'.$value.'",';
				}
				$config_js = substr($config_js,0,(strlen($config_js) - 1));
				$config_js .= '};';
			}
			echo $config_js;
		}
		?>
		var width = window.screen.width - 15;
		var height = window.screen.height - 100;
		
		//执行ckeditor插件
		function exec_cmd(ck_cmd){
			CKEDITOR.instances['form_define'].execCommand(ck_cmd);

		}
		
		function myclose(){
			if(confirm('你确定要关闭当前窗口吗？')){
				window.close();
			}
		}
		
		function viewForm(){
			
			document.getElementById('form1').submit();
		}
	</script>
</head>
<body>
	<table width="100%" class="TableBlock">
		<tr bgcolor="#DDDDDD">
		   <td class="TableHeader" colspan="2" height="20">
			&nbsp;<img src="images/dot3.gif" align="absmiddle"> <font color="red">讯点表单智能设计器：首先，将网页设计工具或Word编辑好的表格框架粘贴到表单设计区。然后，创建表单控件。   </font></td>
		</tr>
		<tr bgcolor="#DDDDDD">
			<td align="center" valign="top">
				<table width="120" border="0" cellpadding="0" cellspacing="0" class="TableBlock" align="center">
					<tbody>
						<tr class="TableHeader">
							<td align="center">表单控件</td>
						</tr>
						<tr class="TableData">
							<td align="center">
							<button class="btnTool" onclick="exec_cmd('hiddenfield')"><img src="images/hidden.gif"> 隐藏域</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_textfield')"><img src="images/textfield.gif"> 单行输入框</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_textarea')"><img src="images/textarea.gif"> 多行输入框</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_listmenu')"><img src="images/listmenu.gif"> 下拉菜单</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_radio')"><img src="images/radio.gif"> 单选按钮</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_checkbox')"><img src="images/checkbox.gif"> 复选框</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_listview')"><img src="images/listview.gif"> 列表控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_auto')"><img src="images/auto.gif"> 宏控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_calendar')"><img src="images/calendar.gif"> 日历控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_calcu')"><img src="images/calc.gif"> 计算控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_user')"><img src="images/user.gif"> 部门人员控件</button><br>
							<!--<button class="btnTool" onclick="exec_cmd('xd_sign')"><img src="images/sign.gif"> 签章控件</button><br>-->
							<button class="btnTool" onclick="exec_cmd('xd_data_select')"><img src="images/data.gif"> 数据选择控件</button><br>
							<!--
							<button class="btnTool" onclick="exec_cmd('xd_data_fetch')"><img src="images/data.gif"> 表单数据控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_progressbar')"><img src="images/progressbar.gif"> 进度条控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_imgupload')"><img src="images/imgupload.gif"> 图片上传控件</button><br>
							<button class="btnTool" onclick="exec_cmd('xd_qrcode')"><img src="images/qrcode.gif"> 二维码控件</button><br>-->
							</td>
						</tr>
					</tbody>
				</table>
				<table width="120" border="0" cellpadding="0" cellspacing="0" class="TableBlock btnControl" align="center">
				<tbody>
					<tr class="TableHeader">
						<td align="center">保存与退出</td>
					</tr>
					<tr class="TableData">
						<td align="center">
							<button class="btnControl" onclick="send()">保存表单</button><br>
							<button class="btnControl" onclick="viewForm();return false;">预览表单</button><br>
							<button class="btnControl" onclick="myclose()">关闭设计器</button>
							<input type="hidden" id="editor_value" value="" />
						</td>
					</tr>
				</tbody>
				</table>
			</td>
			<td width="95%">
				<div style="width:100%;">
					<form action="preview.php" method="post" id="form1" name="form1" target="_blank">
						<p>
							<textarea id="form_define" name="form_define"></textarea>
							<script type="text/javascript">
								var XD_FORM_EDITOR = CKEDITOR.replace( 'form_define' ,{
									
								});
								
								CKEDITOR.config.width = width - 145;
								CKEDITOR.config.height = height - 200;
								CKEDITOR.config.skin = 'office2003';
	
								CKEDITOR.config.toolbar =
								[
									{ name: 'document',    items : [ 'Source'] },
									{ name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
									{ name: 'editing',     items : [ 'Find','Replace','-','SelectAll','RemoveFormat' ] },
									{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-' ] },
									//{ name: 'forms',       items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
									'/',
									{ name: 'paragraph',   items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
									{ name: 'links',       items : [ 'Link','Unlink','Anchor' ] },
									{ name: 'insert',      items : [ 'Image','Flash','Table','HorizontalRule','SpecialChar' ] },
									'/',
									{ name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] },
									{ name: 'colors',      items : [ 'TextColor','BGColor' ] },
									{ name: 'tools',       items : [ 'Maximize', 'ShowBlocks'] }
								];
								
								var XD_FORM_DOCUMENT = new CKEDITOR.dom.document(document);
							</script>
						</p>
					</form>
				</div>
			</td>
		</tr>
	</table>
	
</body>
</html>
