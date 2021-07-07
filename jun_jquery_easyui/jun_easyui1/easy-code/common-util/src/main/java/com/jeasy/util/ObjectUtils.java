package com.jeasy.util;


public final class ObjectUtils {

    private ObjectUtils() {

    }

    public static Object wrapNull(Object object) {
        return object == null ? org.apache.commons.lang.ObjectUtils.NULL : object;
    }

    public static Object unwrapNull(Object object) {
        return object == org.apache.commons.lang.ObjectUtils.NULL ? null : object;
    }

}
