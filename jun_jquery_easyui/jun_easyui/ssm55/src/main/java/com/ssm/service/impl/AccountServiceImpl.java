package com.ssm.service.impl;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.ssm.common.baseservice.BaseService;
import com.ssm.entity.Account;
import com.ssm.entity.AccountCriteria;
import com.ssm.mapper.AccountMapper;
import com.ssm.service.AccountService;

@Service("accountService")
public class AccountServiceImpl extends BaseService implements AccountService{
	
	@Override
	public int saveAccount(Account account) throws DataAccessException {
		baseDao.getMapper(AccountMapper.class).insertSelective(account);
		System.out.println("111");
		return 1;
	}

	@Override
	public Account getAccount(Integer id) throws DataAccessException {
		return baseDao.getMapper(AccountMapper.class).selectByPrimaryKey(id);
	}

	@Override
	public List<Account> getList() throws DataAccessException {
		AccountCriteria criteria = new AccountCriteria();
		return baseDao.getMapper(AccountMapper.class).selectByExample(criteria);
	}

}
