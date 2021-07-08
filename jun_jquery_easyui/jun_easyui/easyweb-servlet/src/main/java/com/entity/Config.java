package com.entity;

import top.appx.easysql.annotation.Table;

/**
 * Created by john on 2015/12/10.
 */
@Table(name="tb_config")
public class Config {
    private int id;
    private String name;
    private String value;
    private String comment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
