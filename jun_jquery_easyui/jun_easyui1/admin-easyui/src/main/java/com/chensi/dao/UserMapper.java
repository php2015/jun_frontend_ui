package com.chensi.dao;

import java.io.Serializable;

import org.apache.ibatis.annotations.Param;

import com.chensi.model.User;

public interface UserMapper extends CommonMapper<User>{

	public String getByProc(@Param("p1") Serializable id,@Param("p2") String username);
}
