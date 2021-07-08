/*********************************************************
* version 2.1.2 - By Kant@SeekRoad
* 修改日期：2018-3-22
**********************************************************/

var root_url='',app_url='',mod_url='';	  //root_url='localhost';app_url='localhost/app';mod_url='localhost/app/module';
var uiBootConfig = {
			menuObj					: '',				//导航菜单数据对象，Json格式：{"menus":[ {一级栏目,"menus":[ {二级栏目(菜单),"child":[ {三级菜单1},{三级菜单2} ]} ]} ]}
			menuObjBak				: '',				//导航菜单数据对象备份，导航检索时使用
			menuAnimate				: true,				//导航菜单展开或折叠面板时是否显示动画效果
			menuShowPIndex			: 0,				//导航菜单初始化时展开的导航面板index，数字
			menuShowAll				: true,				//导航菜单初始化时导航栏目是否全部展开
			menuShowOne				: false,			//是否只允许一个导航栏目是展开状态，即点击一个导航栏目时其他展开的导航栏目都折叠起来
			contPageType			: 'auto',			//内容页面显示模式： tabs | single | auto
			defPageIsOpen			: true,				//是否打开初始页面
			defPageUrl				: '/index/content',	//初始页面链接，值为空字符串时，自动检索导航第一个菜单链接初始化内容页面
			defPageTitle			: '欢迎使用',		//初始页面标题
			defPageIcon				: '',				//初始页面图标
			defPageClosable			: false,			//初始页面关闭按钮
			lockPageTitle			: '欢迎使用',		//不允许关闭的标签的标题
			domIdBodyLoading		: 'loading-mask',	//框架面板载入提示遮罩层id
			domIdMenuTree			: 'navtree',		//导航树id
			domIdMenuNav			: 'nav',			//导航菜单外层id
			domClsMenuNavList		: 'navlist',		//导航菜单面板类名ClassName
			domClsMenuNavIcon		: 'icon ',			//导航菜单选项图标类名ClassName
			domClsMenuNavName		: 'nav',			//导航菜单选项标题类名ClassName
			domClsMenuChildList		: 'third_ul',		//导航菜单选项列表外层类名ClassName
			domIdContLayout			: 'mainPanle',		//内容页区域面板id
			domIdContTabsPanle		: 'tabs',			//选项卡模式外层id
			domIdContTabsEvenMenu	: 'tabs_mm',		//选项卡模式右键菜单面板id
			domIdContSinglePanle	: 'mainContent',	//单页模式外层id
			domIdContSingleLoading	: 'center_loading'	//单页模式切换载入提示遮罩层id
		};

$(function(){
    if($('#'+uiBootConfig.domIdMenuTree).length==0){	//没有使用导航树，则初始化导航菜单
	    navMenuInit();
    }
    if(uiBootConfig.contPageType=='auto'){
		if($('#'+uiBootConfig.domIdContLayout).find('#'+uiBootConfig.domIdContTabsPanle).length>0){
			uiBootConfig.contPageType='tabs';
		}else{	//$('#'+uiBootConfig.domIdContLayout).find('#'+uiBootConfig.domIdContSinglePanle).length
			uiBootConfig.contPageType='single';
		}
	}
    if(uiBootConfig.contPageType=='tabs'){
	    contTabsEvenMenuInit(); //初始化tabs右键面板
        if(uiBootConfig.defPageIsOpen){contTabsPageAdd(uiBootConfig.defPageUrl,uiBootConfig.defPageTitle,uiBootConfig.defPageIcon,uiBootConfig.defPageClosable);}
    }else{
        if(uiBootConfig.defPageIsOpen){contSinglePageRefresh(uiBootConfig.defPageUrl,uiBootConfig.defPageTitle,uiBootConfig.defPageIcon);}
    }
    if($('#'+uiBootConfig.domIdBodyLoading).length>0){$('#'+uiBootConfig.domIdBodyLoading).fadeOut('fast');}	//如果存在则关闭“loading提示”遮罩层
});

