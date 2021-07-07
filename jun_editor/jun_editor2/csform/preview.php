<?php


require_once('parse/form_parse.php');


$form_string = stripslashes($_POST['form_define']);
$parseObj = new Sunairs_Form_Parse('1.0',$form_string,'w');

$formData = array(
				'DATA_1' => '111111',
				'DATA_2' => '222222',
				'DATA_3' => '33333',
				'DATA_4' => '44444',
				'DATA_5' => '55555',
				'DATA_6' => '66666',
				'DATA_7' => '77777',
				'DATA_8' => '88888',
				'DATA_9' => '99999',
				'DATA_10'=> 'SDKFS',
				'DATA_11'=> '222',
				'DATA_12'=> '111',
				'DATA_13'=> '111`222`11`44`11`2012-08-29|333`333`22`22`22`2012-08-29',
				'DATA_16'=> '2012-08-30',
				'DATA_17'=> '2012-08-31',
				'DATA_19'=> '1',
				'DATA_20'=> '2',
				'DATA_21'=> '3.0000'
			);

$parseObj->setFormData($formData);
$result = $parseObj->form_parse($form_string);
/*
$parseObj->parse_element($form_string,1);

require_once('parse/cache/form_1.php');
$ELEMENT_ARRAY = unserialize($ELEMENT_ARRAY);
*/
?>
<html>
	<head>
		<title>js实例</title>
		<link rel="stylesheet" type="text/css" href="css/form.css" />
		<script type="text/javascript" src="parse/form.js"></script>
		<script type="text/javascript" src="lib/jquery.min.js"></script>
		<script type="text/javascript" src="lib/DatePicker/WdatePicker.js"></script>
	</head>
	<body>
	<div>
	<form name="form1" id="form1" method="POST">
	<?php
		echo $result;
		
		//销毁dom对象
		$result->clear();
	?>
	</form>
	</div>
	</body>
</html>