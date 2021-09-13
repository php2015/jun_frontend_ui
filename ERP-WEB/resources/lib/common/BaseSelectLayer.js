/**
 * date:2020/4/18
 * author: 杨不易
 * description: 独立的   部门  |  菜单   的选择弹出层 
 */

/**
 * @param {Object} pid   选中的部门 pid    相当于父ID
 * @param {Object} callBack  选中的部门信息
 */
function openDeptSelecter(pid, callBack) {
	// callBack(1, '研发一部');
	layui.use(['form', 'table', 'layer', 'treeTable'], function() {
		var form = layui.form;
		var table = layui.table;
		var layer = layui.layer;
		var treeTable = layui.treeTable;
		var tableSelectIns;
		selDeptIndex = layer.open({
			type: 1,
			title: '选择部门',
			content: '<div style="padding:10px" ><table class="layui-hide" id="deptSelectTable" lay-filter="deptSelectTable"></table></div>',
			area: ['700px', '600px'],
			btn: ['<span class="layui-icon layui-icon-ok"></span>确定'],
			yes:function(index){
				// 获取单选选中信息
				var ckDate = tableSelectIns.checkStatus();
				// 回调数据出去  得到选中的id和名称
				callBack(ckDate[0].id,ckDate[0].title);
				// 关闭弹出层
				layer.close(selDeptIndex)
			},
			success: function(index) {
				tableSelectIns = treeTable.render({
					tree: {
						iconIndex: 2, // 折叠图标显示在第几列
						idName: 'id', // 自定义id字段的名称
						pidName: 'pid', // 自定义标识是否还有子节点的字段名称
						isPidData: true // 是否是pid形式数据
					},
					elem: '#deptSelectTable',
					cellMinWidth: true,
					cols: [{
							type: "numbers"
						},
						{
							type: "radio"
						},
						{
							field: 'title',
							title: '部门名称'
						},
						/* {field: 'id', title: 'ID', align: "center"}, */
						{
							field: 'remark',
							title: '部门备注',
							align: "center"
						},
						{
							field: 'address',
							title: '部门地址',
							align: "center"
						},
					],
					reqData: function(data, callback) {
						// 在这里写ajax请求，通过callback方法回调数据
						$.get(api + 'dept/loadAllDept', function(res) {
							
							// 异步加载 回调
							callback(res.data); // 参数是数组类型
						
							// 设置初始化 选中的部门 
							tableSelectIns.setChecked(pid); 
						});
					}
				});
			}
		});
	});
}
