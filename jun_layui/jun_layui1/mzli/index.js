var searchLock = false,
    fristSearch = true;
cache_source = 0;
cache_type = 1;
layui.config({
    base: '/static/js/plugin/' //设置自定义插件路径:根据实际路径进行设置
}).extend({
    'yutons_sug': 'yutons/yutons_sug'
}).use(['element', 'form', 'layer', 'yutons_sug'],
    function () {
        var form = layui.form,
            element = layui.element,
            layer = layui.layer,
            yutons_sug = layui.yutons_sug,
            $ = layui.$;

        yutons_sug.render({
            id: "keyword", //设置容器唯一id
            type: 'sug', //设置输入框提示类型：sug-下拉框，sugTable-下拉表格
            url: "/search_suggest?keyword=",//设置异步数据接口,url为必填项
            callback: function () {
                $('#searchButton').click();
            }
        });
        form.render();
        form.on('submit(search)',
            function (obj) {
                if (obj.field.keyword.trim() == "") {
                    searchLock = false;
                    return layer.msg('搜索不能为空', {
                        time: 700
                    }),
                        false
                }
                search(obj.field.keyword, obj.field.type);

                return false
            });
        $("a[href='#']").bind('click',
            function () {
                searchLock = true;
                $(".search-page").removeClass("layui-anim-fadein");
                $(".search-page").addClass("layui-anim-fadeout");
                setTimeout(function () {
                        $(".search-page").css('display', 'none');
                        $('#searchPanel').css('margin-top', 'calc(50vh - 119px)');
                        fristSearch = true;
                        searchLock = false
                    },
                    300)
            })

        function lay_alert(tip) {
            layer.msg(tip)
        }
    });

function searchReload() {
    $(".search-loading-wait").removeClass("layui-anim-fadeout");
    $(".search-loading-wait").addClass("layui-hide");
    $("#result_list").addClass("layui-hide");
    $("#result_list").removeClass("layui-anim-fadein");
    $(".search-error").addClass("layui-hide");
    $(".search-error").removeClass("layui-anim-fadein");
    $(".search-loading").removeClass("layui-anim-fadeout");
    $(".search-loading").addClass("layui-anim-fadein");
    $(".search-loading").removeClass("layui-hide");
    $(".search-empty").addClass("layui-hide");
    $(".search-empty").removeClass("layui-anim-fadein");
    $("#search-error-msg").html("");
    $("#result_list").html("")
}

function startSearch(name) {
    $('.search-input').val(name);
    $('#searchButton').click();
}

function searchOther(type) {
    $('.search-select select').val(type);
    cache_type = type
    layui.form.render()
    $('#searchButton').click();
}

function novel_search(name) {
    $('.search-select select').val(3);
    layui.form.render()
    $('.search-input').val(name);
    $('#searchButton').click();
}

