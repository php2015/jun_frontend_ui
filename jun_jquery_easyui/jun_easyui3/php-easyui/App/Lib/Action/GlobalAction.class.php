<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * GlobalAction
 *
 * @author GodSon
 */
class GlobalAction extends BaseAction {

    /**
     * 初始化入口
     */
    function _initialize() {
        if (isLessThenIE9()) {
            $this->display('Public:killie');
            exit;
        }
        if (!session('?member')) {//判断用户是否登陆
            if ($this->isAjax()) {//判断是否是ajax请求
                header("HTTP/1.1 901 Not Login");
            } else {
                if (__ACTION__ != '/Index/index') {
                    $this->redirect('/');
                }
                $this->display('Public:login');
            }
            exit;
        }
    }

    function doCancel() {
        session('cancel', true);
        $this->display('cancel');
    }

    function doCancelLogin() {
        $password = $_POST['pwd'];
        if ($password) {
            $member = session('member');
            if ($member['uid'] != 0) {//判断是否是管理员
                $Mode = D('User');
                $count = $Mode->where(array('account' => $member['account'], 'password' => pwdHash($password)))->count();
            } else {
                $count = $password == C('SYSYTEM_USER_PWD');
            }
            if ($count) {
                session('cancel', null);
                $this->returnStatus();
            }
        }
        $this->returnStatus(FALSE, '密码错误！');
    }

    function SaveOptions() {
        $optKey = $_POST['key'];
        $optValue = $_POST['value'];
        $member = session("member");
        $sql = "INSERT  " . C('DB_PREFIX') . "options (uid,op_key, op_value) values (%d,'%s', '%s') ON DUPLICATE KEY UPDATE op_value='%s'";
        $Model = D('options');
        if ($Model->execute($sql, $member['uid'], $optKey, $optValue, $optValue) === false) {
            $this->returnStatus(false, $Model->getDbError());
        }
        $dataList = $Model->where(array('uid' => $member['uid']))->select();
        $options = array();
        foreach ($dataList as $value) {
            $options[$value['op_key']] = $value['op_value'];
        }
        session("options", $options);
        $this->returnStatus();
    }

}
?>