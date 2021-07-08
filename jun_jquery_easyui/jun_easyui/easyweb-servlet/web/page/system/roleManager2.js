var main = null;
$(function () {
    main = new Main();
    main.init();
});

//主操作类
function Main() {
    this.init = function () {
        this.leftTree = new LeftTree();
        this.leftTree.init();

        this.centerTree = new CenterTree();
        this.centerTree.init();

        this.dlg = new Dlg();
        this.dlg.init();

        this.dg = new Dg();
        this.dg.init();


        var me = this;
        $("#panel_north .btn_add").click(function () {
            me.dlg.showAdd();
        });

        $("#panel_north .btn_modify").click(function () {
            me.dlg.showModify();
        });
        $("#panel_north .btn_del").click(function () {
            me.leftTree.del();
        });
    }
}

function save() {

    var treeObj = main.leftTree.getTreeObj();
    var selectedNodes = treeObj.getSelectedNodes();
    if (selectedNodes.length != 1) {
        $.messager.alert("提示", "请选择一个角色", "info");
        return false;
    }
    var selectedNode = selectedNodes[0];
    if (selectedNode.entity && selectedNode.entity.flag == 1) {
        $.messager.alert("提示", "请选择某个角色", "info");
        return false;
    }


    var treeObj_center = main.centerTree.getTreeObj();
    var nodes = treeObj_center.getCheckedNodes(true);
    if (nodes.length <= 0) {
        $.messager.alert("提示", "请先给角色分配权限", "info");
        return false;
    }

    var menuIds = "";
    for (var i = 0; i < nodes.length; i++) {
        if (menuIds == "") {
            menuIds = nodes[i].id;
        } else {
            menuIds += "," + nodes[i].id;
        }
    }
    $("#panel_north .btn_save").showLoading();
    $.post('/system/roleMenu.do', { action: "ModifyMenuId", roleid: selectedNode.id, menuIds: menuIds },
        function (obj) {
            $.messager.show({ title: "提示", msg: "修改成功！" });
        }, 'json').complete(function () {
        $("#panel_north .btn_save").hideLoading();
    }).error(onError);

}


function Dlg() {
    this.url = "/system/role.do";
    this.init = Dlg_Method.init;
    this.mustSelectOne = function () {
        var treeObj = main.leftTree.getTreeObj();
        var records = treeObj.getSelectedNodes();
        if (records.length == 0) {
            $.messager.alert("提示", "请选择需要操作的数据", "info");
            return false;
        } else if (records.length != 1) {
            $.messager.alert("提示", "只能选择一条数据", "info");
            return false;
        }
        var record = records[0];
        if (record.entity && record.entity.flag == 1) {
            $.messager.alert("提示", "请选择某个角色", "info");
            return false;
        }
        return true;
    };
    this.getSelectedRecord = function () {
        var treeObj = main.leftTree.getTreeObj();
        return treeObj.getSelectedNodes()[0];
    };
    this.refresh = function () {
        main.leftTree.init();
    };
    this.getFormJson = function () {
        var fj = Dlg_Method.getFormJson.call(this);
        if (fj.id == "") {
            fj.id = undefined;
        }
        return fj;
    }
    this.showAdd = function () {
        Dlg_Method.showAdd.call(this, { title: "添加角色" });
        document.getElementById("img_icon").src = $("#text_icon").val();
    };
    this.showModify = function () {
        Dlg_Method.showModify.call(this, { title: "修改角色" });
        document.getElementById("img_icon").src = $("#text_icon").val();
    }
}

function Dg() {
    this.url = "/system/role.do";
    this.init = Dg_Method.init;
    this.getColumns = function () {
        var columns = new Array();
        columns.push(
            { field: "id", title: "ID", hidden: false, checkbox: true },
            { field: "name", title: "名称", width: 200 },
            { field: "comment", title: "说明", width: 200 }
        );
        return columns;
    };
}


///左边树操作类
function LeftTree() {
    this.tree = $("#tree_left");
    this.url = "/system/role.do?action=query";
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
                    r.entity = {
                        flag:"2",
                        id:r.id
                    };
                }
                var root = [];
                root.push({
                    name: "角色",
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
                $("#panel_west").hideLoading();
            },
            onClick: function (event, treeId, node) {
                var treeObj = main.centerTree.getTreeObj();
                if (node.entity.flag == "1") {
                    treeObj.checkAllNodes(false);
                } else if (node.entity.flag == "2") {
                    treeObj.checkAllNodes(false);
                    $("#panel_center").showLoading();
                    $.post("/service/RoleMenuService.ashx", { action: "Query", roleId: node.id }, function (result) {
                        if (result.success === false) {
                            $.messager.alert("错误", result.msg, "error");
                        } else {
                            for (var i = 0; i < result.length; i++) {
                                var n = treeObj.getNodeByParam("id", result[i].menuId, null);
                                if (node == null) {
                                    continue;
                                }
                                treeObj.checkNode(n, true, false);
                                if (result[i].limits != "" && result[i].limits != null) {
                                    var as = result[i].Limits.split(',');
                                    for (var j = 0; j < as.length; j++) {
                                        var node2 = treeObj.getNodeByParam("id", as[j], null);
                                        treeObj.checkNode(node2, true, true);
                                    }
                                }
                            }
                        }
                    }, "json").complete(function () {
                        $("#panel_center").hideLoading();
                    }).error(onError);

                }
            },
            onAsyncSuccess: function (event, treeId) {
                $("#panel_west").hideLoading();
            }

        }
    };
    this.init = function () {
        $.fn.zTree.init(this.tree, this.setting);
    };
    this.refresh = function () {
        $.fn.zTree.init(this.tree, this.setting);
    };
    this.del = function () {
        var treeObj = this.getTreeObj();
        var records = treeObj.getSelectedNodes();
        if (records.length == 0) {
            $.messager.alert("提示", "请选择需要删除的角色", "info");
            return false;
        }
        else if (records.length != 1) {
            $.messager.alert("提示", "每次只能删除一个角色", "info");
            return false;
        }
        var record = records[0];

        if (record.entity && record.entity.flag == 1) {
            $.messager.alert("提示", "请选择某个角色", "info");
            return false;
        }

        var me = this;


        $.messager.confirm('确认', '您确认要删除该角色吗?', function (r) {
            if (r) {
                $.messager.progress();

                $.post("/service/RoleService.ashx", { action: "delById", id: record.id }, function (result) {
                    if (result.success) {
                        me.refresh();
                        $.messager.show({
                            title: "成功",
                            msg: "操作成功"
                        });
                    } else {
                        $.messager.alert("提示", result.msg, "info");
                    }
                }, "json").complete(function () {
                    $.messager.progress("close");
                }).error(onError);
            }
        });
    }

}

///中间树操作类
function CenterTree() {
    this.tree = $("#tree_center");
    this.url = "/service/MenuService.ashx?action=query";
    this.getTreeObj = function () {
        var treeObj = $.fn.zTree.getZTreeObj("tree_center");
        return treeObj;
    };
    this.setting = {
        async: {
            enable: true,
            url: this.url
        },
        check:{
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "ps", "N": "ps" }
        },
        data: {
            key: {
                name: "text",
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
                $("#panel_center").showLoading();
            },
            onAsyncError: function () {
                $.messager.alert("错误","加载权限树出错","info");
                $("#panel_center").hideLoading();
            },
            onAsyncSuccess: function (event, treeId) {
                $("#panel_center").hideLoading();
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
            url: '/service/SourceService.ashx?action=UploadImage', //用于文件上传的服务器端请求地址
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



