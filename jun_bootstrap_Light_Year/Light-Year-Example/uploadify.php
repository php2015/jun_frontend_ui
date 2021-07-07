<?php
$filename = iconv('UTF-8', 'GBK', $_FILES['file']['name']);

$key      = $_POST['key'];
$key2     = $_POST['key2'];

$filestr     = explode('.', $filename);
$newname     = date('YmdHis',  strtotime('now')).rand(1000,9999);
$ext         = array_pop($filestr);
$newfilename = $newname.'.'.$ext;

if ($filename) {
    move_uploaded_file($_FILES["file"]["tmp_name"], "./upload/images/" . $newfilename);
}
echo json_encode(['status' => 200, 'msg' => '成功', 'filename' => $newname, 'url' => './upload/images/' . $newfilename]);