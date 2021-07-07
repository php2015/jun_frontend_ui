package cn.javabb.content.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;

@Data
@Table(name = "bms_tag")
public class Tag extends BaseEntity{

    @Id
    @GeneratedValue(generator="JDBC")
    private Integer tagId;
    private String tagName;
    private String tagType; //blog,source,page
}
