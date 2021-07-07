<?php
/**
 * 讯点表单智能设计器
 *     日历控件解析器
 * @author tony 2012-08-30
 * @copyright www.sunairs.com
 */
require_once('Control.php');
class Sunairs_Calendar_Control extends Sunairs_Control{

	public function parseControl($html,$opType="w",$formData=array()){
		$calendars = $html->find('img[element_type="xd_calendar"]');
		
		if(!empty($calendars)){
			foreach($calendars as $e){
				if($opType === 'w'){
					$name = $e->name;
					$index = explode('_',$name);
					$title = $e->title;
					$inputDate = $html->find('input[title="'.$title.'"]');
					$inputDate = $inputDate[0];
					$htmlText = '';
					if(isset($formData[$name]) && $formData[$name]){
						$inputDate->outertext = '';
						$htmlText = $formData[$name];
					} else {
						$htmlText = '<img des="'.$inputDate->name.'" src="images/calendar.gif" name="'.$name.'" class="DATE" title="日期控件：'.$e->title.'" border="0" alt="" align="absMiddle" value="'.$e->title.'" style="cursor: hand" date_format="'.$e->date_type.'" onclick="xd_form_dis_date(this)">';
					}
					$e->outertext = $htmlText;
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