package cn.javabb.content.mapper;

import java.util.List;

import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.base.BaseMapper;
import cn.javabb.content.entity.Blog;

public interface BlogMapper extends BaseMapper<Blog>{

    List<Blog> listHotBlogs(JSONObject param);
    List<Blog> listTopBlogs(JSONObject param);
    List<Blog> listBlogWithTagId(JSONObject param);
}
