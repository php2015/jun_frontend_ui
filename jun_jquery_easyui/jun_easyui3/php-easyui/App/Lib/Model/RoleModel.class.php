<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com/
 * 邮箱：wmails@126.com
 */

/**
 * 角色模型
 *
 * @author GodSon
 */
class RoleModel extends Model {

    public $_validate = array(
        array('text', 'require', '名称必须'),
    );

    function getRightTreeData() {
        $sql = "select CONCAT('f',fid) as id, text, CONCAT('m',mid) as pid,0 type from " . c('db_prefix') . "functions union select CONCAT('m',mid), text, CONCAT('m',pid),issort from " . c('db_prefix') . "menu";
        return $this->query($sql);
    }

    function getRightData($rid) {
        $sql = "select rr.id as id, f.text, f.mid as pid,f.fid as tid,1 type from ( select * from " . c('db_prefix') . "role_right rr where rr.rid = %d and rr.type = 1 ) rr join " . c('db_prefix') . "functions f on f.fid = rr.tid union select rr.id, m.text,  m.pid,m.mid as tid,0 from ( select * from " . c('db_prefix') . "role_right rr where rr.rid = %d and rr.type = 0 ) rr join " . c('db_prefix') . "menu m on m.mid = rr.tid";
        return $this->query($sql, $rid, $rid);
    }

    function getadduserData($rid, $condition, $page, $rows) {
        $sql = " SELECT u.uid, u.uname, u.account, u.mail FROM " . c('db_prefix') . "user AS u WHERE NOT EXISTS ( SELECT ru.uid FROM " . c('db_prefix') . "role_user ru WHERE u.uid = ru.uid AND ru.rid = %d ) and 1=1 ";
        $count = " SELECT count(1) c FROM " . c('db_prefix') . "user AS u WHERE NOT EXISTS ( SELECT ru.uid FROM " . c('db_prefix') . "role_user ru WHERE u.uid = ru.uid AND ru.rid = %d ) and 1=1 ";
        $where = '';
        $val = array($rid);
        if (count($condition) > 0) {
            foreach ($condition as $key => $value) {
                $where .='and u.' . $key . ' ' . $value[0] . ' \'%s\' ';
                $val[] = $value[1];
            }
        }
        $count = $this->parseSql($count . $where, $val);
        $sql = $sql . $where . ' limit %d,%d';
        array_push($val, ($page - 1) * $rows);
        array_push($val, $rows);
        $sql = $this->parseSql($sql, $val);
        $rs = $this->query($count);
        $cr = $rs[0];
        return array($this->query($sql), $cr['c']);
    }

}