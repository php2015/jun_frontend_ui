# Lyear Loading

#### 介绍
因为之前开源light year admin 模板时候，网友提到想要能自定义文字的加载动画效果，这是抽空弄的一个JS效果。

里面的一些定位的计算参考了网上的开源项目。[http://www.neusofts.com/demo/loading/layui_exts/loading/demo/index.html](http://www.neusofts.com/demo/loading/layui_exts/loading/demo/index.html)

简单的加载动画js插件，可以采用css loading动画或者图片，并且设置loading文字。

#### 演示地址
[http://example.itshubao.com/example/100.html](http://example.itshubao.com/example/100.html)


#### 使用方法

如果配合light year admin 模板使用，将style里面/* 加载动画 */的样式替换成下面的样式。独立使用时候，直接添加此样式即可。
```
@-webkit-keyframes spinner-border {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spinner-borderspinner-border {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.spinner-border {
    display: inline-block;
    vertical-align: text-bottom;
    border: 0.125em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
    animation: spinner-border .75s linear infinite;
}
```

下面是针对body的加载动画示例，如果想要只针对某块元素的加载动画，采用$('#ID名称').lyearloading({...})这样的写法。


```
$('#test-btn').click(function() {
    var l = $('body').lyearloading({
        opacity           : 0.1,              // 遮罩层透明度，为0时不透明
        backgroundColor   : '#ccc',           // 遮罩层背景色
        imgUrl            : '',               // 使用图片时的图片地址
        textColorClass    : 'text-success',   // 文本文字的颜色
        spinnerColorClass : 'text-success',   // 加载动画的颜色(不使用图片时有效)
        spinnerSize       : 'lg',             // 加载动画的大小(不使用图片时有效，示例：sm/nm/md/lg，也可自定义大小，如：25px)
        spinnerText       : '加载中...',       // 文本文字    
        zindex            : 9999,             // 元素的堆叠顺序值
    });
    setTimeout(function() {
        l.hide();
    }, 500000)
});
```

#### 截图

按钮

![输入图片说明](https://images.gitee.com/uploads/images/2019/1216/112035_386fc880_82992.png "搜狗截图20191216111530.png")

使用文字和颜色

![输入图片说明](https://images.gitee.com/uploads/images/2019/1216/112045_5812d98d_82992.png "搜狗截图20191216111945.png")

使用图片

![输入图片说明](https://images.gitee.com/uploads/images/2019/1216/112053_f7719e23_82992.png "搜狗截图20191216112010.png")

div元素

![输入图片说明](https://images.gitee.com/uploads/images/2019/1216/112100_cb7a68cd_82992.png "搜狗截图20191216105313.png")