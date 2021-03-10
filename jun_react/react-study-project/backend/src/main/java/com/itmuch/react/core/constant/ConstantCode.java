package com.itmuch.react.core.constant;

import org.springframework.web.bind.MethodArgumentNotValidException;

public interface ConstantCode {
    /**
     * 成功.
     */
    String SUCCESS = "200";

    /**
     * 不清楚的错误编号.
     */
    String UNKNOWN = "1100";

    /**
     * 参数校验失败
     *
     * @see MethodArgumentNotValidException
     */
    String ARGUMENT_NOT_VALID = "1101";

    /**
     * 参数非法
     *
     * @see IllegalArgumentException
     */
    String ILLEGAL_ARGUMENT = "1002";

    /**
     * 认证失败
     */
    String SHIRO_ERROR = "401";
    /**
     * 重复的数据.
     */
    String DUPLICATE_DATA = "1003";

    /**
     * 没有查到数据.
     */
    String DATA_NOT_FOUND = "1001";
}