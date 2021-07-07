/** layui-plus-v1.0.0 MIT License By https://gitee.com/zqaq_520/layui-plus */
 ;layui.define(['form','layer','jquery',"globalConfig"], function(exports){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element;
        $ = layui.jquery;

    $.get(layui.globalConfig.iconUrl,function(data){
        var iconHtml = '';
        for(var i=1;i<data.split(".icon-").length;i++){
            iconHtml += "<li class='layui-col-xs4 layui-col-sm3 layui-col-md2 layui-col-lg1'>"+
                            "<i class='seraph icon-" + data.split(".icon-")[i].split(":before")[0] + "'></i>" +
                            "icon-" + data.split('.icon-')[i].split(':before')[0] +
                        "</li>";
        }
        $(".icons").html(iconHtml);
        $(".iconsLength").text(data.split(".icon-").length-1);
    })

    $("body").on("click",".icons li",function(){
        var copyText = document.getElementById("copyText");
        copyText.innerText = $(this).text();
        copyText.select();
        document.execCommand("copy");
        layer.msg("复制成功",{anim: 2});
    })
	
	exports('icons',{});
})
