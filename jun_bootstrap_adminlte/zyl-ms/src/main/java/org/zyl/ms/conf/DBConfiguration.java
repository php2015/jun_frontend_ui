package org.zyl.ms.conf;

import java.beans.PropertyVetoException;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zyl.ms.conf.properties.DBProperties;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration
@ConfigurationProperties(prefix = "zyl.db")
public class DBConfiguration {
	@Autowired
	private DBProperties dBProperties;

	@Bean(name = "dataSource")
	public DruidDataSource dataSource() throws PropertyVetoException, SQLException {
		DruidDataSource druidDataSource = new DruidDataSource();
		druidDataSource.setUrl(dBProperties.getUrl());
		druidDataSource.setUsername(dBProperties.getUsername());
		druidDataSource.setPassword(dBProperties.getPassword());
		druidDataSource.setDriverClassName(dBProperties.getDriverClassName());
		druidDataSource.setFilters(dBProperties.getFilters());
		druidDataSource.setMaxActive(dBProperties.getMaxActive());
		druidDataSource.setInitialSize(dBProperties.getInitialSize());
		druidDataSource.setMaxWait(dBProperties.getMaxWait());
		druidDataSource.setTimeBetweenEvictionRunsMillis(dBProperties.getTimeBetweenEvictionRunsMillis());
		druidDataSource.setMinEvictableIdleTimeMillis(dBProperties.getMinEvictableIdleTimeMillis());
		druidDataSource.setValidationQuery(dBProperties.getValidationQuery());
		druidDataSource.setTestWhileIdle(dBProperties.getTestWhileIdle());
		druidDataSource.setTestOnBorrow(dBProperties.getTestOnBorrow());
		druidDataSource.setTestOnReturn(dBProperties.getTestOnReturn());
		druidDataSource.setMaxOpenPreparedStatements(dBProperties.getMaxOpenPreparedStatements());
		druidDataSource.setRemoveAbandoned(dBProperties.getRemoveAbandoned());
		druidDataSource.setRemoveAbandonedTimeout(dBProperties.getRemoveAbandonedTimeout());
		druidDataSource.setLogAbandoned(dBProperties.getLogAbandoned());
		return druidDataSource;
	}

}
