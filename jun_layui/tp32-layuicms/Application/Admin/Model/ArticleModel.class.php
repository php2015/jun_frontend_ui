<?php
namespace Admin\Model;
use Think\Model;

class ArticleModel extends Model
{
	// 查询
	public function selList($page,$limit,$article_name,$order_field,$order_type)
	{
		$where = array(
			'is_del' => 0
		);
		if (!empty($article_name)) {
			$where['article_name'] = array('like',"%$article_name%");
		}
		$order = array(
			'article_id' => 'desc'
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

	// 按id查询
	public function selById($article_id)
	{
		$result = $this->where("is_del = 0")->find($article_id);
		return $result;
	}

	// 置顶
	public function upTop($article_id,$article_top)
	{
		$data['article_top'] = $article_top;
		$result = $this->where("article_id = $article_id")->save($data);
		return $result;
	}

	// 删除
	public function del($article_id)
	{
		$data['is_del'] = 1;
		$result = $this->where("article_id = $article_id")->save($data);
		return $result;
	}

	// 批量删除
	public function delAll($article_ids)
	{
		$result = 0;
		foreach ($article_ids as $key => $value) {
			$this->del($value);
			$result++;
		}
		return $result;
	}

	// 新增
	public function addIt($data)
	{
		$data['art_add_time'] = strtotime($data['art_add_time']);
		$data['art_author'] = '张三';
		$result = $this->add($data);
		return $result;
	}

	// 编辑
	public function updIt($data)
	{
		if ($data['article_id'] > 0) {
			$data['art_add_time'] = strtotime($data['art_add_time']);
			$result = $this->save($data);
			return $result;
		}
	}
}