//初始化左侧导航菜单
function navMenuInit() {
	$('#'+uiBootConfig.domIdMenuNav).accordion({animate:uiBootConfig.menuAnimate,fit:true,border:false});
	var selectedPanelname = '';
    if(!$.isEmptyObject(uiBootConfig.menuObj)){
      $.each(uiBootConfig.menuObj.menus, function(i, n){
		var menulist='',fgT='',fgB='',fgTChild='',fgBChild='';
		menulist +='<ul class="'+uiBootConfig.domClsMenuNavList+'">';
        $.each(n.menus, function(j, o){
			if(o.fgset){switch(o.fgset){
			  case '11': fgT='<li><hr></li>';fgB='<li><hr></li>'; break;
			  case '10': fgT='<li><hr></li>';fgB=''; break;
			  case '01': fgT='';fgB='<li><hr></li>'; break;
			  default :  fgT='';fgB='';
			}}
			menulist += fgT+'<li><div><a href="javascript:;" ref="'+o.menuid+'" rel="'+o.url+'"><span class="'+uiBootConfig.domClsMenuNavIcon +o.icon+'">&nbsp;</span><span class="'+uiBootConfig.domClsMenuNavName+'">'+o.menuname+'</span></a></div>';
			if(o.child && o.child.length>0){
				menulist += '<ul class="'+uiBootConfig.domClsMenuChildList+'">';    //初始化是隐藏加 style="display:none;"
				$.each(o.child,function(k,p){
					if(p.fgset){switch(p.fgset){
					  case '11': fgTChild='<li><hr></li>';fgBChild='<li><hr></li>'; break;
					  case '10': fgTChild='<li><hr></li>';fgBChild=''; break;
					  case '01': fgTChild='';fgBChild='<li><hr></li>'; break;
					  default :  fgTChild='';fgBChild='';
					}}
					menulist += fgTChild+'<li><div><a href="javascript:;" ref="'+p.menuid+'" rel="'+p.url+'" title="' + p.menuname + '"><span class="'+uiBootConfig.domClsMenuNavIcon +p.icon+'">&nbsp;</span><span class="'+uiBootConfig.domClsMenuNavName+'">'+p.menuname+'</span></a></div></li>'+fgBChild;
				});
				menulist += '</ul>';
			}
			menulist += '</li>'+fgB;
        });
		menulist += '</ul>';

		$('#'+uiBootConfig.domIdMenuNav).accordion('add', {
			border: false,
            title: n.menuname,
            content: menulist,
            iconCls: uiBootConfig.domClsMenuNavIcon +n.icon
        });

		//if(i==uiBootConfig.menuShowPIndex){ selectedPanelname =n.menuname; } //默认选中第一个菜单
      });
	}
	$('#'+uiBootConfig.domIdMenuNav).accordion('select',uiBootConfig.menuShowPIndex); //selectedPanelname
	//初始页面为空时默认使用第一个
	if(uiBootConfig.defPageUrl==''){
		var cont = $('#'+uiBootConfig.domIdMenuNav).accordion('getPanel',uiBootConfig.menuShowPIndex).panel('options').content; //'getSelected'
		$(cont).find('li a').each(function(){
			var contObjs = $(this);
			if(contObjs.attr('rel') && contObjs.attr('rel')!='javascript:;' && contObjs.attr('rel')!='javascript:void(0);' && contObjs.attr('rel')!='#'){
				uiBootConfig.defPageUrl = contObjs.attr('rel');
				uiBootConfig.defPageTitle = contObjs.children('.'+uiBootConfig.domClsMenuNavName).text();
				uiBootConfig.defPageIcon = contObjs.find('.'+uiBootConfig.domClsMenuNavIcon).attr('class');
				uiBootConfig.defPageClosable = true;
				return false;
			}
		});
	}

	//绑定菜单事件
	$('.'+uiBootConfig.domClsMenuNavList+' li a').click(function(){
		var tabTitle = $(this).children('.'+uiBootConfig.domClsMenuNavName).text();
		var url = $(this).attr('rel');
		var menuid = $(this).attr('ref');
		var icon = $(this).find('.'+uiBootConfig.domClsMenuNavIcon).attr('class');
		icon = icon.replace(/icon icon /, 'icon ');

		var third = navMenuFind(menuid);
		if(third && third.child && third.child.length>0){
        	if(uiBootConfig.menuShowOne){ $('.'+uiBootConfig.domClsMenuChildList).slideUp(); }	//点击一个菜单时，前一个菜单分类收起来
			var ul =$(this).parent().next();
			if(ul.is(':hidden'))
				ul.slideDown();
			else
				ul.slideUp();
		}else{
			contPageOpen(url,tabTitle,icon);
			$('.'+uiBootConfig.domClsMenuNavList+' li div').removeClass('selected');
			$(this).parent().addClass('selected');
		}
	}).hover(function(){
		$(this).parent().addClass('hover');
	  },function(){
		$(this).parent().removeClass('hover');
	});

	if(uiBootConfig.menuShowAll){ $('.'+uiBootConfig.domClsMenuChildList).slideDown(); }			//二级菜单分类全部展开
}
//获取左侧导航的对象
function navMenuFind(menuid){
	var obj = null;
    if(!$.isEmptyObject(uiBootConfig.menuObj)){
	  $.each(uiBootConfig.menuObj.menus, function(i, n){
		 $.each(n.menus, function(j, o){
		 	if(o.menuid==menuid){
				obj = o;
                return false;
			}
		 });
	  });
	}
	return obj;
}
//获取左侧导航的图标
function navMenuGetIcon(menuid){
	var icon = uiBootConfig.domClsMenuNavIcon;
    if(!$.isEmptyObject(uiBootConfig.menuObj)){
	  $.each(uiBootConfig.menuObj.menus, function(i, n){
		 $.each(n.menus, function(j, o){
		 	if(o.menuid==menuid){
				icon += o.icon;
                return false;
			}
		 });
	  });
	}
	return icon;
}
//通过关键字检索导航菜单
function navMenuSearch(seaKey,seaName){
	//备份导航目录
    if(uiBootConfig.menuObjBak==''){
        uiBootConfig.menuObjBak = uiBootConfig.menuObj;
    }
	//清空原来导航目录
    if(!$.isEmptyObject(uiBootConfig.menuObj)){
	  $.each(uiBootConfig.menuObj.menus, function(i, n){
		$('#'+uiBootConfig.domIdMenuNav).accordion('remove',n.menuname);
	  });
	}
	//生成新的导航目录
	var menulist = '';
    if(!$.isEmptyObject(uiBootConfig.menuObjBak)){
	  $.each(uiBootConfig.menuObjBak.menus, function(i, n){/*2*/
		$.each(n.menus, function(j, o){/*3*/
			//如果有需要可以检查报表分类，在这里添加检查代码
			if(o.child && o.child.length>0){
				$.each(o.child, function(k,p){/*4*/
					if(p.menuname.indexOf(seaKey)>=0){
						menulist += '{"menuid":"'+p.menuid+'","icon":"'+p.icon+'","menuname":"'+p.menuname+'","url":"'+p.url+'"},';
					}
				});
			}
		});
	  });
	}
	//若没有搜索结果，则产生一个提示菜单
	if(!menulist){
		menulist ='{"menuid":"9999","icon":"icon icon-delete","menuname":"没有您搜索的信息，请重新输入","url":"/index/help.html"}';
	}
	//将结果字符串转换为json格式
	uiBootConfig.menuObj = eval('({"menus":[ {"menuid":"9999","icon":"icon icon-data","menuname":"报表搜索结果","menus":['+menulist+']} ]})');
	navMenuInit();
}
function navMenuRestore(){
	//清空原来导航目录
    if(!$.isEmptyObject(uiBootConfig.menuObj)){
	  $.each(uiBootConfig.menuObj.menus, function(i, n){
		$('#'+uiBootConfig.domIdMenuNav).accordion('remove',n.menuname);
	  });
	}
	//重新加载目录
	uiBootConfig.menuObj = uiBootConfig.menuObjBak;
	navMenuInit();
}

