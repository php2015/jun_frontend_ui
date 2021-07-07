<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * RoleUserViewModel
 *
 * @author GodSon
 */
class RoleUserViewModel extends ViewModel {

    protected $viewFields = array(
        'User' => array('uname', 'account', 'mail'),
        'RoleUser' => array('uid', '_on' => 'User.uid=RoleUser.uid')
    );

}

?>
