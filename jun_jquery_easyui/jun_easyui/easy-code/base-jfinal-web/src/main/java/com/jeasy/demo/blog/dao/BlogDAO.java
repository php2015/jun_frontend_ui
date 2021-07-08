package com.jeasy.demo.blog.dao;

import java.util.List;

import com.jeasy.base.dao.DaoSupport;
import com.jeasy.base.dao.SqlParams;
import com.jeasy.base.interceptor.DaoCostLogInterceptor;
import com.jeasy.demo.blog.model.Blog;
import com.jfinal.aop.Enhancer;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/06 11:23
 */
public class BlogDAO extends DaoSupport<Blog> {

    public static final BlogDAO me = Enhancer.enhance(BlogDAO.class, DaoCostLogInterceptor.class);

    public List<Blog> select(Blog blog) {
        SqlParams sqlParams = genSelectSqlParams(blog);
        return Blog.me.find(sqlParams.getSql(), sqlParams.getParams());
    }

    public List<Blog> select(Blog blog, Integer pageNumber, Integer pageSize) {
    	SqlParams sqlParams = genSelectSqlParams(blog, pageNumber, pageSize);
        return Blog.me.find(sqlParams.getSql(), sqlParams.getParams());
    }

    public List<Blog> selectByIds(List<Long> ids) {
    	SqlParams sqlParams = genSelectByIdsSqlParams(Blog.me, ids);
        return Blog.me.find(sqlParams.getSql(), sqlParams.getParams());
    }

    public Blog selectById(Long id) {
    	return id == null || id == 0l ? null : Blog.me.findById(id);
    }

    public Integer selectCount(Blog blog) {
    	SqlParams sqlParams = genSelectCountSqlParams(blog);
        Record record = Db.findFirst(sqlParams.getSql(), sqlParams.getParams());
        return record.getLong(SELECT_COUNT).intValue();
    }

    public Blog selectFirst(Blog blog) {
    	SqlParams sqlParams = genSelectSqlParams(blog);
        return Blog.me.findFirst(sqlParams.getSql(), sqlParams.getParams());
    }

    public Boolean insert(Blog blog) {
    	return blog.save();
    }

    public Integer insertBatch(List<Blog> blogList) {
        int [] batchResult = Db.batchSave(blogList, BATCH_SIZE);
        int totalResult = 0;
        for (int result : batchResult) {
            totalResult += result;
        }
        return totalResult;
	}

    public Integer insertSelective(Blog blog) {
    	SqlParams sqlParams = genInsertSelectiveSqlParams(blog);
        return Db.update(sqlParams.getSql(), sqlParams.getParams());
    }

    public Boolean update(Blog blog) {
    	return blog.update();
    }

    public Boolean updateSelective(Blog blog) {
    	SqlParams sqlParams = genUpdateSelectiveSqlParams(blog);
        return Db.update(sqlParams.getSql(), sqlParams.getParams()) == 1;
    }

    public Boolean delete(Long id) {
    	return Blog.me.deleteById(id);
    }

    public Boolean deleteBatch(List<Long> ids) {
    	return Blog.me.deleteById(ids);
    }

    public Boolean deleteByParams(Blog blog) {
        SqlParams sqlParams = genDeleteSqlParams(blog);
        return Db.update(sqlParams.getSql(), sqlParams.getParams()) > 0;
    }
}
