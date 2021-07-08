<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/inc/_header.jsp"%>
    <script src="/js/jtopo-0.4.8-min.js"></script>
</head>
<body>
    <canvas id="canvas" style="background-color:#a7b5bc;" width="800" height="800"></canvas>
    <script>
        // <script type="text/javascript" src="js/jtopo-min.js"> //引入jtopo
        var canvas = document.getElementById('canvas');
        var stage = new JTopo.Stage(canvas); // 创建一个舞台对象
        var scene = new JTopo.Scene(stage); // 创建一个场景对象

        var node = new JTopo.Node("Hello");    // 创建一个节点
        node.setLocation(500,100);    // 设置节点坐标
        scene.add(node); // 放入到场景中
        node.layout = {type: 'circle', radius: 150};

        var node1 = new JTopo.CircleNode('host');
        node1.setLocation(100,50);
        node1.layout = {type: 'circle', radius: 80};
        scene.add(node1);

        var link = new JTopo.Link(node,node1);
        scene.add(link);

        JTopo.layout.layoutNode(scene, node, true);

        document.onkeydown = function(evt){
            var evt = window.event?window.event:evt;
            var step = 5;
            switch(evt.keyCode){
                case 87:
                case 38:

                        node.y -= step;
                    break;
                case 83:
                case 40:
                        node.y += step;
                    break;
                case 65:
                case 37:
                        node.x -= step;
                    break;
                case 68:
                case 39:
                        node.x += step;
                    break;
            }

            node.text = "x:"+node.x+",y:"+node.y;
        }
        scene.addEventListener('mouseup', function(e){
            if(e.target && e.target.layout){
                JTopo.layout.layoutNode(scene, e.target, true);
            }
        });
    </script>
</body>
</html>
