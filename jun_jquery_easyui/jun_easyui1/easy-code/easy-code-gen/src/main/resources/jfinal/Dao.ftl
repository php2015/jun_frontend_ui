package ${conf.basePackage}.${table.camelName}.dao;

import java.util.List;

import com.jeasy.base.dao.DaoSupport;
import com.jeasy.base.dao.SqlParams;
import com.jeasy.base.interceptor.DaoCostLogInterceptor;
import ${conf.basePackage}.${table.camelName}.model.${table.className};
import com.jfinal.aop.Enhancer;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
public class ${table.className}DAO extends DaoSupport<${table.className}> {

    public static final ${table.className}DAO me = Enhancer.enhance(${table.className}DAO.class, DaoCostLogInterceptor.class);

    public List<${table.className}> select(${table.className} ${table.camelName}) {
        SqlParams sqlParams = genSelectSqlParams(${table.camelName});
        return ${table.className}.me.find(sqlParams.getSql(), sqlParams.getParams());
    }

    public List<${table.className}> select(${table.className} ${table.camelName}, Integer pageNumber, Integer pageSize) {
    	SqlParams sqlParams = genSelectSqlParams(${table.camelName}, pageNumber, pageSize);
        return ${table.className}.me.find(sqlParams.getSql(), sqlParams.getParams());
    }

    public List<${table.className}> selectByIds(List<Long> ids) {
    	SqlParams sqlParams = genSelectByIdsSqlParams(${table.className}.me, ids);
        return ${table.className}.me.find(sqlParams.getSql(), sqlParams.getParams());
    }

    public ${table.className} selectById(Long id) {
    	return id == null || id == 0l ? null : ${table.className}.me.findById(id);
    }

    public Integer selectCount(${table.className} ${table.camelName}) {
    	SqlParams sqlParams = genSelectCountSqlParams(${table.camelName});
        Record record = Db.findFirst(sqlParams.getSql(), sqlParams.getParams());
        return record.getLong(SELECT_COUNT).intValue();
    }

    public ${table.className} selectFirst(${table.className} ${table.camelName}) {
    	SqlParams sqlParams = genSelectSqlParams(${table.camelName});
        return ${table.className}.me.findFirst(sqlParams.getSql(), sqlParams.getParams());
    }

    public Boolean insert(${table.className} ${table.camelName}) {
    	return ${table.camelName}.save();
    }

    public Integer insertBatch(List<${table.className}> ${table.camelName}List) {
        int [] batchResult = Db.batchSave(${table.camelName}List, BATCH_SIZE);
        int totalResult = 0;
        for (int result : batchResult) {
            totalResult += result;
        }
        return totalResult;
	}

    public Integer insertSelective(${table.className} ${table.camelName}) {
    	SqlParams sqlParams = genInsertSelectiveSqlParams(${table.camelName});
        return Db.update(sqlParams.getSql(), sqlParams.getParams());
    }

    public Boolean update(${table.className} ${table.camelName}) {
    	return ${table.camelName}.update();
    }

    public Boolean updateSelective(${table.className} ${table.camelName}) {
    	SqlParams sqlParams = genUpdateSelectiveSqlParams(${table.camelName});
        return Db.update(sqlParams.getSql(), sqlParams.getParams()) == 1;
    }

    public Boolean delete(Long id) {
    	return ${table.className}.me.deleteById(id);
    }

    public Boolean deleteBatch(List<Long> ids) {
    	return ${table.className}.me.deleteById(ids);
    }

    public Boolean deleteByParams(${table.className} ${table.camelName}) {
        SqlParams sqlParams = genDeleteSqlParams(${table.camelName});
        return Db.update(sqlParams.getSql(), sqlParams.getParams()) > 0;
    }
}
