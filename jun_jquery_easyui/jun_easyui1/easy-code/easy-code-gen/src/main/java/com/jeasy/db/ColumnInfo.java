package com.jeasy.db;

import org.apache.commons.lang3.StringUtils;

import com.jeasy.util.StringExUtils;
import com.jeasy.util.TypeUtils;

import lombok.Data;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/10/19 12:17
 */
@Data
public class ColumnInfo {

	public ColumnInfo(String name, String type, String comment) {
		this.name = name;
		this.type = type;
		this.comment = comment;
	}

	private String name;

	private String type;

	private String comment;

	public String getName() {
		return name;
	}

	public String getCamelName() {
		return StringExUtils.toCamelName(name);
	}

	public String getClassName() {
		return StringExUtils.toUpperCaseFirstOne(getCamelName());
	}

	public String getJavaType() {
		if ("id".equalsIgnoreCase(name)) {
			return "Long";
		}

		if (TypeUtils.JAVA_TYPE_MAP.containsKey(type)) {
			return TypeUtils.JAVA_TYPE_MAP.get(type);
		}

		return type;
	}

	public String getMyBastisType() {
		if (TypeUtils.MYBATIS_TYPE_MAP.containsKey(type)) {
			return TypeUtils.MYBATIS_TYPE_MAP.get(type);
		}

		return type;
	}

	public String getClassImport() {
		if (TypeUtils.CLASS_IMPORT_MAP.containsKey(type)) {
			return TypeUtils.CLASS_IMPORT_MAP.get(type);
		}
		return StringUtils.EMPTY;
	}
}
