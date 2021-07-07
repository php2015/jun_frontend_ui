<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * OrgAction
 *
 * @author GodSon
 */
class OrgAction extends BaseAction {

    public function index() {
        $this->display();
    }

    public function getData() {
        $Model = D('Org');
        $data = $Model->getData();
        return $this->ajaxReturn(genTree($data, 'oid', 'pid'));
    }

    public function toAdd() {
        $this->display('add');
    }

    public function comboData() {
        $Model = D('Org');
        $data = $Model->where('oid != %d', $_GET['oid'])->select();
        return $this->ajaxReturn(genTree($data, 'oid', 'pid', 'oname'));
    }

    public function combogridData() {
        $Model = D('User');
        $count = $Model->count();
        if (empty($_GET['oid'])) {
            $data = $Model->field('uid,uname,account,mail')->page($this->page, $this->rows)->select();
            return $this->returnGridData($data, $count);
        } else {
            $data = $Model->getUserDataWhitOid($_GET['oid'], $this->page, $this->rows);
            return $this->returnGridData($data, $count);
        }
    }

    public function toupdate() {
        $oid = $_GET['oid'];
        $Model = D('Org');
        $data = $Model->where(array('oid' => $oid))->find();
        $manager = $Model->getUidByOid($oid);
        $data['manager'] = $manager;
        $this->assign('data', $data);
        $this->display('add');
    }

    public function doSave() {
        $Model = D("Org");
        $orgManger = D("OrgManager");

        if (!$Model->create()) {
            $this->returnStatus(false, $Model->getError());
        } else {
            $Model->startTrans();
            $result = false;

            if (empty($Model->oid)) {
                $result = $Model->add();
            } else {
                $result = $Model->save();
            }
            if ($result !== false) {
                if (!empty($_POST['oid'])) {
                    $orgManger->where(array('oid' => $_POST['oid']))->delete();
                }
                if (!empty($_POST['manager'])) {
                    $map = array();
                    $uIds = explode(',', $_POST['manager']);
                    foreach ($uIds as $value) {
                        $map[] = array('uid' => $value, 'oid' => (empty($_POST['oid']) ? $Model->getLastInsID() : $_POST['oid'] ));
                    }
                    if ($orgManger->addAll($map) === false) {
                        $Model->rollback();
                        $this->returnStatus(false, $Model->getDbError());
                    }
                }
            } else {
                $Model->rollback();
                $this->returnStatus(false, $Model->getError());
            }

            $Model->commit();
            $this->returnStatus();
        }
    }

    public function doDelete() {
        $Model = D("Org");
        $oid = $_POST['oid'];
        if (!empty($oid)) {
            $Model->startTrans();
            $count = $Model->where("pid = %d", $oid)->count();
            if ($count == 0) {
                $orgManger = D("OrgManager");
                $userOrg = D("UserOrg");
                $orgManger->where("oid = %d", $oid)->delete();
                $userOrg->where("oid = %d", $oid)->delete();
                if ($Model->where("oid = %d", $oid)->delete() === false) {
                    $Model->rollback();
                    $this->returnStatus(false, $Model->getError());
                }
                $Model->commit();
            } else {
                $this->returnStatus(false, '请先处理子节点！');
            }
        } else {
            $this->returnStatus(false, '参数缺失！');
        }
        $this->returnStatus(true);
    }

    public function getUserData() {
        $oid = $_POST['oid'];
        $Model = D("OrgUserView");
        $dataList = $Model->where("UserOrg.oid = %d", $oid)->page($this->page, $this->rows)->select();
        $this->returnGridData($dataList, $Model->where("UserOrg.oid = %d", $oid)->count());
    }

    public function getAddUserData() {
        $Mode = D('Org');
        $oid = $_GET['oid'];
        $data = $Mode->getadduserData($oid, $this->condition, $this->page, $this->rows);
        $this->returnGridData($data[0], $data[1]);
    }

    public function doAddOrgUser() {
        $oid = $_POST['oid'];
        $uids = $_POST['uids'];
        $array = explode(',', $uids);
        if ($array && count($array) > 0) {
            $dataList = array();
            foreach ($array as $id) {
                $dataList[] = array('oid' => $oid, 'uid' => $id);
            }

            $Model = D("UserOrg");
            $Model->addAll($dataList);
        }
        $this->returnStatus();
    }

    public function doDeleteOrgUser() {
        $ids = $_POST['ids'];
        $oid = $_POST['oid'];
        $array = explode(',', $ids);
        if ($array && count($array) > 0) {
            $Model = D("UserOrg");
            foreach ($array as $id) {
                $Model->where(array('id' => $id, 'oid' => $oid))->delete();
            }
        }

        $this->returnStatus();
    }

}

?>
