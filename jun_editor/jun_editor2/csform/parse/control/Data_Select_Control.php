<?php
/** 
 * 讯点表单智能设计器
 *     数据选择控件
 * @author tony 2012-08-31
 * @copyright www.sunairs.com
 */
require_once('Control.php');
class Sunairs_Data_Select_Control extends Sunairs_Control{
	
	public function parseControl($html,$opType="w",$formData=array()){
		$selects = $html->find('button[element_type="xd_data_select"]');
		
		if(!empty($selects)){
			foreach($selects as $e){
				if($opType === 'w'){
					$name = $e->name;
					$index = explode('_',$name);
					$dataControlArray = explode('`',$e->data_control);
					$controlString = '';
					foreach($dataControlArray as $dControl){
						//input
						$inputControl = $html->find('input[title="'.$dControl.'"]');
						if(!empty($inputControl)){
							$inputControl = $inputControl[0];
							$controlString .= ($inputControl->name.',');
						}
						//textarea
						$textareaControl = $html->find('textarea[title="'.$dControl.'"]');
						if(!empty($textareaControl)){
							$textareaControl = $textareaControl[0];
							$controlString .= ($textareaControl->name.',');
						}
					}
					$htmlText = '<button onclick="xd_form_data_picker(this,\''.$controlString.'\');return false;" name="'.$name.'" title="'.($e->title).'" class="DATA" data_table="'.($e->data_table).'" data_type="'.($e->data_type).'" data_field="'.($e->data_field).'" data_fld_name="'.($e->data_fld_name).'" data_control="'.($e->data_control).'" data_query="'.($e->data_query).'">'.($e->title).'</button>';
					$e->outertext = $htmlText;
				} else {
					$name = $e->name;
					//$outertext = isset($formData[$name]) ? $formData[$name] : '';
					$e->outertext = '';
				}
			}
		}
		
		return $html;
	}
}

?>