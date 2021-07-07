package cn.javabb.sys.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import cn.javabb.common.base.BaseEntity;
import cn.javabb.content.entity.Content;
import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper=false)
@Table(name = "sys_menu")
public class SysMenu extends BaseEntity{

    @Id
    @GeneratedValue(generator="JDBC")
    private Integer id;
    
    private String menuName;
    
    private String menuCode;
    
    private String menuIco;
    
    private String menuDesc;
    
    private Integer contentId;
    
    
    //目录类型，1是前台导航 2是前台普通页面 3 是后台
    private Integer menuType;
    
    private Integer parentId;
    
    private Integer sort;
    
    private Integer state; 
    @Transient
    private Content content;
}
