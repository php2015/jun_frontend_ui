<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>鲜果热点 让阅读流行起来</title>
<meta name="keywords" content="RSS RSS阅读器 Feed 阅读器 在线阅读器 博客订阅 Blog 鲜果"/>
<meta name="description" content="鲜果 中国领先的RSS阅读分享平台,RSS阅读器"/>
<link rel="alternate" type="application/rss+xml" href="http://feed.feedsky.com/xianguoblog" title="鲜果日志" />
<link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
<link rel="stylesheet" type="text/css" href="http://static.xgres.com/sns-static/v2/css/common.css?v=36" />
<link rel="stylesheet" type="text/css" href="http://static.xgres.com/sns-static/v2/css/classic.css?v=52"/>
<link rel="stylesheet" type="text/css" href="http://static.xgres.com/sns-static/v2/css/hot.css?v=26" />


<script type="text/javascript" src="/static/js/jquery-1.6.4.min.js"></script>
</head>
<body>
<div style="position:absolute;left:0;top:0;" id="div_mp3player"><object id="flash_mp3player" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="1" height="1" id="uploader" align="middle">
	<param name="allowScriptAccess" value="sameDomain" />
	<param name="allowFullScreen" value="false" />
	<param name="movie" value="/static/flash/mp3player.swf?6" />
	<param name="menu" value="false">
	<param name="quality" value="high" />
	<param name="bgcolor" value="#ffffff" />
	<param name="wmode" value="transparent" />
	<embed name="flash_mp3player" src="/static/flash/mp3player.swf?6" menu="false" quality="high" wmode="transparent" bgcolor="#ffffff" width="1" height="1" name="uploader" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
	</object>
</div>
<div id="header">
	<div id="header-wrap">
		<div id="header-wrapper" class="clearfix">
			<div id="header-logo"><a onfocus="this.blur();" href="/">鲜果</a></div>
						<div id="header-nav">
				<ul class="menu clearfix">
									<li><a class="link selected" href="/hot"><span>热点</span></a></li>
					<li><a class="link" href="/book"><span>读书</span></a></li>
					<li><a class="link" href="/bang"><span>鲜果榜</span></a></li>
				</ul>
			</div>
			<div class="search-bar">
				<form class="clearfix" action="/search" method="get">
					<input type="hidden" name="searchType" value="hot" />
					<input class="i-txt" type="text" name="keyword" value="" spellcheck="false" autocomplete="off" />
					<input class="i-sub" type="submit" value="" />
				</form>
				<div id="searchResult" class="search-result"></div>
			</div>
			<div id="header-noti-wrap">
				<div id="header-noti">
					<div class="noti-b-h"></div>
					<div class="noti-wrap">
						<a id="header-noti-close" href="javascript:void(0);">x</a>
						<div id="header-noti-cnt" class="noti-cnt"></div>
					</div>
					<div class="noti-b-h"></div>
				</div>
			</div>
									<div id="header-menu" class="clearfix">
								<ul class="menu clearfix">
					<li><a class="no-icon-link" href="/login?rurl=%2Fre%2F"><span>登录</span></a></li>
					<li><a class="no-icon-link" href="/register"><span>注册</span></a></li>
				</ul>
								<div class="c"></div>
			</div>
					</div>
	</div>
