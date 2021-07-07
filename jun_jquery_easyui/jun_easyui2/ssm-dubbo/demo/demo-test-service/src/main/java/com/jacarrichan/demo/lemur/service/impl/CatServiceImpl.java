package com.jacarrichan.demo.lemur.service.impl;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import com.jacarrichan.demo.common.mapper.BaseMapper;
import com.jacarrichan.demo.lemur.mapper.CatMapper;
import com.jacarrichan.demo.lemur.models.CatVo;
import com.jacarrichan.demo.lemur.service.CatService;

@Slf4j
@Service
public class CatServiceImpl extends BaseServiceImpl<CatVo, Integer> implements
		CatService {
	@Override
	public BaseMapper getMapper() {
		return applicationContext.getBean(CatMapper.class);
	}
}
