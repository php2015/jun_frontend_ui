package cn.javabb.content.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Catalog;
import cn.javabb.content.service.CatalogService;

@Controller
@RequestMapping("/admin/catalog")
public class CatalogAdminService extends BaseController{

    @Autowired
    private CatalogService catalogService;
    
    @GetMapping("/list")
    public String toListpage(){
        return "page/admin/content/catalog/catalogList";
    }
    @GetMapping("/save")
    public String toSavePage(){
        return "page/admin/content/catalog/catalogSave";
    }
    
    @ResponseBody
    @GetMapping("/queryAllByType")
    public Object queryAll(@RequestParam(value="catalogType",required=false)String catalogType){
       
        List<Catalog> catalogList = catalogService.queryAll(catalogType);
        if(ListUtils.isEmpty(catalogList)){
            return ResponseModel.Failure("无法获取分类信息");
        }
        
        return ResponseModel.Success(catalogList);
    }
    @ResponseBody
    @GetMapping("/")
    public Object list(Catalog catalog){
        
        String page = getPage();
        String size = getSize();
        Page p = catalogService.queryPageByWhere(page, size, catalog);
        return ResponseModel.table(p);
    }
    @Log("类型保存")
    @ResponseBody
    @PostMapping("/")
    public Object save(Catalog catalog){
        if(BUtil.isNull(catalog)){
            return ResponseModel.Failure("参数错误,保存失败");
        }
        int num;
        if(BUtil.isNull(catalog.getCatalogId())){
            //insert
            if(BUtil.isNull(catalogService.queryOne(catalog))){
                num = catalogService.insert(catalog);
            }else{
                
                return ResponseModel.Failure("类型名称和类型不能重复");
            }
        }else{
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("catalogName", catalog.getCatalogName());
            map.put("catalogType", catalog.getCatalogType());
            if(catalogService.queryRepeat(Catalog.class, "catalogId",catalog.getCatalogId(),map)){
                return ResponseModel.Failure("类型名称和类型不能重复");
            }
            //update
            num = catalogService.updateSelective(catalog);
        }
        if(num>0){
            return ResponseModel.Success("保存成功");
        }
        return ResponseModel.Failure("保存失败");
    }
    @ResponseBody
    @DeleteMapping("/{ids}")
    public Object del(@PathVariable String ids){
        if(BUtil.isNull(ids)){
            return ResponseModel.Failure("参数错误");
        }
        List<String> idList = ListUtils.stringToListString(ids);
        int num = catalogService.deleteByIds(Catalog.class, "catalogId", idList);
        if(num>0){
            return ResponseModel.Success("删除["+num+"]条记录成功");
        }
        return ResponseModel.Failure("删除失败");
    }    
}
