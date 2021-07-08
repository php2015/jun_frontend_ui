package cn.javabb.content.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;

@Data
@Table(name = "bms_content")
public class Content extends BaseEntity{

    @Id
    @GeneratedValue(generator="JDBC")
    private Integer contentId;
    private String content;
    private String keywords;
    private String description;
}
