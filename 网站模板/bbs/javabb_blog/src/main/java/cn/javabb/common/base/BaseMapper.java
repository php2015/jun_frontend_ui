package cn.javabb.common.base;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;
/**
 * 继承通用Mapper
 * @author QINB
 * @CreateDate 2018年8月11日 下午8:22:34
 * @since V1.0
 * @see cn.javabb.common.base
 */
public interface BaseMapper<T> extends Mapper<T>,MySqlMapper<T>{

}
