package com.itmuch.react.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "user")
@DynamicInsert
@DynamicUpdate
public class User {
  /**
   * id
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  /**
   * 用户名
   */
  @Column
  private String username;

  /**
   * 密码
   */
  @Column
  private String password;

  /**
   * 用户类型 0: 牛人 1: boss
   */
  @Column
  private Short type;

  /**
   * 头像
   */
  @Column
  private String picture;
}
