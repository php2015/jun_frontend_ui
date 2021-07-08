package cn.javabb.sys.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Table(name = "sys_image")
public class SysImage extends BaseEntity{

	@Id
	@GeneratedValue(generator="UUID")
	private String id;
	
	private String imageName;
	private String imageSrc;
	private Integer width;
	private Integer height;
	private Double size;
	private String imageMd5;
	private Integer state;
}