</div>
<script type="text/javascript">
(function($){
	//search
	var ctlName = 'hot';
	var def_kw = '搜索人名或内容';

	if (ctlName == "hot") {
		def_kw = '搜索人名或文章';
	} else if (ctlName =="book") {
		def_kw = '搜索图书或作者';
	} else if (ctlName =="feed") {
		def_kw = '搜索频道或作者';
	}

	if($('.search-bar .i-txt').val() == ''){
		$('.search-bar .i-txt').val(def_kw);
	}
	if($('.search-bar .i-txt').val() != def_kw){
		$('.search-bar .i-txt').css('color', '#333');
	}
	$('.search-bar .i-txt').bind('focus', function(){
		if($(this).val() == def_kw){
			$(this).val('');
		}
		$(this).css('color', '#333');
		//$('#searchResult').show();
	}).bind('blur', function(){
		if($(this).val() == ''){
			$(this).val(def_kw);
		}
		if($(this).val() == def_kw){
			$(this).css('color', '#CCC');
		}
		//$('#searchResult').hide();
	});
	$('.search-bar form').bind('submit', function(){
		var v = $(this).find('.i-txt').val();
		if(v == '' || v == def_kw){
			$(this).find('.i-txt').blur().focus();
			return false;
		}
	});

	var dropAccountSignal;
	$('#menuAccount').hover(function(){
		if(dropAccountSignal){
			clearTimeout(dropAccountSignal);
		}
		dropAccountSignal = setTimeout(function(){
			$('#dropMenuAccount').show();
		}, 200);
		$('#menuAccount').addClass('select');
	}, function(){
		if(dropAccountSignal){
			clearTimeout(dropAccountSignal);
		}
		dropAccountSignal = setTimeout(function(){
			$('#dropMenuAccount').hide();
		}, 200);
		$('#menuAccount').removeClass('select');
	});
	$('#dropMenuAccount').hover(function(){
		if(dropAccountSignal){
			clearTimeout(dropAccountSignal);
		}
		$('#menuAccount').addClass('select');
	}, function(){
		if(dropAccountSignal){
			clearTimeout(dropAccountSignal);
		}
		dropAccountSignal = setTimeout(function(){
			$('#dropMenuAccount').hide();
			$('#menuAccount').removeClass('select');
		}, 200);
	});

	$('.link-pop').hover(function(event){
		var target = $(event.target);
		var offset = target.offset();
		var title = target.attr("_title");
		var key = target.attr("_key");
		
		if($('#nav-tips-'+key).length>0) {
			$('#nav-tips-'+key).fadeIn(100);
		}else{
			var tips = $('<div id="nav-tips-'+key+'"><div style="position:absolute;background:url(/static/v2/images/arrow_down_1.gif) 0 0 no-repeat;top:-5px;left:20px;width:9px;height:5px;"></div>'+title+'</div>');
			tips.css('position','absolute');
			tips.css('left',(offset.left-15)+"px");
			tips.css('top',(offset.top+30)+"px");
			tips.css('background-color',"#000");
			tips.css('color',"#fff");
			tips.css('width',"50px");
			tips.css('text-align',"center");
			tips.css('padding',"6px 0");
			tips.css('display',"none");
			$(document.body).append(tips);
			tips.fadeIn(100);
		}
	},function(event){
		var target = $(event.target);
		var key = target.attr("_key");
		$('#nav-tips-'+key).fadeOut(100);
	});
	
})(jQuery);
</script><style type="text/css">
#main{
	background:#fff url(/static/v2/images/focus.png) repeat-x scroll 0 -360px;
}
</style>
<div id="cycle-slide-wrap">
	<div id="cycle-slide-wrapper">
		<div id="cycle-slide">
			<div id="cycle-slide-show">
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30079704" class="hot-top-title" target="_blank" href="http://w2china1980.blog.sohu.com/217271253.html"><img src="http://static.xgres.com/xianguo_com/topitem/28/p_1337660328.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30079704" class="hot-top-title" href="http://w2china1980.blog.sohu.com/217271253.html" style="font-size:16px;" title="杨幂罕见旧照被扒出揭秘整容真相(图)">杨幂罕见旧照被扒出揭秘整容真相(图)</a></h4>
		</div>
		<div class="summary">
			<a href="/1199159" class="item-feed" title="老李杂说" target="_blank">老李杂说</a>
			杨幂最近杯具了。先是在戛纳国际电影节被封“淡定姐”，原因是幂走戛纳红毯因滞留太久屡遭当地保安几度驱赶，杨幂还因气愤对保安竖了中指，并附上了视频。后被证实杨幂竖的不是中指，而是食指，滞留红毯是为了照顾到更多的中国媒体。而后，杨幂和刘恺威在微博上晒幸福时说英语，又被网友挑错。但网络上的八卦却远没有结束。有网友扯出了先前疯传的杨幂整容照，是真是假，相信大家一看便知，因为图片最具有冲击力。 <a doingsid="30079704" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://w2china1980.blog.sohu.com/217271253.html">查看原文&raquo;</a>
			<span class="item-time">今天12:18</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/22d6w#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30077006" class="hot-top-title" target="_blank" href="http://news.163.com/12/0522/04/8235RJSN00011229.html"><img src="http://static.xgres.com/xianguo_com/topitem/42/p_1337671242.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30077006" class="hot-top-title" href="http://news.163.com/12/0522/04/8235RJSN00011229.html" style="font-size:16px;" title="“高帅富”败光家产流落街头 身着正牌LV抢超市">“高帅富”败光家产流落街头 身着正牌LV抢超市</a></h4>
		</div>
		<div class="summary">
			<a href="/1000463" class="item-feed" title="网易新闻" target="_blank">网易新闻</a>
			25岁的董伟，身高1.83米，仪表堂堂，穿着正版LV衬衫，巴宝莉裤子，斜跨爱马仕包……就是这样一个资格的“高帅富”，却因为接连遭遇婚姻、事业的失败而流落成都街头。没钱用，又饿慌了，于是他两次在成都科华北路抢钱。 <a doingsid="30077006" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://news.163.com/12/0522/04/8235RJSN00011229.html">查看原文&raquo;</a>
			<span class="item-time">今天15:21</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/22cp0#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30077188" class="hot-top-title" target="_blank" href="http://anjiaxin2695.blog.163.com/blog/static/85129329201242264110531"><img src="http://static.xgres.com/xianguo_com/topitem/1/p_1337654801.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30077188" class="hot-top-title" href="http://anjiaxin2695.blog.163.com/blog/static/85129329201242264110531" style="font-size:16px;" title="成龙戛纳与众女星合影享尽艳福令人艳羡(图)">成龙戛纳与众女星合影享尽艳福令人艳羡(图)</a></h4>
		</div>
		<div class="summary">
			<a href="/1085294" class="item-feed" title="么么" target="_blank">么么</a>
			 第65届戛纳电影节，电影《十二生肖》（Chinese Zodiac）户外发布会。成龙率领众主创权相佑、罗娜-韦斯贝克尔( Laura Weissbecker)、姚星彤、张蓝心、廖凡等亮相。电影制片人布雷特·拉特纳(Brett Ratner)也出席活动。在发布会进行过程中，成龙大哥拥搂多位女星和记者照面，这等“艳福”羡煞旁人，看来成龙大哥是越老越有魅力。 <a doingsid="30077188" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://anjiaxin2695.blog.163.com/blog/static/85129329201242264110531">查看原文&raquo;</a>
			<span class="item-time">今天10:46</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/22crW#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30077376" class="hot-top-title" target="_blank" href="http://www.cnbeta.com/articles/188358.htm"><img src="http://static.xgres.com/xianguo_com/topitem/22/p_1337675822.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30077376" class="hot-top-title" href="http://www.cnbeta.com/articles/188358.htm" style="font-size:16px;" title="5天涌现584万吃货 纪录片引爆“舌尖上的淘宝”">5天涌现584万吃货 纪录片引爆“舌尖上的淘宝”</a></h4>
		</div>
		<div class="summary">
			<a href="/1000543" class="item-feed" title="cnBeta" target="_blank">cnBeta</a>
			这几天，央视热播的纪录片《舌尖上的中国》不仅让观众看得津津有味，更是引发网络上各种地方特产热卖，很多观众一边看电视，一边在淘宝上按图索骥购买相关食材。淘宝昨天发布的最新统计数据显示，纪录片开播5天来，有超过584万人次的网友上网寻找零食特产，是前期同类产品搜索量的数倍。 <a doingsid="30077376" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://www.cnbeta.com/articles/188358.htm">查看原文&raquo;</a>
			<span class="item-time">29分钟前</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/22cuY#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30052084" class="hot-top-title" target="_blank" href="http://luo.bo/25022/"><img src="http://static.xgres.com/xianguo_com/topitem/81/p_1337674481.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30052084" class="hot-top-title" href="http://luo.bo/25022/" style="font-size:16px;" title="清华服装节开幕 周冬雨与奶茶MM同场拼清纯">清华服装节开幕 周冬雨与奶茶MM同场拼清纯</a></h4>
		</div>
		<div class="summary">
			<a href="/1122075" class="item-feed" title="萝卜网" target="_blank">萝卜网</a>
			2012年5月20日，北京，清华大学服饰文化节开幕，周冬雨等明星联袂助阵，活动仪式更由清华大学新校花奶茶妹妹章泽天主持。两人正面PK实属少见哦！ <a doingsid="30052084" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://luo.bo/25022/">查看原文&raquo;</a>
			<span class="item-time">52分钟前</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/225V2#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30077370" class="hot-top-title" target="_blank" href="http://www.cnbeta.com/articles/188356.htm"><img src="http://static.xgres.com/xianguo_com/topitem/56/p_1337671656.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30077370" class="hot-top-title" href="http://www.cnbeta.com/articles/188356.htm" style="font-size:16px;" title="iPhone充电器内部拆解：这玩意简直就是艺术品！">iPhone充电器内部拆解：这玩意简直就是艺术品！</a></h4>
		</div>
		<div class="summary">
			<a href="/1000543" class="item-feed" title="cnBeta" target="_blank">cnBeta</a>
			苹果向来以对细节的关注而闻名，旗下所有产品的内部和外部设计都让人欲罢不能。公司所有产品的设计理念都相同，不论是1200美元的MacBook Pro还是30美元的iPhone充电器。事实上，苹果iPhone充电器的内部设计非常复杂和高端，这让iPhone充电器效率更高并且更安全。这也是iPhone充电器比其他手机品牌充电器价格更高的原因之一。 <a doingsid="30077370" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://www.cnbeta.com/articles/188356.htm">查看原文&raquo;</a>
			<span class="item-time">今天15:27</span>
		</div>
		<div class="item-operation clearfix">
						<div class="item-beings-list clearfix">
								<a class="item-beings" href="/1273530" title="yanbinshou">
					<img alt="yanbinshou" src="/static/img/avatar_48.gif" /></a>
								<a class="fl" target="_blank" href="/doing/22cuS#formComment">等人正在讨论…</a>
			</div>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30099725" class="hot-top-title" target="_blank" href="http://blog.sina.com.cn/s/blog_4911bd8a0102e42l.html"><img src="http://static.xgres.com/xianguo_com/topitem/79/p_1337659579.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30099725" class="hot-top-title" href="http://blog.sina.com.cn/s/blog_4911bd8a0102e42l.html" style="font-size:16px;" title="崀山天梯妹网络爆红，想挤走芙蓉姐姐还缺火候？">崀山天梯妹网络爆红，想挤走芙蓉姐姐还缺火候？</a></h4>
		</div>
		<div class="summary">
			<a href="/1000978" class="item-feed" title="阳光博客" target="_blank">阳光博客</a>
			 近日，网上爆出一个被大家称为崀山天梯妹的女子，因其皮肤黝黑又被大家称为包大人亲妹。据了解，大家所称的崀山天梯妹是崀山风景区的一名导游，因为清晨神秘出现在高耸陡峭的天梯上一夜成名。 网友惊呼，天梯妹的出现，让曾经的网络红人黯然失色，其淳朴气质和纯天然长相非常吸引大众亲睐，足够成为未来网络第一红人。 <a doingsid="30099725" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://blog.sina.com.cn/s/blog_4911bd8a0102e42l.html">查看原文&raquo;</a>
			<span class="item-time">今天12:06</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/22ijr#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30085835" class="hot-top-title" target="_blank" href="http://blog.sina.com.cn/s/blog_4d08765e0102e0fh.html"><img src="http://static.xgres.com/xianguo_com/topitem/63/p_1337656663.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30085835" class="hot-top-title" href="http://blog.sina.com.cn/s/blog_4d08765e0102e0fh.html" style="font-size:16px;" title="留法男文凭遭质疑应聘现场晕倒折射啥">留法男文凭遭质疑应聘现场晕倒折射啥</a></h4>
		</div>
		<div class="summary">
			<a href="/1000917" class="item-feed" title="木子李" target="_blank">木子李</a>
			职场应聘节目《非你莫属》近期迎来一位特殊嘉宾：自称留学法国十年的郭杰，拿到三个文凭回到中国，三个文凭三个专业各不相同。但在节目过程中，他暴露出法语水平不足的问题，而对于专业知识的考察他的回答也漏洞百出，最后更被面试boss文颐指BAC+5的文凭没有含金量，相当于专科毕业。在这样的高压下，他竟然晕倒在了节目现场。 <a doingsid="30085835" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://blog.sina.com.cn/s/blog_4d08765e0102e0fh.html">查看原文&raquo;</a>
			<span class="item-time">今天11:18</span>
		</div>
		<div class="item-operation clearfix">
						<div class="item-beings-list clearfix">
								<a class="item-beings" href="/1265358" title="寒风j">
					<img alt="寒风j" src="/static/img/avatar_48.gif" /></a>
								<a class="item-beings" href="/1264219" title="fiona3211">
					<img alt="fiona3211" src="http://static.xgres.com/lianbo/avatar/1264219/48/1337307241" /></a>
								<a class="fl" target="_blank" href="/doing/22eHp#formComment">等人正在讨论…</a>
			</div>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30065815" class="hot-top-title" target="_blank" href="http://www.modeko.cn/love-1944-2.html"><img src="http://static.xgres.com/xianguo_com/topitem/43/p_1337676243.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30065815" class="hot-top-title" href="http://www.modeko.cn/love-1944-2.html" style="font-size:16px;" title="波兰摄影师关于纯爱的摄影，想歪的孩子都不懂艺术">波兰摄影师关于纯爱的摄影，想歪的孩子都不懂艺术</a></h4>
		</div>
		<div class="summary">
			<a href="/1210809" class="item-feed" title="modekoimpress" target="_blank">modekoimpress</a>
			这是波兰摄影师Paulina Wierzgacz拍摄的一组干净的纯爱人物摄影作品，在摄影界好评如潮。据Paulina Wierzgacz说，他希望用这组作品唤起人们对纯爱的追求。 <a doingsid="30065815" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://www.modeko.cn/love-1944-2.html">查看原文&raquo;</a>
			<span class="item-time">22分钟前</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/229uv#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
								<div class="cycle-item-wrap">
										<div class="cycle-thumb"><a doingsid="30071991" class="hot-top-title" target="_blank" href="http://jiaren.org/2012/05/22/fangxiang/"><img src="http://static.xgres.com/xianguo_com/topitem/57/p_1337650157.jpg" /></a></div>
					<div class="cycle-item">
						<div class="item">
		<div class="with_round_rect">
		<div class="item_title">
			<h4><a target="_blank" doingsid="30071991" class="hot-top-title" href="http://jiaren.org/2012/05/22/fangxiang/" style="font-size:16px;" title="我们正在社会上裸奔，且找不到方向">我们正在社会上裸奔，且找不到方向</a></h4>
		</div>
		<div class="summary">
			<a href="/1000398" class="item-feed" title="佳人" target="_blank">佳人</a>
			人我们正处在一个尴尬的年纪。社会把我们青涩的外衣脱了，却还不肯给我们换上成熟的那件。妖怪般的大都市鲸呑了许多人的热血和梦想，却不肯给他们一份工作一套房。往前推几岁，我们有青春，有梦想，更有大把的时间。往后推几岁，我们有房子，有孩子，有真朋友。可现在我们什么都没有，我们正在社会上裸奔，且找不到方向。 <a doingsid="30071991" class="hot-top-title" style="color:#c0c0c0;" target="_blank" href="http://jiaren.org/2012/05/22/fangxiang/">查看原文&raquo;</a>
			<span class="item-time">今天09:30</span>
		</div>
		<div class="item-operation clearfix">
						<a class="icon-add" href="/doing/22b67#formComment">评论</a>
					</div>
	</div>
