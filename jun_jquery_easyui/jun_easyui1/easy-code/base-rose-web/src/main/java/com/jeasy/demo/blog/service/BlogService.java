package com.jeasy.demo.blog.service;

import java.util.List;

import com.jeasy.demo.blog.model.Blog;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 18:18
 */
public interface BlogService {

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
    public List<Blog> page(Blog blog, Integer offset, Integer size);

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
     * 修改
     */
    public Integer modify(Blog blog);

    /**
     * 删除
     */
    public Integer remove(Long id);

    /**
     * 批量删除
     */
    public Integer removeBatch(List<Long> ids);

    /**
     * 参数删除
     */
    public Integer removeByParams(Blog blog);
}
