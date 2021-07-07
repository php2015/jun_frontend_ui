<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

	<c:set var="root" value="${pageContext.request.contextPath}" scope="application"></c:set>
	<c:set var="easyuiVersion" value="jquery-easyui-1.5.3" scope="application"></c:set>
	<c:set var="easyuiThemeName" value="material" scope="application"></c:set>

	<c:set var="nowDate" scope="request" value="<%=new java.util.Date()%>"></c:set>

	
	<script type="text/javascript"> 
		var basePath = "${root}"; 
		var adminActionPath=basePath+"/admin/action"
	</script>
	
	<link id="easyuiTheme" rel="stylesheet" type="text/css" href="${root}/static/${easyuiVersion}/themes/${easyuiThemeName }/easyui.css"/>  
    <link rel="stylesheet" type="text/css" href="${root}/static/${easyuiVersion}/themes/icon.css"/>  
    <link rel="stylesheet" type="text/css" href="${root}/static/css/form.css"/>
    <script type="text/javascript" src="${root}/static/${easyuiVersion}/jquery.min.js"></script>  
    <script type="text/javascript" src="${root}/static/${easyuiVersion}/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${root}/static/${easyuiVersion}/locale/easyui-lang-zh_CN.js"></script>
	
	<script type="text/javascript" src="${root}/static/util/calutil.js"></script>
	<script type="text/javascript" src="${root}/static/util/klg.util.js"></script>
	
	<script type="text/javascript" src="${root}/static/easyui-extend/dataTable.js"></script>
	<script type="text/javascript" src="${root}/static/easyui-extend/common.js"></script>
	<script type="text/javascript" src="${root}/static/easyui-extend/jeasyuiex.js"></script>

	<script type="text/javascript" src="${root}/res/js/dictData.js?t=${nowDate.time}"></script>
	<!-- 	
	<script type="text/javascript" src="${root}/res/js/sysData.js?t=${nowDate.time}"></script>
 	-->
