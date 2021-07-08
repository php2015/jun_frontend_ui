// version 1.2.20 - By Kant@SeekRoad 2019-09-17

//var mod_url='/module';
var gridTabName = '管理列表';
var gridIconCls = 'icon icon-edit';
var gridEditCount = 0;		//备用
var gridLastIndex = 0;		//备用
var gridIndexUrl = '/index';		//备用
var gridJsonUrl = '/listjson';
var gridSaveRowUrl = '/save';
var gridDeleteRowUrl = '/delete';
var gridUpdateUrl = '/update';
var gridConfirmUrl = '/confirm';	//备用
//弹窗相关参数
var gridEditUrl = '/dialog';
var dialogModal = true;
var dialogWidth = 500;
var dialogHeightMargin = 10;
var dialogHeightMax = 500;	//弹窗最大高度，dialogHeight会根据页面高度自动更新（dialogHeightAutoSet）
var dialogHeight = 500;		//所以使用中设置dialogHeightMax的值即可
function dialogHeightAutoSet(){
    dialogHeight = getMaxHeight(dialogHeightMax,dialogHeightMargin);
}
/*改变窗口大小时更新height数值 */
$(window).resize(function(){dialogHeightAutoSet();});

//$(function(){gridInit();});  or  $(function(){gridInit({seapanel:true});});
function gridInit(){
 var args=arguments[0], gridName='gridlist', typeToolBar='search';
 var autoUpdateSeaPanel=false;
 if(!$.isEmptyObject(args)){
    if(args.hasOwnProperty('gridid')){gridName=args['gridid'];}
    if(args.hasOwnProperty('toolbar')){typeToolBar=args['toolbar'];}
    if(args.hasOwnProperty('seapanel')){autoUpdateSeaPanel=args['seapanel'];}
 }
 dialogHeightAutoSet();
 if(gridName.substr(0,1)!='#'){ gridName = '#'+gridName; }
 $(gridName).data('EditingCount',0);
 $(gridName).datagrid(
  jQuery.extend({
	fit:true,
	striped:true,		//交替显示行背景
	rownumbers:true,	//行号
	toolbar:getGridToolbarField(typeToolBar),
	columns:getGridColumnsField(),
	//onSelect:function(index,row){ $(gridName).datagrid('unselectRow',index);}  //取消点击行高亮
	onBeforeEdit:function(index,row){
		row.editing = true;
		$(gridName).datagrid('refreshRow', index);
		//gridEditCount++;
		$(gridName).data('EditingCount',$(gridName).data('EditingCount')+1);
	},
	onAfterEdit:function(index,row){
		row.editing = false;
		$(gridName).datagrid('refreshRow', index);
		//gridEditCount--;
		$(gridName).data('EditingCount',$(gridName).data('EditingCount')-1);
	},
	onCancelEdit:function(index,row){
		row.editing = false;
		$(gridName).datagrid('refreshRow', index);
		//gridEditCount--;
		$(gridName).data('EditingCount',$(gridName).data('EditingCount')-1);
	}
	/*//只允许一行在编辑状态时有用
	onClickRow:function(rowIndex){
		if (gridLastIndex != rowIndex){
			$(gridName).datagrid('endEdit', gridLastIndex);
			$(gridName).datagrid('beginEdit', rowIndex);
		}
		gridLastIndex = rowIndex;
	}//*/
   },getGridExtendParam()
  ));
 if(autoUpdateSeaPanel==true){
    $(window).resize(function(){setTimeout(function(){resetSeaPanel(gridName);},200);});
	resetSeaPanel(gridName);
 }
}

