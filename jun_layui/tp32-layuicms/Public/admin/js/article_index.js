layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#article-list',
        url : dataUrl,
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "article-list-table",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'article_id', title: 'ID', width:60,sort:true, align:"center"},
            {field: 'article_name', title: '文章标题',sort:true, width:350},
            {field: 'art_author', title: '发布者',sort:true, align:'center'},
            {field: 'article_status', title: '发布状态',sort:true,  align:'center',templet:function(d){
                // console.log(d.article_status);
                if (d.article_status == 0) {
                    return '<span class="layui-blue">已存草稿</span>';
                }
                if (d.article_status == 1) {
                    return '<span class="layui-red">等待审核</span>';
                }
                if (d.article_status == 2) {
                    return '<span class="layui-green">审核通过</span>';
                }
            }},
            {field: 'article_look', title: '浏览权限',sort:true, align:'center',templet:function(d){
                if (d.article_look == 0) {
                    return '<span class="layui-blue">开放浏览</span>';
                }
                if (d.article_look == 1) {
                    return '<span class="layui-red">私密浏览</span>';
                }
            }},
            {field: 'article_top', title: '是否置顶',sort:true, align:'center', templet:function(d){
                if (d.article_top == 0) {
                    return '<input type="checkbox" article_id="'+d.article_id+'" name="article_top" lay-filter="article_top" lay-skin="switch" lay-text="是|否">'
                }
                if (d.article_top == 1) {
                    return '<input type="checkbox" article_id="'+d.article_id+'" name="article_top" lay-filter="article_top" lay-skin="switch" lay-text="是|否" checked>'
                }
                
            }},
            {field: 'art_add_time', title: '发布时间', sort:true,align:'center', minWidth:110, templet:function(d){
                return formatTime(d.art_add_time,'Y-m-d H:i:s');
            }},
            {title: '操作', width:170,fixed:"right",align:"center",templet:function(d){
                var dom = '<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>';
                    dom +='<a class="layui-btn layui-btn-xs layui-btn-danger"  lay-event="del">删除</a>';
                    dom +='<a class="layui-btn layui-btn-xs layui-btn-primary" lay-event="look">预览</a>';
                return dom;
            }}
        ]]
    });

    //是否置顶
    form.on('switch(article_top)', function(data){
        var index = layer.msg('操作中，请稍候',{icon: 16,time:false,shade:0.8});
        var article_top = data.elem.checked?1:0;
        var article_id = data.elem.attributes.article_id.value;
        setTimeout(function(){
            $.ajax({
                url:topUrl,
                data:{
                    'article_id':article_id,
                    'article_top':article_top
                },
                type:"GET",
                dataType:"json",
                success:function(res){
                  layer.msg(res.message);
                  layer.close(index);
                },
                error:function(data){
                  console.log(data);
                }
            });
        },500);     
    })

    //搜索
    $(".search_btn").on("click",function(){
        table.reload("article-list-table",{
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                article_name: $(".searchVal").val()  //搜索的关键字
            }
        })
    });

    //排序
    table.on('sort(article-list)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      console.log(obj.field); //当前排序的字段名
      console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
      console.log(this); //当前排序的 th 对象
      
      
      table.reload('article-list-table', {
        initSort: obj, //记录初始排序，如果不设的话，将无法标记表头的排序状态。
        where: { 
          order_field: obj.field, //排序字段   
          order_type: obj.type, //排序方式   
          article_name: $(".searchVal").val()  //搜索的关键字
        }
      });
    });

    //添加文章
    $(".add-article-btn").click(function(){
        opentWindow('添加文章',addUrl,0);
    })

    //打开窗口
    function opentWindow(title,contentUrl,article_id){
        var index = layui.layer.open({
            title : title,
            type : 2,
            content : contentUrl+'?article_id='+article_id,
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }


    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('article-list-table'),
            data = checkStatus.data,
            article_ids = [];
            
        if(data.length > 0) {
            for (var i in data) {
                article_ids.push(data[i].article_id);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                var index = layer.msg('操作中，请稍候',{icon: 16,time:false,shade:0.8});
                setTimeout(function(){
                    $.ajax({
                        url:delAllUrl,
                        data:{
                            'article_ids':article_ids,
                        },
                        type:"GET",
                        dataType:"json",
                        success:function(res){
                          layer.msg(res.message);
                          layer.close(index);
                          tableIns.reload();
                        },
                        error:function(data){
                          console.log(data);
                        }
                    });
                },500);  
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })



    //列表操作
    table.on('tool(article-list)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ //编辑
            opentWindow('编辑文章',updUrl,data.article_id);
        } else if(layEvent === 'del'){ //删除
            delIt(data);
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

    //删除
    function delIt(data){
        layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
            var index = layer.msg('操作中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
                $.ajax({
                    url:delUrl,
                    data:{
                        'article_id':data.article_id,
                    },
                    type:"GET",
                    dataType:"json",
                    success:function(res){
                       layer.msg(res.message);
                       layer.close(index);
                       tableIns.reload();
                    },
                    error:function(data){
                       console.log(data);
                    }
                });
            },500);  
        });
    }
})