//for contPage 内容页面打开菜单使用的函数，根据显示模式自动调用处理
function contPageOpen(url,subtitle,icon){
	var defClosable=true;
    if(uiBootConfig.contPageType=='tabs'){
		if(typeof(arguments[3])!='undefined'){defClosable=arguments[3];};
        contTabsPageAdd(url,subtitle,icon,defClosable);
    }else{
        contSinglePageRefresh(url,subtitle,icon);
    }
}

//for single 单页面使用的函数
function contSinglePageRefresh(url,subtitle,icon){
	$('#'+uiBootConfig.domIdContSingleLoading).fadeIn(0);
	$('#'+uiBootConfig.domIdContSinglePanle).attr('src', url);
	$('#'+uiBootConfig.domIdContSinglePanle).load(function(){
		contSinglePageRefreshHeight();
		$('#'+uiBootConfig.domIdContSingleLoading).fadeOut('fast');
	});
}
//for single 获取并重置框架高度
function contSinglePageRefreshHeight(){
	var ifm = document.getElementById(uiBootConfig.domIdContSinglePanle);
	var subWeb = document.frames ? document.frames[uiBootConfig.domIdContSinglePanle].document : ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		var mainheight = $(window).height()-91;
		var frameheight = $(subWeb).find('div').first().height()+35;
		ifm.height = mainheight>frameheight ? mainheight : frameheight;  // 兼容frame内容变少时高度可以自适应减少
	}
}

