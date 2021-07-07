package com.ssm.common.mybatis;

import org.apache.log4j.Logger;


public class MySQLDialect implements Dialect {

	@SuppressWarnings("unused")
	private static final Logger logger  = Logger.getLogger(MySQLDialect.class);
	protected static final String SQL_END_DELIMITER = ";";

	public boolean supportsLimit() {
		return true;
	}

	private String trim(String sql) {
		sql = sql.trim();
		if (sql.endsWith(SQL_END_DELIMITER)) {
			sql = sql.substring(0, sql.length() - 1
					- SQL_END_DELIMITER.length());
		}
		return sql;
	}

	public String getCountSqlString(String sql) {
		sql = trim(sql);
		StringBuffer sb = new StringBuffer(sql.length() + 10);
		sb.append("SELECT COUNT(1) AS "+ RS_COLUMN + " FROM  ( ");
		sb.append(sql);
		sb.append(" ) as CountTable");
		return sb.toString();
	}

	public String getLimitSqlString(String sql, int offset, int limit,int count) {
		sql = trim(sql);
		StringBuffer sb = new StringBuffer(sql.length() + 20);
		sb.append(sql);
		if (offset > 0) {
			sb.append(" limit ").append(offset).append(',').append(limit)
					.append(SQL_END_DELIMITER);
		} else {
			sb.append(" limit ").append(limit).append(SQL_END_DELIMITER);
		}
		return sb.toString();
	}

}
