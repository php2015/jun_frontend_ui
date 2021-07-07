<?php
namespace Admin\Model;
use Think\Model;

class ManageModel extends Model
{
	// 查询
	public function selList($page,$limit,$order_field,$order_type,$username)
	{
		$where = array(
			'is_del' => 0
		);
		if (!empty($username)) {
			$where['username'] = array('like',"%$username%");
		}
		$order = array(
			'manage_id' => 'desc'
		);
		if (!empty($order_field) && $order_type) {
			$order["$order_field"] = $order_type;
		}
		$count = $this->where($where)->count();
		$list = $this->where($where)->order($order)->limit(($page-1)*$limit.','.$limit)->select();
		return array(
			'code' => 0,
			'msg' => '',
			'count' => $count,
			'data' => $list
		);
	}
	
	// 按用户查询
	public function selByName($username)
	{
		$where = array(
			'is_del' => 0,
			'username' => $username
		);
		$result = $this->where($where)->find();
		return $result;
	}

	// 按id查询
	public function selById($manage_id)
	{
		$where = array(
			'is_del' => 0,
			'manage_id' => $manage_id
		);
		$result = $this->where($where)->find();
		return $result;
	}

	// 删除
	public function del($manage_id) {
		if ($manage_id > 0) {
			$data['is_del'] = 1;
			$result = $this->where("manage_id = $manage_id")->save($data);
			return $result;
		}
	}

	// 批量删除
	public function delAll($manage_ids)
	{
		$result = 0;
		foreach ($manage_ids as $key => $value) {
			$this->del($value);
			$result++;
		}
		return $result;
	}

	// 新增
	public function addIt($data)
	{
		$data['user_add_time'] = strtotime($data['user_add_time']);
		$data['password'] = md5($data['password']);
		$result = $this->add($data);
		return $result;
	}

	// 编辑
	public function updIt($data)
	{
		if ($data['manage_id'] > 0) {
			$data['user_add_time'] = strtotime($data['user_add_time']);
			$result = $this->save($data);
			return $result;
		}
	}

	// 重置密码
	public function pass($manage_id) {
		if ($manage_id > 0) {
			$data['password'] = md5('123456');
			$result = $this->where("manage_id = $manage_id")->save($data);
			return $result;
		}
	}
}