</div>					</div>
										<div class="c"></div>
				</div>
							</div>
			<div id="cycle-slide-prev">
				<div class="cycle-sthumb"></div>
				<div class="cycle-shadow"></div>
				<a href="javascript:void(0);">&lt;</a>
			</div>
			<div id="cycle-slide-next">
				<div class="cycle-sthumb"></div>
				<div class="cycle-shadow"></div>
				<a href="javascript:void(0);">&gt;</a>
			</div>
			<div id="cycle-slide-pager"></div>
		</div>
	</div>
</div>

<div id="main">
	<div id="main-wrap">
		<div id="main-wrapper">
			<div id="container">
			<div class="wide">
	<div class="box">
		<div class="box-header">
						<h3>最新热点</h3>
					</div>
		<ul id="timeline" class="doings_list only_one topline">
				<li id="doings-30118995" class="entry" doingsId="30118995" mark="1000035">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.qiushibaike.com/?2012年05月21日 糗事" target="_blank" title="2012年05月21日 糗事 TOP 10">2012年05月21日 糗事 TOP 10</a></div>
				<div id="doings-summary-30118995" class="entry-content-wrap clearfix">
						<div class="entry_content text-content">简短不割,多少年前没什么钱,和同学几个相约爬华山,分工背东西,有的背外套,有的背水,我背了一包苹果,结果半路大家走散了,我抱着一包苹果在华山顶上冻了一晚上,背衣服的饿了一晚上,背水的哥们又饿又冻了一晚  			顶1952::  			拍-3...</div>
		</div>
		<div id="doings-desc-30118995" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30118995" class="info">
			<span class="source"><a href="/doing/22nkf" class="pubtime" time="1337675419" target="_blank">36分钟前</a>&nbsp;<a href="/1000035" target="_blank">来自糗事百科</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1000035" class="avatar" title="糗事百科"><img src="http://static.xgres.com/lianbo/avatar/1000035/48/1303116494" alt="糗事百科"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30117292" class="entry" doingsId="30117292" mark="我爱书摘">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://xianguo.com/book/chapter/710778" target="_blank" title="脱你衣服只需3秒钟，给你披上婚纱要3年">脱你衣服只需3秒钟，给你披上婚纱要3年</a></div>
				<div id="doings-summary-30117292" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://xianguo.com/book/chapter/710778" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=200&u=http%3A%2F%2Fstatic.xgres.com%2Fxianguo_net%2Fbookcover%2Ff9%2F6d%2F3012973_b.jpg%3F2" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">笑笑是一个典型的宅女。她喜欢用网络交友。当她将择友途径锁定在交友网站上时，很快便结识了一个条件不错又聊得来的男孩。第一次见面还感觉不错，没有像传说中的网友那样见光死。男孩的口才很好，竭力表达对笑笑的爱慕之情，说笑笑就是他喜欢的那种类型，他找...</div>
		</div>
		<div id="doings-desc-30117292" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30117292" class="info">
			<span class="source"><a href="/doing/22mSM" class="pubtime" time="1337674758" target="_blank">40分钟前</a>&nbsp;<a href="/1227112" target="_blank">来自我爱书摘</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1227112" class="avatar" title="我爱书摘"><img src="http://static.xgres.com/lianbo/avatar/1227112/48/1334314888" alt="我爱书摘"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30114217" class="entry" doingsId="30114217" mark="1202638">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.managershare.com/2012/05/22/googles-advertising-concept/" target="_blank" title="谷歌的广告观：多屏幕的投放广告">谷歌的广告观：多屏幕的投放广告</a></div>
				<div id="doings-summary-30114217" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://www.managershare.com/2012/05/22/googles-advertising-concept/" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fwww.managershare.com%2Fwp-content%2Fplugins%2Fwp-o-matic%2F4c378_p61-ggd.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：businessvalue  谷歌相信自己已经找到一个正确的方向：无论受众处在互联网上的哪个地方，只要在合适的时间和地点，向恰当的受众，展示恰当的广告。  从创立之日起，谷歌这家公司就在一直颠覆人们对互联网广告的想象，时至今日，更是如...</div>
		</div>
		<div id="doings-desc-30114217" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30114217" class="info">
			<span class="source"><a href="/doing/22m5b" class="pubtime" time="1337671803" target="_blank">今天15:30</a>&nbsp;<a href="/1202638" target="_blank">来自经理人分享</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1202638" class="avatar" title="经理人分享"><img src="http://static.xgres.com/lianbo/avatar/1202638/48/1329099588" alt="经理人分享"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-29985375" class="entry" doingsId="29985375" mark="我爱书摘">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://xianguo.com/book/chapter/550895" target="_blank" title="女生们遇到男露阴癖的时候该怎么办？">女生们遇到男露阴癖的时候该怎么办？</a></div>
				<div id="doings-summary-29985375" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://xianguo.com/book/chapter/550895" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=200&u=http%3A%2F%2Fstatic.xgres.com%2Fxianguo_net%2Fbookcover%2Ff4%2Fb3%2F3011763_b.jpg%3F2" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">来讲个近一点的重口味吧。近到什么程度？我亲身参与！  那还是一个夏日的夜晚，我走在回家路上必经的小花园里。行至半程的时候，右侧的灌木丛中传出了一阵低沉的嗡嗡声。一开始并不明显，待到我再向前走了几米，突然间，灌木丛被扒开，赫然出现了一个黑影！...</div>
		</div>
		<div id="doings-desc-29985375" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-29985375" class="info">
			<span class="source"><a href="/doing/21Oz5" class="pubtime" time="1337511601" target="_blank">今天15:28</a>&nbsp;<a href="/1227112" target="_blank">来自我爱书摘</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num">(1)</em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num">(3)</em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1227112" class="avatar" title="我爱书摘"><img src="http://static.xgres.com/lianbo/avatar/1227112/48/1334314888" alt="我爱书摘"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30111969" class="entry" doingsId="30111969" mark="1153390">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://finance.jrj.com.cn/2012/05/22151013224134.shtml?formrss" target="_blank" title="月薪5000元招不到送水工？老板无奈只好亲自上阵">月薪5000元招不到送水工？老板无奈只好亲自上阵</a></div>
				<div id="doings-summary-30111969" class="entry-content-wrap clearfix">
						<div class="entry_content text-content">没到六月，杭城不少水站纷纷打出“急招送水工人”的广告。传说有老板和客户抱怨，现在5000元都招不到好的送水工。  记者调查发现，月薪5000元招不到送水工，可能是某些地区的个案。但今年水站小老板普遍感到烦恼的是，愿意来当送水工的年轻的求职...</div>
		</div>
		<div id="doings-desc-30111969" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30111969" class="info">
			<span class="source"><a href="/doing/22luV" class="pubtime" time="1337670336" target="_blank">今天15:22</a>&nbsp;<a href="/1153390" target="_blank">来自金融界</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1153390" class="avatar" title="金融界"><img src="http://static.xgres.com/lianbo/avatar/1153390/48/1317366187" alt="金融界"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30112214" class="entry" doingsId="30112214" mark="1119994">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.iceo.com.cn/chuangye/73/2012/0522/248594.shtml" target="_blank" title="每个女生都有一个小店梦，警惕8个最糟糕创业开局">每个女生都有一个小店梦，警惕8个最糟糕创业开局</a></div>
				<div id="doings-summary-30112214" class="entry-content-wrap clearfix">
						<div class="entry_content text-content">“每个女生都有一个小店梦”，嗯，咖啡店、鲜花店，悲剧的是有一些女生的这个“小店梦”真的付诸实现了。  你可能还是一个看到了好多个成功故事的人。你脑子里可能还想着，“连XXX都成功了”?.悲剧的是，你真的就辞职了。  别做梦了!你连叫个“亲”...</div>
		</div>
		<div id="doings-desc-30112214" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30112214" class="info">
			<span class="source"><a href="/doing/22lyS" class="pubtime" time="1337671010" target="_blank">今天15:21</a>&nbsp;<a href="/1119994" target="_blank">来自中国企业家</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1119994" class="avatar" title="中国企业家"><img src="http://static.xgres.com/lianbo/avatar/1119994/48/1309145569" alt="中国企业家"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30110992" class="entry" doingsId="30110992" mark="1119994">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.iceo.com.cn/chuangye/60/2012/0518/248402.shtml" target="_blank" title="24岁女孩，从负债7万到年薪30万">24岁女孩，从负债7万到年薪30万</a></div>
				<div id="doings-summary-30110992" class="entry-content-wrap clearfix">
						<div class="entry_content text-content">2008年9月，大三的我以全院第五的成绩被选为法国公派留学生，3+1项目，国内3+国外1,拿双学位。来的时候法语A2水平，就是最基础的水平。  2009年3月，法语TCF考试428分，超过了同来的在中国读了3年法语，来这里读了一年的法语系同...</div>
		</div>
		<div id="doings-desc-30110992" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30110992" class="info">
			<span class="source"><a href="/doing/22lfa" class="pubtime" time="1337670262" target="_blank">今天15:08</a>&nbsp;<a href="/1119994" target="_blank">来自中国企业家</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1119994" class="avatar" title="中国企业家"><img src="http://static.xgres.com/lianbo/avatar/1119994/48/1309145569" alt="中国企业家"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30095835" class="entry" doingsId="30095835" mark="1001110">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://article.yeeyan.org/view/288962/288406" target="_blank" title="感到沮丧？不防在公园散散步，可能会提高你的情绪">感到沮丧？不防在公园散散步，可能会提高你的情绪</a></div>
				<div id="doings-summary-30095835" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://article.yeeyan.org/view/288962/288406" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fi.dailymail.co.uk%2Fi%2Fpix%2F2012%2F05%2F16%2Farticle-2144841-00CD2C3800000578-680_233x423.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：王木木  译者  王木木  回归到自然：对于那些沮丧的患者来说，在郊区散步发现能增强记忆。研究员已经发现在公园散步能帮那些处在绝望中的人。他们研究是否自然地散步能改善临床忧郁症患者的心情。这项研究也测试了一个发展于认知的科学领域的理论...</div>
		</div>
		<div id="doings-desc-30095835" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30095835" class="info">
			<span class="source"><a href="/doing/22hiH" class="pubtime" time="1337655347" target="_blank">今天14:37</a>&nbsp;<a href="/1001110" target="_blank">来自译言</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1001110" class="avatar" title="译言"><img src="http://static.xgres.com/lianbo/avatar/1001110/48/1308216811" alt="译言"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30102684" class="entry" doingsId="30102684" mark="1122425">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://go.rss.sina.com.cn/redirect.php?url=http://ent.sina.com.cn/s/h/2012-05-22/12093636800.shtml" target="_blank" title="刘若英庆祝微博粉丝过千万开心大笑">刘若英庆祝微博粉丝过千万开心大笑</a></div>
				<div id="doings-summary-30102684" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://go.rss.sina.com.cn/redirect.php?url=http://ent.sina.com.cn/s/h/2012-05-22/12093636800.shtml" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fi3.sinaimg.cn%2Fent%2Fs%2Fh%2F2012-05-22%2FU6203P28T3D3636800F326DT20120522120907.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">刘若英微博粉丝过千万发开心大笑照  				  					  新浪娱乐讯 2010年1月14日刘若英(微博)落户了新浪微博，从此奶茶便在微博上与粉丝们分享生活，分享人生。也常在微博中参与公益活动，帮助更多人。今天(5月22日)奶茶十分兴...</div>
		</div>
		<div id="doings-desc-30102684" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30102684" class="info">
			<span class="source"><a href="/doing/22j5a" class="pubtime" time="1337661147" target="_blank">今天14:30</a>&nbsp;<a href="/1122425" target="_blank">来自新浪娱乐</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1122425" class="avatar" title="新浪娱乐"><img src="http://static.xgres.com/lianbo/avatar/1122425/48/1308566737" alt="新浪娱乐"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30104793" class="entry" doingsId="30104793" mark="1057653">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.yseeker.com/archives/7186.html" target="_blank" title="雅巴联姻“七年之痒”大事件回放">雅巴联姻“七年之痒”大事件回放</a></div>
				<div id="doings-summary-30104793" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://www.yseeker.com/archives/7186.html" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fwww.yseeker.com%2Fwp-content%2Fuploads%2F2011%2F10%2FImg321772573.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：maqingxi  2005年8月11日，雅虎与阿里巴巴集团在北京联合宣布，雅虎以10亿美元加上雅虎中国的全部资产获得阿里巴巴集团39%的股权。  2009年1月，雅虎新任CEO卡罗尔·巴茨上台，雅虎与阿里巴巴之间的矛盾公开激化。  ...</div>
		</div>
		<div id="doings-desc-30104793" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30104793" class="info">
			<span class="source"><a href="/doing/22jDb" class="pubtime" time="1337663735" target="_blank">今天14:24</a>&nbsp;<a href="/1057653" target="_blank">来自品味雅虎</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1057653" class="avatar" title="品味雅虎"><img src="http://static.xgres.com/lianbo/avatar/1057653/48/1295929003" alt="品味雅虎"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30104798" class="entry" doingsId="30104798" mark="1057653">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.yseeker.com/archives/7188.html" target="_blank" title="谢文：雅虎71亿美元出售阿里股权是无心恋战">谢文：雅虎71亿美元出售阿里股权是无心恋战</a></div>
				<div id="doings-summary-30104798" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://www.yseeker.com/archives/7188.html" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fwww.yseeker.com%2Fwp-content%2Fuploads%2F2012%2F05%2Fxiewen.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：maqingxi  在时隔7年之后，雅虎终于将手上最优质的资产，卖掉了一半。这到底是主动转型，还是一个无奈之举呢？互联网分析人士、前雅虎中国总裁谢文表示：这件事主导权在雅虎，此次双方能够达成交易说明雅虎本身发生了变化，出售股权是无心恋...</div>
		</div>
		<div id="doings-desc-30104798" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30104798" class="info">
			<span class="source"><a href="/doing/22jDg" class="pubtime" time="1337663737" target="_blank">今天14:24</a>&nbsp;<a href="/1057653" target="_blank">来自品味雅虎</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1057653" class="avatar" title="品味雅虎"><img src="http://static.xgres.com/lianbo/avatar/1057653/48/1295929003" alt="品味雅虎"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30105440" class="entry" doingsId="30105440" mark="1199167">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.zhihu.com/question/19953364/answer/14481646" target="_blank" title="马克思主义哲学在哲学史中的地位如何？">马克思主义哲学在哲学史中的地位如何？</a></div>
				<div id="doings-summary-30105440" class="entry-content-wrap clearfix">
						<div class="entry_content text-content">作者：陆丁1. 哲学vs. 政治哲学：贡献  马克思至少是最重要的政治哲学家之一。除非政治哲学不算哲学而只是“思想”或者“社会思想”。所以，这个表不能像@<a href="/n/%E7%BD%97%E5%BF%83%E6%BE%84%E9%82%A3%E4%B9%88%E5%88%97">罗心澄那么列</a>。至少还得包括西塞罗、阿尔法拉比、李维、阿奎那、马基雅维利、路德、加尔文、霍布斯、卢...</div>
		</div>
		<div id="doings-desc-30105440" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30105440" class="info">
			<span class="source"><a href="/doing/22jNC" class="pubtime" time="1337664141" target="_blank">今天14:24</a>&nbsp;<a href="/1199167" target="_blank">来自知乎每日精选</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num">(1)</em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1199167" class="avatar" title="知乎每日精选"><img src="http://static.xgres.com/lianbo/avatar/1199167/48/1328607264" alt="知乎每日精选"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30105630" class="entry" doingsId="30105630" mark="1170698">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.sootoo.com/content/285050.shtml" target="_blank" title="揭秘Facebook高管住宅">揭秘Facebook高管住宅</a></div>
				<div id="doings-summary-30105630" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://www.sootoo.com/content/285050.shtml" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fwww.sootoo.com%2Fson_media%2Fmsg%2F2012%2F05%2F22%2F294435.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：最科技  Facebook已成为一段佳话，见证了扎克伯格的事业和爱情，打造了一大批亿万富豪，更令人惊讶的是Facebook高管们价值不菲的住宅。Facebook员工满载而归，使得旧金山海湾地区的房地产市场也受到了Facebook的巨大...</div>
		</div>
		<div id="doings-desc-30105630" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30105630" class="info">
			<span class="source"><a href="/doing/22jQG" class="pubtime" time="1337664436" target="_blank">今天14:19</a>&nbsp;<a href="/1170698" target="_blank">来自速途网</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1170698" class="avatar" title="速途网"><img src="http://static.xgres.com/lianbo/avatar/1170698/48/1321325483" alt="速途网"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30106744" class="entry" doingsId="30106744" mark="1170698">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.sootoo.com/content/285068.shtml" target="_blank" title="齐X小短裙是浮云三界西游制服诱惑才给力">齐X小短裙是浮云三界西游制服诱惑才给力</a></div>
				<div id="doings-summary-30106744" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://www.sootoo.com/content/285068.shtml" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fi0.sinaimg.cn%2Fgm%2F2012%2F0522%2FU4512P115DT20120522132139.jpg" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：周勇  曾几何时，齐X小短裙满天飞，掀起狂潮!各位亲，在《三界西游》中有各种特色服装，杀伤力不输齐X小短裙哦。诱惑的护士装、酷帅战警服，还有神秘的忍者装，无比个性十足，秒杀三界!穿着这样的衣服招摇过市，想不让人嫉妒都难!逍遥馆各种制服...</div>
		</div>
		<div id="doings-desc-30106744" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30106744" class="info">
			<span class="source"><a href="/doing/22k8E" class="pubtime" time="1337665710" target="_blank">今天14:09</a>&nbsp;<a href="/1170698" target="_blank">来自速途网</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1170698" class="avatar" title="速途网"><img src="http://static.xgres.com/lianbo/avatar/1170698/48/1321325483" alt="速途网"/></a>
	</div>
		<div class="clr"></div>