function gridEditRow(index,gridName){
	gridName = gridName||'gridlist';
	$('#'+gridName).datagrid('beginEdit', index);
}
function gridCancelRow(index,gridName){
	gridName = gridName||'gridlist';
	$('#'+gridName).datagrid('cancelEdit', index);
}
function gridSaveRow(index,gridName){
	/*////==============================
	//说明： 2013-4-28 by Kant
	//		暂时没有找到直接读取编辑中的值
	//		所以采用先保存然后读取行数据的办法
	//		以后如果找到方法了可以直接修改
	//*///==============================
	var args=arguments[2], s_SaveUrl,fn_BeforeSave,fn_GetRowData,fn_SetRowData;
	gridName = gridName||'gridlist';
	gridName = '#'+gridName;
	s_SaveUrl = mod_url+gridSaveRowUrl;
    fn_BeforeSave = gridSaveRowBefore;
    fn_GetRowData = getGridRowData;
    fn_SetRowData = setGridRowData;
    if(!$.isEmptyObject(args)){
        if(args.hasOwnProperty('url')){ s_SaveUrl = args['url']; }
        if(args.hasOwnProperty('beforesave') && typeof(args['beforesave'])==='function'){ fn_BeforeSave = args['beforesave']; }
        if(args.hasOwnProperty('getdata') && typeof(args['getdata'])==='function'){ fn_GetRowData = args['getdata']; }
        if(args.hasOwnProperty('setdata') && typeof(args['setdata'])==='function'){ fn_SetRowData = args['setdata']; }
    }
	//保存原始内容值
	var rowOld = $(gridName).datagrid('getRows')[index];
	var rowvalold = fn_GetRowData(rowOld);
	$(gridName).datagrid('endEdit', index);	//保存新记录
	var row = $(gridName).datagrid('getRows')[index];	//读取修改后的内容值
	if(fn_BeforeSave(row,rowOld)){
	$.ajax({
		url: s_SaveUrl,
		cache: false, dataType: 'json', type: 'post',
		data: fn_GetRowData(row),
		success: function(jsonObj){
			if (jsonObj.state=='success') {
				$(gridName).datagrid('updateRow',{index:index, row:fn_SetRowData(jsonObj.row,rowvalold)} );	//插入记录存入新id，修正状态值
			}else{
				//保存失败，还原原始内容值
				$(gridName).datagrid('updateRow',{index:index, row:rowvalold});
				$(gridName).datagrid('beginEdit', index);
				$.messager.alert('提示', jsonObj.msg, 'error');
			}
		},
		error: function(jsonObj){
			//保存失败，还原原始内容值
			$(gridName).datagrid('updateRow',{index:index, row:rowvalold});
			$(gridName).datagrid('beginEdit', index);
			$.messager.alert('提示', '服务器忙，请稍后再提交保存！', 'error');
		}
	});
	}else{
		$(gridName).datagrid('updateRow',{index:index, row:rowvalold});
		$(gridName).datagrid('beginEdit', index);
	}
}
function gridDeleteRow(index,gridName){
	var args=arguments[2], s_DelUrl,fn_GetRowData;
	gridName = gridName||'gridlist';
	gridName = '#'+gridName;
	s_DelUrl = mod_url+gridDeleteRowUrl;
    fn_GetRowData = getGridDelRowData;
    if(!$.isEmptyObject(args)){
        if(args.hasOwnProperty('url')){ s_DelUrl = args['url']; }
        if(args.hasOwnProperty('getdata') && typeof(args['getdata'])==='function'){ fn_GetRowData = args['getdata']; }
    }
	$.messager.confirm('确认','是否确定要删除该记录?',function(r){if (r){
	    var row = $(gridName).datagrid('getRows')[index];
		if((!$.isEmptyObject(row)) && row.hasOwnProperty('state') && row.state=='create' ){
			$(gridName).datagrid('deleteRow', index);
			gridRefreshRow(index,$(gridName).datagrid('getRows').length,gridName);
		}else{
			$.ajax({
				url: s_DelUrl, cache: false, dataType: 'json', type: 'post',
				data: fn_GetRowData(row),	//{id:row.id, state:row.state},	// name:row.name, type:row.type, order:row.order, 
				success: function(jsonObj){
					if(jsonObj.state=='success'){
                        if(!$.isEmptyObject(jsonObj.row)){
							$(gridName).datagrid('updateRow',{index:index, row:jsonObj.row});
						}else{
							$(gridName).datagrid('deleteRow', index);
							gridRefreshRow(index,$(gridName).datagrid('getRows').length,gridName);
						}
					}else{
						$.messager.alert('提示', jsonObj.msg, 'error');
					}
				},
				error: function(jsonObj){
					$.messager.alert('提示', '服务器忙，请稍后再提交删除！', 'error');
				}
			});
		}
	} });
}
function gridAddRow(gridName){
	var args=arguments[1], fn_GetRowData;
	gridName = gridName||'gridlist';
	gridName = '#'+gridName;
    fn_GetRowData = getGridNewRowData;
    if(!$.isEmptyObject(args)){
        if(args.hasOwnProperty('getdata') && typeof(args['getdata'])==='function'){ fn_GetRowData = args['getdata']; }
    }
	//-- 2015-3-5 Kant 取消同时只能增加一条记录的限制
	//if (gridEditCount > 0){
	//	$.messager.alert('警告','当前还有'+gridEditCount+'记录正在编辑，不能增加记录。');
	//	return;
	//}
	//-- 2015-3-5 ----------
	//$(gridName).datagrid('endEdit', gridLastIndex);		//取消正在编辑的行
	var row = $(gridName).datagrid('getRows');
	//gridLastIndex = row.length;
	//$(gridName).datagrid('appendRow', fn_GetRowData() );
	gridLastIndex = 0;
	$(gridName).datagrid('insertRow',{index:gridLastIndex, row:fn_GetRowData()} );	//在指定位置插入行
	gridRefreshRow(gridLastIndex,row.length,gridName);
	$(gridName).datagrid('selectRow', gridLastIndex );
	$(gridName).datagrid('beginEdit', gridLastIndex );
}
function gridRefreshRow(startRowNo,endRowNo,gridName){
	gridName = gridName||'gridlist';
	if(gridName.substr(0,1)!='#'){ gridName = '#'+gridName; }
	for (var i=startRowNo;i<endRowNo;i++){
		$(gridName).datagrid('refreshRow', i );
	}
}

