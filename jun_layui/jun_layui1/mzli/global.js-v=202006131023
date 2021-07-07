window.TCaptchaAppId = "";

console.log("小伙子, 来看源码了? 有需求可以联系我一波? QQ:657896145 php java python 不在话下");

$(window).on("load", function () {
    var winHeight = $(window).height();
    if (isForbidUA()) {
        $(".weixin-tip").css("height", winHeight);
        $(".weixin-tip").show();
    }
})

$(function () {
    $(".mobile_nav_icon, #mobile_nav a").bind('click',
        function () {
            var obj = $(".mobile_nav_icon").find('span');
            if (obj.eq(1).css('width') != '0px') {
                obj.eq(0).css('transform', 'rotate(-45deg)');
                obj.eq(1).css('transition', 'width 0s');
                obj.eq(1).css('width', '0px');
                obj.eq(2).css('transform', 'rotate(45deg)');
                $("#mobile_nav").fadeIn(100)
            } else {
                obj.eq(0).css('transform', 'rotate(0deg)');
                obj.eq(1).css('transition', 'width .5s ease');
                obj.eq(1).css('width', '20px');
                obj.eq(2).css('transform', 'rotate(0deg)');
                $("#mobile_nav").fadeOut(100)
            }
        });

    $('#toggle-sidebar-more-mob').bind('click',function () {
        $('#toggle-sidebar-more').click()
    });

    $("#syncData").bind('click',
        function () {
            $.ajax({
                url: 'http://mzli.club/history_put.html',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                data: {'history': JSON.stringify(localStorage.getItem("histories"))},
                type: 'post',
                success: function (a) {
                    data = a.data
                    layer.open({
                        type: 1
                        ,
                        title: false //不显示标题栏
                        ,
                        closeBtn: false
                        ,
                        offset: 't'
                        ,
                        area: '300px;'
                        ,
                        shade: .1
                        ,
                        id: 'LAY_layuipro' //设定一个id，防止重复弹出
                        ,
                        btn: ['关闭']
                        ,
                        btnAlign: 'c'
                        ,
                        moveType: 1 //拖拽模式，0或者1
                        ,
                        content: '<div style="padding: 10px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;"><center><img style="width: 90%;height:"90%" id="codeUrl" src="' + data.qr_code + '" /></center></div>'
                        ,
                        yes: function (layero) {
                            layer.closeAll();

                        }
                    });
                },
                error: function () {

                }
            })
        })
});

function isForbidUA() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = /android/i.test(ua);
    var isIOS = /(iPhone|iPad|iPod|IOS)/i.test(ua);
    const isIosQQ = (isIOS && / QQ/i.test(navigator.userAgent));
    const isAndroidQQ = (isAndroid && /MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser')));
    if (isIosQQ || isAndroidQQ) {
        return true;
    }
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //微信浏览器
        return true;
    }
}

function insertHistory(title, url, curUrl, curTtl, type, site) {
    var history = {
        "title": title,
        "url": url,
        "currentUrl": curUrl,
        "currentTitle": curTtl,
        "type": type,
        "site": site
    }
    var histories = localStorage.getItem('histories') ? JSON.parse(localStorage.getItem('histories')) : [];

    for (var i = 0; i < histories.length; i++) {
        if (histories[i].type == type && histories[i].url == url) {
            histories.splice(i, 1); // 删除之前的历史记录
            break;
        }
    }
    // 添加到历史记录最开始
    histories.unshift(history);
    // 限定播放历史最多记录10条
    if (histories.length > 10) histories.length = 10;
    localStorage.setItem("histories", JSON.stringify(histories));
}

function getHistory() {
    if (localStorage.getItem("histories")) {
        var histories = JSON.parse(localStorage.getItem('histories'));
        //组装记录
        var str = '';
        histories.forEach((item, index, array) => {
            str = str + '<a href="' + item.url + '"><blockquote class="layui-elem-quote layui-quote-nm">' + item.title + '-' + item.currentTitle + '-' + item.type + '</blockquote></a>';
        });
        $('.histories').html(str)
    }
}

$('#sidebar-more').simplerSidebar({
    opener: '#toggle-sidebar-more',
    sidebar: {
        align: 'right',
        width: 280,
    },
    animation: {
        duration: 300,
        easing: 'swing'
    },
    top: 50
});

