package cn.javabb.content.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
@Data
@Table(name = "bms_catalog")
public class Catalog extends BaseEntity{

    @Id
    @GeneratedValue(generator="JDBC")
    private Integer catalogId;
    
    private String catalogName;
    //默认 blog
    private String catalogType;
    
    private String catalogDesc;
}
