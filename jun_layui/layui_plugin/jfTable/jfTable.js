layui.define(['form', 'laypage'], function (exports) {
    let $ = layui.jquery, laypage = layui.laypage, form = layui.form;

    $.fn.jfTable = function (_opt, args) {
        if (typeof _opt === "string") {//判断是方法还是对象
            return JfTable.methods[_opt](this, args);
        }
        _opt = _opt || {};
        return this.each(function () {
            let grid = $.data(this, "jfTable");
            if (grid) {
                _opt = $.extend(grid.options, _opt);
                grid.options = _opt;
            } else {
                grid = new JfTable(this, _opt);
                $(this).data('jfTable', grid);
            }
        });
    };


    let JfTable = function (element, option) {
        this.$element = $(element);
        if (option.select) {
            option.columns.unshift({
                type: 'check',
                width: 50
            });
        }
        this.option = $.extend({}, JfTable.default, option);
        this.init();
        this.initToolbar();
        if (option.page) {
            this.$page = $("<div class='page-bar'></div>").insertAfter(element);
        }
    };

    JfTable.prototype.init = function () {
        $("<table class='layui-table'></table>").appendTo(this.$element.html(""));
        this.option.url ? this.ajaxData() : this.initBody();
    };

    JfTable.prototype.initEvent = function () {
        let t = this, _opt = t.option;
        if (_opt.select) {
            form.render("checkbox");
            form.on('checkbox(allChoose)', function (data) {
                let child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
                child.each(function (index, item) {
                    item.checked = data.elem.checked;
                });
                form.render('checkbox');
            });
        }
    };


    //生成工具栏
    JfTable.prototype.initToolbar = function () {
        let t = this, $e = t.$element, _opt = t.option, toolbar = _opt.toolbar,
            tool = $("<div class='layui-btn-group'></div>").prependTo($e);
        $.each(toolbar, function (index, item) {
            let tag;
            if (item.href) {
                tag = "<a class='layui-btn " + _opt.toolbarClass + "' href='" + item.href + "'></a>";
            } else {
                tag = "<button class='layui-btn " + _opt.toolbarClass + "'></button>";
            }
            let btn = $(tag).appendTo(tool);
            if (item.icon) {
                $("<i class='layui-icon'>" + item.icon + "</i>").appendTo(btn);
            } else {
                btn.append(item.text);
            }
            if (item.handle) {
                btn[0].onclick = eval(item.handle || function () {
                });//绑定匿名事件
            }
        });
    };

    JfTable.prototype.initPage = function () {
        let t = this, opt = t.option, page = t.$page;
        laypage.render({
            elem: page[0],
            curr: opt.curr,
            limit: 10,
            count: opt.total,
            groups: 5,
            jump: function (obj, s) {
                t.option.param = $.extend(opt.param, {page: obj.curr});
                if (!s) {
                    t.init();
                }
            }
        });
    };

    JfTable.prototype.initBody = function () {
        let t = this, $e = t.$element, opt = t.option, col = opt.columns, dt = opt.data,
            $table = $e.find("table").html(""),
            $cg = $("<colgroup></colgroup>").appendTo($table),
            $th = $("<thead></thead>").appendTo($table),
            $thr = $("<tr></tr>").appendTo($th),
            $tb = $("<tbody></tbody>").appendTo($table);
        $tb.html("");
        if (opt.select) {
            $table.wrapAll("<div class='layui-form'></div>");
        }
        //遍历创建表头
        for (let i = 0, l = col.length; i < l; i++) {
            let c = col[i];
            i === (l - 1) ? $("<col>").appendTo($cg) : $("<col width='" + c.width + "'>").appendTo($cg);
            c.type === 'check' ? $("<th><input type='checkbox' lay-skin='primary' lay-filter='allChoose'></th>").appendTo($thr) : $("<th>" + c.text + "</th>").appendTo($thr);
        }

        //生成tbody  表格体
        for (let i = 0, l = dt.length; i < l; i++) {
            let d = dt[i], $tr = $("<tr></tr>").appendTo($tb);
            //取出对应列值
            for (let j = 0, cl = col.length; j < cl; j++) {
                let c = col[j], v = d[c.name], f = c.formatter;
                if (c.type === 'check') {
                    $("<td><input type='checkbox' value='" + i + "' lay-skin='primary'></td>").appendTo($tr);
                    continue;
                }
                if (typeof f === "function") {
                    v = f(v, d, i);
                }
                $("<td>" + v + "</td>").appendTo($tr);
            }
        }
        opt.onLoadSuccess(dt);
        if (opt.select) {
            t.initEvent();
        }
        if (opt.page) {
            this.initPage();
        }
    };

    JfTable.prototype.ajaxData = function () {
        let index = layer.load(1);
        let t = this, opt = t.option, param = $.extend({}, opt.param, {size: opt.size});
        $.ajax({
            url: opt.url,
            method: opt.method,
            data: opt.onBeforeLoad(param),
            success: function (result) {   //function1()
                result = opt.dataFilter(result);
                layer.close(index);
                if (opt.page) {
                    opt.total = result.total;
                    opt.curr = result.page;
                    opt.data = result.list;
                } else {
                    opt.data = result;
                }
                if (!opt.data) {
                    throw new Error("数据格式不正确");
                }
                t.initBody();
            }
        });
    };
    JfTable.methods = {
        option: function (jq) {
            return $.data(jq[0], "jfTable").option;
        },
        insertRow: function (jq, row) {
            let s = $.data(jq[0], "jfTable"), opt = s.option;
            opt.data.unshift(row);
            s.initBody();
        },
        getRow: function (jq, args) {
            let s = $(jq[0]).jfTable('option');
            return s.data[args];
        },
        deleteRow: function (jq, args) {
            let s = $.data(jq[0], "jfTable"), opt = s.option;
            console.log(s)
            opt.data.splice(args, 1);
            s.initBody();
        },
        reload: function (jq, param) {
            let t = $.data(jq[0], "jfTable"), opt = t.option;
            opt.param = $.extend({}, opt.queryParam, param);
            t.init();
            if (opt.page) {
                t.initPage();
            }
        },
        updateRow: function (jq, param) {
            let s = $.data(jq[0], "jfTable"), opt = s.option;
            opt.data[param.index] = param.row;
            s.initBody();
        },
        getSelected: function (jq) {
            let s = $(jq[0]).find("table.layui-table tbody .layui-form-checked"), r = [];
            for (let i = 0, l = s.length; i < l; i++) {
                let index = $(s[i]).prev().val();
                r[i] = this.getRow(jq, index);
            }
            return r || undefined;
        }

    };
    JfTable.default = {
        columns: [],
        url: null,
        data: [],
        method: "get",
        select: false,
        toolbar: [],
        limits: [10, 20, 30, 40, 50],
        size: 20,
        curr: 0,
        param: {},
        onBeforeLoad: function (param) {
            return param;
        },
        onLoadSuccess: function (data) {
            return data;
        },
        dataFilter: function (res) {
            return res.list;
        }
    };

    exports('jfTable', {});
});
