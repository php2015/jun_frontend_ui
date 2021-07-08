package com.yitong.fasdmain.Exception;


import com.yitong.fasdmain.util.R;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 功能描述: 异常处理
 *
 * @param:
 * @return:
 * @auther: YiTong
 * @date: 2019/2/10 10:28
 */
@RestControllerAdvice
@Slf4j
public class ExceptionHander {


    /**
     * @功能描述: 捕获角色异常处理
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {AccessDeniedException.class})
    @ResponseBody
    public R AccessDeniedException(Exception ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        log.error(message);
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        /**
         * 返回值
         */
        return R.error(401, message);
    }

    /**
     * @功能描述: 捕获角色异常处理
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {HttpRequestMethodNotSupportedException.class})
    @ResponseBody
    public R HttpRequestMethodNotSupportedException(Exception ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        /**
         * 返回值
         */

        return R.error(405, "请求方式不正确");
    }

    /**
     * @功能描述: body传json验证
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseBody
    public R MethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        //ex.printStackTrace();
        /**
         * 描述
         */
        return getLayuiResponse(ex.getMessage(), ex.getStackTrace(), ex.getBindingResult());
    }

    /**
     * @功能描述: form传值验证
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {BindException.class})
    @ResponseBody
    public R BindException(BindException ex) {
        return getLayuiResponse(ex.getMessage(), ex.getStackTrace(), ex.getBindingResult());

    }

    /**
     * body 传值验证
     * form 传值验证
     *
     * @param message2      默认错误消息提示
     * @param stackTrace    当前错误信息
     * @param bindingResult 错误结果信息
     * @return LayuiResponse
     */
    private R getLayuiResponse(String message2, StackTraceElement[] stackTrace, BindingResult bindingResult) {
        String message = message2;
        StackTraceElement stackTraceElement = stackTrace[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        /**
         * 返回值
         */
        List <ErrorValid> valids = new ArrayList <>(0);
        List <FieldError> allErrors = bindingResult.getFieldErrors();
        allErrors.forEach(e -> {
            ErrorValid errorValid = new ErrorValid();
            errorValid.setObjectName(e.getField());
            errorValid.setDefaultMessage(e.getDefaultMessage());
            valids.add(errorValid);
        });

        return R.error(412, "表单验证不通过[" + valids.get(0).defaultMessage + "]").put( valids );
    }

    /**
     * 错误信息存储对象
     */
    @Data
    public class ErrorValid {
        /**
         * 错误属性名称
         */
        String objectName;
        /**
         * 错误消息
         */
        String defaultMessage;
    }

    /**
     * @功能描述: body值为空
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {HttpMessageNotReadableException.class})
    @ResponseBody
    public R HttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        /**
         * 返回值
         */
        return R.error(406, "body不能为空或者JSON格式有误，请检查参数");
    }



    /**
     * @功能描述: 自定义异常捕获
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {ErrorException.class})
    @ResponseBody
    public R ErrorException(ErrorException ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        log.error(message);
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        /**
         * 返回值
         */
        return R.error(ex.getCode() == null ? -1 : ex.getCode(), message);
    }

    /**
     * @功能描述: 类型不匹配
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {MissingServletRequestParameterException.class})
    @ResponseBody
    public R MissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        /**
         * 返回值
         */
        return R.error(400, ex.getParameterName() + "请求参数不能为空,或者参数错误请检查类型是否是" + ex.getParameterType());
    }

    /**
     * @功能描述: 类型不匹配
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    @ResponseBody
    public R MethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        /**
         * 返回值
         */
        return R.error(400, ex.getName() + "传入的参数有误请检查参数[" + ex.getValue() + "]是否是" + ex.getRequiredType().getTypeName());
    }



    /**
     * @功能描述: 请求路径中是否包含./,/../,/.等字符串序列，这些字符串序列会被认为是有安全问题的,从而导致该异常;
     * 请求路径中是否包含连续的两个斜杠//(除了协议部分的//之外)，该字符串序列也会导致该异常;
     * 如果请求路径是浏览器端代码拼装出来的，这个问题可能会经常出现，此时开发人员应该是没有恶意的，但Spring Security防火墙并不能识别这一点，所以一样会拒绝该请求。所以开发人员需要在这里多加留意。否则会可能增加不少开发调试成本。
     * <p>
     * 如果请求路径中包含不可打印ASCII字符则会抛出该异常拒绝该请求;
     * 如果请求URL（无论是URL编码前还是URL编码后)包含了分号(;或者%3b或者%3B)则会抛出该异常拒绝该请求;
     * 如果请求URL（无论是URL编码前还是URL编码后)包含了斜杠(%2f或者%2F)则会抛出该异常拒绝该请求;
     * 如果请求URL（无论是URL编码前还是URL编码后)包含了反斜杠(\或者%5c或者%5B)则会抛出该异常拒绝该请求;
     * 如果请求URL在URL编码后包含了%25(URL编码了的百分号%),或者在URL编码前包含了百分号%则会抛出该异常拒绝该请求;
     * 如果请求URL在URL编码后包含了URL编码的英文句号.(%2e或者%2E)则会抛出该异常拒绝该请求。
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/10/10
     */
    /*@ExceptionHandler(value = {RequestRejectedException.class})
    @ResponseBody
    public R RequestRejectedException(RequestRejectedException ex) {
        *//**
         * 描述
         *//*
        String message = ex.getMessage();
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        *//**
         * 返回值
         *//*
        return R.error(407, "当前请求地址有误");
    }*/

    /**
     * 驼峰法转下划线
     *
     * @param line
     *            源字符串
     * @return 转换后的字符串
     */
    public static String camel2Underline(String line) {
        if (line == null || "".equals(line)) {
            return "";
        }
        line = String.valueOf(line.charAt(0)).toUpperCase()
                .concat(line.substring(1));
        StringBuffer sb = new StringBuffer();
        Pattern pattern = Pattern.compile("[A-Z]([a-z\\d]+)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(word.toUpperCase());
            sb.append(matcher.end() == line.length() ? "" : "_");
        }
        return sb.toString();
    }
    /**
     * @功能描述: 父类异常捕获
     * @param: 异常
     * @return:
     * @auther: YiTong
     * @date: 2019/2/10 10:29
     */
    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    public R Exception(Exception ex) {
        /**
         * 描述
         */
        String message = ex.getMessage();
        StackTraceElement stackTraceElement = ex.getStackTrace()[0];
        log.error(stackTraceElement.getClassName() + ">>>" + stackTraceElement.getMethodName() + ":" + stackTraceElement.getLineNumber());
        log.error(message);
        ex.printStackTrace();
        /**
         * 返回值
         */
        return R.error(502, ex.getMessage());
    }
}
