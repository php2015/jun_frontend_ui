//全局定义一次, 加载formSelects
layui.config({
    base: '/js/plugin/formSelect-v4/' //此处路径请自行处理, 可以使用绝对路径
}).extend({
    formSelects: 'formSelects-v4'
});
layui.use(['form','layer','layedit','laydate','upload','formSelects'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;
 
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
   }
   editor.customConfig.onchange = function (html) {
       // 监控变化，同步更新到 textarea，不知道在blogList.js中可与直接获取到editor内容不》？
	   $('#content').val(html);
       //
	   console.log("HTML:"+html);
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
    
    var menuId = $('#menuId').val();
    form.on("submit(publish)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        var param={
        		id:B.isEmpty(menuId)?"":menuId,
        		menuName:$('#menuName').val(),
        		menuCode:$('#menuCode').val(),
        		menuDesc:$('#menuDesc').val(),
        		menuIco:$('#menuIco').val(),
        		keywords:$('#keywords').val(),
        		description:$('#description').val(),
        		sort:$('#sort').val(),
        		//contentHtml:$('#content').val(),
        		contentHtml:$('#content').val(),
        		menuType:$('#menuType').val(),
        		state:data.field.state == "on"?"1":"0",
        }
        B.post({
        	url:"/sys/menu/",
        	data:param,
        	success:function(result){
        		top.layer.close(index);
                top.layer.msg("目录添加成功！");
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
    
    if(!B.isEmpty(menuId)){
    	B.get({
    		url:"/sys/menu/"+menuId,
    		success:function(result){
    			var data = result.data;
    			$('#menuName').val(data.menuName);
    			$('#menuCode').val(data.menuCode);
    			$('#menuDesc').val(data.menuDesc);
    			$('#menuIco').val(data.menuIco);
    			$('#sort').val(data.sort);
    			$('#menuType').val(data.menuType);
    			$('#keywords').val(data.content.keywords);
    			$('#description').val(data.content.description);
    			//设置内容
    			editor.txt.html(data.content.content);
    			$('#content').val(data.content.content);
    			//switch开个初始化
    			$('#state').prop('checked',data.state==1?"checked":"");
    			form.render();
    		}
    	});
    	
    }
    
})
$(function(){
});