function search(keyword, type) {
    $('#net_info').hide();
    if (searchLock) return false;
    searchLock = true;
    $('#searchPanel').css('margin-top', '15px');
    searchReload();
    setTimeout(function () {
            $(".search-page").css('display', 'block');
            $(".search-page").removeClass("layui-anim-fadeout");
            $(".search-page").addClass("layui-anim-fadein");
            setTimeout(function () {
                    var waitIndex = setTimeout(function () {
                            $(".search-loading-wait").removeClass("layui-hide");
                            $(".search-loading-wait").addClass("layui-anim-fadein")
                        },
                        3000);
                    $.ajax({
                        url: './search/?name=' + keyword + '&type=' + type,
                        type: 'get',
                        success: function (a) {
                            clearTimeout(waitIndex);
                            $(".search-loading-wait").removeClass("layui-anim-fadein");
                            $(".search-loading-wait").addClass("layui-anim-fadeout");
                            $(".search-loading-wait").addClass("layui-hide");
                            $(".search-loading").removeClass("layui-anim-fadein");
                            $(".search-loading").addClass("layui-anim-fadeout");
                            setTimeout(function () {
                                    $(".search-loading").addClass("layui-hide");
                                    if (a.code == 0) {
                                        if (a.data != '') {
                                            layui.each(a.data,
                                                function (index, item) {
                                                    if (item[1] != '') {
                                                        if (item[3] !== '') {
                                                            $("#result_list").append("<li><p class='search-res-title'><a href='" + item[1] + "' target='_blank'>" + item[0] + "</a><span class='search-res-info'>" + item[2] + "</span></p><p class='search-res-link'><a href='" + item[1] + "' target='_blank'>" + item[3].substring(0, 100) + "..." + "</a></p></li>")
                                                        } else {
                                                            $("#result_list").append("<li><p class='search-res-title'><a href='" + item[1] + "' target='_blank'>" + item[0] + "</a><span class='search-res-info'>" + item[2] + "</span></p></li>")
                                                        }
                                                    }
                                                });
                                            if (type == 1) {
                                                $("#result_list").append("<li style='font-size: 13px;text-align: center;'>换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','wlzy');\" style='color: orange'>卧龙</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zdzy');\" style='color: orange'>最大</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','kyzy');\" style='color: orange'>酷云</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','okzy');\" style='color: orange'>OK</a></li>")
                                            }
                                            if (type == 3) {
                                                $("#result_list").append("<li style='font-size: 13px;text-align: center;'>换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','yier');\" style='color: orange'>壹贰</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','youtu');\" style='color: orange'>追书</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zhaishuyuan');\" style='color: orange'>宅书院</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','miaobige');\" style='color: orange'>妙笔阁</a></li>")
                                            }
                                            $("#result_list").removeClass("layui-hide");
                                            $("#result_list").addClass("layui-anim-fadein");
                                            $('#result_list').animate({
                                                    scrollTop: 0
                                                },
                                                0)
                                        } else {
                                            if (type == 1) {
                                                $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','wlzy');\" style='color: orange'>卧龙</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zdzy');\" style='color: orange'>最大</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','kyzy');\" style='color: orange'>酷云</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','okzy');\" style='color: orange'>OK</a>")
                                            }
                                            if (type == 3) {
                                                $('.source').html("换个搜索源:  <a href=\"javascript:searchMore('" + keyword + "','" + type + "','yier');\" style='color: orange'>壹贰</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','youtu');\" style='color: orange'>追书</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zhaishuyuan');\" style='color: orange'>宅书院</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','miaobige');\" style='color: orange'>妙笔阁</a>")
                                            }
                                            $(".search-empty").removeClass("layui-hide");
                                            $(".search-empty").addClass("layui-anim-fadein")
                                        }
                                    } else {
                                        if (type == 1) {
                                            $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','wlzy');\" style='color: orange'>卧龙</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zdzy');\" style='color: orange'>最大</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','kyzy');\" style='color: orange'>酷云</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','okzy');\" style='color: orange'>OK</a>")
                                        }
                                        if (type == 3) {
                                            $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','yier');\" style='color: orange'>壹贰</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','youtu');\" style='color: orange'>追书</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zhaishuyuan');\" style='color: orange'>宅书院</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','miaobige');\" style='color: orange'>妙笔阁</a>")
                                        }
                                        $("#search-error-msg").html(a.message);
                                        $(".search-error").removeClass("layui-hide");
                                        $(".search-error").addClass("layui-anim-fadein")
                                    }
                                    searchLock = false
                                },
                                300)
                        },
                        error: function () {
                            clearTimeout(waitIndex);
                            $(".search-loading-wait").removeClass("layui-anim-fadein");
                            $(".search-loading-wait").addClass("layui-anim-fadeout");
                            $(".search-loading").removeClass("layui-anim-fadein");
                            $(".search-loading").addClass("layui-anim-fadeout");
                            setTimeout(function () {
                                    $(".search-loading").addClass("layui-hide");
                                    $("#search-error-msg").html("啊哦，服务器出错了！");
                                    $(".search-error").removeClass("layui-hide");
                                    $(".search-error").addClass("layui-anim-fadein");
                                    searchLock = false
                                },
                                300)
                        }
                    })
                },
                300)
        },
        fristSearch ? 550 : 0);
    fristSearch = false;
}

