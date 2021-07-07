<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 防止集成Shiro后当遇到404错误时会丢失session -->
<%@ page session="false"%>
<!DOCTYPE HTML>
<html>
<head>
<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/favicon.ico" media="screen" />
<title>404页面</title>
</head>
<body>
		<p>对不起，您没有相应权限~</p>
</body>
</html>