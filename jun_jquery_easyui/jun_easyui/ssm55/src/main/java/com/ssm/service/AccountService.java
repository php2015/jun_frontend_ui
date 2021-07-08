package com.ssm.service;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.ssm.entity.Account;

public interface AccountService {

	/**
	 * @param account
	 * @return
	 * @throws DataAccessException
	 */
	public int saveAccount(Account account) throws DataAccessException;
	
	/**
	 * @param id
	 * @return
	 * @throws DataAccessException
	 */
	public Account getAccount(Integer id) throws DataAccessException;
	
	/**
	 * @return
	 * @throws DataAccessException
	 */
	public List<Account> getList() throws DataAccessException;
}
