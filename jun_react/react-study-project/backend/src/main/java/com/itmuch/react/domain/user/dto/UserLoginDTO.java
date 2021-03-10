package com.itmuch.react.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserLoginDTO {
  /**
   * 用户名
   */
  private String username;

  /**
   * 密码
   */
  private String password;
}