package ${conf.basePackage}.${table.camelName}.service;

import com.jeasy.base.interceptor.ServiceCostLogInterceptor;
import ${conf.basePackage}.${table.camelName}.model.${table.className};
import ${conf.basePackage}.${table.camelName}.service.impl.${table.className}ServiceImpl;
import com.jfinal.aop.Enhancer;

import java.util.List;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
public interface ${table.className}Service {

	public static final ${table.className}Service me = Enhancer.enhance(${table.className}ServiceImpl.class, ServiceCostLogInterceptor.class);

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
	public List<${table.className}> page(${table.className} ${table.camelName}, Integer pageNumber, Integer pageSize);

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
     * 选择保存
     */
    public Integer saveSelective(${table.className} ${table.camelName});

    /**
     * 修改
     */
    public Boolean modify(${table.className} ${table.camelName});

	/**
     * 选择修改
     */
    public Boolean modifySelective(${table.className} ${table.camelName});

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
