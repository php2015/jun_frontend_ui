<?php
namespace Admin\Controller;

class ArticleController extends BaseController 
{
	// 文章列表
    public function index()
    {
    	if (!IS_AJAX) {
    		return $this->display();
    	}
    	$ArticleModel = D('Article');
    	$page = I('param.page');
    	$limit = I('param.limit');
    	$article_name = I('param.article_name');
    	$order_field = I('param.order_field');
    	$order_type = I('param.order_type');
    	$result = $ArticleModel->selList($page,$limit,$article_name,$order_field,$order_type);
    	retJsonLay($result['code'],$result['msg'],$result['count'],$result['data']);  
    }

    // 置顶
    public function upTop()
    {
    	$ArticleModel = D('Article');
    	$article_id = I('param.article_id');
    	$article_top = I('param.article_top');
    	$result = $ArticleModel->upTop($article_id,$article_top);
    	if ($result >= 0) {
    		retJson(0,'操作成功','');
    	} else {
    		retJson(1,'未知原因，操作失败!','');
    	}
    }

    // 删除
    public function del()
    {
    	$ArticleModel = D('Article');
    	$article_id = I('param.article_id');
    	$result = $ArticleModel->del($article_id);
    	if ($result >= 0) {
    		retJson(0,'操作成功','');
    	} else {
    		retJson(1,'未知原因，操作失败!','');
    	}
    }

    // 批量删除
    public function delAll()
    {
    	$ArticleModel = D('Article');
    	$article_ids = I('param.article_ids');
    	$result = $ArticleModel->delAll($article_ids);
    	if ($result >= 0) {
    		retJson(0,'操作成功','');
    	} else {
    		retJson(1,'未知原因，操作失败!','');
    	}
    }

    // 新增
    public function add()
    {
    	if (!IS_AJAX) {
    		return $this->display();
    	}
    	$ArticleModel = D('Article');
    	$data = I('post.');
    	$result = $ArticleModel->addIt($data);
    	if ($result) {
    		retJson(0,'操作成功','');
    	} else {
    		retJson(1,'未知原因，操作失败!','');
    	}
    }

    // 编辑
    public function upd()
    {
    	if (!IS_AJAX) {
    		$ArticleModel = D('Article');
    		$article_id = I('param.article_id');
    		$data = $ArticleModel->selById($article_id);
    		$this->assign(array(
    			'data' => $data
			));
    		return $this->display();
    	}
    	$ArticleModel = D('Article');
    	$data = I('post.');
    	$result = $ArticleModel->updIt($data);
    	if ($result >=0 ) {
    		retJson(0,'操作成功','');
    	} else {
    		retJson(1,'未知原因，操作失败!','');
    	}
    }
}