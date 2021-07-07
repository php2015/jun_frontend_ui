<?php
/**
 * 多行输入框解析文件
 * @author tony
 * @copyright www.olerp.com
 */
require_once('Control.php');
class Sunairs_Textarea_Control extends Sunairs_Control{
	
	public function parseControl($html,$opType='w',$formData=array()){
		$textareas = $html->find('textarea[element_type="xd_textarea"]');
		
		if(!empty($textareas)){
			foreach($textareas as $e){
				if($opType === 'w'){
					$defaultValue = $e->defaultvalue;
					$name = $e->name;
					$e->innertext = $defaultvalue;
					if(!empty($formData) && isset($formData[$name])){
						$e->innertext = $formData[$name];
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