package cn.javabb.content.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import cn.javabb.common.base.BaseService;
import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Blog;
import cn.javabb.content.entity.Series;

@Service
public class SeriesService extends BaseService<Series>{

    @Autowired
    BlogService blogService;

    /**
     * 查询所有专题
     * @author QINB
     * @return
     */
    public List<Series> listAllSeriesWithCount(){
        List<Blog> blogList = blogService.queryAll();
        List<Series> seriesList = this.queryListByWhere(new Series());//有排序
        Map<String,List<Blog>> blogSeriesGroup = ListUtils.listGroup(blogList, "seriesId");
        for(Series s:seriesList){
            s.setCount(blogSeriesGroup.get(s.getId()+"")==null?0:blogSeriesGroup.get(s.getId()+"").size());
        }
        return seriesList;
    }
    /**
     * 分页查询专题
     * @author QINB
     * @param page
     * @param rows
     * @param series
     * @return
     */
    public Page listPageSeriesWithCount(String page,String rows,Series series){
        List<Blog> blogList = blogService.queryAll();
        Page<Series> seriesPage = this.queryPageByWhere(page, rows, series);
        Map<String,List<Blog>> blogSeriesGroup = ListUtils.listGroup(blogList, "seriesId");
        for(Series s:seriesPage.getResult()){
            s.setCount(blogSeriesGroup.get(s.getId()+"")==null?0:blogSeriesGroup.get(s.getId()+"").size());
        }
        return seriesPage;
    } 
    
    public List<Blog> listBlogWithSerise(String id){
        JSONObject param = new JSONObject();
        param.put("seriesId", id);
        return blogService.listBlogWithAll(param);
    }
    
}
