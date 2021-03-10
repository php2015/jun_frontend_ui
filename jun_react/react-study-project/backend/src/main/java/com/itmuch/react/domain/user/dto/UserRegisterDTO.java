package com.itmuch.react.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserRegisterDTO {
  /**
   * 用户名
   */
  private String username;

  /**
   * 密码
   */
  private String password;

  /**
   * 确认密码
   */
  private String confirmPassword;

  /**
   * 用户类型 0: 牛人 1: boss
   */
  private Short type;

  /**
   * 头像
   */
  private String picture;
}