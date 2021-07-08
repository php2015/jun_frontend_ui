//iframe自适应
$(window).on('resize', function() {
	var $content = $('.content');
	$content.height($(this).height() - 120);
	$content.find('iframe').each(function() {
		$(this).height($content.height());
	});
}).resize();


var vm = new Vue({
	el:'#rrapp',
	data:{
		main:"main.html",
        navTitle:"了解Generator"
	},
    methods: {
        donate: function () {
            layer.open({
                type: 1,
                area: ['235px', '333px'],
                shade: true,
                shadeClose: true,
                shade: 0.6,
                title: false, //不显示标题
                content: "<div>" +
                "<img width='235' height='333'   src='../images/weixin.png'>" +
                "</div>"
            });
        }
    }
});

//路由
var router = new Router();
var menus = ["main.html","generator.html"];
routerList(router, menus);
router.start();

function routerList(router, menus){
	for(var index in menus){
		router.add('#'+menus[index], function() {
			var url = window.location.hash;

			//替换iframe的url
			vm.main = url.replace('#', '');

			//导航菜单展开
			$(".treeview-menu li").removeClass("active");
			$("a[href='"+url+"']").parents("li").addClass("active");

			vm.navTitle = $("a[href='"+url+"']").text();
		});
	}
}
