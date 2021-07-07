<?php
/**
 * 单选框解析器
 * @author tony
 * @copyright www.sunairs.com
 */
require_once('Control.php');
class Sunairs_Textfield_Control extends Sunairs_Control{
	/*
	 * 解析单行输入框
	 * @param Object $html
	 */
	public function parseControl($html,$opType='w',$formData=array()){
		
		$textfields = $html->find('input[element_type="xd_textfield"]');
		
		if(!empty($textfields)){
			foreach($textfields as $e){
				if($opType === 'w'){
					$data_valid = $e->data_valid;
					$name = $e->name;
					$e->onblur = "xd_form_data_valid('{$data_valid}','{$e->id}')";
					if(!empty($formData) && isset($formData[$name])){
						$e->value = $formData[$name];
					}
				} else {
					$name = $e->name;
					$outertext = isset($formData[$name]) ? $formData[$name] : '';
					$e->outertext = $outertext;
				}
			}
		}
		
		return $html;
	}
}

?>