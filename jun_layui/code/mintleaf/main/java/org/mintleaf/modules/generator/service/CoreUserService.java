package org.mintleaf.modules.generator.service;

import com.baomidou.mybatisplus.service.IService;
import org.mintleaf.common.utils.PageUtils;
import org.mintleaf.modules.generator.entity.CoreUserEntity;

import java.util.Map;

/**
 * 
 *
 * @author MengchuZhang
 * @email 6153629@qq.com
 * @date 2020-10-29 23:03:30
 */
public interface CoreUserService extends IService<CoreUserEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

