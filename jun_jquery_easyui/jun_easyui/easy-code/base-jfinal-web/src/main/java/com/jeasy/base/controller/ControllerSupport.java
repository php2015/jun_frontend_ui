package com.jeasy.base.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ControllerSupport
 *
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public class ControllerSupport extends Controller {

    /**
     * 响应信息
     * @param code
     * @param message
     * @return
     */
    protected void renderMessage(int code, String message) {
        buildMessage(code, message);
        renderNull();
    }

    private ModelResult buildMessage(int code, String message){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);

        getRequest().setAttribute("result", modelResult);
        return modelResult;
    }

    /**
     * 响应实体
     * @param code
     * @param message
     * @param entity
     * @return
     */
    protected void renderEntity(int code, String message, Object entity) {
        buildEntity(code, message, entity);
        renderNull();
    }

    private ModelResult buildEntity(int code, String message, Object entity){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);
        modelResult.setEntity(entity);

        getRequest().setAttribute("result", modelResult);
        return modelResult;
    }

    /**
     * 响应list
     * @param code
     * @param message
     * @param list
     * @return
     */
    protected void renderList(int code, String message, List list) {
        buildList(code, message, list);
        renderNull();
    }

    private ModelResult buildList(int code, String message, List list){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);
        modelResult.setList(list);

        getRequest().setAttribute("result", modelResult);
        return modelResult;
    }

    /**
     * 响应page
     * @param code
     * @param message
     * @param totalCount
     * @param items
     * @return
     */
    protected void renderPage(int code, String message, int totalCount, List items, Integer pageSize, Integer pageNo) {
        buildPage(code, message, totalCount, items, pageSize, pageNo);
        renderNull();
    }

    private ModelResult buildPage(int code, String message, int totalCount, List items, Integer pageSize, Integer pageNo){
        ModelResult modelResult = new ModelResult(code);
        modelResult.setMessage(message);
        modelResult.setResultPage(new ResultPage(totalCount, pageSize, pageNo, items));

        getRequest().setAttribute("result", modelResult);
        return modelResult;
    }

    protected Map<String, Object> transfer(Model model) {
        Map<String, Object> attrMap =  new HashMap<>();
        String[] attrNames = model._getAttrNames();
        Object[] attrValues = model._getAttrValues();

        for (int i = 0; i < attrNames.length; i++) {
            attrMap.put(attrNames[i], attrValues[i]);
        }

        return attrMap;
    }

    protected List<Object> transfer(List modelList) {
        List<Object> objectList = new ArrayList<>();
        for (int i = 0; i < modelList.size(); i++) {
            if (modelList.get(i) instanceof Model) {
                objectList.add(transfer((Model) modelList.get(i)));
            } else {
                objectList.add(modelList.get(i));
            }
        }
        return objectList;
    }
}
