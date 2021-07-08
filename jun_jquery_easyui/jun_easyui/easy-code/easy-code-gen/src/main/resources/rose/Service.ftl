package ${conf.basePackage}.${table.camelName}.service;

import java.util.List;

import ${conf.basePackage}.${table.camelName}.model.${table.className};

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
public interface ${table.className}Service {

	/**
	 * 查询
	 */
	public List<${table.className}> find(${table.className} ${table.camelName});

    /**
     * ID查询
     */
    public ${table.className} getById(Long id);

    /**
     * ID批量查询
     */
    public List<${table.className}> findByIds(List<Long> ids);

    /**
     * 参数分页查询
     */
    public List<${table.className}> page(${table.className} ${table.camelName}, Integer offset, Integer size);

    /**
     * 参数查询总数
     */
    public Integer count(${table.className} ${table.camelName});

    /**
     * First查询
     */
    public ${table.className} getFirst(${table.className} ${table.camelName});

    /**
     * 保存
     */
    public Long save(${table.className} ${table.camelName});

    /**
      * 批量保存
      */
	public Integer saveBatch(List<${table.className}> ${table.camelName}List);

    /**
     * 修改
     */
    public Integer modify(${table.className} ${table.camelName});

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
    public Integer removeByParams(${table.className} ${table.camelName});
}
