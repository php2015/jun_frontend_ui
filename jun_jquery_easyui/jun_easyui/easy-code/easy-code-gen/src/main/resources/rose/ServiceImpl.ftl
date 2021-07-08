package ${conf.basePackage}.${table.camelName}.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ${conf.basePackage}.${table.camelName}.dao.${table.className}DAO;
import ${conf.basePackage}.${table.camelName}.model.${table.className};
import ${conf.basePackage}.${table.camelName}.service.${table.className}Service;

import lombok.extern.slf4j.Slf4j;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
@Slf4j
@Service
public class ${table.className}ServiceImpl implements ${table.className}Service {

	@Autowired
	private ${table.className}DAO ${table.camelName}DAO;

	@Override
	public List<${table.className}> find(${table.className} ${table.camelName}) {
		return ${table.camelName}DAO.selectByParams(${table.camelName});
	}

    @Override
    public ${table.className} getById(Long id) {
    	return ${table.camelName}DAO.selectById(id);
    }

    @Override
    public List<${table.className}> findByIds(List<Long> ids) {
        return ${table.camelName}DAO.selectByIds(ids);
    }

    @Override
    public List<${table.className}> page(${table.className} ${table.camelName}, Integer offset, Integer size) {
    	return ${table.camelName}DAO.selectByParams(${table.camelName}, offset, size);
    }

    @Override
    public Integer count(${table.className} ${table.camelName}) {
    	return ${table.camelName}DAO.countByParams(${table.camelName});
    }

    @Override
    public ${table.className} getFirst(${table.className} ${table.camelName}) {
    	return ${table.camelName}DAO.selectFirst(${table.camelName});
    }

    @Override
    public Long save(${table.className} ${table.camelName}) {
    	return ${table.camelName}DAO.insert(${table.camelName});
    }

    @Override
    public Integer saveBatch(List<${table.className}> ${table.camelName}List) {
    	return ${table.camelName}DAO.insertBatch(${table.camelName}List);
    }

    @Override
    public Integer modify(${table.className} ${table.camelName}) {
    	return ${table.camelName}DAO.update(${table.camelName});
    }

    @Override
    public Integer remove(Long id) {
    	return ${table.camelName}DAO.delete(id);
    }

    @Override
    public Integer removeBatch(List<Long> ids) {
    	return ${table.camelName}DAO.deleteBatch(ids);
    }

    @Override
    public Integer removeByParams(${table.className} ${table.camelName}) {
        return ${table.camelName}DAO.deleteByParams(${table.camelName});
    }
}