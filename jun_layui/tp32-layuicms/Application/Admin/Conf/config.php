<?php
return array(

    // 后台导航菜单
    'NAV_LIST' => array(
        array(
            "title" => "文章列表",
            "icon" => "icon-text",
            "href" => "Article/index",
            "spread" => false,
		),
		array(
            "title" => "系统用户",
            "icon" => "&#xe612;",
            "href" => "Manage/index",
            "spread" => false,
        ),

        array(
            "title" => "基础数据",
            "icon" => "&#xe631;",
            "href" => "",
            "spread" => false,
            "children" => array(
                array(
                    "title" => "其他页面",
                    "icon" => "",
                    "href" => "Studen/index",
                    "spread" => false,
                )
            )
        )
    ),

    // 系统配置
    'APP_SYS_NAME' => 'TP32LAYUICMS',

);
