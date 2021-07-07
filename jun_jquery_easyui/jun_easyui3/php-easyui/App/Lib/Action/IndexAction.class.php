<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com/
 * 邮箱：wmails@126.com
 */

/**
 * IndexAction
 *
 * @author GodSon
 */
class IndexAction extends BaseAction {

    public function index() {
        $memberInfo = session('member');
        $Menu = D('Menu');
        if ($memberInfo['uid'] == 0) {
            $dataList = $Menu->order('seq asc')->select();
        } else {
            $dataList = $Menu->getMenuDataByUid($memberInfo['uid']);
        }
        $_allResources = session('_resources');
        foreach ($dataList as $value) {
            if (!empty($value['href']))
                $_allResources[] = $value['href'];
        }
        session('_resources', array_unique($_allResources));
        $this->assign('memberData', json_encode($memberInfo));
        $this->assign('member', $memberInfo);
        $this->assign('menuData', json_encode(BuildMenuTree($dataList)));

        import('@.ORG.Net.IpLocation'); // 导入IpLocation类
        $Ip = new IpLocation(); // 实例化类 参数表示IP地址库文件
        $area = $Ip->getlocation(get_client_ip()); // 获取某个IP地址所在
        $this->assign('ip', get_client_ip());
        $this->assign('area', $area);
        //读取个人配置
        $Options = D('options');
        $dataList = $Options->where(array('uid' => $memberInfo['uid']))->select();
        $options = array();
        foreach ($dataList as $value) {
            $options[$value['op_key']] = $value['op_value'];
        }
        $this->assign('options', json_encode($options));
        $this->assign('theme', isset($options['themeName']) ? $options['themeName'] : 'default');
        $this->display();
    }

}