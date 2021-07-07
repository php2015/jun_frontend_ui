<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * FunctionModel
 *
 * @author GodSon
 */
class FunctionsModel extends Model {

    public $_validate = array(
        array('text', 'require', '必须填写名称'),
        array('resources', 'require', '必须添加资源'),
        array('mid', 'require', '必须对应相应的菜单')
    );
    public $_auto = array(
        array('resources', 'lower', self::MODEL_BOTH, 'callback')
    );

    protected function lower() {
        if (isset($_POST['resources'])) {
            return strtolower($_POST['resources']);
        } else {
            return '';
        }
    }

    public function getResourcesByUid($uid) {
        if ($uid) {
            $sql = "SELECT f.resources FROM " . C('DB_PREFIX') . "functions f WHERE EXISTS ( SELECT * FROM ( SELECT rr.tid FROM " . C('DB_PREFIX') . "role_right rr WHERE EXISTS ( SELECT rid FROM " . C('DB_PREFIX') . "role_user AS ru WHERE ru.uid = %d AND rr.rid = ru.rid ) AND rr.type = 1 ) ids WHERE ids.tid = f.fid )";
            return $this->query($sql, $uid);
        }
        return null;
    }

}

?>
