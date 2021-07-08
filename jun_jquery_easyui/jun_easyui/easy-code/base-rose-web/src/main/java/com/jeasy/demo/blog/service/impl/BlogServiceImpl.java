package com.jeasy.demo.blog.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeasy.demo.blog.dao.BlogDAO;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 18:18
 */
@Slf4j
@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogDAO blogDAO;

	@Override
	public List<Blog> find(Blog blog) {
		return blogDAO.selectByParams(blog);
	}

    @Override
    public Blog getById(Long id) {
    	return blogDAO.selectById(id);
    }

    @Override
    public List<Blog> findByIds(List<Long> ids) {
        return blogDAO.selectByIds(ids);
    }

    @Override
    public List<Blog> page(Blog blog, Integer offset, Integer size) {
    	return blogDAO.selectByParams(blog, offset, size);
    }

    @Override
    public Integer count(Blog blog) {
    	return blogDAO.countByParams(blog);
    }

    @Override
    public Blog getFirst(Blog blog) {
    	return blogDAO.selectFirst(blog);
    }

    @Override
    public Long save(Blog blog) {
    	return blogDAO.insert(blog);
    }

    @Override
    public Integer saveBatch(List<Blog> blogList) {
    	return blogDAO.insertBatch(blogList);
    }

    @Override
    public Integer modify(Blog blog) {
    	return blogDAO.update(blog);
    }

    @Override
    public Integer remove(Long id) {
    	return blogDAO.delete(id);
    }

    @Override
    public Integer removeBatch(List<Long> ids) {
    	return blogDAO.deleteBatch(ids);
    }

    @Override
    public Integer removeByParams(Blog blog) {
        return blogDAO.deleteByParams(blog);
    }
}