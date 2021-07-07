<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * MenuModel
 *
 * @author GodSon
 */
class MenuModel extends Model {

    public $_validate = array(
        array('text', 'require', '必须填写名称'),
        array('href,issort', 'checkHref', '必须填写链接地址', 1, 'callback')
    );
    public $_auto = array(
        array('href', 'lower', self::MODEL_BOTH, 'callback')
    );

    protected function lower() {
        if (isset($_POST['href'])) {
            return strtolower($_POST['href']);
        } else {
            return '';
        }
    }

    protected function checkHref($data) {
        //当菜单类型为非分类时，href必填
        if ($data['issort'] == 0 && empty($data['href']))
            return false;
        return true;
    }

    protected function _before_write(&$data) {
        if ($data['pid'] == 0 && $data['mid'] != 0) {
            $data['pid'] = '-' . $data['mid'];
        }
        return true;
    }

    /**
     * 首次插入的时候，更新mid和path
     * @param type $data
     */
    protected function _after_insert($data) {
        $mid = $data['mid'];
        if ($data['pid'] == 0) {
            $this->where('mid = %d', $mid)->save(array('pid' => '-' . $mid, 'path' => '-' . $mid . '.' . $mid . '.'));
        } else {
            $path = $this->where('mid = %d', $data['pid'])->getField('path');
            $path = $path . $mid . '.';
            $this->where('mid = %d', $mid)->save(array('path' => $path));
        }
    }

    /**
     * 更新数据之后，更新path
     * @param type $data
     */
    protected function _after_update($data) {
        $mid = $data['mid'];
        if (!empty($mid)) {
            $path = $this->where('mid = %d', $data['pid'])->getField('path');
            $oldPath = $data['path'];
            $rpath = empty($path) ? '-' . $mid . '.' : $path;
            $path = $rpath . $mid . '.';

            $this->execute("UPDATE `" . C('DB_PREFIX') . "menu` SET `path`=REPLACE(`path`,'%s','%s') WHERE path like '%s'", $oldPath, $path, $oldPath . '%');
        }
    }

    public function getMenuDataByUid($uid) {
        if (!empty($uid)) {
            $sql = "select m.mid, m.pid,m.iconCls, m.text, m.href, m.issort, m.seq from " . C('DB_PREFIX') . "menu m where exists ( select * from ( select rr.tid from " . C('DB_PREFIX') . "role_right rr where exists ( select rid from " . C('DB_PREFIX') . "role_user as ru where ru.uid = %d and rr.rid = ru.rid ) and rr.type = 0 ) ids where ids.tid = m.mid ) and m.`status` = 0 order by seq ";
            return $this->query($sql, $uid);
        }
        return null;
    }

}

?>
