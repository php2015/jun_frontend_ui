package com.jacarrichan.demo.lemur.service;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jacarrichan.demo.common.models.Response;
import com.jacarrichan.demo.common.service.query.BaseQuery;
import com.jacarrichan.demo.lemur.models.CatPo;
import com.jacarrichan.demo.lemur.models.CatVo;
import com.jacarrichan.demo.lemur.service.query.CatQuery;

@Slf4j
public class CatServiceTest extends BaseServiceTest {
	@Test
	public void test() {
		System.out.println(context);
	}

	@Autowired
	private CatService catService;

	@Test
	public void testFindByQuery() {
		BaseQuery query = new CatQuery();
		Response<List<CatVo>> list = catService.findByQuery(query);
		for (CatVo user : list.getResult()) {
			log.debug(user.toString());
		}
	}
}
