<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>回复建议</title>
<style>
    #main{margin:0 auto;width:50%}
	 table{width:100%;border-spacing: 10px 30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc}
	 th{border-bottom:2px solid #ccc;}
	 td{text-align:left;width:50%}
	 tr td:first-child{text-align:right;}
	 tr:last-child td:last-child{padding-left:20px}
	 h1{text-align:center}
	 input[type=text]{border-width:0px 0px 2px 0px;border-color:black}
	 input:focus{border-color:red}
</style>
<script>
</script>
</head>
<body>
     <div id="main">
      <h1>回复建议</h1>
      <form action="/myideas/idea/reply" method="post">
		   <table>
		     <tbody>
			  <tr>
   			   <td>建议人</td>
			   <td>${idea.emp.name}</td>
			  </tr>
			  <tr>
   			   <td>部门</td>
			   <td>${idea.emp.dept.name}</td>
			  </tr>
			  <tr>
			    <td>建议内容</td>
				<td>
				  ${idea.content}
				</td>
			  </tr>
			  <tr>
   			   <td>建议日期</td>
			   <td><fmt:formatDate value="${idea.createtime}" pattern="yyyy-MM-dd HH:mm" /></td>
			  </tr>
			  <tr>
   			   <td>认同人数</td>
			   <td>3</td>
			  </tr>
			  <tr>
			    <td>回复</td>
				<td>
				   <textarea name="reply" cols="30" rows="10"></textarea>
				   <input name="id" type="hidden" value="${idea.id }" />
				</td>
			  </tr>
			   <tr>
			    <td><input type="submit" value="回复"></td>
				<td><input type="reset" value="重置"></td>
			   </tr>
			</tbody>
		   </table>
      </form>
      </div>

</body></html>