layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel
        , form = layui.form;

    //常规轮播
    carousel.render({
        elem: '#now',
        width: '100%',
        arrow: 'always'
    });
    carousel.render({
        elem: '#later',
        width: '100%',
        arrow: 'always'
    });

})