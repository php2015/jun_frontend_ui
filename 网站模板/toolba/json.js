/** ----------------------------------

Name    : Json美化、校验、转换
Version : 1.0

----------------------------------
*/
function JsonDemo(){
    var json = '{\n\
  "url": "http://toolba.cn/",\n\
  "name": "欢迎使用Json在线校验、格式化、转换工具",\n\
  "array": [\n\
    1,\n\
    2,\n\
    3\n\
  ],\n\
  "boolean": true,\n\
  "null": null,\n\
  "number": 123,\n\
  "object": {\n\
    "a": "b",\n\
    "c": "d",\n\
    "e": "f"\n\
  },\n\
  "string": "Hello World",\n\
  "v1.0":"2019-011-20 17:45: 工具上线"\n\
}';

    $("#code").val(json);
}

/*
var Json = {
    Check: function(a){
        var data;
        try {
            var result = jsonlint.parse(a);
            if (result) {
                data = {"result":"success"};
            }
        } catch(e){
            data = {"result":"error","data":e};
        }
        return data;
    }
}
*/
//console.log(Json.Check($("#code").val()));

$(".validate").click(function(){
    
    try {
        var result = jsonlint.parse($("#code").val());
        if (result) {
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            $("#fcode").val('');
            $(".result").html("<div class=\"alert alert-info\">正确的JSON</div>");
            if( document.getElementById("reformat").checked ){
                $("#fcode").val(JSON.stringify(result, null, "  "));
            }
        }
    } catch(e){
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }
    
});

$(".format").click(function(){
    $(".result").html("");
    var result = jsonlint.parse($("#code").val());
    $("#fcode").val(JSON.stringify(result, null, "  "));
});

$(".compress").click(function(){
    var _loc1_ = $("#code").val();
    
    try {
        var result = jsonlint.parse(_loc1_);
        if (result) {
            var _loc2_ = _loc1_.split("\n").join(" ");
            var t = [];
            var inString = false;
            for (var i = 0, len = _loc2_.length; i < len; i++) {
                var c = _loc2_.charAt(i);
                if (inString && c === inString) {
                    if (_loc2_.charAt(i - 1) !== '\\') {
                        inString = false;
                    }
                } else if (!inString && (c === '"' || c === "'")) {
                    inString = c;
                } else if (!inString && (c === ' ' || c === "\t")) {
                    c = '';
                }
                t.push(c);
            }
            var _loc_ = t.join('');
            $(".result").html("");
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            $("#fcode").val(_loc_);
        }
    }catch(e){
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }
});

$(".escape").click(function(){
    var _loc1_ = $("#code").val();
    $("#fcode").val(_loc1_.replace(/\\/g, "\\\\").replace(/\"/g, "\\\""));
});

$(".compressescape").click(function(){
    var _loc1_ = $("#code").val();
    
    try {
        var result = jsonlint.parse(_loc1_);
        if (result) {
            var _loc2_ = _loc1_.split("\n").join(" ");
            var t = [];
            var inString = false;
            for (var i = 0, len = _loc2_.length; i < len; i++) {
                var c = _loc2_.charAt(i);
                if (inString && c === inString) {
                    if (_loc2_.charAt(i - 1) !== '\\') {
                        inString = false;
                    }
                } else if (!inString && (c === '"' || c === "'")) {
                    inString = c;
                } else if (!inString && (c === ' ' || c === "\t")) {
                    c = '';
                }
                t.push(c);
            }
            var _loc_ = t.join('');
            $(".result").html("");
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            $("#fcode").val(_loc_.replace(/\\/g, "\\\\").replace(/\"/g, "\\\""));
        }
    }catch(e){
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }
});