//--- 以下为各个表格自定义设置内容 ----------------------------------------------------------------
function setGridJsonUrl(gridName){	//默认不主动加载数据时调用
	var args=arguments[1], s_JsonUrl,b_IsSetUrl;
	gridName = gridName||'gridlist';
	gridName = '#'+gridName;
	s_JsonUrl = mod_url+gridJsonUrl;
    b_IsSetUrl = $(gridName).data('IsSetJsonUrl');
    if(!$.isEmptyObject(args)){
        if(args.hasOwnProperty('url')){ s_JsonUrl = args['url']; }
        if(args.hasOwnProperty('isseturl')){ b_IsSetUrl = args['isseturl']; }
    }
	if(typeof(b_IsSetUrl)=='undefined' || b_IsSetUrl==false){
		var opts = $(gridName).datagrid('options');
		opts.url = s_JsonUrl;
		//b_IsSetUrl = true;
		$(gridName).data('IsSetJsonUrl',b_IsSetUrl);
	}
}
function getGridExtendParam(){		//返回个性化补充datagrid属性参数
	return {
	    title:gridTabName,
	    iconCls:gridIconCls,
		//singleSelect:true,	//只允许选择一行
		pagination:true,	//表格底部显示分页工具栏
		pageSize:25,		//初始化每页记录数
		pageList:[10,25,50,75,100],
		url:mod_url+gridJsonUrl
		/*
		fitColumns:true,	//自适应列宽，设置这个可以不用每一列设置宽度
		width:720,
		height:400,
		frozenColumns:[[
			{field:'no',title:'编号',width:60,align:'center'}	/* 冻结列 * /
		]], */
	};
}
function getGridToolbarField(){		//返回搜索栏的按钮设置内容
    var args=arguments[0];
    if(args=='none'){
	   return undefined;
    }else if(args=='search'){
	   return '#tbsearch';
    }else{  // args=='row'
	   return [
		 {text:'增加&nbsp;',iconCls:'icon-add',handler:function(){gridAddRow();} },
		 {text:'刷新&nbsp;',iconCls:'icon-reload',handler:function(){location.reload();} }
	   ];
    }
}
function getGridColumnsField(){		//格式化datagrid表格 返回Json格式
	//return undefined;     //返回默认值，可以在html页面的table上直接填写列格式
	return [[
		{field:'id',title:'字典ID',width:80,align:'center',sortable:true},
		{field:'name',title:'字典名称',width:200,align:'center',
			editor:{type:'validatebox',options:{required:true,missingMessage:'输入不能为空！', validType:'minLength[2]'}}
		},
		{field:'text',title:'具体内容',width:250,align:'center',
			editor:{type:'validatebox',options:{required:true,missingMessage:'输入不能为空！', validType:'minLength[2]'}}
		},
		{field:'value',title:'导入代码',width:80,align:'center',
			editor:{type:'validatebox',options:{required:true,missingMessage:'输入不能为空！', validType:'minLength[1]'}}
		},
		{field:'type',title:'字典类型',width:80,align:'center',sortable:true,
			editor:{type:'validatebox',options:{required:true,missingMessage:'输入不能为空！', validType:'minLength[2]'}}
			/*editor:{type:'combobox',options:{valueField:'id', textField:'text',panelHeight:63,data:json_select, required:true, missingMessage:'请选择字典类型...'} /*,multiple:'multiple'/*多选* /},
			formatter:function(value,row,index){
				for (var tt in json_select){ 
					if(json_select[tt].id==value)return json_select[tt].text;
				}
			}*/
		},
		{field:'order',title:'显示顺序',width:80,align:'center',sortable:true,editor:{type:'numberbox',options:{required:true,missingMessage:'仅接受数字输入！'}}},
		{field:'action',title:'操作',width:100,align:'center',
			formatter:function(value,row,index){
				if (row.editing){
					var s = '<a href="javascript:gridSaveRow('+index+');" onclick="stopBubble();">保存</a> | ';
					var c = '<a href="javascript:gridCancelRow('+index+');" onclick="stopBubble();">取消</a>';
					return s+c;
				} else {
					var e = '<a href="javascript:gridEditRow('+index+');" onclick="stopBubble();">编辑</a> | ';
					var d = '<a href="javascript:gridDeleteRow('+index+');" onclick="stopBubble();">删除</a>';
					return e+d;
				}
			}
		}
	]];
}
function gridSaveRowBefore(rowDate,oldrowData){		// 提交数据前检查数据合法性，有需要时重写本函数
	return true;
}
function getGridNewRowData(){		//新建记录 格式化传递参数格式 返回Json格式
	return {id:'',name:'',text:'',value:'',type:'',order:1,state:'create'};
}
function getGridRowData(row){		//提交数据 格式化传递参数格式 返回Json格式
	//return {id:row.id, name:row.name, text:row.text, value:row.value, type:row.type,  order:row.order, state:row.state};
    if(row.hasOwnProperty('editing')){ delete row['editing']; }
	return row;
}
function setGridRowData(row,oldrow){//系统处理后返回参数格式化更新 返回Json格式
	return {id:row.id, state:''};	//默认没有更新内容
}
function getGridDelRowData(row){	//格式化删除行传递参数格式 返回Json格式
	return {id:row.id, state:row.state};	// name:row.name, type:row.type, order:row.order, 
}
function resetSeaPanel(gridName){	//改变浏览器窗口大小时触发更新检索面板选项宽度，调用：$(window).resize(function(){setTimeout(resetSeaPanel,500);});
	gridName = gridName||'gridlist';
	if(gridName.substr(0,1)!='#'){ gridName = '#'+gridName; }
	//初始化检索面板样式			//屏幕宽度过小时还是会有显示不完整问题，暂不处理 
	$('#tbsea_r').css('padding-left','0px');
	$('#tbsea_l > br').remove();
	//获取当前宽度		w 当前宽度； ww 计算后需要的宽度
	var dTw=$('#tbsearch').width(), dLTmpW=1;	//左栏显示宽度，初始值0改为1，增加兼容性（宽度没错，但显示出来就是挤到第二行了，只能增加1px以兼容，浏览器版本问题？？）
	var dLw=$('#tbsea_l').width(),dLww=0, dLww2=0,dLwwpl=0;
	var dRw=$('#tbsea_r').width(),dRwwpl=0;
	var dRPw=0,dRPpl=0;
	if($('#tbsea_r_float').length>0){
		dRPw=$('#tbsea_r_float').width(); if(isNaN(dRPw)){dRPw=0;}
		dRPpl=($('#tbsea_r_float').css('padding-right')).replace(/px/g, '');
		if(!isNaN(dRPpl)){dRPw+=1*dRPpl;}
	}
	var dBtnw=0, obgThis,Sign1=false;
	if($('#tbsea_l .seaActBtn').length>0){ dBtnw=$('#tbsea_l .seaActBtn').width(); }
	//console.log('总宽度：'+dTw+'； 检索选项宽度：'+dLw+'； 提交按钮宽度：'+dRw+'； 右侧浮动面板宽度：'+dRPw+'； 刷新按钮宽度：'+dBtnw+'；');
	$('#tbsearch .seaItem').each(function(i){	//默认.seaActBtn会另起一行显示；选项有多行时，空位足够会和选项在一行显示
		obgThis = $(this);
		obgThis.css('float','none').css('padding-right','0px');
		dLTmpW+=obgThis.width()+4;	// 4:选项间有一个空格的宽度
		dLwwpl=(obgThis.css('padding-left')).replace(/px/g, '');  //兼容 span.first 的css类
		if(!isNaN(dLwwpl)){dLTmpW+=1*dLwwpl;}
		if(obgThis.find('select.easyui-combobox').length>0){dLTmpW+=3;	//又一个挤到第二行显示的兼容问题
		}else if(obgThis.find('select').length>0){dLTmpW+=1;}			//普通select宽度不够的兼容问题
		//console.log('  dLTmpW = '+dLTmpW);
		if(Sign1==false && obgThis.attr('lastitem')=='true'){	//有分行标识时，限制最大显示选项长度
			Sign1 = true;
			if(dTw-dLTmpW-dRw-dRPw>10){
				dTw=dLTmpW+dRw+dRPw+10;
			}
			//console.log('  限制最大显示选项长度，dTw：'+dTw+' dLTmpW：'+dLTmpW);
		}
		//判断是否可以在一行内显示
		//console.log('  检索选项需要宽度：'+dLTmpW);
		if(dLTmpW+dRw+dRPw<=dTw){	//需要的宽度少于屏幕宽度，即可在一行中显示全部
			//console.log('  一行中显示全部，宽度：'+dLTmpW);
			dLww=dLTmpW;
		}else{		//屏幕不能在一行中显示全部检索选项时，设置最大可显示宽度+10（与检索按钮间隔距离）
			//console.log('  不能在一行中显示全部，宽度：'+(dLww));
			obgThis.css('float','right').css('padding-right','4px');	//后面选项设置为右浮动 + 空格宽度的间距4px
			dLww2+=obgThis.width()+4+4;	// 4:选项间有一个空格的宽度 + padding-right宽度
			//dLwwpl=(obgThis.css('padding-left')).replace(/px/g, '');  //兼容 span.first 的css类
			if(!isNaN(dLwwpl)){dLww2+=1*dLwwpl;}
			if(dLww2+dBtnw<=dLww){
				if(obgThis.next().length>0){	//后面还存在选项
					if(dLww2+obgThis.next().width()>dLww){
						obgThis.after('<br>');	//超出宽度，另起一行
						dLww2=0;
					}
				}
			}else{
				obgThis.after('<br>');	//超出宽度，另起一行
				dLww2=0;
			}
		}
	});
	$('#tbsea_l').width(dLww);
	//调整提交按钮左间距
	dRwwpl = dTw-dLww-dRw-dRPw;
	if(dRwwpl>10){ dRwwpl=10; }
	$('#tbsea_r').css('padding-left',dRwwpl+'px');
	//更新datagrid
	$(gridName).datagrid('resize');
}

