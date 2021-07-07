<?php
/**
 * 讯点智能表单设计器
 *		单选按钮解析
 * @author tony
 * @copyright www.olerp.com
 */
require_once('Control.php');
class Sunairs_Radio_Control extends Sunairs_Control{
	
	public function parseControl($html,$opType='w',$formData=array()){
		$radios = $html->find('img[element_type="xd_radio"]');
		
		if(!empty($radios)){
			foreach($radios as $e){
				if($opType === 'w'){
					$name = $e->name;
					$radioChecked = $e->radio_checked;
					$radioField = $e->radio_field;
					$radioString = '';
					if($radioField){
						$radioArray = explode('`',$radioField);
						foreach($radioArray as $radio){
							$checked = '';
							if($radio == $radioChecked){
								$checked = 'checked';
							}
							//填写表单时
							if(isset($formData[$name]) && $formData[$name] === $radio){
								$checked = 'checked';
							} else {
								$checked = '';
							}
							$radioString .= ('<input type="radio" name="'.$name.'" value="'.$radio.'" '.$checked.' />'.$radio.'&nbsp;');
						}
					}
					$e->outertext = $radioString;
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