<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form"  prefix="sm"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增建议</title>
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

</script>
</head>
<body>
     <div id="main">
      <h1>新增建议</h1>
      <form action="" method="post">
		   <table>
		     <tbody>
			  <tr>
   			   <td>建议人</td>
			   <td><input name="" type="text" value="${emp.name }" readonly /></td>
			   <input name="emp.id" type="hidden" value="${emp.id }" />
			  </tr>
			  <tr>
   			   <td>标题</td>
			   <td><input name="title" type="text" value="${xx.title}"/><sm:errors path="xx.title"/>  </td>
			  </tr>
			  <tr>
			    <td>建议内容</td>
				<td>
				   <textarea name="content" cols="30" rows="10"></textarea><sm:errors path="xx.content"/>
				</td>
			  </tr>
			   <tr>
			    <td><input type="submit" value="添加"></td>
				<td><input type="reset" value="重置"></td>
			   </tr>
			</tbody>
		   </table>
      </form>
      </div>

</body></html>