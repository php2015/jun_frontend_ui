# 多模块项目模版

#### 项目介绍
方便学习以及使用，快速搭建Maven多模块项目,适用于一些比较大的项目，通过合理的模块拆分，实现代码的复用，便于维护和管理

#### 软件架构
- 核心框架：Spring Boot
- 项目管理：Maven

#### 安装教程

1. 通过git下载源码
2. 通过IDEA、Eclipse导入项目
4. 配置Tomcat服务器并运行项目
3. 访问路径：http://localhost:8088/user/index?name=admin

#### 使用说明

1. 我们打包时一定要注意要从完全被依赖的项目开始
2. Bean Module Maven Install因为我们的bean子项目是完全被依赖的，所以我们先从这个项目开始，点开Maven Projects后我们找到bean项目，展开Lifecycle选择 install命令双击开始执行打包，当我们执行maven install命令时会直接将我们工作空间内的项目直接生成jar包并且添加到本地maven仓库，这样我们在项目中就可以直接依赖使用，双击install命令后查看控制台输出日志。
3. 同样的方式打包user项目（注意：所有被依赖都打包完成后才可以打包依赖项目）
4. Pager Module Maven Package所有的jar包依赖都执行打包完成后，我们开始进行pager项目的打包，因为我们的pager项目是一个web项目，我们只是需要生成后的war包部署到外部容器而已所以我们需要换一个命令package（打包到target目录下，并不会添加到maven仓库）

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)


