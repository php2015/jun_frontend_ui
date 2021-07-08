<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册</title>
<script type="text/javascript" src="js/jquery-easyui-1.3.1/jquery-1.8.0.min.js"></script>
</head>
<body>
<form action="user.html" method="post">
 <table width="207" border="0" align="center">
        <tr>
          <td colspan="2" align="center" nowrap="nowrap">用户注册</td>
        </tr>
        <tr>
          <td width="68" nowrap="nowrap">用户名</td>
          <td width="127" nowrap="nowrap"><label>
            <input name="username" type="text" id="username" size="20" />
          </label></td>
        </tr>
        <tr>
          <td nowrap="nowrap">密　码</td>
          <td nowrap="nowrap"><input name="password" type="password" id="password" size="20" maxlength="10" /></td>
        </tr>
        <tr><td>验证码</td><td><input id="index_code" name="code" type="text" /></td>
       <td> <img id="imgObj" alt="验证码" src="code.html" />
		<a href="#" onclick="changeImg()">换一张</a></td></tr>
        <tr>
          <td colspan="2" align="center" nowrap="nowrap"><label>
            <input type="submit"  value="注册" />
            <input type="reset"  value="重填" />
          </label></td>
        </tr>
  </table>
</form>
</body>
<script type="text/javascript">
	function changeImg() {
		var imgSrc = $("#imgObj");
		var src = imgSrc.attr("src");
		imgSrc.attr("src", chgUrl(src));
	}
	//时间戳   
	//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳   
	function chgUrl(url) {
		var timestamp = (new Date()).valueOf();
		url = url.substring(0, 17);
		if ((url.indexOf("&") >= 0)) {
			url = url + "×tamp=" + timestamp;
		} else {
			url = url + "?timestamp=" + timestamp;
		}
		return url;
	}
</script>
</html>