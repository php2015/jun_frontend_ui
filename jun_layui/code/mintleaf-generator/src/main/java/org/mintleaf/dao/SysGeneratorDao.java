package org.mintleaf.dao;

import java.util.List;
import java.util.Map;

/**
 * 代码生成器
 *
 * @Author: MengchuZhang
 * @Date: 2018/10/12 15:28
 * @Version 1.0
 */
public interface SysGeneratorDao {
	
	List<Map<String, Object>> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	Map<String, String> queryTable(String tableName);
	
	List<Map<String, String>> queryColumns(String tableName);
}
