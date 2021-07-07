<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com/
 * 邮箱：wmails@126.com
 */

/**
 * PublicAction
 *
 * @author GodSon
 */
class PublicAction extends Action {

    public function doLogin() {
        $type = $_POST['type'];
        $acccount = $_POST['account'];
        $password = $_POST['password'];

        if ($type == 0 && $acccount == C('SYSYTEM_USER_NAME') && $password == C('SYSYTEM_USER_PWD')) {
            session('member', array('uid' => 0, 'uname' => 'SYSTEM'));
            $this->ajaxReturn(array('status' => true));
        } else {
            $Mode = D('User');
            $data = $Mode->field('uid,uname,account,mail')->where(array('account' => $acccount, 'password' => pwdHash($password)))->find();
            if (empty($data)) {
                $this->ajaxReturn(array('status' => false, 'msg' => '用户名或密码错误！'));
            }
            $this->getResourcesByUid($data['uid']);
            session('member', $data);
            $this->ajaxReturn(array('status' => true));
        }
        $this->ajaxReturn(array('status' => false));
    }

    public function doLogout() {
        session(null);
        $this->redirect("/");
    }

    public function verify() {
        $type = isset($_GET['type']) ? $_GET['type'] : 'gif';
        import("@.ORG.Util.Image");
        Image::buildImageVerify(4, 1, $type);
    }

    public function verifyCode() {
        if (session('verify') != md5($_POST['code'])) {
            $this->ajaxReturn(array('status' => false));
        }
        $this->ajaxReturn(array('status' => true));
    }

    private function getResourcesByUid($uid) {
        $Mode = D('Functions');
        $Resources = $Mode->getResourcesByUid($uid);
        $_allResources = array();
        if (!empty($Resources)) {
            foreach ($Resources as $value) {
                $_resources = $value['resources'];
                if (!empty($_resources)) {
                    $array = explode(';', $_resources);
                    $_allResources = array_merge($_allResources, array_filter($array));
                }
            }
        }
        session('_resources', $_allResources);
    }

}

?>
