<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * OrgModel
 *
 * @author GodSon
 */
class OrgModel extends Model {

    function getData() {
        $sql = "select org.oid, org.pid,org.oname, org.seq, org.description, group_concat(u.uname) manager from " . c('db_prefix') . "org as org inner join " . c('db_prefix') . "org_manager as om on org.oid = om.oid inner join " . c('db_prefix') . "user as u on om.uid = u.uid  group by org.oid order by org.seq";
        return $this->query($sql);
    }

    function getUidByOid($oid) {
        $sql = "select group_concat(uid) uids from " . c('db_prefix') . "org_manager where oid = %d";
        $data = $this->query($sql, $oid);
        if (!empty($data) && count($data) == 1) {
            $row = $data[0];
            return $row['uids'];
        }
        return '';
    }

    function getadduserData($rid, $condition, $page, $rows) {
        $sql = " SELECT u.uid, u.uname, u.account, u.mail FROM " . c('db_prefix') . "user AS u WHERE NOT EXISTS ( SELECT ru.uid FROM " . c('db_prefix') . "user_org ru WHERE u.uid = ru.uid AND ru.oid = %d ) and 1=1 ";
        $count = " SELECT count(1) c FROM " . c('db_prefix') . "user AS u WHERE NOT EXISTS ( SELECT ru.uid FROM " . c('db_prefix') . "user_org ru WHERE u.uid = ru.uid AND ru.oid = %d ) and 1=1 ";
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

?>
