
JTopo.Scene.prototype.zLinkMode = false;///是否连线模式,如果为true,将可以自由画线
JTopo.Scene.prototype.zAutoCloseLinkMode = true;//是否自动关闭连线模式,将会一定的时候关闭连线模式
JTopo.Scene.prototype.pScene = null;//拓扑图的父拓扑图




///获取该场景下所有元素
JTopo.Scene.prototype.zGetAllEle = function () {
    return this.childs;
};
JTopo.Scene.prototype.findElement = function (fun)
{
    for (var i = 0; i < this.childs.length; i++)
    {
        if (fun(this.childs[i]))
        {
            return this.childs[i];
        }
    }
    return null;
}


///将该场景转换为json形式
JTopo.Scene.prototype.zToJson = function () {
    var v = {};
    var eles = this.zGetAllEle();
    var ems = [];
    for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (ele.elementType == "node") {
            ems.push({
                elementType: "node",
                x: ele.x,
                y: ele.y,
                width: ele.width,
                height: ele.height,
                title: ele.text,
                imgsrc: ele.imgsrc,
                data: ele.data
            })

        } else if (ele.elementType == "link") {
            ems.push({
                elementType: "link",
                idA: ele.nodeA.data.id,
                idZ: ele.nodeZ.data.id,
                text: ele.text,
                linkStyle: ele.linkStyle
            });
        }
    }
    v.ems = ems;
    v.translateX = this.translateX;
    v.translateY = this.translateY;
    return v;
}
///将json数据解析到该场景中,加载ems里面的对象以及偏移量(translateX,translateY)
JTopo.Scene.prototype.zLoadJson = function (json) {
    if (!json) {
        return;
    }
    var childs = json.ems;
    if (childs) {

        for (var i = 0; i < childs.length; i++) {
            if (childs[i].elementType == "node") {
                this.zAddNode(childs[i]);
            }
            else if (childs[i].type == "wenzi") {
                this.zAddWenzi(childs[i]);//该方法需要自己
            }

        }
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].elementType == "link") {
                this.zAddLink(childs[i], null, null, childs[i].linkStyle);

            }
        }
      


    }
    if (json.translateX == null) {
        json.translateX = 0;
    }
    if (json.translateY == null) {
        json.translateY = 0;
    }
    if (json.zoom) {
        this.zZoom(json.zoom, json.zoom);
    }

    this.translateX = json.translateX;
    this.translateY = json.translateY;
}


///通过params的idA与idZ来连线,或通过nodeA与nodeZ来连线(优先)
JTopo.Scene.prototype.zAddLink = function (params, nodeA, nodeZ, linkStyle) {
    if (nodeA == null || nodeZ == null) {
        //需要通过params的idA与idZ寻找
        var eles = this.zGetAllEle();
        for (var i = 0; i < eles.length; i++) {
            var ele = eles[i];
            if (ele.elementType != "node") {
                continue;
            }
            if (ele.entity&&ele.entity.id == params.idA) {
                nodeA = ele;
            }
            else if (ele.entity && ele.entity.id == params.idZ) {
                nodeZ = ele;
            }
        }
        if (nodeA != null && nodeZ != null) {
            var l = createLink(nodeA, nodeZ, linkStyle);
            l.entity = params.entity;
            this.add(l);
            l.arrowsRadius = params.arrowsRadius;
            return l;
        }
    }
    else {
        if (nodeA != null && nodeZ != null) {
            var l = createLink(nodeA, nodeZ, linkStyle);
            this.add(l);
            if (params) {
                l.arrowsRadius = params.arrowsRadius;
                l.entity = params.entity;
            }
            return l;
        }
    }
    return null;
};
function createLink(nodeA, nodeZ, linkStyle) {
    var link = null;
    switch (linkStyle) {
        case 2:
            link = new JTopo.FoldLink(nodeA, nodeZ);
            break;
        case 3:
            link = new JTopo.FlexionalLink(nodeA, nodeZ);
            break;
        case 4:
            link = new JTopo.CurveLink(nodeA, nodeZ);
            break;
        default:
            link = new JTopo.Link(nodeA, nodeZ);
    }
    link.linkStyle = linkStyle;
    return link;

}

