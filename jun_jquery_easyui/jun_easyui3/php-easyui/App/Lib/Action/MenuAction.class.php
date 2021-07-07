<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * MenuAction
 *
 * @author GodSon
 */
class MenuAction extends BaseAction {

    public function index() {
        $this->display();
    }

    public function getData() {
        $this->comboData(true);
    }

    public function toAdd() {
        $this->display('add');
    }

    public function manger() {
        $this->display('manager');
    }

    /**
     * 新增菜单
     */
    public function addMenu() {
        $Menu = D('Menu');
        if (!$Menu->create()) {
            $this->returnStatus(false, $Menu->getError());
        } else {
            if (empty($Menu->mid)) {
                $Menu->add();
            } else {
                $Menu->save();
            }

            if ($Menu->getError()) {
                $this->returnStatus(false, $Menu->getError());
            }
            $this->returnStatus();
        }
    }

    /**
     * 获取combo数据
     */
    public function comboData($isGetData = false) {
        $Menu = M('Menu');
        $condition = array();
        if (!$isGetData) {
            $condition['issort'] = 1;
        }
        if (!empty($_GET['path'])) {
            $condition['path'] = array('notlike', $_GET['path'] . '%');
        }
        $dataList = $Menu->where($condition)->order('seq asc')->select();
        $this->ajaxReturn(genTree($dataList, 'mid', 'pid'));
    }

    /**
     * 删除
     */
    public function delete() {
        $path = $_POST['path'];
        if (!empty($path)) {
            $Menu = M('Menu');
            $result = $Menu->where("path like '" . $path . "%'")->delete();
            if ($result > 0)
                $this->returnStatus();
            $this->returnStatus(false, $Menu->getDbError());
        }
        $this->returnStatus(false, '参数缺失');
    }

    public function toUpdate() {
        $mid = $_GET['mid'];
        if (!empty($mid)) {
            $Menu = M('Menu');
            $result = $Menu->where("mid = " . $mid)->find();
            if ($result)
                $this->assign('data', $result);
        }
        $this->display('add');
    }

}

?>
