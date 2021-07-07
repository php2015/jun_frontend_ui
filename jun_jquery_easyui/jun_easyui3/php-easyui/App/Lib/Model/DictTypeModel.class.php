<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * DictTypeModel
 *
 * @author GodSon
 */
class DictTypeModel extends Model{
    public $_validate = array(
        array('dtkey', '', '此标识已经存在', self::EXISTS_VALIDATE, 'unique', self::MODEL_BOTH)
    );
}

?>
