<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * FunctionAction
 *
 * @author GodSon
 */
class FunctionAction extends BaseAction {

    public function index() {
        $this->display();
    }

    public function toAdd() {
        $this->display('add');
    }

    public function toUpdate() {
        $fid = $_GET['fid'];

        if ($fid) {
            $Model = D("Functions");
            $data = $Model->where('fid = %d', $fid)->find();
            if ($data) {
                $this->assign('data', $data);
            }
        }
        $this->display('add');
    }

    public function doSave() {
        $Model = D("Functions");
        if (!$Model->create()) {
            $this->returnStatus(false, $Model->getError());
        } else {
            if (empty($Model->fid)) {
                $Model->add();
            } else {
                $Model->save();
            }

            if ($Model->getError()) {
                $this->returnStatus(false, $Model->getError());
            }
            $this->returnStatus();
        }
    }

    public function menuTree() {
        $Menu = M('Menu');
        $dataList = $Menu->order('seq asc')->select();
        $this->ajaxReturn(BuildMenuTree($dataList));
    }

    public function getData() {
        $mid = $_POST['mid'];

        $Model = D("FunctionsView");
        if (!empty($mid)) {
            $dataList = $Model->where('functions.mid = %d', $mid)->page($this->page, $this->rows)->select();
            $count = $Model->where('functions.mid = %d', $mid)->count();
        } else {
            $dataList = $Model->page($this->page, $this->rows)->select();
            $count = $Model->count();
        }
        $this->returnGridData($dataList, $count);
    }

    public function doDelete() {
        $ids = $_POST['ids'];

        $array = explode(',', $ids);
        if ($array && count($array) > 0) {
            $Model = D("Functions");
            foreach ($array as $id) {
                $Model->where('fid = %d', $id)->delete();
            }
        }

        $this->returnStatus();
    }

}

?>