//for tabs 标签页使用的函数
function contTabsPageAdd(url,subtitle,icon){
    var defClosable=true;
	if(typeof(arguments[3])!='undefined'){defClosable=arguments[3];};
	if(!$('#'+uiBootConfig.domIdContTabsPanle).tabs('exists',subtitle)){
		$('#'+uiBootConfig.domIdContTabsPanle).tabs('add',{
			title:subtitle,
			content:contTabsPageFrameCreate(url),
			closable:defClosable,
			iconCls:icon
		});
	}else{
		$('#'+uiBootConfig.domIdContTabsPanle).tabs('select',subtitle);
	}
	contTabsEvenBind();
}
function contTabsPageFrameCreate(url){
	var s = '<iframe scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}
//for tabs 为选项卡绑定事件
function contTabsEvenBind(){
	/*双击关闭TAB选项卡*/
	$('.tabs-inner').dblclick(function(){
		var subtitle = $(this).children('.tabs-closable').text();
		$('#'+uiBootConfig.domIdContTabsPanle).tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$('.tabs-inner').bind('contextmenu',function(e){
		$('#'+uiBootConfig.domIdContTabsEvenMenu).menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		var subtitle = $(this).children('.tabs-closable').text();
		$('#'+uiBootConfig.domIdContTabsEvenMenu).data('currtab',subtitle);
		$('#'+uiBootConfig.domIdContTabsPanle).tabs('select',subtitle);
		return false;
	});
}
//for tabs 初始化选项卡右键菜单的项目事件
function contTabsEvenMenuInit(){
    $('#'+uiBootConfig.domIdContTabsEvenMenu).menu({onClick:function(item){ contTabsEvenMenuAction(item.id); }});
    return false;
}
function contTabsEvenMenuAction(action){
    var alltabs = $('#'+uiBootConfig.domIdContTabsPanle).tabs('tabs');
    var currentTab =$('#'+uiBootConfig.domIdContTabsPanle).tabs('getSelected');
	var allTabtitle = [];
	$.each(alltabs,function(i,n){
		allTabtitle.push($(n).panel('options').title);
	});

    switch (action) {
        case 'refresh':
            var iframe = $(currentTab.panel('options').content);
            var src = iframe.attr('src');
            $('#'+uiBootConfig.domIdContTabsPanle).tabs('update', {
                tab: currentTab,
                options: {content:contTabsPageFrameCreate(src)}
            })
            break;
        case 'close':
            var currtab_title = currentTab.panel('options').title;
            $('#'+uiBootConfig.domIdContTabsPanle).tabs('close', currtab_title);
            break;
        case 'closeall':
            $.each(allTabtitle, function(i, n){
                if(n != uiBootConfig.lockPageTitle){
                    $('#'+uiBootConfig.domIdContTabsPanle).tabs('close', n);
				}
            });
            break;
        case 'closeother':
            var currtab_title = currentTab.panel('options').title;
            $.each(allTabtitle, function(i, n){
                if(n != currtab_title && n != uiBootConfig.lockPageTitle){
                    $('#'+uiBootConfig.domIdContTabsPanle).tabs('close', n);
				}
            });
            break;
        case 'closeright':
            var tabIndex = $('#'+uiBootConfig.domIdContTabsPanle).tabs('getTabIndex', currentTab);
            if(tabIndex == alltabs.length - 1){
				showMsg('亲，后边没有啦 ^@^!!', 'info', '系统提示');
                return false;
            }
            $.each(allTabtitle, function(i, n){
                if(i > tabIndex){
                    if(n != uiBootConfig.lockPageTitle){
                        $('#'+uiBootConfig.domIdContTabsPanle).tabs('close', n);
					}
                }
            });
            break;
        case 'closeleft':
            var tabIndex = $('#'+uiBootConfig.domIdContTabsPanle).tabs('getTabIndex', currentTab);
            if(tabIndex == 1){
				showMsg('亲，前边那个上头有人，咱惹不起哦。 ^@^!!', 'info', '系统提示');
                return false;
            }
            $.each(allTabtitle, function(i, n){
                if(i < tabIndex){
                    if(n != uiBootConfig.lockPageTitle){
                        $('#'+uiBootConfig.domIdContTabsPanle).tabs('close', n);
					}
                }
            });
            break;
    }
}


//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function showMsg(msgString, msgType, title){
	title = title||'提示';
	$.messager.alert(title, msgString, msgType);
}
