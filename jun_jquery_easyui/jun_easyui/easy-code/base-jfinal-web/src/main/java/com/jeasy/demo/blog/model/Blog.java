package com.jeasy.demo.blog.model;


import com.jeasy.AnnotationValidable;
import com.jfinal.plugin.activerecord.Model;

import java.io.Serializable;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/06 11:23
 */
@SuppressWarnings("serial")
public class Blog extends Model<Blog> implements AnnotationValidable, Serializable {

	private static final long serialVersionUID = 5409185459234711691L;

    public static final Blog me = new Blog();


	/**
	 * 
	 */
	public Long getId() {
		return get("id");
	}
    public void setId(Long id) {
    	set("id", id);
    }

	/**
	 * 
	 */
	public String getTitle() {
		return get("title");
	}
    public void setTitle(String title) {
    	set("title", title);
    }

	/**
	 * 
	 */
	public String getContent() {
		return get("content");
	}
    public void setContent(String content) {
    	set("content", content);
    }

	/**
	 * 是否删除
	 */
	public Integer getIsDel() {
		return get("is_del");
	}
    public void setIsDel(Integer isDel) {
    	set("is_del", isDel);
    }

	/**
	 * 创建时间
	 */
	public Long getCreateAt() {
		return get("create_at");
	}
    public void setCreateAt(Long createAt) {
    	set("create_at", createAt);
    }

	/**
	 * 创建者ID
	 */
	public Long getCreateBy() {
		return get("create_by");
	}
    public void setCreateBy(Long createBy) {
    	set("create_by", createBy);
    }

	/**
	 * 创建者名称
	 */
	public String getCreateName() {
		return get("create_name");
	}
    public void setCreateName(String createName) {
    	set("create_name", createName);
    }

	/**
	 * 更新时间
	 */
	public Long getUpdateAt() {
		return get("update_at");
	}
    public void setUpdateAt(Long updateAt) {
    	set("update_at", updateAt);
    }

	/**
	 * 更新者ID
	 */
	public Long getUpdateBy() {
		return get("update_by");
	}
    public void setUpdateBy(Long updateBy) {
    	set("update_by", updateBy);
    }

	/**
	 * 更新者名称
	 */
	public String getUpdateName() {
		return get("update_name");
	}
    public void setUpdateName(String updateName) {
    	set("update_name", updateName);
    }
}