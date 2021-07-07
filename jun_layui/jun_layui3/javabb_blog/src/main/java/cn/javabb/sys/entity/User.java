package cn.javabb.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.javabb.common.base.BaseEntity;
import lombok.Data;
@Data
@Table(name = "sys_user")
public class User extends BaseEntity implements Serializable{

	/**
     * serialVersionUID 
     */
    private static final long serialVersionUID = 1L;
    @Id
	@GeneratedValue(generator="JDBC") 
	private Integer id;
	@Column(name = "user_name")
	private String userName;
	@Column(name = "nick_name")
	private String nickName;
	@Column(name = "user_pwd")
	private String userPwd;
	@Column(name = "user_img")
	private String userImg;
	@Column(name = "user_desc")
	private String userDesc;
	@Column(name = "state")
	private Integer state; //1为失效  0为正常
	
}
