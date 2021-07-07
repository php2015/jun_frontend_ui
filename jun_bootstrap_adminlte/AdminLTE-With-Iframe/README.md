
## Introduction(简介)

**AdminLTE with iframe** -- Based on **AdminLTE** framework. It integrated with iframes with is popular in china admin systems.

(基于AdminLTE框架,并且集成了iframe的tab页面,是一款适合中国国情的后台主题UI框架)

**Preview on github: [https://weituotian.github.io/AdminLTE-With-Iframe/pages/index_iframe.html](https://weituotian.github.io/AdminLTE-With-Iframe/pages/index_iframe.html)**

**Preview on oschina: [http://weituotian.oschina.io/adminlte-with-iframe/pages/index_iframe.html](http://weituotian.oschina.io/adminlte-with-iframe/pages/index_iframe.html)**


![preview image1](preview/GIF.gif)

![preview image2](preview/img1.png)

## Table of Contents(目录)
<!-- MarkdownTOC -->

- [1 branch\(分支\)](#1-branch分支)
- [2 reference\(参考\)](#2-reference参考)
- [3 Installation\(安装\)](#3-installation安装)
- [4 Documentation\(文档\)](#4-documentation文档)
    - [4.1 iframe框架](#41-iframe框架)
        - [4.1.1 选项卡右键菜单，双击刷新](#411-选项卡右键菜单，双击刷新)
        - [4.1.2 一些配置](#412-一些配置)
        - [4.1.3 左侧菜单生成](#413-左侧菜单生成)
        - [4.1.4 tab的操作](#414-tab的操作)
            - [4.1.4.1 增加新tab](#4141-增加新tab)
            - [4.1.4.2 获得当前激活的tab的id](#4142-获得当前激活的tab的id)
            - [4.1.4.3 获得当前激活的tab的id](#4143-获得当前激活的tab的id)
            - [4.1.4.4 根据pageId获得当前选项卡的标题](#4144-根据pageid获得当前选项卡的标题)
            - [4.1.4.5 根据pageId获得当前iframe](#4145-根据pageid获得当前iframe)
            - [4.1.4.6 根据pageId获得当前panel](#4146-根据pageid获得当前panel)
            - [4.1.4.7 关闭当前tab](#4147-关闭当前tab)
            - [4.1.4.8 未完待续](#4148-未完待续)
- [5 Browser Support\(浏览器支持\)](#5-browser-support浏览器支持)
- [6 License](#6-license)
- [7 Todo List](#7-todo-list)

<!-- /MarkdownTOC -->

## 1 branch(分支)

更新分支为master

## 2 reference(参考)

**[super ui](https://github.com/tzhsweet/superui)**

(iframe功能的js和页面css都是参考superui得出来的)

## 3 Installation(安装)

修改可以使用grunt构建工具

- 安装nodejs
- 根目录下命令行执行
- npm install

## 4 Documentation(文档)

may be you should **customize** the system by reading the codes!
(请阅读源码进行修改)

[AdminLTE官方文档](http://weituotian.oschina.io/adminlte-with-iframe/documentation/index.html)

### 4.1 iframe框架

介绍一些集成了iframe后新增的功能，和修改方法。
请确认执行完上面文档的安装部分。
可随时开启issue.

#### 4.1.1 选项卡右键菜单，双击刷新

![](preview/contextmenu.jpg)

* 修改右键菜单的文字，请参阅 [bootstrap-tab.js](build/js/iframe/bootstrap-tab.js) ，内有`context.attach`初始化json菜单，并且可以参考其获取特定tab当前url的代码
* 刷新选项卡刷新当前tab页，bootstrap-tab.js中的`$tabs.on("dblclick",`绑定了双击事件。可注释取消这个功能

#### 4.1.2 一些配置

在 [index_iframe.html](pages/index_iframe.html) 中：

```
//设置根目录，
//比如本演示中的地址是http://weituotian.oschina.io/adminlte-with-iframe/pages/index_iframe.html#
//上一级就是http://weituotian.oschina.io/adminlte-with-iframe/pages
//当前实际的开发中一般用不到
//比如你的首页用到index_iframe.html这个模版，访问地址为http://localhost/，就不用设置了
//如果你部署在http://localhost/xxx, xxx是你部署的路径，那么就按以下代码设置一下根目录
App.setbasePath("../");

//设置图片路径，相对于根目录
//这个框架带有一些图片（加载进度条等），你可以放置在其它地方
//但要如下设置，
//比如在本项目中，引用的图片放在了根目录下，dist/img/中
App.setGlobalImgPath("dist/img/");

```

#### 4.1.3 左侧菜单生成

如下操作，可参考 index_iframe.html, [sidebarMenu.js](build/js/iframe/sidebarMenu.js)
```
        var menus = [
            {
                id: "9000",
                text: "header",
                icon: "",
                isHeader: true
            },
            {
                id: "9002",
                text: "Forms",
                icon: "fa fa-edit",
                children: [
                    {
                        id: "90021",
                        text: "advanced",
                        url: "forms/advanced_iframe.html",
                        targetType: "iframe-tab",
                        icon: "fa fa-circle-o"
                    },
                    {
                        id: "90022",
                        text: "general",
                        url: "forms/general_iframe.html",
                        targetType: "iframe-tab",
                        icon: "fa fa-circle-o"
                    }
                ]
            }
        ];
        $('.sidebar-menu').sidebarMenu({data: menus});
```


#### 4.1.4 tab的操作

所有的操作都可以在index_iframe.html中实现。index_iframe.html作为一个父页面承载了许多iframe。在iframe子页面，可以通过`top.xxx`来调用父页面的函数。

##### 4.1.4.1 增加新tab
动态增加菜单，你可以从后台读取菜单，用以下的json格式封装。同时还可以自己额外增加菜单
```
//欢迎页的菜单。
        addTabs({
            id: '10008',
            title: '欢迎页',
            close: false,
            url: 'welcome_iframe.html',
            urlType: "relative"
        });
```

- **id** 代表这个tab的id，重复id将认为同一个tab，如果你从数据库读取菜单，那么可以设置该id为数据库中菜单的id
- **title** 选项卡的标题
- **close**　false表示不可以关闭
- **url** 指定一个url地址，绝对或者相对
- **urlType** 可选relative和absolute ,默认是relative, 相对于当前页面（管理所有tab的页面）
比如`http://localhost/index.html`,想打开index.html同级目录UI下的页面，就给`url:UI/welcome.html;urlType:relative`

##### 4.1.4.2 获得当前激活的tab的id
```
var pageId = getActivePageId();
```
最长用吧，一般这个就够了

##### 4.1.4.3 获得当前激活的tab的id
```
var pageId = getPageId(element);
```
![](preview/tabs.jpg)
element一般是tab栏的a超链接元素，jq对象和普通的dom都可以

##### 4.1.4.4 根据pageId获得当前选项卡的标题
```
var title = findTabTitle(pageId);
```


##### 4.1.4.5 根据pageId获得当前iframe

```
var $iframe = findIframeById(pageId);
```
这个iframe是一个jq对象

##### 4.1.4.6 根据pageId获得当前panel

```
var $panel=findTabPanel(pageId)
```
这个panel是一个div，装有iframe，jq对象

##### 4.1.4.7 关闭当前tab

```
closeTabByPageId(pageId);
```
pageId是你创建tab时候的id

##### 4.1.4.8 未完待续

## 5 Browser Support(浏览器支持)

- IE 9+
- Firefox (latest)
- Chrome (latest)
- Safari (latest)
- Opera (latest)

## 6 License

AdminLTE is an open source project by [Almsaeed Studio](https://almsaeedstudio.com) that is licensed under [MIT](http://opensource.org/licenses/MIT). Almsaeed Studio

reserves the right to change the license of future releases.

(开源免费)

## 7 Todo List

- jquery pace integration