///通过params来创建Node节点
JTopo.Scene.prototype.zAddNode = function (params) {
    var node = new JTopo.Node(params.title);
    if (params.width) {
        node.width = params.width;
    }
    if (params.height) {
        node.height = params.height;
    }
    if (params.imgsrc) {
        node.setImage(params.imgsrc);
    }
    node.x = params.x;
    node.y = params.y;
    node.data = params.data;
    node.imgsrc = params.imgsrc;//将图片地址放到对象上便于寻找
    node.text = params.text;

    this.add(node);
    return node;
};

///设置开始节点,会开启画线模式,会从该节点处引出一条线,
//linkStyle 线类型
JTopo.Scene.prototype.zSetStartLinkNode = function (node,linkStyle) {
    this.zStartLinkModel(linkStyle);
    this.beginNode = node;
    this.add(this.link);
    this.tempNodeA.setLocation(node.x + node.width / 2, node.y + node.height / 2);
    this.tempNodeZ.setLocation(node.x + node.width / 2, node.y + node.height / 2);
};

///开始连线模式
JTopo.Scene.prototype.zStartLinkModel = function (linkStyle) {
    this.zLinkMode = true;
    this.linkStyle = linkStyle;

    this.link = createLink(this.tempNodeA, this.tempNodeZ, this.linkStyle);
};
///关闭连线模式,会清空一些临时连线对象
JTopo.Scene.prototype.zCloseLinkModel = function () {
    this.zLinkMode = false;
    //清空一些临时的对象
    this.beginNode = null;
    if (this.link) {
        this.remove(this.link);
    }
};
///放大(动画版),与原生的放大不一样!,放大1.1表示在原来的基础上乘以1.1
JTopo.Scene.prototype.zZoomOut = function (scaleX, scaleY, speed, callback) {
    if (!scaleY) {
        scaleY = scaleX;
    }
    this.zZoom(this.scaleX * scaleX, this.scaleY * scaleY, speed, callback);

    //for (var i = 0; i < this.zGetAllEle().length; i++) {
    //    var ele = this.zGetAllEle()[i];
    //    ele.font = (20 / this.scaleX) + "px Consolas";
    //    console.log(ele.font)
    //}


};
///缩小(动画版),与原生的缩小不一样!,缩小1.1表示在原来的基础上除以1.1
JTopo.Scene.prototype.zZoomIn = function (scaleX, scaleY, speed,callback) {
    if (!scaleY) {
        scaleY = scaleX;
    }
    this.zZoom(this.scaleX / scaleX, this.scaleY / scaleY, speed, callback);

};
///缩放到指定比例(动画版)
JTopo.Scene.prototype.zZoom = function (scaleX, scaleY, speed,callback) {
    if (!scaleY) {
        scaleY = scaleX;
    }
    $(this).animate({
        scaleX: scaleX,
        scaleY: scaleY
    }, speed,callback);
}

