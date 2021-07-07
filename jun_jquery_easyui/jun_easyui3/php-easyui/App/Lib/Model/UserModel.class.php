<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com/
 * 邮箱：wmails@126.com
 */

/**
 * 用户模型
 *
 * @author GodSon
 */
class UserModel extends Model {

    public $_validate = array(
        array('account', '/^[a-z]\w{3,}$/i', '帐号格式错误'),
        array('password', 'require', '密码必须', 0, null, 1),
        array('uname', 'require', '姓名必须'),
        array('account', '', '帐号已经存在', self::EXISTS_VALIDATE, 'unique', self::MODEL_INSERT)
    );
    public $_auto = array(
        array('password', 'pwdHash', self::MODEL_BOTH, 'callback'),
        array('createTime', 'createTime', self::MODEL_INSERT, 'callback'),
        array('regip', 'get_client_ip', self::MODEL_INSERT, 'function')
    );

    protected function createTime() {
        import("@.ORG.Util.Date");
        $date = new Date();
        return $date->format();
    }

    protected function pwdHash() {
        if (isset($_POST['password'])) {
            return pwdHash($_POST['password']);
        } else {
            return false;
        }
    }

    function getUserDataWhitOid($oid, $page, $rows) {
        $sql = "select u.uid, u.uname, u.account, u.mail, om.id from " . c('db_prefix') . "org_manager as om right join " . c('db_prefix') . "user as u on om.uid = u.uid and om.oid = %d order by id desc limit %d,%d";
        
        return $this->query($sql, $oid, ($page-1)*$rows, $rows);
    }

}