</li><li id="doings-30100835" class="entry" doingsId="30100835" mark="1199167">
	<div class="content clearfix">
				<div class="text-title-wrap"><a class="text-title" href="http://www.zhihu.com/question/20250612/answer/14486834" target="_blank" title="为什么 IPO 股票发行价格不是越高越好？">为什么 IPO 股票发行价格不是越高越好？</a></div>
				<div id="doings-summary-30100835" class="entry-content-wrap clearfix">
						<div class="hot-thumb-img fr">
				<a class="text-title" href="http://www.zhihu.com/question/20250612/answer/14486834" target="_blank">
					<img src="http://proxy.xgres.com/proxyImg.php?w=420&u=http%3A%2F%2Fp4.zhimg.com%2F71%2F19%2F7119a30c2611e81515122998e7bd2872_m.jpg%3Frss" onerror="this.parentNode.style.display='none';" />
				</a>
			</div>
						<div class="entry_content text-content">作者：李淼发行价格过高的最明显结果，就是中国石油（SH:601857）吧？  首先，无论是Facebook还是中国石油，上市都不是一锤子买卖。所谓“第一手卖出去以后股价涨跌跟公司的实际收益都没有关系了吧”，这种看法是错的：  1. 除了一部...</div>
		</div>
		<div id="doings-desc-30100835" class="entry_content text-content hot-index" style="display:none"></div>
		<div id="doings-info-30100835" class="info">
			<span class="source"><a href="/doing/22iBl" class="pubtime" time="1337659000" target="_blank">今天12:15</a>&nbsp;<a href="/1199167" target="_blank">来自知乎每日精选</a></span>
			<ul class="operation">
								<li class="first"><a href="javascript:void(0);" _ope="forward">转发<em class="entry_forward_num"></em></a></li>
								<li><a class="dropdown" href="javascript:void(0);" _ope="shareto">分享</a></li>
				<li><a href="javascript:void(0);" _ope="favorite">收藏</a></li>
				<li><a href="javascript:void(0);" _ope="comment">评论<em class="entry_comments_num"></em></a></li>
			</ul>
		</div>
		<div class="entry_comments round"></div>
	</div>
		<div class="face">
		<a href="/1199167" class="avatar" title="知乎每日精选"><img src="http://static.xgres.com/lianbo/avatar/1199167/48/1328607264" alt="知乎每日精选"/></a>
	</div>
		<div class="clr"></div>
