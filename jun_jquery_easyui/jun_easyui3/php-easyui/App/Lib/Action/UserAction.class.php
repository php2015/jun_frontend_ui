<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * UserAction
 *
 * @author GodSon
 */
class UserAction extends BaseAction {

    public function index() {
        $this->display();
    }

    public function getData() {
        $Mode = D('User');
        $data = $Mode->where($this->condition)->page($this->page, $this->rows)->order($this->order)->select();
        Log::write($Mode->getLastSql());
        $this->returnGridData($data, $Mode->where($this->condition)->count());
    }

    public function toAdd() {
        $Role = D('Role');
        $roles = $Role->field('rid,text')->where(array('status' => 0))->select();
        $this->assign('roles', json_encode($roles));
        $this->display('add');
    }

    public function doSave() {
        $Model = D("User");
        $roleUser = D("RoleUser");
        if (!$Model->create()) {
            $this->returnStatus(false, $Model->getError());
        } else {
            $Model->startTrans();
            $result = false;

            if (empty($Model->uid)) {
                $result = $Model->add();
            } else {
                $result = $Model->save();
            }
            if ($result !== false) {
                if (!empty($_POST['uid'])) {
                    $roleUser->where(array('uid' => $_POST['uid']))->delete();
                }
                if (!empty($_POST['roles'])) {
                    $map = array();
                    $rolesIds = explode(',', $_POST['roles']);
                    foreach ($rolesIds as $value) {
                        $map[] = array('rid' => $value, 'uid' => (empty($_POST['uid']) ? $Model->getLastInsID() : $_POST['uid'] ));
                    }
                    if ($roleUser->addAll($map) === false) {
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
        $ids = $_POST['ids'];
        $roleUser = D("RoleUser");
        $array = explode(',', $ids);
        if ($array && count($array) > 0) {
            $Model = D("User");
            foreach ($array as $id) {
                $Model->startTrans();
                if ($Model->where(array('uid' => $id))->delete() !== false && $roleUser->where(array('uid' => $id))->delete() !== false) {
                    $Model->commit();
                } else {
                    $Model->rollback();
                }
            }
        }
        $this->returnStatus();
    }

    public function toUpdate() {
        $uid = $_GET['uid'];
        if ($uid) {
            $Model = D("User");
            $data = $Model->where('uid = %d', $uid)->find();
            if ($data) {
                $roleUser = D("RoleUser");
                $roles = $roleUser->where(array('uid' => $uid))->field('rid')->select();
                $ids = array();
                foreach ($roles as $value) {
                    $ids[] = $value['rid'];
                }
                $data['roles'] = join(',', $ids);
                $this->assign('data', $data);
                $Role = D('Role');
                $rolesCombox = $Role->field('rid,text')->where(array('status' => 0))->select();
                $this->assign('roles', json_encode($rolesCombox));
            }
        }
        $this->display('add');
    }

}

?>
