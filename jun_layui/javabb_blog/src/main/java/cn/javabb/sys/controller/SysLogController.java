package cn.javabb.sys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.R;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.sys.entity.SysLog;
import cn.javabb.sys.service.LogService;

@Controller
@RequestMapping("/sys/log")
public class SysLogController extends BaseController{

    @Autowired
    private LogService logService;
    @GetMapping("")
    public String toListPage(){
        return "page/admin/system/log/sysLogList";
    }
    //@Log("日志列表查询")
    @ResponseBody
    @GetMapping("/")
    public Object list(SysLog sysLog){
        String page = request.getParameter("page");
        String rows = request.getParameter("limit");
        Integer count = logService.queryCountByWhere(sysLog);
        List<SysLog> logList = logService.queryPageListByWhere(page,rows,sysLog);
        if(ListUtils.isEmpty(logList)){
            return new R(1, "", logList,0);
        }
        return new R(0, "", logList,count);
    }
    @Log("删除日志")
    @ResponseBody
    @DeleteMapping("/{ids}")
    public Object delete(@PathVariable String ids){
        if(BUtil.isNull(ids)){
            return R.error();
        }
       List<String> idList = ListUtils.stringToListString(ids);
       int num = logService.deleteByIds(SysLog.class, "id", idList);
       if(num>0){
           return R.ok();
       }
       return R.error();
    }
}
