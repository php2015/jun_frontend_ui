/**
 * 表单解析js文件
 * @author tony
 * @copyright www.olerp.com
 */
//显示对话框
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

//修复setTimeout bug，使用window.setTimeout调用
if(!+'\v1') {
    (function(f){
        window.setTimeout =f(window.setTimeout);
        window.setInterval =f(window.setInterval);
    })(function(f){
        return function(c,t){
            if(typeof(c) == "string")
               return eval(c);
               
            var a=[].slice.call(arguments,2);
            return f(function(){
                c.apply(this,a)},t)
            }
    });
}


function LoadDialogWindow(URL, parent, loc_x, loc_y, width, height)
{
  if(is_ie)//window.open(URL);
     window.showModalDialog(URL,parent,"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:"+width+"px;dialogHeight:"+height+"px;dialogTop:"+loc_y+"px;dialogLeft:"+loc_x+"px",true);
  else
     window.open(URL,parent,"height="+height+",width="+width+",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top="+loc_y+",left="+loc_x+",resizable=yes,modal=yes,dependent=yes,dialog=yes,minimizable=no",true);
}
 
//校验表单的值
function xd_form_data_valid(valid_string,id){
	
}

//list_view添加行
var XD_FORM_LISTVIEW_TR_COUNT = 0;
function xd_form_tb_add(lv_tb_id,read_only,row_value,is_del)
{
    XD_FORM_LISTVIEW_TR_COUNT++;
    var mytable=document.getElementById(lv_tb_id);
    var size_array=mytable.getAttribute("lv_size").split("`");
    var sum = mytable.getAttribute("lv_sum");
    var cal = mytable.getAttribute("lv_cal");
    var coltype=mytable.getAttribute("lv_coltype");
    var colvalue=mytable.getAttribute("lv_value");
    row_value=row_value.replace(/&lt;BR&gt;/g, "\r\n");
    row_value=row_value.replace(/&lt;br&gt;/g, "\r\n");
    
    var row_value_array=row_value.split("`");
    if(mytable.getAttribute("data_table") != null)
    {
        var data_fld_name=mytable.getAttribute("data_fld_name");
        var data_table=mytable.getAttribute("data_table");
        var data_field=mytable.getAttribute("data_field");
        var dataQuery=mytable.getAttribute("data_query");
        var data_field_array = data_field.split("`");
    }
    var sum_flag=0;
    var cell_html="";
    if(sum!='')
    {
        var sum_array=sum.split("`");
        for(i=0;i<sum_array.length;i++)
        {
            if(sum_array[i]==1) 
            {
                sum_flag=1;
                break;
            }
        }
    }
    if(cal!='')
        var cal_array=cal.split("`");
    
    if(data_field!="")
    {
        var data_field_array=data_field.split("`");
    }
    var coltype_array=mytable.getAttribute("lv_coltype").split("`");
    var colvalue_array=mytable.getAttribute("lv_value").split("`");
    
    maxcell=mytable.rows[0].cells.length;
    if(mytable.rows.length==1 || sum_flag==0){
        mynewrow = mytable.insertRow(-1);
    }else{
		//console.log(mytable.rows.length);
		if(mytable.rows.length > 1 || sum_flag != 0){
			mynewrow = mytable.insertRow(mytable.rows.length - 1);
		} else {
			mynewrow = mytable.insertRow(mytable.rows.length);
		}
	}
    //标识行id
    var rowId = lv_tb_id+"_r"+mynewrow.rowIndex;
    mynewrow.setAttribute("id", rowId);
    //序号
    mynewcell=mynewrow.insertCell(-1);
    mynewcell.style.textAlign = "center";
    mynewcell.innerHTML = mynewrow.rowIndex;
    for(i=0;i<maxcell-2;i++)
    {
        mynewcell=mynewrow.insertCell(-1);
        
        //标识列id
        var cellId = rowId+"_c"+mynewcell.cellIndex
        mynewcell.setAttribute("id", cellId);
        if(data_field_array && data_field_array[i] != "")
        {
            mynewcell.setAttribute("field", data_field_array[i]);
        }
        
        //列表项空数据使用getRunData获取后是不进行处理的，在这里取到的是undefined
        if(row_value_array[i] == undefined)
        {
        	row_value_array[i] = "";
        }
        if(read_only == "1")
            mynewcell.innerText=row_value_array[i];
        else
        {
            switch(coltype_array[i]) 
            {
                case 'text':
                    cell_html="<input type=text ";
                    cell_html+=" size="+ size_array[i];
                    if(row_value!="")
                       cell_html+=" value=\""+ row_value_array[i]+"\"";
                    if(cal_array && cal_array[i]!='')
                       cell_html+=" readonly class=BigStatic";
                    else
                    	 cell_html+=" class=BigInput";
                    cell_html+=">";
                    mynewcell.innerHTML=cell_html;
                    break;
                case 'textarea':        
                    cell_html="<textarea ";
                    cell_html+="rows=2 cols="+ size_array[i];
                    if(cal_array && cal_array[i]!='')
                        cell_html+=" readonly class=BigStatic";
                    else
                        cell_html+=" class=BigInput";
                    cell_html += ">";
                    if(row_value!="")
                        cell_html+= row_value_array[i];
                    cell_html+="</textarea>";
                    mynewcell.innerHTML=cell_html;
                    break;
                case 'select':
                    cell_html="<select>";
                    if(colvalue_array[i]!='')
                    {
                        colvalue_inner_array=colvalue_array[i].split(",");
                        for(var j=0;j<colvalue_inner_array.length;j++)
                        {
                            if(row_value_array[i]==colvalue_inner_array[j])
                                cell_html+="<option value=\""+colvalue_inner_array[j]+"\" selected>"+colvalue_inner_array[j]+"</option>";
                            else
                                cell_html+="<option value=\""+colvalue_inner_array[j]+"\">"+colvalue_inner_array[j]+"</option>";
                        }
                    }
                    cell_html+="</select>";
                    mynewcell.innerHTML=cell_html;
                    break;
                case 'radio':
                    if(colvalue_array[i]!='')
                    {
                        colvalue_inner_array=colvalue_array[i].split(",");
                        for(var j=0;j<colvalue_inner_array.length;j++)
                        {
                            if(row_value_array[i]==colvalue_inner_array[j])
                                cell_html+="<input name='radio"+XD_FORM_LISTVIEW_TR_COUNT+i+"' type=radio value=\""+colvalue_inner_array[j]+"\" checked>"+colvalue_inner_array[j];
                            else
                                cell_html+="<input name='radio"+XD_FORM_LISTVIEW_TR_COUNT+i+"' type=radio value=\""+colvalue_inner_array[j]+"\">"+colvalue_inner_array[j];
                        }
                    }
                    mynewcell.innerHTML=cell_html;
                    break;
                case 'checkbox':
                    var flag=0;
                    if(row_value!="")
                        value_array=row_value_array[i].split(',');
                    if(colvalue_array[i]!='')
                    {
                        colvalue_inner_array=colvalue_array[i].split(",");
                        for(var j=0;j<colvalue_inner_array.length;j++)
                        {      
                            if(row_value!="")
                            {                                       
                                for(var k=0;k <value_array.length;k++)
                                {
                                    if(value_array[k]==colvalue_inner_array[j].replace(/(^\s*)|(\s*$)/g, ""))
                                    {
                                        cell_html+="<input type=checkbox value=\""+colvalue_inner_array[j]+"\" checked>"+colvalue_inner_array[j];
                                        flag = 1;
                                    }
                                }
                            }    
                            if(flag==0)    
                                 cell_html+="<input type=checkbox value=\""+colvalue_inner_array[j]+"\">"+colvalue_inner_array[j];
                            flag=0;
                        }
                    }
                    mynewcell.innerHTML=cell_html;
                    break;
                case 'datetime':
                    cell_html="<input type=text onClick='WdatePicker()'";
                    cell_html+=" size="+ size_array[i];
                    if(row_value!="")
                       cell_html+=" value=\""+ row_value_array[i]+"\"";
                    if(cal_array && cal_array[i]!='')
                       cell_html+=" readonly class=BigStatic";
                    else
                    	 cell_html+=" class=BigInput";
                    cell_html+=">";
                    mynewcell.innerHTML=cell_html;
                    break;
                default:
                    cell_html="<input type=text ";
                    cell_html+=" size="+ size_array[i];
                    if(row_value!="")
                       cell_html+=" value=\""+ row_value_array[i]+"\"";
                    if(read_only=="1" || (cal_array && cal_array[i]!=''))
                       cell_html+=" readonly class=BigStatic";
                    else
                    	 cell_html+=" class=BigInput";
                    cell_html+=">";
                    mynewcell.innerHTML=cell_html;
            }
            cell_html="";
        }
    }    
    mynewcell=mynewrow.insertCell(-1);
    if(read_only!="1" && is_del != "")
        mynewcell.innerHTML="<input type=button value=\"删除\" onclick=xd_form_tb_delete('"+lv_tb_id+"',this)>";//删除
    if(data_table && data_table != "" && data_table != "0" && read_only!="1")
    {
        mynewcell.innerHTML = "<input type=button value=\"选择\" onclick=xd_form_list_data_picker(this,'"+data_table+"','"+data_field+"','"+data_fld_name+"','"+dataQuery+"')>" + mynewcell.innerHTML;//选择
    }
    if(sum_flag==1 && mytable.rows.length==2)
        xd_form_tb_add_sum(lv_tb_id,sum,sum_flag);
}

