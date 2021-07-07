<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    	<title>可选字段</title>
   		<c:import url="/admin/pages/common/headsource.jsp"/>		
  	</head>
<body class="easyui-layout" data-options="fit:true">
			<iframe name="fieldmeta-iframe" src="${root}/admin/pages/fieldmeta/fieldmeta-iframe.jsp"
			 scrolling="no" frameborder="0" style="width:100%;height: 100%;"></iframe>
			 
<script type="text/javascript">
$(window).load(function(){
	window.frames["fieldmeta-iframe"].ag_$entityfield_table.datagrid({url:adminActionPath + '/entityfield/findlist?tableName=codefun_option_field'});
	window.frames["fieldmeta-iframe"].ag_$pagefield_table.datagrid({url:adminActionPath + '/pagefield/findlist?tableName=codefun_option_field'});	

});
</script>			 			 
</body>
</html>
			