package com.jacarrichan.demo.lemur.mapper;

import org.springframework.stereotype.Repository;

import com.jacarrichan.demo.common.mapper.BaseMapper;
import com.jacarrichan.demo.lemur.models.UserPo;

@Repository
public interface UserMapper extends BaseMapper<UserPo, Integer> {
}