//表格计算
function xd_form_tb_cal(lv_tb_id,cal)
{
	var cell_value;
    var mytable=document.getElementById(lv_tb_id);
    var coltype_array=mytable.getAttribute("lv_coltype").split("`");
    if(mytable.rows.length==1) return;
    if(cal)
    {
        var cal_array=cal.split("`");
        for(i=1;i<mytable.rows.length;i++)
        {
        	if(mytable.rows[i].id == lv_tb_id+"_sum")
        	    continue;
            for(k=0;k<cal_array.length;k++)
            {
                var cal_str=cal_array[k];
				
                if(cal_str=="" || !mytable.rows[i].cells[k].firstChild.tagName)
                    continue;

                for(j=1;j<mytable.rows[i].cells.length-1;j++)
                {
                    var re = new RegExp("\\["+j+"\\]","ig");
                    var cell = mytable.rows[i].cells[j];
                    if(coltype_array[j]=="radio" || coltype_array[j]=="checkbox")
                    {
                        if(jQuery("input:radio:checked,input:checkbox:checked",cell).length>0)
                        {
                            cell_value=parseFloat(jQuery("input:radio:checked,input:checkbox:checked",cell).get(0).value);
                        }
                        else
                            cell_value=0;
                    }
                    else
                    {
                        cell_value=parseFloat(cell.firstChild.value);
                        if(isNaN(cell_value))
                        {
                            cell_value = 0;
                        }
                    }
                    cal_str=cal_str.replace(re,cell_value);
                }
                mytable.rows[i].cells[k+1].firstChild.value=isNaN(eval(cal_str))?0:Math.round(parseFloat(eval(cal_str))*10000)/10000;  
            }
        }
    }
}

