<?php
/**
 * 讯点表单智能设计器1.0
 *		表单解析器
 *	@author www.sunairs.com
 *	@copytight www.sunairs.com
 *
 */
require_once('simple_html_dom.php');
class Sunairs_Form_Parse {
	private $version = '1.0';	//表单版本号
	private $srcHtml = '';	//表单源代码
	private $opType = 'w';	//表单操作(读：r,写：w)
	private $dom = null;		//表单内容的DOM对象
	private $formData = array();	//表单内容
	
	public function __construct($_version='1.0',$_srcHtml='',$_opType='w'){
		$this->version = $_version;
		$this->srcHtml = $_srcHtml;
		$this->opType = $_opType;
	}
	
	public function getSrcHtml(){
		return $this->srcHtml;
	}
	
	public function getVersion(){
		return $this->version;
	}
	
	public function setFormData($_formData){
		$this->formData = $_formData;
	}
	
	/*
	 * 解析表单内容
	 * @param string $html			要解析的表单内容 
	 * @param boolean $url_flag		是否是使用url获取内容
	 * @param array	$flow_parse		权限字段限制
	 */
	public function form_parse($html,$url_flag=false,$flow_parse=array()){
		if($url_flag){
			$this->dom = file_get_html($html);
		} else {
			
			$this->dom = new simple_html_dom();
			$this->dom->load($html);
		}
		
		$this->srcHtml = $html;
		
		//工作流的可写和保密字段
		require_once('control/Flow_Control.php');
		$flow_op = new Sunairs_Flow_Control();
		$this->dom = $flow_op->parseControl($this->dom,'r',$flow_parse);
		
		//加载控件配置文件
		require_once('form_config.php');
		
		if(!empty($FORM_CONTROL)){
			foreach($FORM_CONTROL as $fControl){
				$controlNameArray = explode('_',$fControl);
				$controlName = '';
				if(is_array($controlNameArray) && !empty($controlNameArray)){
					for($i = 1; $i < count($controlNameArray); $i++){
						$controlName .= ($controlName ? '_'.ucfirst(strtolower($controlNameArray[$i])) : (ucfirst(strtolower($controlNameArray[$i]))));
					}
				}
				
				//加载控件解析文件
				
				if($controlName && file_exists('parse/control/'.$controlName.'_Control.php')){
					require_once('parse/control/'.$controlName.'_Control.php');
					$command = '$parseObj = new Sunairs_'.$controlName.'_Control();';
					eval($command);
					if(isset($parseObj)){
						$this->dom = $parseObj->parseControl($this->dom,$this->opType,$this->formData);
					}
				}
			}
		}

		return $this->dom;
		
	}
	
	/** 
	 * 解析表单中的每个控件
	 *		返回表单中每个控件的属性和值的数组
	 * @param string $html html字符串
	 * @param string $form_id  表单ID
	 */
	public function parse_element($html,$formId=''){
		$FORM_ELEMENT_ARRAY = array();
	
		$this->dom = new simple_html_dom();
		if($html){
			$this->dom->load($html);
			//从缓存中读取，如果没有再进行解析
			
			require_once('form_config.php');
			if(!empty($FORM_CONTROL)){
				foreach($FORM_CONTROL as $fControl){
					$elementObj = $this->dom->find('[element_type="'.$fControl.'"]');
					foreach($elementObj as $e){
						$FORM_ELEMENT_ARRAY[$e->name] = array(
															'name'			=> $e->title,
															'module_field'	=> $e->module_field
														);
					}
				}
			}
		}
		
		$filePath = 'parse/cache/form_'.$formId.'.php';
		if(!file_exists($filePath)){
			$fp = fopen($filePath,'w');
			fwrite($fp,'<?php $ELEMENT_ARRAY = '."'".serialize($FORM_ELEMENT_ARRAY)."' ?>");
		} else {
			file_put_contents($filePath,'<?php $ELEMENT_ARRAY = '."'".serialize($FORM_ELEMENT_ARRAY)."' ?>");
		}
	}
}

?>