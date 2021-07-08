/*********************************************************
* version 1.2 - By Kant@SeekRoad
* 修改日期：2018-10-07
**********************************************************/

//设置登录窗口
function openPwd(){$('#w').window({modal:true,shadow:true,closed:true, resizable:false}); }
//关闭登录窗口
function closePwd(){$('#w').window('close'); }
//修改密码
function serverLogin(){
	var oldpass,newpass,rePass;
	oldpass = $('#txtOldPass').val();
	newpass = $('#txtNewPass').val();
	rePass = $('#txtRePass').val();
	if(oldpass!='' || newpass!='' || rePass!=''){
		if(oldpass == ''){
			showMsg('请输入旧密码！', 'warning', '系统提示'); return false;
		}
		if(newpass == ''){
			showMsg('请输入新密码！', 'warning', '系统提示'); return false;
		}
		if(rePass == ''){
			showMsg('请再一次输入新密码！', 'warning', '系统提示'); return false;
		}
		if(newpass != rePass){
			showMsg('两次密码不一致！请重新输入', 'warning', '系统提示'); return false;
		}
		//oldpass = md5(oldpass); newpass = md5(newpass); //rePass = md5(rePass);
		$.post(app_url+'/login/editpsw-'+newpass+'-'+oldpass, function(data){
			if(data.state=='success'){
				$('#txtOldPass').val('');$('#txtNewPass').val('');$('#txtRePass').val('');
				showMsg(data.msg, 'info', '系统提示'); closePwd();
			}else{ showMsg(data.msg, 'warning', '系统提示'); }
		});
	}else{
		showMsg('请输入要修改的新密码再提交！', 'warning', '系统提示'); return false;
	}
}
//解绑QQ账号
function unbindAccount(){
  $.post(app_url+'/login/unbind-qq-0', function(data){
	if(data.state=='success'){
		showMsg(data.msg, 'info', '系统提示');
		$('#unbindAccount').text('绑定QQ账号');
		$('#unbindAccount').attr('href',app_url+'/oauth/qq-0');
	}else{
		showMsg(data.msg, 'warning', '系统提示');
	}
  });
}
//初始化
$(function(){
	openPwd();
	$('#editpass').click(function(){ $('#w').window('open'); });
	$('#btnEp').click(function(){ serverLogin(); });
	$('#btnCancel').click(function(){closePwd();});
	$('#unbindAccount').click(function(){unbindAccount();});
	$('#loginOut').click(function() {
		$.messager.confirm('系统提示', '您确定要退出本次登录吗?', function(r){
			if (r){top.location.href = app_url+'/login/logout';}
		});
	});
});