</li>		</ul>
		<div id="more-items-loading" class="more-loading"></div>
		<a id="more-items-button" href="javascript:void(0);">&nbsp;</a>
	</div>
</div>
<div class="side">
	<div class="box side-box radius">
	<div class="box-header">
		<h3>所有分类</h3>
	</div>
	<div class="box-content">
		<div class="hot-cate-list">
									<div class="hot-cate clearfix">
				<div class="hot-cate-title"><a href="/hot/list/technology">科技</a></div>
				<div class="hot-cate-subs clearfix">
										<div class="hot-cate-sub"><a href="/hot/list/internet">互联网</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/app">App</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/product-design">产品</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/digital">数码</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/science">科学</a></div>
									</div>
			</div>
												<div class="hot-cate clearfix">
				<div class="hot-cate-title"><a href="/hot/list/entertainment">娱乐</a></div>
				<div class="hot-cate-subs clearfix">
										<div class="hot-cate-sub"><a href="/hot/list/fun">趣味</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/video">影视</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/music">音乐</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/creativity">创意</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/images">摄影</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/sports">体育</a></div>
									</div>
			</div>
												<div class="hot-cate clearfix">
				<div class="hot-cate-title"><a href="/hot/list/business">财经</a></div>
				<div class="hot-cate-subs clearfix">
										<div class="hot-cate-sub"><a href="/hot/list/economy">经济</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/management">管理</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/finance">理财</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/house">房产</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/car">汽车</a></div>
									</div>
			</div>
												<div class="hot-cate clearfix">
				<div class="hot-cate-title"><a href="/hot/list/life">生活</a></div>
				<div class="hot-cate-subs clearfix">
										<div class="hot-cate-sub"><a href="/hot/list/fashion">时尚</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/travel">旅游</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/Constellation">星座</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/emotion">情感</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/food">美食</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/health">健康</a></div>
									</div>
			</div>
												<div class="hot-cate clearfix">
				<div class="hot-cate-title"><a href="/hot/list/culture">人文</a></div>
				<div class="hot-cate-subs clearfix">
										<div class="hot-cate-sub"><a href="/hot/list/literature">文化</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/history">历史</a></div>
										<div class="hot-cate-sub last"><a href="/hot/list/job">职场</a></div>
										<div class="hot-cate-sub"><a href="/hot/list/essay">随笔</a></div>
									</div>
			</div>
														</div>
	</div>
