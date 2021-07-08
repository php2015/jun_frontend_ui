package com.jeasy.demo.blog.model;

import java.io.Serializable;

import com.jeasy.AnnotationValidable;
import com.jeasy.doc.annotation.InitField;

import lombok.Data;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 18:18
 */
@Data
public class Blog implements AnnotationValidable, Serializable {

	private static final long serialVersionUID = -990334519496260591L;

	/**
	 * 
	 */
    @InitField(value = "", desc = "")
	private Long id;

	/**
	 * 
	 */
    @InitField(value = "", desc = "")
	private String title;

	/**
	 * 
	 */
    @InitField(value = "", desc = "")
	private String content;

	/**
	 * 是否删除
	 */
    @InitField(value = "", desc = "是否删除")
	private Integer isDel;

	/**
	 * 创建时间
	 */
    @InitField(value = "", desc = "创建时间")
	private Long createAt;

	/**
	 * 创建者ID
	 */
    @InitField(value = "", desc = "创建者ID")
	private Long createBy;

	/**
	 * 创建者名称
	 */
    @InitField(value = "", desc = "创建者名称")
	private String createName;

	/**
	 * 更新时间
	 */
    @InitField(value = "", desc = "更新时间")
	private Long updateAt;

	/**
	 * 更新者ID
	 */
    @InitField(value = "", desc = "更新者ID")
	private Long updateBy;

	/**
	 * 更新者名称
	 */
    @InitField(value = "", desc = "更新者名称")
	private String updateName;

}