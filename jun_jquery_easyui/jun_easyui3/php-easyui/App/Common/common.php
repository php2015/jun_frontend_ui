<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * 树形数据生成
 * @param type $items 原始数据
 * @param type $id  主键字段（默认：id）
 * @param type $pid 父节点标识（默认：pid）
 * @param type $son 子节点标识（默认：children）
 * @param type $attributes 是否添加attributes属性
 * @return array 树形数据
 */
function genTree($items, $id = 'id', $pid = 'pid', $textFiled = 'text', $son = 'children') {
    $tree = array(); //格式化的树
    $tmpMap = array();  //临时扁平数据

    foreach ($items as $item) {
        if (!isset($item['id'])) {
            $item['id'] = $item[$id];
        }
        if (!isset($item['text'])) {
            $item['text'] = $item[$textFiled];
        }
        $tmpMap[$item[$id]] = $item;
    }

    foreach ($items as $item) {
        if (isset($tmpMap[$item[$pid]])) {
            $tmpMap[$item[$pid]][$son][] = &$tmpMap[$item[$id]];
        } else {
            $tree[] = &$tmpMap[$item[$id]];
        }
    }
    return $tree;
}

/**
 * 树形数据生成
 * @param type $items 原始数
 * @return array 树形数据
 */
function BuildMenuTree($items) {
    $id = 'mid';
    $pid = 'pid';
    $son = 'children';

    $tree = array(); //格式化的树
    $tmpMap = array();  //临时扁平数据

    foreach ($items as $item) {
        $tmpMap[$item[$id]] = array('id' => $item[$id], 'text' => $item['text'], 'iconCls' => $item['iconCls'], 'attributes' => array('issort' => $item['issort'], 'href' => $item['href']));
    }

    foreach ($items as $item) {
        if (isset($tmpMap[$item[$pid]])) {
            $tmpMap[$item[$pid]][$son][] = &$tmpMap[$item[$id]];
        } else {
            $tree[] = &$tmpMap[$item[$id]];
        }
    }
    return $tree;
}

function pwdHash($password, $type = 'md5') {
    return hash($type, $password);
}

function isLessThenIE9() {
    if (strpos($_SERVER["HTTP_USER_AGENT"], "MSIE 8.0") || strpos($_SERVER["HTTP_USER_AGENT"], "MSIE 7.0") || strpos($_SERVER["HTTP_USER_AGENT"], "MSIE 6.0") || strpos($_SERVER["HTTP_USER_AGENT"], "MSIE 5.0")) {
        return true;
    }
    return false;
}

?>
