package com.virjar.ssmcodegen.model.java;

/**
 * 可见性,修饰java类,接口,方法,字段 Created by virjar on 16/7/24.
 */
public enum JavaVisibility {
    PUBLIC("public "), PRIVATE("private "), PROTECTED("protected "), DEFAULT("");

    private String value;

    private JavaVisibility(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