//将某个元素获得焦点并居中
//参数params为json对象,其中speed为动画持续时间, jquery中的那种动画,x,y为将该元素移动到某个点,默认为画布宽高的一半
JTopo.Scene.prototype.zFocusEle = function (ele, params, callback) {
    ele.selected = true;
    ele.click();
    if (!params) {
        params = {};
    }
    if (!params.x&&params.x!=0) {
        params.x = this.stage.canvas.width / 2;
    }
    if (!params.y && params.y != 0) {
        params.y = this.stage.canvas.height / 2;
    }
    var a = ele.x;
    var b = ele.y;
    var c = stage;
    $(this).animate({
        translateX: -ele.x + params.x,
        translateY:-ele.y+params.y
    }, params.speed, callback);
 
};
///将某个元素获得焦点并居中,将其它元素都取消选中
JTopo.Scene.prototype.zOnlyFocusEle = function (ele, params, callback) {
    this.disSelectAll();
    this.zFocusEle(ele, params, callback);
}
//将所有元素都取消选中
JTopo.Scene.prototype.disSelectAll = function () {
    this.zGetAllEle().forEach(function (ele) {
        ele.selected = false;
    });
}
JTopo.Scene.prototype.zAdaptiveByParams = function (params) {
    var left = params.left;
    var top = params.top;
    var speed = params.speed;
    var scaleX = params.scaleX;
    var scaleY = params.scaleY;
    if (!left) {
        left = 0;
    }
    if (!top) {
        top = 0;
    }
    if (!scaleX) {
        scaleX = 1;
    }
    if (!scaleY) {
        scaleY = 1;
    }
    var minx;
    var miny;
    for (var i = 0; i < this.zGetAllEle().length; i++) {
        var ele = this.zGetAllEle()[i];
        if (ele.elementType != 'node') {
            continue;
        }
        if (ele.x < minx || minx == null) {
            minx = ele.x;
        }
        if (ele.y < miny || miny == null) {
            miny = ele.y;
        }
    }


    if (minx == null || miny == null) {
        this.translateX = this.translateY = 0;
        this.scaleX = this.scaleY = 1;
        return;
    }
    $(this).animate({
        scaleX: scaleX,
        scaleY: scaleY,
        translateX: -minx + left,
        translateY: -miny + top
    }, speed);
}


///自适应,将使最左的元素贴近场景左边,使最上的元素靠近场景的上边,重置缩放比例为1:1(动画版)
///参数:left距离左边的距离,top,距离上边的距离
JTopo.Scene.prototype.zAdaptive = function (left, top, speed) {
    var params = {
        left: left,
        top: top,
        speed:speed
    };
    this.zAdaptiveByParams(params);
};


///为舞台增加一个场景,只有调用该方法增加的场景才能有连线模式,才会能够使用其他功能
JTopo.Stage.prototype.zCreateScene = function () {
    var curScene = this.curScene;
    if (curScene) {
        this.remove(curScene);
    }
    var scene = new JTopo.Scene(this);
    scene.alpha = 1;
    //if (curScene) {
    //    scene.pScene = curScene;
    //}

    if (!stage.scenes)
    {
        stage.scenes = [];
    }
    stage.scenes.push(scene);


    this.curScene = scene;

    ///以下scene.tempNodeA/scene.link等只是加载scene上的一个属性,并不代表一定加到了scene场景上
    scene.tempNodeA = new JTopo.Node('tempA');;
    scene.tempNodeA.setSize(1, 1);

    scene.tempNodeZ = new JTopo.Node('tempZ');;
    scene.tempNodeZ.setSize(1, 1);
    scene.link = createLink(scene.tempNodeA, scene.tempNodeZ, this.linkStyle);

    //switch (this.linkStyle) {
    //    case 2:
    //        scene.link = new JTopo.FoldLink(scene.tempNodeA, scene.tempNodeZ);
    //        break;
    //    case 3:
    //        scene.link = new JTopo.FlexionalLink(scene.tempNodeA, scene.tempNodeZ);
    //        break;
    //    case 4:
    //        scene.link = new JTopo.CurveLink(scene.tempNodeA, scene.tempNodeZ);
    //        break;
    //    default:

    //}
    
  //  scene.activeLink = scene.link;
    scene.beginNode = null;
    scene.mouseup(function (e) {
        if (!scene.zLinkMode) {//如果不是画线模式则返回
            return;
        }
        if (e.button == 2) {//右键
            scene.remove(scene.link);
            if (scene.zAutoCloseLinkMode) {
                scene.zCloseLinkModel();
            }
            scene.beginNode = null;
            return;
        }
        if (e.target != null && e.target instanceof JTopo.Node && e.target.elementType == "node") {
            if (scene.beginNode == null) {//如果单击左键开始连线点为空
                scene.zSetStartLinkNode(e.target);
            } else if (scene.beginNode !== e.target) {//如果单击左键开始连线点不为该点
                var endNode = e.target;
                var l = scene.zAddLink(null, scene.beginNode, endNode, this.linkStyle);
                if (window.onDrawLinked) {
                    window.onDrawLinked(l);
                } else if (window.save) {
                    window.save();
                }

                scene.beginNode = null;
                scene.remove(scene.link);

                if (scene.zAutoCloseLinkMode) {
                    scene.zCloseLinkModel();
                }
            } else {//如果单击左键开始连线点等于起始点
                scene.beginNode = null;
               
            }
        } else {
            //点击非Node处
            scene.remove(scene.link);
            if (scene.zAutoCloseLinkMode) {
                scene.zCloseLinkModel();
            }
            scene.beginNode = null;
        }
    });

    scene.mousedown(function (e) {
        if (!scene.zLinkMode) {
            return;
        }
        if (e.target == null || e.target === scene.beginNode || e.target === scene.link) {
            scene.remove(scene.link);
            if (scene.zAutoEndLink) {
                scene.zEndLink();
            }
        }
    });
    scene.mousemove(function (e) {
        if (!scene.zLinkMode) {
            return;
        }
        ///缺,scene.tempNodeZ.setLocation(e.x, e.y);这个方法可能损耗性能比较大
        scene.tempNodeZ.setLocation(e.x, e.y);
    });

    return scene;
}
JTopo.Scene.prototype.zPScene = function ()
{
    for (var i = 0; i < stage.scenes.length; i++)
    {
        var scene = stage.scenes[i];
        if (this.entity && scene.entity && this.entity.pTopologyId == scene.entity.id)
        {
            return scene;
        }
    }
    return null;
}
//子拓扑图
JTopo.Node.prototype.zScene = function () {
    for (var i = 0; i < stage.scenes.length; i++) {
        var scene = stage.scenes[i];
        if (this.entity && this.entity.id == scene.entity.pid) {
            return scene;
        }
    }
    return null;
}


