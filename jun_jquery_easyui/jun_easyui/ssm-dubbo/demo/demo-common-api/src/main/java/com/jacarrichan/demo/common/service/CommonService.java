package com.jacarrichan.demo.common.service;

import java.util.List;

import com.jacarrichan.demo.common.models.Response;
import com.jacarrichan.demo.common.service.query.BaseQuery;

public interface CommonService<E, PK> {

	Response<List<E>> findByQuery(BaseQuery query);

	Response<Integer> add(E entity);


}
