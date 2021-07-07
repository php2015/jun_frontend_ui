package com.jeasy.demo.blog.service.impl;

import com.jeasy.demo.blog.dao.BlogDAO;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;

import java.util.List;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/06 11:23
 */
public class BlogServiceImpl implements BlogService {

	@Override
	public List<Blog> find(Blog blog) {
    	return BlogDAO.me.select(blog);
    }

    @Override
    public Blog getById(Long id) {
    	return BlogDAO.me.selectById(id);
    }

    @Override
    public List<Blog> findByIds(List<Long> ids) {
        return BlogDAO.me.selectByIds(ids);
	}

	@Override
    public List<Blog> page(Blog blog, Integer pageNumber, Integer pageSize) {
    	return BlogDAO.me.select(blog, pageNumber, pageSize);
	}

    @Override
    public Integer count(Blog blog) {
    	return BlogDAO.me.selectCount(blog);
	}

    @Override
    public Blog getFirst(Blog blog) {
    	return BlogDAO.me.selectFirst(blog);
	}

    @Override
    public Long save(Blog blog) {
    	BlogDAO.me.insert(blog);
        return blog.getId();
    }

    @Override
    public Integer saveBatch(List<Blog> blogList) {
    	return BlogDAO.me.insertBatch(blogList);
    }

    @Override
    public Integer saveSelective(Blog blog) {
    	return BlogDAO.me.insertSelective(blog);
	}

    @Override
    public Boolean modify(Blog blog) {
    	return BlogDAO.me.update(blog);
    }

    @Override
    public Boolean modifySelective(Blog blog) {
    	return BlogDAO.me.updateSelective(blog);
    }

    @Override
    public Boolean remove(Long id) {
    	return BlogDAO.me.delete(id);
    }

    @Override
    public Boolean removeBatch(List<Long> ids) {
    	return BlogDAO.me.deleteBatch(ids);
    }

    @Override
    public Boolean removeByParams(Blog blog) {
        return BlogDAO.me.deleteByParams(blog);
    }
}
