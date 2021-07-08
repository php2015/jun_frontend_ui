package cn.javabb.content.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.util.ResultUtil;
import cn.javabb.content.entity.Blog;
import cn.javabb.content.entity.Series;
import cn.javabb.content.service.BlogService;
import cn.javabb.content.service.SeriesService;

@Controller
@RequestMapping(value = "/series")
public class SeriesController {

    private static final String INDEX_URL = "page/front/series/series";
    
    @Autowired
    private SeriesService seriesService;
    @Autowired
    private BlogService blogService;
    
    @RequestMapping({"/",""})
    public ModelAndView list(Model model){
        List<Series> seriesList = seriesService.listAllSeriesWithCount();
        model.addAttribute("seriesList", seriesList);
        model.addAttribute("seriesPage","page/front/common/series");
        model.addAttribute("seriesPageCode","seriesMain");
        return ResultUtil.view(INDEX_URL);
    }
    
    @RequestMapping("/{id}")
    public ModelAndView detail(@PathVariable String id,Model model){
        Series s = new Series();
        s.setId(Integer.valueOf(id));
        Series currentSeries = seriesService.queryOne(s);
        List<Series> seriesList = seriesService.listAllSeriesWithCount();
        List<Blog> blogList = seriesService.listBlogWithSerise(id);
        model.addAttribute("currentSeries", currentSeries);
        model.addAttribute("seriesList", seriesList);
        model.addAttribute("blogList", blogList);
        model.addAttribute("seriesPage","page/front/common/series");
        model.addAttribute("seriesPageCode","seriesDetail");
        return ResultUtil.view(INDEX_URL);
    }
    
}
