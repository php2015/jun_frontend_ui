<?php
/**
 * 下拉菜单解析器
 * @author tony 
 * @copyright www.olerp.com
 */
require_once('Control.php');
class Sunairs_Listmenu_Control extends Sunairs_Control{
	
	public function parseControl($html,$opType='w',$formData=array()){
		$listmenus = $html->find('select[element_type="xd_listmenu"]');
		
		if(!empty($listmenus)){
			foreach($listmenus as $e){
				if($opType === 'w'){	//主办模式
					$name = $e->name;
					if(!empty($formData) && isset($formData[$name])){
						$options = $e->find("option");
						foreach($options as $option){
							$option->selected = null;
							if($option->value == $formData[$name]){
								$option->selected = 'selected';
							}
						}
					}
				} else {	//只读模式
					$name = $e->name;
					$outertext = isset($formData[$name]) ? $formData[$name] : '';
					
					if($outertext){
						//遍历下拉项获取需要显示的值
						$options = $e->find("option");
						foreach($options as $option){
							if($option->value == $formData[$name]){
								$e->outertext = $option->innertext;
								continue;
							}
						}
					} else {
						$e->outertext = '';
					}
				}
			}
		}
		
		return $html;
	}
} 

?>