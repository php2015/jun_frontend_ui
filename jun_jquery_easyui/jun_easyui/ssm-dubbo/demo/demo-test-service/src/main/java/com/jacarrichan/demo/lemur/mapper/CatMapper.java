package com.jacarrichan.demo.lemur.mapper;

import org.springframework.stereotype.Repository;

import com.jacarrichan.demo.common.mapper.BaseMapper;
import com.jacarrichan.demo.lemur.models.CatPo;

@Repository
public interface CatMapper extends BaseMapper<CatPo, Integer> {
}