//--- 以下为弹窗相关函数 ----------------------------------------------------------------
function gridEditDialog(act,rowid,dialogName){
    var args=arguments[3], s_EditUrl,o_SubmitBtnOption;
	dialogName = dialogName||'griddialog';
	s_EditUrl = gridEditUrl;
	o_SubmitBtnOption = {};
    if($.isEmptyObject(args)){
		o_SubmitBtnOption = {id:dialogName};
	}else{
        if(args.hasOwnProperty('url')){ s_EditUrl = args['url']; }
        if(args.hasOwnProperty('btnoption') && typeof(args['btnoption'])==='object'){ o_SubmitBtnOption = args['btnoption']; }
        if(!o_SubmitBtnOption.hasOwnProperty('id')){ o_SubmitBtnOption['id'] = dialogName; }
	}
	var str_url,str_title,str_icon;
	if (act=='add'){
		str_url = mod_url+s_EditUrl;
		str_title = '增加记录';
		str_icon = 'icon-add';
	}else if(act=='addit'){
		str_url = mod_url+s_EditUrl+'-'+rowid;
		str_title = '增加记录';
		str_icon = 'icon-add';
	}else{
		str_url = mod_url+s_EditUrl+'-'+rowid;
		str_title = '编辑记录';
		str_icon = 'icon-edit';
	}
	griddialogInit(dialogName);
	$('#'+dialogName).show();
	$('#'+dialogName).dialog({
		title:str_title,
		iconCls:str_icon,
        modal:dialogModal,
		resizable:true,
		href:str_url,
		width:dialogWidth,
		height:dialogHeight,
		onClose:function(){$(this).dialog('destroy');},
		buttons:getDialogSubmitBtn(o_SubmitBtnOption)
	});
}
function getDialogSubmitBtn(){
    var args=arguments[0], s_GridID,s_DialogID,s_SaveUrl,fn_CheckFrom,fn_GetFromData,fn_AjaxSuccess;
	var fn_DisableFrom,fn_EnableFrom, s_FormName,s_BtnName;
    s_GridID = 'gridlist';
    s_DialogID = 'griddialog';
    s_SaveUrl = mod_url+gridSaveRowUrl;
    s_FormName = 'form[name=fadd]';
    s_BtnName = '#btnSave';
    fn_DisableFrom = griddialogDisableFrom;
    fn_EnableFrom = griddialogEnableFrom;
    fn_CheckFrom = griddialogCheckFrom;
    fn_GetFromData = griddialogJaonFromVal;
    fn_AjaxSuccess = griddialogAjaxSuccess;
    if(!$.isEmptyObject(args)){
        if(args.hasOwnProperty('id')){ s_DialogID = args['id']; }
        if(args.hasOwnProperty('url')){ s_SaveUrl = args['url']; }
        if(args.hasOwnProperty('gridid')){ s_GridID = args['gridid']; }
        if(args.hasOwnProperty('formname')){ s_FormName = args['formname']; }
        if(args.hasOwnProperty('btnname')){ s_BtnName = args['btnname']; }
        if(args.hasOwnProperty('disablefrom') && typeof(args['disablefrom'])==='function'){ fn_DisableFrom = args['disablefrom']; }
        if(args.hasOwnProperty('enablefrom') && typeof(args['enablefrom'])==='function'){ fn_EnableFrom = args['enablefrom']; }
        if(args.hasOwnProperty('checkfrom') && typeof(args['checkfrom'])==='function'){ fn_CheckFrom = args['checkfrom']; }
        if(args.hasOwnProperty('getdata') && typeof(args['getdata'])==='function'){ fn_GetFromData = args['getdata']; }
        if(args.hasOwnProperty('success') && typeof(args['success'])==='function'){ fn_AjaxSuccess = args['success']; }
    }
	return [{
		text: '提交&nbsp;', iconCls: 'icon-ok', id: 'btnSave',
		handler: function(){
		  var chkResult = fn_CheckFrom();
		  if(chkResult[0]==true){
			fn_DisableFrom(s_BtnName);
			$.ajax({
				url: s_SaveUrl,
				cache: false, dataType: 'json', type: 'post',
				data: fn_GetFromData(s_FormName),
				success: function(jsonObj){
					if(jsonObj.state=='success'){
						fn_AjaxSuccess(jsonObj,s_GridID,s_DialogID);
					}else{
						$.messager.alert('提示', jsonObj.msg, 'error');
						fn_EnableFrom(s_BtnName);
					}
				},
				error: function(jsonObj){
					$.messager.alert('提示', '服务器忙，请稍后再提交保存！', 'error');
					fn_EnableFrom(s_BtnName);
				}
			});
		  }else{
            if(chkResult[0]!='noalert'){
                if((chkResult[1]).length>0){
                    $.messager.alert('提示', chkResult[1], 'warning');
                }else{
                    $.messager.alert('提示', '表单检查没有通过，请填写完整后再提交！', 'warning');
                }
			}
		  }
		}
	}, {
		text: '取消&nbsp;', iconCls: 'icon-cancel', id: 'btnCancel',
		handler: function(){$('#'+s_DialogID).dialog('destroy');}
	}];
}
function griddialogInit(dialogName){
	dialogName = dialogName||'griddialog';
	var dialogStyle = '';
	if(arguments[1]-0==0){
		dialogStyle = 'padding:0px;';		//arguments[1]==0，边框间距为0
	}else{
		if(arguments[1]){
			if(arguments[1]-0>0){			//非空值，是数字就设置边框间距，否则作为css赋值
				dialogStyle = 'padding:'+arguments[1]+'px;';
			}else{
				dialogStyle = arguments[1];
			}
		}else{
			dialogStyle = 'padding:5px;';	//空值，用默认设置5px
		}
	}
	if($('#'+dialogName).length<1){
		$('body').append('<div id="'+dialogName+'" style="display:none;'+dialogStyle+'"></div>');
	}
}
function griddialogShow(settings){
	var defaultSetting = {
			iframe:false,
			newpage:false,
			dialogname:'griddialog',
			dialogstyle:undefined,
			title:'编辑记录',
			iconCls:'icon-edit',
			href:null,//mod_url+gridEditUrl,
			modal:dialogModal,
			resizable:true,
			width:dialogWidth,
			height:dialogHeight,
			buttons:[{
				text: '关闭&nbsp;', iconCls: 'icon-cancel', id: 'btnCancel',
				handler: function(){$('#'+defaultSetting.dialogname).dialog('destroy');}
			}],//getDialogSubmitBtn(),
			extendSet:{}
		};
	jQuery.extend(defaultSetting,settings);
    if(defaultSetting.newpage==true){
		window.open(defaultSetting.href);
	}else{
		if(defaultSetting.iframe==true){
			jQuery.extend(defaultSetting.extendSet,{content:'<iframe src="'+defaultSetting.href+'" width="100%" height="100%" frameborder="0"></iframe>'});
			defaultSetting.href = null;
		}
		var dWidthMargin,dHeightMargin,dWidthMax,dHeightMax;
		if(isNaN(defaultSetting.width)){defaultSetting.width=500;}
		if(isNaN(defaultSetting.height)){defaultSetting.height=500;}
		dWidthMargin = (!isNaN(defaultSetting.widthMargin))?defaultSetting.widthMargin:10;
		dHeightMargin = (!isNaN(defaultSetting.heightMargin))?defaultSetting.heightMargin:10;
		dWidthMax = $(window).width()-dWidthMargin;
		dHeightMax = $(window).height()-dHeightMargin;
		if(defaultSetting.width>dWidthMax){defaultSetting.width=dWidthMax;}
		if(defaultSetting.height>dHeightMax){defaultSetting.height=dHeightMax;}
		var dialogParam = {
				title:defaultSetting.title,
				iconCls:defaultSetting.iconCls,
				modal:defaultSetting.modal,
				resizable:defaultSetting.resizable,
				href:defaultSetting.href,
				width:defaultSetting.width,
				height:defaultSetting.height,
				onClose:function(){$(this).dialog('destroy');},
				buttons:defaultSetting.buttons
			};
		if(!$.isEmptyObject(defaultSetting.extendSet)){
			jQuery.extend(dialogParam,defaultSetting.extendSet);
		}
		griddialogInit(defaultSetting.dialogname,defaultSetting.dialogstyle);
		$('#'+defaultSetting.dialogname).show();
		$('#'+defaultSetting.dialogname).dialog(dialogParam);
	}
}
function griddialogCheckFrom(){
	var msg = '',state=true;
	/*
	if($('#ProductID')==null || $('#ProductID').combobox('getValue')==null || $('#ProductID').combobox('getValue')==''){ 
		msg='1';
		state=false;
	}
	if (!$('#Link').validatebox('isValid')){
		msg='2';
		state=false;
	} */
	return Array(state,msg);
}
function griddialogJaonFromVal(formName){
	formName = formName||'form[name=fadd]';
	return $(formName).serialize();
}
function griddialogDisableFrom(btnName){
	btnName = btnName||'#btnSave';
	$(btnName).linkbutton('disable');
}
function griddialogEnableFrom(btnName){
	btnName = btnName||'#btnSave';
	$(btnName).linkbutton('enable');
}
function griddialogAjaxSuccess(jsonObj,gridName,dialogName){
	var args=arguments[3], fn_AfterSuccess;
	dialogName = dialogName||'griddialog';
	gridName = gridName||'gridlist';
	gridName = '#'+gridName;
    fn_AfterSuccess = griddialogAfterSuccess;
    if(!$.isEmptyObject(args)){
        if(args.hasOwnProperty('AfterSuccess') && typeof(args['AfterSuccess'])==='function'){ fn_AfterSuccess = args['AfterSuccess']; }
    }
	$('#'+dialogName).dialog('destroy');
    if(!$.isEmptyObject(jsonObj.row)){  //if(jsonObj.row){
        var idfield='id', actType='edit',actRowIndex=0;
        if(jsonObj.row.hasOwnProperty('idfield_')){idfield=jsonObj.row['idfield_'];}
        if(jsonObj.row.hasOwnProperty(idfield)){
            var item = $(gridName).datagrid('getRows');
            if(jsonObj.row.hasOwnProperty('actType_')){actType=jsonObj.row['actType_'];}
            if(actType=='edit'){
                if(item){ for(var i = item.length - 1; i >= 0; i--){
                    if(item[i][idfield]==jsonObj.row[idfield]){
                        $(gridName).datagrid('updateRow',{index:i, row:jsonObj.row});
                        try{
							//有折叠数据表格的话，刷新表格内容（目前没有太好的办法通用，暂时先用一收一开兼容一下吧）
							if(true==$(gridName).datagrid('getExpander',i).hasClass('datagrid-row-collapse')){
								$(gridName).datagrid('collapseRow',i);
								$(gridName).datagrid('expandRow',i);
							}else{
								//console.log('have no datagrid-row-collapse');
							}
                        }catch(err){
							//console.log('check datagrid-row-collapse error');
						}
                        break;
                    }
                }}
            }else{
                if(actType!='addfirst'){ actRowIndex = item.length; }
                $(gridName).datagrid('insertRow',{index:actRowIndex, row:jsonObj.row} );	//在指定位置插入行
                gridRefreshRow(actRowIndex,item.length,gridName);
            }
			fn_AfterSuccess(gridName);
        }else{
	        $(gridName).datagrid('reload');
        }
    }else{
	    $(gridName).datagrid('reload');
    }
}
function griddialogAfterSuccess(gridName){
	gridName = gridName||'gridlist';
	gridName = '#'+gridName;
	//按需要重定义，可执行更新数据后的视图更新操作
}

