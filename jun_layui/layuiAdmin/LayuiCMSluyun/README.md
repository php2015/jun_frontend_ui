# LayuiCMSluyun

## 介绍
基于layui开发的一套 纯前端 后台模板。致力于简洁代码和拿来即用。

基于 https://gitee.com/layuicms/layuicms 重构的。

## 演示地址
http://www.cluyun.com:84

## 使用须知
先下载本项目，然后在项目根目录执行命令，也就是package.json所在的目录。
### 本地开发环境
```shell
# 安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 安装依赖
cnpm install
# 运行
npm run dev
```
### 生产环境编译
本项目支持使用gulp编译打包
暂支持以下功能
> * css压缩
> * js压缩
> * html压缩
> * es6转es5
> * 图片无损压缩
> * css3样式自动加-webkit-等兼容前缀

根目录执行以下命令：
```
gulp
```
执行完成后会生成一个dist目录，里面是编译后的代码。
根目录执行以下命令运行编译后代码：
```
npm run prod
```
### 不需要编译
那就直接用src目录中的代码发布即可。无需考虑其他问题。

## 中文文档
https://gitee.com/cluyun/LayuiCMSluyun/wikis/pages

## 目录结构
```
  ├─src
  |  ├─css //css文件存放地
  |  ├─fonts //字体文件存放地
  |  ├─images //图片资源目录
  |  ├─js //javascript文件存放地
  |  ├─pages //页面存放地
  |  ├─plugins //前端插件存放地
  |  |  └─layui-extend //layui的扩展模块存放地
  |  |     └─layui-icon-extend //从Iconfont扩展的一些图标
  |  ├─services //业务相关的东西放这里
  |  |  └─data //目前只放了一些json数据在里面
  |  ├─favicon.ico //网站图标
  |  ├─index.html //首页
  |  ├─login.html //登录页
  ├─gulpfile.js //gulp配置文件
  ├─package.json //npm依赖及配置文件

/*文件夹及文件命名遵循骆驼命名法*/
```

### 支持该项目
1. Star该项目

2. 发现bug提Issues