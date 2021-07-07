layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#manage-list',
        url : dataUrl,
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "manage-list-table",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'manage_id', title: 'ID', width:60,sort:true, align:"center"},
            {field: 'username', title: '用户名',sort:true,align:'center'},
            {field: 'email', title: '邮箱',sort:true, align:'center'},
            {field: 'sex', title: '性别',sort:true,  align:'center',templet:function(d){
                if (d.sex == 0) {
                    return '<span class="layui-blue">女</span>';
                }
                if (d.sex == 1) {
                    return '<span class="layui-green">男</span>';
                }
            }},
            {field: 'status', title: '状态',sort:true, align:'center',templet:function(d){
                if (d.status == 0) {
                    return '<span class="layui-green">状态正常</span>';
                }
                if (d.status == 1) {
                    return '<span class="layui-red">已被封禁</span>';
                }
            }},
            {field: 'auth', title: '角色',sort:true, align:'center',templet:function(d){
                if (d.auth == 0) {
                    return '<span class="layui-green">超级管理员</span>';
                }
                if (d.auth == 1) {
                    return '<span class="layui-blue">普通管理员</span>';
                }
            }},
            {field: 'user_add_time', title: '创建时间', sort:true,align:'center', minWidth:110, templet:function(d){
                return formatTime(d.user_add_time,'Y-m-d H:i:s');
            }},
            {field: 'description', title: '描述', sort:true,align:'center', minWidth:110},
            {title: '操作', width:200,fixed:"right",align:"center",templet:function(d){
                var dom = '<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>';
                    dom +='<a class="layui-btn layui-btn-xs layui-btn-danger"  lay-event="del">删除</a>';
                    dom +='<a class="layui-btn layui-btn-xs layui-btn-primary" lay-event="resetPass">重置密码</a>';
                return dom;
            }}
        ]]
    });


    //搜索
    $(".search_btn").on("click",function(){
        table.reload("manage-list-table",{
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                username: $(".searchVal").val()  //搜索的关键字
            }
        })
    });

    //排序
    table.on('sort(manage-list)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      table.reload('manage-list-table', {
        initSort: obj, //记录初始排序，如果不设的话，将无法标记表头的排序状态。
        where: { 
          order_field: obj.field, //排序字段   
          order_type: obj.type, //排序方式   
          article_name: $(".searchVal").val()  //搜索的关键字
        }
      });
    });

    //添加用户
    $(".add-manage-btn").click(function(){
        opentWindow('添加用户',addUrl,0);
    })

    //打开窗口
    function opentWindow(title,contentUrl,manage_id){
        var index = layui.layer.open({
            title : title,
            type : 2,
            area: ['600px', '600px'],
            content : contentUrl+'?manage_id='+manage_id,
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
    }


    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('manage-list-table'),
            data = checkStatus.data,
            manage_ids = [];
        if (data.length > 0) {
            for (var i in data) {
                manage_ids.push(data[i].manage_id);
            }
            layer.confirm('确定删除选中的用户？', { icon: 3, title: '提示信息' }, function (index) {
                var index = layer.msg('操作中，请稍候', { icon: 16, time: false, shade: 0.8 });
                setTimeout(function () {
                    $.ajax({
                        url: delAllUrl,
                        data: {
                            'manage_ids': manage_ids,
                        },
                        type: "GET",
                        dataType: "json",
                        success: function (res) {
                            layer.msg(res.message);
                            layer.close(index);
                            tableIns.reload();
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });
                }, 500);
            })
        } else {
            layer.msg("请选择需要删除的用户");
        }
    })




    //列表操作
    table.on('tool(manage-list)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ //编辑
            opentWindow('编辑用户',updUrl,data.manage_id);
        } else if(layEvent === 'del'){ //删除
            delIt(data);
        } else if(layEvent === 'resetPass'){ //重置密码
            resetPass(data);
        }
    });

    //删除
    function delIt(data) {
        layer.confirm('确定删除此用户？', { icon: 3, title: '提示信息' }, function (index) {
            var index = layer.msg('操作中，请稍候', { icon: 16, time: false, shade: 0.8 });
            setTimeout(function () {
                $.ajax({
                    url: delUrl,
                    data: {
                        'manage_id': data.manage_id,
                    },
                    type: "GET",
                    dataType: "json",
                    success: function (res) {
                        layer.msg(res.message);
                        layer.close(index);
                        tableIns.reload();
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }, 500);
        });
    }

    //重置密码
    function resetPass(data) {
        layer.confirm('确定重置此用户密码？', { icon: 3, title: '提示信息' }, function (index) {
            var index = layer.msg('操作中，请稍候', { icon: 16, time: false, shade: 0.8 });
            setTimeout(function () {
                $.ajax({
                    url: passUrl,
                    data: {
                        'manage_id': data.manage_id,
                    },
                    type: "GET",
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 0) {
                            layer.alert(data.username+'，密码已重置为：123456');
                        } else {
                            layer.msg(res.message);
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }, 500);
        });
    }
})