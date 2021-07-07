<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8">
<title>A Simple Page with CKEditor</title>
<!-- Make sure the path to CKEditor is correct. -->
<script type="text/javascript" src="static/ckeditor/ckeditor.js" charset="UTF-8"></script>
<!-- url structure:<script src="//cdn.ckeditor.com/<version.number>/<distribution>/ckeditor.js"></script> -->
<!-- 参数:basic/standard/standard-all/full/full-all -->
<!-- <script src="//cdn.ckeditor.com/4.5.2/standard/ckeditor.js"></script> -->
</head>
<body>
	<form>
		<textarea name="editor1" id="editor1" rows="10" cols="80">
                This is my textarea to be replaced with CKEditor.
        </textarea>
		<script>
			// Replace the <textarea id="editor1"> with a CKEditor
			// instance, using default configuration.
			CKEDITOR.replace('editor1');
		</script>
	</form>
</body>
</html>
