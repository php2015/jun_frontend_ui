package org.mintleaf.modules.generator.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.mintleaf.common.utils.PageUtils;
import org.mintleaf.common.utils.Query;

import org.mintleaf.modules.generator.dao.CoreUserDao;
import org.mintleaf.modules.generator.entity.CoreUserEntity;
import org.mintleaf.modules.generator.service.CoreUserService;


@Service("coreUserService")
public class CoreUserServiceImpl extends ServiceImpl<CoreUserDao, CoreUserEntity> implements CoreUserService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<CoreUserEntity> page = this.selectPage(
                new Query<CoreUserEntity>(params).getPage(),
                new EntityWrapper<CoreUserEntity>()
        );

        return new PageUtils(page);
    }

}