//--- 以下为扩展功能函数 ----------------------------------------------------------------
function isCreateComboBox(domIdName){	//判断是否已创建ComboBox组合框
	if(typeof($('#'+domIdName).attr('comboname'))=='undefined'){  //2019-09-18 存在id和name不相同的情况，改为判断是否存在该属性
		return false;
	}else{
		return true;
	}
}
function validboxSetVal(domIdName,value){	//为Validatebox验证框赋值并检查合法性
	$('#'+domIdName).val(value);
	$('#'+domIdName).validatebox('validate');
	return false;
}
function dateboxAddClearBtn(arrBtnOpt){	//增加DateBox日历框的按钮（继承原按钮设置并增加在中间位置）
	if($.isEmptyObject(arrBtnOpt)){
		arrBtnOpt = {text:'清除',handler: function(target){
				$(target).datebox('setValue', '');
				$(target).combo('hidePanel');
			}
		};
	}
	var buttons = $.extend([], $.fn.datebox.defaults.buttons);
	buttons.splice(1, 0, arrBtnOpt);
	return buttons;
}
function showTips(classname,maxWidth){	//初始化Tooltip提示栏
	var patrn=/^[1-9][0-9]*$/;
	if(!patrn.test(maxWidth)){maxWidth=350;}
	if(!classname){classname='shownote';}
	$('.'+classname).tooltip({
		showDelay: 100,
		onShow: function(){
			var t = $(this);
			var toolparam = {
				left: t.offset().left,
				//width: tWidth,
				boxShadow: '1px 1px 3px #292929'
			};
			if(maxWidth>1){
				var tWidth = (t.tooltip('tip').css('width')).replace(/px/g, '');
				if(tWidth-maxWidth>0 ){ tWidth = maxWidth; }
				toolparam['width'] = tWidth;
			}
			t.tooltip('arrow').css('left', 10);
			t.tooltip('tip').css(toolparam);
		}
	});
}
function showTipsNotHide(classname,maxWidth){	//初始化Tooltip提示栏2
	var patrn=/^[1-9][0-9]*$/;
	if(!patrn.test(maxWidth)){maxWidth=350;}
	if(!classname){classname='shownote';}
	$('.'+classname).tooltip({
		showDelay: 100,
		hideEvent: 'none',
		onShow: function(){
			var t = $(this);
			var toolparam = {
				left: t.offset().left,
				//width: tWidth,
				boxShadow: '1px 1px 3px #292929'
			};
			if(maxWidth>1){
				var tWidth = (t.tooltip('tip').css('width')).replace(/px/g, '');
				if(tWidth-maxWidth>0 ){ tWidth = maxWidth; }
				toolparam['width'] = tWidth;
			}
			t.tooltip('arrow').css('left', 10);
			t.tooltip('tip').css(toolparam).focus().unbind().bind('blur',function(){
				t.tooltip('hide'); //显示后失去焦点才消失
			});
		}
	});
}
function getMaxWidth(minNum){	//获取最大可用宽度 优先使用设定宽度，页面可见范围宽度不足时以可视宽度显示
	var maxNum,marginNum = 10;
	if(arguments[1] && arguments[1]-0>=0 ){			//非空值
		marginNum = arguments[1];
	}
	minNum = minNum||500;
	maxNum = $(window).width()-marginNum;
	if(minNum>maxNum){minNum=maxNum;}
	return minNum;
}
function getMaxHeight(minNum){	//获取最大可用高度 优先使用设定高度，页面可见范围高度不足时以可视高度显示
	var maxNum,marginNum = 10;
	if(arguments[1] && arguments[1]-0>=0 ){			//非空值
		marginNum = arguments[1];
	}
	minNum = minNum||500;
	maxNum = $(window).height()-marginNum;
	if(minNum>maxNum){minNum=maxNum;}
	return minNum;
}
function stopBubble(e){		//停止事件冒泡			//2018-5-25 Kant 主要用于的datagrid中点击链接后停止行点击事件，需要在onclick事件中调用
    if( e && e.stopPropagation ){	// 如果提供了事件对象，则这是一个非IE浏览器
        e.stopPropagation();		// 因此它支持W3C的stopPropagation()方法
    }else{
        window.event.cancelBubble = true;	// 否则，我们需要使用IE的方式来取消事件冒泡
    }
}
function stopDefault(e){	//阻止事件默认行为		//2018-5-25 Kant 暂无调用此函数，可删
    if( e && e.preventDefault ){
         e.preventDefault();		// 阻止默认浏览器动作(W3C)
    }else{
        window.event.returnValue = false;	// IE中阻止函数器默认动作的方式
    }
    return false;
}

