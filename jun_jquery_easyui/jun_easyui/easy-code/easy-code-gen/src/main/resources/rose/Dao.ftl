package ${conf.basePackage}.${table.camelName}.dao;

import net.paoding.rose.jade.annotation.DAO;
import net.paoding.rose.jade.annotation.ReturnGeneratedKeys;
import net.paoding.rose.jade.annotation.SQL;

import java.util.List;

import ${conf.basePackage}.${table.camelName}.model.${table.className};

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
@DAO
public interface ${table.className}DAO {

	public static final String TABLE_NAME = "${table.name}";

	public static final String INSERT_VIEW = "${table.insertView}";

	public static final String INSERT_VALUE = "${table.insertValue}";

	public static final String SELECT_VIEW = "${table.selectView}";

	public static final String UPDATE_VALUE = "${table.updateValue}";

	public static final String UPDATE_SELECTIVE_VALUE = "${table.updateSelectiveValue}";

	public static final String QUERY_PARAMS = "${table.queryParams}";

	/**
     * 插入
     */
    @ReturnGeneratedKeys
    @SQL("INSERT INTO " + TABLE_NAME + " (" + INSERT_VIEW + ") VALUES (" + INSERT_VALUE + ")")
    public Long insert(${table.className} ${table.camelName});

	/**
	 * 批量插入
	 */
	@SQL("INSERT INTO " + TABLE_NAME + " (" + INSERT_VIEW + ") VALUES (" + INSERT_VALUE + ")")
	public Integer insertBatch(List<${table.className}> ${table.camelName}List);

	/**
	 * ID查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE id = :1 ORDER BY id DESC")
	public ${table.className} selectById(Long id);

	/**
	 * ID批量查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE id IN (:1) ORDER BY id DESC")
	public List<${table.className}> selectByIds(List<Long> ids);

	/**
     * 更新
     */
	@SQL("UPDATE " + TABLE_NAME + " SET " + UPDATE_VALUE + " WHERE id = :1.id")
	public Integer update(${table.className} ${table.camelName});

	/**
	 * 参数查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC")
	public List<${table.className}> selectByParams(${table.className} ${table.camelName});

	/**
	 * 参数查询：总数
	 */
	@SQL("SELECT COUNT(1) FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC")
	public Integer countByParams(${table.className} ${table.camelName});

	/**
	 * 参数查询：分页
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC LIMIT :2, :3")
	public List<${table.className}> selectByParams(${table.className} ${table.camelName}, Integer offset, Integer size);

	/**
	 * First查询
	 */
	@SQL("SELECT " + SELECT_VIEW + " FROM " + TABLE_NAME + " WHERE 1=1 " + QUERY_PARAMS + " ORDER BY id DESC LIMIT 1")
	public ${table.className} selectFirst(${table.className} ${table.camelName});

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
    public Integer deleteByParams(${table.className} ${table.camelName});
}