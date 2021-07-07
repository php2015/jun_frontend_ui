<?php
namespace Admin\Controller;
use Think\Controller;
class BaseController extends Controller 
{
	// 构造函数
    public function __construct()
    {
    	// 登录判断
    	if (!session('manage')) {
    		$url = U('Login/login');
        	echo "<script>top.location.href='".$url."'</script>";
        	exit();
    	}
        parent::__construct();
    }
    
}