</div>		<div class="box side-box radius">
	<div class="box-header">
		<h3>热点排行</h3>
	</div>
	<div class="box-content">
		<div class="hot-list">
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/life">生活</a></div>
				<div class="line-title"><a target="_blank" title="“没头脑”和“不高兴” 职场上不受“待见”" href="http://go.rss.sina.com.cn/redirect.php?url=http://edu.sina.com.cn/bschool/2012-05-21/1422338927.shtml">“没头脑”和“不高兴” 职场…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/technology">科技</a></div>
				<div class="line-title"><a target="_blank" title="柯达输了：ITC裁定苹果和RIM未侵犯柯达专利" href="http://www.ithome.com/html/it/17384.htm">柯达输了：ITC裁定苹果和RIM未…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="马云重夺阿里控制权？2015年并非上市时间表" href="http://tech.qq.com/a/20120522/000107.htm">马云重夺阿里控制权？2015年并…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="愚蠢的游戏:从《俄罗斯方块》到《愤怒的小鸟》" href="http://go.rss.sina.com.cn/redirect.php?url=http://tech.sina.com.cn/i/2012-05-22/07097144594.shtml">愚蠢的游戏:从《俄罗斯方块》…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="5天涌现584万&quot;吃货&quot; 纪录片引爆&quot;舌尖上的淘宝&quot;" href="http://www.cnbeta.com/articles/188358.htm">5天涌现584万"吃货" 纪录片引爆…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="iPhone充电器内部拆解：这玩意简直就是艺术品！" href="http://www.cnbeta.com/articles/188356.htm">iPhone充电器内部拆解：这玩意…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/fashion">时尚</a></div>
				<div class="line-title"><a target="_blank" title="一套仿制蓝宝石搅黄一桩婚姻" href="http://lux.hexun.com/2012-05-22/141635737.html?from=rss">一套仿制蓝宝石搅黄一桩婚姻</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/entertainment">娱乐</a></div>
				<div class="line-title"><a target="_blank" title="杨钰莹再谈远华案：从梦幻走到现实 仍期待爱情" href="http://ent.cn.yahoo.com/ypen/20120522/1061274.html?f=E422_24_11">杨钰莹再谈远华案：从梦幻走到…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="我如何筛选简历与选择人员" href="http://news.cnblogs.com/n/143332/">我如何筛选简历与选择人员</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="苹果：天才会计和设计师的数量一样多" href="http://news.cnblogs.com/n/143331/">苹果：天才会计和设计师的数量…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="三亚推iPad点菜应用 防海鲜排档宰客" href="http://www.cnbeta.com/articles/188386.htm">三亚推iPad点菜应用 防海鲜排…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/fun">趣味</a></div>
				<div class="line-title"><a target="_blank" title="D8神文：你真的认为iphone只是一部手机么？" href="http://luo.bo/25040/">D8神文：你真的认为iphone只是…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/economy">经济</a></div>
				<div class="line-title"><a target="_blank" title="雀巢笨NANA火了" href="http://news.cnfol.com/120522/101,1603,12421301,00.shtml">雀巢笨NANA火了</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="解读阿里雅虎股权交易：马云积极推动战略转型" href="http://go.rss.sina.com.cn/redirect.php?url=http://tech.sina.com.cn/i/ec/2012-05-22/08317145397.shtml">解读阿里雅虎股权交易：马云积…</a></div>
							</div>
						<div class="line-item clearfix">
								<div class="category"><a href="/hot/list/internet">互联网</a></div>
				<div class="line-title"><a target="_blank" title="从Facebook看《社交网络2》：一个时代的蓝与白" href="http://www.cnbeta.com/articles/188344.htm">从Facebook看《社交网络2》：…</a></div>
							</div>
					</div>
	</div>
