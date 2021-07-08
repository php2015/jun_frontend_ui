package com.yitong.fasdmain.util;



import java.util.HashMap;
import java.util.Map;

public class R extends HashMap<String, Object> {
    private static final long serialVersionUID = 1L;
    private String msg = "success";

    public R() {
        this.put((String)"msg", this.msg);
        this.put((String)"code", 200);
    }

    public static R error() {
        return error(502, (String)"未知异常，请联系管理员");
    }

    public static R error(Exception e) {
        return error(502, (String)e.getMessage());
    }

    public static R error(int code, Exception e) {
        return error(502, (String)e.getMessage());
    }

    public static R error(String msg) {
        return error(502, (String)msg);
    }

    public static R error(int code, String msg) {
        R r = new R();
        r.put((String)"code", code);
        r.put((String)"msg", msg);
        return r;
    }

    public static R ok(String msg) {
        R r = new R();
        r.put((String)"msg", msg);
        return r;
    }

    public static R ok(Map<String, Object> map) {
        R r = new R();
        r.putAll(map);
        return r;
    }

    public static R ok() {
        return new R();
    }

    public R put(String key, Object value) {
        super.put(key, value);
        return this;
    }

    public R msg(String msg) {
        super.put("msg", msg);
        return this;
    }

    public R put(Object value) {
        super.put("data", value);
        return this;
    }


}
