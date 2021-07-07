<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * RoleAction
 *
 * @author GodSon
 */
class RoleAction extends BaseAction {

    public function index() {
        $this->display();
    }

    public function getData() {
        $Model = M('Role');
        $data = $Model->page($this->page, $this->rows)->select();
        $this->returnGridData($data, $Model->count());
    }

    public function toadd() {
        $this->display('add');
    }

    public function toupdate() {
        $rid = $_GET['rid'];

        if ($rid) {
            $Model = D("role");
            $data = $Model->where('rid = %d', $rid)->find();
            if ($data) {
                $this->assign('data', $data);
            }
        }
        $this->display('add');
    }

    public function doSave() {
        $Model = D("Role");
        if (!$Model->create()) {
            $this->returnStatus(false, $Model->getError());
        } else {
            if (empty($Model->rid)) {
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
            $Model = D("Role");
            foreach ($array as $id) {
                $Model->where('rid = %d', $id)->delete();
            }
        }

        $this->returnStatus();
    }

    public function getRightData() {
        $rid = $_GET['rid'];
        $Model = D("Role");
        $this->ajaxReturn(genTree($Model->getRightData($rid), 'tid'));
    }

    public function getUserData() {
        $rid = $_POST['rid'];
        $Model = D("RoleUserView");
        $data = $Model->where(array('rid' => $rid))->page($this->page, $this->rows)->select();
        $this->returnGridData($data, $Model->where(array('rid' => $rid))->count());
    }

    public function toGrant() {
        $rid = $_GET['rid'];
        $Model = D("Role");
        $rightData = $Model->getRightData($rid);
        $rightTids = array();
        foreach ($rightData as $right) {
            $prefix = 'm';
            if ($right['type'] == 1)
                $prefix = 'f';
            $rightTids[] = $prefix . $right['tid'];
        }
        $data = $Model->getRightTreeData();
        Log::write(json_encode($rightData));
        $newData = array();
        foreach ($data as $Tright) {
            if (in_array($Tright['id'], $rightTids)) {
                $Tright['checked'] = true;
            }
            $newData[] = $Tright;
        }
        $this->assign('treeData', json_encode(genTree($newData)));
        $this->display('grant');
    }

    public function doGrant() {
        $rid = $_POST['rid'];
        $gids = $_POST['gids'];

        $Model = M("RoleRight");
        $Model->startTrans();
        $result = $Model->where(array('rid' => $rid))->delete();
        if ($result === false) {
            $Model->rollback();
            $this->returnStatus(false, $Model->getDbError());
        }

        $array = explode(',', $gids);
        if ($array && count($array) > 0) {
            $datas = array();
            foreach ($array as $id) {
                if ($id) {
                    $type = substr($id, 0, 1) == 'f' ? 1 : 0;
                    $tid = substr($id, 1);
                    $datas[] = array('rid' => $rid, 'type' => $type, 'tid' => $tid);
                }
            }
            $result = $Model->addAll($datas);
            if (false === $result) {
                $Model->rollback();
                $this->returnStatus(false, $Model->getDbError());
            }
        }
        $Model->commit();
        $this->returnStatus(true);
    }

    public function doUnGrant() {
        $ids = $_POST['tids'];

        $array = explode(',', $ids);
        if ($array && count($array) > 0) {
            $Model = D("RoleRight");
            foreach ($array as $id) {
                $Model->where('id = %d', $id)->delete();
            }
        }

        $this->returnStatus();
    }

    public function doDeleteRoleUser() {
        $ids = $_POST['ids'];
        $rid = $_POST['rid'];

        $array = explode(',', $ids);
        if ($array && count($array) > 0) {
            $Model = D("RoleUser");
            foreach ($array as $id) {
                $Model->where(array('uid' => $id, 'rid' => $rid))->delete();
            }
        }

        $this->returnStatus();
    }
    
    public function getadduserData() {
        $Mode = D('Role');
        $rid = $_GET['rid'];
        $data = $Mode->getadduserData($rid, $this->condition, $this->page, $this->rows);
        $this->returnGridData($data[0], $data[1]);
    }

    public function doAddRoleUser() {
        $rid = $_POST['rid'];
        $uids = $_POST['uids'];
        $array = explode(',', $uids);
        if ($array && count($array) > 0) {
            $dataList = array();
            foreach ($array as $id) {
                $dataList[] = array('rid' => $rid, 'uid' => $id);
            }

            $Model = D("RoleUser");
            $Model->addAll($dataList);
        }
        $this->returnStatus();
    }

}

?>
