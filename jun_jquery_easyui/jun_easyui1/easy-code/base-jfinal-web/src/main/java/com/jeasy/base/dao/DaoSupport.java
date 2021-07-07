package com.jeasy.base.dao;

import com.jeasy.json.GsonUtils;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Table;
import com.jfinal.plugin.activerecord.TableMapping;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author taomk
 * @version 1.0
 * @since 15-12-10 下午4:16
 */
@Slf4j
public class DaoSupport<M extends Model> {

	protected static final Integer BATCH_SIZE = 50;

	protected static final String SELECT_COUNT = "COUNT(id)";

	protected SqlParams genSelectSqlParams(M model) {
		StringBuilder selectSql = new StringBuilder("SELECT ");
		StringBuilder whereSql = new StringBuilder("WHERE ");
		List<Object> params = new ArrayList<>();

		Table table = TableMapping.me().getTable(model.getClass());
		Set<String> columnSet =  table.getColumnTypeMap().keySet();
		for (String column : columnSet) {
			selectSql.append(column).append(", ");
			if (model.get(column) != null) {
				whereSql.append(column).append(" = ? ").append("AND ");
				params.add(model.get(column));
			}
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql(selectSql.substring(0, selectSql.lastIndexOf(", ")) + " FROM " + table.getName() + " " + (whereSql.lastIndexOf("AND") > 0 ? whereSql.substring(0, whereSql.lastIndexOf("AND")) : "") + " ORDER BY id DESC");
		sqlParams.setParams(params.toArray());

		log.debug("genSelectSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genDeleteSqlParams(M model) {
		StringBuilder whereSql = new StringBuilder("WHERE ");
		List<Object> params = new ArrayList<>();

		Table table = TableMapping.me().getTable(model.getClass());
		Set<String> columnSet =  table.getColumnTypeMap().keySet();
		for (String column : columnSet) {
			if (model.get(column) != null) {
				whereSql.append(column).append(" = ? ").append("AND ");
				params.add(model.get(column));
			}
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql("DELETE FROM " + table.getName() + " " + (whereSql.lastIndexOf("AND") > 0 ? whereSql.substring(0, whereSql.lastIndexOf("AND")) : ""));
		sqlParams.setParams(params.toArray());

		log.debug("genDeleteSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genSelectSqlParams(M model, Integer pageNumber, Integer pageSize) {
		pageNumber = pageNumber < 1 ? 1 : pageNumber;

		StringBuilder selectSql = new StringBuilder("SELECT ");
		StringBuilder whereSql = new StringBuilder("WHERE ");
		List<Object> params = new ArrayList<>();

		Table table = TableMapping.me().getTable(model.getClass());
		Set<String> columnSet =  table.getColumnTypeMap().keySet();
		for (String column : columnSet) {
			selectSql.append(column).append(", ");
			if (model.get(column) != null) {
				whereSql.append(column).append(" = ? ").append("AND ");
				params.add(model.get(column));
			}
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql(selectSql.substring(0, selectSql.lastIndexOf(", ")) + " FROM " + table.getName() + " " + (whereSql.lastIndexOf("AND") > 0 ? whereSql.substring(0, whereSql.lastIndexOf("AND")) : "") + " ORDER BY id DESC LIMIT " + (pageNumber - 1) * pageSize + ", " + pageSize);
		sqlParams.setParams(params.toArray());

		log.debug("genSelectSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genSelectByIdsSqlParams(M model, List<Long> ids) {
		StringBuilder selectSql = new StringBuilder("SELECT ");
		StringBuilder whereSql = new StringBuilder("WHERE ");

		Table table = TableMapping.me().getTable(model.getClass());
		Set<String> columnSet =  table.getColumnTypeMap().keySet();
		for (String column : columnSet) {
			selectSql.append(column).append(", ");
		}

		for (int i = 0; i < ids.size(); i++) {
			whereSql.append("id = ? OR ");
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql(selectSql.substring(0, selectSql.lastIndexOf(", ")) + " FROM " + table.getName() + " " + (whereSql.lastIndexOf("OR") > 0 ? whereSql.substring(0, whereSql.lastIndexOf("OR")) : "") + " ORDER BY id DESC");
		sqlParams.setParams(ids.toArray());

		log.debug("genSelectByIdsSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genDeleteBatchSqlParams(M model, List<Long> ids) {
		StringBuilder whereSql = new StringBuilder("WHERE ");

		Table table = TableMapping.me().getTable(model.getClass());

		for (int i = 0; i < ids.size(); i++) {
			whereSql.append("id = ? OR ");
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql("DELETE FROM " + table.getName() + " " + (whereSql.lastIndexOf("OR") > 0 ? whereSql.substring(0, whereSql.lastIndexOf("OR")) : ""));
		sqlParams.setParams(ids.toArray());

		log.debug("genDeleteBatchSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genSelectCountSqlParams(M model) {
		StringBuilder selectSql = new StringBuilder("SELECT COUNT(id) ");
		StringBuilder whereSql = new StringBuilder("WHERE ");
		List<Object> params = new ArrayList<>();

		Table table = TableMapping.me().getTable(model.getClass());
		Set<String> columnSet = table.getColumnTypeMap().keySet();
		for (String column : columnSet) {
			if (model.get(column) != null) {
				whereSql.append(column).append(" = ? ").append("AND ");
				params.add(model.get(column));
			}
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql(selectSql + " FROM " + table.getName() + " " + (whereSql.lastIndexOf("AND") > 0 ? whereSql.substring(0, whereSql.lastIndexOf("AND")) : ""));
		sqlParams.setParams(params.toArray());

		log.debug("genSelectCountSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genInsertSelectiveSqlParams(M model) {
		StringBuilder insertSql = new StringBuilder("INSERT INTO ");
		StringBuilder valuesSql = new StringBuilder(" ) VALUES ( ");

		Table table = TableMapping.me().getTable(model.getClass());
		insertSql.append(table.getName()).append(" ( ");

		List<String> columns = new ArrayList<>();
		String[] attrNames = model._getAttrNames();
		Object[] attrValues = model._getAttrValues();
		for (int i = 0; i < attrNames.length; i++) {
			if (table.getColumnTypeMap().containsKey(attrNames[i]) && attrValues[i] != null) {
				insertSql.append(attrNames[i]).append(", ");
				valuesSql.append("?, ");
				columns.add(attrNames[i]);
			}
		}

		Object[] params = new Object[columns.size()];
		for (int i = 0; i < columns.size(); i++) {
			params[i] = model.get(columns.get(i));
		}

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql(insertSql.substring(0, insertSql.lastIndexOf(", ")) + valuesSql.substring(0, valuesSql.lastIndexOf(", ")) + " ); ");
		sqlParams.setParams(params);

		log.debug("genInsertSelectiveSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}

	protected SqlParams genUpdateSelectiveSqlParams(M model) {
		StringBuilder updateSql = new StringBuilder("UPDATE ");
		StringBuilder whereSql = new StringBuilder("WHERE ");
		Table table = TableMapping.me().getTable(model.getClass());

		updateSql.append(table.getName()).append(" SET ");

		String[] attrNames = model._getAttrNames();
		Object[] attrValues = model._getAttrValues();

		List<Object> params = new ArrayList<>();
		for (int i = 0; i < attrNames.length; i++) {
			if (table.getColumnTypeMap().containsKey(attrNames[i]) && attrValues[i] != null) {
				updateSql.append(attrNames[i]).append(" = ?, ");
				params.add(attrValues[i]);
			}
		}

		whereSql.append("id = ?");

		params.add(model.getLong("id"));

		SqlParams sqlParams = new SqlParams();
		sqlParams.setSql(updateSql.substring(0, updateSql.lastIndexOf(", ")) + " " + whereSql);
		sqlParams.setParams(params.toArray());

		log.debug("genUpdateSelectiveSqlParams : " + GsonUtils.toJson(sqlParams));
		return sqlParams;
	}
}
