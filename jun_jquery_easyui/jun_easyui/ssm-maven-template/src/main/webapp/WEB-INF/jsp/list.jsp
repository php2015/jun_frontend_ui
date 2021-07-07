<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<!DOCTYPE html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>建议列表</title>
<style>
     th{border-bottom:2px solid #ccc;}
     td{border-bottom:1px solid #ccc; text-align:left}
	 h1{text-align:center}
	 tr td:last-child {text-align:left;width:300px;}
	 tr td:last-child a:first-child{margin-left:50px}
</style>
<script>
   
</script>

</head>
<body>
   <h1>建议列表</h1>
   <table align="center" width="90%" cellspacing="0px">
       
       <tbody><tr>
             
              <th>编号</th>
              <th>员工姓名</th>
			  <th>部门</th>
			  <th>建议</th>
			  <th>发表日期</th>
			  <th>回复内容</th>
			  <th>回复日期</th>
			  <th>回复人</th>
              <th>操作 <a href="add">新增记录</a></th>
       </tr>
        
           <c:forEach var="c" items="${list }"> 
        <tr>
             <td>${c.id}</td>
             <td>${c.emp.name}</td>
			 <td>${c.emp.dept.name}</td>
			 <td>${c.content}</td>
			 <td><fmt:formatDate value="${c.createtime}" pattern="yyyy-MM-dd HH:mm" /></td>
             <td>${c.reply}</td>
			 <td><fmt:formatDate value="${c.replytime}" pattern="yyyy-MM-dd HH:mm" /></td>
			 <td>${c.replyemp.name}</td>
             <td>
			     <a href="">+1</a>
				 <a href="detail/${c.id }">详细</a>
				 <a href="reply/${c.id }">回复</a>
				 <a href="del/${c.id }">删除</a>
             </td>
       </tr>
        </c:forEach>   
   </tbody>
   </table>
     

</body></html>