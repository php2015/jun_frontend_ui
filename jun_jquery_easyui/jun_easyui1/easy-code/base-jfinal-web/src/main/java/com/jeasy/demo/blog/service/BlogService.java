package com.jeasy.demo.blog.service;

import com.jeasy.base.interceptor.ServiceCostLogInterceptor;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.impl.BlogServiceImpl;
import com.jfinal.aop.Enhancer;

import java.util.List;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/06 11:23
 */
public interface BlogService {

	public static final BlogService me = Enhancer.enhance(BlogServiceImpl.class, ServiceCostLogInterceptor.class);

	/**
	 * 查询
	 */
	public List<Blog> find(Blog blog);

    /**
     * ID查询
     */
    public Blog getById(Long id);

    /**
     * ID批量查询
     */
    public List<Blog> findByIds(List<Long> ids);

	/**
	 * 参数分页查询
     */
	public List<Blog> page(Blog blog, Integer pageNumber, Integer pageSize);

	/**
     * 参数查询总数
     */
    public Integer count(Blog blog);

	/**
     * First查询
     */
    public Blog getFirst(Blog blog);

	/**
     * 保存
     */
    public Long save(Blog blog);

    /**
     * 批量保存
     */
    public Integer saveBatch(List<Blog> blogList);

	/**
     * 选择保存
     */
    public Integer saveSelective(Blog blog);

    /**
     * 修改
     */
    public Boolean modify(Blog blog);

	/**
     * 选择修改
     */
    public Boolean modifySelective(Blog blog);

    /**
     * 删除
     */
    public Boolean remove(Long id);

    /**
     * 批量删除
     */
    public Boolean removeBatch(List<Long> ids);

    /**
     * 参数删除
     */
    public Boolean removeByParams(Blog blog);
}
