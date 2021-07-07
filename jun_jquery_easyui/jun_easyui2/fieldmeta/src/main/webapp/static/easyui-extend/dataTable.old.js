/**
 * 2015-11-16
 * @uthor klguang
 */

/**
 * 
 * 	初始化：
	var xxx=new myEasyUI({
		easyUIlibPath:"",
		datagrid_table :"",
		data_form_dialog : "",
		data_form : "",
		data_form_btn : "",
		entityName : "",// 最好与java实体一样的名称
		
		dataUrl:"",
		addUrl : "",
		editUrl : "",
		removeUrl:"",

	})
	xxx.searchConf({
		searchForm:"",
		searchForm_btn:""
	});;
 * 
 * save or edit方法返回的json格式为：{"result","success"},{"result","null"},{"result","repeat"},{"result","failed"}
 * 
 * 注意remove是根据idField进行删除的。
 * 
 */

function myEasyUI(params) {

	//构造器
	this.easyUIlibPath = params.easyUIlibPath;
	this.$datagrid_table = $("#" + params.datagrid_table);
	this.$data_form_dialog = $("#" + params.data_form_dialog);
	this.$data_form = $("#" + params.data_form);
	this.$data_form_btn = $("#" + params.data_form_btn);
	this.entityName = params.entityName;

	this.dataUrl = params.dataUrl;
	this.addUrl = params.addUrl;
	this.editUrl = params.editUrl;
	this.removeUrl = params.removeUrl;

	this.searchConf = function(params) {
		this.$searchForm = $("#" + params.searchForm);
		this.$searchForm_btn = $("#" + params.searchForm_btn);
		if (typeof (params.searchForm) == "undefined"
				|| typeof (params.searchForm_btn) == "undefined")
			return;
		this.$searchForm_btn.click(function() {
			_self.$datagrid_table.datagrid("load", _self.$searchForm
					.serializeJson());
		})

	};

	this.$data_form_btn.click(function() {
		_self.save();
	});

	this.add = add;
	this.edit = edit;
	this.save = save;
	this.remove = remove;

	var _self = this;
	this._handlerURL = "";

	// ------------------------CRUD 函数---------------------------
	function add() {
		var mydialog = this.$data_form_dialog;
		mydialog.dialog('open').dialog('setTitle', "New " + this.entityName);
		this.$data_form.form('reset');
		this._handlerURL = this.addUrl;
	}
	function edit() {		
		//row 是后台一个完整的实体的json
		var row = this.$datagrid_table.datagrid('getSelected');
		if (row) {
			this.$data_form_dialog.dialog("open").dialog("setTitle",
					"Edit " + this.entityName);
			//将json加载到form里
			this.$data_form.form("load", row);
			this._handlerURL = this.editUrl;
		}
	}
	function save() {
		//校验表单
		if (!this.$data_form.form('validate'))
			return;
		$.ajax( {
			url : _self._handlerURL,
			data : _self.$data_form.serialize(),//jquery的serialize()序列号表单
			type : "post",
			dataType : "json",
			success : function(data) {
				if (data.result == "success") {
					_self.$datagrid_table.datagrid('reload'); // reload the user data
		} else if (data.result == "null") {
			$.messager.show( {
				title : 'Error',
				msg : "必须字段不能为空！"
			});
		} else if (data.result == "repeat") {
			$.messager.show( {
				title : 'Error',
				msg : "重复添加！"
			});
		} else {
			$.messager.show( {
				title : 'Error',
				msg : "更新失败！"
			});
		}
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		$.messager.show( {
			title : 'Error',
			msg : "更新失败！"
		});
	},
	complete : function(XMLHttpRequest, textStatus) {
		_self.$data_form_dialog.dialog('close'); // close the dialog
		}
		});
	}
	function remove() {
		var row = this.$datagrid_table.datagrid('getSelected');
		var idFiled=this.$datagrid_table.datagrid("options").idField;
		var idParam="{\""+idFiled+"\":"+row[idFiled]+"}";
		//console.log(idParam);
		if (row) {
			$.messager
					.confirm(
							'Confirm',
							'Are you sure you want to remove this ' + _self.entityName + '?',
							function(r) {
								if (r) {
									$.post(_self.removeUrl,JSON.parse(idParam), function(data) {
										if (data.result == "success") {
											_self.$datagrid_table
													.datagrid('reload'); // reload the user data
										} else {
											$.messager.show( { // show error message
														title : 'Error',
														msg : "删除失败！"
													});
										}
									}, 'json');
								}
							});
		}
	}

	/**
	 * √和✘显示：正确是1
	 */
	this.imgcheckbox = function(cellvalue, options, rowObject) {
		return cellvalue == 1 ? '<img src="' + _self.easyUIlibPath + '/themes/icons/ok.png" alt="正常" title="正常" />'
				: '<img src="' + _self.easyUIlibPath + '/themes/icons/no.png" alt="禁用" title="禁用" />';
	}

	this.datagrid = function(params) {
		this.$datagrid_table.datagrid(params);
	}
	//去除表单元素未填写的字段
	$.fn.serializeJson = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		$(array).each(
				function() {
					if(this.value=="")//去除表单元素未填写的字段
						return;
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							serializeObj[this.name].push(this.value);
						} else {
							serializeObj[this.name] = [
									serializeObj[this.name], this.value ];
						}
					} else {
						serializeObj[this.name] = this.value;
					}
				});
		return serializeObj;
	};
	
	
}

//----------------------------------datagrid-------------------------