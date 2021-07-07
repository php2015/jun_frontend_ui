// 分页模板
var _template_pages_html = '<%if(pageNo<=1){%><li class="disabled"><a href="javascript:void(0);">«</a></li>'+
	'<%}else{%><li class=""><a href="javascript:fun_to_page(<%=pageNo-1%>);">«</a></li><%}%>'+
	'<%if(pageNo>5){%><li class=""><a href="javascript:fun_to_page(1);">1</a></li><li class="disabled"><a href="javascript:void(0);">...</a></li><%}%>'+
	'<%for(var i=0;i<pageCount;i++){if(i>pageNo+3||i<pageNo-5){continue;}%><li class="<%if((i+1)==pageNo){%>active<%}%>"><a href="javascript:fun_to_page(<%=i+1%>);"><%=i+1%></a></li><%}%>'+
	'<%if(pageCount-pageNo>5){%><li class="disabled"><a href="javascript:void(0);">...</a></li><li class=""><a href="javascript:fun_to_page(<%=pageCount%>);"><%=pageCount%></a></li><%}%>'+
	'<%if(pageNo>=pageCount){%><li class="disabled"><a href="javascript:void(0);">»</a></li><%}else{%><li class=""><a href="javascript:fun_to_page(<%=pageNo+1%>);">»</a></li><%}%>';
