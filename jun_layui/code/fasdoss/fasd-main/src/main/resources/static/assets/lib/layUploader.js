layui.extend({
    //你的webuploader.js路径
    webuploader: 'uploader/webuploader'
}).define(['layer','laytpl','table','element','webuploader'],function(exports){
    var $ = layui.$
        ,webUploader= layui.webuploader
        ,element = layui.element
        ,layer=layui.layer
        ,table=layui.table
        ,rowData=[]//保存上传文件属性集合,添加table用
        ,fileSize=0//默认上传文件大小
        ,fileType='doc,docx,pdf,xls,xlsx,ppt,pptx,gif,jpg,jpeg,bmp,png,rar,zip'
        ,uplaod;
    var fileMd5;//文件的MD5值
    var fileName;//文件名称
    var blockSize = 10 * 1024 * 1024;
    var md5Arr = new Array(); //文件MD5数组
    var timeArr = new Array();//文件上传时间戳数组
    var base = layui.cache.base;
    //加载样式
    layui.link(base+'/uploader/webuploader.css');

    var Class = function (options) {
        var that = this;
        that.options=options;
        that.register();
        that.init();
        that.events();
    };

    Class.prototype.init=function(){
        var that = this,
            options=that.options;
        if(!that.strIsNull(options.size)){
            fileSize=options.size
        }
        if(!that.strIsNull(that.options.fileType)){
            fileType=that.options.fileType;
        }
        layer.open({
            type: 1,
            area: ['850px', '500px'], //宽高
            resize:false,
            content:
            '<div  id="extend-upload-chooseFile" style="float: left;margin-left: 5px;margin-top: 5px;">选择文件</div>'+
            '<button id="extent-button-uploader" class="layui-btn" style="height: 37px;margin-top: 5px;margin-left: 5px;">开始上传</button>'+
            '<table style="margin-top:-10px;" class="layui-table" id="extend-uploader-form" lay-filter="extend-uploader-form">' +
                '  <thead>' +
            '    <tr>' +
            '      <th lay-data="{type:\'numbers\', fixed:\'left\'}"></th>' +
            '      <th lay-data="{field:\'fileName\', width:250}">文件名称</th>' +
            '      <th lay-data="{field:\'fileSize\', width:100}">文件大小</th>' +
            '      <th lay-data="{field:\'validateMd5\', width:120}">文件验证</th>' +
            '      <th lay-data="{field:\'progress\',width: 200,templet:\'#button-form-optProcess\'}">进度</th>' +
           /* '      <th lay-data="{field:\'state\'}">状态</th>' +*/
            '      <th lay-data="{field:\'oper\', width: 100,templet: \'#button-form-uploadTalbe\'}">操作</th>' +
            '    </tr>' +
            '  </thead>'+
            '</table>'+
            '<script type="text/html" id="button-form-uploadTalbe">'+
                '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>'+
            '</script>'+
            '<script type="text/html" id="button-form-optProcess">' +
                '<div style="margin-top: 5px;" class="layui-progress layui-progress-big" lay-filter="{{d.fileId}}"  lay-showPercent="true">'+
                  '<div class="layui-progress-bar layui-bg-blue" lay-percent="0%"></div>'+
                '</div>'+
            '</script>'
            ,

            success: function(layero, index){
                table.init('extend-uploader-form',{
                    height: 380,
                    unresize:true
                });
                console.log(options.url);
                uplaod = webUploader.create({
                    // 不压缩image
                    resize: false,
                    // swf文件路径
                    swf:  base+'/uploader/Uploader.swf',
                    // 默认文件接收服务端。
                    server: options.url+"?k=1",
                    pick: '#extend-upload-chooseFile',
                    chunked: true, //分片处理
                    chunkSize: 10 * 1024 * 1024, //每片5M
                    threads: 3,//上传并发数。允许同时最大上传进程数。
                    method:"PATCH",
                    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                    resize: false,
                    accept:[{
                        title: 'file',
                        extensions: fileType,
                        mimeTypes: that.buildFileType(fileType)
                    }]
                });
            }//可以自行添加按钮关闭,关闭请清空rowData
            ,end:function () {
                rowData=[];
                if(options.success){
                    if(typeof options.success==='function') {
                        options.success();
                    }
                }
            }
        });
    };

    Class.prototype.formatFileSize=function(size){
        var fileSize =0;
        if(size/1024>1024){
            var len = size/1024/1024;
            fileSize = len.toFixed(2) +"MB";
        }else if(size/1024/1024>1024){
            var len = size/1024/1024;
            fileSize = len.toFixed(2)+"GB";
        }else{
            var len = size/1024;
            fileSize = len.toFixed(2)+"KB";
        }
        return fileSize;
    };

    Class.prototype.buildFileType=function (type) {
        var ts = type.split(',');
        var ty='';

        for(var i=0;i<ts.length;i++){
            ty=ty+ "."+ts[i]+",";
        }
        return  ty.substring(0, ty.length - 1)
    };

    Class.prototype.strIsNull=function (str) {
        if(typeof str == "undefined" || str == null || str == "")
            return true;
        else
            return false;
    };

    Class.prototype.events=function () {
        var that = this;
        //当文件添加进去
        uplaod.on('fileQueued', function( file ){
            var fileSize = that.formatFileSize(file.size);
            var row={fileId:file.id,fileName:file.name,fileSize:fileSize,validateMd5:'0%',progress:file.id,state:'就绪'};
            rowData.push(row);
            that.reloadData(rowData);
            element.render('progress');
        });

        //监听进度条,更新进度条信息
        uplaod.on( 'uploadProgress', function( file, percentage ) {
            element.progress(file.id, (percentage * 100).toFixed(0)+'%');
        });


        //错误信息监听
        uplaod.on('error', function(handler){
            if(handler=='F_EXCEED_SIZE'){
                layer.msg('上传的单个太大!。<br>操作无法进行,如有需求请联系管理员', {icon: 5});
            }else if(handler=='Q_TYPE_DENIED'){
                layer.msg('不允许上传此类文件!。<br>操作无法进行,如有需求请联系管理员', {icon: 5});
            }
        });


        //移除上传的文件
        table.on('tool(extend-uploader-form)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                that.removeArray(rowData,data.fileId);
                uplaod.removeFile(data.fileId,true);
                obj.del();
            }
        });

        //开始上传
        $("#extent-button-uploader").click(function () {
            that.uploadToServer();

        });

        //单个文件上传成功
        uplaod.on( 'uploadSuccess', function( file ) {
            that.setTableBtn(file.id,'完成');
        });

        //所有文件上传成功后
        uplaod.on('uploadFinished',function(){//成功后
            $("#extent-button-uploader").text("开始上传");
            $("#extent-button-uploader").removeClass('layui-btn-disabled');
        });

    };

    Class.prototype.reloadData=function(data){
        layui.table.reload('extend-uploader-form',{
            data : data
        });
    };

    Class.prototype.register=function () {
        var that = this,
            options = that.options;
        that.clearMd5();
        // 在文件开始发送前做些异步操作。做md5验证
        // WebUploader会等待此异步操作完成后，开始发送文件。
        webUploader.Uploader.register({
            "before-send-file": "beforeSendFile",//整个文件上传前
            "before-send": "beforeSend",//每个分片上传前
            "after-send-file": "afterSendFile"//分片上传完毕
        },{
            //1.生成整个文件的MD5值
            beforeSendFile: function (file) {
                debugger
                var index = file.id.slice(8);//文件下标
                var startTime = new Date();//一个文件上传初始化时，开始计时
                timeArr[index] = startTime;//将每一个文件初始化时的时间放入时间数组
                var deferred = webUploader.Deferred();
                //计算文件的唯一标记fileMd5，用于断点续传  如果.md5File(file)方法里只写一个file参数则计算MD5值会很慢 所以加了后面的参数：10*1024*1024
                (new webUploader.Uploader())
                    .md5File(file, 0, blockSize)
                    .progress(function (percentage) {
                        $('#' + file.id).find('p.state').text('正在读取文件信息...');
                    })
                    .then(function (value) {
                        $("#" + file.id).find('p.state').text('成功获取文件信息...');
                        fileMd5 = value;
                        var index = file.id.slice(8);
                        md5Arr[index] = fileMd5;//将文件的MD5值放入数组，以便分片合并时能够取到当前文件对应的MD5
                        //webUploader.options.formData.guid = fileMd5;//全局的MD5
                        that.setMd5(file.name,fileMd5);
                        deferred.resolve();
                    });
                fileName = file.name;
                return deferred.promise();
            },
            //2.如果有分快上传，则每个分块上传前调用此函数
            beforeSend: function (block) {
                debugger
                var deferred = webUploader.Deferred();
                $.ajax({
                    type: "PUT",
                    url: that.options.url+"?k=2", //ajax验证每一个分片
                    data: {
                        fileName: fileName,
                        fileMd5: fileMd5, //文件唯一标记
                        chunk: block.chunk, //当前分块下标
                        chunkSize: block.end - block.start,//当前分块大小
                    },
                    cache: false,
                    async: false, // 与js同步
                    timeout: 1000, // 超时的话，只能认为该分片未上传过
                    dataType: "json",
                    success: function (response) {
                        if (response.ifExist) {
                            //分块存在，跳过
                            deferred.reject();
                        } else {
                            //分块不存在或不完整，重新发送该分块内容
                            deferred.resolve();
                        }
                    }
                });
                this.owner.options.formData.fileMd5 = fileMd5;
                deferred.resolve();
                return deferred.promise();
            },
            //3.当前所有的分块上传成功后调用此函数
            afterSendFile: function (file) {
                debugger;
                //如果分块全部上传成功，则通知后台合并分块
                var index = file.id.slice(8);//获取文件的下标
                $('#' + file.id).find('p.state').text('已上传');
                $.ajax({
                    type: "PUT",
                    url: that.options.url+"?k=3", //ajax验证每一个分片
                    data: {"fileMd5": md5Arr[index], fileName: file.name}
                    ,success:function (data) {

                    }
                })
            }
        });
    };


    /***
     * 注意更改了table列的位置,或自行新增了表格,请自行在这修改
     */
    Class.prototype.getTableHead=function (field) {
        //获取table头的单元格class,保证动态设置table内容后单元格不变形
        var div = $("#extend-uploader-form").next().find('div[class="layui-table-header"]');
        var div2 = div[0];
        var table = $(div2).find('table');
        var td = table.find('th[data-field="'+field+'"]').find('div').attr('class');
        return td;
    };
    /**
     * 存储md5
     * @param field
     * @param Md5
     */
    Class.prototype.setMd5=function (field,Md5) {
        layui.data('tmp', {
            key: field
            ,value: Md5
        });
    };
    /**
     * 存储md5
     * @param field
     * @param Md5
     */
    Class.prototype.clearMd5=function () {
        layui.data('tmp', null);
    };
    /**
     * 获取MD5
     * @param field
     * @returns {*}
     */
    Class.prototype.getMd5=function (field) {
        return layui.data('tmp')[field];
    };

    Class.prototype.setTableBtn=function (fileId,val) {
        var td = this.getTableHead('oper');
        //获取操作栏,修改其状态
        var table = $("#extend-uploader-form").next().find('div[class="layui-table-body layui-table-main"]').find('table');
        var pro = table.find('td[data-field="progress"]');
        for(var i=0;i<pro.length;i++){
            var d = $(pro[i]).attr('data-content');
            if(d==fileId ){
                var t = $(pro[i]).next();
                t.empty();
                t.append('<div class="'+td+'"><a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="ok">'+val+'</a></div>')
            }
        }
    };


    Class.prototype.uploadToServer=function () {
        if(rowData.length<=0){
            layer.msg('没有上传的文件', {icon: 5});
            return;
        }
        $("#extent-button-uploader").text("正在上传");
        $("#extent-button-uploader").addClass('layui-btn-disabled');
        uplaod.upload();
    };

    Class.prototype.removeArray=function (array,fileId) {
        for(var i=0;i<array.length;i++){
            if(array[i].fileId==fileId){
                array.splice(i,1);
            }
        }
        return array;
    };

    var layUploader = {
        render:function (options) {
            var inst = new Class(options);
            return inst;
        }

    };

    exports('layUploader', layUploader);
});