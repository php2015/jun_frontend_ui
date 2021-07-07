<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * DictAction
 *
 * @author GodSon
 */
class DictAction extends BaseAction {

    public function index() {
        $this->display();
    }

    public function validDtkey() {
        $TypeModel = D('DictType');
        if (!$TypeModel->create(array('id'=>$_GET['id'],'dtkey'=>$_POST['dtkey']))) {
            $this->ajaxReturn(FALSE);
        }
         $this->ajaxReturn(TRUE);
    }

    public function getData() {
        $TypeModel = D('DictDictTypeView');
        $dataList = $TypeModel->order('dtName asc,isdelete asc')->select();
        $this->returnGridData($dataList, $TypeModel->count());
    }

    public function comboData() {
        $TypeModel = D('DictType');
        $list = $TypeModel->where(array('isdelete' => 0))->select();
        $this->ajaxReturn($list);
    }

    public function toTypeView() {
        $this->display('type');
    }

    public function toaddView() {
        $this->display('add');
    }

    public function toupdateView() {
        $did = $_GET['did'];

        if ($did) {
            $Model = D("Dict");
            $data = $Model->where('did = %d', $did)->find();
            if ($data) {
                $this->assign('data', $data);
            }
        }
        $this->display('add');
    }

    public function getTypeData() {
        $TypeModel = D('DictType');
        $dataList = $TypeModel->order('isdelete asc')->select();
        $this->returnGridData($dataList, $TypeModel->count());
    }

    public function doSaveType() {
        if (isset($_POST["deleted"])) {
            $deleted = stripcslashes($_POST["deleted"]);
            $listDeleted = json_decode($deleted, TRUE);
        }

        if (isset($_POST["inserted"])) {
            $inserted = stripcslashes($_POST["inserted"]);
            $listInserted = json_decode($inserted, TRUE);
        }

        if (isset($_POST["updated"])) {
            $updated = stripcslashes($_POST["updated"]);
            $listUpdated = json_decode($updated, TRUE);
        }

        $TypeModel = D('DictType');

        if (!empty($listDeleted)) {
            foreach ($listDeleted as $value) {
                $TypeModel->where("id = %d", $value['id'])->save(array('isdelete' => 1));
            }
        }

        if (!empty($listUpdated)) {
            foreach ($listUpdated as $value) {
                $TypeModel->save($value);
            }
        }

        if (!empty($listInserted)) {
            $TypeModel->addAll($listInserted);
        }
        $this->returnStatus();
    }

    public function doSave() {
        $Model = D("Dict");
        if (!$Model->create()) {
            $this->returnStatus(false, $Model->getError());
        } else {
            if (empty($Model->did)) {
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

    public function doDelete() {
        $ids = $_POST['ids'];

        $array = explode(',', $ids);
        if ($array && count($array) > 0) {
            $Model = D("Dict");
            foreach ($array as $id) {
                $Model->where('did = %d', $id)->save(array('isdelete' => 1));
            }
        }

        $this->returnStatus();
    }

}

?>
