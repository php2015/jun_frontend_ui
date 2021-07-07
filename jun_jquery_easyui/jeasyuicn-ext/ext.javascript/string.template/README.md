#字符串模板解析
```javascript
    "模板你好{{name}},欢迎进入{{site}}。".template({"name":"夏悸","site":"中文社区"});
```
##对象模式
###模板
    你好{{name}},欢迎进入{{site}}。
###数据
    {"name":"夏悸","site":"中文社区"}
###结果
    你好夏悸,欢迎进入中文社区。

##二级对象模式
###模板
    你好{{user.name}},欢迎进入{{user.site}}。你好{{name}},欢迎进入{{site}}。
###数据
    {"user":{"name":"夏悸","site":"中文社区"}}
###结果
    你好夏悸,欢迎进入中文社区。

##数组模式
###模板
    你好{{0}},欢迎进入{{1}}。
###数据
	["夏悸","中文社区"]
###结果
    你好夏悸,欢迎进入中文社区。
	
##在线DEMO
[DEMO](http://www.gson.cn/ext.javascript/string.template/demo.html)