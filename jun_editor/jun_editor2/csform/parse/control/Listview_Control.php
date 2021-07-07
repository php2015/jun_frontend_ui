<?php
/**
 * 讯点表单智能设计器
 *     列表控件
 * @author tony 2012-08-27
 * @copyright www.olerp.com
 */
require_once('Control.php');
class Sunairs_Listview_Control extends Sunairs_Control{
	
	public function parseControl($html,$opType='w',$formData=array()){
		$listviews = $html->find('img[element_type="xd_listview"]');
		
		if(!empty($listviews)){
			foreach($listviews as $e){
			
				$data_table = $e->data_table;	//外部数据表
				$data_field = $e->data_field;	//映射字段
				$data_query = $e->data_query;	//是否需要查询获取值
				
				$lv_cal = $e->lv_cal;			//需要计算的列
				$lv_coltype = $e->lv_coltype;	//每列的类型
				$lv_size = $e->lv_size;			//每列的宽度
				$lv_sum	= $e->lv_sum;			//求和
				$lv_title = $e->lv_title;		//表头
				$lv_value = $e->lv_value;		//默认值
				
				$name = $e->name;
				
				if($opType === 'w'){
					$index = explode('_',$name);
					$htmlText = '<table id="LV_'.$index[1].'" lv_sum="'.$lv_sum.'" lv_cal="'.$lv_cal.'" lv_coltype="'.$lv_coltype.'" lv_value="'.$lv_value.'" data_table="'.$data_table.'" data_field="'.$data_field.'" data_query="'.$data_query.'" data_fld_name="'.$lv_title.'" class="LIST_VIEW" style="border-collapse:collapse" border="1" cellspacing="0" cellpadding="2" lv_size="'.$lv_size.'">
									<tbody>
										<tr style="font-weight:bold;font-size:14px;" class="LIST_VIEW_HEADER">
											<th>序号</th>';
					$tableTitle = explode('`',$lv_title);
					foreach($tableTitle as $title){
						$htmlText .= ('<th nowrap="">'.$title.'</th>');
					}
					$htmlText .= '<th>操作</th></tr>';
					
					if(isset($formData[$name])){
						$sizeArray = explode('`',$lv_size);
						$colTypeArray = explode('`',$lv_coltype);
						$fieldArray = explode('`',$data_field);
						$valueArray = explode('`',$lv_value);
						$rowArray = explode('|',$formData[$name]);
						$rowCount = 1;
						
						foreach($rowArray as $rowValue){
							$cellArray = explode('`',$rowValue);
							if(!empty($cellArray)){
								$htmlText .= '<tr>';
								$tdHtml = '';
								$tdHtml .= ('<td style="text-align: center; ">'.$rowCount.'</td>');
								for($i = 0; $i < count($cellArray); $i++ ){
									$tdHtml .= '<td id="LV_'.$index[1].'_r'.$rowCount.'_c'.$i.'" field="'.$fieldArray[$i].'">';
									switch($colTypeArray[$i]){
										case 'text':	//单行输入框
											$tdHtml .= '<input type="text" size="'.$sizeArray[$i].'" class="BigInput" value="'.$cellArray[$i].'" />';
											break;
										case 'textarea':	//多行输入框
											$tdHtml .= '<textarea rows="2" cols="'.$sizeArray[$i].'" class="BigInput">'.$cellArray[$i].'</textarea>';
											break;
										case 'select':	//下拉菜单
											$tdHtml .= '<select>';
											$cells = explode(',',$valueArray[$i]);
											foreach($cells as $cellValue){
												$tdHtml .= '<option value="'.$cellValue.'" '.($cellValue == $cellArray[$i] ? 'selected' : '').' >'.$cellValue.'</option>';
											}
											$tdHtml .= '</select>';
											break;
										case 'radio':	//单选按钮
											$radios = explode(',',$valueArray[$i]);
											foreach($radios as $radio){
												$tdHtml .= '<input type="radio" name="radio1'.($rowCount).'" value="'.$radio.'" '.($radio == $cellArray[$i] ? 'checked' : '').' />'.$radio;
											}
											break;
										case 'checkbox':
											$cells = explode(',',$valueArray[$i]);
											foreach($cells as $cellValue){
												$tdHtml .= '<input type="checkbox" value="'.$cellValue.'" '.($cellValue == $cellArray[$i] ? 'checked' : '').' />'.$cellValue;
											}
											break;
										case 'datetime':
											$tdHtml .= '<input type="text" onclick="WdatePicker()" size="'.$sizeArray[$i].'" class="BigInput" value="'.$cellArray[$i].'" >';
											break;
										default :
											;
									}
									$tdHtml .= '</td>';
								}
								
								if($data_table && $data_table != '0'){
									$tdHtml .= '<td><input type="button" value="选择" onclick="xd_form_list_data_picker(this,\''.$data_table.'\',\''.$data_field.'\',\''.$lv_title.'\',\''.$data_query.'\')">';
								} else {
									$tdHtml .= '<td>';
								}
								$tdHtml .= '<input type="button" value="删除" onclick="xd_form_tb_delete(\'LV_'.$index[1].'\',this)"></td>';
								$htmlText .= ($tdHtml.'</tr>');
							}
							$rowCount++;
						}
					}
	
					$htmlText .= '</tbody></table>';
					
					$htmlText .= '<input type="button" value="新增" onclick="xd_form_tb_add(\'LV_'.$index[1].'\',\'0\',\'\',\'1\')">';
					$htmlText .= '<input type="button" value="计算" onclick="xd_form_tb_cal(\'LV_'.$index[1].'\',\''.$lv_cal.'\')">';
					$htmlText .= '<input type="hidden" class="LIST_VIEW" name="'.$name.'">';
					
					$scriptText = '<script type="text/javascript">jQuery(document).ready(function(){setInterval(xd_form_tb_cal,1000,\'LV_'.$index[1].'\',\''.$lv_cal.'\');';
					
					if(strpos($lv_sum,'1') >= 0 && isset($rowCount) && $rowCount > 1){
						$scriptText .= ' xd_form_tb_add_sum(\'LV_'.$index[1].'\',\''.$lv_sum.'\',1);';
					}
					$scriptText .= '});</script>';
					$htmlText .= $scriptText;
					
					$e->outertext = $htmlText;
				} else {
					$index = explode('_',$name);
					$htmlText = '<table id="LV_'.$index[1].'" lv_sum="'.$lv_sum.'" lv_cal="'.$lv_cal.'" lv_coltype="'.$lv_coltype.'" lv_value="'.$lv_value.'" data_table="'.$data_table.'" data_field="'.$data_field.'" data_query="'.$data_query.'" data_fld_name="'.$lv_title.'" class="LIST_VIEW" style="border-collapse:collapse" border="1" cellspacing="0" cellpadding="2" lv_size="'.$lv_size.'">
									<tbody>
										<tr style="font-weight:bold;font-size:14px;" class="LIST_VIEW_HEADER">
											<th>序号</th>';
					$tableTitle = explode('`',$lv_title);
					foreach($tableTitle as $title){
						$htmlText .= ('<th nowrap="">'.$title.'</th>');
					}
					//$htmlText .= '<th>操作</th></tr>';
					
					if(isset($formData[$name])){
						$sizeArray = explode('`',$lv_size);
						$colTypeArray = explode('`',$lv_coltype);
						$fieldArray = explode('`',$data_field);
						$valueArray = explode('`',$lv_value);
						$rowArray = explode('|',$formData[$name]);
						$rowCount = 1;
						
						foreach($rowArray as $rowValue){
							$cellArray = explode('`',$rowValue);
							if(!empty($cellArray)){
								$htmlText .= '<tr>';
								$tdHtml = '';
								$tdHtml .= ('<td style="text-align: center; ">'.$rowCount.'</td>');
								for($i = 0; $i < count($cellArray); $i++ ){
									$tdHtml .= '<td id="LV_'.$index[1].'_r'.$rowCount.'_c'.$i.'" field="'.$fieldArray[$i].'">';
									switch($colTypeArray[$i]){
										case 'text':	//单行输入框
											$tdHtml .= $cellArray[$i];
											break;
										case 'textarea':	//多行输入框
											$tdHtml .= $cellArray[$i];
											break;
										case 'select':	//下拉菜单
											$tdHtml .= '<select disabled >';
											$cells = explode(',',$valueArray[$i]);
											foreach($cells as $cellValue){
												$tdHtml .= '<option value="'.$cellValue.'" '.($cellValue == $cellArray[$i] ? 'selected' : '').' >'.$cellValue.'</option>';
											}
											$tdHtml .= '</select>';
											break;
										case 'radio':	//单选按钮
											$radios = explode(',',$valueArray[$i]);
											foreach($radios as $radio){
												$tdHtml .= '<input type="radio" name="'.$index[1].'" value="'.$radio.'" '.($radio == $cellArray[$i] ? 'checked' : '').' disabled />'.$radio;
											}
											break;
										case 'checkbox':
											$cells = explode(',',$valueArray[$i]);
											foreach($cells as $cellValue){
												$tdHtml .= '<input type="checkbox" value="'.$cellValue.'" '.($cellValue == $cellArray[$i] ? 'checked' : '').' disabled />'.$cellValue;
											}
											break;
										case 'datetime':
											$tdHtml .= $cellArray[$i];
											break;
										default :
											;
									}
									$tdHtml .= '</td>';
								}
								
								$htmlText .= ($tdHtml.'</tr>');
							}
							$rowCount++;
						}
					}
	
					$htmlText .= '</tbody></table>';
					
					$htmlText .= '<input type="button" value="计算" onclick="xd_form_tb_cal(\'LV_'.$index[1].'\',\''.$lv_cal.'\')">';
					$htmlText .= '<input type="hidden" class="LIST_VIEW" name="'.$name.'">';
					
					$scriptText = '<script type="text/javascript">jQuery(document).ready(function(){setInterval(xd_form_tb_cal,1000,\'LV_'.$index[1].'\',\''.$lv_cal.'\');';
					
					if(strpos($lv_sum,'1') >= 0 && isset($rowCount) && $rowCount > 1){
						$scriptText .= ' xd_form_tb_add_sum(\'LV_'.$index[1].'\',\''.$lv_sum.'\',1);';
					}
					$scriptText .= '});</script>';
					$htmlText .= $scriptText;
					
					$e->outertext = $htmlText;
				}
			}
		}
		
		return $html;
	}
}

?>