
window.app_v = 1;
//Math.random();

window.console || (window.console = {
    log: function ()
    {
    }, info: function ()
    {
    }, debug: function ()
    {
    }, warn: function ()
    {
    }, error: function ()
    {
    }
});

$(function () {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            //if (this.value != "") {
                serializeObj[this.name] = this.value;
            //}
        });
        return serializeObj;
    };

});

function onError() {
    $.messager.alert("错误", "服务器错误", "error");
}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
* 日期时间格式化方法，
* 可以格式化年、月、日、时、分、秒、周
**/
Date.prototype.Format = function (formatStr) {
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    return formatStr.replace(/yyyy|YYYY/, this.getFullYear())
 	             .replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100))
 	             .replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1)).replace(/M/g, (this.getMonth() + 1))
 	             .replace(/w|W/g, week[this.getDay()])
 	             .replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate()).replace(/d|D/g, this.getDate())
 	             .replace(/HH|hh/g, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours()).replace(/H|h/g, this.getHours())
 	             .replace(/mm/g, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes()).replace(/m/g, this.getMinutes())
 	             .replace(/ss/g, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds()).replace(/S|s/g, this.getSeconds());
};




//默认#dg,#searchForm,#d_tb
//表格方法集
Dg_Method = {
    init: function () {
        if (!this.getSearchFormJson) {
            this.getSearchFormJson = Dg_Method.getSearchFormJson;
        }
        if (!this.getQueryParams) {
            this.getQueryParams = Dg_Method.getQueryParams;
        }
        if (!this.query) {
            this.query = Dg_Method.query;
        }
        if (!this.del) {
            this.del = Dg_Method.del;
        }

        if (!this.mustSelectOne) {
            this.mustSelectOne = Dg_Method.mustSelectOne;
        }

        if (!this.dg) {
            this.dg = $("#dg");
        }
        if (!this.searchForm) {
            this.searchForm = $("#searchForm");
        }

        if (!this.d_tb) {
            this.d_tb = "#d_tb";
        }
        if (this.ctrlSelect == undefined) {
            this.ctrlSelect = true;
        }
        if (this.singleSelect == undefined) {
            this.singleSelect = false;
        }

        if (!this.action) {
            this.action = "queryPage";
        }
        if (this.pagination == undefined) {
            this.pagination = true;
        }
        if (this.fitColumns == undefined) {
            this.fitColumns = true;
        }

        if (!this.getDlg) {
            this.getDlg = Dg_Method.getDlg;
        }
        var me = this;
        this.dg = $(this.dg);
        this.dg.datagrid({
            url: this.url,
            queryParams: this.getQueryParams(),

            onLoadError: function () {
                $.messager.alert("错误", "载入列表出错,请刷新页面后重试", "info");
            },
            loadFilter: function (data) {
                if (data.success === false) {
                    $.messager.alert("载入列表出错", data.msg, "info");
                    return null;
                }
                if (data.rows) {
                    return data;
                } else {
                    return {
                        total: data.length,
                        rows:data
                    }
                }
            },
            fit: true,
            fitColumns: this.fitColumns,
            rownumbers: true,
            toolbar: this.d_tb,
            pageSize: 20,
            pagination: this.pagination,
            ctrlSelect: this.ctrlSelect,//ctrl多选
            singleSelect: this.singleSelect,//是否单选
            onClickRow:this.onClickRow,
            onUnselect: this.onUnselect,
            onBeforeLoad:this.onBeforeLoad,
            striped: true,//斑马条
            border: false,
            onDblClickRow: this.onDblClickRow ? this.onDblClickRow : function (rowIndex, rowData) {

                me.dg.datagrid("uncheckAll").datagrid("checkRow", rowIndex);

                var dlg = me.getDlg();
                if (dlg) {
                    dlg.showModify.call(dlg);
                }
            },
            columns: [this.getColumns()]
        });
     //   $.parser.parse(this.dg.parent());


        if (!this.searchForm.data("bind"))
        {//防止重复绑定
            var me = this;
            //绑定搜索表单提交事件
            var submitBtn = this.searchForm.find(".submit"); 
            this.searchForm.submit(function ()
            {
                submitBtn.focus().click();
                return false;
            });
            submitBtn.click(function ()
            {
                me.query();
            });
            this.searchForm.data("bind", true);
        }
            
      
    },
    //暂时性,这样做法容易导致混乱
    getDlg:function(){
        if(window.main && main.dlg){
            return main.dlg;
        }
    },

    //获取表单内容json
    getSearchFormJson: function () {
        var queryParams = this.searchForm.serializeJson();
        if (queryParams.endTime && queryParams.endTime.length<15) {
            var d = new Date(queryParams.endTime +" 00:00:00");
            d.setDate(d.getDate() + 1);
            queryParams.endTime = d.Format("yyyy-MM-dd HH:mm:ss");
        }
        return queryParams;
    },
    getQueryParams: function () {
        var params = this.getSearchFormJson();
        params.action = this.action;
        return params;
        //return {action:"queryPage",query:JSON.stringify(this.getSearchFormJson())};
    },
    mustSelectOne:function(){
        var records = this.dg.datagrid("getSelections");
        if (records.length == 0) {
            $.messager.alert("提示", "请选择需要操作的数据", "info");
            return false;
        }
        if (records.length > 1) {
            $.messager.alert("提示", "只能选择一条数据", "info");
            return false;
        }
        return true;
    },
    //查询
    query: function () {
        this.dg.datagrid("load", this.getQueryParams());
    },
    //一次提交删除
    delx:function(){
        var records = this.dg.datagrid("getSelections");
        alert("工单尚未实现");
    },
    //删除方法
    //callback,执行完成后回调方法,删除成功调用callback(true)否则调用false
    //getDataMethod,每次删除前封装提交参数的方法
    del: function (callback,getDataMethod) {
        var records = this.dg.datagrid("getSelections");
        if (records.length == 0) {
            $.messager.alert("提示", "请选择需要删除的数据", "info");
            return;
        }
        var me = this;
        var msg = "确认要将这<strong style=color:red>" + records.length + "</strong>条数据删除吗?";
        $.messager.confirm("确认删除", msg, function (r) {
            if (r) {
                function deal() {
                    var record = records.shift();
                    if (record == null) {
                        //已经全部处理完了
                        $.messager.progress("close");
                        me.dg.datagrid("reload");
                        if (callback) {
                            callback(true);
                        }
                        $.messager.show({
                            title: "成功",
                            msg: "删除成功"
                        });
                        return;
                    }

                    var data = null;
                    if (getDataMethod) {
                        data = getDataMethod(record);
                    } else {
                        data = {
                            id: record.id,
                            action: "delById"
                        };
                    }

                    $.messager.progress({ title: "删除中", msg: "删除中,剩余:<strong color:red>" + (records.length + 1) + "</strong>" });
                    $.post(me.url, data, function (result) {
                        $.messager.progress('close');
                        if (result.success) {
                            deal();
                        } else {
                            $.messager.alert("错误", result.msg, "error");
                            me.dg.datagrid("reload");
                            if (callback) {
                                callback(false);
                            }
                        }
                    }, "json").error(function () {
                        $.messager.progress("close");
                        me.dg.datagrid("reload");
                        if (callback) {
                            callback(false);
                        }
                        onError(arguments);
                    });
                }
                deal();
            }
        });
    }


};