/* 调用示例：
comboMultCreate('#example',json_example,defVal);
或者
$('#example').combobox(comboMultCfgOption({
	valueField:'id',textField:'html',data:comboMultCfgDataFmt(json_example,'html'), value:defVal
}));  */
function comboMultCreate(domID,jsonData,defVal){	//combobox的多选模式默认创建函数
	var opts = {valueField:'id',textField:'text',data:comboMultCfgDataFmt(jsonData), value:defVal };
	if(!$.isEmptyObject(arguments[3])){ opts = jQuery.extend(opts,arguments[3]); }
	$(domID).combobox(comboMultCfgOption(opts));
}
function comboMultCfgOption(opts){	//combobox的多选模式，增加复选框和“全选”选项
	var defOpts = {
			multiple:true, editable:false, panelHeight:'auto',
			formatter:function(row){return comboMultFunFormatter(row,this);},
			onLoadSuccess:function(){comboMultFunOnLoadSuccess(this);},
			onSelect:function(row){comboMultFunOnSelect(row,this,true);},
			onUnselect:function(row){comboMultFunOnSelect(row,this,false);}
		};
    return jQuery.extend(defOpts,opts);
}
function comboMultCfgDataFmt(data,textField,valField,valValue){	//combobox的多选模式，增加复选框和“全选”选项
	valValue = valValue||'';
	valField = valField||'id';
	textField = textField||'text';
	var dataPre = [{text:'全选',html:'全选'}];
	dataPre[0][valField] = valValue;
	dataPre[0][textField] = '全选';
    return dataPre.concat(data);
}
function comboMultFunFormatter(row,objThis){	//combobox的formatter方法，独立出来方便扩展调用
	var opts = $(objThis).combobox('options');
	var strText = '';
	if(row[opts.textField]=='全选'){ strText = '<b>'+row[opts.textField]+'</b>';
	}else{ strText = row[opts.textField]; }
	return '<input type="checkbox" class="combobox-checkbox">' + strText;
}
function comboMultFunOnLoadSuccess(objThis){	//combobox的onLoadSuccess方法，独立出来方便扩展调用
	var opts = $(objThis).combobox('options');
	var values = $(objThis).combobox('getValues');
	$.map(values, function(value){
		var el = opts.finder.getEl(objThis, value);
		el.find('input.combobox-checkbox')._propAttr('checked', true);
	});
}
function comboMultFunOnSelect(row,objThis,boolSeled){	//combobox的onSelect/onUnselect方法，独立出来方便扩展调用
	var opts = $(objThis).combobox('options');
	//当点击“全选”时，则处理所有的选项
	if(row[opts.textField]=='全选'){
		var vv = [];
		var data = $(objThis).combobox('getData');
		for(var i=0;i<data.length;i++){
			var el = opts.finder.getEl(objThis, data[i][opts.valueField]);
			el.find('input.combobox-checkbox')._propAttr('checked', boolSeled);
			vv.push(data[i][opts.valueField]);
		}
		if(boolSeled==true){ $(objThis).combobox('setValues', vv);
		}else{ $(objThis).combobox('setValues', []); }
	}else{
		var el = opts.finder.getEl(objThis, row[opts.valueField]);
		el.find('input.combobox-checkbox')._propAttr('checked', boolSeled);
	}
}
function comboCfgOnShowPanel(objThis,maxItemNum,maxHeight){	//combobox的下拉面板自动适配函数
	var patrn=/^[1-9][0-9]*$/;
	if(!patrn.test(maxItemNum)){maxItemNum=11;}
	if(!patrn.test(maxHeight)){maxHeight=275;}
	if($(objThis).combobox('getData').length > maxItemNum ){
		$(objThis).combobox('panel').height(maxHeight);
	}else{ $(objThis).combobox('panel').height('auto'); }
}
