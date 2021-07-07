package cn.javabb.content.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import cn.javabb.common.base.BaseService;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Blog;
import cn.javabb.content.entity.Content;
import cn.javabb.content.entity.PostTag;
import cn.javabb.content.entity.Tag;
import cn.javabb.content.mapper.BlogMapper;
import cn.javabb.sys.entity.SysMenu;
import lombok.extern.slf4j.Slf4j;
import tk.mybatis.mapper.entity.Example;
@Slf4j
@Service
public class BlogService extends BaseService<Blog>{
    
    @Autowired
    ContentService contentService;
    @Autowired
    PostTagService postTagService;
    @Autowired
    CatalogService catalogService;
    
    @Autowired
    TagService tagService;
    @Autowired
    BlogMapper blogMapper;
    /**
     * 分页查询blog
     * Description: 
     *  
     * @author QINB
     * @param map
     * @return
     */
    public Page listBlogWithAll(JSONObject map) {
        map.put("sqlid",BlogMapper.class.getName()+".listBlogWithAll");
        Page<?> p = this.queryListPage(map);
        return p;
    }
    /**
     * 查询单条记录
     * Description: 
     *  
     * @author QINB
     * @param map
     * @return
     */
    public Blog queryBlogOne(String blogId) {
        JSONObject map = new JSONObject();
        map.put("blogId", blogId);
        map.put("sqlid",BlogMapper.class.getName()+".listBlogWithAll");
        Blog blog = this.queryOne(map);
        return blog;
    }
    @Transactional
    public int delBlogs(List<String> ids){
        //删除blog
        int blogNum = this.deleteByIds(Blog.class, "id", ids);
        List<Blog> blogList = this.queryListByIds(Blog.class, "id", ids);   
        List<String> contentIds = ListUtils.getfieldList(blogList, "contentId");
        if(!ListUtils.isEmpty(contentIds)){
          //删除blog对应的内容
            int contentNum = contentService.deleteByIds(Content.class, "id", contentIds);
        }
        //删除blog对应的tag
        postTagService.deleteByIds(PostTag.class,"postId",ids);
        return blogNum;
    }
    
    @Transactional
    public int save(Blog blog,String blogTag){
    	int num = 0;
    	if(BUtil.isNull(blog.getId())){
    		//insert
    		//先insert content
    		contentService.insert(blog.getContent());
    		blog.setContentId(blog.getContent().getContentId());
    		blog.setReadCount(1);
    		num = this.insert(blog);
    	}else{
    		//update
    		num = this.updateSelective(blog);
    		Content content = blog.getContent();
    		//content.setContentId(this.queryById(blog.getId()).getContentId());
    		blog.getContent().setContentId(this.queryById(blog.getId()).getContentId());
    		contentService.updateSelective(blog.getContent());
    		PostTag postTag = new PostTag();
    		postTag.setPostId(blog.getId());
    		postTagService.deleteByWhere(postTag);
    		
    	}
    	//保存标签
    	this.saveBlogTags(blog.getId(),blogTag);
    	return num;
    }
    /**
     * 插入博客标签
     * @param blogId
     * @param tagStr
     * @return
     */
    @Transactional
    public int saveBlogTags(Integer blogId,String tagStr){
    	if(BUtil.isNull(tagStr)){
    		return 0;
    	}
    	String[] tagArr = tagStr.split(",");
    	
    	int num=0;
    	for(String tagId:tagArr){
    		PostTag postTag = new PostTag();
        	postTag.setPostId(blogId);
    		postTag.setTagId(Integer.valueOf(tagId));
    		num += postTagService.insert(postTag);
    	}
    	return num;
    }
    /**
     * 查询热点blog
     * Description: 
     *  
     * @author QINB
     * @return
     */
    public List<Blog> listHotBlogs(){
        List<Blog> blogs = blogMapper.listHotBlogs(new JSONObject());
            /*new ArrayList<>();
        JSONObject map = new JSONObject();
        map.put("sqlid",BlogMapper.class.getName()+".listHotBlogs");
        blogs = this.queryList(map);*/
        return blogs;
    }
    /**
     * 查询置顶blog
     * Description: 
     *  
     * @author QINB
     * @return
     */
    public List<Blog> listTopBlogs(){
        List<Blog> blogs = blogMapper.listTopBlogs(new JSONObject());
            /*new ArrayList<>();
        JSONObject map = new JSONObject();
        map.put("sqlid",BlogMapper.class.getName()+".listTopBlogs");
        blogs = this.queryList(map);*/
        return blogs;
    }
    
    
    public int updateReadCount(Integer id){
        Blog blog = this.queryById(id);
        int readCount = blog.getReadCount()+1;
        Blog b = new Blog();
        b.setId(id);
        b.setReadCount(readCount);
        return this.updateSelectiveNoOther(b);
    }
    
    /**
     * 获取博客的SEO
     * @author QINB
     * @param blogId
     * @return
     */
    public Map<String,Object> loadBlogTDK(String blogId){
        Map<String,Object> map = new HashMap<String,Object>();
        Blog blog = this.queryBlogOne(blogId);
        if(blog!=null){
            map.put("title", blog.getTitle());
            map.put("keywords",blog.getContent().getKeywords());
            map.put("description",blog.getContent().getDescription());
        }
        return map;
    }
    
}
