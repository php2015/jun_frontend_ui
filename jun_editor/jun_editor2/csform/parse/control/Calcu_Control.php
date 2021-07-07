<?php
/**
 * 讯点表单智能设计器
 *     计算控件
 * @author tony 2012-08-31
 * @copyright www.sunairs.com
 */
require_once('Control.php');
class Sunairs_Calcu_Control extends Sunairs_Control{

	public function parseControl($html,$opType="w",$formData=array()){
		$calcus = $html->find('input[element_type="xd_calcu"]');
		
		if(!empty($calcus)){
			foreach($calcus as $e){
				if($opType === 'w'){
					$name = $e->name;
					$index = explode('_',$name);
					$value = $e->value;
					$elementValue = $value;
					if(isset($formData[$name]) && $formData[$name]){
						$elementValue = $formData[$name];
					}
					
					$htmlText = '<input value="'.$elementValue.'" name="'.$name.'" title="'.($e->title).'" type="text" class="CALC" classname="CALC" prec="'.($e->prec).'">';
						
					//获取计算项
					$elementArray = array();
					$calcuElement = $html->find('input');
					foreach($calcuElement as $calcuE){
						if(strpos($value,$calcuE->title) >= 0){
							$elementArray[] = $calcuE;
						}
					}
					
					$calcuString = $this->calculate($value,$elementArray);
					$htmlText .= '<script type="text/javascript">function calc_'.$index[1].'(){var myvalue=eval("'.$calcuString.'");if(myvalue==Infinity) document.form1.DATA_'.$index[1].'.value="无效结果";else if(!isNaN(myvalue)) {var prec=document.form1.DATA_'.$index[1].'.getAttribute(\'prec\');var vPrec;if(!prec) vPrec=10000;else vPrec=Math.pow(10,prec);var result = new Number(parseFloat(Math.round(myvalue*vPrec)/vPrec));document.form1.DATA_'.$index[1].'.value=result.toFixed(prec);}else document.form1.DATA_'.$index[1].'.value=myvalue;setTimeout(calc_'.$index[1].',1000);}setTimeout(calc_'.$index[1].',3000);</script>';
					
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
	
	public function calculate( $VALUE, $ELEMENT_QUERY ){
		if ( $VALUE == "" )
		{
			return;
		}
		$VALUE = str_replace( array( "ABS(", "RMB(", "MAX(", "MIN(", "MOD(", "DAY(", "HOUR(", "AVG(", "DATE(", "LIST(" ), array( "calc_abs(", "calc_rmb(", "calc_max(", "calc_min(", "calc_mod(", "calc_day(", "calc_hour(", "calc_avg(", "calc_date(", "calc_list(" ), $VALUE );
		$flag = FALSE;
		if ( preg_match( "/[\\+|\\-|\\*|\\/|,]+/i", $VALUE ) == 0 )
		{
			$flag = TRUE;
		}
		foreach ( $ELEMENT_QUERY as $ELEMENT )
		{
			$ETITLE1 = $ELEMENT->title;
			$nameArray = explode('_',$ELEMENT->name);
			$ITEM_ID1 = $nameArray[1];
			if ( $flag && $ETITLE1 == $VALUE )
			{
				$VALUE = "calc_getval('DATA_".$ITEM_ID1."')";
			}
			else
			{
				if ( strstr( $ETITLE1, "/" ) )
				{
					$ETITLE1 = str_replace( array( "/", "+", "-" ), array( "\\/", "\\+", "\\-" ), $ETITLE1 );
				}
				$pattern = "/([\\+|\\-|\\*|\\/|\\(|,]+)".$ETITLE1."([\\+|\\-|\\*|\\/|\\)|,]+)/i";
				$VALUE = preg_replace( $pattern, "\$1calc_getval('DATA_".$ITEM_ID1."')\$2", $VALUE );
				$pattern = "/([\\+|\\-|\\*|\\/|,]+)".$ETITLE1."\$/i";
				$VALUE = preg_replace( $pattern, "\$1calc_getval('DATA_".$ITEM_ID1."')", $VALUE );
				$pattern = "/^".$ETITLE1."([\\+|\\-|\\*|\\/|,]+)/i";
				$VALUE = preg_replace( $pattern, "calc_getval('DATA_".$ITEM_ID1."')\$1", $VALUE );
			}
		}
		return $VALUE;
	}
}

?>