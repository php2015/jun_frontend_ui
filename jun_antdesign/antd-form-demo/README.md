###	如何启动项目

```javascript
npm install
```

```javascript
//运行开发服务器-访问方式:http://localhost:9090/
npm run dev
```

###	项目的其他shell命令

```javascript
//打包命令
npm run assets
```

```javascript
//运行测试环境-访问方式:http://localhost:6001/
npm run test2
```

###	 项目目录详解

> 核心项目文件夹

| 目录                      | 说明                     |
| ------------------------- | ------------------------ |
| /development              | 项目源文件目录(开发文件) |
| /development/IndexPage    | 依赖详解(主页)           |
| /development/ClockPage    | 时钟页面                 |
| /development/CalendarPage | 日历页面                 |

> 其余项目文件

| 目录            | 说明                               |
| --------------- | ---------------------------------- |
| /production     | 打包后文件的存放目录               |
| /resources      | 各种项目资源文件夹                 |
| /StaticServer   | 集成的，用于测试的静态服务器文件夹 |
| /webpack.config | webpack配置文件的目录              |
| /EasyConfig.js  | 用于快速配置webpack的简易文件      |

