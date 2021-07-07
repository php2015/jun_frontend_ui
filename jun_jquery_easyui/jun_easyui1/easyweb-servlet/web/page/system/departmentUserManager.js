var main = null;
$(function () {
    main = new Main();
    main.init();
});

//主操作类
function Main() {
    this.dlg = null;
    this.dg = null;
    this.treeLeft = null;
    this.dlg_1 = null;
    this.init = function () {
        this.dg = new Dg();
        this.dlg = new Dlg();
        this.treeLeft = new LeftTree();
        this.dlg_1 = new Dlg_1();
        this.dg.init();
        this.dlg.init();
        this.treeLeft.init();
        this.dlg_1.init();

        var me = this;
        $("#d_tb .btn_add").click(function () {
            me.dlg.showAdd();
        });
        $("#d_tb .btn_modify").click(function () {
            me.dlg.showModify();
        });
        $("#d_tb .btn_del").click(function () {
            me.dg.del();
        });

        $("#d_tb_1 .btn_add").click(function () {
            me.dlg_1.showAdd();
        });
        $("#d_tb_1 .btn_modify").click(function () {
            me.dlg_1.showModify();
        });
        $("#d_tb_1 .btn_del").click(function () {
            me.dg.del();
        });

        $("#d_tb_1 .btn_resetPassword").click(function () {
            resetPassword();
        });


    };
}
//重置密码
function resetPassword() {
    var records = $("#dg").datagrid("getSelections");
    if (records.length == 0) {
        $.messager.alert("提示", "请选择需要操作的数据", "info");
        return false;
    }

    $.messager.confirm("确认", "确认要重置这<strong>"+records.length+"</strong>名用户的密码?", function (r) {
        if (r) {
            var ids = "";
            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                if (i != 0) {
                    ids += ",";
                }
                ids += record.id;
            }
            $.messager.progress();
            $.post("/system/user.do", { action: "resetPasswordByIds", ids: ids,newPassword:"888888" }, function (result) {
                if (result.success) {
                    $.messager.show({
                        title: "成功",
                        msg: "密码重置成功"
                    });
                } else {
                    $.messager.alert("失败", result.msg, "info");
                }

            }, "json").complete(function () {
                $.messager.progress("close");
            }).error(onError);

        }
    });


  



}