JTopo.Node.prototype.zOpen = function ()
{
    for (var i = 0; i < stage.scenes.length; i++)
    {
        if (stage.scenes[i].entity && stage.scenes[i].entity.pid == this.entity.id)
        {
            stage.remove(stage.curScene);
            stage.add(stage.scenes[i]);
            stage.curScene = stage.scenes[i];
            return stage.curScene;
        }
    }
    return false;
}
//回退场景,需要通过zCreateScene创建的场景才能回退
JTopo.Stage.prototype.zBack = function ()
{
    var pScene = this.curScene.zPScene();
    if (!this.curScene || !pScene) {
        //当前场景不存在或当前场景没有父场景
        return false;
    }

    this.remove(this.curScene);
    this.add(pScene);
    this.curScene = pScene;
    return pScene;
}
///画布全屏
JTopo.Stage.prototype.zFullScreen = function(){
   return runPrefixMethod(stage.canvas, "RequestFullScreen");
}

var runPrefixMethod = function (element, method) {
    var usablePrefixMethod;
    ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {
        if (usablePrefixMethod) return;
        if (prefix === "") {
            // 无前缀，方法首字母小写
            method = method.slice(0, 1).toLowerCase() + method.slice(1);
        }
        var typePrefixMethod = typeof element[prefix + method];
        if (typePrefixMethod + "" !== "undefined") {
            if (typePrefixMethod === "function") {
                usablePrefixMethod = element[prefix + method]();
            } else {
                usablePrefixMethod = element[prefix + method];
            }
        }
    }
);
    return usablePrefixMethod;
};
JTopo.Stage.prototype.downImgag = function (filename) {
   

    if (filename === undefined) {
        filename = "下载.png";

        if (this.curScene && this.curScene.entity && this.curScene.entity.memo) {
            filename = this.curScene.entity.memo + ".png";
        }


    }
    var dataUrl = this.canvas.toDataURL();

    var r = "png".toLowerCase().replace(/jpg/i, 'jpeg').match(/png|jpeg|bmp|gif/)[0];
    dataUrl = dataUrl.replace("image/" + r, "image/octet-stream");

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = dataUrl;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);

}