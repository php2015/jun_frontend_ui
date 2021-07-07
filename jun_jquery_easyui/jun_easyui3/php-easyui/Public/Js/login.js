$(function() {
    var $dialog = $('<div/>');
    var $formBody = $('#form-body');
    $dialog.dialog({
        height: 300,
        width: 500,
        content: $formBody.show(),
        noheader: true,
        buttons: [{
                id: 'loginBtn',
                disabled: true,
                text: '登陆',
                handler:function(){
                    $.post('public/dologin',$formBody.serialize(),function(rsp){
                          if(rsp.status){
                               window.location.reload();
                          }else{
                              $.messager.alert('提示',rsp.msg);
                          }
                    },'JSON').error(function(){
                        $.messager.alert('提示','系统错误！');
                    });
                }
            }]
    });
    $formBody.after($('#logo').show());
    var $verifyInput = $('<input class="verify-input" maxlength="4"/>');
    $verifyInput.keydown(function() {
        return $formBody.form('validate');
    }).keyup(function() {
        var target = this;
        if (target.value.length === 4) {
            target.disabled = true;
            $(target).blur();
            $.post('public/verifyCode', {
                code: this.value
            }, function(rsp) {
                if (rsp.status) {
                    $('#loginBtn').linkbutton('enable').click();
                } else {
                    target.disabled = false;
                    $(target).focus().val('');
                    $verifyImg.click();
                }
            }, 'JSON').error(function() {
                target.disabled = false;
                $(target).focus().val('');
                $verifyImg.click();
            });
        }
    });
    var $verifyImg = $('<img src="public/verify" class="verify-img"/>');
    $verifyImg.on('click', function() {
        $(this).attr('src', 'public/verify?t=' + new Date().getTime());
    });
    $('.dialog-button').prepend($verifyInput).prepend($verifyImg);
    $(window).resize(function() {
        $dialog.dialog('center');
    });
});