//主表格类,继承Dg_Method的方法
function Dg() {
    this.status = 0;
    this.init = function () {
        this.searchForm = $("#searchForm");
        this.d_tb = "#d_tb";
        this.url = "/system/department.do";
        this.action = "query";
        this.pagination = false;
        this.getColumns = function () {
            var columns = new Array();
            columns.push(
               { field: "id", title: "ID", hidden: false, checkbox: true },
               { field: "name", title: "部门名称", width: 200 }
            );
            return columns;
        };
        $("#d_tb_1").hide();
        Dg_Method.init.call(this);
        this.status = 0;
        this.getDlg = function () {
            return main.dlg;
        }
    };
    this.init_1 = function () {
        this.searchForm = $("#searchForm_1");
        this.d_tb = "#d_tb_1";
        this.url = "/system/user.do";
        this.action = "queryPage";
        this.pagination = true;
        this.getColumns = function () {
            var columns = new Array();
            columns.push(
               { field: "id", title: "ID", hidden: false, checkbox: true },
               { field: "username", title: "用户名", width: 200 },
               { field: "nickname", title: "昵称", width: 200 },
               { field: "email", title: "邮箱", width: 200 },
               {
                   field: "sex", title: "性别", width: 50,
                   formatter: function (val, src) {
                       if (val == 1) {
                           return "男";
                       } else if (val == 2) {
                           return "女";
                       }
                       else {
                           return "-";
                       }
                   }
               },
                {
                    field: "lastTime", title: "最后登录时间", width: 150,
                    formatter: function (val, src)
                    {
                        if (val)
                        {
                            return new Date(val).Format("yyyy-MM-dd HH:mm:ss");
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    field: "createTime", title: "注册时间", width: 150,
                    formatter: function (val, src)
                    {
                        if (val)
                        {
                            return new Date(val).Format("yyyy-MM-dd HH:mm:ss");
                        } else
                        {
                            return "-";
                        }
                    }

                }, {
                    field: "roleNames", title: "角色", width: 150, formatter: function (val, src) {
                        return "<a title='"+val+"'>"+val+"</a>"
                    }
                }, {
                    field: "departmentName", title: "部门", width: 100
                }
            );
            return columns;
        };

        $("#d_tb").hide();
        Dg_Method.init.call(this);
        this.status = 1;

        this.getDlg = function () {
            return main.dlg_1;
        }

    };

   
    this.del = function () {
        var me = this;
        Dg_Method.del.call(this, function (result) {
            if (me.status == 0) {
                main.treeLeft.init();
            }
        });
    }
  


}
//主对话框类,继承Dg_Method的方法
function Dlg() {
    this.url = "/system/department.do";
    this.init = Dlg_Method.init;
    this.showAdd = function () {
        Dlg_Method.showAdd.call(this);
        document.getElementById("img_icon").src = $("#text_icon").val();
       // document.getElementById("img_icon").src = this.getFormJson().imgsrc;
    };
    this.showModify = function () {
        Dlg_Method.showModify.call(this);
        document.getElementById("img_icon").src = $("#text_icon").val();
        //document.getElementById("img_icon").src = this.getFormJson().imgsrc;
    };
    this.submit = function () {
        var me = this;
        Dlg_Method.submit.call(this,function(){
            me.dlg.dialog("close");
            me.refresh();
            main.treeLeft.init();
        });
    };
}

function Dlg_1() {
    this.url = "/system/user.do";
    this.init = function () {
        Dlg_Method.init.call(this);
        $(".roleCombobox").combobox({
            url: "/system/role.do?action=query",
            valueField: "id",
            textField: "name"
        });

    };
    this.dlg = $("#dlg_1");
    this.showAdd = function () {
        $(".justAddShow").show();
        Dlg_Method.showAdd.call(this);
        this.mainForm.form("load", {
            departmentId: this.dg.getSearchFormJson().departmentId
        });
        $(".justAddRead").textbox("enable");

    };
    this.showModify = function () {
        $(".justAddShow").hide();
        Dlg_Method.showModify.call(this);
        var roleIds = this.getSelectedRecord().roleIds;
        if (roleIds) {
            this.mainForm.form("load", { roleIds: roleIds.split(',') })
        }
        $(".justAddRead").textbox("disable");
    };
    this.getFormJson = function () {
        var fj = Dlg_Method.getFormJson.call(this);
        fj.roleIds = $(this.dlg).find(".roleCombobox").combobox("getValues").join(",");
        return fj;
    }

}


///左边树操作类
function LeftTree() {
    this.tree = $("#tree_left");
    this.url = "/system/department.do?action=query";
    this.getTreeObj = function () {
        var treeObj = $.fn.zTree.getZTreeObj("tree_left");
        return treeObj;
    };
    this.setting = {
        async: {
            enable: true,
            url: this.url,
            dataFilter: function (treeId, parentNode, rList) {
                for (var i = 0; i < rList.length; i++) {
                    var r = rList[i];
                   // r.icon = r.imgsrc;
                    r.entity = {
                        flag:"2",
                        id:r.id
                    };
                }


                var root = [];
                root.push({
                    name: "部门",
                    id: 0,
                    open: true,
                    children: rList,
                    entity: {
                        flag:"1"
                    }
                });
                return root;
            }
        },
        data: {
            key: {
                name: "name",
                url: "xUrl"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId"
            }
        },
        callback: {
            beforeAsync: function () {
                $("#panel_west").showLoading();
            },
            onAsyncError: function () {
                $.messager.alert("提示","装载部门列表出错,请刷新页面后重试","info");
                $("#panel_west").hideLoading();
            },
            onClick: function (event, treeId, node) {
                if (node.entity.flag == "1") {
                    $("#searchForm").form("reset");
                    main.dg.init();
                } else if (node.entity.flag == "2") {
                    $("#searchForm_1").form("reset").form("load", { departmentId:node.entity.id });
                    main.dg.init_1();
                }
            },
            onAsyncSuccess: function (event, treeId) {
                $("#panel_west").hideLoading();
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var nodes = treeObj.getNodes();
                var node = nodes[0];
                treeObj.selectNode(node);
            }

        }
    };
    this.init = function () {
        $.fn.zTree.init(this.tree, this.setting);
    };

}

function onFileIconChange(f) {
    if (f.value) {
        ajaxFileUpload();
    }
}

function ajaxFileUpload() {
    $("#img_icon").attr("src", "/images/loading.gif");
    $.ajaxFileUpload
    (
        {
            url: '/system/source.do?action=UploadImage', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'file_icon', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                //           $.messager.progress("close");
                if (data.success) {
                    $("#text_icon").val(data.imgurl);
                } else {
                    $.messager.alert("上传图片失败", data.msg, "error");
                }
                $("#img_icon").attr("src", $("#text_icon").val());
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                //          $.messager.progress("close");
                $("#img_icon").attr("src", $("#text_icon").val());
                $.messager.alert("错误", "出错了,请刷新后重试", "error");
            }
        }
    )
    return false;
}



