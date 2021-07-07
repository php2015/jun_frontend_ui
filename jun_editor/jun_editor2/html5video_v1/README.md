# html5video_v1

#### 项目介绍
最近用到ckeditor的视频上传插件 html5video，默认是通过配置一个上传地址来上传视频文件，不够灵活，且没有汉化。
这个项目基于插件`html5video`（[原插件链接](https://ckeditor.com/cke4/addon/html5video)），通过部分修改实现了上传的自由定制，以及汉化处理

#### 软件架构
##### 1.默认选中自适应宽度，隐藏高宽设置，以及高级设置
![图片信息，默认选中自适应宽度，隐藏高宽设置，以及高级设置](https://images.gitee.com/uploads/images/2018/0928/120423_7873a151_446609.png "图片信息")
##### 2.上传界面
![上传界面](https://images.gitee.com/uploads/images/2018/0928/120817_8d06fb9c_446609.png "上传")
#### 安装教程

1. 复制html5video_v1文件夹到{ckeditor_home}/plugins 文件夹下

#### 使用说明

1. {ckeditor_home}/config.js  添加 `config.extraPlugins = 'html5video_v1'`，config.toolbar 里边添加 "Html5video_v1"
2. 页面初始化editor，调用replace方法时：

```
CKEDITOR.replace( 'editor',{
    html5video_v1UploadFn:function(file,callback){
            //uploadFile(file);
            callback('file_url');
        }
});
```


#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
