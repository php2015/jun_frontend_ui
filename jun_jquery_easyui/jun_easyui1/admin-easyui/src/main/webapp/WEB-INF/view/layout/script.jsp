<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String easyuiThemeName = "default";
	Cookie cookies[] = request.getCookies();
	if (cookies != null && cookies.length > 0) {
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("cookiesColor")) {
				easyuiThemeName = cookie.getValue();
				break;
			}
		}
	}
%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/themes/<%=easyuiThemeName %>/easyui.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/themes/icon.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/xheditor/xheditor-1.1.14-zh-cn.min.js" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jqueryUtil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/json2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/FusionCharts/FusionCharts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/FusionCharts/FusionCharts.jqueryplugin.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/FusionCharts/FusionChartsExportComponent.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/core.js"></script>

<style type="text/css">
body {
	font-family: helvetica, tahoma, verdana, sans-serif;
	font-size: 13px;
	margin: 0px 0px 0px 0px;
	padding: 0px 0px 0px 0px;
}

.easyui-textbox {
	height: 18px;
	width: 170px;
	line-height: 16px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
	transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
    /*padding: 2px;
    border-radius: 5px 5px 5px 5px;*/
}

textarea:focus,input[type="text"]:focus {
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px
		rgba(82, 168, 236, 0.6);
	outline: 0 none;
}

table {
	background-color: transparent;
	border-collapse: collapse;
	border-spacing: 0;
	max-width: 100%;
}

fieldset {
	border: 0 none;
	margin: 0;
	padding: 0;
}

legend {
	-moz-border-bottom-colors: none;
	-moz-border-left-colors: none;
	-moz-border-right-colors: none;
	-moz-border-top-colors: none;
	border-color: #E5E5E5;
	border-image: none;
	border-style: none none solid;
	border-width: 0 0 1px;
	color: #999999;
	line-height: 20px;
	display: block;
	margin-bottom: 10px;
	padding: 0;
	width: 100%;
}

input,textarea {
	font-weight: normal;
}
</style>
