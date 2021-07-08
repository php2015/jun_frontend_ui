layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;
    //博客闻列表
    var tableIns = table.render({
        elem: '#blogList',
        url : '/admin/blog/',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        response:{
        	countName: 'total'
        },
        limit : 10,
        limits : [10,15,20,25],
        id : "blogListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field : 'id',width : 40,title : 'ID'},
            {field: 'title', title: '标题', width:350},
            {field: 'userName', title: '发布者', align:'center'},
            {field: 'catalogName', title: '类别', align:'center',templet:function(d){
            	return d.catalog.catalogName;
            }},
            {field: 'blogTop', title: '是否置顶',  align:'center',templet:function(d){
            	return '<input type="checkbox" name="blogTop" blogId="'+d.id+'" lay-filter="blogTop" lay-skin="switch" lay-text="是|否" '+(d.blogTop==1 ? 'checked':'')+'>'
            }},
            {field: 'blogHot', title: '是否热点',  align:'center',templet:function(d){
            	return '<input type="checkbox" name="blogHot" blogId="'+d.id+'" lay-filter="blogHot" lay-skin="switch" lay-text="是|否" '+(d.blogHot==1 ? 'checked':'')+'>'
            }},
            {field: 'readCount', title: '浏览次数',  align:'center'},
            {field: 'blogState', title: '发布状态',  align:'center',templet:"#blogState"},
            {field: 'createDate', title: '发布时间', align:'center', minWidth:110, templet:function(d){
                return d.createDate.substring(0,10);
            }},
            {title: '操作', width:180, templet:'#blogListBar',fixed:"right",align:"center"}
        ]]
    });

    //是否置顶
    form.on('switch(blogTop)', function(dom){
    	/*var _index = $(dom.elem).parent().parent().index();
    	var d = tableIns.getRowData(_index);*/
    	var id = $(dom.elem).attr("blogId");
    	var blogTop = dom.elem.checked==true?"0":"1";
        //var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        B.post({
        	url:'/admin/blog/updateTop',
        	loadding:true,
        	data:{id:id,blogTop:blogTop},
        	success:function(result){
        		B.msg(result.msg);
        		tableIns.reload();
        	}
        });
    })
    //是否热点
	 form.on('switch(blogHot)', function(dom){
	        var id = $(dom.elem).attr("blogId");
	    	var blogHot = dom.elem.checked==true?"0":"1";
	    	B.post({
	        	url:'/admin/blog/updateHot',
	        	loadding:true,
	        	data:{id:id,blogHot:blogHot},
	        	success:function(result){
	        		B.msg(result.msg);
	        		tableIns.reload();
	        	}
	        });
	    })
    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("blogListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });
    
    //添加文章
    function addBlog(edit){
    	var title="添加文章";
    	var url="/admin/blog/add";
    	if(!B.isEmpty(edit)){
    		url+="?blogId="+edit.id;
    		title="编辑文章";
    	}
        var index = layui.layer.open({
            title : title,
            type : 2,
            content : url,
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
            	if(edit){
            		body.find('#blogId').val("");
            	}
               /* if(edit){
                	debugger;
                	console.info("edit.content.content"+edit.content.content);
                	console.info("edit.catalog.catalogId"+edit.catalog.catalogId);
                	//layer.msg("edit");
                    body.find("#title").val(edit.title);
                    body.find("#blogDesc").val(edit.blogDesc);
                    body.find(".thumbImg").attr("src",edit.blogImg);
                    body.find("#content").val(edit.content.content);
                    body.find("#catalog").val(edit.catalog.catalogId);
                    //body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find("#blogTop").prop("checked",edit.blogTop=="1"?"checked":"");
                    body.find("#blogHot").prop("checked",edit.blogHot=="1"?"checked":"");
                    //body.find("#blogTag").prop("checked",edit.blogTop);
                    formSelects.value('blogTagSelect', [2, 4]); 
                    form.render();
                }*/
                setTimeout(function(){
                    layui.layer.tips('点击此处返回博客列表', '.layui-layer-setwin .layui-layer-close', {
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
    $(".addBlog_btn").click(function(){
        addBlog();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('blogListTable'),
            data = checkStatus.data,
            ids = [];
        if(data.length > 0) {
            for (var i in data) {
                ids.push(data[i].id);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
            	B.del({
                	url:"/admin/blog/"+ids,
                	success:function(result){
                		//B.msg(result.msg);
                		layer.close(index);
                		tableIns.reload();
                	}
                });
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(blogList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ //编辑
        	addBlog(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
                B.del({
                	url:"/admin/blog/"+data.id,
                	success:function(result){
                		layer.alert(result.msg);
                		//B.msg(result.msg);
                		layer.close(index);
                		tableIns.reload();
                	}
                });
                // })
            });
        } else if(layEvent === 'look'){ //预览
            layer.msg("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        }
    });

})