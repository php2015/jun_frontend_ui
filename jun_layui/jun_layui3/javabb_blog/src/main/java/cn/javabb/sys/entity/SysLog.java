package cn.javabb.sys.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;

@Data
@Table(name = "sys_log")
public class SysLog extends BaseEntity{

	@Id
	@GeneratedValue(generator="JDBC")
	private Integer id;
	
	private String userName;
	
	private String operation;
	
	private String method;
	
	private String params;
	
	private Integer useTime; //用时
	
	private String ip;
	
}
