package cn.javabb.sys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.R;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.sys.entity.SysConfig;
import cn.javabb.sys.entity.SysLink;
import cn.javabb.sys.service.SysLinkService;

@Controller
@RequestMapping("/sys/link")
public class SysLinkController extends BaseController{

    private static final String LINK_LIST_PAGE="page/admin/system/link/linkList";
    private static final String LINK_SAVE_PAGE="page/admin/system/link/linkSave";
    
    @Autowired
    SysLinkService sysLinkService;
    @GetMapping("/list")
    public String toListPage(){
       return LINK_LIST_PAGE;
    }
    @GetMapping("/save")
    public String toSavePage(){
       return LINK_SAVE_PAGE;
    }
    /**
     * 列表查询
     * @author QINB
     * @param config
     * @return
     */
    @ResponseBody
    @GetMapping("/")
    public Object list(SysLink sysLink){
        String page = getPage();
        String size = getSize();
        Page linkList = sysLinkService.queryPageByWhere(page, size, sysLink);
        return ResponseModel.table(linkList);
    }
    @ResponseBody
    @PostMapping("/")
    public Object saveOrUpdate(SysLink sysLink){
        if(BUtil.isNull(sysLink)){
            return ResponseModel.Failure("参数错误");
        }
        int num = 0;
        if(BUtil.isNull(sysLink.getId())){
            //新增
            System.out.println("ID"+sysLink.getId());
            num = sysLinkService.insert(sysLink);
        }else{
            num = sysLinkService.updateSelective(sysLink);
        }
        if(num>0){
            return ResponseModel.Success("保存成功");
        }
        return ResponseModel.Failure("保存失败");
    }
    @ResponseBody
    @DeleteMapping("/{ids}")
    public Object remove(@PathVariable String ids){
        if(BUtil.isNull(ids)){
            return ResponseModel.Failure("参数错误");
        }
       List<String> idList = ListUtils.stringToListString(ids);
       int num = sysLinkService.deleteByIds(SysLink.class, "id", idList);
       if(num>0){
           return ResponseModel.Success("删除成功");
       }
       return ResponseModel.Failure("删除失败");
    }
    
    
    
}
