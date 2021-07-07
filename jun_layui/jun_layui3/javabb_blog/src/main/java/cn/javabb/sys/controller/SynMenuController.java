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
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.common.util.ShiroUtils;
import cn.javabb.content.entity.Content;
import cn.javabb.sys.entity.SysMenu;
import cn.javabb.sys.entity.User;
import cn.javabb.sys.service.SysMenuService;

@Controller
@RequestMapping("/sys/menu")
public class SynMenuController extends BaseController{


    private static final String MENU_LIST_PAGE="page/admin/system/menu/menuList";
    private static final String MENU_SAVE_PAGE="page/admin/system/menu/menuSave";
    
    @Autowired
    SysMenuService sysMenuService;
    
    @GetMapping("/list")
    public String toListPage(){
       return MENU_LIST_PAGE;
    }
    @GetMapping("/save")
    public String toSavePage(){
        String id = request.getParameter("menuId");
        if(BUtil.isNotEmpty(id)){
           request.setAttribute("id", id);
        }
       return MENU_SAVE_PAGE;
    }
    /**
     * 列表查询
     * @author QINB
     * @param config
     * @return
     */
    @ResponseBody
    @GetMapping("/")
    public Object list(SysMenu sysMenu){
        JSONObject param = getPageSize();
        List<SysMenu> menuList = sysMenuService.listMenusAll(param);
        return ResponseModel.table(menuList);
    }
    
    
    
    @ResponseBody
    @PostMapping("/")
    public Object saveOrUpdate(SysMenu sysMenu){
        User user = ShiroUtils.getUser();
        if(BUtil.isNull(sysMenu)){
            return ResponseModel.Failure("内容不能为空");
        }
        if(BUtil.isNull(user)){
            return ResponseModel.Failure("请先登录。");
        }
        Content con = new Content();
        con.setContent(getParamValue("contentHtml"));
        con.setKeywords(getParamValue("keywords"));
        con.setDescription(getParamValue("description"));
        sysMenu.setContent(con);
        int num = 0;
        num = sysMenuService.save(sysMenu);
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
       int num = sysMenuService.deleteByIds(SysMenu.class, "id", idList);
       if(num>0){
           return ResponseModel.Success("删除成功");
       }
       return ResponseModel.Failure("删除失败");
    }
    
    @ResponseBody
    @GetMapping("/{id}")
    public Object get(@PathVariable Integer id){
        if(BUtil.isNull(id)){
            return ResponseModel.Failure("参数错误");
        }
       SysMenu menu = sysMenuService.getMenuAllById(id);
       if(!BUtil.isNull(menu)){
           return ResponseModel.Success(menu);
       }
       return ResponseModel.Failure("获取失败");
    }
    
}
