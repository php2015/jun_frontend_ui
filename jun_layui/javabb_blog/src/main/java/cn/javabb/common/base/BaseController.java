package cn.javabb.common.base;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.util.BUtil;

public abstract class BaseController {

	@Autowired
	protected HttpServletRequest request;
	
	protected String page;
	
	protected String size;
	
	/**
	 * 
	 * @author QINB
	 * @return
	 */
    protected String getPage() {
        page = request.getParameter("page");
        if(null==page||"".equals(page)){
            page = "1";
        }
        return page;
    }


    protected String getSize() {
        size = request.getParameter("size");
        if(BUtil.isNull(size)){
            size = request.getParameter("limit");
        }
        if(null==size||"".equals(size)){
            size = "10";
        }
        return size;
    }
    protected String getParamValue(String param){
        return request.getParameter(param);
    }
    protected JSONObject getPageSize(){
        String page = getPage();
        String size = getSize();
        JSONObject param = new JSONObject();
        param.put("page", page);
        param.put("size", size);
        return param;
    }
}
