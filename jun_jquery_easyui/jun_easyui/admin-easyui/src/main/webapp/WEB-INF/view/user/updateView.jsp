<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<script type="text/javascript">
	$(function(){
		$("#form").form({
			url:"user/update.do",
			onSubmit:function(){
				U.loading();
				var isValid=$(this).form('validate');
				if(!isValid){
					parent.$.messager.progress('close');
				}
				return isValid;
			},
			success:function(result){
				parent.$.messager.progress('close');
				result = $.parseJSON(result);
				if(result.status){
					parent.reload;
					parent.$.modalDialog.openner.datagrid('reload');
					parent.$.modalDialog.handler.dialog('close');
					U.notice("操作成功");
				}else{
					U.notice("操作失败");
				}
			}
		});
	});

</script>
<style>
	textarea:focus, input[type="text"]:focus{
	    border-color: rgba(82, 168, 236, 0.8);
	    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
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
	input, textarea {
	    font-weight: normal;
	}
	table ,th,td{
		text-align:left;
		padding: 6px;
	}
</style>
<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
		<form id="form" method="post">
			<fieldset>
				<legend><img src="image/fromedit.png" style="margin-bottom: -3px;"/> 用户编辑</legend>
				<input name="id" id="id"  type="hidden"/>
				 <table>
					 <tr>
					    <th>用户名</th>
						<td><input name="username" id="username" placeholder="请输入用户名" class="easyui-textbox easyui-validatebox" type="text"/></td>
						<th>姓名</th>
						<td><input name="name" id="name" type="text" class="easyui-textbox easyui-validatebox" required="required"/></td>
					 </tr>
					 <tr>
						<th>用户密码</th>
						<td colspan="3"><input id="password" name="password" type="text" class="easyui-textbox easyui-validatebox"  required="required" /></td>
					 </tr>
					  <tr>
					    <th>邮箱</th>
						<td><input id="email" name="email" type="text" class="easyui-textbox easyui-validatebox" required="required"/></td>
						<th>电话</th>
						<td><input id="tel" name="tel" type="text" class="easyui-textbox easyui-validatebox" required="required"/></td>
					 </tr>
				 </table>
			</fieldset>
		</form>
	</div>
</div>
