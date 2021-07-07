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

import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.model.SelectModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Tag;
import cn.javabb.content.service.TagService;

@Controller
@RequestMapping("/admin/tag")
public class TagAdminController extends BaseController{

    @Autowired
    TagService tagService;
    
    @GetMapping("/list")
    public String toListpage(){
        return "page/admin/content/tag/tagList";
    }
    @GetMapping("/save")
    public String toSavePage(){
        return "page/admin/content/tag/tagSave";
    }
    
    @ResponseBody
    @GetMapping("/queryAllByType")
    public Object queryAllByType(@RequestParam(value="tagType",required=false)String tagType){
        
        List<SelectModel> tagModel = tagService.querytagModelByType(tagType);
        
        return ResponseModel.Success(tagModel,(Integer)0);
    }
    @ResponseBody
    @GetMapping("/")
    public Object list(Tag tag){
        
        String page = getPage();
        String size = getSize();
        Page p = tagService.queryPageByWhere(page, size, tag);
        return ResponseModel.table(p);
    }
    @ResponseBody
    @PostMapping("/")
    public Object save(Tag tag){
        if(BUtil.isNull(tag)){
            return ResponseModel.Failure("参数获取失败");
        }
        int num=0;
        if(BUtil.isNull(tag.getTagId())){
            //insert
            if(BUtil.isNull(tagService.queryOne(tag))){
                num = tagService.insert(tag);
            }else{
                return ResponseModel.Failure("不允许重复");
            }
        }else{
            //update
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("tagName", tag.getTagName());
            map.put("tagTye", tag.getTagType());
            if(tagService.queryRepeat(Tag.class, "tagId",tag.getTagId(),map)){
                return ResponseModel.Failure("类型名称和类型不能重复");
            }
            num = tagService.updateSelective(tag);
        }
        if(num>0){
            return ResponseModel.Success(tag);
        }else{
            return ResponseModel.Failure("标签保存失败");
        }
    }
    
    @ResponseBody
    @DeleteMapping("/{ids}")
    public Object del(@PathVariable String ids){
        if(BUtil.isNull(ids)){
            return ResponseModel.Failure("参数错误");
        }
        List<String> idList = ListUtils.stringToListString(ids);
        int num = tagService.deleteByIds(Tag.class, "tagId", idList);
        if(num>0){
            return ResponseModel.Success("删除["+num+"]条记录成功");
        }
        return ResponseModel.Failure("删除失败");
    } 
    
}
