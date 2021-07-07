# javabb-fs

#### 简单介绍
基于Springboot 2.x的文件服务器，提供文件上传，选择，展示，下载，支持缩略图等功能，可以配置本地，七牛，OSS三种存储方式，可以独立部署。

项目后台代码有参考 [oneBlog](https://gitee.com/yadong.zhang/DBlog)，感谢大佬的付出。



#### 参数说明
项目resource下面有两个配置文件，主要配置上传需要的参数
`application.yml`

```
app:
  #配置允许跨域访问的地址
  allowDomain: http://127.0.0.1:8081;http://127.0.0.1:8086;http://59.110.236.115;http://59.110.236.115:86;
  #配置允许访问的IP
  allowIps: 127.0.0.1
```
`fs.properties`

```
# local qiniu aliyunOss
fs.storageType= qiniu
fs.serverUrl=http://javabb.cn:8082/
#fs.rootPath=D:/javabb/upload/
fs.rootPath=/upload/javabb-fs
fs.uploadType=bbs/
fs.useSm: true
fs.useNginx=false
fs.nginxUrl=http://59.110.236.115:80/
# qiniu 配置
fs.qiniuBucketName=XXXX
fs.qiniuAccessKey=XXXXXXXXXXX
fs.qiniuSecretKey=XXXXXXXXXX
fs.qiniuBasePath=XXX
```
参数说明
1. `storageType`：当前的存储方式，参数可选['local','qiniu','aliyunOss'],表示当前的上传的图片存储的地方
2. `serverUrl`： 当前部署的服务器的访问域名
3. `rootPath`： 根目录 只在`torageType`是local的时候才会用到
4. `useSm`： 是否开启缩略图
5. `useNginx`：是否开启Nginx访问
6. `nginxUrl`：配置Nginx的地址
7. `qiniuBucketName`：七牛云存储中的存储空间的名字 例如：javabb
8. `qiniuAccessKey`： AK，在七牛的个人中心的密钥管理中有，需要申请。
9. `qiniuSecretKey`： SK，在七牛的个人中心的密钥管理中有，需要申请。
10. `qiniuBasePath`： 加速域名

#### 使用说明

1. 上传文件接口`serverUrl/file/upload`,提供参数uploadType，上传的文件会上传到uploadType下面，默认上传的文件位置common

```
// 上传文件事件
        upload.render({
            elem: '#btnUpload',
            url: '/file/upload',
            //data:{uploadType:$('#tvFP').text()},
            before: function(obj){
                var cDir = $('#tvFP').text();
                var uploadType;
                if (cDir != '/'){
                    uploadType = cDir.substring(1).substring(0,cDir.indexOf("/")+1);
                    this.data={"uploadType": uploadType};
                }

            },
            choose: function (obj) {
                layer.load(2);
            },
            done: function (res, index, upload) {
                layer.closeAll('loading');
                if (res.code != 200) {
                    layer.msg('上传失败', {icon: 2});
                } else {
                    layer.msg('上传成功', {icon: 1});
                    $('#tvFP').text('/'+res.uploadType);
                    renderList();
                }
            },
            error: function () {
                layer.closeAll('loading');
                layer.msg('上传失败', {icon: 2});
            },
            accept: 'file'
        });
```

2. 文件素材库选择 `serverUrl/fileChoose.html` 

| 参数       | 可选值     | 作用             |
| ---------- | ---------- | ---------------- |
| accept     |            | 可上传的文件类型 |
| exts       | .jpg       | 显示图片的后缀       |
| multi      | true/false | 开启多选         |
| maxNum     | 数值       | 最大选择文件数   |
| uploadType | 英文       | 上传文件的类型   |

文件选择后会向父窗口提供一个`mFsUrls`参数，支持跨域，直接获取。
例如，调用，

```
// 表单选择
        $('#btnSel').click(function () {

           layer.open({
                type: 2,
                title: '选择文件',
                content: 'http://127.0.0.1:8082/fileChoose.html?accept=image',
                area: ['600px', '420px'],
                offset: '50px',
                shade: .1,
                fixed: false,
                resize: false,
                success: function(layero, index){
                    window.addEventListener('message',function(e){
                        if (typeof(e.data.mFsUrls) != "undefined" && e.data.mFsUrls.length > 0) {
                                $('#catalogImage').val(e.data.mFsUrls[0]);
                        }else{
                            B.error("发生错误");
                        }
                        layer.close(index);
                    },false);
                }
            });
        });
```


3. xxxx

#### 部署打包

```
mvn clean package
```
#### 运行截图

![首页](https://images.gitee.com/uploads/images/2019/0712/131706_70f2d2f8_732467.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2019/0712/131739_51f4b4ff_732467.png "屏幕截图.png")
![弹窗选择](https://images.gitee.com/uploads/images/2019/0712/131806_54e25377_732467.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2019/0712/131855_32cc43f7_732467.png "屏幕截图.png")
