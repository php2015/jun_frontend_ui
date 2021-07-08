package com.jacarrichan.demo.lemur.service.query;

import com.jacarrichan.demo.common.service.query.BaseQuery;

import lombok.Data;

@Data
public class UserQuery extends BaseQuery {
	private Integer userId;
}
