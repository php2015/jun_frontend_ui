package com.vo;

import java.util.HashMap;

/**
 * Created by john on 2015/11/21.
 */
public class ResultVO extends HashMap<String,Object> {
    public ResultVO p(String key,Object value){
        this.put(key,value);
        return this;
    }
    public static ResultVO success(){
        return ResultVO.data().p("success",true).p("error",false);
    }
    public static  ResultVO error(Object msg){
        return ResultVO.data().p("success",false).p("error",false).p("msg",msg);
    }
    public static ResultVO data(){
        ResultVO rv = new ResultVO();
        return  rv;
    }

}
