package com.service;

import com.dao.ConfigDao;
import com.entity.Config;
import com.ex.MyException;
import com.framework.annotation.Autowired;
import com.framework.annotation.Source;
import com.vo.QueryPageVO;
import com.vo.ResultVO;
import top.appx.easysql.Restrain;
import top.appx.easysql.data.PageInfo;

/**
 * Created by john on 2015/12/10.
 */
@Source
public class ConfigService {
    @Autowired
    private ConfigDao configDao;
    public ResultVO queryPage(QueryPageVO queryPageVO){
        queryPageVO.getRestrainList().add(Restrain.order("name"));
        PageInfo<Config> pageInfo = configDao.queryPage(queryPageVO);
        return ResultVO.data().p("total",pageInfo.getTotal()).p("rows",pageInfo.getData());
    }
    public void add(Config config){
        int total = configDao.total(Restrain.eq("name",config.getName()));
        if(total>0){
            throw new MyException("已有相同的名称");
        }
        configDao.add(config);
    }

    public void modify(Config config) {
        configDao.modify(config);
    }

    public void delById(int id) {
        configDao.delById(id);
    }

 /*   public void delByIds(int[] ints) {
        configDao.delByIds(ints);
    }*/
}
