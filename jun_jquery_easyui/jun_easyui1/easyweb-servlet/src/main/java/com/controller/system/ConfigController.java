package com.controller.system;

import com.controller.BaseController;
import com.entity.Config;
import com.framework.annotation.Action;
import com.framework.annotation.Autowired;
import com.framework.annotation.Controller;
import com.service.ConfigService;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by john on 2015/12/10.
 */
@Controller("/system/config")
public class ConfigController extends BaseController<Config> {

    @Autowired
    private ConfigService configService;

    @Action("queryPage")
    public Object queryPage(HttpServletRequest request){
        return configService.queryPage(requestQueryPageVO(request));
    }

    @Action("add")
    public void add(HttpServletRequest request){
        Config config = requestModel(request);
        configService.add(config);
    }

    @Action("modify")
    public void modify(HttpServletRequest request){
        Config config = requestModel(request);
        configService.modify(config);
    }
    @Action("delById")
    public void delById(HttpServletRequest request){
        configService.delById(Integer.parseInt(request.getParameter("id")));
    }

/*    @Action("delByIds")
    public void delByIds(HttpServletRequest request){
        configService.delByIds(new int[]{1,2,3,4,5,6,7});
    }*/

}
