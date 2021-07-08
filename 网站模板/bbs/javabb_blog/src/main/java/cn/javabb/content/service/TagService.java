package cn.javabb.content.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.base.BaseService;
import cn.javabb.common.model.SelectModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Tag;
import cn.javabb.content.mapper.TagMapper;
@Service
public class TagService extends BaseService<Tag>{
    
    /**
     * 保存tag
     * Description: 
     *  
     * @author QINB
     * @param tag
     * @return
     */
    public Tag save(Tag tag){
        if(BUtil.isNull(tag.getTagType())){
            tag.setTagType("blog");
        }
        int num = 0;
        if(BUtil.isNull(tag.getTagId())){
            if(BUtil.isNull(this.queryOne(tag))){
                return null;
            }
            //新增
            this.insert(tag);
        }else{
            //更新
           this.updateSelective(tag);
        }
        
        return this.queryById(tag.getTagId());
    }
    
    public List<SelectModel> querytagModelByType(String tagType){
        if(BUtil.isNull(tagType)){
            tagType = "blog";
        }
        Tag t = new Tag();
        t.setTagType(tagType);
        List<Tag> tagList = this.queryListByWhere(t);
        List<SelectModel> tagModelList = new ArrayList<>();
        if(ListUtils.isEmpty(tagList)){
            return new ArrayList<SelectModel>();
        }
        for(Tag tag:tagList){
            SelectModel sm = new SelectModel();
            sm.setName(tag.getTagName());
            sm.setValue(tag.getTagId()+"");
            tagModelList.add(sm);
        }
        return tagModelList;
    }
    
    public List<Tag> queryTagListByBlogId(String blogId){
        JSONObject param = new JSONObject();
        param.put("blogId", blogId);
        param.put("sqlid", TagMapper.class.getName()+".queryTagListByBlogId");
        List<Tag> tagList = this.queryListNoPage(param);
        return tagList;
    }
    public List<Tag> queryTagListByType(String type){
        Tag tag = new Tag();
        tag.setTagType(type);
        List<Tag> tagList = this.queryListByWhere(tag);
        return tagList;
    }
    
}
