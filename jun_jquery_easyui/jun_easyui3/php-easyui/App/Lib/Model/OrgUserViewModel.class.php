<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * OrgUserViewModel
 *
 * @author GodSon
 */
class OrgUserViewModel extends ViewModel {

    protected $viewFields = array(
        'User' => array('uname', 'account', 'mail'),
        'UserOrg' => array('id', '_on' => 'User.uid=UserOrg.uid')
    );

}

?>
