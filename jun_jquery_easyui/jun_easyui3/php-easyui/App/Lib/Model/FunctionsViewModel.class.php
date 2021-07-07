<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * FunctionViewModel
 *
 * @author GodSon
 */
class FunctionsViewModel extends ViewModel {

    protected $viewFields = array(
        'Functions' => array('fid', 'text', 'resources', 'mid'),
        'Menu' => array('text' => 'relegation', '_on' => 'Menu.mid=Functions.mid')
    );

}

?>
