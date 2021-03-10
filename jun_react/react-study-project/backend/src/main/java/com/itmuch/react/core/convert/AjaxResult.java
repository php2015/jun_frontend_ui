package com.itmuch.react.core.convert;

import com.itmuch.react.core.constant.ConstantCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class AjaxResult<T> {
  private String code = ConstantCode.SUCCESS;
  private String msg = "成功";
  private T data = null;

  public AjaxResult<T> success(T t) {
    this.data = t;
    return this;
  }

  public AjaxResult<T> error(String code, String msg) {
    this.msg = msg;
    this.code = code;
    return this;
  }
}