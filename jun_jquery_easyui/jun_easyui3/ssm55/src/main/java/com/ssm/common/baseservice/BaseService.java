package com.ssm.common.baseservice;
import javax.annotation.Resource;

import com.ssm.common.basedao.BaseDao;

public class BaseService implements Service{
	    protected BaseDao baseDao;	    
	    @Resource(name="baseDao")
	    public void setBaseDao(BaseDao baseDao) {
	        this.baseDao =baseDao;
	    }
}

