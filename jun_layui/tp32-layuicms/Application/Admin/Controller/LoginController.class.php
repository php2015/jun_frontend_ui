<?php
namespace Admin\Controller;
use Think\Controller;
class LoginController extends Controller 
{
	// 登陆
    public function login()
    {
        if (!IS_AJAX) {
            return $this->display();
        }
        $username = I('param.username');
        $password = I('param.password');
        $vcode = I('param.vcode');
        // 检查验证码
        if (!$this->checkVerify($vcode)) {
            retJson(1,'验证码错误！','');
        }
        $ManageModel = D('Manage');
        $manage = $ManageModel->selByName($username);
        // 检查用户名
        if (!$manage) {
            retJson(1,'用户名错误！','');
        }
        // 检查密码
        if (md5($password) !== $manage['password']) {
            retJson(1,'密码错误！','');
        }
        // 检查状态
        if ($manage['status'] === 1) {
            retJson(1,'该用户已经封禁！','');
        }
        // 存SESSION
        session('manage',$manage); 
        retJson(0,'登录成功','');
    }

    // 退出
    public function outLogin()
    {
        session('manage',null);
        $url = U('login');
        echo "<script>top.location.href='".$url."'</script>";
    }

    // 验证码
    public function vcode()
    {
        $config = array(
            'fontSize'    =>    30,    // 验证码字体大小
            'length'      =>    4,     // 验证码位数
            'useNoise'    =>    false, // 关闭验证码杂点
        );
        $Verify = new \Think\Verify($config);
        $Verify->entry();
    }

    // 检查验证码
    function checkVerify($code, $id = '')
    {
        $verify = new \Think\Verify();    
        return $verify->check($code, $id);
    }
}