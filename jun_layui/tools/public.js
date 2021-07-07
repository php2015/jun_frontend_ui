//分页跳转
function jumpToPage(totalPage, url)
{
	var inputId = document.getElementById('jumppage');
	var inputPage = inputId.value;
	if(inputPage > 0 && inputPage <= totalPage && parseInt(inputPage) == inputPage)
	{
		var url = url ? url + "&" : "";
		window.location.href="public.js-"/*tpa=http://tools.iters.cn/js/public.js?*/+url+"page="+inputPage;
	}
	else if(inputPage == '')
	{
		alert('请输入页码');
	}
	else
	{
		alert('页码错误');
	}
}