</div>		
<div style="">
<a style="display:block;height:300px;background:url(/static/adv/side-app-250.jpg?v=1) 0 0 no-repeat scroll;text-decoration:none;" href="/hot/goto?t=app&from=hot" title="鲜果联播"  target="_blank"></a>
</div>

<div style="margin-top:20px;">
<a style="display:block;height:40px;background:url(/static/adv/weibo-250.png?v=1) 0 0 no-repeat scroll;text-decoration:none;" href="/hot/goto?t=xgsina&from=hot" title="鲜果联播"  target="_blank"></a>
</div>

<div style="margin-top:5px;">
<a style="display:block;height:40px;background:url(/static/adv/tencent-250.png?v=1) 0 0 no-repeat scroll;text-decoration:none;" href="/hot/goto?t=xgqq&from=hot" title="鲜果联播"  target="_blank"></a>

<div style="margin-top:5px;">
<a style="display:block;height:40px;background:url(/static/adv/wangyi-250.png?v=1) 0 0 no-repeat scroll;text-decoration:none;" href="/hot/goto?t=xg163&from=hot" title="鲜果联播"  target="_blank"></a>
</div>
	<div style="margin-top:10px;">
<a href="/hot/goto?t=nandu&from=hot" target="_blank">
	<img src="/static/adv/nandu250.jpg" alt="南都周刊" title="南都周刊" />
</a>

</div></div>
<!-- begin sendto -->
<ul class="dropdown_menu" id="dialog_sendto">
		<li><a href="/hot/sendto?type=sina&doingsId=DOINGSID" target="_blank"><img src="http://t.sina.com.cn/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;新浪微博</a></li>
		<li><a href="/hot/sendto?type=qq-weibo&doingsId=DOINGSID" target="_blank"><img src="http://mat1.gtimg.com/www/mb/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;腾讯微博</a></li>
		<li><a href="/hot/sendto?type=163-weibo&doingsId=DOINGSID" target="_blank"><img src="http://t.163.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;网易微博</a></li>
		<li><a href="/hot/sendto?type=kaixin001&doingsId=DOINGSID" target="_blank"><img src="http://www.kaixin001.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;开心网</a></li>
		<li><a href="/hot/sendto?type=mknote&doingsId=DOINGSID" target="_blank"><img src="http://note.sdo.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;麦库记事</a></li>
		<li><a href="/hot/sendto?type=renren&doingsId=DOINGSID" target="_blank"><img src="http://s.xnimg.cn/favicon-rr.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;人人网</a></li>
		<li><a href="/hot/sendto?type=baisohu&doingsId=DOINGSID" target="_blank"><img src="http://bai.sohu.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;白社会</a></li>
		<li><a href="/hot/sendto?type=douban&doingsId=DOINGSID" target="_blank"><img src="http://t.douban.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;豆瓣网</a></li>
		<li><a href="/hot/sendto?type=wealink&doingsId=DOINGSID" target="_blank"><img src="http://www.wealink.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;若邻网</a></li>
		<li><a href="/hot/sendto?type=qzone&doingsId=DOINGSID" target="_blank"><img src="http://qzone.qq.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;QQ空间</a></li>
		<li><a href="/hot/sendto?type=qq&doingsId=DOINGSID" target="_blank"><img src="http://shuqian.qq.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;QQ书签</a></li>
		<li><a href="/hot/sendto?type=baidu&doingsId=DOINGSID" target="_blank"><img src="http://www.baidu.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;百度搜藏</a></li>
		<li><a href="/hot/sendto?type=Delicious&doingsId=DOINGSID" target="_blank"><img src="http://delicious.com/favicon.ico" align="absmiddle" style="width:16px;height:16px;"/>&nbsp;Delicious</a></li>
	</ul>
<!-- end sendto -->
			<div class="c"></div>
			</div>
		</div>
	</div>
</div>

<div id="footer">
	<div id="footer-wrap">
		<div id="footer-wrapper">
					<div><a href="/about/about">关于鲜果</a><a href="http://hr.xianguo.com" target="_blank">诚聘英才</a><a href="/about/contact">联系我们</a><a href="/about/cooperate">合作伙伴</a></span><a href="/about/help">帮助中心</a><a href="/about/privacy">隐私保护</a><a href="/tools" target="_blank">工具箱</a></div>
			<div>Copyright&copy;2004-2011 XianGuo.com 智信出品&nbsp;&nbsp;<a target="_blank" href="http://www.miibeian.gov.cn" style="margin:0;color:#8F8F8F;">京ICP证110059号</a>&nbsp;&nbsp;京公海网安备110108001536号</div>
				</div>
	</div>
</div>
<script type="text/javascript" src="http://static.xgres.com/sns-static/js/sns-xianguo-release_sns_2012-05-16-16-13-48.js"></script>
<a href="javascript:void(0);" class="gotop_btn" id="goTopButton" style="display:none;">&nbsp;</a>
<script type="text/javascript">
(function($){
	$('#goTopButton').click(function(event){
		$('html, body').animate({scrollTop:0}, 300);
	});
	$(window).scroll(function(event){
		if($(this).scrollTop() > 0){
			if($.browser.ie6){
				$('#goTopButton').css('top', $(this).scrollTop() + $(this).height() - 170);
			}
			if($('#goTopButton').css('display') == 'none'){
				$('#goTopButton').fadeIn();
			}
		}else{
			$('#goTopButton').fadeOut();
		}

		//顶部消息框位置
		var dis = 10 - $(this).scrollTop();
		if( 0<dis && dis<=10 ){
			$("#header-noti").css("top",dis+"px");
		}else{
			$("#header-noti").css("top","0");
		}
	});
})(jQuery);
</script>
<script type="text/javascript">
(function($){
	$doings.init({
		nowShowDoingBox:false,
		defaultValue:'记录瞬间 分享精彩 ...',
		currentPage:'0',
		startDoingsId:'',
		needLogin:true	});
})(jQuery);

function cycleScroll(currSlideElement, nextSlideElement, options, forwardFlag){
	var total = options.slideCount;
	var currIndex = options.currSlide;
	var prevIndex = currIndex - 1;
	var nextIndex = currIndex + 1;
	if (prevIndex < 0) {
		prevIndex = total - 1;
	}
	if (nextIndex >= total) {
		nextIndex = 0;
	}

	var prevImg = $('#cycle-slide-show .cycle-item-wrap').eq(prevIndex).find('.cycle-thumb img').attr('src');
	var nextImg = $('#cycle-slide-show .cycle-item-wrap').eq(nextIndex).find('.cycle-thumb img').attr('src');

	$('#cycle-slide-prev .cycle-sthumb').html('<img src="' + prevImg + '" \/>');
	$('#cycle-slide-prev .cycle-sthumb img').reflect({
		height: 30,
		opacity: 0.5
	});
	$('#cycle-slide-next .cycle-sthumb').html('<img src="' + nextImg + '" \/>');
	$('#cycle-slide-next .cycle-sthumb img').reflect({
		height: 30,
		opacity: 0.5
	});
}

