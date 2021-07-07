package ${conf.basePackage}.${table.camelName}.service.impl;

import ${conf.basePackage}.${table.camelName}.dao.${table.className}DAO;
import ${conf.basePackage}.${table.camelName}.model.${table.className};
import ${conf.basePackage}.${table.camelName}.service.${table.className}Service;

import java.util.List;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
public class ${table.className}ServiceImpl implements ${table.className}Service {

	@Override
	public List<${table.className}> find(${table.className} ${table.camelName}) {
    	return ${table.className}DAO.me.select(${table.camelName});
    }

    @Override
    public ${table.className} getById(Long id) {
    	return ${table.className}DAO.me.selectById(id);
    }

    @Override
    public List<${table.className}> findByIds(List<Long> ids) {
        return ${table.className}DAO.me.selectByIds(ids);
	}

	@Override
    public List<${table.className}> page(${table.className} ${table.camelName}, Integer pageNumber, Integer pageSize) {
    	return ${table.className}DAO.me.select(${table.camelName}, pageNumber, pageSize);
	}

    @Override
    public Integer count(${table.className} ${table.camelName}) {
    	return ${table.className}DAO.me.selectCount(${table.camelName});
	}

    @Override
    public ${table.className} getFirst(${table.className} ${table.camelName}) {
    	return ${table.className}DAO.me.selectFirst(${table.camelName});
	}

    @Override
    public Long save(${table.className} ${table.camelName}) {
    	${table.className}DAO.me.insert(${table.camelName});
        return ${table.camelName}.getId();
    }

    @Override
    public Integer saveBatch(List<${table.className}> ${table.camelName}List) {
    	return ${table.className}DAO.me.insertBatch(${table.camelName}List);
    }

    @Override
    public Integer saveSelective(${table.className} ${table.camelName}) {
    	return ${table.className}DAO.me.insertSelective(${table.camelName});
	}

    @Override
    public Boolean modify(${table.className} ${table.camelName}) {
    	return ${table.className}DAO.me.update(${table.camelName});
    }

    @Override
    public Boolean modifySelective(${table.className} ${table.camelName}) {
    	return ${table.className}DAO.me.updateSelective(${table.camelName});
    }

    @Override
    public Boolean remove(Long id) {
    	return ${table.className}DAO.me.delete(id);
    }

    @Override
    public Boolean removeBatch(List<Long> ids) {
    	return ${table.className}DAO.me.deleteBatch(ids);
    }

    @Override
    public Boolean removeByParams(Blog blog) {
        return ${table.className}DAO.me.deleteByParams(blog);
    }
}