//删除表格一行
function xd_form_tb_delete(lv_tb_id,del_btn)
{
  var mytable=document.getElementById(lv_tb_id);
  mytable.deleteRow(del_btn.parentNode.parentNode.rowIndex);
  if(mytable.rows.length==2 && document.all(lv_tb_id+"_sum"))
    mytable.deleteRow(1);
  //重新计算序号
  var forLength = mytable.rows.length;
  var sum_array = mytable.getAttribute("lv_sum");
  if(sum_array.indexOf('1') >= 0){
	forLength--;
  }
  
  for(var i = 1; i < forLength; i++)
  {
  	  var row_obj = mytable.rows[i];
  	  row_obj.cells[0].innerHTML = i;
  }
}

//列表控件计算列值
function xd_form_tb_add_sum(lv_tb_id,sum,sum_flag)
{
  var mytable=document.getElementById(lv_tb_id);
  var size_array=mytable.getAttribute("lv_size").split("`");
  sum = "0`"+sum;
  var sum_array=sum.split("`");
  var maxcell=mytable.rows[0].cells.length;
  //增加合计
  sumrow=mytable.insertRow(-1);
  sumrow.setAttribute('id',lv_tb_id+'_sum');
  for(i=0;i<maxcell-1;i++)
  {
    sumcell=sumrow.insertCell(-1);
    if(sum_array && sum_array[i]==1)
    {
      cell_html="<input type=text style='border:none;background:#ffffff;text-align:right;' size="+size_array[i-1]+" readonly class=BigStatic>";
      sumcell.innerHTML=cell_html;
    }
  }
  sumcell=sumrow.insertCell(-1); 
  sumcell.innerHTML="<input type=button value=\"合计\" onclick=xd_form_tb_sum('"+lv_tb_id+"','"+sum+"')>";//合计
  
  setInterval(xd_form_tb_sum,2000,lv_tb_id,sum);
}

