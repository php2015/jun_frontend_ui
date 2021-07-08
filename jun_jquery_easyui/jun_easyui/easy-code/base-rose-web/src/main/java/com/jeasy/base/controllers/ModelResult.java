package com.jeasy.base.controllers;

import java.util.List;
import java.util.Map;

import com.google.common.collect.Maps;

import lombok.Data;

/**
 * ModelResult
 * @author taobr
 * @version 1.0
 * @since 2015/05/13 17:34
 */
@Data
public final class ModelResult {

    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";

    public static final int CODE_200 = 200;
    public static final int CODE_500 = 500;

    public static final int CODE_401 = 401;
    public static final int CODE_406 = 406;

    private int code;

    private final Map<String,Object> data = Maps.newHashMap();

    public ModelResult(int code) {
        this.code = code;
    }

    public ModelResult setResultPage(ResultPage resultPage){
        data.put("total",resultPage.getTotalCount());
        data.put("page",resultPage.getPageCount());
        data.put("size",resultPage.getPageSize());
        data.put("list",resultPage.getItems());

        data.put("totalCount",resultPage.getTotalCount());
        data.put("recordCount",resultPage.getItems() == null ? 0 : resultPage.getItems().size());
        return  this;
    }

    public int getTotal() {
        if (!data.containsKey("total")) {
            return 0;
        }
        return Integer.valueOf(String.valueOf(data.get("total")));
    }

    public int getPage() {
        if (!data.containsKey("page")) {
            return 0;
        }
        return Integer.valueOf(String.valueOf(data.get("page")));
    }

    public int getSize() {
        if (!data.containsKey("size")) {
            return 0;
        }
        return Integer.valueOf(String.valueOf(data.get("size")));
    }

    public int getTotalCount() {
        if (!data.containsKey("totalCount")) {
            return 0;
        }
        return Integer.valueOf(String.valueOf(data.get("totalCount")));
    }

    public int getRecordCount() {
        if (!data.containsKey("recordCount")) {
            return 0;
        }
        return Integer.valueOf(String.valueOf(data.get("recordCount")));
    }

    public void setMessage(String message){
        data.put("message", message);
    }

    public String getMessage(){
        return String.valueOf(data.get("message"));
    }

    public void setList(List list){
        data.put("list", list);
    }

    public List getList(){
        return (List) data.get("list");
    }

    public void setEntity(Object entity){
        data.put("entity", entity);
    }

    public Object getEntity() {
        return data.get("entity");
    }
}
