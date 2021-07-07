package cn.javabb.content.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
/**
 * 内容类别关系表
 * <Description> 
 *  
 * @author QINB
 * @CreateDate 2018年6月1日 下午2:20:08
 * @since V1.0
 * @see cn.javabb.sys.entity
 */
@Data
@Table(name="bms_post_tag")
public class PostTag extends BaseEntity{
    
    @Id
    @GeneratedValue(generator="JDBC")
    private Integer id;
    private Integer postId;
    private Integer tagId;

}
