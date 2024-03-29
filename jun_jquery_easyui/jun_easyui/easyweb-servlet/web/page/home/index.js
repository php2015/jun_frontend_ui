﻿
function modifyPass() {
    addTab('修改密码', 'ModifyPwd.html', 'icon-key');
}
$(function () {

    //title, url, iconCls,closable
     addTab("首页", "home.jsp", null, false);

    $("body").showLoading();
    $.post("/system/user.do", { action: "getLoginUser" }, function (result) {
        if(result.success === false){
            $.messager.progress({
                title: "用户登录验证失败",
                msg: "正在跳转回登录界面"
            });
            location.href = "login.jsp";
        }else{
            $("#username a").html("欢迎您：" + result.nickname);
            $.fn.zTree.init($("#tree"), settingMenu); //加载菜单树
        }
    },"json").error(onError).complete(function () {
        $("body").hideLoading();
    });

   
    $('.cs-navi-tab').click(function () {
        var $this = $(this);
        var href = $this.attr('src');
        var icon = $this.attr('data-options').split(":")[1].replace(/"/g, ''); //删除所有";
        var title = $this.text();
        addTab(title, href, icon);
    });

   

    $("#tabs").tabs({
        fit: true,
        border: false,
        // 绑定tabs的右键菜单
        onContextMenu: function (e, title) {
            e.preventDefault();
            $(this).tabs('select', title);

            var tabsMenu = $('#tabsMenu');
            tabsMenu.menu('show', {
                left: e.pageX,
                top: e.pageY
            }).data("tabTitle", title);
            var close = tabsMenu.menu('findItem', '关闭');
            var closeOther = tabsMenu.menu('findItem', '关闭其它');
            var tabsSize = $("#tabs").tabs("tabs").length;
            var closeAll = tabsMenu.menu('findItem', '关闭所有');
            tabsMenu.menu('enableItem', closeAll.target);

            if (title == "首页")
            {
                tabsMenu.menu('disableItem', close.target);

                if (tabsSize == 1) {
                    tabsMenu.menu('disableItem', closeOther.target);
                    tabsMenu.menu('disableItem', closeAll.target);
                } else {
                    tabsMenu.menu('enableItem', closeOther.target);
                }

            } else {
                tabsMenu.menu('enableItem', close.target);

                if (tabsSize == 2) {
                    tabsMenu.menu('disableItem', closeOther.target);
                } else {
                    tabsMenu.menu('enableItem', closeOther.target);
                }
            }
        },
        onSelect: function (title, index) {
            var treeObj = $.fn.zTree.getZTreeObj("tree");
            var node = treeObj.getNodeByParam("text", title, null);
            if (node == null) {
                treeObj.cancelSelectedNode();
            } else {
                treeObj.selectNode(node);
            }
        }
    });
    // 实例化menu的onClick事件
    $("#tabsMenu").menu({
        onClick: function (item) {
            CloseTab(this, item.name);
        }
    });

});

//获取菜单树
var settingMenu = {
    async: {
        enable: true,
        url: "/system/menu.do?action=myMenuTree",
        autoParam: ["id", "name=n"]
    },
    callback:{
        onClick: openTab,
        beforeAsync: function () {
            $("#mymenu").showLoading();
        },
        onAsyncSuccess: function () {
            $("#mymenu").hideLoading();
        },
        onAsyncError: function () {
            $.messager.alert("加载菜单出错","出错了,请刷新页面后重试","error");
            $("#mymenu").hideLoading();
        },
        onRightClick: function (e) {
            //e.preventDefault();
            //$("#treeMenu").menu("show", {
            //    left: event.pageX,
            //    top: event.pageY
            //});
        }
    },

    data: {
        key: {
            name: "text",
            url:"xUrl"
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: 0
        }
    }
};




// 几个关闭事件的实现
function CloseTab(menu, name) {
    var curTabTitle = $(menu).data("tabTitle");
    var tabs = $("#tabs");
    if (name == "close") {
        tabs.tabs("close", curTabTitle);
    }

    var allTabs = tabs.tabs("tabs");
    var closeTabsTitle = [];
    $.each(allTabs, function () {

        var opt = $(this).panel("options");

        if (opt.closable && opt.title != curTabTitle && name == "Other") {
            closeTabsTitle.push(opt.title);
        } else if (opt.closable && name == "All") {
            closeTabsTitle.push(opt.title);
        }
    });

    for (var i = 0; i < closeTabsTitle.length; i++) {
        tabs.tabs("close", closeTabsTitle[i]);
    }
}

// 新增Tab
function openTab(event,treeId,treeNode) {
    var url = treeNode.url;
    if(!url){
        return;
    }
    addTab(treeNode.text, url, treeNode.iconCls);
}

function addTab(title, url, iconCls,closable) {
    if (url.indexOf("?") == -1) {
        url += "?v="+app_v;
    } else {
        url += "&v="+app_v;
    }

    var tab = $("#tabs");
    if(tab.tabs("exists",title)){
     tab.tabs('select', title);
    } else {
        
         var content = "<iframe frameborder='0' scrolling='no' style='width:99.8%;height:99.3%;padding:1px;' src='" + url + "'></iframe>";
        tab.tabs("add", {
            title: title,
            iconCls: iconCls,
            closable: closable===undefined?true:closable,
            content: content
        });
        $(".tabs-inner").last().attr("href", url);
        $(".tabs-inner").last().attr("onclick", "return false;");
      //  $(".tabs-inner").onClick(function () { return false; });

    }
}


// 展开当前树
function expand() {
    var node = $('#tree').tree('getSelected');
    $('#tree').tree('expand', node.target);
}

// 收缩当前树
function collapse() {
    var node = $('#tree').tree('getSelected');
    $('#tree').tree('collapse', node.target);
}

// 展开所有树
function expandAll() {
    $('#tree').tree('expandAll');
}

// 收缩所有树
function collapseAll() {
    $('#tree').tree('collapseAll');
}

// 新窗口打开
function newWin() {
    var url = window.location.href;
    var base = url.replace(/\/[^\/]*$/, "") + "/";
    var node = $('#tree').tree('getSelected');
    window.open(base + node.attributes.url);
}



//function ajax_QueryMenuByRoles(obj) {
//    $("#mymenu").empty();
//    var targetObj = $("#mymenu").html('<div id="mymenu" class="easyui-accordion" data-options="fit:true,border:false">' + obj.data);
//    $.parser.parse(targetObj); //重新渲染
//}