//列值合计
function xd_form_tb_sum(lv_tb_id,sum)
{
    var mytable=document.getElementById(lv_tb_id);
    if(mytable.rows.length==1) return;
    var sumrow=mytable.rows[mytable.rows.length-1];
    var sum_array=sum.split("`");
    for(i=0;i<sum_array.length;i++)
    {
        var sum_value=0;
        if(sum_array[i]==1)
        {
            for(j=1;j<mytable.rows.length-1;j++)
            {
                var child_ojb = mytable.rows[j].cells[i].firstChild
                if(child_ojb && child_ojb.tagName)
                    sum_value+=parseFloat(mytable.rows[j].cells[i].firstChild.value==''?0:mytable.rows[j].cells[i].firstChild.value);
                else
                    sum_value+=parseFloat(mytable.rows[j].cells[i].innerText==''?0:mytable.rows[j].cells[i].innerText);
            }
            
            if(isNaN(sum_value))
                sumrow.cells[i].firstChild.value="0";
            else
                sumrow.cells[i].firstChild.value=Math.round(sum_value*10000)/10000;
        }
    }
}

// 数据选择控件
function xd_form_data_picker(obj,item_str)
{
	var dataSrc=obj.getAttribute("data_table");
	var dataField=obj.getAttribute("data_field");
	var dataFieldName=obj.getAttribute("data_fld_name");
	var dataQuery=obj.getAttribute("date_query");
	var URL="/general/workflow/list/input_form/data_picker.php?dataSrc="+dataSrc+"&dataField="+dataField+"&dataFieldName="+dataFieldName+"&item_str="+item_str+"&dataQuery="+dataQuery;
	var openWidth = 800;
	var openHeight = 450;
	var loc_x = (screen.availWidth - openWidth) / 2;
	var loc_y = (screen.availHeight - openHeight) / 2;
	LoadDialogWindow(URL,self,loc_x, loc_y, openWidth, openHeight);
}

//显示列表数据
function xd_form_list_data_picker(obj,table, field, fieldName, dataQuery)
{
    var tbl = obj.parentNode.parentNode.parentNode.parentNode;
    var row_id = obj.parentNode.parentNode.id;
	var dataSrc=table;
	var dataField=field;

	var URL="/general/workflow/list/input_form/data_picker.php?dataSrc="+dataSrc+"&dataField="+field+"&dataFieldName="+fieldName+"&dataQuery="+dataQuery+"&row_id="+row_id+"&LIST_VIEW=LIST_VIEW";
	var openWidth = 800;
    var openHeight = 450;
    var loc_x = (screen.availWidth - openWidth) / 2;
    var loc_y = (screen.availHeight - openHeight) / 2;
    LoadDialogWindow(URL,self,loc_x, loc_y, openWidth, openHeight);
}

//按钮的现实和隐藏
function xd_form_auto_btn(id)
{
	var btnDom = document.getElementById(id);
	if(btnDom){
		if(btnDom.style.display=="none")
			btnDom.style.display="";
		else
			btnDom.style.display="none";
	}
}


