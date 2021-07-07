# jfTable 使用说明

> 2018.10.24 更新 适应最新版本的layui，删除以前的所有方法，准备重写
> 说实话，闲心写的table插件我还是用不惯，好多地方限制的很死，尤其是数据格式，easyui结合layui感觉还是很不错的 
>  分页的数据格式如下,不懂留言评论，我会回复的
```
{
    list:[],
    total:100,
    page:1
}
```

---

>jfTable基于layui实现的一个table插件，能够自动生成一个数据表格
>内置分页以及按钮功能，实现方法大致参考easyui的datagrid
>功能还在完善，喜欢的朋友多多提提意见，工作之余我尽量多完善,因为是基于layui的，所以必须要使用layui的方式去使用它

>这个小东西也是我之前没事的时候对着easyui的datagrid的源码研究了一通，然后又想学着layui的使用方法做了个练手的东西。
>很多地方不合理我也明白，希望大家多提点提点，js我也只会些粗浅的东西

### 效果演示
![效果演示](http://git.oschina.net/uploads/images/2017/0401/142909_f2175c5f_417829.png "效果演示")


### 1 配置说明
使用方法
```
    <div id="table"></div>
layui.use(['jfTable'],function () {
    let $ = layui.jquery
     $("#table").jfTable(config)//config参考下面进行配置
        
      var config = {
        elem:"#table",
        url:"",//获取数据的url
        data:[],//本地数据  不支持本地数据的分页
        param: {},//查询参数
        page:true,//是否分页
        size:10,//每页数量
        select:true,//是否生成checkbox
        columns: [ {//列数组
                text:'用户名',//显示的表头
                name: 'username',//显示的数据key
                width: 100,//宽度
                formatter:function(value,row,index){//value 当前值  row 当前行数据  index 当前行索引
                }
            }],
        method:"post",//请求方式
        toolbarClass:"layui-btn-small",//按钮的样式
        toolbar:[{//按钮数组
                text:"新增",//icon缺省时显示
                icon:"&#xe654;",//按钮图标（如果不为空则显示按钮不显示text）
                handle:function () {//绑定函数
    
                }
            }]，
        //事件   一定要return 
        onBeforeLoad: function (param) {
            return param;
        },
        onLoadSuccess: function (data) {
            return data;
        },
        dataFilter:function (data) {
            return data;
        }
            
    }
}
```