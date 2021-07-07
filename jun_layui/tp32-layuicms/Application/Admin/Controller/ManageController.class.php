<?php
namespace Admin\Controller;

class ManageController extends BaseController 
{
	// 文章列表
    public function index()
    {
    	if (!IS_AJAX) {
    		return $this->display();
    	}
    	$ManageModel = D('Manage');
    	$page = I('param.page');
    	$limit = I('param.limit');
    	$username = I('param.username');
    	$order_field = I('param.order_field');
    	$order_type = I('param.order_type');
		$result = $ManageModel->selList($page,$limit,$order_field,$order_type,$username);
    	retJsonLay($result['code'],$result['msg'],$result['count'],$result['data']);  
	}
	
	// 删除
	public function del()
	{
		$ManageModel = D('Manage');
		$manage_id = I('param.manage_id');
		$result = $ManageModel->del($manage_id);
		if ($result >= 0) {
    		retJson(0,'删除成功','');
    	} else {
    		retJson(1,'未知原因，删除失败!','');
    	}
	}

	// 批量删除
    public function delAll()
    {
    	$ManageModel = D('Manage');
    	$manage_ids = I('param.manage_ids');
    	$result = $ManageModel->delAll($manage_ids);
    	if ($result >= 0) {
    		retJson(0,'删除成功','');
    	} else {
    		retJson(1,'未知原因，删除失败!','');
    	}
	}
	
	// 添加用户
	public function add()
	{
		if (!IS_AJAX) {
    		return $this->display();
		}
		$ManageModel = D('Manage');
		$data = I('post.');
		// 检查用户名存在
		if ($ManageModel->selByName($data['username'])) {
			retJson(1,'用户名已存在！','');
		}
		$result = $ManageModel->addIt($data);
		if ($result) {
    		retJson(0,'添加成功','');
    	} else {
    		retJson(1,'未知原因，添加失败!','');
    	}
	}

	// 编辑修改
	public function upd()
	{
		if (!IS_AJAX) {
			$ManageModel = D('Manage');
			$manage_id = I('param.manage_id');
			$data = $ManageModel->selById($manage_id);
			$this->assign(array(
				'data' => $data
			));
    		return $this->display();
		}
		$ManageModel = D('Manage');
		$data = I('post.');
		$result = $ManageModel->updIt($data);
    	if ($result >=0 ) {
    		retJson(0,'更新成功','');
    	} else {
    		retJson(1,'未知原因，更新失败!','');
    	}
	}

	// 重置密码
	public function pass() 
	{
		$ManageModel = D('Manage');
		$manage_id = I('param.manage_id');
		$result = $ManageModel->pass($manage_id);
    	if ($result >=0 ) {
    		retJson(0,'重置成功','');
    	} else {
    		retJson(1,'未知原因，重置失败!','');
    	}
	}
	
}