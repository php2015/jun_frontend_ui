package com.sgl.dao;

import java.io.Serializable;

public interface UserDaoI<T>
{
	public Serializable save(T o);
}
