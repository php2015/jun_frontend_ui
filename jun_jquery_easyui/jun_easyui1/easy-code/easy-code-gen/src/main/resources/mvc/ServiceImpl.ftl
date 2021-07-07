package ${conf.basePackage}.${table.camelName}.service.impl;

import org.springframework.stereotype.Service;

import com.jeasy.base.service.impl.BaseServiceImpl;
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
public class ${table.className}ServiceImpl extends BaseServiceImpl<${table.className}DAO, ${table.className}> implements ${table.className}Service {

}