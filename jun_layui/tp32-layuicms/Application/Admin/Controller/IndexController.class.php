<?php
namespace Admin\Controller;

class IndexController extends BaseController {
	// 首页
    public function index(){
    	// 取配置文件里导航设置
    	$navList = $this->doUrl(C('NAV_LIST'));
    	$this->assign(array(
    		'navList' => $navList
		));
    	// console($navList);
        $this->display();
    }

    // 处理导航URL
    protected function doUrl($navList){
    	foreach ($navList as $key1 => $value1) {
    		$navList[$key1]['href'] = U($value1['href']);
    		if ($value['children']) {
    			foreach ($value1['children'] as $key2 => $value2) {
	    			$navList[$key1][$key2]['href'] = U($value2['href']);
	    		}
    		}
    	}
    	return json_encode($navList);
    }

    // 欢迎页
    public function main(){
    	$this->display();
    }
}