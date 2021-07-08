package com.jeasy.base.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.OutputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.extern.slf4j.Slf4j;

/**
 * HttpSupport
 *
 * @author taomk
 * @version 1.0
 * @since 2015/05/13 17:34
 */
@Slf4j
public abstract class ControllerSupport {

    @Autowired
    protected HttpServletRequest request;

    @Autowired
    protected HttpServletResponse response;

    /**
     * 处理响应信息
     * @param code
     * @param message
     * @return
     */
    protected final void responseMessage(int code, String message){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);

        request.setAttribute("result", modelResult);
    }

    /**
     * 处理响应单个实体
     * @param code
     * @param message
     * @param entity
     * @return
     */
    protected final void responseEntity(int code, String message, Object entity){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);
        modelResult.setEntity(entity);

        request.setAttribute("result", modelResult);
    }

    /**
     * 处理响应list
     * @param code
     * @param message
     * @param list
     * @return
     */
    protected final void responseList(int code, String message, List list){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);
        modelResult.setList(list);

        request.setAttribute("result", modelResult);
    }

    /**
     * 处理响应page
     * @param code
     * @param message
     * @param totalCount
     * @param items
     * @return
     */
    protected final void responsePage(int code, String message, int totalCount, List items, Integer pageSize, Integer pageNo){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);
        modelResult.setResultPage(new ResultPage(totalCount, pageSize, pageNo, items));

        request.setAttribute("result", modelResult);
    }

    protected final String responseRedirect(String url) {
        return "redirect:" + url;
    }

    protected final void responseFile(String content, String fileName) {
        OutputStream out = null;
        try {
            response.reset();
            response.setHeader("Content-Disposition", "inline;filename=" + new String(fileName.getBytes()));
            response.setContentType("application/octet-stream");
            byte[] bytes = content.getBytes("GBK");

            response.setHeader("Content-Length", String.valueOf(bytes.length));
            out = response.getOutputStream();
            out.write(bytes);
        } catch (Exception e) {
            log.error("ResponseFile Occur Exception : ", e);
        } finally {
            try {
                if (out != null) {
                    out.flush();
                    response.flushBuffer();
                    out.close();
                }
            } catch (Exception e) {
                log.error("Response Flush Or Close Occur Exception : ", e);
            }
        }
    }
}
