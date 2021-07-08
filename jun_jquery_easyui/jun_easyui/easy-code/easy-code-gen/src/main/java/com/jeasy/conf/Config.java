package com.jeasy.conf;

import java.text.ParseException;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.lang3.StringUtils;

import com.jeasy.util.DateExUtils;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/10/18 13:52
 */
@Data
@Slf4j
public class Config {

	private static final String CONF_PATH = "easy-code-gen.properties";

	public Config() {
		initConf(CONF_PATH);
	}

	public Config(String confPath) {
		initConf(confPath);
	}

	private String templatePath;

	private String targetPath;

	private String driverClass;

	private String jdbcUrl;

	private String userName;

	private String userPwd;

	private String dbName;

	private Set<String> tables;

	private String basePackage;

	private String author;

	private String version;

	private void initConf(String confPath) {
		try {
			Configuration conf = new PropertiesConfiguration(confPath);
			this.templatePath = conf.getString("template.path").trim();
			this.targetPath = conf.getString("target.path").trim();
			this.driverClass = conf.getString("driver.class").trim();
			this.userName = conf.getString("userName").trim();
			this.userPwd = conf.getString("userPwd").trim();
			this.dbName = conf.getString("dbName").trim();
			this.jdbcUrl = conf.getString("jdbc.url").trim().replaceAll("\\{dbName}", this.dbName);
			this.tables = new HashSet<>();

			if (!conf.getString("tables").trim().equalsIgnoreCase("*")) {
				for (String table : conf.getStringArray("tables")) {
					tables.add(table.trim());
				}
			}
			this.basePackage = conf.getString("base.package").trim();
			this.author = conf.getString("author").trim();
			this.version = conf.getString("version").trim();
		} catch (ConfigurationException e) {
			e.printStackTrace();
			log.error("error exception : ", e);
		}
	}

	public String getCreateDate() {
		try {
			return DateExUtils.currDate("yyyy/MM/dd HH:mm");
		} catch (ParseException e) {
			log.error("error exception : ", e);
		}
		return StringUtils.EMPTY;
	}
}