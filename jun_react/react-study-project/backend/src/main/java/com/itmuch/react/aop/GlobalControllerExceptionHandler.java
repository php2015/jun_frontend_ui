package com.itmuch.react.aop;

import com.itmuch.react.core.constant.ConstantCode;
import com.itmuch.react.core.convert.AjaxResult;
import com.itmuch.react.exception.ShiroRelatedException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@ControllerAdvice
@Slf4j
public class GlobalControllerExceptionHandler {

//  @ExceptionHandler(value = AuthorizationException.class)
//  @ResponseBody
//  public AjaxResult authorizationException(Exception e) throws Exception {
//    log.debug("发生异常", e);
//    return new AjaxResult<>().error("401", "无权访问");
//  }


    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseBody
    public AjaxResult methodArgumentNotValidException(Exception e) throws Exception {
        log.debug("发生异常", e);

        MethodArgumentNotValidException e1 = (MethodArgumentNotValidException) e;
        BindingResult result = e1.getBindingResult();
        List<ObjectError> errors = result.getAllErrors();

        String errorMessage = errors.stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .reduce((a, b) -> a + "," + b)
                .orElse("");

        String s = StringUtils.isNotBlank(errorMessage) ? errorMessage : e.getMessage();
        return new AjaxResult().error(ConstantCode.ARGUMENT_NOT_VALID, s);
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    @ResponseBody
    public AjaxResult ill(Exception e) {
        return new AjaxResult().error(ConstantCode.ILLEGAL_ARGUMENT, e.getMessage());
    }

    @ExceptionHandler(value = {AuthenticationException.class, ShiroRelatedException.class})
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public AjaxResult un(Exception e) {
        return new AjaxResult().error(ConstantCode.SHIRO_ERROR, e.getMessage());
    }
}
