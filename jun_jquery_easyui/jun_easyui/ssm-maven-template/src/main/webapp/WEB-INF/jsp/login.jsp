<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
<style>
    form span{display:inline-block;width:80px;text-align:right}
   #main{margin:100px auto;border:1px solid #ccc;width:350px;padding:0 30px  30px 30px}
   form a{font-size:12px;float:right;margin-right:50px;}
 </style>
</head>
<body>
  <div id="main">
        <h2>登录小秘书系统</h2>
        <hr color="#ccc"><br>
       <form action="" method="post">
            <span>用户名:</span> <input name="name" type="text"><br><br>
            <span>密码:</span> <input name="pwd" type="password"><br><br>
            <span></span><input value="登录" type="submit">
             <a href="http://localhost:8080/MyShop2/page/login.html">注册</a>
       </form>
       ${param.msg}
    </div>

</body></html>