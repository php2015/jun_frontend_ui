package com.jeasy.db;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;

import com.jeasy.conf.Config;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/10/19 11:23
 */
@Slf4j
@Data
public final class DBInfo {

	private DBInfo() {}

	private String productName;

	private String productVersion;

	private String catalogSeparator;

	private String driverVersion;

	private List<TableInfo> tables;

	public static DBInfo getInstance(Config conf) {

		DBInfo info = new DBInfo();

		try {
			Class.forName(conf.getDriverClass());
			Connection con = DriverManager.getConnection(conf.getJdbcUrl(), conf.getUserName(), conf.getUserPwd());

			DatabaseMetaData dbmd = con.getMetaData();
			info.setProductName(dbmd.getDatabaseProductName());
			info.setProductVersion(dbmd.getDatabaseProductVersion());
			info.setCatalogSeparator(dbmd.getCatalogSeparator());
			info.setDriverVersion(dbmd.getDriverVersion());

			List<TableInfo> tables = new ArrayList<>();
			info.setTables(tables);

			ResultSet rs = dbmd.getTables(conf.getDbName(), null, null, new String[]{"TABLE"});
			while(rs.next()) {

				String tableName = rs.getString("TABLE_NAME");
				if (CollectionUtils.isNotEmpty(conf.getTables()) && !conf.getTables().contains(tableName)) {
					continue;
				}

				String comment = rs.getString("REMARKS");
				List<ColumnInfo> columns = new ArrayList<>();

				TableInfo tableInfo = new TableInfo(tableName, comment);
				tableInfo.setColumns(columns);

				ResultSet columnRs = dbmd.getColumns(conf.getDbName(), null, tableName, null);
				while(columnRs.next()) {
					columns.add(new ColumnInfo(columnRs.getString("COLUMN_NAME"), columnRs.getString("TYPE_NAME"), columnRs.getString("REMARKS")));
				}

				tables.add(tableInfo);
				log.info("read table : " + tableInfo.getName() + " from database success");
			}
		} catch (Exception e) {
			log.error("error exception : ", e);
		}

		return info;
	}
}



