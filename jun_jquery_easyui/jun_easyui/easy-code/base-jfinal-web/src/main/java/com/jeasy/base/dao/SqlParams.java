package com.jeasy.base.dao;

import lombok.Data;

/**
 * @author taomk
 * @version 1.0
 * @since 15-12-10 下午4:30
 */
@Data
public class SqlParams {

	private String sql;

	private Object [] params;
}
