layui.use(['form','layer','layedit','laydate','upload'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //用于同步编辑器内容到textarea
    layedit.sync(editIndex);

    //上传缩略图
    upload.render({
        elem: '.thumbBox',
        url: uploadImageUrl,
        method : "post",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
        field : "img",
        done: function(res, index, upload){
            $('.thumbImg').attr('src',baseUrl+res.data);
            $('.article_img').val(res.data);
            $('.thumbBox').css("background","#fff");
        }
    });

    // 置顶
    form.on('switch(article_top)', function(data){
        var val = data.elem.checked?1:0;
        $('.article_top').val(val);
    })


    //表单验证
    form.verify({
        username: function (val) {
            if (val == '') {
                return "用户名不能为空";
            }
            if (val.length > 20) {
                return "用户名不能超过20位";
            }
        },
        email: function (val) {
            if (val == '') {
                return "邮箱不能为空";
            }
            if (!isEmail(val)) {
                return "邮箱格式不正确";
            }
        }
    })

    //表单提交-新增
    form.on("submit(add-btn)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        setTimeout(function(){
            $.ajax({
                url: addUrl,
                data: $('#form').serialize(),
                type: "POST",
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        top.layer.close(index);
                        top.layer.msg("添加成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    } else {
                        layer.msg(res.message, {icon: 5}); 
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },500); 
    })

    //表单提交-编辑
    form.on("submit(upd-btn)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        setTimeout(function () {
            $.ajax({
                url: updUrl,
                data: $('#form').serialize(),
                type: "POST",
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        top.layer.close(index);
                        top.layer.msg("更新成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    } else {
                        layer.msg(res.message, {icon: 5}); 
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }, 500); 
    })

    //预览
    form.on("submit(look)",function(){
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    })

    //创建一个编辑器
    var editIndex = layedit.build('art_content',{
        height : 535,
        uploadImage : {
            url : "../../json/newsImg.json"
        }
    });

    //时间日期框
    // laydate.render({
    //     elem: '#user_add_time',
    //     type: 'datetime'
    // });

})