(function($){
	var idsList = [],
		descMap = {},
		loadDescQueue = [],
		loading = false,
		maxWidth = 588,
		reading = 0;

	var $hotDoings = window.$hotDoings = {
		init:function(){
			$('#timeline .entry').each(function(){
				var doingsId = this.getAttribute('doingsId');

				var elem = $(this);
				var registed = elem.data('registed');
				if (registed) {
					return;
				}
				elem.data('registed', true);
				idsList.push(doingsId);

				itemClick(elem.find('.text-title-wrap'), elem.find('.entry_content'), doingsId);
			});
		}
	};

	function itemClick(elem, elem2, doingsId){
		var desc = $('#doings-desc-' + doingsId),
			summary = $('#doings-summary-' + doingsId),
			item = $('#doings-' + doingsId);

		var oriBgcolor = elem.css('background-color');
		elem.mouseover(function(){
			this.style.backgroundColor = '#EEF6FF';
		}).mouseout(function(){
			this.style.backgroundColor = oriBgcolor;
		}).click(function(event){
			if (event.target.tagName.toLowerCase() == 'a') {
				event.stopPropagation();
				return;
			}

			if (desc.css('display') == 'none') { //展开全文
				if (desc.html() == '') {
					loadItemDesc(doingsId, function(content){
						desc.html(content).find('img').load(resizeImage);

						summary.hide();
						desc.show();
					});
				} else {
					summary.hide();
					desc.show();
				}

				//阅读统计
				if(reading>0 && reading!=doingsId) {
					XGUserBehavior(reading, 'end', 'list');
				}
				reading = doingsId;
				XGUserBehavior(doingsId, 'start', 'list');
			} else { //合上全文
				summary.show();
				desc.hide();
				var top = item.offset().top;
				if (top < $(document).scrollTop()) {
					$(document).scrollTop(top);
				}
				//阅读统计
				if(reading>0 && reading==doingsId) {
					XGUserBehavior(doingsId, 'end', 'list');
					reading = 0;
				}
			}
		});

		elem2.dblclick(function(event){
			if (desc.css('display') == 'none') { //展开全文
				if (desc.html() == '') {
					loadItemDesc(doingsId, function(content){
						desc.html(content).find('img').load(resizeImage);

						summary.hide();
						desc.show();
					});
				} else {
					summary.hide();
					desc.show();
				}
				//阅读统计
				if(reading>0 && reading!=doingsId) {
					XGUserBehavior(reading, 'end', 'list');
				}
				reading = doingsId;
				XGUserBehavior(doingsId, 'start', 'list');
			} else { //合上全文
				summary.show();
				desc.hide();

				var top = item.offset().top;
				if (top < $(document).scrollTop()) {
					$(document).scrollTop(top);
				}
				//阅读统计
				if(reading>0 && reading==doingsId) {
					XGUserBehavior(doingsId, 'end', 'list');
					reading = 0;
				}
			}
		});
	}

	function loadItemDesc(doingsId, callback){
		if (loading) {
			if ($.inArray(doingsId, loadDescQueue) == -1) {
				loadDescQueue.push(doingsId);
			}
			return;
		}
		if (!(doingsId in descMap)) {
			loading = true;
			var loadIds = [], maxNum = 5;
			var pos = $.inArray(doingsId, idsList);
			if (pos == -1) {
				loading = false;
				return;
			}
			var begin = (parseInt(pos / maxNum)) * maxNum;
			var end = Math.min(begin + maxNum, idsList.length);
			for (var i = begin; i < end; i++) {
				loadIds.push(idsList[i]);
			}

			if (loadIds.length > 0) {
				$.ajax({
					dataType:'json',
					type:'post',
					url:'/hot/ajax',
					data:{
						type:'loadDesc',
						doingsIds:loadIds.join(',')
					},
					success:function(data){
						if(data.c == 0){
							$dialog.hint(data.e);
							return false;
						}
						data = data.d;
						descMap[doingsId] = true;
						callback(data[doingsId]);
						delete data[doingsId];
						$.each(data, function(key, value){
							descMap[key] = value;
						});

						$.each(loadDescQueue, function(i, s){
							loadItemDesc(s);
						});
						loading = false;
					}
				});
			} else {
				loading = false;
			}
		} else {
			callback(descMap[doingsId]);
			descMap[doingsId] = true;
		}
	}

	function resizeImage(){
		if (this.width > maxWidth) {
			var _w = this.width;
			var _h = parseInt(this.height * maxWidth / _w);
			this.width = maxWidth;
			this.height = _h;
		}
	}
})(jQuery);

$(document).ready(function($){
	$('#cycle-slide-show').cycle({
		fx: 'scrollHorz',
		prev: '#cycle-slide-prev',
		next: '#cycle-slide-next',
		timeout: 20000,
		pager: '#cycle-slide-pager',
		activePagerClass: 'current',
		before: cycleScroll,
		after: cycleScroll
	});

	if (!$.browser.msie) {
		$('#cycle-slide-prev a,#cycle-slide-next a').mouseover(function(){
			$(this).animate({
				'opacity': 0
			});
		}).mouseout(function(){
			$(this).animate({
				'opacity': 1
			});
		});
	}

	if (screen.width < 1200) {
		$('#cycle-slide-prev').hide();
		$('#cycle-slide-next').hide();
	}
});

var tagId = '0';
var totalPage = parseInt('3335');
var currPage = 0;
var nextPage = 1;
var maxAutoload = 2;

function _loadMoreItems(times, isScroll){
	isScroll = isScroll || 1;

	if (currPage == nextPage) {
		return false;
	}
	if (nextPage >= totalPage) {
		return false;
	}
	if (isScroll == 1 && currPage >= maxAutoload) {
		return false;
	}

	currPage = nextPage;
	$('#more-items-loading').show();
	$('#more-items-button').hide();

	$.ajax({
		dataType: 'json',
		url: "/hot/ajax",
		data: {
			type: 'loadMore',
			tagId: tagId,
			pi: nextPage
		},
		success: function(data){
			if(data.c == 0){
				$dialog.hint(data.e);
				return false;
			}
			removeDuplicate($(data.d.html));
//			$('#timeline').append(filterHtml);
			nextPage += 1;
			$('#more-items-loading').hide();
			if (currPage >= maxAutoload) {
				$('#more-items-button').css('display', 'block');
			}
			$hotDoings.init();
		}
	});
}

function removeDuplicate(newHtml){
	var currentDoingsIds = new Array();
	$('#timeline').children().each(function(){
		currentDoingsIds.push($(this).attr('doingsid'));
	});
	//截取周后10条；只要保证尾部不重复即可；
	currentDoingsIds = currentDoingsIds.slice(currentDoingsIds.length-10, currentDoingsIds.length);

	newHtml.each(function(){
		var notInFlag = true;
		var newId = $(this).attr('doingsid');
		for(var i in currentDoingsIds) {
			if(newId==currentDoingsIds[i]){
				notInFlag = false;
				break;
			}
		}
		if(notInFlag) {
			$('#timeline').append($(this));
		}
	});

	return true;
}

function recordReading() {
	$('.text-title').click(function() {
		var entry = $(this).parents('.entry');
		var doingsId = entry.attr('doingsid');
		if(doingsId) {
			$.post("/hot/log-read",{doingsId:doingsId},function(){});
		}
	});
	$('.hot-top-title').click(function() {
		var doingsId = $(this).attr('doingsid');
		if(doingsId) {
			$.post("/hot/log-read",{doingsId:doingsId},function(){});
		}
	});
}


(function($){
	$hotDoings.init();
	$('#more-items-button').click(function(e){
		_loadMoreItems(0, 2);
	});
	$(document).endlessScroll({
		bottomPixels: 100,
		callback: _loadMoreItems
	});

	recordReading();
})(jQuery);
</script>

<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-9142976-6']);
_gaq.push(['_setDomainName', '.xianguo.com']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script></body>
</html>