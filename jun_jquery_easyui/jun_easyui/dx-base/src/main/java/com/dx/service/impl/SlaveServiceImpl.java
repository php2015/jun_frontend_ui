package com.dx.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dx.commons.annotation.DataSourceChange;
import com.dx.mapper.SlaveMapper;
import com.dx.service.SlaveService;
@Service
public class SlaveServiceImpl implements SlaveService {

    @Autowired
    private SlaveMapper slaveMapper;

    @Override
    @DataSourceChange(slave = true)
    public Integer count() {
        return slaveMapper.count();
    }


}
