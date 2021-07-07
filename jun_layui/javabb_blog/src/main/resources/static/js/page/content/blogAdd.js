//全局定义一次, 加载formSelects
layui.config({
    base: '/js/plugin/' //此处路径请自行处理, 可以使用绝对路径
}).extend({
    formSelects: 'formSelect-v4/formSelects-v4'
});
layui.use(['form','layer','layedit','laydate','upload','formSelects'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;
    var formSelects = layui.formSelects;
   //右边的标签 下拉选择框
    loadBlogTag(formSelects);
    function loadBlogTag(formSelects){
    	formSelects.data('blogTagSelect','server',{
           	url:'/admin/tag/queryAllByType',
           	data:{tagType:'blog'}
           });
    }
    
  
    formSelects.config('blogTagSelect',{
	   beforeSearch: function(id, url, searchVal){         //搜索前调用此方法, return true将触发搜索, 否则不触发
	        if(!searchVal){//如果搜索内容为空,就不触发搜索
	            return false;
	        }
	        return true;
	    },
	   clearInput: true 
   },false);
	  //添加标签
	    $('.addTag').click(function(){
	    	
	    	var tag = $('#tag').val();
	    	if(B.isEmpty(tag)){
	    		layer.alert("标签不能为空");
	    		return;
	    	}
	    	var param = {
	    			'tagName':tag,
	    			'tagType':'blog'
	    	}
	    	B.post({
	    		url:'/admin/tag/',
	    		data:param,
	    		success:function(result){
	    			$('#tag').val('');
	    			if(result.success){
	    				//layer.alert("添加成功");
	    				var checkedTag = formSelects.value('blogTagSelect', 'val');//将已经选择了的tag保存下来
	    				loadBlogTag(formSelects)
	    				formSelects.value('blogTagSelect',checkedTag, true); //添加原来的选择的tag
	    				//动态添加选择
	    				//修改源码 formSelect-v4.js的430行
	    				//setTimeout(function(){
	    				formSelects.value('blogTagSelect',[result.data.tagId], true);
	                    //},800)
	    			}else{
	    				layer.alert(result.msg);
	    			}
	    			
	    		}
	    	});
	    }); 
   //创建wangEditor编辑器
   var E = window.wangEditor
   var editor = new E('#editor')
   // 或者 var editor = new E( document.getElementById('editor') )
   //打开上传图片，指定上传到服务器
   editor.customConfig.uploadImgServer = '/api/picture/wangEditorImgUpload';
   
   editor.customConfig.uploadFileName = 'img';
   // 将图片大小限制为 5M
   editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024; 
   editor.customConfig.pasteFilterStyle = false; //关闭粘贴样式过滤
   editor.customConfig.zIndex = 100;
   //上传图片的错误提示
   editor.customConfig.customAlert = function (info) {
       // info 是需要提示的内容
       alert('提示：' + info)
   };
   editor.customConfig.onchange = function (html) {
       // 监控变化，同步更新到 textarea，不知道在blogList.js中可与直接获取到editor内容不》？
	   $('#content').val(filterXSS(html));
       //
   };
   editor.customConfig.uploadImgHooks = {
           error: function (xhr, editor) {
               B.msg("图片上传出错");
           },
           timeout: function (xhr, editor) {
        	   B.msg("请求超时");
           },
           customInsert: function (insertImg, result, editor) {
               // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
               // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
               console.log('customInsert：' + insertImg, result, editor);
               
               if(result.errno == 0){
                   var imgs = result.data;
                   //imgArray = imgs.split(",");
                   for(var i=0;i<imgs.length;i++){
                	   insertImg("/picture/"+imgs[i]);
                   }
                   //var imgFullPath = appConfig.qiniuPath + result.data + appConfig.qiniuImgStyle;
                   // editor.txt.append(' <a href="' + imgFullPath + '" class="showImage" title="" rel="external nofollow"><img src="' + imgFullPath + '" class="img-responsive  img-rounded" alt="" style="width: 95%;"/></a>');
                  //editor.txt.append('<img src="/picture/' + result.data + '" alt="" style="max-width: 100%;height: auto;border-radius: 6px;"/>');
               } else {
            	   B.msg("上传失败");
               }
          }
    };
   editor.create();
   //添加全屏方法。
   E.fullscreen.init('#editor');
   
    //用于同步编辑器内容到textarea
    //layedit.sync(editIndex);
   
   $('.thumbBox').on('click',function(){
	  var index = layui.layer.open({
		  title:'素材库',
		  type:2,
		  content:'/sys/image/list',
		  success:function(layero, index){
			  
		  },
		  area: ['800px', '600px'],
          resize:false,  //是否运行拉伸  true表示允许
          anim:1,
          btn:['确定','取消'],
          yes:function(index,layero){
              //点击确定获取子页面参数
        	  debugger;
          	var body = layui.layer.getChildFrame('body',index);
          	var $checkbox = body.find('#Images li input[type="checkbox"]');
            var $checked = body.find('#Images li input[type="checkbox"]:checked:first');
            if($checkbox.is(":checked")){
            	var imageId = $checked.parents('li').children('img').attr('data-id');
            	var imageTitle = $checked.parents('li').children('img').attr('alt');
            	$('#blogImg').val(imageId);
                $('.thumbImg').attr('src',"/picture/"+imageTitle);
                $('.thumbBox').css("background","#fff");
                layui.layer.close(index);
            }else{
            	B.msg("请选择一张图片");
            }
          },
          btn2:function(index,layero){
          	layui.layer.close(index);
          	//parent.layer.alert('点击了取消');
          },
		  
	  });
   });
  /*  //上传缩略图
    upload.render({
        elem: '.thumbBox',
        url: '/api/picture/imgUpload',
        accept:'images',
        size:5*1024,
        done: function(res, index, upload){
        	if(res.success){
        		$('#blogImg').val(res.data.id);
                $('.thumbImg').attr('src',"/picture/"+res.data.imageName);
                $('.thumbBox').css("background","#fff");
        	}else{
        		B.msg(res.msg);
        	}
        	
        }
    });*/
    //动态加载分类
    B.get({
    	url:"/admin/catalog/queryAllByType",
    	data:{catalogType:"blog"},
    	success:function(result){
    		var d = result.data;
    		var $catalog = $('#catalog');
    		$catalog.empty();
    		$catalog.append('<option value="">请选择</option>');
    		for(var i=0;i<d.length;i++){
    			$catalog.append('<option value="'+d[i].catalogId+'">'+d[i].catalogName+'</option>');
    			form.render('select');
    		}
    	}
    });
    //动态加载专题
    B.get({
    	url:"/admin/series/all",
    	asyn:false,
    	success:function(result){
    		var d = result.data;
    		var $series = $('#series');
    		$series.empty();
    		$series.append('<option value="">请选择</option>');
    		for(var i=0;i<d.length;i++){
    			$series.append('<option value="'+d[i].id+'">'+d[i].seriesName+'</option>');
    			form.render('select');
    		}
    	}
    });
	form.render('select');
    
    /*form.on('select(catalogFilter)',function(obj){
    	
    });*/
    
    
    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    
    //校验
    form.verify({
        title : function(val){
            if(val == ''){
                return "文章标题不能为空";
            }
        }/*,
        content : function(val){
            if(val == ''){
                return "文章内容不能为空";
            }
        }*/
    })
    var blogId = $('#blogId').val();
    form.on("submit(publish)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        // $.post("上传路径",{
        //     newsName : $(".newsName").val(),  //文章标题
        //     abstract : $(".abstract").val(),  //文章摘要
        //     content : layedit.getContent(editIndex).split('<audio controls="controls" style="display: none;"></audio>')[0],  //文章内容
        //     newsImg : $(".thumbImg").attr("src"),  //缩略图
        //     classify : '1',    //文章分类
        //     newsStatus : $('.newsStatus select').val(),    //发布状态
        //     newsTime : submitTime,    //发布时间
        //     newsTop : data.filed.newsTop == "on" ? "checked" : "",    //是否置顶
        // },function(res){
        //
        // })
        var param={
        		id:B.isEmpty(blogId)?"":blogId,
        		title:$('#title').val(),
        		blogDesc:$('#blogDesc').val(),
        		blogImg: $('.thumbImg').attr('src'),
        		//contentHtml:$('#content').val(),
        		contentHtml:$('#content').val(),
        		catalogId:$('#catalog').val(),
        		seriesId:$('#series').val(),
        		keywords:B.isEmpty($('#keywords').val())?formSelects.value('blogTagSelect','nameStr'):$('#keywords').val(),
        		description:B.isEmpty($('#description').val())?$('#blogDesc').val():$('#description').val(),
        		blogState:$('[name=blogState]:checked').val(),
        		blogTop:data.field.blogTop == "on"?"1":"0",
        		blogHot:data.field.blogHot == "on"?"1":"0",
        		blogTag:formSelects.value('blogTagSelect','valStr')
        }
        B.post({
        	url:"/admin/blog/",
        	data:param,
        	success:function(result){
        		top.layer.close(index);
                top.layer.msg("文章添加成功！");
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
        	}
        	
        });
        return false;
    })
    
    //预览
    form.on("submit(look)",function(data){
        
        return false;
    })
    
    if(!B.isEmpty(blogId)){
    	B.get({
    		url:"/admin/blog/"+blogId,
    		success:function(result){
    			debugger;
    			var data = result.data;
    			$('#title').val(data.title);
    			$('#blogDesc').val(data.blogDesc);
    			
    			$('#keywords').val(data.content.keywords);
    			$('#description').val(data.content.description);
    			
    			$('.thumbImg').attr("src",data.blogImg);
    			$('#catalog').val(data.catalog.catalogId);
    			$('#series').val(B.isEmpty(data.seriesId)?"":data.seriesId);
    			$('input[name=blogState][value='+data.blogState+']').prop('checked','checked');
    			//设置内容
    			editor.txt.html(data.content.content);
    			$('#content').val(data.content.content);
    			var tags = data.tags;
    			var tagids=[];
    			for (var i in tags) {
    				tagids.push(tags[i].tagId);
                }
    			formSelects.value('blogTagSelect',tagids);
    			//switch开个初始化
    			$('#blogTop').prop('checked',data.blogTop==1?"checked":"");
    			$('#blogHot').prop('checked',data.blogHot=="1"?"checked":"");
    			
    			form.render();
    		}
    	});
    	
    }
    
    
})
$(function(){
});