function xd_form_dis_date(domObj){
	var date_format = domObj.getAttribute('date_format');
	if(!date_format){
		date_format = 'yyyy-MM-dd';
	}
	var des_obj = domObj.getAttribute('des');
	WdatePicker({dateFmt:date_format,el:document.getElementById(des_obj)});
}

//---- 计算控件相关函数 ----
function calc_rmb(currencyDigits) 
{
  // Constants:
  var MAXIMUM_NUMBER = 99999999999.99;
  // Predefine the radix characters and currency symbols for output:
  var CN_ZERO = td_lang.general.workflow.msg_16;//"零"
  var CN_ONE = td_lang.general.workflow.msg_17;//"壹"
  var CN_TWO = td_lang.general.workflow.msg_18;//"贰"
  var CN_THREE = td_lang.general.workflow.msg_19;//"叁"
  var CN_FOUR = td_lang.general.workflow.msg_31;//"肆"
  var CN_FIVE = td_lang.general.workflow.msg_32;//"伍"
  var CN_SIX = td_lang.general.workflow.msg_33;//"陆"
  var CN_SEVEN = td_lang.general.workflow.msg_34;//"柒"
  var CN_EIGHT = td_lang.general.workflow.msg_35;//"捌"
  var CN_NINE = td_lang.general.workflow.msg_36;//"玖"
  var CN_TEN = td_lang.general.workflow.msg_37;//"拾"
  var CN_HUNDRED = td_lang.general.workflow.msg_38;//"佰"
  var CN_THOUSAND = td_lang.general.workflow.msg_39;//"仟"
  var CN_TEN_THOUSAND = td_lang.general.workflow.msg_40;//"万"
  var CN_HUNDRED_MILLION = td_lang.general.workflow.msg_41;//"亿"
  var CN_DOLLAR = td_lang.general.workflow.msg_42;//"元"
  var CN_TEN_CENT = td_lang.general.workflow.msg_43;//"角"
  var CN_CENT = td_lang.general.workflow.msg_44;//"分"
  var CN_INTEGER = td_lang.general.workflow.msg_45;//"整"
  
  // Variables:
  var integral; // Represent integral part of digit number.
  var decimal; // Represent decimal part of digit number.
  var outputCharacters; // The output result.
  var parts;
  var digits, radices, bigRadices, decimals;
  var zeroCount;
  var i, p, d;
  var quotient, modulus;
  
  // Validate input string:
  currencyDigits = currencyDigits.toString();
  if (currencyDigits == "") {
     return "";
  }
  if (currencyDigits.match(/[^,.\d]/) != null) {
     return "";
  }
  if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
     return "";
  }
  
  // Normalize the format of input digits:
  currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
  currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
  // Assert the number is not greater than the maximum number.
  if (Number(currencyDigits) > MAXIMUM_NUMBER) {
     return "";
  }

  // Process the coversion from currency digits to characters:
  // Separate integral and decimal parts before processing coversion:
  parts = currencyDigits.split(".");
  if (parts.length > 1) {
     integral = parts[0];
     decimal = parts[1];
     // Cut down redundant decimal digits that are after the second.
     decimal = decimal.substr(0, 2);
  }
  else {
     integral = parts[0];
     decimal = "";
  }
  // Prepare the characters corresponding to the digits:
  digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
  radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
  bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
  decimals = new Array(CN_TEN_CENT, CN_CENT);
  // Start processing:
  outputCharacters = "";
  // Process integral part if it is larger than 0:
  if (Number(integral) > 0) {
     zeroCount = 0;
     for (i = 0; i < integral.length; i++) {
         p = integral.length - i - 1;
         d = integral.substr(i, 1);
         quotient = p / 4;
         modulus = p % 4;
         if (d == "0") {
            zeroCount++;
         }
         else 
         {
            if (zeroCount > 0)
            {
               outputCharacters += digits[0];
            }
            zeroCount = 0;
            outputCharacters += digits[Number(d)] + radices[modulus];
         }
         if (modulus == 0 && zeroCount < 4) {
            outputCharacters += bigRadices[quotient];
         }
     }
     outputCharacters += CN_DOLLAR;
  }
  // Process decimal part if there is:
  if (decimal != "") {
     for (i = 0; i < decimal.length; i++) {
          d = decimal.substr(i, 1);
          if (d != "0") {
              outputCharacters += digits[Number(d)] + decimals[i];
          }
     }
  }
  // Confirm and return the final output string:
  if (outputCharacters == "") {
      outputCharacters = CN_ZERO + CN_DOLLAR;
  }
  if (decimal == "") {
      outputCharacters += CN_INTEGER;
  }
  //outputCharacters = CN_SYMBOL + outputCharacters;
  return outputCharacters;
}

