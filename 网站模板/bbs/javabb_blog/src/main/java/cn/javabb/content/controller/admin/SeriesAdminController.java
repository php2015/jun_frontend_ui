package cn.javabb.content.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Series;
import cn.javabb.content.service.SeriesService;

@Controller
@RequestMapping("/admin/series")
public class SeriesAdminController extends BaseController{

    @Autowired
    SeriesService seriesService;
    
    @GetMapping("/list")
    public String toListpage(){
        return "page/admin/content/series/seriesList";
    }
    @GetMapping("/save")
    public String toSavePage(Model model){
        return "page/admin/content/series/seriesSave";
    } 
    
    @ResponseBody
    @GetMapping("/")
    public Object list(Series series){
        
        String page = getPage();
        String size = getSize();
        Page p = seriesService.listPageSeriesWithCount(page, size, series);
        //List<Series> listSeries = seriesService.queryAll();
        return ResponseModel.table(p);
    }
    @ResponseBody
    @GetMapping("/all")
    public Object all(Series series){
        
        List<Series> listSeries = seriesService.queryAll();
        return ResponseModel.Success(listSeries);
    }
    @Log("专题保存")
    @ResponseBody
    @PostMapping("/")
    public Object save(Series series){
        if(BUtil.isNull(series)){
            return ResponseModel.Failure("参数错误,保存失败");
        }
        int num;
        if(BUtil.isNull(series.getId())){
            //insert
            Series s = new Series();
            s.setSeriesName(series.getSeriesName());
            if(BUtil.isNull(seriesService.queryOne(s))){
                num = seriesService.insert(series);
            }else{
                
                return ResponseModel.Failure("不能重复");
            }
        }else{
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("seriesName", series.getSeriesName());
            if(seriesService.queryRepeat(Series.class, "id",series.getId(),map)){
                return ResponseModel.Failure("名称不能重复");
            }
            //update
            num = seriesService.updateSelective(series);
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
        int num = seriesService.deleteByIds(Series.class, "id", idList);
        if(num>0){
            return ResponseModel.Success("删除["+num+"]条记录成功");
        }
        return ResponseModel.Failure("删除失败");
    }   

}