function searchMore(keyword, type, source) {
    if (cache_type == type) {
        cache_source = source
    } else {
        cache_source = "miaobige";
        cache_type = type;
    }
    if (searchLock) return false;
    searchLock = true;
    $('#searchPanel').css('margin-top', '15px');
    searchReload();
    setTimeout(function () {
            $(".search-page").css('display', 'block');
            $(".search-page").removeClass("layui-anim-fadeout");
            $(".search-page").addClass("layui-anim-fadein");
            setTimeout(function () {
                    var waitIndex = setTimeout(function () {
                            $(".search-loading-wait").removeClass("layui-hide");
                            $(".search-loading-wait").addClass("layui-anim-fadein")
                        },
                        3000);
                    $.ajax({
                        url: './search_more/?name=' + keyword + '&type=' + type + '&source=' + source,
                        type: 'get',
                        success: function (a) {
                            clearTimeout(waitIndex);
                            $(".search-loading-wait").removeClass("layui-anim-fadein");
                            $(".search-loading-wait").addClass("layui-anim-fadeout");
                            $(".search-loading-wait").addClass("layui-hide");
                            $(".search-loading").removeClass("layui-anim-fadein");
                            $(".search-loading").addClass("layui-anim-fadeout");
                            setTimeout(function () {
                                    $(".search-loading").addClass("layui-hide");
                                    if (a.code == 0) {
                                        if (a.data != '') {
                                            layui.each(a.data,
                                                function (index, item) {
                                                    if (item[1] != '') {
                                                        if (item[3] !== '') {
                                                            $("#result_list").append("<li><p class='search-res-title'><a href='" + item[1] + "' target='_blank'>" + item[0] + "</a><span class='search-res-info'>" + item[2] + "</span></p><p class='search-res-link'><a href='" + item[1] + "' target='_blank'>" + item[3].substring(0, 100) + "..." + "</a></p></li>")
                                                        } else {
                                                            $("#result_list").append("<li><p class='search-res-title'><a href='" + item[1] + "' target='_blank'>" + item[0] + "</a><span class='search-res-info'>" + item[2] + "</span></p></li>")
                                                        }
                                                    }

                                                });
                                            if (type == 1) {
                                                $("#result_list").append("<li style='font-size: 13px;text-align: center;'>换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','wlzy');\" style='color: orange'>卧龙</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zdzy');\" style='color: orange'>最大</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','kyzy');\" style='color: orange'>酷云</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','okzy');\" style='color: orange'>OK</a></li>")
                                            }
                                            if (type == 3) {
                                                $("#result_list").append("<li style='font-size: 13px;text-align: center;'>换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','yier');\" style='color: orange'>壹贰</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','youtu');\" style='color: orange'>追书</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zhaishuyuan');\" style='color: orange'>宅书院</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','miaobige');\" style='color: orange'>妙笔阁</a></li>")
                                            }
                                            $("#result_list").removeClass("layui-hide");
                                            $("#result_list").addClass("layui-anim-fadein");
                                            $('#result_list').animate({
                                                    scrollTop: 0
                                                },
                                                0)
                                        } else {
                                            if (type == 1) {
                                                $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','wlzy');\" style='color: orange'>卧龙</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zdzy');\" style='color: orange'>最大</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','kyzy');\" style='color: orange'>酷云</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','okzy');\" style='color: orange'>OK</a>")
                                            }
                                            if (type == 3) {
                                                $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','yier');\" style='color: orange'>壹贰</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','youtu');\" style='color: orange'>追书</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zhaishuyuan');\" style='color: orange'>宅书院</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','miaobige');\" style='color: orange'>妙笔阁</a>")
                                            }
                                            $(".search-empty").removeClass("layui-hide");
                                            $(".search-empty").addClass("layui-anim-fadein")
                                        }
                                    } else {
                                        if (type == 1) {
                                            $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','wlzy');\" style='color: orange'>卧龙</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zdzy');\" style='color: orange'>最大</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','kyzy');\" style='color: orange'>酷云</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','okzy');\" style='color: orange'>OK</a>")
                                        }
                                        if (type == 3) {
                                            $('.source').html("换个搜索源: <a href=\"javascript:searchMore('" + keyword + "','" + type + "','yier');\" style='color: orange'>壹贰</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','youtu');\" style='color: orange'>追书</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','zhaishuyuan');\" style='color: orange'>宅书院</a> | <a href=\"javascript:searchMore('" + keyword + "','" + type + "','miaobige');\" style='color: orange'>妙笔阁</a>")
                                        }
                                        $("#search-error-msg").html(a.message);
                                        $(".search-error").removeClass("layui-hide");
                                        $(".search-error").addClass("layui-anim-fadein")
                                    }
                                    searchLock = false
                                },
                                300)
                        },
                        error: function () {
                            clearTimeout(waitIndex);
                            $(".search-loading-wait").removeClass("layui-anim-fadein");
                            $(".search-loading-wait").addClass("layui-anim-fadeout");
                            $(".search-loading").removeClass("layui-anim-fadein");
                            $(".search-loading").addClass("layui-anim-fadeout");
                            setTimeout(function () {
                                    $(".search-loading").addClass("layui-hide");
                                    $("#search-error-msg").html("啊哦，服务器出错了！");
                                    $(".search-error").removeClass("layui-hide");
                                    $(".search-error").addClass("layui-anim-fadein");
                                    searchLock = false
                                },
                                300)
                        }
                    })
                },
                300)
        },
        fristSearch ? 550 : 0);
    fristSearch = false;
    return false
}

function searchExtent() {
    var type = $('.search-select select').val();
    var keyword = $('.search-input').val();
    searchMore(keyword, type)
}


