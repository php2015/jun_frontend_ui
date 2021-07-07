<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * DictModel
 *
 * @author GodSon
 */
class DictModel extends Model{
    public $_validate = array(
        array('typeid', 'require', '类型必须'),
        array('dtValue', 'require', '实际值必须'),
        array('dtText', 'require', '显示值必须')
    );
}

?>
