<?php
//获取业务模块配置文件
$config_path = 'extra';
$config_file = array();
if(is_dir($config_path)){
	$dir_obj = opendir($config_path);
	while(($file = readdir($dir_obj)) !== false){
		if(strpos($file,'ini') > 0){
			$fileObj = fopen($config_path.'/'.$file,'r');
			$cfArray = array();
			while($line = fgets($fileObj)){
				$lineArray = explode('=',$line);
				if($lineArray[0] === 'MODULE_NAME'){
					$cfArray['filecname'] = $lineArray[1];
				}
				if($lineArray[0] === 'MODULE_CONFIG'){
					$cfArray['filename'] = $lineArray[1];
				}
			}
			fclose($fileObj);
			$config_file[] = $cfArray;
		}
	}
	closedir($dir_obj);
}
$optionHtml = '';
if(!empty($config_file)){
	foreach($config_file as $cFile){
		$optionHtml .= '<option value="'.$cFile['filename'].'">'.$cFile['filecname'].'</option>';
	}
}
?> 
<html><head><link rel="stylesheet" type="text/css" href="/theme/1/style.css">
<script src="/inc/js/ccorrect_btn.js"></script>



<title>表单新建或编辑</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">

<script language="javascript">

function edit_form(FORM_ID)
{
	var config_name = document.getElementById('module_config').value;
	var width = window.screen.width - 15;
	var height = window.screen.height - 100;
	window.open ('form_edit.php?module_config='+config_name, 'newwindow', 'height='+height+', width='+width+', top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no') 
}
</script>
</head>

<body class="bodycolor" topmargin="5" onload="document.form1.FORM_NAME.focus();" marginwidth="0" marginheight="0">


<table border="0" width="100%" cellspacing="0" cellpadding="3" class="small">
  <tbody><tr>
    <td class="Big"><img src="/images/flow_edit.gif" align="absmiddle"><span class="big3"> 编辑表单名称</span><br>
    </td>
  </tr>
</tbody></table>


<br>

<table width="450" align="center" class="TableList">
  <form action="update.php" method="post" name="form1" onsubmit="return check_form();"></form>
    <tbody><tr>
      <td nowrap="" class="TableContent">表单名称：</td>
      <td class="TableData">
        <input type="text" name="FORM_NAME" size="30" maxlength="100" class="BigInput" value="">
      </td>
    </tr>
    <tr>
        <td nowrap="" class="TableContent">表单分类：</td>
        <td class="TableData">
          <select name="FORM_SORT" class="SmallSelect">
            <option value="0"></option>
		  	          </select>
        </td>
    </tr>
    <tr>
      <td nowrap="" class="TableContent">所属部门：</td>
      <td class="TableData">
			<select name="DEPT_ID" class="SmallSelect">
			<option value="">系统(仅由系统管理员管理)</option>
			</select>
      </td>
    </tr>
	<tr>
		<td nowrap="" class="TableContent">业务模块(配置文件)：</td>
		<td class="TableData">
			<select id="module_config" name="MODULE_CONFIG">
				<option value="0">---请选择配置文件---</option>
				<?php echo $optionHtml;?>
			</select>
		</td>
	</tr>
    <tr align="center" class="TableControl">
      <td colspan="2" nowrap="">
        <input type="hidden" value="1" name="FORM_ID">
        <input type="hidden" value="0" name="DEPT_ID_OLD">
        <input type="submit" value="保存" class="BigButtonA" name="submit">&nbsp;&nbsp;
        <input type="button" value="返回" class="BigButtonA" name="back" onclick="location='list.php?SORT_ID=0'">

      </td>
    </tr>
  
</tbody></table>

<br>
  <table width="450" align="center" class="TableList">
    <tbody><tr>
      <td class="TableContent" nowrap="" align="center" width="100"><b>相关操作：</b></td>
      <td class="TableData" nowrap="">
          <a href="javascript:edit_form(1)">表单智能设计器</a>&nbsp;&nbsp;
          <a href="/general/workflow/form_view.php?FORM_ID=1" target="_blank" title="表单预览">预览</a>&nbsp;&nbsp;
          <a href="import.php?SORT_ID=0&amp;FORM_ID=1" title="可将一些备份的表单或优秀的表单导入">导入</a>&nbsp;&nbsp;
          <a href="export.php?FORM_ID=1" title="可以将表单导出后，与其他OA用户分享">导出</a>&nbsp;&nbsp;
                       <a href="vsn_list.php?SORT_ID=0&amp;FORM_ID=1" title="可查看及恢复历史版本">历史版本</a>&nbsp;&nbsp;
                </td>
    </tr>
  </tbody></table>


<br>
<br>

</body></html>