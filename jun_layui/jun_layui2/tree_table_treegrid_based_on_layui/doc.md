### 快速开始
详情参见demo
- 这里是列表文本添加css样式

```
这里输入代码
```
- 引入treeGrid模块

```
    layui.config({
        base: 'design/extend/'
    }).extend({
        treeGrid:'treeGrid'
    }).use(['jquery','treeGrid','layer'], function(){
        // To do ...
    });
```

### 表格参数
|  参数名   | 类型    | 是否必填写    |    说明 |
| --- | --- | --- | --- |
|limit| number | 否 |【默认10】 ，即使不分页
|   id  |   string  | 是    | 表格的id，很重要，比如addRow方法需要配置此参数才生效    |
|   elem  |  string   | 是    | 表格的选择器    |
|  url   |   string  | 否     | 获取数据的url地址    |
| data | JSON | 否 | 与url的设置，二选一|
|  cellMinWidth   |   number  |  否   | 最小列宽    |
|  idField   |   string   |  是  |  id字段   |
|   treeId  |  string   |   是  |  树形id字段名称   |
|   treeUpId  | string    |  是   |   树形父id字段名称  |
|   treeShowName  | string    |  是   |   以树形式显示的字段  |
|   heightRemove  |  array   | 否    |  【默认[]】不计算的高度,表格设定的是固定高度，此项不生效   |
| height | string | 否 | 【默认window高度的100%】，支持数值和百分比，以及full-差值 |
| iconOpen | boolean | 否  | 是否显示图标【默认true】 |
| isOpenDefault| boolean | 否 | 节点默认是展开还是折叠【默认true】 |
| loading | boolean| 否 | 是否开启加载数据的动画【默认true】|
| method | string| 否 | 获取数据的方式，GET或者POST，【默认POST】|
| isPage | boolean| 否 | 是否开启分页，【默认false】|

### 数据格式
注：以下字段皆为可选。与树形结构相关的字段，比如id、parentId、name可在表格参数中配置。

|   字段明  |  说明   |
| --- | --- |
|   lay_is_checked  |  选中状态（true，false）   |
|   lay_is_radio  |   单选状态（true，false）  |
|    lay_is_open |   是否展开节点  |
|  lay_is_show   |   是否显示节点  |
|  children   |   下级，array  |
|   lay_is_row_check  |   行选中  |
|   lay_che_disabled  |   禁止多选（true，false）  |
|   lay_rad_disabled  |    禁止单选（true，false） |
|   lay_icon_open  |   打开的图标  |
|   lay_icon_close  |   关闭的图标  |
|lay_icon|叶子节点图标|

### 方法
|   方法名  |  参数   |  描述   |
| --- | --- | --- |
| getDataMap | tableId | 获取列表数据 |
|   addRow  |  tableId, index, data   |   添加一行数据  |
|   delRow  |   tableId, data  |  删除一行数据   |
| treeNodeOpen | tableId, o, isOpen |  |
### 事件


