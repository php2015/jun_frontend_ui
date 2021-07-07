package cn.javabb.sys.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
/**
 * 
 * <Description> 
 * 配置实体
 * @author QINB
 * @CreateDate 2018年5月26日 下午1:17:35
 * @since V1.0
 * @see cn.javabb.sys.entity
 */
@Data
@Table(name = "sys_config")
public class SysConfig extends BaseEntity{

	@Id
	@GeneratedValue(generator="JDBC") 
	private Integer id;
	
	private String configCode;
	
	private String configValue;
	
	private String configType;
	
	private String configDesc;

	private Integer state;
	
	
}
