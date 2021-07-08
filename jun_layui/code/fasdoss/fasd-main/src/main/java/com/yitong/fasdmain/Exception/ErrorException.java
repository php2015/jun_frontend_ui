package com.yitong.fasdmain.Exception;

import lombok.Getter;

/**
 * @Auther: YiTong
 * @Date: 2019/3/15 22:01
 * @Description:错误异常
 */
@Getter
public class ErrorException extends RuntimeException {
    private Integer code=null;
    public ErrorException(String msg) {
        super(msg);
    }
    public ErrorException(Integer code,String msg) {
        super(msg);
        this.code=code;
    }

    public ErrorException(Exception e) {

    }
}
