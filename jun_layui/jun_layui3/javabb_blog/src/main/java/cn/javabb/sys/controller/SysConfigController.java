package cn.javabb.sys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.R;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.sys.entity.SysConfig;
import cn.javabb.sys.service.SysConfigService;

@Controller
@RequestMapping("/sys/config")
public class SysConfigController extends BaseController{

    @Autowired
    private SysConfigService configService;
    
    @GetMapping("/list")
    public String toListPage(){
       return "page/admin/system/config/configList";
    }
    @GetMapping("/sysConfig")
    public String sysConfigPage(){
       return "page/admin/system/config/sysConfig";
    }
    @GetMapping("/save")
    public String toSavePage(){
       return "page/admin/system/config/configSave";
    }
    @ResponseBody
    @GetMapping("/")
    public R list(SysConfig config){
        String page = request.getParameter("page");
        String rows = request.getParameter("limit");
        System.out.println("page"+page);
        Integer count = configService.queryCountByWhere(config);
        List<SysConfig> configList = configService.queryPageListByWhere(page,rows,config);
        if(ListUtils.isEmpty(configList)){
            return new R(1, "", configList,0);
        }
        return new R(0, "", configList,count);
    }
    @Log("更新状态")
    @ResponseBody
    @PostMapping("/updateState")
    public Object updateState(SysConfig config){
        if(BUtil.isNull(config)){
            return R.error();
        }
        int num = configService.updateSelective(config);
        if(num>0){
            return R.ok();
        }
        return R.error();
    }
    @GetMapping("/add")
    public String add(){
        return "page/system/config/configAdd";
    }
    @ResponseBody
    @PostMapping("/")
    public Object saveOrUpdate(SysConfig config){
        if(BUtil.isNull(config)){
            return R.error();
        }
        int num = 0;
        if(BUtil.isNull(config.getId())){
            //新增
            config.setId(null);
            config.setState(0);
            num = configService.insert(config);
        }else{
            num = configService.updateSelective(config);
        }
        if(num>0){
            return R.ok();
        }
        return R.error();
    }
    @ResponseBody
    @PostMapping("/remove/{ids}")
    public Object remove(@PathVariable String ids){
        if(BUtil.isNull(ids)){
            return R.error();
        }
       List<String> idList = ListUtils.stringToListString(ids);
       int num = configService.deleteByIds(SysConfig.class, "id", idList);
       if(num>0){
           return R.ok();
       }
       return R.error();
    }
}
