<?php

/**
 * 作者：GodSon
 * 链接：http://www.btboys.com/
 * 邮箱：wmails@126.com
 */

/**
 * CommonAction
 *
 * @author GodSon
 */
class BaseAction extends Action {

    public $page = 1;
    public $rows = 20;
    public $order;
    public $condition = array();

    /**
     * 初始化入口
     */
    function _initialize() {
        if (isLessThenIE9()) {
            $this->display('Public:killie');
            exit;
        }
        if (!session('?member')) {//判断用户是否登陆
            if ($this->isAjax()) {//判断是否是ajax请求
                header("HTTP/1.1 901 Not Login");
            } else {
                if (__ACTION__ != __APP__.'/Index/index') {
                    $this->redirect('/');
                }
                $this->display('Public:login');
            }
            exit;
        }

        $member = session('member');
        if (__ACTION__ != '/Index/index' && $member['uid'] != 0) {//非首页或者非系统管理员 权限判断
            $_allResources = session('_resources');
            if (!in_array(strtolower(__ACTION__), $_allResources)) {//判断访问资源是否有权限
                if ($this->isAjax()) {//判断是否是ajax请求
                    header("HTTP/1.1 902 Not Right");
                    echo __ACTION__;
                } else {
                    $this->assign('__ACTION__', __ACTION__);
                    $this->display('Public:noright');
                }
                exit;
            }
        }


        if (session('?cancel')) {//判断是否锁定
            $this->assign('canceled', true);
            if ($this->isAjax()) {//判断是否是ajax请求
                header("HTTP/1.1 903 System Canceled");
                exit;
            } else {
                if (__ACTION__ != '/Index/index') {
                    $this->redirect('/');
                }
            }
        }

        $this->assign('isAjax', !$this->isAjax());
        if (isset($_POST['title']))
            $this->assign('title', $_POST['title']);
        $this->_setPage();
        $this->_bulidPParams();
    }

    /**
     * 设置grid的分页信息
     */
    private function _setPage() {
        if (isset($_REQUEST['page']) && !empty($_REQUEST['page'])) {
            $this->page = intval($_REQUEST['page']);
        }

        if (isset($_REQUEST['rows']) && !empty($_REQUEST['rows'])) {
            $this->rows = intval($_REQUEST['rows']);
        }

        if (isset($_REQUEST['sort']) && !empty($_REQUEST['sort'])) {
            $this->order = $_REQUEST['sort'];
            if (isset($_REQUEST['order']) && !empty($_REQUEST['order'])) {
                $this->order .= ' ' . $_REQUEST['order'];
            }
        }
    }

    /**
     * 查询参数工厂
     */
    private function _bulidPParams() {
        //Q_paramName_EQ_AND
        foreach ($_REQUEST as $key => $value) {
            if (strncmp('Q_', $key, 2) == 0 && !empty($value)) {
                $info = explode('_', $key);
                if (count($info) == 2) {
                    $this->addCondition($info[1], $value, $value);
                } else if (count($info) > 2) {
                    $cnd = $info[2];
                    if (strripos($cnd, 'like') !== false) {
                        $c = substr_count($cnd, '%');
                        if ($c > 0 && $c == 1) {
                            if (strpos($cnd, '%') == 0) {
                                $value = '%' . $value;
                            } else {
                                $value = $value . '%';
                            }
                        } else {
                            $value = '%' . $value . '%';
                        }
                        $cnd = str_replace('%', '', $cnd);
                    }

                    if (count($info) == 4) {
                        $this->addCondition($info[1], array(array(strtolower($cnd), $value), strtolower($info[3])), $value);
                    } else {
                        $this->addCondition($info[1], array(strtolower($cnd), $value), $value);
                    }
                }
            }
        }
    }

    /**
     * 添加查询条件
     * @param type $filed 查询的字段
     * @param type $cnd  字段组装条件
     */
    private function addCondition($filed, $cnd) {
        if (isset($this->condition[$filed])) {
            $oldCond = $this->condition[$filed];
            $v = array_pop($this->condition[$filed]);
            
            if (is_array($cnd[0])) {
                $_cnd = $cnd[0];
                $andOr = $cnd[1];
            } else {
                $_cnd = $cnd;
                $andOr = 'and';
            }
            
            if (count($oldCond) > 2 && is_string($v) && (strtolower($v) == 'or' || strtolower($v) == 'and')) {
                $this->condition[$filed][] = $_cnd;
                $this->condition[$filed][] = $andOr;
            } else {
                $this->condition[$filed] = array($oldCond,$_cnd,$andOr);
            }
        } else {
            $this->condition[$filed] = $cnd;
        }
    }

    /**
     * 返回执行结果
     * @param type $status
     * @param type $msg
     * @param type $data
     */
    protected function returnStatus($status = TRUE, $msg = null, $data = null) {
        parent::ajaxReturn(array('status' => $status, 'data' => $data, 'msg' => $msg), 'JSON');
    }

    /**
     * 返回grid数据
     * @param type $data
     * @param type $total
     */
    protected function returnGridData($data, $total) {
        parent::ajaxReturn(array('rows' => (empty($data) ? array() : $data), 'total' => $total), 'JSON');
    }

}

?>
