<?php

return array(
    'URL_MODEL' => '2', //URL模式
    'SESSION_AUTO_START' => true,
    'SESSION_OPTIONS' => array('expire' => 1800),
    'URL_CASE_INSENSITIVE' => true,
    'DB_TYPE' => 'mysql',
    'DB_HOST' => 'localhost',
    'DB_NAME' => 'btdb',
    'DB_USER' => 'root',
    'DB_PWD' => 'root',
    'DB_PORT' => '3306',
    'DB_PREFIX' => 'bt_',
    'APP_AUTOLOAD_PATH' => '@.TagLib',
    'SYSYTEM_USER_NAME' => "admin",
    'SYSYTEM_USER_PWD' => '123456',
    'TMPL_PARSE_STRING' => array(
        '__JS__' => '/Public/Js', //JS目录
        '__CSS__' => '/Public/Css', //样式目录
        '__IMG__' => '/Public/Images', //图片目录
        '__THM__' => '/Public/Themes', //主题目录
    )
);
?>