$(".deslash").click(function(){
    var _loc1_ = $("#code").val();
    $("#fcode").val(_loc1_.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"'));
});

$(".JsonToXml").click(function(){
    var xmlobjtree = new XML.ObjTree();
    
    try {
        
        var _loc1_ = $("#code").val();
        var result = jsonlint.parse(_loc1_);
        if (result) {
            $(".result").html("");
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            var _loc2_ = eval("(" + _loc1_ + ")");
            //$("#result").val(formatXml(xmlobjtree.writeXML(json))).siblings("b").hide();
            $("#fcode").val(formatXml(xmlobjtree.writeXML(_loc2_))).siblings("b").hide();
        }
        
    } catch (e) {
        $(".result").html("<div class=\"alert alert-danger\">Erroe！！！\n转XML异常，检查JSON错误信息。</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }
    
});

$(".xmltojson").click(function(){
    var xmlobjtree = new XML.ObjTree();
    var dumper = new JKL.Dumper();
    var xmlText = $("#code").val();
    
    if (!xmlText) {
        alert("请输入XML字符串");
        $("#code").focus();
        return false;
    }
    xmlText = xmlText.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\""); //HTML转义
    var tree = xmlobjtree.parseXML(xmlText);
    if (tree) {
        if (!tree.html){
            $("#fcode").val(dumper.dump(tree)).siblings("b").hide();
        }else {
            alert("请检查XML是否错误。");
            $("#code").focus();
        }
    }
});

$(".jsontoget").click(function(){
    
    var _loc1_ = $("#code").val();
    
    try {
        var result = jsonlint.parse(_loc1_);
        if (result) {
            var _loc2_ = _loc1_.split("\n").join(" ");
            var t = [];
            var inString = false;
            for (var i = 0, len = _loc2_.length; i < len; i++) {
                var c = _loc2_.charAt(i);
                if (inString && c === inString) {
                    if (_loc2_.charAt(i - 1) !== '\\') {
                        inString = false;
                    }
                } else if (!inString && (c === '"' || c === "'")) {
                    inString = c;
                } else if (!inString && (c === ' ' || c === "\t")) {
                    c = '';
                }
                t.push(c);
            }
            var _loc3_ = t.join('');
            var _loc4_ = _loc3_.replace(/\t/g,"");
            var _loc5_ = _loc4_.replace(/\"/g,"").replace("{","").replace("}","").replace(",","&").replace(":","=");
            var _loc6_ = _loc5_.replace(/\"/g,"").replace(/{/g,"").replace(/}/g,"").replace(/,/g,"&").replace(/:/g,"=");

            $(".result").html("");
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            $("#fcode").val(_loc6_);
        }
    }catch(e){
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }

});

$(".GetToJson").click(function(){
    var _loc1_ = $("#code").val();
    var _loc2_ = _loc1_.replace(/&/g,'","').replace(/=/g,'":"');
    var _loc3_ = '{"'+_loc2_+'"}';
    $("#fcode").val(_loc3_);
});
            
$(".toc").click(function(){
    
    var _loc1_ = $("#code").val();
    
    /*
    try {
        var result = jsonlint.parse(_loc1_);
        if (result) {
            $(".result").html("");
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            $("#fcode").val(JSON2CSharp.convert(_loc1_)).siblings("b").hide();
        }
    } catch(e){
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }
    */
    
    if (!_loc1_.trim()) {
        alert("请填写JSON");
        return false;
    }
    try {
        var v = eval("(" + _loc1_ + ")");
        var res = "";
        /*
        if ($("#showtype").val() == 0)
            res = JSON2CSharp.convert(v);
        else res = JSON2POJO.convert(v);
        */
        res = JSON2CSharp.convert(v);
        $("#fcode").val(res).siblings("b").hide();
    } catch (e) {
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!\n生成C#实体类异常，请检查Json是否错误。</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }

});

$(".tojava").click(function(){
    alert("Development......");
});

$(".tophp5").click(function(){
    alert("Development......");
});

$(".tophp7").click(function(){
    alert("Development......");
});

$(".togo").click(function(){
    var _loc1_ = $("#code").val();
    
    try {
        var result = jsonlint.parse(_loc1_);
        if (result) {
            $(".result").html("");
            $("#fcode").css({"background":"#fff","color":"#495057","border-color":"#ced4da",});
            var output = jsonToGo(_loc1_, "", true, false);
            $("#fcode").val(output.go);
        }
    } catch(e){
        $(".result").html("<div class=\"alert alert-danger\">Erroe!!!</div>");
        $("#fcode").css({"background":"#fbe3e4","color":"#d12f19","border-color":"#fbe3e4",});
        $("#fcode").val(e);
    }
});

String.prototype.formatx = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i]
    })
};
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};

var JSON2CSharp = {
    _allClass: [],
    _genClassCode: function(obj, name) {
        var clas = "public class {0}\r\n{\r\n".formatx(name || "Root");
        for (var n in obj) {
            var v = obj[n];
            n = n.trim();
            //变量定义规则
            n = n.replace(/[^\w]+/ig, '_');
            if (/^\d+/.test(n)) n = "_" + n;
            clas += "    {0}    public {1} {2} { get; set; }\r\n".formatx(this._genComment(v, n), this._genTypeByProp(n, v), n);
        }
        clas += "}\r\n";
        this._allClass.push(clas);
        return this._allClass.join("\r\n");
    },
    _genTypeByProp: function(name, val) {
        try {
            if (typeof val == "string") {
                var regdt = /^(\d{4})(-|\/|年)(\d{2})(-|\/|月)(\d{2})(日)?(\s((\d{1,2}):)?((\d{1,2}):)?(\d{1,2})?)?$/
                if (regdt.test(val.trim())) val = new Date(val);
            }
        } catch (e) {

        }
        switch (Object.prototype.toString.apply(val)) {
        case "[object Number]":
            {
                return val.toString().indexOf(".") > -1 ? "double" : "int";
            }
        case "[object Date]":
            {
                return "DateTime";
            }
        case "[object Object]":
            {
                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                this._genClassCode(val, name);
                return name;
            }
        case "[object Array]":
            {
                return "List<{0}>".formatx(this._genTypeByProp(name, val[0]));
            }
        case "[object Boolean]":
            {
                return "bool";
            }
        default:
            {
                return "string";
            }
        }
    },
    _genComment: function(val, n) {
        //var commm = typeof (val) == "string" && /.*[\u4e00-\u9fa5]+.*$/.test(val) ? val : "";
        var s = Object.prototype.toString.apply(val);
        var commm = typeof(val) == "string" ? val : n.substring(0, 1).toUpperCase() + n.substring(1);;
        return "/// <summary>\r\n    /// " + commm + "\r\n    /// </summary>\r\n";
    },
    convert: function(jsonObj) {
        this._allClass = [];
        return this._genClassCode(jsonObj);
    }
}


















