package com.dx.service.impl;

import com.dx.mapper.SysLogMapper;
import com.dx.model.SysLog;
import com.dx.service.LogService;
import com.dx.commons.utils.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @description：
 * @author：zhixuan.wang
 * @date：2015/10/30 10:40
 */
@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private SysLogMapper sysLogMapper;

    @Override
    public void insertLog(SysLog sysLog) {
        sysLogMapper.insert(sysLog);
    }

    @Override
    public void findDataGrid(PageInfo pageInfo) {
        pageInfo.setRows(sysLogMapper.findDataGrid(pageInfo));
        pageInfo.setTotal(sysLogMapper.findDataGridCount(pageInfo));
    }
}
