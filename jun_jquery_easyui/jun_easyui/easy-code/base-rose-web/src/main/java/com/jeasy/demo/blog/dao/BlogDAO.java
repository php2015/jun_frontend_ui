package com.jeasy.demo.blog.dao;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

import com.jeasy.demo.blog.model.Blog;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 18:18
 */
@DAO
public interface BlogDAO {

	public static final String TABLE_NAME = "blog";

	public static final String INSERT_VIEW = "title,content,is_del,create_at,create_by,create_name,update_at,update_by,update_name";

	public static final String INSERT_VALUE = ":1.title,:1.content,:1.isDel,:1.createAt,:1.createBy,:1.createName,:1.updateAt,:1.updateBy,:1.updateName";

	public static final String SELECT_VIEW = "id,title,content,is_del,create_at,create_by,create_name,update_at,update_by,update_name";

	public static final String UPDATE_VALUE = "title=:1.title,content=:1.content,is_del=:1.isDel,create_at=:1.createAt,create_by=:1.createBy,create_name=:1.createName,update_at=:1.updateAt,update_by=:1.updateBy,update_name=:1.updateName";

	public static final String UPDATE_SELECTIVE_VALUE = " #if(:1.title != null){title=:1.title,} #if(:1.content != null){content=:1.content,} #if(:1.isDel != null){is_del=:1.isDel,} #if(:1.createAt != null){create_at=:1.createAt,} #if(:1.createBy != null){create_by=:1.createBy,} #if(:1.createName != null){create_name=:1.createName,} #if(:1.updateAt != null){update_at=:1.updateAt,} #if(:1.updateBy != null){update_by=:1.updateBy,} #if(:1.updateName != null){update_name=:1.updateName,}";

	public static final String QUERY_PARAMS = " #if(:1.id > 0){ AND id=:1.id} #if(:1.title != null){ AND title=:1.title} #if(:1.content != null){ AND content=:1.content} #if(:1.isDel > 0){ AND is_del=:1.isDel} #if(:1.createAt > 0){ AND create_at=:1.createAt} #if(:1.createBy > 0){ AND create_by=:1.createBy} #if(:1.createName != null){ AND create_name=:1.createName} #if(:1.updateAt > 0){ AND update_at=:1.updateAt} #if(:1.updateBy > 0){ AND update_by=:1.updateBy} #if(:1.updateName != null){ AND update_name=:1.updateName}";

	/**
     * 插入
     */
    @ReturnGeneratedKeys
    @SQL("INSERT INTO " + TABLE_NAME + " (" + INSERT_VIEW + ") VALUES (" + INSERT_VALUE + ")")
    public Long insert(Blog blog);

	/**
	 * 批量插入
	 */
	@SQL("INSERT INTO " + TABLE_NAME + " (" + INSERT_VIEW + ") VALUES (" + INSERT_VALUE + ")")
	public Integer insertBatch(List<Blog> blogList);

	/**
	 * ID查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE id = :1 ORDER BY id DESC")
	public Blog selectById(Long id);

	/**
	 * ID批量查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE id IN (:1) ORDER BY id DESC")
	public List<Blog> selectByIds(List<Long> ids);

	/**
     * 更新
     */
	@SQL("UPDATE " + TABLE_NAME + " SET " + UPDATE_VALUE + " WHERE id = :1.id")
	public Integer update(Blog blog);

	/**
	 * 参数查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC")
	public List<Blog> selectByParams(Blog blog);

	/**
	 * 参数查询：总数
	 */
	@SQL("SELECT COUNT(1) FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC")
	public Integer countByParams(Blog blog);

	/**
	 * 参数查询：分页
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC LIMIT :2, :3")
	public List<Blog> selectByParams(Blog blog, Integer offset, Integer size);

	/**
	 * First查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC LIMIT 1")
	public Blog selectFirst(Blog blog);

	/**
	 * 删除
	 */
	@SQL("DELETE FROM " + TABLE_NAME + " WHERE id = :1")
	public Integer delete(Long id);

	/**
	 * 批量删除
	 */
	@SQL("DELETE FROM " + TABLE_NAME + " WHERE id IN (:1)")
	public Integer deleteBatch(List<Long> ids);

    /**
     * 参数删除
     */
    @SQL("DELETE FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS)
    public Integer deleteByParams(Blog blog);
}