///对话框方法集
Dlg_Method = {
    //对话框重载方法
    init: function () {
        var me = this;
        if (!this.showAdd) {
            this.showAdd = Dlg_Method.showAdd;
        }
        if (!this.showModify) {
            this.showModify = Dlg_Method.showModify;
        }
        if (!this.submit) {
            this.submit = Dlg_Method.submit;
        }
        if (!this.getFormJson) {
            this.getFormJson = Dlg_Method.getFormJson;
        }
        if (!this.dlg) {
            this.dlg = $("#dlg");//默认
        } else {
            this.dlg = $(this.dlg);
        }
        if (!this.action) {
            this.action = "";//默认
        }
        if (!this.dg && window.main && main.dg) {
            this.dg = main.dg;
        };
        if (!this.mainForm) {
            this.mainForm = $(this.dlg).find(".mainForm");
        }

        if (!this.getSubmitData) {
            this.getSubmitData = Dlg_Method.getSubmitData;
        }

        if (!this.getSelectedRecord) {
            this.getSelectedRecord = Dlg_Method.getSelectedRecord;
        }
        if (!this.mustSelectOne) {
            this.mustSelectOne = Dlg_Method.mustSelectOne;
        }

        if (!this.refresh) {
            this.refresh = Dlg_Method.refresh;
        }

        if (!this.validForm) {
            this.validForm = Dlg_Method.validForm;
        }
        if (this.resizable === undefined)
        {
            this.resizable = false;
        }

        if (!this.resetDlg) {
            this.resetDlg = Dlg_Method.resetDlg;
        }

        if (!this.loadForm) {
            this.loadForm = Dlg_Method.loadForm;
        }


        if(this.buttons === undefined){
            this.buttons = [
                {
                    text: "确认",
                    iconCls:"icon-save",
                    handler:function(){
                        me.submit();
                    }
                },{
                    text:"关闭",
                    iconCls:"icon-cancel",
                    handler:function(){
                        me.dlg.dialog("close");
                    }
                }
            ];
        }


        var submitBtn = $(this.dlg).find(".submit");
        var me = this;
        //绑定对话框中表单的提交事件
        $(this.dlg).find(".mainForm").submit(function (e) {
            $(this).find(".easyui-textbox").each(function (index) {
                $(this).next().children(".textbox-value").val($(this).next().children(".textbox-text").val());
            });
            me.submit();
            return false;
        });


    },
    resetDlg: function () {
        this.mainForm.form("reset");
    },
    
    //显示添加对话框方法
    showAdd: function (ps) {
        if (!ps) {
            ps = {};
        }

        this.resetDlg();

        var params = {
            title: ps.title ? ps.title : "添加",
            top: ps.top ? ps.top : undefined,
            left: ps.left ? ps.left : undefined,
            iconCls: ps.iconCls?ps.iconCls:"icon-add",
            modal: ps.modal === undefined ? true : ps.modal,
            resizable: this.resizable
        };


        if (ps.buttons) {
            params.buttons = ps.buttons;
        } else if (this.buttons) {
            params.buttons = this.buttons;
        }
        this.dlg.dialog(params);
        this.action = "add";
        var ts = this.dlg.find(".textbox-text");
        if (ts.length > 0)
        {
            $(ts[0]).focus();
        }
    },
    mustSelectOne:function(){
        return this.dg.mustSelectOne()
    },
    loadForm:function(){
        var record = this.getSelectedRecord();
        this.resetDlg();
        if (record) {
            this.mainForm.form("load").form("load", record);
        }
    },
    //显示修改对话框方法
    showModify: function (ps) {
        if (!ps) {
            ps = {};
        }

        if (!this.mustSelectOne()) {
            return false;
        }
        
        var params = {
            title: ps.title ? ps.title : "修改",
            top: ps.top ? ps.top : undefined,
            left: ps.left ? ps.left : undefined,
            iconCls: ps.iconCls?ps.iconCls:"icon-edit",
            modal: ps.modal === undefined ? true : ps.modal,
            resizable: this.resizable
        };
        if (ps.buttons) {
            params.buttons = ps.buttons;
        } else if (this.buttons) {
            params.buttons = this.buttons;
        }
        this.dlg.dialog(params);
        this.loadForm();
        this.action = "modify";
        return true;
    },
    getSelectedRecord:function(){
        var record = this.dg.dg.datagrid("getSelected");
        return record;
    },

    getFormJson:function(){
        return this.mainForm.serializeJson();
    },
    getSubmitData:function(){
        var model = this.getFormJson();
        var submitData = {
            action: this.action,
            model: JSON.stringify(model)
        };
        return submitData;
    },
    refresh:function(){
        this.dg.dg.datagrid("reload");
    },
    validForm:function(){
        var isValid = this.mainForm.form('validate');
        if (!isValid) {
            $.messager.alert("提示", "请正确填写每一项", "info");
            return false;
        }
        return true;
    },
    //提交对话框方法
    //successMethod,提交成功后调用的方法,如果没有提供则按默认处理,关闭对话框并刷新主表格
    submit: function (successMethod) {
        if (this.validForm() == false) {
            return false;
        }

        var submitData = this.getSubmitData();
        $.messager.progress();
        var me = this;
        $.post(this.url, submitData, function (result) {
            if (result.success) {
                if (successMethod) {
                    successMethod();
                } else {
                    me.dlg.dialog("close");
                    me.refresh();
                }
                $.messager.show({
                    title: "成功",
                    msg: "操作成功"
                });

            } else {
                $.messager.alert("失败", result.msg, "info");
            }
        }, "json").error(onError).complete(function () {
            $.messager.progress("close");
        });
    },

};

