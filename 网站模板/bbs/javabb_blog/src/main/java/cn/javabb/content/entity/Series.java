package cn.javabb.content.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 专题Entity
 * @author QINB
 * @CreateDate 2018年8月12日 下午2:40:30
 * @since V1.0
 * @see cn.javabb.content.entity
 */
@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="bms_series")
public class Series extends BaseEntity{
    
    @Id
    @GeneratedValue(generator="JDBC")
    private Integer id;
    
    private String seriesName;
    
    private String seriesImg;
    
    private String seriesDesc;
    
    private Integer sort;
    
    @Transient
    private Integer count;
}
