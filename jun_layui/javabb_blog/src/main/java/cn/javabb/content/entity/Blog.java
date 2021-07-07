package cn.javabb.content.entity;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;

@Data
@Table(name = "bms_blog")
public class Blog extends BaseEntity{

    @Id
    @GeneratedValue(generator="JDBC")
    private Integer id;
    //标题
    private String title;
    //描述，如果指定了，就是指定的，否则系统生成
    private String blogDesc;
    
    private Integer catalogId;
    
    private String blogImg;
    
    private Integer blogAuthor;
    
    private Integer contentId;
    
    private Integer seriesId;

    private Integer blogTop;
    
    private Integer blogHot;
    
    private Integer readCount;
    
    private Integer blogState;
    @Transient
    private String userName;
    @Transient
    private Catalog catalog;  //分类信息
    @Transient
    private Series series;	//专题
    @Transient
    private Content content;
    @Transient
    private List<Tag> tags;
    
}
