$(document).ready(function(){
	text_input();// 搜索框获得焦点,清空内容
	didden_r();//控制显示和消失
	didden_m();//头部中间隐藏部分
	lunboImg();// 轮播控制var timer=""
	hotBoxComtro()// 热区控制
	televisionBoxComtro();//电视区域的控制
	guessLike();// 猜你喜欢的控制区域
	movieBoxComtro();//电影的控制
	vipEnjoyBoxComtro()//vip尊享控制
	varietyBoxComtro();//综艺的控制
	mangaBoxComtro();//动漫控制
	gameBoxComtro()//游戏推荐控制
	musicBoxComtro()//音乐控制
	documentBoxComtro()//纪录片控制
	publicBoxComtro()//公开课控制
	beautifulBoxComtro()//靚TV控制
	togetherBoxComtro()//合作控制
	bottom_qiehuan()//广告tab
	removeup()//返回顶部
	// 实现区域
	
	// 搜索框获得焦点,清空内容
	function text_input(){
		$(".search-text").focus(function(){
			$(this).attr("value"," ");
		})
	}
	//控制头部右边的显示和消失
	function didden_r(){
		$(".xaizaixunlei").hover(function(){
			$(".hidden-r").show();
		},function(){
			$(".hidden-r").hide();
		})
	}
	//头部中间隐藏部分
	function didden_m(){
		$(".updata").mouseover(function(){
			$(".record-m-center-box").hide();
			$(".updata-m-center-box").show();
		});
			
		$(".record").mouseover(function(){
			$(".updata-m-center-box").hide();
			$(".record-m-center-box").show();
		});
	}
	
	// 轮播区域控制
	function lunboImg(){
		focusContentContro();//右边的控制
		
		var timer="";//轮播图的定时器
		var i=0;
		
		function move(){
			if(i>11){
				i=0;
			}
			var backImg = $(".smal-pic li").eq(i).find("img").attr("backImg");
			var backColor = $(".smal-pic li").eq(i).find("img").attr("backColor");
			var background = 'url('+ backImg +')' + 'no-repeat center '+ backColor;
			$("#focus-background").css({background : background});
			$(".smal-pic li").eq(i).addClass("smal-pic-hover").siblings().removeClass("smal-pic-hover");//自动加黄色边框
			$(".focus-title a").eq(i).show().siblings("a").hide();//去除标题
			i++;
		}
		
		// 移出小图片开启定时器
		$(".smal-pic li").mouseout(function(){
			timer=setInterval(move,1000);
		})
		
		//一开始就给一个自动
		timer = setInterval(move,1000);
		
		//鼠标移入
		$(".smal-pic li").mouseover(function(){
			clearInterval(timer);//移除定时器
			var backImg = $(this).find("img").attr("backImg");
			var backColor = $(this).find("img").attr("backColor");
			var background = 'url('+ backImg +')' + 'no-repeat center '+ backColor;
			$("#focus-background").css({background : background});
			$(this).addClass("smal-pic-hover").siblings().removeClass("smal-pic-hover");
			i= $(this).index();
			$(".focus-title a").eq(i).show().siblings("a").hide();
		})
		
		// 轮播的右侧显示
		function focusContentContro(){
			var ulNumber=0;
			$(".focus-r-box p.title a").mouseover(function(){
				ulNumber=$(this).index();
				$(".focus-content-box ul").eq(ulNumber).show().siblings().hide();
			})
		}
	}// 轮播控制结束
	
	
	//热区中的下划线控制
	function hotBoxComtro(){
		backgroundBorderLeft();//下划线控制
		backgroundBorderRight()
		ulQiehuanLeft();//ul的切换
		ulQiehuanRight();//ul的切换
		
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//右边下划线控制
		function backgroundBorderRight(){
			$(".hot-right .hot-right-title a.a-r-tab").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#hot-Box .hot-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#hot-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		
		function ulQiehuanRight(){
			var ulNumberRight=0;
			$(".hot-right .hot-right-title a.a-r-tab").mouseover(function(){
				ulNumberRight=$(this).index();
				$(".hot-right ul").eq(ulNumberRight).show().siblings().hide();
				$(".hot-right-title").show();
			})
		}
		
	}
	//电视剧中的下划线控制
	function televisionBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		ulQiehuanRight();// 右边排行榜的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#television-Box .television-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#television-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		function ulQiehuanRight(){
			var ulNumber=0;
			$(".television-right-three ul.content-title li").mouseover(function(){
				ulNumber=$(this).index();
				$(".television-right-three .content-box .content").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	// 猜你喜欢的ul控制区域
	function guessLike(){
		var ulNumber=0;
		$("#guess-like .guess-left .title a").click(function(){
			ulNumber--;
			ulNumber=(ulNumber==-3)?0:ulNumber;
			var left = 954*ulNumber;
			$("#guess-like .guess-left .ul-box ul").stop().animate({'left':left+'px'},300);
		})
	}
	
	// 电影区域的控制
	function movieBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		ulQiehuanRight();// 右边排行榜的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#movie-Box .movie-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#movie-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		function ulQiehuanRight(){
			var ulNumber=0;
			$(".movie-right-three ul.content-title li").mouseover(function(){
				ulNumber=$(this).index();
				$(".movie-right-three .content-box .content").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	// VIP尊享控制
	function vipEnjoyBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		ulQiehuanRight();// 右边排行榜的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#vip-enjoy-Box .vip-enjoy-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#vip-enjoy-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		function ulQiehuanRight(){
			var ulNumber=0;
			$(".vip-enjoy-right-three ul.content-title li").mouseover(function(){
				ulNumber=$(this).index();
				$(".vip-enjoy-right-three .content-box .content").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	
	function varietyBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		ulQiehuanRight();// 右边排行榜的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#variety-Box .variety-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#variety-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		function ulQiehuanRight(){
			var ulNumber=0;
			$(".variety-right-three ul.content-title li").mouseover(function(){
				ulNumber=$(this).index();
				$(".variety-right-three .content-box .content").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	// 动漫开始
	function mangaBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		ulQiehuanRight();// 右边排行榜的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#manga-Box .manga-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#manga-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		function ulQiehuanRight(){
			var ulNumber=0;
			$(".manga-right-three ul.content-title li").mouseover(function(){
				ulNumber=$(this).index();
				$(".manga-right-three .content-box .content").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	//游戏推荐控制
	function gameBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#game-Box .game-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#game-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	//音乐推荐控制
	function musicBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#music-Box .music-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#music-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	//纪录片推荐控制
	function documentBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#document-Box .document-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#document-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	//公开课推荐控制
	function publicBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#public-Box .public-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#public-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	
	//靓TV推荐控制
	function beautifulBoxComtro(){
		backgroundBorderLeft();//下划线控制
		backgroundBorderRight();//右边的控制
		ulQiehuanLeft();//ul的切换
		ulQiehuanRirht();
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#beautiful-Box .beautiful-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#beautiful-Box .left-content ul").eq(ulNumber).show().siblings().hide();
			})
		}
		//右边下划线控制
		function backgroundBorderRight(){
			$(".beautiful-box .beautiful-right .title a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//右边页面切换设置
		function ulQiehuanRirht(){
			var ulNumber=0;
			$(".beautiful-box .beautiful-right .title a").mouseover(function(){
				ulNumber=$(this).index();
				$(".beautiful-box .beautiful-right .content-tow ul").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	
	
	//合作推荐控制
	function togetherBoxComtro(){
		backgroundBorderLeft();//下划线控制
		ulQiehuanLeft();//ul的切换
		
		//左边下划线控制
		function backgroundBorderLeft(){
			$(".tab-box a").mouseover(function(){
					$(this).addClass("focus-background").siblings().removeClass("focus-background");
			})
		}
		//页面切换设置
		function ulQiehuanLeft(){
			var ulNumber=0;
			$("#together-Box .together-left-title a").mouseover(function(){
				ulNumber=$(this).index();
				$("#together-Box .left-content ul.tow").eq(ulNumber).show().siblings().hide();
			})
		}
	}
	
	//淘宝底部广告切换效果
	function bottom_qiehuan(){
		//淘宝小图片移入效果 
		$("p.tao").mouseover(function(){
			$(this).hide();
			$('div.tao1').show();
		})
		$("div.tao1").mouseout(function(){
			$(this).hide();
			$('p.tao').show();
		})
		
		//tab切换
		$(".ad_tab a").mouseover(function(){
			clearInterval(tao_timer);
			$(this).addClass("one").siblings("a").removeClass("one");
			var curindex= $(this).index();
			$(".bottom-banner .left ul").eq(curindex).show().siblings("ul").hide();
		})
		 
		$(".ad_tab a").mouseout(function(){
			 tao_timer=setInterval(tab,1000);
		});
		 
		var tao_timer=setInterval(tab,1000);
		var y=0;
		
		function tab(){
			if(y>2)
			{
				y=0;
			}
			$(".bottom-banner .left ul").eq(y).show().siblings("ul").hide();
			$(".ad_tab a").eq(y).addClass("one").siblings("a").removeClass("one");
			y++;
		}
	}
	
	
	//返回顶部
	function removeup(){
		var top;
		$(window).scroll(function(){
			top=$(window).scrollTop();
			(top>1000)?$(".remove-up").show():$(".remove-up").hide()
		})
		
		var back_timer='';
		$(".remove-up").click(function(){
			
			back_timer=setInterval(function(){
				$(window).scrollTop($(window).scrollTop()-1000);
				if($(window).scrollTop()<=0){
					clearInterval(back_timer);
				}
			},10);
		});
	}
})