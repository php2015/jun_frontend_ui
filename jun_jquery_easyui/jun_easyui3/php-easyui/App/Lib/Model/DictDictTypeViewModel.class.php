<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * DictDictTypeViewModel
 *
 * @author GodSon
 */
class DictDictTypeViewModel extends ViewModel {

    protected $viewFields = array(
        'Dict' => array('did','dtValue', 'dtText', 'isdefault','isdelete'),
        'DictType' => array('dtName', '_on' => 'Dict.typeid=DictType.id')
    );

}

?>
