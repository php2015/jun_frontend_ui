<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com
 * 邮箱：wmails@126.com
 */

/**
 * TagLibHtml
 *
 * @author GodSon
 */
class TagLibHtml extends TagLib {

    // 标签定义
    protected $tags = array(
        // 标签定义： attr 属性列表 close 是否闭合（0 或者1 默认1） alias 标签别名 level 嵌套层次
        'script' => array('attr' => 'pack,src', 'close' => 0)
    );

    public function _script($attr) {
        $tag = $this->parseXmlAttr($attr, 'script');
        $pack = $tag['pack'];
        $src = $tag['src'];

        $script = '<script type="text/javascript"> ';
        $script .= 'NameSpace("' . $pack . '", function() { ';
        $script .= 'var context = this; ';
        $scriptDir = C('TMPL_PARSE_STRING');
        $my_file = file_get_contents(APP_ROOT.$scriptDir['__JS__'] . $src);
        $script .= $my_file . ' ';
        $script .= '}); </script>';

        return $script;
    }

}

?>
