<?php
/** 
 * 解析表单中的可写和隐藏字段
 */
require_once('Control.php');
class Sunairs_Flow_Control extends Sunairs_Control{
	
	/*
	 * 设置可写和隐藏字段
	 */
	public function parseControl($html,$opType='r',$flowData=array()){
		return $html;
	}
}

?>