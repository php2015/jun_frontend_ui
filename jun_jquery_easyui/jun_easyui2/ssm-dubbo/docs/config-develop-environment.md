# 前言

和一些开发人员的交流，发现部分人员电脑不是很合理，因此写下这个文档和大家交流下开发环境的搭建

* 没用过MAC，所以你用的mac就不要往下看了.

# 硬盘分区

我一般将硬盘分成4个区，分别为：系统盘、应用程序盘、资料盘和大型文件盘。

理由如下：硬盘外圈的线速度大，访问速度快。

## 系统盘 （C盘）
只用安装系统，其它的东西就不要放进来了。

## 应用程序盘 （D盘）

主要分为两类：绿色软件和非绿色软件

### 绿色软件
我一般创建一个application文件夹，里面放一些绿色软件，比如eclipse、maven、nodejs、nginx、redis、python、tomcat、jmeter、ant、BeyondCompare、MySQL。 其实基于Java运行的环境，基本上都是可以放在这个文件夹里面。


Java的安装地址也可以是上面的application目录，但我目前放在了D盘的根目录中，路径是【D:\Java】。如果你换系统的话，这个安装目录是不用删的，直接配置到环境变量就可以了。 在D盘单独创建Java这个目录，是因为我电脑有4个版本的JDK，分别是1.6 1.7的32位和64位版本。



### 非绿色软件

安装这类软件时，很多朋友都知道不能安装在C盘，然后每次都放在了其它盘的不同目录，结果就是整个硬盘都比较凌乱。

我推荐的方法就是把安装路径的C换成D，其它的就不用改，这样既能提升安装速度又能避免硬盘文件夹的凌乱。

32位的程序一般安装在【D:\Program Files (x86)】，64位程序一般安装在【D:\Program Files】


------------------------
# Java开发环境的配置
## JDK安装
把安装路径选到[D:\Java]中

```
D:\Java
    32     (32位JDK目录)
        jdk1.6.0_13  （1.6版32位JDK）
        jdk1.7.0_79  （1.7版32位JDK）
        jre6  （1.6版32位JRE）
        jre7  （1.7版32位JRE）
    jdk1.7.0_51   （1.7版64位JDK）
    jdk1.6.0_37   （1.6版64位JDK）
    jre6  （1.6版64位JRE）
    jre7  （1.7版64位JRE）
```

* 根目录是两个64为的JDK，32文件夹里面是两个32位的JDK；

新增系统环境变量 JAVA_HOME,值为[D:\Java\jdk1.7.0_51].
然后系统原有的PATH变量追加[;%JAVA_HOME%\bin]
命令行执行  java -version测试下

```
C:\Users\Jacarri>echo  %JAVA_HOME%
 D:\Java\jdk1.7.0_51

C:\Users\Jacarri>java -version
java version "1.7.0_51"
Java(TM) SE Runtime Environment (build 1.7.0_51-b13)
Java HotSpot(TM) 64-Bit Server VM (build 24.51-b03, mixed mode)
```

## 安装maven
下载apache-maven-3.1.1-bin.zip，后解压到[D:\application],得到[D:\application\apache-maven-3.1.1]
跟装JDK是配置环境变量一样，配置maven的环境变量:创建MVN_HOME这个变量，并把(%MVN_HOME\bin%)追加到PATH变量中。

```
C:\Users\Jacarri>echo  %MVN_HOME%
 D:\application\apache-maven-3.1.1

C:\Users\Jacarri>mvn -version
Apache Maven 3.1.1 (0728685237757ffbf44136acec0402957f723d9a; 2013-09-17 23:22:22+0800)
Maven home: D:\application\apache-maven-3.1.1
Java version: 1.7.0_51, vendor: Oracle Corporation
Java home: D:\Java\jdk1.7.0_51\jre
Default locale: zh_CN, platform encoding: GBK
OS name: "windows 8", version: "6.2", arch: "amd64", family: "windows"
C:\Users\Jacarri>
```

把maven  conf目录中settings.xml文件夹打开,把localRepository注释打开，填入非系统盘的目录地址.  我的是这样的

```
  <localRepository>D:\application\repository</localRepository>
```

* 意思是说我让maven把依赖下载到[D:\application\repository]这个目录。
* 如果你不改这个地址，maven会默认把依赖下载到当前目录的home目录中，一旦你要重装系统，要手动备份到别的盘，要么跟随旧系统一起被删掉。
*  更改这个配置后，记得eclipse或者idea需要导入这个settings.xml文件，不然IDE还是会默认给你下载到默认目录。


## Eclipse
下载后，直接解压到 [D:\application]目录就可以启动了


