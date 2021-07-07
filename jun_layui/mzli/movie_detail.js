var play_now = '';
layui.use(['element', 'form', 'layer', 'element'], function () {
    var form = layui.form;
    var layer = layui.layer;
    var element = layui.element;
    form.render('select');

    element.on('tab(zy_change)', function(data){
      var type = $(this).attr('data-type');
      if($('#zy_search_' + type).html().replace(/[\r\n]/g, '').replace(/[ ]/g, '') != ''){
          return false;
      }
      $('#zy_search_' + type).html('正在抓取此站点资源...');
      search_type(type)
    });

    $(".episode").click(function () {
        $(".episode").each(function () {
            $(this).removeClass("episode-selected");
        });
        $(this).addClass("episode-selected");
        if(os.isPc){
            $('#playPath').show()
            $('#playPath').attr("src",$('#play_api').val() + $(this).attr("data-url"));
        }else {
            window.open($('#play_api').val() + $(this).attr("data-url"));
        }

        play_now = $(this).attr("data-url");
        insertHistory($('#title').attr("data-title"), location.pathname + location.search, $(this).attr("data-url"), $(this).attr("data-index"), "movie", $(this).attr("data-site"))
    });

    if (localStorage.getItem("histories")) {
        var histories = JSON.parse(localStorage.getItem('histories'));
        histories.forEach((item, index, array) => {
            if (location.pathname + location.search == item.url) {
                play_now = item.currentUrl;
                $('#play_source').val(item.site);
                form.render('select');
                layer.msg("您上次观看到:" + item.currentTitle);
                element.tabChange('episodes', item.site)
                $(".layui-tab-content div").find("a").each(function () {
                    if($(this).attr("data-index") == item.currentTitle){
                        $(this).addClass("episode-selected");
                    }
                });
            }
        });
    }

    form.on('select(play_source)', function (data) {
        element.tabChange('episodes', data.value);
    });

    form.on('select(play_api)', function (data) {
        // window.open(data.value + play_now);
        if(os.isPc){
            $('#playPath').show()
            $('#playPath').attr("src",data.value + play_now);
        }else {
            window.open(data.value + play_now);
        }

    });


});

var os = function () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();