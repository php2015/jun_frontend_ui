<?php
/**
 * 讯点表单智能设计器
 *     CHECKBOX解析类
 * @author tony 2012-08-27
 * @copyright www.olerp.com
 */
require_once('Control.php');
class Sunairs_Checkbox_Control extends Sunairs_Control{

	public function parseControl($html,$opType='w',$formData=array()){
		$checkboxs = $html->find('input[element_type="xd_checkbox"]');
		
		if(!empty($checkboxs)){
			foreach($checkboxs as $e){
				$name = $e->name;
				if(isset($formData[$name]) && $formData[$name]){
					$e->checked = 'checked';
				} else if($e->checked === 'checked'){
					
				} else {
					$e->checked = null;
				}
			}
		}
		
		return $html;
	}
}

?>