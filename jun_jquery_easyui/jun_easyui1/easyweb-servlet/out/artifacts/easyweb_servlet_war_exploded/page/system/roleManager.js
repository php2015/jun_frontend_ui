var main = null;
$(function () {
    main = new Main();
    main.init();
});
//主操作类
function Main() {
    this.dlg = null;
    this.dg = null;
    this.init = function () {
        this.dg = new Dg();
        this.dlg = new Dlg();
        this.dg.init();
        this.dlg.init();

        $("#d_tb .btn_add").click(function () {
            main.dlg.showAdd();
        });
        $("#d_tb .btn_modify").click(function () {
            main.dlg.showModify();
        });
        $("#d_tb .btn_del").click(function () {
            main.dg.del();
        });
    };
}
//主表格类,继承Dg_Method的方法
function Dg() {
    this.url = "/system/role.do";
    this.init = Dg_Method.init;
    this.action = "query";
    this.pagination = false;
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
//主对话框类,继承Dg_Method的方法
function Dlg() {
    this.url = "/system/role.do";
    this.init = Dlg_Method.init;
}


