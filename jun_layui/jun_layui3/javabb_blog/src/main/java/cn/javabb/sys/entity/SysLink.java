package cn.javabb.sys.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
/**
 * 友情链接
 * @author QINB
 * @CreateDate 2018年8月10日 下午2:08:20
 * @since V1.0
 * @see cn.javabb.sys.entity
 */
@Data
@Table(name = "sys_link")
public class SysLink extends BaseEntity{

    @Id
    @GeneratedValue(generator="JDBC")
    private Integer id;
    
    private String linkName;
    
    private String linkUrl;
    
    private String contactQq;
    
    private String contactEmail;
    //有本站链接的页面
    private String linkSite;
    
}