function calc_max()
{
	if(arguments.length==0)
	  return;
  var max_num=arguments[0];
	for(var i=0;i<arguments.length;i++)
	  max_num=Math.max(max_num,arguments[i]);
	return parseFloat(max_num);
}

function calc_min()
{
	if(arguments.length==0)
	  return;
  var min_num=arguments[0];
	for(var i=0;i<arguments.length;i++)
	  min_num=Math.min(min_num,arguments[i]);
	return parseFloat(min_num);
}

function calc_mod()
{
	if(arguments.length==0)
	  return;
  var first_num=arguments[0];
  var second_num=arguments[1];
  var result = first_num % second_num;
  result = isNaN(result)?"":parseFloat(result);
  return result;
}

function calc_abs(val)
{
  return Math.abs(parseFloat(val));
}

function calc_avg()
{
    if(arguments.length==0)
	    return;
	var sum = 0;
	for(var i = 0; i < arguments.length; i++)
	{
	    sum+=parseFloat(arguments[i]);
	}
	return parseFloat(sum/arguments.length);
}


function calc_day(val)
{
	return val==0?0:Math.floor(val/86400);
}

function calc_hour(val)
{
	return val==0?0:Math.floor(val/3600);
}

function calc_date(val)
{
    return (val>=0) ? Math.floor(val/86400)+td_lang.general.workflow.msg_46+Math.floor((val%86400)/3600)+td_lang.general.workflow.msg_47+Math.floor((val%3600)/60)+td_lang.general.workflow.msg_44+Math.floor(val%60)+td_lang.general.workflow.msg_48:td_lang.general.workflow.msg_49;//'日期格式无效'
}

function calc_getval(val)
{
    var obj = document.getElementsByName(val);
  
    if(obj.length==0)
        return 0;
    
    if(obj[0].className == 'LIST_VIEW')
    {
        return document.getElementById("LV_"+val.substring(5));
    }

    var vVal = obj[0].value;
    //判断是否为时间
	if(vVal.indexOf("-")>0)
	{
		
	  //eval("date_flag_"+flag+"=1");
	  vVal=vVal.replace(/\-/g,"/");
	  var d=new Date(vVal);
	  return d.getTime()/1000;
	}
	else if(vVal=="" || isNaN(vVal))
        vVal=0;
  
    return parseFloat(vVal);
}

function calc_list(olist,col)
{
    if(!olist)
      return 0;
    if(!col)
      return 0;
      
    //col--;  
    var output = 0;
    var lv_tb_id = olist.getAttribute("id");
    var row_length = olist.rows.length;
    if(document.getElementById(lv_tb_id+'_sum'))
        row_length--;
        
    for(i=1;i < row_length;i++)
    {
        for (j=0; j < olist.rows[i].cells.length-1; j++)
        {
            if(j==col)
            {
                var child_ojb = olist.rows[i].cells[j].firstChild;
                var olist_val = olist.rows[i].cells[j].firstChild.value;
                olist_val = (olist_val == "" || olist_val.replace(/\s/g,'') == "")? 0 : olist_val;
                olist_val = (isNaN(olist_val))? NaN : olist_val;
                if(child_ojb && child_ojb.tagName)
                    output += parseFloat(olist_val);
//                if(child_ojb && child_ojb.tagName)
//                    output += parseFloat(olist.rows[i].cells[j].firstChild.value);
                else
                    output += parseFloat(olist.rows[i].cells[j].innerText);
            }
        }
    }
    return  parseFloat(output);
}

