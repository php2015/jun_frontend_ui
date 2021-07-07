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

import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.sys.entity.SysImage;
import cn.javabb.sys.service.SysImageService;

@Controller
@RequestMapping("/sys/image")
public class SysImageController extends BaseController{

    private static final String IMAGE_LIST_PAGE="page/admin/system/image/imageList";
    
    @Autowired
    SysImageService sysImageService;
    
    @GetMapping("/list")
    public String toListPage(){
       return IMAGE_LIST_PAGE;
    }
    /**
     * 列表查询
     * @author QINB
     * @param config
     * @return
     */
    @ResponseBody
    @GetMapping("/")
    public Object list(SysImage SysImage){
        List<SysImage> linkList = sysImageService.queryListByWhere(SysImage);
        return ResponseModel.table(linkList);
    }
    @ResponseBody
    @PostMapping("/")
    public Object saveOrUpdate(SysImage SysImage){
        if(BUtil.isNull(SysImage)){
            return ResponseModel.Failure("参数错误");
        }
        int num = 0;
        if(BUtil.isNull(SysImage.getId())){
            //新增
            System.out.println("ID"+SysImage.getId());
            num = sysImageService.insert(SysImage);
        }else{
            num = sysImageService.updateSelective(SysImage);
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
       int num = sysImageService.deleteByIds(SysImage.class, "id", idList);
       if(num>0){
           return ResponseModel.Success("删除成功");
       }
       return ResponseModel.Failure("删除失败");
    }
    
    
    
}
