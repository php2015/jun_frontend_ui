package com.util;

import java.sql.Timestamp;

/**
 * Created by john on 2015/11/21.
 */
public class DateTime {
    public static Timestamp now(){
        return new Timestamp(System.currentTimeMillis());
    }
}
